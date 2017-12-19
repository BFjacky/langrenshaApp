<template>
  <div class='room'>
      <div class="header">
          <div class="title">房间号:{{roomNumber}}</div>
      </div>
      <div class="seats">
          <div class="seat" v-for="seatNumber in seatsNumber" v-on:click="sitHere(seatNumber)"">
            <div class="number_text">{{seatNumber}}</div>
            <div class="name_text">{{seats[seatNumber-1]===undefined?"":seats[seatNumber-1].name}}</div>
          </div>
      </div>
      <div class="btn_box">
        <div class="btn">使用技能</div>
        <div class="btn" v-on:touchstart="checkRole">查看身份</div>
        <div class="btn">投票处决</div>
      </div>
      <role-card v-bind:role="role" class="roleCard" v-bind:class="{comeIn:fadeIn,comeOut:fadeOut}"></role-card>
  </div>
</template>
<script>
import axios from "axios";
import { Popup, Range, Switch, Toast, Indicator, MessageBox } from "mint-ui";
import roleCard from "./roleCard";
export default {
  props: ["roomNumber"],
  components: {
    roleCard: roleCard
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

      //room房间信息
      roomInfo: {}
    };
  },
  methods: {
    sitHere: async function(seatNumber) {
      const _this = this;
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
        _this.fadeOut = false;
        _this.fadeIn = true;
        //2秒后淡出
        setTimeout(() => {
          _this.fadeIn = false;
          _this.fadeOut = true;
        }, 2000);
        return;
      }
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
        console.log("更新了一次", roomResult.data);
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
    }
  }
};
</script>
<style scoped>
.room {
  height: 100vh;
  width: 100vw;
}
.title {
  font-size: 8vw;
  color: rgb(233, 233, 233);
  margin-left: 5vw;
}
.header {
  width: 100vw;
  height: 20vh;
  border: 0px solid black;
  background: linear-gradient(
    to bottom,
    rgba(172, 163, 2, 0.7),
    rgba(226, 216, 26, 0.5)
  );
  /*background-image: url(../../assets/yuncai.png);*/
  background-size: 100%;
  display: flex;
  align-items: center;
  box-shadow: 0px 1px 5px 0px rgba(200, 204, 204, 0.3);
}
.seats {
  width: 100vw;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: center;
  align-content: flex-start;
  margin-top: 10px;
  height: 65vh;
  overflow: auto;
  padding-bottom: 15px;
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
  background: radial-gradient(
    circle,
    rgba(153, 153, 102, 0.7),
    rgb(153, 153, 102)
  );
  border-radius: 3vw;
  padding: 1vw;
}
.seat:active {
  background: radial-gradient(
    circle,
    rgba(153, 153, 102, 0.322),
    rgba(153, 153, 102, 0.699)
  );
}
.name_text {
  color: rgba(235, 235, 235, 1);
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
  justify-content: space-around;
  text-align: center;
  line-height: 10vh;
  font-weight: 700;
}
.btn {
  flex-grow: 1;
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
</style>
