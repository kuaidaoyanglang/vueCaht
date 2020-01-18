// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import 'vant/lib/index.css';
import './assets/js/emoji.js'
import commonality from './assets/js/Commonality.js'
import Swiper from 'swiper'
import 'swiper/css/swiper.min.css';
import {
  Picker,
  Toast,
  Uploader,
  Checkbox,
  Dialog,
  CheckboxGroup,
  Cell,
  CellGroup,
  Switch,
  Area,
  Popup,
  Loading,
  icon,
  PullRefresh
} from 'vant';
import Mint from 'mint-ui';
import 'mint-ui/lib/style.css'
Vue.use(Mint);
import 'lib-flexible'
import store from './store'
import api from '../src/assets/js/api'
import md5 from 'js-md5';
Vue.prototype.$md5 = md5;
Vue.prototype.api = api;
import AMap from 'vue-amap';
Vue.use(AMap);
import preview from 'vue-photo-preview'
import 'vue-photo-preview/dist/skin.css'
Vue.use(preview)

Vue.use(Uploader).use(Checkbox).use(Dialog).use(CheckboxGroup).use(Cell).use(CellGroup).use(Switch).use(Area).use(Popup).use(Loading).use(icon).use(PullRefresh);


Vue.prototype.Swiper = Swiper;
Vue.prototype.commonality = commonality;
Vue.config.productionTip = false;
let emoji = require("emoji");
Vue.prototype.replaceImgSrc = (msg) => {
  let img = /^img:::/;
  if (img.test(msg)) {
    return `<img class="imgAuto" src="${msg.replace(/img:::/, 'http://')}">`
  } else {
    return emoji.unifiedToHTML(msg);
  }
};

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {
    App,
    store
  },
  template: '<App/>'
})
