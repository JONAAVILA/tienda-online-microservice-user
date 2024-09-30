import handlerUserByName from "../../../handlers/user/get/handlerUserByName.js";

const getUserByName = async (req,res)=>{
    try {
        const { name } = req.query
        const user = await handlerUserByName(name)
        res.status(200).json(user)
    } catch (error) {
        res.status(400).json({error:error.message})
    }
}

export default getUserByName;