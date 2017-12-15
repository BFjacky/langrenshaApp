<template>
  <div class="loginPage">
      <div class="inputBox">
          <input class="myinput" type="text" placeholder="请输入账号" v-model="account"/>
          <input class="myinput" type="password"  placeholder="请输入密码" v-model="password"/>
      </div>
      <div class="function">
          <div class="textButton" v-on:click="gotoSignin">注册新用户</div>
          <div class="textButton">忘记密码</div>
          <div class="myButton" v-on:click="login">登陆</div>
      </div>
  </div>
</template>
<script>
import axios from "axios";
import { Toast, Indicator } from "mint-ui";
export default {
  data: function() {
    return {
      account: "",
      password: ""
    };
  },
  methods: {
    login: async function() {
      const _this = this;
      if (this.account == "") {
        Toast({
          message: "账号不能为空",
          position: "middle",
          duration: 1000
        });
        return;
      } else if (this.password == "") {
        Toast({
          message: "密码不能为空",
          position: "middle",
          duration: 1000
        });
        return;
      }
      //用获得的账号和密码尝试登陆，加载动画
      Indicator.open({
        text: "登陆中",
        spinnerType: "triple-bounce"
      });
      let loginResult = await axios({
        url: this.$common.url.host + this.$common.url.userLogin,
        method: "POST",
        data: {
          account: this.account,
          password: this.password
        },
        withCredentials: true
      });
      Indicator.close();
      //登陆成功
      if (loginResult.data.success) {
        Toast({
          message: loginResult.data.message,
          position: "middle",
          duration: 1000
        });
        //更新状态
        this.$common.status.hasLogin = true;
        this.$common.status.hasTryLogin = true;
        setTimeout(function() {
          _this.$router.push({
            name: "homePage"
          });
        }, 1000);
      } else {
        //登陆失败
        Toast({
          message: loginResult.data.message,
          position: "middle",
          duration: 1000
        });
      }
    },
    gotoSignin: function() {
      this.$router.push({
        name: "signin"
      });
    }
  }
};
</script>
<style scoped>
.loginPage {
  height: 100vh;
  position: absolute;
  width: 100vw;
  display: flex;
  flex-direction: column;
  background: linear-gradient(
    to left top,
    rgba(71, 229, 241, 0.7),
    rgba(195, 241, 245, 0.5)
  );
}
.inputBox {
  display: flex;
  flex-direction: column;
  padding-left: 10vw;
  padding-right: 10vw;
  margin-top: 20vh;
}
.myinput {
  border-width: 0px;
  border-bottom: 1px rgb(190, 137, 216) solid;
  background: rgba(0, 0, 0, 0);
  margin-top: 5vh;
  font-size: 18px;
  outline: none;
}
.function {
  display: flex;
  padding-left: 10vw;
  padding-right: 10vw;
  flex-wrap: wrap;
  font-size: 14px;
  justify-content: space-between;
  margin-top: 5vh;
}
.myButton {
  font-size: 18px;
  margin-top: 10vh;
  width: 80vw;
  height: 40px;
  border-radius: 18px;
  text-align: center;
  line-height: 40px;
  letter-spacing: 10px;
  padding-left: 10px;
  background: linear-gradient(
    to bottom,
    rgba(190, 137, 216, 0.2),
    rgba(114, 109, 209, 0.5)
  );
}
</style>
