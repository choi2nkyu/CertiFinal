/* eslint-disable linebreak-style */
/* eslint-disable import/no-duplicates */
import { expect } from 'chai'
import { assert } from 'chai'
import { mutations } from '@/store.js'
import { state } from '@/store.js'

const { increment } = mutations
const { addIncome } = mutations
const { saveAllData } = mutations
const { eraseAllData } = mutations

suite('mutations', () => {
  test('Mutations are Testable', () => {
    increment()
    expect(state.count).to.equal(1)
  })

  test('add INCOME ', () => {
    const income = { name: 'income', amount: '10' }
    assert.isEmpty(state.INCOMES, 'Array de Incomes vacio')
    addIncome(state, income)
    assert.isNotEmpty(state.INCOMES, 'Array de Incomes vacio')
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
