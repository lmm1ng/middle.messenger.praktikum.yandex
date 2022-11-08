import Block from '../../../utlils/block';
import './anchor.scss';
import { IWithRouterProps } from '../../../utlils/router';

interface IAnchorProps extends IWithRouterProps{
  text: string,
  href: string,
}

export default class Anchor extends Block {
  constructor({ text, href, router }: IAnchorProps) {
    super({
      text,
      href,
      events: {
        click: (e: MouseEvent) => {
          e.preventDefault();
          router.go(href);
        },
      },
    });
  }

  render() {
    return `
        <a class="anchor"">{{text}}</a>
    `;
  }
}
