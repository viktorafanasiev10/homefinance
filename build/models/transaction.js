"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Transaction = void 0;
const sequelize_1 = require("sequelize");
const database_1 = require("../config/database");
class Transaction extends sequelize_1.Model {
}
exports.Transaction = Transaction;
Transaction.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    accountId: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
    },
    subcategoryId: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        allowNull: true,
    },
    amount: {
        type: sequelize_1.DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
    date: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
    },
    description: {
        type: new sequelize_1.DataTypes.STRING(128),
        allowNull: true,
    },
    exchangeRate: {
        type: sequelize_1.DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
    foreignCurrencyAmount: {
        type: sequelize_1.DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
    type: {
        type: new sequelize_1.DataTypes.STRING(128),
        allowNull: false,
    }
}, {
    tableName: "transactions",
    sequelize: database_1.sequelize,
});
