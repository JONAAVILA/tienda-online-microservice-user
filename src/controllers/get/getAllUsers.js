import handlerAllUsers from "../../../handlers/user/get/handlerAllUsers.js";

const getAllUsers = async (req,res)=>{
    try {
        const users = await handlerAllUsers()
        res.status(200).json(users)
    } catch (error) {
        res.status(400).json({error:error.message})
    }
}

export default getAllUsers;