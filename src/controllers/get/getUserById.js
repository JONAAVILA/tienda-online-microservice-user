import handlerUserById from "../../../handlers/user/get/handlerUserById.js";

const getUserById = async (req,res)=>{
    try {
        const { id } = req.query
        const user = await handlerUserById(id)
        res.status(200).json(user)
    } catch (error) {
        res.status(400).json({error:error.message})
    }
}

export default getUserById