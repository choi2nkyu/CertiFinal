<template>
  <div class="EditIncome">
    <IncExpForm formType = "Income" edit = "True" />
  </div>
</template>
<script>
// @ is an alias to /src
import IncExpForm from '@/components/IncExpForm.vue'
export default {
  name: 'EditIncome',
  components: {
    IncExpForm,
  },
}
</script>
