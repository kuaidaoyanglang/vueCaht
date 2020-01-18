<template>
  <div>
    <PageHeaderChange :headerInfo="headerInfo"></PageHeaderChange>
    <div class="BOX">
      <div class="Box">
        <div class="imgBox" v-for="(item,index) in membersList" :key="index">
          <img :src="item.image_url" alt />
          <div class="nickname">{{item.nick_name}}</div>
        </div>
        <div class="imgBox">
          <img src="../../../assets/image/addfriends.png" alt />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import PageHeaderChange from "../../../components/common/PageHeaderChange";
export default {
  name: "membersChat",
  data() {
    return {
      headerInfo: "聊天成员",
      membersList: []
    };
  },
  components: {
    PageHeaderChange
  },
  created() {
    let param = {};
    param.id = this.$route.query.id;
    this.api.memberList(param).then(res => {
      if (res.code == 200) {
        this.membersList = res.result.data;
        // console.log(this.membersList);
      }
    });
  }
};
</script>
<style lang="less" scoped>
.BOX {
  width: 100%;
  height: 100%;
  background-color: #fff;
}
.Box {
  width: 92%;
  margin: 10px auto;
  display: flex;
  justify-content: flex-start;
  flex-flow: wrap;
}
.imgBox {
  width: 18%;
  margin: 1%;
  text-align: center;
}
.imgBox img {
  width: 76%;
  border-radius: 10px;
}
.nickname {
  text-align: center;
  font-size: 26px;
  overflow: hidden;
  color: #615f5f;
}
</style>