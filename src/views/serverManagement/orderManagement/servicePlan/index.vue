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
        <!-- <el-form-item label="派单日期">
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
        </el-form-item> -->
        <el-form-item v-if="data.accountType==='3'&& data.assistiveRentType!==null" label="本日派单状态">
          <el-select v-model="form.dispatchStatus" filterable placeholder="请选择本日派单状态" clearable style="width: 200px" @keyup.enter.native="onSubmit">
            <el-option
              v-for="item in statusOptions"
              :key="item.dictValue"
              :label="item.dictLabel"
              :value="item.dictValue"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="年龄范围">
          <el-input
            v-model.trim="form.ageMin"
            clearable
            placeholder="最小年龄"
            style="width: 120px"
            @keyup.enter.native="onSubmit"
          />
        </el-form-item>
        <el-form-item label="">
          <el-input
            v-model.trim="form.ageMax"
            clearable
            placeholder="最大年龄"
            style="width: 120px"
            @keyup.enter.native="onSubmit"
          />
        </el-form-item>
        <el-form-item label="姓名">
          <el-input
            v-model.trim="form.fullName"
            clearable
            placeholder="请输入姓名查询"
            style="width: 220px"
            @keyup.enter.native="onSubmit"
          />
        </el-form-item>
        <el-form-item label="身份证号">
          <el-input
            v-model.trim="form.idCard"
            clearable
            placeholder="请输入身份证号查询"
            style="width: 220px"
            @keyup.enter.native="onSubmit"
          />
        </el-form-item>
        <el-form-item label="手机号">
          <el-input
            v-model.trim="form.mobile"
            clearable
            placeholder="请输入手机号查询"
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
            <el-button v-if="data.accountType==='3'&& data.assistiveRentType!=null" v-has="{class: '新增'}" type="primary" class="base-btn" @click="addTableRow()">新增
            </el-button>
            <div v-if="data.accountType==='3'&& data.assistiveRentType!==null" class="totalWrap">已派单{{ orderHasBeenDispatched }}人，待派单{{ toBeDispatched }}人。</div>
            <!-- <div v-else class="totalWrap">无法找到匹配信息</div> -->
          </div>
        </el-header>
        <el-main>
          <el-table
            :data="tableData"
            tooltip-effect="dark"
            style="width: 100%;"
            header-align="left"
            border
            row-key="osbObjId"
            @row-dblclick="toDetail"
          >
            <el-table-column type="selection" width="50" fixed="left" />
            <el-table-column label="序号" width="80" fixed="left">
              <template slot-scope="{row,$index}">
                <span>{{ $index + 1 }}</span>
              </template>
            </el-table-column>
            <el-table-column v-if="data.accountType==='3'&& data.assistiveRentType===null" label="服务商名称" prop="ospName" min-width="120" />
            <el-table-column label="姓名" prop="fullName" min-width="90" />
            <el-table-column label="性别" prop="sexName" min-width="60" />
            <el-table-column label="年龄" prop="age" min-width="60" />
            <el-table-column label="身份证" prop="idCard" min-width="140" />
            <el-table-column label="手机号码" prop="mobile" min-width="100" />
            <el-table-column label="服务地址" prop="serviceAddr" min-width="100" show-overflow-tooltip />
            <!-- <el-table-column label="派单日期" prop="planServiceDate" min-width="100" /> -->
            <el-table-column v-if="data.accountType==='3'&& data.assistiveRentType!==null" label="本日派单状态" prop="dispatchStatusName" min-width="100" />
            <el-table-column label="居家养老补贴" prop="homeCareSubsidyName" min-width="100" />
            <el-table-column v-if="data.accountType==='3'&& data.assistiveRentType!=null" fixed="right" label="操作" min-width="220" header-align="center">
              <template slot-scope="{row,$index}">
                <span v-if="row.planStatus === 'no'" v-has="{class: '创建计划'}" class="table-btn" @click="toPlan(row)">创建计划</span>
                <span v-if="row.planStatus === 'yes'" v-has="{class: '查看计划'}" class="table-btn" @click="toLookPlan(row)">查看计划</span>
                <span v-if="row.dispatchOfTheMonth === 'yes'" v-has="{class: '查看批量派单'}" class="table-btn" @click="toLookOrder(row)">查看批量派单</span>
                <span v-if="row.dispatchOfTheMonth === 'yes'" v-has="{class: '查看本月派单'}" class="table-btn" @click="toLookMonth(row)">查看本月派单</span>
                <span v-if="row.planStatus === 'yes'" v-has="{class: '维护服务计划'}" class="table-btn" @click="toPlan(row)">维护服务计划</span>
                <span v-if="row.planStatus === 'yes'" v-has="{class: '批量派单'}" class="table-btn" @click="offerOrder(row)">批量派单</span>
                <span v-show="row.hasEdit" v-has="{class: '编辑'}" class="table-btn" @click="handleEdit(row)">编辑</span>
                <span v-show="row.hasDelete" v-has="{class: '删除'}" class="table-btn" @click="handleRemove($index, row)">删除</span>
              </template>
            </el-table-column>
            <el-table-column v-else fixed="right" label="操作" width="220" header-align="center">
              <template slot-scope="{row,$index}">
                <span v-if="row.planStatus === 'yes'" v-has="{class: '查看计划'}" class="table-btn" @click="toLookPlan(row)">查看计划</span>
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
    <el-dialog v-dialogDrag title="本月派单" :visible.sync="dialogTableVisible">
      <el-table :data="gridData">
        <el-table-column label="序号" width="80" fixed="left">
          <template slot-scope="{row,$index}">
            <span>{{ $index + 1 }}</span>
          </template>
        </el-table-column>
        <el-table-column label="工单编号" prop="orderNo" min-width="120" show-overflow-tooltip />
        <el-table-column label="服务人员" prop="osEmpName" min-width="80" />
        <el-table-column label="预计服务日期" prop="planServiceDate" min-width="120" />
        <el-table-column label="实际签到日期" prop="signStartDate" min-width="120" />
        <el-table-column label="签到日期" prop="signInTime" min-width="100" />
        <el-table-column label="签退日期" prop="checkOutTime" min-width="100" />
        <el-table-column label="是否异常" prop="isAbnormalName" min-width="100" />
        <el-table-column label="工单状态" prop="orderStatusName" min-width="100" />
        <el-table-column label="实际服务时长(分钟)" prop="actualServiceTime" min-width="160" show-overflow-tooltip />
      </el-table>
      <div class="pagination-container">
        <pagination
          v-show="monthTotal>0"
          :total="monthTotal"
          :page.sync="monthForm.pageNum"
          :limit.sync="monthForm.pageSize"
          :layout="layout"
          @pagination="getMouth()"
        />
      </div>
    </el-dialog>
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
import { getServeList, getServiceProvider, getServeMonth } from '@/api/serverManagement/projectManagement'
import { Msg } from '@/utils/tools'
import { mapGetters } from 'vuex'

