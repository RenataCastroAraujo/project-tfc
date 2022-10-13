import { NextFunction, Request, Response } from 'express';
import LeardBoardService from '../services/LearderboardService';
import StatusCode from '../utils/statusCode';

export default class LearderboardController {
  constructor(private learderboardService: LeardBoardService) {
    this.learderboardService = learderboardService;
  }

  async table(req: Request, res: Response, next: NextFunction) {
    try {
      const table = await this.learderboardService.home();
      return res.status(StatusCode.OK).json(table);
    } catch (error) {
      next(error);
    }
  }
}
