<template>
  <el-container>
    <el-header class="formDiv">
      <el-form :inline="true" :model="form" class="demo-form-inline" label-width="100px">
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
        <el-form-item label="评估状态">
          <el-select
            v-model="form.assessStatus"
            placeholder="请选择评估状态"
            clearable
            style="width: 200px"
            @keyup.enter.native="onSubmit"
          >
            <el-option
              v-for="item in assessmentStatusOptions"
              :key="item.dictValue"
              :label="item.dictLabel"
              :value="item.dictValue"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="评估类别">
          <el-select
            v-model="form.assessType"
            placeholder="请选择评估类别"
            clearable
            style="width: 200px"
            @keyup.enter.native="onSubmit"
          >
            <el-option
              v-for="item in evaluationCategoryOptions"
              :key="item.dictValue"
              :label="item.dictLabel"
              :value="item.dictValue"
            />
          </el-select>
        </el-form-item>
        <!-- <el-form-item label="评估师">
          <el-select
            v-model="form.assessEmpId"
            placeholder="请选择评估师"
            clearable
            style="width: 200px"
            @keyup.enter.native="onSubmit"
          >
            <el-option
              v-for="item in org_typeOptions"
              :key="item.dictValue"
              :label="item.dictLabel"
              :value="item.dictValue"
            />
          </el-select>
        </el-form-item> -->
        <el-form-item label="关键词">
          <el-input
            v-model.trim="form.keyword"
            clearable
            style="width: 200px"
            placeholder="请输入老人姓名或身份证号"
            @keyup.enter.native="onSubmit"
          />
        </el-form-item>
        <el-form-item label="申请时间">
          <el-date-picker
            v-model="servicePeriod"
            type="datetimerange"
            range-separator="-"
            start-placeholder="开始时间"
            end-placeholder="结束时间"
            @keyup.enter.native="onSubmit"
          />
        </el-form-item>
        <el-form-item>
          <el-button v-has="{class: '查询'}" type="primary" class="base-btn" @click="onSubmit">查询</el-button>
          <el-button v-has="{class: '查询'}" type="warning" class="base-btn" @click="onReset">重置</el-button>
        </el-form-item>
      </el-form>
    </el-header>
    <el-main class="tableContainer pgbiao">
      <el-container>
        <el-header>
          <el-button v-has="{class: '新增'}" type="primary" class="base-btn" @click="addTableRow()">新增</el-button>
          <el-button v-has="{class: '导入'}" type="primary" class="base-btn" @click="addTableRow()">导入</el-button>
          <el-button type="primary" class="base-btn" @click="exportFun()">导出</el-button>
          <div style="width: 100%">
            <el-tabs v-model="activeName" @tab-click="handleClick">
              <el-tab-pane
                v-for="item in tabs"
                :key="item.type"
                :label="item.name"
                :name="item.type"
              />
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
            <el-table-column label="序号" width="80" fixed="left">
              <template slot-scope="{row,$index}">
                <span>{{ $index + 1 }}</span>
              </template>
            </el-table-column>
            <el-table-column label="评估编号" prop="assessNo" width="130" />
            <el-table-column label="姓名" prop="fullName" width="120" />
            <el-table-column label="性别" prop="sexName" width="80" />
            <el-table-column label="年龄" prop="age" width="100" />
            <el-table-column label="身份证号" prop="idCard" width="180" />
            <el-table-column label="评估联络人" prop="assessLinkman" min-width="180" />
            <el-table-column label="评估地址" prop="assessAddress" min-width="250" />
            <el-table-column label="预约评估日期" prop="appointmentData" min-width="250" />
            <el-table-column label="养老机构" prop="orgName" min-width="250" />
            <el-table-column label="评估状态" prop="assessStatusName" width="120" />
            <el-table-column label="评估类别" prop="assessTypeName" width="120" />
            <el-table-column label="入住情况" prop="occupancyCodeName" width="120" />
            <el-table-column label="评估师1" prop="assessor1" width="160" />
            <el-table-column label="评估师2" prop="assessor2" width="160" />
            <el-table-column
              v-show="activeName=='completed'"
              label="完成时间"
              prop="completeTime"
              min-width="150"
            />
            <el-table-column
              v-show="activeName=='cancelled,put_back'"
              label="取消时间"
              prop="cancellationTime"
              min-width="150"
            />
            <el-table-column label="开始时间" prop="assessBuildTime" min-width="150" />
            <el-table-column
              v-if="activeName=='has_not_started,started'"
              label="距任务结束时长"
              prop="distanceTaskEndTime"
              min-width="250"
            />
            <el-table-column label="操作" align="center" fixed="right" width="430">
              <template slot-scope="{row}">
                <!-- 评估状态为 -> 未开始的才可以开始评估 -->
                <span v-if="row.assessStatus == 'has_not_started'" v-has="{class: '开始评估'}" class="table-btn" @click="beginAssess(row.id,row.fullName)">开始评估</span>
                <!-- 评估状态为 -> 未开始的才可以修改评估日期 -->
                <span v-if="row.assessStatus == 'has_not_started' && !row.updatedAppointmentData" v-has="{class: '修改评估日期'}" class="table-btn" @click="modifyData(row.id)">修改评估日期</span>
                <!-- 评估状态为 -> 已开始、待复审的才可以继续评估 并且 如果等于待复审则需要等待14天后才可继续评估 -->
                <span v-if="hasShowContinueAssess(row)" v-has="{class: '继续评估'}" class="table-btn" @click="handleEdit(row)">继续评估</span>
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
      <el-dialog v-dialogDrag title="修改评估日期" :visible.sync="dialogVisible" width="30%">
        <div style="width:400px;margin:60px auto;">
          <div style="margin-bottom:30px;">原评估日期：{{ this.updateAssessDate.date }}</div>
          <div>
            <span>现评估日期：</span>
            <el-date-picker
              v-model="updateAssessDateValue"
              :picker-options="pickerOptions"
              format="yyyy年MM月dd日"
              value-format="yyyy-MM-dd"
              type="date"
              placeholder="选择日期"
            />
          </div>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="closeData">取 消</el-button>
          <el-button type="primary" @click="saveData">确 定</el-button>
        </span>
      </el-dialog>
      <el-dialog v-dialogDrag title="评估师身份验证" :visible.sync="dialogVisible1" width="30%">
        <div style="width:400px;margin:10px auto;">
          <div style="margin-bottom:30px;">
            请获取并填写短信验证码，进行身份证验证
            <el-button style="margin-left:5px;" @click="flag && getObtain()">{{ content }}</el-button>
          </div>
          <div style="margin-bottom: 50px">
            <div style="margin-bottom:15px">
              <span>评估师：{{ stateForm.bizAssessEmp1.fullName }}</span>
            </div>
            <div style="margin-bottom:15px">
              <span>手机号：{{ stateForm.bizAssessEmp1.mobile }}</span>
            </div>
            <div style="margin-bottom:50px">
              <span>
                验证码：
                <el-input v-model="code1" clearable style="width:200px;" placeholder="请输入验证码" />
              </span>
            </div>
            <div style="margin-bottom:15px">
              <span>评估师：{{ stateForm.bizAssessEmp2.fullName }}</span>
            </div>
            <div style="margin-bottom:15px">
              <span>手机号：{{ stateForm.bizAssessEmp2.mobile }}</span>
            </div>
            <div>
              <span>
                验证码：
                <el-input
                  v-model="code2"
                  style="width:200px;"
                  clearable
                  placeholder="请输入验证码"
                />
              </span>
            </div>
          </div>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="closeAssesse">取 消</el-button>
          <el-button type="primary" @click="saveAssesse">确 定</el-button>
        </span>
      </el-dialog>
    </el-main>
  </el-container>
