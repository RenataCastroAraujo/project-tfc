import { Router } from 'express';
import MatchController from '../controllers/MatchController';
import MatchRepository from '../repository/matchsRepository';
import TeamRepository from '../repository/teamsRepository';
import MatchService from '../services/MatchService';

const matchRoute = Router();

const factoryMatch = () => {
  const repository = new MatchRepository();
  const teamRepository = new TeamRepository();
  const matchService = new MatchService(repository, teamRepository);
  const matchController = new MatchController(matchService);
  return matchController;
};

matchRoute.get('/', (req, res, next) => factoryMatch().findAllMatches(req, res, next));
matchRoute.post('/', (req, res, next) => factoryMatch().createMatch(req, res, next));
matchRoute.patch('/:id/finish', (req, res, next) => factoryMatch()
  .updateInProgress(req, res, next));
matchRoute.patch('/:id', (req, res, next) => factoryMatch().updateMatchInProgress(req, res, next));

export default matchRoute;
