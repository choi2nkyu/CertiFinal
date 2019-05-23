import { expect } from 'chai'
import { shallowMount } from '@vue/test-utils'
import IncExpForm from '@/components/IncExpForm.vue'
import { storeTest } from '@/store.js'



suite('IncExpForm.vue', () => {
  let store
  let wrapper
  let formType = 'Expense'
  setup(function() {  
    store = storeTest       
    wrapper = shallowMount(IncExpForm, {store, propsData: { formType } })    
  })
  test('renders Name input', () => {
    expect(wrapper.find('#Name').exists())
  })
  test('renders Category label', () => {
    expect(wrapper.find('#LblCategory').exists())
  })
  test('renders Amount input', () => {
    expect(wrapper.find('#Amount').exists())
  })
  test('renders expense in the titles when the formType is expense', () => {
    const title1 = wrapper.find('#lblName')
    const title2 = wrapper.find('#lblCategory')
    const title3 = wrapper.find('#lblAmount')
    expect(title1.text()).to.equal('Expense Name')
    expect(title2.text()).to.equal('Expense Category')
    expect(title3.text()).to.equal('Expense Amount')
  })
  test('Category has 4 default options', () => {
    const optionArray = wrapper.findAll('option')
    expect(optionArray.at(0).text()).to.equal('Add...')
    expect(optionArray.at(1).text()).to.equal('Expenses')
    expect(optionArray.at(2).text()).to.equal('Transference')
    expect(optionArray.at(3).text()).to.equal('Other')
  })
  test('Deletes the Selected Category', () => {
    const deleteButton = wrapper.find('#deleteButton')
    wrapper.vm.currentCategory = 'Transference'
    deleteButton.trigger('click')
    const optionArray = wrapper.findAll('option')
    expect(optionArray.length).to.equal(3)
  })
})
