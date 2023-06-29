import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../config/database';

class Category extends Model {
  public id!: number; // Category ID
  public userId!: number; // User ID
  public name!: string; // Name
  public type!: string; // Type

  // timestamps!
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Category.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    name: {
      type: new DataTypes.STRING(128),
      allowNull: false,
    },
    type: {
      type: new DataTypes.STRING(128),
      allowNull: false,
    }
  },
  {
    tableName: "categories",
    sequelize, // this bit is important
  }
);

export { Category };
