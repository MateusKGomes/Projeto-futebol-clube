// import { NextFunction, Request } from 'express';

// const passwordValidation = (
//   req: Request,
//   res: Response,
//   next: NextFunction,
// ): Response | unknown => {
//   const { password } = req.body;

//   if (password === undefined || password.length === 0) {
//     return res.status(400).json({ message: 'Some required fields are missing' });
//   }

//   return next();
// };

// const emailValidation = (
//   req: Request,
//   res: Response,
//   next: NextFunction,
// ): Response | unknown => {
//   const { email } = req.body;
//   const regexEmail = /\S+@\S+\.\S+/i;
//   if (!email) {
//     return res.status(400).json({ message: 'O campo "email" é obrigatório' });
//   }
//   if (!regexEmail.test(email)) {
//     return res.status(400).json({
//       message: 'O "email" deve ter o formato "email@email.com"' });
//   }
//   next();
// };

// export default {
//   emailValidation,
//   passwordValidation,
// };
