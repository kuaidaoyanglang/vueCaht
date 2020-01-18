<template>
  <div>
    <PageHeaderChange :headerInfo="headerInfo"></PageHeaderChange>
    <div class="Box" v-if="number!=0">
      <div class="box" v-for="(item,index) in groupList" :key="index" @click="intoGroup(item)">
        <!-- <img src="../../assets/qun1.jpg" alt /> -->
        <!-- 九个人 -->
        <div class="imgBox" v-if="item.avatarArr.length>=9">
          <div class="imgbox" v-for="certain in item.avatarArr" :key="certain.index">
            <img :src="certain" alt class="img" />
          </div>
        </div>
        <!-- 四个人 -->
        <div class="imgBox1" v-if="item.avatarArr.length<=4">
          <div class="imgbox1" v-for="certain in item.avatarArr" :key="certain.index">
            <img :src="certain" alt class="img1" />
          </div>
        </div>
        <div class="text">
          <div>
            {{item.group_name}}
            <span>({{item.memberList.length}})</span>
          </div>
        </div>
      </div>
    </div>
    <temporarilyNoData :text="text" v-if="number==0"></temporarilyNoData>
  </div>
</template>
<script>
import PageHeaderChange from "../../components/common/PageHeaderChange";
import temporarilyNoData from "../../components/common/temporarilyNoData";
export default {
  name: "selectGroupChat",
  data() {
    return {
      headerInfo: "选择群聊",
      text: "暂无群组",
      groupList: [],
      number: 0
    };
  },
  components: {
    PageHeaderChange,
    temporarilyNoData
  },
  created() {
    this.api.group().then(res => {
      if (res.code == 200) {
        this.groupList = res.result.data;
        this.number = res.result.data.length;
        console.log(this.groupList);
      }
    });
  },
  methods: {
    intoGroup(item) {
      console.log(item.memberList.length);
      let param = {};
      param.friendIds = item.memberList;
      this.api.roomCreate(param).then(res => {
        if (res.code == 200) {
          console.log(res);
          this.$router.push({
            path: "chatRoom",
            query: {
              name: item.group_name,
              num: item.memberList.length,
              id: item.id,
              group_name:item.group_name,
              group_notice:item.group_notice
            }
          });
        }
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
}
.text {
  width: 82%;
  height: 85px;
  line-height: 85px;
  padding: 10px;
  margin-right: 0;
  font-size: 27px;
  border-bottom: 1px solid #dedede;
}
.text span {
  font-size: 25px;
  color: #b7b4b4;
  margin-left: 20px;
}
.imgBox {
  width: 12%;
  height: 85px;
  margin-left: 10px;
  border-radius: 10px;
  background-color: #dedede;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-flow: wrap;
}
.imgbox {
  width: 30%;
  height: 30%;
  margin: 1%;
}
.imgbox .img {
  width: 100%;
  height: 100%;
  margin: 0;
}
.imgBox1 {
  width: 12%;
  height: 85px;
  margin-left: 10px;
  border-radius: 10px;
  background-color: #dedede;
  display: flex;
  justify-content: flex-start;
  flex-flow: wrap;
}
.imgbox1 {
  width: 42%;
  height: 42%;
  margin: 2%;
  padding: 2%;
}
.imgbox1 .img1 {
  width: 100%;
  height: 100%;
  margin: 1%;
}
</style>