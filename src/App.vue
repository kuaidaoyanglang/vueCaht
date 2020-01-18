<template>
  <div id="app">
    <transition :name="transitionName">
      <router-view class="view" v-if="isAlive"/>
    </transition>
  </div>
</template>

<script>
  import {creatWebsocket, oncloseWS} from "../src/assets/js/WebSocket";

  export default {
    name: "App",
    provide() {
      return {
        reload: this.reload
      };
    },
    data() {
      return {
        transitionName: "",
        isAlive: true
      };
    },
    watch: {
      $route(to, from) {
        let url = to.path;
        if (url !== "/registered" && url !== "/login") {
          setTimeout(() => {
            creatWebsocket();
          }, 2000);
        } else {
          oncloseWS();
        }
        // 切换动画
        let isBack = this.$router.isBack; // 监听路由变化时的状态为前进还是后退
        if (isBack) {
          this.transitionName = "slide-left";
        } else {
          this.transitionName = "slide-right";
        }
        this.$router.isBack = false;
      }
    },
    methods: {
      reload() {
        this.isAlive = false;
        this.$nextTick(function () {
          this.isAlive = true;
        });
      }
    }
  };
</script>

<style>
  #app {
    height: 100%;
    width: 100%;
    position: relative;
  }

  .view {
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 100%;
  }

  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.3s;
  }

  .fade-enter,
  .fade-leave-to {
    opacity: 0;
  }

  .slide-right-enter-active,
  .slide-right-leave-active,
  .slide-left-enter-active,
  .slide-left-leave-active {
    will-change: transform;
    transition: all 0.3s;
    position: absolute;
  }

  .slide-right-enter {
    opacity: 0;
    transform: translate3d(-100%, 0, 0);
  }

  .slide-right-leave-active {
    opacity: 0;
    transform: translate3d(100%, 0, 0);
  }

  .slide-left-enter {
    opacity: 0;
    transform: translate3d(100%, 0, 0);
  }

  .slide-left-leave-active {
    opacity: 0;
    transform: translate3d(-100%, 0, 0);
  }
</style>



