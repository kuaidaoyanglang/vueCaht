<template>
  <div>
    <PageHeader :headerInfo="headerInfo"></PageHeader>
    <div class="BOX">
      <div class="Box">
        <div>
          <img :src="informationList.image_url" alt preview="0"/>
        </div>
        <div class="tit">
          <div class="title">
            <span v-if="informationList.nick_name==''">暂无昵称</span>
            <span>{{informationList.nick_name}}</span>
          </div>
          <div class="text">
            <div>账号：{{informationList.account}}</div>
            <div @click="Information">
              <img src="../../assets/image/Qrcode.png" alt />
              <img src="../../assets/image/right.png" alt />
            </div>
          </div>
        </div>
      </div>
      <div class="BoxChild">
        <div class="boxChild">
          <img src="../../assets/image/pay.png" alt />
          <div class="textChild">
            <div>支付</div>
            <img src="../../assets/image/right.png" alt />
          </div>
        </div>
        <div class="boxChild">
          <img src="../../assets/image/CardPackage.png" alt />
          <div class="textChild">
            <div>卡包</div>
            <img src="../../assets/image/right.png" alt />
          </div>
        </div>
        <div class="boxChild" @click="setUp">
          <img src="../../assets/image/seting.png" alt />
          <div class="textChild">
            <div>设置</div>
            <img src="../../assets/image/right.png" alt />
          </div>
        </div>
      </div>
    </div>
    <navigationBar></navigationBar>
  </div>
</template>
<script>
import navigationBar from "../../components/common/navigationBar";
import PageHeader from "../../components/common/PageHeader";
export default {
  name: "mine",
  data() {
    return {
      headerInfo: "我",
      informationList: []
    };
  },
  components: {
    navigationBar,
    PageHeader
  },
  created() {
    this.api.getUserInfo().then(res => {
      if (res.code == 200) {
        console.log(res.result.data);
        this.informationList = res.result.data;
      }
    });
  },
  methods: {
    Information() {
      this.$router.push({
        path: "personalInformation",
        query: {
          img: this.informationList.image_url,
          nick_name: this.informationList.nick_name,
          account: this.informationList.account,
          sex: this.informationList.sex
        }
      });
    },
    // 设置
    setUp() {
      this.$router.push({
        path: "setUp"
      });
    }
  }
};
</script>
<style lang="less" scoped>
.BOX {
  width: 100%;
  margin: 0;
  border-bottom: 1px solid #dedede;
}
.Box {
  width: 100%;
  height: 220px;
  padding: 20px 0 10 0;
  margin: 0;
  background-color: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.Box img {
  width: 100px;
  height: 100px;
  margin-left: 30px;
  border-radius: 10px;
}
.tit {
  width: 82%;
  height: 96px;
  margin-left: 30px;
}
.tit .title {
  font-size: 30px;
  font-weight: 600;
}

.box {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.box img {
  width: 70px;
  height: 70px;
  border-radius: 10px;
  margin-left: 18px;
}
.text {
  width: 98%;
  height: 66px;
  line-height: 85px;
  margin-right: 0;
  font-size: 28px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #a09e9e;
}
.text img {
  width: 30px;
  height: 30px;
}
.BoxChild {
  width: 100%;
  margin-top: 10px;
  background-color: #fff;
}
.boxChild {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.boxChild img {
  width: 43px;
  height: 43px;
  border-radius: 10px;
  margin-left: 30px;
}
.textChild {
  width: 82%;
  height: 85px;
  line-height: 85px;
  padding: 10px;
  margin-right: 0;
  border-bottom: 1px solid #dedede;
  font-size: 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.textChild img {
  width: 30px;
  height: 30px;
}
</style>