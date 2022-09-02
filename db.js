const { Sequelize } = require('sequelize');
require('dotenv').config();

const dataBaseConnectionURI = process.env.DATABASE_URI;
console.log('🚀 ~ file: db.js ~ line 3 ~ dataBaseConnectionURI', dataBaseConnectionURI);
const connection = new Sequelize(dataBaseConnectionURI);
module.exports = connection;