<template>
  <div class="homePage">
    <mt-tab-container v-model="selected" v-bind:swipeable="myfalse">
        <mt-tab-container-item id="shouye">
            <shouye v-on:skipRoomPage="skipRoomPage"></shouye>
        </mt-tab-container-item>
        <!--mt-tab-container-item id="fangjian">
            这是房间页
        </mt-tab-container-item-->
        <mt-tab-container-item id="fangjian">
            <room v-bind:roomNumber="roomNumber"></room>
        </mt-tab-container-item>
        <mt-tab-container-item id="wode">
            <personal></personal>
        </mt-tab-container-item>
    </mt-tab-container>
    <mt-tabbar v-model="selected" v-bind:fixed="mytrue" class = 'bar'>
        <mt-tab-item id="shouye" class="item">
        <img slot="icon" src="../assets/shouye.png">
        首页
        </mt-tab-item>
        <!--mt-tab-item id="fangjian" class="item">
        <img slot="icon" src="../assets/geren_xiao.png">
        房间
        </mt-tab-item-->
        <mt-tab-item id="fangjian"class="item" >
        <img slot="icon" src="../assets/fangjian.png">
        房间
        </mt-tab-item>
        <mt-tab-item id="wode" class="item">
        <img slot="icon" src="../assets/geren_xiao.png">
        我的
        </mt-tab-item>
    </mt-tabbar>
  </div>
</template>
<script>
import {
  Tabbar,
  TabItem,
  TabContainer,
  TabContainerItem,
  Header,
  Button
} from "mint-ui";
import room from "./room/room.vue";
import personal from "./personal/personal_all.vue";
import shouye from "./shouye/shouye.vue";
export default {
  data: function() {
    return {
      selected: "",
      mytrue: true,
      myfalse: false,
      roomNumber: ""
    };
  },
  components: {
    mtTabbar: Tabbar,
    mtTabItem: TabItem,
    mtTabContainer: TabContainer,
    mtTabContainerItem: TabContainerItem,
    mtHeader: Header,
    mtButton: Button,
    personal: personal,
    shouye: shouye,
    room: room
  },
  methods: {
    skipRoomPage: function(value) {
      this.roomNumber = value;
      this.selected = "fangjian";
    }
  },
  watch: {
    selected: function() {}
  },
  created: function() {
    this.selected = this.$common.homePage.selected;
    if (this.selected === "") {
      this.selected = "wode";
    }
  },
  beforeDestroy: function() {
    this.$common.homePage.selected = this.selected;
  }
};
</script>
<style scoped>
.homePage {
  position: fixed;
  height: 100vh;
  width: 100vw;
}
.bar {
  box-shadow: 0px -1px 5px 0px rgba(200, 204, 204, 0.6);
  height: 10%;
}
.item {
  height: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  background: linear-gradient(
    to bottom,
    rgba(185, 184, 184, 0.377),
    rgba(221, 220, 220, 0.815)
  );
}
</style>
