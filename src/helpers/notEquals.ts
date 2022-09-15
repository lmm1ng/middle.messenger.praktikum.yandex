import * as Handlebars from 'handlebars';

Handlebars.registerHelper('notEquals', (arg1, arg2, options) => (arg1 !== arg2 ? options.fn(this) : options.inverse(this)));
