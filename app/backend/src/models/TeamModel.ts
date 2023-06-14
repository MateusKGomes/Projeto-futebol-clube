import { ITeamModel } from '../Interfaces/teams/ITeamModel';
import SequelizeTeam from '../database/models/SequelizeTeam';
import ITeam from '../Interfaces/teams/ITeams';

export default class TeamModel implements ITeamModel {
  private model = SequelizeTeam;

  async findAll(): Promise<ITeam[]> {
    const teams = await this.model.findAll();
    console.log('teams', teams);
    return teams.map(({ id, teamName }) => ({ id, teamName }));
  }

  async findById(id: ITeam['id']): Promise<ITeam | null> {
    const team = await this.model.findByPk(id);
    if (team === null) return null;
    return team;
  }
}
