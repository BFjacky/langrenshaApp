<template>
  <div class="personal_all">
      <div class="header">
        <div class="touxiang_icon"></div>
        <div class="text">
          <div class="text_h4">{{name}}</div>
          <div class="text_h5">ID:{{id}}</div>
        </div>
        <div class="zhanwei"></div>
        <div class="more_icon"></div>
      </div>
      <div class="main"></div>
  </div>
</template>
<script>
export default {
  data: function() {
    return {
      name: "NineLives", //昵称
      id: "13363688" //用户id
    };
  }
};
</script>
<style scoped>
.personal_all {
  height: 100%;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
}
.header {
  width: 100vw;
  height: 20vh;
  border: 0px solid black;
  background-image: url(../../assets/yuncai.png);
  background-size: 100%;
  display: flex;
  align-items: center;
}
.touxiang_icon {
  width: 75px;
  height: 75px;
  border: 1px solid black;
  border-radius: 50%;
  margin-left: 20px;
}
.text {
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: 3%;
}
.text_h4 {
  font-size: 120%;
}
.text_h5 {
  font-size: 80%;
  margin-top: 5%;
}
.zhanwei {
  flex-grow: 1;
}
.more_icon {
  background-image: url(../../assets/arrowRight.png);
  background-size: 100%;
  height: 30px;
  width: 30px;
  margin-right: 10px;
}
</style>
