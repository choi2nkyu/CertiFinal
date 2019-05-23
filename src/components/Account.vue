<template>
  <div class="account">
    <SaveButton/>
    <button id="generalAccount" @click="goToGeneralAccount" >General Account</button>

    <h1>{{ msg }}</h1>
    <div class="container row">
      <div class="col-5 left-column">
        <div
          class="alert alert-danger"
          role="alert"
          v-if="showInputAlert"
        >Please fill in all the data.</div>
        <form>
          <div v-for="field in fields" v-bind:key="field.id" class="form-group">
            <label for="field.value">{{field.label}}</label>
            <input ref="accountInput" type="text" class="form-control" :id="field.value">
          </div>
        </form>
        <button
          type="button"
          class="btn btn-outline-primary"
          @click="addClicked()"
          v-if="!changeButton"
          id = "buttonAdd"
        >Add</button>
        <button
          type="button"
          class="btn btn-outline-primary"
          @click="confirmClicked()"
          v-if="changeButton"
        >Confirm</button>
      </div>
      <div class="col-5 right-column">
        <div
          class="alert alert-danger"
          role="alert"
          v-if="showGridAlert"
        >Please only select one grid.</div>
        <button type="button" class="btn btn-outline-primary" @click="editClicked()">Edit</button>
        <button type="button" class="btn btn-outline-danger" @click="deleteClicked()">Delete</button>
        <b-table
          selectable
          hover
          striped
          :items="refreshAccount"
          :fields="fields.value"
          @row-selected="rowSelected"
        ></b-table>
        <button
          type="button"
          class="btn btn-primary"
          v-if="showDetailButton"
          @click="navigate"
          id = "buttonDetail"
        >Detail</button>
      </div>
    </div>
  </div>
</template>

<script>
import { constants } from 'fs'
import SaveButton from '@/components/SaveButton.vue';
export default {
  name: 'Account',
  components :{ SaveButton},
  props: {
    msg: String,
  },
  /* mounted() {
    this.accountArray = this.$store.state.ACCOUNTS;
  },*/
  data() {
    return {
      fields: [
        {
          id: 1,
          label: 'Account Name',
          value: 'name',
        },
        {
          id: 2,
          label: 'Description',
          value: 'description',
        },
      ],
      accountArray: [],
      selected: [],
      showDetailButton: false,
      currentName: '',
      currentDescription: '',
      currentId: 0,
      currentBalance: 0,
      showInputAlert: false,
      showGridAlert: false,
      changeButton: false,
    }
  },
  computed: {
    refreshAccount() {
      return this.$store.state.ACCOUNTS
    },
  },
  methods: {
    add(object) {
      this.accountArray.push(object)
      this.currentName = object.name
      this.currentDescription = object.description
      this.currentBalance = object.balance
    },
    addClicked() {
      if (
        this.$refs.accountInput[0].value &&
        this.$refs.accountInput[1].value
      ) {
        this.showInputAlert = false
        const object = {
          id: this.currentId++,
          name: this.$refs.accountInput[0].value,
          description: this.$refs.accountInput[1].value,
          balance: this.currentBalance
        }
        this.add(object)
        this.addAccountToStore()
        this.$refs.accountInput.forEach((element) => {
          element.value = ""
        })
      } else {
        this.showInputAlert = true
      }
    },
    addAccountToStore() {
      this.$store.dispatch('addAccount', {
        id: this.currentId++,
        name: this.currentName,
        description: this.currentDescription,
        balance: this.currentBalance
      })
    },
    rowSelected(items) {
      this.selected = items
      if (items.length == 1) {
        this.showDetailButton = true
      } else {
        this.showDetailButton = false
      }
    },
    editClicked() {
     
      if (this.selected.length == 1) {
        this.showGridAlert = false
        this.changeButton = true
        this.$refs.accountInput[0].value = this.selected[0].name
        this.$refs.accountInput[1].value = this.selected[0].description
      } else {
        this.showGridAlert = true
        this.changeButton = false
      }
    },
    deleteClicked() {      
      if (this.selected.length == 1) {
        this.showGridAlert = false
        this.$store.dispatch('deleteAccount', this.selected[0].name)
      } else {
        this.showGridAlert = true
      }
    },
    confirmClicked() {
      this.changeButton = false
      this.$store.state.ACCOUNTS.forEach((element) => {
        if (element.id == this.selected[0].id) {
          element.name = this.$refs.accountInput[0].value
          element.description = this.$refs.accountInput[1].value
        }
      })
      this.$refs.accountInput.forEach((element) => {
        element.value = ""
      })
    },
    navigate() {
      if (this.selected.length == 1) {
        this.$router.push('reportes')
        this.showGridAlert = false
        this.$store.state.CURRENT_ACCOUNT = this.selected[0]
        console.log(this.$store.state.CURRENT_ACCOUNT)
      } else {
        this.showGridAlert = true
      }
    },

    goToGeneralAccount(){
      this.$router.push('generalAccount')

    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

#generalAccount{
  background-color: #008CBA; /* Green */
  border: none;
  color: white;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;

    position: absolute;
    right: 83%;
    top:5%;
  
}

.left-column {
  margin: 20px 20px;
}
.right-column {
  margin: 20px 20px;
}
</style>
