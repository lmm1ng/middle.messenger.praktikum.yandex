import * as Handlebars from 'handlebars';
import Block from './block';

export default function registerComponent(Component: typeof Block, name: string): void {
  Handlebars.registerHelper(name, ({ hash, data, fn }: Handlebars.HelperOptions) => {
    if (!data.root.children) {
      data.root.children = {};
    }
    if (!data.root.refs) {
      data.root.refs = {};
    }
    const component = new Component(hash);
    if (hash.ref) {
      data.root.refs[hash.ref] = component;
    }
    data.root.children[component.id] = component;

    return `<div data-id="id-${component.id}">${fn ? fn(this) : ''}</div>`;
  });
}
