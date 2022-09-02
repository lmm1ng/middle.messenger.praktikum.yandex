import Handlebars from 'handlebars';
import template from './500.tmpl';

const target = document.getElementById('root');
target.innerHTML = Handlebars.compile(template)();
