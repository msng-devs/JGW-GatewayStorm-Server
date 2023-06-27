const sequelize = require('../../config/database.config');
const fs = require('fs');
const {QueryTypes, DataTypes} = require("sequelize");


const createData = async () => {
    const dml = fs.readFileSync('./resource/DML.sql', 'utf8');
    await sequelize.query(dml, { raw: true , type:QueryTypes.INSERT}).catch(err => {
        console.log(err)
    });
    console.log('DML done')

}
const clearData = async () => {
    const truncate = fs.readFileSync('./resource/TRUNCATE.sql', 'utf8');
    await sequelize.query(truncate);
    console.log('truncate done')
}
module.exports = {createData,clearData}