import echarts from "echarts";

export function myLineChart(id, options) {
  let myChart = echarts.init(document.getElementById(id));
  // option选项就是关键的配置项，更改此配置项就可引入不同的图表
  let option = {
    tooltip: {
      formatter: function(params) {
        return `${params.name}:${params.data}`;
      }
    },
    toolbox: {
      feature: {
        myFull: {
          show: true,
          title: "全屏查看",
          icon: "path://M432.45,595.444c0,2.177-4.661,6.82-11.305,6.82c-6.475,0-11.306-4.567-11.306-6.82s4.852-6.812,11.306-6.812C427.841,588.632,432.452,593.191,432.45,595.444L432.45,595.444z M421.155,589.876c-3.009,0-5.448,2.495-5.448,5.572s2.439,5.572,5.448,5.572c3.01,0,5.449-2.495,5.449-5.572C426.604,592.371,424.165,589.876,421.155,589.876L421.155,589.876z M421.146,591.891c-1.916,0-3.47,1.589-3.47,3.549c0,1.959,1.554,3.548,3.47,3.548s3.469-1.589,3.469-3.548C424.614,593.479,423.062,591.891,421.146,591.891L421.146,591.891zM421.146,591.891",
          onclick: function(e) {
          }
        }
      }
    },
    xAxis: {
      type: "category",
      data: options.xAxisData,
      axisLabel: {
        rotate: 90, // 倾斜30度
        color: "#4DA0E9"
      }
    },
    yAxis: {
      type: "value",
      axisLabel: {
        color: "#4DA0E9"
      }
    },
    series: [{
      data: options.seriesData,
      type: "line",
      itemStyle: {
        color: "#4DA0E9"
      },
      areaStyle: {
        color: "rgba(47, 132, 222, 1)"
      }
    }]
  };
  myChart.setOption(option);
}