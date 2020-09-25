<!--志愿者管理-->
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
            placeholder="请输入姓名或身份证号查询"
            style="width: 280px"
          />
        </el-form-item>
        <el-form-item label="服务月份">
          <el-date-picker
                  v-model="form.serviceMonth"
                  type="month"
                  format="yyyy-MM"
                  value-format='yyyy-MM'
                  placeholder="选择服务月份">
          </el-date-picker>
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
            <el-button v-has="{class: '新增'}" type="primary" class="base-btn" @click="showSelectFWSPannel()">绑定对象
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
            ref="listTable"
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
            <el-table-column label="身份证号" prop="idCard" min-width="200" />
            <el-table-column label="联系电话" prop="phone" min-width="150" />
            <el-table-column label="所属社会组织" prop="socialOrgName" min-width="200" />
            <el-table-column label="关联项目" prop="serviceName" min-width="200" show-overflow-tooltip />
            <el-table-column label="服务对象人数" prop="servicePeopleNumber" min-width="150" />
            <el-table-column label="当月服务次数" prop="serviceNumber" min-width="150" />
            <el-table-column fixed="right" label="操作" width="160" header-align="center">
              <template slot-scope="{row,$index}">
                <span
                  v-if="row.servicePeopleNumber>0"
                  v-has="{class: '解除绑定'}"
                  class="table-btn3"
                  @click="unboundRemove($index, row)"
                >解除绑定</span>
                <span v-has="{class: '编辑'}" class="table-btn3" @click="handleEdit(row)">编辑</span>
                <span
                  v-has="{class: '删除'}"
                  class="table-btn3"
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
      </el-container>
    </el-main>

    <!--		<el-dialog title="导入志愿者管理" :visible.sync="dialogVisibleImport" class="importStyleDialog">-->
    <!--			<import-dialog-->
    <!--					:upload-url="uploadUrl"-->
    <!--					:template-api="getVolunteerManagementTemplateDownload"-->
    <!--					template-name="志愿者管理导入模板"-->
    <!--					@visible="visible"-->
    <!--					:dialog-visible="dialogVisibleImport">-->
    <!--			</import-dialog>-->
    <!--		</el-dialog>-->
    <el-dialog title="导入信息" :visible.sync="dialogVisibleImport" class="importStyleDialog">
      <import-dialog :upload-url="uploadUrl" :template-api="downloadVolunteerTemplate" template-name="志愿者管理导入模板" :dialog-visible="dialogVisibleImport" @visible="visible" />
    </el-dialog>
    <ExcelUpload :dialog-table-visible="isShow" :title="'导入志愿者'" :volunteer-import="false" :template-name="'志愿者管理导入模板'" :template-api="downloadVolunteerTemplate" :upload-url="uploadUrl" :type="'志愿者'" @visible="visible" />

    <!--绑定服务对象 start-->
    <bound-service-object
      :selected-value="this.multipleSelection"
      :dialog-table-visible="dialogVisible"
      @dialogHide="dialogHanderHide"
      @ajaxGetData="ajaxGetData"
    />
    <!--绑定服务对象 end-->

  </el-container>
</template>

<script>
import _ from 'lodash'
import qs from 'qs'
import Address from '@/components/Address'
import Pagination from '@/components/Pagination'
import {
  institutionSearch,
  removeTableRowData,
  unboundVolunteers
} from '@/api/sidekickProjectConfig/volunteerManagement'
import { getDate_YMD, parseTime } from '@/utils/index.js'
import { getVolunteerManagementExport, getVolunteerManagementTemplateDownload, downloadVolunteerTemplate, volunteerImport } from '@/api/importExportApi'
import { downloadFromBlob, limitTextEllipsis } from '@/utils/index'
import uploadExcelMix from '@/mixins/uploadExcelMix'
import ImportDialog from '@/components/importDialog/index'
import { getToken } from '@/utils/auth'
import BoundServiceObject from './components/dialog'
import ExcelUpload from '@/components/newExcelUpload/index'
import {exportTitleConstant, exportContentConstant, exportGoDownloadConstant, exportKnowConstant, canExport} from '@/common/constant';// 常量池

