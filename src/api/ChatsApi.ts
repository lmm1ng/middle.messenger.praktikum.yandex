import BaseApi from './BaseApi';

export interface ICreateChatData {
  title: string
}

export interface IChat {
  id: number,
  title: string,
  created_by: number,
  last_message: {
    user: {
      first_name: string,
      second_name: string,
      avatar: string | null,
      email: string,
      login: string,
      phone: string
    },
    time: string,
    content: string,
  } | null,
  unread_count: number,
  avatar: string | null,
}

export default class ChatsApi extends BaseApi {
  constructor() {
    super('/chats');
  }

  getChats(title: string): Promise<IChat[]> {
    return this.http.get('/', { data: { title } });
  }

  createChat(data: ICreateChatData) {
    return this.http.post('/', { data });
  }

  addUserToChat(userId: number, chatId: number) {
    return this.http.put('/users', { data: { users: [userId], chatId } });
  }

  getChatUsers(chatId: number) {
    return this.http.get(`/${chatId}/users`);
  }

  deleteUserFromChat(userId: number, chatId: number) {
    return this.http.delete('/users', { data: { users: [userId], chatId } });
  }

  changeChatAvatar(data: FormData): Promise<{ avatar: string, id: number, title: string, created_by: number }> {
    return this.http.put('/avatar', { data, isFormData: true });
  }

  deleteChat(chatId: number) {
    return this.http.delete('/', { data: { chatId } });
  }

  getChatToken(chatId: number): Promise<{ token: string}> {
    return this.http.post(`/token/${chatId}`);
  }

  create = undefined;

  update = undefined;

  delete = undefined;

  read = undefined;
}
