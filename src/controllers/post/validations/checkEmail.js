import handlerCheckEmail from '../../../handlers/post/validations/handlerCheckEmail.js';

const checkEmail = async (req,res) =>{
    try {
        const { email } = req.body
        const token = await handlerCheckEmail(email)

        res.cookie('access-token',token,{
            httpOnly:true,
            secure:process.env.NODE_ENV === 'production',
            sameSite:'lax',
            path:'/',
            maxAge: 3600000
            })
        res.status(200).json(token)
    } catch (error) {
        res.status(400).json({error:error.message})
    }
}

export default checkEmail;
