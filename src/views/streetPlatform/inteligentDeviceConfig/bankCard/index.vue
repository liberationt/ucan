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
        <el-form-item label="卡状态">
          <el-select v-model="form.status" placeholder="请选择卡状态" clearable style="width: 200px" @keyup.enter.native="onSubmit">
            <el-option
              v-for="item in statusOptions"
              :key="item.dictValue"
              :label="item.dictLabel"
              :value="item.dictValue"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="关键词">
          <el-input
            v-model.trim="form.keyword"
            clearable
            placeholder="请输入姓名或银行卡号或身份证号查询"
            style="width: 300px"
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
            <el-button v-has="{class: '新增'}" type="primary" class="base-btn" @click="addTableRow()">新增</el-button>
            <el-button v-has="{class: '导入'}" type="primary" class="base-btn" @click="importFun()">导入</el-button>
            <el-button v-has="{class: '导出'}" type="primary" class="base-btn" @click="exportFun()">导出</el-button>

            <div v-if="total !== 0" class="totalWrap">已筛选到{{ total }}条匹配信息</div>
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
          >
            <el-table-column type="selection" width="50" fixed="left" />
            <el-table-column label="序号" width="80" fixed="left">
              <template slot-scope="{row,$index}">
                <span>{{ $index + 1 }}</span>
              </template>
            </el-table-column>
            <el-table-column label="姓名" prop="fullName" min-width="90" />
            <el-table-column label="所属居委" prop="committee" min-width="90" />
            <el-table-column label="年龄" prop="age" min-width="90" />
            <el-table-column label="身份证" prop="idCard" min-width="180" />
            <el-table-column label="银行卡号" prop="bankAccount" min-width="150" />
            <el-table-column label="发卡日期" prop="openDate" />
            <el-table-column label="发卡银行" prop="openBankName" />
            <el-table-column label="卡状态" prop="statusName" />
            <el-table-column label="津贴标准" prop="subsidy">
              <template slot-scope="{row}">
                <span v-if="row.subsidy>0">{{ fomatFloat(row.subsidy,2) }}元/月</span>
                <span v-if="row.subsidy===0">0.00元/月</span>
              </template>
            </el-table-column>
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

    <el-dialog title="导入信息" :visible.sync="dialogVisible" class="importStyleDialog">
      <import-dialog :upload-url="uploadUrl" :template-api="templateApi" template-name="银行卡导入模板" :dialog-visible="dialogVisible" @visible="visible" />
    </el-dialog>
    <ExcelUpload :dialog-table-visible="isShow" :title="'导入银行卡数据'" :template-name="'银行卡导入模板'" :template-api="templateApi" :upload-url="uploadUrl" :type="'银行卡'" @visible="visible" />
  </el-container>
</template>

