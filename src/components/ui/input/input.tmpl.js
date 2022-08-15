import './input.scss'

import '../../../helpers/ifEquals'
import '../../../helpers/notEquals'

import fileArrow from '../../../assets/svg/file-arrow.svg'

export default `
    {{#notEquals type "file"}}
    <div class="input">
        {{#if withLabel}}
        <label for="{{name}}" class="input__name">{{label}}</label>
        {{/if}}
        <input id="{{name}}" name="{{name}}" type="{{type}}" placeholder="{{placeholder}}">
    </div>
    {{/notEquals}}
    {{#ifEquals type "file"}}
    <div class="input-file">
        <label for="{{name}}" class="input-file__label">
            <img src=${fileArrow} alt="">
            <span>Загрузить</span>
        </label>
        <input id="{{name}}" type="file" name="{{name}}">
    </div>
    {{/ifEquals}}
`
