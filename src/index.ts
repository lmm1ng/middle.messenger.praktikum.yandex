import LoginView from './views/LoginView/login';
import RegistrationView from './views/RegistrationView';
import ChatView from './views/ChatView';
import ProfileView from './views/ProfileView';
import Error404View from './views/404View';
import Error500View from './views/500View';
import Block from './utlils/block';

import registerComponent from './utlils/registerComponent';
import InputLabeled from './components/ui/inputLabeled';
import Anchor from './components/ui/anchor';
import Button from './components/ui/button';
import Avatar from './components/avatar';
import Textarea from './components/ui/textarea';
import ButtonImage from './components/ui/buttonImage';

const registerKitComponents = (): void => {
  registerComponent(InputLabeled, 'InputLabeled');
  registerComponent(Anchor, 'Anchor');
  registerComponent(Button, 'Button');
  registerComponent(Avatar, 'Avatar');
  registerComponent(Textarea, 'Textarea');
  registerComponent(ButtonImage, 'ButtonImage');
};

const doRender = (Component: Block): void => {
  const root = document.querySelector('#root');
  if (root) {
    root.innerHTML = '';
    root.appendChild(Component.getContent() as Node);
  }
};

const navigate = (path: string): void => {
  registerKitComponents();
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
    case '/404':
      doRender(new Error404View());
      break;
    case '/500':
      doRender(new Error500View());
      break;
    default:
      window.location.href = '/404';
      break;
  }
};

document.addEventListener('DOMContentLoaded', () => {
  navigate(window.location.pathname);
});
