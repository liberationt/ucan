<template>
  <el-container>
    <el-main class="tableContainer">
      <el-tabs v-model="activeTabs">
        <!--基本信息tabs start-->
        <!--服务信息tabs end-->
        <el-tab-pane label="基本信息" name="base">
          <el-collapse v-model="activeCollapse">
            <!--基本信息item start-->
            <el-collapse-item name="baseItem_1">
              <template slot="title">
                <div class="titleSlider">
                  <span>
                    <i class="titleTip" />基本信息
                  </span>
                </div>
              </template>
              <el-form
                ref="form_base"
                key="form_base"
                :model="form"
                :rules="isEditForm?rulesForm:null"
                label-width="120px"
              >
                <el-row :gutter="0">
                  <el-col :md="adaptiveGrid.md" :lg="adaptiveGrid.lg">
                    <el-form-item :label="isEditForm?'姓名':'姓名：'" prop="fullName">
                      <el-input
                        v-if="isEditForm"
                        ref="fullName"
                        v-model.trim="form.fullName"
                        :disabled="disabled"
                        clearable
                        placeholder="请输入姓名"
                        @keyup.enter.native="editContent"
                      />
                      <span v-else>{{ form.fullName }}</span>
                    </el-form-item>
                  </el-col>
                  <el-col :md="adaptiveGrid.md" :lg="adaptiveGrid.lg">
                    <el-form-item :label="isEditForm?'身份证':'身份证：'" prop="idCard">
                      <el-input
                        v-if="isEditForm"
                        ref="idCard"
                        v-model.trim="form.idCard"
                        :disabled="disabled"
                        clearable
                        placeholder="请输入身份证"
                        @input="handleIdCardInput"
                        @keyup.enter.native="editContent"
                      />
                      <span v-else>{{ form.idCard }}</span>
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
                        @keyup.enter.native="editContent"
                      >
                        <el-option
                          v-for="item in sexOptions"
                          :key="item.dictValue"
                          :label="item.dictLabel"
                          :value="item.dictValue"
                        />
                      </el-select>
                      <span v-else>{{ form.sexName }}</span>
                    </el-form-item>
                  </el-col>
                  <el-col :md="adaptiveGrid.md" :lg="adaptiveGrid.lg">
                    <el-form-item :label="isEditForm?'联系电话':'联系电话'" prop="mobile">
                      <el-input
                        v-if="isEditForm"
                        v-model.trim="form.mobile"
                        :disabled="disabled"
                        clearable
                        placeholder="请输入联系电话"
                        type="phone"
                        @keyup.enter.native="editContent"
                      />
                      <span v-else>{{ form.mobile }}</span>
                    </el-form-item>
                  </el-col>
                  <el-col :md="adaptiveGrid.md" :lg="adaptiveGrid.lg">
                    <el-form-item :label="isEditForm?'出生日期':'出生日期：'" prop="birthday">
                      <el-date-picker
                        v-if="isEditForm"
                        v-model="form.birthday"
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
                        ref="age"
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
                    <el-form-item :label="isEditForm?'文化程度':'文化程度：'" prop="eduLevel">
                      <el-select
                        v-if="isEditForm"
                        v-model="form.eduLevel"
                        placeholder="请选择文化程度"
                        clearable
                        style="width:100%;"
                        @keyup.enter.native="editContent"
                      >
                        <el-option
                          v-for="item in eduOptions"
                          :key="item.dictValue"
                          :label="item.dictLabel"
                          :value="item.dictValue"
                        />
                      </el-select>
                      <span v-else>{{ form.eduLevelName }}</span>
                    </el-form-item>
                  </el-col>
                  <el-col :md="adaptiveGrid.md" :lg="adaptiveGrid.lg">
                    <el-form-item :label="isEditForm?'户编号':'户编号'" prop="accountNo">
                      <el-input
                        v-if="isEditForm"
                        v-model.trim="form.accountNo"
                        :disabled="disabled"
                        clearable
                        placeholder="请输入户编号"
                        oninput="value=value.replace(/[^\d]/g,'')"
                        type="phone"
                        @keyup.enter.native="editContent"
                      />
                      <span v-else>{{ form.accountNo }}</span>
                    </el-form-item>
                  </el-col>
                  <el-col :md="adaptiveGrid.md" :lg="adaptiveGrid.lg">
                    <el-form-item :label="isEditForm?'人编号':'人编号'" prop="personNo">
                      <el-input
                        v-if="isEditForm"
                        v-model.trim="form.personNo"
                        :disabled="disabled"
                        clearable
                        oninput="value=value.replace(/[^\d]/g,'')"
                        placeholder="请输入人编号"
                        type="phone"
                        @keyup.enter.native="editContent"
                      />
                      <span v-else>{{ form.personNo }}</span>
                    </el-form-item>
                  </el-col>
                  <el-col :md="adaptiveGrid.md" :lg="adaptiveGrid.lg">
                    <el-form-item :label="isEditForm?'民族':'民族：'" prop="nation">
                      <el-select
                        v-if="isEditForm"
                        v-model="form.nation"
                        placeholder="请选择民族"
                        filterable
                        clearable
                        style="width:100%;"
                        @keyup.enter.native="editContent"
                      >
                        <el-option
                          v-for="item in nationOptions"
                          :key="item.dictValue"
                          :label="item.dictLabel"
                          :value="item.dictValue"
                        />
                      </el-select>
                      <span v-else>{{ form.nationName }}</span>
                    </el-form-item>
                  </el-col>
                  <el-col :md="adaptiveGrid.md" :lg="adaptiveGrid.lg">
                    <el-form-item :label="isEditForm?'健康状况':'健康状况：'" prop="healthStatus">
                      <el-select
                        v-if="isEditForm"
                        v-model="form.healthStatus"
                        placeholder="请选择健康状况"
                        clearable
                        style="width:100%;"
                        @keyup.enter.native="editContent"
                      >
                        <el-option
                          v-for="(item, index) in healthyOptions"
                          :key="index"
                          :label="item.dictLabel"
                          :value="item.dictValue ? item.dictValue : index"
                        />
                      </el-select>
                      <span v-else>{{ form.healthStatusName }}</span>
                    </el-form-item>
                  </el-col>
                  <el-col :md="adaptiveGrid.md" :lg="adaptiveGrid.lg">
                    <el-form-item :label="isEditForm?'劳动技能':'劳动技能：'" prop="laborSkill">
                      <el-select
                        v-if="isEditForm"
                        v-model="form.laborSkill"
                        placeholder="请选择劳动技能"
                        clearable
                        style="width:100%;"
                        @keyup.enter.native="editContent"
                      >
                        <el-option
                          v-for="item in skillOptions"
                          :key="item.dictValue"
                          :label="item.dictLabel"
                          :value="item.dictValue"
                        />
                      </el-select>
                      <span v-else>{{ form.laborSkillName }}</span>
                    </el-form-item>
                  </el-col>
                  <el-col :md="adaptiveGrid.md" :lg="adaptiveGrid.lg">
                    <el-form-item :label="isEditForm?'首次识别时间':'首次识别时间：'" prop="firstRecognitionDate">
                      <el-date-picker
                        v-if="isEditForm"
                        v-model="form.firstRecognitionDate"
                        type="date"
                        placeholder="请选择首次识别时间"
                        style="width:100%;"
                        format="yyyy年MM月dd日"
                        value-format="yyyy-MM-dd"
                        @keyup.enter.native="editContent"
                      />
                      <span v-else>{{ form.firstRecognitionDate }}</span>
                    </el-form-item>
                  </el-col>

                  <el-col :md="adaptiveGrid.md" :lg="adaptiveGrid.lg">
                    <el-form-item :label="isEditForm?'脱贫属性':'脱贫属性：'" prop="povertyAlleviation">
                      <el-select
                        v-if="isEditForm"
                        v-model="form.povertyAlleviation"
                        placeholder="请选择脱贫属性"
                        clearable
                        style="width:100%;"
                        @keyup.enter.native="editContent"
                      >
                        <el-option
                          v-for="(item, index) in povertyOptions"
                          :key="index"
                          :label="item.dictLabel"
                          :value="item.dictValue"
                        />
                      </el-select>
                      <span v-else>{{ form.povertyAlleviationName }}</span>
                    </el-form-item>
                  </el-col>
                  <el-col :md="adaptiveGrid.md" :lg="adaptiveGrid.lg">
                    <el-form-item :label="isEditForm?'脱贫年度':'脱贫年度：'" prop="povertyDate">
                      <el-select
                        v-if="isEditForm"
                        v-model="form.povertyDate"
                        placeholder="请选择脱贫年度"
                        clearable
                        style="width:100%;"
                        @keyup.enter.native="editContent"
                      >
                        <el-option
                          v-for="item in yearsOptions"
                          :key="item.dictValue"
                          :label="item.dictLabel"
                          :value="item.dictValue"
                        />
                      </el-select>
                      <span v-else>{{ form.povertyDateName }}</span>
                    </el-form-item>
                  </el-col>
                  <el-col :md="adaptiveGrid.md" :lg="adaptiveGrid.lg">
                    <el-form-item :label="isEditForm?'致贫原因':'致贫原因：'" prop="povertyCause">
                      <el-select
                        v-if="isEditForm"
                        v-model="form.povertyCause"
                        placeholder="请选择致贫原因"
                        clearable
                        style="width:100%;"
                        @keyup.enter.native="editContent"
                      >
                        <el-option
                          v-for="item in causesOptions"
                          :key="item.dictValue"
                          :label="item.dictLabel"
                          :value="item.dictValue"
                        />
                      </el-select>
                      <span v-else>{{ form.povertyCauseName }}</span>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-form>
            </el-collapse-item>
            <!--基本信息item end-->
            <!--住址信息item start-->
            <el-collapse-item name="baseItem_2">
              <template slot="title">
                <div class="titleSlider">
                  <span>
                    <i class="titleTip" />住址信息
                  </span>
                </div>
              </template>
              <el-form
                ref="form_address"
                key="form_address"
                :model="form"
                :rules="isEditForm?rulesForm:null"
                label-width="160px"
              >
                <el-row :gutter="0">
                  <el-col :md="adaptiveGrid_plus.md" :lg="adaptiveGrid_plus.lg">
                    <el-form-item
                      :label="isEditForm?'户籍行政区划':'户籍行政区划：'"
                      prop="censusArea"
                    >
                      <Address
                        v-if="isEditForm"
                        :id-edit="idEdit"
                        :area-code="areaCode[0]"
                        :form-code="form.censusArea"
                        :width="'100%'"
                        @getAreaCode="getAreaCode_reg"
                        @keyup.enter.native="editContent"
                      />
                      <span v-else>{{ form.censusAreaName }}</span>
                    </el-form-item>
                  </el-col>
                  <el-col :md="adaptiveGrid_plus.md" :lg="adaptiveGrid_plus.lg">
                    <el-form-item
                      :label="isEditForm?'户籍详细地址':'户籍详细地址：'"
                      prop="censusAddr"
                      :rules="rulesForm.censusAddr"
                    >
                      <el-input
                        v-if="isEditForm"
                        ref="censusAddr"
                        v-model.trim="form.censusAddr"
                        :disabled="disabled"
                        clearable
                        placeholder="请输入户籍详细地址"
                        @keyup.enter.native="editContent"
                      />
                      <span v-else>{{ form.censusAddr }}</span>
                    </el-form-item>
                  </el-col>
                  <el-col :md="adaptiveGrid_plus.md" :lg="adaptiveGrid_plus.lg">
                    <el-form-item
                      :label="isEditForm?'居住行政区划':'居住行政区划：'"
                      prop="liveArea"
                    >
                      <Address
                        v-if="isEditForm"
                        :id-edit="idEdit"
                        :area-code="areaCode[1]"
                        :form-code="form.liveArea"
                        :width="'100%'"
                        @getAreaCode="getAreaCode_live"
                        @keyup.enter.native="editContent"
                      />
                      <span v-else>{{ form.liveAreaName }}</span>
                    </el-form-item>
                  </el-col>
                  <el-col :md="adaptiveGrid_plus.md" :lg="adaptiveGrid_plus.lg">
                    <el-form-item
                      :label="isEditForm?'居住详细地址':'居住详细地址：'"
                      prop="liveAddr"
                      :rules="rulesForm.address"
                    >
                      <el-input
                        v-if="isEditForm"
                        ref="liveAddr"
                        v-model.trim="form.liveAddr"
                        :disabled="disabled"
                        clearable
                        placeholder="请输入居住详细地址"
                        @keyup.enter.native="editContent"
                      />
                      <span v-else>{{ form.liveAddr }}</span>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-form>
            </el-collapse-item>
          </el-collapse>
        </el-tab-pane>
        <!--基本信息tabs end-->
      </el-tabs>
      <el-footer style="text-align:right">
        <el-button class="cancel-btn btnMarginLeft15" @click="closeDetailsPage">取消</el-button>
        <el-button v-if="modelType!='look'" type="warning" class="base-btn btnMarginLeft15" @click="editContent('form_base')">确定</el-button>
      </el-footer>
    </el-main>
  </el-container>
