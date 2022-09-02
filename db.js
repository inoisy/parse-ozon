const { Sequelize } = require('sequelize');
require('dotenv').config();

const dataBaseConnectionURI = process.env.DATABASE_URI;
const connection = new Sequelize(dataBaseConnectionURI);
module.exports = connection;