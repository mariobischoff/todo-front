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
      { path: '', component: () => import('pages/Task.vue') }
    ]
  },
  {
    path: '/auth',
    component: () => import('layouts/AuthLayout.vue'),
    children: [
      { path: 'register', name: 'register', component: () => import('pages/Register') },
      { path: 'login', name: 'login', component: () => import('pages/Login') }
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
