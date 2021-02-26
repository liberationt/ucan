<!-- dialog.vue -->

<template>
  <el-dialog
    ref="dailog"
    v-dialogDrag
    :title="title"
    width="1000px"
    :visible="dialogTableVisible"
    :close-on-click-modal="false"
    class="account-add-dailog"
    @close="closeDialog"
    @opened="opened"
    @open="open"
  >
    <div ref="dailogBody" class="new-daillog-body" :style="{ height: heightChange}">
      <h2 class="info" style="padding-top: 0;">基本信息</h2>
      <el-form ref="form" :model="form" :rules="rulesForm" label-width="130px">
        <el-row :gutter="0">
          <el-col :md="this.adaptiveGrid_plus.md" :lg="this.adaptiveGrid_plus.lg">
            <el-form-item label="登录账号" prop="loginName">
              <el-input
                ref="loginName"
                v-model.trim="form.loginName"
                :disabled="disabled"
                clearable
                autocomplete="off"
                placeholder="请输入账号"
                @keyup.enter.native="submitDialog"
              />
            </el-form-item>
          </el-col>
          <el-col :md="this.adaptiveGrid_plus.md" :lg="this.adaptiveGrid_plus.lg">
            <el-form-item label="显示名称" prop="userName">
              <el-input
                ref="userName"
                v-model="form.userName"
                :disabled="disabled"
                clearable
                placeholder="请输入名称"
                @keyup.enter.native="submitDialog"
              />
            </el-form-item>
          </el-col>
          <el-col :md="this.adaptiveGrid_plus.md" :lg="this.adaptiveGrid_plus.lg">
            <el-form-item label="所属部门" prop="ancestors">
              <el-cascader
                ref="ancestors"
                v-model="form.ancestors"
                :options="optionsDepartment"
                :props="defaultProps"
                :show-all-levels="false"
                change-on-select
                filterable
                placeholder="请选择部门"
                :disabled="disabledPart"
                @change="handleChange"
                @keyup.enter.native="submitDialog"
              />
            </el-form-item>
          </el-col>

          <el-col :md="this.adaptiveGrid_plus.md" :lg="this.adaptiveGrid_plus.lg">
            <el-form-item label="手机号码" prop="phonenumber">
              <el-input
                ref="phonenumber"
                v-model.lazy="form.phonenumber"
                :disabled="disabled"
                clearable
                placeholder="请输入手机号码"
                @blur="phonenumberChange"
                @keyup.enter.native="submitDialog"
              />
            </el-form-item>
          </el-col>
          <el-col
            v-if="characters || data.accountType === '2'"
            :md="this.adaptiveGrid_plus.md"
            :lg="this.adaptiveGrid_plus.lg"
          >
            <el-form-item label="账号类型" prop="accountType">
              <el-select
                ref="accountType"
                v-model="form.accountType"
                :disabled="disabled"
                placeholder="请选择账号类型"
                @keyup.enter.native="submitDialog"
              >
                <el-option
                  v-for="item in accountOptions"
                  :key="item.dictValue"
                  :label="item.dictLabel"
                  :value="item.dictValue"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col
            v-if="data.accountType === '3'"
            :md="this.adaptiveGrid_plus.md"
            :lg="this.adaptiveGrid_plus.lg"
          >
            <el-form-item label="服务商账号类型" prop="assistiveRentType">
              <el-select
                ref="assistiveRentType"
                v-model="form.assistiveRentType"
                :disabled="disabled"
                placeholder="请选择服务商账号类型"
                @keyup.enter.native="submitDialog"
              >
                <el-option
                  v-for="item in accountSvOptions"
                  :key="item.dictValue"
                  :label="item.dictLabel"
                  :value="item.dictValue"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col
            v-if="data.accountType === '4'"
            :md="this.adaptiveGrid_plus.md"
            :lg="this.adaptiveGrid_plus.lg"
          >
            <el-form-item label="辅具账号类型" prop="assistiveRentType">
              <el-select
                ref="assistiveRentType"
                v-model="form.assistiveRentType"
                :disabled="disabled"
                placeholder="请选择辅具账号类型"
                @keyup.enter.native="submitDialog"
              >
                <el-option
                  v-for="item in accountfjOptions"
                  :key="item.dictValue"
                  :label="item.dictLabel"
                  :value="item.dictValue"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col
            v-if="data.accountType === '5'"
            :md="this.adaptiveGrid_plus.md"
            :lg="this.adaptiveGrid_plus.lg"
          >
            <el-form-item label="评估账号类型" prop="assistiveRentType">
              <el-select
                ref="assistiveRentType"
                v-model="form.assistiveRentType"
                :disabled="disabled"
                placeholder="请选择评估账号类型"
                @keyup.enter.native="submitDialog"
              >
                <el-option
                  v-for="item in accountESOptions"
                  :key="item.dictValue"
                  :label="item.dictLabel"
                  :value="item.dictValue"
                />
              </el-select>
            </el-form-item>
          </el-col>

          <!-- 新增   ---- 养老机构类型 -->
          <el-col
            v-if="data.accountType === '6'"
            :md="this.adaptiveGrid_plus.md"
            :lg="this.adaptiveGrid_plus.lg"
          >
            <el-form-item label="机构设施账号类型" prop="assistiveRentType">
              <el-select
                ref="assistiveRentType"
                v-model="form.assistiveRentType"
                :disabled="disabled"
                placeholder="请选择机构设施账号类型"
                @keyup.enter.native="submitDialog"
              >
                <el-option
                  v-for="item in pensionAgencysOptions"
                  :key="item.dictValue"
                  :label="item.dictLabel"
                  :value="item.dictValue"
                />
              </el-select>
            </el-form-item>
          </el-col>

          <!-- 新增  ----- 呼叫中心 -->
          <el-col
            v-if="data.accountType === '7'"
            :md="this.adaptiveGrid_plus.md"
            :lg="this.adaptiveGrid_plus.lg"
          >
            <el-form-item label="呼叫中心账号类型" prop="assistiveRentType">
              <el-select
                ref="assistiveRentType"
                v-model="form.assistiveRentType"
                :disabled="disabled"
                placeholder="请选择呼叫中心账号类型"
                @keyup.enter.native="submitDialog"
              >
                <el-option
                  v-for="item in callCenterOptions"
                  :key="item.dictValue"
                  :label="item.dictLabel"
                  :value="item.dictValue"
                />
              </el-select>
            </el-form-item>
          </el-col>

          <el-col v-if="characters" :md="this.adaptiveGrid_plus.md" :lg="this.adaptiveGrid_plus.lg">
            <el-form-item label="账号数据类型" prop="accountDataType">
              <el-select
                ref="accountDataType"
                v-model="form.accountDataType"
                :disabled="disabled"
                placeholder="请选择账号数据类型"
                @keyup.enter.native="submitDialog"
              >
                <el-option
                  v-for="item in accountDataOptions"
                  :key="item.dictValue"
                  :label="item.dictLabel"
                  :value="item.dictValue"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :md="24" :lg="24">
            <el-form-item label="账号角色" prop="accountRole">
              <el-select
                ref="accountRole"
                v-model="form.accountRole"
                multiple
                filterable
                placeholder="请选择账号角色"
                :disabled="disabled"
                @keyup.enter.native="submitDialog"
              >
                <el-option
                  v-for="item in optionsRole"
                  :key="item.roleId"
                  :label="item.roleName"
                  :value="item.roleId"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :md="this.adaptiveGrid_plus.md" :lg="this.adaptiveGrid_plus.lg">
            <el-form-item label="账号状态" prop="status">
              <el-switch
                ref="status"
                v-model="form.status"
                class="switchStyle"
                active-text="启用"
                inactive-text="禁用"
                active-value="0"
                inactive-value="1"
                :disabled="disabled"
              />
            </el-form-item>
          </el-col>
        </el-row>

      </el-form>

      <h2 v-if="projectInfo || data.accountType === '2'" class="info">项目信息</h2>
      <el-form
        v-if="projectInfo || data.accountType === '2'"
        ref="forms"
        :model="forms"
        label-width="120px"
        :rules="formsRule"
      >
        <!--<el-row v-if="modelType === 'add'">-->
        <!--<el-col>-->
        <!--<el-form-item label="新增项目" width="100%">-->
        <!--<el-radio-group v-model="isAdd" @change="resetForms">-->
        <!--<el-radio label="yes">是</el-radio>-->
        <!--<el-radio label="no">否</el-radio>-->
        <!--</el-radio-group>-->
        <!--</el-form-item>-->
        <!--</el-col>-->
        <!--</el-row>-->
        <el-row v-show="isAdd === 'yes'">
          <el-col :md="this.adaptiveGrid_plus.md" :lg="this.adaptiveGrid_plus.lg">
            <el-form-item label="项目名称" prop="projectName">
              <el-input
                ref="projectName"
                v-model="forms.projectName"
                placeholder="请输入项目名称"
                @keyup.enter.native="submitDialog"
              />
            </el-form-item>
          </el-col>
          <el-col :md="this.adaptiveGrid_plus.md" :lg="this.adaptiveGrid_plus.lg">
            <el-form-item label="系统名称" prop="systemName">
              <el-input
                ref="systemName"
                v-model="forms.systemName"
                placeholder="请输入系统名称"
                @keyup.enter.native="submitDialog"
              />
            </el-form-item>
          </el-col>

          <el-col :md="this.adaptiveGrid_plus.md" :lg="this.adaptiveGrid_plus.lg">
            <el-form-item label="服务到期日" prop="servicePeriod">
              <el-date-picker
                ref="servicePeriod"
                v-model="forms.servicePeriod"
                type="date"
                value-format="yyyy-MM-dd"
                placeholder="请选择服务到期日"
                :picker-options="pickerOptions"
                @keyup.enter.native="submitDialog"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <!--<el-row v-show="isAdd === 'no'">-->
        <!--<el-col :md="this.adaptiveGrid_plus.md" :lg="this.adaptiveGrid_plus.lg">-->
        <!--<el-form-item label="关联项目" prop="projectId">-->
        <!--<el-select v-model="forms.projectId" clearable placeholder="请选择关联项目" ref="projectId"-->
        <!--@change="selectProject" :disabled="disabled">-->
        <!--<el-option-->
        <!--v-for="item in projectOptions"-->
        <!--:key="item.projectId"-->
        <!--:label="item.projectName"-->
        <!--:value="item.projectId"-->
        <!--&gt;</el-option>-->
        <!--</el-select>-->
        <!--</el-form-item>-->
        <!--</el-col>-->
        <!--<el-col :md="this.adaptiveGrid_plus.md" :lg="this.adaptiveGrid_plus.lg">-->
        <!--<el-form-item label="系统名称" >-->
        <!--<el-input ref="systemName" v-model="forms.systemName" disabled placeholder=""></el-input>-->
        <!--</el-form-item>-->
        <!--</el-col>-->
        <!--<el-col :md="this.adaptiveGrid_plus.md" :lg="this.adaptiveGrid_plus.lg">-->
        <!--<el-form-item label="服务到期日" >-->
        <!--<el-date-picker-->
        <!--ref="servicePeriod"-->
        <!--disabled-->
        <!--v-model="forms.servicePeriod"-->
        <!--type="date"-->
        <!--placeholder=""-->
        <!--&gt;</el-date-picker>-->
        <!--</el-form-item>-->
        <!--</el-col>-->
        <!--</el-row>-->
      </el-form>
    </div>
    <div v-show="btnWrap" slot="footer" class="dialog-footer">
      <el-button @click="closeDialog()">取 消</el-button>
      <el-button type="primary" :disabled="submitDisabled" class="dailog-btn" @click="submitDialog()">确 定
      </el-button>
    </div>
    <div v-show="!btnWrap" slot="footer" class="dialog-footer">
      <el-button type="primary" class="dailog-btn" @click="closeDialog()">关 闭
      </el-button>
    </div>
  </el-dialog>
