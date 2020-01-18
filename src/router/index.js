import Vue from 'vue'
import Router from 'vue-router'
// 通讯录
import addressBook from './addressBook'
// 朋友圈
import circleFriends from './circleFriends'
// 我的
import mine from './mine'

Vue.use(Router)

const router = new Router({
  routes: [
    // 通讯录
    ...addressBook,
    // 朋友圈
    ...circleFriends,
    // 我的
    ...mine,
    // 登录
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/Login/login.vue')
    },
    // 注册
    {
      path: '/registered',
      name: 'registered',
      component: () => import('../views/Login/registered.vue')
    },
    // 忘记密码
    {
      path: '/forgotPassword',
      name: 'forgotPassword',
      component: () => import('../views/Login/forgotPassword.vue')
    },
    // 底部
    {
      path: '/navigationBar',
      name: 'navigationBar',
      component: () => import('../components/common/navigationBar.vue')
    },
    // 位置列表
    {
      path: '/locationList',
      name: 'locationList',
      component: () => import('../components/common/locationList.vue')
    },
    // 查看位置列表
    {
      path: '/seeLocationList',
      name: 'seeLocationList',
      component: () => import('../components/common/seeLocationList.vue')
    },
    // 首页
    {
      path: '/',
      name: 'index',
      component: () => import('../views/Index/index.vue')
    },
    // 暂无数据
    {
      path: '/temporarilyNoData',
      name: 'temporarilyNoData',
      component: () => import('../components/common/temporarilyNoData.vue')
    },
    // 邀请好友
    {
      path: '/selectContacts',
      name: 'selectContacts',
      component: () => import('../components/addressBooks/selectContacts.vue')
    },
    // 聊天
    {
      path: '/chatRoom',
      name: 'chatRoom',
      component: () => import('../views/chatRooms/chatRoom.vue')
    },
    // 聊天详情
    {
      path: '/chatMessages',
      name: 'chatMessages',
      component: () => import('../views/chatRooms/children/chatMessages.vue')
    },
    // 群二维码
    {
      path: '/groupQrcode',
      name: 'groupQrcode',
      component: () => import('../views/chatRooms/children/groupQrcode.vue')
    },
    // 聊天成员
    {
      path: '/membersChat',
      name: 'membersChat',
      component: () => import('../views/chatRooms/children/membersChat.vue')
    }
  ]
})


router.beforeEach((to, from, next) => {
  // console.log(to)
  // console.log(from)
  // console.log(next)
  if (to.path === '/forgotPassword' || to.path === '/login' || to.path === '/registered') {
    next()
  } else {
    let token = localStorage.getItem('token');
    if (token === null || token === '') {
      next({
        path: '/login'
      })
    } else {
      next()
    }
  }
});
export default router
