/* eslint import/first: 0 */
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';


// tools
import domFormSerializer from 'dom-form-serializer';
import VueHead from 'vue-head';
import VueLazyload from 'vue-lazyload';


// plugins 
import Init from 'plugins/init';
import Device from 'plugins/device';
import Test from 'plugins/test';
import {
  WechatPlugin,
  AlertPlugin,
  ConfirmPlugin,
  LoadingPlugin,
  ToastPlugin
} from 'vux';


// filters
import getUploadUrl from 'filters/get_upload_url';
import friendlyTime from 'filters/friendly_time';
import formatTime from 'filters/format_time';
import toCurrency from 'filters/to_currency';
import { getUrl, go } from 'filters/router';
import join from 'filters/join';


// libs
import store from 'src/store';

// init
import router from './routes';
import axiosInit from 'libs/axios_init';
import App from './app';

if (process.env.NODE_ENV === 'development') {
  window.VueDev = Vue;
  window.debug = true;
  Vue.config.devtools = true;
}
// window.debug = false;

Vue.use(VueHead, {
  separator: '',
  complement: ''
});
Vue.use(VueLazyload, {
  preLoad: 1.3,
  error: 'data:img/jpg;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABAQMAAAAl21bKAAAAA1BMVEXy8vJkA4prAAAACklEQVQI12NgAAAAAgAB4iG8MwAAAABJRU5ErkJggg==',
  loading: '',
  attempt: 1,
});

Vue.use(Init); // 组件初始化
Vue.use(Device); // 设备检测工具
Vue.use(Test);
Vue.use(WechatPlugin); // this.$wechat 可以直接访问 wx 对象。
Vue.use(AlertPlugin); // this.$vux.alert.show({}); this.$vux.alert.hide();
Vue.use(ConfirmPlugin); // this.$vux.confirm.show({}); this.$vux.confirm.hide();
Vue.use(ToastPlugin); // this.$vux.toast.show({}); this.$vux.toast.hide();
Vue.use(LoadingPlugin); // this.$vux.loading.show({}); this.$vux.loading.hide();

Vue.filter('getUploadUrl', getUploadUrl);
Vue.filter('friendlyTime', friendlyTime);
Vue.filter('formatTime', formatTime);
Vue.filter('toCurrency', toCurrency);
Vue.filter('go', go);
Vue.filter('getUrl', getUrl);
Vue.filter('join', join);

const config = require('config/config.json');


import FastClick from 'fastclick';
if (Vue.prototype.$device.isTouch) {
  FastClick.attach(document.body);
}

// window.axios = axiosInit();
Vue.prototype.$http = Vue.http = axiosInit(); // 方便 Vue.http 访问
Vue.prototype.$serialize = domFormSerializer.serialize; // 定义快捷方法 this.$serialize()
Vue.prototype.$config = config;
Vue.router = router; // 方便 Vue.router 访问

store.commit('updateLoginToken', localStorage.getItem('token') || '');
store.commit('updateLoginUser', { user: JSON.parse(localStorage.getItem('user')) || {} });

let loadingTimer;
const loadingShow = (store) => {
  loadingTimer = setTimeout(() => {
    store.commit('updateLoadingStatus', { show: true });
    router.routerTimer = setTimeout(() => {
      store.commit('updateLoadingStatus', { show: false });
      Vue.$vux.toast.show({
        time: 2000,
        text: '请求超时',
        type: 'text',
        width: 'auto',
      });
    }, 15000);
  }, 1000);
};

router.beforeEach(async function(to, from, next) {
  // 授权验证
  // if (to.meta.auth && !store.state.user.auth.openId && store.state.user.isLogin && !window.debug) {
  if (to.meta.auth && !store.state.user.auth.openId && store.state.user.isLogin) {
    await Vue.http.get(`wx/pay/getOpenId`, {
      baseURL: config.xhr.base,
    }).then(res => {
      if (res.data.code !== 0) {
        window.location.href = `${config.xhr.base}/wx/pay/getOauth2Url/${store.state.user.auth.user.id}?from_url=${to.fullPath.substring(1)}`;
        return false;
      } else {
        store.commit('updateLoginOpenId', res.data.data.openId);
      }
    });
  }
  if (to.matched.some(record => record.meta.auth)) {
    if (store.state.user.isLogin) {
      // store.dispatch('getSessionUser');
      loadingShow(store);
      next();
    } else {
      sessionStorage.setItem('referer', to.path);
      Vue.$vux.alert.show({
        content: '请先登录',
        onHide() {
          next({
            name: 'login',
            query: to.query,
          });
        },
      });
    }
  } else {
    loadingShow(store);
    next();
  }
});

router.afterEach(function(to, from) {
  clearTimeout(loadingTimer);
  clearTimeout(router.routerTimer);
  // setTimeout(() => {
  store.commit('updateLoadingStatus', { show: false });
  // }, 200);
});

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
});