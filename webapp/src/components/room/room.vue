<template>
  <div class='room'>
      <div class="title_count" v-bind:class="{comeIn:countIn,comeOut:countOut}">{{roomInfo.countDown}}</div>
      <div class="header">
          <div class="title">房间号:{{roomNumber}}</div>
          <div class="tietu_title"></div>
      </div>
      <div class="seats" v-bind:class="{seats_backimg:roomNumber===''}">
          <div v-bind:class="{seat:!isVoting,highLight:isVoting||usingSkill}" v-for="seatNumber in seatsNumber" v-on:click="sitHere(seatNumber)">
            <div class="number_text">{{seatNumber}}</div>
            <div class="name_text">{{seats[seatNumber-1]===undefined?"":seats[seatNumber-1].name}}</div>
          </div>
      </div>
      <div class="btn_box">
        <div class="btn" v-on:click="actionButton">使用技能</div>
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
      //该玩家用户id
      userId: "",
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
      lockSeat: false,

      //是否处在使用技能阶段
      usingSkill: false,
      //弯角选择是否使用技能
      skillResult: []
    };
  },
  methods: {
    sitHere: async function(seatNumber) {
      const _this = this;
      const showMessageBox = async function(String) {
        return new Promise((resolve, reject) => {
          MessageBox.confirm(String)
            .then(async action => {
              resolve(true);
            })
            .catch(async action => {
              resolve(false);
            });
        });
      };
      //如果处在使用技能阶段，则阻塞其他选座位请求
      if (this.usingSkill === true) {
        let result;
        this.choise_seatNumber = seatNumber;
        console.log(this.usingSkill, this.skillResult, this.choise_seatNumber);
        //弹出messageBox二次确认
        switch (this.role) {
          case "langren":
            result = await showMessageBox(`猎杀${this.choise_seatNumber}号玩家`);
            break;
          case "nvwu":
            result = await showMessageBox(`毒杀${this.choise_seatNumber}号玩家`);
            break;
          case "yvyanjia":
            result = await showMessageBox(`查验${this.choise_seatNumber}号玩家`);
            break;
          case "shouwei":
            result = await showMessageBox(`守护${this.choise_seatNumber}号玩家`);
            break;
          case "lieren":
            result = await showMessageBox(`带走${this.choise_seatNumber}号玩家`);
            break;
          case "langwang":
            result = await showMessageBox(`带走${this.choise_seatNumber}号玩家`);
            break;
        }
        console.log(111, result);
        //恢复技能使用之前的状态
        this.usingSkill = false;
        this.skillResult = [];
        this.choise_seatNumber = undefined;
        return;
      }

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
            Toast({
              message: voteKillResult.data.message,
              position: "middle",
              duration: 1000
            });
          }
        });
        this.choise_seatNumber = undefined;
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
      let votes = [];
      const _this = this;
      if (this.roomInfo.votes == undefined || this.roomInfo.votes.length == 0) {
        MessageBox({
          title: "",
          message: "暂无投票信息",
          closeOnClickModal: true
        });
        return;
      }
      //整理票型字符串成数组
      let votes_array = [];
      for (let i = 1; i < this.roomInfo.votes.length; i++) {
        votes_array[i] = [];
        let patt = /\d+->\d+/g;
        let str = this.roomInfo.votes[i].match(patt);
        for (let j = 0; j < str.length; j++) {
          //获得前面的数字
          patt = /\d+->/g;
          let str_left = str[j].match(patt)[0];
          patt = /\d+/g;
          str_left = str_left.match(patt)[0];
          //获得后面的数字
          patt = /->\d+/g;
          let str_right = str[j].match(patt)[0];
          patt = /\d+/g;
          str_right = str_right.match(patt)[0];

          //放进数组里
          votes_array[i][parseInt(str_left)] = parseInt(str_right);
        }
      }
      console.log(votes_array);
      //将数组整理成字符串
      let strs = [];
      for (let i = 1; i < votes_array.length; i++) {
        strs[i] = [];
        let index = 0;
        //从一号玩家开始，找到所有投该玩家的人
        for (let j = 1; j <= this.roomInfo.people_number; j++) {
          let str = "";
          for (let k = 1; k < votes_array[i].length; k++) {
            if (votes_array[i][k] === j) {
              str = str + k + "  ";
            }
            if (k === votes_array[i].length - 1 && str !== "") {
              str = str + "->" + j;
              break;
            }
          }
          if (str !== "") {
            strs[i][index] = str;
            index++;
          }
        }
      }
      console.log(strs);

      let result = "";
      for (let i = 1; i < strs.length; i++) {
        result = result + `第${i}轮投票:<br/>`;
        if (
          i === this.roomInfo.nowVoteTime &&
          this.roomInfo.moment === "voteKill"
        ) {
          result = result + "投票结束后查看!";
        } else {
          for (let j = 0; j < strs[i].length; j++) {
            result = result + strs[i][j] + "<br/>";
          }
        }
      }
      MessageBox({
        title: "",
        message: result,
        closeOnClickModal: true
      });
    },

    //玩家点击了使用技能按钮
    actionButton: async function() {
      //本地还没有玩家信息
      if (this.roomInfo == undefined || this.roomInfo.players == undefined) {
        Toast({
          message: "请先进入一个房间",
          position: "middle",
          duration: 1000
        });
        return;
      }
      //本地有了玩家信息
      for (let i = 0; i < this.roomInfo.players.length; i++) {
        if (this.userId === this.roomInfo.players[i].id) {
          this.role = this.roomInfo.players[i].role;
        }
      }

      //如果该玩家还没被分配角色
      if (this.role == "") {
        Toast({
          message: "还未确定角色!",
          position: "middle",
          duration: 1000
        });
        return;
      }

      /**@augments
       * 使用技能方法，根据不同角色提供不同的技能提示框
       * langren nvwu yvyanjia shouwei lieren langwang 
       */

      const showMessageBox = function(String) {
        return new Promise((resolve, reject) => {
          MessageBox.confirm(String)
            .then(action => {
              resolve(true);
            })
            .catch(action => {
              resolve(false);
            });
        });
      };
      const use_skill = async function(role) {
        console.log(role + "使用技能了");
        let result = [];
        switch (role) {
          case "langren":
            result[0] = await showMessageBox("是否发动狼人猎杀技能");
            break;
          case "nvwu":
            result[0] = await showMessageBox("x号玩家死亡,是否发动女巫解药技能");
            result[1] = await showMessageBox("是否发动女巫毒药技能");
            break;
          case "yvyanjia":
            result[0] = await showMessageBox("是否发动预言家查验技能");
            break;
          case "shouwei":
            result[0] = await showMessageBox("是否发动守卫守护技能");
            break;
          case "lieren":
            result[0] = await showMessageBox("是否发动猎人枪毙技能");
            break;
          case "langwang":
            result[0] = await showMessageBox("是否发动狼王带走技能");
            break;
        }
        return result;
      };

      /**@augments
       * 该玩家已经有了角色
       * 使用技能根据不同身份，提示框不同
       */
      let result = await use_skill(this.role);
      this.skillResult = result;
      //该角色发动技能，等待选择座位号
      if (result[result.length - 1]) {
        this.usingSkill = true;
        return;
      }
      //该角色拒绝发动技能,无需选座位,向后端发送数据
      //code*****
      console.log("拒绝发动技能");
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

      //获取一下用户的id信息,保存在前端中
      let idResult = await axios({
        url: _this.$common.url.host + _this.$common.url.roomGetId,
        method: "POST",
        withCredentials: true,
        data: {}
      });
      if (idResult.data != undefined) {
        _this.userId = idResult.data.id;
      }

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
      const _this = this;
      //阶段变化
      switch (this.roomInfo.countDown) {
        case 32:
          this.isVoting = true;
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
    role: function() {}
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
  background: radial-gradient(circle, rgb(255, 106, 106), rgb(255, 0, 0));
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
