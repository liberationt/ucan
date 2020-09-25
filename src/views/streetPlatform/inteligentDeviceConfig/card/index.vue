<!-- index.vue -->
<template>
  <el-container>
    <!--查询表单-->
    <el-header class="formDiv">
      <el-form :inline="true" :model="form" class="demo-form-inline">
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
            placeholder="请输入敬老卡编号或身份证号查询"
            style="width: 260px"
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
          >
            <el-table-column type="selection" width="50" fixed="left" />
            <el-table-column label="序号" width="80" fixed="left">
              <template slot-scope="{row,$index}">
                <span>{{ $index + 1 }}</span>
              </template>
            </el-table-column>
            <el-table-column label="姓名" prop="fullName" min-width="90" />
            <el-table-column label="身份证" prop="idCard" min-width="200" />
            <el-table-column label="敬老卡编号" prop="ecCode" />
            <el-table-column label="发卡日期" prop="openDate" />
            <el-table-column label="银行卡号" prop="bankAccount" min-width="150" />
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
      <import-dialog :upload-url="uploadUrl" :template-api="templateApi" template-name="敬老卡导入模板" :dialog-visible="dialogVisible" @visible="visible" />
    </el-dialog>

  </el-container>
</template>

<script>
import _ from 'lodash'
import qs from 'qs'
import { allSelectdictionaryData } from '@/api/common'
import {
  cardSearch,
  removeCard
} from '@/api/inteligentDeviceConfig/card'
import { getCardImportTemplate, getCardExport } from '@/api/importExportApi'
import ImportDialog from '@/components/importDialog/index'
import Pagination from '@/components/Pagination'
import { pageModel } from '@/common'
import { downloadFromBlob } from '@/utils/index'

import uploadExcelMix from '@/mixins/uploadExcelMix'

export default {
  components: {
    ImportDialog,
    Pagination
  },
  mixins: [uploadExcelMix],
  data() {
    return {
      // 查询表单
      form: {
        status: '', // 卡状态
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
      uploadUrl: process.env.VUE_APP_BASE_API + '/admin/person/elderly/card/import',
      templateApi: getCardImportTemplate
    }
  },
  mounted() {
    this.getDict()
    this.getData(this.form)
  },
  methods: {
    getDict() {
      const dictKeys = ['biz_card_status']
      allSelectdictionaryData(dictKeys).then(res => {
        const dict = res.data
        if (dict['biz_card_status']) {
          this.statusOptions = dict['biz_card_status']
        }
      }).catch(() => {
      })
    },
    // 表单查询按钮
    onSubmit() {
      this.form.pageNum = 1
      this.getData(this.form)
    },
    // 获取表格数据
    getData(form) {
      cardSearch(form).then(res => {
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
        this.$message.error('获取敬老卡失败！')
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
        path: '/card/details',
        query: { 'modelType': 'add', '_title': '新增敬老卡' } // modelType: 查看:look，编辑:edit，新增:add的类型
      })
    },
    // 双击行去详情页面
    toDetail(row) {
      this.$router.push({
        path: `/card/details/${row.id}`,
        query: { 'modelType': 'look', '_title': `查看${row.ecCode}`, 'menuId': this.$route.meta.id }
      })
    },
    // 多选的行数据
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    // 编辑按钮
    handleEdit(row) {
      this.$router.push({
        path: `/card/details/${row.id}`,
        query: { 'modelType': 'edit', '_title': `编辑${row.ecCode}` }
      })
    },
    // 删除按钮
    handleRemove($index, row) {
      const content = '<p>确定要删除【' + row.ecCode + '】敬老卡信息吗？</p><p>一旦被删除，将无法查看该信息。</p>'
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
              message: `删除敬老卡成功！`
            })
            this.form.pageNum = 1
            this.getData(this.form)
          } else {
            this.$message.error(`删除敬老卡操作失败，失败原因是：${response.msg}`)
          }
        }).catch(() => {
          this.$message.error(`删除敬老卡操作失败!`)
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
      let confirmTitle = ''
      if (this.form.status == '' && this.form.keyword == '') {
        confirmTitle = '确定要导出全部的敬老卡信息吗？'
      } else {
        confirmTitle = '确定要导出所筛选的敬老卡信息吗？'
      }
      this.$confirm(
        confirmTitle,
        '导出敬老卡',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }
      )
        .then(() => {
          const data = qs.stringify(this.exportData)
          getCardExport(data).then(response => {
            if (response instanceof ArrayBuffer) {
              const data = new Blob([response], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8;' })
              downloadFromBlob(data, '敬老卡列表.xlsx')
              this.$message.success('导出敬老卡信息成功！')
            } else {
              if (response.code != 0 || response.code != '0') {
                this.$message.error(response.msg)
              }
            }
          }).catch((error) => {
            if (error && error.message) {
              if (error.message.indexOf('timeout') > -1) {
                error.message = '网络超时'
              }
              this.$message.error('导出敬老卡信息操作失败，失败原因是：' + error.message)
            } else {
              this.$message.error('导出敬老卡信息操作失败！')
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
