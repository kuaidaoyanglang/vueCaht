<template>
  <div>
    <div class="Box">
      <img src="../../assets/image/left.png" alt @click="goback" />
      <input type="text" placeholder="搜索" v-model="value" />
      <button @click="create">搜索</button>
    </div>
    <div class="Box1" v-if="Object.keys(friendsList1).length != 0">
      <div class="box">
        <img :src="friendsList1.image_url" alt />
        <div class="text">
          <div>{{friendsList1.nick_name}}</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "search",
  data() {
    return {
      value: "",
      show: true,
      friendsList: [],
      friendsList1: []
    };
  },
  components: {},
  created() {},
  methods: {
    goback() {
      this.$router.go(-1);
    },
    create() {
      this.friendsList = JSON.parse(
        localStorage.getItem("friendsList")
      ).result.data;
      for (var i = 0; i < this.friendsList.length; i++) {
        if (this.value == this.friendsList[i].nick_name) {
          this.friendsList1 = this.friendsList[i];
          return;
        } else {
          this.commonality.toast("没有找到" + this.value + "相关的结果", this);
        }
      }
    }
  }
};
</script>
<style lang="less" scoped>
.Box {
  width: 100%;
  height: 90px;
  line-height: 90px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #dedede;
}
.Box img {
  width: 35px;
  height: 35px;
  margin-left: 15px;
}
input {
  width: 70%;
  height: 80px;
  line-height: 80px;
  outline: none;
  border: none;
  font-size: 27px;
  background-color: #efeeee;
  caret-color: #3bca86;
}
button {
  width: 16%;
  height: 50px;
  line-height: 50px;
  outline: none;
  border: none;
  color: #fff;
  background-color: #0eab60;
  margin-right: 10px;
  border-radius: 10px;
}
.box {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.box img {
  width: 75px;
  height: 75px;
  border-radius: 10px;
  margin-left: 18px;
}
.text {
  width: 82%;
  height: 85px;
  line-height: 85px;
  padding: 10px;
  margin-right: 0;

  font-size: 27px;
}
.Box1 {
  width: 100%;
  position: absolute;
  top: 90px;
  background-color: #fff;
  border-bottom: 1px solid #dedede;
}
</style>