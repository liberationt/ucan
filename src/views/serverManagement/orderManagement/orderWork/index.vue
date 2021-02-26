<!-- index.vue -->
<template>
  <el-container>
    <!--查询表单-->
    <el-header class="formDiv">
      <el-form :inline="true" :model="form" class="demo-form-inline">
        <el-form-item v-if="data.accountType==='3'&& data.assistiveRentType===null" label="服务商">
          <el-select v-model="form.ospId" filterable placeholder="请选择服务商" clearable style="width: 200px" @keyup.enter.native="onSubmit">
            <el-option
              v-for="item in serveOptions"
              :key="item.org_id"
              :label="item.org_name"
              :value="item.org_id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="预计服务日期">
          <el-date-picker
            v-model="signDate"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            format="yyyy年MM月dd日"
            value-format="yyyy-MM-dd"
            style="width:380px"
          />
        </el-form-item>
        <el-form-item label="服务人员">
          <el-input
            v-model.trim="form.osEmpName"
            clearable
            placeholder="请输入服务人员姓名"
            style="width: 220px"
            @keyup.enter.native="onSubmit"
          />
        </el-form-item>
        <el-form-item label="是否异常">
          <el-select v-model="form.isAbnormal" filterable placeholder="请选择是否异常" clearable style="width: 200px" @keyup.enter.native="onSubmit">
            <el-option
              v-for="item in labelOptions"
              :key="item.dictValue"
              :label="item.dictLabel"
              :value="item.dictValue"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="工单状态">
          <el-select v-model="form.orderStatus" filterable placeholder="请选择工单状态" clearable style="width: 200px" @keyup.enter.native="onSubmit">
            <el-option
              v-for="item in statusOptions"
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
            placeholder="姓名/身份证号/工单编号"
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
            <el-button v-has="{class: '导入'}" type="primary" class="base-btn" @click="importFun()">导入
            </el-button>
            <el-button v-has="{class: '导出'}" type="primary" class="base-btn" @click="exportFun()">导出
            </el-button>
            <el-button v-has="{class: '迁入'}" type="primary" class="base-btn" @click="showMovein()">迁入
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
            @row-dblclick="toDetail"
          >
            <el-table-column type="selection" width="50" fixed="left" />
            <el-table-column label="序号" width="80" fixed="left">
              <template slot-scope="{row,$index}">
                <span>{{ $index + 1 }}</span>
              </template>
            </el-table-column>
            <el-table-column label="工单编号" prop="orderNo" min-width="160" show-overflow-tooltip />
            <el-table-column label="服务商名称" prop="ospName" min-width="120" show-overflow-tooltip />
            <el-table-column label="老人姓名" prop="fullName" min-width="80" />
            <el-table-column label="性别" prop="sexName" min-width="60" />
            <el-table-column label="年龄" prop="age" min-width="60" />
            <el-table-column label="身份证" prop="idCard" min-width="180" />
            <el-table-column label="服务人员" prop="osEmpName" min-width="80" />
            <el-table-column label="预计服务日期" prop="planServiceDate" min-width="120" />
            <el-table-column label="实际签到日期" prop="signStartDate" min-width="120" />
            <el-table-column label="签到时间" prop="signInTime" min-width="100" />
            <el-table-column label="签退时间" prop="checkOutTime" min-width="100" />
            <el-table-column label="是否异常" prop="isAbnormalName" min-width="100" />
            <el-table-column label="工单状态" prop="orderStatusName" min-width="100" />
            <el-table-column label="实际服务时长(分钟)" prop="actualServiceTime" min-width="160" show-overflow-tooltip />
            <el-table-column fixed="right" label="操作" align="center" width="150" header-align="center">
              <template slot-scope="{row,$index}">
                <!-- <span v-show="row.hasEdit" v-has="{class: '编辑'}" class="table-btn" @click="handleEdit(row)">编辑</span>
                <span v-show="row.hasDelete" v-has="{class: '删除'}" class="table-btn" @click="handleRemove($index, row)">删除</span> -->
                <span v-show="(row.orderStatus==='service_failed'&&data.accountType==='3'&& data.assistiveRentType!=null)||(row.orderStatus==='to_be_served'&data.accountType==='3'&& data.assistiveRentType!=null)" v-has="{class: '编辑'}" class="table-btn" @click="handleEdit(row)">编辑</span>
                <span class="table-btn" @click="toDetail(row)">查看</span>
              </template>
            </el-table-column>
          </el-table>
          <pagination
            v-show="total>0"
            :total="total"
            :page.sync="form.pageNum"
            :limit.sync="form.pageSize"
            @pagination="toNextPage"
          />
        </el-main>
      </el-container>
    </el-main>
  </el-container>
