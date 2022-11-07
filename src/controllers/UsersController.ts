import UsersApi, { IChangePasswordData, IChangeUserInfoData } from '../api/UsersApi';
import store from '../utlils/store';

class UsersController {
  private api: UsersApi;

  constructor() {
    this.api = new UsersApi();
  }

  findUsers(login: string) {
    return this.api.getUsers(login)
      .then((response) => {
        store.set('findedUsers', response);
      });
  }

  changeUserAvatar(avatar: File) {
    const formData = new FormData();
    formData.append('avatar', avatar);

    return this.api.changeUserAvatar(formData)
      .then((response) => {
        store.set('user', response);
      });
  }

  changeUserInfo(data: IChangeUserInfoData) {
    return this.api.changeUserInfo(data)
      .then((response) => {
        store.set('user', response);
      });
  }

  changePassword(data: IChangePasswordData) {
    return this.api.changePassword(data);
  }
}

export default new UsersController();
