import MatchModel from '../database/models/MatchesModel';
import TeamsModel from '../database/models/TeamsModel';
import IMatch from '../interfaces/IMatch';

export default class MatchRepository {
  constructor(private model = MatchModel) {
    this.model = model;
  }

  async findAllMatches(): Promise<IMatch[]> {
    const matches = await this.model.findAll({ include: [
      { model: TeamsModel, as: 'teamHome', attributes: ['teamName'] },
      { model: TeamsModel, as: 'teamAway', attributes: ['teamName'] },
    ] });
    return matches;
  }

  async findMatchesByProgress(isInProgress: boolean): Promise<IMatch[]> {
    const matchesInProgress = await this.model.findAll({ where: { inProgress: isInProgress },
      include: [
        { model: TeamsModel, as: 'teamHome', attributes: ['teamName'] },
        { model: TeamsModel, as: 'teamAway', attributes: ['teamName'] },
      ] });
    return matchesInProgress;
  }

  async createMatch(match: IMatch): Promise<IMatch> {
    const matchCreated = await this.model.create(match);
    return matchCreated;
  }

  async updateInProgress(id: number): Promise<void> {
    await this.model.update({ inProgress: false }, { where: { id } });
  }
}
