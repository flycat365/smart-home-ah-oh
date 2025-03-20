import axios from 'axios';
import Vue from "vue";
import store from '../vuex/store';

import {
  Message,
} from 'element-ui';
let windowUrl = window.location.origin;
let apiBaseUrl = process.env.VUE_APP_API_BASE_PATH;
if(process.env.NODE_ENV === "production"){
  apiBaseUrl=windowUrl+apiBaseUrl;
}

axios.interceptors.request.use(config => {
  const token=Vue.prototype.oauth2.getToken();
  if (token) {
    config.headers.token = token;
  }
  return config
}, error => {
  return Promise.reject(error)
})
axios.interceptors.response.use(res=>{
    return res
  },
  err => {
    let msg="";
    if(!err.response){
      msg='未知错误'
    }else{
      if(err.response.status == 401){
        msg="登录失效，请重新登录系统";
        setTimeout(()=>{
          Vue.prototype.oauth2.toLogin();
        },1000);
      }else if(err.response.status == 403){
        msg="无该操作权限，请联系管理员";
      }else{
        msg = '请求失败,错误码:' + err.response.status+",信息:"+(err.response.data&&err.response.data.message?err.response.data.message:"")
      }
    }
    Message({
      message: msg,
      type: 'error'
    });
    store.commit("endLoading");
    return Promise.reject(err);
  }
);

const req = (method, url, params) => {
  store.commit("startLoading");
  return new Promise((resolve, reject) => {
    axios({
        method: method,
        url: apiBaseUrl + url,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        data: params,
        traditional: true,
        transformRequest: [
          function(data) {
            let ret = ''
            for (let it in data) {
              ret +=
                encodeURIComponent(it) +
                '=' +
                encodeURIComponent(data[it]) +
                '&'
            }
            return ret
          }
        ]
      }).then(res => {
        store.commit("endLoading");
        resolve(res.data);
      })
      .catch(err => {
        store.commit("endLoading");
        reject(err)
      })
  });
};

const json = (method, url, params) => {
  return new Promise((resolve, reject) => {
    axios({
        method: method,
        url: apiBaseUrl + url,
        headers: {
          'Content-Type': 'application/json'
        },
        data: params,
        traditional: true,
      }).then(res => {
        resolve(res.data);
      })
      .catch(err => {
        reject(err)
      })
  });
};

export {
  req,
  json
}
