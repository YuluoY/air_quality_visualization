import echarts from "echarts";

export function myChinaMap(id, options) {
    let myEcharts = echarts.init(document.getElementById(id))
    let option = {
        visualMap: [{  // 映射-颜色值
            orient: "vertical", // 分段方向:horizontal水平
            min: 0,
            max: options.max,
            inRange: {
                color: ['#FFFFFF', "#FDFDCF", "#FE9E83", "#E55A4E", '#4F070D']
            },
            calculable: true // 出现滑块
        }],
        tooltip: {
            formatter: function (params, callback) {
                return (params.seriesName + "<br />" + params.name + "：" + params.value)
            }
        },
        series: [{
            name: "省份",
            type: "map",  // 配置图表类型
            map: "china", // 中国地图
            roam: false,  // 是否允许自动缩放
            zoom: 1.2,    // 地图缩放比例
            label: {      // 配置字体
                normal: {
                    show: true,
                    textStyle: {
                        fontSize: 8
                    }
                }
            },
            itemStyle: {  // 配置地图样式
                normal: {
                    areaColor: 'rgba(0,255,236,0)',
                    borderColor: 'rgba(0,0,0,0.2)',
                },
                emphasis: { // 选中的区域颜色及阴影效果等
                    areaColor: 'rgba(255,180,0,0.8)',
                    shadowOffsetX: 0,
                    shadowOffsetY: 0,
                    shadowBlur: 20,
                    borderWidth: 0,
                }
            },
            data: options.data
        }]
    }
    myEcharts.setOption(option);
}
