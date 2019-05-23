<template>
<div>
    <h2>Cuenta General</h2>

            <div class="row">
        <h3 style = "margin-left:11%; font-size:1em">Filtrar por fecha</h3>
        <select id='dateFilter' value=''
        style = "margin-left:6%" v-model="currentDate">
            <option
              v-for="date in dates"
              :key="date"
            >{{date}}</option>
        </select>
      </div>

  <div class="col-lg-12">

        <div class="row">
          <h3 style="margin-left:10%;
          font-size:1em">Filtrar por categoria: </h3>
          <select id='incomeFilter' value='' style="margin-left:4%"
          v-model="currentIncomeCategory">
            <option
              v-for="category in Income_categories"
              :key="category.name"
              :value="category.name"
            >{{category.name}}</option>
          </select>
        </div>

    <div class="row">
          <h3 style="margin-left:60%; margin-top:-2%;
          font-size:1em">Filtrar por categoria: </h3>
          <select id='expenseFilter' value=''
          style="margin-left:75%; margin-top:-2%"
          v-model="currentExpenseCategory">
            <option
              v-for="category in Expense_categories"
              :key="category.name"
              :value="category.name"
            >{{category.name}}</option>
          </select>
        </div>

  </div>

        <b-table
          id = "table"
          selectable
          striped
          hover
          @row-selected="rowSelected"
          :items="items"
          :fields="fields"

        ></b-table>


</div>

</template>

<script>
export default {

  data() {
    return {
      fields: ['name', 'category', 'amount', 'date', 'account'],
      currentIncomeCategory: 'All',
      currentExpenseCategory: 'All',
    }
  },

  computed: {

    items: function() {
      const objects = []


      if (this.currentIncomeCategory === 'All') {
        for (const element of this.$store.state.INCOMES) {
          objects.push(element)
        }
      } else if (this.currentDate !== '') {
        for (const element of this.$store.state.INCOMES) {
          if (this.currentDate === element.date) {
            objects.push(element)
          }
        }
        /* eslint-disable */
        this.currentDate = ''
        this.currentIncomeCategory = 'All'
        /* eslint-enable */
      } else {
        for (const element of this.$store.state.INCOMES) {
          if (this.currentIncomeCategory === element.category) {
            objects.push(element)
          }
        }
      }


      if (this.currentExpenseCategory === 'All') {
        for (const element of this.$store.state.EXPENSES) {
          objects.push(element)
        }
      } else if (this.currentDate !== '') {
        for (const element of this.$store.state.EXPENSES) {
          if (this.currentDate === element.date) {
            objects.push(element)
          }
        }
        /* eslint-disable */
        this.currentDate = ''
        this.currentExpenseCategory = 'All'
        /* eslint-enable */
      } else {
        for (const element of this.$store.state.EXPENSES) {
          if (this.currentExpenseCategory === element.category) {
            objects.push(element)
          }
        }
      }

      return objects
    },
    Income_categories: function() {
      const auxArray = [...this.$store.state.INCOME_CATEGORIES]
      auxArray.shift()
      auxArray.unshift({ name: 'All' })
      auxArray.unshift({ name: 'None' })
      return auxArray
    },
    Expense_categories: function() {
      const auxArray = [...this.$store.state.EXPENSE_CATEGORIES]
      auxArray.shift()
      auxArray.unshift({ name: 'All' })
      auxArray.unshift({ name: 'None' })
      return auxArray
    },

    dates: function() {
      return this.$store.state.DATES
    },

  },
}
</script>

<style>

#table{

}

</style>

