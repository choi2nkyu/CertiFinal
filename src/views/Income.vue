<template>
  <div class="Income">
    <IncExpForm formType = "Income"/>
  </div>
</template>
<script>
// @ is an alias to /src
import IncExpForm from '@/components/IncExpForm.vue'

export default {
  name: 'Income',
  components: {
    IncExpForm,
  },
}
</script>
