import Block from '../../../../utlils/block';
import './chatSettingsElement.scss';

interface IChatSettingsElementProps {
  text: string
  danger: boolean
  onClick?: () => void
}

export default class ChatSettingsElement extends Block {
  constructor({
    onClick, ...props
  }: IChatSettingsElementProps) {
    super({ ...props, events: { click: onClick } });
  }

  render() {
    return `
      <div class="chat-settings-element {{#if danger}}chat-settings-element--danger{{/if}}">
        <span>{{text}}</span>
      </div>
      `;
  }
}
