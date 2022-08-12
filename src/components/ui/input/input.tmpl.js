import './input.scss'

export default `
    <div class="input">
        {{#if withLabel}}
        <label for={{name}} class="input__name">{{label}}</label>
        {{/if}}
        <input id={{name}} type={{type}} name={{name}} placeholder={{placeholder}} />
    </div>
`
