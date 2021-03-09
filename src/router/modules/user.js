import Layout from '@/layout'

const userRoute = {
  path: '/user',
  component: Layout,
  redirect: 'noRedirect',
  name: 'User',
  meta: {
    title: 'Pengguna',
    icon: 'user',
    roles: ['admin']
  },
  children: [
    {
      path: 'list',
      component: () => import(/* webpackPreload: true */ '@/views/user/List/index'),
      name: 'UserList',
      meta: {
        icon: 'list',
        title: 'Daftar Pengguna',
        roles: ['admin']
      }
    },
    {
      path: 'create',
      component: () => import(/* webpackPreload: true */ '@/views/user/Create/index'),
      name: 'CreateUser',
      meta: {
        icon: 'form',
        title: 'Tambahkan Pengguna',
        roles: ['admin']
      }
    },
    {
      path: ':id',
      component: () => import(/* webpackPreload: true */ '@/views/user/Create/index'),
      name: 'updateUser',
      meta: {
        roles: ['admin'],
        activeMenu: '/list'
      },
      hidden: true
    }
  ]
}

export default userRoute
