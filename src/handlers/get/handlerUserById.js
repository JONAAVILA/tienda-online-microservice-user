// import { models } from "../../db.js";
// import { schema } from "../schema.js";

// const { User,Stories } = models

// const handlerUserById = async (id)=>{
//     try {
//         const { error } = schema.validate({uuid:id})
//         if(error) return 'Invalid id'
    
//         const user = await User.findOne({
//             where:{
//                 id:id
//             },
//             attributes:[
//                 'name',
//                 'userName',
//                 'surname',
//                 'image'
//             ],
//             include:[Stories]
//         })
//         if(!user) return 'Invalid id'
//         return user
//     } catch (error) {
//         return 'Invalid id'
//     }
// }

// export default handlerUserById;