</template>

<script>
import _ from 'lodash'
import { getDate_YMD, setDateTime } from '@/utils/index.js'
import Address from '@/components/Address'
import Pagination from '@/components/Pagination'
import { getEsimateApplyList } from '@/api/esimate/esimate'
import { pageModel } from '@/common'
import { getAssessmentList, getStartAssess, getVerificationCode, saveStartAssess, editAssessDate, updateAssessDate } from '@/api/evaluationManagement/assessmentForm'
import { allSelectdictionaryData } from '@/api/facilitiesConfig/pensionAgency'
import { getOrgList } from '@/api/evaluationManagement/basicInformation'
import { exportAssessmentForm } from '@/api/importExportApi'
import { exportTitleConstant, exportContentConstant, exportGoDownloadConstant, exportKnowConstant, canExport } from '@/common/constant'// 常量池
export default {
  name: 'AssessmentForm',
  components: {
    Address,
    Pagination
  },
  data() {
    return {
      // 修改评估日期需要限制日期选择范围
      pickerOptions: {
        disabledDate: time => {
          return time.getTime() > Date.parse(new Date(this.updateAssessDate.endDate)) || time.getTime() < Date.parse(new Date(this.updateAssessDate.startDate))
        }
      },
      // 修改评估日期对象
      updateAssessDateAssessId: '',
      updateAssessDateValue: '',
      updateAssessDate: {
        date: '',
        startDate: '',
        endDate: ''
      },
      value1: '',
      dialogVisible: false,
      dialogVisible1: false,
      code2: '',
      code1: '',
      input: '',
      fullName: '',
      content: '获取验证码',
      flag: true,
      timer: null,
      form: {
        areaCode: '', // 区域表单ID
        // assessEmpId: '', // 评估师
        assessStatus: '', // 评估状态
        assessType: '', // 评估类别
        assessTypeTab: '', // 列表类型
        orgName: '',
        endTime: '',
        startTime: '',
        keyword: '',
        pageNum: pageModel.pageNum,
        pageSize: pageModel.pageSize
      },
      stateForm: {
        bizAssessEmp1: {
          mobile: '',
          fullName: ''
        },
        bizAssessEmp2: {
          mobile: '',
          fullName: ''
        }
      },
      assessId: '',
      tableData: [],
      assessmentStatusOptions: [], // 评估状态
      evaluationCategoryOptions: [], // 评估类别
      restaurants: [],
      servicePeriod: [],
      areaCode: [],
      idEdit: true,
      total: 0,
      org_typeOptions: [],
      tabs: [
        {
          name: '全部',
          type: null
        },
        {
          name: '待评估',
          type: 'has_not_started,started'
        },
        {
          name: '待复审',
          type: 'to_be_reviewed'
        },
        {
          name: '已完成',
          type: 'completed'
        },
        {
          name: '已取消',
          type: 'cancelled,put_back'
        }
      ],
      activeName: null
    }
  },
  mounted() {
    this.getSelect()
    this.getOrgOption()
    this.getData()
    this.idEdit = false
  },
  methods: {
    // 是否可以继续评估
    hasShowContinueAssess(assess) {
      // 如果等于待复审则需要等待14天后才可继续评估
      const assessStatus = assess.assessStatus
      if (assessStatus == 'to_be_reviewed' && assess.completeTime != null) {
        const completeTimeDate = new Date(assess.completeTime)
        const completeTimeDateOffset14 = new Date(completeTimeDate.setDate(completeTimeDate.getDate() + 14))
        return new Date().getTime() > completeTimeDateOffset14.getTime()
      }
      return assessStatus == 'to_be_reviewed' || assessStatus == 'started'
    },
    // 修改评估日期
    modifyData(assessId) {
      // 获取原评估日期
      this.updateAssessDateAssessId = assessId
      this.updateAssessDateValue = null
      editAssessDate({ assessId: assessId }).then((res) => {
        if (res.code === 0) {
          this.updateAssessDate = res.data
        } else {
          this.$message.error(res.msg)
          setTimeout(() => {
            this.dialogVisible = false
          }, 1000)
        }
      })
      this.dialogVisible = true
    },
    saveData() {
      // 更新评估时间
      updateAssessDate({
        assessId: this.updateAssessDateAssessId,
        assessDate: this.updateAssessDateValue
      }).then((res) => {
        if (res.code === 0) {
          this.$message({
            type: 'success',
            message: '操作成功'
          })
          setTimeout(() => {
            this.dialogVisible = false
            this.onSubmit()
          }, 500)
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    closeData() {
      this.dialogVisible = false
      this.value1 = ''
    },
    // 评估师身份验证
    beginAssess(id, fullName) {
      this.assessId = id
      this.fullName = fullName
      getStartAssess({ assessId: id }).then(res => {
        if (res.code === 0) {
          this.stateForm = res.data
        } else {
          this.$message.error(res.msg)
        }
      })
      this.dialogVisible1 = true
    },
    closeAssesse() {
      this.dialogVisible1 = false
      this.flag = true
      this.content = '获取验证码'
      clearInterval(this.timer)
      this.timer = null
    },
    saveAssesse() {
      const data = {
        assessId: this.assessId,
        code1: this.code1,
        code2: this.code2
      }
      saveStartAssess(data).then(res => {
        if (res.code === 0) {
          this.$router.push({
            path: `/assessmentForm/details/${this.assessId}`,
            query: {
              modelType: 'edit',
              _title: `编辑${this.fullName}`
            }
          })
          this.flag = true
          this.content = '获取验证码'
          clearInterval(this.timer)
          this.timer = null
        } else {
          this.flag = true
          this.content = '获取验证码'
          clearInterval(this.timer)
          this.timer = null
          this.$message.error(res.msg)
        }
      })
    },
    toDetail(row) {
      this.$router.push({
        path: `/assessmentForm/details/${row.id}`,
        query: {
          modelType: 'look',
          _title: `查看${row.fullName}`
        }
      })
    },
    async exportFun() {
      // 导出之前先获取列表数据 如果总记录数超出限制则不继续执行
      await this.onSubmit()
      if (!canExport(this.total)) return

      const confirmTitle = '相同筛选条件，10分钟内不可重复提交，确认导出吗？'
      this.$confirm(
        confirmTitle,
        '导出评估表',
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
          exportAssessmentForm(params).then(response => {
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
    // 获取验证码
    getObtain() {
      this.setTimeout()
      getVerificationCode({ assessId: this.assessId }).then(res => {
        if (res.code == 0) {
          this.$message.success('短信验证码发送成功')
        } else {
          this.$message.error('短信验证码发送失败')
          clearInterval(this.timer)
          this.content = '获取验证码'
          this.flag = true
          this.timer = null
        }
      })
    },
    setTimeout() {
      const TIME_COUNT = 60
      this.flag = false
      if (!this.timer) {
        this.count = TIME_COUNT
        this.timer = setInterval(() => {
          if (this.count > 0 && this.count <= TIME_COUNT) {
            this.count--
            this.content = this.count + ' s后获取'
          } else {
            this.content = '获取验证码'
            this.flag = true
            clearInterval(this.timer)
            this.timer = null
          }
        }, 1000)
      }
    },
    // 编辑
    handleEdit(row) {
      this.$router.push({
        path: `/assessmentForm/details/${row.id}?`,
        query: {
          modelType: 'edit',
          _title: `编辑${row.fullName}`
        }
      })
    },
    handleClick() {
      this.form.assessTypeTab = this.activeName == '0' ? '' : this.activeName
      this.getData()
    },
    getAreaCode(val) {
      this.areaCode = val
    },
    async onSubmit() {
      this.form.pageNum = 1
      await this.getData()
    },
    onReset() {
      this.areaCode = []
      this.servicePeriod = []
      this.form = {
        areaCode: '', // 区域表单ID
        // assessEmpId: '', // 评估师
        assessStatus: '', // 评估状态
        assessType: '', // 评估类别
        assessTypeTab: this.activeName == '0' ? '' : this.activeName, // 列表类型
        orgName: '',
        endTime: '',
        startTime: '',
        keyword: '',
        pageNum: 1,
        pageSize: 10
      }
      this.idEdit = !this.idEdit
      this.getData()
    },
    async getData() {
      const params = _.cloneDeep(this.form)
      if (this.areaCode && this.areaCode.length) {
        params.areaCode = this.areaCode[this.areaCode.length - 1]
      } else {
        params.areaCode = ''
      }
      if (this.servicePeriod && this.servicePeriod.length) {
        params.startTime = setDateTime(this.servicePeriod[0])
        params.endTime = setDateTime(this.servicePeriod[1])
      }
      await getAssessmentList(params).then((res) => {
        if (res.code == 0) {
          this.tableData = res.data.list
          this.total = res.data.total
        }
      })
    },
    addTableRow() {
      this.$router.push({
        path: '/esimateApply/details/0',
        query: { modelType: 'add', _title: `新增评估申请` }
      })
    },
    getSelect() {
      const dictKey = [
        'assessment_status', // 评估状态
        'evaluation_category', // 类别
        'check_in' // 入住情况
      ].join(',')
      return new Promise((resolve, reject) => {
        allSelectdictionaryData(dictKey)
          .then((response) => {
            const dict = response.data
            for (const key in dict) {
              switch (key) {
                case 'assessment_status':
                  this.assessmentStatusOptions = dict[key]
                  break
                case 'evaluation_category':
                  this.evaluationCategoryOptions = dict[key]
                  break
              }
            }
            resolve()
          })
          .catch(() => {
            reject()
          })
      })
    },
    getOrgOption() {
      getOrgList().then((res) => {
        if (res.code === 0) {
          if (res.data.list && res.data.list.length) {
            res.data.list.forEach((item) => {
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
      var results = queryString
        ? restaurants.filter(this.createFilter(queryString))
        : restaurants
      // 调用 callback 返回建议列表的数据
      cb(results)
    },
    createFilter(queryString) {
      return (restaurant) => {
        return (
          restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0
        )
      }
    }
  }
}
</script>

<style lang="scss">
.pgbiao {
  .el-dialog__body {
    min-height: 470px;
  }
}
</style>
