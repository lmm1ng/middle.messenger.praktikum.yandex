import Handlebars from 'handlebars'
import template from './anchor.tmpl'

export default ({text}) => Handlebars.compile(template)({text})
