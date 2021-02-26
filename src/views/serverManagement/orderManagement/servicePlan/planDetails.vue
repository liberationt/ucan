<template>
  <el-container>
    <el-main class="tableContainer plan-set">
      <el-form
        ref="form_base"
        key="form_base"
        :model="form"
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
            <el-row v-if="isEditForm" :gutter="20">
              <div style="margin-bottom: 15px">
                <el-button type="primary" class="base-btn btnMarginLeft15" @click="addMeal">添加</el-button>
              </div>
            </el-row>
            <el-row :gutter="20">
              <div style="width: 96%;margin-left: 2%;">
                <el-table
                  :data="form.packageInfoList"
                  style="width: 100%"
                  class="order-table"
                  :span-method="objectSpanMethod"
                >
                  <el-table-column prop="contactsName" label="套餐类型" min-width="150" align="center">
                    <template slot-scope="scope">
                      <el-form-item
                        v-if="isEditForm"
                        :ref="'packageInfoList.' + scope.$index + '.smType'"
                        :prop="'packageInfoList.' + scope.$index + '.smType'"
                        :rules="rulesForm.smType"
                      >
                        <el-select
                          v-model="scope.row.smType"
                          placeholder="请选择服务类型"
                          style="width:100%;"
                          @change="changeType(scope.$index, scope.row)"
                          @keyup.enter.native="editContent"
                        >
                          <el-option
                            v-for="item in orderServiceType"
                            :key="item.dictValue"
                            :label="item.dictLabel"
                            :value="item.dictValue"
                          />
                        </el-select>
                      </el-form-item>
                      <span v-else>{{ scope.row.smTypeName }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column prop="contactsName" label="套餐名称" min-width="180" align="center">
                    <template slot-scope="scope">
                      <el-form-item
                        v-if="isEditForm"
                        :ref="'packageInfoList.' + scope.$index + '.osmId'"
                        :prop="'packageInfoList.' + scope.$index + '.osmId'"
                        :rules="rulesForm.osmId"
                      >
                        <el-select
                          v-model="scope.row.osmId"
                          placeholder="请选择套餐"
                          style="width:100%;"
                          :disabled="scope.row.isDis"
                          @change="changeMeal"
                          @keyup.enter.native="editContent"
                        >
                          <el-option
                            v-for="item in meals"
                            :key="item.id"
                            :label="item.smName"
                            :value="item.id"
                          />
                        </el-select>
                      </el-form-item>
                      <span v-else>{{ scope.row.smName }}</span>
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
                  <el-table-column prop="contactsName" label="服务周期" align="center" width="600">
                    <template slot-scope="scope">
                      <el-form-item>
                        <el-checkbox-group v-model="scope.row.weeks" size="small">
                          <el-checkbox v-for="item in weeks" :key="item" :label="item" :disabled="!isEditForm">{{ item }}</el-checkbox>
                        </el-checkbox-group>
                      </el-form-item>
                    </template>
                  </el-table-column>
                  <el-table-column prop="contactsName" label="服务人员" min-width="180" align="center">
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
                          @keyup.enter.native="editContent"
                        >
                          <el-option
                            v-for="item in mans"
                            :key="item.id"
                            :label="item.empNoConcatFullName"
                            :value="item.id"
                          />
                        </el-select>
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
                  <el-table-column v-if="isEditForm" prop="spContent" label="操作" min-width="150" align="center">
                    <template slot-scope="scope">
                      <span style="color: #3367D6;cursor: pointer" @click="delMeal(scope)">删除</span>
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
            <el-row v-if="isEditForm" :gutter="20">
              <div style="margin-bottom: 15px">
                <el-button type="primary" class="base-btn btnMarginLeft15" @click="addItem">添加</el-button>
              </div>
            </el-row>
            <el-row :gutter="20">
              <div style="width: 96%;margin-left: 2%">
                <el-table
                  :data="form.singleItemList"
                  style="width: 100%"
                  class="order-table"
                >
                  <el-table-column prop="contactsName" label="服务类型" min-width="150" align="center">
                    <template slot-scope="scope">
                      <el-form-item
                        v-if="isEditForm"
                        :ref="'singleItemList.' + scope.$index + '.smType'"
                        :prop="'singleItemList.' + scope.$index + '.smType'"
                        :rules="rulesForm.smType"
                      >
                        <el-select
                          v-model="scope.row.smType"
                          placeholder="请选择服务类型"
                          style="width:100%;"
                          @change="changeItemType(scope.$index, scope.row)"
                          @keyup.enter.native="editContent"
                        >
                          <el-option
                            v-for="item in orderServiceType"
                            :key="item.dictValue"
                            :label="item.dictLabel"
                            :value="item.dictValue"
                          />
                        </el-select>
                      </el-form-item>
                      <span v-else>{{ scope.row.smTypeName }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column prop="contactsName" label="服务项目" min-width="180">
                    <template slot-scope="scope">
                      <el-form-item
                        v-if="isEditForm"
                        :ref="'singleItemList.' + scope.$index + '.spId'"
                        :prop="'singleItemList.' + scope.$index + '.spId'"
                        :rules="rulesForm.spId"
                      >
                        <el-select
                          v-model="scope.row.spId"
                          placeholder="请选择服务项目"
                          style="width:100%;"
                          :disabled="scope.row.isDis"
                          @change="changeItem(scope.$index)"
                          @keyup.enter.native="editContent"
                        >
                          <el-option
                            v-for="item in scope.row.orderServiceType"
                            :key="item.id"
                            :label="item.spName"
                            :value="item.id"
                          />
                        </el-select>
                      </el-form-item>
                      <span v-else>{{ scope.row.spName }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column prop="spContent" label="服务内容" min-width="150" align="center">
                    <template slot-scope="scope">
                      <div>{{ scope.row.spContent }}</div>
                    </template>
                  </el-table-column>
                  <el-table-column prop="contactsName" label="服务周期" align="center" width="600">
                    <template slot-scope="scope">
                      <el-form-item>
                        <el-checkbox-group v-model="scope.row.weeks" size="small">
                          <el-checkbox v-for="item in weeks" :key="item" :label="item" :disabled="!isEditForm">{{ item }}</el-checkbox>
                        </el-checkbox-group>
                      </el-form-item>
                    </template>
                  </el-table-column>
                  <el-table-column prop="contactsName" label="服务人员" min-width="180" align="center">
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
                          @keyup.enter.native="editContent"
                        >
                          <el-option
                            v-for="item in mans"
                            :key="item.id"
                            :label="item.empNoConcatFullName"
                            :value="item.id"
                          />
                        </el-select>
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
                  <el-table-column prop="spContent" label="每月服务（次）" width="250" align="center">
                    <template slot-scope="scope">
                      <el-form-item
                        v-if="isEditForm"
                        :ref="'singleItemList.' + scope.$index + '.monthServiceCount'"
                        :prop="'singleItemList.' + scope.$index + '.monthServiceCount'"
                        :rules="rulesForm.monthServiceCount"
                      >
                        <el-input-number v-model="scope.row.monthServiceCount" :min="1" :max="1000" label="请输入每月服务次数" />
                      </el-form-item>
                      <span v-else>{{ scope.row.monthServiceCount }}</span>
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
                  <el-table-column v-if="isEditForm" prop="spContent" label="操作" min-width="150" align="center">
                    <template slot-scope="scope">
                      <span style="color: #3367D6;cursor: pointer" @click="delItem(scope)">删除</span>
                    </template>
                  </el-table-column>
                </el-table>
              </div>
            </el-row>
          </el-collapse-item>
        </el-collapse>
      </el-form>
      <el-footer>
        <div v-if="isEditForm" class="footerBtn">
          <el-button type="primary" class="base-btn btnMarginLeft15" @click="editContent('form_base')">保存</el-button>
          <el-button class="mr" @click="cancelDetailsPage">取消</el-button>
        </div>
        <!--      <div v-if="modelType=='look' && isEditForm === false" class="footerBtn">-->
        <!--        <el-button type="primary" class="base-btn btnMarginLeft15" @click="toEdit">编辑</el-button>-->
        <!--        <el-button @click="returnGo">返回</el-button>-->
        <!--      </div>-->
      </el-footer>
    </el-main>
  </el-container>
</template>

<script>
import { allSelectdictionaryData } from '@/api/facilitiesConfig/pensionAgency'
import { getMealDown, getSrviceManDown, getMealDetail, getServiceItemList, addPlan, getPlanDetail, editPlan } from '@/api/orderManage/ips'
import { closeSelectedTag } from '@/utils/rooterJump'
export default {
  name: 'PlanDetails',
  data() {
    return {
      orderServiceType: [],
      meals: [],
      mans: [],
      isEditForm: true,
      weeks: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
      form: {
        packageInfoList: [{
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
          isDis: true
        }],
        singleItemList: [
          {
            smType: '',
            spId: '',
            spContent: '系统自动带出',
            orderEmpId: '',
            weeks: [],
            dayCount: '系统自动带出',
            timeLen: '系统自动带出',
            spPrice: '系统自动带出',
            monthServiceCount: 1,
            allTime: '系统自动带出',
            allCi: '系统自动带出',
            allMoney: '系统自动带出',
            orderServiceType: [],
            isDis: true
          }
        ]
      },
      rulesForm: {
        smType: [
          { required: true, trigger: 'change', message: '服务类型不能为空！' }
        ],
        osmId: [
          { required: true, trigger: 'change', message: '套餐名称不能为空！' }
        ],
        orderEmpId: [
          { required: true, trigger: 'change', message: '服务人员不能为空！' }
        ],
        spId: [
          { required: true, trigger: 'change', message: '服务项目不能为空！' }
        ],
        monthServiceCount: [
          { required: true, trigger: 'blur', message: '每月次数不能为空！' }
        ]
      },
      activeCollapse: ['baseItem_1', 'baseItem_2'],
      oldId: '',
      type: '',
      planId: '',
      mealDeatilArr: [],
      person: {}
    }
  },
  mounted() {
    this.modelType = this.$route.query.modelType
    this.oldId = this.$route.query.id
    if (this.modelType === 'look') {
      // 查看时，不要调用户信息接口，直接将表格行数据带来现实
      this.isEditForm = false
      this.allData()
    } else {
      this.allData()
    }
  },
  methods: {
    async allData() {
      await this.getSelect()
      await this.getSrviceManDown()
      await this.editGetData(this.oldId)
    },
    editGetData(id) {
      return new Promise((resolve, reject) => {
        getPlanDetail(id).then(res => {
          if (res.data.packageInfoList.length === 0 && res.data.singleItemList.length === 0) {
            this.type = 'add'
          } else {
            this.type = 'edit'
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
                    planId: ''
                  }
                  if (this.modelType === 'look') {
                    rowData.smTypeName = item.smTypeName
                    rowData.smName = item.smName
                    rowData.fullName = item.fullName
                  }
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
              }).catch((error) => {
                console.log(error)
              })
            } else {
              this.form.packageInfoList = []
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
                  isDis: false
                }
                if (this.modelType === 'look') {
                  rowData.smTypeName = item.serviceTypeName
                  rowData.spName = item.spName
                  rowData.fullName = item.fullName
                }
                rowData.smType = item.serviceType
                rowData.serviceStatus = item.serviceStatus
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
                }).then(response => {
                  if (response.code === 0) {
                    const id = this.form.singleItemList[index].spId
                    this.form.singleItemList[index].spId = ''
                    this.form.singleItemList[index].orderServiceType = response.data
                    if (response.data.length !== 0) {
                      this.form.singleItemList[index].spId = item.serviceStatus === '0' ? '' : id
                    }
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
            } else {
              this.form.singleItemList = []
            }
          }
        })
      })
    },
    addMeal() {
      if (this.form.packageInfoList.length !== 0) {
        this.$message.warning('只能新增一条套餐！')
        return false
      }
      if (this.type === 'edit') {
        const rowData = {
          smType: '',
          osmId: '',
          planId: this.planId,
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
          isDis: true
        }
        this.form.packageInfoList.push(rowData)
      } else {
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
          isDis: true
        }
        this.form.packageInfoList.push(rowData)
      }
    },
    delMeal(row) {
      this.$confirm('确定要删除该套餐吗？', '删除项目', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.form.packageInfoList = []
      }).catch(() => {
        this.$message.error('操作失败！')
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除！'
        })
      })
    },
    delItem(row) {
      this.$confirm('确定要删除该项目吗？', '删除项目', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.form.singleItemList.splice(row.$index, 1)
      }).catch(() => {
        this.$message.error('操作失败！')
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除！'
        })
      })
    },
    addItem() {
      if (this.type === 'edit') {
        const rowData = {
          smType: '',
          spId: '',
          spContent: '系统自动带出',
          planId: this.planId,
          orderEmpId: '',
          weeks: [],
          timeLen: '系统自动带出',
          spPrice: '系统自动带出',
          monthServiceCount: 1,
          dayCount: '系统自动带出',
          allTime: '系统自动带出',
          allCi: '系统自动带出',
          allMoney: '系统自动带出',
          isDis: true
        }
        this.form.singleItemList.push(rowData)
      } else {
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
          isDis: true
        }
        this.form.singleItemList.push(rowData)
      }
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
    editContent(formName) {
      if (this.form.packageInfoList.length === 0 && this.form.singleItemList.length === 0) {
        this.$message.warning('至少有一个套餐或者一个单项才能保存！')
        return false
      }
      this.$refs[formName].validate((valid, object) => {
        if (valid) {
          const params = this.form
          params.packageInfoList.forEach((item, index) => {
            delete params.packageInfoList[index].allCi
            delete params.packageInfoList[index].allMoney
            delete params.packageInfoList[index].allTime
            delete params.packageInfoList[index].dayCount
            delete params.packageInfoList[index].isDis
            delete params.packageInfoList[index].smCount
            delete params.packageInfoList[index].smType
            delete params.packageInfoList[index].spContent
            delete params.packageInfoList[index].spName
            delete params.packageInfoList[index].spPrice
            delete params.packageInfoList[index].timeLen
            if (params.packageInfoList[index].weeks.length !== 0) {
              params.packageInfoList[index].weeks.forEach(item => {
                if (item === '周一') {
                  params.packageInfoList[index].week1 = item
                } else if (item === '周二') {
                  params.packageInfoList[index].week2 = item
                } else if (item === '周三') {
                  params.packageInfoList[index].week3 = item
                } else if (item === '周四') {
                  params.packageInfoList[index].week4 = item
                } else if (item === '周五') {
                  params.packageInfoList[index].week5 = item
                } else if (item === '周六') {
                  params.packageInfoList[index].week6 = item
                } else if (item === '周日') {
                  params.packageInfoList[index].week7 = item
                }
              })
            }
            params.packageInfoList[index].osObjId = this.oldId
            params.packageInfoList[index].planId = this.planId
            delete params.packageInfoList[index].weeks
          })
          params.singleItemList.forEach((item, index) => {
            delete params.singleItemList[index].allCi
            delete params.singleItemList[index].allMoney
            delete params.singleItemList[index].allTime
            delete params.singleItemList[index].dayCount
            delete params.singleItemList[index].isDis
            delete params.singleItemList[index].orderServiceType
            delete params.singleItemList[index].spContent
            delete params.singleItemList[index].spPrice
            delete params.singleItemList[index].timeLen
            if (params.singleItemList[index].weeks.length !== 0) {
              params.singleItemList[index].weeks.forEach(item => {
                if (item === '周一') {
                  params.singleItemList[index].week1 = item
                } else if (item === '周二') {
                  params.singleItemList[index].week2 = item
                } else if (item === '周三') {
                  params.singleItemList[index].week3 = item
                } else if (item === '周四') {
                  params.singleItemList[index].week4 = item
                } else if (item === '周五') {
                  params.singleItemList[index].week5 = item
                } else if (item === '周六') {
                  params.singleItemList[index].week6 = item
                } else if (item === '周日') {
                  params.singleItemList[index].week7 = item
                }
              })
            }
            delete params.singleItemList[index].weeks
            params.singleItemList[index].osObjId = this.oldId
          })
          if (this.type === 'add') {
            addPlan(params).then(response => {
              if (response.code === 0) {
                this.$message({
                  type: 'success',
                  message: '维护计划成功!'
                })
                // 关闭页面
                this.closeDetailsPage()
              } else {
                this.$message.error(response.msg)
              }
            }).catch(() => {
              this.$message.error('维护计划失败!')
            })
          } else if (this.type === 'edit') {
            editPlan(params).then(response => {
              if (response.code === 0) {
                this.$message({
                  type: 'success',
                  message: '维护计划成功!'
                })
                // 关闭页面
                this.closeDetailsPage()
              } else {
                this.$message.error(response.msg)
              }
            }).catch(() => {
              this.$message.error('维护计划失败!')
            })
          }
        }
      })
    },
    changeItemType(index, data) {
      this.form.singleItemList[index].isDis = true
      getServiceItemList({
        serviceType: this.form.singleItemList[index].smType,
        spName: ''
      }).then(res => {
        if (res.code === 0) {
          this.form.singleItemList[index].orderServiceType = res.data
          this.form.singleItemList[index].isDis = false
          this.form.singleItemList[index].spId = ''
          this.form.singleItemList[index].spName = ''
          this.form.singleItemList[index].weeks = []
          this.form.singleItemList[index].spContent = '系统自动带出'
          this.form.singleItemList[index].spPrice = '系统自动带出'
          this.form.singleItemList[index].timeLen = '系统自动带出'
          this.form.singleItemList[index].monthServiceCount = 1
          this.form.singleItemList[index].allTime = '系统自动带出'
          this.form.singleItemList[index].allCi = '系统自动带出'
          this.form.singleItemList[index].allMoney = '系统自动带出'
          this.form.singleItemList[index].dayCount = '系统自动带出'
        }
      })
    },
    changeItem(index) {
      const arr = this.form.singleItemList[index].orderServiceType
      const arrList = []
      this.form.singleItemList.forEach(item => {
        arrList.push(item.spId)
      })
      const nary = arrList.sort()
      for (let i = 0; i < nary.length - 1; i++) {
        if (nary[i] === nary[i + 1] && nary[i] !== '') {
          this.$message.warning('服务项目重复，请重新选择！')
          this.form.singleItemList[index].spId = ''
          return false
        }
      }
      arr.forEach(item => {
        if (item.id === this.form.singleItemList[index].spId) {
          this.form.singleItemList[index].spName = item.spName
          this.form.singleItemList[index].spContent = item.spContent
          this.form.singleItemList[index].spPrice = item.spPrice
          this.form.singleItemList[index].timeLen = item.timeLen
          this.form.singleItemList[index].dayCount = item.dayCount
        }
      })
    },
    changeType(index, data) {
      this.form.packageInfoList[index].isDis = true
      getMealDown({
        smType: this.form.packageInfoList[index].smType
      }).then(res => {
        if (res.code === 0) {
          this.meals = res.data
          const data = {
            smType: this.form.packageInfoList[index].smType,
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
            isDis: false
          }
          this.form.packageInfoList = []
          this.form.packageInfoList.push(data)
        }
      })
    },
    sumTime(row) {
      if (row.timeLen !== '系统自动带出' && row.timeLen !== null) {
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
    changeMeal(id) {
      getMealDetail(id).then(res => {
        if (res.code === 0) {
          const smType = this.form.packageInfoList[0].smType
          const osmId = this.form.packageInfoList[0].osmId
          this.form.packageInfoList = []
          res.data.bizServiceOrderSetmealDetailVoList.forEach(item => {
            const data = {
              smType: smType,
              osmId: osmId,
              spName: item.spName,
              spId: item.spId,
              spContent: item.spContent,
              orderEmpId: '',
              weeks: [],
              dayCount: item.dayCount,
              timeLen: item.timeLen,
              spPrice: item.spPrice,
              smCount: item.smCount,
              allTime: '系统自动带出',
              allCi: '系统自动带出',
              allMoney: '系统自动带出',
              isDis: false
            }
            this.form.packageInfoList.push(data)
          })
        }
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
    // getMealDown() {
    //   return new Promise((resolve, reject) => {
    //     getMealDown({}).then(res => {
    //       if (res.code === 0) {
    //         this.meals = res.data
    //       }
    //       resolve()
    //     }).catch(() => {
    //       reject()
    //     })
    //   })
    // },
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
      this.$router.push({ path: '/serverManagement/orderManagement/servicePlan' })
    }
  }
}
</script>

<style lang="scss">
  @import "~@/styles/form.css";
  .tableContainer {
    margin-top: 20px;
  }
  .plan-set {
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
  }
</style>
