import Handlebars from 'handlebars'
import template from './chat.tmpl'

const store = {
    chats: [
        {
            name: 'Андрей',
            selected: true,
            unreadCount: 1,
            messages: [
                {
                    text: 'kek',
                    date: '7:20',
                    my: false
                }
            ]
        }
    ]
}

const target = document.getElementById('root')
target.innerHTML = Handlebars.compile(template)({chats: store.chats})
