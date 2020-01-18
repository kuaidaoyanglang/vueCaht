<template>
  <div>
    <PageHeaderChange :headerInfo="headerInfo"></PageHeaderChange>
    <div class="Box1">
      <div class="box">
        <img src="../../assets/image/t1.jpg" alt />
        <div class="text">
          <div>推广服帖</div>
        </div>
      </div>
    </div>
    <temporarilyNoData :text="text"></temporarilyNoData>
  </div>
</template>
<script>
import PageHeaderChange from "../../components/common/PageHeaderChange";
import temporarilyNoData from "../../components/common/temporarilyNoData";
export default {
  name: "blacklist",
  data() {
    return {
      headerInfo: "黑名单",
      text: "暂无数据"
    };
  },
  components: {
    PageHeaderChange,
    temporarilyNoData
  }
};
</script>
<style lang="less" scoped>
.Box1 {
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
  border-bottom: 1px solid #dedede;
  font-size: 30px;
}
</style>