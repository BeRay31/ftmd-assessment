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
        title: 'Tambah Mata Kuliah',
        icon: 'form',
        roles: ['admin', 'lecturer']
      }
    },
    {
      path: 'edit/:id',
      component: () => import('@/views/courses/Create/index'),
      name: 'EditCourse',
      meta: {
        title: 'Ubah Mata Kuliah',
        icon: 'form',
        roles: ['admin', 'lecturer']
      },
      hidden: true
    },
    {
      path: 'course-outcomes/student/:id',
      component: () => import(/* webpackPreload: true */'@/views/courses/CourseOutcome/Student/index'),
      name: 'StudentCourseOutcomes',
      meta: {
        title: 'Student Outcomes',
        roles: ['student'],
        activeMenu: '/list'
      },
      hidden: true
    },
    {
      path: 'assess',
      component: () => import(/* webpackPreload: true */'@/views/courses/Assess/index'),
      name: 'AssessCourse',
      meta: {
        icon: 'chart',
        title: 'Assessment',
        roles: ['admin']
      }
    },
    {
      path: 'assess/:code/:year/:sem',
      component: () => import(/* webpackPreload: true */'@/views/courses/Assess/Details/index'),
      name: 'AssessCourseDetails',
      meta: {
        title: 'Assessment Details',
        roles: ['admin'],
        activeMenu: '/assess'
      },
      hidden: true
    },
    {
      path: ':id',
      component: () => import(/* webpackPreload: true */'@/views/courses/LO/index'),
      name: 'LOCourse',
      meta: {
        title: 'Learning Outcomes',
        roles: ['admin'],
        activeMenu: '/list'
      },
      hidden: true
    },
    {
      path: 'scores/:id',
      component: () => import('@/views/courses/Scores/index'),
      name: 'ScoresList',
      meta: {
        title: 'Nilai',
        icon: 'form',
        roles: ['lecturer']
      },
      hidden: true
    },
    {
      path: 'loComponentList/:id',
      component: () => import('@/views/courses/LoWeightList/index'),
      name: 'LoComponentList',
      meta: {
        title: 'LO Component List',
        roles: ['lecturer']
      },
      hidden: true
    }
  ]
}

export default courseRoutes

