import { expect } from 'chai'
import { shallowMount, createLocalVue } from '@vue/test-utils'
import reportes from '@/views/reportes.vue'
import Vuex from 'vuex'

const localVue = createLocalVue()
localVue.use(Vuex)

describe('reportes.vue', () => {
  let actions
  let store
  let state
  let mutations
  let wrapper
  beforeEach(function() {
    mutations = {
      setCurrentAccount(context, currentAccount) {
        context.CURRENT_ACCOUNT = currentAccount
      },
      addAccount(context, newAccount) {
        context.ACCOUNTS.push(newAccount)
      },

      deleteAccount(context, accountId) {
        context.ACCOUNTS.forEach(function(element) {
          const indexofElement = context.ACCOUNTS.indexOf(element)
          if (element.id === accountId) {
            context.ACCOUNTS.splice(indexofElement, 1)
          }
        })
      },

      addIncomeCategory(context, newCategory) {
        context.INCOME_CATEGORIES.push(newCategory)
      },

      addExpenseCategory(context, newCategory) {
        context.EXPENSE_CATEGORIES.push(newCategory)
      },

      addExpense(context, newExpense) {
        context.EXPENSES.push(newExpense)
      },
      addIncome(context, newIncome) {
        context.INCOMES.push(newIncome)
      },

      editIncome(context, editedIncome) {
        console.log(editedIncome)
        context.INCOMES.forEach(
            function(element) {
              const indexofElement = context.INCOMES.indexOf(element)
              if (element.name === editedIncome.oldName) {
                context.INCOMES[indexofElement].name = editedIncome.name
                context.INCOMES[indexofElement].category = editedIncome.category
                context.INCOMES[indexofElement].amount = editedIncome.amount
              }
            })
      },
      editExpense(context, editedExpense) {
        context.EXPENSES.forEach(
            function(element) {
              const indexofElement = context.EXPENSES.indexOf(element)
              if (element.name === editedExpense.oldName) {
                context.EXPENSES[indexofElement].name = editedExpense.name
                context.EXPENSES[indexofElement].category =
                editedExpense.category
                context.EXPENSES[indexofElement].amount = editedExpense.amount
              }
            })
      },
      editAccount(context, accountName, editedAccount) {
        context.ACCOUNTS.forEach(
            function(element) {
              const indexofElement = context.ACCOUNTS.indexOf(element)
              if (element.name === accountName) {
                context.ACCOUNTS[indexofElement].name = editedAccount.name
                context.ACCOUNTS[indexofElement].description =
                editedAccount.description
              }
            })
      },
      deleteIncome(context, incomeName) {
        context.INCOMES.forEach(
            function(element) {
              const indexofElement = context.INCOME_CATEGORIES.indexOf(element)
              if (element.name === incomeName) {
                context.INCOMES.splice(indexofElement, 1)
              }
            }
        )
      },
      deleteExpense(context, expenseName) {
        context.EXPENSES.forEach(
            function(element) {
              const indexofElement = context.EXPENSES.indexOf(element)
              if (element.name === expenseName) {
                context.EXPENSES.splice(indexofElement, 1)
              }
            }
        )
      },
      deleteIncomeCategory(context, categoryName) {
        context.INCOME_CATEGORIES.forEach(
            function(element) {
              const indexofElement = context.INCOME_CATEGORIES.indexOf(element)
              if (element.name === categoryName) {
                context.INCOME_CATEGORIES.splice(indexofElement, 1)
              }
            }
        )
      },
      deleteExpenseCategory(context, categoryName) {
        context.EXPENSE_CATEGORIES.forEach(
            function(element) {
              const indexofElement = context.EXPENSE_CATEGORIES.indexOf(element)
              if (element.name === categoryName) {
                context.EXPENSE_CATEGORIES.splice(indexofElement, 1)
              }
            }
        )
      },
      saveAllData() {
        window.localStorage.clear()
        window.localStorage.setItem('storage', JSON.stringify(state))
        console.log(window.localStorage.length)
      },
      eraseAllData() {
        window.localStorage.clear()
      },
      increment() {
        state.count = state.count + 1
      },
    }
    actions =
      {
        setCurrentAccount(context, currentAccount) {
          context.commit('setCurrentAccount', currentAccount)
        },
        addAccount(context, newAccount) {
          context.commit('addAccount', newAccount)
        },

        deleteAccount(context, accountName) {
          context.commit('deleteAccount', accountName)
        },
        addIncomeCategory(context, newCategory) {
          context.commit('addIncomeCategory', newCategory)
        },
        addExpenseCategory(context, newCategory) {
          context.commit('addExpenseCategory', newCategory)
        },
        addIncome(context, newIncome) {
          context.commit('addIncome', newIncome)
        },
        addExpense(context, newExpense) {
          context.commit('addExpense', newExpense)
        },
        editIncome(context, editedIncome) {
          context.commit('editIncome', editedIncome)
        },
        editExpense(context, editedExpense) {
          context.commit('editExpense', editedExpense)
        },
        editAccount(context, accountName, editedAccount) {
          context.commit('editAccount', accountName, editedAccount)
        },
        deleteIncome(context, incomeName) {
          context.commit('deleteIncome', incomeName)
        },
        deleteExpense(context, expenseName) {
          context.commit('deleteExpense', expenseName)
        },
        deleteIncomeCategory(context, categoryName) {
          context.commit('deleteIncomeCategory', categoryName)
        },
        deleteExpenseCategory(context, categoryName) {
          context.commit('deleteExpenseCategory', categoryName)
        },
        saveAllData() {
          mutations.saveAllData()
        },
        eraseAllData() {
          mutations.eraseAllData()
        },
      }
    state = {
      ACCOUNTS: [],
      EXPENSE_CATEGORIES: [{ name: 'Add...' }, { name: 'Expenses' },
        { name: 'Transference' }, { name: 'Other' }],
      INCOME_CATEGORIES: [{ name: 'Add...' }, { name: 'Salary' },
        { name: 'Other' }],
      INCOMES: [],
      EXPENSES: [],
      CURRENT_ITEM: { name: '' },
      CURRENT_ACCOUNT: {},
      count: 0,
    }

    store = new Vuex.Store({
      actions, state, mutations,
    })
    wrapper = shallowMount(reportes, { store, localVue })
  })
  it('buttons add, edit, delete in Ingresos', () => {
    const buttonArray = wrapper.findAll('b-button')
    const firstButton = buttonArray.at(0)
    const secondButton = buttonArray.at(1)
    const thirdButton = buttonArray.at(2)
    expect(buttonArray.length).to.equal(6)
    expect(firstButton.text()).to.equal('Add')
    expect(secondButton.text()).to.equal('Edit')
    expect(thirdButton.text()).to.equal('Delete')
  })

  it('Table has 4 columns: name, category, amount, date', () => {
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

  it('Ensure that there is no data', () => {
    const itemArray = wrapper.vm.items
    expect(itemArray.length).to.equal(0)
  })
})

