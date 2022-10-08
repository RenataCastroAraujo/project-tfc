import ILogin from './ILogin';
import IUser from './IUser';

export default interface ILoginService {
  makeLogin({
    email,
    password,
  }: ILogin): Promise<string | undefined>,
  getUserByEmail(email: string): Promise<IUser | null>
}
