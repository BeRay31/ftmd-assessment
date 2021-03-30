import Layout from '@/layout'

const questionnaireRoute = {
  path: '/questionnaire',
  component: Layout,
  redirect: 'noRedirect',
  name: 'Questionnaire',
  meta: {
    title: 'Kuisioner',
    icon: 'form',
    roles: ['admin', 'lecturer', 'student']
  },
  children: [
    {
      path: 'list',
      component: () => import('@/views/questionnaire/List/index'),
      name: 'QuestionnaireList',
      meta: {
        title: 'Kuesioner Perkuliahan',
        icon: 'form',
        roles: ['admin', 'lecturer', 'student']
      }
    },
    {
      path: 'fill/:id',
      component: () => import('@/views/questionnaire/Fill/index'),
      name: 'FillQuestionnaire',
      meta: {
        title: 'Pengisian Kuesioner',
        icon: 'edit',
        roles: ['admin', 'student']
      },
      hidden: true
    },
    {
      path: 'results/:id',
      component: () => import('@/views/questionnaire/Result/index'),
      name: 'QuestionnaireResults',
      meta: {
        title: 'Hasil Kuisioner',
        icon: 'documentation',
        roles: ['admin', 'lecturer']
      },
      hidden: true
    }
  ]
}

export default questionnaireRoute
