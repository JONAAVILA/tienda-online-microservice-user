import { models } from '../../../db.js';
import { schema } from '../../../utils/schema.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const { User } = models;
const SALT_ROUNDS = Number(process.env)
const { SECRET_KEY } = process.env

const handleCreateUser = async (id,name,userName,email,password,token )=>{
    const decode = await jwt.verify(
        token,
        SECRET_KEY
    )

    if(decode.email != email) throw new Error('Invalid token');
    
    const { error } = schema.validate({
        uuid:id,
        name:name,
        userName:userName,
        email:email,
        password:password
    })
    if(error) throw new Error('Invalid parameters or are missing')

    const passwordHashed = await bcrypt.hashSync(password,SALT_ROUNDS)

    const response = await User.create({
        id:id,
        name:name,
        userName:userName,
        email:email,
        password:passwordHashed
    })
    if(!response) throw new Error('Error to create')
    return 'User created'
}

export default handleCreateUser