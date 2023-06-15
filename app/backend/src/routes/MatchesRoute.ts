import { Request, Response, Router } from 'express';
import MatchesController from '../controllers/MatchesController';
import validateJwt from '../middlewares/tokenValidation';

const matchesRoute = Router();

const matchesController = new MatchesController();

matchesRoute.get('/', (req: Request, res: Response) => matchesController.getAllMatches(req, res));
matchesRoute.patch('/:id/finish', validateJwt, (
  req: Request,
  res: Response,
) => matchesController.finishMatches(req, res));

export default matchesRoute;
