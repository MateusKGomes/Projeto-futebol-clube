import { ServiceResponse } from '../Interfaces/ServiceResponse';
import IMatches from '../Interfaces/matches/IMatches';
import MatchesModel from '../models/MatchesModel';

export default class MatchesService {
  constructor(
    private matchesModel: MatchesModel = new MatchesModel(),
  ) {}

  public async getAllMatches(): Promise<ServiceResponse<IMatches[]>> {
    const matches = await this.matchesModel.findAll();
    return { status: 'SUCCESSFUL', data: matches };
  }

  public async getProgressMatches(q: boolean): Promise<ServiceResponse<IMatches[]>> {
    const matches = await this.matchesModel.findProgressMatches(q);
    return { status: 'SUCCESSFUL', data: matches };
  }
}
