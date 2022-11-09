import Block from '../../utlils/block';
import './modal.scss';

import { validateInput } from '../../utlils/validation';

import '../../helpers/ifEquals';

import ChatsController from '../../controllers/ChatsController';
import UsersController from '../../controllers/UsersController';
import { ICreateChatData } from '../../api/ChatsApi';
import { IChangeUserInfoData } from '../../api/UsersApi';

export interface IModalProps {
  visible: boolean,
  is: string,
  onClose: () => void
}

export default class Modal extends Block {
  constructor({
    visible, is, onClose, ...props
  }: IModalProps) {
    const closeModal = (): void => {
      onClose();
    };

    const createChat = () => {
      const data = collectInputsData();
      if (Object.keys(data).length) {
        ChatsController.createChat(data as unknown as ICreateChatData)
          .then(() => {
            closeModal();
          })
          .catch((e) => {
            console.log(e.reason || 'Error');
          });
      }
    };

    let findUsersInput = '';

    const findUsers = () => {
      UsersController.findUsers(findUsersInput)
        .catch((e) => {
          console.log(e.reason || 'Error');
        });
    };

    const onFindUsersInput = (e: InputEvent) => {
      findUsersInput = ((e.target as HTMLInputElement).value);
    };

    const addUserToChat = (e: PointerEvent & { path: Node[] }) => {
      const path = e?.path || (e.composedPath && e.composedPath());
      const idArr = ((path[1] as HTMLElement)
        .children[0].textContent as string)
        .split(' ')[1].match(/\d+/g);
      if (idArr?.length) {
        ChatsController.addUserToChat(Number(idArr[0]))
          .then(() => closeModal())
          .catch((e) => {
            console.log(e.reason || 'Error');
          });
      }
    };

    const deleteUserFromChat = (e: PointerEvent & { path: Node[] }) => {
      const path = e?.path || (e.composedPath && e.composedPath());
      const idArr = ((path[1] as HTMLElement)
        .children[0].textContent as string)
        .split(' ')[1].match(/\d+/g);
      if (idArr?.length) {
        ChatsController.deleteUserFromChat(Number(idArr[0]))
          .then(() => closeModal())
          .catch((e) => {
            console.log(e.reason || 'Error');
          });
      }
    };

    const changeChatAvatar = () => {
      const { avatar } = collectInputsData();
      ChatsController.changeChatAvatar(avatar as unknown as File)
        .then(() => closeModal())
        .catch((e) => {
          console.log(e.reason || 'Error');
        });
    };

    const changeUserAvatar = () => {
      const { avatar } = collectInputsData();
      UsersController.changeUserAvatar(avatar as unknown as File)
        .then(() => closeModal())
        .catch((e) => {
          console.log(e.reason || 'Error');
        });
    };

    const changeProfileInfo = () => {
      const data = collectInputsData();
      if (Object.keys(data).length) {
        UsersController.changeUserInfo(data as unknown as IChangeUserInfoData)
          .then(() => closeModal())
          .catch((e) => {
            console.log(e.reason || 'Error');
          });
      }
    };

    const changePassword = () => {
      const data = collectInputsData();
      if (Object.keys(data).length) {
        if (data.newPassword === data.repeatNewPassword) {
          UsersController.changePassword({
            oldPassword: data.oldPassword as string,
            newPassword: data.newPassword as string,
          })
            .then(() => closeModal())
            .catch((e) => {
              console.log(e.reason || 'Error');
            });
        }
      }
    };

    const collectInputsData = (): Record<string, string | File> => {
      type InputData = {
        name: string,
        value: string | File,
        isValid: boolean
      }
      const el = this.getContent();
      const inputs = Array.from(el?.querySelectorAll('input') as NodeList);
      const inputsData: Array<InputData> = inputs
        .map((input: HTMLInputElement) => ({
          name: input.name,
          value: input.type === 'file' && input.files?.length ? input.files[0] : input.value,
          isValid: validateInput(input),
        }));
      if (inputsData.every((input) => input.isValid)) {
        return inputsData.reduce((acc, cur) => {
          acc[cur.name] = cur.value;
          return acc;
        }, {} as Record<string, string | File>);
      }
      return {};
    };
    super({
      ...props,
      validateInput,
      createChat,
      addUserToChat,
      visible,
      is,
      closeModal,
      onFindUsersInput,
      findUsers,
      deleteUserFromChat,
      changeChatAvatar,
      changeUserAvatar,
      changeProfileInfo,
      changePassword,
    });
  }

