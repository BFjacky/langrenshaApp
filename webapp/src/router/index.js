import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import bottomBar from '@/components/bottomBar'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'bottomBar',
      component: bottomBar
    }
  ]
})
