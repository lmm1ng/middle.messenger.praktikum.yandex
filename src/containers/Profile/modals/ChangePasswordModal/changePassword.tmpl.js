import input from '../../../../components/ui/input/input'
import button from '../../../../components/ui/button/button';

import '../modal.scss'

export default `
    <div class="change-password__modal modal {{#if visible}}active{{/if}}">
        <div class="change-password__modal__wrapper modal__content">
            <span class="modal__title">Изменить пароль</span>
            <form class="change-password__form content__form">
                ${input({ label: 'Старый пароль', name: 'oldPassword', type: 'password', withLabel: true})}
                ${input({ label: 'Пароль', name: 'newPassword', type: 'password', withLabel: true})}        
                ${input({ label: 'Повторите пароль', name: 'repeatNewPassword', type: 'password', withLabel: true})}        
            </form>
            <div class="change-password__buttons content__buttons">
                ${button({text: 'Применить', type: 'primary'})}             
                ${button({text: 'Отменить', type: 'minor'})}
            </div>
        </div>
    </div>
`
