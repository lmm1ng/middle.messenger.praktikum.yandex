import LoginView from './views/LoginView/login';
import RegistrationView from './views/RegistrationView';
import ChatView from './views/ChatView';
import ProfileView from './views/ProfileView';
import Error404View from './views/404View';
import Error500View from './views/500View';

import registerComponent from './utlils/registerComponent';
import InputLabeled from './components/ui/inputLabeled';
import Anchor from './components/ui/anchor';
import Button from './components/ui/button';
import Avatar from './components/avatar';
import Textarea from './components/ui/textarea';
import ButtonImage from './components/ui/buttonImage';
import Router from './utlils/router';

import Modal from './containers/Modal';

const registerKitComponents = (): void => {
  registerComponent(InputLabeled, 'InputLabeled');
  registerComponent(Anchor, 'Anchor');
  registerComponent(Button, 'Button');
  registerComponent(Avatar, 'Avatar');
  registerComponent(Textarea, 'Textarea');
  registerComponent(ButtonImage, 'ButtonImage');
  registerComponent(Modal, 'Modal');
};
document.addEventListener('DOMContentLoaded', () => {
  registerKitComponents();
  const router = new Router();
  router
    .use('/', LoginView)
    .use('/sign-up', RegistrationView)
    .use('/settings', ProfileView)
    .use('/messenger', ChatView)
    .use('/404', Error404View)
    .use('/500', Error500View);
  router.start();
});
