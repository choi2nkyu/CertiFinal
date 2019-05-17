<template>
  <div class="SaveButton">

      <v-btn  @click="saveAllData"  color="green" >Save All</v-btn>
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

