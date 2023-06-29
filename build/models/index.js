"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Account = exports.Subcategory = exports.Category = exports.User = void 0;
const user_1 = require("./user");
Object.defineProperty(exports, "User", { enumerable: true, get: function () { return user_1.User; } });
const category_1 = require("./category");
Object.defineProperty(exports, "Category", { enumerable: true, get: function () { return category_1.Category; } });
const subcategory_1 = require("./subcategory");
Object.defineProperty(exports, "Subcategory", { enumerable: true, get: function () { return subcategory_1.Subcategory; } });
const account_js_1 = require("./account.js");
Object.defineProperty(exports, "Account", { enumerable: true, get: function () { return account_js_1.Account; } });
category_1.Category.hasMany(subcategory_1.Subcategory, {
    sourceKey: 'id',
    foreignKey: 'categoryId',
    as: 'sub-categories'
});
subcategory_1.Subcategory.belongsTo(category_1.Category, {
    targetKey: 'id',
    foreignKey: 'categoryId',
    as: 'category'
});
