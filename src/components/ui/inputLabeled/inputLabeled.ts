import Block from '../../../utlils/block';
import Input from '../input';
import registerComponent from '../../../utlils/registerComponent';

import './inputLabeled.scss';

import '../../../helpers/ifEquals';
import '../../../helpers/notEquals';

import fileArrow from '../../../assets/svg/file-arrow.svg';

registerComponent(Input, 'Input');

interface IInputLabeledProps {
  name: string,
  type?: string,
  withLabel?: boolean,
  label?: string,
  placeholder?: string,
  onBlur?: () => void,
  onFocus?: () => void
}

export default class InputLabeled extends Block {
  constructor({
    ...props
  }: IInputLabeledProps) {
    super({ ...props });
  }

  render() {
    return `
        {{#notEquals type "file"}}
        <div class="input">
            {{#if ../withLabel}}
            <label for="{{../../name}}" class="input__name">{{../../label}}</label>
            {{/if}}
            {{{Input
                name=../name
                type=../type
                placeholder=../placeholder
                onBlur=../onBlur
                onFocus=../onFocus
            }}}
        </div>
        {{/notEquals}}
        {{#ifEquals type "file"}}
        <div class="input-file">
            <label for="{{../name}}" class="input-file__label">
                <img src=${fileArrow} alt="">
                <span>Загрузить</span>
            </label>
            {{{Input
                name=name
                type='file'
                onBlur=onBlur
                onFocus=onFocus
            }}}
            <input id="{{../name}}" type="file" name="{{../name}}">
        </div>
        {{/ifEquals}}
      `;
  }
}
