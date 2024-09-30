import { DataTypes } from "sequelize";

export default (sequelize)=>{
    const Code = sequelize.define('Code',{
        code:{
            type:DataTypes.STRING,
            allowNull:false
        },
        email:{
            type:DataTypes.STRING,
            allowNull:false
        },
        expiresAt:{
            type:DataTypes.DATE,
            allowNull:false
        },
        active:{
            type:DataTypes.BOOLEAN,
            defaultValue:true
        }
    })
    return Code
}