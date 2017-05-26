import uuidMixin from 'libs/mixin-uuid';
import {
  // Grid, 
  // GridItem,
  Panel,
  Group,
  GroupTitle,
  CellBox,
  CellFormPreview,
  Cell,
  XButton
} from 'vux';

export default {
  install (vue) {
    vue.mixin({
      // mixins: [uuidMixin],
      components: {
        Panel,
        Group,
        GroupTitle,
        CellBox,
        CellFormPreview,
        Cell,
        XButton,
      },
      created() {
        if (this.headTitle !== undefined) {
          if (!this.$options.head) {
            this.$options.head = {
              title() {
                return {
                  complement: ' ',
                  separator: ' ',
                  inner: this.headTitle,
                };
              },
            };
          }
        }
        this.updateBodyClass();
      },
      watch: {
        headTitle(val, newVal) {
          if (val !== newVal) {
            this.$emit('updateHead');
          }
        },
      },
      methods: {
        updateBodyClass() {
          if (!this.defaultBodyClass) {
            this.defaultBodyClass = document.body.className;
          }
          if (this.bodyClass) {
            if (Object.prototype.toString.call(this.bodyClass) === '[object Array]') {
              this.bodyClass.forEach(function(e) {   
                document.body.classList.add(e);
              });
            } else {          
              document.body.classList.add(this.bodyClass);
            }
          }
        },
        removeBodyClass() {
          if (this.bodyClass) {
            document.body.className = this.defaultBodyClass;
          }
        },
        logout() {
          this.$store.commit('logout');
          localStorage.removeItem('user');
          localStorage.removeItem('token');
          this.$router.push('/');
        },
      },
      beforeRouteLeave(to, from, next) {
        this.removeBodyClass();
        next();
      },
    });
  },
};
