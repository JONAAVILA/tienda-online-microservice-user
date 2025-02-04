import { DataTypes } from "sequelize";

export default (sequelize)=>{
    const User = sequelize.define('User',{
        id:{
            type:DataTypes.UUID,
            primaryKey:true
        },
        name:{
            type:DataTypes.STRING,
            allowNull:false
        },
        surname:{
            type:DataTypes.STRING,
            allowNull:false
        },
        image:{
            type:DataTypes.STRING,
        },
        email:{
            type:DataTypes.STRING,
            unique:true,
        },
        phone:{
            type:DataTypes.STRING,
            allowNull:false
        },
        password:{
            type:DataTypes.STRING,
            allowNull:false
        },
        address:{
            type:DataTypes.STRING,
            allowNull:false
        },
        number:{
            type:DataTypes.STRING,
            allowNull:false
        },
        location:{
            type:DataTypes.STRING,
            allowNull:false
        },
        state:{
            type:DataTypes.STRING,
            allowNull:false
        },
        country:{
            type:DataTypes.STRING,
            allowNull:false
        },
        active:{
            type:DataTypes.BOOLEAN,
            defaultValue:true
        }
    })
    return User
}