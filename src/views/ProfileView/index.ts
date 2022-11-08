import ProfileView from './profile';
import { withStore } from '../../utlils/store';
import { withRouter } from '../../utlils/router';

const withUserStore = withStore((state) => ({ user: state.user || 'kek' }));

export default withRouter(withUserStore(ProfileView));
