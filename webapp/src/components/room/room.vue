<template>
  <div class='room'>
      <div class="title_count" v-bind:class="{comeIn:countIn,comeOut:countOut}">{{roomInfo.countDown}}</div>
      <div class="header">
          <div class="title">房间号:{{roomNumber}}</div>
          <div class="tietu_title"></div>
      </div>
      <div class="seats" v-bind:class="{seats_backimg:roomNumber===''}">
          <div v-bind:class="{seat:!isVoting,highLight:isVoting}" v-for="seatNumber in seatsNumber" v-on:click="sitHere(seatNumber)">
            <div class="number_text">{{seatNumber}}</div>
            <div class="name_text">{{seats[seatNumber-1]===undefined?"":seats[seatNumber-1].name}}</div>
          </div>
      </div>
      <div class="btn_box">
        <div class="btn">使用技能</div>
        <div class="btn" v-on:touchstart="checkRole">查看身份</div>
        <div class="btn" v-on:click="voteButton">投票处决</div>
        <div class="hideButton"></div>
        <div class="hideButton"></div>
        <div class="hideButton">
          <div class="btn_son" v-bind:class="btn_son1_status" v-on:click="beginVote">发起投票</div>
          <div class="btn_son" v-bind:class="btn_son2_status" v-on:click="checkVotes">查看票型</div>
        </div>
      </div>
      <role-card v-bind:role="role" class="roleCard" v-bind:class="{comeIn:fadeIn,comeOut:fadeOut} "v-show="roleCardShow" v-on:animationend="rolecardEnd"></role-card>
  </div>
