export default {
  install (vue) {
    vue.mixin({
      computed: {
        test() {
          if (window.debug) {
            return {
              swiper: [{
                url: 'javascript:',
                img: 'https://static.vux.li/demo/1.jpg',
                title: '“反”斗森林 – 猜猜動物聲探險之旅',
              }, {
                url: 'javascript:',
                img: 'https://static.vux.li/demo/2.jpg',
                title: '時代廣場任何商戶購買任何鞋...',
              }, {
                url: 'javascript:',
                img: 'https://static.vux.li/demo/3.jpg',
                title: '文青春日選好物過好生活',
              }],
              list: [{
                id: 1,
                url: 'javascript:',
                src: 'https://static.vux.li/demo/1.jpg',
                title: '“反”斗森林 – 猜猜動物聲探險之旅',
                desc: '“反”斗森林 – 猜猜動物聲探，猜猜動物聲探險之旅',
                time: '2017-04-11 18:07',
              }, {
                id: 2,
                url: 'javascript:',
                src: 'https://static.vux.li/demo/2.jpg',
                title: '時代廣場任何商戶購買任何鞋...',
                desc: '時代廣場任何商戶購買任何鞋，時代廣場任何商戶購買任何鞋...',
                time: '2017-04-11 18:07',
              }, {
                id: 3,
                url: 'javascript:',
                src: 'https://static.vux.li/demo/3.jpg',
                title: '文青春日選好物過好生活',
                desc: '文青春日選好物過，文青春日選好物過好生活',
                time: '2017-04-11 18:07',
              }, {
                id: 4,
                url: 'javascript:',
                src: 'https://static.vux.li/demo/1.jpg',
                title: '“反”斗森林 – 猜猜動物聲探險之旅',
                desc: '“反”斗森林 – 猜猜動物聲探，猜猜動物聲探險之旅',
                time: '2017-04-11 18:07',
              }, {
                id: 5,
                url: 'javascript:',
                src: 'https://static.vux.li/demo/2.jpg',
                title: '時代廣場任何商戶購買任何鞋...',
                desc: '時代廣場任何商戶購買任何鞋，時代廣場任何商戶購買任何鞋...',
                time: '2017-04-11 18:07',
              }, {
                id: 6,
                url: 'javascript:',
                src: 'https://static.vux.li/demo/3.jpg',
                title: '文青春日選好物過好生活',
                desc: '文青春日選好物過，文青春日選好物過好生活',
                time: '2017-04-11 18:07',
              }, {
                id: 7,
                url: 'javascript:',
                src: 'https://static.vux.li/demo/1.jpg',
                title: '“反”斗森林 – 猜猜動物聲探險之旅',
                desc: '“反”斗森林 – 猜猜動物聲探，猜猜動物聲探險之旅',
                time: '2017-04-11 18:07',
              }, {
                id: 8,
                url: 'javascript:',
                src: 'https://static.vux.li/demo/2.jpg',
                title: '時代廣場任何商戶購買任何鞋...',
                desc: '時代廣場任何商戶購買任何鞋，時代廣場任何商戶購買任何鞋...',
                time: '2017-04-11 18:07',
              }, {
                id: 9,
                url: 'javascript:',
                src: 'https://static.vux.li/demo/3.jpg',
                title: '文青春日選好物過好生活',
                desc: '文青春日選好物過，文青春日選好物過好生活',
                time: '2017-04-11 18:07',
              }, {
                id: 10,
                url: 'javascript:',
                src: 'https://static.vux.li/demo/1.jpg',
                title: '“反”斗森林 – 猜猜動物聲探險之旅',
                desc: '“反”斗森林 – 猜猜動物聲探，猜猜動物聲探險之旅',
                time: '2017-04-11 18:07',
              }, {
                id: 11,
                url: 'javascript:',
                src: 'https://static.vux.li/demo/2.jpg',
                title: '時代廣場任何商戶購買任何鞋...',
                desc: '時代廣場任何商戶購買任何鞋，時代廣場任何商戶購買任何鞋...',
                time: '2017-04-11 18:07',
              }, {
                id: 12,
                url: 'javascript:',
                img: 'https://static.vux.li/demo/3.jpg',
                title: '文青春日選好物過好生活',
                desc: '文青春日選好物過，文青春日選好物過好生活',
                time: '2017-04-11 18:07',
              }],
            };
          } else {
            return {};
          }
        }
      },
    });
  },
};