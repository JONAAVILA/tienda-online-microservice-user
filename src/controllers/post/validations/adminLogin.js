import handlerAdminLogin from "../../../handlers/post/validations/handlerAdminLogin.js"

const adminLogin = async (req,res)=>{
    try {
        const { seller, email, password } = req.body
        const refreshToken = req.cookies['refresh-token']
        const loginToken = req.cookies['login-token']

        const response = await handlerAdminLogin(seller,email,password,refreshToken,loginToken)
        
        res.cookie('validate-token',access.token,{
            httpOnly:true,
            secure:true,
            sameSite:'none',
            path:'/',
            maxAge: 6 * 60 * 1000
        })
        res.status(200).json(response.values)
    } catch (error) {
        res.status(400).json({error:error.message})
    }
}

export default adminLogin