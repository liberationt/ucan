<template>
  <el-container>
    <el-main class="tableContainer">
      <el-tabs v-model="activeTabs">
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
              <el-form
                ref="form_base"
                key="form_base"
                :model="form"
                :rules="isEditForm?rulesForm:null"
                label-width="140px"
              >
                <el-form-item hidden prop="personId">
                  <el-input v-model="form.personId" disabled @keyup.enter.native="submitBtn" />
                </el-form-item>
                <el-row :gutter="0">
                  <el-col :md="adaptiveGrid.md" :lg="adaptiveGrid.lg">
                    <el-form-item :label="isEditForm?'身份证':'身份证：'" prop="idCard">
                      <el-input
                        v-if="isEditForm"
                        ref="idCard"
                        v-model.trim="form.idCard"
                        clearable
                        placeholder="请输入身份证"
                        @blur="handleIdCardBlur"
                        @keyup.enter.native="submitBtn"
                      />
                      <span v-else>{{ form.idCard }}</span>
                    </el-form-item>
                  </el-col>
                  <el-col :md="adaptiveGrid.md" :lg="adaptiveGrid.lg">
                    <el-form-item :label="isEditForm?'姓名':'姓名：'" prop="fullName">
                      <el-input
                        v-if="isEditForm"
                        v-model.trim="form.fullName"
                        disabled
                        placeholder="系统自动填充"
                      />
                      <span v-else>{{ form.fullName }}</span>
                    </el-form-item>
                  </el-col>
                  <el-col :md="adaptiveGrid.md" :lg="adaptiveGrid.lg">
                    <el-form-item :label="isEditForm?'户籍所属居委':'户籍所属居委：'" prop="fullName">
                      <el-input
                        v-if="isEditForm"
                        v-model.trim="form.committee"
                        disabled
                        placeholder="系统自动填充"
                      />
                      <span v-else>{{ form.committee }}</span>
                    </el-form-item>
                  </el-col>
                  <el-col :md="adaptiveGrid.md" :lg="adaptiveGrid.lg">
                    <el-form-item :label="isEditForm?'小区名称':'小区名称：'" prop="fullName">
                      <el-input
                        v-if="isEditForm"
                        v-model.trim="form.community"
                        disabled
                        placeholder="系统自动填充"
                      />
                      <span v-else>{{ form.community }}</span>
                    </el-form-item>
                  </el-col>
                  <el-col :md="adaptiveGrid.md" :lg="adaptiveGrid.lg">
                    <el-form-item :label="isEditForm?'户籍详细地址':'户籍详细地址：'" prop="fullName">
                      <el-input
                        v-if="isEditForm"
                        v-model.trim="form.addr"
                        disabled
                        placeholder="系统自动填充"
                      />
                      <span v-else>{{ form.addr }}</span>
                    </el-form-item>
                  </el-col>
                  <el-col :md="adaptiveGrid.md" :lg="adaptiveGrid.lg">
                    <el-form-item :label="isEditForm?'津贴标准(元/月)':'津贴标准(元/月)：'" prop="subsidy">
                      <el-input
                        v-if="isEditForm"
                        v-model="form.subsidy"
                        clearable
                        placeholder="请输入津贴标准"
                        oninput="if(isNaN(value)) { value = null } if(value.indexOf('.')>0){value=value.slice(0,value.indexOf('.')+3)}"
                        @keyup.enter.native="submitBtn"
                      />
                      <span v-else>{{ form.subsidy }}</span>
                    </el-form-item>
                  </el-col>
                  <el-col :md="adaptiveGrid.md" :lg="adaptiveGrid.lg">
                    <el-form-item :label="isEditForm?'账户名':'账户名：'" prop="bankCardName">
                      <el-input
                        v-if="isEditForm"
                        v-model.trim="form.bankCardName"
                        placeholder="请输入账户名"
                        clearable
                        style="width:100%;"
                        @keyup.enter.native="submitBtn"
                      />
                      <span v-else>{{ form.bankCardName }}</span>
                    </el-form-item>
                  </el-col>
                  <el-col :md="adaptiveGrid.md" :lg="adaptiveGrid.lg">
                    <el-form-item :label="isEditForm?'银行卡号':'银行卡号：'" prop="bankAccount">
                      <el-input
                        v-if="isEditForm"
                        ref="bankAccount"
                        v-model.trim="form.bankAccount"
                        placeholder="请输入银行卡号"
                        clearable
                        style="width:100%;"
                        onkeyup="this.value=this.value.replace(/[^\d.]/g,'');"
                        @keyup.enter.native="submitBtn"
                      />
                      <span v-else>{{ form.bankAccount }}</span>
                    </el-form-item>
                  </el-col>
                  <el-col :md="adaptiveGrid.md" :lg="adaptiveGrid.lg">
                    <el-form-item :label="isEditForm?'发卡银行':'发卡银行：'" prop="openBank">
                      <el-select
                        v-if="isEditForm"
                        v-model="form.openBank"
                        placeholder="请选择发卡银行"
                        clearable
                        style="width:100%;"
                        @keyup.enter.native="submitBtn"
                      >
                        <el-option
                          v-for="item in openBankOptions"
                          :key="item.dictValue"
                          :label="item.dictLabel"
                          :value="item.dictValue"
                        />
                      </el-select>
                      <span v-else>{{ form.openBankName }}</span>
                    </el-form-item>
                  </el-col>
                  <el-col :md="adaptiveGrid.md" :lg="adaptiveGrid.lg">
                    <el-form-item :label="isEditForm?'发卡日期':'发卡日期：'" prop="openDate">
                      <el-date-picker
                        v-if="isEditForm"
                        ref="openDate"
                        v-model="form.openDate"
                        type="date"
                        format="yyyy年MM月dd日"
                        value-format="yyyy-MM-dd"
                        placeholder="请选择发卡日期"
                        clearable
                        style="width:100%;"
                        @keyup.enter.native="submitBtn"
                      />
                      <span v-else>{{ form.openDate }}</span>
                    </el-form-item>
                  </el-col>
                  <el-col :md="adaptiveGrid.md" :lg="adaptiveGrid.lg">
                    <el-form-item :label="isEditForm?'有效日期':'有效日期：'" prop="validDate">
                      <el-date-picker
                        v-if="isEditForm"
                        ref="validDate"
                        v-model="form.validDate"
                        type="date"
                        format="yyyy年MM月dd日"
                        value-format="yyyy-MM-dd"
                        placeholder="请选择有效日期"
                        clearable
                        style="width:100%;"
                        @keyup.enter.native="submitBtn"
                      />
                      <span v-else>{{ form.validDate }}</span>
                    </el-form-item>
                  </el-col>

                  <el-col :md="adaptiveGrid.md" :lg="adaptiveGrid.lg">
                    <el-form-item :label="isEditForm?'卡片状态':'卡片状态：'" prop="status">
                      <el-select
                        v-if="isEditForm"
                        ref="status"
                        v-model="form.status"
                        placeholder="请选择卡片状态"
                        clearable
                        style="width:100%;"
                        @keyup.enter.native="submitBtn"
                      >
                        <el-option
                          v-for="item in statusOptions"
                          :key="item.dictValue"
                          :label="item.dictLabel"
                          :value="item.dictValue"
                        />
                      </el-select>
                      <span v-else>{{ form.statusName }}</span>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-form>
            </el-collapse-item>
          </el-collapse>
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
        </el-tab-pane>
      </el-tabs>
    </el-main>
  </el-container>
