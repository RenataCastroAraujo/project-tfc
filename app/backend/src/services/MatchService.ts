import IMatch from '../interfaces/IMatch';
import IMatchService from '../interfaces/IMatchService';
import MatchRepository from '../repository/matchsRepository';

export default class TeamService implements IMatchService {
  constructor(private matchRepository: MatchRepository) {
    this.matchRepository = matchRepository;
  }

  async findAllMatches() {
    const matches = await this.matchRepository.findAllMatches();
    return matches;
  }

  async findMatchesByProgress(isInProgress: boolean): Promise<IMatch[]> {
    const matches = await this.matchRepository.findMatchesByProgress(isInProgress);
    return matches;
  }

  async createMatch(match: IMatch): Promise<IMatch> {
    const matchCreated = await this.matchRepository.createMatch(match);
    return matchCreated;
  }

  async updateInProgress(id: number) {
    const update = await this.matchRepository.updateInProgress(id);
    return update;
  }
}
