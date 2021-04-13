import { shallowMount } from '@vue/test-utils'
import Modal from '@/components/Modal'

describe('Base modal testing', () => {
  
  it('shallow mount success', () => {
    const wrapper = shallowMount(Modal)
    expect(wrapper.exists()).toBe(true)
  })

  it('emit close modal', () => {
    const wrapper = shallowMount(Modal)
    wrapper.vm.close()
    expect(wrapper.emitted().closeModal).toBeTruthy()
  })

  it('styling modal', () => {
    const wrapper = shallowMount(Modal)
    expect(wrapper.props('state')).toBe(false)
    expect(wrapper.vm.styling('style')).toEqual('style ')
    wrapper.setProps({ state: true })
    expect(wrapper.vm.styling('style')).toEqual('style active')
  })

})