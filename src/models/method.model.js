const { Model, DataTypes } = require('sequelize');
const sequelize = require('../../config/database.config');

class Method extends Model {}

Method.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
        field: 'METHOD_PK'
    },
    name: {
        type: DataTypes.STRING(45),
        allowNull: false,
        unique: true,
        field: 'METHOD_NM'
    },
}, {
    sequelize,
    modelName: 'Method',
    tableName: 'METHOD',
    timestamps: false,
    underscored: true,
});

module.exports = Method;