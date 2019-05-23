import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const state = {
  ACCOUNTS: [],
  EXPENSE_CATEGORIES: [{ name: 'Add...' },
    { name: 'Expenses' }, { name: 'Transference' }, { name: 'Other' }],
  INCOME_CATEGORIES: [{ name: 'Add...' },
    { name: 'Salary' }, { name: 'Other' }],
  INCOMES: [],
  EXPENSES: [],
  DATES: [],
  CURRENT_ITEM: { name: '' },
  CURRENT_ACCOUNT: {},
  count: 0,
  id: 0
}
export const mutations = {
  setCurrentAccount(context, currentAccount) {
    context.CURRENT_ACCOUNT = currentAccount
  },
  addAccount(context, newAccount) {
    let controlAccount = true;
    context.ACCOUNTS.forEach(
      function(element) {              
        if (element.name === newAccount.name) {
        controlAccount = false;        
        }
      })
      if(controlAccount){
    context.ACCOUNTS.push(newAccount)
      }
      else{
        alert("No puede ingresar cuentas con el mismo nombre")
      }
  },
  deleteAccount(context, accountName) {    
    let controlExpense = true;
    let controlIncome = true;
    context.EXPENSES.forEach(
      function(element) {              
        if (element.account === accountName) {
        controlExpense = false;        
        }
      })
      context.INCOMES.forEach(
        function(element) {              
          if (element.account === accountName) {
          controlIncome = false;        
          }
        })
      if(controlExpense && controlIncome){        
    context.ACCOUNTS.forEach(function(element) {
      const indexofElement = context.ACCOUNTS.indexOf(element)
      if (element.name === accountName) {
        context.ACCOUNTS.splice(indexofElement, 1)
      }
    })}
  },
  addIncomeCategory(context, newCategory) {
    context.INCOME_CATEGORIES.push(newCategory)
  },

  addExpenseCategory(context, newCategory) {
    context.EXPENSE_CATEGORIES.push(newCategory)
  },

  addExpense(context, newExpense) {
    let controlExpense = true;
    context.EXPENSES.forEach(
      function(element) {              
        if (element.name === newExpense.name && element.account === context.CURRENT_ACCOUNT.name) {
        controlExpense = false;        
        }
      })
      if(controlExpense){      
      context.EXPENSES.push(newExpense)
      }
      else{
        alert("No puede ingresar ingresos con el mismo nombre en la misma cuenta")
      }    
  },  
  addIncome(context, newIncome) {
    let controlIncome = true;
    context.INCOMES.forEach(
      function(element) {              
        if (element.name === newIncome.name && element.account === context.CURRENT_ACCOUNT.name) {
        controlIncome = false;        
        }
      })
      if(controlIncome){    
      context.INCOMES.push(newIncome)
      }
      else{
        alert("No puede ingresar egresos con el mismo nombre en la misma cuenta")
      }    
  },

  editIncome(context, editedIncome) {
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
            context.EXPENSES[indexofElement].category = editedExpense.category
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
  deleteTransference(context,transferenceName){
    context.INCOMES.forEach(
      function(element) {
        const indexofElement = context.INCOMES.indexOf(element)
        if (element.name === transferenceName) {
          context.INCOMES.splice(indexofElement, 1)
        }
      }
  )
  context.EXPENSES.forEach(
    function(element) {
      const indexofElement = context.EXPENSES.indexOf(element)
      if (element.name === transferenceName) {
        context.EXPENSES.splice(indexofElement, 1)
      }
    }
)
  },
  deleteIncome(context, incomeObject) {
    context.INCOMES.forEach(
        function(element) {
          const indexofElement = context.INCOMES.indexOf(element)
          if (element.name === incomeObject.name && element.account === incomeObject.account) {
            context.INCOMES.splice(indexofElement, 1)
          }
        }
    )
  },
  deleteExpense(context, expenseObject) {
    context.EXPENSES.forEach(
        function(element) {
          const indexofElement = context.EXPENSES.indexOf(element)
          if (element.name === expenseObject.name && element.account === expenseObject.account) {
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
    console.log(window.localStorage.length);

  },
  retrieveAllData(){

    state.ACCOUNTS = JSON.parse(window.localStorage.getItem('storage')).ACCOUNTS;
    state.EXPENSE_CATEGORIES = JSON.parse(window.localStorage.getItem('storage')).EXPENSE_CATEGORIES;
    state.INCOME_CATEGORIES = JSON.parse(window.localStorage.getItem('storage')).INCOME_CATEGORIES;
    state.INCOMES = JSON.parse(window.localStorage.getItem('storage')).INCOMES;
    state.EXPENSES = JSON.parse(window.localStorage.getItem('storage')).EXPENSES;
    state.DATES = JSON.parse(window.localStorage.getItem('storage')).DATES;
    state.CURRENT_ACCOUNT = JSON.parse(window.localStorage.getItem('storage')).CURRENT_ACCOUNT;
    state.CURRENT_ITEM = JSON.parse(window.localStorage.getItem('storage')).CURRENT_ITEM;
    
  },
  eraseAllData() {
    window.localStorage.clear()
  },
  increment() {
    state.count = state.count + 1
  },

  saveDate(context, date) {
    context.DATES.push(date)
  },

}
export const actions = {
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
  deleteTransference(context,transferenceName){
    context.commit('deleteTransference',transferenceName)
  },
  deleteIncome(context, incomeObject) {
    context.commit('deleteIncome', incomeObject)
  },
  deleteExpense(context, expenseObject) {
    context.commit('deleteExpense', expenseObject)
  },
  deleteIncomeCategory(context, categoryName) {
    context.commit('deleteIncomeCategory', categoryName)
  },
  deleteExpenseCategory(context, categoryName) {
    context.commit('deleteExpenseCategory', categoryName)
  },
  saveAllData() {
    mutations.saveAllData();
  },
  retrieveAllData(){
    mutations.retrieveAllData();
  },
  eraseAllData() {
    mutations.eraseAllData();
  },
  saveDate(context, date) {
    let condition = true
    for (const existingDate of this.state.DATES) {
      if (date === existingDate) {condition = false}
    }

    if (condition) {context.commit('saveDate', date)}
  },
}
export default new Vuex.Store({
  state,
  mutations,
  actions,
})
export const storeTest= new Vuex.Store({
  state,
  mutations,
  actions,
})
