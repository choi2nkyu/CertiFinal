<template>
  <div class="home">
    <Account msg="Create an Account"/>
  </div>
</template>

<script>
// @ is an alias to /src
import Account from '@/components/Account.vue'

export default {
  name: 'home',
  components: {
    Account,
  },
}
</script>

<style scoped>
</style>
