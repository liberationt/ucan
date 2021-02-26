<template>
  <el-container>
    <el-main class="tableContainer">
      <el-form
        ref="form_base"
        key="form_base"
        :model="form"
        :rules="isEditForm?rulesForm:null"
        label-width="140px"
      >
        <el-tabs v-model="activeTabs">
          <!--基本信息tabs start-->
          <el-tab-pane label="基本信息" name="base">
            <el-collapse v-model="activeCollapse">
              <el-collapse-item name="baseItem_1">
                <template slot="title">
                  <div class="titleSlider">
                    <span>
                      <i class="titleTip" />基本信息
                    </span>
                  </div>
                </template>
                <el-row :gutter="0">
                  <el-col :md="adaptiveGrid.md" :lg="adaptiveGrid.lg">
                    <el-form-item :label="isEditForm?'姓名':'姓名：'" prop="fullName">
                      <el-input
                        v-if="isEditForm"
                        v-model="form.fullName"
                        clearable
                        placeholder="请输入姓名"
                        @keyup.enter.native="editContent('form_base')"
                      />
                      <span v-else>{{ form.fullName }}</span>
                    </el-form-item>
                  </el-col>
                  <el-col :md="adaptiveGrid.md" :lg="adaptiveGrid.lg">
                    <el-form-item :label="isEditForm?'性别':'性别：'" prop="sex">
                      <el-select
                        v-if="isEditForm"
                        v-model="form.sex"
                        placeholder="请选择性别"
                        filterable
                        clearable
                        style="width:100%;"
                        @keyup.enter.native="editContent('form_base')"
                      >
                        <el-option
                          v-for="item in sexOptions"
                          :key="item.dictValue"
                          :label="item.dictLabel"
                          :value="item.dictValue"
                        />
                      </el-select>
                      <span v-else>{{ form.sex=='0'?'男':form.sex=='1'?'女':'' }}</span>
                    </el-form-item>
                  </el-col>
                  <el-col :md="adaptiveGrid.md" :lg="adaptiveGrid.lg">
                    <el-form-item :label="isEditForm?'身份证号':'身份证号'" prop="idCard">
                      <el-input
                        v-if="isEditForm"
                        v-model="form.idCard"
                        clearable
                        placeholder="请输入身份证号"
                        @input="handleIdCardInput"
                        @keyup.enter.native="editContent('form_base')"
                      />
                      <span v-else>{{ form.idCard }}</span>
                    </el-form-item>
                  </el-col>
                  <el-col :md="adaptiveGrid.md" :lg="adaptiveGrid.lg">
                    <el-form-item :label="isEditForm?'出生日期':'出生日期：'" prop="birthday">
                      <el-date-picker
                        v-if="isEditForm"
                        v-model="form.birthday"
                        disabled
                        type="date"
                        placeholder="请选择出生日期"
                        style="width:100%;"
                        format="yyyy年MM月dd日"
                        value-format="yyyy-MM-dd"
                        @change="birthdayChange"
                        @keyup.enter.native="editContent"
                      />
                      <span v-else>{{ form.birthday }}</span>
                    </el-form-item>
                  </el-col>
                  <el-col :md="adaptiveGrid.md" :lg="adaptiveGrid.lg">
                    <el-form-item :label="isEditForm?'年龄':'年龄：'" prop="age">
                      <el-input
                        v-if="isEditForm"
                        v-model="form.age"
                        disabled
                        clearable
                        placeholder="请输入年龄"
                        @keyup.enter.native="editContent"
                      />
                      <span v-else>{{ form.age }}</span>
                    </el-form-item>
                  </el-col>
                  <el-col :md="adaptiveGrid.md" :lg="adaptiveGrid.lg">
                    <el-form-item :label="isEditForm?'手机号':'手机号：'" prop="mobile">
                      <el-input
                        v-if="isEditForm"
                        v-model="form.mobile"
                        clearable
                        placeholder="请输入手机号"
                        @keyup.enter.native="editContent"
                      />
                      <span v-else>{{ form.mobile }}</span>
                    </el-form-item>
                  </el-col>
                  <el-col :md="adaptiveGrid.md" :lg="adaptiveGrid.lg">
                    <el-form-item :label="isEditForm?'评估师等级':'评估师等级：'" prop="assessLevel">
                      <el-select
                        v-if="isEditForm"
                        v-model="form.assessLevel"
                        placeholder="请选择评估师等级"
                        filterable
                        clearable
                        style="width:100%;"
                        @keyup.enter.native="editContent"
                      >
                        <el-option
                          v-for="item in assessorOptions"
                          :key="item.dictValue"
                          :label="item.dictLabel"
                          :value="item.dictValue"
                        />
                      </el-select>
                      <span v-else>{{ form.assessLevelName }}</span>
                    </el-form-item>
                  </el-col>
                  <el-col :md="adaptiveGrid.md" :lg="adaptiveGrid.lg">
                    <el-form-item :label="isEditForm?'养老机构':'养老机构：'" prop="orgName">
                      <!-- <el-input
                        v-if="isEditForm"
                        v-model="form.orgName"
                        :disabled='isDisabled'
                        clearable
                        placeholder="请输入养老机构"
                        @keyup.enter.native="editContent"
                      /> -->
                      <el-select v-if="isEditForm" v-model="form.orgId" style="width:100%" :disabled="isDisabled" filterable clearable placeholder="请选择养老机构">
                        <el-option
                          v-for="item in options"
                          :key="item.orgId"
                          :label="item.orgName"
                          :value="item.orgId"
                        />
                      </el-select>
                      <span v-else>{{ form.orgName }}</span>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-collapse-item>
              <el-collapse-item name="baseItem_2">
                <template slot="title">
                  <div class="titleSlider">
                    <span>
                      <i class="titleTip" />住址信息
                    </span>
                  </div>
                </template>
                <el-row :gutter="0">
                  <el-col :md="adaptiveGrid.md" :lg="adaptiveGrid.lg">
                    <el-form-item
                      :label="isEditForm?'居住行政区划':'居住行政区划：'"
                    >
                      <Address
                        v-if="isEditForm"
                        :id-edit="idEdit"
                        :area-code="areaCode"
                        :form-code="form.liveArea"
                        :width="'100%'"
                        @getAreaCode="getAreaCode"
                        @keyup.enter.native="editContent"
                      />
                      <span v-else>{{ form.liveAreaName }}</span>
                    </el-form-item>
                  </el-col>
                  <el-col :md="adaptiveGrid.md" :lg="adaptiveGrid.lg">
                    <el-form-item
                      :label="isEditForm?'居住详细地址':'居住详细地址：'"
                    >
                      <el-input
                        v-if="isEditForm"
                        v-model.trim="form.liveAddr"
                        clearable
                        placeholder="请输入居住详细地址"
                        @keyup.enter.native="editContent"
                      />
                      <span v-else>{{ form.liveAddr }}</span>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-collapse-item>
              <!-- <el-collapse-item name="baseItem_3">
                <template slot="title">
                  <div class="titleSlider">
                    <span>
                      <i class="titleTip" />账户信息
                    </span>
                  </div>
                </template>
                <el-row :gutter="0">
                  <el-col :md="adaptiveGrid.md" :lg="adaptiveGrid.lg">
                    <el-form-item
                      :label="isEditForm?'账户名':'账户名：'"
                      prop="accountName"
                    >
                      <el-input
                        v-if="isEditForm"
                        v-model="form.accountName"
                        clearable
                        placeholder="请输入账户名"
                        @keyup.enter.native="editContent"
                      />
                      <span v-else>{{ form.accountName }}</span>
                    </el-form-item>
                  </el-col>
                  <el-col :md="adaptiveGrid.md" :lg="adaptiveGrid.lg">
                    <el-form-item
                      :label="isEditForm?'银行卡号':'银行卡号：'"
                      prop="bankAccount"
                    >
                      <el-input
                        v-if="isEditForm"
                        v-model.trim="form.bankAccount"
                        clearable
                        placeholder="请输入银行卡号"
                        @keyup.enter.native="editContent"
                      />
                      <span v-else>{{ form.bankAccount }}</span>
                    </el-form-item>
                  </el-col>
                  <el-col :md="adaptiveGrid.md" :lg="adaptiveGrid.lg">
                    <el-form-item
                      :label="isEditForm?'开户行':'开户行：'"
                      prop="openBankName"
                    >
                      <el-input
                        v-if="isEditForm"
                        v-model.trim="form.openBankName"
                        clearable
                        placeholder="请输入开户行"
                        @keyup.enter.native="editContent"
                      />
                      <span v-else>{{ form.openBankName }}</span>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-collapse-item> -->
            </el-collapse>
          </el-tab-pane>
        </el-tabs>
      </el-form>
      <el-footer>
        <div v-if="isEditForm" class="footerBtn">
          <el-button type="primary" class="base-btn btnMarginLeft15" @click="editContent('form_base')">确定</el-button>
          <el-button class="mr" @click="cancelDetailsPage">取消</el-button>
        </div>
      </el-footer>
    </el-main>
    <!-- v-if="dialogSubmit" -->
    <el-dialog

      v-dialogDrag
      title="绑定服务人员"
      :visible.sync="dialogSubmit"
      width="10%"
      :close-on-click-modal="false"
      @close="resetDialog"
    >
      <div>
        <div style="text-align:center;margin:50px 0;">
          <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="120px" class="demo-ruleForm">
            <el-form-item prop="censusArea" label="户籍区划：" />
            <el-form-item prop="censusAddr" label="户籍详细地址：">
              <el-input v-model="ruleForm.censusAddr" placeholder="请输入户籍详细地址" />
            </el-form-item>
          </el-form>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="resetDialog('ruleForm')">取 消</el-button>
        <el-button type="primary" @click="submitForm('ruleForm')">确 定</el-button>
      </span>
    </el-dialog>
  </el-container>
