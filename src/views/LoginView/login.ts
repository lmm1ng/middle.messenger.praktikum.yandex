import Block from '../../utlils/block';
import './login.scss';

import { validateInput } from '../../utlils/validation';
import AuthController from '../../controllers/AuthController';
import { ILoginRequestData } from '../../api/AuthApi';
import store from '../../utlils/store';

export default class LoginView extends Block {
  constructor() {
    let loginError = '';
    const submit = (): void => {
      const el = this.getContent();
      const inputs = Array.from(el?.querySelectorAll('input') as NodeList);
      const inputsData:
        Array<{ name: keyof ILoginRequestData, value: string, isValid: boolean}> = inputs
          .map((input: HTMLInputElement) => ({
            name: input.name as keyof ILoginRequestData,
            value: input.value,
            isValid: validateInput(input),
          }));
      if (inputsData.every((input) => input.isValid)) {
        const requestData = inputsData
          .reduce((acc: Record<keyof ILoginRequestData, string>, cur) => {
            acc[cur.name] = cur.value;
            return acc;
          }, {} as ILoginRequestData);

        AuthController.login(requestData)
          .then(() => {
            loginError = '';
            this.setProps({ loginError });
          })
          .catch((e) => {
            loginError = e.reason;
            this.setProps({ loginError });
          });
      }
    };

    super({ validateInput, submit, loginError });
  }

  componentDidMount() {
    if (!store.getState().user) {
      AuthController.logout();
    }
  }

  render() {
    return `
    <div class="login-page-wrapper">
        <div class="login-page-content">
            <span class="login-page-content__title">Вход</span>
            <div class="login-page-content__card">
                <form class="login-form">
                    {{{InputLabeled
                        name='login'
                        label='Логин'
                        type='text'
                        withLabel=true
                        onBlur=validateInput
                        onFocus=validateInput
                    }}}
                    {{{InputLabeled
                        name='password'
                        label='Пароль'
                        type='password'
                        withLabel=true
                        onBlur=validateInput
                        onFocus=validateInput
                    }}}
                    <span class="login__error error">{{ loginError }}</span>
                </form>
                <div class="login-buttons">
                    {{{Button
                        text='Войти'
                        type='primary'
                        onClick=submit
                    }}}
                    {{{Anchor
                        text='Нет аккаунта?'
                        href='/sign-up'
                    }}}
                </div>
            </div>
        </div>
    </div>
`;
  }
}
