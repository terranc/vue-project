<template>
  <div id="error-404">
    <div class="inner">
      <h1>500</h1>
      <h3>系统开小差了~</h3>
      <h4>Internal Server Error</h4>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      headTitle: '页面不存在',
    };
  },
};
</script>

<style lang="less">
@import '~css/config.less';
#error-500 {
  text-align: center;
  height: 100vh;
  background-color: rgba(250,251,252, 1);
  .inner {
    .vertical-align;
  }
}

</style>