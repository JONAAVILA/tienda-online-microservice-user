import { models } from '../../db.js';
import { schema } from '../../utils/schema.js';
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken';

const { User } = models
const { SECRET_KEY } = process.env

const handlerLogin = async (password,userName,token)=>{
    try {
        const decode = jwt.verify({
            token,
            SECRET_KEY
        })

        const email = decode.email

        const { error } = schema.validate({
            userName:userName,
            password:password
        })

        if(error) return false
        const user = await User.findOne({
            where:{
                userName:userName,
                email:email
            },
            attributes:[
                'password'
            ]
        })
        const passwordCompare = await bcrypt.compare(password,user.password)
        return passwordCompare
    } catch (error) {
        return false
    }
}

export default handlerLogin;