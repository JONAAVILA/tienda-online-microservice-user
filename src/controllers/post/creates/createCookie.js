import handlerCreateCookie from "../../../handlers/post/creates/handlerCreateCookie.js"

const createCookie = async (req,res)=>{
    try {
        const token = req.cookies['validate-token']
        const { password } = req.body
        const data = await handlerCreateCookie(password,token)
        res.cookie('refresh-token',data.refresh,{
            httpOnly:true,
            secure:false,
            sameSite:'strict',
            path:'/',
            maxAge: 7 * 24 * 60 * 60 * 1000
        })
        res.cookie('login-token',data.login,{
            httpOnly:true,
            secure:false,
            sameSite:'strict',
            path:'/',
            maxAge: 24 * 60 * 60 * 1000
        })
        res.status(200).json(data.message)
    } catch (error) {
        res.status(400).json({error:error.message})
    }
}

export default createCookie