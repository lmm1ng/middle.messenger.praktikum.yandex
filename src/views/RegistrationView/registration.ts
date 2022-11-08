import Block from '../../utlils/block';
import './registration.scss';

import { validateInput } from '../../utlils/validation';
import { IRegisterRequestData } from '../../api/AuthApi';
import AuthController from '../../controllers/AuthController';

export default class RegistrationView extends Block {
  constructor() {
    let registrationError = '';
    const submit = (): void => {
      const el = this.getContent();
      const inputs = Array.from(el?.querySelectorAll('input') as NodeList);
      const inputsData:
        Array<{ name: keyof IRegisterRequestData, value: string, isValid: boolean}> = inputs
          .map((input: HTMLInputElement) => ({
            name: input.name as keyof IRegisterRequestData,
            value: input.value,
            isValid: validateInput(input),
          }));
      if (inputsData.every((input) => input.isValid)) {
        const requestData = inputsData
          .reduce((acc: Record<keyof IRegisterRequestData, string>, cur) => {
            acc[cur.name] = cur.value;
            return acc;
          }, {} as IRegisterRequestData);

        AuthController.register(requestData)
          .then(() => {
            registrationError = '';
            this.setProps({ registrationError });
          })
          .catch((e) => {
            registrationError = e.reason;
            this.setProps({ registrationError });
          });
      }
    };

    super({ validateInput, submit, registrationError });
  }

  componentDidMount() {
    AuthController.logout();
  }

  render() {
    return `
    <div class="registration-page-wrapper">
        <div class="registration-page-content">
            <span class="registration-page-content__title">Регистрация</span>
            <div class="registration-page-content__card">
                <form class="registration-form">
                    {{{InputLabeled
                        name='email'
                        label='Почта'
                        type='text'
                        withLabel=true
                        onBlur=validateInput
                        onFocus=validateInput
                    }}}
                    {{{InputLabeled
                        name='login'
                        label='Логин'
                        type='text'
                        withLabel=true
                        onBlur=validateInput
                        onFocus=validateInput
                    }}}
                    {{{InputLabeled
                        name='first_name'
                        label='Имя'
                        type='text'
                        withLabel=true
                        onBlur=validateInput
                        onFocus=validateInput
                    }}}
                    {{{InputLabeled
                        name='second_name'
                        label='Фамилия'
                        type='text'
                        withLabel=true
                        onBlur=validateInput
                        onFocus=validateInput
                    }}}
                    {{{InputLabeled
                        name='phone'
                        label='Телефон'
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
                    <span class="registration__error error">{{ registrationError }}</span>
                </form>
                <div class="registration-buttons">
                    {{{Button
                        text='Зарегистрироваться'
                        type='primary'
                        onClick=submit
                    }}}
                    {{{Anchor
                        text='Войти'
                        href='/'
                    }}}
                </div>
            </div>
        </div>
    </div>
`;
  }
}
