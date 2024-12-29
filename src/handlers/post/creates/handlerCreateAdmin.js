import { models } from '../../../db.js'
import { userLoginJwt, userRefrestJwt } from '../../../utils/createJwt.js';
import { schema } from '../../../utils/schema.js';
import bcrypt from 'bcrypt'

const { Admin } = models
const SALT_ROUNDS = Number(process.env)

const handlerCreateAdmin = async (id,name,surname,seller,email,password)=>{
    if(id && name && surname && seller && email && password ){
        const { error } = schema.validate({
            uuid:id,
            name:name,
            surname:surname,
            seller:seller,
            email:email,
            password:password
        })
        if(error) throw new Error("Parametros inválidos");
        
        const passwordHashed = bcrypt.hashSync(password, SALT_ROUNDS)
    
        const [ admin, created ] = await Admin.findOrCreate({
            where:{
                seller:seller,
                email:email
            },
            defaults:{
                id:id,
                name:name,
                surname:surname,
                seller:seller,
                email:email,
                password:passwordHashed
            }
        })
        if(!created) throw new Error("Administrator ya existe 🤷‍♀️");
        
        const adminResponse = {
            id:admin.id,
            name:admin.name,
            surname:admin.surname,
            seller:admin.seller
        }
    
        const refresToken = userRefrestJwt(
            admin.id
        )
        const LoginJwt = userLoginJwt(
            admin.email
        )
    
        return {
            refresToken,
            LoginJwt,
            adminResponse
        }
    }throw new Error('Parametros perdidos 🤦‍♂️');
}

export default handlerCreateAdmin