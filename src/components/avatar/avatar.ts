import Block from '../../utlils/block';
import './avatar.scss';

interface IAvatarProps {
    big?: boolean,
    classes?: string,
    src?: string,
    pointer?: boolean,
    onClick?: () => void,
}

export default class Avatar extends Block {
  constructor({
    onClick, ...props
  }: IAvatarProps) {
    const pathToImage = 'https://ya-praktikum.tech/api/v2/resources';
    super({ ...props, events: { click: onClick }, pathToImage });
  }

  render() {
    return `
        {{#if src}}
            <img class="avatar {{#if big}}avatar--big{{/if}} {{#if pointer}}avatar--pointer{{/if}} {{classes}}" src='{{pathToImage}}{{src}}'>
        {{else}}
            <div class="avatar {{#if big}}avatar--big{{/if}} {{#if pointer}}avatar--pointer{{/if}} {{classes}}"></div>
        {{/if}}
      `;
  }
}
