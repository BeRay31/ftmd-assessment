import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import getters from '@/store/getters'
import ElementUI from 'element-ui'
import Course from '@/api/courses'
import Assess from '@/views/courses/Assess/index'

jest.mock('@/api/courses')

const assessmentData = {
  rows: [{
    ast: 2.97,
    code: 'LOREM',
    kelas: 1,
    name: 'LoremIpsum',
    out: 2.65,
    prt: 3.32,
    qst: 3.12
  },
  {
    ast: 3.41,
    code: 'LOREM',
    kelas: 2,
    name: 'LoremIpsum',
    out: 3.45,
    prt: 3.32,
    qst: 3.54
  },
  {
    ast: 3.41,
    code: 'LOREM',
    kelas: 2,
    name: 'DolorSit',
    out: 3.45,
    prt: 3.32,
    qst: 3.54
  }]
}
const localVue = createLocalVue()
localVue.use(Vuex)
localVue.use(ElementUI)
var getter = getters

getter.routes_user_type = { permission: { routes_user_type: 'admin' } }

describe('StudentCO.spec.js', () => {
  let store
  beforeEach(() => {
    store = new Vuex.Store({ getter })
    Course.fetchCourseAssessment.mockResolvedValue(assessmentData)
    Course.calculateCourseAssessment.mockResolvedValue({ msg: 'Updated' })
  })

  it('shallow mount test', async() => {
    const wrapper = await shallowMount(Assess, { store, localVue })
    const now = new Date()
    const month = now.getMonth()
    const year = now.getFullYear()
    let tahunAjaran, semester
    if (month < 6) {
      tahunAjaran = year.toString() + '/' + (year + 1).toString()
      semester = 2
    } else {
      tahunAjaran = (year - 1).toString() + '/' + year.toString()
      semester = 1
    }
    expect(wrapper.exists()).toBe(true)
    expect(wrapper.vm.$data.tahunAjaran).toEqual(tahunAjaran)
    expect(wrapper.vm.$data.semester).toEqual(semester)
    expect(wrapper.vm.$data.courses).toHaveLength(assessmentData.rows.length)
    expect(wrapper.vm.$data.searchQuery).toBeFalsy()
    expect(wrapper.vm.$data.totalPage).toEqual(1)
    expect(wrapper.vm.$data.currentPage).toEqual(1)
  })

  it('assess course semester & year', async() => {
    const wrapper = await shallowMount(Assess, { store, localVue }, {
      tahunAjaran: '2020/2021',
      semester: 2,
      courses: assessmentData.rows
    })
    wrapper.vm.setSemesterFilter(1)
    expect(wrapper.vm.$data.semester).toEqual(1)
    wrapper.vm.setSemesterFilter(2)
    expect(wrapper.vm.$data.semester).toEqual(2)
  })

  it('assess course main method', async() => {
    const wrapper = await shallowMount(Assess, { store, localVue })
    const spy = jest.spyOn(wrapper.vm, 'fetchCourseAssessment')
    await wrapper.vm.assessCourse()
    expect(spy).toHaveBeenCalled()
  })

  it('assess search query', async() => {
    const wrapper = await shallowMount(Assess, { store, localVue })
    wrapper.setData({ searchQuery: 'dolor' })
    expect(wrapper.vm.$data.displayed).toHaveLength(1)
  })
})
