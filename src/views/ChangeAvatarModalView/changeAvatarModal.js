import Handlebars from 'handlebars'
import template from './changeAvatarModal.tmpl'

const target = document.getElementById('root')
target.innerHTML = Handlebars.compile(template)()
