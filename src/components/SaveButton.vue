<template>
  <div class="SaveButton">

      <button id="saveButton" @click="saveAllData"  >Save All</button>
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

  },


}
</script>
<style scoped>

  #saveButton{

  background-color: #4CAF50; /* Green */
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

</style>




