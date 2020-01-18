const circleFriends = [
  /**
   * 朋友圈页面
   */
  {
    path: '/found',
    name: 'found',
    component: () => import('../views/founds/found.vue')
  },
  //   朋友圈详情
  {
    path: '/circleFriends',
    name: 'circleFriends',
    component: () => import('../components/CircleFriend/circleFriends.vue')
  },
  //   发朋友圈
  {
    path: '/published',
    name: 'published',
    component: () => import('../components/CircleFriend/published.vue')
  }
];
export default circleFriends
