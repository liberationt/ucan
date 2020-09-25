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
        <el-form-item label="服务商">
          <el-select
            v-model="form.spId"
            placeholder="请选择服务商"
            style="width: 200px"
            @keyup.enter.native="onSubmit"
          >
            <el-option
              v-for="item in optionsList"
              :key="item.spId"
              :label="item.spName"
              :value="item.spId"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="租赁点类型">
          <el-select
            v-model="form.orgType"
            placeholder="请选择租赁点类型"
            style="width: 200px"
            @keyup.enter.native="onSubmit"
          >
            <el-option
              v-for="item in rentalListOptions"
              :key="item.dictValue"
              :label="item.dictLabel"
              :value="item.dictValue"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="关键词">
          <el-input
            v-model.trim="form.orgName"
            clearable
            placeholder="输入租赁点名称查询"
            style="width: 200px"
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
            <el-table-column label="租赁点名称" show-overflow-tooltip prop="orgName" />
            <el-table-column label="租赁点类型" prop="orgTypeName" />
            <el-table-column label="咨询电话" prop="phone" />
            <el-table-column label="详细地址" show-overflow-tooltip prop="addr" />
            <el-table-column label="开放时间" prop="openStartTime">
              <template slot-scope="{row}">
                <span>{{ row.openStartTime }}</span>
                <span>-</span>
                <span>{{ row.openEndTime }}</span>
              </template>
            </el-table-column>
            <el-table-column label="服务商" prop="spName" />
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
      <el-dialog title="导入辅具租赁点" :visible.sync="dialogVisibleImport" class="importStyleDialog">
        <import-dialog
          :upload-url="uploadUrl"
          :template-api="getAssistiveReportExportTemplateDownload"
          template-name="辅具租赁点导入模板"
          :dialog-visible="dialogVisibleImport"
          @visible="visible"
        />
      </el-dialog>
    </el-main>
  </el-container>
</template>

