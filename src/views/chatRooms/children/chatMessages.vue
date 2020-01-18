<template>
  <div>
    <PageHeaderChange :headerInfo="headerInfo"></PageHeaderChange>
    <div class="BOX">
      <div class="Box">
        <div class="box" v-for="(item,index) in membersList" :key="index">
          <img :src="item.image_url" alt />
          <div class="name">{{item.nick_name}}</div>
        </div>
        <div class="box" @click="invitation">
          <img src="../../../assets/image/addfriends.png" alt />
        </div>
        <div class="box" @click="invitation">
          <img src="../../../assets/image/reduction.png" alt />
        </div>
        <div class="allMembers" v-if="membersList.length<50" @click="membersChat">查看全部群成员</div>
      </div>
      <div class="BoxChild">
        <div class="boxChild">
          <div class="textChild">
            <div class="txt">群聊名称</div>
            <div class="imgBox">
              <span>{{this.$route.query.group_name}}</span>
              <img src="../../../assets/image/right.png" alt class="arrow" />
            </div>
          </div>
        </div>
        <div class="boxChild" @click="groupQrcode">
          <div class="textChild">
            <div class="txt">群二维码</div>
            <div class="imgBox">
              <img src="../../../assets/image/Qrcode.png" alt class="informationImg" />
              <img src="../../../assets/image/right.png" alt class="arrow" />
            </div>
          </div>
        </div>
        <div class="boxChild">
          <div class="textChild">
            <div class="txt">群公告</div>
            <div class="imgBox">
              <img src="../../../assets/image/right.png" alt class="arrow" />
            </div>
          </div>
        </div>
        <div class="boxChild">
          <div class="textChild">
            <div class="txt">查看聊天记录</div>
            <div class="imgBox">
              <img src="../../../assets/image/right.png" alt class="arrow" />
            </div>
          </div>
        </div>
      </div>
      <div class="BoxChild">
        <div class="boxChild" @click="groupName">
          <div class="textChild">
            <div class="txt">我在本群的昵称</div>
            <div class="imgBox">
              <span>{{nickname}}</span>
              <img src="../../../assets/image/right.png" alt class="arrow" />
            </div>
          </div>
        </div>
      </div>
      <div class="BoxChild">
        <div class="boxChild" @click="clearChatRecords">
          <div class="textChild">
            <div class="txt">清空聊天记录</div>
            <div class="imgBox">
              <img src="../../../assets/image/right.png" alt class="arrow" />
            </div>
          </div>
        </div>
      </div>
      <div class="BoxChild1" @click="refundGroup">
        <div class="txt1">删除并退出</div>
      </div>
    </div>
    <van-dialog v-model="show" title="我在本群的昵称" @confirm="determine" show-cancel-button>
      <div class="inputBox">
        <input type="text" class="input" v-model="setNickname" />
        <div class="tip">设置你在群里的昵称，这个昵称只会在这个群内显示</div>
      </div>
    </van-dialog>
  </div>
</template>
<script>
import PageHeaderChange from "../../../components/common/PageHeaderChange";
import { Dialog } from "vant";
export default {
  name: "chatMessages",
  data() {
    return {
      headerInfo: "聊天信息",
      membersList: [],
      show: false,
      nickname: "",
      setNickname: ""
    };
  },
  components: {
    PageHeaderChange
  },
  created() {
    this.nickname = sessionStorage.getItem("nick_name");
    // console.log(this.$route.query.group_notice);
    let param = {};
    param.id = this.$route.query.id;
    this.api.memberList(param).then(res => {
      if (res.code == 200) {
        console.log(res.result.data);
        this.membersList = res.result.data;
      }
    });
  },
  methods: {
    // 查看全部群成员
    membersChat() {
      this.$router.push({
        path: "membersChat",
        query: {
          id: this.$route.query.id
        }
      });
    },
    // 邀请好友
    invitation() {
      this.$router.push({
        path: "selectContacts"
      });
    },
    // 群二维码
    groupQrcode() {
      this.$router.push({
        path: "groupQrcode",
        query: {
          id: this.$route.query.id
        }
      });
    },
    // 本群昵称
    groupName() {
      this.setNickname = sessionStorage.getItem("nick_name");
      this.show = true;
    },
    // 确定修改本群昵称
    determine() {
      console.log("确定编辑群昵称");
    },
    // 清除聊天记录
    clearChatRecords() {
      Dialog.confirm({
        title: "确定删除群的聊天记录吗？",
        message: ""
      })
        .then(() => {
          console.log("确定删除聊天记录");
        })
        .catch(() => {});
    },
    // 退出群聊
    refundGroup() {
      Dialog.confirm({
        title: "删除并退出群聊",
        message: ""
      })
        .then(() => {
          console.log("确定删除并退出群聊");
        })
        .catch(() => {});
    }
  }
};
</script>
<style lang="less" scoped>
.BOX {
  width: 100%;
  height: 100%;
  overflow: scroll;
}
.BOX::-webkit-scrollbar {
  display: none;
}
.Box {
  width: 100%;
  padding: 10px 0 20px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-flow: wrap;
  background-color: #fff;
}
.box {
  width: 20%;
  text-align: center;
}
.box img {
  width: 60%;
  margin: 10px 10px 0;
}
.allMembers {
  width: 100%;
  margin-top: 30px;
  text-align: center;
  font-size: 30px;
  color: #8b8989;
}
.BoxChild {
  width: 100%;
  margin: 10px 0 0 0;
  background-color: #fff;
  border-bottom: 1px solid #dedede;
}
.boxChild {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.textChild {
  width: 100%;
  height: 85px;
  line-height: 85px;
  padding: 10px;
  margin-right: 0;
  border-bottom: 1px solid #dedede;
  font-size: 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.imgBox {
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #8c8888;
  margin-right: 10px;
}
.informationImg {
  width: 40px;
  height: 40px;
}
.txt {
  margin-left: 10px;
}
.arrow {
  width: 30px;
  height: 30px;
  margin-left: 10px;
}
.BoxChild1 {
  width: 100%;
  padding: 20px 0;
  margin: 10px 0 50px;
  background-color: #fff;
  border-bottom: 1px solid #dedede;
  display: flex;
  justify-content: center;
}
.txt1 {
  color: red;
  padding: 10px;
  font-size: 30px;
  font-weight: 700;
}
.name {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  overflow: hidden;
}
.inputBox {
  width: 90%;
  margin: 20px auto;
}
.input {
  width: 100%;
  border: none;
  padding: 5px;
  border-bottom: 1px solid #dedede;
}
.inputBox .tip {
  font-size: 26px;
  padding: 10px;
  color: #a09c9c;
}
</style>