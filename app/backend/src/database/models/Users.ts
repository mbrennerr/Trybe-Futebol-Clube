import { Model, INTEGER, STRING } from 'sequelize';
import db from '.';
import { IUsers } from '../../Types';

export default class Users extends Model implements IUsers {
  public id: number;

  public username: string;

  public role: string;

  public email: string;

  public password: string;
}

Users.init(
  {
    id: {
      type: INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: STRING(20),
      allowNull: false,
    },
    role: {
      type: STRING(30),
      allowNull: false,
    },
    email: {
      type: STRING(50),
      allowNull: false,
    },
    password: {
      type: STRING(30),
      allowNull: false,
    },
  },
  {
    sequelize: db,
    modelName: 'users',
    underscored: true,
    timestamps: false,

  },
);
