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

  public async finishMatches(
    id: number,
  ): Promise<ServiceResponse<IMatches | null>> {
    const finish = await this.matchesModel.finishMatches(id);
    return { status: 'SUCCESSFUL', data: finish };
  }

  public async updateMatches(
    id: number,
    body: IMatches,
  ): Promise<ServiceResponse<IMatches | null>> {
    const update = await this.matchesModel.updateMatches(id, body);
    return { status: 'SUCCESSFUL', data: update };
  }

  public async createMatches(body: IMatches): Promise<ServiceResponse<IMatches>> {
    const matches = await this.matchesModel.createMatches(body);
    return { status: 'SUCCESSFUL', data: matches };
  }
}
