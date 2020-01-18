<template>
  <div>
    <PageHeaderChange :headerInfo="headerInfo" :headerInfo1="headerInfo1">
      <img src="../../assets/image/point.png" class="tipBox" alt @click="chatMessages" />
    </PageHeaderChange>
    <div v-bind:class="[show3==true ? activeClass : errorClass]" @click="hidden" ref="container">
      <!-- right -->
      <div class="myBox">
        <div>
          <img src="../../assets/image/t1.jpg" alt class="headPortrait" />
        </div>
        <div class="messageRight">
          <div class="two">
            你好
            <span
              class="rong-emoji-content"
              name="[笑脸]"
              style="width: 24px; height: 24px; line-height: 24px; background-image: url(//cdn.ronghub.com/emojis-hd.png); 
              background-position: -72px 0px; background-size: auto 24px; overflow: hidden; vertical-align: middle; font-size: 0 !important;"
            ></span>
          </div>
          <div class="one"></div>
        </div>
      </div>
      <div class="myBox">
        <div>
          <img src="../../assets/image/t1.jpg" alt class="headPortrait" />
        </div>
        <div class="messageRight">
          <div class="two">
            <img src="../../assets/qun.jpg" alt preview="0" />
          </div>
          <div class="one"></div>
        </div>
      </div>
      <!-- left -->
      <div class="heBox">
        <div>
          <img src="../../assets/image/t2.jpg" alt class="headPortrait" />
        </div>
        <div class="messageLeft">
          <div class="one"></div>
          <div class="two">你好11</div>
        </div>
      </div>
      <div class="heBox">
        <div>
          <img src="../../assets/image/t2.jpg" alt class="headPortrait" />
        </div>
        <div class="messageLeft">
          <div class="one"></div>
          <div class="two">
            <img src="../../assets/bj.jpg" alt preview="0" />
          </div>
        </div>
      </div>
      <!--  -->
      <div class="myBox">
        <div>
          <img src="../../assets/image/t1.jpg" alt class="headPortrait" />
        </div>
        <div class="messageRight">
          <div class="two">
            <img src="../../assets/qun.jpg" alt preview="0" />
          </div>
          <div class="one"></div>
        </div>
      </div>
      <div class="heBox">
        <div>
          <img src="../../assets/image/t2.jpg" alt class="headPortrait" />
        </div>
        <div class="messageLeft">
          <div class="one"></div>
          <div class="two">
            <img src="../../assets/qun1.jpg" alt preview="0" />
          </div>
        </div>
      </div>
      <div class="heBox">
        <div>
          <img src="../../assets/image/t2.jpg" alt class="headPortrait" />
        </div>
        <div class="messageLeft">
          <div class="one"></div>
          <div class="two">
            <span
              class="rong-emoji-content"
              name="[笑脸]"
              style="width: 24px; height: 24px; line-height: 24px; background-image: url(//cdn.ronghub.com/emojis-hd.png); 
              background-position: -72px 0px; background-size: auto 24px; overflow: hidden; vertical-align: middle; font-size: 0 !important;"
            ></span>
            <span
              class="rong-emoji-content"
              name="[笑脸]"
              style="width: 24px; height: 24px; line-height: 24px; background-image: url(//cdn.ronghub.com/emojis-hd.png); 
              background-position: -72px 0px; background-size: auto 24px; overflow: hidden; vertical-align: middle; font-size: 0 !important;"
            ></span>被封为UI副本无if二位覅股本幅为规范q1111111111111111aaaaaaaaaaaaaaa
          </div>
        </div>
      </div>
      <div class="heBox">
        <div>
          <img src="../../assets/image/t2.jpg" alt class="headPortrait" />
        </div>
        <div class="messageLeft">
          <div class="one"></div>
          <div class="two">很高兴认识你！</div>
        </div>
      </div>
    </div>
    <div v-bind:class="[show4==true ? inputactiveClass : inputerrorClass]">
      <img src="../../assets/image/麦克风.png" alt v-if="inputShow" @click="inputShow=false" />
      <img src="../../assets/image/keyboard.png" alt v-if="!inputShow" @click="inputShow=true" />
      <div
        class="input"
        @input="inputMsg"
        @click="inputFocus"
        contenteditable="true"
        ref="input"
        v-if="inputShow"
      ></div>
      <div
        class="reBox"
        contenteditable="false"
        @touchstart="translationStart"
        @touchend="translationEnd"
        v-if="reshow&&!inputShow"
      >按住 说话</div>
      <div
        style="background:rgb(228, 238, 247);"
        class="reBox"
        contenteditable="false"
        @touchstart="translationStart"
        @touchend="translationEnd"
        v-if="!reshow&&!inputShow"
      >松开 结束</div>
      <img src="../../assets/image/expression.png" alt @click="accordingExpression" />
      <img v-if="show1" src="../../assets/image/add1.png" alt @click="according" />
      <button v-if="show2" @click="send">发送</button>
    </div>
    <div class="operationBox" v-if="show3">
      <div class="smallBox">
        <img src="../../assets/image/picture.png" alt />
        <p>图片</p>
      </div>
    </div>
    <div class="operationBox1" v-if="show4">
      <Emoji @emojiDomInfo="emojiDomInfo" :emojiList="emojiDomList" />
    </div>
  </div>
