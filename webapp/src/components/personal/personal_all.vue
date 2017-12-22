<template>
  <div class="personal_all">
      <div class="header" v-on:click="gotoPersonalPage">
        <div class="touxiang_icon"></div>
        <div class="text">
          <div class="text_h4">{{name}}</div>
          <div class="text_h5">ID:{{id}}</div>
        </div>
        <div class="zhanwei"></div>
        <canvas id="more_icon" width="30" height="30"></canvas>
        <!--div class="more_icon"></div-->
      </div>
      <div class="main">

        <div class="buttonBar" >
          <blockbutton v-on:clicklick="gotoNextPage" title="游戏背景" type=1></blockbutton>
        </div>
        <div class="buttonBar">
          <blockbutton v-on:clicklick="gotoNextPage"title="狼人杀词典" type=2></blockbutton>
        </div>
        <div class="buttonBar">
          <blockbutton v-on:clicklick="gotoNextPage" title="游戏规则" type=3></blockbutton>
        </div>    
        <div class="buttonBar">
          <blockbutton title="分享给好友"type=4></blockbutton>
        </div>
        <div class="buttonBar">
          <blockbutton  v-on:clicklick="gotoNextPage" title="开发者"type=5></blockbutton>        
        </div>
        <div class="buttonBar">
          <blockbutton title=""type=6 ></blockbutton>        
        </div>

      </div>
  </div>
</template>
<script>
import $ from "jquery";
import blockbutton from "./blockbutton";
import { Popup } from "mint-ui";
import personDetail from "./personalDetail";
import axios from "axios";
export default {
  data: function() {
    return {
      name: "请先登录", //昵称
      id: "" //用户id
    };
  },
  methods: {
    gotoPersonalPage: function() {
      //跳转至个人信息页面
      if (!this.$common.status.hasLogin) {
        //如果没有用户登陆，跳转至用户登陆界面
        this.$router.push({ name: "loginPage" });
        return;
      }

      this.$router.push({ name: "personalDetail" });
    },
    gotoNextPage: function(title) {
      console.log(title);
      //跳转至游戏规则界面
      switch (title) {
        case "游戏规则": {
          this.$router.push({ name: "gamerule" });
          break;
        }
        case "狼人杀词典": {
          this.$router.push({ name: "cidian" });
          break;
        }
        case "游戏背景": {
          this.$router.push({ name: "gameBackground" });
          break;
        }
        case "开发者": {
          this.$router.push({ name: "developer" });
          break;
        }
      }
    }
  },
  created: async function() {
    const _this = this;
    //获取name id
    let result = await axios({
      url: _this.$common.url.host + _this.$common.url.userGetInfo,
      method: "POST",
      withCredentials: true,
      data: {}
    });
    this.name = result.data.info.name;
    this.id = result.data.info.id;
  },
  mounted: function() {
    var cas = $("#more_icon")[0].getContext("2d");
    cas.moveTo(20, 5);
    cas.lineTo(30, 15);
    cas.lineTo(20, 25);
    cas.lineWidth = 3;
    cas.strokeStyle = "#b6c4bd";
    cas.stroke();
  },
  components: {
    blockbutton,
    mtPopup: Popup,
    personDetail
  },
  watch: {
    name: function() {
      if (this.name === undefined) {
        //name字符串为空的时候，为其更新为请先登录
        console.log("here");
        this.name = "请先登录";
      }
    }
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
    to bottom,
    rgba(255, 255, 255, 0.9),
    rgba(230, 230, 230, 0.7)
  );
  /*background-image: url(../../assets/yuncai.png);*/
  background-size: 100%;
  display: flex;
  align-items: center;
  box-shadow: 0px 1px 5px 0px rgba(200, 204, 204, 0.3);
}
.touxiang_icon {
  width: 75px;
  height: 75px;
  border: 0px solid #000000;
  border-radius: 50%;
  margin-left: 20px;
  box-shadow: 0px 0px 1px 2px rgb(224, 224, 224);
}
.text {
  color: #000000;
  display: flex;
  flex-direction: column;
  justify-content: center;
  font-weight: 700;
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
#more_icon {
  /*background-image: url(../../assets/arrowRight.png);*/
  margin-right: 20px;
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
