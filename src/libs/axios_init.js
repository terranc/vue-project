import Vue from 'vue';
import axios from 'axios';
import Qs from 'qs';
import store from 'src/store';

const config = require('config/config.json');
let getHeaders = form => {
  return new Promise((resolve, reject) => {
    form.getLength((err, length) => {
      if (err) reject(err);
      let headers = Object.assign({ 'Content-Length': length }, form.getHeaders());
      resolve(headers);
    });
  });
};
export default () => {
  axios.defaults.baseURL = config.xhr.base + config.xhr.path;
  axios.defaults.timeout = 10000;
  axios.defaults.withCredentials = false;
  // axios.defaults.responseType = 'json';
  // axios.defaults.headers['Accept'] = 'application/json, text/plain, */*';
  // axios.defaults.headers['content-type'] = 'multipart/form-data';
  let loadingTimer;
  axios.interceptors.request.use((config) => {
    if (config.method === 'post') {
      if (!config.data) {
        config.data = {};
      }
      config.data.token = store.state.user.auth.token;
      if (!(config.data instanceof Array) && config.data.toString() === '[object Object]') {
        let fd = {};
        for (var item in config.data) {
          fd[item] = (config.data[item] === 'true' || config.data[item] === 'false') ? Boolean(config.data[item]) : config.data[item];
        }
        config.data = fd;
      } else if (config.data.toString() === '[object FormData]') {
        let fd = {};
        config.data.forEach((val, key) => {
          if (key) {
            fd[key] = (val === 'true' || val === 'false') ? Boolean(val) : val;
          }
        });
        config.data = fd;
      }
      config.data = Qs.stringify(config.data);
      // 将提供了 form 参数的话将表单内 submit 按钮置为 loading 状态
      // store.commit('updateSubmitLoading', true);
      config.loadingTimer = setTimeout(() => {
        store.commit('updateLoadingStatus', {
          show: true,
          text: '提交中..',
        });
      }, 300);
      // config.loadingTimer = setTimeout(() => {
      //   store.commit('updateLoadingStatus', { show: true });
      // }, 300);
    } else if (config.method === 'get') {
      if (!config.params) {
        config.params = {};
      }
      config.params.token = store.state.user.auth.token;
      config.loadingTimer = setTimeout(() => {
        store.commit('updateLoadingStatus', { show: true });
      }, 300);
    }
    config.validateStatus = (status) => {
      return status >= 200 && status <= 502;
    };
    return config;
  }, function(error) {
    store.commit('updateLoadingStatus', { show: false });
    return Promise.reject(error);
  });

  axios.interceptors.response.use(res => {
    clearTimeout(res.config.loadingTimer);
    store.commit('updateLoadingStatus', { show: false });
    if (res.status < 200 || res.data >= 400) {
      if (res.config.method === 'get' && res.status === 404) {
        // alert('资源不存在！');
        // history.back();
        window.location.href = '/404';
      } else {
        Vue.$vux.toast.show({
          text: '网络异常',
          type: 'text',
          width: 'auto',
          time: 1000,
        });
      }
      return Promise.reject(res);
    };
    if (res.data.code === -9000) {
      Vue.$vux.alert.show({
        content: res.data.message,
        onHide() {
          Vue.router.push({ name: 'login' });
        },
      });
      return Promise.reject(res);
    }
    return res;
  }, (error) => {
    store.commit('updateLoadingStatus', { show: false });
    return Promise.reject(error);
  });
  return axios;
};