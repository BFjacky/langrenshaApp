<template>
<div class="developer_page">
  <div class="back"></div>
  <div class="person"></div>
    <div class="text text1">陈云飞</div>
    <div class="text text2">尹繁林</div>
    <div class="text text3">宋杰三</div>
    <div class="text text4">王梓轩</div>
    <div class="text text5">孙雨彤</div>
</div>
</template>
<script>
export default {};
</script>
<style scoped>
.back {
  background: linear-gradient(
    to bottom,
    rgba(223, 237, 243, 0.7),
    rgba(167, 246, 250, 0.5)
  );
  height: 100vh;
  width: 100vw;
  position: absolute;
}
.developer_page {
  height: 100vh;
  width: 100vw;
  position: absolute;
  display: flex;
  flex-wrap: wrap;
  background-image: url(../assets/ele/42.png);
  background-size: 100% 100%;
}
.person {
  background-image: url(../assets/ele/36.png);
  width: 20vw;
  height: 20vh;
  background-size: 100% 100%;
  position: absolute;
  top: 40vh;
  left: 40vw;
  opacity: 0.7;
}
.text {
  color: rgb(129, 172, 192);
  text-align: center;
  height: 50vh;
  width: 20vw;
  position: absolute;
  font-weight: 700;
  font-size: 6vw;
  letter-spacing: 2px;
  padding-left: 2px;
}
.text1 {
  left: 50%;
  top: 28%;
  transform: translateX(-50%);
}
.text2 {
  top: 46%;
  left: 2%;
}
.text3 {
  top: 46%;
  right: 2%;
}
.text4 {
  left: 20%;
  top: 68%;
}
.text5 {
  right: 20%;
  top: 68%;
}
</style>
