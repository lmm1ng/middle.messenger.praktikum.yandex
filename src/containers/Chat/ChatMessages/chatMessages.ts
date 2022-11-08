import Block from '../../../utlils/block';
import './chatMessages.scss';

import { validateInput } from '../../../utlils/validation';

import clipSvg from '../../../assets/svg/paperclip.svg';
import emojiSvg from '../../../assets/svg/face-smile.svg';
import planeSvg from '../../../assets/svg/paper-plane.svg';
import readSvg from '../../../assets/svg/read-message.svg';
import dotsSvg from '../../../assets/svg/dots.svg';

import ChatsController from '../../../controllers/ChatsController';

import registerComponent from '../../../utlils/registerComponent';
import ChatSettingsElement from './ChatSettingsElement';

registerComponent(ChatSettingsElement, 'ChatSettingsElement');

interface IChatSetting {
  text: string,
  danger: boolean,
  onClick: () => void
}

export default class ChatMessages extends Block {
  constructor() {
    const changeDropdownVisibility = () => {
      this.setProps({ isSettingsDropdown: !this.props.isSettingsDropdown });
    };

    const changeAddUserModalVisibility = () => {
      this.setProps({ isAddUserModal: !this.props.isAddUserModal });
    };

    const changeDeleteModalVisibility = () => {
      this.setProps({ isDeleteUserModal: !this.props.isDeleteUserModal });
    };
    const changeAvatarModalVisibility = () => {
      this.setProps({ isAvatarModal: !this.props.isAvatarModal });
    };

    const chatSettings: IChatSetting[] = [
      {
        text: 'Добавить пользователя',
        danger: false,
        onClick: () => {
          changeDropdownVisibility();
          changeAddUserModalVisibility();
        },
      },
      {
        text: 'Удалить пользователя',
        danger: false,
        onClick: () => {
          ChatsController.getChatUsers()
            .then(() => {
              changeDropdownVisibility();
              changeDeleteModalVisibility();
            })
            .catch((e) => {
              console.log(e.reason || 'Error');
            });
        },
      },
      {
        text: 'Изменить аватар',
        danger: false,
        onClick: () => {
          changeDropdownVisibility();
          changeAvatarModalVisibility();
        },
      },
      {
        text: 'Удалить чат',
        danger: true,
        onClick: () => {
          ChatsController.deleteChat()
            .then(() => {
              changeDropdownVisibility();
            })
            .catch((e) => {
              console.log(e.reason || 'Error');
            });
        },
      },
    ];
    let messageValue = '';
    const onMessageInput = (e: InputEvent) => {
      messageValue = ((e.target as HTMLInputElement).value);
    };

    const sendMessage = () => {
      if (messageValue) {
        ChatsController.sendMessage(messageValue);
      }
    };
    super({
      validateInput,
      changeDropdownVisibility,
      changeAddUserModalVisibility,
      changeDeleteModalVisibility,
      changeAvatarModalVisibility,
      chatSettings,
      onMessageInput,
      sendMessage,
    });
  }

  render() {
    return `
        <div class="chat-messages-wrapper">
            {{{Modal
                is='add-user'
                visible=isAddUserModal
                onClose=changeAddUserModalVisibility
            }}}
            {{{Modal
                is='delete-user'
                visible=isDeleteUserModal
                onClose=changeDeleteModalVisibility
            }}}
            {{{Modal
                is='change-chat-avatar'
                visible=isAvatarModal
                onClose=changeAvatarModalVisibility
            }}}
            {{#if selected}}
                <header class="chat-messages-wrapper__header">
                    <div class="header__profile">
                        {{{Avatar
                            classes='profile__avatar'
                            src=selected.avatar
                        }}}
                        <span class="profile__name">{{ selected.title }}</span>
                    </div>
                    <div class="header__settings">
                        {{{ButtonImage
                            image='${dotsSvg}'
                            onClick=changeDropdownVisibility
                        }}}
                        <div class="settings-dropdown {{#if isSettingsDropdown}}settings-dropdown--visible{{/if}}">
                            {{#each chatSettings}}
                                {{{ChatSettingsElement
                                    text=this.text
                                    danger=this.danger
                                    onClick=this.onClick
                                }}}
                            {{/each}}
                        </div>
                    </div>
                </header>
                <main class="chat-messages-wrapper__content">
                    <div class="messages-wrapper">
                        {{#each messages}}
                        <div class="messages-wrapper__message {{#if this.isMy}}my{{/if}}">
                            <span>{{this.content}}</span>
                            <div class="message__meta">
                                {{#if this.is_read}}
                                <img src=${readSvg} alt="readed">
                                {{/if}}
                                <span class="message__meta__date">{{this.time}}</span>
                            </div>
                        </div>
                        {{/each}}
                    </div>
                </main>
                <footer class="chat-messages-wrapper__footer">
                    <img src="${clipSvg}" alt="clip">
                    <div class="message-input">
                        {{{Textarea
                            rows=2
                            name='message'
                            onBlur=validateInput
                            onFocus=validateInput
                            onInput=onMessageInput
                        }}}
                    </div>
                    <img src="${emojiSvg}" alt="emoji">
                    {{{ButtonImage
                        image='${planeSvg}'
                        onClick=sendMessage
                    }}}
                </footer>
        {{else}}
            <span class="no-chat-placeholder">Выберите чат...</span>
        {{/if}}
      </div>
`;
  }
}
