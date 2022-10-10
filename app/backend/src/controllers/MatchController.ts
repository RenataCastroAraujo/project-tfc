import { NextFunction, Request, Response } from 'express';
import IMatchService from '../interfaces/IMatchService';
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
}
