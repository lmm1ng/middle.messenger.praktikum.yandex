import AuthApi, { ILoginRequestData, IRegisterRequestData } from '../api/AuthApi';
import store from '../utlils/store';
import Router from '../utlils/router';

class AuthController {
  private api: AuthApi;

  constructor() {
    this.api = new AuthApi();
  }

  login(requestData: ILoginRequestData) {
    return this.api.login(requestData)
      .then(() => {
        this.fetchUser()
          .then(() => {
            const router = new Router();
            router.go('/messenger');
          });
      });
  }

  register(requestData: IRegisterRequestData) {
    return this.api.register(requestData)
      .then(() => {
        this.fetchUser()
          .then(() => {
            const router = new Router();
            router.go('/messenger');
          });
      });
  }

  fetchUser() {
    return this.api.getUser()
      .then((response) => {
        store.set('user', response);
      });
  }

  logout() {
    return this.api.logout()
      .catch((e) => {
        console.log(e.reason || 'Error');
      });
  }
}

export default new AuthController();
