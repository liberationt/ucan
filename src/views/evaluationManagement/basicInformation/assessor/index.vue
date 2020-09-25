<template>
  <el-container>
    <!--查询表单-->
    <el-header class="formDiv">
      <el-form :inline="true" :model="form" class="demo-form-inline">
        <el-form-item label="所属区域">
          <Address
            :area-code="areaCode"
            :form-code="form.liveArea"
            :id-edit="idEdit"
            :width="'200px'"
            @getAreaCode="getAreaCode"
            @keyup.enter.native="onSubmit"
          />
        </el-form-item>
        <el-form-item label="养老机构">
          <el-autocomplete
            v-model="form.orgName"
            class="inline-input"
            :fetch-suggestions="querySearch"
            placeholder="请输入内容"
            :trigger-on-focus="false"
            style="width:100%"
            @keyup.enter.native="onSubmit"
          />
        </el-form-item>
        <el-form-item label="评估师等级">
          <el-select
            v-model="form.assessLevel"
            placeholder="请选择评估师等级"
            clearable
            style="width:100%;"
            @keyup.enter.native="onSubmit"
          >
            <el-option
              v-for="item in assessLevelOptions"
              :key="item.dictValue"
              :label="item.dictLabel"
              :value="item.dictValue"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="关键词">
          <el-input
            v-model.trim="form.keyWord"
            clearable
            placeholder="请输入评估师姓名、手机号或身份证号"
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
          >
            <el-table-column type="selection" width="50" fixed="left" />
            <el-table-column label="序号" width="80" fixed="left">
              <template slot-scope="{row,$index}">
                <span>{{ $index + 1 }}</span>
              </template>
            </el-table-column>
            <el-table-column label="姓名" prop="fullName" min-width="90" />
            <el-table-column label="性别" prop="sex" min-width="60">
              <template slot-scope="{row, $index}">
                <span v-if="row.sex==0">男</span>
                <span v-if="row.sex==1">女</span>
              </template>
            </el-table-column>
            <el-table-column label="年龄" prop="age" min-width="60" />
            <el-table-column label="身份证" prop="idCard" min-width="180" />
            <el-table-column label="手机号" prop="mobile" min-width="180" />
            <el-table-column label="评估师等级" prop="assessLevelName" min-width="180" />
            <el-table-column label="评估区域" prop="evaluationArea" show-overflow-tooltip min-width="180" />
            <el-table-column label="养老机构" prop="orgName" min-width="180" />
            <el-table-column label="登录账号" prop="userName" min-width="180" />
            <el-table-column fixed="right" label="操作" width="320" header-align="center">
              <template slot-scope="{row, $index}">
                <span v-has="{class: '编辑'}" class="table-btn" @click="handleEdit(row)">编辑</span>
                <span v-has="{class: '设置区域'}" class="table-btn" @click="showDialog(row)">设置区域</span>
                <span v-has="{class: '关联账号'}" class="table-btn" @click="openAccount(row)">关联账号</span>
                <!-- 去掉删除评估师功能 UCC-2974 -->
                <!-- <span v-has="{class: '删除'}" class="table-btn" @click="handleRemove(row)">删除</span>-->
              </template>
            </el-table-column>
          </el-table>
          <pagination
            v-show="total>0"
            :total="total"
            :page.sync="form.pageNum"
            :limit.sync="form.pageSize"
            @pagination="getDataList"
          />
        </el-main>
      </el-container>
    </el-main>
    <Dialog v-if="isShow" :center-dialog-visible="centerDialogVisible" :close-dialog="closeDialog" :pension-assess-id="pensionAssessId" />
    <AccountDailog :id="accountId" :dialog-table-visible="isAccount" :close="closeAccount" :success="bindSuccess" />
    <ExcelUpload :dialog-table-visible="dialogVisible" :title="'导入评估师'" :template-name="'评估师导入模板'" :template-api="templateApi" :upload-url="uploadUrl" :type="'评估师'" @visible="visible" />
  </el-container>
