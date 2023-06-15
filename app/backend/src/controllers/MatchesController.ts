import { Request, Response } from 'express';
import MatchesService from '../services/MatchesService';

export default class MatchesController {
  constructor(
    private matchesService: MatchesService = new MatchesService(),
  ) {}

  public async getAllMatches(req: Request, res: Response): Promise<Response> {
    const matches = await this.matchesService.getAllMatches();
    return res.status(200).json(matches.data);
  }
}
