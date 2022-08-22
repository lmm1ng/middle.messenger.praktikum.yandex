import Handlebars from 'handlebars'
import template from './avatar.tmpl'

export default ({classes, big}) => Handlebars.compile(template)({classes, big})
