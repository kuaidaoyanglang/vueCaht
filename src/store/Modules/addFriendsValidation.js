import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);
const state = { //要设置的全局访问的state对象
  changdata: {}
  //要设置的初始属性值
};
const getters = { //实时监听state值的变化(最新状态)

};
const mutations = {
  pushCollects(state, data) { //如何变化changdata,插入data
    state.changdata = data;
  }
};
const actions = {
  getMineBaseApi({
    commit
  }) {
    alert('进入action');
  }
}
const store = new Vuex.Store({
  state,
  getters,
  mutations,
  actions
});
export default store;
