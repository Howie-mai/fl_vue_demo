<template xmlns:v-bind="http://www.w3.org/1999/xhtml">
  <div>
    <el-container>
      <el-header style="padding: 0px;display:flex;justify-content:space-between;align-items: center">
        <div style="display: inline">
          <el-input
            @change="keywordsChange"
            @keyup.enter.native="searchEmp"
            clearable
            placeholder="通过员工名搜索员工,记得回车哦..."
            prefix-icon="el-icon-search"
            size="mini"
            style="width: 300px;margin: 0px;padding: 0px;"
            v-model="emp.name">
          </el-input>
          <el-button @click="searchEmp" icon="el-icon-search" size="mini" style="margin-left: 5px" type="primary">搜索
          </el-button>
          <el-button @click="showAdvanceSearchView" size="mini" slot="reference" style="margin-left: 5px"
                     type="primary"><i
            class="fa fa-lg" style="margin-right: 5px"
            v-bind:class="[advanceSearchViewVisible ? faangledoubleup:faangledoubledown]"></i>高级搜索
          </el-button>
        </div>
        <div style="margin-left: 5px;margin-right: 20px;display: inline">

          <el-upload
            :before-upload="beforeFileUpload"
            :disabled="fileUploadBtnText=='正在导入'"
            :on-error="fileUploadError"
            :on-success="fileUploadSuccess"
            :show-file-list="false" accept="application/vnd.ms-excel"
            action="/emp/importEmp" style="display: inline">
            <el-button :loading="fileUploadBtnText=='正在导入'" size="mini" type="success"><i class="fa fa-lg fa-level-up"
                                                                                          style="margin-right: 5px"></i>{{fileUploadBtnText}}
            </el-button>
          </el-upload>
          <el-button @click="exportEmps" size="mini" type="success"><i class="fa fa-lg fa-level-down"
                                                                       style="margin-right: 5px"></i>导出数据
          </el-button>
          <el-button @click="showAddEmpView" icon="el-icon-plus" size="mini"
                     type="primary">
            添加员工
          </el-button>
          <div style="font-size:10px;color: red"
               v-for="item in errorList">
            <div>{{item}}</div>
          </div>
        </div>
      </el-header>
      <el-main style="padding-left: 0px;padding-top: 0px">
        <div>
          <transition name="slide-fade">
            <div
              style="margin-bottom: 10px;border: 1px;border-radius: 5px;border-style: solid;padding: 5px 0px 5px 0px;box-sizing:border-box;border-color: #20a0ff"
              v-show="advanceSearchViewVisible">
              <el-row>
                <el-col :span="5">
                  政治面貌:
                  <el-select clearable placeholder="请选择政治面貌" size="mini" style="width: 130px" v-model="emp.politicid">
                    <el-option
                      :key="item.id"
                      :label="item.name"
                      :value="item.id"
                      v-for="item in politics">
                    </el-option>
                  </el-select>
                </el-col>
                <el-col :span="4">
                  民族:
                  <el-select clearable placeholder="请选择民族" size="mini" style="width: 130px" v-model="emp.nationid">
                    <el-option
                      :key="item.id"
                      :label="item.name"
                      :value="item.id"
                      v-for="item in nations">
                    </el-option>
                  </el-select>
                </el-col>
                <el-col :span="4">
                  职位:
                  <el-select clearable placeholder="请选择职位" size="mini" style="width: 130px" v-model="emp.posid">
                    <el-option
                      :key="item.id"
                      :label="item.name"
                      :value="item.id"
                      v-for="item in positions">
                    </el-option>
                  </el-select>
                </el-col>
                <el-col :span="4">
                  职称:
                  <el-select clearable placeholder="请选择职称" size="mini" style="width: 130px" v-model="emp.joblevelid">
                    <el-option
                      :key="item.id"
                      :label="item.name"
                      :value="item.id"
                      v-for="item in joblevels">
                    </el-option>
                  </el-select>
                </el-col>
                <el-col :span="7">
                  聘用形式:
                  <el-select clearable placeholder="请选择职称" size="mini" style="width: 130px" v-model="emp.engageform">
                    <el-option
                      :key="item.value"
                      :label="item.lable"
                      :value="item.value"
                      v-for="item in engageForms">
                    </el-option>
                  </el-select>
                </el-col>
              </el-row>
              <el-row style="margin-top: 10px">
                <el-col :span="5">
                  所属部门:
                  <!--<el-popover-->
                  <!--v-model="showOrHidePop2"-->
                  <!--placement="right"-->
                  <!--title="请选择部门"-->
                  <!--trigger="manual">-->
                  <!--<el-tree :data="deps" :default-expand-all="true" :props="defaultProps" :expand-on-click-node="false"-->
                  <!--@node-click="handleNodeClick2"></el-tree>-->
                  <!--<div slot="reference"-->
                  <!--style="width: 130px;height: 26px;display: inline-flex;font-size:13px;border: 1px;border-radius: 5px;border-style: solid;padding-left: 13px;box-sizing:border-box;border-color: #dcdfe6;cursor: pointer;align-items: center"-->
                  <!--@click="showDepTree2" v-bind:style="{color: depTextColor}">{{emp.departmentName}}-->
                  <!--</div>-->
                  <!--</el-popover>-->
                  <!--高级搜索-->
                  <el-cascader
                    :options="deps"
                    :props="{ checkStrictly: true,emitPath:false}"
                    :show-all-levels="false"
                    clearable
                    v-model="emp.departmentid">
                  </el-cascader>
                </el-col>
                <el-col :span="10">
                  入职日期:
                  <el-date-picker
                    end-placeholder="结束日期"
                    range-separator="至"
                    size="mini"
                    start-placeholder="开始日期"
                    type="daterange"
                    unlink-panels
                    v-model="beginDateScope"
                    value-format="yyyy-MM-dd">
                  </el-date-picker>
                </el-col>
                <el-col :offset="4" :span="5">
                  <el-button @click="cancelSearch" size="mini">取消</el-button>
                  <el-button @click="searchEmp" icon="el-icon-search" size="mini" type="primary">搜索</el-button>
                </el-col>
              </el-row>
            </div>
          </transition>
          <el-table
            :data="emps"
            @selection-change="handleSelectionChange"
            border
            size="mini"
            stripe
            style="width: 100%"
            v-loading="tableLoading">
            <el-table-column
              align="left"
              type="selection"
              width="30">
            </el-table-column>
            <el-table-column
              align="left"
              fixed
              label="姓名"
              prop="name"
              width="90">
            </el-table-column>
            <el-table-column
              align="left"
              label="工号"
              prop="workid"
              width="85">
            </el-table-column>
            <el-table-column
              label="性别"
              prop="gender"
              width="50">
            </el-table-column>
            <el-table-column
              align="left"
              label="出生日期"
              width="85">
              <template slot-scope="scope">{{ scope.row.birthday | formatDate}}</template>
            </el-table-column>
            <el-table-column
              align="left"
              label="身份证号码"
              prop="idcard"
              width="150">
            </el-table-column>
            <el-table-column
              label="婚姻状况"
              prop="wedlock"
              width="70">
            </el-table-column>
            <el-table-column
              label="民族"
              prop="nationName"
              width="50">
            </el-table-column>
            <el-table-column
              label="籍贯"
              prop="nativeplace"
              width="80">
            </el-table-column>
            <el-table-column
              label="政治面貌"
              prop="politicsStatusName">
            </el-table-column>
            <el-table-column
              align="left"
              label="电子邮件"
              prop="email"
              width="180">
            </el-table-column>
            <el-table-column
              label="电话号码"
              prop="phone"
              width="100">
            </el-table-column>
            <el-table-column
              align="left"
              label="联系地址"
              prop="address"
              width="220">
            </el-table-column>
            <el-table-column
              align="left"
              label="所属部门"
              prop="departmentName"
              width="100">
            </el-table-column>
            <el-table-column
              align="left"
              label="职位"
              prop="positionName"
              width="100">
            </el-table-column>
            <el-table-column
              align="left"
              label="职称"
              prop="jobLevelName"
              width="100">
            </el-table-column>
            <el-table-column
              label="聘用形式"
              prop="engageform">
            </el-table-column>
            <el-table-column
              align="left"
              label="入职日期"
              width="85">
              <template slot-scope="scope">{{ scope.row.begindate | formatDate}}</template>
            </el-table-column>
            <el-table-column
              align="left"
              label="转正日期"
              width="85">
              <template slot-scope="scope">{{ scope.row.conversiontime | formatDate}}</template>
            </el-table-column>
            <el-table-column
              align="left"
              label="合同起始日期"
              width="95">
              <template slot-scope="scope">{{ scope.row.begincontract | formatDate}}</template>
            </el-table-column>
            <el-table-column
              align="left"
              label="合同截至日期"
              width="95">
              <template slot-scope="scope">{{ scope.row.endcontract | formatDate}}</template>
            </el-table-column>
            <el-table-column
              align="left"
              label="合同期限"
              width="70">
              <template slot-scope="scope">{{ scope.row.contractterm}}年</template>
            </el-table-column>
            <el-table-column
              align="left"
              label="最高学历"
              prop="tiptopdegree">
            </el-table-column>
            <el-table-column
              fixed="right"
              label="操作"
              width="195">
              <template slot-scope="scope">
                <el-button @click="showEditEmpView(scope.row)" size="mini"
                           style="padding: 3px 4px 3px 4px;margin: 2px">编辑
                </el-button>
                <el-button size="mini" style="padding: 3px 4px 3px 4px;margin: 2px"
                           type="primary">查看高级资料
                </el-button>
                <el-button @click="deleteEmp(scope.row)" size="mini" style="padding: 3px 4px 3px 4px;margin: 2px"
                           type="danger">删除
                </el-button>
              </template>
            </el-table-column>
          </el-table>
          <div class="pagination-container" style="display: flex;justify-content: space-between;margin: 2px">
            <el-button :disabled="multipleSelection.length==0" @click="deleteManyEmps" size="mini" type="danger"
                       v-if="emps.length>0">批量删除
            </el-button>
            <el-pagination
              :current-page.sync="listQuery.pageNum"
              :page-size="listQuery.pageSize"
              :page-sizes="[5,10,15]"
              :total="total"
              @current-change="currentChange"
              @size-change="sizeChange"
              background
              layout="total,sizes,prev, pager, next,jumper">
            </el-pagination>
          </div>
        </div>
      </el-main>
    </el-container>
    <el-form :model="emp" :rules="rules" ref="addEmpForm" style="margin: 0px;padding: 0px;">
      <div style="text-align: left">
        <el-dialog
          :close-on-click-modal="false"
          :title="dialogTitle"
          :visible.sync="dialogVisible"
          style="padding: 0px;"
          width="77%">
          <el-row>
            <el-col :span="6">
              <div>
                <el-form-item label="姓名:" prop="name">
                  <el-input placeholder="请输入员工姓名" prefix-icon="el-icon-edit" size="mini" style="width: 150px"
                            v-model="emp.name"></el-input>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="5">
              <div>
                <el-form-item label="性别:" prop="gender">
                  <el-radio-group v-model="emp.gender">
                    <el-radio label="男">男</el-radio>
                    <el-radio label="女" style="margin-left: 15px">女</el-radio>
                  </el-radio-group>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="6">
              <div>
                <el-form-item label="出生日期:" prop="birthday">
                  <el-date-picker
                    placeholder="出生日期"
                    size="mini"
                    style="width: 150px"
                    type="date"
                    v-model="emp.birthday"
                    value-format="yyyy-MM-dd HH:mm:ss">
                  </el-date-picker>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="7">
              <div>
                <el-form-item label="政治面貌:" prop="politicid">
                  <el-select placeholder="政治面貌" size="mini" style="width: 200px" v-model="emp.politicid">
                    <el-option
                      :key="item.id"
                      :label="item.name"
                      :value="item.id"
                      v-for="item in politics">
                    </el-option>
                  </el-select>
                </el-form-item>
              </div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="6">
              <div>
                <el-form-item label="民族:" prop="nationid">
                  <el-select placeholder="请选择民族" size="mini" style="width: 150px" v-model="emp.nationid">
                    <el-option
                      :key="item.id"
                      :label="item.name"
                      :value="item.id"
                      v-for="item in nations">
                    </el-option>
                  </el-select>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="5">
              <div>
                <el-form-item label="籍贯:" prop="nativeplace">
                  <el-input placeholder="员工籍贯" size="mini" style="width: 120px" v-model="emp.nativeplace"></el-input>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="6">
              <div>
                <el-form-item label="电子邮箱:" prop="email">
                  <el-input placeholder="电子邮箱地址..." prefix-icon="el-icon-message" size="mini" style="width: 150px"
                            v-model="emp.email"></el-input>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="7">
              <div>
                <el-form-item label="联系地址:" prop="address">
                  <el-input placeholder="联系地址..." prefix-icon="el-icon-edit" size="mini" style="width: 200px"
                            v-model="emp.address"></el-input>
                </el-form-item>
              </div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="6">
              <div>
                <el-form-item label="职位:" prop="posid">
                  <el-select placeholder="请选择职位" size="mini" style="width: 150px" v-model="emp.posid">
                    <el-option
                      :key="item.id"
                      :label="item.name"
                      :value="item.id"
                      v-for="item in positions">
                    </el-option>
                  </el-select>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="5">
              <div>
                <el-form-item label="职称:" prop="joblevelid">
                  <el-select placeholder="请选择职称" size="mini" style="width: 120px" v-model="emp.joblevelid">
                    <el-option
                      :key="item.id"
                      :label="item.name"
                      :value="item.id"
                      v-for="item in joblevels">
                    </el-option>
                  </el-select>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="6">
              <div>
                <el-form-item label="所属部门:" prop="departmentid">
                  <!--<el-popover-->
                  <!--v-model="showOrHidePop2"-->
                  <!--placement="right"-->
                  <!--title="请选择部门"-->
                  <!--trigger="manual">-->
                  <!--<el-tree :data="deps" :default-expand-all="true" :props="defaultProps" :expand-on-click-node="false"-->
                  <!--@node-click="handleNodeClick2"></el-tree>-->
                  <!--<div slot="reference"-->
                  <!--style="width: 130px;height: 26px;display: inline-flex;font-size:13px;border: 1px;border-radius: 5px;border-style: solid;padding-left: 13px;box-sizing:border-box;border-color: #dcdfe6;cursor: pointer;align-items: center"-->
                  <!--@click="showDepTree2" v-bind:style="{color: depTextColor}">{{emp.departmentName}}-->
                  <!--</div>-->
                  <!--</el-popover>-->
                  <!--编辑 添加-->
                  <el-cascader
                    style="width: 150px"
                    :size="mini"
                    :options="deps"
                    :show-all-levels="false"
                    :props="{ checkStrictly: true }"
                    @change="handleChange"
                    clearable
                    placeholder="请选择部门"
                    v-model="emp.departmentid">
                  </el-cascader>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="7">
              <div>
                <el-form-item label="电话号码:" prop="phone">
                  <el-input placeholder="电话号码..." prefix-icon="el-icon-phone" size="mini" style="width: 200px"
                            v-model="emp.phone"></el-input>
                </el-form-item>
              </div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="6">
              <div>
                <el-form-item label="工号:" prop="workid">
                  <el-input disabled placeholder="员工工号..." size="mini" style="width: 150px"
                            v-model="emp.workid"></el-input>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="5">
              <div>
                <el-form-item label="学历:" prop="tiptopdegree">
                  <el-select placeholder="最高学历" size="mini" style="width: 120px" v-model="emp.tiptopdegree">
                    <el-option
                      :key="item.id"
                      :label="item.name"
                      :value="item.name"
                      v-for="item in degrees">
                    </el-option>
                  </el-select>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="6">
              <div>
                <el-form-item label="毕业院校:" prop="school">
                  <el-input placeholder="毕业院校名称" prefix-icon="el-icon-edit" size="mini" style="width: 150px"
                            v-model="emp.school"></el-input>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="7">
              <div>
                <el-form-item label="专业名称:" prop="specialty">
                  <el-input placeholder="专业名称" prefix-icon="el-icon-edit" size="mini" style="width: 200px"
                            v-model="emp.specialty"></el-input>
                </el-form-item>
              </div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="6">
              <div>
                <el-form-item label="入职日期:" prop="begindate">
                  <el-date-picker
                    placeholder="入职日期"
                    size="mini"
                    style="width: 130px"
                    type="date"
                    v-model="emp.begindate"
                    value-format="yyyy-MM-dd HH:mm:ss">
                  </el-date-picker>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="6">
              <div>
                <el-form-item label="转正日期:" prop="conversiontime">
                  <el-date-picker
                    placeholder="转正日期"
                    size="mini"
                    style="width: 130px"
                    type="date"
                    v-model="emp.conversiontime"
                    value-format="yyyy-MM-dd HH:mm:ss">
                  </el-date-picker>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="6">
              <div>
                <el-form-item label="合同起始日期:" prop="begincontract">
                  <el-date-picker
                    placeholder="合同起始日期"
                    size="mini"
                    style="width: 135px"
                    type="date"
                    v-model="emp.begincontract"
                    value-format="yyyy-MM-dd HH:mm:ss">
                  </el-date-picker>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="6">
              <div>
                <el-form-item label="合同终止日期:" prop="endcontract">
                  <el-date-picker
                    placeholder="合同终止日期"
                    size="mini"
                    style="width: 135px"
                    type="date"
                    v-model="emp.endcontract"
                    value-format="yyyy-MM-dd HH:mm:ss">
                  </el-date-picker>
                </el-form-item>
              </div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <div>
                <el-form-item label="身份证号码:" prop="idcard">
                  <el-input placeholder="请输入员工身份证号码..." prefix-icon="el-icon-edit" size="mini" style="width: 180px"
                            v-model="emp.idcard"></el-input>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="8">
              <div>
                <el-form-item label="聘用形式:" prop="engageform">
                  <el-radio-group v-model="emp.engageform">
                    <el-radio label="劳动合同">劳动合同</el-radio>
                    <el-radio label="劳务合同" style="margin-left: 15px">劳务合同</el-radio>
                  </el-radio-group>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="8">
              <div>
                <el-form-item label="婚姻状况:" prop="wedlock">
                  <el-radio-group v-model="emp.wedlock">
                    <el-radio label="已婚">已婚</el-radio>
                    <el-radio label="未婚" style="margin-left: 15px">未婚</el-radio>
                    <el-radio label="离异" style="margin-left: 15px">离异</el-radio>
                  </el-radio-group>
                </el-form-item>
              </div>
            </el-col>
          </el-row>
          <span class="dialog-footer" slot="footer">
    <el-button @click="cancelEidt" size="mini">取 消</el-button>
    <el-button @click="addEmp('addEmpForm')" size="mini" type="primary">确 定</el-button>
  </span>
        </el-dialog>
      </div>
    </el-form>
  </div>
