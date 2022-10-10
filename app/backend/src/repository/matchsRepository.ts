import MatchModel from '../database/models/MatchsModel';
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
}
