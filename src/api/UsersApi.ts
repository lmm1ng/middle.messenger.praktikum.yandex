import BaseApi from './BaseApi';

export interface IUser {
  id: number,
  first_name: string,
  second_name: string,
  display_name: string,
  login: string,
  email: string,
  phone: number,
  avatar: string | null
}

export interface IChangeUserInfoData {
  first_name: string,
  second_name: string,
  display_name: string,
  login: string,
  email: string,
  phone: number,
}

export interface IChangePasswordData {
  oldPassword: string,
  newPassword: string
}

export default class UsersApi extends BaseApi {
  constructor() {
    super('/user');
  }

  getUsers(login: string): Promise<IUser[]> {
    return this.http.post('/search', { data: { login } });
  }

  changeUserAvatar(data: FormData): Promise<IUser> {
    return this.http.put('/profile/avatar', { data, isFormData: true });
  }

  changeUserInfo(data: IChangeUserInfoData): Promise<IUser> {
    return this.http.put('/profile', { data });
  }

  changePassword(data: IChangePasswordData) {
    return this.http.put('/password', { data });
  }

  create = undefined;

  update = undefined;

  delete = undefined;

  read = undefined;
}
