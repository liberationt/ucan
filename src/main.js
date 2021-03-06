import Vue from 'vue'

import Cookies from 'js-cookie'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import Element from 'element-ui'
import './styles/element-variables.scss'

import '@/styles/index.scss' // global css
import '@/styles/iconFont/iconfont.css'
import App from './App'
import store from './store'
import router from './router'

import i18n from './lang' // Internationalization
import './icons' // icon
import './permission' // permission control
import './utils/error-log' // error log
import has from './utils/btnsPermission';
import './utils/directives.js';
import * as filters from './filters' // global filters
import 'font-awesome/css/font-awesome.css';

import './polyfill'
import Print from 'vue-print-nb'
import Viewer from 'v-viewer'
import 'viewerjs/dist/viewer.css'
Vue.use(Print);
Vue.use(Viewer, {
  defaultOptions: {
    zIndex: 9999
  }
})
// import { mockXHR } from '../mock' // simulation data
//
// // mock api in github pages site build
// if (process.env.NODE_ENV === 'production') { mockXHR() }

Vue.use(Element, {
  size: Cookies.get('size') || 'medium', // set element-ui default size
  i18n: (key, value) => i18n.t(key, value)
})

// register global utility filters.
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  i18n,
  render: h => h(App)
})
