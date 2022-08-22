import Handlebars from 'handlebars'
import template from './chatList.tmpl'

const store = {
    chats: [
        {
            name: 'Андрей',
            selected: false,
            unreadCount: 1,
            lastMessage: {
                text: 'С учётом сложившейся международной обстановки, существующая теория',
                isMy: false,
                date: '10:00'
            }
        },
        {
            name: 'Витя',
            selected: true,
            unreadCount: 0,
            lastMessage: {
                text: 'Да уж',
                isMy: true,
                date: '07:20'
            }
        },
        {
            name: 'Дима',
            selected: false,
            unreadCount: 0,
            lastMessage: {
                text: 'Здарова',
                isMy: false,
                date: 'Пт'
            }
        },
        {
            name: 'Саня',
            selected: false,
            unreadCount: 0,
            lastMessage: {
                text: 'Когда сотку вернешь?',
                isMy: true,
                date: '1 Мая 2022'
            }
        },
        {
            name: 'Яндекс',
            selected: false,
            unreadCount: 0,
            lastMessage: {
                text: 'Го оффер?',
                isMy: false,
                date: '1 Апреля 2022'
            }
        }
    ]
}

export default () => Handlebars.compile(template)({chats: store.chats})
