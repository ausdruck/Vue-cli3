<template>
  <div id="app">
      <transition :name="transitionName">
      <router-view class="position-div"></router-view>
    </transition>
    <!-- <button class="buttonbox" @click="alertClick()">导航页</button>    -->
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue';
import { getUserinfo } from "./lib/publicFunction";
import { getApiUrl,getJgUrl } from "./lib/apiUtil";
import http from "./lib/httpUtil";
export default {
  name: 'app',
  components: {
    HelloWorld
  },
  data() {
    return {
        transitionName: '',
        boot: ''
    }
  },
     watch: {//使用watch 监听$router的变化
    $route(to, from) {
      //如果to索引大于from索引,判断为前进状态,反之则为后退状态
      if(to.meta.index > from.meta.index){
	    //设置动画名称
        this.transitionName = 'slide-left';
      }else{
        this.transitionName = '';
        this.transitionName = 'slide-right';
      }
    }
  },
  methods:{
       http() {
      const self = this;
      const param = {};
      getUserinfo().then(succData => {
        this.userCode = succData.userCode;
        param.userCode = succData.userCode;
        http
          .newSend({
            url: getApiUrl(`/v3/jgapi/havedone/queryForceProcessOrder/`),
            // url: "http://localhost:3000/admin/GET/can",
            method: "get",
            query: param,
            encode: false
          })
          .then(
            res => {
              console.log(res);
            },
            err => {

            }
          );
      });
    },
  },
  mounted(){
    
  }
}
</script>

<style>
.aui{
    animation-delay:.1s;
}
.slide-right-enter-active,
.slide-right-leave-active,
.slide-left-enter-active,
.slide-left-leave-active {
  will-change: transform;
  transition: all 250ms;
  position: absolute;
  left: 0;
  right: 0;
}
.slide-right-enter {
  opacity: 0;
  transform: translate3d(-100%, 0, 0);
}    
.slide-right-leave-active {
  opacity: 0;
  transform: translate3d(100%, 0, 0);
}
.slide-left-enter {
  opacity: 0;
  transform: translate3d(100%, 0, 0);
}
.slide-left-leave-active {
  opacity: 0;
  transform: translate3d(-100%, 0, 0);
}
.buttonbox{
  width: 100px;
  height: 30px;
  background: #00a9ff;
  color: #fff;
  position: absolute;
  bottom: 10%;
  right: 10%;
  border-radius: 20px;
  z-index: 20;
}
.position-div{
   position:absolute;
   left:0;
   right:0;
   top:0;
   bottom:0;
}
</style>
