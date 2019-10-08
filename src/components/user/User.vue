<template>
  <div class="app-container">
    <!--<el-card class="filter-container" shadow="never">-->
    <!--<div>-->
    <!--<i class="el-icon-search"></i>-->
    <!--<span>筛选搜索</span>-->
    <!--<el-button-->
    <!--style="float:right"-->
    <!--type="primary"-->
    <!--@click="handleSearchList()"-->
    <!--size="small">-->
    <!--查询搜索-->
    <!--</el-button>-->
    <!--<el-button-->
    <!--style="float:right;margin-right: 15px"-->
    <!--@click="handleResetSearch()"-->
    <!--size="small">-->
    <!--重置-->
    <!--</el-button>-->
    <!--</div>-->
    <!--<div style="margin-top: 15px">-->
    <!--<el-form :inline="true" :model="listQuery" size="small" label-width="140px">-->
    <!--<el-form-item label="商家名称：">-->
    <!--<el-input v-model="listQuery.keywords" class="input-width" placeholder="分支名称"></el-input>-->
    <!--</el-form-item>-->
    <!--</el-form-item>-->
    <!--&lt;!&ndash;  <el-form-item label="优惠券类型：">-->
    <!--<el-select v-model="listQuery.couponType" placeholder="全部" clearable class="input-width">-->
    <!--<el-option v-for="(item,key) in typeOptions"-->
    <!--:key="key"-->
    <!--:label="item"-->
    <!--:value="key">-->
    <!--</el-option>-->
    <!--</el-select>-->
    <!--</el-form-item> &ndash;&gt;-->
    <!--</el-form>-->
    <!--</div>-->
    <!--</el-card>-->
    <el-card class="operate-container" shadow="never">
      <i class="el-icon-tickets" style="margin-top: 5px"></i>
      <span style="margin-top: 5px">数据列表</span>
      <el-button
        class="btn-add"
        @click="handleAddProductCate()"
        size="mini">
        添加
      </el-button>
    </el-card>
    <div class="table-container">
      <el-table ref="productCateTable"
                style="width: 100%"
                :data="users"
                v-loading="listLoading" border>
        <el-table-column label="编号" width="100" align="center">
          <template slot-scope="scope">{{scope.row.id}}</template>
        </el-table-column>
        <el-table-column label="姓名" align="center">
          <template slot-scope="scope">{{scope.row.name}}</template>
        </el-table-column>
        <!--<el-table-column label="分类描述" width="100" align="center">-->
        <!--<template slot-scope="scope">{{scope.row.categoryDesc}}</template>-->
        <!--</el-table-column>-->
        <!--<el-table-column label="父级分支" width="100" align="center">-->
        <!--<template slot-scope="scope">{{scope.row.parentName }}</template>-->
        <!--</el-table-column>-->
        <!-- <el-table-column label="数量单位" width="100" align="center">
          <template slot-scope="scope">{{scope.row.productUnit }}</template>
        </el-table-column> -->
        <!-- <el-table-column label="导航栏" width="100" align="center">
          <template slot-scope="scope">
            <el-switch
              @change="handleNavStatusChange(scope.$index, scope.row)"
              :active-value="1"
              :inactive-value="0"
              v-model="scope.row.navStatus">
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column label="是否显示" width="100" align="center">
          <template slot-scope="scope">
            <el-switch
              @change="handleShowStatusChange(scope.$index, scope.row)"
              :active-value="1"
              :inactive-value="0"
              v-model="scope.row.showStatus">
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column label="排序" width="100" align="center">
          <template slot-scope="scope">{{scope.row.sort }}</template>
        </el-table-column> -->
        <!-- <el-table-column label="设置" width="200" align="center">
          <template slot-scope="scope">
            <el-button
              size="mini"
              :disabled="scope.row.level | disableNextLevel"
              @click="handleShowNextLevel(scope.$index, scope.row)">查看下级
            </el-button>
            <el-button
              size="mini"
              @click="handleTransferProduct(scope.$index, scope.row)">转移商品
            </el-button>
          </template>
        </el-table-column> -->
        <el-table-column label="操作" width="200" align="center">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleUpdate(scope.$index, scope.row)">编辑
            </el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)">删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="pagination-container">
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        layout="total,sizes,prev, pager, next,jumper"
        :page-sizes="[5,10,15]"
        :page-size="listQuery.pageSize"
        :current-page.sync="listQuery.pageNum"
        :total="total">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import {fetchList, delUser} from '@/api/user'

export default {
  data () {
    return {
      users: [],
      total: null,
      listLoading: true,
      listQuery: {
        pageNum: 1,
        pageSize: 5,
        keywords: null
      },
    }
  },
  created () {
    this.getList()
  },
  methods: {
    getList () {
      this.listLoading = true
      fetchList(this.listQuery).then(resp => {
        this.listLoading = false
        this.users = resp.data.list
        this.total = resp.data.total
        console.log(resp.data)
      })
    },
    handleCurrentChange (val) {
      this.listQuery.pageNum = val
      this.getList()
    },
    handleSizeChange (val) {
      this.listQuery.pageNum = 1
      this.listQuery.pageSize = val
      this.getList()
    },
    handleUpdate (index, row) {
      this.$router.push({path: '/updateUser', query: {id: row.id}})
    },
    handleAddProductCate () {
      this.$router.push('/addUser')
    },
    handleDelete (index, row) {
      this.$confirm('是否进行删除操作?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        delUser(row.id).then(response => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
          this.getList()
        })
      })
    },
  }
}
</script>

<style scoped>

</style>
