import { Router } from 'express';
import TeamController from '../controllers/TeamController';
import TeamRepository from '../repository/teamsRepository';
import TeamService from '../services/TeamService';

const teamRoute = Router();

function factoryTeam() {
  const teamRepository = new TeamRepository();
  const teamService = new TeamService(teamRepository);
  const teamController = new TeamController(teamService);
  return teamController;
}

teamRoute.get('/', (req, res, next) => factoryTeam().findAllTeams(req, res, next));
teamRoute.get('/:id', (req, res, next) => factoryTeam().findTeamById(req, res, next));

export default teamRoute;
