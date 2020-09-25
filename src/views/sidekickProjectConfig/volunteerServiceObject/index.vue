<!--志愿者服务对象-->
<template>
  <el-container>
    <!--查询表单-->
    <el-header class="formDiv">
      <el-form :inline="true" :model="form" class="demo-form-inline">
        <el-form-item label="所属区域">
          <Address
            :area-code="liveArea"
            :form-code="form.liveArea"
            :id-edit="idEdit"
            :width="'200px'"
            @getAreaCode="getAreaCode"
            @keyup.enter.native="onSubmit"
          />
        </el-form-item>
        <el-form-item label="关键词">
          <el-input
            v-model.trim="form.fullName"
            clearable
            placeholder="请输入老人或志愿者的姓名或身份证查询"
            style="width: 300px"
          />
        </el-form-item>
        <el-form-item label="更新时间">
          <!-- <el-date-picker
						v-model="form.changeTime"
						type="date"
						format="yyyy-MM-dd"
						value-format="yyyy-MM-dd"
						placeholder="选择更新时间">
						</el-date-picker> -->
          <el-date-picker
            v-model="projectPeriod"
            type="daterange"
            range-separator="-"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            format="yyyy-MM-dd"
            value-format="yyyy-MM-dd"
            style="width: 300px"
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
            <el-button v-has="{class: '迁入'}" type="primary" class="base-btn" @click="showDialogVisible">迁入
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
            <el-table-column label="姓名" prop="fullName" min-width="150" />
            <el-table-column label="性别" prop="sexName" min-width="120">
              <template slot-scope="{row}">
                <span v-if="row.sex==1">女</span>
                <span v-if="row.sex==0">男</span>
              </template>
            </el-table-column>
            <el-table-column label="年龄" prop="age" min-width="150" />
            <el-table-column label="身份证号" prop="idCard" min-width="200" />
            <el-table-column label="联系电话" prop="homePhone" min-width="200" />
            <el-table-column label="居住地址" prop="liveAddr" min-width="200" />
            <el-table-column label="结对志愿者" prop="volunteerName" min-width="200" />
            <el-table-column label="创建者" prop="createBy" min-width="200" />
            <el-table-column label="更新时间" prop="changeTime" min-width="200" />
            <el-table-column fixed="right" label="操作" width="150" header-align="center">
              <template slot-scope="{row,$index}">
                <span v-has="{class: '编辑'}" class="table-btn" @click="handleEdit(row)">编辑</span>
                <span
                  v-has="{class: '删除'}"
                  class="table-btn"
                  @click="handleRemove($index, row)"
                >删除</span>
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

        <!--				<el-dialog title="导入志愿者服务对象" :visible.sync="dialogVisibleImport" class="importStyleDialog">-->
        <!--					<import-dialog-->
        <!--							:upload-url="uploadUrl"-->
        <!--							:template-api="getVolunteerServiceObjTemplateDownload"-->
        <!--							template-name="志愿者服务对象导入模板"-->
        <!--							@visible="visible"-->
        <!--							:dialog-visible="dialogVisibleImport">-->
        <!--					</import-dialog>-->
        <!--				</el-dialog>-->

        <el-dialog title="导入信息" :visible.sync="dialogVisibleImport" class="importStyleDialog">
          <import-dialog :upload-url="uploadUrl" :template-api="downloadServiceObjTemplate" template-name="志愿者管理导入模板" :dialog-visible="dialogVisibleImport" @visible="visible" />
        </el-dialog>
        <ExcelUpload :dialog-table-visible="isShow" :upload-urls="uploadOberctUrl" :volunteer-import="false" :volunteer-service="true" :title="'导入服务对象'" :template-name="'服务对象导入模板'" :template-api="downloadServiceObjTemplate" :upload-url="uploadUrl" :type="'志愿者服务对象,志愿者服务对象失败导入'" @visible="visible" />

      </el-container>
    </el-main>
    <el-dialog
      v-dialogDrag
      title="迁入服务对象"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose"
    >
      <div>
        <div style="text-align:center;margin:50px 0;">
          <el-input v-model.trim="idCard" placeholder="请输入老人身份证号查询" style="width:50%" clearable />
          <el-button type="primary" @click="seachInfor">查询</el-button>
          <el-button type="primary" @click="resetIdCard">重置</el-button>
        </div>
        <div v-if="showTable">
          <el-table
            :data="dataList"
            tooltip-effect="dark"
            style="width: 100%;"
            border
            row-key="id"
          >
            <el-table-column label="姓名" prop="fullName" min-width="80" />
            <el-table-column label="性别" prop="sexName" min-width="60">
              <template slot-scope="{row}">
                <span v-if="row.sex==1">女</span>
                <span v-if="row.sex==0">男</span>
              </template>
            </el-table-column>
            <el-table-column label="年龄" prop="age" min-width="60" />
            <el-table-column label="身份证号" prop="idCard" min-width="150" />
            <el-table-column label="居住行政区划" prop="liveAreaName" show-overflow-tooltip min-width="150" />
            <el-table-column label="居住地址" prop="liveAddr" show-overflow-tooltip min-width="100" />
          </el-table>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleClose">取 消</el-button>
        <el-button type="primary" @click="submit">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      v-dialogDrag
      title="迁入地址"
      :visible.sync="dialogSubmit"
      width="10%"
      :before-close="closeDialogSubmit"
    >
      <div>
        <div style="text-align:center;margin:50px 0;">
          <p>请输入{{ dataList&&dataList.length?dataList[0].fullName:'' }}在您街道的居住地址</p>
          <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="100px" class="demo-ruleForm">
            <el-form-item label="居住地址：" prop="adders">
              <el-input v-model="ruleForm.adders" />
            </el-form-item>
          </el-form>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="resetForm('ruleForm')">取 消</el-button>
        <el-button type="primary" @click="submitForm('ruleForm')">确 定</el-button>
      </span>
    </el-dialog>
  </el-container>
