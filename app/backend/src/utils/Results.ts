import HomeResults from './HomeResults';
import AwayResults from './AwayResults';
import IResults from '../Interfaces/results/IResults';

export default class Results {
  constructor(
    private homeResults: HomeResults = new HomeResults(),
    private awayResults: AwayResults = new AwayResults(),
  ) {}

  async getResults() {
    const homeTeams = await this.homeResults.teamResults();
    const awayTeams = await this.awayResults.teamResults();
    return Results.teamResults(homeTeams, awayTeams);
  }

  static async teamResults(homeTeams: IResults[], awayTeams: IResults[]) {
    return homeTeams.map((homeTeam) => {
      const awayTeam: IResults = awayTeams.find((n) => n.name === homeTeam.name) as IResults;
      return {
        name: homeTeam.name,
        totalPoints: awayTeam.totalPoints + homeTeam.totalPoints,
        totalGames: awayTeam.totalGames + homeTeam.totalGames,
        totalVictories: awayTeam.totalVictories + homeTeam.totalVictories,
        totalDraws: awayTeam.totalDraws + homeTeam.totalDraws,
        totalLosses: awayTeam.totalLosses + homeTeam.totalLosses,
        goalsFavor: awayTeam.goalsFavor + homeTeam.goalsFavor,
        goalsOwn: awayTeam.goalsOwn + homeTeam.goalsOwn,
        goalsBalance: (awayTeam.goalsFavor + homeTeam.goalsFavor) - (
          awayTeam.goalsOwn + homeTeam.goalsOwn),
        efficiency: Number((((awayTeam.totalPoints + homeTeam.totalPoints) / (
          (awayTeam.totalGames + homeTeam.totalGames) * 3)) * 100).toFixed(2)),
      };
    });
  }

  // async efficiency(): Promise<number[]> {
  //   const homeTeams = await this.homeResults.teamResults();
  //   const awayTeams = await this.awayResults.teamResults();
  //   const getTeam = homeTeams.map((homeTeam) => {
  //     const awayTeam: IResults = awayTeams.find((n) => n.name === homeTeam.name) as IResults;
  //     const P = awayTeam.totalPoints + homeTeam.totalPoints;
  //     const J = awayTeam.totalGames + homeTeam.totalGames;
  //     const efficiency = (P / (J * 3)) * 100;
  //     return efficiency;
  //   });
  //   return getTeam;
  // }
}
