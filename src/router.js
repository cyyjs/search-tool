import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Setting from './views/Setting.vue'
import List from './views/List.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/List',
      name: 'List',
      component: List
    },
    {
      path: '/setting',
      name: 'setting',
      component: Setting
    }
  ]
})
