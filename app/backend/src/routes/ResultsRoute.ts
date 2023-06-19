import { Request, Response, Router } from 'express';
import ResultsController from '../controllers/ResultsController';

const resultsController = new ResultsController();

const leaderboardsRouter = Router();

leaderboardsRouter.get('/home', (
  req: Request,
  res: Response,
) => resultsController.leaderHomeTeam(req, res));

leaderboardsRouter.get('/away', (
  req: Request,
  res: Response,
) => resultsController.leaderAwayTeam(req, res));

export default leaderboardsRouter;
