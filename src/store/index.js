import Vue from "vue";
import Vuex from "vuex";

// 审核好友
import addFriendsValidation from "./Modules/addFriendsValidation.js";

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    addFriendsValidation
  }
});
export default store;