</template>

<script>
import _ from 'lodash'
import qs from 'qs'
import Address from '@/components/Address'
import Pagination from '@/components/Pagination'
// import {pageModel} from '@/common'
import {
  institutionSearch,
  removeTableRowData,
  getMoveServiceObjByIdCard,
  moveServiceObjRecord
} from '@/api/sidekickProjectConfig/volunteerServiceObject'
import { getDate_YMD, parseTime } from '@/utils/index.js'
import { getVolunteerServiceObjExport, getVolunteerServiceObjTemplateDownload, downloadServiceObjTemplate } from '@/api/importExportApi'
import { downloadFromBlob, limitTextEllipsis } from '@/utils/index'
import uploadExcelMix from '@/mixins/uploadExcelMix'
import ImportDialog from '@/components/importDialog/index'
import { getToken } from '@/utils/auth'
import ExcelUpload from '@/components/newExcelUpload/index'
import { exportTitleConstant, exportContentConstant, exportGoDownloadConstant, exportKnowConstant, canExport } from '@/common/constant'// 常量池
export default {
  components: {
    ImportDialog,
    Address,
    Pagination,
    ExcelUpload
  },
  mixins: [uploadExcelMix],
  data() {
    return {
      idCard: '',
      showTable: false,
      dialogVisible: false,
      dataList: [],
      isShow: false,
      dialogVisibleImport: false,
      dialogSubmit: false,
      ruleForm: {
        adders: '',
        id: ''
      },
      rules: {
        adders: [{ required: true, message: '请填写居住地址', trigger: 'blur' }]
      },
      projectPeriod: [],
      // 查询表单
      form: {
        // changeTime:'',
        startChangeTime: '',
        endChangeTime: '',
        liveArea: [], // 区域表单ID
        fullName: '', // 关键字查询
        pageNum: 1, // 分页页数
        pageSize: 10 // 分页数量
      },
      // 区域全部ID
      liveArea: [],
      // <-- table -->
      tableData: [], // table表格数据
      multipleSelection: [], // 多选的行数据
      total: 0, // 总共多少数量
      uploadUrl: process.env.VUE_APP_BASE_API + '/volunteer/import/serviceObj/Success',
      uploadOberctUrl: process.env.VUE_APP_BASE_API + '/volunteer/import/serviceObj/Failure',
      headers: {
        Authorization: 'Bearer ' + getToken() // Authorization ，而不是token
      },
      idEdit: true,
      exportData: '', // 查询成功后赋值
      downloadServiceObjTemplate,
      getVolunteerServiceObjTemplateDownload
    }
  },
  mounted() {
    this.idEdit = false
    this.getData(this.form)
  },
  methods: {
    getIn() {

    },
    showDialogVisible() {
      this.idCard = ''
      this.showTable = false
      this.dialogVisible = true
    },
    submit() {
      if (this.dataList && this.dataList.length) {
        const fullName = this.dataList[0].fullName
        this.$confirm(`确定要将${fullName}老人迁入您所在的街道吗?`, '温馨提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.dialogSubmit = true
        }).catch(() => {

        })
      } else {
        this.$message.error('请先查询老人信息')
      }
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.ruleForm.id = this.dataList[0].id
          moveServiceObjRecord(this.ruleForm).then(res => {
            if (res.code == 0) {
              this.dialogVisible = false
              this.dialogSubmit = false
              this.$message.success('迁入成功')
              this.onSubmit()
            } else {
              this.$message.error(res.msg)
            }
          })
        }
      })
    },
    resetForm(formName) {
      this.dialogSubmit = false
      this.$refs[formName].resetFields()
    },
    closeDialogSubmit(formName) {
      this.dialogSubmit = false
    },
    seachInfor() {
      this.dataList = []
      getMoveServiceObjByIdCard({ idCard: this.idCard }).then(res => {
        if (res.code == 0) {
          this.showTable = true
          this.dataList.push(res.data)
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    resetIdCard() {
      this.dataList = []
      this.idCard = ''
    },
    handleClose() {
      this.dialogVisible = false
      this.dataList = []
      this.idCard = ''
    },
    // 获取区域的值
    getAreaCode(val) {
      this.liveArea = val
    },
    // 老人标签选择事件
    handleChange(val) {
    },
    // 表单查询按钮
    async onSubmit() {
      const arr = []
      if (this.liveArea.length !== 0) {
        arr.push(this.liveArea[this.liveArea.length - 1])
      }
      this.form.liveArea = arr // 所选区域赋值
      this.form.pageNum = 1// 分页页数
      this.form.pageSize = 10 // 分页数量
      await this.getData(this.form)
    },
    // 获取表格数据
    async getData(form) {
      if (this.projectPeriod) {
        form.startChangeTime = this.projectPeriod[0]
        form.endChangeTime = this.projectPeriod[1]
      } else {
        form.startChangeTime = ''
        form.endChangeTime = ''
      }
      const parmas = _.cloneDeep(form)
      parmas.liveArea = typeof (parmas.liveArea) === 'object' ? parmas.liveArea.join('') : parmas.liveArea
      await institutionSearch(form).then(res => {
        if (res.rows) {
          this.tableData = res.rows
          this.total = res.total
          this.exportData = _.cloneDeep(form)
        } else {
          this.tableData = []
          this.total = 0
        }
      })
    },
    // 表单重置按钮
    onReset() {
      this.liveArea = []
      this.form = {
        // changeTime:'',
        liveArea: [], // 区域表单ID
        fullName: '', // 关键字查询
        pageNum: 1, // 分页页数
        pageSize: 10 // 分页数量
      }
      this.projectPeriod = []
      this.idEdit = !this.idEdit
      this.getData(this.form)
    },
    // 添加行
    addTableRow() {
      this.$router.push({
        path: `/volunteerServiceObject/details/0`,
        query: { 'modelType': 'add', '_title': `新增志愿者服务对象` } // modelType: 查看:look，编辑:edit，新增:add的类型
      })
    },
    // 双击行去详情页面
    toDetail(row) {
      const _title_ = limitTextEllipsis(row.fullName, 10)
      this.$router.push({
        path: `/volunteerServiceObject/details/${row.id}`,
        query: {
          'id': row.id,
          'modelType': 'look',
          '_title': `查看${_title_}`,
          'editAuthority': this.$route.meta.id
        } // modelType: 查看:look，编辑:edit，新增:add的类型
      })
    },
    // 多选的行数据
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    // 编辑按钮
    handleEdit(row) {
      const _title_ = limitTextEllipsis(row.fullName, 10)
      this.$router.push({
        path: `/volunteerServiceObject/details/${row.id}`,
        query: { 'id': row.id, 'modelType': 'edit', '_title': `编辑${_title_}` } // modelType: 查看:look，编辑:edit，新增:add的类型
      })
    },
    // 删除按钮
    handleRemove($index, row) {
      const _title_ = limitTextEllipsis(row.fullName, 10)
      this.$confirm('确定要删除【' + _title_ + '】服务对象吗？一旦被删除，将无法查看相关信息。', '删除志愿者服务对象', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        closeOnClickModal: false
      }).then(() => {
        removeTableRowData(row.id).then(response => {
          if (response.code === 0 || response.code === '0') {
            this.$message({
              type: 'success',
              message: response.msg
            })
            this.form.pageNum = 1
            this.getData(this.form)
          } else {
            this.$message.error(response.msg)
          }
        }).catch(() => {
          this.$message.error('操作失败！')
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除！'
        })
      })
    },
    importFun() {
      this.isShow = true
    },
    // 导出功能
    async exportFun() {
      // 导出之前先获取列表数据 如果总记录数超出限制则不继续执行
      await this.onSubmit()
      if (!canExport(this.total)) return

      const confirmTitle = '相同筛选条件，10分钟内不可重复提交，确认导出吗？'
      this.$confirm(
        confirmTitle,
        '导出服务对象',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }
      )
        .then(() => {
          getVolunteerServiceObjExport(this.exportData).then(response => {
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
      this.isShow = value
    }
  }
}
</script>

<style scoped>
	@import "~@/styles/form.css";

	.instituWrap {
		padding: 20px 20px 40px 20px;
	}

	.instituDiv {
		float: left;
		width: 140px;
		height: 140px;
		text-align: center;
		cursor: pointer;
		background-color: #DAE9F5;
		transition: all 0.5s;
	}

	.instituDiv .iconfont {
		font-size: 100px;
		display: block;
		color: #147FD9;
	}

	.instituDiv .text {
		font-size: 16px;
		color: #147FD9;
	}

	.instituDiv:first-child {
		margin-right: 40px;
	}

	.instituDiv:hover {
		background-color: #bfdcf3;
	}
</style>

