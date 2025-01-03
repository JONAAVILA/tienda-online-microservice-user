import handlerLogin from "../../../handlers/post/validations/handlerLogin.js";

const login = async (req,res)=>{
    try {
        const { password,email } = req.body
        const refreshToken = req.cookies['refresh-token']
        const loginToken = req.cookies['login-token']

        const access = await handlerLogin(password,email,loginToken,refreshToken)
        res.cookie('validate-token',access.token,{
            httpOnly:true,
            secure:true,
            sameSite:'none',
            path:'/',
            maxAge: 6 * 60 * 1000
        })
        res.status(200).json(access.values)
    } catch (error) {
        res.status(400).json({error:error.message})
    }
}

export default login