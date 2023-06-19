import TeamModel from '../models/TeamModel';
import ResultsModel from '../models/ResultsModel';
import SequelizeMatches from '../database/models/SequelizeMatches';

export default class Results {
  constructor(
    private resultsModel: ResultsModel = new ResultsModel(),
    private teamModel: TeamModel = new TeamModel(),
  ) {}

  public async teamResults() {
    const teams = await this.teamModel.findAll();
    const matches = await this.resultsModel.leaderHomeTeam();

    const result = teams.map(({ teamName, id }) => ({
      name: teamName,
      totalPoints: Results.teamPoints(id, matches),
      totalGames: Results.totalGames(id, matches),
      totalVictories: Results.totalWins(id, matches),
      totalDraws: Results.totalDraws(id, matches),
      totalLosses: Results.totalLosses(id, matches),
      goalsFavor: Results.totalGoalsFavor(id, matches),
      goalsOwn: Results.totalGoalsOwn(id, matches),
      goalsBalance: Results.totalGoalsBalance(id, matches),
      efficiency: Results.totalEfficiency(id, matches),
    }));
    return result;
  }

  static teamPoints(id: number | undefined, matches: SequelizeMatches[]): number {
    let points = 0;

    matches.filter((el) => el.awayTeamId === id).forEach(({ dataValues }) => {
      if (dataValues.awayTeamGoals > dataValues.homeTeamGoals) {
        points += 3;
      } else if (dataValues.awayTeamGoals === dataValues.homeTeamGoals) {
        points += 1;
      }
      return points;
    });
    return points;
  }

  static totalGames(
    id: number | undefined,
    matches: SequelizeMatches[],
  ): number {
    return matches.filter((el) => el.awayTeamId === id).length;
  }

  static totalWins(id: number | undefined, matches: SequelizeMatches[]): number {
    let wins = 0;
    matches.filter((el) => el.awayTeamId === id)
      .forEach((play) => {
        if (play.awayTeamGoals > play.homeTeamGoals) {
          wins += 1;
        }
      });
    return wins;
  }

  static totalDraws(id: number | undefined, matches: SequelizeMatches[]): number {
    let draws = 0;
    matches.filter((el) => el.awayTeamId === id)
      .forEach((play) => {
        if (play.awayTeamGoals === play.homeTeamGoals) {
          draws += 1;
        }
      });
    return draws;
  }

  static totalLosses(id: number | undefined, matches: SequelizeMatches[]): number {
    let losses = 0;
    matches.filter((el) => el.awayTeamId === id)
      .forEach((play) => {
        if (play.awayTeamGoals < play.homeTeamGoals) {
          losses += 1;
        }
      });
    return losses;
  }

  static totalGoalsFavor(id: number | undefined, matches: SequelizeMatches[]): number {
    let goals = 0;
    matches.filter((el) => el.awayTeamId === id)
      .forEach((play) => {
        goals += play.awayTeamGoals;
      });
    return goals;
  }

  static totalGoalsOwn(id: number | undefined, matches: SequelizeMatches[]): number {
    let goals = 0;
    matches.filter((el) => el.awayTeamId === id)
      .forEach((play) => {
        goals += play.homeTeamGoals;
      });
    return goals;
  }

  static totalGoalsBalance(id: number | undefined, matches: SequelizeMatches[]): number {
    let favor = 0;
    let own = 0;
    let balance = 0;
    matches.filter((el) => el.awayTeamId === id)
      .forEach((play) => {
        favor += play.awayTeamGoals;
        own += play.homeTeamGoals;
      });
    balance = favor - own;
    return balance;
  }

  static totalEfficiency(id: number | undefined, matches: SequelizeMatches[]): number {
    const P = Results.teamPoints(id, matches);
    const J = Results.totalGames(id, matches);
    let efficiency = 0;
    matches.filter((el) => el.awayTeamId === id)
      .forEach((__play) => {
        efficiency = (P / (J * 3)) * 100;
      });
    return Number(efficiency.toFixed(2));
  }
}
