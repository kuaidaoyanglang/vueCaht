<template>
  <div>
    <PageHeaderChange :headerInfo="headerInfo"></PageHeaderChange>
    <div class="Box">
      <div class="box">
        <div class="headBox">
          <div class="headbox" v-for="(item,index) in membersList" :key="index">
            <img :src="item.image_url" alt class="img" />
          </div>
        </div>
        <div class="name">
          <span v-for="(item,index) in membersList" :key="index">{{item.nick_name}}&nbsp;</span>
        </div>
      </div>
      <div class="imgBox">
        <img src="../../../assets/下载.jpg" alt />
      </div>
      <div class="tip">该二维码7天内有效，重新进入将更新</div>
    </div>
  </div>
</template>
<script>
import PageHeaderChange from "../../../components/common/PageHeaderChange";
export default {
  name: "groupQrcode",
  data() {
    return {
      headerInfo: "群二维码名片",
      membersList: []
    };
  },
  components: {
    PageHeaderChange
  },
  created() {
    let param = {};
    param.id = this.$route.query.id;
    this.api.memberList(param).then(res => {
      if (res.code == 200) {
        if (this.membersList.length <= 9) {
          this.membersList = res.result.data.slice(0, 9);
        }
      }
    });
  },
  methods: {}
};
</script>
<style lang="less" scoped>
.Box {
  width: 80%;
  height: 60%;
  margin: 150px auto;
  background-color: #fff;
  border-radius: 10px;
  padding: 15px;
}
.box {
  width: 100%;
  height: 120px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.box img {
  width: 100px;
  height: 100px;
  margin-right: 15px;
}
.name {
  width: 100%;
  font-size: 28px;
  color: #908f8f;
}
.imgBox {
  width: 77%;
  height: 69%;
  margin: 20px auto;
}
.imgBox img {
  width: 100%;
  height: 100%;
}
.tip {
  width: 100%;
  text-align: center;
  color: #908f8f;
}
.headBox {
  width: 15%;
  height: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-flow: wrap;
  background-color: #dedede;
  border-radius: 10px;
  margin-right: 10px;
  padding: 2px;
  overflow: hidden;
}
.headbox {
  width: 30%;
  height: 30%;
  margin: 1%;
}
.headbox .img {
  width: 100%;
  height: 100%;
  margin: 0;
}
</style>