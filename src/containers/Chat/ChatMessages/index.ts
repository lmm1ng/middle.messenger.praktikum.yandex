import ChatMessages from './chatMessages';
import { withStore } from '../../../utlils/store';
import { IChat } from '../../../api/ChatsApi';

const withChatsStore = withStore((state) => ({
  chats: state.chats,
  selected: (state.chats || []).find((chat: IChat) => chat.id === state.selectedChatId),
  messages: state.messages,
}));

export default withChatsStore(ChatMessages);
