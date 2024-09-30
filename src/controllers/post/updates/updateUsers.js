import handlerUpdateUser from '../../../handlers/post/updates/handlerUpdateUser.js';
import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';

const SALT_ROUNDS = Number(process.env)

const updateUsers = async (req,res)=>{
    try {
        const uuid = uuidv4()
        const {
            name,
            userName,
            surname,
            image,
            email,
            password,
            address,
            state,
            country
        } = req.body

        const passwordHashed = await bcrypt.hashSync(password,SALT_ROUNDS)

        const response = await handlerUpdateUser(
            uuid,
            name,
            userName,
            surname,
            image,
            email,
            passwordHashed,
            address,
            state,
            country
        )
        res.status(200).json(response)
    } catch (error) {
        res.status(400).json({error:error.message})
    }
}

export default updateUsers;