</template>
<script>
  import {delEmp, delEmpList, exportExcel, fetchBasicList, fetchEmpList, getEmp, saveEmp, updateEmp} from '@/api/emp'

  export default {
    data() {
      return {
        emps: null,
        keywords: '',
        fileUploadBtnText: '导入数据',
        beginDateScope: '',
        faangledoubleup: 'fa-angle-double-up',
        faangledoubledown: 'fa-angle-double-down',
        dialogTitle: '',
        multipleSelection: [],
        depTextColor: '#c0c4cc',
        nations: [],
        politics: [],
        positions: [],
        joblevels: [],
        engageForms: [
          {
            value: '劳务合同',
            lable: '劳务合同'
          },
          {
            value: '劳动合同',
            lable: '劳动合同'
          }
        ],
        total: null,
        listQuery: {
          pageNum: 1,
          pageSize: 5
        },
        degrees: [{id: 4, name: '大专'}, {id: 5, name: '本科'}, {id: 6, name: '硕士'}, {id: 7, name: '博士'}, {
          id: 3,
          name: '高中'
        }, {id: 2, name: '初中'}, {id: 1, name: '小学'}, {id: 8, name: '其他'}],
        deps: [],
        defaultProps: {
          label: 'name',
          isLeaf: 'leaf',
          children: 'children'
        },
        errorList:[],
        dialogVisible: false,
        tableLoading: false,
        advanceSearchViewVisible: false,
        showOrHidePop: false,
        showOrHidePop2: false,
        emp: {
          name: '',
          gender: '',
          birthday: '',
          idcard: '',
          wedlock: '',
          nationid: '',
          nativeplace: '',
          politicid: '',
          email: '',
          phone: '',
          address: '',
          departmentid: '',
          departmentName: '所属部门...',
          joblevelid: '',
          posid: '',
          engageform: '',
          tiptopdegree: '',
          specialty: '',
          school: '',
          begindate: '',
          workState: '',
          workid: '',
          contractterm: '',
          conversiontime: '',
          notWorkDate: '',
          begincontract: '',
          endcontract: '',
          workAge: ''
        },
        rules: {
          name: [{required: true, message: '必填:姓名', trigger: 'blur'}],
          gender: [{required: true, message: '必填:性别', trigger: 'blur'}],
          birthday: [{required: true, message: '必填:出生日期', trigger: 'blur'}],
          idcard: [{
            required: true,
            message: '必填:身份证号码',
            trigger: 'blur'
          }, {
            pattern: /(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}$)/,
            message: '身份证号码格式不正确',
            trigger: 'blur'
          }],
          wedlock: [{required: true, message: '必填:婚姻状况', trigger: 'blur'}],
          nationid: [{required: true, message: '必填:民族', trigger: 'change'}],
          nativeplace: [{required: true, message: '必填:籍贯', trigger: 'blur'}],
          politicid: [{required: true, message: '必填:政治面貌', trigger: 'blur'}],
          email: [{required: true, message: '必填:电子邮箱', trigger: 'blur'}, {
            type: 'email',
            message: '邮箱格式不正确',
            trigger: 'blur'
          }],
          phone: [{required: true, message: '必填:电话号码', trigger: 'blur'}],
          address: [{required: true, message: '必填:联系地址', trigger: 'blur'}],
          departmentid: [{required: true, message: '必填:部门', trigger: 'change'}],
          joblevelid: [{required: true, message: '必填:职称', trigger: 'change'}],
          posid: [{required: true, message: '必填:职位', trigger: 'change'}],
          engageform: [{required: true, message: '必填:聘用形式', trigger: 'blur'}],
          tiptopdegree: [{required: true, message: '必填:最高学历', trigger: 'change'}],
          specialty: [{required: true, message: '必填:专业', trigger: 'blur'}],
          workid: [{required: false, message: '必填:工号', trigger: 'blur'}],
          school: [{required: true, message: '必填:毕业院校', trigger: 'blur'}],
          begindate: [{required: true, message: '必填:入职日期', trigger: 'blur'}],
          conversiontime: [{required: true, message: '必填:转正日期', trigger: 'blur'}],
          begincontract: [{required: true, message: '必填:合同起始日期', trigger: 'blur'}],
          endcontract: [{required: true, message: '必填:合同终止日期', trigger: 'blur'}],
          workAge: [{required: true, message: '必填:工龄', trigger: 'blur'}]
        }
      };
    },
    created() {
      this.initData();
      this.loadEmps();
    },
    methods: {
      fileUploadSuccess(response, file, fileList) {
        if (response) {
          this.$message({type: response.status, message: response.msg});
        }
        if(response.status == 500){
          this.errorList = response.obj
        }else {
          this.errorList = []
        }
        this.loadEmps();
        this.fileUploadBtnText = '导入数据';
      },
      fileUploadError(err, file, fileList) {
        console.log("123")
        var data = err.toString().replace("Error:")
        var jsonData = JSON.parse(data)
        console.log(jsonData)
        this.$message({type: 'error', message: "导入失败"});
        this.fileUploadBtnText = '导入数据';
      },
      beforeFileUpload(file) {
        this.fileUploadBtnText = '正在导入';
      },
      exportEmps() {
          window.open('/emp/exportEmp', "_parent")
        // window.location.href = '/emp/exportEmpV2/'
      },
      cancelSearch() {
        this.advanceSearchViewVisible = false;
        this.emptyEmpData();
        this.beginDateScope = '';
        this.loadEmps();
      },
      showAdvanceSearchView() {
        this.advanceSearchViewVisible = !this.advanceSearchViewVisible;
        this.keywords = '';
        if (!this.advanceSearchViewVisible) {
          this.emptyEmpData();
          this.beginDateScope = '';
          this.loadEmps();
        }
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      deleteManyEmps() {
        this.$confirm('此操作将删除[' + this.multipleSelection.length + ']条数据, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          var ids = [];
          for (var i = 0; i < this.multipleSelection.length; i++) {
            // ids += this.multipleSelection[i].id + ",";
            ids.push(this.multipleSelection[i].id)
          }
          this.doDelete(ids);
        }).catch(() => {
        });
      },
      deleteEmp(row) {
        this.$confirm('此操作将永久删除[' + row.name + '], 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          delEmp(row.id).then(resp => {
            this.tableLoading = false;
            if (resp && resp.data.status == 200) {
              this.loadEmps();
              this.Message.success(resp.data.msg)
            } else {
              this.Message.error(resp.data.msg)
            }
          })
        }).catch(() => {
        });
      },
      doDelete(ids) {
        console.log(ids)
        this.tableLoading = true;
        var _this = this;
        delEmpList(ids).then(resp => {
          _this.tableLoading = false;
          if (resp && resp.status == 200) {
            _this.loadEmps();
            _this.Message.success(resp.data.msg)
          }else {
            _this.Message.error(resp.data.msg)
          }
        })
      },
      keywordsChange(val) {
        if (val == '') {
          this.loadEmps();
        }
      },
      searchEmp() {
        this.listQuery.pageNum = 1
        this.loadEmps();
      },
      sizeChange(val) {
        this.listQuery.pageNum = 1
        this.listQuery.pageSize = val
        this.loadEmps()
      },
      currentChange(currentChange) {
        this.currentPage = currentChange;
        this.loadEmps();
      },
      loadEmps() {
        this.tableLoading = true;
        fetchEmpList(this.listQuery.pageNum, this.listQuery.pageSize, this.beginDateScope, this.emp).then(resp => {
          this.tableLoading = false;
          this.emps = resp.data.obj == null ? [] : resp.data.obj
          this.total = resp.data.total
          // _this.emptyEmpData();
        })
      },
      addEmp(formName) {
        var _this = this;
        this.$refs[formName].validate((valid) => {
          if (valid) {
            if (this.emp.id) {
              //更新
              this.tableLoading = true;
              updateEmp(this.emp).then(resp => {
                _this.tableLoading = false;
                if (resp && resp.status == 200) {
                  var data = resp.data;
                  _this.dialogVisible = false;
                  _this.emptyEmpData();
                  _this.loadEmps();
                  _this.Message.success(resp.data.msg)
                } else {
                  _this.Message.error(resp.data.msg)
                }
              })
            } else {
              //添加
              this.tableLoading = true;
              saveEmp(this.emp).then(resp => {
                _this.tableLoading = false;
                if (resp && resp.status == 200) {
                  _this.dialogVisible = false;
                  _this.emptyEmpData();
                  _this.loadEmps();
                  _this.Message.success(resp.data.msg)
                } else {
                  _this.Message.error(resp.data.msg)
                }

              })
            }
          } else {
            return false;
          }
        });
      },
      cancelEidt() {
        this.dialogVisible = false;
        this.emptyEmpData();
      },
      showDepTree() {
        this.showOrHidePop = !this.showOrHidePop;
      },
      showDepTree2() {
        this.showOrHidePop2 = !this.showOrHidePop2;
      },
      handleNodeClick(data) {
        this.emp.departmentName = data.name;
        this.emp.departmentid = data.id;
        this.showOrHidePop = false;
        this.depTextColor = '#606266';
      },
      handleNodeClick2(data) {
        this.emp.departmentName = data.name;
        this.emp.departmentid = data.id;
        this.showOrHidePop2 = false;
        this.depTextColor = '#606266';
      },
      initData() {
        var _this = this;
        fetchBasicList().then(resp => {
          if (resp && resp.status == 200) {
            var data = resp.data.obj;
            _this.nations = data.nations;
            _this.politics = data.politics;
            _this.deps = data.deps;
            _this.positions = data.positions;
            _this.joblevels = data.joblevels;
            _this.emp.workid = data.workid;
          }
        })
      },
      showEditEmpView(row) {
        console.log(row)
        this.dialogTitle = "编辑员工";
        // this.emp = row;
        // this.emp.birthday = this.formatDate(row.birthday);
        // this.emp.conversiontime = this.formatDate(row.conversiontime);
        // this.emp.begincontract = this.formatDate(row.begincontract);
        // this.emp.endcontract = this.formatDate(row.endcontract);
        // this.emp.begindate = this.formatDate(row.begindate);
        // this.emp.nationid = row.nationid;
        // this.emp.politicid = row.politicsStatus.id;
        // this.emp.departmentid = row.department.id;
        // this.emp.departmentName = row.department.name;
        // this.emp.joblevelid = row.jobLevel.id;
        // this.emp.posid = row.position.id;
//        delete this.emp.department;
//        delete this.emp.jobLevel;
//        delete this.emp.position;
//        delete this.emp.nation;
//        delete this.emp.politicsStatus;
//         delete this.emp.salary;
//         delete this.emp.workAge;
//         delete this.emp.notWorkDate;
        getEmp(row.id).then(resp => {
          this.emp = resp.data.obj
        })
        this.dialogVisible = true;
        console.log(this.emp)
      },
      showAddEmpView() {
        this.dialogTitle = "添加员工";
        this.dialogVisible = true;
      },
      handleChange(values) {
        let data
        values.forEach(value => {
          data = value
        })
        this.emp.departmentid = data
      },
      emptyEmpData() {
        this.emp = {
          name: '',
          gender: '',
          birthday: '',
          idcard: '',
          nationid: '',
          nativeplace: '',
          politicid: '',
          email: '',
          phone: '',
          address: '',
          departmentid: '',
          departmentName: '所属部门...',
          joblevelid: '',
          posid: '',
          engageform: '',
          tiptopdegree: '',
          specialty: '',
          school: '',
          begindate: '',
          workState: '',
          workid: '',
          contractterm: '',
          conversiontime: '',
          notWorkDate: '',
          begincontract: '',
          endcontract: '',
          workAge: ''
        }
      }
    }
  };
</script>
<style>
  .el-dialog__body {
    padding-top: 0px;
    padding-bottom: 0px;
  }

  .slide-fade-enter-active {
    transition: all .8s ease;
  }

  .slide-fade-leave-active {
    transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
  }

  .slide-fade-enter, .slide-fade-leave-to {
    transform: translateX(10px);
    opacity: 0;
  }
</style>
