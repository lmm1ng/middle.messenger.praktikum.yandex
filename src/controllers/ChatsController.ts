import ChatsApi, { IChat, ICreateChatData } from '../api/ChatsApi';
import store from '../utlils/store';

interface IMessage {
  chat_id: number
  content: string
  file: File | null
  id: number
  is_read: boolean
  time: string
  type: string
  user_id: number
}

class ChatController {
  private api: ChatsApi;

  constructor() {
    this.api = new ChatsApi();
  }

  getChats(title: string = '') {
    return this.api.getChats(title)
      .then((response) => {
        store.set('chats', response.map((chat: IChat) => ({
          ...chat,
          last_message: {
            ...chat.last_message,
            time: chat.last_message?.time ? new Date(chat.last_message?.time).toDateString() : '',
          },
        })));
      });
  }

  createChat(requestData: ICreateChatData) {
    return this.api.createChat(requestData)
      .then(() => this.getChats());
  }

  selectChat(id: number | null) {
    store.set('selectedChatId', id);
    store.set('messages', null);
    if (store.getState().socket) {
      store.getState().socket.close();
      store.set('socket', null);
    }
    if (id) {
      this.api.getChatToken(id).then((response) => {
        this.buildChatSocket(response.token);
      });
    }
  }

  addUserToChat(id: number) {
    return this.api.addUserToChat(id, store.getState().selectedChatId)
      .then(() => {
        store.set('findedUsers', []);
      });
  }

  deleteUserFromChat(id: number) {
    return this.api.deleteUserFromChat(id, store.getState().selectedChatId)
      .then(() => {
        store.set('findedUsers', []);
      });
  }

  getChatUsers() {
    return this.api.getChatUsers(store.getState().selectedChatId)
      .then((response) => {
        store.set('findedUsers', response);
      });
  }

  changeChatAvatar(avatar: File) {
    const formData = new FormData();
    formData.append('chatId', store.getState().selectedChatId);
    formData.append('avatar', avatar);
    return this.api.changeChatAvatar(formData).then((response) => {
      store.set('chats', store.getState().chats.map((chat: IChat) => {
        if (chat.id === response.id) {
          return { ...chat, avatar: response.avatar };
        }
        return chat;
      }));
    });
  }

  deleteChat() {
    return this.api.deleteChat(store.getState().selectedChatId)
      .then(() => {
        store.set('chats', store.getState().chats.filter((chat: IChat) => chat.id !== store.getState().selectedChatId));
        store.set('selectedChatId', null);
      });
  }

  private buildChatSocket(token: string) {
    const socket = new WebSocket(`wss://ya-praktikum.tech/ws/chats/${store.getState().user.id}/${store.getState().selectedChatId}/${token}`);
    store.set('socket', socket);

    socket.addEventListener('open', () => {
      socket.send(JSON.stringify({
        content: '0',
        type: 'get old',
      }));
    });

    socket.addEventListener('message', (event) => {
      const data: IMessage | IMessage[] = JSON.parse(event.data);
      if (Array.isArray(data)) {
        store.set('messages', data.map((el) => ({ ...el, time: new Date(el.time).toDateString(), isMy: el.user_id === store.getState().user.id })));
      } else {
        if (data.type === 'user connected') {
          return;
        }
        store.set('messages', [{ ...data, time: new Date(data.time).toDateString(), isMy: data.user_id === store.getState().user.id }, ...store.getState().messages]);
      }
    });
  }

  sendMessage(message: string) {
    if (!store.getState().socket) {
      return;
    }
    store.getState().socket.send(JSON.stringify({
      content: message,
      type: 'message',
    }));
  }
}

export default new ChatController();
