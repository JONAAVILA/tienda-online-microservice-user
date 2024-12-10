import handleCreateUser from '../../../handlers/post/creates/handlerCreateUser.js';
import { v4 as uuidv4 } from 'uuid';

const createUser = async (req,res)=>{
    try {
        const id = uuidv4()
        const {
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
            country
        } = req.body
        const token = req.cookies['validate-token']    

        const create = await handleCreateUser(
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
        )
        res.cookie('refresh-token',create.refresToken,{
            httpOnly:true,
            secure:false,
            sameSite:'strict',
            path:'/',
            maxAge: 7 * 24 * 60 * 60 * 1000
        })
        res.cookie('login-token',create.LoginJwt,{
            httpOnly:true,
            secure:false,
            sameSite:'strict',
            path:'/',
            maxAge: 24 * 60 * 60 * 1000
        })
        res.status(200).json(create.userResponse)
    } catch (error) {
        res.status(400).json({error:error.message})
    }
}

export default createUser