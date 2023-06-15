import { Request, Response, Router } from 'express';
import MatchesController from '../controllers/MatchesController';

const matchesRoute = Router();

const matchesController = new MatchesController();

matchesRoute.get('/', (req: Request, res: Response) => matchesController.getAllMatches(req, res));

export default matchesRoute;
