const { Sequelize } = require('sequelize');
const {logger} = require("sequelize/lib/utils/logger");
const dotenv = require('dotenv');
const path = require('path');
const env = process.env.NODE_ENV || 'local';
const envPath = path.join(__dirname, '..', `/env/.env.${env}`);
const fs = require('fs');

dotenv.config({ path: envPath });

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PW, {
    host: process.env.DB_HOST,
    logging: false,
    dialect: 'mysql',
    dialectOptions: {
        multipleStatements: true
    },
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
});

sequelize.authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });
// if(env === 'test'){
//     sequelize = new Sequelize('sqlite::memory:');
//     // sequelize = new Sequelize({
//     //     dialect: 'sqlite',
//     //     logging: console.log,
//     //     dialectOptions: {
//     //         multipleStatements: true
//     //     },
//     //     storage: ':memory:',
//     //     pool: {
//     //         max: 1,
//     //         min: 0,
//     //         idle: 10000
//     //     }
//     //
//     // });
//
//
// }
// else {
//
//
// }

module.exports = sequelize;