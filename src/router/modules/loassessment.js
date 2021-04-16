import Layout from '@/layout'

const loAssessmentRoute = {
  path: '/loAssessment',
  component: Layout,
  redirect: 'noRedirect',
  name: 'LOAssessment',
  meta: {
    title: 'LO Assessment',
    icon: 'skill',
    roles: ['admin']
  },
  children: [
    {
      path: 'list',
      component: () => import('@/views/courses/LOAssessment/index'),
      name: 'LOAssessmentList',
      meta: {
        title: 'LO Assessment',
        icon: 'skill',
        roles: ['admin']
      }
    }
  ]
}

export default loAssessmentRoute