</template>

<script>
import _ from 'lodash'
import { uniqueBankAccount, addCard, editCard, uniqueIdCard, getCard } from '@/api/inteligentDeviceConfig/bankCard'
import {
  uniqueID,
  echoPerson
} from '@/api/userInfoConfig/index'
import {
  allSelectdictionaryData
} from '@/api/common'
import {
  getEditAuthority
} from '@/api/user'
import {
  verifyIdCard
} from '@/utils/validate'
import { adaptiveGrid_max, adaptiveGrid_plus } from '@/common/index'
import { closeSelectedTag } from '@/utils/rooterJump'
import Pagination from '@/components/Pagination'
import { pageModel } from '@/common'
import { validateForms, scrollToTop } from '@/utils/index'

export default {
  components: {
    Pagination
  },
  data() {
    return {
      isEditForm: true, // 页面表单是否可编辑操作。查看时：false,编辑-新增时：true
      modelType: '', // 查看：look  编辑：edit  新增：add
      activeTabs: 'base',
      activeCollapse: ['baseItem_1'],
      adaptiveGrid: adaptiveGrid_max,
      adaptiveGrid_plus: adaptiveGrid_plus,
      editAuthority: false,
      openBankOptions: [], // 发卡行
      statusOptions: [], // 卡片状态
      form: {
        // 新增
        committee: '', // 户籍居委
        community: '', // 小区
        addr: '', // 详细地址
        bankCardName: '', // 账户名
        personId: '', // 用户ID
        idCard: '', // 身份证号
        fullName: '', // 姓名
        bankAccount: '', // 银行卡号
        openBank: '', // 发卡银行
        openBankName: '',
        openDate: '', // 发卡日期
        validDate: '', // 有效日期
        status: '', // 卡片状态
        statusName: '',
        subsidy: ''// 津贴标准
      },
      rulesForm: {
        personId: [
          { required: true, message: '用户ID不能为空！' }
        ],
        subsidy: [
          { trigger: 'blur', pattern: /^(0|\+?0\.\d{0,1}[1-9]|\+?[1-9][0-9]{0,3})(\.\d{1,2})?$/, message: '请输入正确的津贴标准！' }
        ],
        bankCardName: [{ required: true, message: '请输入账户名！', trigger: 'change' }],
        status: [{ required: true, message: '请选择卡片状态！', trigger: 'change' }],
        idCard: [
          // 手动触发校验，Form组件只在blur, change的时候触发校验
          { required: true, trigger: 'MANUAL_TRIGGER', message: '身份证不能为空，请输入！' },
          { trigger: 'MANUAL_TRIGGER', validator: verifyIdCard },
          { trigger: 'MANUAL_TRIGGER', validator: (rule, value, callback) => {
            // 敬老卡库中唯一性
            uniqueIdCard({ idCard: value, id: this.form.id }).then(response => {
              if (response.code == 1) {
                callback(response.msg)
              } else {
                // 老人库中唯一性
                uniqueID({ idCard: value, id: '' }).then(response => {
                  if (response == 0) {
                    callback('该身份证不存在，请先添加该用户！')
                  } else {
                    callback()
                  }
                }).catch(() => {
                  callback(new Error('身份证是否存在接口调用失败！'))
                })
              }
            }).catch(() => {
              callback('身份证是否存在接口调用失败！')
            })
          } }
        ],
        bankAccount: [
          { required: true, trigger: 'blur', message: '银行卡号不能为空，请输入' },
          // {required:true,trigger:'blue',pattern:/^([1-9]{1})(\d{11}|\d{15}|\d{16}|\d{17}|\d{18})$/,message:'请输入正确的银行卡号'},
          { trigger: 'blur', validator: (rule, value, callback) => {
            if (/^([1-9]{1})(\d{11}|\d{15}|\d{16}|\d{17}|\d{18})$/.test(value)) {
              callback()
            } else {
              callback(new Error('请输入正确的银行卡号'))
            }
          }
          },
          { max: 50, trigger: 'blur', message: '长度不能超过50，请输入' },
          { trigger: 'blur', validator: (rule, value, callback) => {
            const params = {
              bankAccount: value,
              id: this.form.id || ''
            }
            uniqueBankAccount(params).then(response => {
              if (response.code === 0) {
                callback()
              } else {
                callback(response.msg)
              }
            }).catch((error) => {
              callback(new Error('银行卡号唯一校验接口调用失败！'))
            })
          } }
        ]
      }
    }
  },
  mounted() {
    this.modelType = this.$route.query.modelType
    const _cardId_ = this.$route.params.id || ''
    if (this.modelType === 'look') {
      // 查看时，不要调用户信息接口，直接将表格行数据带来现实
      this.isEditForm = false
      // 请求当前用户信息
      getCard(_cardId_).then(response => {
        if (response.code === 0) {
          if (response.data) {
            this.form = response.data
          }
        } else {
          this.$message.error(response.msg)
        }
      }).catch(() => {
        this.$message.error('获取银行卡失败！')
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
      this.getData(_cardId_)
    }
  },
  methods: {
    async getData(id) {
      await this.getSelect()
      if (this.modelType === 'edit') {
        await this.editGetData(id)
      }
    },
    // 编辑获取数据
    editGetData(id) {
      return new Promise((resolve, reject) => {
        // 请求当前用户信息
        getCard(id).then(response => {
          if (response.code === 0) {
            if (response.data) {
              this.form = response.data
            }
          } else {
            this.$message.error(response.msg)
          }
        }).catch(() => {
          this.$message.error('获取银行卡失败！')
        })
      })
    },
    // 获取下拉字典
    getSelect() {
      const dictKey = [
        'biz_bank', // 发卡银行
        'biz_bank_card_status'// 卡片状态
      ].join(',')
      return new Promise((resolve, reject) => {
        allSelectdictionaryData(dictKey).then(response => {
          const dict = response.data
          for (const key in dict) {
            switch (key) {
              case 'biz_bank':
                this.openBankOptions = dict[key]
                break
              case 'biz_bank_card_status':
                this.statusOptions = dict[key]
                break
            }
          }
          resolve()
        }).catch(() => {
          reject()
        })
      })
    },
    // 校验：发卡日期必须小于有效日期
    // verifyOpenDate(rule, value, callback) {
    //   if (value && this.form.validDate && value >= this.form.validDate) {
    //     this.$refs.form_base.clearValidate('validDate');
    //     callback('发卡日期必须小于有效日期！');
    //   } else {
    //     callback();
    //   }
    // },
    // 校验：有效日期必须大于发卡日期
    // verifyValidDate(rule, value, callback) {
    //   if (value && this.form.openDate && value <= this.form.openDate) {
    //     this.$refs.form_base.clearValidate('openDate');
    //     callback('有效日期必须大于发卡日期！');
    //   } else {
    //     callback();
    //   }
    // },
    // ====== 事件处理器 =======
    handleIdCardBlur() {
      this.$refs['form_base'].validateField('idCard', (message) => {
        const valid = message == ''
        if (valid) {
          // 只从老人列表中查询是否有该身份证
          echoPerson(this.form.idCard, 'P').then(response => {
            if (response.id != '-1') {
              this.form.personId = response.id
              this.form.fullName = response.fullName
              // 新增
              this.form.committee = response.committee
              this.form.community = response.community
              this.form.addr = response.censusAddr
              // this.form.bankCardName = response.fullName
            }
          }).catch(error => {
            this.$message.error('自动填充接口请求失败！')
          })
        } else {
          this.form.personId = ''
          this.form.fullName = ''
        }
      })
    },
    // 确定按钮-提交form表单
    submitBtn() {
      const formRefs = ['form_base'].map(key => this.$refs[key])
      validateForms(formRefs).then(() => {
        const _form = _.cloneDeep(this.form)
        // 去除不需提交的字段
        delete _form.openBankName
        delete _form.statusName
        // 新增
        if (this.modelType === 'add' && !this.form.id) {
          addCard(_form).then(response => {
            if (response.code === 0) {
              this.$message({
                type: 'success',
                message: '新增银行卡保存成功!'
              })
              // 关闭页面，跳转到列表
              this.closeDetailsPage()
            } else {
              this.$message.error('新增银行卡操作失败，失败原因是：' + response.msg)
            }
          }).catch(() => {
            this.$message.error('新增银行卡操作失败!')
          })
        }
        // 编辑
        else if (this.modelType === 'edit' || (this.modelType === 'add' && this.form.id)) {
          editCard(_form).then(response => {
            if (response.code === 0) {
              this.$message({
                type: 'success',
                message: '编辑银行卡保存成功!'
              })
              // 关闭页面，跳转到列表
              this.closeDetailsPage()
            } else {
              this.$message.error('编辑银行卡操作失败，失败原因是：' + response.msg)
            }
          }).catch(() => {
            this.$message.error('编辑银行卡操作失败!')
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
      }).catch(() => {})
    },
    // 返回按钮，关闭详情页
    closeDetailsPage() {
      // 关闭页面
      closeSelectedTag(this, this.$route)
      this.$router.push('/streetPlatform/inteligentDeviceConfig/bankCard')
    },
    // 查看详情页面，点击编辑按钮
    editContent() {
      this.$router.push({
        path: `/bankCard/details/${this.$route.params.id}`,
        query: { 'modelType': 'edit', '_title': `编辑银行卡` }
      })
    },
    // 重置所有表单
    resetForm() {
      this.form.id = ''
      this.$refs.form_base.resetFields()
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
