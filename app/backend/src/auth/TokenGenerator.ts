import * as jwt from 'jsonwebtoken';
import { TokenGenerator } from '../Interfaces/ITokenGenerator';
import IUser from '../Interfaces/user/IUser';

export default class TokenGeneratorJwt implements TokenGenerator {
  private jwt = jwt;
  private password = process.env.JWT_SECRET || 'segredo';
  private jwtConfig: jwt.SignOptions = {
    algorithm: 'HS256',
    expiresIn: '50m',
  };

  generate(user: Omit<IUser, 'password'>): string {
    const token = this.jwt.sign(user, this.password, this.jwtConfig);
    return token;
  }
}
