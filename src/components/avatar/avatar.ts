import Block from '../../utlils/block';
import './avatar.scss';

interface IAvatarProps {
    big?: boolean,
    classes?: string,
    pointer?: boolean,
    onClick?: () => void
}

export default class Avatar extends Block {
  constructor({
    onClick, ...props
  }: IAvatarProps) {
    super({ ...props, events: { click: onClick } });
  }

  render() {
    return `
        <div class="avatar {{#if big}}avatar--big{{/if}} {{#if pointer}}avatar--pointer{{/if}} {{classes}}"></div>
      `;
  }
}
