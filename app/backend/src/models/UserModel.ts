import IUser from '../Interfaces/user/IUser';
import { IUserModel } from '../Interfaces/user/IUserModel';
import SequelizeUsers from '../database/models/SequellizeUsers';

export default class UserModel implements IUserModel {
  private model = SequelizeUsers;

  async findByEmail(email: string): Promise<IUser | null> {
    const user = await this.model.findOne({
      where: {
        email,
      },
    });

    if (!user) return null;

    return {
      email: user.email,
      id: user.id,
      role: user.role,
      username: user.username,
      password: user.password,
    };
  }
}
