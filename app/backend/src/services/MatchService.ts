import IMatch from '../interfaces/IMatch';
import IMatchService from '../interfaces/IMatchService';
import MatchRepository from '../repository/matchsRepository';
import TeamRepository from '../repository/teamsRepository';

export default class TeamService implements IMatchService {
  constructor(private matchRepository: MatchRepository, private teamRepository: TeamRepository) {
    this.matchRepository = matchRepository;
    this.teamRepository = teamRepository;
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
    const { homeTeam, awayTeam } = match;
    if (homeTeam === awayTeam) {
      throw new Error('It is not possible to create a match with two equal teams');
    }
    const homeTeamExist = await this.teamRepository.findTeamById(homeTeam);
    const awayTeamExist = await this.teamRepository.findTeamById(awayTeam);
    if (!homeTeamExist || !awayTeamExist) {
      throw new Error('There is no team with such id!');
    }
    const matchCreated = await this.matchRepository.createMatch(match);
    return matchCreated;
  }

  async updateInProgress(id: number) {
    const update = await this.matchRepository.updateInProgress(id);
    return update;
  }

  async updateMatchInProgress(id: number, goals: IMatch) {
    const updateGoals = await this.matchRepository.updateMatchInProgress(id, goals);
    return updateGoals;
  }
}