</template>

<script>
import {
  userDetailsData,
  submitDataAdd,
  submitDataEdit
} from '@/api/userInfoConfig/elderInfo'
import {
  validateID,
  uniqueID,
  echoPerson
} from '@/api/userInfoConfig/index'
import {
  echoCheckInPeople
} from '@/api/facilitiesConfig/checkInPeople'
import {
  allSelectdictionaryData
} from '@/api/facilitiesConfig/pensionAgency'
import { adaptiveGrid_max, adaptiveGrid_plus } from '@/common/index'
import Address from '@/components/Address'
import {
  computerAge,
  getBirthdayFromIdCard,
  validateForms,
  scrollToTop,
  scrollToEl
} from '@/utils/index'
import {
  verifyFullName,
  verifyIdCard,
  verifyHomePhone,
  verifyMobile,
  verifyHomePhoneOrMobile
} from '@/utils/validate'
import { closeSelectedTag } from '@/utils/rooterJump'
import { transformNumber } from '@/utils/index'
// import { addPoor, editPoor} from '@/api/userInfoConfig/helpPoor'

import { getDetailData, addPoor, editPoor } from '@/api/userInfoConfig/poorInfor'

export default {
  components: { Address },
  data() {
    return {
      hasEdit: false,
      //   props: { multiple: true, checkStrictly: true },
      // 表单只能输入数字
      // tableRowIndex: '',//当前编辑的表格行号
      isEditForm: true, // 页面表单是否可编辑操作。查看时：false,编辑-新增时：true
      idEdit: true, // 区域级联下拉框是编辑时还是新增时。编辑时：false,新增时：true
      // 下拉框的数据
      sexOptions: [], // 性别
      nationOptions: [], // 民族
      eduOptions: [], // 文化
      healthyOptions: [], // 健康
      skillOptions: [], // 技能
      povertyOptions: [], // 脱贫
      causesOptions: [], // 致贫
      yearsOptions: [],
      // 表单
      form: {
        idCard: '', // 身份证
        fullName: '', // 姓名
        sex: '', // 性别
        sexName: '', // 性别（纯文本）
        birthday: '', // 出生日期（年龄不传，只传出生日期）
        age: '', // 年龄
        mobile: '',
        eduLevel: '',
        eduLevelName: '',
        nation: '',
        nationName: '',
        accountNo: '', // 户编号
        personNo: '',
        healthStatus: '',
        healthStatusName: '',
        laborSkill: '',
        laborSkillName: '',
        povertyAlleviation: '',
        povertyAlleviationName: '',
        firstRecognitionDate: '',
        povertyCause: '',
        povertyCauseName: '',
        povertyDate: '',
        povertyDateName: '',
        censusArea: '',
        censusAreaName: '',
        liveAddr: '',
        liveArea: '',
        liveAreaName: '',
        liveAreaCodeLevel: '',
        censusAddr: '',
        censusArea: '',
        censusAreaName: '',
        censusAreaCodeLevel: '',
        personId: ''
      },
      // 表格当前操作行的数据
      activeRowData: null,
      // form 表单的验证规则
      rulesForm: {
        // 姓名
        fullName: [
          { required: true, trigger: 'blur', message: '姓名不能为空，请输入！' },
          { trigger: 'blur', validator: verifyFullName }
        ],
        sex: [
          { required: true, trigger: 'change', message: '性别不能为空，请选择！' }
        ],
        // 身份证
        idCard: [
          // trigger 设置为 MANUAL_TRIGGER 是不让组件自动在 blur 的时候校验。
          // 手动在 blur 事件处理函数中处理。将校验和校验后的动作解耦。
          { required: true, trigger: 'MANUAL_TRIGGER', message: '身份证不能为空，请输入！' },
          { trigger: 'MANUAL_TRIGGER', validator: verifyIdCard },
          {
            trigger: 'MANUAL_TRIGGER', validator: (rule, value, callback) => {
              validateID(value).then(response => {
                if (response.code === 0) {
                  callback()
                } else {
                  if (response.msg === '该信息非当前企业拥有') {
                    callback('老人信息已存在，请重新输入。')
                  } else {
                    callback(response.msg)
                  }
                }
              }).catch(() => {
                callback(new Error('身份证检验接口调用失败！'))
              })
            }
          }
        ],
        // 手机号码
        mobile: [
          { trigger: 'blur', validator: verifyHomePhoneOrMobile }
        ],
        address: [
          { trigger: 'blur', max: 50, message: '详细地址长度不得超过50个字符，请重新输入！' }
        ]
      },
      disabled: false, // 表单是否可编辑
      activeTabs: 'base', // tab标签切换默认选中name参数
      activeCollapse: ['baseItem_1', 'baseItem_2', 'baseItem_3', 'baseItem_4', 'baseItem_5', 'baseItem_7', 'baseItem_8', , 'baseItem_9'], // 折叠面板默认打开name参数
      areaCodeOptions: [], // 行政区域树节点数据
      lazy: true, // 懒加载
      // 自适应
      adaptiveGrid: {
        md: adaptiveGrid_max.md,
        lg: adaptiveGrid_max.lg
      },
      // 自适应
      adaptiveGrid_plus: {
        md: adaptiveGrid_plus.md,
        lg: adaptiveGrid_plus.lg
      },
      flag: null, // 用来判断是表格添加时还是编辑时
      areaCode: [[], []], // 区域行政的全部ID
      modelType: '', // 查看：look  编辑：edit  新增：add
      editAuthority: false
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

  // 在模板渲染成html后调用，通常是初始化页面完成后，再对html的dom节点进行一些需要的操作。
  async mounted() {
    this.hasEdit = this.$route.query.hasEdit
    this.modelType = this.$route.query.modelType
    // 当前用户id
    const _userId_ = this.$route.params.id || ''
    await this.getSelect()
    if (this.modelType === 'look') {
      // 查看时，不要调用户信息接口，直接将表格行数据带来现实
      this.isEditForm = false
      // 请求当前用户信息
      getDetailData(_userId_).then(response => {
        this.formatData(response.data)
      }).catch(() => {
        this.$message.error('获取用户信息失败！')
      })
    } else {
      this.isEditForm = true
      this.getData(_userId_)
    }
  },
  methods: {
    // 异步事件同步化
    async getData(id) {
      if (this.modelType === 'edit') {
        await this.editGetData(id)
      } else if (this.modelType === 'add') {
        this.idEdit = false
      }
    },
    // 编辑获取数据
    editGetData(id) {
      return new Promise((resolve, reject) => {
        // 请求当前用户信息
        getDetailData(id).then(response => {
          this.formatData(response.data, 'edit')
          this.idEdit = false
        }).catch(() => {
          this.$message.error('获取用户信息失败！')
        })
      })
    },
    // 获取下拉字典
    getSelect() {
      const dictKey = [
        'sys_sex', // 性别
        'nation_type', // 民族
        'politics_status', // 政治面貌
        'edu_level', // 文化程度
        'physical_condition', // 健康
        'labor_skills',
        'poverty_alleviation', // 脱贫
        'causes_of_poverty', // 致贫
        'poverty_alleviation_year'
      ].join(',')
      return new Promise((resolve, reject) => {
        allSelectdictionaryData(dictKey).then(response => {
          const dict = response.data
          for (const key in dict) {
            switch (key) {
              case 'sys_sex':
                this.sexOptions = dict[key]
                break
              case 'nation_type':
                this.nationOptions = dict[key]
                break
              case 'edu_level':
                this.eduOptions = dict[key]
                break
              case 'physical_condition':
                this.healthyOptions = dict[key]
                break
              case 'labor_skills':
                this.skillOptions = dict[key]
                break
              case 'poverty_alleviation':
                this.povertyOptions = dict[key]
                break
              case 'causes_of_poverty':
                this.causesOptions = dict[key]
                break
              case 'poverty_alleviation_year':
                this.yearsOptions = dict[key]
                break
            }
          }
          resolve()
        }).catch(() => {
          reject()
        })
      })
    },
    tabsStep(tabsName) {
      this.activeTabs = tabsName
    },
    // 获取区域的值----户籍
    getAreaCode_reg(val) {
      this.areaCode[0] = val
    },
    // 获取区域的值----居住
    getAreaCode_live(val) {
      this.areaCode[1] = val
    },
    // 确定按钮-提交form表单
    editContent() {
      const formRefs = ['form_base', 'form_address'].map(key => this.$refs[key])
      validateForms(formRefs).then(() => {
        const _form = this.form
        _form.censusArea = this.areaCode[0].length === 0 ? '' : this.areaCode[0][this.areaCode[0].length - 1]
        _form.liveArea = this.areaCode[1].length === 0 ? '' : this.areaCode[1][this.areaCode[1].length - 1]
        if (_form.birthday === '') {
          _form.birthday = 'null'
        }
        // 新增
        if (this.modelType === 'add' && !this.form.personId) {
          addPoor(_form).then(response => {
            if (response.code === 0) {
              this.$message({
                type: 'success',
                message: '新增扶贫人员信息保存成功!'
              })
              // 关闭页面
              this.closeDetailsPage()
            } else {
              this.$message.error('新增扶贫人员信息操作失败，失败原因是：' + response.msg)
            }
          }).catch(() => {
            this.$message.error('新增扶贫人员信息操作失败!')
          })
        }
        // 编辑
        else if (this.modelType === 'edit' || (this.modelType === 'add' && this.form.personId)) {
          editPoor(_form).then(response => {
            if (response.code === 0) {
              this.$message({
                type: 'success',
                message: '编辑扶贫人员信息保存成功!'
              })
              // 关闭页面
              this.closeDetailsPage()
            } else {
              this.$message.error('编辑扶贫人员信息操作失败，失败原因是：' + response.msg)
            }
          }).catch(() => {
            this.$message.error('编辑扶贫人员信息操作失败!')
          })
        }
      }).catch(objectList => {
        this.activeTabs = 'base'
        scrollToTop()
      })
    },
    // 取消按钮
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
    // 返回按钮，关闭详情页
    closeDetailsPage() {
      // 关闭页面
      closeSelectedTag(this, this.$route)
      this.$router.push('/streetPlatform/userInfoConfig/poorInfor')
    },
    // 查看详情页面，点击编辑按钮
    toEditType() {
      this.$router.push({
        path: `/poorInfo/details/${this.$route.params.id}`,
        query: { 'modelType': 'edit', '_title': `编辑${this.form.fullName}`, 'menu': this.$route.query.menu }
      })
    },
    // 选择日期
    birthdayChange(val) {
      // 新增时，根据满足条件的身份证，自动补全出生日期
      if (this.form.idCard !== '') {
        const _birthday = getBirthdayFromIdCard(this.form.idCard)
        if (_birthday !== val) {
          this.$confirm('您选择的‘出生日期’与‘身份证的出生日期’不符合，是否修改？', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            if (val !== null) {
              this.form.birthday = val
            } else {
              this.form.birthday = ''
            }
          }).catch(() => {
            if (_birthday) {
              this.form.birthday = _birthday
            } else {
              this.form.birthday = ''
            }
            this.$message({
              type: 'info',
              message: '已取消操作！'
            })
          })
        }
      } else {
        if (val !== null) {
          this.form.birthday = val
        } else {
          this.form.birthday = ''
        }
      }
    },
    handleIdCardInput(value) {
      this.$refs['form_base'].validateField('idCard', (message) => {
        const valid = message == ''
        if (valid) {
          if (this.modelType == 'edit') {
            this.checkIdCardUnique()
          } else if (this.modelType == 'add') {
            this.echoPersonByIdCard()
          }
        } else {
          if (this.modelType == 'edit') {
            this.form.birthday = ''
          } else if (this.modelType == 'add') {
            if (this.form.id) {
              this.idEdit = false // 触发Address组件更新
              this.resetForm()
            } else {
              this.form.birthday = ''
            }
          }
        }
      })
    },
    // 重置所有表单
    resetForm() {
      this.form.id = ''
      this.$refs.form_base.resetFields()
      this.$refs.form_address.resetFields()
      this.areaCode = [[], []]
    },
    checkIdCardUnique() {
      const _params = {
        id: this.form.id || '',
        idCard: this.form.idCard
      }
      uniqueID(_params).then(response => {
        if (response === 0) {
          this.form.birthday = getBirthdayFromIdCard(this.form.idCard)
        } else {
          this.form.idCard = ''
          this.form.birthday = ''
          this.$message.error('该身份证号已存在，请重新输入!')
        }
      }).catch(() => {
        this.form.birthday = ''
        this.$message.error('身份证唯一性校验接口请求失败！')
      })
    },
    echoPersonByIdCard() {
      const idCard = this.form.idCard
      // 身份证校验成功后，调用用户信息回显接口
      echoPerson(idCard, 'P').then(response => {
        if (response.id === '-1') {
          // 身份证没有对应用户，再检查身份证有没有对应入住人员，若有，将入住人员的
          // 信息填入老人中，否则，重置表单，填入idCard，自动补全出生日期
          echoCheckInPeople(idCard).then(response => {
            const data = response.data
            // 只有入住人员的数据没有personId才补全信息
            if (response.code === 0 && data && !data.personId) {
              this.form.birthday = data.birthday
              this.form.fullName = data.fullName
              this.form.sex = data.sex
            } else {
              if (this.form.id) {
                this.resetForm()
                this.form.idCard = idCard
              }
              this.form.birthday = getBirthdayFromIdCard(idCard)
            }
          }).catch(err => {
            this.$message.error('身份证载入数据接口请求失败！')
          })
        } else {
          this.$confirm('该身份证号已有对应人员信息，是否加载？', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            // 身份证存在，回填表单数据
            this.idEdit = true // 触发Address组件更新
            // this.resetForm();
            this.formatData(response, 'add')
          }).catch(err => {
            this.form.idCard = ''
          })
        }
      }).catch(error => {
        this.$message.error('身份证载入数据接口请求失败！')
      })
    },
    // 处理接口数据供表单使用
    formatData(response, type) {
      response.liveArea = response.liveAreaCodeLevel != null && response.liveAreaCodeLevel != '' ? response.liveAreaCodeLevel.split(',') : []
      response.censusArea = response.censusAreaCodeLevel != null && response.censusAreaCodeLevel != '' ? response.censusAreaCodeLevel.split(',') : []
      for (const key in this.form) {
        this.form[key] = response[key]
      }
      if (type == 'add') {
        this.form.personId = response.id
      }
      if (!this.form.birthday) {
        this.form.birthday = getBirthdayFromIdCard(this.form.idCard)
      }
    }
  }
}
</script>

