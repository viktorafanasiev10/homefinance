"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.categoryController = void 0;
const models_1 = require("../models/");
const logger_1 = __importDefault(require("../config/logger"));
const categoryType = ["INCOME", "OUTCOME"];
class CategoryController {
    getAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const userId = req.user.id;
            try {
                const categories = yield models_1.Category.findAll({
                    where: { userId },
                    include: [{ model: models_1.Subcategory, as: 'sub-categories' }] // Include Subcategories
                });
                res.json(categories);
            }
            catch (err) {
                logger_1.default.child({ error: err }).error("Fetching categories error");
                res.status(500).json({ message: 'Error while fetching categories' });
            }
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const userId = req.user.id;
            const { name, type } = req.body;
            if (!categoryType.includes(type)) {
                res.status(500).json({ message: 'type can be only "INCOME" or "OUTCOME"' });
                return false;
            }
            try {
                const category = yield models_1.Category.create({ userId, name, type });
                res.json(category);
            }
            catch (err) {
                res.status(500).json({ message: 'Error while creating category' });
            }
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const userId = req.user.id;
            const { categoryId } = req.params;
            const { name, type } = req.body;
            try {
                const category = yield models_1.Category.findOne({ where: { id: categoryId, userId } });
                if (!category) {
                    return res.status(404).json({ message: 'Category not found' });
                }
                category.name = name;
                category.type = type;
                yield category.save();
                res.json(category);
            }
            catch (err) {
                res.status(500).json({ message: 'Error while updating category' });
            }
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const userId = req.user.id;
            const { categoryId } = req.params;
            try {
                const category = yield models_1.Category.findOne({ where: { id: categoryId, userId } });
                if (!category) {
                    return res.status(404).json({ message: 'Category not found' });
                }
                yield category.destroy();
                res.json({ message: 'Category deleted' });
            }
            catch (err) {
                res.status(500).json({ message: 'Error while deleting category' });
            }
        });
    }
}
exports.categoryController = new CategoryController();
