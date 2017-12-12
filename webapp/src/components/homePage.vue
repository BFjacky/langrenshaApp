<template>
  <div class="homePage">
    <mt-tab-container v-model="selected" v-bind:swipeable="myfalse">
        <mt-tab-container-item id="shouye">
            这是首页
        </mt-tab-container-item>
        <!--mt-tab-container-item id="fangjian">
            这是房间页
        </mt-tab-container-item-->
        <mt-tab-container-item id="haoyou">
            这是好友页
        </mt-tab-container-item>
        <mt-tab-container-item id="wode">
            <personal></personal>
        </mt-tab-container-item>
    </mt-tab-container>
    <mt-tabbar v-model="selected" v-bind:fixed="mytrue" class = 'bar'>
        <mt-tab-item id="shouye" class="item">
        <img slot="icon" src="../assets/geren_xiao.png">
        首页
        </mt-tab-item>
        <!--mt-tab-item id="fangjian" class="item">
        <img slot="icon" src="../assets/geren_xiao.png">
        房间
        </mt-tab-item-->
        <mt-tab-item id="haoyou"class="item" >
        <img slot="icon" src="../assets/geren_xiao.png">
        消息
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
import personal from "./personal/personal_all.vue";
export default {
  data: function() {
    return {
      selected: "",
      mytrue: true,
      myfalse: false
    };
  },
  components: {
    mtTabbar: Tabbar,
    mtTabItem: TabItem,
    mtTabContainer: TabContainer,
    mtTabContainerItem: TabContainerItem,
    mtHeader: Header,
    mtButton: Button,
    personal: personal
  },
  watch: {
    selected: function() {
      console.log(this.selected);
    }
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
}
</style>
