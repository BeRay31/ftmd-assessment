import Layout from '@/layout'

const courseRoutes = {
  path: '/looutcome',
  component: Layout,
  redirect: 'noRedirect',
  name: 'LO Outcome',
  meta: {
    title: 'LO Outcome',
    icon: 'education'
  },
  children: [
    {
      path: 'list',
      component: () => import('@/views/looutcome/List/index'),
      name: 'LOutcomeList',
      meta: {
        title: 'Hasil LO Outcome',
        icon: 'list'
      }
    }
  ]
}

export default courseRoutes

