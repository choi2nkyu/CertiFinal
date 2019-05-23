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
  test('Account has 3 buttons: add, edit, delete', () => {
    const buttonArray = wrapper.findAll('button')
    const firstButton = buttonArray.at(1)
    const secondButton = buttonArray.at(2)
    const thirdButton = buttonArray.at(3)
    expect(buttonArray.length).to.equal(4)
    expect(firstButton.text()).to.equal('Add')
    expect(secondButton.text()).to.equal('Edit')
    expect(thirdButton.text()).to.equal('Delete')
  })

  test('Table has 2 columns: name, description', () => {
    const fieldArray = wrapper.vm.fields
    const firstColumn = fieldArray[0]
    const secondColumn = fieldArray[1]
    expect(fieldArray.length).to.equal(2)
    expect(firstColumn.value).to.equal('name')
    expect(secondColumn.value).to.equal('description')
  })

  test('At button click, at least 1 object exists in array', () => {
    const initialLength = wrapper.vm.accountArray.length
    wrapper.find('button.add')
    wrapper.vm.add(object)
    expect(wrapper.vm.accountArray.length).to.equal(initialLength + 1)
  })
})

