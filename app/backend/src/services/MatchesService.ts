import TeamModel from '../models/TeamModel';
import { ServiceResponse } from '../Interfaces/ServiceResponse';
import IMatches from '../Interfaces/matches/IMatches';
import MatchesModel from '../models/MatchesModel';

export default class MatchesService {
  constructor(
    private matchesModel: MatchesModel = new MatchesModel(),
    private teamModel: TeamModel = new TeamModel(),
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
    const { homeTeamId, awayTeamId } = matches;

    const verifyHomeTeam = await this.teamModel.findById(homeTeamId);
    const verifyAwayTeam = await this.teamModel.findById(awayTeamId);

    if (!verifyHomeTeam || !verifyAwayTeam) {
      return { status: 'NOT_FOUND',
        data: { message: 'There is no team with such id!' } };
    }

    if (homeTeamId === awayTeamId) {
      return { status: 'INVALID_DATA',
        data: { message: 'It is not possible to create a match with two equal teams' } };
    }

    return { status: 'SUCCESSFUL', data: matches };
  }
}