</template>

<script>
import {
  department,
  accountRole,
  accountType,
  accountfjType,
  accountSvDataType,
  accountDataType,
  getInitialPass,
  getAccountProject,
  validateLoginName,
  addDialog,
  editDialog,
  getCharacters,
  accountEsDataType
} from '@/api/systemConfig/user'
import { constants } from 'crypto'
import { parse } from 'path'
import { adaptiveGrid_plus } from '@/common/index'
import { mapGetters } from 'vuex'
import { debounce } from '@/utils'
import elementResizeDetectorMaker from 'element-resize-detector'
import {
  allSelectdictionaryData
} from '@/api/facilitiesConfig/pensionAgency'
export default {
  computed: {
    ...mapGetters([
      'data'
    ])
  },
  name: 'MyDialog',
  props: ['dialogTableVisible', 'tableRowValue', 'modelType', 'ajaxData'], // 接受父模板传递的自定义属性
  watch: {
    'form.accountType': {
      handler: function() {
        if (this.characters === true) {
          if (this.form.accountType === '2') {
            this.formsRule.projectId[0].required = false
            this.formsRule.projectName[0].required = false
            this.formsRule.systemName[0].required = false
            this.formsRule.servicePeriod[0].required = false
          } else {
            this.formsRule.projectId[0].required = true
            this.formsRule.projectName[0].required = true
            this.formsRule.systemName[0].required = true
            this.formsRule.servicePeriod[0].required = true
          }
        }
      }
    },
    isAdd() {
      if (this.isAdd === 'yes') {
        this.formsRule.projectId[0].required = false
        if (this.characters === true && this.form.accountType === '2') {
          this.formsRule.projectName[0].required = false
          this.formsRule.systemName[0].required = false
          this.formsRule.servicePeriod[0].required = false
        } else {
          this.formsRule.projectName[0].required = true
          this.formsRule.systemName[0].required = true
          this.formsRule.servicePeriod[0].required = true
        }
      } else {
        this.formsRule.projectName[0].required = false
        this.formsRule.systemName[0].required = false
        this.formsRule.servicePeriod[0].required = false
        if (this.characters === true && this.form.accountType === '2') {
          this.formsRule.projectId[0].required = false
        } else {
          this.formsRule.projectId[0].required = true
        }
      }
    }
  },
  data() {
    // 登录账号-校验
    const verifyLoginName = (rule, value, callback) => {
      const _value = value.trim()
      if (_value === '') {
        callback(new Error('登录账号不能为空！'))
      } else if (!/^[a-zA-Z][a-zA-Z0-9_]*$/.test(_value) || _value.length > 15) {
        callback(new Error('必须是以英文字母开头，可包含英文字母、数字和下划线，不超过15个字符。'))
      } else {
        let _parmas
        if (this.modelType === 'edit') {
          _parmas = {
            userId: this.tableRowValue.userId,
            loginName: _value
          }
        } else {
          _parmas = {
            loginName: _value
          }
        }

        validateLoginName(_parmas).then(response => {
          if (response === 1) {
            callback(new Error('登录账号已存在！请重新输入！'))
          } else {
            callback()
          }
        })
          .catch(() => {
            callback(new Error('登录账号校验失败！'))
          })
      }
    }

    return {
      // 禁用日期
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() <= Date.now()
        }
      },
      title: '', // 弹框title
      submitDisabled: false, // 未通过校验，则不能提交确认按钮
      disabled: '', // 表单是否可编辑
      disabledPart: '',
      optionsDepartment: [],
      optionsRole: [],
      optionsData: [],
      form: {
        loginName: '',
        accountType: '',
        assistiveRentType: '',
        accountDataType: '',
        userName: '',
        accountRole: [],
        ancestors: [],
        phonenumber: '',
        status: '0',
        selectedOptions: [],
        projectId: ''
      },
      forms: {
        projectName: '',
        projectId: '',
        servicePeriod: '',
        systemName: ''
      },
      callCenterOptions: [],
      pensionAgencysOptions: [],
      formsRule: {
        // 项目名称
        projectId: [
          { required: true, message: '项目名称不能为空，请选择！', trigger: 'change' }
        ],
        projectName: [
          { required: true, message: '项目名称不能为空，请输入！', trigger: 'blur' }
        ],
        systemName: [
          { required: true, message: '系统名称不能为空，请输入！', trigger: 'blur' }
        ],
        servicePeriod: [
          { required: true, message: '服务到期日不能为空，请选择！', trigger: 'change' }
        ]
      },
      phonenumberRequired: true, // 手机号码的校验规则是否正确，手机号码为空时默认为true,只有填过之后进行校验
      // form 表单的验证规则
      rulesForm: {
        // 登录账号
        loginName: [
          { required: true, trigger: ['blur'], validator: verifyLoginName }
        ],
        // 显示名称
        userName: [
          { required: true, message: '显示名称不能为空，请填写！', trigger: 'blur' },
          { max: 20, message: '显示名称不能超过20个字符', trigger: 'blur' }
        ],
        // 所属部门
        ancestors: [
          { required: true, message: '所属部门不能为空，请选择！', trigger: 'change' }
        ],
        // 账号类型
        accountType: [
          { required: true, message: '账号类型不能为空，请选择！', trigger: 'change' }
        ],
        assistiveRentType: [
          { required: true, message: '辅具账号类型不能为空，请选择！', trigger: 'change' }
        ],
        // 账号数据类型
        accountDataType: [
          { required: true, message: '账号数据类型不能为空，请选择！', trigger: 'change' }
        ],
        // 账号角色
        accountRole: [
          { required: true, message: '账号角色不能为空，请选择！', trigger: 'change' }
        ]
      },
      //   所属部门自定义label，value
      defaultProps: {
        label: 'deptName',
        value: 'deptId'
      },
      // 存储登陆账号，与编辑提交时的比较，看登陆账号是否改变，验证唯一
      name: '',
      // 账号类型和账号数据类型是否显示
      characters: false,
      //   项目信息是否需要显示
      projectInfo: false,
      // 账号角色
      accountOptions: [], // 账号类型数组
      accountESOptions: [], // 入院评估
      accountfjOptions: [], // 辅具类型数组
      accountSvOptions: [], // 服务商类型数组
      accountDataOptions: [], // 账号数据类型数组
      projectOptions: [], // 关联项目下拉列表值
      btnWrap: true, // 是否显示按钮组
      // 自适应
      adaptiveGrid_plus: {
        md: adaptiveGrid_plus.md,
        lg: adaptiveGrid_plus.lg
      },
      // 保存改变前的部门ID
      beforeIds: [],
      isAdd: 'yes', // 是否新增项目
      heightChange: '210px'
    }
  },
  mounted() {
    const _this = this
    const erd = elementResizeDetectorMaker()
    erd.listenTo(this.$refs.dailog.$el.lastChild, function(element) {
      const height = element.offsetHeight - 48 + 'px'
      _this.$nextTick(function() {
        this.heightChange = height
        // this.$refs.dailogBody.style.height = height
      })
    })
  },
  methods: {
    // 编辑-提交数据
    editTableRowSubmit(params) {
      if (this.tableRowValue !== params) {
        editDialog(params).then(response => {
          this.submitDisabled = false
          if (response.code === 0) {
            this.$message({
              type: 'success',
              message: response.msg
            })
            this.ajaxData()
            this.closeDialog()
          } else {
            this.$message.error(response.msg)
          }
        })
          .catch(() => {
            this.$message.error('操作失败！')
          })
      } else {
        this.$message.error('操作失败！')
      }
    },
    // 添加行-提交数据
    addTableRowSubmit(params) {
      addDialog(params)
        .then(response => {
          this.submitDisabled = false
          if (response.code === 0) {
            this.$message({
              type: 'success',
              message: response.msg
            })
            this.ajaxData()
            this.closeDialog()
            return false
          } else {
            this.$message.error(response.msg)
            return false
          }
        })
        .catch(() => {
          this.$message.error('操作失败！')
          return false
        })
    },
    getData() {
      // 获取账号类型、账号数据类型权限
      getCharacters().then(response => {
        if (response === true) {
          // 非普通用户
          this.characters = true
          this.projectInfo = true
          /* .catch(() => {
							this.$message.error('获取项目信息数据失败！');
						});*/
        } else {
          // 普通用户
          this.characters = false
          this.projectInfo = false
        }
        // 获取项目信息数据
        if (this.data.accountType === '2') {
          getAccountProject().then(response => {
            this.projectOptions = response
            // 关联项目赋值
            if (this.modelType === 'edit' || this.modelType === 'look') {
              const _memProjects = this.tableRowValue.memProjects
              if (_memProjects.length !== 0) {
                const _porjectId = this.tableRowValue.memProjects[0].id
                this.projectOptions.forEach(item => {
                  if (item.projectId === _porjectId) {
                    this.forms.projectName = item.projectName
                    this.forms.projectId = item.projectId
                    this.forms.systemName = item.systemName
                    this.forms.servicePeriod = item.servicePeriod
                  }
                })
              }
            }
          })
        }
      })
        .catch(() => {
          this.$message.error('获取账号数据类型权限失败！')
          // 普通用户
          this.characters = false
          this.projectInfo = false
        })

      // 获取所属部门、账号角色树
      const parmas = { status: 0, isRole: true }
      department(parmas).then(response => {
        this.optionsDepartment = response
        for (let i = 0; i < this.data.sysRoles.length; i++) {
          if (this.data.sysRoles[i].roleKey === 'operate_manage') {
            this.optionsDepartment[0].disabled = true
            break
          }
        }
      })
        .catch(() => {
          this.$message.error('获取部门树失败！')
        })

      accountRole().then(response => {
        this.optionsRole = response
        if (this.modelType === 'edit') {
          this.form.accountRole = this.tableRowValue.roles.map(item => item.roleId) || ''
        }
      })
        .catch(() => {
          this.$message.error('获取账号角色树失败！')
        })

      // 获取账号类型
      accountType().then(response => {
        this.accountOptions = response.rows
        for (let i = 0; i < this.data.sysRoles.length; i++) {
          if (this.data.sysRoles[i].roleKey === 'operate_manage') {
            this.accountOptions.splice(0, 1)
            break
          }
        }
      })
        .catch(() => {
          this.$message.error('获取账号类型失败！')
        })

      // 获取入院评估类型
      accountEsDataType().then(response => {
        this.accountESOptions = response.rows
        for (let i = 0; i < this.data.sysRoles.length; i++) {
          if (this.data.sysRoles[i].roleKey === 'assess_rent_type') {
            this.accountESOptions.splice(0, 1)
            break
          }
        }
      })
      // 获取辅具账号类型
      accountfjType().then(response => {
        this.accountfjOptions = response.rows
        for (let i = 0; i < this.data.sysRoles.length; i++) {
          if (this.data.sysRoles[i].roleKey === 'assistive_rent_type') {
            this.accountfjOptions.splice(0, 1)
            break
          }
        }
      })
        .catch(() => {
          this.$message.error('获取账号类型失败！')
        })

      // 获取服务商账号类型
      accountSvDataType().then(response => {
        this.accountSvOptions = response.rows
        for (let i = 0; i < this.data.sysRoles.length; i++) {
          if (this.data.sysRoles[i].roleKey === 'assistive_rent_type') {
            this.accountSvOptions.splice(0, 1)
            break
          }
        }
      })
        .catch(() => {
          this.$message.error('获取账号类型失败！')
        })

      // 获取账号数据类型
      accountDataType().then(response => {
        this.accountDataOptions = response.rows
      })
        .catch(() => {
          this.$message.error('获取账号数据类型失败！')
        })

      // // 添加用户时获取默认密码
      // getInitialPass().then(response => {
      // 	this.form.password = response + "";
      // })
      // .catch(() => {
      // 	this.$message.error('获取用户默认密码失败！');
      // });
      this.getSelect()
    },
    // 获取下拉字典
    getSelect() {
      const dictKey = [
        'call_center_subtype', // 呼叫中心
        'pension_agencys' // 机构设施
      ].join(',')
      return new Promise((resolve, reject) => {
        allSelectdictionaryData(dictKey).then(response => {
          const dict = response.data
          for (const key in dict) {
            switch (key) {
              case 'call_center_subtype':
                this.callCenterOptions = dict[key]
                break
              case 'pension_agencys':
                this.pensionAgencysOptions = dict[key]
                break
            }
          }
          resolve()
        }).catch(() => {
          reject()
        })
      })
    		},
    // 取消关闭弹框
    closeDialog() {
      this.form = {
        loginName: '',
        accountType: '',
        assistiveRentType: '',
        accountDataType: '',
        userName: '',
        accountRole: [],
        ancestors: [],
        phonenumber: '',
        status: '0',
        selectedOptions: [],
        project: '',
        servicePeriod: ''
      }
      this.forms = {
        projectName: '',
        projectId: '',
        servicePeriod: '',
        systemName: ''
      }
      this.$nextTick(() => {
        // this.$refs["form"].resetFields();
        this.$refs['form'].clearValidate()
        // this.$refs["forms"].resetFields();
        if (this.characters == true) {
          this.$refs['forms'].clearValidate()
        }
      })
      this.$emit('dialogHide', 'false')
    },
    // 确认，提交表单
    submitDialog() {
      const arr = []
      const formsOne = new Promise((resolve, reject) => {
        this.$refs['form'].validate((valid) => {
          if (valid) {
            resolve('成功了')
          }
        })
      })
      arr.push(formsOne)
      // 只有当账号类型等于2（系统管理员）
      if (this.data.accountType === '2') {
        if (!this.characters) {
          const formsTwo = new Promise((resolve, reject) => {
            this.$refs['forms'].validate((valid) => {
              if (valid) {
                resolve('成功了')
              }
            })
          })
          arr.push(formsTwo)
        }
      }
      Promise.all(arr)
        .then(res => {
          if (this.phonenumberRequired) {
            this.submitDisabled = true
            // ---------------------------------------------------------
            if (this.characters === false) {
              this.form.accountDataType = this.data.accountDataType
              if (this.data.accountType !== '2') {
                this.form.accountType = this.data.accountType
              }
            }
            const params = {}
            Object.assign(params, this.form)
            params.memProjectId = this.forms.projectId || ''
            params.roleIds = params.accountRole.join(',')
            params.accountRole = ''
            params.deptId = params.ancestors[params.ancestors.length - 1]
            params.ancestors = []
            params.selectedOptions = params.selectedOptions.join(',')
            if (this.modelType === 'no') {
              params.projectId = this.forms.projectId || ''
            } else {
              Object.assign(params, this.forms)
            }
            if (this.modelType === 'edit') {
              params.userId = this.tableRowValue.userId
              this.editTableRowSubmit(params)
            } else {
              this.addTableRowSubmit(params)
            }
          } else {
            this.$message.error('手机号格式不正确，请重新输入！')
          }
        })
    },
    // 打开动画结束时的回调
    opened() {
    },
    // 打开的回调
    open() {
      this.$nextTick(() => {
        this.$refs['form'].clearValidate()
      })
      this.btnWrap = true

      if (this.modelType === 'edit') {
        this.title = '编辑账号'
        let ancestors = []
        this.name = this.tableRowValue.loginName
        if (this.tableRowValue.dept.ancestors === null || this.tableRowValue.dept.ancestors === '') {
          ancestors = []
        } else {
          const _deptId = this.tableRowValue.deptId
          const _ancestors = this.tableRowValue.dept.ancestors + ',' + _deptId
          ancestors = _ancestors.split(',')
          ancestors.shift()
          ancestors = ancestors.map(Number)
          if (this.data.accountType !== '2') {
            ancestors.splice(0, 1)
          }
        }
        this.getData()
        this.form = {
          loginName: this.tableRowValue.loginName || '',
          accountType: this.tableRowValue.accountType || '',
          assistiveRentType: this.tableRowValue.assistiveRentType || '',
          accountDataType: this.tableRowValue.accountDataType || '',
          userName: this.tableRowValue.userName || '',
          ancestors: ancestors || [],
          selectedOptions: [],
          phonenumber: this.tableRowValue.phonenumber || '',
          status: this.tableRowValue.status,
          createTime: this.tableRowValue.createTime || '',
          servicePeriod: this.tableRowValue.servicePeriod || '',
          accountRole: []
        }
        this.disabled = false
        this.disabledPart = true
        this.beforeIds = JSON.parse(JSON.stringify(this.form.ancestors))
      } else if (this.modelType === 'add') {
        this.title = '新增账号'
        this.getData()
        this.disabled = false
        this.disabledPart = false
      } else if (this.modelType === 'look') {
        this.title = '查看详情'
        let ancestors = []
        this.name = this.tableRowValue.loginName
        if (this.tableRowValue.dept.ancestors === null || this.tableRowValue.dept.ancestors === '') {
          ancestors = []
        } else {
          const _deptId = this.tableRowValue.deptId
          const _ancestors = this.tableRowValue.dept.ancestors + ',' + _deptId
          ancestors = _ancestors.split(',')
          ancestors.shift()
          ancestors = ancestors.map(Number)
          if (this.data.accountType !== '2') {
            ancestors.splice(0, 1)
          }
        }
        this.getData()
        this.form = {
          loginName: this.tableRowValue.loginName || '',
          accountType: this.tableRowValue.accountType || '',
          assistiveRentType: this.tableRowValue.assistiveRentType || '',
          accountDataType: this.tableRowValue.accountDataType || '',
          userName: this.tableRowValue.userName || '',
          accountRole: this.tableRowValue.roles.map(item => item.roleId) || '',
          ancestors: ancestors || [],
          selectedOptions: [],
          phonenumber: this.tableRowValue.phonenumber || '',
          status: this.tableRowValue.status,
          createTime: this.tableRowValue.createTime || '',
          servicePeriod: this.tableRowValue.servicePeriod || ''
        }

        this.disabled = true
        this.disabledPart = true
        this.btnWrap = false
      }
    },
    // 监听级联下拉框
    handleChange(value) {
      if (this.title === '编辑账号' && JSON.stringify(this.beforeIds) !== JSON.stringify(value)) {
        this.form.accountRole = []
        this.beforeIds = value
        this.$message.warning('所属部门改变，账号角色被清空，您可以重新选中账号角色')
      }
    },
    // 监听关联项目下拉列表
    selectProject(value) {
      if (value === '') {
        this.forms.systemName = ''
        this.forms.servicePeriod = ''
      } else {
        this.projectOptions.forEach(item => {
          if (item.projectId === value) {
            this.forms.systemName = item.systemName
            this.forms.servicePeriod = item.servicePeriod
          }
        })
      }
    },
    // 重置项目表单
    resetForms() {
      this.forms = {
        projectName: '',
        project: '',
        servicePeriod: '',
        systemName: ''
      }
    },
    // 校验手机号码
    phonenumberChange() {
      const _value = this.form.phonenumber.trim()
      if (this.form.phonenumber === '') {
        this.phonenumberRequired = true
      } else {
        if (!/^[1](([3][0-9])|([4][5-9])|([5][0-3,5-9])|([6][5,6])|([7][0-8])|([8][0-9])|([9][1,8,9]))[0-9]{8}$/.test(_value)) {
          this.$message.error('手机号格式不正确，请重新输入！')
          this.phonenumberRequired = false
        } else {
          this.phonenumberRequired = true
        }
      }
    }
  }
}

</script>

<style scoped>
	.el-dialog__wrapper {
		background-color: rgba(0, 0, 0, 0.3);
		z-index: 999;
	}

	.el-cascader {
		display: block;
	}

	.el-row {
		margin: 0 !important;
	}

	.el-select,
	.el-date-editor {
		width: 100% !important;
	}

	.el-form-item__error {
		z-index: 1;
	}

	.el-form-item {
		margin-bottom: 32px;
	}
</style>
<style lang="scss">
  .account-add-dailog {
    .el-dialog__body {
      overflow: visible;
      padding:  0 0;
      .new-daillog-body {
        height: 50vh;
        padding: 20px 36px 66px 36px;
        overflow: auto;
        .el-main {
          overflow: visible;
        }
      }
    }
    .el-dialog__footer {
      position: absolute;
      width: 100%;
      background: #ffffff;
      bottom: 0;
      z-index: 99;
    }
  }
</style>
