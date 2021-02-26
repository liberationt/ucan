<!-- index.vue -->
<template>
  <el-container>
    <!--查询表单-->
    <el-header class="formDiv">
      <el-form :inline="true" :model="form" class="demo-form-inline">
        <el-form-item label="所属区域">
          <!--<el-cascader v-model="form.areaCode" :options="provenceArray" change-on-select-->
          <!--@change="handleItemChange" :props="props" >-->
          <!--</el-cascader>-->
          <Address
            :area-code="areaCode"
            :form-code="form.areaCode"
            :id-edit="idEdit"
            :width="'200px'"
            @getAreaCode="getAreaCode"
            @keyup.enter.native="onSubmit"
          />
        </el-form-item>
        <el-form-item label="扶贫标签">
          <el-cascader
            v-model="form.helpPoorType"
            placeholder="请选择扶贫类别"
            clearable
            style="width:100%;"
            :options="fupingOptions"
            :props="props"
            @change="handleChange"
            @keyup.enter.native="onSubmit"></el-cascader>
        </el-form-item>
        <el-form-item label="年龄范围">
          <el-date-picker
            v-model="form.dateRange"
            type="date"
            format="yyyy-MM-dd"
            value-format="yyyy-MM-dd"
            placeholder="选择日期"
          />
        </el-form-item>
        <el-form-item label="">
          <el-input
            v-model.trim="form.ageMin"
            clearable
            placeholder="最小年龄"
            style="width: 120px"
            @keyup.enter.native="onSubmit"
          />
        </el-form-item>
        <el-form-item label="">
          <el-input
            v-model.trim="form.ageMax"
            clearable
            placeholder="最大年龄"
            style="width: 120px"
            @keyup.enter.native="onSubmit"
          />
        </el-form-item>
        <el-form-item label="关键词">
          <el-input
            v-model.trim="form.fullName"
            clearable
            placeholder="请输入姓名或身份证号查询"
            style="width: 220px"
            @keyup.enter.native="onSubmit"
          />
        </el-form-item>
        <el-form-item label="户籍情况">
          <el-select
            v-model="form.householdRegistration"
            placeholder="请选择户籍情况"
            clearable
            style="width:100%;"
            @keyup.enter.native="onSubmit"
          >
            <el-option
              v-for="item in censusStatusOptions"
              :key="item.dictValue"
              :label="item.dictLabel"
              :value="item.dictValue"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="户口性质">
          <el-select
            v-model="form.residenceType"
            clearable
            placeholder="请选择户口性质"
            style="width:100%;"
            @keyup.enter.native="onSubmit"
          >
            <el-option
              v-for="item in residenceTypeOptions"
              :key="item.dictValue"
              :label="item.dictLabel"
              :value="item.dictValue"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="人口类别">
          <el-select
            v-model="form.populationType"
            placeholder="请选择人口类别"
            clearable
            style="width:100%;"
            @keyup.enter.native="onSubmit"
          >
            <el-option
              v-for="item in populationTypeOptions"
              :key="item.dictValue"
              :label="item.dictLabel"
              :value="item.dictValue"
            />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button v-has="{class: '查询'}" type="primary" class="base-btn" @click="onSubmit">查询
          </el-button>
          <el-button v-has="{class: '查询'}" type="warning" class="base-btn" @click="onReset">重置
          </el-button>
        </el-form-item>
      </el-form>
    </el-header>
    <!--table板块-->
    <el-main class="tableContainer">
      <el-container>
        <el-header>
          <div class="total-nav">
            <el-button v-has="{class: '新增'}" type="primary" class="base-btn" @click="addTableRow()">新增
            </el-button>
            <el-button v-has="{class: '导入'}" type="primary" class="base-btn" @click="importFun()">导入
            </el-button>
            <el-button v-has="{class: '导出'}" type="primary" class="base-btn" @click="exportFun()">导出
            </el-button>

            <div v-if="this.total !== 0" class="totalWrap">已筛选到{{ this.total }}条匹配信息</div>
            <div v-else class="totalWrap">无法找到匹配信息</div>
          </div>
        </el-header>
        <el-main>
          <el-table
            :data="tableData"
            tooltip-effect="dark"
            style="width: 100%;"
            header-align="left"
            border
            row-key="id"
            :row-class-name="tableRowClassName"
            @selection-change="handleSelectionChange"
            @row-dblclick="toDetail"
            @sort-change="sortChange"
          >
            <el-table-column type="selection" width="50" fixed="left" />
            <el-table-column label="序号" width="80" fixed="left">
              <template slot-scope="{row,$index}">
                <span>{{ $index + 1 }}</span>
              </template>
            </el-table-column>
            <el-table-column label="姓名" prop="fullName" min-width="90" />
            <el-table-column label="性别" prop="sexName" min-width="60" />
            <el-table-column label="年龄" prop="age" min-width="60" />
            <el-table-column label="身份证" prop="idCard" min-width="180" />
            <el-table-column
              label="户籍地"
              prop="areaCodeName"
              min-width="200"
              show-overflow-tooltip
            />
            <el-table-column label="联系方式" prop="homePhone" min-width="130">
              <template slot-scope="{row,$index}">
                <span>{{ row.homePhone }}</span>
                <span v-if="row.homePhone !== '' && row.homePhone !== null && row.mobile !== '' && row.mobile !== null">/</span>
                <span>{{ row.mobile }}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="标签"
              prop="label"
              min-width="180"
              show-overflow-tooltip
            >
              <template slot-scope="{row,$index}">
                <span>{{ row.helpPoorTypeName }}</span>
                <span v-if="row.nursingLevelName && row.nursingLevelName !== '' && row.nursingLevelName !== null">- {{ row.nursingLevelName }}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="户籍情况"
              prop="householdRegistrationName"
              min-width="180"
              show-overflow-tooltip
            />
            <el-table-column
              label="户口性质"
              prop="residenceTypeName"
              min-width="180"
              show-overflow-tooltip
            />
            <el-table-column
              label="人口类别"
              prop="populationTypeName"
              min-width="180"
              show-overflow-tooltip
            />
            <el-table-column label="更新时间" prop="updateTime" sortable="custom" min-width="180" show-overflow-tooltip />
            <el-table-column fixed="right" label="操作" width="150" header-align="center">
              <template slot-scope="{row,$index}">
                <span v-show="row.hasEdit" v-has="{class: '编辑'}" class="table-btn" @click="handleEdit(row)">编辑</span>
                <span v-show="row.hasDelete" v-has="{class: '删除'}" class="table-btn" @click="handleRemove($index, row)">删除</span>
              </template>
            </el-table-column>
          </el-table>
          <pagination
            v-show="total>0"
            :total="total"
            :page.sync="form.pageNum"
            :limit.sync="form.pageSize"
            @pagination="getData(form)"
          />
        </el-main>
      </el-container>
    </el-main>

    <el-dialog title="导入老人信息" :visible.sync="dialogVisible" class="importStyleDialog">
      <import-dialog
        :upload-url="uploadUrl"
        :template-api="getRepairFaultDownload"
        template-name="老人信息导入模板"
        :dialog-visible="dialogVisible"
        @visible="visible"
      />
    </el-dialog>

  </el-container>
