<!--志愿者服务记录-->
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
                    <el-form-item :label="this.isEditForm?'身份证号':'身份证号：'" prop="idCard">
                      <el-input
                        v-if="this.isEditForm"
                        ref="idCard"
                        v-model="form.idCard"
                        clearable
                        placeholder="请输入身份证号"
                        @keyup.enter.native="getIdData()"
                      />
                      <span v-else>{{ form.idCard }}</span>
                    </el-form-item>
                  </el-col>
                  <el-col :md="this.adaptiveGrid.md" :lg="this.adaptiveGrid.lg">
                    <el-form-item :label="this.isEditForm?'姓名':'姓名：'" prop="fullName">
                      <el-input
                        v-if="this.isEditForm"
                        v-model="form.fullName"
                        clearable
                        placeholder="系统自动关联"
                        @keyup.enter.native="editContent('form_base')"
                      />
                      <span v-else>{{ form.fullName }}</span>
                    </el-form-item>
                  </el-col>
                  <el-col :md="this.adaptiveGrid.md" :lg="this.adaptiveGrid.lg">
                    <el-form-item :label="this.isEditForm?'性别':'性别：'" prop="sex">
                      <el-input
                        v-if="this.isEditForm"
                        ref="sex"
                        v-model="form.sexName"
                        disabled
                        clearable
                        placeholder="系统自动关联"
                        @keyup.enter.native="editContent('form_base')"
                      />
                      <span v-else>{{ form.sexName }}</span>
                    </el-form-item>
                  </el-col>
                  <el-col :md="this.adaptiveGrid.md" :lg="this.adaptiveGrid.lg">
                    <el-form-item :label="this.isEditForm?'出生日期':'出生日期：'" prop="birthday">
                      <el-input
                        v-if="this.isEditForm"
                        ref="birthday"
                        v-model="form.birthday"
                        disabled
                        clearable
                        placeholder="系统自动关联"
                        @keyup.enter.native="editContent('form_base')"
                      />
                      <span v-else>{{ form.birthday }}</span>
                    </el-form-item>
                  </el-col>
                  <el-col :md="this.adaptiveGrid.md" :lg="this.adaptiveGrid.lg">
                    <el-form-item :label="this.isEditForm?'年龄':'年龄：'" prop="age">
                      <el-input
                        v-if="this.isEditForm"
                        ref="age"
                        v-model="form.age"
                        disabled
                        clearable
                        placeholder="系统自动关联"
                        @keyup.enter.native="editContent('form_base')"
                      />
                      <span v-else>{{ form.age }}</span>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-form>
            </el-collapse-item>
            <!--基本信息item end-->

            <!--服务信息item start-->
            <el-collapse-item name="baseItem_2">
              <template slot="title">
                <div class="titleSlider">
                  <span>
                    <i class="titleTip" />服务信息
                  </span>
                </div>
              </template>
              <el-form
                ref="form_service"
                key="form_service"
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
                        @keyup.enter.native="editContent('form_base')"
                        @change="changeGLXMSelect"
                      >
                        <el-option
                          v-for="item in guanlianxiangmuOptions"
                          v-if="guanlianxiangmuOptions.length !== 0"
                          :key="item.id"
                          :label="item.serviceName"
                          :value="item.id"
                        />
                      </el-select>
                      <span v-else>{{ guanlianxiangmuName }}</span>
                    </el-form-item>
                  </el-col>
                  <el-col :md="this.adaptiveGrid.md" :lg="this.adaptiveGrid.lg">
                    <el-form-item :label="this.isEditForm?'服务日期':'服务日期：'" prop="recordDate">
                      <el-date-picker
                        v-if="this.modelType === 'add'"
                        ref="recordDate"
                        v-model="form.recordDate"
                        type="dates"
                        :editable="false"
                        value-format="yyyy-MM-dd"
                        placeholder="请选择服务日期"
                        style="width:100%;"
                        @keyup.enter.native="editContent('form_base')"
                      />
                      <el-date-picker
                        v-else-if="this.modelType === 'edit'"
                        ref="recordDate"
                        v-model="form.recordDate"
                        type="date"
                        value-format="yyyy-MM-dd"
                        placeholder="请选择服务日期"
                        style="width:100%;"
                      />
                      <span v-else>{{ recordDateName }}</span>
                    </el-form-item>
                  </el-col>
                  <el-col :md="this.adaptiveGrid.md" :lg="this.adaptiveGrid.lg">
                    <el-form-item :label="this.isEditForm?'服务内容':'服务内容：'" prop="serviceContent">
                      <el-select
                        v-if="this.isEditForm"
                        v-model="form.serviceContent"
                        placeholder="请选择服务内容"
                        clearable
                        style="width:100%;"
                        @keyup.enter.native="editContent('form_base')"
                      >
                        <el-option
                          v-for="item in serviceContentOptions"
                          :key="item.dictValue"
                          :label="item.dictLabel"
                          :value="item.dictValue"
                        />
                      </el-select>
                      <span v-else>{{ form.serviceContentName }}</span>
                    </el-form-item>
                  </el-col>
                  <!-- :disabled="volunteerIdDisabled"-->
                  <el-col :md="this.adaptiveGrid.md" :lg="this.adaptiveGrid.lg">
                    <el-form-item :label="this.isEditForm?'志愿者':'志愿者：'" prop="volunteer">
                      <el-select
                        v-if="this.isEditForm"
                        v-model="hasVolunteerId"
                        filterable
                        placeholder="请选择服务内容"
                        :disabled="true"
                        clearable
                        style="width:100%;"
                        @keyup.enter.native="editContent('form_base')"
                        @change="handleVolunteerChange"
                      >
                        <el-option
                          v-for="item in volunteerOptions"
                          :key="item.id"
                          :label="item.fullName"
                          :value="item.id"
                        />
                      </el-select>
                      <span v-else>{{ form.volunteerName }}</span>
                    </el-form-item>
                  </el-col>
                  <el-col :md="this.adaptiveGrid.md" :lg="this.adaptiveGrid.lg">
                    <el-form-item :label="this.isEditForm?'所属组织':'所属组织：'" prop="org">
                      <el-input
                        v-if="this.isEditForm"
                        ref="org"
                        v-model="form.org"
                        disabled
                        clearable
                        placeholder="系统自动关联"
                        @keyup.enter.native="editContent('form_base')"
                      />
                      <span v-else>{{ form.org }}</span>
                    </el-form-item>
                  </el-col>
                  <el-col :md="this.adaptiveGrid.md" :lg="this.adaptiveGrid.lg">
                    <el-form-item :label="this.isEditForm?'服务结果':'服务结果：'" prop="serviceResult">
                      <el-select
                        v-if="this.isEditForm"
                        v-model="form.serviceResult"
                        placeholder="请选择服务结果"
                        clearable
                        style="width:100%;"
                        @keyup.enter.native="editContent('form_base')"
                      >
                        <el-option
                          v-for="item in serviceStatusOptions"
                          :key="item.dictValue"
                          :label="item.dictLabel"
                          :value="item.dictValue"
                        />
                      </el-select>
                      <span v-else>{{ form.serviceResultName }}</span>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-form>
            </el-collapse-item>
            <!--服务信息item end-->

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
  recordDetailsData,
  submitDataAdd,
  submitDataEdit,
  validateServiceObj,
  getVolunteerSelectData,
  getGuanlianxiangmuSelect
} from '@/api/sidekickProjectConfig/volunteerServiceRecord'
import {
  relatedProjectsSelectData
} from '@/api/sidekickProjectConfig/volunteerManagement'
import { allSelectdictionaryData } from '@/api/facilitiesConfig/communityFacilities'
import { adaptiveGrid_max, adaptiveGrid_plus } from '@/common/index'
import { closeSelectedTag } from '@/utils/rooterJump'
import { getEditAuthority } from '@/api/user'
import { limitTextEllipsis, computerAge, validateForms, scrollToTop } from '@/utils/index'

