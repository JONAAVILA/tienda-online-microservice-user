import handlerCreateAdmin from "../../../handlers/post/creates/handlerCreateAdmin"

const createAdmin = async (req,res)=>{
    try {
        const {
            name,
            surname,
            seller,
            email,
            password
        } = req.body
        const create = await handlerCreateAdmin(name,surname,seller,email,password)

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
        res.status(200).json(create.adminResponse)
    } catch (error) {
        res.status(400).json({error:error.message})
    }
}

export default createAdmin