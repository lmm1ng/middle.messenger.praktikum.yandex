import LoginView from './views/LoginView/login';
import RegistrationView from './views/RegistrationView';
import ChatView from './views/ChatView';
import ProfileView from './views/ProfileView';
import Block from './utlils/block';

const doRender = (Component: Block): void => {
  const root = document.querySelector('#root');
  if (root) {
    root.innerHTML = '';
    root.appendChild(Component.getContent() as Node);
  }
};

const navigate = (path: string) => {
  switch (path) {
    case '/':
      window.location.href = '/login';
      break;
    case '/login':
      doRender(new LoginView());
      break;
    case '/registration':
      doRender(new RegistrationView());
      break;
    case '/chat':
      doRender(new ChatView());
      break;
    case '/profile':
      doRender(new ProfileView());
      break;
    default:
      throw new Error('');
  }
};

document.addEventListener('DOMContentLoaded', () => {
  navigate(window.location.pathname);
});
