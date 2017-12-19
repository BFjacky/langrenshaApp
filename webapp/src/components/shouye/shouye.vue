<template>
  <div class="shouye">
      <div class="header">
        <div class="backimg"></div>
      </div>
      <div class="content">
          <card type="1" title="进入房间" class="card1" v-on:clicklick="clickCard"></card>
          <card type="2" title="创建房间" class="card2" v-on:clicklick="clickCard"></card>
      </div>
      <mt-popup v-model="newRoom" popup-transition="popup-fade" position='bottom' class="popup_up" v-bind:class="{popup_down:!newRoom}">
          <div class="rangeBox">
            <div class="title">村民数量:{{cm_number}}</div><mt-range class="rangeLine" v-model="cm_number" :min="0" :max="9" :step="1" :bar-height="5"> </mt-range>
          </div>
          <div class="rangeBox">
            <div class="title">狼人数量:{{lr_number}}</div><mt-range class="rangeLine" v-model="lr_number" :min="0" :max="9" :step="1" :bar-height="5"> </mt-range>
          </div>
          <div class="rangeBox">
            <div class="title2">预言家</div><mt-switch class="switch" v-model="yvyanjia"></mt-switch>
          </div>
           <div class="rangeBox">
            <div class="title2">女巫</div><mt-switch class="switch" v-model="nvwu"></mt-switch>
          </div>
           <div class="rangeBox">
            <div class="title2">猎人</div><mt-switch class="switch" v-model="lieren"></mt-switch>
          </div>
           <div class="rangeBox">
            <div class="title2">守卫</div><mt-switch class="switch" v-model="shouwei"></mt-switch>
          </div>
          <div class="rangeBox">
            <div class="title2">白痴</div><mt-switch class="switch" v-model="baichi"></mt-switch>
          </div>
            <div class="rangeBox">
          <div class="title2">骑士</div><mt-switch class="switch" v-model="qishi"></mt-switch>
          </div>
          <div class="rangeBox">
            <div class="title2">白狼王</div><mt-switch class="switch" v-model="bailangwang"></mt-switch>
          </div>
          <div class="rangeBox_confirm">
            <div class="title2" v-on:click="createRoom">创建房间</div>
          </div>
      </mt-popup>
      <div class="show_zrs"  v-show="zrsShow" v-bind:class="{fadein:newRoom,fadeout:!newRoom}" v-on:animationend="shouldDisplay">总人数:{{people_number}}</div>
  </div>
