<template>
  <div class="homePage">
    <mt-tab-container v-model="selected" v-bind:swipeable="mytrue">
        <mt-tab-container-item id="shouye">
            这是首页
        </mt-tab-container-item>
        <mt-tab-container-item id="fangjian">
            这是房间页
        </mt-tab-container-item>
        <mt-tab-container-item id="faxian">
            这是发现页
        </mt-tab-container-item>
        <mt-tab-container-item id="wode">
            这是我的页
        </mt-tab-container-item>
    </mt-tab-container>
    <mt-tabbar v-model="selected" v-bind:fixed="mytrue" class = 'bar'>
        <mt-tab-item id="shouye" class="item">
        <img slot="icon" src="../assets/geren_xiao.png">
        首页
        </mt-tab-item>
        <mt-tab-item id="fangjian" class="item">
        <img slot="icon" src="../assets/geren_xiao.png">
        房间
        </mt-tab-item>
        <mt-tab-item id="faxian"class="item" >
        <img slot="icon" src="../assets/geren_xiao.png">
        发现
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
export default {
  data: function() {
    return {
      selected: "shouye",
      mytrue: true
    };
  },
  components: {
    mtTabbar: Tabbar,
    mtTabItem: TabItem,
    mtTabContainer: TabContainer,
    mtTabContainerItem: TabContainerItem,
    mtHeader: Header,
    mtButton: Button
  },
  watch: {
    selected: function() {
      console.log(this.selected);
    }
  }
};
</script>
<style scoped>
.homePage {
  height: 100%;
  width: 100%;
}
.bar {
  height: 8%;
}
.item {
  height: 100%;
}
</style>
