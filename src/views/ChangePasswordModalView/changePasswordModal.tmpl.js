import './changePasswordModal.scss'

import changePasswordModal from '../../containers/Profile/modals/ChangePasswordModal/changePassword'

export default `
    <div class="modal-wrapper">
        ${changePasswordModal({visible: true})}
    </div>
`
