<template>
  <div>
    <PageHeaderChange :headerInfo="headerInfo"></PageHeaderChange>
    <div class="Box">
      <div class="box">
        <img :src="headImg" alt />
        <div>
          <div class="name">
            <span>{{nick_name}}</span>
            <img src="../../assets/image/nan.png" alt v-if="sex==1" />
            <img src="../../assets/image/nv.png" alt v-if="sex==2" />
          </div>
          <div class="address" @click="aa">
            <span>陕西</span>&nbsp;
            <span>西安</span>
          </div>
        </div>
      </div>
      <div class="imgBox">
        <img src="../../assets/下载.jpg" alt />
      </div>
      <div class="tip">扫一扫上面的二维码图案，加我微信</div>
    </div>
    <div id="qrcode" ref="qrcode"></div>
  </div>
</template>
<script>
import PageHeaderChange from "../../components/common/PageHeaderChange";
import QRCode from "qrcodejs2";
export default {
  name: "Qrcode",
  data() {
    return {
      headerInfo: "二维码名片",
      headImg: "",
      nick_name: "",
      sex: 0
    };
  },
  components: {
    PageHeaderChange
  },
  created() {
    this.headImg = this.$route.query.img;
    this.nick_name = this.$route.query.nick_name;
    this.sex = this.$route.query.sex;
  },
  methods: {
    qrcode() {
      let qrcode = new QRCode("qrcode", {
        width: 200, // 二维码宽度，单位像素

        height: 200, // 二维码高度，单位像素

        text: "https://admin.xasls.com/" // 生成二维码的链接
      });
    },
    aa() {
      this.$nextTick(() => {
        this.qrcode();
      });
    }
  }
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
  font-size: 33px;
  font-weight: 700;
}
.name img {
  width: 30px;
  height: 30px;
  margin-left: 10px;
}
.address {
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
</style>