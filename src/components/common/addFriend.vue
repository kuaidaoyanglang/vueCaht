<template>
  <div>
    <PageHeaderChange :headerInfo="headerInfo"></PageHeaderChange>
    <div class="Box">
      <img src="../../assets/image/search.png" alt />
      <input type="text" placeholder="账号" v-model="value" />
      <button v-if="show" @click="search">搜索</button>
    </div>
    <div class="box" @click="Qrcode">
      我的账号：
      <span>{{account}}</span>
      <span>
        <img src="../../assets/image/Qrcode.png" alt />
      </span>
    </div>
    <div class="Box1" v-for="(item,index) in searchList" :key="index">
      <div class="box1">
        <div>
          <img :src="item.image_url" alt />
        </div>
        <div class="text">
          <div>{{item.account}}</div>
          <button @click="add(item)" v-if="item.is_friend!=1">添加</button>
          <button @click="details(item)" v-if="item.is_friend==1">已添加</button>
        </div>
      </div>
    </div>
    <van-dialog
      v-model="show1"
      title="备注"
      show-cancel-button
      style="width:80%;text-align:center;"
      @confirm="confirm"
    >
      <input
        type="text"
        style="width:80%;border:1px solid #dedede;padding:5px 20px;margin:15px 0"
        placeholder="请输入备注内容"
        v-model="message"
      />
    </van-dialog>
    <temporarilyNoData :text="'没有找到'+text+'的结果'" v-if="number===1"></temporarilyNoData>
  </div>
</template>
<script>
import PageHeaderChange from "../../components/common/PageHeaderChange";
import temporarilyNoData from "../../components/common/temporarilyNoData";
export default {
  name: "addFriend",
  data() {
    return {
      headerInfo: "添加朋友",
      text: "",
      show: false,
      show1: false,
      value: "",
      searchList: [],
      number: 0,
      note: "",
      friendId: "",
      message: "",
      account: ""
    };
  },
  components: {
    PageHeaderChange,
    temporarilyNoData
  },
  created() {
    this.account = sessionStorage.getItem("account");
  },
  watch: {
    value() {
      if (this.value != "") {
        this.show = true;
      }
    }
  },
  methods: {
    // 搜索
    search() {
      let param = {};
      param.account = this.value;
      this.api.search(param).then(res => {
        if (res.code == 200) {
          if (res.result.count != 0) {
            console.log(res);
            this.searchList = res.result.data;
          } else {
            this.text = this.value;
            this.number = 1;
          }
        }
      });
    },
    // 二维码
    Qrcode() {
      this.$router.push({
        path: "Qrcode"
      });
    },
    // 添加
    add(item) {
      this.show1 = true;
      this.friendId = item.id;
    },
    // 确定添加
    confirm() {
      let param = {};
      param.friendId = this.friendId;
      param.message = this.message;
      console.log(param);
      this.api.create(param).then(res => {
        if (res.code == 200) {
          console.log(res);
          this.show1 = false;
          this.$router.push({
            path: "addressBook"
          });
          this.commonality.toast("添加申请已发送", this);
        } else {
          this.commonality.toast(res.message, this);
        }
      });
    },
    // 好友详情
    details(item) {
      this.$router.push({
        path: "newFriendsDetails",
        query: {
          friend_id: item.id,
          status: item.status
        }
      });
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
}
.Box img {
  width: 30px;
  height: 30px;
  margin: 0 30px;
}
.Box input {
  width: 73%;
  height: 50px;
  outline: none;
  border: none;
  background-color: #fff;
  caret-color: #3bca86;
  font-size: 27px;
}
.Box button {
  width: 90px;
  height: 50px;
  line-height: 50px;
  outline: none;
  border: none;
  border-radius: 10px;
  background-color: #63e25f;
  color: #fff;
}
.box {
  width: 50%;
  height: 50px;
  margin: 10px auto;
  text-align: center;
  color: #6f6e6e;
  padding: 15px 0;
  display: flex;
  justify-content: center;
  align-items: center;
}
.box img {
  width: 40px;
  height: 40px;
  padding: 30px;
}

.Box1 {
  width: 100%;
  margin: 0;
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
.text {
  width: 82%;
  height: 85px;
  line-height: 85px;
  padding: 10px;
  margin-right: 0;
  font-size: 27px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.text button {
  width: 120px;
  height: 60px;
  line-height: 60px;
  outline: none;
  border: none;
  border-radius: 10px;
  background-color: #63e25f;
  color: #fff;
}
</style>