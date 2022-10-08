import { Router } from 'express';
import LoginController from '../controllers/LoginController';
import Repository from '../repository/repository';
import LoginService from '../services/LoginService';

const loginRoute = Router();

const factoryLogin = () => {
  const repository = new Repository();
  const loginService = new LoginService(repository);
  const loginController = new LoginController(loginService);
  return loginController;
};

loginRoute.post('/', (req, res, next) => factoryLogin().makeLogin(req, res, next));
loginRoute.get('/validate', (req, res, next) => factoryLogin().getRole(req, res, next));

export default loginRoute;
