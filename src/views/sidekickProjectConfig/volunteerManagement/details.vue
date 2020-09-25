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
                    <el-form-item :label="this.isEditForm?'身份证号':'身份证号：'" prop="idCard">
                      <el-input
                        v-if="this.isEditForm"
                        ref="idCard"
                        v-model="form.idCard"
                        clearable
                        placeholder="请输入身份证号"
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
                        type="date"
                        format="yyyy-MM-dd"
                        value-format="yyyy-MM-dd"
                        placeholder="请选择发布日期"
                        style="width:100%;"
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
                        oninput="value=value.replace(/[^\d]/g,'')"
                        clearable
                        :placeholder="age?'自动计算':'请输入年龄'"
                        @keyup.enter.native="editContent('form_base')"
                      />
                      <span v-else>{{ age?age+'岁':age }}</span>
                    </el-form-item>
                  </el-col>
                  <el-col :md="this.adaptiveGrid.md" :lg="this.adaptiveGrid.lg">
                    <el-form-item :label="this.isEditForm?'民族':'民族：'" prop="nation">
                      <el-select
                        v-if="this.isEditForm"
                        ref="nation"
                        v-model="form.nation"
                        placeholder="请选择民族"
                        clearable
                        style="width:100%;"
                      >
                        <el-option
                          v-for="item in nationOptions"
                          v-if="nationOptions.length !== 0"
                          :key="item.dictValue"
                          :label="item.dictLabel"
                          :value="item.dictValue"
                        />
                      </el-select>
                      <span v-else>{{ form.nationName }}</span>
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
                    <el-form-item :label="this.isEditForm?'政治面貌':'政治面貌：'" prop="politicType">
                      <el-select
                        v-if="this.isEditForm"
                        ref="politicType"
                        v-model="form.politicType"
                        placeholder="请选择政治面貌"
                        clearable
                        style="width:100%;"
                      >
                        <el-option
                          v-for="item in politicTypeOptions"
                          v-if="politicTypeOptions.length !== 0"
                          :key="item.dictValue"
                          :label="item.dictLabel"
                          :value="item.dictValue"
                        />
                      </el-select>
                      <span v-else>{{ form.politicTypeName }}</span>
                    </el-form-item>
                  </el-col>
                  <el-col :md="this.adaptiveGrid.md" :lg="this.adaptiveGrid.lg">
                    <el-form-item :label="this.isEditForm?'文化程度':'文化程度：'" prop="eduLevel">
                      <el-select
                        v-if="this.isEditForm"
                        ref="eduLevel"
                        v-model="form.eduLevel"
                        placeholder="请选择文化程度"
                        clearable
                        style="width:100%;"
                      >
                        <el-option
                          v-for="item in eduLevelOptions"
                          v-if="eduLevelOptions.length !== 0"
                          :key="item.dictValue"
                          :label="item.dictLabel"
                          :value="item.dictValue"
                        />
                      </el-select>
                      <span v-else>{{ form.eduLevelName }}</span>
                    </el-form-item>
                  </el-col>
                  <el-col :md="this.adaptiveGrid.md" :lg="this.adaptiveGrid.lg">
                    <el-form-item :label="this.isEditForm?'联系方式':'联系方式：'" prop="phone">
                      <el-input
                        v-if="this.isEditForm"
                        ref="phone"
                        v-model="form.phone"
                        clearable
                        placeholder="请输入联系方式"
                        @keyup.enter.native="editContent('form_base')"
                      />
                      <span v-else>{{ form.phone }}</span>
                    </el-form-item>
                  </el-col>
                  <el-col :md="this.adaptiveGrid.md" :lg="this.adaptiveGrid.lg">
                    <el-form-item :label="this.isEditForm?'开户银行':'开户银行：'" prop="openBank">
                      <el-input
                        v-if="this.isEditForm"
                        ref="openBank"
                        v-model="form.openBank"
                        clearable
                        placeholder="请输入开户银行"
                        @keyup.enter.native="editContent('form_base')"
                      />
                      <span v-else>{{ form.openBank }}</span>
                    </el-form-item>
                  </el-col>
                  <el-col :md="this.adaptiveGrid.md" :lg="this.adaptiveGrid.lg">
                    <el-form-item :label="this.isEditForm?'银行卡号':'银行卡号：'" prop="bankAccount">
                      <el-input
                        v-if="this.isEditForm"
                        ref="bankAccount"
                        v-model="form.bankAccount"
                        clearable
                        placeholder="请输入银行卡号"
                        @keyup.enter.native="editContent('form_base')"
                      />
                      <span v-else>{{ form.bankAccount }}</span>
                    </el-form-item>
                  </el-col>
                  <el-col :md="this.adaptiveGrid.md" :lg="this.adaptiveGrid.lg">
                    <el-form-item :label="this.isEditForm?'所属组织':'所属组织：'" prop="socialOrgid">
                      <el-select
                        v-if="this.isEditForm"
                        ref="socialOrgid"
                        v-model="form.socialOrgid"
                        placeholder="请选择所属组织"
                        clearable
                        style="width:100%;"
                        filterable
                      >
                        <el-option
                          v-for="item in socialOrgidOptions"
                          v-if="socialOrgidOptions.length !== 0"
                          :key="item.id"
                          :label="item.orgName"
                          :value="item.id"
                        />
                      </el-select>
                      <span v-else>{{ form.socialOrgName }}</span>
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
                ref="form_server"
                key="form_server"
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

            <!--项目信息item start-->
            <el-collapse-item name="baseItem_3">
              <template slot="title">
                <div class="titleSlider">
                  <span>
                    <i class="titleTip" />项目信息
                  </span>
                </div>
              </template>
              <el-form
                ref="form_project"
                key="form_project"
                :model="form"
                :rules="this.isEditForm?rulesForm:null"
                label-width="140px"
              >
                <el-row :gutter="0">
                  <el-col :md="this.adaptiveGrid.md" :lg="this.adaptiveGrid.lg">
                    <el-form-item :label="this.isEditForm?'关联项目':'关联项目：'" prop="guanlianxiangmu">
                      <el-select
                        v-if="this.isEditForm"
                        v-model="guanlianxiangmuId"
                        placeholder="请选择关联项目"
                        clearable
                        style="width:100%;"
                        multiple
                        @keyup.enter.native="editContent('form_base')"
                        @change="guanlianxiangmuChange"
                      >
                        <el-option
                          v-for="item in guanlianxiangmuOptions"
                          v-if="guanlianxiangmuOptions.length !== 0"
                          :key="item.id"
                          :label="item.serviceName"
                          :value="item.id"
                        />
                      </el-select>
                      <span v-else>{{ guanlianxiangmuName.join(',') }}</span>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-form>
            </el-collapse-item>
            <!--项目信息item end-->

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
  submitDataEdit,
  socialOrgidSelectData,
  relatedProjectsSelectData,
  validateVolunteerManagementID
} from '@/api/sidekickProjectConfig/volunteerManagement'
import { allSelectdictionaryData } from '@/api/facilitiesConfig/communityFacilities'
import { adaptiveGrid_max, adaptiveGrid_plus } from '@/common/index'
import Address from '@/components/Address'
import { closeSelectedTag } from '@/utils/rooterJump'
import { getEditAuthority } from '@/api/user'
import { limitTextEllipsis } from '@/utils/index'
import QuillEditor from '@/components/QuillEditor'
import {
  verifyFullName,
  verifyIdCard,
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
  getBirthdayFromIdCard
} from '@/utils/index'

