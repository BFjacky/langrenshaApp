<template>
  <div id="app">
    <!--mt-header title="狼人杀" class="header" v-bind:fixed="mytrue">
        <mt-button icon="back" slot="left">back</mt-button>
        <mt-button icon="more" slot="right"></mt-button>
    </mt-header-->
    <transition v-bind:name="transitionName">
    <router-view class="my_router"></router-view>
      </transition>
  </div>
</template>

<script>
import { Header, Button } from "mint-ui";
export default {
  name: "app",
  data: function() {
    return {
      mytrue: true,
      isback: false,
      transitionName: "forwardMov"
    };
  },
  components: {
    mtHeader: Header,
    mtButton: Button
  },
  watch: {
    $route: function() {
      //监听每次路由的变换是是否为后退
      this.isback = this.$common.isBackUrl(this.$route.name);
      if (this.isback) {
        this.transitionName = "backMov";
      } else {
        this.transitionName = "forwardMov";
      }
    }
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
  height: 45px;
}
.my_router {
  margin-top: 0px;
}
body,
html {
  margin: 0;
  padding: 0;
}
.forwardMov-enter-active {
  animation: forwardMov-in 0.4s;
}
.forwardMov-leave-active {
  animation: forwardMov-out 0.4s;
}
@keyframes forwardMov-in {
  0% {
    transform: translateX(100%);
    opacity: 0;
  }
  100% {
    transform: translateX(0%);
    opacity: 1;
  }
}
@keyframes forwardMov-out {
  0% {
    transform: translateX(0%);
    opacity: 1;
  }
  100% {
    transform: translateX(-100%);
    opacity: 0;
  }
}

.backMov-enter-active {
  animation: backMov-in 0.4s;
}
.backMov-leave-active {
  animation: backMov-out 0.4s;
}
@keyframes backMov-in {
  0% {
    transform: translateX(-100%);
    opacity: 0;
  }
  100% {
    transform: translateX(0%);
    opacity: 1;
  }
}
@keyframes backMov-out {
  0% {
    transform: translateX(0%);
    opacity: 1;
  }
  100% {
    transform: translateX(100%);
    opacity: 0;
  }
}
.router_view {
  position: absolute;
}
</style>
