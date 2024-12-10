import { models } from '../../../db.js';
import { schema } from '../../../utils/schema.js';
import { userLoginJwt, userRefrestJwt} from '../../../utils/createJwt.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const { User } = models;
const SALT_ROUNDS = Number(process.env)
const { SECRET_KEY } = process.env

const handleCreateUser = async (
        id,
        sellerUser,
        name,
        surname,
        email,
        password,
        phone,
        address,
        number,
        location,
        state,
        country,
        token
    )=>{
    const decode = jwt.verify(
        token,
        SECRET_KEY
    )
    if(decode.email != email) throw new Error('Invalid token');
    
    const { error } = schema.validate({
        uuid:id,
        sellerUser:sellerUser,
        name:name,
        surname:surname,
        email:email,
        password:password,
        phone:phone,
        address:address,
        number:number,
        location:location,
        state:state,
        country:country
    })
    if(error && error.message) throw new Error(error.message)

    const passwordHashed = bcrypt.hashSync(password,SALT_ROUNDS)

    const [ user, created ] = await User.findOrCreate({
        where:{
            email:email,
            sellerUser:sellerUser
        },
        default:{
            id:id,
            sellerUser:sellerUser,
            name:name,
            surname:surname,
            email:email,
            password:passwordHashed,
            phone:phone,
            address:address,
            number:number,
            location:location,
            state:state,
            country:country
        }
    })
    if(!created) throw new Error('Error al crear usuario')

    const userResponse = {
        id:user.id,
        name:user.name,
        surname:user.surname
    }
    const refresToken = userRefrestJwt(
        user.id
    )
    const LoginJwt = userLoginJwt(
        user.email
    )
        
    return {
        refresToken,
        LoginJwt,
        userResponse
    }
}

export default handleCreateUser