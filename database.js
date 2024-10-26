const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(process.env.DATA_BASE, process.env.DATA_BASE_USER, process.env.DATA_BASE_PASSWORD, {
    host: process.env.HOST,
    dialect: 'mysql'
});

module.exports = sequelize;