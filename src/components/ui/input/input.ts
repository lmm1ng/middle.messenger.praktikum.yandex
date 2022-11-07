import Block from '../../../utlils/block';

interface IInputProps {
  name: string,
  type?: string,
  placeholder: string,
  onBlur?: () => void,
  onFocus?: () => void,
  onInput?: () => void
}

export default class Input extends Block {
  constructor({
    onBlur, onFocus, onInput, ...props
  }: IInputProps) {
    super({ ...props, events: { blur: onBlur, focus: onFocus, input: onInput } });
  }

  render() {
    return `
        <input id="{{name}}" name="{{name}}" type="{{type}}" placeholder="{{placeholder}}">
      `;
  }
}
