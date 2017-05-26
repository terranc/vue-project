const ua = navigator.userAgent;

const isAndroid = /(Android);?[\s\\/]+([\d.]+)?/.test(ua);
const isIpad = /(iPad).*OS\s([\d_]+)/.test(ua);
const isIpod = /(iPod)(.*OS\s([\d_]+))?/.test(ua);
const isIphone = !isIpad && /(iPhone\sOS)\s([\d_]+)/.test(ua);
const isWechat = /micromessenger/i.test(ua);
const isDesktop = ! ('ontouchstart' in window);
const isTouch = 'ontouchstart' in window;


export default {
  install (vue) {
    // 打开登录框
    vue.prototype.$device = {
      isDesktop,
      isTouch,
      isAndroid,
      isIpad,
      isIpod,
      isIphone,
      isWechat,
    };
  },
};
