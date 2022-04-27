import { Model, INTEGER, STRING } from 'sequelize';
import db from '.';
import ITeams from '../../Types/ITeams';

export default class Teams extends Model implements ITeams {
  teamName: string;

  id: number;

  team_name:string;
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
    sequelize: db,
    modelName: 'teams',
    timestamps: false,
  },
);
