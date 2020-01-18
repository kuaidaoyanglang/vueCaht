<template>
  <div>
    <div class="noData">
      <img src="../../assets/image/no.png" alt />
      <p>{{text}}</p>
    </div>
  </div>
</template>
<script>
export default {
  name: "temporarilyNoData",
  props:["text"]
};
</script>
<style lang="less" scoped>
.noData {
  width: 100%;
  height: 100%;
  text-align: center;
}
.noData img {
  width: 35%;
  margin: 100px auto 0;
}
.noData p {
  color: #8a8a8a;
}
</style>