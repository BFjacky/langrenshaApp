<template>
  <div class="personalDetail">
    <div class="header">
      <div class="touxiang_icon"></div>
    </div>
  </div>
</template>
<script>
export default {};
</script>
<style scoped>
.personalDetail {
  position: absolute;
  height: 100vh;
  width: 100vw;
}
.header {
  width: 100vw;
  height: 25vh;
  border: 0px solid black;
  background: linear-gradient(
    to top,
    rgba(71, 229, 241, 0.7) rgba(34, 205, 249, 0.7)
  );
  /*background-image: url(../../assets/yuncai.png);*/
  background-size: 100%;
  display: flex;
  align-items: center;
  box-shadow: 0px 1px 5px 0px rgba(200, 204, 204, 0.3);
}
.touxiang_icon {
  width: 75px;
  height: 75px;
  border: 1px solid #b6c4bd;
  border-radius: 10%;
  margin-left: 20px;
}
</style>
