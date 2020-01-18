<template>
  <div>
    <PageHeaderChange :headerInfo="headerInfo" :bottonName="bottonName">
      <button @click="save">{{bottonName}}</button>
    </PageHeaderChange>
    <div class="Box">
      <input type="text" placeholder="搜索" v-model="value" />
    </div>
    <div class="tip">好名字可以让你的朋友更容易记住你。</div>
  </div>
</template>
<script>
import PageHeaderChange from "../../components/common/PageHeaderChange";
export default {
  name: "changeName",
  data() {
    return {
      headerInfo: "更改名字",
      bottonName: "保存",
      value: ""
    };
  },
  components: {
    PageHeaderChange
  },
  created() {
    this.value = this.$route.query.nick_name;
  },
  methods: {
    save() {
      let param = {};
      param.nick_name = this.value;
      this.api.updateUserInfo(param).then(res => {
        if (res.code == 200) {
          // console.log(res);
          this.$router.push({
            path: "mine"
          });
          this.commonality.toast("昵称修改成功", this);
        }
      });
    }
  }
};
</script>
<style lang="less" scoped>
.Box {
  width: 700px;
  height: 70px;
  line-height: 70px;
  margin: 10px auto;
  padding: 5px 15px;
  border-bottom: 1px solid #3bca86;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.Box img {
  width: 35px;
  height: 35px;
  margin-left: 15px;
}
input {
  width: 70%;
  height: 50px;
  font-size: 28px;
  outline: none;
  border: none;
  background-color: #efeeee;
}
.tip {
  margin-left: 30px;
  font-size: 22px;
  color: #afadad;
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
</style>