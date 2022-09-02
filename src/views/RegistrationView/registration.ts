import Block from '../../utlils/block';
import './registration.scss';

import registerComponent from '../../utlils/registerComponent';
import Anchor from '../../components/ui/anchor';
import Button from '../../components/ui/button';
import InputLabeled from '../../components/ui/inputLabeled';

import { validateInput } from '../../utlils/validation';

registerComponent(InputLabeled, 'InputLabeled');
registerComponent(Anchor, 'Anchor');
registerComponent(Button, 'Button');

export default class RegistrationView extends Block {
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
                    {{{InputLabeled
                        name='repeat-password'
                        label='Повторите пароль'
                        type='password'
                        withLabel=true
                        onBlur=validateInput
                        onFocus=validateInput
                    }}}
                </form>
                <div class="registration-buttons">
                    {{{Button
                        text='Зарегистрироваться'
                        type='primary'
                        onClick=submit
                    }}}
                    {{{Anchor
                        text='Войти'
                        href='/login'
                    }}}
                </div>
            </div>
        </div>
    </div>
`;
  }
}
