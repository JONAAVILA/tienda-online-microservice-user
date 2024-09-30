import { models } from "../../../db.js";
import { schema } from "../../../utils/schema.js";
import jwt from 'jsonwebtoken';

const { User } = models
const { SECRET_KEY } = process.env

const handleCheckUsers = async (userName,token)=>{
    try {
        const decode = jwt.verify(
            token,
            SECRET_KEY,
        )
        if(decode.email.length < 1) throw new Error('Invalid token');
        
        const { error } = schema.validate({
            userName:userName
        })
        if(error) throw new Error('Error')
            
        const check = await User.findOne({
            where:{
                userName:userName
            },
            attributes:['userName']
        })
  
        if(check !== null) return false;
        return true
    } catch (error) {
        return false
    }
}

export default handleCheckUsers