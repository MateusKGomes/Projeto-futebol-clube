import { Request, Response } from 'express';
import MatchesService from '../services/MatchesService';

export default class MatchesController {
  constructor(
    private matchesService: MatchesService = new MatchesService(),
  ) {}

  public async getAllMatches(req: Request, res: Response): Promise<Response> {
    const progress = req.query.inProgress;
    if (progress === undefined) {
      const matches = await this.matchesService.getAllMatches();
      return res.status(200).json(matches.data);
    }
    const verify = progress === 'true';
    const matches = await this.matchesService.getProgressMatches(verify);
    return res.status(200).json(matches.data);
  }

  public async finishMatches(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    await this.matchesService.finishMatches(Number(id));
    return res.status(200).json({ message: 'Finished' });
  }

  public async updateMatches(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const { body } = req.body;
    const update = await this.matchesService.updateMatches(Number(id), body);
    return res.status(200).json(update);
  }

  public async createMatches(req: Request, res: Response): Promise<Response> {
    const { body } = req.body;
    const create = await this.matchesService.createMatches(body);
    return res.status(201).json(create.data);
  }
}
