<template>
  <div id="app">
    <mt-header title="狼人杀" class="header" v-bind:fixed="mytrue">
        <mt-button icon="back" slot="left">back</mt-button>
        <mt-button icon="more" slot="right"></mt-button>
    </mt-header>
    <router-view class="my_router"></router-view>
  </div>
</template>

<script>
import { Header, Button } from "mint-ui";
export default {
  name: "app",
  data: function() {
    return {
      mytrue: true
    };
  },
  components: {
    mtHeader: Header,
    mtButton: Button
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
.header {
  background-color: #454545;
  height:45px
}
.my_router {
  margin-top: 45px;
}
body,
html {
  margin: 0;
  padding: 0;
}
</style>
