import { Loading } from 'element-ui';

export const OpenLoading = function(div) {
    return Loading.service({
        lock: true,
        text: '',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0)',
        target: document.querySelector(div)
    })
}
