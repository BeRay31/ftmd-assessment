import Layout from '@/layout'

const teamworkRoute = {
  path: '/softskill/teamwork',
  component: Layout,
  redirect: 'noRedirect',
  name: 'Teamwork Questionnaire',
  meta: {
    title: 'Softskill',
    icon: 'form',
    roles: ['admin', 'lecturer', 'student']
  },
  children: [
    {
      path: 'list',
      component: () => import('@/views/teamwork/List/index'),
      name: 'TeamworkQuestionnaireList',
      meta: {
        title: 'Kuesioner Kerjasama',
        icon: 'form',
        roles: ['admin', 'lecturer', 'student']
      }
    },
    {
      path: 'fill/:id',
      component: () => import('@/views/teamwork/Fill/index'),
      name: 'FillTeamworkQuestionnaire',
      meta: {
        title: 'Pengisian Kuesioner Kerjasama',
        icon: 'edit',
        roles: ['admin', 'student']
      },
      hidden: true
    },
    {
      path: 'results/:id',
      component: () => import('@/views/teamwork/Result/index'),
      name: 'TeamworkQuestionnaireResults',
      meta: {
        title: 'Hasil Kuisioner Kerjasama',
        icon: 'documentation',
        roles: ['admin', 'lecturer']
      },
      hidden: true
    }
  ]
}

export default teamworkRoute
