// import { models } from "../../../db.js";
// import { schema } from "../../schema.js";

// const { User,Stories } = models

// const handlerUserByName = async (name)=>{
//     try {
//         const { error } = schema.validate({name:name})
//         console.log(error)
//         if(error) throw new Error(`User ${name} not found`)

//         const user = await User.findOne({
//             where:{
//                 name:name
//             },
//             attributes:[
//                 'id',
//                 'name',
//                 'userName',
//                 'surname',
//                 'image',
//                 'state',
//                 'country'
//             ],
//             include:[Stories]
//         })
//         if(!user) throw new Error(`User ${name} not found`) 
//         return user
//     } catch (error) {
//         return error.message
//     }
// }

// export default handlerUserByName;