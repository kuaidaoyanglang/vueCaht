<template>
  <div>
    <PageHeader :headerInfo="headerInfo"></PageHeader>
    <div class="Box">
      <div class="box" @touchstart="showDeleteButton" @touchend="emptyTime" @click="aa">
        <img src="../../assets/image/t2.jpg" alt />
        <div class="text">
          <div class="tit">
            <div class="name">胡荣华</div>
            <div style="color:#949292;font-size:10px">14：21</div>
          </div>
          <div class="content">分为无发热个梵蒂冈不凡的改变</div>
        </div>
        <div class="tip" v-if="show" @click.stop="shanchu">删除该聊天</div>
      </div>
      <div class="box">
        <img src="../../assets/image/t1.jpg" alt />
        <div class="text">
          <div class="tit">
            <div class="name">富翁</div>
            <div style="color:#949292;font-size:10px">15：37</div>
          </div>
          <div class="content">似懂非懂</div>
        </div>
        <!-- <div class="tip">删除</div> -->
      </div>
    </div>
    <navigationBar></navigationBar>
  </div>
</template>
<script>
import navigationBar from "../../components/common/navigationBar";
import PageHeader from "../../components/common/PageHeader";
export default {
  name: "index",
  data() {
    return {
      headerInfo: "微信",
      timeOutEvent: 0,
      Loop: null,
      show: false
    };
  },
  components: {
    navigationBar,
    PageHeader
  },

  methods: {
    showDeleteButton: function(e) {
      clearTimeout(this.Loop); //再次清空定时器，防止重复注册定时器
      this.Loop = setTimeout(
        function() {
          this.show = true;
          console.log("长按事件");
        }.bind(this),
        1000
      );
    },
    //清空
    emptyTime: function() {
      clearTimeout(this.Loop); //清空定时器，防止重复注册定时器
    },
    aa() {
      console.log("点击事件");
    },
    shanchu() {
      console.log("点击删除");
      this.show = false;
    },
    //开始录音
    translationStart() {
      this.reshow = false;
      let that = this;
      that.rc = new Recorderx();
      that.$nextTick(() => {
        that.rc
          .start()
          .then(() => {
            console.log("开始录音");
          })
          .catch(error => {
            console.log("录音失败", error);
          });
      });
    }
  }
};
</script>
<style lang="less" scoped>
.Box {
  width: 100%;
  margin: 0;
  background-color: #fff;
}
.box {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  // position: relative;
}
.box img {
  width: 77px;
  height: 77px;
  border-radius: 10px;
  margin-left: 18px;
}
.text {
  width: 82%;
  height: 85px;
  padding: 10px;
  margin-right: 0;
  border-bottom: 1px solid #dedede;
  font-size: 27px;
}
.name {
  font-size: 30px;
  margin-top: 8px;
}
.tit {
  display: flex;
  justify-content: space-between;
}
.content {
  color: #949292;
  font-size: 20px;
  margin-top: 12px;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  overflow: hidden;
}
.tip {
  width: 30%;
  height: 70px;
  line-height: 70px;
  font-size: 30px;
  text-align: center;
  position: absolute;
  left: 50%;
  top: 10%;
  background-color: #fff;
  box-shadow: 0px 0px 15px rgb(209, 208, 208);
}
</style>