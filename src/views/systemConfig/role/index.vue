<!-- index.vue -->
<template>
  <el-container>
    <el-header class="formDiv">
      <el-form :inline="true" :model="roleForm" class="demo-form-inline">
        <el-form-item label="角色类型">
          <el-select v-model="roleForm.roleType" placeholder="请选择角色类型" clearable @keyup.enter.native="onSubmit">
            <el-option
              v-for="item in roleTypeOptions"
              :key="item.dictValue"
              :label="item.dictLabel"
              :value="item.dictValue"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="角色状态">
          <el-select v-model="roleForm.status" placeholder="请选择角色状态" clearable @keyup.enter.native="onSubmit">
            <el-option label="启用" name="0" value="0" />
            <el-option label="禁用" name="1" value="1" />
          </el-select>
        </el-form-item>
        <el-form-item label="名称查询">
          <el-input v-model.trim="roleForm.roleName" placeholder="请输入角色名称查询" clearable @keyup.enter.native="onSubmit" />
        </el-form-item>

        <el-form-item>
          <el-button v-has="{class: '查询'}" type="primary" class="base-btn" @click="onSubmit">查询
          </el-button>
          <el-button v-has="{class: '查询'}" type="warning" class="base-btn" @click="onReset">重置
          </el-button>
        </el-form-item>
      </el-form>
    </el-header>
    <el-main class="tableContainer">
      <el-container>
        <el-header>
          <el-button v-has="{class: '新增'}" type="primary" class="base-btn" @click="addTableRow()">新增</el-button>
          <!--<el-button type="danger" size="small" :disabled="removeDisabled" @click="removeTableRow()" icon="el-icon-minus">删除</el-button>-->
        </el-header>
        <el-main>
          <el-table
            ref="multipleTable"
            :data="tableData"
            tooltip-effect="dark"
            style="width: 100%;"
            header-align="left"
            border
            fit
            row-key="id"
            @row-dblclick="lockDetails"
          >

            <el-table-column type="selection" min-width="50" />

            <el-table-column label="序号" width="80" fixed="left">
              <template slot-scope="{row,$index}">
                <span>{{ $index + 1 }}</span>
              </template>
            </el-table-column>

            <el-table-column
              label="角色名称"
              prop="roleName"
              min-width="150"
              header-align="left"
            />

            <el-table-column
              label="角色类型"
              prop="dictLabel"
              min-width="100"
              header-align="left"
            />

            <el-table-column
              label="角色排序"
              prop="roleSort"
              min-width="100"
              header-align="left"
            />

            <el-table-column label="角色状态" prop="status" min-width="150" header-align="left">
              <template slot-scope="scope">
                <el-switch
                  v-model="scope.row.status"
                  class="switchStyle"
                  active-text="启用"
                  inactive-text="禁用"
                  active-value="0"
                  inactive-value="1"
                  disabled
                  @click.native="changeSwitch(scope.row)"
                />
              </template>
            </el-table-column>

            <el-table-column
              label="创建时间"
              prop="createTime"
              min-width="200"
              header-align="left"
            />

            <el-table-column
              fixed="right"
              header-align="center"
              label="操作"
              min-width="200"
              align="center"
            >
              <template slot-scope="{row,$index}">
                <span v-has="{class: '编辑'}" class="table-btn" @click="handleEdit($index, row)">
                  编辑
                </span>
                <span v-has="{class: '删除'}" class="table-btn" @click="handleRemove($index, row)">
                  删除
                </span>
                <span v-if="row.status==0" v-has="{class: '分配账号'}" class="table-btn" @click="roleAssignment($index, row)">
                  分配账号
                </span>
                <span v-else v-has="{class: '分配账号'}" class="table-btn" style="color:#ccc">
                  分配账号
                </span>
                <!--<el-button type="primary" size="mini" round plain @click="handleEdit($index, row)" v-has="{class: '修改'}">编辑-->
                <!--</el-button>-->
                <!--<el-button type="primary" size="mini" round plain-->
                <!--@click="handleDataAccess($index, row)" v-has="{class: '数据权限'}">数据权限-->
                <!--</el-button>-->
                <!--<el-button type="danger" size="mini" round plain @click="handleRemove($index, row)" v-has="{class: '删除'}">删除-->
                <!--</el-button>-->
              </template>
            </el-table-column>
          </el-table>

          <pagination
            v-show="count>0"
            :total="count"
            :page.sync="roleForm.pageNum"
            :limit.sync="roleForm.pageSize"
            @pagination="ajaxData"
          />

          <myDialog
            :ajax-data="ajaxData"
            :dialog-table-visible="false"
            :table-row-value="tableRowValue"
            :model-type="modelType"
            :loading="loading"
            @dialogHide="dialogHanderHide"
          />

          <!--<dataAccessDialog @dialogHide="dialogHanderHide" @addDataAccessSubmit="addDataAccessSubmit"-->
          <!--:dataAccessShow="isShowDataAccess"-->
          <!--:tableRowValue="tableRowValue" :loading="loading"></dataAccessDialog>-->
          <accountDailog
            :dialog-table-visible="showdialog"
            :table-row-value="tableRowValue"
            @dialogHides="dialogHanderHides"
          />
          <newDialog
            :ajax-data="ajaxData"
            :dialog-table-visible="isShow"
            :table-row-value="tableRowValue"
            :model-type="modelType"
            :loading="loading"
            @dialogHide="dialogHanderHide"
            @type="getType"
            @id="getId"
          />
          <!--          <openDailog :dialogTableVisible="isTestShow" :close="closeIt" :open="ajaxData" :title="'123423'" :width="'900px'" :height="'50vh'">-->
          <!--            <div slot="content" style="height: 1000px">12321321ddd1</div>-->
          <!--            <div slot="footer">-->
          <!--              12323-->
          <!--            </div>-->
          <!--          </openDailog>-->
          <!--          <div @click="isTestShow = true" style="color: #ffffff">21323123</div>-->
        </el-main>
      </el-container>
    </el-main>
  </el-container>
