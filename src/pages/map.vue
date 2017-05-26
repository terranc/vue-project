<template>
  <div>
    <h1><span>Hello World!</span></h1>
    <group>
      <cell title="404" :link="{ name: '404' }" is-link></cell>
      <cell title="500" :link="{ name: '500' }" is-link></cell>
    </group>
  </div>
</template>

<script>
import { Group, Cell } from 'vux';
export default {
  name: 'index',
  components: {
    Group,
    Cell,
  },
};
</script>

<style lang="less">
@import '~css/config.less';
h1 {
  .flexbox;
  .flexbox-vertical;
  min-height: 300px;

  span {
    .flexbox-center;
  }
}
</style>
