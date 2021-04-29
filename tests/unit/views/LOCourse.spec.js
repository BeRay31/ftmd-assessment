import Vuex from 'vuex'
import getters from '@/store/getters'
import Courses from '@/api/courses'
import LO from '@/views/courses/LO/index'
import ElementUI from 'element-ui'
import { shallowMount, createLocalVue } from '@vue/test-utils'

jest.mock('@/api/courses')

const localVue = createLocalVue()
localVue.use(Vuex)
localVue.use(ElementUI)

var getter = getters
getter.routes_user_type = { permission: { routes_user_type: 'admin' }}

const lo_lists = {
  data: [
    {
      id: 1,
      id_course: 1,
      id_lo: 2,
      tag: 'M'
    },
    {
      id: 2,
      id_course: 1,
      id_lo: 3,
      tag: 'M'
    }
  ]
}

const $route = {
  params: { id: 1 }
}

Courses.fetchCourseLO.mockResolvedValue(lo_lists)
Courses.fetchCourseById.mockResolvedValue({
  name: 'Lorem Ipsum',
  lecturer: 'Dosen XXX',
  code: 'MS9999'
})

// Tests
describe('LO Testing', () => {
  let store, wrapper
  beforeEach(async() => {
    store = new Vuex.Store({
      getter
    })
    wrapper = await shallowMount(LO, { store, localVue,
      mocks: { $route },
      data() {
        return {
          data: lo_lists.data
        }
      }
    })
  })

  it('shallow mount test', async() => {
    expect(wrapper.exists()).toBe(true)
    expect(wrapper.vm.$data.mapping).toBeInstanceOf(Array)
    expect(wrapper.vm.$data.data).toBeInstanceOf(Array)
  })
})
