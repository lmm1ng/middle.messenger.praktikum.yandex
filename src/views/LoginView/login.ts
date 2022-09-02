import Block from '../../utlils/block';
import './login.scss';

import registerComponent from '../../utlils/registerComponent';
import Anchor from '../../components/ui/anchor';
import Button from '../../components/ui/button';
import InputLabeled from '../../components/ui/inputLabeled';

import { validateInput } from '../../utlils/validation';

registerComponent(InputLabeled, 'InputLabeled');
registerComponent(Anchor, 'Anchor');
registerComponent(Button, 'Button');

export default class LoginView extends Block {
  constructor() {
    const submit = () => {
      const el = this.getContent();
      const inputs = Array.from(el?.querySelectorAll('input') as NodeList);
      const inputsData: Array<Record<string, string | boolean>> = inputs
        .map((input: HTMLInputElement) => ({
          name: input.name,
          value: input.value,
          isValid: validateInput(input),
        }));
      if (inputsData.every((input) => input.isValid)) {
        console.log(inputsData);
      }
    };

    super({ validateInput, submit });
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
                </form>
                <div class="login-buttons">
                    {{{Button
                        text='Войти'
                        type='primary'
                        onClick=submit
                    }}}
                    {{{Anchor
                        text='Нет аккаунта?'
                        href='/registration'
                    }}}
                </div>
            </div>
        </div>
    </div>
`;
  }
}
