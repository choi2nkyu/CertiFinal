import { expect } from 'chai'
import { mutations, state } from '@/store.js'

const { addIncome } = mutations
const { editIncome } = mutations
const { deleteIncome } = mutations
const { eraseAllData } = mutations

suite('Test store function', () => {
  test('Add income to the Income Report', () => {
    const initialLength = state.INCOMES.length
    var income = {
      name: 'test name',
      category: 'Salary',
      amount: 15,
      date: '10/11/2019',
    }
    addIncome(state, income)
    expect(state.INCOMES.length).to.equal(initialLength + 1)
  })

  test('Test edit income function', () => {
    //eraseAllData()
    const initialLength1 = state.INCOMES.length
    var income1 = {
      name: 'another name',
      category: 'Salary',
      amount: 15,
      date: '10/11/2019',
    }
    var modifiedIncome = {
      oldName: 'another name',
      name: 'modified name',
      category: 'Salary',
      amount: 19,
      date: '10/11/2019'
    }
    addIncome(state, income1)
    expect(state.INCOMES.length).to.equal(initialLength1 + 1)
    editIncome(state, modifiedIncome)
    expect(state.INCOMES.length).to.equal(initialLength1 + 1)
  })
})
