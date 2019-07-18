<template>
  <div>
    <topheader :title="selected" :first="first" :router="router" :img="topimg"></topheader>
    <div class="page-wrap">
      <!-- <div class="page-title">Tabbar</div> -->
      <div>
        <!-- <mt-cell class="page-part" title="当前选中" :value="selected" /> -->
      </div>

      <!-- tabcontainer -->
      <mt-tab-container class="page-tabbar-container" v-model="selected">
        <mt-tab-container-item id="首页">
          <div class="homebox">
            <mt-button type="danger" class="homebu" size="small" @click="getback">路由</mt-button>
          </div>
        </mt-tab-container-item>
        <mt-tab-container-item id="发现">2</mt-tab-container-item>
        <mt-tab-container-item id="我的">3</mt-tab-container-item>
      </mt-tab-container>
    </div>

    <mt-tabbar v-model="selected" fixed class="tab">
      <mt-tab-item id="首页">首页</mt-tab-item>
      <mt-tab-item id="发现">发现</mt-tab-item>
      <mt-tab-item id="我的">我的</mt-tab-item>
    </mt-tabbar>
  </div>
</template>
<script>
import topheader from "../components/topheader";
export default {
  data() {
    return {
      first: false, //跳转方法
      topimg: false, //是否显示返回按钮
      router: "home", //跳转方法,
      selected: "首页"
    };
  },
  components: {
    topheader
  },
  filters: {
    //过滤器
    flex(val) {
      return val.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,"); //千分位处理
    }
  },
  methods: {
    getback() {
      //   this.$router.push({
      //     name: ``,
      //     params: {
      //       purAgreementNo: e
      //     }
      //   });
      this.$router.push({ name: `keepAlive` });
    }
  },
  mounted() {

  }
};
</script>
<style lang="scss" scoped>
.nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 1rem;
  button {
    width: 2rem;
    height: 1rem;
    background: #333;
    color: #fff;
    border-radius: 0.1rem;
    margin-left: 0.5rem;
    margin-right: 0.5rem;
  }
}
.mint-tablabel-item- {
  font-size: 16px;
}
.homebu {
  margin-top: 100px;
  width: 100px;
  height: 50px;
}
.homebox {
  width: 100%;
  display: flex;
  justify-content: center;
}
</style>
