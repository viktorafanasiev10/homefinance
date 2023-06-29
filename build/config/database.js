"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sequelize = void 0;
const sequelize_1 = require("sequelize");
let sequelize;
// replace with your own values
if (process.env.DATABASE_URL) {
    // Running on Heroku, so use the DATABASE_URL environment variable
    exports.sequelize = sequelize = new sequelize_1.Sequelize(process.env.DATABASE_URL, {
        dialect: 'postgres',
        protocol: 'postgres',
        dialectOptions: {
            ssl: {
                require: true,
                rejectUnauthorized: false // to avoid the self-signed certificates error
            }
        }
    });
}
else {
    // Running locally so use local database settings
    exports.sequelize = sequelize = new sequelize_1.Sequelize('homefinance', 'postgres', 'mysecretpassword', {
        host: 'localhost',
        port: 54322,
        dialect: 'postgres'
    });
}
