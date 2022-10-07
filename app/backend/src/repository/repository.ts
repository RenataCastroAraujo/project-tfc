import UserModel from '../database/models/UserModel';
import IUser from '../interfaces/IUser';

export default class Repository {
  constructor(private model = UserModel) {
    this.model = model;
  }

  async login(email: string): Promise<IUser> {
    const user = await this.model.findOne({ where: { email } });
    return user as IUser;
  }
}
