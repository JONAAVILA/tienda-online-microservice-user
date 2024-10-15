import jwt from 'jsonwebtoken';
import { schema } from '../../../utils/schema.js';
import { models } from '../../../db.js';
import bcrypt from 'bcrypt';
import { userLoginJwt, userRefrestJwt } from '../../../utils/createJwt.js';

const { SECRET_KEY } = process.env
const { User } = models

const handlerCreateCookie = async (password,token)=>{
    try {
        const decode = jwt.verify(
            token,
            SECRET_KEY
        )
        
        const { error } = schema.validate({
            password:password
        })
        console.log(error)
        if(error) throw new Error('Password inválido')
            
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
        
        const passwordCompare = await bcrypt.compare(password,user.password)
        
        if(!passwordCompare) throw new Error('Datos inválidos');

        const refresh = userRefrestJwt(user.id)
        const login = userLoginJwt(user.email)

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