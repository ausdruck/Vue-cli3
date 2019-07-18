<template>
  <div>
    <topheader :title="title" :first="first" :router="router" :img="topimg"></topheader>
      <scroller
          style="top: 55px;"
        >
    <div class="list" v-for="(mag,index) in listv" :key="index">
      <div class="listnav">{{mag.typeName}}</div>
    </div>
      </scroller>
  </div>
</template>
<script>
import topheader from "../components/topheader";
// import VueScroller from 'vue-scroller';
// require("vue-scroll");
import { getApiUrl, getJgUrl } from "../lib/apiUtil";
export default {
  data() {
    return {
      title: "keep-alive测试", //header显示名称
      first: false, //跳转方法
      topimg: true, //是否显示返回按钮
      router: "home", //跳转方法
      listv: [] //获取数据
    };
  },
  components: {
    topheader
  },
  filters: {
    flex(val) {
      return val.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,"); //千分位处理
    }
  },
  methods: {
    httpget() {
      this.$http
        .get({
          url: "jg-service/v3/jgapi/undefined/queryForceProcessOrder/",
          params: {
            userCode: 178806
          },
          address: true
        })
        .then(res => {
          console.log(res);
        });
    },
    httppost() {
      this.$http
        .post({
          url: "http://app.XXXXXXX.com/nbapp/api/v1/userRolesSyn",
          params: {
            userCode: "178806",
            segNo: "C001001"
          },
          address: false,
          load:false
        })
        .then(res => {
          this.listv = res.data;
          console.log(this.listv)
        });
    }
  },
  mounted() {
    // this.httpget()
    this.httppost();
  }
};
</script>
<style lang="scss" scoped>
.list {
  width: 100%;
  height: 200px;
  background: #eee;
  text-align: center;
}
.listnav {
  width: 100%;
  text-align: center;
  line-height: 200px;
}
</style>
