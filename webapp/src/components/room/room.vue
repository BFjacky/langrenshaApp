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
  </div>
</template>
<script>
import axios from "axios";
import { Popup, Range, Switch, Toast, Indicator, MessageBox } from "mint-ui";

export default {
  props: ["roomNumber"],
  data: function() {
    return {
      //座位号
      seatsNumber: [],
      //每个座位的seat内容{id:String,icon:String(src),name:String}
      seats: []
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
    }
  },
  mounted: async function() {
    const _this = this;
    /**@augments
     * 轮询座位信息，先凑活一下
     */
    let instance = setInterval(async () => {
      let roomResult = await axios({
        url: _this.$common.url.host + _this.$common.url.roomGetInfo,
        params: {
          roomNumber: _this.roomNumber
        },
        method: "GET"
      });
      //请求成功
      if (roomResult.data.success) {
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
      console.log(_this.seats);
    }, 100);
  },
  watch: {
    //roomNumber变化，发送axios请求该房间的信息
    roomNumber: async function() {
      const _this = this;
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
      console.log(InfoResult.data.roomInfo);
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
  width: 27vw;
  height: 27vw;
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
  font-size: 6vw;
  width: 25vw;
  overflow: hidden;
  text-overflow:ellipse;
  text-align:center;
}
.number_text {
  font-size: 6vw;
}
</style>
