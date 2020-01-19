import Vue from "vue";
import VueRouter from "vue-router";
import App from "./App.vue";

import firebase from "firebase";

import { BootstrapVue, IconPlugin } from "bootstrap-vue";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue";

import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

// アイコンを読み込み
library.add(fas, far, fab);

// Vueコンポーネントを作成
Vue.component("v-fa", FontAwesomeIcon);

// イベントハブの定義（非親子関係コンポーネント間）
Vue.prototype.$eventHub = new Vue();

Vue.use(VueRouter, BootstrapVue, IconPlugin);
Vue.config.productionTip = false;

var firebaseConfig = {
  apiKey: "AIzaSyBqTUMBDPsd4Nl9sS7RrwPh3QaHhFyqjq4",
  authDomain: "bookmanager-5ba4c.firebaseapp.com",
  databaseURL: "https://bookmanager-5ba4c.firebaseio.com",
  projectId: "bookmanager-5ba4c",
  storageBucket: "bookmanager-5ba4c.appspot.com",
  messagingSenderId: "991241456327",
  appId: "1:991241456327:web:933a53fa86a3fa5e7f0ce2",
  measurementId: "G-PNHNDBKK49"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

new Vue({
  render: h => h(App)
}).$mount("#app");
