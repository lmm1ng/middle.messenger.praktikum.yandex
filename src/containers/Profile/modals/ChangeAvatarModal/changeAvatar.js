import Handlebars from 'handlebars'
import template from './changeAvatar.tmpl'

export default ({visible}) => Handlebars.compile(template)({visible})
