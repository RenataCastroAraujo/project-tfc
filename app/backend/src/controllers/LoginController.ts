import { Request, Response } from 'express';
import ILoginService from '../interfaces/ILoginService';
import { validateTokenLogin } from '../utils/jwtAuth';
import StatusCode from '../utils/statusCode';

export default class LoginController {
  constructor(private userService: ILoginService) {
    this.userService = userService;
  }

  async makeLogin(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      if (email === '' || password === '') {
        return res.status(StatusCode.BAD_REQUEST).json({ message: 'All fields must be filled' });
      }
      const token = await this.userService.makeLogin({ email, password });
      return res.status(StatusCode.OK).json({ token });
    } catch (error) {
      res.status(500);
    }
  }

  async validateLogin(req: Request, res: Response) {
    try {
      const { email } = req.body;
      const user = await this.userService.validateLogin(email);
      const token = validateTokenLogin(req.headers.authorization);
      if (!token) {
        return res.status(StatusCode.UNAUTHORIZED).json({ message: 'Token not found' });
      }
      return res.status(StatusCode.OK).json({ role: user?.role });
    } catch (error) {
      return res.status(StatusCode.INTERNAL_SERVER_ERROR);
    }
  }
}
