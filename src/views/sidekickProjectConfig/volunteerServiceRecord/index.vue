<!--志愿者服务记录-->
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
        <el-form-item label="服务日期">
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
        <el-form-item label="关键词">
          <el-input
            v-model.trim="form.vsoName"
            clearable
            placeholder="请输入服务对象或志愿者姓名或身份证"
            style="width: 290px"
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
            <el-button v-has="{class: '批量删除'}" type="primary" class="base-btn" @click="deleteList()">批量删除
            </el-button>
            <div v-if="this.total !== 0" class="totalWrap">已筛选到{{ this.total }}条匹配信息</div>
            <div v-else class="totalWrap">无法找到匹配信息</div>
          </div>
        </el-header>
        <el-main>
          <el-table
            ref="table"
            :data="tableData"
            tooltip-effect="dark"
            style="width: 100%;"
            header-align="left"
            border
            row-key="serviceDateId"
            @selection-change="handleSelectionChange"
            @row-dblclick="toDetail"
            @sort-change="sortChange"
          >
            <el-table-column type="selection" el-table-column width="50" fixed="left" />
            <el-table-column label="序号" width="80" fixed="left">
              <template slot-scope="{row,$index}">
                <span>{{ $index + 1 }}</span>
              </template>
            </el-table-column>
            <el-table-column label="服务日期" prop="serviceDate" sortable="custom" min-width="120" />
            <el-table-column label="服务对象" prop="vsoName" min-width="120" />
            <el-table-column label="身份证号" prop="idCard" sortable="custom" min-width="200" />
            <el-table-column label="服务内容" prop="serviceContentName" min-width="200" />
            <el-table-column label="服务结果" prop="serviceResultName" min-width="100" />
            <el-table-column label="志愿者" prop="volunteerName" sortable="custom" min-width="120" show-overflow-tooltip />
            <el-table-column label="志愿者身份证号" prop="volunteerIdCard" min-width="200" />
            <el-table-column label="志愿者所属组织" prop="objName" min-width="200" show-overflow-tooltip />
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
      </el-container>

      <!--			<el-dialog title="导入志愿者服务记录" :visible.sync="dialogVisibleImport" class="importStyleDialog">-->
      <!--				<import-dialog-->
      <!--						:upload-url="uploadUrl"-->
      <!--						:template-api="getVolunteerServiceRecordTemplateDownload"-->
      <!--						template-name="志愿者服务记录导入模板"-->
      <!--						@visible="visible"-->
      <!--						:dialog-visible="dialogVisibleImport">-->
      <!--				</import-dialog>-->
      <!--			</el-dialog>-->

      <el-dialog title="导入信息" :visible.sync="dialogVisibleImport" class="importStyleDialog">
        <import-dialog :upload-url="uploadUrl" :template-api="downloadServiceRecordTemplate" template-name="志愿者管理导入模板" :dialog-visible="dialogVisibleImport" @visible="visible" />
      </el-dialog>
      <ExcelUpload :dialog-table-visible="isShow" :title="'导入服务记录'" :volunteer-import="false" :template-name="'服务记录导入模板'" :template-api="downloadServiceRecordTemplate" :upload-url="uploadUrl" :type="'志愿者服务记录'" @visible="visible" />

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
  recordSearch,
  removeTableRowData,
  removeTableRowDataList
} from '@/api/sidekickProjectConfig/volunteerServiceRecord'
import { getDate_YMD, parseTime } from '@/utils/index.js'
import { getVolunteerServiceRecordExport, getVolunteerServiceRecordTemplateDownload, downloadServiceRecordTemplate } from '@/api/importExportApi'
import { downloadFromBlob, limitTextEllipsis } from '@/utils/index'
import uploadExcelMix from '@/mixins/uploadExcelMix'
import ImportDialog from '@/components/importDialog/index'
import { getToken } from '@/utils/auth'
import ExcelUpload from '@/components/newExcelUpload/index'
import {Msg} from '@/utils/tools';
import {exportTitleConstant, exportContentConstant, exportGoDownloadConstant, exportKnowConstant, canExport} from '@/common/constant';// 常量池

