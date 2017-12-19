<template>
  <div class="card" v-on:click="buttonClick" v-on:touchstart="touchstart" v-on:touchend="touchend" 
  v-bind:class="{color1:type==1,color2:type==2,beSmall:status_beSmall,beBig:status_beBig}">
  <div class="title" >{{title}}</div>
   <div class="backimg" v-bind:class="{tietu1:type==1,tietu2:type==2}"></div>
  </div>
</template>
<script>
export default {
  props: ["type", "title"],
  data: function() {
    return {
      status_beSmall: false,
      status_beBig: true
    };
  },
  methods: {
    buttonClick: function() {
      this.$emit("clicklick", this.title);
    },
    touchstart: function() {
      this.status_beBig = false;
      this.status_beSmall = true;
    },
    touchend: function() {
      this.status_beSmall = false;
      this.status_beBig = true;
    }
  }
};
</script>
<style scoped>
.card {
  padding: 10px;
  display: flex;
  align-items: center;
  height: 15vh;
  width: 50vw;
  border: 0px solid black;
  border-radius: 10px;
  justify-content: space-between;
}
.backimg {
  background-size: 100% 100%;
  width: 15vw;
  height: 100%;
}
.tietu1 {
  background-image: url(../../assets/ele/13.png);
}
.tietu2 {
  background-image: url(../../assets/ele/18.png);
}
.color1 {
  background: linear-gradient(
    to bottom right,
    rgba(252, 252, 252, 0.5),
    rgba(233, 233, 233, 0.322)
  );
  color: #ffffff;
}
.color2 {
  background: linear-gradient(
    to bottom right,
    rgba(255, 255, 255, 0.7),
    rgb(250, 255, 234)
  );
  color: rgb(58, 58, 58);
}
.title {
  font-size: 4vh;
  letter-spacing: 3px;
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
