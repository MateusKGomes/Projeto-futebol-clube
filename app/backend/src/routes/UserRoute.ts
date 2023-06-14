import { Request, Router, Response } from 'express';
import UserController from '../controllers/UserController';
import UserModel from '../models/UserModel';
import EncrypterBcryptService from '../services/EncrypterService';
import UserService from '../services/UserService';
import loginValidation from '../middlewares/LoginValidations';
import TokenGeneratorJwt from '../auth/TokenGenerator';
import tokenValidation from '../middlewares/tokenValidation';

const userModel = new UserModel();
const encrypter = new EncrypterBcryptService();
const tokenGenerator = new TokenGeneratorJwt();
const userService = new UserService(userModel, encrypter, tokenGenerator);
const userController = new UserController(userService);

const userRoute = Router();
const loginRoute = Router();

userRoute.post('/',
loginValidation, (
  req: Request,
  res: Response,
) => userController.login(req, res));


userRoute.get('/role',
tokenValidation, (
  req: Request,
  res: Response,
) => userController.loginRole(req, res));


export default userRoute;
