import Block from '../../utlils/block';

import './profile.scss';

import angleSvg from '../../assets/svg/angle-left.svg';
import penToSquareSvg from '../../assets/svg/pen-to-square.svg';
import AuthController from '../../controllers/AuthController';

import { IUser } from '../../api/UsersApi';
import { IWithRouterProps } from '../../utlils/router';

interface IProfileProps extends IWithRouterProps {
  user: IUser
}

export default class ProfileView extends Block {
  constructor(props: IProfileProps) {
    const changeInfoModalVisibility = () => {
      this.setProps({ isInfoModal: !this.props.isInfoModal });
    };
    const changePasswordModalVisibility = () => {
      this.setProps({ isPasswordModal: !this.props.isPasswordModal });
    };
    const changeAvatarModalVisibility = () => {
      this.setProps({ isAvatarModal: !this.props.isAvatarModal });
    };

    const goToChat = (): void => {
      props.router.go('/messenger');
    };
    const goToLogin = (): void => {
      AuthController.logout();
      props.router.go('/');
    };
    super({
      ...props,
      goToChat,
      goToLogin,
      changeInfoModalVisibility,
      changePasswordModalVisibility,
      changeAvatarModalVisibility,
    });
  }

  componentDidMount() {
    AuthController.fetchUser()
      .catch(() => {
        this.props.router.go('/');
      });
  }

  render() {
    return `
        <div class="profile-page-wrapper">
            {{{Modal
                is='change-user-avatar'
                visible=isAvatarModal
                onClose=changeAvatarModalVisibility
            }}}
            {{{Modal
                is='change-info'
                visible=isInfoModal
                onClose=changeInfoModalVisibility
            }}}
            {{{Modal
                is='change-password'
                visible=isPasswordModal
                onClose=changePasswordModalVisibility
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
                        src=user.avatar
                        onClick=changeAvatarModalVisibility
                    }}}
                    <span>{{ user.login }}</span>
                </div>
                <div class="content__info">
                    <div class="edit-info-button">
                        {{{ButtonImage
                            image='${penToSquareSvg}'
                            onClick=changeInfoModalVisibility
                        }}}
                    </div>
                    <div class="info-field">
                        <span class="info-field__label">Почта</span>
                        <span class="info-field__value">{{user.email}}</span>
                    </div>
                    <br/>
                    <div class="info-field">
                        <span class="info-field__label">Логин</span>
                        <span class="info-field__value">{{user.login}}</span>
                    </div>
                    <br/>
                    <div class="info-field">
                        <span class="info-field__label">Имя</span>
                        <span class="info-field__value">{{user.first_name}}</span>
                    </div>
                    <br/>
                    <div class="info-field">
                        <span class="info-field__label">Фамилия</span>
                        <span class="info-field__value">{{user.second_name}}</span>
                    </div>
                    <br/>
                    <div class="info-field">
                        <span class="info-field__label">Имя в чате</span>
                        <span class="info-field__value">{{user.display_name}}</span>
                    </div>
                    <br/>
                    <div class="info-field">
                        <span class="info-field__label">Телефон</span>
                        <span class="info-field__value">{{user.phone}}</span>
                    </div>
                    <br/>
                </div>
                <div class="content__buttons">
                    {{{Button
                        text='Изменить пароль'
                        type='minor'
                        onClick=changePasswordModalVisibility
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
