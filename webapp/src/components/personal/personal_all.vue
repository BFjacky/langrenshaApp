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
      <div class="main">
        
        <div class="buttonBar">
          <blockbutton title="游戏规则" type=1></blockbutton>
        </div>
        <div class="buttonBar">
          <blockbutton title="游戏规则" type=2></blockbutton>
        </div>
        <div class="buttonBar">
          <blockbutton title="游戏规则" type=3></blockbutton>
        </div>
        
        <div class="divide_line"></div>
       
        <div class="buttonBar">
          <blockbutton title="游戏规则"type=3></blockbutton>
        </div>
        <div class="buttonBar">
          <blockbutton title="游戏规则"type=1></blockbutton>
        </div>
        <div class="buttonBar">
          <blockbutton title="游戏规则"type=2></blockbutton>        
        </div>

        <div class="divide_line"></div>

        <div class="buttonBar">
          <blockbutton title="游戏规则"type=2></blockbutton>
        </div>
        <div class="buttonBar">
          <blockbutton title="游戏规则"type=3></blockbutton>
        </div>
        <div class="buttonBar">
          <blockbutton title="游戏规则"type=1></blockbutton>        
        </div>
      </div>
  </div>
</template>
<script>
import $ from "jquery";
import blockbutton from "./blockbutton";
export default {
  data: function() {
    return {
      name: "NineLives", //昵称
      id: "13363688" //用户id
    };
  },
  components: {
    blockbutton
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
  background: linear-gradient(
    to bottom right,
    rgba(195, 241, 245, 0.5),
    rgba(71, 229, 241, 0.7)
  );
  /*background-image: url(../../assets/yuncai.png);*/
  background-size: 100%;
  display: flex;
  align-items: center;
}
.touxiang_icon {
  width: 75px;
  height: 75px;
  border: 1px solid #b6c4bd;
  border-radius: 50%;
  margin-left: 20px;
}
.text {
  color: #b6c4bd;
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
.main {
  border: 1px soild black;
  display: flex;
  flex-wrap: wrap;
  width: 100vw;
  justify-content: center;
}
.buttonBar {
  flex-grow: 1;
  display: flex;
  justify-content: center;
  width: 33%;
  padding-top: 30px;
  padding-bottom: 30px;
}
.divide_line {
  width: 100vw;
  border-top: 0px solid #f3f3f3;
}
</style>
