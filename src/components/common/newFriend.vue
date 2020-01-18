<template>
  <div>
    <PageHeaderChange :headerInfo="headerInfo"></PageHeaderChange>
    <div class="Box1" v-for="(item,index) in newFriendList" :key="index">
      <div class="box1">
        <div @click="details(item)">
          <img :src="item.image_url" alt />
        </div>
        <div class="text">
          <div class="text_tit" @click="details(item)">
            <div>{{item.nick_name}}</div>
            <div class="message">{{item.message}}</div>
          </div>
          <button class="refused" style="margin-left:65px;">删除</button>
          <button class="agreed" v-if="item.status==0" @click="receive(item)">待验证</button>
          <button class="agreed" v-if="item.status==1">已同意</button>
          <button class="refused" v-if="item.status==2">已拒绝</button>
        </div>
      </div>
    </div>
    <temporarilyNoData :text="text" v-if="number==0"></temporarilyNoData>
  </div>
</template>
<script>
import PageHeaderChange from "../../components/common/PageHeaderChange";
import temporarilyNoData from "../../components/common/temporarilyNoData";
// import {mapGetters} from 'vuex';
export default {
  name: "newFriend",
  data() {
    return {
      headerInfo: "新朋友",
      newFriendList: [],
      text: "暂无新朋友",
      number: 0
    };
  },
  components: {
    PageHeaderChange,
    temporarilyNoData
  },
  created() {
    this.api.record().then(res => {
      if (res.code == 200) {
        console.log(res.result.data);
        this.newFriendList = res.result.data;
        this.number = res.result.data.length;
      } else {
        console.log(res.message, this);
      }
    });
  },
  methods: {
    // ...mapActions('addFriendsValidation',[ //addFriendsValidation是指modules文件夹下的addFriendsValidation.js
    //       'getMineBaseApi'  //addFriendsValidation.js文件中的actions里的方法，在上面的@click中执行并传入实参
    //   ]),
    receive(item) {
      this.$router.push({
        path: "friendsValidation",
        query: {
          message: item.message,
          nick_name: item.nick_name,
          id: item.apply_id
        }
      });
    },
    details(item) {
      this.$router.push({
        path: "newFriendsDetails",
        query: {
          status: item.status,
          friend_id: item.user_id,
          id: item.apply_id
        }
      });
    }
  }
};
</script>
<style lang="less" scoped>
.Box1 {
  width: 100%;
  margin: 0;
  background-color: #fff;
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
.text {
  width: 82%;
  height: 85px;
  line-height: 85px;
  padding: 10px;
  margin-right: 0;
  border-bottom: 1px solid #dedede;
  font-size: 27px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.agreed {
  width: 120px;
  height: 60px;
  line-height: 60px;
  outline: none;
  border: none;
  border-radius: 10px;
  background-color: #63e25f;
  color: #fff;
}
.refused {
  width: 120px;
  height: 60px;
  line-height: 60px;
  outline: none;
  border: none;
  border-radius: 10px;
  background-color: red;
  color: #fff;
}
.text_tit div:nth-of-type(1) {
  width: 100%;
  height: 37px;
  line-height: 37px;
}
.text_tit div:nth-of-type(2) {
  width: 100%;
  height: 37px;
  line-height: 37px;
  font-size: 25px;
  color: #969292;
}
.message {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  overflow: hidden;
}
</style>