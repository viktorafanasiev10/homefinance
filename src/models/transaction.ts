import {
  DataTypes,
  Model
} from 'sequelize';
import { sequelize } from '../config/database';

class Transaction extends Model {
  public id!: number;
  public accountId!: number;
  public subcategoryId!: number;
  public amount!: number;
  public date!: Date;
  public description!: string;
  public exchangeRate!: number;
  public foreignCurrencyAmount!: number;
  public type!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Transaction.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    accountId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    subcategoryId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true,
    },
    amount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    description: {
      type: new DataTypes.STRING(128),
      allowNull: true,
    },
    exchangeRate: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    foreignCurrencyAmount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    type: {
      type: new DataTypes.STRING(128),
      allowNull: false,
    }
  },
  {
    tableName: "transactions",
    sequelize,
  }
);

export { Transaction }
