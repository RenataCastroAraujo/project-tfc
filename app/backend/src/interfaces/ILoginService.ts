import ILogin from './ILogin';
import IUser from './IUser';

export default interface ILoginService {
  makeLogin({
    email,
    password,
  }: ILogin): Promise<string | undefined>,
  validateLogin(email: string): Promise<IUser | null>
}
