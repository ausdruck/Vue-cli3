import Vue from 'vue'
import App from './App.vue'
import router from './router';
import http from './modules/http.js'
import Mint from'mint-ui';
import VueScroller from "vue-scroller"
Vue.use(VueScroller);
Vue.use(Mint);
Vue.config.productionTip = false;
Vue.prototype.$http = http
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})

