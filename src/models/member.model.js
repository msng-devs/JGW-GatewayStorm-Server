const { Model, DataTypes } = require('sequelize');
const sequelize = require('../../config/database.config');


class Member extends Model {}

Member.init({
    id: {
        type: DataTypes.STRING,
        primaryKey: true,
        autoIncrement: false,
        allowNull: false,
        field: 'MEMBER_PK'
    },
    name: {
        type: DataTypes.STRING(45),
        allowNull: false,
        field: 'MEMBER_NM'
    },
    email: {
        type: DataTypes.STRING(255),
        allowNull: false,
        field: 'MEMBER_EMAIL'
    },
    role: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'ROLE_ROLE_PK'
    },
    status: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        field: 'MEMBER_STATUS'
    }
}, {
    sequelize,
    modelName: 'Member',
    tableName: 'MEMBER',
    timestamps: false,
    underscored: true,
});

module.exports = Member;