import { NextFunction, Request, Response } from 'express';
import IMatchService from '../interfaces/IMatchService';
import { validateTokenLogin } from '../utils/jwtAuth';
import StatusCode from '../utils/statusCode';

export default class MatchController {
  constructor(private matchService: IMatchService) {
    this.matchService = matchService;
  }

  async findAllMatches(req: Request, res: Response, next: NextFunction) {
    try {
      const { inProgress } = req.query;
      if (!inProgress) {
        const matches = await this.matchService.findAllMatches();
        return res.status(StatusCode.OK).json(matches);
      }
      const isInProgress = JSON.parse(inProgress as string);
      const matchesWithProgress = await this.matchService.findMatchesByProgress(isInProgress);
      return res.status(StatusCode.OK).json(matchesWithProgress);
    } catch (error) {
      next(error);
    }
  }

  async createMatch(req: Request, res: Response, next: NextFunction) {
    try {
      const email = validateTokenLogin(req.headers.authorization);
      if (!email) {
        return res.status(StatusCode.UNAUTHORIZED).json({ message: 'Token not found' });
      }
      const matchBody = req.body;
      const match = await this.matchService.createMatch(matchBody);
      return res.status(StatusCode.CREATED).json(match);
    } catch (error) {
      next(error);
    }
  }
}
