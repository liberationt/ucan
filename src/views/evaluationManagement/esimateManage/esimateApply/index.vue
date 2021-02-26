<template>
  <el-container class="es-table">
    <el-header class="formDiv">
      <el-form :inline="true" :model="form" class="demo-form-inline">
        <el-form-item label="所属区域">
          <Address
            :area-code="areaCode"
            :form-code="form.areaCode"
            :id-edit="idEdit"
            :width="'200px'"
            @getAreaCode="getAreaCode"
            @keyup.enter.native="search"
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
            @keyup.enter.native="search"
          />
        </el-form-item>
        <el-form-item label="评估类别">
          <el-select v-model="form.assessType" placeholder="请选择评估类别" clearable style="width: 200px" @keyup.enter.native="search">
            <el-option
              v-for="item in evaluationCategory"
              :key="item.dictValue"
              :label="item.dictLabel"
              :value="item.dictValue"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="入住情况">
          <el-select v-model="form.occupancyCode" placeholder="请选择入住情况" clearable style="width: 200px" @keyup.enter.native="search">
            <el-option
              v-for="item in checkIn"
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
            placeholder="请输入老人姓名或身份证号"
            @keyup.enter.native="search"
          />
        </el-form-item>
        <el-form-item label="申请时间">
          <el-date-picker
            v-model="servicePeriod"
            type="datetimerange"
            range-separator="-"
            start-placeholder="开始时间"
            end-placeholder="结束时间"
            :default-time="['12:00:00']"
            @keyup.enter.native="search"
          />
        </el-form-item>
        <el-form-item>
          <el-button v-has="{class: '查询'}" type="primary" class="base-btn" @click="search">查询
          </el-button>
          <el-button v-has="{class: '查询'}" type="warning" class="base-btn" @click="onReset">重置
          </el-button>
        </el-form-item>
      </el-form>
    </el-header>
    <el-main class="tableContainer">
      <el-container>
        <el-header>
          <el-button v-has="{class: '新增'}" type="primary" class="base-btn" @click="addTableRow()">新增
          </el-button>
          <el-button v-has="{class: '导入'}" type="primary" class="base-btn" @click="importFun()">导入
          </el-button>
          <el-button v-has="{class: '导出'}" type="primary" class="base-btn" @click="exportFun()">导出
          </el-button>
          <div style="width: 100%">
            <el-tabs v-model="activeName" @tab-click="handleClick">
              <el-tab-pane v-for="item in tabs" :key="item.type" :label="item.name" :name="item.key" />
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
            @row-dblclick="toDetail"
          >
            <el-table-column type="selection" width="50" />
            <el-table-column label="序号" width="50" fixed="left">
              <template slot-scope="{row,$index}">
                <span>{{ $index + 1 }}</span>
              </template>
            </el-table-column>
            <el-table-column label="评估编号" prop="assessNo" width="150"  align="center" />
            <el-table-column label="姓名" prop="fullName" width="120" />
            <el-table-column label="性别" prop="sex" width="80" />
            <el-table-column label="年龄" prop="age" width="100" />
            <el-table-column label="身份证号" prop="idCard" width="180" align="center"  />
            <el-table-column label="手机号码" prop="mobile" width="180" align="center" />
            <el-table-column label="居住地址" prop="liveAddr" min-width="250" />
            <el-table-column label="评估类别" prop="assessType" width="120" />
            <el-table-column label="入住情况" prop="occupancyCode" width="120" />
            <el-table-column label="预约评估日期" prop="appointmentData" width="150" />
            <el-table-column label="评估地点" prop="assessAddrCodeName"/>
<!--            <el-table-column label="申请状态" prop="assessStatus" width="120" />-->
            <el-table-column label="评估师1" prop="empMobileAndEmpName" width="240">
            </el-table-column>
            <el-table-column label="评估师2" prop="empMobileAndEmpName2" width="240">
            </el-table-column>
