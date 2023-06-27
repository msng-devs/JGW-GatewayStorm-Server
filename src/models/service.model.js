const { Model, DataTypes } = require('sequelize');
const sequelize = require('../../config/database.config');

class Service extends Model {}

Service.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
        field: 'SERVICE_PK'
    },
    name: {
        type: DataTypes.STRING(45),
        allowNull: false,
        unique: true,
        field: 'SERVICE_NM'
    },
    domain: {
        type: DataTypes.STRING(200),
        allowNull: false,
        unique: true,
        field: 'SERVICE_DOMAIN'
    },
    index: {
        type: DataTypes.TEXT,
        allowNull: true,
        defaultValue: 'none',
        field: 'SERVICE_INDEX'
    },
}, {
    sequelize,
    modelName: 'Service',
    tableName: 'SERVICE',
    timestamps: false,
    underscored: true,
});

module.exports = Service;