// import IResults from '../Interfaces/results/IResults';
import orderResults from '../utils/orderResults';
import HomeResults from '../utils/HomeResults';
import IResults from '../Interfaces/results/IResults';
import AwayResults from '../utils/AwayResults';
import Results from '../utils/Results';

export default class ResultsService {
  constructor(
    private homeResults: HomeResults = new HomeResults(),
    private awayResults: AwayResults = new AwayResults(),
    private results: Results = new Results(),

  ) {}

  public async leaderHomeTeam(): Promise<IResults[]> {
    const homeResults = await this.homeResults.teamResults();
    const orderByPoints = orderResults(homeResults);
    return orderByPoints;
  }

  public async leaderAwayTeam(): Promise<IResults[]> {
    const awayResults = await this.awayResults.teamResults();
    const orderByPoints = orderResults(awayResults);
    return orderByPoints;
  }

  public async leaderTeam(): Promise<IResults[]> {
    const results = await this.results.getResults();
    const orderByPoints = orderResults(results);
    return orderByPoints;
  }
}
