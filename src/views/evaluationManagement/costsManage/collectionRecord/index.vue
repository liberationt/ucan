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
        <el-form-item label="评估师">
          <el-input
            v-model.trim="form.assessEmpName"
            clearable
            placeholder="请输入评估师姓名"
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
            placeholder="请输入姓名、身份证号、评估编号"
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
          <div class="total-nav">
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
          >
            <el-table-column type="selection" width="50" />
            <el-table-column label="序号" width="60" fixed="left">
              <template slot-scope="{row,$index}">
                <span>{{ $index + 1 }}</span>
              </template>
            </el-table-column>
            <el-table-column label="评估编号" prop="assessNo" min-width="135" />
            <el-table-column label="交易流水号" prop="transId" min-width="250" />
            <el-table-column label="姓名" prop="fullName" width="120" />
            <el-table-column label="身份证号" prop="idCard" min-width="180" />
            <el-table-column label="养老机构" prop="orgName" width="280" />
            <el-table-column label="支付金额(元)" prop="payAmt" min-width="120" />
            <el-table-column label="支付方式" prop="payType" min-width="100" />
            <el-table-column label="评估费用承担" prop="costBearingCode" width="130" />
            <el-table-column label="支付时间" prop="orderPayTime" width="160" />
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
import { getRecordList } from '@/api/evaluationManagement/costs'
import { getDate_YMD, setDateTime } from '@/utils/index.js'
import { getAssessorCostExport } from '@/api/importExportApi'
import { exportTitleConstant, exportContentConstant, exportGoDownloadConstant, exportKnowConstant, canExport } from '@/common/constant'// 常量池
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
        assessEmpName: '',
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
        name: '收款列表',
        type: '1'
      }],
      idEdit: true,
      total: 0,
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
      this.form.areaCode = val
    },
    onSubmit() {
      this.form.pageNum = 1
      this.getData()
    },
    onReset() {
      this.form.areaCode = []
      this.form = {
        areaCode: '', // 区域表单ID
        keyword: '',
        orgName: '',
        assessEmpName: '',
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
      getRecordList(params).then(res => {
        if (res.code === 0) {
          this.tableData = res.data.list
          this.tableData.forEach((item, index) => {
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
    },
    async exportFun() {
      // 导出之前先获取列表数据 如果总记录数超出限制则不继续执行
      await this.onSubmit()
      if (!canExport(this.total)) return
      const confirmTitle = '相同筛选条件，10分钟内不可重复提交，确认导出吗？'
      this.$confirm(
        confirmTitle,
        '导出评估师',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }
      )
        .then(() => {
          getAssessorCostExport(this.exportData).then(response => {
            if (response.code === 0) {
              this.$alert(exportContentConstant, exportTitleConstant, {
                confirmButtonText: exportGoDownloadConstant,
                cancelButtonText: exportKnowConstant,
                showCancelButton: true,
                callback: action => {
                  if (action === 'cancel') return
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
    }
  }
}
</script>

<style scoped>

</style>
