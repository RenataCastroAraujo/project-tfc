import * as express from 'express';
import LoginController from './controllers/LoginController';
import Repository from './repository/repository';
import LoginService from './services/LoginService';
import filterErrors from './utils/errors';

const factory = () => {
  const repository = new Repository();
  const loginService = new LoginService(repository);
  const loginController = new LoginController(loginService);
  return loginController;
};

class App {
  public app: express.Express;

  constructor() {
    this.app = express();

    this.config();

    // Não remover essa rota
    this.app.get('/', (req, res) => res.json({ ok: true }));
  }

  private config():void {
    const accessControl: express.RequestHandler = (_req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS,PUT,PATCH');
      res.header('Access-Control-Allow-Headers', '*');
      next();
    };

    this.app.use(express.json());
    this.app.use(accessControl);
    this.app.use(filterErrors);

    this.app.post('/login', (req, res, next) => factory().makeLogin(req, res, next));
    this.app.get('/login/validate', (req, res, next) => factory().getRole(req, res, next));
    this.app.use(filterErrors);
  }

  public start(PORT: string | number):void {
    this.app.listen(PORT, () => console.log(`Running on port ${PORT}`));
  }
}

export { App };

// A execução dos testes de cobertura depende dessa exportação
export const { app } = new App();
