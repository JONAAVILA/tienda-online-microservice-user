import { config } from 'dotenv';
import { Sequelize } from 'sequelize';
import userModel from './models/user.js';
import codeModel from './models/code.js';

config()

const {
  DB_USER,
  DB_PASSWORD,
  DB_HOST,
  POSTGRES_URL_NON_POOLING
} = process.env

// <-- local -->
// const sequelize = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/payture-users`, {
//   logging: false, 
//   native: false, 
// })
// <-- local -->

// <-- produccion -->
const isProduction = process.env.NODE_ENV === 'production';

const sequelize = new Sequelize(POSTGRES_URL_NON_POOLING, {
  dialect: 'postgres',
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
