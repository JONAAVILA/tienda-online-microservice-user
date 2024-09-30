import createCode from './createCode.js';
import { schema } from '../../../../utils/schema.js';
import jwt from 'jsonwebtoken';

const { SECRET_KEY } = process.env

const handlerSendCode = async (token)=>{
    try {
        const decode = jwt.verify(
            token,
            SECRET_KEY
        )
        const email = decode.email
        
        const { error } = schema.validate({
            email:email
        })
        if(error) throw new Error("Invalid email");

        const codes = await createCode(email)
        if(codes != true) throw new Error(codes);
        return codes
    } catch (error) {
        return {error:error.message}
    }
}

export default handlerSendCode