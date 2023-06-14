import { Request, Router, Response } from 'express';
import UserController from '../controllers/UserController';
import UserModel from '../models/UserModel';
import EncrypterBcryptService from '../services/EncrypterService';
import UserService from '../services/UserService';
import TokenGeneratorJwt from '../services/TokenGenerator';
import loginValidation from '../middlewares/LoginValidations';

const userModel = new UserModel();
const encrypter = new EncrypterBcryptService();
const tokenGenerator = new TokenGeneratorJwt();
const userService = new UserService(userModel, encrypter, tokenGenerator);
const userController = new UserController(userService);

const userRoute = Router();

userRoute.post('/',
loginValidation, (
  req: Request,
  res: Response,
) => userController.login(req, res));

export default userRoute;
