import Handlebars from 'handlebars'
import template from './404.tmpl'

const target = document.getElementById('root')
target.innerHTML = Handlebars.compile(template)()
