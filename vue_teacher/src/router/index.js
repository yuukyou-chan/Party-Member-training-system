import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/login'
import Home from '@/views/home/'
import Layout from '@/views/layout/'
import InforBase from '@/views/InforBase/'
import AppliForm from '@/views/Application/AppliForm/'
import AppliText from '@/views/Application/AppliText/'
import Contact from '@/views/Application/Contact/'
import Conversation from '@/views/Application/Conversation/'

Vue.use(VueRouter)

// 路由配置表
const routes = [
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/',
    name: 'layout',
    component: Layout,
    children: [
      {
        path: '', // path 为空，会作为默认子路由渲染
        name: 'home',
        component: Home
      },
      {
        path: '/inforBase',
        name: 'InforBase',
        component: InforBase
      },
      {
        path: '/appliText',
        name: 'AppliText',
        component: AppliText
      },
      {
        path: '/appliForm',
        name: 'AppliForm',
        component: AppliForm
      },
      {
        path: '/contact',
        name: 'Contact',
        component: Contact
      },
      {
        path: '/conversation',
        name: 'Conversation',
        component: Conversation
      }
    ]
  }
]

const router = new VueRouter({
  routes
})
// 路由导航守卫
router.beforeEach((to, from, next) => {
  const user = JSON.parse(window.localStorage.getItem('user'))
  // 校验非登录页面的状态
  if (to.path !== '/login') {
    if (user) {
      // 已登录，允许通过
      next()
    } else {
      // 未登录，跳转登录页面
      next('/login')
    }
  } else {
    // 登录页面，正常允许通过
    next()
  }
})

export default router
