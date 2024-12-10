import { models } from "../../../db.js"
import { schema } from "../../../utils/schema.js"
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import { emailJwt } from "../../../utils/createJwt.js"

const { Admin } = models

const handlerAdminLogin = async (seller,email,password,refreshToken,loginToken)=>{
    try {
        if(refreshToken && loginToken){
            const refresh = jwt.verify(
                refreshToken,
                SECRET_KEY
            )
            const login = jwt.verify(
                loginToken,
                SECRET_KEY
            )

            const { id } = refresh
            const { email:emailLogin } = login
            if(emailLogin != email ) throw new Error(false);

            const { error } = schema.validate({
                seller:seller,
                email:email,
                password:password
            })
            if(error) throw new Error(false);
            
            const admin = await Admin.findOne({
                where:{
                    id:id,
                    seller:seller,
                    email:email,
                },
                attributes:[
                    'password'
                ]
            })
      
            const passwordCompare = await bcrypt.compare(password,admin.password)
            if(!passwordCompare){
                return{
                    values:false,
                    token:''
                }
            }

            return {
                values:{
                    seller:admin.seller,
                    name:admin.name,
                    surname:admin.surname
                },
                token:''
            }
        }
        const emailDb = await Admin.findOne({
            where:{
                email:email
            },
            attributes:[
                'email'
            ]
        })

        if(emailDb.email != email) throw new Error(false);
        const token = emailJwt(email)

        return {
            values:'validate user',
            token:token
        }
    } catch (error) {
        return false
    }
}

export default handlerAdminLogin