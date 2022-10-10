import ILogin from '../interfaces/ILogin';
import ILoginService from '../interfaces/ILoginService';
import IUser from '../interfaces/IUser';
import Repository from '../repository/repository';
import encryptPassword from '../utils/bcrypt';
import createToken from '../utils/jwtAuth';

export default class LoginService implements ILoginService {
  constructor(private userRepository: Repository) {
    this.userRepository = userRepository;
  }

  async makeLogin({ email, password }: ILogin) {
    const userEmail = await this.userRepository.findUserByEmail(email);
    if (!userEmail) {
      throw new Error('Incorrect email or password');
    }
    const verifyPassword = await encryptPassword(password, userEmail.password);
    if (!verifyPassword) {
      throw new Error('Incorrect email or password');
    }
    const token = createToken(email);
    return token;
  }

  async getUserByEmail(email: string): Promise<IUser | null> {
    const user = await this.userRepository.findUserByEmail(email);
    return user;
  }
}
