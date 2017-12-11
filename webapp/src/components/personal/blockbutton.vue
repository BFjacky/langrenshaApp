<template>
  <div class="blackbutton" v-on:click="buttonClick" v-on:touchstart="touchstart" v-on:touchend="touchend" v-bind:class="status">
      <div class="iconBack">
        <div class="buttonIcon"></div>
      </div>
      <div class="buttonText">游戏规则</div>
  </div>
</template>
<script>
export default {
  data: function() {
    return {
      status: ""
    };
  },
  methods: {
    buttonClick: function() {},
    touchstart: function() {
      this.status = "beSmall";
    },
    touchend: function() {
      this.status = "beBig";
    }
  }
};
</script>
<style scoped>
.blackbutton {
  height: 80px; /*测试时使用100px*/
  width: 60px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.iconBack {
  height: 75%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(to bottom right, #c6f6f9, #18cfdc);
  border-radius: 25%;
}
.buttonIcon {
  height: 50%;
  width: 50%;
  background-image: url(../../assets/guize.svg);
}
.buttonText {
  height: 25%;
  width: 100%;
  font-size: 80%;
  text-align: center;
  letter-spacing: 2px;
  padding-left: 2px;
  margin-top: 3px;
}
@keyframes small {
  0% {
    transform: scale(1);
  }
  100% {
    transform: scale(0.85);
  }
}
@keyframes big {
  0% {
    transform: scale(0.85);
  }
  100% {
    transform: scale(1);
  }
}
.beSmall {
  animation: small 0.2s forwards;
}
.beBig {
  animation: big 0.2s forwards;
}
</style>
