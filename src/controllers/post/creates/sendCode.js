import handlerSendCode from "../../../handlers/post/creates/code/handlerSendCode.js";

const sendCode = async (req,res)=>{
    try {
        const headers = req.headers['authorization']
        const token = headers.split(' ')[1]
        const code = await handlerSendCode(token)
        
        res.status(200).json(code)
    } catch (error) {
        res.status(400).json({error:error.message})
    }
}

export default sendCode