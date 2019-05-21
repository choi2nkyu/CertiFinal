<template>
  <div class="SaveButton">

      <button id="saveButton" @click="saveAllData"  >Save All</button>
      <button id="deleteData" @click="deleteStorage"  >Delete Storage</button>

    </div>
</template>

<script>
export default {
  name: 'SaveButton',

  methods: {

    saveAllData() {
      window.localStorage.clear()
      console.log(window.localStorage.length)
      this.$store.dispatch('saveAllData')
      console.log(window.localStorage.length)
    },

    deleteStorage(){
      window.localStorage.clear();

    }

  },


}
</script>
<style scoped>

  #saveButton{

  background-color: #4CAF50; /* Green */
  width: 150px;
  height: 50px;
  border: none;
  color: white;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;

    position: absolute;
    right: 5%;
    top:5%;
  }

  #deleteData{

  background-color: #f44336; /* Green */
  width: 150px;
  height: 70px;
  border: none;
  color: white;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;

    position: absolute;
    right: 5%;
    top:15%;
  }
  

</style>




