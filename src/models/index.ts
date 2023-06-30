import { User } from './user';
import { Category } from './category';
import { Subcategory } from './subcategory';
import { Account } from './account'
import { Transaction } from './transaction';

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

Account.hasMany(Transaction, { foreignKey: 'accountId', as: 'transactions' });
Transaction.belongsTo(Account, { foreignKey: 'accountId', as: 'account' });

Subcategory.hasMany(Transaction, { foreignKey: 'subcategoryId', as: 'transactions' });
Transaction.belongsTo(Subcategory, { foreignKey: 'subcategoryId', as: 'sub-category' });

export {
  User,
  Category,
  Subcategory,
  Account,
  Transaction,
}
