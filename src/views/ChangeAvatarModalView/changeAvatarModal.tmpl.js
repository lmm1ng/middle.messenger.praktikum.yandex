import './changeAvatarModal.scss'

import changeAvatarModal from '../../containers/Profile/modals/ChangeAvatarModal/changeAvatar'

export default `
    <div class="modal-wrapper">
        ${changeAvatarModal({visible: true})}
    </div>
`
