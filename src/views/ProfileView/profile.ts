import Block from '../../utlils/block';

import './profile.scss';

import ProfileModal from '../../containers/Profile/modal';
import registerComponent from '../../utlils/registerComponent';

import angleSvg from '../../assets/svg/angle-left.svg';
import penToSquareSvg from '../../assets/svg/pen-to-square.svg';

registerComponent(ProfileModal, 'ProfileModal');

interface IField {
    label: string,
    value: string
}

export default class ProfileView extends Block {
  constructor() {
    const infoFields: Array<IField> = [
      {
        label: 'Почта',
        value: 'example@yandex.ru',
      },
      {
        label: 'Логин',
        value: 'example.name',
      },
      {
        label: 'Имя',
        value: 'Firstname',
      },
      {
        label: 'Фамилия',
        value: 'Secondname',
      },
      {
        label: 'Имя в чате',
        value: 'My chat name',
      },
      {
        label: 'Телефон',
        value: '+7999999999',
      },
    ];

    let isChangeInfoModal = false;
    const openChangeInfoModal = (): void => {
      isChangePasswordModal = false;
      isChangeAvatarModal = false;
      isChangeInfoModal = true;
      this.setProps({ isChangeInfoModal, isChangePasswordModal });
    };

    let isChangePasswordModal = false;
    const openChangePasswordModal = (): void => {
      isChangeInfoModal = false;
      isChangeAvatarModal = false;
      isChangePasswordModal = true;
      this.setProps({ isChangePasswordModal, isChangeInfoModal });
    };

    let isChangeAvatarModal = false;
    const openChangeAvatarModal = (): void => {
      isChangeInfoModal = false;
      isChangePasswordModal = false;
      isChangeAvatarModal = true;
      this.setProps({ isChangeAvatarModal, isChangePasswordModal, isChangeInfoModal });
    };

    const goToChat = (): void => {
      window.location.href = '/chat';
    };
    const goToLogin = (): void => {
      window.location.href = '/login';
    };
    super({
      infoFields,
      isChangeInfoModal,
      openChangeInfoModal,
      isChangePasswordModal,
      openChangePasswordModal,
      isChangeAvatarModal,
      openChangeAvatarModal,
      goToChat,
      goToLogin,
    });
  }

  render() {
    return `
        <div class="profile-page-wrapper">
            {{{ProfileModal
                is='change-info'
                visible=isChangeInfoModal
            }}}
            {{{ProfileModal
                is='change-password'
                visible=isChangePasswordModal
            }}}
            {{{ProfileModal
                is='change-avatar'
                visible=isChangeAvatarModal
            }}}
            <aside class="profile-page-wrapper__aside">
                {{{ButtonImage
                    image='${angleSvg}'
                    onClick=goToChat
                }}}
            </aside>    
            <main class="profile-page-wrapper__content">
                <div class="content__avatar">
                    {{{Avatar
                        big=true
                        pointer=true
                        onClick=openChangeAvatarModal
                    }}}
                    <span>Вася</span>
                </div>
                <div class="content__info">
                    <div class="edit-info-button">
                        {{{ButtonImage
                            image='${penToSquareSvg}'
                            onClick=openChangeInfoModal
                        }}}
                    </div>
                    {{#each infoFields}}
                    <div class="info-field">
                        <span class="info-field__label">{{this.label}}</span>
                        <span class="info-field__value">{{this.value}}</span>
                    </div>
                    <br/>
                    {{/each}}
                </div>
                <div class="content__buttons">
                    {{{Button
                        text='Изменить пароль'
                        type='minor'
                        onClick=openChangePasswordModal
                    }}}
                    {{{Button
                        text='Выйти'
                        type='danger'
                        onClick=goToLogin
                    }}}
                </div>
            </main>
        </div>
    `;
  }
}
