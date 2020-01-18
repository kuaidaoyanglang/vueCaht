<template>
  <div>
    <PageHeader :headerInfo="headerInfo"></PageHeader>
    <div class="Box">
      <div class="box" @click="newFriend">
        <img src="../../assets/image/Group.png" alt />
        <div class="text">
          <div>新的朋友</div>
        </div>
      </div>
      <div class="box" @click="groupChat">
        <img src="../../assets/image/friend.png" alt />
        <div class="text">
          <div>群聊</div>
        </div>
      </div>
      <div class="box" @click="goblacklist">
        <img src="../../assets/image/blacklist.png" alt />
        <div class="text">
          <div>黑名单</div>
        </div>
      </div>
    </div>
    <div class="Box1" v-if="count!=0">
      <div class="box" v-for="(item,index) in friendsList" :key="index" @click="details(item)">
        <img :src="item.image_url" alt />
        <div class="text">
          <div>{{item.nick_name}}</div>
        </div>
      </div>
    </div>
    <div class="tipbox">共有{{friendsLength}}名好友</div>
    <temporarilyNoData :text="text" v-if="count==0"></temporarilyNoData>
    <navigationBar></navigationBar>
  </div>
</template>
<script>
import navigationBar from "../../components/common/navigationBar";
import PageHeader from "../../components/common/PageHeader";
import temporarilyNoData from "../../components/common/temporarilyNoData";
export default {
  name: "addressBook",
  data() {
    return {
      headerInfo: "通讯录",
      text: "暂无好友",
      count: 0,
      friendsList: [],
      friendsLength :0
    };
  },
  components: {
    navigationBar,
    PageHeader,
    temporarilyNoData
  },
  created() {
    this.api.getFriend().then(res => {
      if (res.code == 200) {
        console.log(res.result.data);
        this.count = res.result.data.length;
        this.friendsList = res.result.data;
        this.friendsLength =this.friendsList.length;
        let obj = JSON.stringify(res);
        localStorage.setItem("friendsList", obj);
      }
    });
  },
  methods: {
    newFriend() {
      this.$router.push({
        path: "newFriend"
      });
    },
    groupChat() {
      this.$router.push({
        path: "groupChat"
      });
    },
    details(item) {
      this.$router.push({
        path: "newFriendsDetails",
        query: {
          friend_id: item.friend_id,
          status: item.status
        }
      });
    },
    goblacklist(){
      this.$router.push({
        path: "blacklist"
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
.Box1 {
  width: 100%;
  margin: 15px 0 0 0;
  background-color: #fff;
}
.tipbox{
  width: 100%;
  text-align: center;
  font-size: 28px;
  color: #777575;
  padding: 10px 0;
}
</style>