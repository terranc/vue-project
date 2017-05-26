import Vue from 'vue';
import config from 'config/config.json';
// initial state
const state = {
  isGlobalLoading: false,
  isSubmitLoading: false,
  settings: {},
  components: {
    list: {},
  },
};


// getters
const getters = {};

// mutations
const mutations = {
  updateSubmitLoading(state, flag) {
    state.isSubmitLoading = flag;
  }, 
  updateLoadingStatus(state, payload) {
    payload.show ? Vue.$vux.loading.show(Object.assign({
      text: '加载中..',
    }, payload.params)) : Vue.$vux.loading.hide();
  },
  listSetData(state, { uuid, data }) {
    state.components.list[uuid]['data'] = data;
  },
  listRemoveData(state, uuid) {
    state.components.list[uuid]['data'] = [];
  },
  listSetQuery(state, { uuid, query }) {
    state.components.list[uuid]['query'] = query;
  },
  listRemoveQuery(state, uuid) {
    if (state.components.list[uuid]['query']) {
      delete state.components.list[uuid]['query'];
    }
  },
  listInit(state, uuid) {
    if (state.components.list[uuid] === undefined) {
      state.components.list[uuid] = {};
    }
  },
  setSettings(state, data) {
    state.settings = data;
  },
};

// actions
const actions = {
  getAppSettings({ commit }) {
    Vue.http.get('settings').then(res => {
      commit('setSettings', res.data);
    });
  },
  getWXConfig({ commit, state }, payload) {
    Vue.http.get('wx/pay/getSign', {
      baseURL: config.xhr.base,
      params: {
        url: window.location.origin,
      },
    }).then(res => {
      let data = res.data.data;
      if (res.data.code === 0) {
        Vue.wechat.config({
          debug: window.debug,
          appId: data.appid,
          timestamp: data.timestamp,
          nonceStr: data.noncestr,
          signature: data.signature,
          jsApiList: payload.jsApiList || [],
        });
      } else {
        Vue.$vux.toast.show({
          text: res.data.message,
          type: 'warn',
        });
      }
    });
    Vue.wechat.error(res => {
      // alert();
      // console.log(res);
    });
    return Vue.wechat;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};