import { expect } from 'chai'
import { shallowMount} from '@vue/test-utils'
import reportes from '@/views/reportes.vue'
import { storeTest } from '@/store.js'



suite('reportes.vue', () => {
  let store  
  let wrapper
  setup(function() {
    store = storeTest       
    wrapper = shallowMount(reportes, {store})
  })
  test('buttons add, edit, delete in Ingresos', () => {
    const buttonArray = wrapper.findAll('b-button')
    const firstButton = buttonArray.at(0)
    const secondButton = buttonArray.at(1)
    const thirdButton = buttonArray.at(2)
    expect(buttonArray.length).to.equal(6)
    expect(firstButton.text()).to.equal('Add')
    expect(secondButton.text()).to.equal('Edit')
    expect(thirdButton.text()).to.equal('Delete')
  })

  test('Table has 4 columns: name, category, amount, date', () => {
    const fieldArray = wrapper.vm.fields
    const firstColumn = fieldArray[0]
    const secondColumn = fieldArray[1]
    const thirdColumn = fieldArray[2]
    const fourthColumn = fieldArray[3]
    expect(fieldArray.length).to.equal(4)
    expect(firstColumn).to.equal('name')
    expect(secondColumn).to.equal('category')
    expect(thirdColumn).to.equal('amount')
    expect(fourthColumn).to.equal('date')
  })

  test('Ensure that there is no data', () => {
    const itemArray = wrapper.vm.items
    expect(itemArray.length).to.equal(0)
  })
})

