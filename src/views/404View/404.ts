import Block from '../../utlils/block';
import './404.scss';

export default class Error404View extends Block {
  render() {
    return `
        <div class="not-found-wrapper">
            <span class="not-found-wrapper__error">404</span>
            <span class="not-found-wrapper__subtext">Не туда попали :(</span>
        </div>
    `;
  }
}