</template>
<script>
import Address from '@/components/Address'
import _ from 'lodash'
import { verifyFullName, verifyIdCard, verifyMobile } from '@/utils/validate'
import { allSelectdictionaryData } from '@/api/facilitiesConfig/pensionAgency'
import { closeSelectedTag } from '@/utils/rooterJump'
import { adaptiveGrid_max } from '@/common/index'
import { computerAge, getBirthdayFromIdCard } from '@/utils/index'
import { getAssessor, addAssessor, saveAssessor, getAssessorDetail, checkMobile, getEdit, getAssessOrgan } from '@/api/evaluationManagement/basicInformation'
export default {
  components: { Address },
  data() {
    // 检验手机号是否已经存在
    const verifyMobileIsExist = (rule, value, callback) => {
      checkMobile({
        mobile: value,
        empId: this.form.id
      }).then(res => {
        if (res.code === 0) {
          callback()
        } else {
          callback(new Error('该手机号已存在'))
        }
      })
    }
    // 校验所属居委
    const verifyAreaCode = (rule, value, callback) => {
      if (this.areaCode.length === 0 || this.areaCode[0] === '') {
        callback(new Error('居住行政区划不能为空，请选择！'))
      } else {
        callback()
      }
    }
    return {
      modelType: '',
      dialogSubmit: false,
      sexOptions: [],
      assessorOptions: [],
      idEdit: true,
      nationOptions: [],
      orgOptions: [],
      areaCode: [],
      isDisabled: false,
      options: [],
      ruleForm: {},
      rules: {},
      form: {
        id: '',
        fullName: '',
        sex: '',
        idCard: '',
        birthday: '',
        age: '',
        mobile: '',
        assessLevel: '',
        assessLevelName: '',
        orgId: '',
        orgName: '',
        liveArea: [],
        liveAreaName: '',
        liveAddr: '',
        accountName: '',
        bankAccount: '',
        openBankName: ''
      },
      isEditForm: true,
      activeTabs: 'base',
      activeCollapse: ['baseItem_1', 'baseItem_2', 'baseItem_3'],
      rulesForm: {
        fullName: [
          { required: true, trigger: 'blur', message: '姓名不能为空，请输入！' },
          // { trigger: 'blur', validator: verifyFullName }
          { min: 2, max: 10, message: '请输入正确格式的姓名', trigger: 'blur' }
        ],
        sex: [
          { required: true, trigger: 'change', message: '请选择性别！' }
        ],
        idCard: [
          { required: true, trigger: 'MANUAL_TRIGGER', message: '身份证不能为空，请输入！' },
          { trigger: 'MANUAL_TRIGGER', validator: verifyIdCard }
        ],
        mobile: [
          { required: true, trigger: 'blur', message: '请输入手机号！' },
          { trigger: 'blur', validator: verifyMobile },
          { trigger: 'blur', validator: verifyMobileIsExist }
        ],
        assessLevel: [
          { required: true, trigger: 'change', message: '请选择评估师等级！' }
        ],
        orgId: [
          { required: true, trigger: 'change', message: '请选择养老机构！' }
        ],
        liveArea: [
          { required: true, trigger: 'change', validator: verifyAreaCode }
        ],
        liveAddr: [
          { required: true, trigger: 'change', message: '请选择居住详细地址！' },
          { max: 100, message: '居住详细地址最多100字！', trigger: 'blur' }
        ],
        accountName: [
          { required: true, trigger: 'change', message: '请输入账户名！' },
          { max: 20, message: '账户名最多20字！', trigger: 'blur' }
        ],
        bankAccount: [
          { required: true, trigger: 'change', message: '请输入银行卡号！' },
          { trigger: 'blur', validator: (rule, value, callback) => {
            if (/^([1-9]{1})(\d{11}|\d{15}|\d{16}|\d{17}|\d{18})$/.test(value)) {
              callback()
            } else {
              callback(new Error('请输入正确的银行卡号'))
            }
          }
          }
        ],
        openBankName: [
          { required: true, trigger: 'change', message: '请输入开户行名称！' },
          { max: 50, message: '开户行名称最多50字！', trigger: 'blur' }
        ]
      },
      adaptiveGrid: {
        md: adaptiveGrid_max.md,
        lg: adaptiveGrid_max.lg
      }
    }
  },
  watch: {
    'form.birthday': function(val, oldVal) {
      if (val) {
        this.form.age = computerAge(this.form.birthday) + '岁'
      } else {
        this.form.age = ''
      }
    }
  },
  async mounted() {
    this.modelType = this.$route.query.modelType
    const _userId_ = this.$route.params.id || ''
    await this.getAssessOrgList()
    await this.getEditYseNo()
    await this.editAssessor(_userId_, this.modelType)
  },
  methods: {
    resetDialog() {

    },
    submitForm() {

    },
    birthdayChange() {},
    getAreaCode(val) {
      this.areaCode = val
    },
    getEditYseNo() {
      getEdit().then(res => {
        if (res.code == 0) {
          if (res.data === false) {
            this.isDisabled = true
            getAssessor().then(res => {
              if (res.code === 0) {
                this.form.orgId = res.data.org_id
                this.form.orgName = res.data.org_name
              }
            })
          } else {
            this.isDisabled = false
            // getAssessOrgan().then(res=>{
            //   if(res.code==0){
            //     this.options = res.data
            //   }
            // })
          }
        }
      })
    },
    getAssessOrgList() {
      getAssessOrgan().then(res => {
        if (res.code == 0) {
          this.options = res.data.list
        }
      })
    },
    editContent(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const params = _.cloneDeep(this.form)
          params.liveArea = this.areaCode.length === 0 ? '' : this.areaCode[this.areaCode.length - 1] + ''
          if (this.modelType === 'add') {
            addAssessor(params).then(res => {
              if (res.code === 0) {
                this.$message({
                  type: 'success',
                  message: '新增评估师保存成功!'
                })
                // 关闭页面，跳转到列表
                this.closeDetailsPage()
              } else {
                this.$message.error(res.msg)
              }
            }).catch(() => {
              // this.$message.error('新增评估师操作失败!')
            })
          } else if (this.modelType === 'edit') {
            saveAssessor(params).then(res => {
              if (res.code === 0) {
                this.$message({
                  type: 'success',
                  message: '评估师修改成功!'
                })
                // 关闭页面，跳转到列表
                this.closeDetailsPage()
              } else {
                this.$message.error(res.msg)
              }
            })
          }
        } else {
          return false
        }
      })
    },
    handleIdCardInput() {
      this.$refs['form_base'].validateField('idCard', (message) => {
        const valid = message === ''
        if (valid) {
          const idCard = this.form.idCard
          this.form.birthday = getBirthdayFromIdCard(idCard)
          // if (this.modelType == 'edit') {
          //   this.checkIdCardUnique()
          // } else if (this.modelType == 'add') {
          //   this.echoPersonByIdCard()
          // }
        } else {
          this.form.birthday = ''
          // if (this.modelType == 'edit') {
          //   this.form.birthday = ''
          // } else if (this.modelType == 'add') {
          //   if (this.form.id) {
          //     this.idEdit = false // 触发Address组件更新
          //     this.resetForm()
          //   } else {
          //     this.form.birthday = ''
          //   }
          // }
        }
      })
    },
    // 返回按钮，关闭详情页
    closeDetailsPage() {
      // 关闭页面
      closeSelectedTag(this, this.$route)
      this.$router.push('/evaluationManagement/basicInformation/assessor')
    },
    cancelDetailsPage() {
      this.$confirm(
        '该页面的信息尚未保存，确定要关闭页面吗',
        '提示',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }
      ).then(() => {
        this.closeDetailsPage()
      }).catch(() => {
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    async editAssessor(id, type) {
      await this.getSelect()
      if (type === 'add') {
        this.idEdit = false
        this.isEditForm = true
        // await getAssessor().then(res => {
        //   if (res.code === 0) {
        //     this.form.orgId = res.data.org_id
        //     this.form.orgName = res.data.org_name
        //   }
        // })
      } else if (type === 'edit') {
        this.isEditForm = true
        this.handelData(id)
      } else if (type === 'look') {
        this.isEditForm = false
        this.handelData(id)
      }
    },
    handelData(id) {
      getAssessorDetail(id).then(res => {
        if (res.code === 0) {
          this.form = res.data
          this.form.liveArea = res.data.liveArea ? res.data.liveArea.split(',') : ''
          this.form.birthday = getBirthdayFromIdCard(this.form.idCard)
          this.idEdit = false
        }
      })
    },
    getSelect() {
      const dictKey = [
        'sys_sex', // 性别
        'assessor_level'// 等级
      ].join(',')
      return new Promise((resolve, reject) => {
        allSelectdictionaryData(dictKey).then(response => {
          const dict = response.data
          for (const key in dict) {
            switch (key) {
              case 'sys_sex':
                this.sexOptions = dict[key]
                break
              case 'assessor_level':
                this.assessorOptions = dict[key]
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
<style lang="scss" scoped>
</style>
