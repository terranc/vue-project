import Vue from 'vue';
// initial state
const state = {
  isLogin: false,
  auth: {
    user: null,
    token: '',
    openId: '',
  },
};


// getters
const getters = {
  get() {
    return state.auth.user;
  },
};

// mutations
const mutations = {
  updateLoginToken(state, token) {
    state.isLogin = token !== '';
    state.auth.token = token || '';
    localStorage.setItem('token', token || '');
  },
  updateLoginOpenId(state, openId) {
    state.auth.openId = openId || '';
  },
  updateLoginUser(state, payload) {
    // let oldUser = JSON.parse(localStorage.getItem('user')) || {};
    // user = Object.assign(oldUser, user);
    if (payload.append) {
      let oldUser = JSON.parse(localStorage.getItem('user')) || {};
      state.auth.user = Object.assign(oldUser, payload.user);
    } else {
      state.auth.user = payload.user;
    }
    localStorage.setItem('user', JSON.stringify(payload.user));
    if (!(state.auth.user && state.auth.user.id)) {
      state.isLogin = false;
    }
  },
  logout(state) {
    Vue.http.delete(`session`);
    state.auth.user = null;
    state.isLogin = false;
  },
};

// actions
const actions = {
  getSessionUser({ state, commit }) {
    if (state.auth.token) {
      Vue.http.get(`getMember`).then(res => {
        if (res.data.code === 0) {
          commit('updateLoginUser', {
            user: res.data.data || {},
          });
        }
      });
    }
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};