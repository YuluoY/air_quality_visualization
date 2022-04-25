import { myLineChart } from "@/Charts/line";
import { myChinaMap } from "@/Charts/chinaMap";

const install = function(Vue) {
  // 向 Vue.prototype 上挂载方法
  Object.defineProperties(Vue.prototype, {
    $charts: {
      get() {
        return {
          line: (id, options) => myLineChart(id, options),
          chinaMap: (id, options) => myChinaMap(id, options)
        };
      }
    }
  });
};
export default install;