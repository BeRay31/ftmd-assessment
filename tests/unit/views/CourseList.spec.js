import { shallowMount, mount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import getters from '@/store/getters'
import Courses from '@/api/courses'
import CourseList from '@/views/courses/List/index'
import ElementUI from 'element-ui'
import DeleteModal from '@/views/courses/Modal/DeleteModal/index'

jest.mock('@/api/courses')
jest.mock('@/api/courseStudent')

const localVue = createLocalVue()
localVue.use(Vuex)
localVue.use(ElementUI)

var getter = getters
getter.routes_user_type = { permission: { routes_user_type: 'admin' } }
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
const mockRes = { rows: 1 }
Courses.fetchCourses.mockResolvedValue(courses)
const res = { msg: 'OK' }
Courses.deleteCourse.mockResolvedValue(res)

// Tests
describe('CoursesList.vue', () => {

  let store

  beforeEach(() => {
    store = new Vuex.Store({
      getter
    })
  })

  it('shallow mount test', () => {
    const wrapper = shallowMount(CourseList, { store, localVue })
    expect(wrapper.exists()).toBe(true)
    expect(wrapper.vm.$data.currentPage).toEqual(1)
    expect(wrapper.vm.$data.modal.state).toBeFalsy()
    expect(wrapper.vm.$data.modal.stateDelete).toBeFalsy()
  })

  it('filter test', () => {
    const wrapper = shallowMount(CourseList, { store, localVue, data() {
      return {
        searchQuery: 'Statika'
      }
    } })
    wrapper.vm.setSemesterFilter('2')
    expect(wrapper.vm.$data.semesterFilter).toBeDefined()
    expect(wrapper.vm.$data.semesterFilter).toEqual('2')
    expect(wrapper.vm.$data.searchQuery).toEqual('Statika')
  })

  it('test open delete modal', () => {
    const wrapper = mount(CourseList, { store, localVue, data() { return { id_course: 1 }} })
    
    wrapper.vm.openDeleteModal(wrapper.vm.$data.id_course)
    expect(wrapper.vm.$data.modal.stateDelete).toBeTruthy()
    expect(wrapper.vm.$data.modal.course).toEqual(1)

    const delMod = wrapper.find(DeleteModal)
    expect(delMod.exists()).toBe(true)
    expect(delMod.props('state')).toBe(true)
  })

  it('get courses list', () => {
    const wrapper = mount(CourseList, { store, localVue })
    expect(wrapper.vm.$data.listLoading).toBeTruthy()
    expect(wrapper.vm.$data.courses).toBeInstanceOf(Array)
  })

  // it('simulate delete course list', async () => {
  //   const wrapper = mount(CourseList, { store, localVue })
  //   wrapper.vm.$data.modal.course = { id_course: 1 }
  //   await wrapper.vm.deleteCourse()
  //   expect(wrapper.vm.$data.modal.state).toBeFalsy()
  // })

  it('beginning data', async () => {
    const wrapper = mount(CourseList, { store, localVue })
    expect(wrapper.vm.$data.courses.length).toEqual(0)
    expect(wrapper.vm.$data.currentPage).toEqual(1)
    expect(wrapper.vm.$data.totalPage).toBeNull()
    await wrapper.vm.getCoursesList()
    expect(wrapper.vm.$data.totalPage).toEqual(1)
    expect(wrapper.vm.$data.searchQuery).toBeFalsy()
    expect(wrapper.vm.$data.semesterFilter).toBeFalsy()
    expect(wrapper.vm.$data.listLoading).toBeFalsy()
  })

})