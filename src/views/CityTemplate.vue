<template>
  <div id="city">
    <div :id="$route.params.pinyinName"></div>
  </div>
</template>

<script>
  import apis from "@/apis";
  import { predict } from "@/util";

  export default {
    data() {
      return {
        cityInfo: {
          name: "",
          pinyinName: ""
        },
        categoryCities: [],
        allCities: []
      };
    },
    methods: {},
    created() {
      this.categoryCities = JSON.parse(localStorage.getItem("hyl-charts-categoryCities"));
      this.allCities = JSON.parse(localStorage.getItem("hyl-charts-allCities"));
    },
    mounted() {
      if (!this.$route.params.name) {
        this.$router.push("/");
      }
      this.$charts.cityMap(this.$route.params.pinyinName, { data: [], max: [], min: [] });
      console.log(this.categoryCities, this.allCities);
    }
  };
</script>

<style scoped>
    #city div:nth-of-type(1) {
        width: 400px;
        height: 400px;
    }
</style>