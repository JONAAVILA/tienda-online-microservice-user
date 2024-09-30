import { DataTypes } from "sequelize";

export default (sequelize)=>{
    const User = sequelize.define('User',{
        id:{
            type:DataTypes.UUID,
            primaryKey:true
        },
        userName:{
            type:DataTypes.STRING,
            unique:true
        },
        name:{
            type:DataTypes.STRING,
            allowNull:false
        },
        surname:{
            type:DataTypes.STRING,
        },
        image:{
            type:DataTypes.STRING,
        },
        email:{
            type:DataTypes.STRING,
            unique:true,
        },
        password:{
            type:DataTypes.STRING,
            allowNull:false
        },
        address:{
            type:DataTypes.STRING,
        },
        state:{
            type:DataTypes.STRING,
        },
        country:{
            type:DataTypes.STRING,
        },
        active:{
            type:DataTypes.BOOLEAN,
            defaultValue:true
        }
    })
    return User
}