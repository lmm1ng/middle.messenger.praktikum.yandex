import Block from '../../../utlils/block';

interface IButtonImageProps {
  image: string,
  onClick?: () => void
}

export default class ButtonImage extends Block {
  constructor({ onClick, ...props }: IButtonImageProps) {
    super({ ...props, events: { click: onClick } });
  }

  render() {
    return `
        <img src="{{image}}" alt="">
    `;
  }
}
