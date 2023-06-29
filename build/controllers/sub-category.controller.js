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
Object.defineProperty(exports, "__esModule", { value: true });
exports.subCategoryController = void 0;
const models_1 = require("../models");
class SubcategoryController {
    getAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const userId = req.user.id;
            try {
                const subcategories = yield models_1.Subcategory.findAll({ where: { userId } });
                res.json(subcategories);
            }
            catch (err) {
                res.status(500).json({ message: 'Error while fetching subcategories' });
            }
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const userId = req.user.id;
            const { name, categoryId } = req.body;
            try {
                const subcategory = yield models_1.Subcategory.create({ userId, name, categoryId });
                res.json(subcategory);
            }
            catch (err) {
                res.status(500).json({ message: 'Error while creating subcategory' });
            }
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const userId = req.user.id;
            const { subcategoryId } = req.params;
            const { name, categoryId } = req.body;
            try {
                const subcategory = yield models_1.Subcategory.findOne({ where: { id: subcategoryId, userId } });
                if (!subcategory) {
                    return res.status(404).json({ message: 'Subcategory not found' });
                }
                subcategory.name = name;
                subcategory.categoryId = categoryId;
                yield subcategory.save();
                res.json(subcategory);
            }
            catch (err) {
                res.status(500).json({ message: 'Error while updating subcategory' });
            }
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const userId = req.user.id;
            const { subcategoryId } = req.params;
            try {
                const subcategory = yield models_1.Subcategory.findOne({ where: { id: subcategoryId, userId } });
                if (!subcategory) {
                    return res.status(404).json({ message: 'Subcategory not found' });
                }
                yield subcategory.destroy();
                res.json({ message: 'Subcategory deleted' });
            }
            catch (err) {
                res.status(500).json({ message: 'Error while deleting subcategory' });
            }
        });
    }
}
exports.subCategoryController = new SubcategoryController();
