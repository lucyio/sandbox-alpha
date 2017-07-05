import Vue from 'vue'
import App from './App'
import router from './router'
import store from '@/store'
import '@/api/feathers-client'
// global.Promise = require('bluebird')

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