</template>

<script>
import _ from 'lodash'
import { getRepairFaultDownload, getElderMesDownload } from '@/api/importExportApi'
import {
  allSelectdictionaryData
} from '@/api/facilitiesConfig/pensionAgency'
import ImportDialog from '@/components/importDialog/index'
import Address from '@/components/Address'
import Pagination from '@/components/Pagination'
import { pageModel } from '@/common'
import qs from 'qs'
import { downloadFromBlob } from '@/utils/index'
import { Tools } from '@/utils/tools'
import {
  getElderDict,
  elderSearch,
} from '@/api/userInfoConfig/elderInfo'
import uploadExcelMix from '@/mixins/uploadExcelMix'
import { getEditAuthority } from '@/api/user'
import { getPoorList, removeTableRowData } from '@/api/userInfoConfig/helpPoor'

export default {
  components: {
    ImportDialog,
    Address,
    Pagination
  },
  mixins: [uploadExcelMix],
  data() {
    return {
      // 查询表单
      form: {
        helpPoorType: '', // 扶贫
        nursingLevel: '', // 扶贫等级
        dateRange: '',
        ageMin: '',
        ageMax: '',
        sort: 'desc',
        householdRegistration: '', // 户籍情况
        populationType: '', // 人口类别
        residenceType: '', // 户口性质
        fullName: '', // ID或者姓名
        areaCode: [], // 区域表单ID
        pageNum: pageModel.pageNum, // 分页页数
        pageSize: pageModel.pageSize // 分页数量
      },
      // 区域全部ID
      areaCode: [],
      // <-- table -->
      tableData: [], // table表格数据
      multipleSelection: [], // 多选的行数据
      total: 0, // 总共多少数量
      idEdit: true,
      exportData: '', // 查询成功后赋值
      dialogVisible: false,
      uploadUrl: process.env.VUE_APP_BASE_API + '/admin/person/import?ignoreField=',
      getRepairFaultDownload,
      residenceTypeOptions: [],
      populationTypeOptions: [],
      censusStatusOptions: [],
      fupingOptions: [], // 扶贫
      nursingLevel: [],
      props: {
        label: 'dictLabel',
        value: 'dictValue',
        children: 'children'
      }
    }
  },
  mounted() {
    this.idEdit = false
    this.getData(this.form)
    this.getDict()
    const data = {
      ignoreField: ''
    }

    getEditAuthority(this.$route.meta.id).then(res => {
      res.forEach(item => {
        if (item.menuName === '含小区导入模板') {
          data.ignoreField = encodeURI(item.menuName)
          this.uploadUrl = process.env.VUE_APP_BASE_API + '/admin/person/import?ignoreField=' + encodeURI(data.ignoreField)
          return
        }
      })
    })
  },
  methods: {
    getDict() {
      const dictKey = [
        'biz_residence_type', // 户口性质
        'people_category', // 人口类别
        'biz_census_status', // 户籍情况
        'help_poor_type', // 扶贫类别
        'nursing_level' // 等级
      ].join(',')
      allSelectdictionaryData(dictKey).then(response => {
        const dict = response.data
        for (const key in dict) {
          switch (key) {
            // 户口性质
            case 'biz_residence_type':
              this.residenceTypeOptions = dict[key]
              break
              // 人口类别
            case 'people_category':
              this.populationTypeOptions = dict[key]
              break
              // 户籍
            case 'biz_census_status':
              this.censusStatusOptions = dict[key]
              break
            // 扶贫
            case 'help_poor_type':
              this.fupingOptions = dict[key]
              break
            // 扶贫等级
            case 'nursing_level':
              this.nursingLevel = dict[key]
              break
          }
        }
        this.fupingOptions[2].children = this.nursingLevel
      }).catch(() => {
      })
    },
    sortChange(data) {
      const { prop, order } = data
      if (order === 'descending') {
        this.form.sort = 'desc'
      } else {
        this.form.sort = 'asc'
      }
      this.getData(this.form)
    },
    // 获取区域的值
    getAreaCode(val) {
      this.areaCode = val
    },
    // 老人标签选择事件
    handleChange(val) {
    },
    // 表单查询按钮
    onSubmit() {
      const arr = []
      if (this.areaCode.length !== 0) {
        arr.push(this.areaCode[this.areaCode.length - 1])
      }
      this.form.areaCode = arr // 所选区域赋值
      // 老人标签根据不同类型分成不同数组
      const { keys } = Object // 初始化keys方法 取键值
      let searchArr
      const newArr = _.cloneDeep(this.form) // 深拷贝form
      searchArr = newArr
      searchArr.areaCode = searchArr.areaCode[0] // 提交表单是 区域是一个字符串 从数组中取出改变
      searchArr.pageNum = 1
      searchArr.helpPoorType = this.form.helpPoorType[0]
      if (this.form.helpPoorType.length === 2) {
        searchArr.nursingLevel = this.form.helpPoorType[1]
      }
      this.form.pageNum = 1
      this.getData(searchArr)
    },
    // 获取表格数据
    getData(form) {
      getPoorList(form).then(res => {
        if (res && res.data.list) {
          this.tableData = res.data.list
          this.total = res.data.total
          this.exportData = _.cloneDeep(form)
          if (this.exportData.areaCode === undefined) {
            this.exportData.areaCode = []
          }
          delete this.exportData.pageNum
          delete this.exportData.pageSize
        }
      }).catch(() => {
        this.$message.error('获取扶贫人员信息失败！')
      })
    },
    // 表单重置按钮
    onReset() {
      this.areaCode = []
      this.form = {
        helpPoorType: '',
        nursingLevel: '',
        dateRange: '',
        ageMin: '',
        ageMax: '',
        fullName: '', // ID或者姓名
        householdRegistration: '', // 户籍情况
        populationType: '', // 人口类别
        residenceType: '', // 户口性质
        areaCode: [], // 区域表单ID
        pageNum: pageModel.pageNum, // 分页页数
        pageSize: pageModel.pageSize // 分页数量
      }
      this.idEdit = !this.idEdit
      this.getData(this.form)
    },
    // 添加行
    addTableRow() {
      this.$router.push({
        path: '/helpPoorInfo/details',
        query: { 'modelType': 'add', '_title': '新增扶贫人员', 'menu': this.$route.meta.id } // modelType: 查看:look，编辑:edit，新增:add的类型
      })
    },
    // 双击行去详情页面
    toDetail(row) {
      this.$router.push({
        path: `/helpPoorInfo/details/${row.id}`,
        query: { 'modelType': 'look', '_title': `查看${row.fullName}`, 'menu': this.$route.meta.id, 'hasEdit': row.hasEdit }
      })
    },
    // 多选的行数据
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    // 编辑按钮
    handleEdit(row) {
      this.$router.push({
        path: `/helpPoorInfo/details/${row.id}`,
        query: { 'modelType': 'edit', '_title': `编辑${row.fullName}`, 'menu': this.$route.meta.id }
      })
    },
    // 删除按钮
    handleRemove($index, row) {
      this.$confirm('确定要删除【' + row.fullName + '】吗？信息一旦被删除，将无法显示和操作。', '删除扶贫人员信息', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        removeTableRowData(row.id).then(response => {
          if (response.code === 0 || response.code === '0') {
            this.$message({
              type: 'success',
              message: `删除扶贫人员信息成功！`
            })
            this.form.pageNum = 1
            this.getData(this.form)
          } else {
            this.$message.error(`删除扶贫人员信息操作失败，失败原因是：${response.msg}`)
          }
        }).catch(() => {
          this.$message.error(`删除扶贫人员信息操作失败!`)
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除！'
        })
      })
    },
    // 表格如果已去世，这一行标黄
    tableRowClassName({ row, rowIndex }) {
      if (row.status === '1') {
        return 'dead-row'
      }
      if (row.status === 'moved_out') {
        return 'moved_out'
      }
      return ''
    },
    // 导入功能
    importFun() {
      this.dialogVisible = true
    },
    // 导出功能
    exportFun() {
      let confirmTitle = ''
      if (this.exportData.areaCode.length === 0 && this.exportData.fullName === '' && this.form.dateRange === '' && this.form.ageMin == '' && this.form.ageMax == '' && this.form.householdRegistration === '' && this.form.populationType === '' && this.form.residenceType === '' && this.form.helpPoorType === '') {
        confirmTitle = '确认导出全部扶贫人员信息吗？'
      } else {
        confirmTitle = '确认导出筛选的扶贫人员信息吗？'
      }
      this.$confirm(
        confirmTitle,
        '导出扶贫人员信息',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }
      )
        .then(() => {
          getElderMesDownload(this.exportData).then(response => {
            if (response instanceof ArrayBuffer) {
              const data = new Blob([response], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8;' })
              downloadFromBlob(data, '扶贫人员信息列表.xlsx')
              this.$message.success('导出扶贫人员信息成功！')
            } else {
              if (response.code != 0 || response.code != '0') {
                this.$message.error('导出扶贫人员信息操作失败，失败原因是：' + response.msg)
              }
            }
          }).catch((error) => {
            if (error && error.message) {
              if (error.message.indexOf('timeout') > -1) {
                error.message = '网络连接超时'
              }
              this.$message.error('导出扶贫人员信息操作失败，失败原因是：' + error.message)
            } else {
              this.$message.error('导出扶贫人员信息操作失败！')
            }
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消操作！'
          })
        })
    },
    // 关闭弹窗
    visible(value) {
      this.dialogVisible = value
    }
  }
}
</script>

<style scoped>
  @import "~@/styles/form.css";
</style>
|
