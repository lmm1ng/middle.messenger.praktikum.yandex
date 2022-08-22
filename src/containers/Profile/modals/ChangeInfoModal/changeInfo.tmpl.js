import input from '../../../../components/ui/input/input'
import button from '../../../../components/ui/button/button';

import '../modal.scss'

export default `
    <div class="change-info__modal modal {{#if visible}}active{{/if}}">
        <div class="change-info__modal__wrapper modal__content">
            <span class="modal__title">Изменить данные профиля</span>
            <form class="change-info__form content__form">
                ${input({ label: 'Почта', name: 'email', withLabel: true})}
                ${input({ label: 'Логин', name: 'login', withLabel: true})}        
                ${input({ label: 'Имя', name: 'first_name', withLabel: true})}        
                ${input({ label: 'Фамилия', name: 'second_name', withLabel: true})}        
                ${input({ label: 'Имя в чате', name: 'display_name', withLabel: true})}        
                ${input({ label: 'Телефон', name: 'phone', withLabel: true})}        
            </form>
            <div class="change-info__buttons content__buttons">
                ${button({text: 'Применить', type: 'primary'})}             
                ${button({text: 'Отменить', type: 'minor'})}
            </div>
        </div>
    </div>
`
