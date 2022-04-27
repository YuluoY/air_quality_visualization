<template>
  <div id="main">
    <header>
      <div class="title">
        <div>{{ title }}</div>
        <div style="font-size: 1rem;color: #90CBF3;text-align: center">数据来源：中国环境监测总站</div>
      </div>
      <div class="date">{{ date | formatterDate }}</div>
    </header>
    <section>
      <div class="left">
        <div style="width: 100%">
          <dv-border-box-10>
            <div id="line"></div>
          </dv-border-box-10>
        </div>
        <div style="width: 100%">
          <dv-border-box-10>
            <div id="pie"></div>
          </dv-border-box-10>
        </div>
      </div>
      <div class="center">
        <div id="chinaMap"></div>
        <div style="width: 95%; height: 16rem; margin-top: 20px;margin-bottom: -100px;">
          <dv-border-box-10>
            <dv-scroll-ranking-board :config="config" style="width:90%;height:16rem; margin: 0 auto" />
          </dv-border-box-10>
        </div>
      </div>
      <div class="right">
        <div style="width: 100%">
          <dv-border-box-10>
            <div id="bar"></div>
          </dv-border-box-10>
        </div>
        <div style="width: 100%">
          <dv-border-box-10>
            <div id="radar"></div>
          </dv-border-box-10>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
  import apis from "@/apis";
  import dayjs from "dayjs";
  import { predict, zoneAverageAQI } from "@/util";

  export default {
    name: "Main",
    data() {
      return {
        config: {
          data: [],
          rowNum: 4,
          sort: false
        },
        title: "《全国空气质量指数实时可视化平台》",
        date: Date.now(),
        totalData: {
          maxAQI: 0,
          minAQI: 0,
          provinces: [],
          provincesAQI: [],
          data: []
        },
        chinaMapOptions: {
          data: [],
          max: 0
        },
        lineOptions: {
          xAxisData: [],
          yAxisData: []
        },
        area: {
          "东北": ["黑龙江", "吉林", "辽宁"],
          "华北": ["北京", "天津", "河北", "山西", "内蒙古"],
          "华中": ["河南", "湖北", "湖南"],
          "华东": ["山东", "江苏", "安徽", "上海", "浙江", "江西", "福建", "台湾"],
          "华南": ["广东", "广西", "海南", "香港", "澳门"],
          "西北": ["陕西", "甘肃", "新疆", "青海", "宁夏"],
          "西南": ["四川", "贵州", "云南", "重庆", "西藏"]
        },
        allCities: [],
        categoryCities: []
      };
    },
    methods: {
      async findCategoryCities() {
        const bool = predict.call(this, "hyl-charts-categoryCities", "categoryCities");
        if (!bool) {
          const res = await apis.getCategoryCities();
          this.categoryCities = res.data;
          localStorage.setItem("hyl-charts-categoryCities", JSON.stringify(res.data));
        }
      },
      async findCityAll() {
        const bool = predict.call(this, "hyl-charts-allCities", "allCities");
        if (!bool) {
          const res = await apis.getAll();
          this.allCities = res.data;
          localStorage.setItem("hyl-charts-allCities", JSON.stringify(res.data));
        }
      },
      findProvinces(success) {
        const provincesData = JSON.parse(localStorage.getItem("hyl-charts-provincesAQI"));
        if (provincesData) {
          success(provincesData);
        } else {
          apis.getProvincesAQI().then(res => success(res.data));
        }
      },
      filterProvinces(provinces) {
        const provinceMap = new Map();
        for (const province of provinces) {
          if (!provinceMap.has(province.city || province.name)) {
            provinceMap.set(province.city || province.name, province.aqi || province.value);
          }
        }
        let result = [];
        provinceMap.forEach((value, key) => result.push({ name: key, value: value }));

        this.totalData.maxAQI = Math.max(...provinceMap.values());
        this.totalData.minAQI = Math.min(...provinceMap.values());
        this.totalData.data = result;
        this.totalData.provinces = [...provinceMap.keys()];
        this.totalData.provincesAQI = [...provinceMap.values()];
        return result;
      },
      produceChinaMapChart(data) {
        this.chinaMapOptions.data = this.filterProvinces(data);
        this.chinaMapOptions.max = this.totalData.maxAQI;
        this.chinaMapOptions.min = this.totalData.minAQI;
        this.$charts.chinaMap.call(this, "chinaMap", this.chinaMapOptions);
      },
      produceLineChart(data) {
        this.lineOptions.xAxisData = this.totalData.provinces.slice(0, 10);
        this.lineOptions.seriesData = this.totalData.provincesAQI.slice(0, 10);
        this.$charts.line("line", this.lineOptions);
      }
    },
    filters: {
      formatterDate(val) {
        return dayjs(val).format("YYYY年MM月DD日 HH:mm:ss");
      }
    },
    created() {
      this.findCategoryCities();
      this.findCityAll();
    },
    mounted() {
      setInterval(() => this.date = Date.now(), 1000);
      this.findProvinces(async (data) => {
        data = this.filterProvinces(data);
        if (!localStorage.getItem("hyl-charts-provincesAQI")) {
          localStorage.setItem("hyl-charts-provincesAQI", JSON.stringify(data));
        }
        await this.produceChinaMapChart(data);
        await this.produceLineChart(data);
        this.$charts.pie("pie", { data: this.totalData.data });
        this.$charts.bar("bar", { xData: this.totalData.provinces, yData: this.totalData.provincesAQI });
        const radarData = zoneAverageAQI(this.area, this.totalData.data);
        this.$charts.radar("radar", {
          sData: {
            name: Object.keys(radarData),
            data: [Object.values(radarData)],
            indicatorMax: Math.max(...Object.values(radarData))
          }
        });
        this.$nextTick(() => {
          this.$set(this.config, "data", this.totalData.data);
          this.config = { ...this.config };
        });

      });
    }
  };
</script>

<style scoped>

    header {
        height: 3rem;
        display: flex;
        align-items: center;
        color: #1370FB;
    }

    header .title {
        width: 60rem;
        text-align: right;
        font-size: 2rem;
        font-weight: bolder;
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-left: 14rem;
        padding-top: 2rem;
        line-height: 2rem;
    }

    header .date {
        flex-grow: 1;
        text-align: left;
        margin-top: 20px;
    }

    section {
        height: 100vh;
        display: flex;
    }

    section .left, .right {
        width: 26rem;
        display: flex;
        flex-direction: column;
        flex-wrap: nowrap;
    }

    section .center {
        flex-grow: 1;
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    section .center #chinaMap {
        width: 100%;
        height: 28.7rem;
    }

    section .right div {
        margin: 0 auto;
    }

    section .left div {
        width: 96%;
        height: 21rem;
        margin: 1rem auto;
    }

    section .right div {
        width: 96%;
        height: 21rem;
        margin: 1rem auto;
    }

    section #line, #pie, #bar, #radar {
    }
</style>