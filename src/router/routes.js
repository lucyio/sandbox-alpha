export default [
  {
    path: '/',
    name: 'hello',
    component: require('@/pages/hello')
  },
  {
    path: '/login',
    name: 'login',
    component: require('@/pages/login')
  },
  {
    path: '*',
    name: 'error',
    component: require('@/pages/error')
  }
]
