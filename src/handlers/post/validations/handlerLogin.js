import { models } from '../../../db.js';
import { schema } from '../../../utils/schema.js';
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken';

const { User } = models
const { SECRET_KEY } = process.env

const handlerLogin = async (password,email,loginToken,refreshToken)=>{
    try {
        if(refreshToken){
            const refresh = jwt.verify({
                refreshToken,
                SECRET_KEY
            })
            const login = jwt.verify({
                loginToken,
                SECRET_KEY
            })
    
            const { id } = refresh
            const { email:emailLogin } = login
            if(emailLogin != email ) throw new Error(false);
            
            const { error } = schema.validate({
                email:email,
                password:password
            })
            if(error) throw new Error(false);
            
            const user = await User.findOne({
                where:{
                    id:id,
                    email:email
                },
                attributes:[
                    'password'
                ]
            })
            const passwordCompare = await bcrypt.compare(password,user.password)
            return passwordCompare
        }
        return 'validate user'
    } catch (error) {
        return false
    }
}

export default handlerLogin;
