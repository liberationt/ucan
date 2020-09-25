<!--志愿者管理-->
<template>
  <el-container>
    <el-main class="tableContainer">
      <el-tabs v-model="activeTabs">
        <!--基本信息tabs start-->
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
                class="cesi"
                :rules="this.isEditForm?rulesForm:null"
                label-width="140px"
              >
                <el-row :gutter="0">
                  <el-col :md="this.adaptiveGrid.md" :lg="this.adaptiveGrid.lg">
                    <el-form-item :label="this.isEditForm?'姓名':'姓名：'" prop="fullName">
                      <el-input
                        v-if="this.isEditForm"
                        ref="fullName"
                        v-model="form.fullName"
                        clearable
                        placeholder="请输入姓名"
                        @keyup.enter.native="editContent('form_base')"
                      />
                      <span v-else>{{ form.fullName }}</span>
                    </el-form-item>
                  </el-col>
                  <el-col :md="this.adaptiveGrid.md" :lg="this.adaptiveGrid.lg">
                    <el-form-item :label="this.isEditForm?'证件类别':'证件类别：'" prop="idType">
                      <el-select
                        v-if="this.isEditForm"
                        ref="idType"
                        v-model="form.idType"
                        placeholder="请选择证件类别"
                        clearable
                        style="width:100%;"
                      >
                        <el-option
                          v-for="item in idTypeOptions"
                          :key="item.dictValue"
                          :label="item.dictLabel"
                          :value="item.dictValue"
                        />
                      </el-select>
                      <span v-else>{{ form.idTypeName }}</span>
                    </el-form-item>
                  </el-col>
                  <el-col :md="this.adaptiveGrid.md" :lg="this.adaptiveGrid.lg">
                    <el-form-item :label="this.isEditForm?'证件号码':'证件号码：'" prop="idCard">
                      <el-input
                        v-if="this.isEditForm"
                        ref="idCard"
                        v-model="form.idCard"
                        clearable
                        placeholder="请输入证件号"
                        @input="handleIdCardInput"
                        @keyup.enter.native="editContent('form_base')"
                      />
                      <span v-else>{{ form.idCard }}</span>
                    </el-form-item>
                  </el-col>
                  <el-col :md="this.adaptiveGrid.md" :lg="this.adaptiveGrid.lg">
                    <el-form-item :label="this.isEditForm?'性别':'性别：'" prop="sex">
                      <el-select
                        v-if="this.isEditForm"
                        v-model="form.sex"
                        placeholder="请选择性别"
                        clearable
                        style="width:100%;"
                        @keyup.enter.native="editContent('form_base')"
                      >
                        <el-option label="男" name="0" value="0" />
                        <el-option label="女" name="1" value="1" />
                      </el-select>
                      <span v-else>{{ form.sexName }}</span>
                    </el-form-item>
                  </el-col>
                  <el-col :md="this.adaptiveGrid.md" :lg="this.adaptiveGrid.lg">
                    <el-form-item :label="this.isEditForm?'出生日期':'出生日期：'" prop="birthday">
                      <el-date-picker
                        v-if="this.isEditForm"
                        v-model="form.birthday"
                        edit-disabled
                        type="date"
                        format="yyyy-MM-dd"
                        value-format="yyyy-MM-dd"
                        placeholder="请选择出生日期"
                        style="width:100%;"
                        :disabled="this.form.idType === 'id_card'&&this.modelType === 'edit'?true:false"
                        @keyup.enter.native="editContent('form_base')"
                        @change="birthdayChange"
                      />
                      <span v-else>{{ form.birthday }}</span>
                    </el-form-item>
                  </el-col>
                  <el-col :md="this.adaptiveGrid.md" :lg="this.adaptiveGrid.lg">
                    <el-form-item :label="this.isEditForm?'年龄':'年龄：'" prop="age">
                      <el-input
                        v-if="this.isEditForm"
                        ref="age"
                        v-model="age"
                        disabled
                        oninput="value=value.replace(/[^\d]/g,'')"
                        clearable
                        :placeholder="age?'自动计算':'请输入年龄'"
                        @keyup.enter.native="editContent('form_base')"
                      />
                      <span v-else>{{ age?age+'岁':age }}</span>
                    </el-form-item>
                  </el-col>
                  <el-col :md="this.adaptiveGrid.md" :lg="this.adaptiveGrid.lg">
                    <el-form-item :label="this.isEditForm?'婚姻状况':'婚姻状况：'" prop="maritalStatus">
                      <el-select
                        v-if="this.isEditForm"
                        ref="maritalStatus"
                        v-model="form.maritalStatus"
                        placeholder="请选择婚姻状况"
                        clearable
                        style="width:100%;"
                      >
                        <el-option
                          v-for="item in maritalStatusOptions"
                          v-if="maritalStatusOptions.length !== 0"
                          :key="item.dictValue"
                          :label="item.dictLabel"
                          :value="item.dictValue"
                        />
                      </el-select>
                      <span v-else>{{ form.maritalStatusName }}</span>
                    </el-form-item>
                  </el-col>
                  <el-col :md="this.adaptiveGrid.md" :lg="this.adaptiveGrid.lg">
                    <el-form-item :label="this.isEditForm?'家庭电话':'家庭电话：'" prop="homePhone">
                      <el-input
                        v-if="this.isEditForm"
                        ref="homePhone"
                        v-model="form.homePhone"
                        clearable
                        placeholder="请输入家庭电话"
                        @keyup.enter.native="editContent('form_base')"
                      />
                      <span v-else>{{ form.homePhone }}</span>
                    </el-form-item>
                  </el-col>
                  <el-col :md="this.adaptiveGrid.md" :lg="this.adaptiveGrid.lg">
                    <el-form-item :label="this.isEditForm?'手机号码':'手机号码：'" prop="mobile">
                      <el-input
                        v-if="this.isEditForm"
                        ref="mobile"
                        v-model="form.mobile"
                        clearable
                        placeholder="请输入手机号码"
                        @keyup.enter.native="editContent('form_base')"
                      />
                      <span v-else>{{ form.mobile }}</span>
                    </el-form-item>
                  </el-col>
                  <el-col v-if="modelType!='add'" :md="this.adaptiveGrid.md" :lg="this.adaptiveGrid.lg">
                    <el-form-item :label="this.isEditForm?'结对志愿者':'结对志愿者：'" prop="volunteerName">
                      <el-input
                        v-if="this.isEditForm"
                        ref="volunteerName"
                        v-model="form.volunteerName"
                        disabled
                        clearable
                        @keyup.enter.native="editContent('form_base')"
                      />
                      <span v-else>{{ form.volunteerName }}</span>
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
                :rules="this.isEditForm?rulesForm:null"
                label-width="140px"
              >
                <el-row :gutter="0">
                  <el-col :md="this.adaptiveGrid.md" :lg="this.adaptiveGrid.lg">
                    <el-form-item :label="this.isEditForm?'居住行政区划':'居住行政区划：'" prop="liveArea">
                      <Address
                        v-if="this.isEditForm"
                        :id-edit="idEdit"
                        :area-code="liveArea"
                        :form-code="form.liveArea"
                        :width="'100%'"
                        @keyup.enter.native="editContent('form_base')"
                        @getAreaCode="getAreaCode_reg"
                      />
                      <span v-else>{{ form.liveAreaName }}</span>
                    </el-form-item>
                  </el-col>
                  <el-col :md="this.adaptiveGrid.md" :lg="this.adaptiveGrid.lg">
                    <el-form-item :label="this.isEditForm?'居住详细地址':'居住详细地址：'" prop="liveAddr">
                      <el-input
                        v-if="this.isEditForm"
                        ref="liveAddr"
                        v-model="form.liveAddr"
                        clearable
                        placeholder="请输入居住详细地址"
                        @keyup.enter.native="editContent('form_base')"
                      />
                      <span v-else>{{ form.liveAddr }}</span>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-form>
            </el-collapse-item>
            <!--住址信息item end-->

            <!--标签信息item start-->
            <el-collapse-item name="baseItem_3">
              <template slot="title">
                <div class="titleSlider">
                  <span>
                    <i class="titleTip" />标签信息
                  </span>
                </div>
              </template>
              <el-form
                ref="form_tips"
                key="form_tips"
                :model="form"
                :rules="this.isEditForm?rulesForm:null"
                label-width="140px"
              >
                <el-row :gutter="0">
                  <el-col :md="this.adaptiveGrid.md" :lg="this.adaptiveGrid.lg">
                    <el-form-item :label="this.isEditForm?'居住状况':'居住状况：'" prop="liveStatus">
                      <el-select
                        v-if="this.isEditForm"
                        ref="liveStatus"
                        v-model="form.liveStatus"
                        placeholder="请选择居住状况"
                        clearable
                        style="width:100%;"
                      >
                        <el-option
                          v-for="item in liveStatusOptions"
                          v-if="liveStatusOptions.length !== 0"
                          :key="item.dictValue"
                          :label="item.dictLabel"
                          :value="item.dictValue"
                        />
                      </el-select>
                      <span v-else>{{ form.liveStatusName }}</span>
                    </el-form-item>
                  </el-col>
                  <el-col :md="this.adaptiveGrid.md" :lg="this.adaptiveGrid.lg">
                    <el-form-item :label="this.isEditForm?'救助类别':'救助类别：'" prop="helpType">
                      <el-select
                        v-if="this.isEditForm"
                        ref="helpType"
                        v-model="form.helpType"
                        multiple
                        placeholder="请选择救助类别"
                        clearable
                        style="width:100%;"
                      >
                        <el-option
                          v-for="item in helpTypeOptions"
                          v-if="helpTypeOptions.length !== 0"
                          :key="item.dictValue"
                          :label="item.dictLabel"
                          :value="item.dictValue"
                        />
                      </el-select>
                      <span v-else>{{ form.helpTypeName }}</span>
                    </el-form-item>
                  </el-col>
                  <el-col :md="this.adaptiveGrid.md" :lg="this.adaptiveGrid.lg">
                    <el-form-item :label="this.isEditForm?'残疾相关属性':'残疾相关属性：'" prop="defoType">
                      <el-select
                        v-if="this.isEditForm"
                        ref="defoType"
                        v-model="form.defoType"
                        placeholder="请选择残疾相关属性"
                        clearable
                        style="width:100%;"
                      >
                        <el-option
                          v-for="item in defoTypeOptions"
                          v-if="defoTypeOptions.length !== 0"
                          :key="item.dictValue"
                          :label="item.dictLabel"
                          :value="item.dictValue"
                        />
                      </el-select>
                      <span v-else>{{ form.defoTypeName }}</span>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-form>
            </el-collapse-item>
            <!--标签信息item end-->

            <!--备注item start-->
            <el-collapse-item name="baseItem_4">
              <template slot="title">
                <div class="titleSlider">
                  <span>
                    <i class="titleTip" />备注
                  </span>
                </div>
              </template>
              <el-form
                ref="form_remake"
                key="form_remake"
                :model="form"
                :rules="this.isEditForm?rulesForm:null"
                label-width="0px"
              >
                <el-row :gutter="0">
                  <el-col :span="24">
                    <el-form-item prop="remark">
                      <el-input
                        v-if="this.isEditForm"
                        ref="remark"
                        v-model="form.remark"
                        type="textarea"
                        :rows="5"
                        placeholder="请输入备注"
                        maxlength="200"
                        show-word-limit
                      />
                      <span v-else class="remarkSpan">{{ form.remark }}</span>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-form>
            </el-collapse-item>
            <!--备注item end-->

          </el-collapse>
        </el-tab-pane>
        <!--基本信息tabs end-->
      </el-tabs>

      <!--新增时,编辑时-->
      <el-footer v-if="this.modelType === 'add' || this.modelType === 'edit'">
        <div>
          <el-button type="warning" class="base-btn btnMarginLeft15" @click="editContent('form_base')">确定
          </el-button>
          <el-button class="cancel-btn btnMarginLeft15" @click="cancelDetailsPage">取消</el-button>
        </div>
      </el-footer>
      <!--查看时-->
      <el-footer v-if="this.modelType === 'look'">
        <div>
          <el-button v-if="editAuthority" type="warning" class="base-btn btnMarginLeft15" @click="toEditType">
            编辑
          </el-button>
          <el-button class="cancel-btn btnMarginLeft15" @click="closeDetailsPage">返回</el-button>
        </div>
      </el-footer>

    </el-main>
  </el-container>