</template>
<script>
import PageHeaderChange from "../../components/common/PageHeaderChange";
import Emoji from "./children/Emoji";
import EmojiInit from "../../assets/js/emoji";
import Recorderx, { ENCODE_TYPE } from "recorderx";
export default {
  name: "chatRoom",
  data() {
    return {
      headerInfo: "",
      headerInfo1: "",
      inputVal: "",
      show1: true,
      show2: false,
      show3: false,
      show4: false,
      activeClass: "charBox",
      errorClass: "charBox1",
      inputactiveClass: "inputBox1",
      inputerrorClass: "inputBox",
      emojiDomList: "",
      emojiList: [],
      reshow: true,
      inputShow: true
    };
  },
  components: {
    PageHeaderChange,
    Emoji
  },
  created() {
    this.headerInfo = this.$route.query.name;
    if (this.$route.query.num != undefined) {
      this.headerInfo1 = "(" + this.$route.query.num + ")";
    }
  },
  mounted() {
    this.$nextTick(() => {
      let tablePar = this.$refs["container"];
      tablePar.scrollTop = tablePar.scrollHeight;
    });
    this.emojiDomList = EmojiInit().EmojiDom;
    this.emojiList = EmojiInit().EmojiList;
  },
  watch: {
    inputVal() {
      if (this.inputVal == "") {
        this.show1 = true;
        this.show2 = false;
      } else {
        this.show2 = true;
        this.show1 = false;
      }
    },
    show3() {
      if (this.show3 == true) {
        this.show4 = false;
      }
    },
    show4() {
      if (this.show4 == true) {
        this.show3 = false;
      }
    }
  },
  methods: {
    according() {
      if (this.show3 == true) {
        this.show3 = false;
      } else {
        this.show3 = true;
      }
      this.$nextTick(() => {
        let tablePar = this.$refs["container"];
        tablePar.scrollTop = tablePar.scrollHeight;
      });
    },
    hidden() {
      this.show3 = false;
      this.show4 = false;
    },
    accordingExpression() {
      if (this.show4 == true) {
        this.show4 = false;
      } else {
        this.show4 = true;
      }
      this.$nextTick(() => {
        let tablePar = this.$refs["container"];
        tablePar.scrollTop = tablePar.scrollHeight;
      });
    },
    emojiDomInfo(val) {
      //   console.log(val);
      $(this.$refs.input).append(val);
      this.inputVal += val;
    },
    inputMsg() {
      this.inputVal = this.$refs.input.innerHTML;
    },
    // 获取文本框焦点
    inputFocus() {
      this.$nextTick(() => {
        let tablePar = this.$refs["container"];
        tablePar.scrollTop = tablePar.scrollHeight;
      });
    },
    // 发送消息
    send() {
      console.log(this.inputVal);
    },
    // 聊天信息
    chatMessages() {
      this.$router.push({
        path: "chatMessages",
        query: {
          id: this.$route.query.id,
          group_notice: this.$route.query.group_notice,
          group_name: this.$route.query.group_name
        }
      });
    },
    //开始录音
    translationStart() {
      this.reshow = false;
      let that = this;
      that.rc = new Recorderx();
      that.$nextTick(() => {
        that.rc
          .start()
          .then(() => {
            console.log("开始录音");
          })
          .catch(error => {
            console.log("录音失败", error);
          });
      });
    },

    //录音结束
    translationEnd() {
      this.reshow = true;
      console.log("结束录音");
      this.rc.pause();
      var wav = this.rc.getRecord({
        encodeTo: ENCODE_TYPE.WAV
      });
      this.uplode(wav);
    },

    //生成随机数
    getMath() {
      return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    },

    //上传音频
    uplode(wav) {
      var formData = new window.FormData();
      var name = this.getMath() + this.getMath() + this.getMath() + ".wav";
      console.log(name);
      formData.append("file", wav, name); // 'file' 这个名字要和后台获取文件的名字一样;
      console.log(wav);
      console.log(formData);
    }
  }
};
</script>
<style lang="less" scoped>
.tipBox {
  margin-right: 30px;
}
.charBox {
  width: 100%;
  height: 56%;
  overflow: hidden;
  overflow-y: scroll;
  background: url("../../assets/bj.jpg");
  background-repeat: no-repeat;
  background-size: cover;
}

