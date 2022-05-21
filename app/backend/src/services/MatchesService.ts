import Matches from '../database/models/Matches';
import Teams from '../database/models/teams';
import { IMatch } from '../Types';

export default class MatchesService {
  private matchModel;

  private teamsModel;

  constructor() {
    this.matchModel = Matches;
    this.teamsModel = Teams;
  }

  public async findAllMatches() {
    const matches = await this.matchModel
      .findAll({ include: [
        { model: this.teamsModel, as: 'teamHome', attributes: { exclude: ['id'] } },
        { model: this.teamsModel, as: 'teamAway', attributes: { exclude: ['id'] } },
      ] });
    return matches;
  }

  public async findByQuery(inProgress:boolean) {
    const batata = await this.matchModel.findAll({ where: { inProgress },
      include: [
        { model: this.teamsModel, as: 'teamHome', attributes: { exclude: ['id'] } },
        { model: this.teamsModel, as: 'teamAway', attributes: { exclude: ['id'] } },
      ] });
    return batata;
  }

  public async saveMatch(match:IMatch) {
    const { homeTeam, awayTeam } = match;
    const checkHomeTeam = await this.teamsModel.findOne({ where: { id: homeTeam } });
    const checkAwayTeam = await this.teamsModel.findOne({ where: { id: awayTeam } });

    const result = { error: false, message: '', result: {} };
    if (!checkHomeTeam || !checkAwayTeam) {
      result.error = true;
      result.message = 'There is no team with such id!';
    } else {
      const postMatch = await this.matchModel.create({ ...match });
      result.result = postMatch;
    }

    return result;
  }

  public async finishMatch(id: string) {
    const match = await this.matchModel.findOne({ where: { id } });
    const update = await this.matchModel.update(
      { inProgress: !match?.inProgress },
      { where: { id } },
    );
    console.log('finishMatch.service', update);
    return update;
  }

  public async updateMatchGoals(id: string, homeTeamGoals:number, awayTeamGoals:number) {
    await this.matchModel.update(
      { homeTeamGoals,
        awayTeamGoals },
      { where: { id } },
    );

    const updatedMatch = await this.matchModel.findOne({ where: { id } });
    return { homeTeamGoals: updatedMatch?.homeTeamGoals,
      awayTeamGoals: updatedMatch?.awayTeamGoals };
  }
}
