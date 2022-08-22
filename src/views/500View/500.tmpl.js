import './500.scss'
import '../../index.scss'

import skullSvg from '../../assets/svg/skull.svg'

export default `
    <div class="server-error-wrapper">
        <span class="server-error-wrapper__error">
            <span>5</span>
            <img src=${skullSvg} alt="*">
            <img src=${skullSvg} alt="*">
        </span>
        <span class="server-error-wrapper__subtext">Не поверите, но уже фиксим...</span>
    </div>
`
