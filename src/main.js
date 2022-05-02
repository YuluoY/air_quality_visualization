import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import axios from "./axios";
import pinyinChange from "@/plugins/pinyinChange";
import echarts from "echarts";
import charts from "@/Charts/index";
import "echarts/map/js/china";
import { VeFunnelChart } from "ve-charts";
import { scrollRankingBoard, borderBox10, fullScreenContainer, borderBox1 } from "@jiaminghi/data-view";

Vue.use(scrollRankingBoard);
Vue.use(borderBox1);
Vue.use(borderBox10);
Vue.use(fullScreenContainer);
Vue.component('VeFunnelChart', VeFunnelChart)
Vue.config.productionTip = false;
Vue.prototype.$axios = axios;
Vue.prototype.$echarts = echarts;
Vue.use(pinyinChange);
Vue.use(charts);

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount("#app");
