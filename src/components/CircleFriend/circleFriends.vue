<template>
  <div>
    <PageHeaderChange :headerInfo="headerInfo">
      <img src="../../assets/image/camera.png" alt class="addBox" @click="published" />
    </PageHeaderChange>
    <div class="BOX">
      <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
        <div class="Box">
          <img :src="circleFriendsBackground" alt />
        </div>
        <div class="textBox">
          <img :src="image_url" alt preview="0" />
          <div>{{nick_name}}</div>
        </div>
        <div v-if="number!=0">
          <div class="contentBox" v-for="(item,index) in contentList" :key="index">
            <!-- 发说说人头像 -->
            <div class="contentLeft">
              <img :src="item.image_url" alt />
            </div>
            <!-- 昵称，内容 ，图片-->
            <div class="contentRight">
              <div class="tit">{{item.nick_name}}</div>
              <div class="article">{{item.content}}</div>
              <div class="imgBox">
                <div class="imgbox" v-for="certain in item.picture" :key="certain.index">
                  <img :src="'http://192.168.0.106:9501/upload'+certain" alt preview="0" />
                </div>
              </div>
              <div
                style="color:#143b77;font-size:10px;margin-top:6px;"
                @click="seeAddress(item)"
              >{{item.location}}</div>
              <div class="commentsBox">
                <img src="../../assets/image/comments.png" alt @click="openComments(item,index)" />
                <!-- 点赞 -->
                <img src="../../assets/image/likes.png" alt @click="giveLike(item,index)" />
                <!-- 取消点赞 -->
                <!-- <img
                src="../../assets/image/like.png"
                alt
                @click="deleteLike(item)"
                />-->
              </div>
              <!-- 点赞人昵称 -->
              <div class="areaBox" v-if="item.comment_list.length!=0">
                <div class="giveLikeBox">
                  <img src="../../assets/image/like.png" alt />
                  <span
                    class="name"
                    v-for="(certain,index) in item.likeList"
                    :key="index"
                  >{{certain}}&nbsp;</span>
                </div>
                <!-- 评论列表 -->
                <div class="commentBox">
                  <div v-for="(aa,index) in item.commentList" :key="index">
                    <span class="name">{{aa.name}}</span>：
                    <span>{{aa.text}}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <temporarilyNoData :text="text" v-if="number==0"></temporarilyNoData>
      </van-pull-refresh>
    </div>
    <van-popup
      v-model="show"
      position="bottom"
      :style="{ height: '55px',background: '#efebeb'}"
      :overlay-style="{background: 'rgba(249, 248, 248, 0)'}"
      :round="false"
    >
      <div class="inputBox">
        <input type="text" class="input" v-model="value" />
        <button class="button" @click="send">发送</button>
      </div>
    </van-popup>
  </div>
