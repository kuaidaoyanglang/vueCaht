<template>
  <div class="PageHeaderWra">
    <div class="PageHeader">
      <div class="PageHeaderchild" @click="goback">
        <img src="../../assets/image/left.png" alt />
        <span class="titleText">{{headerInfo}}</span>
        <span class="titleText1">{{headerInfo1}}</span>
      </div>
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "PageHeaderchild",
  props: ["headerInfo","headerInfo1"],
  data() {
    return {};
  },
  methods: {
    goback() {
      this.$router.go(-1);
    }
  }
};
</script>

<style lang="less" scoped>
.PageHeaderWra {
  padding-top: 90px;
  position: relative;
  z-index: 50;
}

.PageHeader {
  width: 100%;
  height: 90px;
  flex: 1;
  background: #d7eff7;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 31px;
  display: flex;
  justify-content: space-between;
  color: #313030;
  align-items: center;
}
.PageHeaderchild {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.PageHeader img {
  width: 36px;
  height: 36px;
  margin-left: 10px;
}

.titleText {
  line-height: 90px;
  font-weight: 700;
  margin-left: 10px;
}
.titleText1{
  line-height: 90px;
  font-weight: 500;
  margin-left: 10px;
  color: #848181;
}
</style>
