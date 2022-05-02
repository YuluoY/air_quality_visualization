import { myLineChart } from "@/Charts/line";
import { myChinaMap } from "@/Charts/chinaMap";
import { myPieChart } from "@/Charts/pie";
import { myBarChart } from "@/Charts/bar";
import { myRadarChart } from "@/Charts/radar";
import echarts from "echarts";
import { myCityMap } from "@/Charts/cityMap";
const install = function(Vue) {
  // 向 Vue.prototype 上挂载方法
  Object.defineProperties(Vue.prototype, {
    $charts: {
      get() {
        return {
          line: (id, options) => myLineChart(id, options),
          pie: (id, options) => myPieChart(id, options),
          bar: (id, options) => myBarChart(id, options),
          radar: (id, options) => myRadarChart(id, options),
          chinaMap: function(id, options) {
            myChinaMap.call(this, id, options);
          },
          cityMap: (id, options) => myCityMap(id, options),
          echartsInstance: echarts
        };
      }
    }
  });
};
export default install;