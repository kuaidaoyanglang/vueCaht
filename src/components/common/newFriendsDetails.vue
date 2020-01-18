<template>
  <div>
    <PageHeaderChange :headerInfo="headerInfo"></PageHeaderChange>
    <div class="Box1">
      <div class="box1">
        <img :src="friendsList.image_url" alt class="headPortrait" preview="0"/>
        <div>
          <div class="tit">
            {{friendsList.nick_name}}
            <span>
              <img src="../../assets/image/nan.png" class="gender" v-if="friendsList.sex==1" />
              <img src="../../assets/image/nv.png" class="gender" v-if="friendsList.sex==2" />
            </span>
          </div>
          <div class="smallTit">账号:{{friendsList.account}}</div>
          <div class="smallTit">手机号:{{friendsList.phone}}</div>
        </div>
      </div>
      <div class="box2" v-if="show">
        <div>
          <span>{{friendsList.nick_name}}</span>:
          <span>{{this.$route.query.message}}</span>
        </div>
        <div class="reply" @click="show1=true">回复</div>
      </div>
    </div>
    <div class="Box2">
      <div>个性签名</div>
      <div>{{friendsList.signature}}</div>
    </div>
    <div class="blackBox">
      <div>黑名单</div>
      <div>
        <van-switch :value="checked" @input="onInput" active-color="#3e90e6" />
      </div>
    </div>
    <div class="Box3" @click="validation" v-if="show">通过验证</div>
    <div class="Box3" v-if="!show" @click="gochat">
      <img src="../../assets/image/sendMessage.png" alt />
      <span>发消息</span>
    </div>
    <div class="Box4" v-if="!show" @click="removeBuddy">
      <span>删除好友</span>
    </div>
    <van-dialog
      v-model="show1"
      title="回复"
      show-cancel-button
      style="width:80%;text-align:center;"
      @confirm="confirm"
    >
      <input
        type="text"
        style="width:80%;border:1px solid #dedede;padding:5px 20px;margin:15px 0"
        placeholder="请输入回复内容"
        v-model="message"
      />
    </van-dialog>
  </div>
</template>
<script>
import PageHeaderChange from "../../components/common/PageHeaderChange";
import { Dialog } from "vant";
export default {
  name: "newFriendsDetails",
  data() {
    return {
      headerInfo: "",
      show: true,
      show1: false,
      friendsList: [],
      message: "",
      checked: false
    };
  },
  components: {
    PageHeaderChange
  },
  created() {
    if (this.$route.query.status == 1) {
      this.show = false;
    } else {
      this.show = true;
    }
    let param = {};
    param.friendId = this.$route.query.friend_id;
    console.log(param);
    this.api.friendInfo(param).then(res => {
      if (res.code == 200) {
        this.friendsList = res.result.data;
        console.log(this.friendsList);
      } else {
        this.commonality.toast(res.message, this);
      }
    });
  },
  methods: {
    // 好友验证
    validation() {
      this.$router.push({
        path: "friendsValidation",
        query: {
          message: this.$route.query.message,
          nick_name: this.friendsList.nick_name,
          id: this.$route.query.id
        }
      });
    },
    // 回复
    confirm() {
      let param = {};
      param.applyId = this.$route.query.id;
      param.status = 2;
      param.message = this.message;
      console.log(param);
      this.api.review(param).then(res => {
        if (res.code == 200) {
          console.log(res);
        } else {
          this.commonality.toast(res.message, this);
        }
      });
    },
    // 删除好友
    removeBuddy() {
      Dialog.confirm({
        title: "确定删除"
      })
        .then(() => {
          let param = {};
          param.friendId = this.$route.query.friend_id;
          this.api.removeBuddy(param).then(res => {
            if (res.code == 200) {
              console.log(res);
              this.$router.push({
                path: "addressBook"
              });
              this.commonality.toast("删除成功", this);
            } else {
              this.commonality.toast(res.message, this);
            }
          });
        })
        .catch(() => {});
    },
    //进聊天
    gochat() {
      this.$router.push({
        path: "chatRoom",
        query: {
          name: this.friendsList.nick_name
        }
      });
    },
    // 加入黑名单
    onInput(checked) {
      Dialog.confirm({
        title: "加入黑名单",
        message:
          "加入黑名单，你将不再收到对方的消息，并且你们互相看不到对方朋友圈的更新"
      })
        .then(() => {
          this.checked = checked;
        })
        .catch(() => {
          // on cancel
        });
    }
  }
};
</script>
<style lang="less" scoped>
.Box1 {
  width: 100%;
  padding: 20px 0;
  background-color: #fff;
}
.box1 {
  width: 90%;
  margin: 30px auto;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.headPortrait {
  width: 100px;
  border-radius: 10px;
  margin-right: 20px;
}
.gender {
  width: 30px;
  margin-left: 20px;
}
.box1 .tit {
  font-size: 30px;
  font-weight: 700;
}
.smallTit {
  font-size: 26px;
  margin-top: 6px;
  color: #888585;
}
.box2 {
  width: 80%;
  margin: 10px auto;
  border-radius: 10px;
  overflow: hidden;
  background-color: #efeeee;
  padding: 20px;
  font-size: 28px;
  color: #888585;
}
.reply {
  color: #0b0b6b;
}
.Box2 {
  width: 100%;
  margin-top: 20px;
  padding: 20px 0;
  background-color: #fff;
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.Box2 div:nth-of-type(1) {
  font-size: 30px;
  width: 20%;
}
.Box2 div:nth-of-type(2) {
  font-size: 28px;
  color: #888585;
  width: 65%;
}
.blackBox {
  width: 100%;
  margin-top: 20px;
  padding: 20px 0;
  font-size: 30px;
  background-color: #fff;
  display: flex;
  justify-content: space-around;
  align-items: center;
}

.blackBox div:nth-of-type(2) {
  text-align: right;
  width: 65%;
}
.Box3 {
  width: 100%;
  margin-top: 20px;
  padding: 20px 0;
  background-color: #fff;
  text-align: center;
  font-size: 30px;
  font-weight: 600;
  color: #51b3f1;
  display: flex;
  justify-content: center;
  align-items: center;
}
.Box3 img {
  width: 30px;
  margin-right: 10px;
}
.Box4 {
  width: 100%;
  margin-top: 20px;
  padding: 20px 0;
  background-color: #fff;
  // opacity: 0.5;
  text-align: center;
  font-size: 30px;
  font-weight: 600;
  color: #f70606;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>