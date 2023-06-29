import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../config/database';

class Subcategory extends Model {
  public id!: number; // Subcategory ID
  public categoryId!: number; // Category ID
  public userId!: number; // User ID
  public name!: string; // Name

  // timestamps!
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Subcategory.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    categoryId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    name: {
      type: new DataTypes.STRING(128),
      allowNull: false,
    }
  },
  {
    tableName: "subcategories",
    sequelize, // this bit is important
  }
);

export { Subcategory };
