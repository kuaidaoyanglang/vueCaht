<template>
  <div>
    <circleFriendsPageHeader :headerInfo="headerInfo" :bottonName="bottonName">
      <button @click="published">{{bottonName}}</button>
    </circleFriendsPageHeader>
    <div class="BOX">
      <div class="textBox">
        <textarea name id cols="30" rows="6" placeholder="这一刻的想法..." v-model="content"></textarea>
      </div>
      <div class="imgBox">
        <van-uploader
          v-model="fileList"
          :before-read="beforeRead"
          multiple
          deletable=false
          :max-count="num"
          preview-size="70px"
        />
      </div>
      <div class="setBOX">
        <div class="setBox1" @click="location">
          <img src="../../assets/image/location.png" alt />
          <div class="tipTit">
            <div v-if="locationName=='所在位置'">{{locationName}}</div>
            <div v-if="locationName!='所在位置'" style="color: rgb(79, 218, 129);">{{locationName}}</div>
            <div class="tipTitBox">
              <img src="../../assets/image/right.png" alt />
            </div>
          </div>
        </div>
        <div class="setBox" @click="show = true">
          <img src="../../assets/image/my.png" alt />
          <div class="tipTit">
            <div>谁可以看</div>
            <div class="tipTitBox">
              <img src="../../assets/image/right.png" alt />
              <div style="color:#818384;">{{tip}}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <mt-actionsheet :actions="actions" v-model="show"></mt-actionsheet>
    <div v-show="mapshow">
      <el-amap
        vid="amapDemo"
        :center="center"
        :zoom="zoom"
        :plugin="plugin"
        class="amap-demo"
        style="height: 200px; width: 100%;margin-top: 50px; z-index: -1;"
      ></el-amap>
    </div>
  </div>
</template>
<script>
import circleFriendsPageHeader from "../../components/common/circleFriendsPageHeader";

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
  name: "published",
  data() {
    let self = this;
    return {
      headerInfo: "",
      bottonName: "发表",
      fileList: [],
      content: "",
      tip: "公开",
      locationName: "所在位置",
      pictureList: [],
      show: false,
      mapshow: false,
      num: 6,
      actions: [
        {
          name: "公开",
          method: this.getmale // 调用methods中的函数
        },
        {
          name: "私密",
          method: this.getfemale // 调用methods中的函数
        }
      ],
      alertShow: false, // 是否显示弹窗
      alertText: "", // 弹窗内容
      userID: "", // 用户的会话信息
      isShow: false, // 显示打卡已成功
      addr: "", // 储存地址信息
      zoom: 16, // 位置大小
      center: [121.59996, 31.197646], // 中心点
      plugin: [
        {
          pName: "Geolocation",
          events: {
            init(o) {
              // o 是高德地图定位插件实例
              o.getCurrentPosition((status, result) => {
                // console.log(result.position.lng,result.position.lat);  //  能获取定位的所有信息
                if (result && result.position) {
                  console.log("当前位置");
                  console.log(result.position);
                  // 经纬度
                  self.lng = result.position.lng;
                  self.lat = result.position.lat;
                  // 地址信息
                  self.str = result.formattedAddress;
                  self.center = [self.lng, self.lat];
                  self.loaded = true;
                }
              });
            }
          }
        }
      ]
    };
  },
  components: {
    circleFriendsPageHeader
  },
  created() {
    console.log(localStorage.getItem("content"));
    if (localStorage.getItem("content") == null) {
      this.content = " ";
    } else {
      this.content = localStorage.getItem("content");
    }

    if (this.$route.query.name == undefined) {
      this.locationName = "所在位置";
    } else {
      this.locationName = this.$route.query.name;
    }
  },
  methods: {
    beforeRead(file) {
      console.log("长度");
      console.log(Object.keys(file).length);
      if (Object.keys(file).length >= 2) {
        var formData = new FormData();
        // 循环单个上传
        for (let key in file) {
          // console.log(file[key]);
          formData.append("file", file[key]); //键 值 文件名
          // 图片上传接口
          console.log(formData);
          this.api.upload(formData).then(res => {
            if (res.code == 200) {
              console.log(res.result.data);
              this.commonality.toast("头像上传成功", this);
              this.pictureList.push(res.result.data.path);
            }
          });
        }
      } else {
        var formData = new FormData();
        formData.append("file", file); //键 值 文件名
        // 图片上传接口
        console.log(formData);
        this.api.upload(formData).then(res => {
          if (res.code == 200) {
            console.log(res.result.data);
            this.commonality.toast("头像上传成功", this);
            this.pictureList.push(res.result.data.path);
          }
        });
      }

      console.log("图片数组");
      console.log(this.pictureList);
      // if (file.type !== "image/jpeg") {
      //   this.commonality.toast("请上传 jpg 格式图片", this);
      //   return false;
      // }
      return true;
    },
    getmale() {
      this.tip = "公开";
    },
    getfemale() {
      this.tip = "私密";
    },
    location() {
      localStorage.setItem("content", this.content);
      if (this.center[0] != 121.59996) {
        this.$router.push({
          path: "locationList",
          query: {
            center: this.center
          }
        });
      }
    },
    // 发表
    published() {
      let param = {};
      param.content = this.content;
      param.picture = this.pictureList;
      param.location_desc = this.$route.query.name;
      param.location_lat_lng = this.$route.query.coordinates;
      console.log(param);
      this.api.articlePush(param).then(res => {
        if (res.code == 200) {
          console.log(res);
          localStorage.removeItem("content");
          this.$router.push({
            path: "circleFriends"
          });
          this.commonality.toast("发布成功", this);
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
.textBox {
  width: 85%;
  margin: 20px auto;
}
.textBox textarea {
  width: 100%;
  border: none;
  caret-color: #3bca86;
  font-size: 27px;
}
.imgBox {
  width: 85%;
  margin: 10px auto;
  display: flex;
  justify-content: flex-start;
  flex-flow: wrap;
}
.setBOX {
  width: 85%;
  margin: 100px auto;
}
.setBox1 {
  width: 100%;
  border-top: 1px solid #dedede;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.setBox {
  width: 100%;
  border-top: 1px solid #dedede;
  border-bottom: 1px solid #dedede;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.tipTit {
  width: 92%;
  height: 80px;
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 28px;
}
.tipTitBox {
  width: 17%;
  display: flex;
  align-items: center;
  flex-direction: row-reverse;
}
.setBOX img {
  width: 35px;
  height: 35px;
}
</style>