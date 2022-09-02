import Block from '../../../utlils/block';

interface IInputProps {
  name: string,
  type?: string,
  placeholder: string,
  onBlur?: () => void,
  onFocus?: () => void
}

export default class Input extends Block {
  constructor({
    onBlur, onFocus, ...props
  }: IInputProps) {
    super({ ...props, events: { blur: onBlur, focus: onFocus } });
  }

  render() {
    return `
        <input id="{{name}}" name="{{name}}" type="{{type}}" placeholder="{{placeholder}}">
      `;
  }
}
