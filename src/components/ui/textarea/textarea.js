import Handlebars from 'handlebars'
import template from './textarea.tmpl'

export default ({rows, name}) => Handlebars.compile(template)({rows, name})
