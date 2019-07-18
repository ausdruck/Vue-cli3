import Vue from 'vue'
import Router from 'vue-router'

const home =r=>require.ensure([], () => r(require('@/views/home.vue')), 'group-home');
const keepAlive =r=>require.ensure([], () => r(require('@/views/keep-alive.vue')), 'group-home');
Vue.use(Router)
const router = new Router({
  routes: [
    { path: '/', redirect: '/home' },
    { path: '/home', name: 'home', component: home, meta: { index: 0 }, },
    { path: '/keepAlive', name: 'keepAlive', component: keepAlive, meta: { index: 1 }, },
  ]
})

export default router;