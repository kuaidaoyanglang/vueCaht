<template>
  <div class="PageHeaderWra">
    <div class="PageHeader">
      <div style="margin-left:10px">
        <span class="titleText">{{headerInfo}}</span>
      </div>
      <div style="margin-right:10px">
        <img src="../../assets/image/search.png" alt @click="search" />
        <img src="../../assets/image/add.png" alt style="margin-left:20px" @click="add" />
      </div>
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "PageHeader",
  props: ["headerInfo"],
  data() {
    return {
    };
  },
  methods: {
    add() {
      this.$router.push({
        path: "addFriend"
      });
    },
    // 搜索
    search() {
      this.$router.push({
        path: "search"
      });
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
}
.PageHeader img {
  width: 35px;
  height: 36px;
}

.titleText {
  line-height: 90px;
  font-weight: 700;
}

</style>