<script>
import _ from 'lodash'
import Address from '@/components/Address'
import { allSelectdictionaryData } from '@/api/common'
import {
  getBankCardList,
  removeCard
} from '@/api/inteligentDeviceConfig/bankCard'
import { getCardImportTemplate, getBankCardExport, bankTemplateDownload } from '@/api/importExportApi'
import ImportDialog from '@/components/importDialog/index'
import Pagination from '@/components/Pagination'
import { pageModel } from '@/common'
import { downloadFromBlob } from '@/utils/index'
import uploadExcelMix from '@/mixins/uploadExcelMix'
import ExcelUpload from '@/components/newExcelUpload/index'
import {exportTitleConstant, exportContentConstant, exportGoDownloadConstant, exportKnowConstant, canExport} from '@/common/constant';// 常量池
export default {
  components: {
    ImportDialog,
    Pagination,
    ExcelUpload,
    Address
  },
  mixins: [uploadExcelMix],
  data() {
    return {
      isShow: false,
      idEdit: true,
      areaCode: [],
      // 查询表单
      form: {
        status: '', // 卡状态
        areaCode: '',
        dateRange: '',
        ageMin: '',
        ageMax: '',
        keyword: '', // ID或者姓名
        pageNum: pageModel.pageNum, // 分页页数
        pageSize: pageModel.pageSize // 分页数量
      },
      statusOptions: [], // 卡状态选项
      // <-- table -->
      tableData: [], // table表格数据
      multipleSelection: [], // 多选的行数据
      total: 0, // 总共多少数量
      exportData: '', // 查询成功后赋值
      dialogVisible: false,
      uploadUrl: process.env.VUE_APP_BASE_API + '/biz/person/bank/card/import',
      templateApi: bankTemplateDownload
    }
  },
  mounted() {
    this.getDict()
    this.getData(this.form)
    this.idEdit = false
  },
  methods: {
    getAreaCode(val) {
      this.areaCode = val
    },
    getDict() {
      const dictKeys = ['biz_bank_card_status']
      allSelectdictionaryData(dictKeys).then(res => {
        const dict = res.data
        if (dict['biz_bank_card_status']) {
          this.statusOptions = dict['biz_bank_card_status']
        }
      }).catch(() => {
        		})
    },
    // 表单查询按钮
    async onSubmit() {
      this.form.pageNum = 1
      await this.getData(this.form)
    },
    // 获取表格数据
    async getData(form) {
      const arr = []
      if (this.areaCode && this.areaCode.length !== 0) {
        arr.push(this.areaCode[this.areaCode.length - 1])
      }
      this.form.areaCode = arr[0] // 所选区域赋值
      await getBankCardList(form).then(res => {
        if (res.code == 0) {
          if (res.data) {
            this.tableData = res.data.list
            this.total = res.data.total
            this.exportData = _.cloneDeep(form)
            delete this.exportData.pageNum
            delete this.exportData.pageSize
          }
        } else {
          this.$message.error(res.message)
        }
      }).catch(() => {
        this.$message.error('获取银行卡失败！')
      })
    },
    // 表单重置按钮
    onReset() {
      this.form = {
        status: '', // 卡状态
        keyword: '', // ID或者姓名
        pageNum: pageModel.pageNum, // 分页页数
        pageSize: pageModel.pageSize // 分页数量
      }
      this.getData(this.form)
      this.idEdit = !this.idEdit
    },
    fomatFloat(num, n) {
      var f = parseFloat(num)
      if (isNaN(f)) {
        return 0
      }
      f = Math.round(num * Math.pow(10, n)) / Math.pow(10, n) // n 幂
      var s = f.toString()
      var rs = s.indexOf('.')
      // 判定如果是整数，增加小数点再补0
      if (rs < 0) {
        rs = s.length
        s += '.'
      }
      while (s.length <= rs + n) {
        s += '0'
      }
      return s
    },
    // 添加行
    addTableRow() {
      this.$router.push({
        path: '/bankCard/details',
        query: { 'modelType': 'add', '_title': '新增银行卡' } // modelType: 查看:look，编辑:edit，新增:add的类型
      })
    },
    // 双击行去详情页面
    toDetail(row) {
      this.$router.push({
        path: `/bankCard/details/${row.id}`,
        query: { 'modelType': 'look', '_title': `查看银行卡`, 'menuId': this.$route.meta.id }
      })
    },
    // 多选的行数据
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    // 编辑按钮
    handleEdit(row) {
      this.$router.push({
        path: `/bankCard/details/${row.id}`,
        query: { 'modelType': 'edit', '_title': `编辑银行卡` }
      })
    },
    // 删除按钮
    handleRemove($index, row) {
        		const content = '<p>确定要删除银行卡信息吗？</p><p>一旦被删除，将无法查看该信息。</p>'
      this.$confirm(content, '删除信息', {
         			dangerouslyUseHTMLString: true,
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        removeCard(row.id).then(response => {
          if (response.code === 0 || response.code === '0') {
            this.$message({
              type: 'success',
              message: `删除银行卡成功！`
            })
            this.form.pageNum = 1
            this.getData(this.form)
          } else {
            this.$message.error(`删除银行卡操作失败，失败原因是：${response.msg}`)
          }
        }).catch(() => {
          this.$message.error(`删除银行卡操作失败!`)
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
      this.isShow = true
    },
    // 导出功能
    async exportFun() {
      // 导出之前先获取列表数据 如果总记录数超出限制则不继续执行
      await this.onSubmit();
      if (!canExport(this.total)) return;

      const confirmTitle = '相同筛选条件，10分钟内不可重复提交，确认导出吗？'
      this.$confirm(
        confirmTitle,
        '导出银行卡',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }
      )
        .then(() => {
          getBankCardExport(this.exportData).then(response => {
            if (response.code === 0) {
              this.$alert(exportContentConstant, exportTitleConstant, {
                confirmButtonText: exportGoDownloadConstant,
                cancelButtonText: exportKnowConstant,
                showCancelButton: true,
                callback: action => {
                  if (action === 'cancel') return;
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
      this.isShow = value
    }
  }
}
</script>

<style scoped>
	@import "~@/styles/form.css";
</style>
|
