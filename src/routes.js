import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routerMap = [
  {
    path: '/',
    redirect: '/map'
  },
  {
    path: '/404',
    name: '404',
    component: (resolve) => {
      require(['./pages/errors/404'], resolve);
    },
  },
  {
    path: '/500',
    name: '500',
    component: (resolve) => {
      require(['./pages/errors/500'], resolve);
    },
  },
  {
    path: '/map',
    name: 'map',
    component: (resolve) => {
      require(['./pages/map'], resolve);
    },
  },
  {
    path: '*',
    redirect: '/404'
  },
];

const router = new VueRouter({
  base: '/',
  // mode: 'history',
  mode: 'hash',
  linkActiveClass: 'active', // 链接活跃时附带的class
  routes: routerMap,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return {
        x: 0,
        y: 0,
      };
    }
  },
});

export default router;