import ChatList from './chatList';
import { withStore } from '../../../utlils/store';
import { withRouter } from '../../../utlils/router';

const withChatsStore = withStore((state) => ({ chats: state.chats, selectedChatId: state.selectedChatId }));

export default withRouter(withChatsStore(ChatList));
