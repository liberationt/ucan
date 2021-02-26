<template>
  <el-container>
    <el-main class="tableContainer plan-set">
      <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
        <el-tab-pane v-for="(item, index) in weekTab" :key="item.val" :label="item.name" :name="item.val" :disabled="item.disabled">
          <div v-if="!item.disabled">
            <el-form
              :ref="'form_base' + item.val"
              :key="'form_base' + item.val"
              :model="item['form']"
              :rules="isEditForm ? rulesForm : null"
              label-width="90px"
            >
              <el-collapse v-model="activeCollapse">
                <el-collapse-item name="baseItem_1">
                  <template slot="title">
                    <div class="titleSlider">
                      <span>
                        <i class="titleTip" />套餐项目
                      </span>
                    </div>
                  </template>
                  <el-row :gutter="20">
                    <div style="width: 96%;margin-left: 2%;">
                      <el-table
                        :data="item['form'].packageInfoList"
                        style="width: 100%"
                        class="order-table"
                        :span-method="objectSpanMethod"
                      >
                        <el-table-column prop="contactsName" label="套餐类型" min-width="150" align="center">
                          <template slot-scope="scope">
                            <span>{{ scope.row.smTypeName }}</span>
                          </template>
                        </el-table-column>
                        <el-table-column prop="contactsName" label="套餐名称" min-width="150" align="center">
                          <template slot-scope="scope">
                            <span>{{ scope.row.smName }}</span>
                          </template>
                        </el-table-column>
                        <el-table-column prop="spName" label="服务项目" min-width="150" align="center">
                          <template slot-scope="scope">
                            <div>{{ scope.row.spName }}</div>
                          </template>
                        </el-table-column>
                        <el-table-column prop="spContent" label="服务内容" min-width="150" align="center">
                          <template slot-scope="scope">
                            <div>{{ scope.row.spContent }}</div>
                          </template>
                        </el-table-column>
                        <el-table-column prop="contactsName" label="服务周期" align="center" width="480">
                          <template slot-scope="scope">
                            <el-form-item>
                              <el-checkbox-group v-model="scope.row.weeks" size="small" @change="changeBox">
                                <el-checkbox v-for="list in weeks" :key="list" :label="list" :disabled="!isEditForm || isDateDis(index, list, scope.$index, 'packageInfoList')">{{ list }}</el-checkbox>
                              </el-checkbox-group>
                            </el-form-item>
                          </template>
                        </el-table-column>
                        <el-table-column prop="orderEmpId" label="服务人员" min-width="180" align="center">
                          <template slot-scope="scope">
                            <el-form-item
                              v-if="isEditForm"
                              :ref="'packageInfoList.' + scope.$index + '.orderEmpId'"
                              :prop="'packageInfoList.' + scope.$index + '.orderEmpId'"
                              :rules="rulesForm.orderEmpId"
                            >
                              <el-select
                                v-model="scope.row.orderEmpId"
                                placeholder="请选择服务人员"
                                style="width:100%;"
                                @change="changeBox"
                                @keyup.enter.native="editContent"
                              >
                                <el-option
                                  v-for="item in mans"
                                  :key="item.id"
                                  :label="item.empNoConcatFullName"
                                  :value="item.id"
                                />
                              </el-select>
                              <div v-if="scope.row.orderEmpId === '' && scope.row.isBx === true" class="ts-red">请选择该服务人员</div>
                            </el-form-item>
                            <span v-else>{{ scope.row.empNoConcatFullName }}</span>
                          </template>
                        </el-table-column>
                        <el-table-column prop="spContent" label="服务时长（分钟）" min-width="150" align="center">
                          <template slot-scope="scope">
                            <div>{{ scope.row.timeLen }}</div>
                          </template>
                        </el-table-column>
                        <el-table-column prop="spContent" label="服务单价（元）" min-width="150" align="center">
                          <template slot-scope="scope">
                            <div>{{ scope.row.spPrice }}</div>
                          </template>
                        </el-table-column>
                        <el-table-column prop="spContent" label="每月服务（次）" min-width="150" align="center">
                          <template slot-scope="scope">
                            <div>{{ scope.row.smCount }}</div>
                          </template>
                        </el-table-column>
                        <el-table-column prop="spContent" label="总时长（周/分）" min-width="150" align="center">
                          <template slot-scope="scope">
                            <div>{{ sumTime(scope.row) }}</div>
                          </template>
                        </el-table-column>
                        <el-table-column prop="spContent" label="总次数（周/次）" min-width="150" align="center">
                          <template slot-scope="scope">
                            <div>{{ sumCi(scope.row) }}</div>
                          </template>
                        </el-table-column>
                        <el-table-column prop="spContent" label="总金额（周/元）" min-width="150" align="center">
                          <template slot-scope="scope">
                            <div>{{ sunMoney(scope.row) }}</div>
                          </template>
                        </el-table-column>
                      </el-table>
                    </div>
                  </el-row>
                </el-collapse-item>
                <el-collapse-item name="baseItem_2">
                  <template slot="title">
                    <div class="titleSlider">
                      <span>
                        <i class="titleTip" />单项项目
                      </span>
                    </div>
                  </template>
                  <el-row :gutter="20">
                    <div style="width: 96%;margin-left: 2%">
                      <el-table
                        :data="item['form'].singleItemList"
                        style="width: 100%"
                        class="order-table"
                      >
                        <el-table-column prop="contactsName" label="套餐类型" min-width="150" align="center">
                          <template slot-scope="scope">
                            <span>{{ scope.row.smTypeName }}</span>
                          </template>
                        </el-table-column>
                        <el-table-column prop="contactsName" label="服务项目" min-width="150">
                          <template slot-scope="scope">
                            <span>{{ scope.row.spName }}</span>
                          </template>
                        </el-table-column>
                        <el-table-column prop="spContent" label="服务内容" min-width="150" align="center">
                          <template slot-scope="scope">
                            <div>{{ scope.row.spContent }}</div>
                          </template>
                        </el-table-column>
                        <el-table-column prop="contactsName" label="服务周期" align="center" width="480">
                          <template slot-scope="scope">
                            <el-form-item>
                              <el-checkbox-group v-model="scope.row.weeks" size="small" @change="changeBox">
                                <el-checkbox v-for="(list, i) in weeks" :key="list" :label="list" :disabled="!isEditForm || isDateDis(index, list, scope.$index, 'singleItemList')">{{ list }}</el-checkbox>
                              </el-checkbox-group>
                            </el-form-item>
                          </template>
                        </el-table-column>
                        <el-table-column prop="orderEmpId" label="服务人员" min-width="180" align="center">
                          <template slot-scope="scope">
                            <el-form-item
                              v-if="isEditForm"
                              :ref="'singleItemList.' + scope.$index + '.orderEmpId'"
                              :prop="'singleItemList.' + scope.$index + '.orderEmpId'"
                              :rules="rulesForm.orderEmpId"
                            >
                              <el-select
                                v-model="scope.row.orderEmpId"
                                placeholder="请选择服务人员"
                                style="width:100%;"
                                @change="changeBox"
                                @keyup.enter.native="editContent"
                              >
                                <el-option
                                  v-for="item in mans"
                                  :key="item.id"
                                  :label="item.empNoConcatFullName"
                                  :value="item.id"
                                />
                              </el-select>
                              <div v-if="scope.row.orderEmpId === '' && scope.row.isBx === true && scope.row.weeks.length !== 0" class="ts-red">请选择该服务人员</div>
                            </el-form-item>
                            <span v-else>{{ scope.row.empNoConcatFullName }}</span>
                          </template>
                        </el-table-column>
                        <el-table-column prop="spContent" label="服务时长（分钟）" min-width="150" align="center">
                          <template slot-scope="scope">
                            <div>{{ scope.row.timeLen }}</div>
                          </template>
                        </el-table-column>
                        <el-table-column prop="spContent" label="服务单价（元）" min-width="150" align="center">
                          <template slot-scope="scope">
                            <div>{{ scope.row.spPrice }}</div>
                          </template>
                        </el-table-column>
                        <el-table-column prop="spContent" label="每日服务（次）" min-width="150" align="center">
                          <template slot-scope="scope">
                            <div>{{ scope.row.dayCount }}</div>
                          </template>
                        </el-table-column>
                        <el-table-column prop="spContent" label="每月服务（次）" min-width="150" align="center">
                          <template slot-scope="scope">
                            <span>{{ scope.row.monthServiceCount }}</span>
                          </template>
                        </el-table-column>
                        <el-table-column prop="spContent" label="总时长（周/分）" min-width="150" align="center">
                          <template slot-scope="scope">
                            <div>{{ sumTime(scope.row) }}</div>
                          </template>
                        </el-table-column>
                        <el-table-column prop="spContent" label="总次数（周/次）" min-width="150" align="center">
                          <template slot-scope="scope">
                            <div>{{ sumCi(scope.row) }}</div>
                          </template>
                        </el-table-column>
                        <el-table-column prop="spContent" label="总金额（周/元）" min-width="150" align="center">
                          <template slot-scope="scope">
                            <div>{{ sunMoney(scope.row) }}</div>
                          </template>
                        </el-table-column>
                      </el-table>
                    </div>
                  </el-row>
                </el-collapse-item>
              </el-collapse>
            </el-form>
          </div>
        </el-tab-pane>
      </el-tabs>
      <el-footer style="padding-left: 200px">
        <div v-if="isEditForm" class="footerBtn" style="position: relative; z-index: 88; padding-left: 200px">
          <el-button type="primary" class="base-btn btnMarginLeft15" @click="editContent('form_base')">生成工单</el-button>
          <el-button class="mr" @click="toLookOrder(true)">预览工单</el-button>
        </div>
      </el-footer>
      <div style="width: 100%;height: 300px; position: relative; top: -50px">
        <div class="date">
          <!-- 年份 月份 -->
          <div class="month">
            <div class="mouth-btn" @click="weekPre">
              <i class="el-icon-arrow-left" />
            </div>
            <div class="mouth-btn" style="left: 50px" @click="weekNext">
              <i class="el-icon-arrow-right" />
            </div>
            <p style="color: #3367D6">{{ currentYear }}年{{ currentMyMonth }}月{{ isThisMounth('begin') }}日 - {{ currentYear }}年{{ currentMyMonth }}月{{ isThisMounth('end') }}日</p>
          </div>
          <!-- 日期 -->
          <ul class="days">
            <li v-for="(day, index) in days" :key="index" @click="pick(day)">
              <div :style="{background: day.getMonth() === new Date().getMonth() ? '#ffffff' : '#f0f3f9'}">
                <div class="days-title">{{ weeks[index] }}</div>
                <!--本月-->
                <div class="days-date">
                  <!--今天-->
                  <span v-if="day.getMonth() === new Date().getMonth()">
                    {{ day.getDate() }}&nbsp;&nbsp;&nbsp;&nbsp;
                    {{ getChinaDay(day.getFullYear(), day.getMonth() + 1,day.getDate()) }}
                  </span>
                  <span v-else>
                    {{ day.getMonth() + 1 }}&nbsp;&nbsp;&nbsp;&nbsp;
                    {{ getChinaDay(day.getFullYear(), day.getMonth() + 1,day.getDate()) }}
                  </span>
                </div>
                <div v-if="dateBigList.length !== 0" class="days-content" :style="{height: heightMin * 40 + 'px',textAlign:'left',paddingLeft:'5px'}">
                  <div v-for="(list, i) in dateBigList[index].setMealServiceName" :key="i + 10">
                    <span class="tag tag-a">套餐</span>
                    <span>{{ i + 1 }}.{{ list }}</span>
                  </div>
                  <div v-for="(list, i) in dateBigList[index].singleItemServiceName" :key="i + 100">
                    <span class="tag tag-b">单项</span>
                    <span>{{ i + 1 }}.{{ list }}</span>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>
        <div style="width: 100%; height: 10px" />
        <div class="order-list">
          <div class="order-list-item">
            <p style="color: #2ac06d">套餐</p>
            <div>
              <div v-for="(item, index) in dateListItem.setMealList" :key="item.serviceName" class="order-list-item-list">
                <span>{{ index + 1 }}.{{ item.serviceName }}</span>
                <span style="color: #2ac06d">{{ item.used }}/{{ item.count }}(次/月)</span>
              </div>
            </div>
          </div>
          <div class="order-list-item">
            <p style="color: #ee9900">单项</p>
            <div>
              <div v-for="(item, index) in dateListItem.singleItemList" :key="item.serviceName" class="order-list-item-list">
                <span>{{ index + 1 }}.{{ item.serviceName }}</span>
                <span style="color: #ee9900">{{ item.used }}/{{ item.count }}(次/月)</span>
              </div>
            </div>
          </div>
        </div>
        <el-footer>
          <div class="footerBtn" style="position: relative; z-index: 88; padding-left: 200px;margin-top: 30px">
            <el-button class="mr" @click="cancelDetailsPage()">返回</el-button>
          </div>
        </el-footer>
      </div>
    </el-main>
  </el-container>
