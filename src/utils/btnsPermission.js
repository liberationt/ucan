import Vue from 'vue'
import Router from 'vue-router'

const has = Vue.directive('has', {
  inserted: function(el, binding) {
    const className = binding.value.class // 这个地方要注意了，看下面页面上的代码，对应取得相应的值
    if (!Vue.prototype.$_has(className)) {
      el.parentNode.removeChild(el)
    }
  }
})
// 权限检查方法
Vue.prototype.$_has = function(val) {
  let isShow = false
  const btnPowerArr = sessionStorage.getItem('btns')
  if (btnPowerArr == undefined || btnPowerArr == null) {
    return false
  }
  if (JSON.parse(btnPowerArr).includes(val)) {
    isShow = true
  }
  return isShow
}
export { has }
