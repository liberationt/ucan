<template>
  <el-container>
    <el-main class="tableContainer">
      <el-tabs v-model="activeTabs">
        <el-tab-pane label="入住记录" name="base">
          <el-collapse v-model="activeCollapse">
            <el-collapse-item name="baseItem_1">
              <template slot="title">
                <div class="titleSlider">
                  <span>
                    <i class="titleTip" />人员基本信息
                  </span>
                </div>
              </template>
              <el-form
                ref="form_base"
                key="form_base"
                :model="form"
                :rules="isEditForm?rulesForm:null"
                label-width="120px"
                @keyup.enter.native="submitBtn"
              >
                <el-row :gutter="0">
                  <el-form-item hidden prop="personId">
                    <el-input v-model="form.personId" disabled />
                  </el-form-item>
                  <el-col :md="adaptiveGrid.md" :lg="adaptiveGrid.lg">
                    <el-form-item :label="isEditForm?'姓名':'姓名：'" prop="fullName">
                      <el-input
                        v-if="isEditForm"
                        v-model.trim="form.fullName"
                        clearable
                        :disabled="!!form.personId"
                        placeholder="请输入姓名"
                      />
                      <span v-else>{{ form.fullName }}</span>
                    </el-form-item>
                  </el-col>
                  <el-col :md="adaptiveGrid.md" :lg="adaptiveGrid.lg">
                    <el-form-item :label="isEditForm?'身份证号':'身份证号：'" prop="idCard">
                      <el-input
                        v-if="isEditForm"
                        v-model.trim="form.idCard"
                        :disabled="idCardDisabled"
                        placeholder="请输入身份证号"
                        @blur="handleIdCardBlur"
                      />
                      <span v-else>{{ form.idCard }}</span>
                    </el-form-item>
                  </el-col>
                  <el-col :md="adaptiveGrid.md" :lg="adaptiveGrid.lg">
                    <el-form-item :label="isEditForm?'性别':'性别：'" prop="sex">
                      <el-select
                        v-if="isEditForm"
                        v-model="form.sex"
                        :disabled="!!form.personId"
                        placeholder="请选择性别"
                        clearable
                        style="width:100%;"
                      >
                        <el-option
                          v-for="item in sexOptions"
                          :key="item.dictValue"
                          :label="item.dictLabel"
                          :value="item.dictValue"
                        />
                      </el-select>
                      <span v-else>{{ form.sex }}</span>
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
                        :disabled="!!form.personId"
                        value-format="yyyy-MM-dd"
                        @change="birthdayChange"
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
                        placeholder="系统自动计算"
                      />
                      <span v-else>{{ form.age }}</span>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-form>
            </el-collapse-item>
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
                :rules="isEditForm?rulesForm:null"
                label-width="120px"
                @keyup.enter.native="submitBtn"
              >
                <el-row :gutter="0">
                  <el-col :md="adaptiveGrid.md" :lg="adaptiveGrid.lg">
                    <el-form-item :label="isEditForm?'服务类型':'服务类型：'" prop="serviceType">
                      <el-select
                        v-if="isEditForm"
                        v-model="form.serviceType"
                        clearable
                        placeholder="请选择服务类型"
                        style="width:100%;"
                        :disabled="type ? true :false"
                        @change="handleServiceTypeChange"
                      >
                        <el-option
                          v-for="item in serviceTypeOptions"
                          :key="item.dictValue"
                          :label="item.dictLabel"
                          :value="item.dictValue"
                        />
                      </el-select>
                      <span v-else>{{ form.serviceType }}</span>
                    </el-form-item>
                  </el-col>
                  <el-col :md="adaptiveGrid.md" :lg="adaptiveGrid.lg">
                    <el-form-item :label="isEditForm?'服务机构':'服务机构：'" prop="orgId">
                      <el-select
                        v-if="isEditForm"
                        v-model="form.orgId"
                        clearable
                        :disabled="type || !form.serviceType ? true :false"
                        placeholder="输入服务机构名称查询"
                        style="width:100%;"
                        filterable
                        remote
                        :remote-method="getServiceOrgOptions"
                        :loading="serviceOrgLoading"
                        @change="orgIsValue()"
                      >
                        <el-option
                          v-for="item in serviceOrgOptions"
                          :key="item.dictValue"
                          :label="item.dictLabel"
                          :value="item.dictValue"
                        />
                      </el-select>
                      <span v-else>{{ form.orgName }}</span>
                    </el-form-item>
                  </el-col>
                  <el-col :md="adaptiveGrid.md" :lg="adaptiveGrid.lg">
                    <el-form-item :label="isEditForm?'入住时间':'入住时间：'" prop="inDate">
                      <el-date-picker
                        v-if="isEditForm"
                        v-model="form.inDate"
                        type="date"
                        format="yyyy年MM月dd日"
                        value-format="yyyy-MM-dd"
                        placeholder="请选择入住时间"
                        clearable
                        style="width:100%;"
                      />
                      <span v-else>{{ form.inDate }}</span>
                    </el-form-item>
                  </el-col>
                  <el-col :md="adaptiveGrid.md" :lg="adaptiveGrid.lg">
                    <el-form-item :label="isEditForm?'房间床位号':'房间床位号：'" prop="roomBedNo">
                      <el-input
                        v-if="isEditForm"
                        v-model.trim="form.roomBedNo"
                        clearable
                        placeholder="请输入房间床位号"
                      />
                      <span v-else>{{ form.roomBedNo }}</span>
                    </el-form-item>
                  </el-col>
                  <el-col :md="adaptiveGrid.md" :lg="adaptiveGrid.lg">
                    <el-form-item :label="isEditForm?'机构服务人员':'机构服务人员：'" prop="serviceMan">
                      <el-input
                        v-if="isEditForm"
                        v-model.trim="form.serviceMan"
                        clearable
                        placeholder="请输入机构服务人员"
                      />
                      <span v-else>{{ form.serviceMan }}</span>
                    </el-form-item>
                  </el-col>
                  <el-col :md="adaptiveGrid.md" :lg="adaptiveGrid.lg">
                    <el-form-item prop="servicePhone">
                      <!-- 宽度设为90px，使断句更友好 -->
                      <span
                        slot="label"
                        style="display:inline-block;line-height:18px;width:90px;"
                      >{{ isEditForm?'服务人员联系方式':'服务人员联系方式：' }}</span>
                      <el-input
                        v-if="isEditForm"
                        v-model.trim="form.servicePhone"
                        clearable
                        placeholder="请输入服务人员联系方式"
                      />
                      <span v-else>{{ form.servicePhone }}</span>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-form>
            </el-collapse-item>
          </el-collapse>
        </el-tab-pane>
      </el-tabs>

      <el-footer>
        <div v-if="isEditForm">
          <el-button type="warning" class="base-btn" @click="submitBtn">确定</el-button>
          <el-button class="cancel-btn" @click="cancelBtn">取消</el-button>
        </div>
        <div v-else>
          <el-button v-if="editAuthority" type="warning" class="base-btn" @click="editContent">编辑</el-button>
          <el-button class="cancel-btn" @click="closeDetailsPage">返回</el-button>
        </div>
      </el-footer>
    </el-main>
  </el-container>
