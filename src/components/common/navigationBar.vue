<template>
  <div class="box">
    <div class="tab">
      <router-link
        v-for="(item,index) in tabBarData"
        :to="item.path"
        tag="div"
        class="tabList"
        active-class="active"
        :key="index"
        exact
      >
        <div class="imgWrapper">
          <img class="imgAuto" :src="$route.path==item.path?item.iconActive:item.icon" alt />
        </div>
        <div class="text">{{item.title}}</div>
      </router-link>
    </div>
  </div>
</template>
<script>
/**
 * model:下面导航栏
 */
export default {
  name: "navigationBar",
  data() {
    return {
      thisIndex: 0,
      tabBarData: [
        {
          title: "微信",
          icon: require("../../assets/image/message.png"),
          iconActive: require("../../assets/image/act_message.png"),
          path: "/"
        },
        {
          title: "通讯录",
          icon: require("../../assets/image/addressBook.png"),
          iconActive: require("../../assets/image/act_addressBook.png"),
          path: "/addressBook"
        },
        {
          title: "发现",
          icon: require("../../assets/image/found.png"),
          iconActive: require("../../assets/image/act_found.png"),
          path: "/found"
        },
        {
          title: "我的",
          icon: require("../../assets/image/my.png"),
          iconActive: require("../../assets/image/act_my.png"),
          path: "/mine"
        }
      ]
    };
  }
};
</script>
<style lang="less" scoped>
.box {
  width: 100%;
  height: 96px;
  background-color: #fff;
  position: fixed;
  bottom: 0;
  left: 0;
}
.tab {
  width: 100%;
  height: 96px;
  background-color: #fff;
  display: flex;
  justify-content: space-between;
  border-top: 1px solid #dedede;
}

.tabList {
  width: 20%;
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

i {
  font-size: 20px;
}

.icon {
  font-size: 36px;
}

.imgWrapper {
  width: 40px;
  height: 40px;
  line-height: 40px;
  text-align: center;
}

.active .text {
  color: #1afa29;
}
.active  {
   box-shadow: 0px 0px 30px #d7f0e6 inset;
}
.text {
  color: #666666;
  font-size: 30px;
  margin-top: 12px;
}
.imgAuto {
  margin-top: 5px;
  width: 40px;
  height: 40px;
}
</style>
