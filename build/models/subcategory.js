"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Subcategory = void 0;
const sequelize_1 = require("sequelize");
const database_1 = require("../config/database");
class Subcategory extends sequelize_1.Model {
}
exports.Subcategory = Subcategory;
Subcategory.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    categoryId: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
    },
    userId: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
    },
    name: {
        type: new sequelize_1.DataTypes.STRING(128),
        allowNull: false,
    }
}, {
    tableName: "subcategories",
    sequelize: database_1.sequelize, // this bit is important
});
