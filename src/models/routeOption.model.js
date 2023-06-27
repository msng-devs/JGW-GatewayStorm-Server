const { Model, DataTypes } = require('sequelize');
const sequelize = require('../../config/database.config');

class RouteOption extends Model {}

RouteOption.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
        field: 'ROUTE_OPTION_PK'
    },
    name: {
        type: DataTypes.STRING(45),
        allowNull: false,
        unique: true,
        field: 'ROUTE_OPTION_NM'
    },
}, {
    sequelize,
    modelName: 'RouteOption',
    tableName: 'ROUTE_OPTION',
    timestamps: false,
    underscored: true,
});

module.exports = RouteOption;