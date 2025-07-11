const { Sequelize } = require('sequelize')
require('dotenv').config()

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
    host: process.env.DB_HOST,
    port: 3306,
    dialect: 'mysql'
})

sequelize.authenticate()
.then(()=>{
    console.log('funcionando');
})
.catch((err)=>{
    console.error('deu errado: ', err);
})

module.exports = sequelize