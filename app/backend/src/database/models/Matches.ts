import { Model, INTEGER, BOOLEAN } from 'sequelize';
import { IMatches } from '../../Types';
import db from '.';
import Team from './teams';

export default class Matches extends Model implements IMatches {
  public id: number;

  public homeTeam: number;

  public homeTeamGoals: number;

  public awayTeam: number;

  public awayTeamGoals: number;

  public inProgress: boolean;
}

Matches.init(
  {
    id: {
      type: INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    homeTeam: {
      type: INTEGER,
      allowNull: false,
      references: {
        model: 'teams',
        key: 'id',
      },
    },
    homeTeamGoals: {
      type: INTEGER,
      allowNull: false,
    },
    awayTeam: {
      type: INTEGER,
      allowNull: false,
      references: {
        model: 'teams',
        key: 'id',
      },
    },
    awayTeamGoals: {
      type: INTEGER,
      allowNull: false,
    },
    inProgress: {
      type: BOOLEAN,
      allowNull: false,
    },
  },
  {
    sequelize: db,
    modelName: 'matches',
    underscored: true,
    timestamps: false,

  },
);

Matches.belongsTo(Team, { foreignKey: 'homeTeam', as: 'homeTeam' });
Matches.belongsTo(Team, { foreignKey: 'awayTeam', as: 'awayTeam' });

Team.hasMany(Matches, { foreignKey: 'homeTeam', as: 'homeTeam' });
Team.hasMany(Matches, { foreignKey: 'awayTeam', as: 'awayTeam' });
