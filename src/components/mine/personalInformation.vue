<template>
  <div>
    <PageHeaderChange :headerInfo="headerInfo"></PageHeaderChange>
    <div class="BoxChild">
      <div class="boxChild">
        <div class="textChild">
          <div class="txt">头像</div>
          <div class="imgBox">
            <img :src="avatarUrl" ref @click="uploadavatar" class="informationImg1" />
            <input
              type="file"
              class="uploadinput"
              name="avatar"
              @change="uploadfile"
              ref="fileinput"
              accept="image/png, image/jpg"
            />
            <img src="../../assets/image/right.png" alt class="arrow" />
          </div>
        </div>
      </div>
      <div class="boxChild" @click="changeName">
        <div class="textChild">
          <div class="txt">昵称</div>
          <div class="imgBox">
            <span v-if="this.$route.query.nick_name!=''">{{this.$route.query.nick_name}}</span>
            <span v-if="this.$route.query.nick_name==''">暂无昵称</span>
            <img src="../../assets/image/right.png" alt class="arrow" />
          </div>
        </div>
      </div>
      <div class="boxChild">
        <div class="textChild">
          <div class="txt">账号</div>
          <div class="imgBox">{{this.$route.query.account}}</div>
        </div>
      </div>
      <div class="boxChild" @click="Qrcode">
        <div class="textChild">
          <div class="txt">二维码名片</div>
          <div class="imgBox">
            <img src="../../assets/image/Qrcode.png" alt class="informationImg2" />
            <img src="../../assets/image/right.png" alt class="arrow" />
          </div>
        </div>
      </div>
      <div class="boxChild" @click="moreInformation">
        <div class="textChild">
          <div class="txt">更多</div>
          <div class="imgBox">
            <img src="../../assets/image/right.png" alt class="arrow" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import PageHeaderChange from "../../components/common/PageHeaderChange";
import { ImagePreview } from "vant";
export default {
  name: "personalInformation",
  data() {
    return {
      headerInfo: "个人信息",
      mineImg: "",
      avatarUrl: ""
    };
  },
  components: {
    PageHeaderChange
  },
  created() {
    console.log(this.$route.query.img);
    this.avatarUrl = this.$route.query.img;
  },
  methods: {
    changeName() {
      if (this.$route.query.nick_name != "") {
        this.$router.push({
          path: "changeName",
          query: {
            nick_name: this.$route.query.nick_name
          }
        });
      }
    },
    Qrcode() {
      this.$router.push({
        path: "Qrcode",
        query: {
          img: this.$route.query.img,
          nick_name: this.$route.query.nick_name,
          sex: this.$route.query.sex
        }
      });
    },
    moreInformation() {
      this.$router.push({
        path: "moreInformation",
        query: {
          sex: this.$route.query.sex
        }
      });
    },
    // 修改头像
    uploadavatar() {
      this.$refs.fileinput.click(); //隐藏input，模拟点击图片事件
    },
    uploadfile(event) {
      var formData = new FormData();
      formData.append("file", event.target.files[0]); //键 值 文件名
      // 图片上传接口
      this.api.upload(formData).then(res => {
        if (res.code == 200) {
          this.avatarUrl = res.result.data.url;
          // this.commonality.toast("头像上传成功", this);
          // 修改头像接口
          let param = {};
          param.image_url = this.avatarUrl;
          this.api.updateUserInfo(param).then(res => {
            if (res.code == 200) {
              // console.log(res);
              this.$router.push({
                path: "mine"
              });
              this.commonality.toast("头像修改成功", this);
            }
          });
        }
      });
    }
  }
};
</script>
<style lang="less" scoped>
.BoxChild {
  width: 100%;
  margin: 0;
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
.informationImg1 {
  width: 70px;
  height: 70px;
  border-radius: 10px;
}
.informationImg2 {
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
.uploadinput {
  width: 0;
  height: 0;
  display: none;
}
</style>