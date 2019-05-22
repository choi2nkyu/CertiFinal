<template>
  <div class="IncExpForm">
    <SaveButton/>
    <div class="col-lg-5">
      <div
        class="alert alert-danger"
        role="alert"
        v-if="showFormAlert"
      >Please fill in all formfields.</div>
      <button type="button" class="btn btn-outline-secondary" @click="navigate">Back</button>
      <form>
        <div class="form-group">
          <label for="Name" id="lblName">{{formType}} Name</label>
          <input type="text" class="form-control" v-model="currentName" id="Name">
          <label for="Category" id="lblCategory">{{formType}} Category</label>
          <select class="form-control" v-model="currentCategory" id="Category">
            <option
              v-for="category in categories"
              :key="category.name"
              :value="category.name"
            >{{category.name}}</option>
          </select>
          <button
            type="button"
            class="btn btn-primary"
            @click="deleteCategory"
            id="deleteButton"
          >Delete Selected Category</button>
          <br>
          <label for="newCategoryName" v-if="categoryBool">New Category Name</label>
          <input
            type="text"
            class="form-control"
            v-if="categoryBool"
            v-model="newCategoryName"
            id="newCategoryName"
          >
          <button
            type="button"
            class="btn btn-primary"
            v-if="categoryBool"
            @click="saveCategory"
          >Create Category</button>
          <br>
          <label for="destinationAccount" v-if="transferenceBool">Account to Transfer Amount</label>
          <select class="form-control" v-model="destinationAccount" v-if="transferenceBool" id="destinationAccount">
            <option
              v-for="account in accounts"
              :key="account.name"
              :value="account.name"
            >{{account.name}}</option>
          </select>
          <br>
          <label for="Amount" id="lblAmount">{{formType}} Amount</label>
          <input type="number" class="form-control" v-model="currentAmount" id="Amount">
        </div>
      </form>
    </div>
    <div class="col-lg-5">
      <button type="button" class="btn btn-primary" @click="saveReg" v-if ="!edit" >Create</button>
      <button type="button" class="btn btn-primary" @click="saveReg" v-if ="edit">Edit</button>
    </div>
  </div>
</template>

<script>
import SaveButton from '@/components/SaveButton.vue'
export default {
  name: 'IncExpForm',
  components:{SaveButton},
  data() {
    return {
      currentName: this.$store.state.CURRENT_ITEM.name,
      oldName: this.$store.state.CURRENT_ITEM.name,
      currentCategory: this.$store.state.CURRENT_ITEM.category,
      currentAmount: this.$store.state.CURRENT_ITEM.amount,
      currentAccount: this.$store.state.CURRENT_ACCOUNT.name,
      newCategoryName: '',
      destinationAccount: '',
      showFormAlert: false
    }
  },
  props: {
    formType: String,
    edit: String,
  },
  computed: {
    accounts: function() {
      return this.$store.state.ACCOUNTS
    },
    categories: function() {
      if (this.formType === 'Income') {
        return this.$store.state.INCOME_CATEGORIES
      } else {
        return this.$store.state.EXPENSE_CATEGORIES
      }
    },
    categoryBool: function() {
      if (this.currentCategory === 'Add...') {
        return true
      } else {
        return false
      }
    },
    transferenceBool: function() {
      if (this.currentCategory === 'Transference' && this.formType === 'Expense') {
        return true
      } else {
        return false
      }
    },
  },
  methods: {
    saveReg() {
      if (this.edit === 'True') {
        if (this.currentName && this.currentCategory && this.currentAmount) {
          this.showFormAlert = false
          console.log('estoy')
          const formObject = {
            oldName: this.oldName,
            name: this.currentName,
            category: this.currentCategory,
            amount: this.currentAmount,
          }
          console.log(this.oldName)
          this.$store.dispatch('edit' + this.formType, formObject)
          this.navigate()  
        } else {
          this.showFormAlert = true
        }
      } else {
        if (this.currentName && this.currentCategory && this.currentAmount) {
          this.showFormAlert = false
          let today = new Date()
          const dd = String(today.getDate()).padStart(2, '0')
          const mm = String(today.getMonth() + 1).padStart(2, '0') // January is 0!
          const yyyy = today.getFullYear()

          today = dd + '/' + mm + '/' + yyyy

        const formObject = {
          name: this.currentName,
          category: this.currentCategory,
          amount: this.currentAmount,
          account: this.currentAccount,
          date: today,
          _rowVariant: this.formType=='Income'?'success':'danger'       

        }

        if(this.updateAccountBalance()){
          if(this.currentName != "" && this.currentCategory != "" && this.currentAmount != "")
          {
              this.$store.dispatch('add' + this.formType, formObject)
              this.$store.dispatch('saveDate', today)
          }
          else {
            alert("Los 3 campos deben tener un valor")
          }
        }
          const formObject = {
            name: this.currentName,
            category: this.currentCategory,
            amount: this.currentAmount,
            account: this.currentAccount,
            date: today,
          }
          this.$store.dispatch('addIncome', formObject)
        }

      }
    },
    saveCategory() {
      this.$store.dispatch('add' + this.formType + 'Category', {
        name: this.newCategoryName,
      })
    },
    deleteCategory() {
      this.$store.dispatch(
          'delete' + this.formType + 'Category',
          this.currentCategory
      )
    },
    deleteForm() {
      this.$store.dispatch('delete' + this.formType, this.currentName)
    },
    navigate() {
      this.$router.push('reportes')
    },
    updateAccountBalance(){
      for(var account of this.$store.state.ACCOUNTS){
          if(account.name==this.currentAccount){              
              var newBalanceAddition = Number.parseInt(account.balance)+Number.parseInt(this.currentAmount);
              var newBalanceSubstraction = Number.parseInt(account.balance)-Number.parseInt(this.currentAmount);
              if(this.formType=='Income'){                
                account.balance = newBalanceAddition;
                return true;
              }
              else if(this.formType=='Expense' && newBalanceSubstraction>=0){
                account.balance = newBalanceSubstraction;
                return true;
                }              
              else{
                alert("There is not enough money in the account to create this expense")
                return false;              
              }
          }
      }
    }
  },
}
</script>
<style scoped>
.leftColumn {
  margin: 20px 20px;
}
</style>
