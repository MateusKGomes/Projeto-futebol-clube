import { Request, Response, Router } from 'express';
import MatchesController from '../controllers/MatchesController';
import validateJwt from '../middlewares/tokenValidation';

const matchesRoute = Router();

const matchesController = new MatchesController();

matchesRoute.get('/', (req: Request, res: Response) => matchesController.getAllMatches(req, res));

matchesRoute.patch(
  '/:id/finish',
  validateJwt,
  (
    req: Request,
    res: Response,
  ) => matchesController.finishMatches(req, res),
);

matchesRoute.patch('/:id', validateJwt, (
  req: Request,
  res: Response,
) => matchesController.updateMatches(req, res));

matchesRoute.post(
  '/',
  validateJwt,
  (req: Request, res: Response) => matchesController.createMatches(req, res),
);

export default matchesRoute;
