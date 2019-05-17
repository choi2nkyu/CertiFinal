<template>
  <div class="EditExpense">
    <IncExpForm formType = "Expense" edit = "True" />
  </div>
</template>
<script>
// @ is an alias to /src
import IncExpForm from '@/components/IncExpForm.vue'

export default {
  name: 'EditExpense',
  components: {
    IncExpForm,
  },
}
</script>