.charBox1 {
  width: 100%;
  height: 90%;
  overflow: hidden;
  overflow-y: scroll;
  background: url("../../assets/bj.jpg");
  background-repeat: no-repeat;
  background-size: cover;
}
.inputBox {
  width: 100%;
  height: 70px;
  padding: 9px 0;
  background-color: #f7f4f4;
  border-bottom: 1px solid #dedede;
  border-top: 1px solid #dedede;
  display: flex;
  justify-content: space-around;
  align-items: center;
  z-index: 1000;
}
.inputBox1 {
  width: 100%;
  height: 70px;
  padding: 10px 0;
  background-color: #f7f4f4;
  border-bottom: 1px solid #dedede;
  display: flex;
  justify-content: space-around;
  align-items: center;
  z-index: 1000;
}
.inputBox .input {
  width: 62%;
  height: 50px;
  line-height: 50px;
  outline: none;
  border: none;
  padding: 5px;
  border-radius: 2px;
  font-size: 28px;
  background-color: #fff;
  caret-color: #5feb89;
  overflow: scroll;
}
.inputBox img {
  width: 60px;
  height: 60px;
}
.inputBox1 .input {
  width: 73%;
  height: 50px;
  line-height: 50px;
  outline: none;
  border: none;
  padding: 5px;
  border-radius: 2px;
  font-size: 28px;
  background-color: #fff;
  caret-color: #5feb89;
  overflow: scroll;
}
.reBox {
  width: 63%;
  height: 60px;
  text-align: center;
  line-height: 60px;
  outline: none;
  border: none;
  color: #635f5f;
  border-radius: 2px;
  font-size: 28px;
  background-color: #fff;
  // 取消手机浏览器长按复制功能
  -webkit-touch-callout: none; /*系统默认菜单被禁用*/
  -webkit-user-select: none; /*webkit浏览器*/
  -khtml-user-select: none; /*早期浏览器*/
  -moz-user-select: none; /*火狐*/
  -ms-user-select: none; /*IE10*/
  user-select: none;
}
.inputBox1 img {
  width: 60px;
  height: 60px;
}
.operationBox {
  width: 690px;
  height: 20%;
  padding: 30px 30px;
  display: flex;
  justify-content: flex-start;
  overflow-x: scroll;
  flex-wrap: wrap;
  z-index: 1000;
}
.inputBox button {
  width: 100px;
  height: 50px;
  outline: none;
  border: none;
  border-radius: 10px;
  background-color: #23da40;
  color: #fff;
}
.inputBox1 button {
  width: 100px;
  height: 50px;
  outline: none;
  border: none;
  border-radius: 10px;
  background-color: #23da40;
  color: #fff;
}
.smallBox {
  width: 22%;
  height: 50%;
  margin: 10px 7px 15px 7px;
  text-align: center;
}
.smallBox img {
  width: 80px;
  height: 80px;
}
.smallBox p {
  padding: 0;
  margin: 0;
  color: #757272;
}
.operationBox1 {
  width: 100%;
  height: 50%;
  display: flex;
  justify-content: flex-start;
  overflow-x: scroll;
  z-index: 1000;
}
.emojiWrap {
  width: 100%;
  height: 80%;
}

.myBox {
  width: 95%;
  padding: 20px 20px 0 20px;
  display: flex;
  flex-direction: row-reverse;
  align-items: center;
  margin: 20px 0;
}
.headPortrait {
  width: 80px;
  height: 80px;
  border-radius: 10px;
}
.messageRight {
  width: 70%;
  max-height: 240px;
  /* border: 1px solid; */
  margin-right: 15px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  position: relative;
}
.messageRight .one {
  border-top: 17px solid transparent;
  border-left: 20px solid #30f87d;
  border-right: 10px solid transparent;
  border-bottom: 17px solid transparent;
}
.messageRight .two {
  max-width: 100%;
  word-wrap: break-word;
  word-break: break-all;
  padding: 8px;
  background-color: #30f87d;
  border-radius: 10px;
  font-size: 30px;
  margin-top: 0px;
  display: flex;
  justify-content: flex-start;
  flex-flow: wrap;
  align-items: center;
  margin-right: -6px;
}
.messageRight .two img {
  max-width: 250px;
}
.heBox {
  width: 95%;
  padding: 20px 20px 0 20px;
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 20px 0;
}
.messageLeft {
  width: 70%;
  // border: 1px solid;
  margin-right: 15px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  position: relative;
  left: 10px;
}
.messageLeft .one {
  border-top: 17px solid transparent;
  border-left: 10px solid transparent;
  border-right: 20px solid #fff;
  border-bottom: 17px solid transparent;
}
.messageLeft .two {
  max-width: 100%;
  word-wrap: break-word;
  word-break: break-all;
  padding: 8px;
  background-color: #fff;
  border-radius: 10px;
  font-size: 30px;
  margin-top: 0px;
  display: flex;
  justify-content: flex-start;
  flex-flow: wrap;
  align-items: center;
  margin-left: -5px;
}
.messageLeft .two img {
  max-width: 250px;
}
.input::-webkit-scrollbar {
  display: none;
}
</style>