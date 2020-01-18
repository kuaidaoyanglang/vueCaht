/**
 *  加密规则:1、使用字典序排序对参数内容进行升序排序
 *           2、将排序后的内容转成由'&'链接的字符串
 *           3、通过MD5对字符串进行加密并转成大写以键名为sign添加进参数中
 *           4、对新的参数进行RSA加密
 *
 *  解密规则:1、将获取的参数转成base64的字符串
 */
import Commonality from '../js/Commonality'
import QS from "qs"
import MD5 from 'js-md5'
import JSEncrypt from "jsencrypt"

let decrypt = new JSEncrypt();
decrypt.setPublicKey(sessionStorage.getItem("key"));

/**
 *数据加密
 * @param param 需要加密的内容
 */
export function RSAencrypt1(param) {
  let ciphertext = "";
  // console.log("aaaaaaaaaaa")
  // console.log(Commonality.JsonSort(param));
  // console.log(QS.stringify(Commonality.JsonSort(param))); 
  // console.log(decodeURIComponent(QS.stringify(Commonality.JsonSort(param))));
  param.sign = MD5(decodeURIComponent(QS.stringify(Commonality.JsonSort(param)))).toUpperCase();

  let newParam = JSON.stringify(param);
  // console.log(newParam)
  // console.log(newParam.length)
  if (newParam.length > 117) {
    ciphertext = decrypt.encryptLong(newParam);
  } else {
    ciphertext = decrypt.encrypt(newParam);
  }
  // console.log(ciphertext)
  return {
    encrypt: ciphertext
  }
}

export function RSAencrypt2(param) {
  decrypt.setPublicKey(sessionStorage.getItem("key"));
  let ciphertext = "";
  // console.log("aaaaaaaaaaa")
  // console.log(Commonality.JsonSort(param));
  // console.log(QS.stringify(Commonality.JsonSort(param))); 
  // console.log(decodeURIComponent(QS.stringify(Commonality.JsonSort(param))));
  param.sign = MD5(decodeURIComponent(QS.stringify(Commonality.JsonSort(param)))).toUpperCase();

  let newParam = JSON.stringify(param);
  // console.log(newParam)
  // console.log(newParam.length)
  if (newParam.length > 117) {
    ciphertext = decrypt.encryptLong(newParam);
  } else {
    ciphertext = decrypt.encrypt(newParam);
  }
  // console.log(ciphertext)
  return {
    encrypt: ciphertext
  }
}

// base64解密
export function base64(res) {
  let Base64 = require("js-base64").Base64;
  let data = Base64.decode(res);
  return data
}



// 获取图片地址
export function setItem() {
  let image=localStorage.getItem('image')
  return image
}