export default {
  components: { Address, QuillEditor },
  data() {
    // 联系方式
    const verifyPhone = (rule, value, callback) => {
      if (value !== '') {
        const reg = /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/
        if (reg.test(value) && value !== '') {
          callback()
        } else {
          callback(new Error('请输入正确的手机号码！'))
        }
      } else {
        callback(new Error('联系方式不能为空，请输入！'))
      }
    }

    // 关联项目
    const verifyGuanlianxiangmu = (rule, value, callback) => {
      if (this.guanlianxiangmuId.length !== 0) {
        callback()
      } else {
        callback(new Error('关联项目不能为空，请选择！'))
      }
    }

    return {
      maritalStatusOptions: [], // 婚姻状况
      // 下拉框字典数据
      guanlianxiangmuOptions: [], // 关联项目
      nationOptions: [], // 民族
      politicTypeOptions: [], // 政治面貌
      eduLevelOptions: [], // 文化程度
      socialOrgidOptions: [], // 所属组织

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
        nation: '', // 民族
        politicType: '', // 政治面貌
        eduLevel: '', // 文化程度
        idCard: '', // 身份证号
        sex: '', // 性别
        sexName: '',
        birthday: '', // 出生日期
        phone: '', // 联系方式
        openBank: '', // 开户银行
        bankAccount: '', // 银行卡号
        socialOrgid: '', // 所属组织
        socialOrgName: '', // 所属组织(汉字)
        liveAddr: '', // 居住详细地址
        liveArea: '', // 居住区划
        liveAreaName: '', // 居住区划
        // 关联项目(新增编辑时，将多选的关联项目传递给后台)
        volunteerProjectList: []
      },

      age: '', // 年龄

      guanlianxiangmuId: [], // 关联项目回显值id
      guanlianxiangmuName: [], // //关联项目回显值name

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
          { required: true, trigger: 'MANUAL_TRIGGER', message: '身份证不能为空，请输入！' },
          { trigger: 'MANUAL_TRIGGER', validator: verifyIdCard }
          // {
          // 	trigger: 'MANUAL_TRIGGER', validator: (rule, value, callback) => {
          // 		validateVolunteerManagementID(value).then(response => {
          // 			if (response.code === 0) {
          // 				callback();
          // 			} else {
          // 				if (response.msg === '该信息非当前企业拥有') {
          // 					callback('老人信息已存在，请重新输入。');
          // 				} else {
          // 					callback(response.msg);
          // 				}
          // 			}
          // 		}).catch(() => {
          // 			callback(new Error('身份证检验接口调用失败！'));
          // 		});
          // 	}
          // }
        ],
        // 联系方式
        phone: [
          { required: true, trigger: 'blur', message: '联系方式不能为空' },
          { required: true, trigger: 'change', validator: verifyHomePhoneOrMobile },
          { required: true, trigger: 'blur', validator: verifyHomePhoneOrMobile }
        ],
        // 所属组织
        socialOrgid: [
          { required: true, trigger: 'change', message: '所属组织不能为空，请选择！' }
        ],
        liveArea: [
          { required: true, trigger: 'change', message: '居住行政区划不能为空，请选择！' }
        ],
        // 关联项目
        guanlianxiangmu: [
          { required: true, trigger: 'change', validator: verifyGuanlianxiangmu }
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
      liveArea: []// 所属居委全部ID
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
        await
        this.editGetData(id, 'edit')
      } else if (this.modelType === 'add') {
        this.isEditForm = true
        this.idEdit = false
      } else if (this.modelType === 'look') {
        this.isEditForm = false
        await
        this.editGetData(id, '')
      }
    },
    // 编辑-查看 获取数据
    editGetData(id, st) {
      return new Promise((resolve, reject) => {
        // 请求当前服务项目信息
        userDetailsData(id, st).then(response => {
          // 页面form表单的值
          this.form = response
          if (this.form.volunteerProjectList) {
            this.form.volunteerProjectList.forEach(item => {
              this.guanlianxiangmuId.push(item.id)// 关联项目回显值id
              this.guanlianxiangmuName.push(item.serviceName)// //关联项目回显值name
            })
          }
          if (this.modelType === 'edit') {
            this.form.liveArea = this.form.liveArea ? this.form.liveArea.split(',') : []
          }
          if (this.form.birthday !== '' && this.form.birthday !== null) {
            this.age = computerAge(this.form.birthday)
          }
          this.idEdit = false
        }).catch(() => {
          this.$message.error('获取志愿者管理信息失败！')
        })
      })
    },
    // 获取下拉字典
    getSelect() {
      return new Promise((resolve, reject) => {
        // 数据字典接口
        const dicKey = 'biz_marital_status,nation_type,politics_status,edu_level'
        allSelectdictionaryData(dicKey).then(response => {
          if (response.code === 0) {
            for (const k in response.data) {
              switch (k) {
                // 婚姻状况
                case 'biz_marital_status':
                  this.maritalStatusOptions = response.data[k]
                  break
                  // 民族
                case 'nation_type':
                  this.nationOptions = response.data[k]
                  break
                  // 政治面貌
                case 'politics_status':
                  this.politicTypeOptions = response.data[k]
                  break
                  // 文化程度
                case 'edu_level':
                  this.eduLevelOptions = response.data[k]
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

        // 所属组织
        socialOrgidSelectData().then(response => {
          this.socialOrgidOptions = response
          resolve()
        }).catch(() => {
          this.$message.error('所属组织接口请求失败！')
          reject()
        })

        // 关联项目
        relatedProjectsSelectData().then(response => {
          this.guanlianxiangmuOptions = response
          resolve()
        }).catch(() => {
          this.$message.error('关联项目接口请求失败！')
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
      this.$router.push({ path: '/sidekickProjectConfig/volunteerManagement' })
    },
    // 下一步
    tabsStep(tabsName) {
      this.activeTabs = tabsName
    },
    // 确定按钮-提交表单
    editContent(formName) {
      const formRefs = ['form_base', 'form_server', 'form_project'].map(key => this.$refs[key])
      validateForms(formRefs).then(() => {
        // 开户银行
        if (this.form.openBank && this.form.openBank.length > 20) {
          return this.$message.error('开户银行长度不能超过20，请重新输入！')
        }
        // 银行卡号
        if (this.form.bankAccount && this.form.bankAccount.length > 50) {
          return this.$message.error('银行卡号长度不能超过50，请重新输入！')
        }
        // 居住详细地址
        if (this.form.liveAddr && this.form.liveAddr.length > 50) {
          return this.$message.error('居住详细地址长度不能超过50，请重新输入！')
        }

        const params = this.form
        params.liveArea = this.liveArea.length === 0 ? '' : this.liveArea[this.liveArea.length - 1] + ''
        const _title_ = limitTextEllipsis(this.form.fullName, 10)

        // 新增
        if (this.modelType === 'add') {
          submitDataAdd(params).then(response => {
            if (response.code === 0) {
              this.$message({
                type: 'success',
                message: '新增‘' + _title_ + '’志愿者成功!'
              })
              // 关闭页面
              this.closeDetailsPage()
            } else {
              this.$message.error(response.msg)
            }
          }).catch(() => {
            this.$message.error('新增‘' + _title_ + '’志愿者失败!')
          })
        }
        // 编辑
        else if (this.modelType === 'edit') {
          submitDataEdit(params).then(response => {
            if (response.code === 0) {
              this.$message({
                type: 'success',
                message: '编辑‘' + _title_ + '’志愿者成功!'
              })
              // 关闭页面
              this.closeDetailsPage()
            } else {
              this.$message.error(response.msg)
            }
          }).catch(() => {
            this.$message.error('编辑‘' + _title_ + '’志愿者失败!')
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
        path: `/volunteerManagement/details/${_id_}`,
        query: { 'id': _id_, 'modelType': 'edit', '_title': `编辑${_title_}` } // modelType: 查看:look，编辑:edit，新增:add的类型
      })
    },
    // 获取所属居委
    getAreaCode_reg(val) {
      this.liveArea = val
      this.form.liveArea = val.length === 0 ? '' : this.liveArea[this.liveArea.length - 1] + ''
    },
    // 关联项目change事件
    guanlianxiangmuChange(val) {
      this.form.volunteerProjectList = []
      val.forEach(item => {
        this.guanlianxiangmuOptions.forEach(item1 => {
          if (item === item1.id) {
            const arr = {
              id: item1.id,
              serviceName: item1.serviceName
            }
            this.form.volunteerProjectList.push(arr)
          }
        })
      })
    },
    //* ***************************************************身份证校验start************************************************
    // 身份证input事件
    handleIdCardInput() {
      this.$refs['form_base'].validateField('idCard', (message) => {
        const valid = message === ''
        if (valid) {
          echoPerson(this.form.idCard, '').then(response => {
            // 身份证校验成功，后台没有该身份证的数据
            if (response) {
              if (response.id !== '-1') {
                const _birthday = getBirthdayFromIdCard(this.form.idCard)
                this.form.birthday = _birthday
                this.age = computerAge(_birthday)
                this.$confirm('该身份证号已有对应人员信息，是否加载？', '提示', {
                  confirmButtonText: '确定',
                  cancelButtonText: '取消',
                  type: 'warning'
                }).then(() => {
                  const personId = _.cloneDeep(this.form.id)
                  this.form = _.cloneDeep(response)
                  this.form.id = _.cloneDeep(personId)
                  this.$set(this.form, 'phone', response.homePhone || response.mobile)
                  this.form.liveAddr = response.liveAddr// 居住详细地址
                  this.form.liveArea = response.liveAreaCodeLevel ? response.liveAreaCodeLevel.split(',') : ''// 居住区划
                  this.form.liveAreaName = response.addrTypeName// 居住区划

                  // //居住区域，地址
                  // if(response.address){
                  // 	response.address.forEach(item=>{
                  // 		if(item.addrType === '1'){
                  // 			this.form.liveAddr= item.address;//居住详细地址
                  // 			this.form.liveArea= item.areaCodeLevel.split(",");//居住区划
                  // 			this.form.liveAreaName= item.addrTypeName;//居住区划
                  // 		}
                  // 		else {
                  // 			this.form.liveAddr= '';//居住详细地址
                  // 			this.form.liveArea= [];//居住区划
                  // 			this.form.liveAreaName= '';//居住区划
                  // 		}
                  // 	});
                  // }
                  // else {
                  // 	this.form.liveAddr= '';//居住详细地址
                  // 	this.form.liveArea= [];//居住区划
                  // 	this.form.liveAreaName= '';//居住区划
                  // }

                  if (!this.form.birthday) {
                    const _birthday = getBirthdayFromIdCard(idCard)
                    this.form.birthday = _birthday
                    this.age = computerAge(_birthday)
                  } else {
                    this.age = computerAge(this.form.birthday)
                  }
                  this.idEdit = !this.idEdit // 触发address组件更新
                }).catch(() => {
                })
              } else {
                const _birthday = getBirthdayFromIdCard(this.form.idCard)
                this.form.birthday = _birthday
                this.age = computerAge(_birthday)
              }
            }
            // 身份证校验失败
            else {
              this.form.idCard = ''
              this.form.birthday = ''
              this.age = ''
              this.$message.error(response.msg)
            }
          }).catch(() => {
            this.form.birthday = ''
            this.age = ''
            this.$message.error('身份证唯一性校验接口请求失败！')
          })
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

        if (_birthday !== val) {
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
      } else {
        if (val !== null) {
          this.age = computerAge(val)
          this.form.birthday = val
        } else {
          this.age = ''
          this.form.birthday = ''
        }
      }
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
</style>
