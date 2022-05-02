<template>
  <div id="main">
    <header>
      <div class="title">
        <div>{{ title }}</div>
        <div style="font-size: 1rem;color: #90CBF3;text-align: center;z-index: 99999">数据来源：中国环境监测总站</div>
      </div>
      <div class="date">
        <div>数据更新时间：{{ date | formatterDate }}</div>
        <div>下次更新时间：{{ update.gap }}分钟后</div>
      </div>
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
        update: {
          gap: 0,
          date: 0
        },
        config: {
          data: [],
          rowNum: 4,
          sort: false
        },
        title: "《全国空气质量指数实时可视化平台》",
        date: 0,
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
        categoryCities: [],
        cityNameMap: null
      };
    },
    methods: {
      async findAll() {
        const bool = predict.call(this, "hyl-charts-all", "cityNameMap");
        if (bool) {
          const map = new Map();
          this.cityNameMap.forEach(item => {
            const arr = item["mergerName"].split(",");
            map.set(item["city"], arr[arr.length - 1]);
          });
          this.cityNameMap = map;
        } else {
          const res = await apis.getAll();
          this.cityNameMap = new Map();
          res.data.forEach(item => {
            const arr = item["mergerName"].split(",");
            this.cityNameMap.set(item["city"], arr[arr.length - 1]);
          });
          localStorage.setItem("hyl-charts-all", JSON.stringify(res.data));
        }
      },
      async findCategoryCities() {
        const bool = predict.call(this, "hyl-charts-categoryCities", "categoryCities");
        if (!bool) {
          const res = await apis.getCategoryCities();
          this.categoryCities = res.data;
          localStorage.setItem("hyl-charts-categoryCities", JSON.stringify(res.data));
        }
      },
      async findCities() {
        const bool = predict.call(this, "hyl-charts-citiesAQI", "allCities");
        if (!bool) {
          const res = await apis.getCitiesAQI();
          this.allCities = res.data;
          localStorage.setItem("hyl-charts-citiesAQI", JSON.stringify(res.data));
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
      },
      initData() {
        async function init(callback) {
          const res1 = await apis.getAll();
          const res2 = await apis.getCategoryCities();
          const res3 = await apis.getCitiesAQI();
          // const res4 = await apis.getOrderCities();
          const res4 = await apis.getProvincesAQI();

          await callback(res1, res2, res3, res4);
        }

        init((...args) => {
          const cacheName = ["hyl-charts-all", "hyl-charts-categoryCities", "hyl-charts-citiesAQI", "hyl-charts-provincesAQI"];
          args.forEach((res, index, arr) => {
            localStorage.setItem(cacheName[index], JSON.stringify(res.data));
          });
        });
      },
      updateTime() {
        const updateTime = localStorage.getItem("hyl-charts-updateTime");
        if (updateTime) {
          const gap = dayjs(Date.now()).minute() - dayjs(updateTime * 1).minute();
          this.$set(this.update, "date", updateTime * 1);
          this.$set(this.update, "gap", 60 - gap);
          if (gap >= 60) {
            this.initData();
            location.reload();
          }
          console.log(`${60 - gap ? 60 - gap : 60}分钟后更新数据...`);
          this.date = updateTime * 1;
        } else {
          this.$set(this.update, "date", Date.now());
          localStorage.setItem("hyl-charts-updateTime", this.update.date + "");
          this.initData();
        }
      }
    },
    filters: {
      formatterDate(val) {
        return dayjs(val).format("YYYY年MM月DD日 HH:mm:ss");
      }
    },
    created() {
      this.findCategoryCities();
      this.findCities();
      this.findAll();
      this.updateTime();
      setInterval(() => {
        this.updateTime();
      }, 60000);
    },
    mounted() {
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
        width: 50rem;
        text-align: right;
        font-size: 2rem;
        font-weight: bolder;
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-left: 20rem;
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