</template>
<script>
import card from "./card";
import axios from "axios";
import { Popup, Range, Switch, Toast, Indicator, MessageBox } from "mint-ui";
export default {
  components: {
    card: card,
    mtPopup: Popup,
    mtRange: Range,
    mtSwitch: Switch
  },
  data: function() {
    return {
      //总人数标记
      zrsShow: false,

      newRoom: false,
      cm_number: 0,
      lr_number: 0,
      yvyanjia: false,
      nvwu: false,
      lieren: false,
      shouwei: false,
      baichi: false,
      qishi: false,
      bailangwang: false,
      people_number: 0
    };
  },
  methods: {
    clickCard: async function(title) {
      const _this = this;
      if (title === "创建房间") {
        this.newRoom = true;
        //显示总人数牌子
        this.zrsShow = true;
      }
      if (title === "进入房间") {
        //处理进入房间的请求-->弹出输入文本框
        MessageBox.prompt("请输入房间号").then(async ({ value, action }) => {
          //用户点击了提示框的确认按钮
          if (action === "confirm") {
            Indicator.open({
              text: "正在进入房间",
              spinnerType: "triple-bounce"
            });
            let goResult = await axios({
              url: _this.$common.url.host + _this.$common.url.roomGo,
              method: "POST",
              data: {
                roomNumber: value
              },
              withCredentials: true
            });
            Indicator.close();

            //进入房间失败
            if (!goResult.data.success) {
              Toast({
                message: goResult.data.message,
                position: "middle",
                duration: 1000
              });
              return;
            }
            //进入房间成功
            Toast({
              message: goResult.data.message,
              position: "middle",
              duration: 1000
            });
            //进入房间成功-->发出跳转到房间页面事件
            _this.$emit("skipRoomPage", value);
          }
        });
      }
    },
    //判断总人数标记是否需要显示
    shouldDisplay: function() {
      if (!this.newRoom) {
        this.zrsShow = false;
      }
    },
    //计算总人数的方法
    calculate: function() {
      this.people_number = this.cm_number + this.lr_number;
      //预言家
      if (this.yvyanjia) {
        this.people_number++;
      }
      //女巫
      if (this.nvwu) {
        this.people_number++;
      }
      //猎人
      if (this.lieren) {
        this.people_number++;
      }
      //守卫
      if (this.shouwei) {
        this.people_number++;
      }
      //白痴
      if (this.baichi) {
        this.people_number++;
      }
      //骑士
      if (this.qishi) {
        this.people_number++;
      }
      //白狼王
      if (this.bailangwang) {
        this.people_number++;
      }
    },
    //创建房间
    createRoom: async function() {
      const _this = this;

      //显示加载中过渡效果
      Indicator.open({
        text: "创建中",
        spinnerType: "triple-bounce"
      });

      let createResult = await axios({
        url: _this.$common.url.host + _this.$common.url.roomCreate,
        withCredentials: true,
        data: {
          roomInfo: {
            people_number: _this.people_number,
            cm_number: _this.cm_number,
            lr_number: _this.lr_number,
            yvyanjia: _this.yvyanjia,
            nvwu: _this.nvwu,
            lieren: _this.lieren,
            shouwei: _this.shouwei,
            baichi: _this.baichi,
            qishi: _this.qishi,
            bailangwang: _this.bailangwang
          }
        },
        method: "POST"
      });

      Indicator.close();
      //创建失败
      if (!createResult.data.success) {
        Toast({
          message: createResult.data.message,
          position: "middle",
          duration: 5000
        });
        return;
      }
      //创建成功
      this.successToast = Toast({
        message: "房间号:" + createResult.data.roomNumber,
        position: "middle",
        duration: 2000
      });

      //收回弹出窗
      this.newRoom = false;
      //总人数牌子
      this.zrsShow = false;
    }
  },
  watch: {
    cm_number: function() {
      this.calculate();
    },
    lr_number: function() {
      this.calculate();
    },
    yvyanjia: function() {
      this.calculate();
    },
    nvwu: function() {
      this.calculate();
    },
    lieren: function() {
      this.calculate();
    },
    shouwei: function() {
      this.calculate();
    },
    baichi: function() {
      this.calculate();
    },
    qishi: function() {
      this.calculate();
    },
    bailangwang: function() {
      this.calculate();
    }
  }
};
</script>
<style scoped>
.shouye {
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  /* background: linear-gradient(
    to bottom,
    rgba(204, 204, 153, 0.4),
    rgba(204, 204, 153, 0.7)
  ); */
  background: linear-gradient(to bottom, rgb(0, 0, 0), rgba(0, 0, 0, 0.7));
}
.header {
  margin-top: 5vh;
  height: 20vh;
  background: transparent;
  padding: 0;
  /* background: linear-gradient(to bottom, rgb(0, 0, 0), rgba(0, 0, 0, 0.7)); */
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
}
.backimg {
  background-image: url(../../assets/ele/16.png);
  background-size: 100% 100%;
  height: 90%;
  width: 90%;
}
.content {
  margin-top: 10vh;
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
}
.card1 {
  align-self: flex-start;
  margin-left: 3vw;
}
.card2 {
  align-self: flex-end;
  margin-top: 5vh;
  margin-right: 3vw;
}
.popup_up {
  width: 100vw;
  height: 60vh;
  overflow: auto;
  /* position: absolute; */
  animation: goup 0.3s forwards;
  background-color: #ffffff;
}
.popup_down {
  animation: godown 0.3s forwards;
}
@keyframes godown {
  0% {
    transform: translateY(0, 0, 0);
  }
  100% {
    transform: translate3d(-50%, 100%, 0);
  }
}
@keyframes goup {
  0% {
    transform: translate3d(-50%, 100%, 0);
  }
  100% {
    transform: translateY(0, 0, 0);
  }
}
.rangeBox {
  display: flex;
  height: 7vh;
  line-height: 7vh;
  align-items: center;
  padding-left: 2vw;
  padding-right: 2vw;
  font-size: 5vw;
  margin-bottom: 1vh;
  background-color: #686868;
  color: #ffffff;
}
.rangeBox_confirm {
  display: flex;
  height: 7vh;
  line-height: 7vh;
  align-items: center;
  padding-left: 2vw;
  padding-right: 2vw;
  font-size: 5vw;
  background-color: #3b3b3b;
  color: #ffffff;
  text-align: center;
  letter-spacing: 5px;
}
.rangeLine {
  flex-grow: 1;
  margin-left: 2vw;
}
.title2 {
  flex-grow: 1;
}
.show_zrs {
  position: absolute;
  width: 100vw;
  font-size: 10vw;
  font-weight: 700;
  top: 23%;
  text-align: center;
  color: #dfd9d9;
}

.fadein {
  animation: befadein 0.3s forwards;
}
.fadeout {
  animation: befadeout 0.3s forwards;
}
@keyframes befadein {
  0% {
    opacity: 0;
    transform: scale(0.5);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}
@keyframes befadeout {
  0% {
    opacity: 1;
    transform: scale(1);
  }
  100% {
    opacity: 0;
    transform: scale(0.5);
  }
}
</style>
