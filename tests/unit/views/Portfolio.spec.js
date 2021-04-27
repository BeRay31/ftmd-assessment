import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import getters from '@/store/getters'
import ElementUI from 'element-ui'
import Portfolio from '@/views/portofolio/index'

const localVue = createLocalVue()
localVue.use(Vuex)
localVue.use(ElementUI)

var getter = getters
getter.routes_user_type = { permission: { routes_user_type: 'admin' } }

describe('', () => {
  let store
  beforeEach(() => {
    store = new Vuex.Store({
      getter
    })
  })

  it('Shallow mount portfolio page test', () => {
    const wrapper = shallowMount(Portfolio, { store, localVue })
    expect(wrapper.exists()).toBe(true)
    expect(wrapper.vm.$data.dosenAttendance).toBeDefined()
    expect(wrapper.vm.$data.studentAttendance).toBeDefined()
    expect(wrapper.vm.$data.average).toBeDefined()
  })
})