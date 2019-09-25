<template>
  <div>
    <h1>aa</h1>
    <div v-for="(item,index) in users" :key="index">
      <div class="c2">
        <p class="line2-limit-length">{{item.id}}</p>
        <p style="text-align: left;" class="line6-limit-length">{{item.name}}</p>
      </div>
    </div>
  </div>
</template>

<script>
  export default{
    data(){
      return {
        users:[]
      }
    },
    created(){
      this.getList()
    },
    methods: {
      getList:function() {
        this.postRequest('/user')
          .then(resp=> {
             resp.data.forEach(element => {
               this.users.push(element);
             })
            console.log(res);
        })
      }
    }
  }
</script>

<style scoped>

</style>
