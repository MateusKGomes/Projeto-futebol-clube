import { NextFunction, Request, Response } from 'express';

const loginValidation = (
  req: Request,
  res: Response,
  next: NextFunction,
): Response | void => {
  const { email, password } = req.body;
  const regexEmail = /\S+@\S+\.\S+/i;

  if (!email || !password) {
    return res.status(400).json({ message: 'All fields must be filled' });
  }

  if (!regexEmail.test(email) || password.length < 6) {
    return res.status(401).json({
      message: 'Invalid email or password' });
  }
  next();
};

export default loginValidation;
