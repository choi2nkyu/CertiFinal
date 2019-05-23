import { expect } from 'chai'
import { mount } from '@vue/test-utils'
import reportes from '@/views/reportes.vue'
import { storeTest, mutations, state } from '@/store.js'


const { addIncome } = mutations

describe('reportes', () => {
  let store
  it('renders two storage buttons', () => {
    store = storeTest
    const wrapper = mount(reportes, { store })
    const deleteButton = wrapper.find('#deleteData')
    const saveButton = wrapper.find('#saveButton')
    expect((deleteButton).exists())
    expect((saveButton).exists())
    const income = { name: 'income', amount: '10' }
    addIncome(state, income)
    expect(window.localStorage.length).to.equal(0)
    saveButton.trigger('click')
    expect(window.localStorage.length).to.equal(1)
    deleteButton.trigger('click')
    expect(window.localStorage.length).to.equal(0)
  })
})
