import Handlebars from 'handlebars'
import template from './profile.tmpl'

const store = {
    fields: [
        {
            label: 'Почта',
            value: 'example@yandex.ru'
        },
        {
            label: 'Логин',
            value: 'example.name'
        },
        {
            label: 'Имя',
            value: 'Firstname'
        },
        {
            label: 'Фамилия',
            value: 'Secondname'
        },
        {
            label: 'Имя в чате',
            value: 'My chat name'
        },
        {
            label: 'Телефон',
            value: '+7999999999'
        },
    ]
}

const target = document.getElementById('root')
target.innerHTML = Handlebars.compile(template)({infoFields: store.fields})
