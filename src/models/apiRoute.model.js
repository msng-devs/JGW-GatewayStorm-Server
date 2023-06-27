const { Model, DataTypes } = require('sequelize');
const sequelize = require('../../config/database.config');


const Method = require('./method.model');
const Role = require('./role.model');
const Service = require('./service.model');
const RouteOption = require('./routeOption.model');

class ApiRoute extends Model {}

ApiRoute.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        field: 'API_ROUTE_PK'
    },
    path: {
        type: DataTypes.STRING(2000),
        allowNull: false,
        field: 'API_ROUTE_PATH'
    },
    method: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'METHOD_METHOD_PK'
    },
    role: {
        type: DataTypes.INTEGER,
        allowNull: true,
        field: 'ROLE_ROLE_PK'
    },
    service: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'SERVICE_SERVICE_PK'
    },
    routeOption: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
        field: 'ROUTE_OPTION_ROUTE_OPTION_PK'
    },
    pathVariable: {
        type: DataTypes.STRING(500),
        allowNull: true,
        field: 'PATH_VARIABLE'
    }
}, {
    sequelize,
    modelName: 'ApiRoute',
    tableName: 'API_ROUTE',
    timestamps: false,
    underscored: true,
});

ApiRoute.belongsTo(Method, { foreignKey: 'method' });
ApiRoute.belongsTo(Role, { foreignKey: 'role' });
ApiRoute.belongsTo(Service, { foreignKey: 'service' });
ApiRoute.belongsTo(RouteOption, { foreignKey: 'routeOption' });

module.exports = ApiRoute;