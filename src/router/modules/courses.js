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
        title: 'Buat Mata Kuliah',
        icon: 'form',
        roles: ['admin', 'lecturer']
      }
    },
    {
      path: 'edit/:id',
      component: () => import('@/views/courses/Create/index'),
      name: 'EditCourse',
      meta: {
        title: 'Edit Mata Kuliah',
        roles: ['admin', 'lecturer'],
        activeMenu: '/courses/list'
      },
      hidden: true
    }
  ]
}

export default courseRoutes

