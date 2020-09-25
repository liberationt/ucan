<!-- index.vue -->
<template>
  <el-container>
    <!--查询表单-->
    <el-header class="formDiv">
      <el-form :inline="true" :model="form" class="demo-form-inline">
        <el-form-item label="所属区域">
          <Address
            :area-code="areaCode"
            :form-code="form.areaCode"
            :id-edit="idEdit"
            :width="'200px'"
            @getAreaCode="getAreaCode"
            @keyup.enter.native="onSubmit"
          />
        </el-form-item>
        <el-form-item label="申请类别">
          <el-select
            v-model="form.applyType"
            placeholder="请选择申请类别"
            clearable
            style="width:100%;"
            @keyup.enter.native="onSubmit"
          >
            <el-option
              v-for="item in applyOptions"
              :key="item.dictValue"
              :label="item.dictLabel"
              :value="item.dictValue"
            />
          </el-select>
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
            v-model.trim="form.keyword"
            clearable
            placeholder="请输入姓名或身份证号查询"
            style="width: 220px"
            @keyup.enter.native="onSubmit"
          />
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
              prop="censusAreaName"
              min-width="200"
              show-overflow-tooltip
            />
            <el-table-column label="联系方式" prop="mobile" min-width="130" />
            <el-table-column
              label="标签"
              prop="tag"
              min-width="100"
              show-overflow-tooltip
            />
            <el-table-column
              label="保障人口数"
              prop="guaranteedPopulation"
              min-width="120"
              show-overflow-tooltip
            />
            <el-table-column
              label="保障金额"
              prop="guaranteedAmount"
              min-width="120"
              show-overflow-tooltip
            />
            <el-table-column
              label="申请类别"
              prop="applyTypeName"
              min-width="150"
              show-overflow-tooltip
            />
            <el-table-column fixed="right" label="操作" width="150" header-align="center">
              <template slot-scope="{row,$index}">
                <span v-has="{class: '编辑'}" class="table-btn" @click="handleEdit(row)">编辑</span>
                <span v-has="{class: '删除'}" class="table-btn" @click="handleRemove($index, row)">删除</span>
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
    <ExcelUpload :dialog-table-visible="dialogVisible" :title="'导入特困人员信息'" :template-name="'特困人员信息导入模板'" :template-api="getExtremelyPoorDownload" :upload-url="uploadUrl" :type="'特困人员信息管理'" :text-content="textContent" @visible="visible" />

  </el-container>
</template>

<script>
import _ from 'lodash'
import { getExtremelyPoorDownload, getExtremelyPoorExport } from '@/api/importExportApi'
import {
  allSelectdictionaryData
} from '@/api/facilitiesConfig/pensionAgency'
import Address from '@/components/Address'
import Pagination from '@/components/Pagination'
import { pageModel } from '@/common'
import qs from 'qs'

import ExcelUpload from '@/components/newExcelUpload/newTemplate'
import uploadExcelMix from '@/mixins/uploadExcelMix'
import { getPoorList, removeTableRowData } from '@/api/userInfoConfig/helpPoor'

import { exportTitleConstant, exportContentConstant, exportGoDownloadConstant, exportKnowConstant, canExport } from '@/common/constant'// 常量池
import { getExtremelyPoorList, removeExtremelyPoor } from '@/api/userInfoConfig/poorInfor'

