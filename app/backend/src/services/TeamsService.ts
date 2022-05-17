import Teams from '../database/models/teams';
import { ITeams } from '../Types';

export default class TeamsService implements ITeams {
  private teamsModel;

  constructor() {
    this.teamsModel = Teams;
  }

  id: number;

  teamName: string;

  public async getTeams():Promise<ITeams[]> {
    const result:ITeams[] = await this.teamsModel.findAll();
    return result;
  }

  public async getTeamsById(id: string):Promise<ITeams> {
    // const result:ITeams | null = await this.teamsModel.findOne({ where: { id } });
    const result:ITeams | null = await this.teamsModel.findByPk(id);
    if (!result) {
      throw new Error('No team belongs to that Id');
    }
    return result;
  }
}
