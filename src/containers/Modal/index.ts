import Modal from './modal';
import { withStore } from '../../utlils/store';

const withFindedUsersStore = withStore((state) => ({ findedUsers: state.findedUsers }));

export default withFindedUsersStore(Modal);
