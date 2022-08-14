import './login.scss'
import '../../index.scss'

import input from '../../components/ui/input/input'
import button from '../../components/ui/button/button'
import anchor from '../../components/ui/anchor/anchor'

export default `
    <div class="login-page-wrapper">
        <div class="login-page-content">
            <span class="login-page-content__title">Вход</span>
            <div class="login-page-content__card">
                <form class="login-form">
                    ${input({ label: 'Логин', name: 'login', withLabel: true})}
                    ${input({ label: 'Пароль', name: 'password', type: 'password', withLabel: true})}        
                </form>
                <div class="login-buttons">
                    ${button({text: 'Войти', type: 'primary'})}             
                    ${anchor({text: 'Нет аккаунта?'})}
                </div>
            </div>
        </div>
    </div>
`