</template>

<script>
import _ from 'lodash'
import {
  userDetailsData,
  submitDataAdd,
  submitDataEdit
} from '@/api/sidekickProjectConfig/volunteerServiceObject'
import { allSelectdictionaryData } from '@/api/facilitiesConfig/communityFacilities'
import { adaptiveGrid_max, adaptiveGrid_plus } from '@/common/index'
import Address from '@/components/Address'
import { closeSelectedTag } from '@/utils/rooterJump'
import { getEditAuthority } from '@/api/user'
import QuillEditor from '@/components/QuillEditor'
import {
  verifyFullName,
  verifyHomePhone,
  // verifyMobile
  verifyHomePhoneOrMobile
} from '@/utils/validate'
import {
  validateID,
  uniqueID,
  echoPerson
} from '@/api/userInfoConfig/index'
import {
  validateForms,
  scrollToTop,
  scrollToEl,
  computerAge,
  getBirthdayFromIdCard,
  limitTextEllipsis
} from '@/utils/index'
import {
  validateVolunteerManagementID
} from '@/api/sidekickProjectConfig/volunteerManagement'

export default {
  components: { Address, QuillEditor },
  data() {
    // 身份证校验
    const verifyIdCard1 = (rule, value, callback) => {
      const reg = /(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}$)/
      const regs = /^[HM]\d{10}$/ // 回乡证
      const regx = /^.{3,30}$/ // 台胞证
      // [a-zA-Z]|[0-9]{3,30}\([0-9Aa]\)
      const regxg = /^.{3,30}$/ // 护照
      if (this.form.idType == 'id_card') {
        if (reg.test(value) && value !== '') {
          callback()
        } else {
          return callback(new Error('请输入正确的身份证号码！'))
        }
      }
      if (this.form.idType == 'passport') {
        if (regxg.test(value) && value !== '') {
          callback()
        } else {
          return callback(new Error('请输入正确的护照！'))
        }
      }
      if (this.form.idType == 'homecoming_permit') {
        if (regs.test(value) && value !== '') {
          callback()
        } else {
          return callback(new Error('请输入正确的回乡证'))
        }
      }
      if (this.form.idType == 'mtps') {
        if (regx.test(value) && value !== '') {
          callback()
        } else {
          return callback(new Error('请输入正确的台胞证！'))
        }
      }
    }
    return {
      // 下拉框字典数据
      maritalStatusOptions: [], // 婚姻状况
      liveStatusOptions: [], // 居住状况
      helpTypeOptions: [], // 救助类别
      defoTypeOptions: [], // 残疾相关属性
      idTypeOptions: [], // 证件类别
      isEditForm: true, // 页面表单是否可编辑操作。查看时：false,编辑-新增时：true
      idEdit: true, // 区域级联下拉框是编辑时还是新增时。编辑时：false,新增时：true

      // 机构类型的字段配置
      institutionField: [
        { children: [] },
        { children: [] },
        { children: [] }
      ],

      // 表单
      form: {
        fullName: '', // 姓名
        maritalStatusName: '', // 婚姻状况
        maritalStatus: '', // 婚姻状况
        liveStatus: '', // 居住状况
        liveStatusName: '', // 居住状况
        helpType: [], // 救助类别
        helpTypeName: '', // 救助类别
        defoType: '', // 残疾相关属性
        defoTypeName: '', // 残疾相关属性
        idCard: '', // 身份证号
        sex: '', // 性别
        sexName: '',
        birthday: '', // 出生日期
        homePhone: '', // 家庭电话
        mobile: '', // 手机号码
        liveAddr: '', // 居住详细地址
        liveArea: [], // 居住区划
        liveAreaName: '', // 居住区划
        remark: '', // 备注
        id: '',
        volunteerName: '',
        idType: 'id_card'
      },
      age: '', // 年龄
      loading: false,
      editorOption: {},
      // form 表单的验证规则
      rulesForm: {
        // 姓名
        fullName: [
          { required: true, trigger: 'blur', message: '姓名不能为空，请输入！' },
          { required: true, trigger: 'change', message: '姓名不能为空，请输入！' }
        ],
        // 身份证
        idCard: [
          // trigger 设置为 MANUAL_TRIGGER 是不让组件自动在 blur 的时候校验。
          // 手动在 blur 事件处理函数中处理。将校验和校验后的动作解耦。
          // {required: true, trigger: 'blur', message: '身份证不能为空，请输入！'},
          { required: true, trigger: 'blur', validator: verifyIdCard1 }
        ],
        // 居住情况
        liveStatus: [
          { required: true, trigger: 'change', message: '居住情况不能为空，请选择！' }
        ],
        liveArea: [
          { required: true, trigger: 'change', message: '居住行政区划不能为空，请选择！' }
        ],
        // 家庭电话
        homePhone: [
          { trigger: 'change', validator: verifyHomePhone }
        ],
        // 家庭电话
        mobile: [
          { trigger: 'change', validator: verifyHomePhoneOrMobile }
        ],
        idType: [
          { required: true, trigger: 'change', message: '请选择证件类别 ！' }
        ]
      },

      activeTabs: 'base', // tab标签切换默认选中name参数
      activeCollapse:
					['baseItem_1', 'baseItem_2', 'baseItem_3', 'baseItem_4', 'baseItem_5', 'baseItem_6'], // 折叠面板默认打开name参数

      // 自适应
      adaptiveGrid: {
        md: adaptiveGrid_max.md,
        lg: adaptiveGrid_max.lg
      },
      // 自适应
      adaptiveGrid_plus: {
        md: adaptiveGrid_plus.md,
        lg:
					adaptiveGrid_plus.lg
      },

      modelType: '', // 查看：look  编辑：edit  新增：add
      instituType: '', // 机构类型
      editAuthority: false, // 编辑按钮的权限
      liveArea: [], // 所属居委全部ID

      editDisabled: true// 编辑时，出生日期不可编辑
    }
  },
  // 在模板渲染成html后调用，通常是初始化页面完成后，再对html的dom节点进行一些需要的操作。
  mounted() {
    this.modelType = this.$route.query.modelType
    // 当前机构id
    const _userId_ = this.$route.query.id || ''
    this.getData(_userId_)

    if (this.modelType === 'look') {
      /* 编辑按钮的权限控制*/
      getEditAuthority(this.$route.query.editAuthority).then(response => {
        response.forEach((item) => {
          if (item.menuName === '编辑') {
            this.editAuthority = item.visible === '0'
          }
        })
      }).catch(() => {
        this.$message.error('获取编辑按钮的权限控制失败！')
      })
    }
  },
  methods: {
    // 异步事件同步化
    async getData(id) {
      await this.getSelect()
      if (this.modelType === 'edit') {
        this.isEditForm = true
        this.editDisabled = false
        await this.editGetData(id, 'edit')
      } else if (this.modelType === 'add') {
        this.isEditForm = true
        this.idEdit = false
        this.editDisabled = true
      } else if (this.modelType === 'look') {
        this.isEditForm = false
        await this.editGetData(id, '')
      }
    },
    // 编辑-查看 获取数据
    editGetData(id, st) {
      return new Promise((resolve, reject) => {
        // 请求当前服务项目信息
        userDetailsData(id, st).then(response => {
          // 页面form表单的值
          this.form = response
          if (this.modelType === 'edit') {
            this.form.liveArea = this.form.liveArea ? this.form.liveArea.split(',') : []
            this.form.helpType = this.form.helpType ? this.form.helpType.split(',') : []
          }
          if (this.form.birthday) {
            this.age = computerAge(this.form.birthday)
          }
          this.idEdit = false
        }).catch(() => {
          this.$message.error('获取志愿者服务对象信息失败！')
        })
      })
    },
    // 获取下拉字典
    getSelect() {
      return new Promise((resolve, reject) => {
        // 数据字典接口
        const dicKey = 'biz_marital_status,obj_live_status,obj_help_type,defo_related_attr,credentials_type'
        allSelectdictionaryData(dicKey).then(response => {
          if (response.code === 0) {
            for (const k in response.data) {
              switch (k) {
                // 婚姻状况
                case 'biz_marital_status':
                  this.maritalStatusOptions = response.data[k]
                  break
                  // 居住状况
                case 'obj_live_status':
                  this.liveStatusOptions = response.data[k]
                  break
                  // 救助类别
                case 'obj_help_type':
                  this.helpTypeOptions = response.data[k]
                  break
                  // 残疾相关属性
                case 'defo_related_attr':
                  this.defoTypeOptions = response.data[k]
                  break
                case 'credentials_type':
                  this.idTypeOptions = response.data[k]
                  break
              }
            }
          } else {
            this.$message.error('数据字典接口请求失败！')
          }
          resolve()
        }).catch(() => {
          this.$message.error('数据字典接口请求失败！')
          reject()
        })
      })
    },
    // 取消按钮
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
    // 取消，返回按钮，关闭详情页
    closeDetailsPage() {
      // 关闭页面
      closeSelectedTag(this, this.$route)
      this.$router.push({ path: '/sidekickProjectConfig/volunteerServiceObject' })
    },
    // 下一步
    tabsStep(tabsName) {
      this.activeTabs = tabsName
    },
    // 确定按钮-提交表单
    editContent(formName) {
      const formRefs = ['form_base', 'form_address', 'form_tips'].map(key => this.$refs[key])
      validateForms(formRefs).then(() => {
        const params = this.form
        params.liveArea = this.liveArea.length === 0 ? '' : this.liveArea[this.liveArea.length - 1] + ''
        params.helpType = this.form.helpType ? this.form.helpType.join(',') : ''

        const _title_ = limitTextEllipsis(this.form.fullName, 10)

        // 新增
        if (this.modelType === 'add') {
          submitDataAdd(params).then(response => {
            if (response.code === 0) {
              this.$message({
                type: 'success',
                message: '新增‘' + _title_ + '’志愿者服务对象成功!'
              })
              // 关闭页面
              this.closeDetailsPage()
            } else {
              this.$message.error(response.msg)
            }
          }).catch(() => {
            this.$message.error('新增‘' + _title_ + '’志愿者服务对象失败!')
          })
        }
        // 编辑
        else if (this.modelType === 'edit') {
          submitDataEdit(params).then(response => {
            if (response.code === 0) {
              this.$message({
                type: 'success',
                message: '编辑‘' + _title_ + '’志愿者服务对象成功!'
              })
              // 关闭页面
              this.closeDetailsPage()
            } else {
              this.$message.error(response.msg)
            }
          }).catch(() => {
            this.$message.error('编辑‘' + _title_ + '’志愿者服务对象失败!')
          })
        }
        // 查看
        else if (this.modelType === 'look') {
          // 关闭页面
          this.closeDetailsPage()
        }
      }).catch(objectList => {
        scrollToTop()
      })
    },
    // 查看详情页面，点击编辑按钮
    toEditType() {
      const _title_ = limitTextEllipsis(this.form.fullName, 10)
      const _id_ = this.$route.query.id
      this.$router.push({
        path: `/volunteerServiceObject/details/${_id_}`,
        query: { 'id': _id_, 'modelType': 'edit', '_title': `编辑${_title_}` } // modelType: 查看:look，编辑:edit，新增:add的类型
      })
    },
    // 获取所属居委
    getAreaCode_reg(val) {
      this.liveArea = val
      this.form.liveArea = val.length === 0 ? '' : this.liveArea[this.liveArea.length - 1] + ''
    },
    //* ***************************************************身份证校验start************************************************
    // 身份证input事件
    handleIdCardInput() {
      this.$refs['form_base'].validateField('idCard', (message) => {
        const valid = message === ''
        if (valid) {
          const _birthday = getBirthdayFromIdCard(this.form.idCard)
          this.form.birthday = _birthday
          this.age = computerAge(_birthday)
          // echoPerson(this.form.idCard, '').then(response => {
          //   // 身份证校验成功，回显数据
          //   if (response) {
          //     if (response.id !== '-1') {
          //       const _birthday = getBirthdayFromIdCard(this.form.idCard)
          //       this.form.birthday = _birthday
          //       this.age = computerAge(_birthday)
          //       this.$confirm('该身份证号已有对应人员信息，是否加载？', '提示', {
          //         confirmButtonText: '确定',
          //         cancelButtonText: '取消',
          //         type: 'warning'
          //       }).then(() => {
          //         response.id = ''
          //         const baseID = this.form.id
          //         this.form = _.cloneDeep(response)
          //         this.form.id = baseID
          //         this.form.liveAddr = response.liveAddr// 居住详细地址
          //         this.form.liveArea = response.liveAreaCodeLevel ? response.liveAreaCodeLevel.split(',') : ''// 居住区划
          //         this.form.liveAreaName = response.addrTypeName// 居住区划
          //         // //居住区域，地址
          //         // if(response.address){
          //         // 	response.address.forEach(item=>{
          //         // 		if(item.addrType === '1'){
          //         // 			this.form.liveAddr= item.address;//居住详细地址
          //         // 			this.form.liveArea= item.areaCodeLevel.split(",");//居住区划
          //         // 			this.form.liveAreaName= item.addrTypeName;//居住区划
          //         // 		}
          //         // 		else {
          //         // 			this.form.liveAddr= '';//居住详细地址
          //         // 			this.form.liveArea= [];//居住区划
          //         // 			this.form.liveAreaName= '';//居住区划
          //         // 		}
          //         // 	});
          //         // }
          //         // else {
          //         // 	this.form.liveAddr= '';//居住详细地址
          //         // 	this.form.liveArea= [];//居住区划
          //         // 	this.form.liveAreaName= '';//居住区划
          //         // }

          //         if (!this.form.birthday) {
          //           const _birthday = getBirthdayFromIdCard(idCard)
          //           this.form.birthday = _birthday
          //           this.age = computerAge(_birthday)
          //         } else {
          //           this.age = computerAge(this.form.birthday)
          //         }

          //         this.idEdit = !this.idEdit // 触发address组件更新
          //       }).catch(() => {
          //       })
          //     } else {
          //       const _birthday = getBirthdayFromIdCard(this.form.idCard)
          //       this.form.birthday = _birthday
          //       this.age = computerAge(_birthday)
          //     }
          //   }
          //   // 身份证校验失败
          //   else {
          //     this.form.idCard = ''
          //     this.form.birthday = ''
          //     this.age = ''
          //     this.$message.error(response.msg)
          //   }
          // }).catch(() => {
          //   this.form.birthday = ''
          //   this.age = ''
          //   this.$message.error('身份证唯一性校验接口请求失败！')
          // })
        } else {
          if (this.modelType === 'edit') {
            this.form.birthday = ''
            this.age = ''
          } else if (this.modelType === 'add') {
            if (this.form.id) {
              this.resetForm()
            }
          }
        }
      })
    },
    // 重置所有表单
    resetForm() {
      this.form.id = ''
      this.$refs.form_base.resetFields()
      this.$refs.form_server.resetFields()
      this.$refs.form_project.resetFields()
      this.liveArea = [[], []]
      this.idEdit = !this.idEdit // 触发address组件更新
    },
    // 选择日期
    birthdayChange(val) {
      // 新增时，根据满足条件的身份证，自动补全出生日期
      if (this.form.idCard !== '') {
        const _birthday = getBirthdayFromIdCard(this.form.idCard)
        if (_birthday !== val && this.form.idType == 'id_card') {
          this.$confirm('您选择的‘出生日期’与‘身份证的出生日期’不符合，是否修改？', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            if (val !== null) {
              this.age = computerAge(val)
              this.form.birthday = val
            } else {
              this.age = ''
              this.form.birthday = ''
            }
          }).catch(() => {
            if (_birthday) {
              this.age = computerAge(_birthday)
              this.form.birthday = _birthday
            } else {
              this.age = ''
              this.form.birthday = ''
            }
            this.$message({
              type: 'info',
              message: '已取消操作！'
            })
          })
        }
      }
      if (val) {
        this.age = computerAge(val)
        this.form.birthday = val
      } else {
        this.age = ''
        this.form.birthday = ''
      }
      // else {
      // 	if (val !== null) {
      // 		this.age = computerAge(val);
      // 		this.form.birthday = val;
      // 	}
      // 	else {
      // 		this.age = '';
      // 		this.form.birthday = '';
      // 	}
      // }
    }
    //* ***********************************************身份证校验end*********************************************
  }
}
</script>

<style scoped>
	@import "~@/styles/form.css";

	.tableContainer {
		margin-top: 20px;
	}
	.el-col{
      min-height:30px !important;
    }
</style>
