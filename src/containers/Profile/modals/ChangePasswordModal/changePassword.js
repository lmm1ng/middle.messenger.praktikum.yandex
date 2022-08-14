import Handlebars from 'handlebars'
import template from './changePassword.tmpl'

export default ({visible}) => Handlebars.compile(template)({visible})
