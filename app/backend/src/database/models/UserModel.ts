import { INTEGER, Model, STRING } from 'sequelize';
import db from '.';
import IUser from '../../interfaces/IUser';

export default class UserModel extends Model implements IUser {
  id?: number;
  username: string;
  role: string;
  password: string;
  email: string;
}

UserModel.init({
  id: {
    type: INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  username: {
    type: STRING,
    allowNull: false,
  },
  role: {
    type: STRING,
  },
  email: {
    type: STRING,
    allowNull: false,
  },
  password: {
    type: STRING,
    allowNull: false,
  },
}, {
  underscored: true,
  sequelize: db,
  modelName: 'users',
  timestamps: false,
  tableName: 'users',
});
