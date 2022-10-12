import IMatch from './IMatch';

export default interface IMatchService {
  findAllMatches(): Promise<IMatch[]>,
  findMatchesByProgress(isInProgress: boolean): Promise<IMatch[]>
  createMatch(match: IMatch): Promise<IMatch>
  updateInProgress(id: number): Promise<void>
  updateMatchInProgress(id: number, goals: IMatch): Promise<void>
}
