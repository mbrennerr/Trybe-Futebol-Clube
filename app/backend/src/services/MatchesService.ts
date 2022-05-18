import Matches from '../database/models/Matches';
import Teams from '../database/models/teams';

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
}
