import { User } from './user';
import { Category } from './category';
import { Subcategory } from './subcategory';
import { Account } from './account.js'

Category.hasMany(Subcategory, {
  sourceKey: 'id',
  foreignKey: 'categoryId',
  as: 'sub-categories'
});

Subcategory.belongsTo(Category, {
  targetKey: 'id',
  foreignKey: 'categoryId',
  as: 'category'
});

export {
  User,
  Category,
  Subcategory,
  Account
}
