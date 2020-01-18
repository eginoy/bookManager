import Vue from "vue";
import VueRouter from "vue-router";
import App from "./App.vue";

import {
  library
} from "@fortawesome/fontawesome-svg-core";
import {
  fas
} from "@fortawesome/free-solid-svg-icons";
import {
  far
} from "@fortawesome/free-regular-svg-icons";
import {
  fab
} from "@fortawesome/free-brands-svg-icons";
import {
  FontAwesomeIcon
} from "@fortawesome/vue-fontawesome";

// アイコンを読み込み
library.add(fas, far, fab);

// Vueコンポーネントを作成
Vue.component("v-fa", FontAwesomeIcon);

// イベントハブの定義（非親子関係コンポーネント間）
Vue.prototype.$eventHub = new Vue();

Vue.use(VueRouter);
Vue.config.productionTip = false;

new Vue({
  render: h => h(App)
}).$mount("#app");