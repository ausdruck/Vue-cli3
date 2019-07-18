<template>
  <div>
    <header class="public-top">
      <div class="public-icon" @click="goBack">
        <img src="../../public/img/back.png" class="public-left" v-if="img" />
      </div>
      <div class="public-title" v-text="title">{{title}}</div>
    </header>
  </div>
</template>
<script>
export default {
  name: "topheader",
  props: {
    title: {
      type: String //
    },
    router: {
      type: String //跳转路由
    },
    first: {
      type: Boolean //跳转方法
    },
    img: {
      type: Boolean //跳转方法
    }
  },
  data: function() {
    return {
      count: 0
    };
  },
  methods: {
    counta() {
      console.log("点击事件");
    },
    goBack() {
      if (this.first == true) {
        console.log("原生方法");
        JQAPI.close();
      } else {
        console.log("路由跳转");
        this.$router.push({
          name: this.router
        });
      }
    }
  }
};
</script>
<style scoped>
.public-top {
  position: relative;
  width: 100%;
  height: 0.88rem;
  line-height: 0.88rem;
  /* padding: 0 .3rem; */
  background: #25b8f2;
  text-align: center;
}
.public-icon {
  position: absolute;
  z-index: 2;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 0.88rem;
}
.public-left {
  margin-left: 0.3rem;
  width: 0.36rem;
  height: 0.36rem;
}
.public-title {
  position: absolute;
  top: 0;
  width: 100%;
  color: #fff;
}
</style>
