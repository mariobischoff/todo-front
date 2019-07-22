import { SessionStorage } from 'quasar'

const routes = [
  {
    path: '/',
    component: () => import('layouts/Layout.vue'),
    beforeEnter: (to, from, next) => {
      if (SessionStorage.getItem('token')) {
        next()
        return
      }
      next('/auth/login')
    },
    children: [
      { path: 'login', name: 'login', component: () => import('pages/Login') },
      { path: 'register', name: 'register', component: () => import('pages/Register') }
    ]
  },
  {
    path: '/',
    component: () => import('layouts/Layout.vue'),
    children: [
      { path: '', component: () => import('pages/Task.vue') }
    ]
  }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