  render() {
    return `
        {{#ifEquals is "create-chat"}}
            <div class="modal {{#if ../visible}}active{{/if}}">
              <div class="modal__content">
                <span class="modal__title">Создать чат</span>
                <form class="content__form" onsubmit="return false">
                    {{{InputLabeled
                        name='title'
                        label='Имя чата'
                        type='text'
                        withLabel=true
                        onBlur=../validateInput
                        onFocus=../validateInput
                    }}}
                </form>
                <div class="content__buttons">
                    {{{Button
                      text='Создать'
                      type='primary'
                      onClick=../createChat
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
        {{#ifEquals is "delete-user"}}
            <div class="modal {{#if ../visible}}active{{/if}}">
              <div class="modal__content">
                <span class="modal__title">Удалить пользователя</span>
                <div class="find-user-list">
                  {{#each ../findedUsers}}
                    <div class="find-user-list__el">
                        <span>{{this.login}} ({{this.id}})</span>
                        {{{Button
                            text='Удалить'
                            type='danger'
                            onClick=../../deleteUserFromChat
                        }}}
                    </div>
                  {{/each}}
                </div>
                <div class="content__buttons">
                  {{{Button
                    text='Отменить'
                    type='minor'
                    onClick=../closeModal
                  }}}
                </div>
              </div>
          </div>
        {{/ifEquals}}
        {{#ifEquals is "add-user"}}
            <div class="modal {{#if ../visible}}active{{/if}}">
              <div class="modal__content">
                <span class="modal__title">Добавить пользователя</span>
                <div class="find-user-input">
                    {{{InputLabeled
                        name='login'
                        label='Логин'
                        type='text'
                        withLabel=true
                        onInput=../onFindUsersInput
                        onBlur=../validateInput
                        onFocus=../validateInput
                    }}}
                    {{{Button
                        text='Поиск'
                        type='minor'
                        onClick=../findUsers
                    }}}
                </div>
                <div class="find-user-list">
                  {{#each ../findedUsers}}
                    <div class="find-user-list__el">
                        <span>{{this.login}} ({{this.id}})</span>
                        {{{Button
                            text='Добавить'
                            type='minor'
                            onClick=../../addUserToChat
                        }}}
                    </div>
                  {{/each}}
                    <div class="content__buttons">
                      {{{Button
                        text='Отменить'
                        type='minor'
                        onClick=../closeModal
                      }}}
                    </div>
                </div>
              </div>
          </div>
        {{/ifEquals}}
        {{#ifEquals is "change-chat-avatar"}}
            <div class="modal {{#if ../visible}}active{{/if}}">
              <div class="modal__content">
                <span class="modal__title">Изменить аватар</span>
                <form class="content__form" onsubmit="return false">
                    {{{InputLabeled
                        name='avatar'
                        type='file'
                    }}}
                </form>
                <div class="content__buttons">
                    {{{Button
                      text='Изменить'
                      type='primary'
                      onClick=../changeChatAvatar
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
        {{#ifEquals is "change-user-avatar"}}
            <div class="modal {{#if ../visible}}active{{/if}}">
              <div class="modal__content">
                <span class="modal__title">Изменить аватар</span>
                <form class="content__form" onsubmit="return false">
                    {{{InputLabeled
                        name='avatar'
                        type='file'
                    }}}
                </form>
                <div class="content__buttons">
                    {{{Button
                      text='Изменить'
                      type='primary'
                      onClick=../changeUserAvatar
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
        {{#ifEquals is "change-info"}}
          <div class="modal {{#if ../visible}}active{{/if}}">
            <div class="modal__content">
              <span class="modal__title">Изменить данные профиля</span>
              <form class="content__form" onsubmit="return false">
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
              <div class="content__buttons">
                  {{{Button
                    text='Применить'
                    type='primary'
                    onClick=../changeProfileInfo
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
        <div class="modal {{#if ../visible}}active{{/if}}">
            <div class="modal__content">
              <span class="modal__title">Изменить пароль</span>
              <form class="content__form" onsubmit="return false">
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
              <div class="content__buttons">
                {{{Button
                  text='Применить'
                  type='primary'
                  onClick=../changePassword
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
