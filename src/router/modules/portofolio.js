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
      path: 'list',
      component: () => import('@/views/portofolio/List/index'),
      name: 'CoursePortofolio',
      meta: {
        title: 'Portofolio Perkuliahan',
        icon: 'excel',
        roles: ['admin', 'lecturer']
      }
    },
    {
      path: 'detail/:id',
      component: () => import('@/views/portofolio/Detail/index'),
      name: 'PortfolioDetails',
      mete: {
        title: 'Detil Portfolio',
        icon: 'excel',
        roles: ['admin', 'lecturer']
      },
      hidden: true
    }
  ]
}

export default portofolioRoute
