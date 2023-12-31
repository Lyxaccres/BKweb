import axios from 'axios';
import {getStorage} from './localStotage'


const TIMEOUT = 10000;
//http://fetch.bozhan.top/home
const service = axios.create({
  baseURL: "http://localhost:5204",
  //baseURL: "http://fetch.bozhan.top",
  timeout: TIMEOUT
});

/**
 * http request 拦截器
 */
service.interceptors.request.use(
  (config) => {
    config.data = JSON.stringify(config.data);
    // config.headers.Authorization = `Bearer ${localStorage.getItem("BK_Token")}`
    config.headers = {
      "Content-Type": "application/json",
      "Authorization":`Bearer ${getStorage("BK_User").token}`
      // "cjwdblzs":localStorage.getItem("BK_Token")
    };
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

/**
 * http response 拦截器
 */
service.interceptors.response.use(
  (response) => {
    if (response.data.errCode === 401) {
      console.log("过期");
    }
    return response;
  },
  (error) => {
    if(error.request.status==401){
      console.log("请求出错401：", error);

      window.location.href = "/Login";
    }
    else{
      console.log("请求出错：", error);
    }
    // console.log("请求出错401：", error);
  }
);

/**
 * 封装get方法
 * @param url  请求url
 * @param params  请求参数
 * @returns {Promise}
 */
export function get(url, params = {}) {
  return new Promise((resolve, reject) => {

    service.get(url, {
      params: params,
    }).then((response) => {
      landing(url, params, response);
      resolve(response);
    })
      .catch((error) => {
        reject(error);
      });
  });
}

/**
 * 封装post请求
 * @param url
 * @param data
 * @returns {Promise}
 */
export function post(url, data) {
  return new Promise((resolve, reject) => {
    service.post(url, data).then(
      (response) => {
        //关闭进度条
        resolve(response);
      },
      (err) => {
        reject(err);
      }
    );
  });
}

/**
 * 封装patch请求
 * @param url
 * @param data
 * @returns {Promise}
 */
export function patch(url, data = {}) {
  return new Promise((resolve, reject) => {
    service.patch(url, data).then(
      (response) => {
        resolve(response);
      },
      (err) => {
        msag(err);
        reject(err);
      }
    );
  });
}

/**
 * 封装put请求
 * @param url
 * @param data
 * @returns {Promise}
 */
export function put(url, data = {}) {
  return new Promise((resolve, reject) => {
    service.put(url, data).then(
      (response) => {
        resolve(response);
      },
      (err) => {
        msag(err);
        reject(err);
      }
    );
  });
}

//统一接口处理，返回数据
export default function (fecth, url, param={}) {
  let _data = "";
  return new Promise((resolve, reject) => {
    switch (fecth) {
      case "get":
        // console.log("begin a get request,and url:", url);
        get(url, param)
          .then(function (response) {
            resolve(response);
          })
          .catch(function (error) {
            // console.log("get request GET failed.", error);
            reject(error);
          });
        break;
      case "post":
        post(url, param)
          .then(function (response) {
            resolve(response);
          })
          .catch(function (error) {
            // console.log("get request POST failed.", error);
            reject(error);
          });
        break;
      default:
        break;
    }
  });
}

//失败提示
function msag(err) {
  if (err && err.response) {
    switch (err.response.status) {
      case 400:
        alert(err.response.data.error.details);
        break;
      case 401:
        alert("未授权，请登录");
        break;

      case 403:
        alert("拒绝访问");
        break;

      case 404:
        alert("请求地址出错");
        break;

      case 408:
        alert("请求超时");
        break;

      case 500:
        alert("服务器内部错误");
        break;

      case 501:
        alert("服务未实现");
        break;

      case 502:
        alert("网关错误");
        break;

      case 503:
        alert("服务不可用");
        break;

      case 504:
        alert("网关超时");
        break;

      case 505:
        alert("HTTP版本不受支持");
        break;
      default:
    }
  }
}

/**
* 查看返回的数据
* @param url
* @param params
* @param data
*/
function landing(url, params, data) {
  // if (data.code === -1) {
  // }
}
