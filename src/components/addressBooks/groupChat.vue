<template>
  <div>
    <PageHeaderChange :headerInfo="headerInfo" :bottonName="bottonName">
      <button @click="buildingGroup">{{bottonName}}</button>
    </PageHeaderChange>
    <div class="Box">
      <img src="../../assets/image/search.png" alt />
      <input type="text" placeholder="搜索好友" v-model="value" />
      <button v-if="show" @click="search">搜索</button>
    </div>
    <div class="Box" @click="selectGroupChat">
      <div class="title">选择一个群</div>
    </div>
    <div class="Box1" v-if="count!=0">
      <div class="box1" v-for="(item,index) in friendsList" :key="index">
        <img :src="item.image_url" alt />
        <div class="text1">
          <div>{{item.nick_name}}</div>
          <van-checkbox
            v-model="item.checked"
            checked-color="#3bca86"
            ref="checkboxes"
            shape="square"
            @click="toggle(item,index)"
          ></van-checkbox>
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
  name: "groupChat",
  data() {
    return {
      headerInfo: "发起群聊",
      bottonName: "确定",
      show: false,
      value: "",
      friendsList: [],
      count: 0,
      text: "暂无好友"
    };
  },
  components: {
    PageHeaderChange,
    temporarilyNoData
  },
  watch: {
    value() {
      if (this.value != "") {
        this.show = true;
      }
    }
  },
  created() {
    this.api.getFriend().then(res => {
      if (res.code == 200) {
        console.log(res);
        this.count = res.result.data.length;
        this.friendsList = res.result.data;
        console.log(this.friendsList);
      }
    });
  },
  methods: {
    // 搜索好友
    search() {
      let param = {};
      param.account = this.value;
      param.status = 1;
      this.api.search(param).then(res => {
        if (res.code == 200) {
          console.log(res);
        }
      });
    },
    selectGroupChat() {
      this.$router.push({
        path: "selectGroupChat"
      });
    },
    // 创建群
    buildingGroup() {
      let arr = [];
      for (var i = 0; i < this.friendsList.length; i++) {
        if (this.friendsList[i].checked == true) {
          arr.push(this.friendsList[i].friend_id);
        }
      }
      console.log(arr);
      if (arr.length == 0) {
        this.commonality.toast("选择群成员", this);
      } else if (arr.length < 2) {
        this.commonality.toast("群成员至少2人", this);
      } else {
        let param = {};
        param.userIds = arr;
        this.api.buildingGroup(param).then(res => {
          if (res.code == 200) {
            console.log(res);
            this.$router.push({
              path: "selectGroupChat"
            });
          } else {
            console.log(res.message);
            this.commonality.toast(res.message, this);
          }
        });
      }
    },
    toggle(item, index) {
      this.$refs.checkboxes[index].toggle();
    }
  }
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
.title {
  margin-left: 35px;
  font-size: 30px;
}
.Box1 {
  width: 100%;
  margin: 20px 0 0 0;
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