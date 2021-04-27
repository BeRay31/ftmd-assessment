import Vuex from 'vuex'
import getter from '@/store/getters'
import Score from '@/views/courses/CourseOutcome/Student/index'
import ElementUI from 'element-ui'
import Course from '@/api/courses'
import CourseStudent from '@/api/courseStudent'
import { shallowMount, createLocalVue } from '@vue/test-utils'
import VueRouter from 'vue-router'

const studentDataCO = [
  {
    component: 'UTS',
    id_course: 13,
    id_user: 1,
    index: 2.5,
    score: 63
  },
  {
    component: 'UAS',
    id_course: 13,
    id_user: 1,
    index: 2.5,
    score: 55
  },
  {
    component: 'Quiz',
    id_course: 13,
    id_user: 1,
    index: 2.5,
    score: 94
  }
]

var getters = getter
getters.id_user = state => 'admin'
getters.token = state => 'token'

jest.mock('@/api/courseStudent')
jest.mock('@/api/courses')

Course.fetchCourseById.mockResolvedValue({
  msg: 'We found your request Course!',
  data: {
    id_course: 13,
    name: 'Lorem Ipsum',
    code: 'MS1220',
    class: 1,
    semester: 1,
    tahun_ajaran: '2020/2021',
    sks: 2,
    id_lecturer: 1,
    lecturer_name: 'Dolor Sit Amet'
  }
})
CourseStudent.getStudentCourseOutcome.mockResolvedValue({
  msg: 'request succeed',
  data: studentDataCO
})

const localVue = createLocalVue()
var store, router
localVue.use(Vuex)
localVue.use(ElementUI)

describe('Course score', () => {
  let wrapper
  beforeEach(() => {
    store = new Vuex.Store({ getters })
    localVue.use(VueRouter)
    router = new VueRouter()
    router.push({
      path: '/courses/course-outcomes/student/',
      params: { id: 1 }
    })
  })

  it('Mount and Count Index', async() => {
    wrapper = await shallowMount(Score, {
      store,
      localVue,
      router,
      data() {
        return {
          outcomeData: studentDataCO
        }
      }
    })
    expect(wrapper.exists()).toBe(true)
    expect(wrapper.vm.$data.outcomeData).toBeInstanceOf(Array)
    expect(wrapper.vm.$data.courseData).toBeDefined()
    expect(wrapper.vm.getIndex(4.0)).toEqual('A')
    expect(wrapper.vm.getIndex(3.2)).toEqual('AB')
    expect(wrapper.vm.getIndex(2.8)).toEqual('B')
    expect(wrapper.vm.getIndex(0.8)).toEqual('D')
  })
})
