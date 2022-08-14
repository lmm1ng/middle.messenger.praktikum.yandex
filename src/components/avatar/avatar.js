import Handlebars from 'handlebars'
import template from './avatar.tmpl'

export default ({classes}) => Handlebars.compile(template)({classes})
