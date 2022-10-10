export default interface IMatch {
  id?: number,
  homeTeam: number,
  homeTeamGoals: number,
  awayTeam: number,
  awayTeamsGoals: number,
  inProgress: boolean,
  teamHome?: string,
  teamAway?: string,
}
