<template> 
  <user-detail :isEdit="false"></user-detail>
</template>
<script>
import UserDetail from './view/UserDetail'

export default {
  name: 'addUser',
  components: {UserDetail}
}
</script>
<style scoped>
</style>


