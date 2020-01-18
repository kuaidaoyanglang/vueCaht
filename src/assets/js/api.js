import {
  get,
  post,
  put,
  update,
  deletes
} from './http';
import {
  RSAencrypt1
} from "../js/encrypt";

//获取公钥
const getPublicKey = async param => {
  const res = await post("/common/getPublicKey", param);
  return res.data
};

// 注册
const register = async param => {
  // param=RSAencrypt1(param);
  const res = await post("/auth/register", param);
  return res.data
};
// 登录
const login = async param => {
  // param=RSAencrypt1(param);
  const res = await post("/auth/login", param);
  return res.data
};
// 验证码
const sendCode = async param => {
  // param=RSAencrypt1(param);
  const res = await post("/common/sendCode", param);
  return res.data
};
// 忘记密码
const retrieve = async param => {
  // param=RSAencrypt1(param);
  const res = await post("/auth/retrieve", param);
  return res.data
};
// 我的详情
const getUserInfo = async param => {
  // param=RSAencrypt1(param);
  const res = await post("/user/info", param);
  return res.data
};
// 我的好友
const getFriend = async param => {
  // param=RSAencrypt1(param);
  const res = await post("/friend/list", param);
  return res.data
};
// 我的群组
const group = async param => {
  // param=RSAencrypt1(param);
  const res = await post("/group/list", param);
  return res.data
};
// 搜索用户
const search = async param => {
  // param=RSAencrypt1(param);
  const res = await post("/friend/search", param);
  return res.data
};
// 申请记录
const record = async param => {
  // param=RSAencrypt1(param);
  const res = await post("/apply/record", param);
  return res.data
};
// 好友申请
const create = async param => {
  // param=RSAencrypt1(param);
  const res = await post("/apply/create", param);
  return res.data
};
// 朋友圈
const article = async param => {
  // param=RSAencrypt1(param);
  const res = await post("/article/list", param);
  return res.data
};
// 好友资料
const friendInfo = async param => {
  // param=RSAencrypt1(param);
  const res = await post("/friend/info", param);
  return res.data
};
// 审核申请
const review = async param => {
  // param=RSAencrypt1(param);
  const res = await post("/apply/review", param);
  return res.data
};
// 退出登录
const logout = async param => {
  // param=RSAencrypt1(param);
  const res = await post("/auth/logout", param);
  return res.data
};
// 删除好友
const removeBuddy = async param => {
  // param=RSAencrypt1(param);
  const res = await post("/friend/delete", param);
  return res.data
};
// 创建群组
const buildingGroup = async param => {
  // param=RSAencrypt1(param);
  const res = await post("/group/create", param);
  return res.data
};
// 创建房间
const roomCreate = async param => {
  // param=RSAencrypt1(param);
  const res = await post("/room/create", param);
  return res.data
};
// 更新个人资料
const updateUserInfo = async param => {
  // param=RSAencrypt1(param);
  const res = await post("/user/updateUserInfo", param);
  return res.data
};
// 上传文件
const upload = async param => {
  // param=RSAencrypt1(param);
  const res = await post("/common/upload", param);
  return res.data
};
// 获取所有群成员
const memberList = async param => {
  // param=RSAencrypt1(param);
  const res = await post("/group/memberList", param);
  return res.data
};
// 发布说说
const articlePush = async param => {
  // param=RSAencrypt1(param);
  const res = await post("/article/push", param);
  return res.data
};
// 评论说说
const comment = async param => {
  // param=RSAencrypt1(param);
  const res = await post("/article/comment", param);
  return res.data
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
