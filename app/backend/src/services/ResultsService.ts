// import IResults from '../Interfaces/results/IResults';
import Results from '../utils/Results';
import ResultsModel from '../models/ResultsModel';
import IResults from '../Interfaces/results/IResults';

export default class ResultsService {
  constructor(
    private resultsModel: ResultsModel = new ResultsModel(),
    private results: Results = new Results(),
  ) {}

  public async leaderHomeTeam(): Promise<IResults[]> {
    const teamResults = await this.results.teamResults();
    const orderByPoints = teamResults.sort((a, b) => {
      if (a.totalPoints === b.totalPoints) {
        if (a.totalVictories === b.totalVictories) {
          if (a.goalsBalance === b.goalsBalance) {
            return b.goalsFavor - a.goalsFavor;
          }
          return b.goalsBalance - a.goalsBalance;
        }
        return b.totalVictories - a.totalVictories;
      }
      return b.totalPoints - a.totalPoints;
    });
    return orderByPoints;
  }
}
