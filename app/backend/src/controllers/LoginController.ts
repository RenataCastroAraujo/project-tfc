import { Request, Response } from 'express';
import LoginService from '../services/LoginService';
import StatusCode from '../utils/statusCode';

export default class LoginController {
  constructor(private userService: LoginService) {
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
      return res.status(StatusCode.INTERNAL_SERVER_ERROR);
    }
  }
}
