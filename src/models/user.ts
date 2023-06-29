import { Sequelize, Model, DataTypes, BuildOptions } from 'sequelize';
import { database } from '../config/database';

class User extends Model {
  public id!: number; // Note that the `null assertion` `!` is required in strict mode.
  public username!: string;
  public password!: string;
  public email!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED, // you can omit the `DataTypes.` if you have the types imported
      autoIncrement: true,
      primaryKey: true,
    },
    username: {
      type: new DataTypes.STRING(128),
      allowNull: false,
    },
    password: {
      type: new DataTypes.STRING(128),
      allowNull: false,
    },
    email: {
      type: new DataTypes.STRING(128),
      allowNull: false,
    }
  },
  {
    tableName: "users",
    sequelize: database, // this bit is important
  }
);

export { User };
