import ITeamService from '../interfaces/ITeamService';
import TeamRepository from '../repository/teamsRepository';

export default class TeamService implements ITeamService {
  constructor(private teamRepository: TeamRepository) {
    this.teamRepository = teamRepository;
  }

  async findAllTeams() {
    const teams = await this.teamRepository.findAllTeams();
    return teams;
  }

  async findTeamById(id: number) {
    const team = await this.teamRepository.findTeamById(id);
    return team;
  }
}