</template>

<script>
import _ from 'lodash'
import { allSelectdictionaryData } from '@/api/facilitiesConfig/pensionAgency'
import { getMealDown, getSrviceManDown, getMealDetail, getServiceItemList, orderCounts, getPlanDetail, orderLook, orderPut } from '@/api/orderManage/ips'
import { closeSelectedTag } from '@/utils/rooterJump'
import {
  validateForms
} from '@/utils/index'
export default {
  name: 'OrderDetail',
  data() {
    return {
      currentMyMonth: '',
      activeCollapse: ['baseItem_1', 'baseItem_2'],
      currentYear: 1970, // 年份
      currentMonth: 1, // 月份
      currentDay: 1, // 日期
      currentWeek: 1, // 星期
      days: [],
      weekTab: [],
      form: {
        packageInfoList: [],
        singleItemList: []
      },
      rulesForm: {
        orderEmpId: [
          { required: true, trigger: 'change', message: '服务人员不能为空！' }
        ]
      },
      isEditForm: true,
      activeName: '',
      mans: [],
      orderServiceType: [],
      meals: [],
      weeks: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
      dateList: [],
      dateListItem: {
        setMealList: [],
        singleItemList: []
      },
      dateBigList: [],
      heightMin: 0,
      formData: {},
      isYl: false,
      packageInfoList: [],
      singleItemList: [],
      dayNum: 0 // 本月天数
    }
  },
  created() {
    this.currentMyMonth = new Date().getMonth() + 1
    this.initData(null)
  },
  mounted() {
    this.modelType = this.$route.query.modelType
    if (this.modelType === 'look') {
      this.isEditForm = false
    }
    this.oldId = this.$route.query.id
    this.getNowM()
    this.weekInMonthCount()
    this.$nextTick(() => {
      this.allData()
    })
    this.orderCounts()
  },
  methods: {
    // 预览
    toLookOrder(isFlag) {
      let isReturn = true
      const arr = []
      this.days.forEach(item => {
        arr.push(item.getFullYear() + '-' + (item.getMonth() + 1) + '-' + item.getDate())
      })
      const allData = _.cloneDeep(this.weekTab)
      const packageInfoList = []
      const singleItemList = []
      allData.forEach((item, index) => {
        const date = []
        this.dateList[index].forEach(list => {
          const weekDate = {
            week: list.week,
            date: list.date,
            index: list.week === '周日' ? 7 : list.weeklist
          }
          date.push(weekDate)
        })
        allData[index].date = date
        // packageInfoList
        allData[index].form.packageInfoList.forEach((val, i) => {
          if (val.weeks.length !== 0) {
            if (val.orderEmpId === '') {
              if (isFlag === true) {
                this.weekTab[index].form.packageInfoList[i].isBx = true
              }
              isReturn = false
            }
            const packList = {}
            packList.orderEmpId = val.orderEmpId
            packList.planId = val.planId
            packList.osmId = val.osmId
            packList.spId = val.spId
            packList.osObjId = this.oldId
            val.weeks.forEach(day => {
              date.forEach(myDay => {
                if (day === myDay.week) {
                  packList['week' + myDay.index] = day
                  packList['week' + myDay.index + 'Date'] = myDay.date
                }
              })
            })
            packageInfoList.push(packList)
          }
        })
        //  singleItemList
        allData[index].form.singleItemList.forEach((val, i) => {
          if (val.weeks.length !== 0) {
            if (val.orderEmpId === '') {
              if (isFlag === true) {
                this.weekTab[index].form.singleItemList[i].isBx = true
              }
              isReturn = false
            }
            const single = {}
            single.orderEmpId = val.orderEmpId
            single.planId = val.planId
            single.spId = val.spId
            single.osObjId = this.oldId
            val.weeks.forEach(day => {
              date.forEach(myDay => {
                if (day === myDay.week) {
                  single['week' + myDay.index] = day
                  single['week' + myDay.index + 'Date'] = myDay.date
                }
              })
            })
            singleItemList.push(single)
          }
        })
      })
      const formData = {}
      formData.dates = arr
      formData.osObjId = this.oldId
      formData.packageInfoList = isFlag === true ? packageInfoList : this.packageInfoList
      formData.singleItemList = isFlag === true ? singleItemList : this.singleItemList
      formData.planId = this.planId
      if (isFlag === true) {
        if (isReturn === false) {
          this.$message.warning('服务人员为空!')
          return false
        }
      }
      orderLook(formData).then(res => {
        if (res.code === 0) {
          this.isYl = true
          this.formData = formData
          this.packageInfoList = formData.packageInfoList
          this.singleItemList = formData.singleItemList
          this.$nextTick(() => {
            this.dateBigList = res.data
            this.heightMin = 0
            const arrS = []
            this.dateBigList.forEach(item => {
              let h = 0
              h = item.setMealServiceName.length + item.singleItemServiceName.length
              arrS.push(h)
            })
            this.heightMin = Math.max(...arrS)
          })
        } else {
          this.$message.error({
            message: res.msg.indexOf('/n') !== -1 ? res.msg.split('/n').join(' <br/> ') : res.msg,
            dangerouslyUseHTMLString: true
          })
        }
      })
    },
    changeBox() {
      this.isYl = false
    },
    editContent() {
      if (this.isYl === false) {
        this.$message.warning('生成工单前请先预览工单！')
        return false
      }
      // delete this.formData.dates
      this.$confirm('派单已创建完成，确定生成工单吗？', '温馨提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        orderPut(this.formData).then(res => {
          if (res.code === 0) {
            this.$message.success('工单生成成功！')
            this.closeDetailsPage()
          } else {
            this.$message.error(res.msg)
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消！'
        })
      })
    },
    objectSpanMethod({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 0 || columnIndex === 1 || columnIndex === 12) {
        if (rowIndex % 100 === 0) {
          return {
            rowspan: 100,
            colspan: 1
          }
        } else {
          return {
            rowspan: 0,
            colspan: 0
          }
        }
      }
    },
    async allData() {
      await this.getSelect()
      await this.getSrviceManDown()
      await this.editGetData(this.oldId)
      await this.weekIndexInMonth()
      await this.orderLook()
    },
    handleClick() {},
    // 编辑获取数据
    editGetData(id) {
      return new Promise((resolve, reject) => {
        getPlanDetail(id).then(res => {
          if (res.data.packageInfoList.length !== 0) {
            this.planId = res.data.packageInfoList[0].planId
            this.form.packageInfoList = []
            const p1 = new Promise((resolve, reject) => {
              getMealDown({
                smType: res.data.packageInfoList[0].smType
              }).then(resMeal => {
                if (resMeal.code === 0) {
                  this.meals = resMeal.data
                  resolve('success')
                } else {
                  reject('error')
                }
              })
            })
            const p2 = new Promise((resolve, reject) => {
              getMealDetail(res.data.packageInfoList[0].osmId).then(resDetail => {
                if (res.code === 0) {
                  this.mealDeatilArr = resDetail.data.bizServiceOrderSetmealDetailVoList
                  resolve('success')
                } else {
                  reject('error')
                }
              })
            })
            Promise.all([p1, p2]).then((result) => {
              res.data.packageInfoList.forEach(item => {
                const rowData = {
                  smType: '',
                  osmId: '',
                  spName: '系统自动带出',
                  spContent: '系统自动带出',
                  orderEmpId: '',
                  weeks: [],
                  timeLen: '系统自动带出',
                  spPrice: '系统自动带出',
                  smCount: '系统自动带出',
                  allTime: '系统自动带出',
                  allCi: '系统自动带出',
                  allMoney: '系统自动带出',
                  isDis: false,
                  planId: '',
                  isBx: false
                }
                rowData.smTypeName = item.smTypeName
                rowData.smName = item.smName
                rowData.fullName = item.fullName
                rowData.orderEmpId = item.empJobStatus === 'resign' ? '' : item.orderEmpId
                rowData.smType = item.smType
                rowData.osmId = item.smState === '0' ? '' : item.osmId
                rowData.planId = item.planId
                if (item.week1 !== null) {
                  rowData.weeks.push(item.week1)
                }
                if (item.week2 !== null) {
                  rowData.weeks.push(item.week2)
                }
                if (item.week3 !== null) {
                  rowData.weeks.push(item.week3)
                }
                if (item.week4 !== null) {
                  rowData.weeks.push(item.week4)
                }
                if (item.week5 !== null) {
                  rowData.weeks.push(item.week5)
                }
                if (item.week6 !== null) {
                  rowData.weeks.push(item.week6)
                }
                if (item.week7 !== null) {
                  rowData.weeks.push(item.week7)
                }
                this.form.packageInfoList.push(rowData)
              })
              this.mealDeatilArr.forEach((item, index) => {
                this.form.packageInfoList[index].spName = item.spName
                this.form.packageInfoList[index].spId = item.spId
                this.form.packageInfoList[index].spContent = item.spContent
                this.form.packageInfoList[index].dayCount = item.dayCount
                this.form.packageInfoList[index].timeLen = item.timeLen
                this.form.packageInfoList[index].spPrice = item.spPrice
                this.form.packageInfoList[index].smCount = item.smCount
              })
              this.weekTab.forEach((item, index) => {
                if (item.disabled !== true) {
                  const i = index + 1
                  this.weekTab[index].form = _.cloneDeep(this.form)
                  if (parseInt(this.activeName) !== i) {
                    this.weekTab[index].form.singleItemList.forEach((list, j) => {
                      this.weekTab[index].form.singleItemList[j].weeks = []
                      this.weekTab[index].form.singleItemList[j].orderEmpId = ''
                    })
                    this.weekTab[index].form.packageInfoList.forEach((list, j) => {
                      this.weekTab[index].form.packageInfoList[j].weeks = []
                      this.weekTab[index].form.packageInfoList[j].orderEmpId = ''
                    })
                  }
                }
              })
            }).catch((error) => {
              console.log(error)
            })
          }
          if (res.data.singleItemList.length !== 0) {
            this.planId = res.data.singleItemList[0].planId
            this.form.singleItemList = []
            res.data.singleItemList.forEach(item => {
              const rowData = {
                smType: '',
                spId: '',
                spContent: '系统自动带出',
                orderEmpId: '',
                weeks: [],
                timeLen: '系统自动带出',
                spPrice: '系统自动带出',
                monthServiceCount: 1,
                dayCount: '系统自动带出',
                allTime: '系统自动带出',
                allCi: '系统自动带出',
                allMoney: '系统自动带出',
                isDis: false,
                isBx: false
              }
              rowData.smTypeName = item.serviceTypeName
              rowData.spName = item.spName
              rowData.fullName = item.fullName
              rowData.smType = item.serviceStatus === '0' ? '' : item.serviceType
              rowData.spId = item.spId
              rowData.orderEmpId = item.empJobStatus === 'resign' ? '' : item.orderEmpId
              rowData.monthServiceCount = item.monthServiceCount
              rowData.timeLen = item.timeLen
              rowData.dayCount = item.dayCount
              rowData.spPrice = item.spPrice
              rowData.spContent = item.spContent
              rowData.planId = item.planId
              if (item.week1 !== null) {
                rowData.weeks.push(item.week1)
              }
              if (item.week2 !== null) {
                rowData.weeks.push(item.week2)
              }
              if (item.week3 !== null) {
                rowData.weeks.push(item.week3)
              }
              if (item.week4 !== null) {
                rowData.weeks.push(item.week4)
              }
              if (item.week5 !== null) {
                rowData.weeks.push(item.week5)
              }
              if (item.week6 !== null) {
                rowData.weeks.push(item.week6)
              }
              if (item.week7 !== null) {
                rowData.weeks.push(item.week7)
              }
              this.form.singleItemList.push(rowData)
            })
            this.form.singleItemList.forEach((item, index) => {
              getServiceItemList({
                serviceType: item.smType,
                spName: ''
              }).then(res => {
                if (res.code === 0) {
                  const id = this.form.singleItemList[index].spId
                  this.form.singleItemList[index].spId = ''
                  this.form.singleItemList[index].orderServiceType = res.data
                  this.form.singleItemList[index].spId = id
                  // this.form.bizServiceOrderSetmealDetailVoList[index].spMoney = item.spPrice * item.smCount
                  // this.form.bizServiceOrderSetmealDetailVoList[index].spContent = 1
                  // this.form.bizServiceOrderSetmealDetailVoList[index].isDis = false
                  // this.form.bizServiceOrderSetmealDetailVoList[index].spId = ''
                  // this.form.bizServiceOrderSetmealDetailVoList[index].spName = ''
                  // this.form.bizServiceOrderSetmealDetailVoList[index].spContent = '系统自动带出'
                  // this.form.bizServiceOrderSetmealDetailVoList[index].spPrice = '系统自动带出'
                  // this.form.bizServiceOrderSetmealDetailVoList[index].timeLen = '系统自动带出'
                }
              })
            })
            const p3 = new Promise((resolve, reject) => {
              setTimeout(() => {
                if (res.data.packageInfoList.length === 0) {
                  this.weekTab.forEach((item, index) => {
                    if (item.disabled !== true) {
                      const i = index + 1
                      this.weekTab[index].form = _.cloneDeep(this.form)
                      if (parseInt(this.activeName) !== i) {
                        console.log(parseInt(this.activeName))
                        this.weekTab[index].form.singleItemList.forEach((list, j) => {
                          this.weekTab[index].form.singleItemList[j].weeks = []
                          this.weekTab[index].form.singleItemList[j].orderEmpId = ''
                        })
                      }
                    }
                  })
                  resolve()
                } else {
                  reject()
                }
              })
            })
            Promise.all([p3]).then((result) => {
            }).catch((error) => {
              console.log(error)
            })
          }
          resolve()
        })
      })
    },
    getSelect() {
      const dictKey = [
        'order_set_meal_type'
      ].join(',')
      return new Promise((resolve, reject) => {
        allSelectdictionaryData(dictKey).then(response => {
          const dict = response.data
          for (const key in dict) {
            switch (key) {
              case 'order_set_meal_type':
                this.orderServiceType = dict[key]
                break
            }
          }
          resolve()
        }).catch(() => {
          reject()
        })
      })
    },
    getSrviceManDown() {
      return new Promise((resolve, reject) => {
        getSrviceManDown().then(res => {
          if (res.code === 0) {
            this.mans = res.data
          }
          resolve()
        }).catch(() => {
          reject()
        })
      })
    },
    sumTime(row) {
      if (row.timeLen !== '系统自动带出' && row.timeLen) {
        row.allTime = row.timeLen * row.dayCount * row.weeks.length
      } else {
        row.allTime = '系统自动带出'
      }
      return row.allTime
    },
    sumCi(row) {
      if (row.dayCount && row.dayCount !== '系统自动带出') {
        row.allCi = row.dayCount * row.weeks.length
      } else {
        row.allCi = '系统自动带出'
      }
      return row.allCi
    },
    sunMoney(row) {
      if (row.dayCount && row.dayCount !== '系统自动带出') {
        row.allMoney = row.dayCount * row.weeks.length * row.spPrice
      } else {
        row.allMoney = '系统自动带出'
      }
      return row.allMoney
    },
    // 本周第几周’
    weekIndexInMonth() {
      return new Promise((resolve) => {
        // 设置时间为本月的1号
        var date = new Date((new Date(this).setDate(1)) || (new Date()).setDate(1))
        // 获取今天的日期
        var today = new Date()
        var d = today.getDate()
        var firstWeekDate
        if (date.getDay() === 0) { // 判断1号是周日
          firstWeekDate = 6
        } else { // 判断1号是周一至周六之间
          firstWeekDate = date.getDay() - 1
        }
        this.activeName = Math.ceil((d + firstWeekDate) / 7) + ''
        this.weekTab.forEach((item, index) => {
          if (parseInt(item.val) < Math.ceil((d + firstWeekDate) / 7) + '') {
            this.weekTab[index].disabled = true
          }
        })
        resolve()
      })
    },
    // 本月有几周
    weekInMonthCount() {
      // 设置时间为本月的1号
      var date = new Date((new Date(this).setDate(1)) || (new Date()).setDate(1))
      // var date = new Date("2021-02-08");
      var firstWeekDate
      if (date.getDay() === 0) { // 判断1号是周日
        firstWeekDate = 6
      } else { // 判断1号是周一至周六之间
        firstWeekDate = date.getDay() - 1
      }
      date.setMonth(date.getMonth() + 1)
      date.setDate(0)
      //  date.getDate();// 本月天数
      var monthHasDays = date.getDate() + firstWeekDate
      for (let i = 0; i < Math.ceil(monthHasDays / 7); i++) {
        const data = {
          name: '',
          val: '',
          disabled: false,
          form: {
            packageInfoList: [],
            singleItemList: []
          },
          date: []
        }
        data.val = i + 1 + ''
        if (i === 0) {
          data.name = '第一周'
          this.weekTab.push(data)
        } else if (i === 1) {
          data.name = '第二周'
          this.weekTab.push(data)
        } else if (i === 2) {
          data.name = '第三周'
          this.weekTab.push(data)
        } else if (i === 3) {
          data.name = '第四周'
          this.weekTab.push(data)
        } else if (i === 4) {
          data.name = '第五周'
          this.weekTab.push(data)
        } else if (i === 5) {
          data.name = '第六周'
          this.weekTab.push(data)
        }
      }
    },
    // ///////////////////////////////////////////////////////////////////////////////// 日历组件
    getChinaDay(yy, mm, day) {
      return this.getLunarDay(yy, mm, day)
    },
    formatDate(year, month, day) {
      const y = year
      let m = month
      if (m < 10) m = `0${m}`
      let d = day
      if (d < 10) d = `0${d}`
      return `${y}-${m}-${d}`
    },
    initData(cur) {
      let date = ''
      if (cur) {
        date = new Date(cur)
      } else {
        date = new Date()
      }
      this.currentDay = date.getDate() // 今日日期 几号
      this.currentYear = date.getFullYear() // 当前年份
      this.currentMonth = date.getMonth() + 1 // 当前月份
      this.currentWeek = date.getDay() // 1...6,0   // 星期几
      if (this.currentWeek === 0) {
        this.currentWeek = 7
      }
      const str = this.formatDate(this.currentYear, this.currentMonth, this.currentDay)// 今日日期 年-月-日
      this.days.length = 0
      // 今天是周日，放在第一行第7个位置，前面6个 这里默认显示一周，如果需要显示一个月，则第二个循环为 i<= 35- this.currentWeek
      /* eslint-disabled */
      for (let i = this.currentWeek - 1; i >= 0; i -= 1) {
        const d = new Date(str)
        d.setDate(d.getDate() - i)
        // console.log(y:" + d.getDate())
        this.days.push(d)
      }
      for (let i = 1; i <= 7 - this.currentWeek; i += 1) {
        const d = new Date(str)
        d.setDate(d.getDate() + i)
        this.days.push(d)
      }
    },
    //  上个星期
    weekPre() {
      if (this.days[0].getDate() === 1) {
        return false
      } else {
        if (this.days[0].getMonth() !== new Date().getMonth()) {
          return false
        }
      }
      const d = this.days[0] // 如果当期日期是7号或者小于7号
      d.setDate(d.getDate() - 7)
      this.initData(d)
      this.toLookOrder()
    },
    //  下个星期
    weekNext() {
      if (this.days[6].getDate() === this.dayNum) {
        return false
      } else {
        if (this.days[6].getMonth() !== new Date().getMonth()) {
          return false
        }
      }
      const d = this.days[6] // 如果当期日期是7号或者小于7号
      d.setDate(d.getDate() + 7)
      this.initData(d)
      this.toLookOrder()
    },
    // 上一個月   传入当前年份和月份
    pickPre(year, month) {
      const d = new Date(this.formatDate(year, month, 1))
      d.setDate(0)
      this.initData(this.formatDate(d.getFullYear(), d.getMonth() + 1, 1))
    },
    // 下一個月   传入当前年份和月份
    pickNext(year, month) {
      const d = new Date(this.formatDate(year, month, 1))
      d.setDate(35)
      this.initData(this.formatDate(d.getFullYear(), d.getMonth() + 1, 1))
    },
    // 当前选择日期
    pick(date) {
      // alert(this.formatDate(date.getFullYear(), date.getMonth() + 1, date.getDate()))
    },
    getLunarDay(solarYear, solarMonth, solarDay) { // 拷贝别人又自己调整过的获取农历日期的代码，想要原来的代码估计百度一下就有了
      const madd = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334]
      // const tgString = '甲乙丙丁戊己庚辛壬癸'
      // const dzString = '子丑寅卯辰巳午未申酉戌亥'
      const numString = '一二三四五六七八九十'
      const monString = '正二三四五六七八九十冬腊'
      const CalendarData = [0xA4B, 0x5164B, 0x6A5, 0x6D4, 0x415B5, 0x2B6, 0x957, 0x2092F, 0x497, 0x60C96, 0xD4A, 0xEA5, 0x50DA9, 0x5AD, 0x2B6, 0x3126E, 0x92E, 0x7192D, 0xC95, 0xD4A, 0x61B4A, 0xB55, 0x56A, 0x4155B, 0x25D, 0x92D, 0x2192B, 0xA95, 0x71695, 0x6CA, 0xB55, 0x50AB5, 0x4DA, 0xA5B, 0x30A57, 0x52B, 0x8152A, 0xE95, 0x6AA, 0x615AA, 0xAB5, 0x4B6, 0x414AE, 0xA57, 0x526, 0x31D26, 0xD95, 0x70B55, 0x56A, 0x96D, 0x5095D, 0x4AD, 0xA4D, 0x41A4D, 0xD25, 0x81AA5, 0xB54, 0xB6A, 0x612DA, 0x95B, 0x49B, 0x41497, 0xA4B, 0xA164B, 0x6A5, 0x6D4, 0x615B4, 0xAB6, 0x957, 0x5092F, 0x497, 0x64B, 0x30D4A, 0xEA5, 0x80D65, 0x5AC, 0xAB6, 0x5126D, 0x92E, 0xC96, 0x41A95, 0xD4A, 0xDA5, 0x20B55, 0x56A, 0x7155B, 0x25D, 0x92D, 0x5192B, 0xA95, 0xB4A, 0x416AA, 0xAD5, 0x90AB5, 0x4BA, 0xA5B, 0x60A57, 0x52B, 0xA93, 0x40E95]
      if (!(solarYear < 1921 || solarYear > 2999)) { // 注意看此处限定了年份，设置自己需要的范围即可
        solarMonth = (parseInt(solarMonth) > 0) ? (solarMonth - 1) : 11
        const timeArr = [solarYear, solarMonth, solarDay]
        const TheDate = (timeArr.length !== 3) ? new Date() : new Date(timeArr[0], timeArr[1], timeArr[2])
        let total, m, n, k
        let isEnd = false
        const theDateYear = TheDate.getFullYear()
        total = (theDateYear - 1921) * 365 + Math.floor((theDateYear - 1921) / 4) + madd[TheDate.getMonth()] + TheDate.getDate() - 38
        if (theDateYear % 4 === 0 && TheDate.getMonth() > 1) {
          total++
        }
        for (m = 0; ; m++) {
          k = (CalendarData[m] < 0xfff) ? 11 : 12
          for (n = k; n >= 0; n--) {
            if (total <= this.getBit(CalendarData[m], n)) {
              isEnd = true
              break
            }
            total = total - this.getBit(CalendarData[m], n)
          }
          if (isEnd) {
            break
          }
        }
        let cMonth, cDay // cYear,
        // cYear = 1921 + m
        cMonth = k - n + 1
        cDay = total
        if (k === 12) {
          if (cMonth === Math.floor(CalendarData[m] / 0x10000) + 1) {
            cMonth = 1 - cMonth
          }
          if (cMonth > Math.floor(CalendarData[m] / 0x10000) + 1) {
            cMonth--
          }
        }
        // let run = ''
        let cDayStr = numString.charAt(cDay - 1)
        /* if (cMonth < 1) {
          run = '(闰)'
        } */
        if (cDay % 10 !== 0 || cDay === 10) {
          cDayStr = numString.charAt((cDay - 1) % 10)
        }
        return cDay === 1 ? monString.charAt(cMonth - 1) + '月' : (cDay < 11 ? '初' : (cDay < 20 ? '十' : (cDay < 30 ? '廿' : '三十'))) + cDayStr // tgString.charAt((cYear - 4) % 10) + dzString.charAt((cYear - 4) % 12) + '年 ' + run + monString.charAt(cMonth - 1) + '月' +
      }
    },
    getBit(m, n) { // 也是拷贝的，不是很明白这段代码干嘛的，不过很明显是处理二进制数据的
      return 29 + ((m >> n) & 1)
    },
    // 获取当前月的天数
    mGetDate() {
      var date = new Date()
      var year = date.getFullYear()
      var month = date.getMonth() + 1
      var d = new Date(year, month, 0)
      return d.getDate()
    },
    // 格式化日期
    formatDateT(date) {
      date = new Date(date)
      const myyear = date.getFullYear()
      let mymonth = date.getMonth() + 1
      let myweekday = date.getDate()
      mymonth < 10 ? mymonth = '0' + mymonth : mymonth
      myweekday < 10 ? myweekday = '0' + myweekday : myweekday
      return `${myyear}-${mymonth}-${myweekday}`
    },
    // 获取当前月的所有日期
    getNowM(e) {
      const now = new Date()
      const current_month_num = this.mGetDate()
      const current_month = []
      const weekday = ['周日', '周一', '周二', '周三', '周四', '周五', '周六']
      for (let i = 1; i <= current_month_num; i++) {
        const day = now.setDate(i)
        const everyDay = this.formatDateT(day)
        const data = {
          date: '',
          week: '',
          weeklist: '',
          weekNum: ''
        }
        data.date = everyDay
        data.week = weekday[new Date(day).getDay()]
        data.weekNum = this.getWhichWeek(everyDay) + ''
        data.weeklist = new Date(day).getDay()
        current_month.push(data)
      }
      var date = new Date((new Date(this).setDate(1)) || (new Date()).setDate(1))
      // var date = new Date("2021-02-08");
      var firstWeekDate
      if (date.getDay() === 0) { // 判断1号是周日
        firstWeekDate = 6
      } else { // 判断1号是周一至周六之间
        firstWeekDate = date.getDay() - 1
      }
      date.setMonth(date.getMonth() + 1)
      date.setDate(0)
      //  date.getDate();// 本月天数
      var monthHasDays = date.getDate() + firstWeekDate
      this.dayNum = date.getDate()
      const newArr = []
      for (let i = 0; i < Math.ceil(monthHasDays / 7); i++) {
        const arr = []
        newArr.push(arr)
      }
      current_month.forEach(item => {
        for (let i = 0; i < newArr.length; i++) {
          const num = parseInt(item.weekNum) - 1
          if (i === num) {
            newArr[i].push(item)
          }
        }
      })
      this.dateList = newArr
    },
    // 确定当周是第几周
    getWhichWeek(dates) {
      var date = new Date((new Date(this).setDate(1)) || (new Date()).setDate(1))
      // 获取今天的日期
      var today = new Date(dates)
      var d = today.getDate()
      var firstWeekDate
      if (date.getDay() === 0) { // 判断1号是周日
        firstWeekDate = 6
      } else { // 判断1号是周一至周六之间
        firstWeekDate = date.getDay() - 1
      }
      return Math.ceil((d + firstWeekDate) / 7)
    },
    // 周期是否disabled
    isDateDis(i, list, weeksIndex, type) {
      let isIn = false
      let index = 0
      this.dateList[i].forEach((item, j) => {
        if (item.week === list) {
          index = j
          isIn = true
        }
      })
      if (isIn === true) {
        if (new Date(this.dateList[i][index].date).getTime() < (new Date().getTime() - 24 * 60 * 60 * 1000)) {
          if (this.weekTab[i].form[type][weeksIndex] !== undefined) {
            this.weekTab[i].form[type][weeksIndex].weeks.forEach((item, j) => {
              if (item === this.dateList[i][index].week) {
                this.weekTab[i].form[type][weeksIndex].weeks.splice(j, 1)
              }
            })
          }
          return true
        }
      } else {
        if (this.weekTab[i].form[type][weeksIndex] !== undefined) {
          this.weekTab[i].form[type][weeksIndex].weeks.forEach((item, j) => {
            if (item === list) {
              this.weekTab[i].form[type][weeksIndex].weeks.splice(j, 1)
            }
          })
        }
        return true
      }
    },
    // 判断是否是本月
    isThisMounth(type) {
      const arr = _.cloneDeep(this.days)
      const newArr = []
      arr.forEach(item => {
        if ((item.getMonth() + 1) === this.currentMyMonth) {
          newArr.push(item)
        }
      })
      if (type === 'begin') {
        return newArr[0].getDate()
      } else {
        return newArr[newArr.length - 1].getDate()
      }
    },
    // 获取底下LIST
    orderCounts() {
      orderCounts(this.oldId).then(res => {
        if (res.code === 0) {
          this.dateListItem = res.data
        }
      })
    },
    orderLook() {
      return new Promise((resolve, reject) => {
        const arr = []
        this.days.forEach(item => {
          arr.push(item.getFullYear() + '-' + (item.getMonth() + 1) + '-' + item.getDate())
        })
        orderLook({
          dates: arr,
          osObjId: this.oldId,
          planId: this.planId,
          packageInfoList: [],
          singleItemList: []
        }).then(res => {
          if (res.code === 0) {
            // this.dateBigList = res.data
            this.$nextTick(() => {
              this.dateBigList = res.data
              this.heightMin = 0
              const arrS = []
              this.dateBigList.forEach(item => {
                let h = 0
                h = item.setMealServiceName.length + item.singleItemServiceName.length
                arrS.push(h)
              })
              this.heightMin = Math.max(...arrS)
            })
          }
        })
      })
    },
    // 取消关闭
    cancelDetailsPage() {
      this.$confirm('该页面的信息尚未保存，确定要关闭页面吗', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        closeOnClickModal: false
      }).then(() => {
        this.closeDetailsPage()
      }).catch(() => {
      })
    },
    closeDetailsPage() {
      closeSelectedTag(this, this.$route)
      this.$router.push({ path: '/serverManagement/orderManagement/orderWork' })
    }
  }
}
</script>

