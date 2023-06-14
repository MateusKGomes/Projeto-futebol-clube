import IUser from './user/IUser';

export interface TokenGenerator {
  generate(user: IUser): string
}
