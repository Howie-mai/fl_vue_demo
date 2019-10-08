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
import {fetchList} from '@/api/user'

export default {
  data () {
    return {
      users: [],
      listQuery: {
        pageNum: 1,
        pageSize: 5,
        keywords: null
      },
    }
  },
  created () {
    // this.getList()
    this.getListt()
  },
  methods: {
    getList: function () {
      this.postRequest('http://localhost:8088/user/list')
        .then(resp => {
          resp.data.forEach(element => {
            this.users.push(element)
          })
          console.log(resp.data)
        })
    },
    getListt () {
      fetchList(this.listQuery).then(resp => {
        resp.data.forEach(element => {
          this.users.push(element)
        })
        console.log(resp)
      })
    }
  },
}
</script>

<style scoped>

</style>
