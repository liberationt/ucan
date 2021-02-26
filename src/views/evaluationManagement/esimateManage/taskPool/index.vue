<template>
  <el-container>
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
        <el-form-item label="养老机构">
          <el-autocomplete
            v-model="form.orgName"
            class="inline-input"
            :fetch-suggestions="querySearch"
            placeholder="请输入养老机构名称"
            :trigger-on-focus="false"
            style="width:100%"
            @keyup.enter.native="onSubmit"
          />
        </el-form-item>
        <el-form-item label="关键词">
          <el-input
            v-model.trim="form.keyword"
            clearable
            placeholder="请输入老人姓名"
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
    <el-main class="tableContainer">
      <el-container>
        <el-header>
          <div style="width: 100%">
            <el-tabs v-model="activeName" @tab-click="handleClick">
              <el-tab-pane v-for="item in tabs" :key="item.type" :label="item.name" :name="item.type" />
            </el-tabs>
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
          >
            <el-table-column type="selection" width="50" />
            <el-table-column label="序号" width="80" fixed="left">
              <template slot-scope="{row,$index}">
                <span>{{ $index + 1 }}</span>
              </template>
            </el-table-column>
            <el-table-column label="姓名" prop="fullName" width="120" />
            <el-table-column label="性别" prop="sex" width="80" />
            <el-table-column label="年龄" prop="age" width="100" />
            <el-table-column label="身份证号" prop="idCard" width="180" />
            <el-table-column label="预约评估日期" prop="appointmentData" width="180" />
            <el-table-column label="评估地址" prop="liveAddr" width="180" />
            <el-table-column label="养老机构" prop="orgName" width="180" />
            <el-table-column label="评估师1" prop="orderTakingAssessName1" min-width="180" />
            <el-table-column label="评估师2" prop="orderTakingAssessName2" min-width="180" />
            <el-table-column label="评估类别" prop="assessType" width="120" />
            <el-table-column label="入住情况" prop="occupancyCode" width="120" />
            <el-table-column v-if="activeName==1" label="派单时间" prop="assessOrderDate" width="120" />
            <el-table-column v-else label="接单时间" prop="assessStartDate" width="120" />
            <el-table-column label="任务状态" prop="assessStatus" width="120" />
            <el-table-column label="操作" fixed="right" align="center" width="150">
              <template slot-scope="{row}">
                <span v-if="activeName==1" v-has="{class: '接单'}" class="table-btn" @click="pendingOrders(row.id)">接单</span>
                <span v-if="activeName==2" v-has="{class: '放回任务池'}" class="table-btn" @click="orderReceived(row.id)">放回任务池</span>
              </template>
            </el-table-column>
          </el-table>
          <pagination
            v-show="total>0"
            :total="total"
            :page.sync="form.pageNum"
            :limit.sync="form.pageSize"
            @pagination="getData"
          />
        </el-main>
      </el-container>
    </el-main>
  </el-container>
</template>

<script>
import Address from '@/components/Address'
import Pagination from '@/components/Pagination'
import { pageModel } from '@/common'
import { getOrgList, getOrder, getPool, getEsimateApplyList } from '@/api/evaluationManagement/basicInformation'
export default {
  components: {
    Address,
    Pagination
  },
  data() {
    return {
      form: {
        areaCode: '', // 区域表单ID
        keyword: '',
        orgName: '',
        assessStatus: '',
        pageNum: pageModel.pageNum,
        pageSize: pageModel.pageSize
      },
      tableData: [],
      servicePeriod: '',
      restaurants: [],
      areaCode: [],
      idEdit: true,
      total: 0,
      tabs: [{
        name: '待接单',
        type: '1'
      }, {
        name: '已接单',
        type: '2'
      }],
      activeName: '1'
    }
  },
  mounted() {
    this.getOrgOption()
    this.getData()
    this.idEdit = false
  },
  methods: {
    handleClick() {
      this.getData()
    },
    getAreaCode(val) {
      this.areaCode = val
    },
    onSubmit() {
      this.form.pageNum = 1
      this.getData()
    },
    // 接单
    pendingOrders(id) {
      getOrder({ id: id }).then(res => {
        if (res.code == 0) {
          this.$message.success('接单成功')
          this.getData()
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    // 放回任务池
    orderReceived(id) {
      this.$confirm('放回派单池后，系统将重新进行派单，确定要放回吗', '温馨提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        getPool({ id: id }).then(res => {
          if (res.code == 0) {
            this.$message.success('放回派单池成功！')
            this.getData()
          } else {
            this.$message.error(res.msg)
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消操作！'
        })
      })
    },
    onReset() {
      this.form = {
        areaCode: '', // 区域表单ID
        keyword: '',
        orgName: '',
        assessStatus: '',
        pageNum: 1,
        pageSize: 10
      },
      this.areaCode = []
      this.idEdit = !this.idEdit
      this.getData()
    },
    getData() {
      if (this.activeName == '1') {
        this.form.assessStatus = 'pending_orders'
      } else {
        this.form.assessStatus = 'order_received'
      }
      if (this.areaCode && this.areaCode.length) {
        this.form.areaCode = this.areaCode[this.areaCode.length - 1]
      }
      getEsimateApplyList(this.form).then(res => {
        if (res.code === 0) {
          this.tableData = res.data.list
          this.tableData.forEach((item, index) => {
            var myDate = new Date(item.createTime)
          })
          this.total = res.data.total
        }
      })
    },
    querySearch(queryString, cb) {
      var restaurants = this.restaurants
      var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants
      // 调用 callback 返回建议列表的数据
      cb(results)
    },
    getOrgOption() {
      getOrgList().then(res => {
        if (res.code === 0) {
          if (res.data.list && res.data.list.length) {
            res.data.list.forEach(item => {
              this.restaurants.push({
                value: item.orgName
              })
            })
          }
        }
      })
    },
    createFilter(queryString) {
      return (restaurant) => {
        return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) !== -1)
      }
    }
  }
}
</script>

<style scoped>

</style>
