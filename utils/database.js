const { Sequelize } = require('sequelize');

const {DB_USER, DB_HOST, DB_PASSWORD, DB_PORT, DB_NAME} = process.env;
 
const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  host: DB_HOST,
  dialect: 'postgres'  

});

 

module.exports = sequelize;
