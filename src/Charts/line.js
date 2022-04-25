import echarts from "echarts";

export function myLineChart(id, options) {
  let myChart = echarts.init(document.getElementById(id));
  // option选项就是关键的配置项，更改此配置项就可引入不同的图表
  let option = {
    xAxis: {
      type: "category",
      data: options.xAxisData
    },
    yAxis: {
      type: "value",
      data: options.yAxisData
    },
    series: [
      {
        type: "line"
      }
    ]
  };
  myChart.setOption(option);
}