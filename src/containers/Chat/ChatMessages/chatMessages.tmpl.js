import './chatMessages.scss'

import textarea from "../../../components/ui/textarea/textarea";
import avatar from "../../../components/avatar/avatar";

import dotsSvg from '../../../assets/svg/dots.svg'
import clipSvg from '../../../assets/svg/paperclip.svg'
import emojiSvg from '../../../assets/svg/face-smile.svg'
import planeSvg from '../../../assets/svg/paper-plane.svg'
import readSvg from '../../../assets/svg/read-message.svg'

export default `
    <div class="chat-messages-wrapper">
        <header class="chat-messages-wrapper__header">
            <div class="header__profile">
                ${avatar({classes: 'profile__avatar'})}
                <span class="profile__name">{{title}}</span>
            </div>
            <div class="header__dropdown dropdown">
                <img src="${dotsSvg}" alt="dots"/>
            </div>
        </header>
        <main class="chat-messages-wrapper__content">
            {{#each messages}}
            <div class="content day-wrapper">
                <span class="day-wrapper__title">{{this.day}}</span>
                <div class="messages-wrapper">
                    {{#each this.array}}
                    <div class="messages-wrapper__message {{#if this.isMy}}my{{/if}}">
                        <span>{{this.text}}</span>
                        <div class="message__meta">
                            {{#if this.read}}
                            <img src=${readSvg} alt="readed">
                            {{/if}}
                            <span class="message__meta__date">{{this.date}}</span>
                        </div>
                    </div>
                    {{/each}}
                </div>
            </div>
            {{/each}}
        </main>
        <footer class="chat-messages-wrapper__footer">
            <img src="${clipSvg}" alt="clip">
            <div class="message-input">
                ${textarea({rows: 2, name: 'message'})}
            </div>
            <img src="${emojiSvg}" alt="emoji">
            <img src="${planeSvg}" alt="send">
        </footer>
    </div>
`