<style scoped>
  @import "~@/styles/form.css";

  .tableContainer {
    margin-top: 20px;
  }

  .titleSlider {
    width: 100%;
    height: 100%;
    position: relative;
  }

  .titleSlider > span {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1;
    background-color: #fff;
    padding: 0 10px 0 20px;
    height: 47px;
    font-size:16px;
    font-weight: 600;
  }

  .titleSlider > span .titleTip {
    position: absolute;
    top: 50%;
    left: 10px;
    margin-top: -9px;
    width: 3px;
    height: 18px;
    background-color: #0078D4;
    display: inline-block;
  }

  .titleSlider::before {
    position: absolute;
    top: 50%;
    left: 0;
    width: 100%;
    height: 1px;
    border-top: 1px dashed #E1E1E1;
    content: '';
  }

  table tr:nth-child(even) {
    background-color: transparent;
  }

  .el-collapse-item__arrow {
    margin-right: 30px !important;
  }

  .el-footer {
    padding-top: 24px;
    padding-right: 0;
  }

  .el-footer > div {
    overflow: hidden;
  }

  .el-footer > div > button {
    float: right;
  }

  .base-btn {
    margin-left: 15px;
  }

  .cancel-btn {
    border: 1px solid #2b579a;
    color: #2b579a;
  }

  .remarkSpan {
    padding: 10px 20px;
    margin: 0;
  }

  /*.XXX{margin-bottom: 16px !important;}*/
  /*.XXX .el-form-item__error{width: 200px;}*/
</style>
