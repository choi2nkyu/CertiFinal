<template>
<div>
    <h2>Cuenta General</h2>
        <b-table
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
    
    data(){
        return {
         fields: ['name', 'category', 'amount', 'date', 'account'],
        }
    },

    computed: {

    items: function() {
      const objects = []


        for (const element of this.$store.state.INCOMES) {
          objects.push(element)
        }
        return objects
 
    }
    
    }


}
</script>
