import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import getters from '@/store/getters'
import ElementUI from 'element-ui'
import Portfolio from '@/views/portofolio/List/index'
import Courses from '@/api/courses'

const localVue = createLocalVue()
localVue.use(Vuex)
localVue.use(ElementUI)

var getter = getters
// getter.routes_user_type = { permission: { routes_user_type: 'admin' }}
// getter.id_user = { user: { token: 'token' }}
getter.routes_user_type = state => 'admin'
getter.token = state => 'token'

jest.mock('@/api/courses')
const courses = {
  data: [
    {
      id_course: 1,
      name: 'Statika Struktur',
      class: '1',
      lecturer_name: 'Dosen 1',
      semester: 2,
      tahun_ajaran: '2020/2021'
    },
    {
      id_course: 2,
      name: 'Termodinamika',
      class: '2',
      lecturer_name: 'Dosen 2',
      semester: 1,
      tahun_ajaran: '2021'
    }
  ],
  lastPage: 1
}
Courses.fetchCourses.mockResolvedValue(courses)

describe('', () => {
  it('Shallow mount portfolio page test', () => {
    const wrapper = shallowMount(Portfolio, { store: new Vuex.Store({ getters: getter }), localVue })
    expect(wrapper.exists()).toBe(true)
    expect(wrapper.vm.$data.currentPage).toEqual(1)
    expect(wrapper.vm.$data.semesterFilter).toBeFalsy()
    expect(wrapper.vm.$data.modal.state).toBeFalsy()
    expect(wrapper.vm.$data.modal.stateDelete).toBeFalsy()
  })
})