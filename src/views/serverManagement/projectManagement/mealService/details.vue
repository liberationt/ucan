<template>
  <el-container>
    <el-main class="tableContainer order-meal">
      <el-form
        ref="form_base"
        key="form_base"
        :model="form"
        :rules="isEditForm ? rulesForm : null"
        label-width="90px"
      >
        <el-row :gutter="20">
          <el-col :md="adaptiveGrid.md" :lg="adaptiveGrid.lg">
            <el-form-item :label="isEditForm ? '套餐类型' : '套餐类型：'" prop="bizServiceOrderSetmealVo.smType">
              <el-select
                v-if="isEditForm"
                v-model="form.bizServiceOrderSetmealVo.smType"
                placeholder="请选择套餐类型"
                clearable
                style="width: 250px"
                @keyup.enter.native="editContent('form_base')"
              >
                <el-option
                  v-for="item in orderServiceType"
                  :key="item.dictValue"
                  :label="item.dictLabel"
                  :value="item.dictValue"
                />
              </el-select>
              <span v-else>{{ form.bizServiceOrderSetmealVo.smTypeName }}</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :md="adaptiveGrid.md" :lg="adaptiveGrid.lg">
            <el-form-item :label="isEditForm ? '套餐名称' : '套餐名称：'" prop="bizServiceOrderSetmealVo.smName">
              <el-input
                v-if="isEditForm"
                ref="orgName"
                v-model="form.bizServiceOrderSetmealVo.smName"
                oninput="if(value.length>50)value=value.slice(0,50)"
                clearable
                style="width: 250px"
                placeholder="请输入套餐名称"
                maxlength="60"
                @keyup.enter.native="editContent('form_base')"
              />
              <span v-else>{{ form.bizServiceOrderSetmealVo.smName }}</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :md="adaptiveGrid.md" :lg="adaptiveGrid.lg">
            <el-form-item :label="isEditForm ? '套餐状态' : '套餐状态：'">
              <el-switch
                v-if="isEditForm"
                v-model="form.bizServiceOrderSetmealVo.smState"
                class="switchStyle"
                active-text="启用"
                inactive-text="禁用"
                active-value="1"
                inactive-value="0"
              />
              <span v-else>{{ form.bizServiceOrderSetmealVo.smStateName }}</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :md="adaptiveGrid.md" :lg="adaptiveGrid.lg">
            <el-form-item v-if="isEditForm" :label="isEditForm ? '套餐明细' : '套餐明细：'" prop="orgName" class="styleDefaultColor">
              <i class="el-icon-circle-plus add-icon" @click="addTableRow" />
              <i class="el-icon-remove-outline add-icon" @click="deleteList" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <div class="meal-table">
            <el-table
              :data="form.bizServiceOrderSetmealDetailVoList"
              style="width: 100%"
              class="order-table"
              row-key="id"
              @selection-change="handleSelectionChange"
            >
              <el-table-column type="selection" width="50" />
              <el-table-column prop="contactsName" label="服务类型" min-width="150">
                <template slot-scope="scope">
                  <el-form-item
                    v-if="isEditForm"
                    :ref="'bizServiceOrderSetmealDetailVoList.' + scope.$index + '.serviceType'"
                    :prop="'bizServiceOrderSetmealDetailVoList.' + scope.$index + '.serviceType'"
                    :rules="rulesForm.serviceType"
                  >
                    <el-select
                      v-model="scope.row.serviceType"
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
                  <span v-else>{{ scope.row.serviceTypeName }}</span>
                </template>
              </el-table-column>
              <el-table-column prop="contactsName" label="服务项目" min-width="150">
                <template slot-scope="scope">
                  <el-form-item
                    v-if="isEditForm"
                    :ref="'bizServiceOrderSetmealDetailVoList.' + scope.$index + '.spId'"
                    :prop="'bizServiceOrderSetmealDetailVoList.' + scope.$index + '.spId'"
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
              <el-table-column prop="contactsName" label="服务内容" min-width="150">
                <template slot-scope="scope">
                  <el-form-item>
                    <span>{{ scope.row.spContent }}</span>
                  </el-form-item>
                </template>
              </el-table-column>
              <el-table-column prop="contactsName" label="服务单价（元）" min-width="150">
                <template slot-scope="scope">
                  <el-form-item>
                    <span>{{ scope.row.spPrice }}</span>
                  </el-form-item>
                </template>
              </el-table-column>
              <el-table-column prop="contactsName" label="服务时长（分钟）" min-width="150">
                <template slot-scope="scope">
                  <el-form-item>
                    <span>{{ scope.row.timeLen }}</span>
                  </el-form-item>
                </template>
              </el-table-column>
              <el-table-column prop="contactsName" label="套餐内次数（月）" min-width="200">
                <template slot-scope="scope">
                  <el-form-item
                    v-if="isEditForm"
                    :ref="'bizServiceOrderSetmealDetailVoList.' + scope.$index + '.smCount'"
                    :prop="'bizServiceOrderSetmealDetailVoList.' + scope.$index + '.smCount'"
                    :rules="rulesForm.smCount"
                  >
                    <el-input-number v-model="scope.row.smCount" :min="1" :max="1000" label="请选择套餐内次数" />
                  </el-form-item>
                  <span v-else>{{ scope.row.smCount }}</span>
                </template>
              </el-table-column>
              <el-table-column prop="contactsName" label="总计（元/月）" width="190">
                <template slot-scope="scope">
                  <el-form-item>
                    <span v-if="isEditForm">{{ sumMoney(scope.row) }}</span>
                    <span v-else>{{ scope.row.spPrice * scope.row.smCount }}</span>
                  </el-form-item>
                </template>
              </el-table-column>
            </el-table>
            <el-footer>
              <div style="color: #3367D6; font-size: 18px; text-align: right; margin-bottom: 20px">
                <span class="table-total">合计：</span>
                <span v-if="isEditForm" style="padding-right: 150px">{{ smMoney }}</span>
                <span v-else style="padding-right: 150px">{{ total }}</span>
              </div>
              <div v-if="isEditForm" class="footerBtn">
                <el-button type="primary" class="base-btn btnMarginLeft15" @click="editContent('form_base')">保存</el-button>
                <el-button class="mr" @click="cancelDetailsPage">取消</el-button>
              </div>
              <div v-if="modelType=='look' && isEditForm === false" class="footerBtn">
                <el-button v-if="editAuthority&&data.accountType==='3'&& data.assistiveRentType!=null" type="primary" class="base-btn btnMarginLeft15" @click="toEdit">编辑</el-button>
                <el-button @click="returnGo">返回</el-button>
              </div>
            </el-footer>
          </div>
        </el-row>
        <div class="table-ts">
          温馨提示
          <div class="table-ts-word">
            1、套餐内次数（月），不可以为0，至少填写1次
          </div>
        </div>
      </el-form>
    </el-main>
  </el-container>
