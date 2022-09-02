import Block from '../../../utlils/block';
import './modal.scss';

import registerComponent from '../../../utlils/registerComponent';
import Button from '../../../components/ui/button';
import InputLabeled from '../../../components/ui/inputLabeled';

import { validateInput } from '../../../utlils/validation';

import '../../../helpers/ifEquals';

registerComponent(InputLabeled, 'InputLabeled');
registerComponent(Button, 'Button');

interface IProfileModalProps {
    visible: boolean,
    is: string,
}

export default class ProfileModal extends Block {
  constructor({ visible, is }: IProfileModalProps) {
    const closeModal = () => {
      this.setProps({ visible: false });
    };
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
    super({
      validateInput, submit, visible, is, closeModal,
    });
  }

  render() {
    return `
        {{#ifEquals is "change-info"}}
            <div class="change-info__modal modal {{#if ../visible}}active{{/if}}">
              <div class="change-info__modal__wrapper modal__content">
                <span class="modal__title">Изменить данные профиля</span>
                <form class="change-info__form content__form">
                    {{{InputLabeled
                        name='email'
                        label='Почта'
                        type='text'
                        withLabel=true
                        onBlur=../validateInput
                        onFocus=../validateInput
                    }}}
                    {{{InputLabeled
                        name='login'
                        label='Логин'
                        type='text'
                        withLabel=true
                        onBlur=../validateInput
                        onFocus=../validateInput
                    }}}
                    {{{InputLabeled
                        name='first_name'
                        label='Имя'
                        type='text'
                        withLabel=true
                        onBlur=../validateInput
                        onFocus=../validateInput
                    }}}
                    {{{InputLabeled
                        name='second_name'
                        label='Фамилия'
                        type='text'
                        withLabel=true
                        onBlur=../validateInput
                        onFocus=../validateInput
                    }}}
                    {{{InputLabeled
                        name='display_name'
                        label='Имя в чате'
                        type='text'
                        withLabel=true
                        onBlur=../validateInput
                        onFocus=../validateInput
                    }}}
                    {{{InputLabeled
                        name='phone'
                        label='Телефон'
                        type='text'
                        withLabel=true
                        onBlur=../validateInput
                        onFocus=../validateInput
                    }}}  
                </form>
                <div class="change-info__buttons content__buttons">
                    {{{Button
                      text='Применить'
                      type='primary'
                      onClick=../submit
                    }}}
                    {{{Button
                      text='Отменить'
                      type='minor'
                      onClick=../closeModal
                    }}}
                </div>
              </div>
          </div>
        {{/ifEquals}}
        {{#ifEquals is "change-password"}}
            <div class="change-password__modal modal {{#if ../visible}}active{{/if}}">
            <div class="change-password__modal__wrapper modal__content">
              <span class="modal__title">Изменить пароль</span>
              <form class="change-password__form content__form">
                  {{{InputLabeled
                    name='oldPassword'
                    label='Старый пароль'
                    type='password'
                    withLabel=true
                    onBlur=../validateInput
                    onFocus=../validateInput
                  }}}
                  {{{InputLabeled
                    name='newPassword'
                    label='Пароль'
                    type='password'
                    withLabel=true
                    onBlur=../validateInput
                    onFocus=../validateInput
                  }}}
                  {{{InputLabeled
                    name='repeatNewPassword'
                    label='Повторите пароль'
                    type='password'
                    withLabel=true
                    onBlur=../validateInput
                    onFocus=../validateInput
                  }}}    
              </form>
              <div class="change-password__buttons content__buttons">
                {{{Button
                  text='Применить'
                  type='primary'
                  onClick=../submit
                }}}
                {{{Button
                  text='Отменить'
                  type='minor'
                  onClick=../closeModal
                }}}
            </div>
            </div>
          </div>
        {{/ifEquals}}
        {{#ifEquals is "change-avatar"}}
            <div class="change-avatar__modal modal {{#if ../visible}}active{{/if}}">
                <div class="change-avatar__modal__wrapper modal__content">
                    <span class="modal__title">Изменить аватар</span>
                    <form class="change-avatar__form content__form">
                        {{{InputLabeled
                            name='avatar'
                            type='file'
                        }}}
                    </form>
                    <div class="change-avatar__buttons content__buttons">
                        {{{Button
                          text='Применить'
                          type='primary'
                        }}}
                        {{{Button
                          text='Отменить'
                          type='minor'
                          onClick=../closeModal
                        }}}
                    </div>
                </div>
            </div>
        {{/ifEquals}}
`;
  }
}
