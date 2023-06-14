import { TokenGenerator } from '../Interfaces/ITokenGenerator';
import { Encrypter } from '../Interfaces/IEncrypter';
import { ServiceResponse } from '../Interfaces/ServiceResponse';
import UserModel from '../models/UserModel';

export default class UserService {
  constructor(
    private userModel: UserModel = new UserModel(),
    private encrypter: Encrypter,
    private tokenGenerator: TokenGenerator,

  ) {}

  public async login(userEmail: string, password: string): Promise<ServiceResponse<{ token :string }>> {
    const user = await this.userModel.findByEmail(userEmail);

    if (!user) {
      return { status: 'UNAUTHORIZED', data: { message: 'Invalid email or password' } };
    }

    const isValid = await this.encrypter.compare(password, user.password);

    if (!isValid) {
      return { status: 'UNAUTHORIZED', data: { message: 'Invalid email or password' } };
    }

    const token = this.tokenGenerator.generate(user);

    return {
      status: 'SUCCESSFUL',
      data: { token },
    };
  }
}
