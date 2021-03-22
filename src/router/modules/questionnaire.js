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
      path: 'fill',
      component: () => import('@/views/questionnaire/Fill/index'),
      name: 'FillQuestionnaire',
      meta: {
        title: 'Pengisian Kuesioner',
        icon: 'edit',
        roles: ['admin', 'student']
      }
    },
    {
      path: 'results',
      component: () => import('@/views/questionnaire/Result/index'), // Nanti ganti ke page hasil
      name: 'QuestionnaireResults',
      meta: {
        title: 'Hasil Kuisioner',
        icon: 'documentation',
        roles: ['admin', 'lecturer']
      }
    }
  ]
}

export default questionnaireRoute
