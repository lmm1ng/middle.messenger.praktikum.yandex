import Handlebars from 'handlebars'
import template from './changeInfo.tmpl'

export default ({visible}) => Handlebars.compile(template)({visible})
