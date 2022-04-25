<template>
  <div id="main">
    <header>
      <div class="title">我是标题我是标题我是标题</div>
      <div class="date">我是日期</div>
    </header>
    <section>
      <div class="left"></div>
      <div class="center">
        <div class="innerHeader"></div>
        <div id="chinaMap"></div>
      </div>
      <div class="right"></div>
    </section>
  </div>
</template>

<script>
  import apis from "@/apis";

  export default {
    name: "Main",
    methods: {
      async findProvinces() {
        const provincesAQI = await apis.getProvincesAQI();
        return provincesAQI;
      }
    },
    created() {
      console.log(this.findProvinces());
    },
    mounted() {

    }

  };
</script>

<style scoped>

    header {
        height: 4rem;
        background-color: rosybrown;
        display: flex;
        align-items: center;
    }

    header .title {
        width: 58rem;
        text-align: right;
        background-color: deepskyblue;
        font-size: 2rem;
        font-weight: bolder;
    }

    header .date {
        flex-grow: 1;
        background-color: coral;
        text-align: center;
    }

    section {
        height: 100vh;
        display: flex;
    }

    section .left, .right {
        flex-grow: 1;
        background-color: silver;
    }

    section .center {
        width: 49rem;
        background-color: lightblue;
        display: flex;
        flex-direction: column;
    }
    section .center .innerHeader{
        height: 10rem;
    }
    section .center #chinaMap{
        flex-grow: 1;
        background-color: red;
    }
</style>