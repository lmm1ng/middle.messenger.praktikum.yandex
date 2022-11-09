const { JSDOM } = require('jsdom');
const register = require('@babel/register').default;

register({
  presets: [
    '@babel/preset-typescript',
    '@babel/preset-env',
  ],
  extensions: ['.ts', '.js'],
});

const { window } = new JSDOM('<div id="root"></div>', { url: 'https://localhost' });

global.window = window;
global.document = window.document;
global.XMLHttpRequest = window.XMLHttpRequest;
