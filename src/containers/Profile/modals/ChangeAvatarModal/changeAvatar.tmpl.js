import input from '../../../../components/ui/input/input'
import button from '../../../../components/ui/button/button';

import '../modal.scss'

export default `
    <div class="change-avatar__modal modal {{#if visible}}active{{/if}}">
        <div class="change-avatar__modal__wrapper modal__content">
            <span class="modal__title">Изменить аватар</span>
            <form class="change-avatar__form content__form">
                ${input({name: 'avatar', type: 'file'})}       
            </form>
            <div class="change-avatar__buttons content__buttons">
                ${button({text: 'Применить', type: 'primary'})}
            </div>
        </div>
    </div>
`
