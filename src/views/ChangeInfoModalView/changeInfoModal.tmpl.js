import './changeInfoModal.scss'

import changeInfoModal from '../../containers/Profile/modals/ChangeInfoModal/changeInfo'

export default `
    <div class="modal-wrapper">
        ${changeInfoModal({visible: true})}
    </div>
`