export default {
	  name: 'Zyzfwjl',
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
      // 查询表单
      form: {
        liveArea: [], // 区域表单ID
        startTime: '',
        endTime: '',
        vsoName: '', // 关键字查询
        pageNum: 1, // 分页页数
        pageSize: 10, // 分页数量
        // 志愿者服务记录默认按照 服务日期降序排列
        sortFields: 'serviceDate',
        sortOrder: 'DESC'
      },
      // 区域全部ID
      liveArea: [],
      // <-- table -->
      tableData: [], // table表格数据
      projectPeriod: [], // 服务到期日期
      multipleSelection: [], // 多选的行数据
      multipleSelectionAll: [], // 当前页选中的数据
  				idKey: 'id',
      total: 0, // 总共多少数量
      uploadUrl: process.env.VUE_APP_BASE_API + '/volunteer/import/serviceRecord',
      headers: {
        Authorization: 'Bearer ' + getToken() // Authorization ，而不是token
      },
      idEdit: true,
      exportData: '', // 查询成功后赋值
      downloadServiceRecordTemplate,
      getVolunteerServiceRecordTemplateDownload
    }
  },
  mounted() {
    this.idEdit = false
    this.getData(this.form)
  },
  activated() {
    this.getData(this.form)
  },
  methods: {
    sortChange(data) {
      const { prop, order } = data
      this.form.sortFields = prop
      if (order === 'descending') {
        this.form.sortOrder = 'DESC'
      } else {
        this.form.sortOrder = 'ASC'
      }
      this.getData(this.form)
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
      if (this.projectPeriod === null) {
        this.projectPeriod = []
      }
      if (this.projectPeriod.length === 0) {
        this.form.startTime = ''
        this.form.endTime = ''
      } else {
        this.form.startTime = getDate_YMD(this.projectPeriod[0]) + ''
        this.form.endTime = getDate_YMD(this.projectPeriod[1]) + ''
      }
      this.form.pageNum = 1// 分页页数
      this.form.pageSize = 10 // 分页数量
      await this.getData(this.form)
    },
    setSelectRow() {
      if (!this.multipleSelectionAll || this.multipleSelectionAll.length <= 0) {
        return
      }
      // 标识当前行的唯一键的名称
      const idKey = this.idKey
      const selectAllIds = []
      const that = this
      this.multipleSelectionAll.forEach(row => {
        selectAllIds.push(row[idKey])
      })
      this.$refs.table.clearSelection()
      for (var i = 0; i < this.tableData.length; i++) {
        if (selectAllIds.indexOf(this.tableData[i][idKey]) >= 0) {
          // 设置选中，记住table组件需要使用ref="table"
          this.$refs.table.toggleRowSelection(this.tableData[i], true)
        }
      }
    },
    // 记忆选择核心方法
    changePageCoreRecordData() {
      // 标识当前行的唯一键的名称
      const idKey = this.idKey
      const that = this
      // 如果总记忆中还没有选择的数据，那么就直接取当前页选中的数据，不需要后面一系列计算
      if (!this.multipleSelectionAll.length) {
        this.multipleSelectionAll = this.multipleSelection
        return
      }
      // 总选择里面的key集合
      const selectAllIds = []
      this.multipleSelectionAll.forEach(row => {
        selectAllIds.push(row[idKey])
      })
      const selectIds = []
      // 获取当前页选中的id
      this.multipleSelection.forEach(row => {
        selectIds.push(row[idKey])
        // 如果总选择里面不包含当前页选中的数据，那么就加入到总选择集合里
        if (selectAllIds.indexOf(row[idKey]) < 0) {
          that.multipleSelectionAll.push(row)
        }
      })
      const noSelectIds = []
      // 得到当前页没有选中的id
      this.tableData.forEach(row => {
        if (selectIds.indexOf(row[idKey]) < 0) {
          noSelectIds.push(row[idKey])
        }
      })
      noSelectIds.forEach(id => {
        if (selectAllIds.indexOf(id) >= 0) {
          for (let i = 0; i < that.multipleSelectionAll.length; i++) {
            if (that.multipleSelectionAll[i][idKey] == id) {
              // 如果总选择中有未被选中的，那么就删除这条
              that.multipleSelectionAll.splice(i, 1)
              break
            }
          }
        }
      })
    },
    // 获取表格数据
    async getData(form) {
      const parmas = _.cloneDeep(form)
      parmas.liveArea = typeof (parmas.liveArea) === 'object' ? parmas.liveArea.join('') : parmas.liveArea
      await recordSearch(form).then(res => {
        if (res.rows) {
          this.tableData = res.rows
          this.total = res.total
          this.exportData = _.cloneDeep(form)
          setTimeout(() => {
            this.setSelectRow()
          }, 50)
        } else {
          this.tableData = []
          this.total = 0
        }
      })
    },
    // 表单重置按钮
    onReset() {
      this.projectPeriod = []
      this.liveArea = []
      this.form = {
        liveArea: [], // 区域表单ID
        startTime: '',
        endTime: '',
        vsoName: '', // 关键字查询
        pageNum: 1, // 分页页数
        pageSize: 10 // 分页数量
      }
      this.idEdit = !this.idEdit
      this.getData(this.form)
    },
    // 添加行
    addTableRow() {
      this.$router.push({
        path: `/volunteerServiceRecord/details/0`,
        query: { 'modelType': 'add', '_title': `新增志愿者服务记录` } // modelType: 查看:look，编辑:edit，新增:add的类型
      })
    },
    // 双击行去详情页面
    toDetail(row) {
      const _title_ = limitTextEllipsis(row.vsoName, 10)
      this.$router.push({
        path: `/volunteerServiceRecord/details/${row.id}`,
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
				 setTimeout(() => {
        this.changePageCoreRecordData()
      }, 50)
    },
    // 编辑按钮
    handleEdit(row) {
      const _title_ = limitTextEllipsis(row.vsoName, 10)
      this.$router.push({
        path: `/volunteerServiceRecord/details/${row.id}`,
        query: { 'id': row.id, 'modelType': 'edit', '_title': `编辑${_title_}` } // modelType: 查看:look，编辑:edit，新增:add的类型
      })
    },
    // 批量删除
    deleteList() {
      if (this.multipleSelection.length) {
        const arrList = []
        this.multipleSelectionAll.forEach((item, index) => {
          arrList.push(item.id)
        })
        this.$confirm('确定要删除选中的服务记录吗？一旦被删除，将无法查看相关信息。', '删除志愿者服务记录', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          closeOnClickModal: false
        }).then(() => {
          removeTableRowDataList(arrList).then(response => {
            if (response.code === 0 || response.code === '0') {
              Msg.loading()
              setTimeout(() => {
                this.$message({
                  type: 'success',
                  message: '批量删除成功'
                })
                this.form.pageNum = 1
                this.getData(this.form)
                Msg.hideLoading();
              }, 5000)
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
      } else {
        this.$message({
          type: 'warning',
          message: '请选择要删除的数据'
        })
      }
    },
    // 删除按钮
    handleRemove($index, row) {
      const _title_ = limitTextEllipsis(row.vsoName, 10)
      this.$confirm('确定要删除【' + row.serviceDate + '  ' + _title_ + '】服务记录吗？一旦被删除，将无法查看相关信息。', '删除志愿者服务记录', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        closeOnClickModal: false
      }).then(() => {
        removeTableRowData(row.id).then(response => {
          if (response.code === 0 || response.code === '0') {
            Msg.loading()
            setTimeout(() => {
              this.$message({
                type: 'success',
                message: response.msg
              })
              this.form.pageNum = 1
              this.getData(this.form)
              Msg.hideLoading();
            }, 5000)
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
        '导出服务记录',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }
      )
        .then(() => {
          getVolunteerServiceRecordExport(this.exportData).then(response => {
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
    // // 关闭弹窗
    // visible(value) {
    // 	this.dialogVisibleImport = value;
    // },
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

