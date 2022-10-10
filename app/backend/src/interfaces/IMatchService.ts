import IMatch from './IMatch';

export default interface IMatchService {
  findAllMatches(): Promise<IMatch[]>
}
