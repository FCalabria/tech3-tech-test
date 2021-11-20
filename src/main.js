import Vue from 'vue'
import App from './App.vue'
import store from './store'
import i18n from './i18n'
import router from './router'
import VueCurrencyFilter from 'vue-currency-filter'


import './assets/tailwind.css'

Vue.config.productionTip = false
Vue.use(VueCurrencyFilter)

new Vue({
  store,
  i18n,
  router,
  render: h => h(App)
}).$mount('#app')
