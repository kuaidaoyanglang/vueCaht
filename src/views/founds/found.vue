<template>
  <div>
    <PageHeader :headerInfo="headerInfo"></PageHeader>
    <div class="Box">
      <div class="box" @click="circleFriend">
        <img src="../../assets/image/CircleFriends.png" alt />
        <div class="text">
          <div>朋友圈</div>
          <img src="../../assets/image/right.png" alt />
        </div>
      </div>
      <div class="box">
        <img src="../../assets/image/game.png" alt />
        <div class="text">
          <div>游戏</div>
          <img src="../../assets/image/right.png" alt />
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
  name: "found",
  data() {
    return {
      headerInfo: "发现"
    };
  },
  components: {
    navigationBar,
    PageHeader
  },
  methods: {
    circleFriend() {
      this.$router.push({
        path: "circleFriends"
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
  border-bottom: 1px solid #dedede;
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
.text img {
  width: 30px;
  height: 30px;
}
</style>