</template>
<script>
import axios from "axios";
import { Popup, Range, Switch, Toast, Indicator, MessageBox } from "mint-ui";
import roleCard from "./roleCard";
export default {
  props: ["roomNumber"],
  components: {
    roleCard: roleCard,
    MessageBox: MessageBox
  },
  data: function() {
    return {
      //座位号
      seatsNumber: [],
      //每个座位的seat内容{id:String,icon:String(src),name:String}
      seats: [],
      //该玩家身份
      role: "",
      //卡片淡入淡出效果
      fadeIn: false,
      fadeOut: true,
      roleCardShow: false,

      //room房间信息
      roomInfo: {},

      //倒计时牌子淡入淡出的动画
      countIn: false,
      countOut: false,

      //btn弹出框，动画
      btn_son1_status: "",
      btn_son2_status: "",
      btn_son3_status: "",

      //投票处决相关数据
      isVoting: false,
      choise_seatNumber: undefined,
      //所有玩家坐下则锁定座位
      lockSeat: false
    };
    i;
  },
  methods: {
    sitHere: async function(seatNumber) {
      const _this = this;
      //处于投票阶段,阻塞坐座位请求，只选中座位
      if (this.isVoting || this.lockSeat) {
        this.choise_seatNumber = seatNumber;
        console.log("你选中了" + this.choise_seatNumber + "座位");
        MessageBox.confirm(
          "投票给" + this.choise_seatNumber + "号玩家"
        ).then(async action => {
          if (action === "confirm") {
            //确认投票
            let voteKillResult = await axios({
              url: _this.$common.url.host + _this.$common.url.roomVoteKill,
              method: "POST",
              withCredentials: true,
              data: {
                roomNumber: _this.roomNumber,
                seatNumber: _this.choise_seatNumber
              }
            });
            console.log(voteKillResult);
          }
        });
        //处于非isVoting状态
        this.isVoting = false;
        return;
      }

      //发送后端，此人坐了此座位
      let sitResult = await axios({
        url: _this.$common.url.host + _this.$common.url.roomSitHere,
        method: "POST",
        withCredentials: true,
        data: {
          seatNumber: seatNumber,
          roomNumber: _this.roomNumber
        }
      });

      Toast({
        message: sitResult.data.message,
        position: "middle",
        duration: 1000
      });
    },
    //rolecard animationEnd =>>v-show = false
    rolecardEnd: function() {
      this.roleCardShow = false;
    },
    //checkRole点击事件，查看身份
    checkRole: async function() {
      const _this = this;
      //还没有获得身份
      if (_this.role == "") {
        let roleResult = await axios({
          url: _this.$common.url.host + _this.$common.url.roomCheckRole,
          method: "POST",
          withCredentials: true,
          data: {
            roomNumber: _this.roomNumber
          }
        });
        roleResult = roleResult.data;
        if (!roleResult.success) {
          //未能获取身份
          Toast({
            message: roleResult.message,
            position: "middle",
            duration: 1000
          });
          return;
        }
        //获取身份
        _this.role = roleResult.role;
      }
      //已经有身份了
      if (_this.role != "") {
        //淡入
        _this.roleCardShow = true;
        _this.fadeOut = false;
        _this.fadeIn = true;
        //2秒后淡出
        setTimeout(() => {
          _this.fadeIn = false;
          _this.fadeOut = true;
        }, 2000);
        return;
      }
    },
    //点击了投票按钮
    voteButton: function() {
      //字体弹出时间400ms
      const time = 400;

      //如果已经弹出按钮项则收回按钮项
      if (this.btn_son1_status === "moveup2") {
        this.btn_son3_status = "movedown4";
        setTimeout(() => {
          this.btn_son2_status = "movedown3";
        }, time / 2);
        setTimeout(() => {
          this.btn_son1_status = "movedown2";
        }, time);

        setTimeout(() => {
          this.btn_son3_status = "";
          this.btn_son2_status = "";
          this.btn_son1_status = "";
        }, 2 * time);

        return;
      }

      this.btn_son1_status = "moveup2";
      setTimeout(() => {
        this.btn_son2_status = "moveup3";
      }, time / 2);
      setTimeout(() => {
        this.btn_son3_status = "moveup4";
      }, time);
    },
    //点击了发起投票按钮
    beginVote: async function() {
      const _this = this;
      console.log("发起投票");
      let beginVoteResult = await axios({
        url: _this.$common.url.host + _this.$common.url.roomBeginVote,
        method: "POST",
        withCredentials: true,
        data: {
          roomNumber: _this.roomNumber
        }
      });
      if (!beginVoteResult.data.success) {
        Toast({
          message: beginVoteResult.data.message,
          position: "middle",
          duration: 1000
        });
      }
    },
    checkVotes: function() {
      console.log("查看票型");
    }
  },
  mounted: async function() {
    const _this = this;
  },
  watch: {
    //roomNumber变化，发送axios请求该房间的信息
    roomNumber: async function() {
      //初始化房间，恢复空房状态
      const _this = this;
      this.seats = [];
      this.roomInfo = {};
      this.role = "";
      console.log("初始化房间");

      let InfoResult = await axios({
        url: _this.$common.url.host + _this.$common.url.roomGetInfo,
        method: "GET",
        params: {
          roomNumber: _this.roomNumber
        }
      });
      //座位编号数组
      let tempSeatsNumber = [];
      for (let i = 0; i < InfoResult.data.roomInfo.people_number; i++) {
        tempSeatsNumber[i] = i + 1;
      }
      this.seatsNumber = tempSeatsNumber;

      /**@augments
     * 长轮询座位信息，先凑活一下,
     */
      while (true) {
        let roomResult = await axios({
          url: _this.$common.url.host + _this.$common.url.roomGetInfo,
          params: {
            roomNumber: _this.roomNumber,
            roomInfo: _this.roomInfo
          },
          method: "GET"
        });
        //请求成功
        if (roomResult.data.success) {
          //更新前端页面数据
          _this.roomInfo = roomResult.data.roomInfo;

          let seats = [];
          let roomInfo = roomResult.data.roomInfo;
          //遍历数据中的players信息
          for (let i = 0; i < roomInfo.players.length; i++) {
            if (roomInfo.players[i].seatNumber != null) {
              //此player已经坐下,保存在前端seats中
              seats[roomInfo.players[i].seatNumber - 1] = {};
              seats[roomInfo.players[i].seatNumber - 1].name =
                roomInfo.players[i].name;
              seats[roomInfo.players[i].seatNumber - 1].id =
                roomInfo.players[i].id;
            }
          }
          _this.seats = seats;
        }
      }
    },
    //每次房间信息发生变化,更新页面
    roomInfo: function() {
      //阶段变化
      if (this.roomInfo.moment === "voteKill") {
        this.isVoting = true;
      }
      switch (this.roomInfo.countDown) {
        case 32:
          this.countOut = false;
          this.countIn = true;
          this.roomInfo.countDown = "投票开始!";
          break;
        case 31:
          this.roomInfo.countDown = "倒计时开始!";
          break;
        case 0:
          this.roomInfo.countDown = "投票结束!";
          this.isVoting = false;
          break;
        case -1:
          this.roomInfo.countDown = "请查看票型!";
          break;
        case -2:
          this.roomInfo.countDown = "请查看票型!";
          break;
        case -3:
          this.roomInfo.countDown = "请查看票型!";
          this.countIn = false;
          this.countOut = true;
          break;
      }
    },

    //获得role信息
    role: function() {
      if (this.role != null) {
        //有了角色则说明座位坐满
        this.lockSeat = true;
      }
    }
  }
};
</script>
<style scoped>
.title_count {
  text-align: center;
  font-weight: 700;
  font-size: 7vw;
  position: fixed;
  width: 60vw;
  height: 10vw;
  top: 3vw;
  left: 20vw;
  color: rgb(255, 110, 110);
}
.room {
  height: 100vh;
  width: 100vw;
}
.title {
  font-size: 8vw;
  color: rgb(0, 0, 0);
  margin-left: 5vw;
}
.tietu_title {
  background-image: url(../../assets/ele/21.png);
  background-size: 100% 100%;
  background-repeat: no-repeat;
  width: 40vw;
  height: 16vh;
}
.header {
  width: 100vw;
  height: 20vh;
  border: 0px solid black;
  background: linear-gradient(
    to bottom,
    rgba(226, 226, 226, 0.7),
    rgba(255, 255, 255, 0.5)
  );
  /*background-image: url(../../assets/yuncai.png);*/
  background-size: 100%;
  display: flex;
  align-items: center;
  box-shadow: 0px 0px 2px 3px rgba(228, 228, 228, 0.3);
  justify-content: space-between;
}
.seats {
  width: 100vw;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: center;
  align-content: flex-start;
  margin-top: 10px;
  height: 60vh;
  overflow: auto;
  padding-bottom: 15px;
}
.seats_backimg {
  background-image: url(../../assets/ele/20.png);
  background-repeat: no-repeat;
  background-size: 100% 70%;
}
.seat {
  width: 22vw;
  height: 22vw;
  box-sizing: border-box;
  border: 0px solid black;
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  background: radial-gradient(circle, rgb(255, 255, 255), rgb(245, 255, 247));
  border-radius: 3vw;
  padding: 1vw;
  box-shadow: 0 0 2px 2px rgba(0, 0, 0, 0.582);
}
.highLight {
  width: 22vw;
  height: 22vw;
  box-sizing: border-box;
  border: 0px solid black;
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  background: radial-gradient(circle, rgb(255, 255, 255), rgb(245, 255, 247));
  border-radius: 3vw;
  padding: 1vw;
  box-shadow: 0 0 5px 5px rgba(255, 0, 0, 0.795);
}
.highLight:active {
  background: radial-gradient(
    circle,
    rgba(0, 30, 255, 0.733),
    rgb(29, 187, 235)
  );
}
.seat:active {
  background: radial-gradient(circle, rgb(153, 153, 102), rgb(153, 153, 102));
}
.name_text {
  color: rgb(36, 36, 36);
  font-size: 5vw;
  font-weight: 500;
  width: 20vw;
  overflow: hidden;
  text-overflow: ellipse;
  text-align: center;
}
.number_text {
  font-size: 6vw;
}
.btn_box {
  height: 10vh;
  position: fixed;
  bottom: 10vh;
  border: 0px solid black;
  box-sizing: border-box;
  width: 100vw;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  text-align: center;
  line-height: 10vh;
  font-weight: 700;
}
.btn {
  flex-grow: 1;
  width: 33.33vw;
}
.btnson {
  background: rgba(0, 0, 0, 0);
}
.hideButton {
  width: 33.33vw;
}

