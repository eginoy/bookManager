import Vue from 'vue'
import store from './store/index'
import App from './App.vue'
import router from './router'

import firebase from 'firebase/app'
import 'firebase/database'
import 'firebase/auth'
import 'firebase/analytics'

import { BootstrapVue, IconPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue'

import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

// アイコンを読み込み
library.add(fas, far, fab)

// Vueコンポーネントを作成
Vue.component('v-fa', FontAwesomeIcon)

// イベントハブの定義（非親子関係コンポーネント間）
Vue.prototype.$eventHub = new Vue()

Vue.use(router, BootstrapVue, IconPlugin)
Vue.config.productionTip = false

var firebaseConfig = {
  apiKey: process.env.VUE_APP_FIREBASE_API_KEY,
  authDomain: process.env.VUE_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.VUE_APP_FIREBASE_DATABASE_URL,
  projectId: process.env.VUE_APP_FIREBASE_PROJECT_ID,
  appId: process.env.VUE_APP_FIREBASE_APP_ID
}
// Initialize Firebase
firebase.initializeApp(firebaseConfig)
firebase.analytics()

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
