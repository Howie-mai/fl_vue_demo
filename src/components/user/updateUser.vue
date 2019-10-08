<template> 
  <user-detail :isEdit="true"></user-detail>
</template>
<script>
import UserDetail from './view/UserDetail'

export default {
  name: 'updateUser',
  components: {UserDetail}
}
</script>
<style scoped>
</style>


