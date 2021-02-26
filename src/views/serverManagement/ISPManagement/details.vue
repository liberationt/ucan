<template>
  <el-container>
    <el-main class="tableContainer">
      <el-form
        ref="form_base"
        key="form_base"
        :model="form"
        :rules="isEditForm ? rulesForm : null"
        label-width="170px"
      >
        <el-collapse v-model="activeCollapse">
          <el-collapse-item name="baseItem_1">
            <template slot="title">
              <div class="titleSlider">
                <span>
                  <i class="titleTip" />基本信息
                </span>
              </div>
            </template>
            <el-row :gutter="20">
              <el-col :md="adaptiveGrid.md" :lg="adaptiveGrid.lg">
                <el-form-item :label="isEditForm ? '服务商全称' : '服务商全称：'" prop="orgName">
                  <el-input
                    v-if="isEditForm"
                    ref="orgName"
                    v-model="form.orgName"
                    clearable
                    placeholder="请输入服务商全称"
                    maxlength="60"
                    @keyup.enter.native="editContent('form_base')"
                  />
                  <span v-else>{{ form.orgName }}</span>
                </el-form-item>
              </el-col>
              <el-col :md="adaptiveGrid.md" :lg="adaptiveGrid.lg">
                <el-form-item :label="isEditForm ? '社会统一信息信用代码' : '社会统一信息信用代码：'" prop="orgCode">
                  <el-input
                    v-if="isEditForm"
                    ref="censusAddr"
                    v-model="form.orgCode"
                    maxlength="30"
                    clearable
                    placeholder="请输入社会统一信息信用代码"
                    @keyup.enter.native="editContent('form_base')"
                  />
                  <span v-else>{{ form.orgCode }}</span>
                </el-form-item>
              </el-col>
              <el-col :md="adaptiveGrid.md" :lg="adaptiveGrid.lg">
                <el-form-item :label="isEditForm ? '服务机构类型' : '服务机构类型：'" prop="serviceOrganType">
                  <el-select
                    v-if="isEditForm"
                    v-model="form.serviceOrganType"
                    placeholder="请选择服务机构类型"
                    clearable
                    style="width:100%;"
                    @keyup.enter.native="editContent('form_base')"
                  >
                    <el-option
                      v-for="item in serviceOrganType"
                      :key="item.dictValue"
                      :label="item.dictLabel"
                      :value="item.dictValue"
                    />
                  </el-select>
                  <span v-else>{{ form.serviceOrganTypeName }}</span>
                </el-form-item>
              </el-col>
              <el-col :md="adaptiveGrid.md" :lg="adaptiveGrid.lg">
                <el-form-item :label="isEditForm ? '咨询电话' : '咨询电话：'" prop="phone">
                  <el-input
                    v-if="isEditForm"
                    ref="censusAddr"
                    v-model="form.phone"
                    maxlength="30"
                    clearable
                    placeholder="请输入咨询电话"
                    @keyup.enter.native="editContent('form_base')"
                  />
                  <span v-else>{{ form.phone }}</span>
                </el-form-item>
              </el-col>
              <el-col :md="adaptiveGrid.md" :lg="adaptiveGrid.lg">
                <el-form-item :label="isEditForm ? '机构登记类型' : '机构登记类型：'" prop="organRegType">
                  <el-select
                    v-if="isEditForm"
                    v-model="form.organRegType"
                    placeholder="请选择机构登记类型"
                    clearable
                    style="width:100%;"
                    @keyup.enter.native="editContent('form_base')"
                  >
                    <el-option
                      v-for="item in organRegType"
                      :key="item.dictValue"
                      :label="item.dictLabel"
                      :value="item.dictValue"
                    />
                  </el-select>
                  <span v-else>{{ form.organRegTypeName }}</span>
                </el-form-item>
              </el-col>
              <el-col :md="adaptiveGrid.md" :lg="adaptiveGrid.lg">
                <el-form-item :label="isEditForm ? '运营方式' : '运营方式：'" prop="opMode">
                  <el-select
                    v-if="isEditForm"
                    v-model="form.opMode"
                    placeholder="请选择机构登记类型"
                    clearable
                    style="width:100%;"
                    @keyup.enter.native="editContent('form_base')"
                  >
                    <el-option
                      v-for="item in operateModeOptions"
                      :key="item.dictValue"
                      :label="item.dictLabel"
                      :value="item.dictValue"
                    />
                  </el-select>
                  <span v-else>{{ form.opModeName }}</span>
                </el-form-item>
              </el-col>
              <el-col :md="adaptiveGrid_plus.md" :lg="adaptiveGrid_plus.lg">
                <el-form-item
                  :label="isEditForm ? '办公行政区划' : '办公行政区划：'"
                  prop="officeArea"
                >
                  <Address
                    v-if="isEditForm"
                    :area-code="areaCode"
                    :form-code="form.officeArea"
                    :id-edit="idEdit"
                    :width="'100%'"
                    @getAreaCode="getAreaCode"
                    @keyup.enter.native="editContent('form_base')"
                  />
                  <span v-else>{{ form.areaCodeStr }}</span>
                </el-form-item>
              </el-col>
              <el-col :md="adaptiveGrid_plus.md" :lg="adaptiveGrid_plus.lg">
                <el-form-item
                  :label="isEditForm ? '详细地址' : '详细地址：'"
                  prop="officeAddr"
                >
                  <el-input
                    v-if="isEditForm"
                    ref="officeAddr"
                    v-model="form.officeAddr"
                    clearable
                    placeholder="请输入详细地址"
                    @keyup.enter.native="editContent('form_base')"
                  />
                  <span v-else>{{ form.officeAddr }}</span>
                </el-form-item>
              </el-col>
              <el-col :md="24" :lg="24" style="height: auto;">
                <el-form-item :label="isEditForm ? '机构图片' :'机构图片：'">
                  <el-row v-if="!isEditForm" class="agencyImageRow">
                    <viewer :images="imageInfoVosLookUrl">
                      <el-col v-for="(item, index) in imageInfoVosLookUrl" :key="index" class="agencyImageCol" style="cursor: pointer">
                        <img :src="item" class="agencyImage">
                      </el-col>
                    </viewer>
                  </el-row>
                  <div v-else class="agencyImageWrap">
                    <Uploadpics :id-edit="idEdit" :form-imgs="form.imageInfoVos" @pics="getPicList" @keyup.enter.native="editContent('form_base')" />
                  </div>
                </el-form-item>
              </el-col>
            </el-row>
          </el-collapse-item>
          <el-collapse-item v-if="!isEditForm" name="baseItem_2">
            <template slot="title">
              <div class="titleSlider">
                <span>
                  <i class="titleTip" />套餐项目
                </span>
              </div>
            </template>
            <el-table
              :data="mealFormList"
              tooltip-effect="dark"
              style="width: 100%;"
              header-align="left"
              border
              row-key="id"
              :span-method="objectSpanMethod"
            >
              <el-table-column label="套餐类型" prop="smTypeName" align="center" />
              <el-table-column label="套餐名称" prop="smName" align="center" />
              <el-table-column label="服务项目" prop="spName" align="center" />
              <el-table-column label="服务内容" prop="spContent" align="center" />
              <el-table-column label="服务时长（分钟）" prop="timeLen" align="center" />
              <el-table-column label="服务单价（元）" prop="spPrice" align="center" />
              <el-table-column label="每月服务（次）" prop="smCount" align="center" />
            </el-table>
          </el-collapse-item>
          <el-collapse-item v-if="!isEditForm" name="baseItem_3">
            <template slot="title">
              <div class="titleSlider">
                <span>
                  <i class="titleTip" />服务项目
                </span>
              </div>
            </template>
            <el-table
              :data="serviceList"
              tooltip-effect="dark"
              style="width: 100%;"
              header-align="left"
              border
              row-key="id"
            >
              <el-table-column label="服务类型" prop="serviceTypeName" align="center" />
              <el-table-column label="服务项目" prop="spName" align="center" />
              <el-table-column label="服务内容" prop="spContent" align="center" />
              <el-table-column label="服务时长（分钟）" prop="timeLen" align="center" />
              <el-table-column label="服务单价（元）" prop="spPrice" align="center" />
              <el-table-column label="每日服务（次）" prop="dayCount" align="center" />
            </el-table>
          </el-collapse-item>
          <el-collapse-item v-if="!isEditForm" name="baseItem_4">
            <template slot="title">
              <div class="titleSlider">
                <span>
                  <i class="titleTip" />服务人员
                </span>
              </div>
            </template>
            <el-table
              :data="manList"
              tooltip-effect="dark"
              style="width: 100%;"
              header-align="left"
              border
              row-key="id"
            >
              <el-table-column label="服务人员编号" prop="empNo" align="center" />
              <el-table-column label="服务人员姓名" prop="fullName" align="center" />
              <el-table-column label="手机号" prop="mobile" align="center" />
              <el-table-column label="身份证号" prop="idCard" align="center" />
            </el-table>
          </el-collapse-item>
        </el-collapse>
      </el-form>
      <el-footer>
        <div v-if="isEditForm" class="footerBtn">
          <el-button type="primary" class="base-btn btnMarginLeft15" @click="editContent('form_base')">保存</el-button>
          <el-button class="mr" @click="cancelDetailsPage">取消</el-button>
        </div>
        <div v-if="modelType=='look' && isEditForm === false" class="footerBtn">
          <el-button v-if="editAuthority&&data.accountType==='3'&& data.assistiveRentType!=null" type="primary" class="base-btn btnMarginLeft15" @click="toEdit">编辑</el-button>
          <el-button @click="returnGo">返回</el-button>
        </div>
      </el-footer>
    </el-main>
  </el-container>
