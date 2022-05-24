import { IMatch } from './IMatches';

export default interface ITeams {
  id:number;
  teamName: string;
  teamHome?:IMatch[];
  teamAway?:IMatch[];
}
