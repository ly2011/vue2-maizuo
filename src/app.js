/**
* @Date:   2016-10-07T11:10:57+08:00
* @Last modified time: 2016-10-07T11:34:15+08:00
*/

import Vue from 'vue'
import App from './App.vue'
import { sync } from 'vuex-router-sync'
import router from './router.js'
import store from './vuex/store.js'
import LyApp from './plugins.js'
import './config'

sync(store, router)
Vue.use(LyApp)

// 自定义滚动指令
Vue.directive('scroll', {
  bind (el, binding) {
    window.addEventListener('scroll', () => {
      const fnc = binding.value
      fnc(el)
    })
  }
})

const app = new Vue({
  router,
  store,
  render: h => h(App)
})

// export {app, router}
export { app, router, store }
