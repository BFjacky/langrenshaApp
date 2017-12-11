<template>
  <div class="blackbutton" v-on:click="buttonClick" v-on:touchstart="touchstart" v-on:touchend="touchend" v-bind:class="status" v-on:AnimationEnd="AnimationEnd">
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
    },
    AnimationEnd: function() {
      this.status = "";
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
}
.color1 {
  background: linear-gradient(
    to bottom right,
    rgba(198, 246, 249, 0.2),
    rgba(24, 207, 220, 0.7)
  );
}
.color2 {
  background: linear-gradient(
    to bottom right,
    rgba(248, 209, 118, 0.2),
    rgba(239, 173, 20, 0.7)
  );
}
.color3 {
  background: linear-gradient(
    to bottom right,
    rgba(164, 249, 210, 0.2),
    rgba(37, 251, 151, 0.7)
  );
}

.buttonIcon {
  height: 60%;
  width: 60%;
  /*background-image: url(../../assets/guize.svg);*/
  opacity: 1;
}
.buttonText {
  height: 25%;
  width: 100%;
  font-size: 80%;
  text-align: center;
  letter-spacing: 1px;
  padding-left: 1px;
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
