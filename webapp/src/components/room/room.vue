<template>
  <div class='room'>
      <div class="header">
          <div class="title">房间号:{{roomNumber}}</div>
      </div>
      <div class="seats">
          <div class="seat" v-for="seatNumber in seatsNumber" v-on:click="sitHere(seatNumber)"></div>
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
      seatsNumber: []
    };
  },
  methods: {
    sitHere: function(seatNumber) {
      console.log(seatNumber);
    }
  },
  watch: {
    //roomNumber变化，发送axios请求该房间的信息
    roomNumber: async function() {
      console.log("发送了请求");
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
      for (let i = 0; i < InfoResult.data.roomInfo.players.length; i++) {
        tempSeatsNumber[i] = i + 1;
      }
      this.seatsNumber = tempSeatsNumber;
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
  margin-top: 20px;
}
.seat {
  width: 25vw;
  height: 25vw;
  border: 1px solid black;
  margin-top: 20px;
}
</style>