</template>

<script>
import { adaptiveGrid_max, adaptiveGrid_plus } from '@/common/index'
import { allSelectdictionaryData } from '@/api/facilitiesConfig/pensionAgency'
import { getServiceItemList, addMeal, getMealDetail, editMeal } from '@/api/orderManage/ips'
import { closeSelectedTag } from '@/utils/rooterJump'
import { getEditAuthority } from '@/api/user'
import { mapGetters } from 'vuex'

export default {
  name: 'MealDetails',
  computed: {
    ...mapGetters([
      'data'
    ])
  },
  data() {
    return {
      orderServiceType: [],
      modelType: '',
      isEditForm: true,
      adaptiveGrid: adaptiveGrid_max,
      adaptiveGrid_plus: adaptiveGrid_plus,
      rulesForm: {
        'bizServiceOrderSetmealVo.smName': [
          { required: true, trigger: 'blur', message: '请填写套餐名称！' }
        ],
        'bizServiceOrderSetmealVo.smType': [
          { required: true, trigger: 'change', message: '请选择套餐类型！' }
        ],
        serviceType: [
          { required: true, trigger: 'change', message: '服务类型不能为空！' }
        ],
        spId: [
          { required: true, trigger: 'change', message: '服务项目不能为空！' }
        ],
        smCount: [
          { required: true, trigger: 'blur', message: '套餐内次数不能为空！' }
        ]
      },
      form: {
        bizServiceOrderSetmealVo: {
          smType: '',
          smName: '',
          smState: '1'
        },
        bizServiceOrderSetmealDetailVoList: [
          {
            isDis: true,
            serviceType: '',
            spId: '',
            spName: '',
            spContent: '系统自动带出',
            spPrice: '系统自动带出',
            timeLen: '系统自动带出',
            smCount: '',
            spMoney: '系统自动带出',
            orderServiceType: [],
            rowIndex: Math.random() * 100000000000000000 + ''
          }
        ]
      },
      smMoney: 0,
      idList: [],
      total: 0,
      editAuthority: false
    }
  },
  watch: {
    'form.bizServiceOrderSetmealDetailVoList': {
      handler(newValue, oldValue) {
        let smMoney = 0
        this.form.bizServiceOrderSetmealDetailVoList.forEach(item => {
          if (item.spMoney !== '系统自动带出') {
            smMoney = smMoney + item.spMoney
          }
        })
        this.smMoney = smMoney
      },
      deep: true
    }
  },
  mounted() {
    this.modelType = this.$route.query.modelType
    if (this.modelType === 'look') {
      // 查看时，不要调用户信息接口，直接将表格行数据带来现实
      this.isEditForm = false
      getEditAuthority(this.$route.query.menu).then(res => {
        res.forEach(item => {
          if (item.menuName === '编辑') {
            this.editAuthority = item.visible === '0'
          }
        })
      })
      this.editGetData(this.$route.params.id)
    } else if (this.modelType === 'edit') {
      this.allData()
    } else if (this.modelType === 'add') {
      this.idEdit = false
      this.getSelect()
    }
  },
  methods: {
    async allData() {
      await this.getSelect()
      await this.editGetData(this.$route.params.id)
    },
    returnGo() {
      this.$router.go(-1)
    },
    toEdit() {
      this.$router.push({
        path: `/projectManagement/mealService/details/${this.$route.params.id}`,
        query: { 'modelType': 'edit', '_title': `编辑${this.form.bizServiceOrderSetmealVo.smName}`, 'menu': this.$route.query.menu }
      })
    },
    // 编辑获取数据
    editGetData(id) {
      return new Promise((resolve, reject) => {
        // 请求当前用户信息
        getMealDetail(id).then(res => {
          if (res.code === 0) {
            if (this.modelType === 'look') {
              this.form = res.data
              this.form.bizServiceOrderSetmealDetailVoList.forEach(item => {
                this.total = this.total + (item.spPrice * item.smCount)
              })
            }
            if (this.modelType === 'edit') {
              this.form.bizServiceOrderSetmealVo = res.data.bizServiceOrderSetmealVo
              this.form.bizServiceOrderSetmealDetailVoList = []
              res.data.bizServiceOrderSetmealDetailVoList.forEach(item => {
                const rowData = {
                  dayCount: '',
                  id: '',
                  ospName: '',
                  serviceStatus: '',
                  serviceStatusName: '',
                  serviceTypeName: '',
                  isDis: false,
                  serviceType: '',
                  smId: '',
                  spId: '',
                  spName: '',
                  spContent: '系统自动带出',
                  spPrice: '系统自动带出',
                  timeLen: '系统自动带出',
                  smCount: '',
                  spMoney: '系统自动带出',
                  rowIndex: Math.random() * 100000000000000000 + ''
                }
                rowData.serviceType = item.serviceType
                rowData.spId = item.spId
                // item.spId=item.
                rowData.spPrice = item.spPrice
                rowData.timeLen = item.timeLen
                rowData.smCount = item.smCount
                rowData.dayCount = item.dayCount
                rowData.id = item.id
                rowData.ospName = item.ospName
                rowData.serviceStatus = item.serviceStatus
                rowData.serviceStatusName = item.serviceStatusName
                rowData.serviceTypeName = item.serviceTypeName
                rowData.smId = item.smId
                rowData.spName = item.spName
                rowData.spContent = item.spContent
                this.form.bizServiceOrderSetmealDetailVoList.push(rowData)
              })
              this.form.bizServiceOrderSetmealDetailVoList.forEach((item, index) => {
                getServiceItemList({
                  serviceType: item.serviceType,
                  spName: ''
                }).then(res => {
                  if (res.code === 0) {
                    const id = this.form.bizServiceOrderSetmealDetailVoList[index].spId
                    this.form.bizServiceOrderSetmealDetailVoList[index].spId = ''
                    this.form.bizServiceOrderSetmealDetailVoList[index].orderServiceType = res.data
                    // this.form.bizServiceOrderSetmealDetailVoList[index].spId = id
                    this.form.bizServiceOrderSetmealDetailVoList[index].spId = res.data.length ? id : ''

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
            }
          }
        }).catch(() => {
          this.$message.error('获取用户信息失败！')
        })
      })
    },
    deleteList() {
      if (this.idList.length === 0) {
        this.$message.warning('请选择明细列表！')
        return false
      }
      this.idList.forEach(item => {
        this.form.bizServiceOrderSetmealDetailVoList.forEach((i, index) => {
          if (item === i.rowIndex) {
            delete this.form.bizServiceOrderSetmealDetailVoList[index]
          }
        })
      })
      const arr = []
      this.form.bizServiceOrderSetmealDetailVoList.forEach(item => {
        if (item !== undefined) {
          arr.push(item)
        }
      })
      this.form.bizServiceOrderSetmealDetailVoList = arr
    },
    handleSelectionChange(val) {
      this.idList = []
      val.forEach(item => {
        this.idList.push(item.rowIndex)
      })
    },
    editContent(formName) {
      this.$refs[formName].validate((valid, object) => {
        if (valid) {
          if (this.form.bizServiceOrderSetmealDetailVoList.length === 0) {
            this.$message.warning('套餐明细至少有一条！')
            return false
          }
          const params = this.form
          delete params.bizServiceOrderSetmealVo.smMoney
          params.bizServiceOrderSetmealDetailVoList.forEach((item, index) => {
            delete params.bizServiceOrderSetmealDetailVoList[index].orderServiceType
            delete params.bizServiceOrderSetmealDetailVoList[index].isDis
            delete params.bizServiceOrderSetmealDetailVoList[index].serviceType
            delete params.bizServiceOrderSetmealDetailVoList[index].spPrice
            delete params.bizServiceOrderSetmealDetailVoList[index].timeLen
            delete params.bizServiceOrderSetmealDetailVoList[index].spContent
            delete params.bizServiceOrderSetmealDetailVoList[index].spMoney
            delete params.bizServiceOrderSetmealDetailVoList[index].rowIndex
          })
          if (this.modelType === 'add') {
            addMeal(params).then(response => {
              if (response.code === 0) {
                this.$message({
                  type: 'success',
                  message: '新增服务套餐成功!'
                })
                // 关闭页面
                this.closeDetailsPage()
              } else {
                this.$message.error(response.msg)
              }
            }).catch(() => {
              this.$message.error('新增服务套餐失败!')
            })
          } else {
            editMeal(params).then(response => {
              if (response.code === 0) {
                this.$message({
                  type: 'success',
                  message: '编辑服务套餐成功!'
                })
                // 关闭页面
                this.closeDetailsPage()
              } else {
                this.$message.error(response.msg)
              }
            }).catch(() => {
              this.$message.error('编辑服务套餐失败!')
            })
          }
        }
      })
    },
    sumMoney(row) {
      if (row.spPrice !== '系统自动带出' && row.smCount !== '' && row.smCount !== undefined) {
        row.spMoney = parseInt(row.smCount) * row.spPrice
      } else {
        row.spMoney = '系统自动带出'
      }
      return row.spMoney
    },
    changeItem(index) {
      const arr = this.form.bizServiceOrderSetmealDetailVoList[index].orderServiceType
      const arrList = []
      this.form.bizServiceOrderSetmealDetailVoList.forEach(item => {
        arrList.push(item.spId)
      })
      const nary = arrList.sort()
      for (let i = 0; i < nary.length - 1; i++) {
        if (nary[i] === nary[i + 1] && nary[i] !== '') {
          this.$message.warning('服务项目重复，请重新选择！')
          this.form.bizServiceOrderSetmealDetailVoList[index].spId = ''
          return false
        }
      }
      arr.forEach(item => {
        if (item.id === this.form.bizServiceOrderSetmealDetailVoList[index].spId) {
          this.form.bizServiceOrderSetmealDetailVoList[index].spName = item.spName
          this.form.bizServiceOrderSetmealDetailVoList[index].spContent = item.spContent
          this.form.bizServiceOrderSetmealDetailVoList[index].spPrice = item.spPrice
          this.form.bizServiceOrderSetmealDetailVoList[index].timeLen = item.timeLen
        }
      })
    },
    changeType(index, data) {
      this.form.bizServiceOrderSetmealDetailVoList[index].isDis = true
      getServiceItemList({
        serviceType: this.form.bizServiceOrderSetmealDetailVoList[index].serviceType,
        spName: ''
      }).then(res => {
        if (res.code === 0) {
          this.form.bizServiceOrderSetmealDetailVoList[index].orderServiceType = res.data
          this.form.bizServiceOrderSetmealDetailVoList[index].spContent = 1
          this.form.bizServiceOrderSetmealDetailVoList[index].isDis = false
          this.form.bizServiceOrderSetmealDetailVoList[index].spId = ''
          this.form.bizServiceOrderSetmealDetailVoList[index].spName = ''
          this.form.bizServiceOrderSetmealDetailVoList[index].spContent = '系统自动带出'
          this.form.bizServiceOrderSetmealDetailVoList[index].spPrice = '系统自动带出'
          this.form.bizServiceOrderSetmealDetailVoList[index].timeLen = '系统自动带出'
        }
      })
    },
    getSelect() {
      const dictKey = [
        'order_set_meal_type',
        'status'
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
    addTableRow() {
      // if (this.form.contact.length >= 3) {
      //   this.$message.warning('联系人数量最多添加3条！')
      //   return false
      // }
      this.flag = true// 添加时的取消按钮

      const rowData = {
        isDis: true,
        serviceType: '',
        spId: '',
        spName: '',
        spContent: '系统自动带出',
        spPrice: '系统自动带出',
        timeLen: '系统自动带出',
        smCount: '',
        spMoney: '系统自动带出',
        rowIndex: Math.random() * 100000000000000000 + ''
      }
      this.form.bizServiceOrderSetmealDetailVoList.push(rowData)
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
      this.$router.push({ path: '/serverManagement/projectManagement/mealService' })
    }
  }
}
</script>

<style lang="scss">
  @import "~@/styles/form.css";
  .styleDefaultColor{
    -webkit-user-select:none;
    -moz-user-select:none;
    -ms-user-select:none;
    user-select:none;
  }
  .tableContainer {
    margin-top: 20px;
  }
  .order-meal {
    min-height: calc(100vh - 115px);
    .table-total {
      padding: 0 50px 0px 20px;
    }

    .add-icon {
      font-size: 34px;
      color: #3367D6;
      cursor: pointer;
    }
    // .add-icon:active{
    //   color:red
    // }
    .meal-table {
      min-height: calc(100vh - 510px);
      width: 100%;
    }
    .order-table {
      .el-form-item__content {
        margin-left: 0 !important;
      }

    }
    .table-ts {
      margin-top: 30px;
      width: 100%;
      font-size: 14px;
      color: #666666;
      .table-ts-word {
        width: 100%;
        margin-top: 15px;
        height: 80px;
        border:1px dashed #e1e1e1;
        padding: 10px 10px;
      }
    }
  }
</style>
