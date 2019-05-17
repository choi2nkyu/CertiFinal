
<template>
  <div class="Expense">
    <IncExpForm formType = "Expense"/>
  </div>
</template>
<script>
// @ is an alias to /src
import IncExpForm from '@/components/IncExpForm.vue'

export default {
  name: 'Expense',
  components: {
    IncExpForm,
  },
}
</script>
