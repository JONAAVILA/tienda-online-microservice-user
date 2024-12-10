import { models } from "../../../db.js"
import { userLoginJwt, userRefrestJwt } from "../../../utils/createJwt.js"
import { schema } from "../../../utils/schema.js"

const { Admin } = models
const { SALT_ROUNDS } = process.env

const handlerAdminLogin = async (seller, email, password)=>{

    const { error } = schema.validate({
        seller:seller,
        email:email,
        password:password
    })
    if(error) throw new Error('Parametros inválidos');
    
    const passwordHashed = await bcrypt.hashSync(password,SALT_ROUNDS)

    const admin = await Admin.findOne({
        seller:seller,
        email:email,
        password:passwordHashed
    })
    if(!admin) throw new Error('Error al iniciar sesión')
    
    const user = {
        id:admin.id,
        seller:admin.seller,
        name:admin.name,
        surname:admin.surname
    }
    const refresToken = userRefrestJwt(
        admin.id,
        admin.seller
    )
    const LoginJwt = userLoginJwt(
        admin.email
    )
        
    return {
        refresToken,
        LoginJwt,
        user
    }
}

export default handlerAdminLogin