</template>
<script>
import _ from 'lodash'
import {
  allSelectdictionaryData
} from '@/api/facilitiesConfig/pensionAgency'
import Pagination from '@/components/Pagination'
import { pageModel } from '@/common'
import qs from 'qs'
import { Tools } from '@/utils/tools'
import {
  getElderDict,
  elderSearch,
  removeTableRowData
} from '@/api/userInfoConfig/elderInfo'
import { getOrderList, getServiceProvider } from '@/api/serverManagement/projectManagement'
import { Msg } from '@/utils/tools'
import { mapGetters } from 'vuex'
export default {
  components: {
    Pagination
  },
  computed: {
    ...mapGetters([
      'data'
    ])
  },
  data() {
    return {
      signDate: [],
      // 查询表单
      form: {
        // dateRange: '',
        orderStatus: '',
        osEmpName: '',
        isAbnormal: '',
        ospId: '',
        planServiceDateEnd: '',
        planServiceDateStart: '',
        keyword: '',
        pageNum: pageModel.pageNum, // 分页页数
        pageSize: pageModel.pageSize // 分页数量
      },
      orderHasBeenDispatched: 0,
      toBeDispatched: 0,
      // <-- table -->
      tableData: [], // table表格数据
      multipleSelection: [], // 多选的行数据
      total: 0, // 总共多少数量
      exportData: '', // 查询成功后赋值
      statusOptions: [],
      serveOptions: [],
      labelOptions: []
    }
  },
  mounted() {
    this.getData(this.form)
    this.getDict()
    getServiceProvider().then(res => {
      if (res.code == 0) {
        this.serveOptions = res.data
      }
    })
  },
  methods: {
    getDict() {
      const dictKey = [
        'ticket_status',
        'sys_Yes_No'
      ].join(',')
      return new Promise((resolve, reject) => {
        allSelectdictionaryData(dictKey).then(response => {
          const dict = response.data
          for (const key in dict) {
            switch (key) {
              case 'ticket_status':
                this.statusOptions = dict[key]
                break
              case 'sys_Yes_No':
                this.labelOptions = dict[key]
                break
            }
          }
          resolve()
        }).catch(() => {
          reject()
        })
      })
    },
    // 表单查询按钮
    async onSubmit() {
      this.form.pageNum = 1
      await this.getData(this.form)
    },
    toNextPage() {
      this.getData(this.form)
    },
    // 获取表格数据
    async getData(form) {
      if (this.signDate && this.signDate.length) {
        form.planServiceDateStart = this.signDate[0]
        form.planServiceDateEnd = this.signDate[1]
      }
      await getOrderList(form).then(res => {
        if (res.code == '0') {
          this.tableData = res.data.list
          this.total = res.data.total
        }
      }).catch(() => {
        this.$message.error('获取服务计划失败！')
      })
    },
    // 表单重置按钮
    onReset() {
      this.signDate = []
      this.form = {
        orderStatus: '',
        osEmpName: '',
        isAbnormal: '',
        ospId: '',
        planServiceDateEnd: '',
        planServiceDateStart: '',
        keyword: '',
        pageNum: pageModel.pageNum, // 分页页数
        pageSize: pageModel.pageSize // 分页数量
      }
      this.getData(this.form)
    },
    // 添加行
    addTableRow() {
      this.$router.push({
        path: '/orderManagement/orderWork/details',
        query: { 'modelType': 'add', '_title': '新增服务对象', 'menu': this.$route.meta.id } // modelType: 查看:look，编辑:edit，新增:add的类型
      })
    },
    // 双击行去详情页面
    toDetail(row) {
      this.$router.push({
        path: `/orderManagement/orderWork/details/${row.id}`,
        query: { 'modelType': 'look', '_title': `查看${row.fullName}`, 'menu': this.$route.meta.id, 'status': `${row.orderStatus}` }
      })
    },
    // 编辑按钮
    handleEdit(row) {
      this.$router.push({
        path: `/orderManagement/orderWork/details/${row.id}`,
        query: { 'modelType': 'edit', '_title': `编辑${row.fullName}`, 'menu': this.$route.meta.id, 'status': `${row.orderStatus}` }
      })
    },
    // 删除按钮
    handleRemove($index, row) {
      this.$confirm('确定要删除【' + row.fullName + '】吗？信息一旦被删除，将无法显示和操作。', '删除老人信息', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        removeTableRowData(row.id).then(response => {
          if (response.code === 0 || response.code === '0') {
            Msg.loading()
            setTimeout(() => {
              this.$message({
                type: 'success',
                message: `删除老人信息成功！`
              })
              this.form.pageNum = 1
              this.getData(this.form)
              Msg.hideLoading()
            }, 5000)
          } else {
            this.$message.error(`删除老人信息操作失败，失败原因是：${response.msg}`)
          }
        }).catch(() => {
          this.$message.error(`删除老人信息操作失败!`)
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
