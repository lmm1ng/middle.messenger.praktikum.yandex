import Block from '../../utlils/block';

import './chat.scss';

import registerComponent from '../../utlils/registerComponent';

import ChatList from '../../containers/Chat/ChatList';
import ChatMessages from '../../containers/Chat/ChatMessages';

registerComponent(ChatList, 'ChatList');
registerComponent(ChatMessages, 'ChatMessages');

export default class ChatView extends Block {
  render() {
    return `
      <div class="chat-page-wrapper">
        {{{ChatList}}}
        {{{ChatMessages}}}
      </div>
      `;
  }
}
