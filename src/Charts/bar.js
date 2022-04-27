import echarts from "echarts";

let color = ["#1370FB", "#0054ea"];
let numColor = "#0AA107";
// let xData = ["0-20分", "20-40分", "40-60分", "60-80分", "80-100分", "100-200分"];
// let yData = [11, 21, 9, 3, 24, 11];

export function myBarChart(id, options) {
  let myChart = echarts.init(document.getElementById(id));
  let option = {
    tooltip: {
      show: true,
      formatter: function(params) {
        return `${params.name}:${params.data}`;
      }
    },
    toolbox: {},
    dataZoom: [
      {
        type: "slider",
        filterMode: "filter",
        show: true,
        backgroundColor: "#DAEAF8",
        height: 20,
        start: 0,
        end: 20,
        handleStyle: {
          color: "#66B8FE",
          borderColor: "#66B8FE"
        },
        textStyle: {
          color: "#1370FB"
        }
      }
    ],
    grid: {
      borderWidth: 0,
      bottom: 65,
      right: 40,
      left: 60,
      textStyle: {
        color: "#fff"
      }
    },
    xAxis: [
      {
        type: "category",
        axisLine: {
          lineStyle: {
            color: "#EAEAEA"
          }
        },
        axisTick: {
          show: false
        },
        axisLabel: {
          interval: 0,
          formatter: function(value, index) {
            if (index == 0) {
              return `{clickItem|${value}}`;
            } else {
              return `{defalutItem|${value}}`;
            }
          },
          rich: {
            clickItem: {
              // 让年度信息更醒目
              color: "#F46405",
              fontWeight: "bold"
            },
            defalutItem: {
              color: "#1370FB"
            }
          },
          textStyle: {
            fontSize: 12
          }
        },
        data: options.xData
      }
    ],
    yAxis: [
      {
        type: "value",
        name: "（AQI）",
        nameTextStyle: {
          padding: [0, 50, 0, 0],
          color: "#1370FB"
        },
        axisTick: {
          show: false
        },
        axisLine: {
          show: false
        },
        axisLabel: {
          textStyle: {
            color: "#1370FB",
            fontSize: 14
          }
        },
        splitLine: {
          show: true,
          lineStyle: {
            color: "#EAEAEA"
          }
        }
      }
    ],
    series: [
      {
        type: "pictorialBar",
        symbol: "path://M35,0L35,70L0,70z M35,0L35,70L70,70z",
        data: options.yData,
        barWidth: 26,
        symbolOffset: [0, -10],
        z: 99,
        label: {
          normal: {
            show: true,
            position: "top",
            textStyle: {
              color: "rgba(29, 145, 245, 1)",
              fontSize: 14
            }
          }
        },
        itemStyle: {
          normal: {
            color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
              {
                offset: 0,
                color: color[1]
              },
              {
                offset: 0.5,
                color: color[1]
              },
              {
                offset: 0.5,
                color: color[0]
              },
              {
                offset: 1,
                color: color[0]
              }
            ]),
            opacity: 1
          }
        }
      },
      {
        type: "pictorialBar",
        symbol: "diamond",
        barWidth: 26,
        symbolSize: ["100%", 20],
        z: 99,
        itemStyle: {
          normal: {
            color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
              {
                offset: 0,
                color: color[1]
              },
              {
                offset: 0.5,
                color: color[1]
              },
              {
                offset: 0.5,
                color: color[0]
              },
              {
                offset: 1,
                color: color[0]
              }
            ]),
            opacity: 1
          }
        },
        data: options.yData
      }
    ]
  };
  myChart.on("click", function(params) {
    myChart.setOption({
      xAxis: [
        {
          axisLabel: {
            interval: 0,
            formatter: function(value, index) {
              if (value == params.name) {
                return `{clickItem|${value}}`;
              } else {
                return `{defalutItem|${value}}`;
              }
            }
          }
        }
      ]
    });
    // emit('getMonth', params);
  });
  myChart.setOption(option);
}