import './registration.scss'
import '../../index.scss'

import input from '../../components/ui/input/input'
import button from '../../components/ui/button/button'
import anchor from '../../components/ui/anchor/anchor'

export default `
    <div class="registration-page-wrapper">
        <div class="registration-page-content">
            <span class="registration-page-content__title">Регистрация</span>
            <div class="registration-page-content__card">
                <form class="registration-form">
                    ${input({ label: 'Почта', name: 'email', withLabel: true})}
                    ${input({ label: 'Логин', name: 'login', withLabel: true})}
                    ${input({ label: 'Имя', name: 'first_name', withLabel: true})}
                    ${input({ label: 'Фамилия', name: 'second_name', withLabel: true})}
                    ${input({ label: 'Телефон', name: 'phone', withLabel: true})}
                    ${input({ label: 'Пароль', name: 'password', type: 'password', withLabel: true})}        
                    ${input({ label: 'Повторите пароль', name: 'repeat-password', type: 'password', withLabel: true})}        
                </form>
                <div class="registration-buttons">
                    ${button({text: 'Зарегистрироваться', type: 'primary'})}             
                    ${anchor({text: 'Войти'})}
                </div>
            </div>
        </div>
    </div>
`
