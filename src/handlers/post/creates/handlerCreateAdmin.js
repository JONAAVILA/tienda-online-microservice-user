import { models } from '../../../db.js'
import { userLoginJwt, userRefrestJwt } from '../../../utils/createJwt.js';
import { schema } from '../../../utils/schema.js';
import bcrypt from 'bcrypt'

const { Admin } = models
const SALT_ROUNDS = Number(process.env)

const handlerCreateAdmin = async (name,surname,seller,email,password)=>{
    const { error } = schema.validate({
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
            name:name,
            surname:surname,
            seller:seller,
            email:email,
            password:passwordHashed
        }
    })
    if(!created) throw new Error("Administrator already exists");
    
    const adminResponse = {
        id:admin.id,
        name:admin.name,
        surname:admin.surname
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
}

export default handlerCreateAdmin