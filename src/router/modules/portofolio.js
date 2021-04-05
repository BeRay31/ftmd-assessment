import Layout from '@/layout'

const portofolioRoute = {
  path: '/portofolio',
  component: Layout,
  redirect: 'noRedirect',
  name: 'Portofolio',
  meta: {
    title: 'Portofolio Perkuliahan',
    icon: 'skill',
    roles: ['admin', 'lecturer']
  },
  children: [
    {
      path: 'porto',
      component: () => import('@/views/portofolio/index'),
      name: 'CoursePortofolio',
      meta: {
        title: 'Portofolio Perkuliahan',
        icon: 'excel',
        roles: ['admin', 'lecturer']
      }
    }
  ]
}

export default portofolioRoute
