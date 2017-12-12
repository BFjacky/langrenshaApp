import Vue from 'vue'
import Router from 'vue-router'
import homePage from '@/components/homePage'
import personalDetail from '@/components/personal/personalDetail'
import cidian from '@/components/personal/cidian'
import gameBackground from '@/components/personal/gameBackground'
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
      path: '/cidian',
      component: cidian,
      name: 'cidian',
    },
    {
      path: '/personalDetail',
      name: 'personalDetail',
      component: personalDetail
    },
    {
      path: '/gameBackground',
      name: 'gameBackground',
      component: gameBackground
    },
    {
      path: '/gamerule',
      name: 'gamerule',
      component: gamerule
    }
  ]
})
