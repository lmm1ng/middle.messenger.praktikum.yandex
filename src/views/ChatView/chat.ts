import Block from '../../utlils/block';

import './chat.scss';

import registerComponent from '../../utlils/registerComponent';

import AuthController from '../../controllers/AuthController';
import ChatsController from '../../controllers/ChatsController';

import ChatList from '../../containers/Chat/ChatList';
import ChatMessages from '../../containers/Chat/ChatMessages';
import store from '../../utlils/store';

registerComponent(ChatList, 'ChatList');
registerComponent(ChatMessages, 'ChatMessages');

export default class ChatView extends Block {
  componentDidMount() {
    if (!store.getState().user) {
      AuthController.fetchUser()
        .catch(() => {
          this.props.router.go('/');
        });
    }
    ChatsController.getChats();
  }

  render() {
    return `
      <div class="chat-page-wrapper">
        {{{ChatList}}}
        {{{ChatMessages}}}
      </div>
      `;
  }
}
