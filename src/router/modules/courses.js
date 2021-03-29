import Layout from '@/layout'

const courseRoutes = {
  path: '/courses',
  component: Layout,
  redirect: 'noRedirect',
  name: 'Course',
  meta: {
    title: 'Mata Kuliah',
    icon: 'education'
  },
  children: [
    {
      path: 'list',
      component: () => import('@/views/courses/List/index'),
      name: 'CourseList',
      meta: {
        title: 'Daftar Mata Kuliah',
        icon: 'list'
      }
    },
    {
      path: 'create',
      component: () => import('@/views/courses/Create/index'),
      name: 'CreateCrouse',
      meta: {
        title: 'Tambah Mata Kuliah',
        icon: 'form',
        roles: ['admin', 'lecturer']
      }
    },
    {
      path: 'edit/:id',
      component: () => import('@/views/courses/Create/index'),
      name: 'EditCourse',
      meta: {
        title: 'Ubah Mata Kuliah',
        icon: 'form',
        roles: ['admin', 'lecturer']
      }
    },
    {
      path: ':id',
      component: () => import(/* webpackPreload: true */'@/views/courses/LO/index'),
      name: 'LOCourse',
      meta: {
        title: 'Learning Outcomes',
        roles: ['admin'],
        activeMenu: '/list'
      },
      hidden: true
    }
  ]
}

export default courseRoutes

