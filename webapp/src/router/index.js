import Vue from 'vue'
import Router from 'vue-router'
import homePage from '@/components/homePage'
import personalDetail from '@/components/personal/personalDetail'
import gamerule from '@/components/personal/gamerule'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'homePage',
      component: homePage,
    },
    {
      path: '/gamerule',
      component: gamerule,
      name: 'gamerule',
    },
    {
      path: '/personalDetail',
      name: 'personalDetail',
      component: personalDetail
    }
  ]
})
