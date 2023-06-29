"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.database = void 0;
const sequelize_1 = require("sequelize");
// replace with your own values
const database = new sequelize_1.Sequelize('homefinance', 'postgres', 'mysecretpassword', {
    host: 'localhost',
    port: 54322,
    dialect: 'postgres',
});
exports.database = database;
