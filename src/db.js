import { config } from 'dotenv';
import { Sequelize } from 'sequelize';
import userModel from './models/user.js';
import codeModel from './models/code.js';

config()

const {
  DB_USER,
  DB_PASSWORD,
  DB_HOST,
  POSTGRES_URL
} = process.env

// <-- local -->
// const sequelize = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/payture-users`, {
//   logging: false, 
//   native: false, 
// })
// <-- local -->

// <-- produccion -->

console.log('POSTGRES_URL:', POSTGRES_URL);

const isProduction = process.env.NODE_ENV === 'production';

const sequelize = new Sequelize(POSTGRES_URL, {
  logging: false, 
  native: false, 
  dialectOptions: isProduction ? {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    }
  } : {}
})
// <-- produccion -->

const User = userModel(sequelize)
const Code = codeModel(sequelize)

User.hasMany(Code,{foreignKey:'userId'})
Code.belongsTo(User,{foreignKey:'userId'})

const models = {
  ...sequelize.models,
  conn: sequelize,
}

export { models }
