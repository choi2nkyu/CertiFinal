import { expect } from 'chai'
import { shallowMount } from '@vue/test-utils'
import Account from '@/components/Account.vue'
import { storeTest } from '@/store.js'

suite('Account.vue', () => {
  let store
  let wrapper
  const object = [{ name: 'Savings', description: 'Ordinary Savings' }]
  setup(function() {
    store = storeTest
    wrapper = shallowMount(Account, { store })
  })

  test('Create Simple Personal Account', () => {
    expect(wrapper.vm.accountArray.length).to.equal(0)
    const nameField = wrapper.find('#name')
    const descriptionField = wrapper.find('#description')
    const addButton = wrapper.find('#buttonAdd')
    nameField.setValue('Cuenta1')
    descriptionField.setValue('Description')
    addButton.trigger('click')
    expect(wrapper.vm.accountArray.length).to.equal(1)
  })

  test('Create Multiple Personal Account', () => {
    expect(wrapper.vm.accountArray.length).to.equal(0)
    const nameField = wrapper.find('#name')
    const descriptionField = wrapper.find('#description')
    const addButton = wrapper.find('#buttonAdd')
    nameField.setValue('Cuenta1')
    descriptionField.setValue('Description1')
    addButton.trigger('click')
    nameField.setValue('Cuenta2')
    descriptionField.setValue('Description2')
    addButton.trigger('click')
    nameField.setValue('Cuenta3')
    descriptionField.setValue('Description3')
    addButton.trigger('click')
    expect(wrapper.vm.accountArray.length).to.equal(3)
  })
})
