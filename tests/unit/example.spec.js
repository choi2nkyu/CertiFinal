/* eslint-disable linebreak-style */
/* eslint-disable import/no-duplicates */
import { expect } from 'chai'
import { assert } from 'chai'
import { mutations } from '@/store.js'
import { state } from '@/store.js'

const { increment } = mutations
const { addIncome } = mutations
const { addAccount } = mutations
const { deleteAccount } = mutations
const { addIncomeCategory } = mutations
const { addExpenseCategory } = mutations
const { saveAllData } = mutations
const { eraseAllData } = mutations

suite('Store.js', () => {
  test('Mutations are Testable', () => {
    increment()
    expect(state.count).to.equal(1)
  })

  test('add ACCOUNT ', () => {
    window.localStorage.clear();
    var currentLength = state.ACCOUNTS.length;
    const account = { name: 'CuentaPrueba', description: '...' }
    expect(state.ACCOUNTS.length).to.equal(currentLength);
    addAccount(state, account)
    expect(state.ACCOUNTS.length).to.equal(currentLength+1);
  })

  test('add Multiple ACCOUNTS ', () => {
    window.localStorage.clear();
    var currentLength = state.ACCOUNTS.length;
    const account1 = { name: 'CuentaPrueba1', description: '...' }
    const account2 = { name: 'CuentaPrueba2', description: '...' }
    const account3 = { name: 'CuentaPrueba3', description: '...' }

    expect(state.ACCOUNTS.length).to.equal(currentLength);
    addAccount(state, account1)
    addAccount(state, account2)
    addAccount(state, account3)
    expect(state.ACCOUNTS.length).to.equal(currentLength+3);
  })

  test('delete ACCOUNT ', () => {
    var currentLength = state.ACCOUNTS.length;
    const account = { name: 'CuentaPruebaBorrado', description: '...' }
    expect(state.ACCOUNTS.length).to.equal(currentLength);
    addAccount(state, account)
    expect(state.ACCOUNTS.length).to.equal(currentLength+1);
    deleteAccount(state,'CuentaPruebaBorrado');
    expect(state.ACCOUNTS.length).to.equal(currentLength);
  })
  
  test('add INCOME ', () => {
    const income = { name: 'income', amount: '10' }
    assert.isEmpty(state.INCOMES, 'Array de Incomes vacio')
    addIncome(state, income)
    assert.isNotEmpty(state.INCOMES, 'Array de Incomes vacio')
  })

  test('add INCOME_CATEGORY ', () => {
    const category = { name: 'income' }
    expect(state.INCOME_CATEGORIES.length).to.equal(3),
    addIncomeCategory(state, category)
    expect(state.INCOME_CATEGORIES.length).to.equal(4)
  })

  test('add EXPENSE_CATEGORY ', () => {
    const category = { name: 'expense' }
    expect(state.EXPENSE_CATEGORIES.length).to.equal(4),
    addExpenseCategory(state, category)
    expect(state.EXPENSE_CATEGORIES.length).to.equal(5)
  })

  test('add multiple Expense Categories ', () => {
    const category1 = { name: 'expense1' }
    const category2 = { name: 'expense2' }
    const category3 = { name: 'expense3' }
    expect(state.EXPENSE_CATEGORIES.length).to.equal(5),
    addExpenseCategory(state, category1)
    addExpenseCategory(state, category2)
    addExpenseCategory(state, category3)
    expect(state.EXPENSE_CATEGORIES.length).to.equal(8)
  })

  test('add multiple Income Categories ', () => {
    const category1 = { name: 'income1' }
    const category2 = { name: 'income2' }
    const category3 = { name: 'income3' }
    expect(state.INCOME_CATEGORIES.length).to.equal(4),
    addIncomeCategory(state, category1)
    addIncomeCategory(state, category2)
    addIncomeCategory(state, category3)
    expect(state.INCOME_CATEGORIES.length).to.equal(7)
  })

  test('Local Storage Data Saving', () => {
    const income = { name: 'income', amount: '10' }
    addIncome(state, income)
    expect(window.localStorage.length).to.equal(0)
    saveAllData()
    expect(window.localStorage.length).to.equal(1)
  })

  test('Local Storage Data clearing', () => {
    const income = { name: 'income', amount: '10' }
    addIncome(state, income)
    saveAllData()
    expect(window.localStorage.length).to.equal(1)
    eraseAllData()
    expect(window.localStorage.length).to.equal(0)
  })
})
