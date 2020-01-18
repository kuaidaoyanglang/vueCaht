import {get, post, put, update, deletes} from './http';

//获取公钥
const getPublicKey = async param => {
  return await post("/common/getPublicKey", param);
};

// 注册
const register = async param => {
  return await post("/auth/register", param);
};
// 登录
const login = async param => {
  return await post("/auth/login", param);
};
// 验证码
const sendCode = async param => {
  return await post("/common/sendCode", param);
};
// 忘记密码
const retrieve = async param => {
  return await post("/auth/retrieve", param);
};
// 我的详情
const getUserInfo = async param => {
  return await post("/user/info", param);
};
// 我的好友
const getFriend = async param => {
  return await post("/friend/list", param);
};
// 我的群组
const group = async param => {
  return await post("/group/list", param);
};
// 搜索用户
const search = async param => {
  return await post("/friend/search", param);
};
// 申请记录
const record = async param => {
  return await post("/apply/record", param);
};
// 好友申请
const create = async param => {
  return await post("/apply/create", param);
};
// 朋友圈
const article = async param => {
  return await post("/article/list", param);
};
// 好友资料
const friendInfo = async param => {
  return await post("/friend/info", param);
};
// 审核申请
const review = async param => {
  return await post("/apply/review", param);
};
// 退出登录
const logout = async param => {
  return await post("/auth/logout", param);
};
// 删除好友
const removeBuddy = async param => {
  return await post("/friend/delete", param);
};
// 创建群组
const buildingGroup = async param => {
  return await post("/group/create", param);
};
// 创建房间
const roomCreate = async param => {
  return await post("/room/create", param);
};
// 更新个人资料
const updateUserInfo = async param => {
  return await post("/user/updateUserInfo", param);
};
// 上传文件
const upload = async param => {
  return await post("/common/upload", param);
};
// 获取所有群成员
const memberList = async param => {
  return await post("/group/memberList", param);
};
// 发布说说
const articlePush = async param => {

  return await post("/article/push", param);

};
// 评论说说
const comment = async param => {
  return await post("/article/comment", param);
};


export default {
  getPublicKey,
  register,
  login,
  sendCode,
  retrieve,
  getUserInfo,
  getFriend,
  group,
  search,
  record,
  create,
  article,
  friendInfo,
  review,
  logout,
  removeBuddy,
  buildingGroup,
  roomCreate,
  updateUserInfo,
  upload,
  memberList,
  articlePush,
  comment

}
