import TeamsModel from '../database/models/TeamsModel';

export default interface IMatch{
  id?: number,
  homeTeam: number,
  awayTeam: number,
  inProgress: boolean,
  teamHome?: TeamsModel,
  teamAway?: TeamsModel,
}

export interface IMatchHomeGoalsAwayGoals extends IMatch{
  homeTeamGoals: number,
  awayTeamGoals: number,
}
