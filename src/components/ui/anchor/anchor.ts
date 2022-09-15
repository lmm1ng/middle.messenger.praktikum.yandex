import Block from '../../../utlils/block';
import './anchor.scss';

interface IAnchorProps {
  text: string,
  href: string
}

export default class Anchor extends Block {
  constructor({ text, href }: IAnchorProps) {
    super({ text, href });
  }

  render() {
    return `
        <a class="anchor" href="{{href}}">{{text}}</a>
    `;
  }
}