<script>
import { allSelectdictionaryData } from '@/api/common'
import { getRentalPointList, deleteRentalPoint, getServerList } from '@/api/assistiveDevices/rentalPoint'
import { getAssistiveReportExportTemplateDownload, getAssistiveExport } from '@/api/importExportApi'
import ImportDialog from '@/components/importDialog/index'
import Address from '@/components/Address'
import Pagination from '@/components/Pagination'
import { downloadFromBlob } from '@/utils/index'
export default {
  components: {
    Address,
    Pagination,
    ImportDialog
  },
  data() {
    return {
      rentalListOptions: [], // 租赁点类型
      dialogVisibleImport: false,
      uploadUrl: process.env.VUE_APP_BASE_API + '/assistive/assistive/rent/store/import',
      // 查询表单
      form: {
        orgType: '',
        spId: '',
        areaCode: '', // 区域表单ID
        orgName: '', // 租赁点名称
        pageNum: 1, // 分页页数
        pageSize: 20 // 分页数量
      },
      // 区域全部ID
      areaCode: [],
      optionsList: [],
      idEdit: true,
      tableData: [], // table表格数据
      multipleSelection: [], // 多选的行数据
      total: 0, // 总共多少数量
      getAssistiveReportExportTemplateDownload
    }
  },
  mounted() {
    this.idEdit = false
    this.getServerList()
    this.getData(this.form)
    this.getSelect()
  },
  methods: {
    // 获取下拉字典
    getSelect() {
      return new Promise((resolve, reject) => {
        // 数据字典接口
        const dictKey = [
          'lease_point_type'
        			].join(',')
        allSelectdictionaryData(dictKey).then(response => {
          if (response.code === 0) {
            for (const k in response.data) {
              switch (k) {
                case 'lease_point_type':
                  this.rentalListOptions = response.data[k]
                  break
              }
            }
          }
          resolve()
        }).catch(() => {
          // this.$message.error(this.orgTypeName+'机构数据字典接口请求失败！');
          reject()
        })
      })
    },
    // 关闭弹窗
    visible(value) {
      this.dialogVisibleImport = value
    },
    importFun() {
      this.dialogVisibleImport = true
    },
    // 导出功能
    exportFun() {
      let confirmTitle = ''
      if (this.form.orgType == '' && this.form.areaCode.length == '0' && this.form.spId == '' && this.form.orgName == '') {
        confirmTitle = '确认导出全部信息吗？'
      } else {
        confirmTitle = '确认导出筛选信息吗？'
      }
      this.$confirm(
        confirmTitle,
        '导出辅具租赁点',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          closeOnClickModal: false
        }
      )
        .then(() => {
          const _form = this.form
          _form.areaCode = _form.areaCode.length ? _form.areaCode[0] : ''
          delete _form.pageNum
          delete _form.pageSize
          getAssistiveExport(_form).then(response => {
            if (response instanceof ArrayBuffer) {
              const datas = new Blob([response], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8;' })
              downloadFromBlob(datas, '辅具租赁点列表.xlsx')
            } else {
              if (response.code != 0 || response.code != '0') {
                this.$message.error('导出辅具租赁点信息操作失败，失败原因是：' + response.msg)
              }
            }
          }).catch(() => {
            if (error && error.message) {
              if (error.message.indexOf('timeout') > -1) {
                error.message = '网络连接超时'
              }
              this.$message.error('导出辅具租赁点信息操作失败，失败原因是：' + error.message)
            } else {
              this.$message.error('导出辅具租赁点信息操作失败！')
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
      		// 获取区域的值
    getAreaCode(val) {
      this.areaCode = val
    },
    // 表单查询按钮
    onSubmit() {
      const arr = []
      if (this.areaCode.length !== 0) {
        arr.push(this.areaCode[this.areaCode.length - 1])
      }
      this.form.areaCode = arr // 所选区域赋值
      this.form.pageNum = 1
      this.getData(this.form)
    },
    getServerList() {
      getServerList().then(res => {
        if (res.code == '0') {
          this.optionsList = res.data
        }
      })
    },
    // 获取表格数据
    getData(form) {
      getRentalPointList(form).then(res => {
        if (res.code == 0) {
          if (res.data) {
            this.tableData = res.data.list
            this.total = res.data.total
          }
        } else {
          this.$message.error(res.message)
        }
      }).catch(() => {
        this.$message.error('获取租赁点失败！')
      })
    },
    // 表单重置按钮
    onReset() {
      this.areaCode = []
      this.form = {
        orgType: '',
        spId: '',
        areaCode: '', // 区域表单ID
        orgName: '', // 租赁点名称
        pageNum: 1, // 分页页数
        pageSize: 20 // 分页数量
      }
      this.idEdit = !this.idEdit
      this.getData(this.form)
    },
    // 添加行
    addTableRow() {
      this.$router.push({
        path: '/rentalPoint/details',
        query: { 'modelType': 'add', '_title': '新增租赁点' } // modelType: 查看:look，编辑:edit，新增:add的类型
      })
    },
    // 双击行去详情页面
    toDetail(row) {
      this.$router.push({
        path: `/rentalPoint/details/${row.orgId}`,
        query: { 'modelType': 'look', '_title': `查看${row.orgName}`, 'menuId': this.$route.meta.id }
      })
    },
    // 多选的行数据
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    // 编辑按钮
    handleEdit(row) {
      this.$router.push({
        path: `/rentalPoint/details/${row.orgId}`,
        query: { 'modelType': 'edit', '_title': `编辑${row.orgName}` }
      })
    },
    // 删除按钮
    handleRemove($index, row) {
      const content = '<p>确定要删除【' + row.orgName + '】租赁点信息吗？</p><p>一旦被删除，将无法查看该信息。</p>'
      this.$confirm(content, '删除租赁点', {
        dangerouslyUseHTMLString: true,
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteRentalPoint(row.orgId).then(response => {
          if (response.code === 0 || response.code === '0') {
            this.$message({
              type: 'success',
              message: `删除租赁点成功！`
            })
            this.form.pageNum = 1
            this.getData(this.form)
          } else {
            this.$message.error(`删除租赁点操作失败，失败原因是：${response.msg}`)
          }
        }).catch(() => {
          this.$message.error(`删除租赁点操作失败!`)
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除！'
        })
      })
    }
  }
}
</script>

<style scoped>
	@import "~@/styles/form.css";
</style>
|
