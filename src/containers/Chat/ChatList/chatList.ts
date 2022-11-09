import Block from '../../../utlils/block';
import './chatList.scss';

import plusSvg from '../../../assets/svg/circle-plus.svg';

import Chat from './Chat';
import registerComponent from '../../../utlils/registerComponent';
import ChatsController from '../../../controllers/ChatsController';

registerComponent(Chat, 'Chat');

export default class ChatList extends Block {
  constructor() {
    const changeCreateChatModalVisibility = () => {
      this.setProps({ isCreateChatModal: !this.props.isCreateChatModal });
    };

    const onChatClick = (chatId: number) => {
      ChatsController.selectChat(chatId);
    };

    let inputValue = '';
    const onInput = (e: InputEvent) => {
      inputValue = ((e.target as HTMLInputElement).value);
    };

    // It is impossible to create dynamic input in our realisation, so let's go filter by click
    const searchChats = () => {
      ChatsController.getChats(inputValue)
        .catch((e) => {
          console.log(e.reason || 'Error');
        });
      inputValue = '';
    };

    super({
      changeCreateChatModalVisibility,
      onChatClick,
      onInput,
      searchChats,
    });
  }

  render() {
    return `
    <aside class="chat-list-wrapper">
        {{{Modal
            is='create-chat'
            visible=isCreateChatModal
            onClose=changeCreateChatModalVisibility
        }}}
        <header class="chat-list-wrapper__header">
            <div class="header__profile-link">
                {{{Anchor
                    text='Профиль'
                    href='/settings'
                }}}
            </div>
            <div class="header__chats-panel">
                {{{ButtonImage
                    image='${plusSvg}'
                    onClick=changeCreateChatModalVisibility
                }}}
                {{{InputLabeled
                    name='chat-search'
                    onInput=onInput
                    placeholder='Название чата'
                }}}
                {{{Button
                  text='Поиск'
                  type='minor'
                  onClick=searchChats
                }}}
            </div>
        </header>
        <main class="chat-list-wrapper__content">
            <div class="scroll-container">
                {{#each chats}}
                    {{{Chat
                        chat=this
                        selectedChatId=../selectedChatId
                        onClick=../onChatClick
                    }}}
            {{/each}}
            </div>
        </main>
    </aside>
`;
  }
}
