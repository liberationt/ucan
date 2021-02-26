<!--服务项目管理-->
<template>
  <el-container>
    <!--查询表单-->
    <el-header class="formDiv">
      <el-form :inline="true" :model="form" class="demo-form-inline">
        <el-form-item label="服务类型">
          <el-select
            v-model="form.serviceType"
            placeholder="请选择服务类型"
            clearable
            style="width:100%;"
            @keyup.enter.native="onSubmit"
          >
            <el-option
              v-for="item in serviceTypeOptions"
              v-if="serviceTypeOptions.length !== 0"
              :key="item.dictValue"
              :label="item.dictLabel"
              :value="item.dictValue"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="关键词">
          <el-input
            v-model.trim="form.serviceName"
            clearable
            placeholder="请输入服务名称/地点查询"
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
            <el-table-column label="服务名称" show-overflow-tooltip prop="serviceName" min-width="180" />
            <el-table-column label="服务范围" prop="serviceScope" min-width="180" />
            <el-table-column label="服务类型" prop="serviceTypeName" min-width="130" />
            <el-table-column label="申请方式" prop="applyWay" min-width="200" />
            <el-table-column label="创建时间" prop="createTime" min-width="180" />
            <el-table-column label="服务地点" prop="orgName" min-width="100" />
            <el-table-column fixed="right" label="操作" width="230" header-align="center">
              <template slot-scope="{row,$index}">
                <span v-has="{class: '编辑'}" class="table-btn" @click="handleEdit(row)">编辑</span>
                <span v-has="{class: '关联人员'}" class="table-btn" @click="showDialog(row)">关联人员</span>
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
    <div class="serviceDialog">
      <el-dialog
        v-dialogDrag
        width="200px"
        title="关联人员"
        :visible="lookVisible"
        :close-on-click-modal="false"
        @close="closelookDialog"
      >
        <div class="dialogInfor">
          <div class="inforLeft">
            <h3>可选人员</h3>
            <div>
              <el-form :inline="true" :model="optionalForm" class="demo-form-inline">
                <el-form-item label="所属区域">
                  <Address
                    :area-code="optionalAreaCode"
                    :form-code="optionalForm.areaCode"
                    :id-edit="idEdit"
                    :width="'240px'"
                    @getAreaCode="getOptionalAreaCode"
                  />
                </el-form-item>
                <el-form-item label="关键词">
                  <el-input
                    v-model.trim="optionalForm.fullName"
                    clearable
                    placeholder="请输入老人姓名、身份证号查询"
                    style="width: 260px"
                    @keyup.enter.native="onSubmit"
                  />
                </el-form-item>
              </el-form>
              <div style="text-align:right;padding-right:20px;margin-bottom:20px;">
                <el-button type="primary" class="base-btn" @click="getOptionalDataInfor">查询</el-button>
                <el-button type="warning" class="base-btn" @click="onResetOptional">重置</el-button>
              </div>
              <div>
                <el-table
                  :data="optionalData"
                  tooltip-effect="dark"
                  style="width: 100%;"
                  header-align="left"
                  border
                  row-key="id"
                  @selection-change="optionalSelectionChange"
                >
                  <el-table-column type="selection" width="40" fixed="left" />
                  <el-table-column label="序号" width="50" fixed="left">
                    <template slot-scope="{row,$index}">
                      <span>{{ $index + 1 }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column label="姓名" prop="fullName" width="70" />
                  <el-table-column label="性别" prop="sexName" width="50" />
                  <el-table-column label="年龄" prop="age" width="60" />
                  <el-table-column label="身份证号" prop="idCard" min-width="140" />
                  <el-table-column label="户籍地址" prop="areaCodeName" min-width="180" show-overflow-tooltip />
                </el-table>
                <pagination
                  v-show="optionalTotals>0"
                  :total="optionalTotals"
                  :page.sync="optionalForm.pageNum"
                  :limit.sync="optionalForm.pageSize"
                  :layout="'total, prev, pager, next'"
                  @pagination="getOptionalData(optionalForm)"
                />
              </div>
            </div>
          </div>
          <div class="inforCenter">
            <div @click="addInfor"><i class="el-icon-plus" /></div>
            <div @click="removeInfor"><i class="el-icon-minus" /></div>
          </div>
          <div class="inforRight">
            <h3>已选人员</h3>
            <div>
              <el-form :inline="true" :model="selectedForm" class="demo-form-inline">
                <el-form-item label="所属区域">
                  <Address
                    :area-code="selectedAreaCode"
                    :form-code="selectedForm.areaCode"
                    :id-edit="idEdit"
                    :width="'240px'"
                    @getAreaCode="getSelectedAreaCode"
                  />
                </el-form-item>
                <el-form-item label="关键词">
                  <el-input
                    v-model.trim="selectedForm.keyword"
                    clearable
                    placeholder="请输入老人姓名、身份证号查询"
                    style="width: 260px"
                  />
                </el-form-item>
              </el-form>
              <div style="text-align:right;padding-right:20px;margin-bottom:20px;">
                <el-button type="primary" class="base-btn" @click="getSelectedDataInfor">查询</el-button>
                <el-button type="warning" class="base-btn" @click="onResetSelected">重置</el-button>
              </div>
              <div>
                <el-table
                  :data="selectedData"
                  tooltip-effect="dark"
                  style="width: 100%;"
                  header-align="left"
                  border
                  row-key="id"
                  @selection-change="selectionChange"
                >
                  <el-table-column type="selection" width="40" fixed="left" />
                  <el-table-column label="序号" width="50" fixed="left">
                    <template slot-scope="{row,$index}">
                      <span>{{ $index + 1 }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column label="姓名" prop="fullName" width="70" />
                  <el-table-column label="性别" prop="sexName" width="50" />
                  <el-table-column label="年龄" prop="age" width="60" />
                  <el-table-column label="身份证号" prop="idCard" min-width="140" />
                  <el-table-column label="户籍地址" prop="areaCodeName" min-width="180" show-overflow-tooltip />
                </el-table>
                <pagination
                  v-show="selectedTotals>0"
                  :total="selectedTotals"
                  :page.sync="selectedForm.pageNum"
                  :limit.sync="selectedForm.pageSize"
                  :layout="'total, prev, pager, next'"
                  @pagination="getSelectedData(selectedForm)"
                />
              </div>
            </div>
          </div>
        </div>
      </el-dialog>
    </div>
  </el-container>
</template>

<script>
import _ from 'lodash'
import Pagination from '@/components/Pagination'
import { pageModel } from '@/common'
import { getToken } from '@/utils/auth'
import {
  getServiceData,
  removeTableRowData,
  allSelectdictionaryData
} from '@/api/serviceActivityConfig/serviceProject'
import Address from '@/components/Address'
import {
  elderSearch,
  getSeletedList,
  addSeletedList,
  removeSeletedList
} from '@/api/userInfoConfig/elderInfo'
export default {
  components: {
    Pagination,
    Address
  },
  data() {
    return {
      // 机构类型
      org_typeOptions: [],
      lookVisible: false,

      // 服务类型options
      serviceTypeOptions: [],
      // 查询表单
      form: {
        serviceType: '', // 服务类型
        serviceName: '', // 关键字查询
        pageNum: pageModel.pageNum, // 分页页数
        pageSize: pageModel.pageSize // 分页数量
      },
      // 老人标签集合
      tags: [],
      // <-- table -->
      tableData: [], // table表格数据
      multipleSelection: [], // 多选的行数据
      total: 0, // 总共多少数量
      idEdit: true,
      optionalForm: {
        areaCode: '',
        fullName: '',
        pageNum: 1,
        pageSize: 10
      },
      optionalData: [],
      optionalAreaCode: [],
      idEdit: true,
      optionalTotals: 0,
      optionalSelectData: [],
      selectedForm: {
        serviceId: '',
        areaCode: '',
        keyword: '',
        pageNum: 1,
        pageSize: 10
      },
      selectedData: [],
      selectedAreaCode: [],
      selectedTotals: 0,
      selectedDataList: [],
      serviceId: ''
    }
  },
  mounted() {
    this.idEdit = false
    this.getData(this.form)
  },
  methods: {
    showDialog(row) {
      this.serviceId = row.id
      this.getOptionalDataInfor()
      this.getSelectedDataInfor()
      this.lookVisible = true
    },
    closelookDialog() {
      this.selectedAreaCode = []
      this.optionalAreaCode = []
      this.optionalForm = {
        areaCode: '',
        fullName: '',
        pageNum: 1,
        pageSize: 10
      },
      this.selectedForm = {
        serviceId: '',
        areaCode: '',
        keyword: '',
        pageNum: 1,
        pageSize: 10
      },
      this.idEdit = !this.idEdit
      this.lookVisible = false
    },
    getOptionalDataInfor() {
      this.optionalForm.pageNum = 1
      this.getOptionalData()
    },
    getOptionalData() {
      const params = _.cloneDeep(this.optionalForm)
      if (this.optionalAreaCode && this.optionalAreaCode.length) {
        params.areaCode = this.optionalAreaCode[this.optionalAreaCode.length - 1]
      }
      elderSearch(params).then(res => {
        if (res.code == 0) {
          this.optionalData = res.rows
          this.optionalTotals = res.total
        }
      })
    },
    getSelectedDataInfor() {
      this.selectedForm.pageNum = 1
      this.getSelectedData()
    },
    getSelectedData() {
      const params = _.cloneDeep(this.selectedForm)
      if (this.selectedAreaCode && this.selectedAreaCode.length) {
        params.areaCode = this.selectedAreaCode[this.selectedAreaCode.length - 1]
      }
      params.serviceId = this.serviceId
      getSeletedList(params).then(res => {
        if (res.code == 0) {
          this.selectedData = res.data.list
          this.selectedTotals = res.data.total
        }
      })
    },
    addInfor() {
      if (!this.optionalSelectData.length) {
        this.$message.error('请选择关联人员')
        return
      } else {
        const params = {}
        const personIdIds = []
        this.optionalSelectData.forEach(item => {
          personIdIds.push(item.id)
        })
        params.personIdIds = personIdIds
        params.serviceId = this.serviceId
        addSeletedList(params).then(res => {
          if (res.code == 0) {
            this.$message.success('关联成功')
            this.getSelectedDataInfor()
          } else {
            this.$message.error('关联失败')
          }
        }).catch(err => {
          console.log(err)
        })
      }
    },
    removeInfor() {
      if (!this.selectedDataList.length) {
        this.$message.error('请选择解绑人员')
        return
      } else {
        const params = {}
        const ids = []
        this.selectedDataList.forEach(item => {
          ids.push(item.id)
        })
        params.ids = ids
        params.serviceId = this.serviceId
        removeSeletedList(params).then(res => {
          if (res.code == 0) {
            this.$message.success('解绑成功')
            this.getSelectedDataInfor()
          } else {
            this.$message.error('解绑失败')
          }
        }).catch(err => {
          console.log(err)
        })
      }
    },
    optionalSelectionChange(val) {
      this.optionalSelectData = val
    },
    selectionChange(val) {
      this.selectedDataList = val
    },
    onResetOptional() {
      this.optionalAreaCode = []
      this.optionalForm = {
        areaCode: '',
        fullName: '',
        pageNum: 1,
        pageSize: 10
      }
      this.idEdit = !this.idEdit
      this.getOptionalDataInfor()
    },
    onResetSelected() {
      this.selectedAreaCode = []
      this.selectedForm = {
        serviceId: this.serviceId,
        areaCode: '',
        keyword: '',
        pageNum: 1,
        pageSize: 10
      },
      this.idEdit = !this.idEdit
      this.getSelectedDataInfor()
    },
    getOptionalAreaCode(val) {
      this.optionalAreaCode = val
    },
    getSelectedAreaCode(val) {
      this.selectedAreaCode = val
    },
    // 老人标签选择事件
    handleChange(val) {
    },
    getSelect() {
      return new Promise((resolve, reject) => {
        // 数据字典接口
        const dicKey = 'service_project_type'
        allSelectdictionaryData(dicKey).then(response => {
          if (response.code === 0) {
            for (const k in response.data) {
              switch (k) {
                case 'service_project_type':
                  this.serviceTypeOptions = response.data[k]
                  break
              }
            }
          } else {
            this.$message.error('数据字典接口请求失败！')
          }
          resolve()
        }).catch(() => {
          this.$message.error('数据字典接口请求失败！')
          reject()
        })
      })
    },
    // 表单查询按钮
    onSubmit() {
      this.getData(this.form)
    },
    // 获取表格数据
    async getData(form) {
      await this.getSelect()
      await getServiceData(form).then(res => {
        if (res.rows) {
          this.tableData = res.rows
          this.total = res.total
        }
      })
    },
    // 表单重置按钮
    onReset() {
      this.form = {
        serviceName: '', // 关键字查询
        pageNum: pageModel.pageNum, // 分页页数
        pageSize: pageModel.pageSize // 分页数量
      }
      this.idEdit = !this.idEdit
      this.getData(this.form)
    },
    // 添加行
    addTableRow() {
      this.$router.push({
        path: `/serviceProject/details/0`,
        query: { 'modelType': 'add', '_title': `新增服务项目`, 'menu': this.$route.meta.id } // modelType: 查看:look，编辑:edit，新增:add的类型
      })
    },
    // 双击行去详情页面
    toDetail(row) {
      this.$router.push({
        path: `/serviceProject/details/${row.id}`,
        query: { 'id': row.id, 'modelType': 'look', '_title': `查看${row.serviceName}`, 'editAuthority': this.$route.meta.id } // modelType: 查看:look，编辑:edit，新增:add的类型
      })
    },
    // 多选的行数据
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    // 编辑按钮
    handleEdit(row) {
      this.$router.push({
        path: `/serviceProject/details/${row.id}`,
        query: { 'id': row.id, 'modelType': 'edit', '_title': `编辑${row.serviceName}`, 'menu': this.$route.meta.id } // modelType: 查看:look，编辑:edit，新增:add的类型
      })
    },
    // 删除按钮
    handleRemove($index, row) {
      this.$confirm('确定要删除【' + row.serviceName + '】服务项目吗？一旦被删除，将无法查看相关信息。', '删除服务项目信息', {
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
    }
  }
}
</script>

<style lang="scss" scoped>
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
	.dialogInfor{
		display: flex;
		justify-content: space-between;
	}
	.inforLeft,.inforRight{
		width:44%;
		border:1px solid #333;
		padding:10px;
    overflow: auto;
	}
	.inforCenter{
    display: flex;
    align-items: center;
		div{
			width:40px;
			height:40px;
			text-align: center;
			line-height: 40px;
			margin: 30px auto;
			border:1px solid #aaaaaa;
			font-size:28px;
			cursor: pointer;
		}
	}
</style>

