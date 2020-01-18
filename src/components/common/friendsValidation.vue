<template>
  <div>
    <PageHeaderChange :headerInfo="headerInfo" :bottonName="bottonName">
      <button @click="through">{{bottonName}}</button>
    </PageHeaderChange>
    <div class="Box">
      <div>为朋友设置验证</div>
      <div>
        <input type="text" :placeholder="this.$route.query.nick_name" v-model="value" />
      </div>
      <div>
        <span>
          对方发来的验证消息为：“
          <span>{{this.$route.query.message}}</span>”
        </span>
        <span class="tip" @click="setTip">填入</span>
      </div>
    </div>
  </div>
</template>
<script>
import PageHeaderChange from "../../components/common/PageHeaderChange";
export default {
  name: "friendsValidation",
  data() {
    return {
      headerInfo: "朋友验证",
      bottonName: "完成",
      newFriendList: [],
      value: ""
    };
  },
  components: {
    PageHeaderChange
  },
  created() {},
  methods: {
    setTip() {
      this.value = this.$route.query.message;
    },
    through() {
      let param = {};
      param.applyId = this.$route.query.id;
      param.message = this.value;
      param.status = 1;
      // console.log(param);
      this.api.review(param).then(res => {
        if (res.code == 200) {
          // console.log(res);
          this.$router.push({
            path: "addressBook"
          });
        } else {
          this.commonality.toast(res.message, this);
        }
      });
    }
  }
};
</script>
<style lang="less" scoped>
button {
  width: 120px;
  height: 50px;
  outline: none;
  border: none;
  color: #fff;
  background-color: #0eab60;
  margin-right: 10px;
  border-radius: 10px;
}
.Box {
  width: 730px;
  padding: 20px 10px;
  background-color: #fff;
}
.Box1 {
  width: 730px;
  padding: 20px 10px;
  margin-top: 50px;
  /* background-color: #fff; */
  display: flex;
  justify-content: center;
}
button {
  width: 120px;
  height: 50px;
  outline: none;
  border: none;
  color: #fff;
  background-color: #0eab60;
  margin-right: 10px;
  border-radius: 10px;
}
.Box input {
  width: 90%;
  margin: 0 auto;
  padding: 30px;
  border: none;
  border-bottom: 1px solid #dedede;
  font-size: 28px;
}
.Box div:nth-of-type(1) {
  color: #a09c9c;
}
.Box div:nth-of-type(3) {
  padding: 10px;
}
.tip {
  color: #232386;
}
</style>