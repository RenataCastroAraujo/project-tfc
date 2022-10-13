import MatchModel from '../database/models/MatchesModel';
import TeamsModel from '../database/models/TeamsModel';
import ITeam from '../interfaces/ITeam';

export default class TeamRepository {
  constructor(private model = TeamsModel) {
    this.model = model;
  }

  async findAllTeams(): Promise<ITeam[]> {
    const teams = await this.model.findAll();
    return teams;
  }

  async findTeamById(id: number): Promise<ITeam> {
    const team = await this.model.findByPk(id);
    return team as ITeam;
  }

  async findTeamsMatchHome() {
    const teams = await this.model.findAll({ include: [{
      model: MatchModel,
      as: 'matchesHome',
      where: { inProgress: 0 },
    }] });
    return teams;
  }
}
