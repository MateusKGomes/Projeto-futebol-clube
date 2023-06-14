import { Request, Response } from 'express';
import UserService from '../services/UserService';

export default class UserController {
  constructor(
    private userService: UserService,
  ) {}

  public async login(req: Request, res: Response): Promise<Response> {
    const { email, password } = req.body;
    const user = await this.userService.login(email, password);
    if (user.status !== 'SUCCESSFUL') {
      return res.status(401).json(user.data);
    }
    return res.status(200).json(user.data);
  }
}
