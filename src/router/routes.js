const routes = [
  {
    path: '/auth',
    component: () => import('layouts/AuthLayout.vue'),
    children: [
      { path: 'login', name: 'login', component: () => import('pages/Login') },
      { path: 'register', name: 'register', component: () => import('pages/Register') }
    ]
  },
  {
    path: '/',
    meta: {
      requiredAuth: true
    },
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
