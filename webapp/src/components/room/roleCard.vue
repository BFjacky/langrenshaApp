<template>
  <div class="roleCard" v-bind:class="role"></div>

               
</template>
<script>
export default {
  props: ["role"],
  created: function() {}
};
</script>
<style scoped>
.roleCard {
  position: fixed;
  width: 100vw;
  height: 150vw;
  background-size: contain;
  background-repeat: no-repeat;
}
.cunmin {
  background-image: url(../../assets/cunmin.png);
}
.langren {
  background-image: url(../../assets/langren.png);
}
.lieren {
  background-image: url(../../assets/lieren.png);
}
.nvwu {
  background-image: url(../../assets/nvwu.png);
}
.shouwei {
  background-image: url(../../assets/shouwei.png);
}
.baichi {
  background-image: url(../../assets/baichi.png);
}
.qiubite {
  background-image: url(../../assets/qiubite.png);
}
.yvyanjia {
  background-image: url(../../assets/yvyanjia.png);
}
</style>
