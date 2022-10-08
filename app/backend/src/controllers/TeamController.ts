import { NextFunction, Request, Response } from 'express';
import ITeamService from '../interfaces/ITeamService';
import StatusCode from '../utils/statusCode';

export default class TeamController {
  constructor(private teamService: ITeamService) {
    this.teamService = teamService;
  }

  async findAllTeams(req: Request, res: Response, next: NextFunction) {
    try {
      const teams = await this.teamService.findAllTeams();
      return res.status(StatusCode.OK).json(teams);
    } catch (error) {
      next(error);
    }
  }

  async findTeamById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      if (!id) {
        throw new Error('Team not found');
      }
      const team = await this.teamService.findTeamById(Number(id));
      return res.status(StatusCode.OK).json(team);
    } catch (error) {
      next(error);
    }
  }
}
