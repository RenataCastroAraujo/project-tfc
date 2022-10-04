import IUser from './IUser';

export default interface ILoginService {
  makeLogin({
    email,
    password,
  }: IUser): Promise<string | undefined>
}
