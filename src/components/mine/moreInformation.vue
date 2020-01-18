<template>
  <div>
    <PageHeaderChange :headerInfo="headerInfo"></PageHeaderChange>
    <div class="BoxChild">
      <div class="boxChild" @click="show = true">
        <div class="textChild">
          <div>性别</div>
          <div class="imgBox">
            <span v-if="gender==0">保密</span>
            <span v-if="gender==1">男</span>
            <span v-if="gender==2">女</span>
            <img src="../../assets/image/right.png" alt class="arrow" />
          </div>
        </div>
      </div>
      <div class="boxChild" @click="editAddress">
        <div class="textChild">
          <div>地区</div>
          <div class="imgBox">
            <span v-for="(item,index) in editAddressList" :key="index">{{item.name}}&nbsp;</span>
            <img src="../../assets/image/right.png" alt class="arrow" />
          </div>
        </div>
      </div>
      <div class="boxChild">
        <div class="textChild">
          <div>个性签名</div>
          <div class="imgBox">
            <span>锁子舞覅瑞</span>
            <img src="../../assets/image/right.png" alt class="arrow" />
          </div>
        </div>
      </div>
    </div>
    <mt-actionsheet :actions="actions" v-model="show"></mt-actionsheet>
    <div class="addressBox" v-show="flag">
      <van-area
        :area-list="areaList"
        :columns-num="2"
        @confirm="onAddrConfirm"
        @cancel="shut"
      />
    </div>
  </div>
</template>
<script>
import PageHeaderChange from "../../components/common/PageHeaderChange";
import areaList from "../../assets/js/area";
export default {
  name: "moreInformation",
  data() {
    return {
      headerInfo: "更多信息",
      gender: 0,
      show: false,
      flag: false,
      areaList: null,
      editAddressList: [],
      actions: [
        {
          name: "保密",
          method: this.getsecret // 调用methods中的函数
        },
        {
          name: "男",
          method: this.getmale // 调用methods中的函数
        },
        {
          name: "女",
          method: this.getfemale // 调用methods中的函数
        }
      ]
    };
  },
  components: {
    PageHeaderChange
  },
  created() {
    this.gender = this.$route.query.sex;
    this.areaList = areaList; // 初始化选择器数据
  },
  methods: {
    getsecret() {
      this.gender = "保密";
      let param = {};
      param.sex = 0;
      this.api.updateUserInfo(param).then(res => {
        if (res.code == 200) {
          // console.log(res);
          this.$router.push({
            path: "mine"
          });
          this.commonality.toast("性别修改成功", this);
        }
      });
    },
    getmale() {
      this.gender = "男";
      let param = {};
      param.sex = 1;
      this.api.updateUserInfo(param).then(res => {
        if (res.code == 200) {
          // console.log(res);
          this.$router.push({
            path: "mine"
          });
          this.commonality.toast("性别修改成功", this);
        }
      });
    },
    getfemale() {
      this.gender = "女";
      let param = {};
      param.sex = 2;
      this.api.updateUserInfo(param).then(res => {
        if (res.code == 200) {
          // console.log(res);
          this.$router.push({
            path: "mine"
          });
          this.commonality.toast("性别修改成功", this);
        }
      });
    },
    // 编辑地址
    editAddress() {
      this.flag = true;
    },
    // 确定地址
    onAddrConfirm(e) {
      // console.log(e);
      this.editAddressList = e;
      this.flag = false;
    },
    // 取消编辑地址
    shut() {
      this.flag = false;
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
  font-size: 27px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.imgBox {
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #8c8888;
}
.arrow {
  width: 30px;
  height: 30px;
  margin-left: 10px;
}
.genderBox {
  width: 100%;
  position: fixed;
  bottom: 0;
}
.addressBox {
  width: 100%;
  position: fixed;
  bottom: 0;
}
</style>