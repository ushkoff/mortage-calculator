import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Vuelidate from 'vuelidate'

import 'bootstrap/dist/css/bootstrap.min.css'
import firebase from 'firebase/compat/app'

Vue.use(Vuelidate)
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
  created () {
    const firebaseConfig = {
      apiKey: "AIzaSyBjd4JwzE4Ia1LuNN2SWQCha8qULmk3nAE",
      authDomain: "mortgage-calculator-ad0f9.firebaseapp.com",
      databaseURL: "https://mortgage-calculator-ad0f9-default-rtdb.europe-west1.firebasedatabase.app",
      projectId: "mortgage-calculator-ad0f9",
      storageBucket: "mortgage-calculator-ad0f9.appspot.com",
      messagingSenderId: "731946208573",
      appId: "1:731946208573:web:769170530b504f2313c954",
      measurementId: "G-SRYNBSS3LH"
    }
    firebase.initializeApp(firebaseConfig)
  }
}).$mount('#app')
