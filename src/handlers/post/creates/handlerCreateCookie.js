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
        const id = user.id ? user.id : admin.id
        const e_mail = user.email ? user.email : admin.email
        const passwordNew = user.password ? user.password : admin.password
        
        const passwordCompare = await bcrypt.compare(password,passwordNew)
        
        if(!passwordCompare) throw new Error('Datos inválidos');

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