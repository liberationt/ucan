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
        <el-form-item label="机构类型">
          <el-select v-model="form.orgType" placeholder="请选择机构类型" clearable style="width: 200px" @keyup.enter.native="onSubmit">
            <el-option
              v-for="item in org_typeOptions"
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
            placeholder="请输入机构名称查询"
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
            <el-table-column label="机构名称" show-overflow-tooltip prop="orgName" min-width="200" />
            <el-table-column label="机构类型" prop="orgTypeLabel" min-width="120" />
            <el-table-column label="地址" show-overflow-tooltip prop="addr" min-width="200" />
            <el-table-column label="联系电话" prop="phone" min-width="100" />
            <el-table-column label="成立时间" prop="establishTime" min-width="80" />
            <el-table-column label="开放状态" prop="openState" min-width="80" />
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

        <el-dialog title="机构类型选择" :visible.sync="dialogVisible" class="importStyleDialog" :close-on-click-modal="false">
          <div>
            <el-row class="instituWrap">
              <div class="instituDiv" @click="jumpPensionAgency" v-has="{class: '养老机构'}">
                <span class="iconfont iconyljg" />
                <span class="text">养老机构</span>
              </div>
              <div class="instituDiv" @click="jumpElderlyCareHome" v-has="{class: '长者照护之家'}">
                <span class="iconfont iconzzzh" />
                <span class="text">长者照护之家</span>
              </div>
              <!-- <br>
              <div class="instituDiv" @click="jumpChiZhouPensionAgency" v-has="{class: '养老机构'}">
                <span class="iconfont iconyljg" />
                <span class="text">池州养老机构</span>
              </div> -->
            </el-row>
            <el-row class="instituWrap">
              <div class="instituDiv" @click="jumpChiZhouPensionAgency" v-has="{class: '池州养老机构'}">
                <span class="iconfont iconyljg" />
                <span class="text">养老机构</span>
              </div>
            </el-row>
          </div>
        </el-dialog>
        <el-dialog title="导入养老机构信息" :visible.sync="dialogVisibleImport" class="importStyleDialog" :close-on-click-modal="false">
          <import-dialog :upload-url="uploadUrl" :template-api="getOrdanFaultDownload" template-name="养老机构导入模板" :dialog-visible="dialogVisibleImport" @visible="visible" />
        </el-dialog>
      </el-container>
    </el-main>
  </el-container>
</template>

<script>
import Address from '@/components/Address'
import Pagination from '@/components/Pagination'
import ImportDialog from '@/components/importDialog/index'
import { pageModel } from '@/common'
import { getToken } from '@/utils/auth'
import { getOrdanDownload, getOrdanFaultDownload } from '@/api/importExportApi'
import { downloadFromBlob } from '@/utils/index'
import {
  allSelectdictionaryData,
  institutionSearch,
  removeTableRowData,
  getInstitutionalTypeData
} from '@/api/facilitiesConfig/pensionAgency'
import {
  chiZhouInstitutionSearch,
  chiZhouRemoveTableRowData
} from '@/api/facilitiesConfig/chiZhouPensionAgency'
import qs from 'qs'
import uploadExcelMix from '@/mixins/uploadExcelMix'
import { debounce } from '@/utils'

