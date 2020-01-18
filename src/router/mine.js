const mine = [
  /**
   * 我的页面
   */
  {
    path: '/mine',
    name: 'mine',
    component: () => import('../views/mines/mine.vue')
  },
  //   个人信息
  {
    path: '/personalInformation',
    name: 'personalInformation',
    component: () => import('../components/mine/personalInformation.vue')
  },
  //   设置
  {
    path: '/setUp',
    name: 'setUp',
    component: () => import('../components/common/setUp.vue')
  },
  //   更改名字
  {
    path: '/changeName',
    name: 'changeName',
    component: () => import('../components/mine/changeName.vue')
  },
  //   二维码
  {
    path: '/Qrcode',
    name: 'Qrcode',
    component: () => import('../components/mine/Qrcode.vue')
  },
  //   更多
  {
    path: '/moreInformation',
    name: 'moreInformation',
    component: () => import('../components/mine/moreInformation.vue')
  }
];
export default mine