</template>

<script>
import Pagination from '@/components/Pagination'
import myDialog from './components/dialog'
import newDialog from './components/newDialog'
import dataAccessDialog from './components/dataAccess'
import accountDailog from './components/accountDailog'
import openDailog from '@/components/openDailog/index' // test
import {
  getTableData,
  removeTableRowData,
  changeRoleStatus,
  queryRoleType,
  addDataAccess
} from '@/api/systemConfig/role'

export default {
  components: { myDialog, dataAccessDialog, Pagination, accountDailog, newDialog, openDailog },
  data() {
    return {
      isTestShow: false,
      showdialog: false,
      // 表单值
      roleForm: {
        status: '', // 角色状态
        roleType: '', // 角色类型
        roleName: '', // 关键字查询-角色名称
        pageNum: 1, // 当前页码
        pageSize: 10// 每页显示的数据数量
      },
      tableData: [],
      tableRowValue: '', // 表格当前行数据
      isShow: false, // 弹框显示隐藏
      isShowDataAccess: false, // 添加数据权限弹框显示隐藏
      multipleSelection: [], // 多选的行数据
      count: 0, // 数据总数
      removeDisabled: true, // 批量删除按钮的disabled
      modelType: '', // 弹框的类型，可编辑或可新增
      loading: false, // 弹框提交按钮加载动画
      loadingSubmit: false, // 查询按钮加载动画
      loadingReset: false, // 重置按钮加载动画
      roleTypeOptions: []// 角色类型
    }
  },
  // 在模板渲染成html后调用，通常是初始化页面完成后，再对html的dom节点进行一些需要的操作。
  mounted() {
    this.onReset()
    // 通过数据字典请求角色类型的值
    const paramsRoleType = { dictType: 'role_type' }
    queryRoleType(paramsRoleType).then(response => {
      this.roleTypeOptions = response.rows
    }).catch(() => {
      this.$message.error('角色类型请求失败！')
    })
  },
  methods: {
		  closeIt() {
		    this.isTestShow = false
    },
    getId(id) {
      this.tableRowValue.roleId = id
    },
		  getType(type) {
		    this.modelType = type
    },
    dialogHanderHides() {
      this.showdialog = false
    },
    // 角色分配
    roleAssignment(index, row) {
      this.tableRowValue = row
      this.showdialog = true
    },
    // 添加行-打开弹框
    addTableRow() {
      this.isShow = true// 打开弹框
      this.tableRowValue = {}// 行数据格式
      this.modelType = 'add'// 将弹框设为新增状态
    },
    // 删除当前行
    handleRemove($index, row) {
      this.$confirm('确定要删除【' + row.roleName + '】角色吗？角色一旦被删除，配置该角色的所有账号将默认为游客。', '删除角色', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        removeTableRowData(row.roleId).then(response => {
          if (response.code === 0) {
            this.$message({
              type: 'success',
              message: response.msg
            })
            this.roleForm.pageNum = 1
            this.ajaxData()
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
    // 编辑-打开弹框
    handleEdit($index, row) {
      this.isShow = true// 打开弹框
      this.tableRowValue = row// 将选中的行数据传到弹框
      this.modelType = 'edit'// 将弹框设为编辑状态
    },
    // 关闭弹框
    dialogHanderHide() {
      this.isShow = false
      this.isShowDataAccess = false
    },
    // 请求后台数据---axios
    ajaxData() {
      const params = this.roleForm
      getTableData(params).then(response => {
        this.tableData = response.rows
        this.count = response.total
        this.loadingReset = false
      }).catch(() => {
        setTimeout(() => {
          this.loadingReset = false
        }, 1000)
      })
    },
    // 表单查询按钮
    onSubmit() {
      this.loadingSubmit = true
      this.roleForm.pageNum = 1// 当前页码
      // this.roleForm.pageSize = 10;//每页显示的数据数量
      const params = {
        status: this.roleForm.status, // 角色状态
        roleType: this.roleForm.roleType, // 角色类型
        roleName: this.roleForm.roleName.trim(), // 关键字查询-角色名称
        pageNum: 1, // 当前页码
        pageSize: 10// 每页显示的数据数量
      }

      getTableData(params).then(response => {
        this.tableData = response.rows
        this.count = response.total
        this.loadingSubmit = false
      }).catch(() => {
        setTimeout(() => {
          this.loadingSubmit = false
        }, 1000)
      })
    },
    // 表单重置按钮
    onReset() {
      this.loadingReset = true
      this.roleForm = {
        status: '', // 角色状态
        roleType: '', // 角色类型
        roleName: '', // 关键字查询-角色名称
        pageNum: 1, // 当前页码
        pageSize: 10// 每页显示的数据数量
      }
      this.ajaxData()
    },
    // switch 开关事件监听
    changeSwitch(e) {
      let _tit = ''
      let _tips = ''
      if (e.status === '0') {
        _tit = '禁用'
        _tips = '角色一旦被' + _tit + '，配置【' + e.roleName + '】角色的所有账号将不再具有该角色权限。'
      } else {
        _tit = '启用'
        _tips = ''
      }

      const STATUS = e.status
      this.$confirm('确定要' + _tit + '【' + e.roleName + '】角色吗?' + _tips, _tit + '角色', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let status = null
        if (STATUS === '0') {
          status = 1
        } else {
          status = 0
        }
        const params = {
          roleId: e.roleId,
          status: status
        }

        changeRoleStatus(params).then(response => {
          if (response.code === 0) {
            this.$message({
              type: 'success',
              message: response.msg
            })
            this.ajaxData()
          } else {
            this.$message.error(response.msg)
          }
        }).catch(() => {
          this.$message.error('操作失败！')
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消操作！'
        })
        this.roleForm.status = STATUS
      })
    },
    // 添加数据权限弹框
    handleDataAccess($index, row) {
      this.isShowDataAccess = true// 打开弹框
      this.tableRowValue = row// 将选中的行数据传到弹框
    },
    // 添加数据权限提交按钮
    addDataAccessSubmit(params) {
      addDataAccess(params).then(response => {
        if (response.code === 0) {
          this.$message({
            type: 'success',
            message: response.msg
          })
          this.ajaxData()
          this.loading = false
        } else {
          this.$message.error(response.msg)
          this.loading = false
        }
      }).catch(() => {
        this.$message.error('操作失败！')
        this.loading = false
      })
    },
    // 查看详情
    lockDetails(row) {
      this.tableRowValue = row // 将选中的行数据传到弹框
      this.modelType = 'look' // 将弹框设为编辑状态
      this.isShow = true // 打开弹框
    }
  }
}
</script>

<style scoped>
	@import "~@/styles/form.css";
</style>
|
