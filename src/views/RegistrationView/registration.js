import Handlebars from 'handlebars'
import template from './registration.tmpl'

const target = document.getElementById('root')
target.innerHTML = Handlebars.compile(template)()
