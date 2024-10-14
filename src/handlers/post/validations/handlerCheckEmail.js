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
  
        if(match != null) throw new Error(false)
        const token = emailJwt(email)
        return token
    } catch (error) {
        return error
    }
}

export default handlerCheckEmail;
