import { Op } from "sequelize";
import { models } from "../../../../db.js";
import sendMail from '../../../../emails/send.js'
import triggerToken from '../../../../utils/triggerToken.js';
import { addMinutes } from 'date-fns';

const { Code } = models

const createCode = async (email)=>{
    const now = new Date()
    const expire = addMinutes(now,3)
    
    const currentMonth = now.getMonth()
    const currentYear = now.getFullYear()

    const initMonth = new Date(currentYear,currentMonth,1)
    const endMonth = new Date(currentYear,currentMonth+1,0)
    
    const active = await Code.findAll({
        where:{
            createdAt:{
                [Op.between]:[initMonth,endMonth]
            }
        }
    })

    if(active.length > 3) return 'Llegaste al límite mensual de códigos'

    active.map(t => {
        Code.update(
            {active:false},
            {
                where:{
                    code:t.dataValues.code
                }
            }
        )
    })


    const currentToken = triggerToken()
    Code.create({
        code:currentToken,
        email:email,
        expiresAt:expire
    })
    await sendMail(email,currentToken)

    return true
}

export default createCode