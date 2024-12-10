import handlerAdminLogin from "../../../handlers/post/validations/handlerAdminLogin.js"

const adminLogin = async (req,res)=>{
    try {
        const { seller, email, password } = req.body
        const response = await handlerAdminLogin(seller,email,password)

        res.cookie('refresh-token',response.refresToken,{
            httpOnly:true,
            secure:false,
            sameSite:'strict',
            path:'/',
            maxAge: 7 * 24 * 60 * 60 * 1000
        })
        res.cookie('login-token',response.LoginJwt,{
            httpOnly:true,
            secure:false,
            sameSite:'strict',
            path:'/',
            maxAge: 24 * 60 * 60 * 1000
        })
        res.status(200).json(response.user)
    } catch (error) {
        res.status(400).json({error:error.message})
    }
}

export default adminLogin