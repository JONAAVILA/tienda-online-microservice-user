import handlerCheckEmail from '../../../handlers/post/validations/handlerCheckEmail.js';

const checkEmail = async (req,res) =>{
    try {
        const { email } = req.body
        const response = await handlerCheckEmail(email)

        res.cookie('validate-token',response['token'],{
            httpOnly:true,
            secure:true,
            sameSite:'none',
            path:'/',
            maxAge: 6 * 60 * 1000
            })
        res.status(200).json(response.access)
    } catch (error) {
        res.status(400).json({error:error.message})
    }
}

export default checkEmail;