export default {
  components: {
    ImportDialog,
    Address,
    Pagination,
    BoundServiceObject,
    ExcelUpload
  },
  mixins: [uploadExcelMix],
  data() {
    return {
      volunteer_FWSOptions: [], // 志愿者
      dialogVisible: false,
      dialogVisibleImport: false,
      isShow: false,
      // 查询表单
      form: {
        liveArea: [], // 区域表单ID
        fullName: '', // 关键字查询
        serviceMonth: '',
        pageNum: 1, // 分页页数
        pageSize: 10 // 分页数量
      },
      // form 表单的验证规则
      rulesForm: {},
      // 区域全部ID
      liveArea: [],
      // <-- table -->
      tableData: [], // table表格数据
      multipleSelection: [], // 多选的行数据
      total: 0, // 总共多少数量
      idEdit: true,
      uploadUrl: process.env.VUE_APP_BASE_API + '/volunteer/import/volunteer',
      headers: {
        Authorization: 'Bearer ' + getToken() // Authorization ，而不是token
      },
      exportData: '', // 查询成功后赋值
      getVolunteerManagementTemplateDownload,
      downloadVolunteerTemplate,
      volunteerImport,

      // 绑定服务对象弹框
      liveArea_FWS: [], // 所属居委全部ID
      form_liveArea_FWS: [], // 选择的区域
      keyword_FWS: '', // 关键词
      volunteer_FWS: '', // 志愿者
      tableData_FWS: [], // 表格数据
      form_FWS: {
        total: 0,
        pageNum: 1,
        pageSize: 10
      },
      multipleSelection_FWS: [], // 绑定对象多选行的数据
      multipleSelection_FWS_selected: [], // 添加服务商多选行的数据-已经选择的数据
      multipleSelection_FWS_GLOBAL: [], // 添加服务商多选行的数据-固定存值
      multipleSelection_FWS_before: [], // 添加服务商多选行的数据-固定存值
      idEdit_FWS: true, // 区域级联下拉框是编辑时还是新增时。编辑时：false,新增时：true
      sufixClearBtnShow: false// 服务商清空按钮显示隐藏
    }
  },
  mounted() {
    this.idEdit = false
    this.getData(this.form)
  },
  methods: {
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
        liveArea: [], // 区域表单ID
        fullName: '', // 关键字查询
        pageNum: 1, // 分页页数
        pageSize: 10 // 分页数量
      }
      this.idEdit = !this.idEdit
      this.getData(this.form)
    },
    // 添加行
    addTableRow() {
      this.$router.push({
        path: `/volunteerManagement/details/0`,
        query: { 'modelType': 'add', '_title': `新增志愿者` } // modelType: 查看:look，编辑:edit，新增:add的类型
      })
    },
    // 双击行去详情页面
    toDetail(row) {
      const _title_ = limitTextEllipsis(row.fullName, 10)
      this.$router.push({
        path: `/volunteerManagement/details/${row.id}`,
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
      // 单选时为1，需要选择n项改数值为n就可以
      if (val.length > 1) {
        // 超出指定选择个数后，把第一个选中的selection设为false
        this.$refs.listTable.toggleRowSelection(val[0], false)
        // 同时要把选中第一项移除
        val.splice(0, 1)
      }
      this.multipleSelection = val
    },
    // 编辑按钮
    handleEdit(row) {
      const _title_ = limitTextEllipsis(row.fullName, 10)
      this.$router.push({
        path: `/volunteerManagement/details/${row.id}`,
        query: { 'id': row.id, 'modelType': 'edit', '_title': `编辑${_title_}` } // modelType: 查看:look，编辑:edit，新增:add的类型
      })
    },
    // 删除按钮
    handleRemove($index, row) {
      const _title_ = limitTextEllipsis(row.fullName, 10)
      this.$confirm('确定要删除【' + _title_ + '】志愿者吗？一旦被删除，将无法查看相关信息。', '删除志愿者', {
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
    }, unboundRemove($index, row) {
      const _title_ = limitTextEllipsis(row.fullName, 10)
      this.$confirm('确定要解除【' + _title_ + '】所绑定的所有服务对象吗？', '解除绑定', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        closeOnClickModal: false
      }).then(() => {
        unboundVolunteers(row.id).then(response => {
          if (response.code === 0 || response.code === '0') {
            this.$message({
              type: 'success',
              message: response.msg
            })
            // this.form.pageNum = 1;
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
          message: '已取消【解除绑定】操作！'
        })
      })
    },
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
        '导出志愿者',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }
      )
        .then(() => {
          getVolunteerManagementExport(this.exportData).then(response => {
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
    },
    // 打开'绑定服务对象'弹框选择面板
    showSelectFWSPannel() {
      if (this.multipleSelection && this.multipleSelection.length === 0) {
        this.$message({
          message: '请勾选一条绑定对象！',
          type: 'warning'
        })
      } else {
        this.dialogVisible = true
      }
    },
    // 关闭‘绑定服务对象’弹框
    dialogHanderHide() {
      this.dialogVisible = false
    },
    // 绑定对象成功后，关闭弹框，并且刷新表格数据
    ajaxGetData() {
      this.onReset()
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

