import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Income from './views/Income.vue'
import Expense from './views/Expense.vue'
import Reportes from './views/reportes.vue'
import EditExpense from './views/EditExpense.vue'
import EditIncome from './views/EditIncome.vue'
import GeneralAccount from './views/GeneralAccount.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/reportes',
      name: 'reportes',
      component: Reportes,
    },
    {
      path: '/income',
      name: 'income',
      component: Income,
    },
    {
      path: '/expense',
      name: 'expense',
      component: Expense,
    },
    {
      path: '/editincome',
      name: 'editincome',
      component: EditIncome,
    },
    {
      path: '/editexpense',
      name: 'editexpense',
      component: EditExpense,
    },
    {
      path: '/generalAccount',
      name: 'generalAccount',
      component: GeneralAccount
    }
  ],
})
