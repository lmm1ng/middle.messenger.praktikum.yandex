import Block from '../../../utlils/block';
import './chatMessages.scss';

import { validateInput } from '../../../utlils/validation';

import dotsSvg from '../../../assets/svg/dots.svg';
import clipSvg from '../../../assets/svg/paperclip.svg';
import emojiSvg from '../../../assets/svg/face-smile.svg';
import planeSvg from '../../../assets/svg/paper-plane.svg';
import readSvg from '../../../assets/svg/read-message.svg';

interface IMessage {
  day: string,
  array: Array<{text: string, date: string, isMy: boolean, read: boolean}>
}
interface IChatMessages {
  withWhom: string,
  messages: Array<IMessage>
}

export default class ChatMessages extends Block {
  constructor() {
    const chatMessages: IChatMessages = {
      withWhom: 'Витя',
      messages: [
        {
          day: '7 Августа',
          array: [
            {
              text: 'Да уж',
              date: '7:20',
              isMy: true,
              read: true,
            },
            {
              text: 'Перебрали мы вчера...',
              date: '7:20',
              isMy: false,
              read: false,
            },
          ],
        },
        {
          day: '6 Августа',
          array: [
            {
              text: 'Для современного мира существующая теория играет определяющее значение для своевременного выполнения сверхзадачи.'
                  + 'Высокий уровень вовлечения представителей целевой аудитории является четким доказательством простого факта:'
                  + 'начало повседневной работы по формированию позиции прекрасно подходит для реализации системы обучения кадров, соответствующей насущным потребностям.',
              date: '7:20',
              isMy: true,
              read: true,
            },
            {
              text: 'Также как граница обучения кадров позволяет выполнить важные задания по разработке анализа существующих паттернов поведения.'
                  + 'Господа, новая модель организационной деятельности требует анализа поэтапного и последовательного развития общества.',
              date: '7:20',
              isMy: false,
              read: false,
            },
          ],
        },
      ],
    };
    super({ title: chatMessages.withWhom, messages: chatMessages.messages, validateInput });
  }

  render() {
    return `
        <div class="chat-messages-wrapper">
        <header class="chat-messages-wrapper__header">
            <div class="header__profile">
               {{{Avatar
                  classes='profile__avatar'
               }}}
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
                {{{Textarea
                    rows=2
                    name='message'
                    onBlur=validateInput
                    onFocus=validateInput
                }}}
            </div>
            <img src="${emojiSvg}" alt="emoji">
            <img src="${planeSvg}" alt="send">
        </footer>
    </div>
`;
  }
}
