import { Category } from '../models/category';

const categoryType = ["INCOME", "OUTCOME"]
class CategoryController {

  public async getAll(req: any, res: any) {
    const userId = req.user.id;

    try {
      const categories = await Category.findAll({ where: { userId } });
      res.json(categories);
    } catch (err) {
      res.status(500).json({ message: 'Error while fetching categories' });
    }
  }

  public async create(req: any, res: any) {
    const userId = req.user.id;
    const { name, type } = req.body;

    if (!categoryType.includes(type)) {
      res.status(500).json({ message: 'type can be only "INCOME" or "OUTCOME"' });
    }

    try {
      const category = await Category.create({ userId, name, type });
      res.json(category);
    } catch (err) {
      res.status(500).json({ message: 'Error while creating category' });
    }
  }

  public async update(req: any, res: any) {
    const userId = req.user.id;
    const { categoryId } = req.params;
    const { name, type } = req.body;

    try {
      const category = await Category.findOne({ where: { id: categoryId, userId } });
      if (!category) {
        return res.status(404).json({ message: 'Category not found' });
      }

      category.name = name;
      category.type = type;
      await category.save();

      res.json(category);
    } catch (err) {
      res.status(500).json({ message: 'Error while updating category' });
    }
  }

  public async delete(req: any, res: any) {
    const userId = req.user.id;
    const { categoryId } = req.params;

    try {
      const category = await Category.findOne({ where: { id: categoryId, userId } });
      if (!category) {
        return res.status(404).json({ message: 'Category not found' });
      }

      await category.destroy();
      res.json({ message: 'Category deleted' });
    } catch (err) {
      res.status(500).json({ message: 'Error while deleting category' });
    }
  }
}

export const categoryController = new CategoryController();
