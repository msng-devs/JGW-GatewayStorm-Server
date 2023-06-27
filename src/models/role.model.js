const { Model, DataTypes } = require('sequelize');
const sequelize = require('../../config/database.config');

class Role extends Model {}

Role.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
        field: 'ROLE_PK'
    },
    name: {
        type: DataTypes.STRING(45),
        allowNull: false,
        unique: true,
        field: 'ROLE_NM'
    },
}, {
    sequelize,
    modelName: 'Role',
    tableName: 'ROLE',
    timestamps: false,
    underscored: true,
});

module.exports = Role;