import Handlebars from 'handlebars'
import template from './input.tmpl'

export default ({label, name, type, withLabel, placeholder}) => Handlebars.compile(template)({label, name, type, withLabel, placeholder})
