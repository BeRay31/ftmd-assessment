import Layout from '@/layout'

const StudentAssessmentRoute = {
  path: '/student-assessment',
  component: Layout,
  redirect: 'noRedirect',
  name: 'Assessment',
  meta: {
    title: 'Assessment',
    icon: 'skill',
    roles: ['student']
  },
  children: [
    {
      path: 'course-outcome',
      component: () => import('@/views/student-assessment/CourseOutcome/index'),
      name: 'CourseOutcome',
      meta: {
        title: 'Indeks Prestasi',
        icon: 'skill',
        roles: ['student']
      }
    },
    {
      path: 'lo-supplement',
      component: () => import('@/views/student-assessment/LOSupplemen/index'),
      name: 'LOSupplement',
      meta: {
        title: 'LO Supplemen',
        icon: 'skill',
        roles: ['student']
      }
    }
  ]
}

export default StudentAssessmentRoute
