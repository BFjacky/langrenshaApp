<template>
  <div class="shouye">
      <div class="header">
      <nihong-text class="text" ></nihong-text>
      </div>
      <div class="content"></div>
  </div>
</template>
<script>
import nihongText from "../texiao/nihongText";
export default {
  components: {
    nihongText: nihongText
  }
};
</script>
<style scoped>
.shouye {
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  /*background: linear-gradient(to bottom, rgba(1, 1, 1, 1), rgba(53, 56, 57, 1))*/
}
.header {
  width: 100vw;
  height: 100px;
  background: black; /*linear-gradient(to bottom, rgba(1, 1, 1, 1), rgba(30, 30, 30, 1));*/
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
.content {
  background: linear-gradient(to bottom, rgba(1, 1, 1, 1), rgba(53, 56, 57, 1));
  height: 100vh;
  width: 100vw;
}
.text {
}
</style>
