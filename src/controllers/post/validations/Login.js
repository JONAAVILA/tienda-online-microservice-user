import handlerLogin from "../../../handlers/post/validations/handlerLogin.js";

const login = async (req,res)=>{
    try {
        const { password,email } = req.body
        const loginToken = req.cookies['login-token']
        const refreshToken = req.cookies['refresh-token']

        const access = await handlerLogin(password,email,loginToken,refreshToken)
        res.cookie('validate-token',access.token,{
            httpOnly:true,
            secure:false,
            sameSite:'strict',
            path:'/',
            maxAge: 6 * 60 * 1000
        })
        res.status(200).json(access.message)
    } catch (error) {
        res.status(400).json({error:error.message})
    }
}

export default login