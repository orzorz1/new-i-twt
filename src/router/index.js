import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

const routes = [
  {
    path:'/login',
    name:'login',
    component:() =>import('@/views/login')
  },
  {
    path: '/',
    name: 'main',
    component: () => import('@/views/main'),
    children: [
      {
        path: 'home',
        name: 'home',
        component: () => import('@/views/MainView')
      },
      {
        path: 'upgrade',
        name: 'upgrade',
        component: () => import('@/views/upgrade')
      },
      {
        path: 'userInfo',
        name: 'userInfo',
        component: () => import('@/views/userInfo')
      },
      {
        path: 'account',
        name: 'account',
        component: () => import('@/views/account')
      },
      {
        path: 'create',
        name: 'create',
        component: () => import('@/views/create'),
      },
    ]
  },
  {
    path: '*',
    name: '404',
    component: () => import('@/views/404')
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  next()
})

export default router
