import { SessionStorage } from 'quasar'

export default function (to, from, next) {
  if (to.matched.some(record => record.meta.requiredAuth)) {
    let token = SessionStorage.getItem('token')
    if (!token) {
      next('/auth/login')
    } else {
      next()
    }
  } else {
    next()
  }
}
