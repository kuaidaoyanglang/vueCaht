<template>
  <div>
    <PageHeaderChange :headerInfo="headerInfo" :bottonName="bottonName">
      <button>{{bottonName}}</button>
    </PageHeaderChange>
    <div class="Box">
      <img src="../../assets/image/search.png" alt />
      <input type="text" placeholder="搜索" />
    </div>
    <div class="Box1">
      <div class="box1" v-for="(item,index) in friendsList" :key="index">
        <img :src="item.image_url" alt />
        <div class="text1">
          <div>{{item.nick_name}}</div>
          <van-checkbox class="check" v-model="checked" checked-color="#3bca86" shape="square"></van-checkbox>
        </div>
      </div>
    </div>
    <temporarilyNoData :text="text" v-if="count==0"></temporarilyNoData>
  </div>
</template>
<script>
import PageHeaderChange from "../../components/common/PageHeaderChange";
import temporarilyNoData from "../../components/common/temporarilyNoData";
export default {
  name: "selectContacts",
  data() {
    return {
      headerInfo: "选择联系人",
      bottonName: "确定",
      checked: false,
      friendsList: [],
      count: 0,
      text: "暂无好友"
    };
  },
  components: {
    PageHeaderChange,
    temporarilyNoData
  },
  created() {
    this.api.getFriend().then(res => {
      if (res.code == 200) {
        console.log(res.result.data);
        this.count = res.result.data.length;
        this.friendsList = res.result.data;
      }
    });
  },
  methods: {}
};
</script>
<style lang="less" scoped>
.Box {
  width: 100%;
  height: 90px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  background-color: #fff;
  border-bottom: 1px solid #dedede;
}
.Box img {
  width: 30px;
  height: 30px;
  margin: 0 30px;
}
.Box input {
  width: 80%;
  height: 50px;
  outline: none;
  border: none;
  background-color: #fff;
  caret-color: #3bca86;
}
button {
  width: 120px;
  height: 50px;
  outline: none;
  border: none;
  color: #fff;
  background-color: #0eab60;
  margin-right: 10px;
  border-radius: 10px;
}
// button {
//   width: 120px;
//   height: 50px;
//   outline: none;
//   border: none;
//   color: #fff;
//   background-color: #0eab60;
//   margin-right: 10px;
//   border-radius: 10px;
// }
.Box1 {
  width: 100%;
  margin: 20px 0 0 0;
  background-color: #fff;
  border-bottom: 1px solid #dedede;
}
.box1 {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.box1 img {
  width: 70px;
  height: 70px;
  border-radius: 10px;
  margin-left: 18px;
}
.text1 {
  width: 82%;
  height: 85px;
  line-height: 85px;
  padding: 10px 25px 10px 10px;
  margin-right: 0;
  border-bottom: 1px solid #dedede;
  font-size: 27px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.check {
  width: 50px;
  height: 50px;
}
</style>