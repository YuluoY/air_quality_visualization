import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import axios from "./axios";
import pinyinChange from "@/plugins/pinyinChange";
import charts from "@/Charts/index";
import "echarts/map/js/china"

Vue.config.productionTip = false;
Vue.prototype.$axios = axios;
Vue.use(pinyinChange);
Vue.use(charts);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
