"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Account = void 0;
const sequelize_1 = require("sequelize");
const database_1 = require("../config/database"); // assuming you initialize sequelize instance in database.ts
class Account extends sequelize_1.Model {
}
exports.Account = Account;
Account.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    userId: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
    },
    name: {
        type: new sequelize_1.DataTypes.STRING(128),
        allowNull: false,
    },
    initialBalance: {
        type: sequelize_1.DataTypes.FLOAT,
        allowNull: false,
    },
    currentBalance: {
        type: sequelize_1.DataTypes.FLOAT,
        allowNull: false,
    },
    currency: {
        type: new sequelize_1.DataTypes.STRING(128),
        allowNull: false,
    }
}, {
    tableName: 'accounts',
    sequelize: database_1.sequelize, // passing the `sequelize` instance is required
});
