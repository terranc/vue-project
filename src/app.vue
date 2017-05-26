<template>
  <div class="container" id="app">
    <div class="main">
      <router-view></router-view>
    </div>
    <x-footer v-bind:style="toggleFooter"></x-footer>
  </div>
</template>

<script>
import { Loading } from 'vux';
import xFooter from 'components/footer';

export default {
  name: 'app',
  components: {
    Loading,
    xFooter,
  },
  computed: {
    toggleHeader() {
      if (this.$route.meta['hideHeader'] === true) {
        return { display: 'none' };
      }
    },
    toggleFooter() {
      if (this.$route.meta['hideFooter'] === true) {
        return { display: 'none' };
      }
    },
  },
};
</script>


<style lang="less">
@import '~css/style.less';
</style>