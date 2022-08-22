import Handlebars from 'handlebars'
import template from './chat.tmpl'

const target = document.getElementById('root')
target.innerHTML = Handlebars.compile(template)()