export default {
  data() {
    const _that = this
    // 身份证校验
    const verifyIdCard = (rule, value, callback) => {
      // 身份证前台校验成功后，调后台身份证关联数据
      validateServiceObj(value).then(response => {
        if (response.code === 0 || response.code === '0') {
          callback(new Error('该身份证对应的服务对象不存在！'))
        } else if (response.code === 1 || response.code === '1') {
          callback(new Error(response.msg))
        } else if (response.code === 2 || response.code === '2') {
          if (response.date) {
            if (response.date.recordDate === 'undefined') {
              response.date.recordDate = []
            }
            // 新增时，若身份证回显的id不为空，则将志愿者选项设为不可操作状态，若id为空，则志愿者选项可操作
            if (_that.modelType === 'add') {
              if (response.date.volunteerId === null || response.date.volunteerId === '') {
                _that.volunteerIdDisabled = false
              } else {
                _that.volunteerIdDisabled = true
              }
            }
            if (_that.noVerifyID) {
              // 根据身份证的回显，给关联项目下拉框赋值
              this.guanlianxiangmuOptions = response.date.bizVolunteerProjects || this.guanlianxiangmuOptions
              _that.setServiceObjData(response.date) // 填充服务对象信息
            }
            // 身份证回显，如果有志愿者id,则将志愿者名称显示在表单，如果没有志愿者id,则弹出提示
            if (response.date.volunteerId !== '' && response.date.volunteerId !== null) {
              this.hasVolunteerId = response.date.volunteer.fullName
            } else {
              this.hasVolunteerId = ''
            }
            callback()
          } else {
            callback(new Error('身份证校验失败！'))
          }
        } else {
          callback(new Error('身份证校验失败！'))
        }
      }).catch(() => {
        callback(new Error('身份证校验接口调用失败！'))
      })
    }

    return {
      noVerifyID: true, // 新增和编辑时，不再去校验身份证接口。替换表单的值
      // 下拉框字典数据
      guanlianxiangmuOptions: [], // 关联项目
      guanlianxiangmuOptionsAll: [], // 关联项目所有的选项
      serviceContentOptions: [], // 服务内容
      serviceStatusOptions: [], // 服务结果
      volunteerOptions: [], // 志愿者
      isEditForm: true, // 页面表单是否可编辑操作。查看时：false,编辑-新增时：true
      // 表单
      form: {
        fullName: '', // 姓名
        volunteerProjectListName: '', // 关联项目
        volunteerProjectList: [], // 关联项目
        idCard: '', // 身份证号
        sex: '', // 性别
        sexName: '', //
        birthday: '', // 出生日期
        age: '', // 年龄
        recordDate: [], // 服务日期
        serviceContent: '', // 服务内容
        serviceContentName: '', // 服务内容
        volunteer: '', // 志愿者
        volunteerId: '', // 志愿者
        volunteerName: '', // 志愿者
        org: '', // 所属组织
        serviceResult: 'perfection', // 服务结果
        serviceResultName: '', // 服务结果
        vsoId: ''// 志愿者id
      },

      recordDateName: '', // 服务日期，查看时

      loading: false,
      guanlianxiangmuId: '', // 关联项目回显值id
      guanlianxiangmuName: '', // 关联项目回显值name
      editorOption: {},
      // form 表单的验证规则
      rulesForm: {
        // 身份证
        idCard: [
          // trigger 设置为 MANUAL_TRIGGER 是不让组件自动在 blur 的时候校验。
          // 手动在 blur 事件处理函数中处理。将校验和校验后的动作解耦。
          { required: true, trigger: 'blur', message: '身份证不能为空，请输入！' },
          { required: true, trigger: 'blur', validator: verifyIdCard }
        ],
        // 服务日期
        recordDate: [
          { required: true, trigger: 'change', message: '服务日期不能为空，请选择！' }
        ]
      },
      activeTabs: 'base', // tab标签切换默认选中name参数
      activeCollapse: ['baseItem_1', 'baseItem_2', 'baseItem_3', 'baseItem_4', 'baseItem_5', 'baseItem_6'], // 折叠面板默认打开name参数
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
      modelType: '', // 查看：look  编辑：edit  新增：add
      instituType: '', // 机构类型
      editAuthority: false, // 编辑按钮的权限
      idCardDisabled: true, // 身份证编辑时不可编辑
      volunteerIdDisabled: false, // 输入身份证，如果有志愿者id,则志愿者不可编辑

      hasVolunteerId: ''// 当前志愿者是否存在在志愿者下拉列表中,
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
        this.idCardDisabled = false
        await this.editGetData(id, 'edit')
      } else if (this.modelType === 'add') {
        this.isEditForm = true
      } else if (this.modelType === 'look') {
        this.isEditForm = false
        await this.editGetData(id, '')
      }
    },
    getIdData() {
      validateServiceObj(this.form.idCard).then(response => {
        if (response.code == 0) {
          this.$message.error('该身份证对应的服务对象不存在！')
        } else if (response.code == 1) {
          this.$message.error(response.msg)
        } else if (response.code == 2) {
          if (response.date) {
            if (response.date.recordDate === 'undefined') {
              response.date.recordDate = []
            }
            // 新增时，若身份证回显的id不为空，则将志愿者选项设为不可操作状态，若id为空，则志愿者选项可操作
            if (this.modelType === 'add') {
              if (response.date.volunteerId === null || response.date.volunteerId === '') {
                this.volunteerIdDisabled = false
              } else {
                this.volunteerIdDisabled = true
              }
            }
            if (this.noVerifyID) {
              // 根据身份证的回显，给关联项目下拉框赋值
              this.guanlianxiangmuOptions = response.date.bizVolunteerProjects || this.guanlianxiangmuOptions
              this.setServiceObjData(response.date) // 填充服务对象信息
            }
            // 身份证回显，如果有志愿者id,则将志愿者名称显示在表单，如果没有志愿者id,则弹出提示
            if (response.date.volunteerId !== '' && response.date.volunteerId !== null) {
              this.hasVolunteerId = response.date.volunteer.fullName
            } else {
              this.hasVolunteerId = ''
            }
          } else {
            this.$message.error('身份证校验失败！')
          }
        } else {
          this.$message.error('身份证校验失败！')
        }
      }).catch(() => {
        this.$message.error('身份证校验接口调用失败！')
      })
    },
    // 编辑-查看 获取数据
    editGetData(id, st) {
      return new Promise((resolve, reject) => {
        // 请求当前服务项目信息
        recordDetailsData(id, st).then(response => {
          if (response) {
            // 页面form表单的值
            response.fullName = response.vsoName
            this.form = _.cloneDeep(response)
            if (this.form.volunteerProjectList) {
              this.form.volunteerProjectList.forEach(item => {
                this.guanlianxiangmuId = item.id// 关联项目回显值id
                this.guanlianxiangmuName = item.serviceName// //关联项目回显值name
              })
            }
            // 编辑时，处理服务日期
            if (this.modelType === 'edit') {
              this.form.recordDate = new String()
              if (response.recordDate && response.recordDate.length !== 0) {
                this.form.recordDate = response.recordDate[0].serviceDate
              } else {
                this.form.recordDate = ''
              }
            }
            // 查看时，处理服务日期的格式
            if (this.modelType === 'look') {
              if (this.form.recordDate) {
                this.form.recordDate.forEach((item, index) => {
                  this.recordDateName += item.serviceDate
                  if (index !== this.form.recordDate.length - 1) {
                    this.recordDateName += '，'
                  }
                })
              }
            }
            this.form.vsoId = response.vsoId
            // this.form.fullName = response.vsoName;
            this.form.sexName = response.vsoSexName
            this.form.birthday = response.vsoBirthday
            this.form.org = response.orgName
            if (this.form.birthday) {
              this.form.age = computerAge(this.form.birthday) + '岁'
            } else {
              this.form.age = ''
            }

            // 如果当前志愿者id，已经不存在与志愿者的下拉框中时，则显示该志愿者的名称
            if (this.volunteerOptions && this.volunteerOptions.length !== 0) {
              this.volunteerOptions.forEach(item => {
                if (item.id === this.form.volunteerId) {
                  this.hasVolunteerId = this.form.volunteerId
                } else {
                  this.hasVolunteerId = this.form.volunteerName
                }
              })
            } else {
              this.hasVolunteerId = this.form.volunteerName
            }

            // 根据回显的志愿者id,显示对应的所属组织
            if (this.form.volunteerId) {
              this.handleVolunteerChange(this.form.volunteerId)
            }
          } else {
            this.$message.error('获取志愿者服务记录失败！')
          }
        }).catch(() => {
          this.$message.error('获取志愿者服务记录失败！')
        })
      })
    },
    // 获取下拉字典
    getSelect() {
      return new Promise((resolve, reject) => {
        // 数据字典接口
        const dicKey = 'service_content,service_status'
        allSelectdictionaryData(dicKey).then(response => {
          if (response.code === 0) {
            for (const k in response.data) {
              switch (k) {
                case 'service_content':
                  this.serviceContentOptions = response.data[k]
                  break
                case 'service_status':
                  this.serviceStatusOptions = response.data[k]
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

        /* 关联项目下拉框值*/
        if (this.modelType === 'add' || this.modelType === 'edit') {
          relatedProjectsSelectData().then(response => {
            this.guanlianxiangmuOptions = response
            this.guanlianxiangmuOptionsAll = response
          }).catch(error => {
            this.$message.error('关联项目获取失败！')
          })
        }
        /* 志愿者下拉框值*/
        // getVolunteerSelectData().then(response => {
        // 	this.volunteerOptions = response;
        // }).catch(error => {
        // 	this.$message.error('关联项目获取失败！');
        // });
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
      this.$router.push({ path: '/sidekickProjectConfig/volunteerServiceRecord' })
    },
    // 下一步
    tabsStep(tabsName) {
      this.activeTabs = tabsName
    },

    // 确定按钮-提交表单
    editContent(formName) {
      if (this.hasVolunteerId === '') {
        return this.$message.error('该服务对象未绑定志愿者请绑定志愿者后添加服务记录')
      }
      this.noVerifyID = false
      const formRefs = ['form_base', 'form_service'].map(key => this.$refs[key])

      validateForms(formRefs).then(() => {
        // 志愿者
        if (this.volunteerOptions && this.volunteerOptions.length !== 0) {
          this.volunteerOptions.forEach(item => {
            if (item.id === this.hasVolunteerId) {
              this.form.volunteerId = this.hasVolunteerId
            }
          })
        }
        const params = _.cloneDeep(this.form)
        params.vsoName = params.fullName
        params.vsoSexName = params.sexName
        params.vsoBirthday = params.birthday
        // 关联项目
        params.volunteerProjectList = new Array()
        let vjp = {
          id: '',
          serviceName: ''
        }
        if (this.guanlianxiangmuId) {
          if (this.guanlianxiangmuOptions && this.guanlianxiangmuOptions.length !== 0) {
            this.guanlianxiangmuOptions.forEach(item => {
              if (item.id === this.guanlianxiangmuId) {
                vjp = {
                  id: this.guanlianxiangmuId,
                  serviceName: ''
                }
              }
            })
          }
        }
        params.volunteerProjectList.push(vjp)

        if (this.modelType === 'edit') {
          params.recordDate = [
            {
              vsrId: '',
              serviceDate: this.form.recordDate
            }
          ]
        } else if (this.modelType === 'add') {
          params.recordDate = new Array()
          if (this.form.recordDate.length !== 0) {
            this.form.recordDate.forEach(item => {
              const _obj = {
                vsrId: '',
                serviceDate: item
              }
              params.recordDate.push(_obj)
            })
          }
        }
        const _title_ = limitTextEllipsis(this.form.fullName, 10)
        // 新增
        if (this.modelType === 'add') {
          submitDataAdd(params).then(response => {
            if (response.code === 0) {
              this.$message({
                type: 'success',
                message: '新增‘' + _title_ + '’志愿者服务记录成功!'
              })
              // 关闭页面
              this.closeDetailsPage()
            } else {
              this.$message.error(response.msg)
            }
          }).catch(() => {
            this.$message.error('新增‘' + _title_ + '’志愿者服务记录失败!')
          })
        }
        // 编辑
        else if (this.modelType === 'edit') {
          submitDataEdit(params).then(response => {
            if (response.code === 0) {
              this.$message({
                type: 'success',
                message: '编辑‘' + _title_ + '’志愿者服务记录成功!'
              })
              // 关闭页面
              this.closeDetailsPage()
            } else {
              this.$message.error(response.msg)
            }
          }).catch(() => {
            this.$message.error('编辑‘' + _title_ + '’志愿者服务记录失败!')
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
      const _id_ = this.$route.query.id
      const _title_ = limitTextEllipsis(this.form.fullName, 10)
      this.$router.push({
        path: `/volunteerServiceRecord/details/${_id_}`,
        query: { 'id': _id_, 'modelType': 'edit', '_title': `编辑${_title_}` } // modelType: 查看:look，编辑:edit，新增:add的类型
      })
    },
    // 根据身份证查到的代入到表单
    setServiceObjData(data) {
      this.form.vsoId = data.id
      this.form.fullName = data.fullName
      this.form.sexName = data.sexName
      this.form.birthday = data.birthday
      this.form.org = data.orgName
      this.form.age = data.age ? data.age + '岁' : ''
      this.guanlianxiangmuId = data.projectListId// 关联项目
      this.form.volunteerId = data.volunteerId// 志愿者
      this.handleVolunteerChange(data.volunteerId)
    },
    // 选择志愿者change事件
    handleVolunteerChange(val) {
      if (val !== '' && val !== null) {
        this.volunteerOptions.forEach(item => {
          if (item.id === val) {
            this.form.org = item.socialOrgName
          } else {
            // this.form.volunteerId = this.form.volunteerName;
          }
        })
        this.getGuanlianxiangmuSelectList(val)
      } else {
        this.form.org = ''
        // this.guanlianxiangmuOptions = [];
      }
    },
    // 根据选择的志愿者，加载相应的关联项目下拉框的列表
    getGuanlianxiangmuSelectList(val) {
      getGuanlianxiangmuSelect(val).then(response => {
        if (response.code === 0 && response.data !== null) {
          this.guanlianxiangmuOptions = response.data
          if (this.guanlianxiangmuOptions && this.guanlianxiangmuOptions.length !== 0) {
            this.guanlianxiangmuOptions.forEach(item => {
              if (this.form.volunteerProjectList && this.form.volunteerProjectList.length !== 0) {
                if (item.id === this.form.volunteerProjectList[0].id) {
                  this.guanlianxiangmuId = this.form.volunteerProjectList[0].id
                } else {
                  this.guanlianxiangmuId = this.form.volunteerProjectList[0].serviceName
                }
              } else {
                this.guanlianxiangmuId = ''
              }
            })
          } else {
            this.guanlianxiangmuOptions = []
            if (this.form.volunteerProjectList.length === 0) {
              this.guanlianxiangmuId = ''
            } else {
              this.guanlianxiangmuId = this.form.volunteerProjectList[0].serviceName
            }
          }
        } else {
          this.guanlianxiangmuOptions = this.guanlianxiangmuOptionsAll
          if (this.form.volunteerProjectList.length === 0) {
            this.guanlianxiangmuId = ''
          } else {
            this.guanlianxiangmuId = this.form.volunteerProjectList[0].serviceName
          }
        }
      }).catch(error => {
        this.$message.error('获取关联项目列表失败！')
      })
    },
    // 选择关联项目
    changeGLXMSelect(v) {
      this.guanlianxiangmuId = v
    }
  }
}
</script>

<style scoped>
	@import "~@/styles/form.css";

	.tableContainer {
		margin-top: 20px;
	}
</style>
