import Block from '../../../utlils/block';
import './textarea.scss';

interface ITextareaProps {
    name: string,
    rows: number,
    onBlur?: () => void,
    onFocus?: () => void,
    onInput?: () => void
}

export default class Textarea extends Block {
  constructor({
    onBlur, onFocus, onInput, ...props
  }: ITextareaProps) {
    super({ ...props, events: { blur: onBlur, focus: onFocus, input: onInput } });
  }

  render() {
    return `
        <textarea class="textarea" rows="{{rows}}" name="{{name}}"></textarea>
      `;
  }
}
