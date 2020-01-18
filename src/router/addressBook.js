const addressBook = [
  /**
   * 通讯录页面
   */
  {
    path: '/addressBook',
    name: 'addressBook',
    component: () => import('../views/addressBooks/addressBook.vue')
  },
  //   新朋友
  {
    path: '/newFriend',
    name: 'newFriend',
    component: () => import('../components/common/newFriend.vue')
  },
  //   群聊
  {
    path: '/groupChat',
    name: 'groupChat',
    component: () => import('../components/addressBooks/groupChat.vue')
  },
  //   群列表
  {
    path: '/selectGroupChat',
    name: 'selectGroupChat',
    component: () => import('../components/addressBooks/selectGroupChat.vue')
  },
  //   黑名单列表
  {
    path: '/blacklist',
    name: 'blacklist',
    component: () => import('../components/addressBooks/blacklist.vue')
  },
  //   好友详情
  {
    path: '/newFriendsDetails',
    name: 'newFriendsDetails',
    component: () => import('../components/common/newFriendsDetails.vue')
  },
  // 搜索好友
  {
    path: '/search',
    name: 'search',
    component: () => import('../components/common/search.vue')
  },
  // 添加好友
  {
    path: '/addFriend',
    name: 'addFriend',
    component: () => import('../components/common/addFriend.vue')
  },
  // 好友验证
  {
    path: '/friendsValidation',
    name: 'friendsValidation',
    component: () => import('../components/common/friendsValidation.vue')
  }
];
export default addressBook
