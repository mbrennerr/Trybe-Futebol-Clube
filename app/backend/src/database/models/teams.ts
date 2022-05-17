import { Model, INTEGER, STRING } from 'sequelize';
import db from '.';
import { ITeams } from '../../Types';

export default class Teams extends Model implements ITeams {
  public teamName: string;

  public id: number;

//   public static async getAll(): Promise<ITeams[]> {
//     const result:Teams[] = await Teams.findAll();
//     return result;
//   }
}
Teams.init(
  {
    id: {
      type: INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    teamName: {
      type: STRING(20),
      allowNull: false,
    },
  },
  {
    sequelize: db,
    modelName: 'teams',
    underscored: true,
    timestamps: false,
  },
);
// underscored turns snake case on calmecase;
