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
}
