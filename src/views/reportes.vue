<template>
  <div>
    <SaveButton/>
    <h2>SALDO:</h2>
    <label id=lblSaldo> {{balance}} </label>
    <h1>Reportes</h1>
    <div class="alert alert-danger" role="alert"
    v-if="showGridAlert">Please only select one grid.</div>
    <div class="row">
      <div class="col-lg-6">

        <div class="row">
        <h3 style = "margin-left:7%; font-size:1em">Filtrar por fecha</h3>
        <select value=''  style = "margin-left:14%" v-model="currentDate">
            <option
              v-for="date in dates"
              :key="date"
            >{{date}}</option>
        </select>
      </div>


        <div class="row">
          <h3 style="margin-left:7%; font-size:1em">Filtrar por categoria</h3>
          <select value='' style="margin-left:10%"
          v-model="currentIncomeCategory">
            <option
              v-for="category in Income_categories"
              :key="category.name"
              :value="category.name"
            >{{category.name}}</option>
          </select>
        </div>

        <h2>Ingresos</h2>
        <b-table
          selectable
          striped
          hover
          @row-selected="rowSelected"
          :items="items"
          :fields="fields"
        ></b-table>
        <div>
          <b-button
            variant="outline-primary"
            style="margin-left: 10px"
            @click="navigateToIncome"
            id = "buttonAddIncome"
          >Add</b-button>
          <b-button
            variant="outline-primary"
            style="margin-left: 10px"
            @click="navigateToEditIncome"
          >Edit</b-button>
          <b-button variant="outline-danger" style="margin-left: 10px"
          @click="deleteIncome">Delete</b-button>
        </div>
      </div>
      <div class="col-lg-6">
        <div class="row">
          <h3 style="margin-left:7%; font-size:1em">Filtrar por categoria</h3>
          <select value='' style="margin-left:10%"
          v-model="currentExpenseCategory">
            <option
              v-for="category in Expense_categories"
              :key="category.name"
              :value="category.name"
            >{{category.name}}</option>
          </select>
        </div>

        <h2>Egresos</h2>
        <b-table
          selectable
          striped
          hover
          @row-selected="rowSelected"
          :items="items2"
          :fields="fields"
        ></b-table>

        <div>
          <b-button
            variant="outline-primary"
            style="margin-left: 10px"
            @click="navigateToExpense"
            id="buttonAddOutcome"
          >Add</b-button>
          <b-button
            variant="outline-primary"
            style="margin-left: 10px"
            @click="navigateToEditExpense"
          >Edit</b-button>
          <b-button variant="outline-danger" style="margin-left: 10px"
          @click="deleteExpense">Delete</b-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { truncate } from 'fs';
import SaveButton from '@/components/SaveButton.vue';
export default {
  components:{SaveButton},
  data() {
    return {
      fields: ['name', 'category', 'amount', 'date'],
      currentIncomeCategory: 'All',
      currentExpenseCategory: 'All',
      currentDate: '',
      selected: [],
      showGridAlert: false,
    }
  },
  methods: {
    deleteIncome() {
      if(this.selected[0].category === "Transference"){
      this.$store.dispatch('deleteTransference', this.selected[0].name)
      }
      else{                
        let itemToDelete
        itemToDelete = {
          name:this.selected[0].name,
          account:this.$store.state.CURRENT_ACCOUNT.name
        }

        this.$store.dispatch('deleteIncome', itemToDelete)
      }
    },
    deleteExpense() {
      if(this.selected[0].category === "Transference"){
      this.$store.dispatch('deleteTransference', this.selected[0].name)
      }
      else{        
        let itemToDelete
        itemToDelete = {
          name:this.selected[0].name,
          account:this.$store.state.CURRENT_ACCOUNT.name
        }
        this.$store.dispatch('deleteExpense', itemToDelete)
      }      
    },
    navigateToIncome() {
      this.$router.push('income')
    },
    navigateToExpense() {
      this.$router.push('expense')
    },
    navigateToEditExpense() {
      if(this.selected.length === 1) {
        this.showGridAlert = false
        this.$store.state.CURRENT_ITEM = this.selected[0]
        this.$router.push('editexpense') 
      } else {
        this.showGridAlert = true
      }
    },
    navigateToEditIncome() {
      if(this.selected.length === 1) {
        this.showGridAlert = false
        this.$store.state.CURRENT_ITEM = this.selected[0]
        this.$router.push('editincome') 
      } else {
        this.showGridAlert = true
      }
    },
    filterByCategories() {
      let auxItems
    },
    rowSelected(items) {
      this.selected = items
      if (items.length === 1) {
        this.showGridAlert = false
      } else {
        this.showGridAlert = true
      }
    },
  },
  computed: {

    items: function() {
      const objects = []


      if (this.currentIncomeCategory==='All') {
        for (const element of this.$store.state.INCOMES) {
          if (this.$store.state.CURRENT_ACCOUNT.name ===
          element.account) {objects.push(element)}
        }
        return objects
      } else if (this.currentDate !== '') {
        for (const element of this.$store.state.INCOMES) {
          if (this.currentDate === element.date) {objects.push(element)}
        }
        this.currentDate='';
        this.currentIncomeCategory='All';
        return objects
      } else {
        for (const element of this.$store.state.INCOMES) {
          if (this.currentIncomeCategory === element.category &&
          this.$store.state.CURRENT_ACCOUNT.name === element.account) {
            objects.push(element)
          }
        }
        return objects
      }
    },


    items2: function() {
      const objects = []
      if (this.currentExpenseCategory==='All') {
        for (const element of this.$store.state.EXPENSES) {
          if (this.$store.state.CURRENT_ACCOUNT.name ===
          element.account) {objects.push(element)}
        }
        return objects
      } else if (this.currentDate !== '') {
        for (const element of this.$store.state.EXPENSES) {
          if (this.currentDate === element.date) {objects.push(element)}
        }
        this.currentDate='';
        this.currentExpenseCategory='All';
        return objects
      } else {
        for (const element of this.$store.state.EXPENSES) {
          if (this.currentExpenseCategory === element.category &&
          this.$store.state.CURRENT_ACCOUNT.name === element.account) {
            objects.push(element)
          }
        }
        return objects
      }
    },
    Income_categories: function() {
      var auxArray = [...this.$store.state.INCOME_CATEGORIES];
      auxArray.shift(); 
      auxArray.unshift({name: 'All'});
      return auxArray;
    },
    Expense_categories: function() {
      var auxArray = [...this.$store.state.EXPENSE_CATEGORIES];
      auxArray.shift(); 
      auxArray.unshift({name: 'All'});
      return auxArray;
    },

    dates: function() {
      return this.$store.state.DATES;
    },

    balance: function(){

      var currentBalance = 0;
        for (const element of this.$store.state.INCOMES) {
          if (this.$store.state.CURRENT_ACCOUNT.name == element.account) {
                currentBalance+=Number.parseInt(element.amount);
            }
        }

        for (const element of this.$store.state.EXPENSES) {
          if (this.$store.state.CURRENT_ACCOUNT.name == element.account) {
                currentBalance-=Number.parseInt(element.amount);
            }
        }

        for(var account of this.$store.state.ACCOUNTS){
          if(this.$store.state.CURRENT_ACCOUNT.name==account.name)
              account.balance = currentBalance

        }
        this.$store.state.balance = currentBalance;
        return currentBalance;
        
    }
  },
}
</script>
