import { NextFunction, Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';

const validateJwt = (
  req: Request,
  res: Response,
  next: NextFunction,
): Response | void => {
  try {
    const { authorization: token } = req.headers;
    if (!token) { return res.status(401).json({ message: 'Token not found' }); }
    const password = process.env.JWT_SECRET || 'segredo';

    const verify = jwt.verify(token, password);

    req.body = verify;

    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ message: 'Token must be a valid token' });
  }
};

export default validateJwt;
