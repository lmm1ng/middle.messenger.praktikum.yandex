import Block from '../../../../utlils/block';
import './chat.scss';
import { IChat } from '../../../../api/ChatsApi';

interface IChatProps {
  chat: IChat,
  onClick: (chatId: number) => void,
  selectedChatId: number | null
}

export default class Chat extends Block {
  constructor({ onClick, ...props }: IChatProps) {
    const isCurrentChatSelected = props.selectedChatId === props.chat.id;
    super({ ...props, events: { click: () => onClick(props.chat.id) }, isCurrentChatSelected });
  }

  render() {
    return `
      <div class="chat-element {{#if isCurrentChatSelected}}chat-element--selected{{/if}}">
          {{{Avatar
              classes='chat-element__avatar'
              src=chat.avatar
          }}}
          <div class="chat-element__text">
              <span class="text__name">{{chat.title}}</span>
              <span class="text__content">
                  {{chat.last_message.content}}
              </span>
          </div>
          <span class="chat-element__time">{{chat.last_message.time}}</span>
          {{#if chat.unread_count}}
          <span class="chat-element__unread-count">{{chat.unread_count}}</span>
          {{/if}}
      </div>
    `;
  }
}
