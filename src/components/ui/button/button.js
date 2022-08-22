import Handlebars from 'handlebars'
import template from './button.tmpl'

export default ({text, type}) => Handlebars.compile(template)({text, type})
