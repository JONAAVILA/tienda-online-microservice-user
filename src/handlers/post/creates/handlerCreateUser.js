import { models } from '../../../db.js';
import { schema } from '../../../utils/schema.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const { User } = models;
const SALT_ROUNDS = Number(process.env)
const { SECRET_KEY } = process.env

const handleCreateUser = async (id,name,surname,email,password,phone,address,number,location,state,country,token)=>{
    const decode = await jwt.verify(
        token,
        SECRET_KEY
    )
    console.log('data:',id,name,surname,email,password,phone,address,number,location,state,country,token)
    if(decode.email != email) throw new Error('Invalid token');
    
    const { error } = schema.validate({
        uuid:id,
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
    console.log('schema:',error)
    if(error && error.message) throw new Error(error.message)

    const passwordHashed = await bcrypt.hashSync(password,SALT_ROUNDS)
    console.log('password:',passwordHashed)
    const response = await User.create({
        id:id,
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
    })
    console.log('user:',response)
    if(!response) throw new Error('Error to create')
    return 'User created'
}

export default handleCreateUser