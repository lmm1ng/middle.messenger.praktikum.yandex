import Block from '../../../utlils/block';
import './textarea.scss';

interface ITextareaProps {
    name: string,
    rows: number,
    onBlur?: () => void,
    onFocus?: () => void
}

export default class Textarea extends Block {
  constructor({
    onBlur, onFocus, ...props
  }: ITextareaProps) {
    super({ ...props, events: { blur: onBlur, focus: onFocus } });
  }

  render() {
    return `
        <textarea class="textarea" rows="{{rows}}" name="{{name}}"></textarea>
      `;
  }
}
