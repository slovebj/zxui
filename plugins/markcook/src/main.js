import Vue from 'vue'
import App from './App.vue'
import store from '../vuex/store'

new Vue({
  el: '#markcook-app',
  store,
  render: h => h(App)
})
