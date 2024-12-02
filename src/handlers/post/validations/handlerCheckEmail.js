import { Sequelize } from 'sequelize';
import { models } from '../../../db.js';
import { schema } from '../../../utils/schema.js';
import { emailJwt } from '../../../utils/createJwt.js';

const { User } = models;
 
const handlerCheckEmail = async (email)=>{
    try {
        const { error } = schema.validate({
            email:email
        })
        if(error) throw new Error(false)

        const match = await User.findOne({
            where:{
                email:{
                    [Sequelize.Op.eq]:email
                }
            }
        })
<<<<<<< HEAD
    
        if(match != null) return {
            token:'',
            access:false
        }
        const token = emailJwt(email)
        return {
            token:token,
            access:true
        }
=======
        if(match) throw new Error(false);
        return true
>>>>>>> 392acf8e676530f78b8bd869115a203c086a0615
    } catch (error) {
        return error
    }
}

export default handlerCheckEmail;