</template>

<script>
import _ from 'lodash'
import {
  uniqueID,
  getCheckInPeople,
  addCheckInPeople,
  editCheckInPeople,
  getUserInfo
} from '@/api/facilitiesConfig/checkInPeople'
import {
  validateIdCard,
  allSelectdictionaryData
} from '@/api/common'
import {
  echoPerson
} from '@/api/userInfoConfig/index'
import {
  institutionSearch as pensionAgencySearch
} from '@/api/facilitiesConfig/pensionAgency'
import {
  institutionSearch as communityFacilitySearch
} from '@/api/facilitiesConfig/communityFacilities'
import {
  getEditAuthority,
  getOrgInfo
} from '@/api/user'
import {
  verifyFullName,
  verifyIdCard,
  verifyHomePhoneOrMobile
} from '@/utils/validate'
import {
  computerAge,
  getBirthdayFromIdCard,
  validateForms,
  scrollToTop
} from '@/utils/index'
import { adaptiveGrid_max, adaptiveGrid_plus } from '@/common/index'
import { closeSelectedTag } from '@/utils/rooterJump'

export default {
  data() {
    return {
      type: '', // 养老机构agency 或 社区设施 facility
      isEditForm: true, // 页面表单是否可编辑操作。查看时：false,编辑-新增时：true
      modelType: '', // 查看：look  编辑：edit  新增：add
      idCardDisabled: false, // 单独设置idCard是否禁用
      activeTabs: 'base',
      activeCollapse: ['baseItem_1', 'baseItem_2'],
      adaptiveGrid: adaptiveGrid_max,
      adaptiveGrid_plus: adaptiveGrid_plus,
      editAuthority: false,

      sexOptions: [], // 性别
      serviceTypeOptions: [], // 服务类型
      serviceOrgOptions: [], // 服务机构
      serviceOrgLoading: false, // 搜索服务机构的 loading

      form: {
        personId: '', // 关联的老人ID
        fullName: '', // 姓名
        idCard: '', // 身份证
        sex: '', // 性别
        birthday: '', // 出生日期（年龄不传，只传出生日期）
        age: '', // 年龄
        serviceType: '', // 服务类型
        orgId: '', // 服务机构
        inDate: '', // 入住时间
        roomBedNo: '', // 房间床位号
        serviceMan: '', // 服务人员
        servicePhone: ''// 服务人员联系方式
      },
      rulesForm: {
        fullName: [
          { required: true, trigger: 'blur', message: '姓名不能为空，请输入！' },
          { trigger: 'blur', validator: verifyFullName }
        ],
        idCard: [
          { required: true, trigger: 'MANUAL_TRIGGER', message: '身份证不能为空，请输入！' },
          { trigger: 'MANUAL_TRIGGER', validator: verifyIdCard },
          {
            trigger: 'MANUAL_TRIGGER', validator: (rule, value, callback) => {
              validateIdCard(value).then(response => {
                if (response.code === 0) {
                  const params = { idCard: this.form.idCard, id: this.form.id || '' }
                  uniqueID(params).then(response => {
                    if (response.code === 0) {
                      callback()
                    } else {
                      callback('该身份证已存在！')
                    }
                  }).catch(() => {
                    callback(new Error('入住人员唯一性接口调用失败！'))
                  })
                } else {
                  callback(response.message)
                }
              }).catch(() => {
                callback(new Error('身份证检验接口调用失败！'))
              })
            }
          }
        ],
        roomBedNo: [
          { max: 50, trigger: 'blur', message: '长度不能超过50，请重新输入' }
        ],
        serviceMan: [
          { max: 20, trigger: 'blur', message: '长度不能超过20，请重新输入' }
        ],
        servicePhone: [
          { max: 20, trigger: 'blur', message: '长度不能超过20，请重新输入' },
          { trigger: 'blur', validator: verifyHomePhoneOrMobile }
        ]
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

  mounted() {
    this.modelType = this.$route.query.modelType
    const _userId_ = this.$route.params.id || ''
    getUserInfo().then(res => {
      this.type = res.assistiveRentType
      if (this.type == 'facility') {
        this.form.serviceType = 'service_20XX'
      } else if (this.type == 'agency') {
        this.form.serviceType = 'service_10XX'
      }
      getOrgInfo({ userId: res.userId, accountDataType: 'prod' }).then(res => {
        this.serviceOrgOptions = [{
          dictLabel: res.data.org_name,
          dictValue: res.data.org_id
        }]
        this.form.orgId = res.data.org_id
      })
    })

    if (this.modelType === 'look') {
      this.isEditForm = false

      getCheckInPeople(_userId_).then(response => {
        this.form = response.data
      }).catch(() => {
        this.$message.error('获取入住人员失败！')
      })

      /* 编辑按钮的权限控制*/
      getEditAuthority(this.$route.query.menuId).then(response => {
        response.forEach((item) => {
          if (item.menuName === '编辑') {
            this.editAuthority = item.visible === '0'
          }
        })
      }).catch(() => {
        this.$message.error('获取编辑按钮的权限控制失败！')
      })
    } else {
      this.isEditForm = true
      this.getData(_userId_)
    }
  },

  methods: {
    async getData(id) {
      await this.getSelect()
      if (this.modelType === 'edit') {
        await this.editGetData(id)
      } else if (this.modelType === 'add') {

      }
    },
    // 编辑获取数据
    editGetData(id) {
      return new Promise((resolve, reject) => {
        getCheckInPeople(id).then(response => {
          this.form = response.data
          if (!this.form.orgId) this.form.serviceType = ''
          this.form.sex = this.form.sex == '男' ? '0' : this.form.sex == '女' ? '1' : this.form.sex
          // 为了服务机构选择组件正确显示，设置serviceTypeOptions
          this.serviceOrgOptions = [{
            dictLabel: this.form.orgName,
            dictValue: this.form.orgId
          }]
          // 当personId存在时，禁用idCard
          if (this.form.personId) {
            this.idCardDisabled = true
          }
        }).catch(() => {
          this.$message.error('获取入住人员失败！')
        })
      })
    },
    orgIsValue() {
			  // 是否有值
      if (!this.form.orgId) {
        this.form.serviceType = ''
      }
    },
    // 获取下拉字典
    getSelect() {
      const dictKey = [
        'sys_sex', // 性别
        'biz_service_type'// 服务类型
      ].join(',')
      return new Promise((resolve, reject) => {
        allSelectdictionaryData(dictKey).then(response => {
          const dict = response.data
          for (const key in dict) {
            switch (key) {
              case 'sys_sex':
                this.sexOptions = dict[key]
                break
              case 'biz_service_type':
                this.serviceTypeOptions = dict[key]
                break
            }
          }
          resolve()
        }).catch(() => {
          reject()
        })
      })
    },
    birthdayChange(val) {
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
    // 确定按钮-提交form表单
    submitBtn() {
      const formRefs = ['form_base', 'form_service'].map(key => this.$refs[key])
      validateForms(formRefs).then(() => {
        const _form = _.cloneDeep(this.form)
        if (_form.birthday === '') {
          _form.birthday = 'null'
        }
        // 新增
        if (this.modelType === 'add' && !this.form.id) {
          addCheckInPeople(_form).then(response => {
            if (response.code === 0) {
              this.$message({
                type: 'success',
                message: '新增入住人员保存成功!'
              })
              // 关闭页面，跳转到列表
              this.closeDetailsPage()
            } else {
              this.$message.error('新增入住人员操作失败，失败原因是：' + response.msg)
            }
          }).catch(() => {
            this.$message.error('新增入住人员操作失败!')
          })
        }
        // 编辑
        else if (this.modelType === 'edit' || (this.modelType === 'add' && this.form.id)) {
          editCheckInPeople(_form).then(response => {
            if (response.code === 0) {
              this.$message({
                type: 'success',
                message: '编辑入住人员保存成功!'
              })
              // 关闭页面，跳转到列表
              this.closeDetailsPage()
            } else {
              this.$message.error('编辑入住人员操作失败，失败原因是：' + response.msg)
            }
          }).catch(() => {
            this.$message.error('编辑入住人员操作失败!')
          })
        }
      }).catch(objectList => {
        scrollToTop()
      })
    },
    // 取消按钮
    cancelBtn() {
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
      closeSelectedTag(this, this.$route)
      this.$router.push('/streetPlatform/facilitiesConfig/checkInPeople')
    },
    // 查看详情页面，点击编辑按钮
    editContent() {
      this.$router.push({
        path: `/checkInPeople/details/${this.$route.params.id}`,
        query: { 'modelType': 'edit', '_title': `编辑${this.form.fullName}` }
      })
    },
    handleIdCardBlur() {
      this.$refs['form_base'].validateField('idCard', (message) => {
        const valid = message == ''
        if (valid) {
          // 检查有无关联用户，若有关联用户自动补全相关字段
          echoPerson(this.form.idCard, '').then(response => {
            if (response.id != '-1') {
              this.form.personId = response.id
              this.form.fullName = response.fullName
              this.form.sex = response.sex
              this.form.birthday = response.birthday
              // 手动赋值后，触发一次表单校验
              this.$refs.form_base.validate()
            } else {
              this.form.birthday = getBirthdayFromIdCard(this.form.idCard)
            }
          }).catch(error => {
            this.$message.error('身份证载入数据接口请求失败！')
          })
        } else {
          // 身份证校验失败，若表单有关联用户重置表单，否则只重置生日
          if (this.form.personId) {
            this.$refs.form_base.resetFields()
          } else {
            this.form.birthday = ''
          }
        }
      })
    },
    handleServiceTypeChange(val) {
      this.form.orgId = ''
      this.serviceOrgOptions = []
    },
    getServiceOrgOptions(keyword) {
      if (this.form.serviceType == 'service_10XX') {
        this.serviceOrgLoading = true
        pensionAgencySearch({ keyword }).then(response => {
          this.serviceOrgLoading = false
          const list = response.data.list
          this.serviceOrgOptions = list.map(item => {
            return {
              dictLabel: item.orgName,
              dictValue: item.orgId
            }
          })
        }).catch(() => {
          this.serviceOrgLoading = false
          this.$message.error('获取服务机构选项失败！')
        })
      } else if (this.form.serviceType == 'service_20XX') {
        this.serviceOrgLoading = true
        communityFacilitySearch({ keyword }).then(response => {
          this.serviceOrgLoading = false
          const list = response.data.list
          this.serviceOrgOptions = list.map(item => {
            return {
              dictLabel: item.orgName,
              dictValue: item.orgId
            }
          })
        }).catch(() => {
          this.serviceOrgLoading = false
          this.$message.error('获取服务机构选项失败！')
        })
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
</style>
