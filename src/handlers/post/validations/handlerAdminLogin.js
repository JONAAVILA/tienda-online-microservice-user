import { models } from "../../../db.js"
import { schema } from "../../../utils/schema.js"

const { Admin } = models
const { SALT_ROUNDS } = process.env

const handlerAdminLogin = async (seller, email, password)=>{

    const { error } = schema.validate({
        seller:seller,
        email:email,
        password:password
    })

    const passwordHashed = await bcrypt.hashSync(password,SALT_ROUNDS)

    const admin = await Admin.findOne({
        seller:seller,
        email:email,
        password:passwordHashed
    })
}

export default handlerAdminLogin