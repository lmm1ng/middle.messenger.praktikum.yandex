import './profile.scss'
import '../../index.scss'

import angleSvg from '../../assets/svg/angle-left.svg'
import penToSquareSvg from '../../assets/svg/pen-to-square.svg'

import avatar from '../../components/avatar/avatar';
import button from '../../components/ui/button/button';

// import changeAvatarModal from '../../containers/Profile/modals/ChangeAvatarModal/changeAvatar'
// import changeInfoModal from '../../containers/Profile/modals/ChangeInfoModal/changeInfo'
// import changePasswordModal from '../../containers/Profile/modals/ChangePasswordModal/changePassword'

export default `
    <div class="profile-page-wrapper">
        <aside class="profile-page-wrapper__aside">
            <img src=${angleSvg} alt="back">
        </aside>
        <main class="profile-page-wrapper__content">
            <div class="content__avatar">
                ${avatar({big: true})}
                <span>Вася</span>
            </div>
            <div class="content__info">
                <div class="edit-info-button">
                    <img src=${penToSquareSvg} alt="">
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
                ${button({text: 'Изменить пароль', type: 'minor'})}
                ${button({text: 'Выйти', type: 'danger'})}
            </div>
        </main>
    </div>
`
