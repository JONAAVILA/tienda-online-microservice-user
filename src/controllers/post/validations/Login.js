import handlerLogin from "../../../handlers/post/validations/handlerLogin.js";

const login = async (req,res)=>{
    try {
        const { password,email } = req.body
        const loginToken = req.cookies['login-token']
        const refreshToken = req.cookies['refresh-token']

        const access = await handlerLogin(password,email,loginToken,refreshToken)
        res.status(200).json(access)
    } catch (error) {
        res.status(400).json({error:error.message})
    }
}

export default login