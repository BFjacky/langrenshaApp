<template>
  <div class="signin">
      <div class="inputBox">
          <input class="myinput" type="text" placeholder="账号(6位以上)" v-model="account"/>
          <input class="myinput" type="password"  placeholder="密码(6位以上)" v-model="password"/>
          <input class="myinput" type="password"  placeholder="请确认密码" v-model="password2"/>
      </div>
      <div class="function">
          <div class="myButton" v-on:click="signin">注册</div>
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
      password: "",
      password2: ""
    };
  },
  methods: {
    signin: async function() {
      const _this = this;
      //如果两次密码输入一致则允许登陆
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
      } else if (this.account.split("").length < 6) {
        Toast({
          message: "账号需大于6位",
          position: "middle",
          duration: 1000
        });
        return;
      } else if (this.password.split("").length < 6) {
        Toast({
          message: "密码需大于6位",
          position: "middle",
          duration: 1000
        });
        return;
      } else if (this.password !== this.password2) {
        Toast({
          message: "两次密码输入不一致",
          position: "middle",
          duration: 1000
        });
        return;
      }
      Indicator.open({
        text: "注册中",
        spinnerType: "triple-bounce"
      });
      let result = await axios({
        url: _this.$common.url.host + _this.$common.url.userSignin,
        method: "post",
        data: {
          account: _this.account,
          password: _this.password
        },
        withCredentials: true
      });
      Indicator.close();
      Toast({
        message: result.data.message,
        position: "middle",
        duration: 1000
      });
      //注册成功
      if (result.data.success) {
        //访问后端路由，尝试登陆请求
        let res = await this.$common.pause(1000);
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
          //更新状态
          this.$common.status.hasLogin = true;
          this.$common.status.hasTryLogin = true;
          this.$router.push({
            name: "homePage"
          });
        }
      }
    }
  }
};
</script>
<style scoped>
.signin {
  height: 100vh;
  position: absolute;
  width: 100vw;
  display: flex;
  flex-direction: column;
  background: linear-gradient(
    to bottom,
    rgba(255, 255, 255, 0.7),
    rgba(206, 204, 204, 0.5)
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
  border-bottom: 1px rgb(0, 0, 0) solid;
  background: rgba(0, 0, 0, 0);
  color: rgb(0, 0, 0);
  margin-top: 5vh;
  font-size: 18px;
  outline: none;
}
input::-webkit-input-placeholder,
textarea::-webkit-input-placeholder {
  /* WebKit*/
  color: rgba(0, 0, 0, 0.582);
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
    rgba(61, 61, 61, 0.2),
    rgba(34, 34, 34, 0.5)
  );
}
</style>
