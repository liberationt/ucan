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
          <el-input
            v-model.trim="form.orgName"
            clearable
            placeholder="请输入养老机构"
            @keyup.enter.native="onSubmit"
          />
        </el-form-item>
        <el-form-item label="订单号">
          <el-input
            v-model.trim="form.orderNo"
            clearable
            placeholder="请输入订单号"
            @keyup.enter.native="onSubmit"
          />
        </el-form-item>
        <el-form-item label="订单流水号">
          <el-input
            v-model.trim="form.transId"
            clearable
            placeholder="请输入订单流水号"
            @keyup.enter.native="onSubmit"
          />
        </el-form-item>
        <el-form-item label="支付时间">
          <el-date-picker
            v-model="servicePeriod"
            type="datetimerange"
            range-separator="-"
            start-placeholder="开始时间"
            end-placeholder="结束时间"
            @keyup.enter.native="onSubmit"
          />
        </el-form-item>
        <el-form-item label="关键词">
          <el-input
            v-model.trim="form.keyword"
            clearable
            style="width: 290px"
            placeholder="请输入评估申请id、第三方平台交易号"
            @keyup.enter.native="onSubmit"
          />
        </el-form-item>
        <el-form-item label="订单状态">
          <el-select v-model="form.orderStatus" placeholder="请选择订单状态" clearable style="width: 200px" @keyup.enter.native="onSubmit">
            <el-option
              v-for="item in orderStatusCheck"
              :key="item.dictValue"
              :label="item.dictLabel"
              :value="item.dictValue"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="支付状态">
          <el-select v-model="form.paymentStatus" placeholder="请选择支付状态" clearable style="width: 200px" @keyup.enter.native="onSubmit">
            <el-option
              v-for="item in payMentStatusCheck"
              :key="item.dictValue"
              :label="item.dictLabel"
              :value="item.dictValue"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="支付类型">
          <el-select v-model="form.tradeType" placeholder="请选择支付类型" clearable style="width: 200px" @keyup.enter.native="onSubmit">
            <el-option
              v-for="item in tradeTypeCheck"
              :key="item.dictValue"
              :label="item.dictLabel"
              :value="item.dictValue"
            />
          </el-select>
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
            <el-table-column label="评估申请id" prop="applyId" width="120" />
            <el-table-column label="交易订单号" prop="orderNo" width="120" />
            <el-table-column label="交易流水号" prop="transId" width="120" />
            <el-table-column label="订单状态" prop="orderStatus" width="120" />
            <el-table-column label="支付状态" prop="paymentStatus" width="180" />
            <el-table-column label="养老机构" prop="orgName" width="180" />
            <el-table-column label="支付金额(元)" prop="totalFee" width="180" />
            <el-table-column label="支付方式" prop="tradeType" width="180" />
            <el-table-column label="第三方平台交易流水号" prop="otherTransId" width="180" />
            <el-table-column label="支付时间" prop="orderPayTime" width="180" />
            <!--
            <el-table-column label="操作" fixed="right" align="center" width="150">
              <template slot-scope="{row}">
                <span v-if="activeName==1" class="table-btn" @click="pendingOrders(row.id)">接单</span>
              </template>
            </el-table-column> -->
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
import { getOrgList } from '@/api/evaluationManagement/basicInformation'
import { getOrderRecordList } from '@/api/evaluationManagement/orders'
import { getDate_YMD, setDateTime } from '@/utils/index.js'
import { allSelectdictionaryData } from '@/api/facilitiesConfig/pensionAgency'
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
        orderNo: '',
        transId: '',
        startTime: '',
        endTime: '',
        pageNum: pageModel.pageNum,
        pageSize: pageModel.pageSize
      },
      tableData: [],
      servicePeriod: '',
      restaurants: [],
      areaCode: [],
      tabs: [{
        name: '订单列表',
        type: '1'
      }],
      idEdit: true,
      total: 0,
      activeName: '1',
      orderStatusCheck: [], // 订单状态
      payMentStatusCheck: [], // 支付状态
      tradeTypeCheck: [] // 支付类型
    }
  },
  mounted() {
    this.getSelect()
    this.getOrgOption()
    this.getData()
    this.idEdit = false
  },
  methods: {
    handleClick() {
      this.getData()
    },
    getAreaCode(val) {
      this.form.areaCode = val
    },
    onSubmit() {
      this.form.pageNum = 1
      this.getData()
    },
    getSelect() {
      const dictKey = [
        'order_status', // 订单状态
        'payment_status', // 支付状态
        'pg_payment_types' // 支付类型
      ].join(',')
      return new Promise((resolve, reject) => {
        allSelectdictionaryData(dictKey).then(response => {
          const dict = response.data
          for (const key in dict) {
            switch (key) {
              // 订单状态
              case 'order_status':
                this.orderStatusCheck = dict[key]
                break
              // 支付状态
              case 'payment_status':
                this.payMentStatusCheck = dict[key]
                break
              // 支付类型
              case 'pg_payment_types':
                this.tradeTypeCheck = dict[key]
                break
            }
          }
          resolve()
        }).catch(() => {
          reject()
        })
      })
    },
    onReset() {
      this.form.areaCode = []
      this.form = {
        areaCode: '', // 区域表单ID
        keyword: '',
        orgName: '',
        orderNo: '',
        transId: '',
        startTime: '',
        endTime: '',
        pageNum: pageModel.pageNum,
        pageSize: pageModel.pageSize
      }
      this.servicePeriod = ''
      this.idEdit = !this.idEdit
      this.getData(this.form)
    },
    getData() {
      const params = this.form
      if (this.servicePeriod && this.servicePeriod.length > 0) {
        params.startTime = setDateTime(this.servicePeriod[0])
        params.endTime = setDateTime(this.servicePeriod[1])
      } else {
        params.startTime = ''
        params.endTime = ''
      }
      // alert(params.areaCode);
      getOrderRecordList(params).then(res => {
        if (res.code === 0) {
          this.tableData = res.data.list
          this.tableData.forEach((item, index) => {
            // alert("orderPayTime: "+item.orderPayTime);
            if (item.orderPayTime != null) {
              var myDate = new Date(item.orderPayTime)
              this.tableData[index].orderPayTime = this.dateFtt('yyyy-MM-dd hh:mm:ss', myDate)
            }
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
        return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0)
      }
    },
    dateFtt(fmt, date) {
      var o = {
        'M+': date.getMonth() + 1, // 月份
        'd+': date.getDate(), // 日
        'h+': date.getHours(), // 小时
        'm+': date.getMinutes(), // 分
        's+': date.getSeconds(), // 秒
        'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
        'S': date.getMilliseconds() // 毫秒
      }
      if (/(y+)/.test(fmt)) { fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length)) }
      for (var k in o) {
        if (new RegExp('(' + k + ')').test(fmt)) { fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length))) }
      }
      return fmt
    }
  }
}
</script>

<style scoped>

</style>
