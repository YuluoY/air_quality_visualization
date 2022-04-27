import echarts from "echarts";

export function myPieChart(id, options) {
  let myChart = echarts.init(document.getElementById(id));
  // option选项就是关键的配置项，更改此配置项就可引入不同的图表
  let option = {
    // color: ['#D1EEEE', '#D6F9FD'],
    tooltip: {
      formatter: function(params) {
        return `${params.data.name}:${params.data.value}`;
      }
    },
    series: [
      {
        name: "年龄段分析",
        type: "pie",
        radius: ["30%", "90%"],
        center: ["50%", "50%"],
        roseType: "area",
        itemStyle: {
          borderRadius: 7
        },
        data: options.data.slice(0, 10)
      }
    ]
  };
  myChart.setOption(option);
}