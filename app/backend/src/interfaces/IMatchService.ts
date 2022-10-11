import IMatch from './IMatch';

export default interface IMatchService {
  findAllMatches(): Promise<IMatch[]>,
  findMatchesByProgress(isInProgress: boolean): Promise<IMatch[]>
  createMatch(match: IMatch): Promise<IMatch>
}
