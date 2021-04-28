import Layout from '@/layout'

const communicationRoute = {
  path: '/softskill/communication',
  component: Layout,
  redirect: 'noRedirect',
  name: 'Communication Questionnaire',
  meta: {
    title: 'Softskill',
    icon: 'form',
    roles: ['admin', 'lecturer', 'student']
  },
  children: [
    {
      path: 'list',
      component: () => import('@/views/communication/List/index'),
      name: 'CommQuestionnaireList',
      meta: {
        title: 'Kuesioner Komunikasi',
        icon: 'list',
        roles: ['admin', 'lecturer', 'student']
      }
    },
    {
      path: 'fill/:id',
      component: () => import('@/views/communication/Fill/index'),
      name: 'FillCommQuestionnaire',
      meta: {
        title: 'Pengisian Kuesioner',
        icon: 'edit',
        roles: ['admin', 'lecturer', 'student']
      },
      hidden: true
    },
    {
      path: 'results/:id',
      component: () => import('@/views/communication/Result/index'),
      name: 'CommQuestionnaireResults',
      meta: {
        title: 'Hasil Kuisioner',
        icon: 'documentation',
        roles: ['admin', 'lecturer', 'student']
      },
      hidden: true
    }
  ]
}

export default communicationRoute
