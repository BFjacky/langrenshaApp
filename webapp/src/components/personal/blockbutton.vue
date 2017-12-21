<template>
  <div class="blackbutton" v-on:click="buttonClick" v-on:touchstart="touchstart" v-on:touchend="touchend" v-bind:class="status" >
      <div class="iconBack" v-bind:class="{color1:type==1,color2:type==2,color3:type==3,color4:type==4,
      color5:type==5,color6:type==6,color7:type==7,color8:type==8,color9:type==9}">
        <div class="buttonIcon"></div>
      </div>
      <div class="buttonText">{{title}}</div>
  </div>
</template>
<script>
export default {
  props: ["title", "imgurl", "type"],
  //按钮名称
  //imgurl
  //背景颜色颜色type

  data: function() {
    return {
      status: "beBig"
    };
  },
  methods: {
    buttonClick: function() {
      this.$emit("clicklick", this.title);
    },
    touchstart: function() {
      this.status = "beSmall";
    },
    touchend: function() {
      this.status = "beBig";
    },
    AnimationEnd: function() {
      if (this.status === "beBig") {
        this.status = "";
      }
    }
  },
  watch: {
    status: function() {
      console.log("status:", this.status);
    }
  }
};
</script>
<style scoped>
.blackbutton {
  height: 23vw; /*测试时使用100px*/
  width: 18vw;
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
  border-radius: 25%;
  box-shadow: 0px 0px 2px 2px rgba(200, 204, 204, 0.3);
}
.color1 {
  background-image: url(../../assets/ele/31.png);
  background-size: 100% 100%;
  opacity: 0.8;
}
.color2 {
  background-image: url(../../assets/ele/32.png);
  background-size: 100% 100%;
  opacity: 0.8;
}
.color3 {
  background-image: url(../../assets/ele/33.png);
  background-size: 100% 100%;
  opacity: 0.8;
}
.color4 {
  background-image: url(../../assets/ele/29.png);
  background-size: 100% 100%;
  opacity: 0.8;
}
.color5 {
  background-image: url(../../assets/ele/30.png);
  background-size: 100% 100%;
  opacity: 0.8;
}
.color6{
   box-shadow: 0px 0px 0px 0px rgba(200, 204, 204, 0.3);
}
.buttonIcon {
  height: 60%;
  width: 60%;
  /*background-image: url(../../assets/guize.svg);*/
  opacity: 1;
}
.buttonText {
  height: 25%;
  width: 140%;
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
