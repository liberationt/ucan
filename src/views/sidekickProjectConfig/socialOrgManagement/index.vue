<!--社会组织管理-->
<template>
  <el-container>
    <!--查询表单-->
    <el-header class="formDiv">
      <el-form :inline="true" :model="form" class="demo-form-inline">
        <el-form-item label="所属区域">
          <Address
            :area-code="officeArea"
            :form-code="form.officeArea"
            :id-edit="idEdit"
            :width="'200px'"
            @getAreaCode="getAreaCode"
            @keyup.enter.native="onSubmit"
          />
        </el-form-item>
        <el-form-item label="关键词">
          <el-input
            v-model.trim="form.orgName"
            clearable
            placeholder="请输入组织名称查询"
            style="width: 280px"
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
            <el-table-column label="组织名称" prop="orgName" min-width="180" show-overflow-tooltip />
            <el-table-column label="联系方式" prop="phone" min-width="120" />
            <el-table-column label="成立时间" prop="establishTime" min-width="200" />
            <el-table-column label="办公地址" prop="officeAddr" min-width="200" />
            <el-table-column label="关联项目" prop="serviceName" min-width="200" show-overflow-tooltip />
            <el-table-column label="服务对象人数" prop="serviceNumber" min-width="200" />
            <el-table-column label="志愿者人数" prop="volunteerNumber" min-width="150" />
            <el-table-column fixed="right" label="操作" width="150" header-align="center">
              <template v-if="row.dis !== '0'" slot-scope="{row,$index}">
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

        <!--				<el-dialog title="导入社会组织管理" :visible.sync="dialogVisibleImport" class="importStyleDialog">-->
        <!--					<import-dialog-->
        <!--							:upload-url="uploadUrl"-->
        <!--							:template-api="getSocialManagementTemplateDownload"-->
        <!--							template-name="社会组织管理导入模板"-->
        <!--							@visible="visible"-->
        <!--							:dialog-visible="dialogVisibleImport">-->
        <!--					</import-dialog>-->
        <!--				</el-dialog>-->
        <el-dialog title="导入信息" :visible.sync="dialogVisibleImport" class="importStyleDialog">
          <import-dialog :upload-url="uploadUrl" :template-api="downloadSocialOrgTemplate" template-name="社会组织导入模板" :dialog-visible="isShow" @visible="visible" />
        </el-dialog>
        <ExcelUpload :dialog-table-visible="isShow" :volunteer-import="false" :title="'导入社会组织'" :template-name="'社会组织导入模板'" :template-api="downloadSocialOrgTemplate" :upload-url="uploadUrl" :type="'社会组织'" @visible="visible" />

      </el-container>
    </el-main>
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
  removeTableRowData
} from '@/api/sidekickProjectConfig/socialOrgManagement'
import { getDate_YMD, parseTime } from '@/utils/index.js'
import { getSocialManagementExport, getSocialManagementTemplateDownload, downloadSocialOrgTemplate } from '@/api/importExportApi'
import { downloadFromBlob, limitTextEllipsis } from '@/utils/index'
import uploadExcelMix from '@/mixins/uploadExcelMix'
import ImportDialog from '@/components/importDialog/index'
import { getToken } from '@/utils/auth'
import ExcelUpload from '@/components/newExcelUpload/index'
import {exportTitleConstant, exportContentConstant, exportGoDownloadConstant, exportKnowConstant, canExport} from '@/common/constant';// 常量池

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
      dialogVisible: false,
      dialogVisibleImport: false,
      isShow: false,
      // 项目类型
      org_typeOptions: [],
      // 查询表单
      form: {
        officeArea: [], // 区域表单ID
        orgName: '', // 关键字查询
        pageNum: 1, // 分页页数
        pageSize: 10 // 分页数量
      },
      // 区域全部ID
      officeArea: [],
      // <-- table -->
      tableData: [], // table表格数据
      multipleSelection: [], // 多选的行数据
      total: 0, // 总共多少数量
      idEdit: true,
      uploadUrl: process.env.VUE_APP_BASE_API + '/volunteer/import/socialOrg',
      headers: {
        Authorization: 'Bearer ' + getToken() // Authorization ，而不是token
      },
      exportData: '', // 查询成功后赋值
      getSocialManagementTemplateDownload,
      downloadSocialOrgTemplate
    }
  },
  mounted() {
    this.idEdit = false
    this.getData(this.form)
  },
  methods: {
    // 获取区域的值
    getAreaCode(val) {
      this.officeArea = val
    },
    // 老人标签选择事件
    handleChange(val) {
    },
    // 表单查询按钮
    async onSubmit() {
      const arr = []
      if (this.officeArea.length !== 0) {
        arr.push(this.officeArea[this.officeArea.length - 1])
      }
      this.form.officeArea = arr // 所选区域赋值
      this.form.pageNum = 1// 分页页数
      this.form.pageSize = 10 // 分页数量
      await this.getData(this.form)
    },
    // 获取表格数据
    async getData(form) {
      const parmas = _.cloneDeep(form)
      parmas.officeArea = typeof (parmas.officeArea) === 'object' ? parmas.officeArea.join('') : parmas.officeArea
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
      this.officeArea = []
      this.form = {
        officeArea: [], // 区域表单ID
        orgName: '', // 关键字查询
        pageNum: 1, // 分页页数
        pageSize: 10 // 分页数量
      }
      this.idEdit = !this.idEdit
      this.getData(this.form)
    },
    // 添加行
    addTableRow() {
      this.$router.push({
        path: `/socialOrgManagement/details/0`,
        query: { 'modelType': 'add', '_title': `新增社会组织` } // modelType: 查看:look，编辑:edit，新增:add的类型
      })
    },
    // 双击行去详情页面
    toDetail(row) {
      const _title_ = limitTextEllipsis(row.orgName, 10)
      this.$router.push({
        path: `/socialOrgManagement/details/${row.id}`,
        query: {
          'id': row.id,
          'dis': row.dis,
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
      const _title_ = limitTextEllipsis(row.orgName, 10)
      this.$router.push({
        path: `/socialOrgManagement/details/${row.id}`,
        query: { 'id': row.id, 'modelType': 'edit', '_title': `编辑${_title_}` } // modelType: 查看:look，编辑:edit，新增:add的类型
      })
    },
    // 删除按钮
    handleRemove($index, row) {
      const _title_ = limitTextEllipsis(row.orgName, 10)
      this.$confirm('确定要删除【' + _title_ + '】社会组织吗？一旦被删除，将无法查看相关信息。', '删除社会组织', {
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
      await this.onSubmit();
      if (!canExport(this.total)) return;

      const confirmTitle = '相同筛选条件，10分钟内不可重复提交，确认导出吗？'
      this.$confirm(
        confirmTitle,
        '导出社会组织',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }
      )
        .then(() => {
          getSocialManagementExport(this.exportData).then(response => {
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

