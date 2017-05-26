<template>
  <div ref="list">
    <slot></slot>
    <slot name="loadmore">
      <div class="load-more-wrapper" :class="moreClassName" v-show="this.listData.length > 0 && !loaded">
        <load-more :tip="moreText" :show-loading="loadingState" class="load-more" ref="loadMore" @click.native="onMoreClick"></load-more>
      </div>
    </slot>
  </div>
</template>

<style lang="less">
</style>

<script>
import uuidMixin from 'libs/mixin-uuid';
import { LoadMore } from 'vux';
// import store from 'src/store';

export default {
  name: 'lf-list',
  mixins: [uuidMixin],
  props: {
    uuid: {
      type: String,
      default: '',
    },
    // 是否缓存
    cache: {
      type: Boolean,
      default: false,
    },
    // 默认加载数据
    data: {
      type: Array,
      default() {
        return [];
      },
    },
    // 加载更多默认文案
    loadText: {
      type: String,
      default: '加载更多',
    },
    loadingText: {
      type: String,
      default: '正在加载中...',
    },
    // 是否滚动自动加载
    autoLoad: Boolean,
    // 距离底部多远开始加载 
    distance: {
      type: Number,
      default: 0,
    },
    // 滚动条外框，默认为window
    wrapper: {
      type: [String, Object],
      default: '',
    },
  },
  components: {
    LoadMore,
  },
  computed: {
    wrapperEl() {
      if (typeof this.wrapper === 'string') {
        if (this.wrapper) {
          return document.querySelector(this.wrapper);
        } else {
          return document;
        }
      } else {
        return this.wrapper;
      }
    },
  },
  data() {
    return {
      loaded: false,
      state: '',
      moreClassName: '',
      query: {},
      moreText: this.loadText,
      listData: [],
      loadingState: false,
      _uuid: '', 
    };
  },
  created() {
    if (!this.uuid) {
      this._uuid = this.$route.path;
    }
    this.$store.commit('listInit', this._uuid);
    // 重载组件数据
    this.$on('reload', (reset = true) => {
      if (reset) {
        this.reset();
      }
      this.onMoreClick();
    });
  },
  mounted() {
    // this.handleBindScroll();
    this.wrapperEl.addEventListener('scroll', (e) => {
      this.scrollTop = e.target.scrollTop || window.scrollY;
      if (this.autoLoad && this.state !== 'loading') {
        const totalTop = this.scrollTop + (e.target.clientHeight || document.documentElement.clientHeight);
        e.preventDefault();
        e.stopPropagation();
        if (totalTop >= (e.target.scrollHeight || document.documentElement.scrollHeight) - this.distance - 1) {
          this.onMoreClick();
        }
      }
    });
    this.onMoreClick();
    this.$nextTick(() => {
      this.removeCache();
    });
  },
  beforeDestroy() {
    this.setCache();
  },
  methods: {
    reset() {
      this.listData = [];
      this.query = {};
    },
    // handleBindScroll() {
    //   // TODO 滚动自动加载
    // },
    setCache() {
      if (this.cache) {
        this.$store.commit('listSetData', { uuid: this._uuid, data: this.listData });
        this.$store.commit('listSetQuery', { uuid: this._uuid, query: this.query });
      }
    },
    getDataCache() {
      return this.$store.state.common.components.list[this._uuid]['data'] || [];
    },
    getQueryCache() {
      if (this.$store.state.common.components.list[this._uuid]) {
        return this.$store.state.common.components.list[this._uuid]['query'] || {};
      } else {
        return {};
      }
    },
    removeCache() {
      // sessionStorage.removeItem(getDataCacheName(this._uuid));
      // sessionStorage.removeItem(getQueryCacheName(this._uuid));
      // Action.List.removeScrollTop(this._uuid);
      this.$store.commit('listRemoveData', this._uuid);
      this.$store.commit('listRemoveQuery', this._uuid);
    },
    // more
    onMoreClick() {
      this.state = 'loading';
      this.loadingState = true;
      this.$emit('getmore', {
        data: this.getDataCache(),
        query: this.getQueryCache(),
      }, (query, data, limit) => {
        this.loadingState = false;
        this.state = 'done';
        this.query = query || {};
        if (data === undefined) {
          this.listData = this.getDataCache();
        } else {
          this.listData = this.listData.concat(data || []);
        }
        const currentLength = this.listData.length % this.query[limit || 'pageSize'];
        this.loaded = this.listData.length === 0 || (currentLength !== 0 && currentLength < this.query[limit || 'pageSize']);
        return this.listData;
      });
    },
  },
  watch: {
    state(newVal) {
      if (newVal === 'loading') {
        this.moreText = this.loadingText;
        this.moreClassName = 'loading';
      } else {
        this.moreText = this.loadText;
        this.moreClassName = 'loaded';
      }
    },
  },
};
</script>

