import { config } from 'dotenv';
import { Sequelize } from 'sequelize';
import userModel from './models/user.js';
import codeModel from './models/code.js';

config()

const {
  DB_USER,
  DB_PASSWORD,
  DB_HOST,
  DATABASE_URL
} = process.env

const isProduction = process.env.NODE_ENV === 'production';

const sequelize = new Sequelize(DATABASE_URL, {
  logging: false, 
  native: false, 
  dialectOptions: isProduction ? {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    }
  } : {}
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
