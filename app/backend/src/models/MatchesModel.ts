import SequelizeTeam from '../database/models/SequelizeTeam';
import SequelizeMatches from '../database/models/SequelizeMatches';
import IMatches from '../Interfaces/matches/IMatches';
import { ICRUDMatchesModelReader } from '../Interfaces/ICRUDModel';

export default class MatchesModel implements ICRUDMatchesModelReader<IMatches> {
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

  async findProgressMatches(q: boolean): Promise<IMatches[]> {
    const matches = await this.modelMatches.findAll({
      where: { inProgress: q },
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

  async finishMatches(id: number): Promise<IMatches | null> {
    await this.modelMatches.update({ inProgress: false }, { where: { id } });

    const findMatch = this.findById(id);
    if (findMatch === null) return null;

    return findMatch;
  }

  async updateMatches(id: number, body: Partial<IMatches>): Promise<IMatches | null> {
    await this.modelMatches.update(body, { where: { id } });

    const findMatch = this.findById(id);
    if (findMatch === null) return null;

    return findMatch;
  }

  async createMatches(body: IMatches): Promise<IMatches> {
    const matches = await this.modelMatches.create({ ...body, inProgress: true });
    return matches;
  }
}
