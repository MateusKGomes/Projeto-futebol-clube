import { Request, Response } from 'express';
import ResultsService from '../services/ResultsService';

export default class ResultsController {
  constructor(
    private resultsService: ResultsService = new ResultsService(),
  ) {}

  public async leaderHomeTeam(req: Request, res: Response): Promise<Response> {
    const results = await this.resultsService.leaderHomeTeam();
    return res.status(200).json(results);
  }

  public async leaderAwayTeam(req: Request, res: Response): Promise<Response> {
    const results = await this.resultsService.leaderAwayTeam();
    return res.status(200).json(results);
  }
}
