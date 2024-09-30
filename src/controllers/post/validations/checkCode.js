import handleCheckCode from "../../../handlers/post/validations/handleCheckCode.js";

const checkCode = async (req,res)=>{
    try {
        const headers = req.headers['authorazation']
        const token = headers.split(' ')[1]
        const { code } = req.body
        const check = await handleCheckCode(code,token)
        res.status(200).json(check)
    } catch (error) {
        res.status(200).json({error:error.message})
    }
}

export default checkCode