import { expect } from 'chai'
import { mutations, state } from '@/store.js'

const { addExpense } = mutations
const { editExpense } = mutations
const { deleteExpense } = mutations
const { eraseAllData } = mutations

suite('Test store function', () => {
  test('Add expense to the Expense Report', () => {
    const initialLength = state.EXPENSES.length
    var expense = {
      name: 'test name',
      category: 'Salary',
      amount: 15,
      date: '10/11/2019',
    }
    addExpense(state, expense)
    expect(state.EXPENSES.length).to.equal(initialLength + 1)
  })

  test('Test edit expense function', () => {
    //eraseAllData()
    const initialLength1 = state.EXPENSES.length
    var expense1 = {
      name: 'another name',
      category: 'Salary',
      amount: 15,
      date: '10/11/2019',
    }
    var modifiedExpense = {
      oldName: 'another name',
      name: 'modified name',
      category: 'Salary',
      amount: 19,
      date: '10/11/2019'
    }
    addExpense(state, expense1)
    expect(state.EXPENSES.length).to.equal(initialLength1 + 1)
    editExpense(state, modifiedExpense)
    expect(state.EXPENSES.length).to.equal(initialLength1 + 1)
  })

  test('Test delete expense function', () => {
    const initLength = state.EXPENSES.length
    var expense2 = {
      name: 'great name',
      category: 'Other',
      amount: 13,
      date: '10/11/2019'
    }
    addExpense(state, expense2)
    expect(state.EXPENSES.length).to.equal(initLength + 1)
    deleteExpense(state, expense2)
    expect(state.EXPENSES.length).to.equal(initLength)
  })
})