</template>
<script>
import _ from 'lodash'
import Address from '@/components/Address'
import Pagination from '@/components/Pagination'
import { pageModel } from '@/common'
import { allSelectdictionaryData } from '@/api/facilitiesConfig/pensionAgency'
import { getAssessorList, delAssessor, getOrgList } from '@/api/evaluationManagement/basicInformation'
import Dialog from './Dialog'
import AccountDailog from './accountDailog'
import ExcelUpload from '@/components/newExcelUpload/assessorInformation'
import uploadExcelMix from '@/mixins/uploadExcelMix'
import { getAssessorDownload, getAssessorExport } from '@/api/importExportApi'
import { exportTitleConstant, exportContentConstant, exportGoDownloadConstant, exportKnowConstant, canExport } from '@/common/constant'// 常量池
export default {
  components: { Address, Pagination, Dialog, AccountDailog, ExcelUpload },
  mixins: [uploadExcelMix],
  data() {
    return {
      centerDialogVisible: false,
      dialogVisible: false,
      uploadUrl: process.env.VUE_APP_BASE_API + '/assess/pension/assess/emp/import',
      templateApi: getAssessorDownload,

      tableData: [],
      total: 0,
      areaCode: [],
      idEdit: true,
      assessLevelOptions: [],
      orgOptions: [],
      restaurants: [],
      isShow: false,
      exportData: {},
      form: {
        // dateRange: '',
        orgName: '',
        liveArea: '',
        assessLevel: '',
        keyWord: '',
        pageNum: pageModel.pageNum, // 分页页数
        pageSize: pageModel.pageSize // 分页数量
      },
      isAccount: false,
      accountId: '',
      pensionAssessId: ''
    }
  },
  mounted() {
    this.idEdit = false
    this.getSelect()
    this.getOrgOption()
    this.getDataList()
  },
  methods: {
    importFun() {
      this.dialogVisible = true
    },
    async exportFun() {
      // 导出之前先获取列表数据 如果总记录数超出限制则不继续执行
      await this.onSubmit()
      if (!canExport(this.total)) return
      const confirmTitle = '相同筛选条件，10分钟内不可重复提交，确认导出吗？'
      this.$confirm(
        confirmTitle,
        '导出评估师',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }
      )
        .then(() => {
          getAssessorExport(this.exportData).then(response => {
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
    visible(value) {
      this.dialogVisible = value
    },
    bindSuccess() {
      this.form.pageNum = 1
      this.getDataList()
    },
    openAccount(row) {
      this.isAccount = true
      this.accountId = row.id
    },
    closeAccount() {
      this.isAccount = false
    },
    handleSelectionChange(val) {

    },
    closeDialog() {
      this.isShow = false
      this.centerDialogVisible = false
      this.getDataList()
    },
    showDialog(row) {
      this.isShow = true
      this.centerDialogVisible = true
      this.pensionAssessId = row.id
    },
    // 查看
    toDetail(row) {
      this.$router.push({
        path: `/assessor/details/${row.id}`,
        query: { 'modelType': 'look', '_title': `查看${row.fullName}`, 'menu': this.$route.meta.id }
      })
    },
    getAreaCode(val) {
      this.areaCode = val
    },
    // 查询
    async onSubmit() {
      this.form.pageNum = 1
      await this.getDataList()
    },
    querySearch(queryString, cb) {
      var restaurants = this.restaurants
      var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants
      // 调用 callback 返回建议列表的数据
      cb(results)
    },
    createFilter(queryString) {
      return (restaurant) => {
        return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0)
      }
    },
    // 重置
    onReset() {
      this.areaCode = []
      this.form = {
        orgId: '',
        liveArea: '',
        assessLevel: '',
        keyWord: '',
        pageNum: pageModel.pageNum, // 分页页数
        pageSize: pageModel.pageSize // 分页数量
      }
      this.idEdit = !this.idEdit
      this.getDataList()
    },
    // 添加
    addTableRow() {
      this.$router.push(`/assessor/details?modelType=add`)
    },
    // 编辑
    handleEdit(row) {
      this.$router.push({
        path: `/assessor/details/${row.id}`,
        query: { 'modelType': 'edit', '_title': `编辑${row.fullName}`, 'menu': this.$route.meta.id }
      })
    },
    // 删除
    handleRemove(row) {
      this.$confirm('确定要删除【' + row.fullName + '】吗？信息一旦被删除，将无法显示和操作。', '删除评估师', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        delAssessor(row.id).then(res => {
          if (res.code === '0') {
            this.$message({
              type: 'success',
              message: `删除评估师信息成功！`
            })
            this.form.pageNum = 1
            this.getDataList()
          } else {
            this.$message.error(`删除评估师信息操作失败，失败原因是：${res.msg}`)
          }
        }).catch(() => {
          this.$message.error(`删除评估师信息操作失败!`)
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除！'
        })
      })
    },
    // 获取
    async getDataList() {
      const params = _.cloneDeep(this.form)
      if (this.areaCode && this.areaCode.length) {
        params.liveArea = this.areaCode[this.areaCode.length - 1]
      } else {
        params.liveArea = ''
      }
      await getAssessorList(params).then(res => {
        if (res.code === 0) {
          this.tableData = res.data.list
          this.total = res.data.total
          this.exportData = _.cloneDeep(params)
          delete this.exportData.pageNum
          delete this.exportData.pageSize
        }
      })
    },
    getOrgOption() {
      getOrgList().then(res => {
        if (res.code === 0) {
          if (res.data.list && res.data.list.length) {
            res.data.list.forEach(item => {
              this.restaurants.push({
                value: item.orgName
              })
            })
          }
        }
      })
    },
    getSelect() {
      const dictKey = [
        'assessor_level'// 等级
      ].join(',')
      return new Promise((resolve, reject) => {
        allSelectdictionaryData(dictKey).then(response => {
          const dict = response.data
          for (const key in dict) {
            switch (key) {
              case 'assessor_level':
                this.assessLevelOptions = dict[key]
                break
            }
          }
          resolve()
        }).catch(() => {
          reject()
        })
      })
    }
  }
}
</script>
