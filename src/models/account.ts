import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../config/database'; // assuming you initialize sequelize instance in database.ts

class Account extends Model {
  public id!: number; // Account ID
  public userId!: number; // User ID
  public name!: string; // Name
  public initialBalance!: number; // Initial Balance
  public currentBalance!: number; // Current Balance
  public currency!: string; // Currency

  // timestamps!
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Account.init({
  id: {
    type: DataTypes.INTEGER.UNSIGNED, // assuming you want an unsigned integer for ID
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
  initialBalance: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  currentBalance: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  currency: {
    type: new DataTypes.STRING(128),
    allowNull: false,
  }
}, {
  tableName: 'accounts',
  sequelize, // passing the `sequelize` instance is required
});

export { Account };
