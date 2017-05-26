import Vue from 'vue';
import Vuex from 'vuex';
import modules from './modules';

// Vue.use(Vuex);

const store = new Vuex.Store({
  strict: process.env.NODE_ENV === 'development',
  modules: modules,
});


if (module.hot) {
  // 使 actions 和 mutations 成为可热重载模块
  module.hot.accept(['./modules'], () => {
    // 获取更新后的模块
    // 因为 babel 6 的模块编译格式问题，这里需要加上 .default
    // const newMutations = require('./mutations').default;
    // const newActions = require('./actions').default;
    // 成新的 mutation 和 mudule
    store.hotUpdate({
      modules,
      // modules,
    });
  });
}

export default store;