export default {
  components: {
    ImportDialog,
    Address,
    Pagination
  },
  mixins: [uploadExcelMix],
  data() {
    return {
      dialogVisible: false,
      dialogVisibleImport: false,
      // 机构类型
      org_typeOptions: [],
      // 查询表单
      form: {
        keyword: '', // 关键字查询
        areaCode: [], // 区域表单ID
        orgType: '', // 机构类型
        pageNum: pageModel.pageNum, // 分页页数
        pageSize: pageModel.pageSize // 分页数量
      },
      // 老人标签集合
      tags: [],
      // 区域全部ID
      areaCode: [],
      // <-- table -->
      tableData: [], // table表格数据
      multipleSelection: [], // 多选的行数据
      total: 0, // 总共多少数量
      uploadUrl: process.env.VUE_APP_BASE_API + '/admin/service/provider/import',
      headers: {
        Authorization: 'Bearer ' + getToken() // Authorization ，而不是token
      },
      idEdit: true,
      exportData: '', // 查询成功后赋值
      getOrdanFaultDownload
    }
  },
  mounted() {
    this.idEdit = false
    /**
			 * 数据字典接口
			 */
    const dicKey = { 'selectType': '10XX' }
    getInstitutionalTypeData(dicKey).then(response => {
      this.org_typeOptions = response.data
    }).catch(() => {
      this.$message.error('获取机构类型失败！')
    })
    this.getData(this.form)
  },
  methods: {
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
      this.form.pageNum = 1
      this.getData(this.form)
    },
    // 获取表格数据
    getData(form) {
      const parmas = _.cloneDeep(form)
      parmas.areaCode = typeof (parmas.areaCode) === 'object' ? parmas.areaCode.join('') : parmas.areaCode
      institutionSearch(form).then(res => {
        if (res) {
          this.tableData = res.data.list
          this.total = res.data.total
          this.exportData = JSON.parse(JSON.stringify(this.form))
        }
      })
    },
    // 表单重置按钮
    onReset() {
      this.areaCode = []
      this.form = {
        keyword: '', // 关键字查询
        areaCode: [], // 区域表单ID
        orgType: '', // 机构类型
        pageNum: pageModel.pageNum, // 分页页数
        pageSize: pageModel.pageSize // 分页数量
      }
      this.idEdit = !this.idEdit
      this.getData(this.form)
    },
    // 添加行
    addTableRow() {
      this.dialogVisible = true
    },
    // 双击行去详情页面
    toDetail(row) {
      let _orgType_ = row.orgType,
          _id_ = row.orgId,
          _path_ = ''
      switch (_orgType_) {
        case '1010_chizhou':
          _path_ = `/pensionAgency/chiZhouDetails/${_id_}`
          break;
        default:
          _path_ = `/pensionAgency/details/${_id_}`
          break;
      }
      this.$router.push({
        path: _path_,
        query: { 'id': _id_, 'modelType': 'look', 'instituType': _orgType_, '_title': `查看${row.orgName}`, 'editAuthority': this.$route.meta.id }
      })
    },
    // 多选的行数据
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    // 编辑按钮
    handleEdit(row) {
      let _orgType_ = row.orgType,
          _id_ = row.orgId,
          _path_ = ''
      switch (_orgType_) {
        case '1010_chizhou':
          _path_ = `/pensionAgency/chiZhouDetails/${_id_}`
          break;
        default:
          _path_ = `/pensionAgency/details/${_id_}`
          break;
      }
      this.$router.push({
        path:  _path_,
        query: { 'id': _id_, 'modelType': 'edit', 'instituType': _orgType_, '_title': `编辑${row.orgName}` }
      })
    },
    // 删除按钮
    handleRemove($index, row) {
      let _orgType_ = row.orgType
      this.$confirm('确定要删除【' + row.orgName + '】的信息吗？一旦被删除，将无法查看【' + row.orgName + '】的信息', '删除养老机构信息', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        switch (_orgType_) {
          case '1010_chizhou':
            chiZhouRemoveTableRowData(row.orgId).then(response => {
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
            break;
        
          default:
            removeTableRowData(row.orgId).then(response => {
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
            break;
        }
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除！'
        })
      })
    },
    // 跳转到‘养老机构’
    jumpPensionAgency() {
      this.$router.push({
        path: `/pensionAgency/details/0`,
        query: { 'modelType': 'add', 'instituType': '1010', '_title': `新增养老机构` } // modelType: 查看:look，编辑:edit，新增:add的类型
      })
      this.dialogVisible = false
    },
    // 跳转到‘池州养老机构’
    jumpChiZhouPensionAgency() {
      this.$router.push({
        path: `/pensionAgency/chiZhouDetails/0`,
        query: { 'modelType': 'add', 'instituType': '1010_chizhou', '_title': `新增池州养老机构` } // modelType: 查看:look，编辑:edit，新增:add的类型
      })
      this.dialogVisible = false
    },
    // 跳转到‘长者照护之家’
    jumpElderlyCareHome() {
      this.$router.push({
        path: `/pensionAgency/details/0`,
        query: { 'modelType': 'add', 'instituType': '1011', '_title': `新增长者照护之家` } // modelType: 查看:look，编辑:edit，新增:add的类型
      })
      this.dialogVisible = false
    },
    importFun() {
      this.dialogVisibleImport = true
    },
    // 导出功能
    exportFun() {
      let confirmTitle = ''
      if (this.exportData.areaCode.length === 0 && this.exportData.keyword === '' && this.exportData.orgType === '') {
        confirmTitle = '确认导出全部机构信息吗？'
      } else {
        confirmTitle = '确认导出筛选的机构信息吗？'
      }
      this.$confirm(
        confirmTitle,
        '导出养老机构信息',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
					    closeOnClickModal: false
        }
      )
        .then(() => {
          // const data = qs.stringify(this.exportData);
          const arr = []
          if (this.areaCode && this.areaCode.length !== 0) {
            arr.push(this.areaCode[this.areaCode.length - 1])
          }
          this.form.areaCode = arr // 所选区域赋值
          const data = _.cloneDeep(this.form)
          data.areaCode = typeof (data.areaCode) === 'object' ? data.areaCode.join('') : data.areaCode
          getOrdanDownload(data).then(response => {
            if (response instanceof ArrayBuffer) {
						  const datas = new Blob([response], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8;' })
              downloadFromBlob(datas, '养老机构列表.xlsx')
            } else {
              if (response.code != 0 || response.code != '0') {
                this.$message.error('导出养老机构信息操作失败，失败原因是：' + response.msg)
              }
            }
          }).catch(() => {
            if (error && error.message) {
              if (error.message.indexOf('timeout') > -1) {
                error.message = '网络连接超时'
              }
              this.$message.error('导出养老机构信息操作失败，失败原因是：' + error.message)
            } else {
              this.$message.error('导出养老机构信息操作失败！')
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
      this.dialogVisibleImport = value
    }
  }
}
</script>

<style scoped>
	@import "~@/styles/form.css";
	.instituWrap {
		padding: 20px;
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

