import handleCheckUsers from '../../../handlers/post/validations/handleCheckUsers.js';

const checkUsers = async (req,res)=>{
    try {
        const headers = req.headers['authorazation']
        const token = headers.split(' ')[1]
        const { userName } = req.body
        const check = await handleCheckUsers(userName,token)
        res
         .cookir
         .status(200).json(check)
    } catch (error) {
        res.status(400).json({error:error.message})
    }
}

export default checkUsers