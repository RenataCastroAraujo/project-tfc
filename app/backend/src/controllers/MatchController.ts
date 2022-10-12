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
      const tokenValidationResult = validateTokenLogin(req.headers.authorization);
      if (!tokenValidationResult) {
        throw new Error('Token must be a valid token');
      }
      const matchBody = req.body;
      const match = await this.matchService.createMatch(matchBody);
      return res.status(StatusCode.CREATED).json(match);
    } catch (error) {
      next(error);
    }
  }

  async updateInProgress(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      if (!id) {
        throw new Error('Id not exist');
      }
      await this.matchService.updateInProgress(Number(id));
      return res.status(StatusCode.OK).json({ message: 'Finished' });
    } catch (error) {
      next(error);
    }
  }

  async updateMatchInProgress(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const goals = req.body;
      await this.matchService.updateMatchInProgress(Number(id), goals);
      return res.status(StatusCode.OK).json({ message: 'Match updated' });
    } catch (error) {
      next(error);
    }
  }
}
