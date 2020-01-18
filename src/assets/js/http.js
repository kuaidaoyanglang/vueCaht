import axios from 'axios'
import router from '../../router'

// axios 配置
axios.defaults.timeout = 5000; //设置超时时间
axios.defaults.baseURL = 'http://192.168.0.175:8500/api';


// http request 拦截器（所有发送的请求都要从这儿过一次），通过这个，我们就可以把token传到后台，我这里是使用sessionStorage来存储token等，若要使用cookie可以自己封装一个函数并import便可使用
axios.interceptors.request.use(
  config => {
    // console.log(localStorage.getItem('token'))
    // config.headers['Content-Type'] = 'application/x-www-form-urlencoded';
    if (localStorage.getItem('account')) {
      config.headers.Authorization = localStorage.getItem('account'); //携带权限参数
    }
    return config;
  },
  err => {
    return Promise.reject(err);
  }
);


axios.interceptors.response.use(
  response => {
    console.log("状态码");
    console.log(response.data);
    return response.data;
  }, error => {
    console.log("异常" + error);
    if (error.response.status === 401) {
      router.replace({
        path: '/login' // 到登录页重新获取token
      })
    }
  }
);

export default axios;


/**
 * get方法，对应get请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export function get(url, params) {
  return new Promise((resolve, reject) => {
    axios.get(url, {
      params: params
    }).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}


/**
 * post方法，对应post请求
 * @param {String} url [请求的url地址]
 * @param {Object} param [请求时携带的参数]
 */
export function post(url, param) {
  return new Promise((resolve, reject) => {
    axios.post(url, param)
      .then(res => {
        resolve(res)
      })
      .catch(err => {
        reject(err)
      })
  })
}

/**
 * 封装put请求
 * @param url
 * @param data
 * @returns {Promise}
 */
export function put(url, data = {}) {
  return new Promise((resolve, reject) => {
    axios.put(url, data)
      .then(response => {
        resolve(response.data)
      }, err => {
        reject(err)
      })
  })
}


/**
 * 封装update请求
 * @param url
 * @param data
 * @returns {Promise}
 */
export function update(url, data = {}) {
  return new Promise((resolve, reject) => {
    axios.post(url, data)
      .then(response => {
        resolve(response.data)
      }, err => {
        reject(err)
      })
  })
}


/**
 * 封装 delete请求
 * @param url
 * @param data
 * @returns {Promise}
 */
export function deletes(url, data = {}) {
  return new Promise((resolve, reject) => {
    axios.delete(url, data)
      .then(response => {
        resolve(response.data)
      }, err => {
        reject(err)
      })
  })
}
