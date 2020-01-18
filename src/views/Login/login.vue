<template>
  <div>
    <div class="Box">
      <div v-if="show1">
        <div class="tit">账号登录</div>
        <div class="box">
          <div>账号</div>
          <input type="text" placeholder="请填写账号(字母开头，最少八位)" class="input1" v-model="account" />
        </div>
        <div class="box">
          <div>密码</div>
          <input type="password" placeholder="请填写密码(最少八位)" class="input1" v-model="password" />
        </div>
      </div>
      <div v-if="show2">
        <div class="tit">手机号登录</div>
        <div class="box">
          <div>手机号</div>
          <input type="text" placeholder="请填写手机号" class="input1" />
        </div>
        <div class="box">
          <div>验证码</div>
          <input type="password" placeholder="请填写验证码" class="input2" />
          <button class="button2">获取验证码</button>
        </div>
      </div>
      <div class="tip" @click="switchs">{{tip}}</div>
      <div class="buttonBox">
        <button class="button1" @click="login">登录</button>
        <div class="tipBox">
          <span @click="forgotPassword">找回密码</span> |
          <span @click="goregistered">注册</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { creatWebsocket } from "../../assets/js/WebSocket";
import { RSAencrypt1, base64 } from "../../assets/js/encrypt";
export default {
  name: "login",
  data() {
    return {
      tip: "用手机号登录",
      show1: true,
      show2: false,
      account: "",
      password: ""
    };
  },
  created() {
    this.api.getPublicKey().then(res => {
      if (res.code == 200) {
        // let Base64 = require("js-base64").Base64;
        let publicKey = res.result.data;
        sessionStorage.setItem("key", publicKey);
      } else {
        this.commonality.toast(res.message, this);
      }
    });
  },
  methods: {
    switchs() {
      if (this.tip == "用手机号登录") {
        this.show1 = false;
        this.show2 = true;
        this.tip = "用账号登录";
      } else {
        this.show2 = false;
        this.show1 = true;
        this.tip = "用手机号登录";
      }
    },
    goregistered() {
      this.$router.push({
        path: "registered"
      });
    },
    login() {
      let param = {};
      var regaccount = new RegExp("^[a-zA-Z]{1}[a-zA-Z0-9]{7,19}$");
      var regpassword = new RegExp("^[0-9a-zA-Z_.*+$]{8,16}$");
      var account = this.account;
      var password = this.password;
      if (account == "") {
        this.commonality.toast("账号不能为空！", this);
        return false;
      } else if (!regaccount.test(account)) {
        this.commonality.toast("账号格式不正确，请重新输入！", this);
        return false;
      } else if (password == "") {
        this.commonality.toast("密码不能为空！", this);
        return false;
      } else if (!regpassword.test(password)) {
        this.commonality.toast("密码格式不正确，请重新输入！", this);
        return false;
      } else {
        param.account = this.account;
        param.password = this.password;
        (param.type = 1),
          this.api.login(param).then(res => {
            if (res.code == 200) {
              // console.log(res);
              let token = res.result.data.token;
              localStorage.setItem("token", token);
              creatWebsocket();
              this.api.getUserInfo().then(res => {
                if (res.code == 200) {
                  console.log(res);
                  sessionStorage.setItem("account", res.result.data.account);
                  sessionStorage.setItem(
                    "nick_name",
                    res.result.data.nick_name
                  );
                  sessionStorage.setItem(
                    "image_url",
                    res.result.data.image_url
                  );
                }
              });
              this.$router.push({
                path: "/"
              });
            } else {
              this.commonality.toast(res.message, this);
            }
          });
      }
    },
    forgotPassword() {
      this.$router.push({
        path: "forgotPassword"
      });
    }
  }
};
</script>
<style lang="less" scoped>
.Box {
  width: 660px;
  height: 50%;
  margin: 30% auto;
}
.tit {
  font-size: 37px;
  font-weight: 700;
}
.box {
  width: 100%;
  height: 70px;
  padding: 10px 0;
  margin-top: 30px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  border-bottom: 1px solid #d4d4d4;
  font-size: 30px;
}
.input1 {
  width: 82%;
  height: 50px;
  outline: none;
  border: none;
  background-color: #efeeee;
  caret-color: #3bca86;
}
.input2 {
  width: 50%;
  height: 50px;
  outline: none;
  border: none;
  background-color: #efeeee;
  caret-color: #3bca86;
}
.tip {
  padding: 30px 15px;
  font-size: 27px;
  color: #2e318a;
}
.buttonBox {
  width: 100%;
  height: 80px;
  margin-top: 35px;
}
.buttonBox .button1 {
  width: 100%;
  height: 100%;
  outline: none;
  border: none;
  border-radius: 10px;
  background-color: #51e04c;
  font-size: 35px;
  color: #fff;
}
.button2 {
  width: 27%;
  height: 55px;
  padding: 10px;
  outline: none;
  border: none;
  border-radius: 10px;
  color: #fff;
  background-color: #2bad19;
}
.tipBox {
  width: 100%;
  height: 60px;
  margin: auto;
  margin-top: 45%;
  text-align: center;
  color: #2e318a;
}
</style>