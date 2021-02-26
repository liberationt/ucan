<template>
  <el-container>
    <el-header class="formDiv">
      <el-form :inline="true" :model="form" class="demo-form-inline">
        <el-form-item label="位置">
          <el-input
            v-model.trim="form.position"
            style="width: 300px;"
            clearable
            placeholder="请输入位置"
            @keyup.enter.native="onSubmit"
          />
        </el-form-item>
        <el-form-item label="接口地址">
          <el-input
            v-model.trim="form.key"
            style="width: 300px;"
            clearable
            placeholder="请输入接口地址"
            @keyup.enter.native="onSubmit"
          />
        </el-form-item>
        <el-form-item label="数据内容">
          <el-input
            v-model.trim="form.value"
            style="width: 300px;"
            clearable
            placeholder="请输入数据内容"
            @keyup.enter.native="onSubmit"
          />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" class="base-btn" @click="onSubmit">查询</el-button>
          <el-button type="warning" class="base-btn" @click="onReset">重置</el-button>
        </el-form-item>
      </el-form>
    </el-header>
    <el-main class="tableContainer">
      <el-container>
        <el-header>
          <el-button type="primary" size="small" class="base-btn" @click="addTableRow()">新增</el-button>
        </el-header>
        <el-main>
          <el-table
            :data="tableData"
            tooltip-effect="dark"
            style="width: 100%;"
            header-align="left"
            border
            row-key="id"
          >
            <el-table-column type="selection" width="50" />

            <el-table-column label="序号" width="80" fixed="left">
              <template slot-scope="{row,$index}">
                <span>{{ $index + 1 }}</span>
              </template>
            </el-table-column>

            <el-table-column label="在大屏中的位置描述信息" :show-overflow-tooltip="true" prop="position" width="350" />

            <el-table-column label="接口+参数信息" :show-overflow-tooltip="true" prop="key" min-width="200" />

            <el-table-column label="返回值信息" :show-overflow-tooltip="true" prop="value" min-width="300" />

            <el-table-column label="是否启用" prop="isValid" min-width="150">
              <template slot-scope="{row,$index}">
                <span>{{ row.isValid === '0' ? '启用' : '禁用' }}</span>
              </template>
            </el-table-column>

            <el-table-column
              fixed="right"
              label="操作"
              min-width="200"
              header-align="center"
              align="center"
            >
              <template slot-scope="{row,$index}">
                <span class="table-btn" @click="handleDisable($index, row)">{{ row.isValid === '0' ? '禁用' : '启用' }}</span>
                <span class="table-btn" @click="handleEdit($index, row)">编辑</span>
                <span class="table-btn" @click="handleRemove($index, row)">删除</span>
              </template>
            </el-table-column>
          </el-table>

          <pagination
            v-show="form.count>0"
            :total="form.count"
            :page.sync="form.pageNum"
            :limit.sync="form.pageSize"
            @pagination="ajaxData"
          />

          <myDialog
            :ajax-data="ajaxData"
            :dialog-table-visible="isShow"
            :table-row-value="tableRowValue"
            :model-type="modelType"
            @dialogHide="dialogHanderHide"
          />

        </el-main>
      </el-container>
    </el-main>
  </el-container>
</template>

<script>
import Pagination from '@/components/Pagination'
import myDialog from './components/dialog'
import {
  getTableData,
  removeTableRowData,
  disableTableRowData
} from '@/api/systemConfig/screenDataConfig'

export default {
  components: { Pagination, myDialog },
  data() {
    return {
      // 表单值table显示
      form: {
        position: '', // 位置
        key: '', // 接口地址
        value: '', // 数据内容
        count: 0, // 数据总数
        pageNum: 1, // 当前页码
        pageSize: 10 // 每页显示的数据数量
      },
      tableData: [],
      tableRowValue: '', // 表格当前行数据
      isShow: false, // 弹框显示隐藏
      isShowPass: false, // 弹框显示隐藏
      removeDisabled: true, // 批量删除按钮的disabled
      modelType: '', // 弹框的类型，可编辑或可新增
      loading: false, // 弹框提交按钮加载动画
      loadingSubmit: false, // 查询按钮加载动画
      loadingReset: false// 重置按钮加载动画
    }
  },
  // 在模板渲染成html后调用，通常是初始化页面完成后，再对html的dom节点进行一些需要的操作。
  created() {
    // this.ajaxData();
    this.onReset()
  },

  methods: {
    ajaxData() {
      const params = this.form
      getTableData(params)
        .then(response => {
          if (response.code === 0) {
            this.form.count = response.data.total
            this.tableData = response.data.list
            this.loadingReset = false
            this.loadingSubmit = false
          }
        })
        .catch(error => {
          reject(error)
          this.loadingReset = false
          this.loadingSubmit = false
        })
    },
    // 表单查询按钮
    onSubmit() {
      this.loadingSubmit = true
      this.form.pageNum = 1
      this.ajaxData()
    },

    // 删除当前行
    handleRemove($index, row) {
      this.$confirm(
        '确定要删除' + row.position + '吗? ',
        '删除参数',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }
      )
        .then(() => {
          removeTableRowData(row.id)
            .then(response => {
              if (response.code === 0) {
                this.$message({
                  type: 'success',
                  message: response.msg
                })
                this.form.pageNum = 1
                this.ajaxData()
              } else {
                this.$message.error(response.msg)
              }
            })
            .catch(error => {
              reject(error)
              this.$message.error('操作失败！')
            })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消操作！'
          })
        })
    },
    // 禁用启用
    handleDisable($index, row) {
      console.log(row)
      const tips = row.isValid === '0' ? '禁用' : '启用'
      this.$confirm(
        '确定要' + tips + row.position + '吗? ',
        '删除参数',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }
      )
        .then(() => {
          const param = {
            id: row.id,
            valid: row.isValid === '0' ? '1' : '0'
          }
          disableTableRowData(param)
            .then(response => {
              if (response.code === 0) {
                this.$message({
                  type: 'success',
                  message: response.msg
                })
                this.form.pageNum = 1
                this.ajaxData()
              } else {
                this.$message.error(response.msg)
              }
            })
            .catch(error => {
              reject(error)
              this.$message.error('操作失败！')
            })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消操作！'
          })
        })
    },
    // 编辑
    handleEdit($index, row) {
      this.isShow = true // 打开弹框
      this.tableRowValue = row // 将选中的行数据传到弹框
      this.modelType = 'edit' // 将弹框设为编辑状态
    },
    // 添加行
    addTableRow($index, row) {
      this.isShow = true // 打开弹框
      this.tableRowValue = row // 行数据格式
      this.modelType = 'add' // 将弹框设为新增状态
    },
    // 表单重置按钮
    onReset() {
      this.loadingReset = true
      // 表单值
      this.form = {
        position: '', // 位置
        key: '', // 接口地址
        value: '', // 数据内容
        count: 0, // 数据总数
        pageNum: 1, // 当前页码
        pageSize: 10 // 每页显示的数据数量
      }
      this.ajaxData()
    },
    dialogHanderHide() {
      this.isShow = false
    }
  }
}
</script>

<style scoped>
	@import "~@/styles/form.css";

</style>
