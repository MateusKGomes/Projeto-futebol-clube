import SequelizeMatches from '../database/models/SequelizeMatches';
// import IMatches from '../Interfaces/matches/IMatches';

export default class ResultsModel extends SequelizeMatches {
  private modelMatches = SequelizeMatches;

  async leaderHomeTeam(): Promise<SequelizeMatches[]> {
    const matches = await this.modelMatches.findAll({
      where: { inProgress: false } });
    return matches;
  }
}
