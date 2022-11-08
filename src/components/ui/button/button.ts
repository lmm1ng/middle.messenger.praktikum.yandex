import Block from '../../../utlils/block';
import './button.scss';

interface IButtonProps {
  text: string,
  type: string,
  onClick?: () => void
}

export default class Button extends Block {
  constructor({ onClick, ...props }: IButtonProps) {
    super({ ...props, events: { click: onClick } });
  }

  render() {
    return `
        <button class="button button--{{type}}">{{text}}</button>
    `;
  }
}
