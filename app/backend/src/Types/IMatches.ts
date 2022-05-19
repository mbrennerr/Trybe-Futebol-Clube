export interface IMatches {
  id:number;
  homeTeam:number;
  homeTeamGoals:number;
  awayTeam:number;
  awayTeamGoals:number;
  inProgress:boolean;
}

export interface IMatch {
  homeTeam:number,
  awayTeam: number,
  homeTeamGoals:number,
  awayTeamGoals:number,
  inProgress:boolean,
}
