<template>
  <el-form :model="user"
           :rules="rules"
           ref="userFrom"
           label-width="150px">
    <el-form-item label="姓名：" prop="userName">
      <el-input v-model="user.name"></el-input>
    </el-form-item>
    <!--<el-form-item label="上级分类：">-->
    <!--<el-select v-model="productCate.parentCategory"-->
    <!--placeholder="请选择分类">-->
    <!--<el-option-->
    <!--v-for="item in selectProductCateList"-->
    <!--:key="item.id"-->
    <!--:label="item.categoryName"-->
    <!--:value="item.id">-->
    <!--</el-option>-->
    <!--</el-select>-->
    <!--</el-form-item>-->
    <!--<el-form-item label="分类描述：" prop="categoryDesc">-->
    <!--<el-input v-model="productCate.categoryDesc"></el-input>-->
    <!--</el-form-item>-->
    <!--  <el-form-item label="父级分支：">
       <el-input v-model="productCate.parentCategory"></el-input>
     </el-form-item> -->
    <!--  <el-form-item label="是否显示：">
       <el-radio-group v-model="productCate.showStatus">
         <el-radio :label="1">是</el-radio>
         <el-radio :label="0">否</el-radio>
       </el-radio-group>
     </el-form-item>
     <el-form-item label="是否显示在导航栏：">
       <el-radio-group v-model="productCate.navStatus">
         <el-radio :label="1">是</el-radio>
         <el-radio :label="0">否</el-radio>
       </el-radio-group>
     </el-form-item>
     <el-form-item label="分类图标：">
       <single-upload v-model="productCate.icon"></single-upload>
     </el-form-item>
     <el-form-item v-for="(filterProductAttr, index) in filterProductAttrList"
                   :label="index | filterLabelFilter"
                   :key="filterProductAttr.key"
     >
       <el-cascader
         clearable
         v-model="filterProductAttr.value"
         :options="filterAttrs">
       </el-cascader>
       <el-button style="margin-left: 20px" @click.prevent="removeFilterAttr(filterProductAttr)">删除</el-button>
     </el-form-item>
     <el-form-item>
       <el-button size="small" type="primary" @click="handleAddFilterAttr()">新增</el-button>
     </el-form-item>
     <el-form-item label="关键词：">
       <el-input v-model="productCate.keywords"></el-input>
     </el-form-item>
     <el-form-item label="分类描述：">
       <el-input type="textarea" :autosize="true" v-model="productCate.description"></el-input>
     </el-form-item> -->
    <el-form-item>
      <el-button type="primary" @click="onSubmit('userFrom')">提交</el-button>
      <el-button v-if="!isEdit" @click="resetForm('userFrom')">重置</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import {getUser, updateUser, saveUser} from '@/api/user'

const defaultUser = {
  id: '',
  name: '',
}
export default {
  props: {
    isEdit: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      user: Object.assign({}, defaultUser),
    }
  },
  created () {
    if (this.isEdit) {
      getUser(this.$route.query.id).then(response => {
        this.user = response.data
      })
    }
  },
  methods: {
    onSubmit (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$confirm('是否提交数据', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            if (this.isEdit) {
              updateUser(this.user).then(response => {
                this.$refs[formName].resetFields()
                this.$message({
                  message: '修改成功',
                  type: 'success',
                  duration: 1000
                })
                this.$router.back()
              })
            } else {
              saveUser(this.user).then(response => {
                this.$refs[formName].resetFields()
                this.$message({
                  message: '提交成功',
                  type: 'success',
                  duration: 1000
                })
                this.$router.back()
              })
            }
          })
        } else {
          this.$message({
            message: '验证失败',
            type: 'error',
            duration: 1000
          })
          return false
        }
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
      this.user = Object.assign({}, defaultUser)
    },
  }
}
</script>

<style scoped>

</style>
