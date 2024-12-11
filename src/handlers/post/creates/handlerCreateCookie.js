import jwt from 'jsonwebtoken';
import { schema } from '../../../utils/schema.js';
import { models } from '../../../db.js';
import bcrypt from 'bcrypt';
import { userLoginJwt, userRefrestJwt } from '../../../utils/createJwt.js';

const { SECRET_KEY } = process.env
const { User, Admin } = models

const handlerCreateCookie = async (password,token)=>{
    try {
        const decode = jwt.verify(
            token,
            SECRET_KEY
        )
        
        const { error } = schema.validate({
            password:password
        })
        if(error) throw new Error(error)
            
        const { email } = decode
        const user = await User.findOne({
            where:{
                email:email
            },
            attributes:[
                'password',
                'id',
                'email'
            ]
        })

        const admin = await Admin.findOne({
            where:{
                email:email
            },
            attributes:[
                'password',
                'email',
                'id'
            ]
        })

        const id = user ? user.id : admin.id
        const e_mail = user ? user.email : admin.email
        const passwordNew = user ? user.password : admin.password
        
        const passwordCompare = await bcrypt.compare(password,passwordNew)
        
        if(!passwordCompare) throw new Error(passwordCompare);

        const refresh = userRefrestJwt(id)
        const login = userLoginJwt(e_mail)

        return{
            refresh,
            login,
            message:'access'
        }

    } catch (error) {
        return error
    }
}

export default handlerCreateCookie