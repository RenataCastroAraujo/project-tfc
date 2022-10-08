import ITeam from './ITeam';

export default interface ITeamService {
  findAllTeams(): Promise<ITeam[]>,
  findTeamById(id: number): Promise<ITeam>
}