@keyframes comein {
  0% {
    opacity: 0;
    transform: scale(0);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}
@keyframes comeout {
  0% {
    opacity: 1;
    transform: scale(1);
  }
  100% {
    opacity: 0;
    transform: scale(0);
  }
}
.comeIn {
  animation: comein 0.3s forwards;
  z-index: 1000;
}
.comeOut {
  animation: comeout 0.3s forwards;
  z-index: -1000;
}
.roleCard {
  position: fixed;
  width: 100vw;
  height: 150vw;
  top: 15vw;
  left: 0;
}

@keyframes moveup2 {
  0% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(-200%);
  }
}
.moveup2 {
  animation: moveup2 0.4s forwards;
}
@keyframes moveup3 {
  0% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(-400%);
  }
}
.moveup3 {
  animation: moveup3 0.4s forwards;
}
@keyframes moveup4 {
  0% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(-600%);
  }
}
.moveup4 {
  animation: moveup4 0.4s forwards;
}

@keyframes movedown2 {
  0% {
    transform: translateY(-200%);
  }
  100% {
    transform: translateY(0%);
  }
}
.movedown2 {
  animation: movedown2 0.4s forwards;
}
@keyframes movedown3 {
  0% {
    transform: translateY(-400%);
  }
  100% {
    transform: translateY(0%);
  }
}
.movedown3 {
  animation: movedown3 0.4s forwards;
}
@keyframes movedown4 {
  0% {
    transform: translateY(-600%);
  }
  100% {
    transform: translateY(0);
  }
}
.movedown4 {
  animation: movedown4 0.4s forwards;
}
</style>
