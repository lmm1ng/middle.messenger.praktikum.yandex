import Block from '../../../utlils/block';
import './chatList.scss';
import '../../../index.scss';

import plusSvg from '../../../assets/svg/circle-plus.svg';

interface IChat {
  name: string,
  selected: boolean,
  unreadCount: number,
  lastMessage: {
    text: string,
    isMy: boolean,
    date: string
  }
}

export default class ChatList extends Block {
  constructor() {
    const chats: Array<IChat> = [
      {
        name: 'Андрей',
        selected: false,
        unreadCount: 1,
        lastMessage: {
          text: 'С учётом сложившейся международной обстановки, существующая теория',
          isMy: false,
          date: '10:00',
        },
      },
      {
        name: 'Витя',
        selected: true,
        unreadCount: 0,
        lastMessage: {
          text: 'Да уж',
          isMy: true,
          date: '07:20',
        },
      },
      {
        name: 'Дима',
        selected: false,
        unreadCount: 0,
        lastMessage: {
          text: 'Здарова',
          isMy: false,
          date: 'Пт',
        },
      },
      {
        name: 'Саня',
        selected: false,
        unreadCount: 0,
        lastMessage: {
          text: 'Когда сотку вернешь?',
          isMy: true,
          date: '1 Мая 2022',
        },
      },
      {
        name: 'Яндекс',
        selected: false,
        unreadCount: 0,
        lastMessage: {
          text: 'Го оффер?',
          isMy: false,
          date: '1 Апреля 2022',
        },
      },
    ];
    super({ chats });
  }

  render() {
    return `
    <aside class="chat-list-wrapper">
        <header class="chat-list-wrapper__header">
            <div class="header__profile-link">
                {{{Anchor
                    text='Профиль'
                    href='/profile'
                }}}
            </div>
            <div class="header__chats-panel">
                <img src=${plusSvg} alt="create-chat">
                {{{InputLabeled
                    name='chat-search'
                    placeholder='Поиск'
                }}}
            </div>
        </header>
        <main class="chat-list-wrapper__content">
            {{#each chats}}
                <div class="chat-element {{#if this.selected}}chat-element--selected{{/if}}">
                    {{{Avatar
                        classes='chat-element__avatar'
                    }}}
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
`;
  }
}
