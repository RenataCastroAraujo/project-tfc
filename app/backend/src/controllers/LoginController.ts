import { NextFunction, Request, Response } from 'express';
import ILoginService from '../interfaces/ILoginService';
import { validateTokenLogin } from '../utils/jwtAuth';
import StatusCode from '../utils/statusCode';

export default class LoginController {
  constructor(private userService: ILoginService) {
    this.userService = userService;
  }

  async makeLogin(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;
      if (email === '' || password === '') {
        return res.status(StatusCode.BAD_REQUEST).json({ message: 'All fields must be filled' });
      }
      const token = await this.userService.makeLogin({ email, password });
      return res.status(StatusCode.OK).json({ token });
    } catch (error) {
      next(error);
    }
  }

  async getRole(req: Request, res: Response, next: NextFunction) {
    try {
      const email = validateTokenLogin(req.headers.authorization);

      if (!email) {
        return res.status(StatusCode.UNAUTHORIZED).json({ message: 'Token not found' });
      }
      const user = await this.userService.getUserByEmail(email as string);
      return res.status(200).json({ role: user?.role });
    } catch (error) {
      next(error);
    }
  }
}
