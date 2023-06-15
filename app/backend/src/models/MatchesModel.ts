import SequelizeTeam from '../database/models/SequelizeTeam';
import SequelizeMatches from '../database/models/SequelizeMatches';
import { ICRUDModelReader } from '../Interfaces/ICRUDModel';
import IMatches from '../Interfaces/matches/IMatches';

export default class MatchesModel implements ICRUDModelReader<IMatches> {
  private modelMatches = SequelizeMatches;

  async findAll(): Promise<IMatches[]> {
    const matches = await this.modelMatches.findAll({
      include: [
        {
          model: SequelizeTeam,
          as: 'homeTeam',
          attributes: ['teamName'],
        },
        {
          model: SequelizeTeam,
          as: 'awayTeam',
          attributes: ['teamName'],
        },
      ],
    });
    return matches;
  }

  async findById(id: number): Promise<IMatches | null> {
    const currentMatches = await this.modelMatches.findByPk(id);
    if (!currentMatches) return null;
    return currentMatches;
  }
}
