// import { models } from "../../db.js";

// const { User,Stories } = models

// const handlerAllUsers = async ()=>{
//     try {
//         const users = await User.findAll({
//             where:{
//                 active:true
//             },
//             attributes:[
//                 'id',
//                 'name',
//                 'userName',
//                 'surname',
//                 'image'
//             ],
//             include:[Stories]
//         })
//         if(!users) throw new Error("Users not found")
//         return users
//     } catch (error) {
//         return error 
//     }
// }

// export default handlerAllUsers