export default {
  components: {
    Address,
    Pagination,
    ExcelUpload
  },
  mixins: [uploadExcelMix],
  data() {
    return {
      // 查询表单
      form: {
        dateRange: '',
        ageMin: '',
        ageMax: '',
        sort: 'desc',
        applyType: '',
        keyword: '', // ID或者姓名
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
      uploadUrl: process.env.VUE_APP_BASE_API + '/biz/extremely/poor/import',
      getExtremelyPoorDownload,
      applyOptions: [],
      textContent: `<div>
          <p>说明：</p>
          <p>1、导入之前请先下载模板；</p>
          <p>2、*为必填项，必填项目不填写则会导入失败；</p>
          <p>3、导入数据，把第一列举例数据删除后填写全新的数据进行数据导入；</p>
          <p>4、填写导入数据时，请查看第一行列举例范例，不要再需要输入数字的位置输入汉字，请规范填写导入数据。</p>
        </div>`
    }
  },
  mounted() {
    this.idEdit = false
    this.getData(this.form)
    this.getDict()
    const data = {
      ignoreField: ''
    }
  },
  methods: {
    getDict() {
      const dictKey = [
        'application_category' // 等级
      ].join(',')
      allSelectdictionaryData(dictKey).then(response => {
        const dict = response.data
        for (const key in dict) {
          switch (key) {
            // 特困等级
            case 'application_category':
              this.applyOptions = dict[key]
              break
          }
        }
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
    // 表单查询按钮
    onSubmit() {
      if (this.areaCode && this.areaCode.length !== 0) {
        this.form.areaCode = this.areaCode[this.areaCode.length - 1]
      }
      const searchArr = _.cloneDeep(this.form)
      searchArr.pageNum = 1
      this.getData(searchArr)
    },
    // 获取表格数据
    getData(form) {
      getExtremelyPoorList(form).then(res => {
        if (res && res.data.list) {
          this.tableData = res.data.list
          this.total = res.data.total
          this.exportData = _.cloneDeep(form)
          //   if (this.exportData.areaCode === undefined) {
          //     this.exportData.areaCode = []
          //   }
          delete this.exportData.pageNum
          delete this.exportData.pageSize
        }
      }).catch(() => {
        this.$message.error('获取特困人员信息失败！')
      })
    },
    // 表单重置按钮
    onReset() {
      this.areaCode = []
      this.form = {
        dateRange: '',
        ageMin: '',
        ageMax: '',
        sort: 'desc',
        applyType: '',
        keyword: '', // ID或者姓名
        areaCode: [], // 区域表单ID
        pageNum: pageModel.pageNum, // 分页页数
        pageSize: pageModel.pageSize // 分页数量
      },
      this.idEdit = !this.idEdit
      this.getData(this.form)
    },
    // 添加行
    addTableRow() {
      this.$router.push({
        path: '/extremelyPoorInfor/details',
        query: { 'modelType': 'add', '_title': '新增特困人员', 'menu': this.$route.meta.id } // modelType: 查看:look，编辑:edit，新增:add的类型
      })
    },
    // 双击行去详情页面
    toDetail(row) {
      this.$router.push({
        path: `/extremelyPoorInfor/details/${row.id}`,
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
        path: `/extremelyPoorInfor/details/${row.id}`,
        query: { 'modelType': 'edit', '_title': `编辑${row.fullName}`, 'menu': this.$route.meta.id }
      })
    },
    // 删除按钮
    handleRemove($index, row) {
      this.$confirm('确定要删除【' + row.fullName + '】吗？信息一旦被删除，将无法显示和操作。', '删除特困人员信息', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        removeExtremelyPoor(row.id).then(response => {
          if (response.code === 0 || response.code === '0') {
            this.$message({
              type: 'success',
              message: `删除特困人员信息成功！`
            })
            this.form.pageNum = 1
            this.getData(this.form)
          } else {
            this.$message.error(`删除特困人员信息操作失败，失败原因是：${response.msg}`)
          }
        }).catch(() => {
          this.$message.error(`删除特困人员信息操作失败!`)
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除！'
        })
      })
    },
    // 导入功能
    importFun() {
      this.dialogVisible = true
    },
    // 导出功能
    exportFun() {
      const confirmTitle = '相同筛选条件，10分钟内不可重复提交，确认导出吗？'
      this.$confirm(
        confirmTitle,
        '导出特困人员信息',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }
      )
        .then(() => {
          if (this.exportData.areaCode && this.exportData.areaCode.length == 0) {
            this.exportData.areaCode = ''
          }
          getExtremelyPoorExport(this.exportData).then(response => {
            if (response.code === 0) {
              this.$alert(exportContentConstant, exportTitleConstant, {
                confirmButtonText: exportGoDownloadConstant,
                cancelButtonText: exportKnowConstant,
                showCancelButton: true,
                callback: action => {
                  if (action === 'cancel') return
                  this.$router.push('/dataManagement/exportManagement')
                }
              })
            } else {
              this.$message.warning(response.msg)
            }
          }).catch((error) => {
            this.$message.warning(error.msg)
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
