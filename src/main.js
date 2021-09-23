import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Vuelidate from 'vuelidate'

import 'bootstrap/dist/css/bootstrap.min.css'

Vue.use(Vuelidate)
Vue.config.productionTip = false

Vue.prototype.$api = process.env.VUE_APP_API

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
