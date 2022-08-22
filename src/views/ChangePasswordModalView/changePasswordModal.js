import Handlebars from 'handlebars'
import template from './changePasswordModal.tmpl'

const target = document.getElementById('root')
target.innerHTML = Handlebars.compile(template)()
