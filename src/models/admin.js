import { DataTypes } from "sequelize"

export default (sequelize)=>{
    const Admin = sequelize.define('Admin',{
        id:{
            type:DataTypes.UUID,
            allowNull:false
        },
        name:{
            type:DataTypes.STRING,
            allowNull:false
        },
        seller:{
            type:DataTypes.STRING,
            allowNull:false
        },
        email:{
            type:DataTypes.STRING,
            allowNull:false
        },
        password:{
            type:DataTypes.STRING,
            allowNull:false
        }
    })
    return Admin
}