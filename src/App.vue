<template>
  <div id="app">
    <dv-full-screen-container>
      <dv-border-box-1>
        <router-view></router-view>
      </dv-border-box-1>
    </dv-full-screen-container>
  </div>
</template>

<script>
  export default {


  };
</script>
<style>
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    body {
        width: 100vw;
        height: 100vh;
        font-size: 16px;
        overflow: hidden;
        /*overflow-y: scroll;*/
        /*background-color: #000A31;*/
        background: url(assets/2.png) center/cover no-repeat;
    }

    @media screen and (min-width: 1600px) {
        body {
            font-size: 22px;
        }
    }
</style>