<!--            <el-table-column label="申请人账号" prop="createBy" width="120" />-->
            <el-table-column label="养老机构" prop="orgName" min-width="250" />
            <el-table-column label="任务状态" prop="taskStatus" min-width="150" v-if="activeName === 'has_not_started' || activeName === 'started'"/>
            <el-table-column label="完成时间" prop="assessCompleteDate" min-width="150"  v-if="activeName === 'to_be_reviewed' || activeName === 'completed'"/>
            <el-table-column label="取消时间" prop="updateTime" min-width="150" v-if="activeName === 'cancelled'"/>
            <el-table-column label="申请时间" prop="createTime" min-width="150" />
            <el-table-column label="操作" align="center" width="200" fixed="right">
              <template slot-scope="{row}">
                <span v-if="row.assessStatus === '待提交'" v-has="{class: '编辑'}" class="table-btn" @click="handleEdit(row)">
                  编辑
                </span>
                <span v-has="{class: '查看'}" class="table-btn" @click="toDetail(row)">
                  查看
                </span>
                <span v-if="row.assessStatus === '待提交'" v-has="{class: '删除'}" class="table-btn" @click="delList(row)">
                  删除
                </span>
                <span v-if="row.assessStatus === '待评估' || row.assessStatus === '评估中'" class="table-btn" @click="cancel(row)" v-has="{class: '取消评估'}">
                  取消评估
                </span>
              </template>
            </el-table-column>
          </el-table>
          <pagination
            v-show="total>0"
            :total="total"
            :page.sync="form.pageNum"
            :limit.sync="form.pageSize"
            @pagination="onSubmit"
          />
        </el-main>
      </el-container>
    </el-main>
    <el-dialog title="取消评估" :visible="cancelDialogVisible" width="10%" @close="close">
      <el-form ref="dailogForm" :model="dailogForm" :rules="dailogRules" label-width="0px" class="demo-ruleForm">
        <el-form-item label="" prop="cancelRemark">
          <div style="font-size: 16px" class="cancel-title">取消原因</div>
          <el-input v-model="dailogForm.cancelRemark" type="textarea" max-length="200" :autosize="{ minRows: 6, maxRows: 6}" placeholder="请输入取消原因，不超过200字" />
        </el-form-item>
      </el-form>
      <div style="text-align: right;margin-top: 10px">
        <el-button type="primary" class="base-btn btnMarginLeft15" @click="sureCancel('dailogForm')">确定</el-button>
        <el-button class="mr" @click="close">取消</el-button>
      </div>
    </el-dialog>
    <el-dialog title="扫码支付" :visible="payDialogVisible" width="10%" class="pay-dailog" @close="closePay">
      <div class="pay">
        <div class="pay-money">
          ￥
          <span>{{ payMesData.orderAmount }}</span>
        </div>
        <div class="pay-name">
          ({{ payMesData.fullName }})
        </div>
        <div class="pay-name">
          请用支付宝或微信扫描下面二维码，进行支付
        </div>
        <div>
          <el-radio-group v-model="payRadio">
            <el-radio :label="1">支付宝</el-radio>
            <el-radio :label="2">微信</el-radio>
          </el-radio-group>
        </div>
        <div class="pay-img">
          <img :src="payImg" alt="">
        </div>
      </div>
    </el-dialog>
    <ExcelUpload :dialog-table-visible="dialogVisible" :title="'导入评估申请'" :template-name="'评估申请导入模板'" :template-api="templateApi" :upload-url="uploadUrl" :type="'评估申请'" @visible="visible" />
  </el-container>
</template>