export default {
  components: {
    Pagination
  },
  data() {
    return {
      signDate: [],
      dialogTableVisible: false,
      monthTotal: 0,
      layout: 'total,prev, pager, next,jumper',
      gridData: [],
      // 查询表单
      form: {
        // dateRange: '',
        ospId: '',
        dispatchStatus: '',
        // startDate: '',
        // endDate: '',
        ageMin: '',
        ageMax: '',
        fullName: '',
        idCard: '',
        mobile: '',
        pageNum: pageModel.pageNum, // 分页页数
        pageSize: pageModel.pageSize // 分页数量
      },
      monthForm: {
        osObjId: '',
        pageNum: 1, // 分页页数
        pageSize: 5 // 分页数量
      },
      orderHasBeenDispatched: 0,
      toBeDispatched: 0,
      // <-- table -->
      tableData: [], // table表格数据
      multipleSelection: [], // 多选的行数据
      total: 0, // 总共多少数量
      exportData: '', // 查询成功后赋值
      statusOptions: [],
      serveOptions: []
    }
  },
  computed: {
    ...mapGetters([
      'data'
    ])
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
    offerOrder(row) {
      this.$router.push({
        path: '/orderManagement/servicePlan/orderDetail',
        query: { 'modelType': 'edit', '_title': '批量派单', 'menu': this.$route.meta.id, 'id': row.id } // modelType: 查看:look，编辑:edit，新增:add的类型
      })
    },
    toLookOrder(row) {
      this.$router.push({
        path: '/orderManagement/servicePlan/orderDetail',
        query: { 'modelType': 'look', '_title': '查看批量派单', 'menu': this.$route.meta.id, 'id': row.id } // modelType: 查看:look，编辑:edit，新增:add的类型
      })
    },
    toLookPlan(row) {
      this.$router.push({
        path: '/orderManagement/servicePlan/planDetail',
        query: { 'modelType': 'look', '_title': '查看服务计划', 'menu': this.$route.meta.id, 'id': row.id } // modelType: 查看:look，编辑:edit，新增:add的类型
      })
    },
    toLookMonth(row) {
      this.monthForm.pageNum = 1
      this.dialogTableVisible = true
      this.monthForm.osObjId = row.id
      this.getMouth()
    },
    getMouth() {
      getServeMonth(this.monthForm).then(res => {
        if (res.code == 0) {
          this.monthTotal = res.data.total
          this.gridData = res.data.list
        }
      })
    },
    nextPage(val) {
      // console.log(val)

    },
    toPlan(row) {
      this.$router.push({
        path: '/orderManagement/servicePlan/planDetail',
        query: { 'modelType': 'edit', '_title': '维护服务计划', 'menu': this.$route.meta.id, 'id': row.id } // modelType: 查看:look，编辑:edit，新增:add的类型
      })
    },
    getDict() {
      const dictKey = [
        'dispatch_status'
      ].join(',')
      return new Promise((resolve, reject) => {
        allSelectdictionaryData(dictKey).then(response => {
          const dict = response.data
          for (const key in dict) {
            switch (key) {
              case 'dispatch_status':
                this.statusOptions = dict[key]
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
      // if (this.signDate && this.signDate.length) {
      //   form.startDate = this.signDate[0]
      //   form.endDate = this.signDate[1]
      // }
      await getServeList(form).then(res => {
        if (res.code == '0') {
          this.tableData = res.data.pageInfo.list
          this.orderHasBeenDispatched = res.data.orderHasBeenDispatched
          this.toBeDispatched = res.data.toBeDispatched
          this.total = res.data.pageInfo.total
        } else {
          this.$message.error(res.msg)
        }
      }).catch(() => {
        this.$message.error('获取服务计划失败！')
      })
    },
    // 表单重置按钮
    onReset() {
      this.signDate = []
      this.form = {
        ospId: '',
        dispatchStatus: '',
        // startDate: '',
        // endDate: '',
        ageMin: '',
        ageMax: '',
        fullName: '',
        idCard: '',
        mobile: '',
        pageNum: pageModel.pageNum, // 分页页数
        pageSize: pageModel.pageSize // 分页数量
      }
      this.getData(this.form)
    },
    // 添加行
    addTableRow() {
      this.$router.push({
        path: '/orderManagement/servicePlan/details',
        query: { 'modelType': 'add', '_title': '新增服务对象', 'menu': this.$route.meta.id } // modelType: 查看:look，编辑:edit，新增:add的类型
      })
    },
    // 双击行去详情页面
    toDetail(row) {
      this.$router.push({
        path: `/orderManagement/servicePlan/details/${row.id}`,
        query: { 'modelType': 'look', '_title': `查看${row.fullName}`, 'menu': this.$route.meta.id, 'hasEdit': row.hasEdit }
      })
    },
    // 编辑按钮
    handleEdit(row) {
      this.$router.push({
        path: `/orderManagement/servicePlan/details/${row.id}`,
        query: { 'modelType': 'edit', '_title': `编辑${row.fullName}`, 'menu': this.$route.meta.id }
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
