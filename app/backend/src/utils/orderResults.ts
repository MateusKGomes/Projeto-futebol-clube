import IResults from '../Interfaces/results/IResults';

const orderResults = (param: IResults[]): IResults[] => {
  param.sort((a, b) => {
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
  return param;
};

export default orderResults;