<script>
import Address from '@/components/Address'
import Pagination from '@/components/Pagination'
import { getEsimateApplyList, delApply, cancelApply, payMes, payAli, payWechat, paySuccess, exportApply, shortMes, getShenDownload } from '@/api/esimate/esimate'
import { pageModel } from '@/common'
import { allSelectdictionaryData } from '@/api/facilitiesConfig/pensionAgency'
import { downloadFromBlob } from '@/utils/index'
import { getOrgList } from '@/api/evaluationManagement/basicInformation'
import { canExport, exportTitleConstant, exportContentConstant, exportGoDownloadConstant, exportKnowConstant } from '@/common/constant'
import ExcelUpload from '@/components/newExcelUpload/assessorInformation'
export default {
  name: 'EsimateApply',
  components: {
    Address,
    Pagination,
    ExcelUpload
  },
  data() {
    return {
      templateApi: getShenDownload,
      uploadUrl: process.env.VUE_APP_BASE_API + '/assess/apply/import',
      payDialogVisible: false,
      payRadio: 1,
      dailogForm: {
        cancelRemark: '',
        id: ''
      },
      dailogRules: {
        cancelRemark: [
          { required: true, message: '请输入取消原因，不超过200字', trigger: 'blur' },
          { max: 200, message: '取消原因不能超过200字', trigger: 'change' },
          { min: 2, message: '取消原因不能少于2字', trigger: 'change' }
        ]
      },
      cancelDialogVisible: false,
      form: {
        areaCode: '', // 区域表单ID
        orgName: '',
        assessType: '',
        assessStatus: '',
        occupancyCode: '',
        keyword: '',
        applyBeginDate: '',
        applyEndDate: '',
        pageNum: pageModel.pageNum,
        pageSize: pageModel.pageSize
      },
      tableData: [],
      servicePeriod: '',
      areaCode: [],
      idEdit: true,
      total: 0,
      org_typeOptions: [],
      tabs: [{
        name: '全部',
        type: '1',
        key: ''
      }, {
        name: '待提交',
        type: '2',
        key: 'to_submit'
      }, {
        name: '待评估',
        type: '3',
        key: 'has_not_started'
      }, {
        name: '评估中',
        type: '4',
        key: 'started'
      }, {
        name: '已完成',
        type: '5',
        key: 'completed'
      }, {
        name: '待终评',
        type: '6',
        key: 'to_be_reviewed'
      }, {
        name: '已取消',
        type: '7',
        key: 'cancelled'
      }],
      activeName: '',
      evaluationCategory: [], // 评估类别
      checkIn: [], // 入住情况
      payMesData: '',
      payImg: '',
      payData: '',
      timer: null,
      isALready: '',
      exportData: '',
      restaurants: [],
      dialogVisible: false
    }
  },
  watch: {
    payRadio() {
      if (this.payRadio === 1) {
        this.payAli(this.payData)
      } else {
        this.payWechat(this.payData)
      }
    }
  },
  mounted() {
    this.getSelect()
    this.getData(this.form)
    this.idEdit = false
    this.getOrgOption()
  },
  methods: {
    visible(value) {
      this.dialogVisible = value
    },
    importFun() {
      this.dialogVisible = true
    },
    shortMes(id, name) {
      shortMes({
        id: id,
        fullName: name
      }).then(res =>{
        console.log(res);
      })
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
    querySearch(queryString, cb) {
      var restaurants = this.restaurants
      var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants
      // 调用 callback 返回建议列表的数据
      cb(results)
    },
    createFilter(queryString) {
      return (restaurant) => {
        return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) !== -1)
      }
    },
    async exportFun() {
      // 导出之前先获取列表数据 如果总记录数超出限制则不继续执行
      this.form.pageNum = 1
      await this.onSubmit()
      if (!canExport(this.total)) return
      const confirmTitle = '相同筛选条件，10分钟内不可重复提交，确认导出吗？'
      this.$confirm(
        confirmTitle,
        '导出评估申请',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }
      )
        .then(() => {
          const params = _.cloneDeep(this.form)
          delete params.pageNum
          delete params.pageSize
          exportApply(params).then(response => {
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
    },
    // // 导出功能
    // exportFun() {
    //   // form: {
    //   //   areaCode: '', // 区域表单ID
    //   //     orgName: '',
    //   //     assessType: '',
    //   //     assessStatus: '',
    //   //     occupancyCode: '',
    //   //     keyword: '',
    //   //     applyBeginDate: '',
    //   //     applyEndDate: '',
    //   //     pageNum: pageModel.pageNum,
    //   //     pageSize: pageModel.pageSize
    //   // },
    //   let confirmTitle = ''
    //   if (this.exportData.orgName === '' && this.exportData.assessType === '' && this.exportData.assessStatus === '' && this.exportData.occupancyCode === '' && this.exportData.keyword === '' && this.exportData.applyBeginDate === '' && this.exportData.applyEndDate === '') {
    //     confirmTitle = '确认导出全部评估申请信息吗？'
    //   } else {
    //     confirmTitle = '确认导出筛选的评估申请信息吗？'
    //   }
    //   this.$confirm(
    //     confirmTitle,
    //     '导出评估申请信息',
    //     {
    //       confirmButtonText: '确定',
    //       cancelButtonText: '取消',
    //       type: 'warning',
    //       closeOnClickModal: false
    //     }
    //   )
    //     .then(() => {
    //       const _form = this.form
    //       delete _form.pageNum
    //       delete _form.pageSize
    //       // const data = qs.stringify(this.exportData);
    //       exportApply(_form).then(response => {
    //         if (response instanceof ArrayBuffer) {
    //           const datas = new Blob([response], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8;' })
    //           downloadFromBlob(datas, '评估申请列表.xlsx')
    //         } else {
    //           if (response.code !== 0) {
    //             this.$message.error('导出评估申请信息操作失败，失败原因是：' + response.msg)
    //           }
    //         }
    //       }).catch(error => {
    //         if (error && error.message) {
    //           if (error.message.indexOf('timeout') > -1) {
    //             error.message = '网络连接超时'
    //           }
    //           this.$message.error('导出评估申请信息操作失败，失败原因是：' + error.message)
    //         } else {
    //           this.$message.error('导出评估申请信息操作失败！')
    //         }
    //       })
    //     })
    //     .catch(() => {
    //       this.$message({
    //         type: 'info',
    //         message: '已取消操作！'
    //       })
    //     })
    // },
    openPay(row) {
      this.payRadio = 1
      this.payData = ''
      this.payDialogVisible = true
      this.payData = row
      this.payMes(row.id)
      this.payAli(row)
      this.timer = setInterval(() => {
        this.paySuccess(row)
      }, 3000)
    },
    closePay() {
      this.payDialogVisible = false
      clearInterval(this.timer)
      this.timer = null
    },
    getSelect() {
      const dictKey = [
        'evaluation_category', // 评估类别
        'check_in' // 入住情况
      ].join(',')
      return new Promise((resolve, reject) => {
        allSelectdictionaryData(dictKey).then(response => {
          const dict = response.data
          for (const key in dict) {
            switch (key) {
              // 评估类别
              case 'evaluation_category':
                this.evaluationCategory = dict[key]
                break
              // 入住情况
              case 'check_in':
                this.checkIn = dict[key]
                break
            }
          }
          resolve()
        }).catch(() => {
          reject()
        })
      })
    },
    sureCancel(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          cancelApply(this.dailogForm).then(res => {
            if (res.code === 0) {
              this.$message.success('取消评估成功！')
              this.form.pageNum = 1
              this.onSubmit()
              this.close()
            }
          })
        }
      })
    },
    close() {
      this.cancelDialogVisible = false
      this.dailogForm.cancelRemark = ''
    },
    cancel(row) {
      this.cancelDialogVisible = true
      this.dailogForm.id = row.id
    },
    // 删除
    delList(row) {
      this.$confirm(
        `删除后无法恢复，确定要删除${row.fullName}的评估申请吗？`,
        '温馨提示',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          closeOnClickModal: false
        }
      )
        .then(() => {
          delApply(row.id).then(res => {
            if (res.code === 0) {
              this.$message.success('删除评估申请成功')
              this.form.pageNum = 1
              this.onSubmit()
            }
          })
        }).catch(() => {

        })
    },
    // 编辑
    handleEdit(row) {
      this.$router.push({
        path: `/esimateApply/details/${row.id}`,
        query: { 'modelType': 'edit', '_title': `编辑${row.fullName}`, 'menu': this.$route.meta.id }
      })
    },
    toDetail(row) {
      this.$router.push({
        path: `/esimateApply/details/${row.id}`,
        query: { 'modelType': 'look', '_title': `查看${row.fullName}`, 'menu': this.$route.meta.id }
      })
    },
    handleClick(row) {
      this.tableData = []
      this.isALready = row.label
      this.form.assessStatus = row.name
      this.form.pageNum = 1
      this.onSubmit()
    },
    getAreaCode(val) {
      this.areaCode = val
    },
    search() {
      this.form.pageNum = 1
      this.onSubmit()
    },
    onSubmit() {
      const params = _.cloneDeep(this.form)
      if (this.areaCode && this.areaCode.length) {
        params.areaCode = this.areaCode[this.areaCode.length - 1]
      } else {
        params.areaCode = ''
      }
      if (this.servicePeriod !== null && this.servicePeriod !== '') {
        params.applyBeginDate = this.dateFtt('yyyy-MM-dd hh:mm:ss', this.servicePeriod[0])
        params.applyEndDate = this.dateFtt('yyyy-MM-dd hh:mm:ss', this.servicePeriod[1])
      }
      this.getData(params)
    },
    onReset() {
      this.areaCode = []
      this.form = {
        areaCode: '', // 区域表单ID
        orgName: '',
        assessType: '',
        assessStatus: this.form.assessStatus,
        occupancyCode: '',
        keyword: '',
        applyBeginDate: '',
        applyEndDate: '',
        pageNum: pageModel.pageNum,
        pageSize: pageModel.pageSize
      }
      this.servicePeriod = ''
      this.idEdit = !this.idEdit
      this.getData(this.form)
    },
    getData(params) {
      getEsimateApplyList(params).then(res => {
        if (res.code === 0) {
          this.tableData = res.data.list
          this.tableData.forEach((item, index) => {
            var myDate = new Date(item.createTime)
            this.tableData[index].createTime = this.dateFtt('yyyy-MM-dd hh:mm:ss', myDate)
          })
          this.total = res.data.total
          // this.exportData = JSON.parse(JSON.stringify(this.form))
        }
      })
    },
    addTableRow() {
      this.$router.push({
        path: '/esimateApply/details/0',
        query: { 'modelType': 'add', '_title': `新增评估申请` }
      })
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
    payMes(id) {
      payMes({
        applyId: id
      }).then(res => {
        if (res.code === 0) {
          this.payMesData = res.data
        }
      })
    },
    payAli(row) {
      this.payImg = ''
      payAli({
        applyId: row.id,
        orderNo: row.orderNo
      }).then(res => {
        this.payImg = 'data:image/png;base64,' + btoa(
          new Uint8Array(res)
            .reduce((data, byte) => data + String.fromCharCode(byte), '')
        )
      })
    },
    payWechat(row) {
      this.payImg = ''
      payWechat({
        applyId: row.id,
        orderNo: row.orderNo
      }).then(res => {
        this.payImg = 'data:image/png;base64,' + btoa(
          new Uint8Array(res)
            .reduce((data, byte) => data + String.fromCharCode(byte), '')
        )
      })
    },
    paySuccess(row) {
      paySuccess({
        orderNo: row.orderNo
      }).then(res => {
        if (res.data === 'PAYED') {
          this.payDialogVisible = false
          clearInterval(this.timer)
          this.timer = null
          this.form.pageNum = 1
          this.onSubmit()
          this.$confirm(`您已成功支付${this.payMesData.orderAmount}元，系统已自动为${this.payMesData.fullName}老人派单。`, '温馨提示', {
            confirmButtonText: '查看',
            cancelButtonText: '返回',
            type: 'success'
          }).then(() => {
            this.$router.push('/evaluationManagement/esimateManage/taskPool')
          })
          this.shortMes(row.id, row.fullName)
        }
      })
    }
  }
}
</script>

<style scoped lang="scss">
.table-btn {
  padding: 0 5px;
}
.pay {
  width: 100%;
  text-align: center;
  .pay-money {
    width: 100%;
    text-align: center;
    span {
      color: #bf0000;
      font-size: 36px;
    }
  }
  .pay-name {
    width: 100%;
    color: #333;
    margin-top: 5px;
    font-weight: bold;
    margin-bottom: 10px;
  }
  .pay-img {
    width: 100%;
    position: absolute;
    left: 0;
    img {
      width: 150px;
      height: 150px;
    }
  }
}
</style>

<style  lang="scss">
  .es-table {
    .el-dialog {
      min-width: 500px !important;
      margin-top: 25vh !important;
    }
    .cancel-title:before {
      content: "*";
      color: #f56c6c;
      margin-right: 4px;
    }
    .el-dialog__body {
      height: 280px !important;
    }
  }
  .pay-dailog {
    .el-dialog__body {
      height: 300px !important;
    }
  }
</style>
