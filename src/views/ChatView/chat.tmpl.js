import '../../index.scss'
import './chat.scss'

import chatList from '../../containers/Chat/ChatList/chatList'
import chatMessages from '../../containers/Chat/ChatMessages/chatMessages'

export default `
    <div class="chat-page-wrapper">
        ${chatList()}
        ${chatMessages()}
    </div>
`
