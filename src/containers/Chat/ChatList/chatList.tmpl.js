import './chatList.scss'
import '../../../index.scss'
import anchor from '../../../components/ui/anchor/anchor'
import input from '../../../components/ui/input/input'
import avatar from "../../../components/avatar/avatar";

import plusSvg from '../../../assets/svg/circle-plus.svg'

export default `
    <aside class="chat-list-wrapper">
        <header class="chat-list-wrapper__header">
            <div class="header__profile-link">
                ${anchor({text: 'Профиль'})}
            </div>
            <div class="header__chats-panel">
                <img src=${plusSvg} alt="create-chat">
                ${input({name: 'chat-search', placeholder: 'Поиск'})}
            </div>
        </header>
        <main class="chat-list-wrapper__content">
            {{#each chats}}
                <div class="chat-element {{#if this.selected}}chat-element--selected{{/if}}">
                    ${avatar({classes: 'chat-element__avatar'})}
                    <div class="chat-element__text">
                        <span class="text__name">{{this.name}}</span>
                        <span class="text__content">
                            {{#if this.lastMessage.isMy}}
                            <span class="text__content--my">Вы:</span>
                            {{/if}}
                            {{this.lastMessage.text}}
                        </span>
                    </div>
                    <span class="chat-element__time">{{this.lastMessage.date}}</span>
                    {{#if this.unreadCount}}
                    <span class="chat-element__unread-count">{{this.unreadCount}}</span>
                    {{/if}}
                </div>
            {{/each}}
        </main>
    </aside>
`
