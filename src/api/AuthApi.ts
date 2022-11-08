import BaseApi from './BaseApi';
import { IUser } from './UsersApi';

export interface ILoginRequestData {
  email: string,
  password: string,
}

export interface IRegisterRequestData {
  first_name: string,
  second_name: string,
  login: string,
  email: string,
  password: string,
  phone: string
}

export default class AuthApi extends BaseApi {
  constructor() {
    super('/auth');
  }

  login(data: ILoginRequestData) {
    return this.http.post('/signin', { data });
  }

  register(data: IRegisterRequestData) {
    return this.http.post('/signup', { data });
  }

  getUser(): Promise<IUser> {
    return this.http.get('/user');
  }

  logout() {
    return this.http.post('/logout');
  }

  create = undefined;

  update = undefined;

  delete = undefined;

  read = undefined;
}
