<template>
  <div>
    <div class="Box">
      <div>
        <div class="tit">重置密码</div>
        <div class="box">
          <div>手机号</div>
          <input type="text" placeholder="请填写手机号" class="input1" v-model="phone" />
        </div>
        <div class="box">
          <div>验证码</div>
          <input type="text" placeholder="请填写验证码" class="input2" v-model="verificationCode" />
          <button class="button2" @click="getCode" v-show="show">获取验证码</button>
          <button v-show="!show" class="button2">剩余{{count}} s</button>
        </div>
        <div class="box">
          <div>新密码</div>
          <input type="password" placeholder="请填写新密码" class="input1" v-model="password" />
        </div>
      </div>
      <div class="buttonBox">
        <button class="button1" @click="determine">确定</button>
        <div class="tipBox">
          <span @click="goregistered">注册</span>|
          <span @click="gologin">登录</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { creatWebsocket } from "../../assets/js/WebSocket";
import { RSAencrypt1, base64 } from "../../assets/js/encrypt";
export default {
  name: "forgotPassword",
  data() {
    return {
      phone: "",
      password: "",
      verificationCode: "",
      show: true,
      count: ""
    };
  },
  created() {
    this.api.getPublicKey().then(res => {
      if (res.code == 200) {
        let publicKey = res.result.data;
        sessionStorage.setItem("key", publicKey);
      } else {
        this.commonality.toast(res.message, this);
      }
    });
  },
  methods: {
    // 验证码
    getCode() {
      let param = {};
      var regmobilePhone = new RegExp(
        "^[1](([3][0-9])|([4][5-9])|([5][0-3,5-9])|([6][5,6])|([7][0-8])|([8][0-9])|([9][1,8,9]))[0-9]{8}$"
      );
      var phone = this.phone;
      if (phone == "") {
        this.commonality.toast("手机号不能为空！", this);
        return false;
      } else if (!regmobilePhone.test(phone)) {
        this.commonality.toast("手机号格式不正确，请重新输入！", this);
        return false;
      } else {
        param.phone = this.phone;
        console.log(param);
        this.api.sendCode(param).then(res => {
          if (res.code == 0) {
            const TIME_COUNT = 60;
            if (!this.timer) {
              this.count = TIME_COUNT;
              this.show = false;
              this.commonality.toast("验证码已发送，请注意查收", this);
              this.timer = setInterval(() => {
                if (this.count > 0 && this.count <= TIME_COUNT) {
                  this.count--;
                } else {
                  this.show = true;
                  clearInterval(this.timer);
                  this.timer = null;
                }
              }, 1000);
            }
            console.log(res);
          }
        });
      }
    },
    gologin() {
      this.$router.push({
        path: "/"
      });
    },
    goregistered() {
      this.$router.push({
        path: "registered"
      });
    },
    determine() {
      let param = {};
      var regpassword = new RegExp("^[0-9a-zA-Z_.*+$]{8,16}$");
      var verificationCode = this.verificationCode;
      var password = this.password;
      if (verificationCode == "") {
        this.commonality.toast("验证码不能为空！", this);
        return false;
      } else if (password == "") {
        this.commonality.toast("密码不能为空！", this);
        return false;
      } else if (!regpassword.test(password)) {
        this.commonality.toast("密码格式不正确，请重新输入！", this);
        return false;
      } else {
        param.phone = this.phone;
        param.code = this.verificationCode;
        param.password = this.password;
        console.log(param);
        this.api.retrieve(param).then(res => {
          if (res.code == 200) {
            console.log(res);
            this.$router.push({
              path: "/"
            });
            this.commonality.toast("密码重置成功", this);
          } else {
            this.commonality.toast(res.message, this);
          }
        });
      }
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
  line-height: 38px;
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