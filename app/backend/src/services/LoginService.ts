import { compareSync } from 'bcryptjs';
import ILogin from '../interfaces/ILogin';
import ILoginService from '../interfaces/ILoginService';
import Repository from '../repository/repository';
import createToken from '../utils/jwtAuth';

export default class LoginService implements ILoginService {
  constructor(private userRepository: Repository) {
    this.userRepository = userRepository;
  }

  async makeLogin({ email, password }: ILogin) {
    const userEmail = await this.userRepository.login(email);
    if (!userEmail) {
      const error = new Error('Incorrect email or password');
      error.name = 'Invalid';
      throw error;
    }
    const verifyPassword = compareSync(password, userEmail.password);
    if (!verifyPassword) {
      const error = new Error('Incorrect email or password');
      error.name = 'Invalid';
      throw error;
    }
    const token = createToken(email);
    return token;
  }
}
