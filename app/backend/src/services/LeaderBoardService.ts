import { ITeams } from '../Types';
import Matches from '../database/models/Matches';
import Teams from '../database/models/teams';

export default class LeaderBoardService {
  private matchModel;

  private teamsModel;

  constructor() {
    this.matchModel = Matches;
    this.teamsModel = Teams;
  }

  public static shapeTeamHome(team:ITeams) {
    const result = {
      name: LeaderBoardService.createName(team),
      totalGames: LeaderBoardService.createTotalGames(team),
      ...LeaderBoardService.getTotalMatchesHome(team),

    };
    const goalsBalance = result.goalsFavor - result.goalsOwn;
    const efficiency = Number(((result.totalPoints / (result.totalGames * 3)) * 100).toFixed(2));
    return { ...result, goalsBalance, efficiency };
  }

  async getLeaderBoardHome() {
    const team = await this.teamsModel.findAll({ include: [
      { model: this.matchModel, as: 'teamHome', attributes: { exclude: ['id'] } },
      { model: this.matchModel, as: 'teamAway', attributes: { exclude: ['id'] } },
    ] });
    const leaderBoard = Array.from(team, LeaderBoardService.shapeTeamHome);
    console.log(team);
    return LeaderBoardService.sort(leaderBoard);
  }

  private static createName(team:ITeams) {
    const { teamName } = team;
    return teamName;
  }

  private static createTotalGames(team:ITeams) {
    const games = team.teamHome?.length;
    return games as number;
  }

  private static getTotalMatchesHome(teams:ITeams) {
    const result = {
      goalsFavor: 0,
      goalsOwn: 0,
      totalVictories: 0,
      totalDraws: 0,
      totalLosses: 0,
    };

    teams.teamHome?.forEach((match) => {
      result.goalsFavor += match.homeTeamGoals;
      result.goalsOwn += match.awayTeamGoals;
      if (match.homeTeamGoals > match.awayTeamGoals) result.totalVictories += 1;
      else if (match.homeTeamGoals < match.awayTeamGoals)result.totalLosses += 1;
      else result.totalDraws += 1;
    });

    const totalPoints = (result.totalVictories * 3) + result.totalDraws;

    return { ...result, totalPoints };
  }

  private static sort(classification: any[]) {
    const teamsSorted = classification.sort((a, b) => {
      if (a.totalPoints > b.totalPoints) return -1;
      if (a.totalPoints < b.totalPoints) return 1;
      if (a.totalVictories > b.totalVictories) return -1;
      if (a.totalVictories < b.totalVictories) return 1;
      if (a.goalsBalance > b.goalsBalance) return -1;
      if (a.goalsBalance < b.goalsBalance) return 1;
      if (a.goalsFavor > b.goalsFavor) return -1;
      if (a.goalsFavor < b.goalsFavor) return 1;
      if (a.goalsOwn > b.goalsOwn) return -1;
      if (a.goalsOwn < b.goalsOwn) return 1;
      return 0;
    });
    return teamsSorted;
  }
}
