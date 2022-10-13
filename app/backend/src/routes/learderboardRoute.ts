import { Router } from 'express';
import LearderboardController from '../controllers/LeaderboardController';
import MatchRepository from '../repository/matchsRepository';
import TeamRepository from '../repository/teamsRepository';
import LearderboardService from '../services/LearderboardService';

const leaderboardRoute = Router();

const factoryLearderboard = () => {
  const matchRepository = new MatchRepository();
  const teamRepository = new TeamRepository();
  const learderService = new LearderboardService(matchRepository, teamRepository);
  const learderController = new LearderboardController(learderService);
  return learderController;
};

leaderboardRoute.get('/home', (req, res, next) => factoryLearderboard().table(req, res, next));
leaderboardRoute.get('/', (req, res, next) => factoryLearderboard().table(req, res, next));

export default leaderboardRoute;
