import Handlebars from 'handlebars'
import template from './login.tmpl'

const target = document.getElementById('root')
target.innerHTML = Handlebars.compile(template)()