</template>

<script>
import {
  getIpsNameOnly,
  getIpsOrgcodeOnly,
  addISP,
  getIpsDetail,
  editISP
} from '@/api/orderManage/ips'
import { allSelectdictionaryData } from '@/api/facilitiesConfig/pensionAgency'
import { adaptiveGrid_max, adaptiveGrid_plus } from '@/common/index'
import { closeSelectedTag } from '@/utils/rooterJump'
import {
  isCode,
  verifyHomePhoneOrMobile
} from '@/utils/validate'
import Address from '@/components/Address'
import Uploadpics from '@/components/Uploadpics'
import { getEditAuthority } from '@/api/user'
import { mapGetters } from 'vuex'

export default {
  name: 'IspDetail',
  components: {
    Address,
    Uploadpics
  },
  computed: {
    ...mapGetters([
      'data'
    ])
  },
  data() {
    const verifyAreaHomeCode = (rule, value, callback) => {
      if (this.areaCode.length === 0) {
        callback(new Error('办公行政区划不能为空，请选择！'))
      } else {
        callback()
      }
    }
    return {
      tableData: [],
      modelType: '',
      isEditForm: true,
      idEdit: true,
      adaptiveGrid: adaptiveGrid_max,
      adaptiveGrid_plus: adaptiveGrid_plus,
      areaCode: [],
      rulesForm: {
        orgName: [
          // trigger 设置为 MANUAL_TRIGGER 是不让组件自动在 blur 的时候校验。
          // 手动在 blur 事件处理函数中处理。将校验和校验后的动作解耦。
          { required: true, trigger: 'blur', message: '服务商全称不能为空，请输入！' },
          {
            trigger: 'MANUAL_TRIGGER', validator: (rule, value, callback) => {
              getIpsNameOnly({
                orgName: value
              }).then(response => {
                if (response.code === 0) {
                  callback()
                } else {
                  callback(response.msg)
                }
              }).catch(() => {
                callback(new Error('身份证检验接口调用失败！'))
              })
            }
          }
        ],
        orgCode: [
          // trigger 设置为 MANUAL_TRIGGER 是不让组件自动在 blur 的时候校验。
          // 手动在 blur 事件处理函数中处理。将校验和校验后的动作解耦。
          { trigger: 'blur', validator: isCode },
          {
            trigger: 'MANUAL_TRIGGER', validator: (rule, value, callback) => {
              getIpsOrgcodeOnly({
                orgName: value
              }).then(response => {
                if (response.code === 0) {
                  callback()
                } else {
                  callback(response.msg)
                }
              }).catch(() => {
                callback(new Error('身份证检验接口调用失败！'))
              })
            }
          }
        ],
        phone: [
          { trigger: 'blur', validator: verifyHomePhoneOrMobile }
        ],
        organRegType: [
          { required: true, trigger: 'change', message: '机构登记类型不能为空，请选择！' }
        ],
        officeArea: [
          { required: true, trigger: 'change', validator: verifyAreaHomeCode }
        ],
        officeAddr: [
          { required: true, trigger: 'blur', message: '请填写办公详细地址！' }
        ]
      },
      form: {
        phone: '', // 咨询电话
        orgName: '', // 服务商全称
        orgCode: '', // 社会统一信息信用代码
        serviceOrganType: '', // 服务机构类型
        organRegType: '', // 机构登记类型
        opMode: '', // 运营方式
        officeArea: '',
        officeAddr: '',
        imageInfoVos: []
      },
      activeCollapse: 'baseItem_1',
      serviceOrganType: [],
      organRegType: [],
      imageInfoVosLookUrl: [], // 查看时的图片路径
      operateModeOptions: [], // 运营方式
      mealList: [],
      mealFormList: [],
      rowspan: [],
      pos: '',
      serviceList: [],
      manList: [],
      editAuthority: false
    }
  },
  mounted() {
    this.modelType = this.$route.query.modelType
    if (this.modelType === 'look') {
      // 查看时，不要调用户信息接口，直接将表格行数据带来现实
      this.isEditForm = false
      this.editGetData(this.$route.params.id)
      getEditAuthority(this.$route.query.menu).then(res => {
        res.forEach(item => {
          if (item.menuName === '编辑') {
            this.editAuthority = item.visible === '0'
          }
        })
      })
    } else if (this.modelType === 'edit') {
      this.allData()
      delete this.rulesForm.orgName[1]
      delete this.rulesForm.orgCode[1]
    } else if (this.modelType === 'add') {
      this.idEdit = false
      this.getSelect()
    }
  },
  methods: {
    objectSpanMethod({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 0 || columnIndex === 1) {
        const _row = this.rowspan[rowIndex]
        const _col = _row > 0 ? 1 : 0
        return {
          rowspan: _row,
          colspan: _col
        }
      }
    },
    async allData() {
      await this.getSelect()
      await this.editGetData(this.$route.params.id)
    },
    toEdit() {
      this.$router.push({
        path: `/ISPManagement/details/${this.$route.params.id}`,
        query: { 'modelType': 'edit', '_title': `编辑${this.form.orgName}`, 'menu': this.$route.query.menu }
      })
    },
    returnGo() {
      this.$router.go(-1)
    },
    // 编辑获取数据
    editGetData(id) {
      return new Promise((resolve, reject) => {
        // 请求当前用户信息
        getIpsDetail(id).then(res => {
          if (res.code === 0) {
            this.form = res.data
            this.form.imageInfoVos.forEach((item) => {
              this.imageInfoVosLookUrl.push(`${process.env.VUE_APP_API_IMGURL}${item.imgUrl}`)
            })
            this.areaCode = this.form.areaCode && this.form.areaCode !== null ? this.form.areaCode.split(',') : this.areaCode
            this.form.officeArea = this.areaCode
            this.manList = res.data.orderEmpList
            if (this.isEditForm === false) {
              this.serviceList = res.data.orderProjectVoList
              this.mealList = res.data.setmealAndDetailVoList
              this.mealList.forEach((item, i) => {
                this.mealList[i].bizServiceOrderSetmealDetailVoList.forEach((list, index) => {
                  this.mealList[i].bizServiceOrderSetmealDetailVoList[index].smName = item.bizServiceOrderSetmealVo.smName
                  this.mealList[i].bizServiceOrderSetmealDetailVoList[index].smTypeName = item.bizServiceOrderSetmealVo.smTypeName
                })
                this.mealFormList = this.mealFormList.concat(this.mealList[i].bizServiceOrderSetmealDetailVoList)
              })
              for (var i = 0; i < this.mealFormList.length; i++) {
                if (i === 0) {
                  this.rowspan.push(1)
                  this.pos = 0
                } else {
                  // 判断当前元素与上一个元素是否相同
                  // 根据相同id进行合并,根据需要可进行修改
                  if (this.mealFormList[i].smId === this.mealFormList[i - 1].smId) {
                    this.rowspan[this.pos] += 1
                    this.rowspan.push(0)
                  } else {
                    this.rowspan.push(1)
                    this.pos = i
                  }
                }
              }
            }
            setTimeout(() => {
              this.idEdit = false
            }, 1000)
          }
        })
      })
    },
    closeDetailsPage() {
      closeSelectedTag(this, this.$route)
      this.$router.push({ path: '/serverManagement/ISPManagement' })
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
    // 获取图片数据
    getPicList(val) {
      this.form.imageInfoVos = val
    },
    getAreaCode(val) {
      this.areaCode = val
    },
    // 提交表单
    editContent(formName) {
      this.$refs[formName].validate((valid, object) => {
        if (valid) {
          const params = this.form
          params.officeArea = this.areaCode.length === 0 ? '' : this.areaCode[this.areaCode.length - 1] + ''
          if (this.modelType === 'add') {
            addISP(params).then(response => {
              if (response.code === 0) {
                this.$message({
                  type: 'success',
                  message: '新增服务商信息成功!'
                })
                // 关闭页面
                this.closeDetailsPage()
              } else {
                this.$message.error(response.msg)
              }
            }).catch(() => {
              this.$message.error('新增服务商信息失败!')
            })
          } else {
            const editData = {}
            editData.phone = params.phone
            editData.orgName = params.orgName
            editData.orgCode = params.orgCode
            editData.serviceOrganType = params.serviceOrganType
            editData.organRegType = params.organRegType
            editData.opMode = params.opMode
            editData.officeArea = params.officeArea
            editData.officeAddr = params.officeAddr
            editData.imageInfoVos = params.imageInfoVos
            editData.orgId = params.orgId
            editISP(editData).then(response => {
              if (response.code === 0) {
                this.$message({
                  type: 'success',
                  message: '修改服务商信息成功!'
                })
                // 关闭页面
                this.closeDetailsPage()
              } else {
                this.$message.error(response.msg)
              }
            }).catch(() => {
              this.$message.error('修改服务商信息失败!')
            })
          }
        }
      })
    },
    // 字典
    getSelect() {
      const dictKey = [
        'service_organization_type',
        'registration_type',
        'operate_mode'
      ].join(',')
      return new Promise((resolve, reject) => {
        allSelectdictionaryData(dictKey).then(response => {
          const dict = response.data
          for (const key in dict) {
            switch (key) {
              case 'service_organization_type':
                this.serviceOrganType = dict[key]
                break
              case 'registration_type':
                this.organRegType = dict[key]
                break
              case 'operate_mode':
                this.operateModeOptions = dict[key]
                break
            }
          }
          resolve()
        }).catch(() => {
          reject()
        })
      })
    }
  }
}
</script>

<style lang="scss">
  @import "~@/styles/form.css";
  .tableContainer {
    margin-top: 20px;
  }
</style>
