<template>
  <div class="shouye">
      <div class="header">
      </div>
      <div class="content">
          <card type="1" title="进入房间" class="card1" v-on:clicklick="clickCard"></card>
          <card type="2" title="创建房间" class="card2" v-on:clicklick="clickCard"></card>
      </div>
      <mt-popup v-model="newRoom" popup-transition="popup-fade" position='bottom' class="popup_up">
          <div class="rangeBox">
            <div class="title">村民数量:{{cm_number}}</div><mt-range class="rangeLine" v-model="cm_number":min="1":max="9":step="1":bar-height="5"> </mt-range>
          </div>
          <div class="rangeBox">
            <div class="title">狼人数量:{{lr_number}}</div><mt-range class="rangeLine" v-model="lr_number":min="1":max="9":step="1":bar-height="5"> </mt-range>
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
      </mt-popup>
      <div class="show_zrs" v-show="newRoom">总人数:{{people_number}}</div>
  </div>
</template>
<script>
import card from "./card";
import { Popup, Range, Switch } from "mint-ui";
export default {
  components: {
    card: card,
    mtPopup: Popup,
    mtRange: Range,
    mtSwitch: Switch
  },
  data: function() {
    return {
      newRoom: false,
      cm_number: 1,
      lr_number: 1,
      yvyanjia: false,
      nvwu: false,
      lieren: false,
      shouwei: false,
      baichi: false,
      qishi: false,
      bailangwang: false,
      people_number: 2
    };
  },
  methods: {
    clickCard: function(title) {
      if (title === "创建房间") {
        console.log("创建房间");
        this.newRoom = true;
      }
      if (title === "进入房间") {
        console.log("进入房间");
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
  background: linear-gradient(
    to bottom,
    rgba(204, 204, 153, 0.4),
    rgba(204, 204, 153, 0.7)
  );
}
.header {
  height: 30vh;
  background: transparent;
}
.content {
  margin-top: 5vh;
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
  background-color: #99cc33;
  color: #ffffff;
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
  left: 50%;
  font-size: 10vw;
  font-weight: 700;
  transform: translateX(-50%);
  top: 15%;
}
</style>