</template>
<script>
import PageHeaderChange from "../../components/common/circleFriendsPageHeaderIndex";
import temporarilyNoData from "../../components/common/temporarilyNoData";
import myScroll from "../common/LoadMore";
import AMap from "vue-amap";
// 初始化vue-amap
AMap.initAMapApiLoader({
  // 高德key
  key: "66caabaf636432c2fd737ef171df3d0b",
  // 插件集合 （插件按需引入）
  plugin: [
    "AMap.Autocomplete",
    "AMap.PlaceSearch",
    "AMap.Scale",
    "AMap.OverView",
    "AMap.ToolBar",
    "AMap.MapType",
    "AMap.Geolocation",
    "AMap.Geocoder",
    "AMap.AMapManager",
    "AMap.Marker"
  ],
  v: "1.4.4"
});
export default {
  name: "circleFriends",
  inject: ["reload"],
  data() {
    return {
      headerInfo: "朋友圈",
      text: "暂无说说",
      circleFriendsBackground: require("../../assets/bj1.jpg"),
      image_url: "",
      index: "",
      nick_name: "",
      value: "",
      fcm_id: "",
      show: false,
      isLoading: false,
      number: "",
      contentList: [
        // {
        //   headPortrait: require("../../assets/image/t1.jpg"),
        //   name: "张三",
        //   conten:
        //     "当你能力越大，你所碰到的问题就越小;反之，当你能力越不足，一个小问题都可能被你当成大问题。你有多大的能力，就能够处理多大的问题，你能处理问题的强度取决于你能力的高度。",
        //   imagelist: [],
        //   address: "北京市",
        //   commentList: [
        //     {
        //       name: "方文尔",
        //       text: "很高兴认识你"
        //     }
        //   ],
        //   likeList: [],
        //   show: true
        // }
        // ,
        // {
        //   headPortrait: require("../../assets/image/t2.jpg"),
        //   name: "李四",
        //   conten:
        //     "人生中最美好的那些年，是你接受自己的问题都是自己造成的时候。你不会迁怒母亲、责难环境、怪罪总统，因为你知道你有能力掌握自己的命运。",
        //   imagelist: [
        //     {
        //       img: require("../../assets/qun1.jpg")
        //     },
        //     {
        //       img: require("../../assets/qun1.jpg")
        //     },
        //     {
        //       img: require("../../assets/qun1.jpg")
        //     },
        //     {
        //       img: require("../../assets/qun1.jpg")
        //     }
        //   ],
        //   address: "",
        //   commentList: [
        //     {
        //       name: "闯江湖",
        //       text: "很高兴认识你"
        //     }
        //   ],
        //   likeList: [],
        //   show: true
        // },
        // {
        //   headPortrait: require("../../assets/image/t1.jpg"),
        //   name: "张三",
        //   conten:
        //     "当你能力越大，你所碰到的问题就越小;反之，当你能力越不足，一个小问题都可能被你当成大问题。你有多大的能力，就能够处理多大的问题，你能处理问题的强度取决于你能力的高度。",
        //   imagelist: [
        //     {
        //       img: require("../../assets/qun.jpg")
        //     }
        //   ],
        //   address: "西安市",
        //   commentList: [
        //     {
        //       name: "IE王嘉尔UI",
        //       text: "很高兴认识你"
        //     }
        //   ],
        //   likeList: [],
        //   show: true
        // }
      ]
    };
  },
  components: {
    PageHeaderChange,
    temporarilyNoData,
    myScroll
  },
  created() {
    this.api.getUserInfo().then(res => {
      if (res.code == 200) {
        this.image_url = res.result.data.image_url;
        this.nick_name = res.result.data.nick_name;
      }
    });
    this.getList();
  },
  methods: {
    // 列表
    getList() {
      // 朋友圈列表
      let param = {};
      param.page = 1;
      param.size = 3;
      this.api.article(param).then(res => {
        if (res.code == 200) {
          console.log("朋友圈数据");
          console.log(res.result.data);
          this.contentList = res.result.data;
          this.number = res.result.data.length;
        }
      });
    },
    // 下拉刷新
    onRefresh() {
      setTimeout(() => {
        this.commonality.toast("刷新成功", this);
        this.reload();//刷新
        this.isLoading = false;
      }, 500);
    },
    // 发说说
    published() {
      this.$router.push({
        path: "published"
      });
    },
    // 点赞
    giveLike(item, index) {
      // item.show = false;
      // item.likeList.push(this.nick_name);
    },
    // 取消点赞
    deleteLike(item) {
      for (var i = 0; i < item.likeList.length; i++) {
        if (item.likeList[i] == this.nick_name) {
          item.likeList.splice(i, 1);
          item.show = true;
        }
      }
    },
    // 评论
    openComments(item, index) {
      this.show = true;
      this.index = index;
      this.fcm_id = item.fcm_id;
    },
    // 发送评论
    send() {
      let param = {};
      param.fcm_id = this.fcm_id;
      param.type = 2;
      param.content = this.value;
      this.api.article(param).then(res => {
        if (res.code == 200) {
          console.log("发送评论");
          console.log(res.result);
          this.show = false;
          this.value = "";
        }
      });
      // if (this.value != "") {
      //   // console.log(this.index);
      //   for (var i = 0; i < this.contentList.length; i++) {
      //     if (this.index == i) {
      //       // console.log(this.contentList[i].commentList);
      //       this.contentList[i].commentList.push({
      //         name: this.nick_name,
      //         text: this.value
      //       });
      //       // console.log(this.contentList[i].commentList);
      //     }
      //   }
      //   this.show = false;
      //   this.value = "";
      // }
    },
    // 查看地址
    seeAddress(item) {
      let center = [];
      center[0] = item.lat_lng[0];
      center[1] = item.lat_lng[1];
      console.log(center);
      this.$router.push({
        path: "seeLocationList",
        query: {
          center: center
        }
      });
    }
  }
};
</script>
<style lang="less" scoped>
.BOX {
  width: 100%;
  height: 100%;
  background-color: #fff;
  overflow-y: scroll;
}

.addBox {
  margin-right: 30px;
}
.Box {
  width: 100%;
  height: 350px;
}
.Box img {
  width: 100%;
  height: 100%;
}
.textBox {
  width: 90%;
  display: flex;
  justify-content: flex-start;
  flex-direction: row-reverse;
  align-items: center;
  font-size: 28px;
  font-weight: 500;
  color: #fff;
  position: relative;
  top: -70px;
}
.textBox img {
  width: 100px;
  height: 100px;
  margin-left: 15px;
  border-radius: 10px;
}
.contentBox {
  width: 95%;
  margin: 15px auto;
  border-bottom: 1px solid #dedede;
  display: flex;
  justify-content: flex-start;
}
.contentLeft {
  width: 15%;
}
.contentLeft img {
  width: 80px;
  height: 80px;
  border-radius: 10px;
}
.contentRight {
  width: 85%;
}
.contentRight .tit {
  font-size: 30px;
  font-weight: 700;
  color: #143b77;
  margin-bottom: 10px;
}
.contentRight .article {
  width: 100%;
  font-size: 29px;
}
.imgBox {
  width: 95%;
  margin: 5px auto;
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
}
.imgbox {
  width: 32%;
  margin: 0 5px 0 0;
}
.imgBox img {
  width: 100%;
}
.commentsBox {
  width: 95%;
  text-align: right;
  padding: 10px;
  display: flex;
  flex-direction: row-reverse;
  align-items: center;
}
.commentsBox img {
  width: 50px;
  margin-left: 30px;
}
.areaBox {
  width: 95%;
  background-color: #f1f3f5;
  margin-bottom: 10px;
}
.areaBox img {
  width: 40px;
}
.name {
  font-size: 26px;
  font-weight: 700;
  color: #150975;
}
.giveLikeBox {
  padding: 15px;
  border-bottom: 1px solid #dedede;
  display: flex;
  align-items: center;
}
.commentBox {
  padding: 15px;
}
.inputBox {
  width: 100%;
  height: 110px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.inputBox .input {
  width: 75%;
  height: 60px;
  line-height: 60px;
  padding: 0 3px;
  outline: none;
  border: none;
  margin: 0 3%;
  border-radius: 10px;
  font-size: 28px;
}
.inputBox .button {
  width: 15%;
  height: 60px;
  line-height: 60px;
  outline: none;
  border: none;
  color: #fff;
  background-color: rgb(10, 180, 47);
  border-radius: 10px;
  font-size: 28px;
}
</style>