<style lang="scss">
  .tableContainer {
    margin-top: 20px;
  }
  .date {
    min-height: 180px;
    color: #333;
    .month {
      font-size: 22px;
      text-align: center;
      margin-top: 20px;
      position: relative;
      .mouth-btn {
        position: absolute;
        left: 0;
        top: 0;
        background: #a8a9a9;
        color: #666666;
        font-size: 16px;
        padding: 5px 10px;
        cursor: pointer;
      }
    }
    .weekdays {
      display: flex;
      font-size: 16px;
      margin-top: 20px;
      li {
        flex: 1;
        text-align: center;
        list-style-type:none;
      }
    }

    .days {
      display: flex;
      padding-left: 0;
      li {
        flex: 1;
        list-style-type:none;
        font-size: 14px;
        text-align: center;
        margin-top: 10px;
        line-height:  35px;
        .days-title {
          border: 1px solid #999999;
          border-right: 0;
        }
        .days-date {
          border: 1px solid #999999;
          border-right: 0;
          border-top: 0;
        }
        .days-content {
          border: 1px solid #999999;
          border-right: 0;
          border-top: 0;
          .tag {
            font-size: 12px;
            padding: 1px 5px;
            border-radius: 3px;
            margin-right: 10px;
          }
          .tag-a {
            color: #2ac06d;
            border: 1px solid #2ac06d;
          }
          .tag-b {
            color: #ee9900;
            border: 1px solid #ee9900;
          }
        }
        .active {
          display: inline-block;
          width: 60px;
          height: 60px;
          color: #fff;
          border-radius: 50%;
          background-color: #fa6854;
        }
        .other-month {
          color: #e4393c;
        }
      }
      li:last-of-type {
        .days-title {
          border-right: 1px solid #999999;
        }
        .days-date {
          border-right: 1px solid #999999;
        }
        .days-content {
          border-right: 1px solid #999999;
        }
      }
    }
  }
  .plan-set {
    .order-list {
      width: 100%;
      .order-list-item {
        width: 50%;
        float: left;
        .order-list-item-list {
          width: 50%;
          float: left;
          margin-bottom: 10px;
          span {
            display: inline-block;
            width: 48%;
          }
        }
      }
    }
    .el-form-item {
      margin-bottom: 0;
    }
    .el-form-item__content {
      margin-left: 0 !important;
    }
    .el-collapse-item__wrap {
      border-bottom: 0;
    }
    .el-collapse {
      border-bottom: 0;
    }
    .el-collapse-item__header {
      border-bottom: 0;
    }
    .el-table .cell {
      overflow: visible;
    }
    .el-table--enable-row-hover .el-table__body tr:hover>td {
      background-color: #ffffff;
    }
    .el-checkbox {
      margin-right: 10px;
    }
    .ts-red {position: absolute;top: 24px; font-size: 12px;width: 200px;text-align: left;color: #ff0000}
  }
</style>
