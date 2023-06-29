import { Subcategory } from '../models';

class SubcategoryController {
  public async getAll(req: any, res: any) {
    const userId = req.user.id;

    try {
      const subcategories = await Subcategory.findAll({ where: { userId } });
      res.json(subcategories);
    } catch (err) {
      res.status(500).json({ message: 'Error while fetching subcategories' });
    }
  }

  public async create(req: any, res: any) {
    const userId = req.user.id;
    const { name, categoryId } = req.body;

    try {
      const subcategory = await Subcategory.create({ userId, name, categoryId });
      res.json(subcategory);
    } catch (err) {
      res.status(500).json({ message: 'Error while creating subcategory' });
    }
  }

  public async update(req: any, res: any) {
    const userId = req.user.id;
    const { subcategoryId } = req.params;
    const { name, categoryId } = req.body;

    try {
      const subcategory = await Subcategory.findOne({ where: { id: subcategoryId, userId } });
      if (!subcategory) {
        return res.status(404).json({ message: 'Subcategory not found' });
      }

      subcategory.name = name;
      subcategory.categoryId = categoryId;
      await subcategory.save();

      res.json(subcategory);
    } catch (err) {
      res.status(500).json({ message: 'Error while updating subcategory' });
    }
  }

  public async delete(req: any, res: any) {
    const userId = req.user.id;
    const { subcategoryId } = req.params;

    try {
      const subcategory = await Subcategory.findOne({ where: { id: subcategoryId, userId } });
      if (!subcategory) {
        return res.status(404).json({ message: 'Subcategory not found' });
      }

      await subcategory.destroy();
      res.json({ message: 'Subcategory deleted' });
    } catch (err) {
      res.status(500).json({ message: 'Error while deleting subcategory' });
    }
  }
}

export const subCategoryController = new SubcategoryController();
