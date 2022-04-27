import { Model, INTEGER, STRING } from 'sequelize';
import db from '.';
import ITeams from '../../Types/ITeams';

export default class Teams extends Model implements ITeams {
  teamName: string;

  id: number;

  public static async getAll(): Promise<ITeams[]> {
    const result:Teams[] = await Teams.findAll();
    return result;
  }
}
Teams.init(
  {
    id: {
      type: INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    team_name: {
      type: STRING(20),
      allowNull: false,
    },
  },
  {
    underscored: true,
    sequelize: db,
    modelName: 'teams',
    timestamps: false,
  },
);
// underscored turns snake case on calmecase;
