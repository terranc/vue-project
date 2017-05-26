<template>
  <div>
    <x-input v-if="labelText" :title="labelText" :name="mobileName" type="tel" show-clear v-model="mobileModel" is-type="china-mobile" :disabled="disabled" :readonly="readonly"></x-input>
    <x-input title="验证码" :show-clear="false" placeholder="请输入..." type="tel" class="weui-vcode" :name="verifyName">
      <x-button slot="right" type="primary" action-type="button" mini @click.native="getCode" v-if="!interval">{{ verifyText }}</x-button>
      <x-button slot="right" type="default" action-type="button" mini v-if="interval" disabled>{{ timeCountText }}</x-button>
    </x-input>
  </div>
</template>

<script>
import { XInput } from 'vux';
export default {
  name: 'lf-sms-code',
  components: {
    XInput,
  },
  // 标题名称，默认：手机号码
  props: {
    labelText: {
      type: String,
      default: '手机号码',
    },
    // 间隔时间（秒）
    time: {
      type: Number,
      default: 60,
    },
    // 验证码表单name
    verifyName: {
      type: String,
      default: 'code',
    },
    // 手机号码表单name
    mobileName: {
      type: String,
      default: 'phone',
    },
    // 发送中文案
    loadingText: {
      type: String,
      default: '发送中...',
    },
    // 发送验证码文案
    verifyText: {
      type: String,
      default: '发送验证码',
    },
    // 手机号码是否只读
    readonly: {
      type: Boolean,
      default: false,
    },
    // 手机号码
    mobile: {
      type: String,
      default: '',
    },
    type: [Number, String],
    disabled: Boolean,
  },
  data () {
    return {
      clickable: true,
      timeCount: this.time,
      interval: false,
      mobileModel: this.mobile,
    };
  },
  watch: {
    mobile(val) {
      this.mobileModel = val;
    },
  },
  computed: {
    timeCountText() {
      return this.timeCount === this.time ? this.loadingText : (this.timeCount + 's');
    }
  },
  methods: {
    getCode(e) {
      if (!this.mobileModel) {
        this.$vux.toast.text('请填写手机号');
      }
      if (this.mobileModel && !e.target['timer']) {
        this.$http.get(`code`, {
          params: { 
            phone: this.mobileModel, 
            type: this.type,
          }
        }).then(res => {
          if (res.data.code !== 0) {
            this.$vux.alert.show(res.data.message);
          } else {
            this.$vux.toast.text(res.data.message);
            // this.$vux.alert.show('测试验证码：' + res.data.data);
            this.interval = true;
            e.target.timer = setInterval(() => {
              this.timeCount --;
              if (this.timeCount === 0) {
                this.interval = false;
                clearInterval(e.target.timer);
                e.target.timer = null;
                this.timeCount = this.time;
              }
            }, 1000);
          }
        });
      }
    },
  },
};
</script>

<style lang="less" scoped>
@import '~css/config.less';
</style>
