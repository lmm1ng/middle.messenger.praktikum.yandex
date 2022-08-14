import Handlebars from 'handlebars'
import template from './changeInfoModal.tmpl'

const target = document.getElementById('root')
target.innerHTML = Handlebars.compile(template)()
