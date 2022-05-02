<template>
  <div id="city">
    <div class="container">
      <div class="cityLeft">
        <div style="width: 100%; margin: 0 auto;">
          <!--          <dv-border-box-10>-->
          <ve-funnel-chart :data="options.veCharts" :settings="chartSettings"
                           style="padding-top:1rem;" />
          <!--          </dv-border-box-10>-->
        </div>
        <div id="city-bar"></div>
      </div>
      <div style="width: 100%; display: flex; flex-direction: column;">
        <div>
          <button class="back" @click="back">回到首页</button>
        </div>
        <div :id="$route.params.pinyinName"></div>
      </div>
    </div>
  </div>
</template>

<script>
  import { areaDataCategory, toChartData, toKeysAndValues } from "@/util";

  export default {
    data() {
      return {
        cityInfo: {
          name: "",
          pinyinName: ""
        },
        categoryCities: [],
        citiesAQI: [],
        options: {
          raw: {
            data: [],
            max: 300,
            min: 0
          },
          veCharts: {
            dimensions: {
              name: "市",
              data: []
            },
            measures: [{
              name: "AQI",
              data: []
            }]
          }
        },
        chartSettings: {
          labelPosition: "inside"
        }
      };
    },
    methods: {
      back() {
        history.go(-1);
      }
    },
    created() {
      this.categoryCities = JSON.parse(localStorage.getItem("hyl-charts-categoryCities"));
      this.citiesAQI = JSON.parse(localStorage.getItem("hyl-charts-citiesAQI"));
    },
    mounted() {
      if (!this.$route.params.name) {
        history.go(-1);
        // // this.$router.push({name:'Main'});
        // location.href = 'http://www.hyl.wiki/'
      } else {
        const cities = areaDataCategory(this.categoryCities, this.citiesAQI, this.$route.params.name);
        this.options.data = toChartData(cities, this.$route.params.cityNameMap);
        const [provinces, AQI] = toKeysAndValues(this.options.data);
        this.$set(this.options.veCharts.measures[0], "data", AQI);
        this.$set(this.options.veCharts.dimensions, "data", provinces);
        this.options.max = Math.max(...AQI);
        this.options.min = Math.min(...AQI);
        this.$charts.cityMap(this.$route.params.pinyinName, this.options);
        this.$charts.bar("city-bar", { xData: provinces, yData: AQI });
      }
    }
  };
</script>

<style scoped>
    .back {
        padding: 10px 20px;
        background-color: #90CBF3;
        border: solid 1px;
        border-radius: 15px;
        transition: 0.6s;
        margin-left: 10rem;
        position: absolute;
        top: 2rem;
        z-index: 99999;
    }

    .back:hover {
        cursor: pointer;
        background-color: gainsboro;
    }

    #city .container {
        width: 100%;
        height: 100%;
        display: flex;
        flex-wrap: nowrap;
    }

    #city .cityLeft {
        width: 50%;
        height: 100vh;
        display: flex;
        flex-direction: column;
    }

    #city .container div:nth-of-type(2) {
        flex-grow: 1;
        /*width: 35rem;*/
        /*height: 35rem;*/
    }
</style>