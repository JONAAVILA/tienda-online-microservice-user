import { config } from 'dotenv';
import { Sequelize } from 'sequelize';
import userModel from './models/user.js';
import codeModel from './models/code.js';

config()

const {
  DB_USER,
  DB_PASSWORD,
  DB_HOST
} = process.env

const sequelize = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/payture-users`, {
  logging: false, 
  native: false, 
})

const User = userModel(sequelize)
const Code = codeModel(sequelize)

User.hasMany(Code,{foreignKey:'userId'})
Code.belongsTo(User,{foreignKey:'userId'})

const models = {
  ...sequelize.models,
  conn: sequelize,
}

export { models }