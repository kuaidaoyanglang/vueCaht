<template>
  <div>
    <div class="headBox">
      <img src="../../assets/image/down.png" alt @click="gologin" />
    </div>
    <div class="Box">
      <div>
        <div class="tit">注册</div>
        <div class="box">
          <div>账号</div>
          <input type="text" placeholder="请填写账号(字母开头，最少八位)" class="input1" v-model="account" />
        </div>
        <div class="box">
          <div>手机号</div>
          <input type="text" placeholder="请填写手机号" class="input1" v-model="mobilePhone" />
        </div>
        <div class="box">
          <div>验证码</div>
          <input type="password" placeholder="请填写验证码" class="input2" v-model="verificationCode" />
          <button class="button2" @click="getCode" v-show="show">获取验证码</button>
          <button v-show="!show" class="button2">剩余{{count}} s</button>
        </div>
        <div class="box">
          <div>密码</div>
          <input type="password" placeholder="请填写密码(最少八位)" class="input1" v-model="password" />
        </div>
      </div>
      <div class="buttonBox">
        <button class="button1" @click="handleRegistered">注册</button>
        <div class="tipBox">
          <span @click="forgotPassword">找回密码</span> |
          <span @click="gologin">登录</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "registered",
  data() {
    return {
      account: "",
      mobilePhone: "",
      verificationCode: "",
      password: "",
      show: true,
      count: "",
      timer: null
    };
  },
  methods: {
    // 发送验证码
    getCode() {
      let param = {};
      var regaccount = new RegExp("^[a-zA-Z]{1}[a-zA-Z0-9]{7,19}$");
      var regmobilePhone = new RegExp(
        "^[1](([3][0-9])|([4][5-9])|([5][0-3,5-9])|([6][5,6])|([7][0-8])|([8][0-9])|([9][1,8,9]))[0-9]{8}$"
      );
      var account = this.account;
      var mobilePhone = this.mobilePhone;
      var verificationCode = this.verificationCode;
      var password = this.password;
      if (account == "") {
        this.commonality.toast("账号不能为空！", this);
        return false;
      } else if (!regaccount.test(account)) {
        this.commonality.toast("账号格式不正确，请重新输入！", this);
        return false;
      } else if (mobilePhone == "") {
        this.commonality.toast("手机号不能为空！", this);
        return false;
      } else if (!regmobilePhone.test(mobilePhone)) {
        this.commonality.toast("手机号格式不正确，请重新输入！", this);
        return false;
      } else {
        param.phone = mobilePhone;
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
    // 注册
    handleRegistered() {
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
        param.account = this.account;
        param.phone = this.mobilePhone;
        param.code = this.verificationCode;
        param.password = this.password;
        this.api.register(param).then(res => {
          console.log(res);
          if (res.code == 200) {
            let id = res.result.data.id;
            this.$router.push({
              path: "/"
            });
          } else {
            this.commonality.toast(res.message, this);
          }
        });
      }
    },
    gologin() {
      this.$router.push({
        path: "/"
      });
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
.headBox {
  width: 90%;
  height: 60px;
  line-height: 60px;
  position: fixed;
  top: 10px;
  left: 20px;
}
.headBox img {
  width: 50px;
  height: 50px;
}
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
  border: 1px solid;
  background-color: #efeeee;
}
.tipBox {
  width: 100%;
  height: 60px;
  margin: auto;
  margin-top: 30%;
  text-align: center;
  color: #2e318a;
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
</style>