import { models } from '../../../db.js';
import { emailJwt } from '../../../utils/createJwt.js';
import { schema } from '../../../utils/schema.js';
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken';

const { User } = models
const { SECRET_KEY } = process.env

const handlerLogin = async (password,email,loginToken,refreshToken)=>{
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
                    'name',
                    'surname',
                    'email',
                    'location',
                    'country',
                    'password'
                ]
            })

            const passwordCompare = await bcrypt.compare(password,user.password)
            if(!passwordCompare){
                return{
                    values:false,
                    token:''
                }
            }

            return{
                values:{
                    name:user.name,
                    surname:user.surname,
                    email:user.email,
                    location:user.location,
                    country:user.country,
                },
                token:''
            }
        }

        const emailDb = await User.findOne({
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

export default handlerLogin;
