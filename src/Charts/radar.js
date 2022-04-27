// 绘制类型配置
import textStyle from "echarts/src/model/mixin/textStyle";

var shape = "circle";
var icon = "path://M853.333333 597.333333l-341.333333 426.666667-341.333333-426.666667h682.666666zM512 0l341.333333 426.666667H170.666667l341.333333-426.666667z";

// var sData = {
//   name: ["东北", "华北", "华中", "华东", "华南", "西北", "西南"],
//   data: [
//     [20, 30, 65, 22, 33, 77, 99]
//   ]
// };


import echarts from "echarts";

export function myRadarChart(id, options) {
  let myChart = echarts.init(document.getElementById(id));
  let option = {
    normal: {
      top: 200,
      left: 300,
      width: 500,
      height: 400,
      zIndex: 6,
      backgroundColor: "red"
    },

    tooltip: {
      formatter: function(params) {
        let result = "七大地区平均AQI分布<br>";
        ["东北", "华北", "华中", "华东", "华南", "西北", "西南"].forEach((area, index, arr) => {
          result += area + " : " + params.data[index] + "<br>";
        });
        return result;
      }
    },
    toolbox: {
      show: true,
      feature: {
        myTool: { //自定义方法 配置   我这是为了实现 饼图切换为柱状图
          show: true,
          title: "绘制类型",
          icon: icon,
          onclick: function() {
            if (shape == "circle") {
              shape = "polygon";
            } else if (shape == "polygon") {
              shape = "circle";
            }
            option.radar.shape = shape;
            myChart.setOption(option, true);
          }
        }
      },
      left: 20,
      top: 20
    },
    legend: {
      show: true,
      icon: "circle",
      left: "center",
      top: "80%",
      orient: "horizontal",
      textStyle: {
        fontSize: 15,
        color: "color"
      },
      data: options.sData.name // ["数据1", "数据2"]
    },
    radar: {
      center: ["50%", "50%"],
      radius: "80%",
      startAngle: 90,
      splitNumber: 4,
      shape: "circle",
      splitArea: {
        areaStyle: {
          color: ["transparent"]
        }
      },
      axisLabel: {
        show: false,
        fontSize: 18,
        color: "#fff",
        fontStyle: "normal",
        fontWeight: "normal"
      },
      axisLine: {  //轴线
        show: true,
        lineStyle: {
          color: "#00FCFD"//
        }
      },
      splitLine: {   //网线
        show: true,
        lineStyle: {
          color: "#09BEEB"//
        }
      },
      indicator: [
        { "name": "东北", "max": options.sData.indicatorMax + 10 },
        { "name": "华北", "max": options.sData.indicatorMax + 10 },
        { "name": "华中", "max": options.sData.indicatorMax + 10 },
        { "name": "华东", "max": options.sData.indicatorMax + 10 },
        { "name": "华南", "max": options.sData.indicatorMax + 10 },
        { "name": "西北", "max": options.sData.indicatorMax + 10 },
        { "name": "西南", "max": options.sData.indicatorMax + 10 }
      ]
    },
    series: [
      {
        // name: sData.name[0],
        type: "radar",
        symbol: "circle",
        symbolSize: 5,
        //中间面积
        areaStyle: { normal: { color: "rgba(0,255,255,0.2)" } },
        //数据点
        itemStyle: { color: "#00FFFF", borderColor: "#00FFFF", borderWidth: 5 },
        lineStyle: { normal: { type: "dashed", color: "#00FFFF", width: 2 } },
        data: [options.sData.data[0]]
      }, {
        // name: sData.name[1],
        type: "radar",
        symbol: "circle",
        symbolSize: 5,
        itemStyle: {
          normal: {
            color: "rgba(19, 173, 255, 1)",
            borderColor: "rgba(19, 173, 255, 0.4)",
            borderWidth: 5
          }
        },
        areaStyle: { normal: { color: "rgba(19, 173, 255, 0.5)" } },
        lineStyle: { normal: { color: "rgba(19, 173, 255, 1)", width: 2, type: "dashed" } }
        // data: [options.sData.data[1]]
      }, {
        // name: sData.name[2],
        type: "radar",
        symbol: "circle",
        symbolSize: 5,
        itemStyle: {
          normal: {
            color: "rgba(19, 173, 255, 1)",
            borderColor: "rgba(19, 173, 255, 0.4)",
            borderWidth: 5
          }
        },
        areaStyle: { normal: { color: "rgba(19, 173, 255, 0.5)" } },
        lineStyle: { normal: { color: "rgba(19, 173, 255, 1)", width: 2, type: "dashed" } }
        // data: [sData.data[2]]
      }, {
        // name: sData.name[3],
        type: "radar",
        symbol: "circle",
        symbolSize: 5,
        itemStyle: {
          normal: {
            color: "rgba(19, 173, 255, 1)",
            borderColor: "rgba(19, 173, 255, 0.4)",
            borderWidth: 5
          }
        },
        areaStyle: { normal: { color: "rgba(19, 173, 255, 0.5)" } },
        lineStyle: { normal: { color: "rgba(19, 173, 255, 1)", width: 2, type: "dashed" } }
        // data: [sData.data[3]]
      }, {
        // name: sData.name[4],
        type: "radar",
        symbol: "circle",
        symbolSize: 5,
        itemStyle: {
          normal: {
            color: "rgba(19, 173, 255, 1)",
            borderColor: "rgba(19, 173, 255, 0.4)",
            borderWidth: 5
          }
        },
        areaStyle: { normal: { color: "rgba(19, 173, 255, 0.5)" } },
        lineStyle: { normal: { color: "rgba(19, 173, 255, 1)", width: 2, type: "dashed" } }
        // data: [sData.data[4]]
      }, {
        // name: sData.name[5],
        type: "radar",
        symbol: "circle",
        symbolSize: 5,
        itemStyle: {
          normal: {
            color: "rgba(19, 173, 255, 1)",
            borderColor: "rgba(19, 173, 255, 0.4)",
            borderWidth: 5
          }
        },
        areaStyle: { normal: { color: "rgba(19, 173, 255, 0.5)" } },
        lineStyle: { normal: { color: "rgba(19, 173, 255, 1)", width: 2, type: "dashed" } }
        // data: [sData.data[5]]
      }, {
        // name: sData.name[6],
        type: "radar",
        symbol: "circle",
        symbolSize: 5,
        itemStyle: {
          normal: {
            color: "rgba(19, 173, 255, 1)",
            borderColor: "rgba(19, 173, 255, 0.4)",
            borderWidth: 5
          }
        },
        areaStyle: { normal: { color: "rgba(19, 173, 255, 0.5)" } }
        // data: [sData.data[6]]
      }]
  };
  myChart.setOption(option);
}