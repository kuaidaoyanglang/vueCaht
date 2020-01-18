<template>
  <div>
    <PageHeaderChange :headerInfo="headerInfo"></PageHeaderChange>
    <div class="Box" @click="logout">退出登录</div>
  </div>
</template>
<script>
import PageHeaderChange from "../../components/common/PageHeaderChange";
import { Dialog } from "vant";
export default {
  name: "setUp",
  data() {
    return {
      headerInfo: "设置"
    };
  },
  components: {
    PageHeaderChange
  },
  methods: {
    logout() {
      Dialog.confirm({
        title: "退出登录",
        message: ""
      })
        .then(() => {
          this.api.logout().then(res => {
            if (res.code == 200) {
              localStorage.removeItem("token");
              this.$router.push({
                path: "/login"
              });
              this.commonality.toast("成功退出", this);
            } else {
              this.commonality.toast(res.message, this);
            }
          });
        })
        .catch(() => {
          // on cancel
        });
    }
  }
};
</script>
<style lang="less" scoped>
.Box {
  width: 100%;
  height: 93px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  border-top: 1px solid #dedede;
  border-bottom: 1px solid #dedede;
  font-size: 28px;
  font-weight: 700;
}
</style>