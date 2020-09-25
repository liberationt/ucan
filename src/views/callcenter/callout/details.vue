<template>
  <el-container>
    <el-main class="tableContainer">
      <el-tabs v-model="activeTabs">
        <el-tab-pane label="客户基本信息" name="base">
          <el-collapse v-model="activeCollapse">
            <el-collapse-item name="baseItem_1">
              <template slot="title">
                <div class="titleSlider">
                  <span>
                    <i class="titleTip" />客户基本信息
                  </span>
                </div>
              </template>
              <el-form
                ref="form_base"
                key="form_base"
                :model="form"
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
                        @keyup.enter.native="submitBtn"
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
                        @keyup.enter.native="submitBtn"
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
                        clearable
                        style="width:100%;"
                        @keyup.enter.native="submitBtn"
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
                    <el-form-item :label="isEditForm?'手机号码':'手机号码：'" prop="mobile">
                      <el-input
                        v-if="isEditForm"
                        ref="mobile"
                        v-model.trim="form.mobile"
                        :disabled="disabled"
                        clearable
                        placeholder="请输入手机号码"
                        @keyup.enter.native="submitBtn"
                      />
                      <span v-else>{{ form.mobile }}</span>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-form>
            </el-collapse-item>
            <el-collapse-item name="baseItem_4">
              <template slot="title">
                <div class="titleSlider">
                  <span>
                    <i class="titleTip" />备注
                  </span>
                </div>
              </template>
              <el-form
                ref="form_remark"
                key="form_remark"
                :model="form"
                label-width="80px"
              >
                <el-row :gutter="0"> <!--
                <el-form-item v-if="isEditForm" prop="remark">
                  <el-input
                    ref="remark"
                    v-model.trim="form.remark"
                    type="textarea"
                    :rows="5"
                    :disabled="disabled"
                    placeholder="请输入备注"
                    maxlength="200"
                    show-word-limit
                    @keyup.enter.native="submitBtn"
                  />
                </el-form-item>
                <p v-else class="remarkSpan">{{ form.remark }}</p>-->
                </el-row>
              </el-form>
            </el-collapse-item>
          </el-collapse>
        </el-tab-pane>
        <el-tab-pane label="客户通话记录信息" name="subsidy">
          <el-collapse v-model="activeCollapse">
            <el-collapse-item name="baseItem_3">
              <template slot="title">
                <div class="titleSlider">
                  <span>
                    <i class="titleTip" />通话记录
                  </span>
                </div>
              </template>
              <el-form :model="form">
                <el-table
                  ref="multipleTable"
                  tooltip-effect="dark"
                  :data="tableData_FWS"
                  style="width: 100%;height: 60%"
                  header-align="left"
                  border
                  row-key="id"
                >
                  <el-table-column label="序号" width="50" fixed="left">
                    <template slot-scope="{row,$index}">
                      <span>{{ $index + 1 }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column label="客户电话" prop="customerNumber" min-width="120" />
                  <el-table-column label="坐席工号" prop="cno" min-width="80" />
                  <el-table-column label="客户号码类型" prop="customerNumberType" min-width="50" />
                  <el-table-column label="客户号码区号" prop="customerAreaCode" min-width="60" />
                  <el-table-column label="通话唯一标识" prop="uniqueId" min-width="130" />
                  <el-table-column label="主通话唯一标识" prop="mainUniqueId" min-width="130" />
                </el-table>
                <pagination
                  v-show="total>0"
                  :total="total"
                  :page.sync="form_FWS.pageNum"
                  :limit.sync="form_FWS.pageSize"
                  @pagination="paginationGetTableData()"
                />
              </el-form>
            </el-collapse-item>
          </el-collapse>
        </el-tab-pane>
      </el-tabs>

      <el-footer>
        <div v-if="isEditForm" class="footerBtn">
          <div v-if="this.activeTabs === 'base'">
            <el-button class="cancel-btn" @click="cancelBtn">取消</el-button>
            <el-button type="warning" class="base-btn btnMarginLeft15" @click="tabsStep('subsidy')">下一步</el-button>
          </div>
          <div v-else>
            <el-button type="warning" class="base-btn btnMarginLeft15" @click="tabsStep('base')">上一步</el-button>
            <el-button class="cancel-btn btnMarginLeft15" @click="cancelBtn">取消</el-button>
            <el-button type="warning" class="base-btn btnMarginLeft15" @click="submitBtn('form_base')">确定</el-button>
          </div>
        </div>
        <div v-else>
          <el-button v-if="editAuthority==true&&hasEdit==true" type="warning" class="base-btn" @click="editContent">编辑</el-button>
          <el-button class="cancel-btn" @click="closeDetailsPage">返回</el-button>
        </div>
      </el-footer>
    </el-main>
  </el-container>
</template>

<script>
import _ from 'lodash'
import Pagination from '@/components/Pagination'
import { adaptiveGrid_max, adaptiveGrid_plus } from '@/common/index'
import { editDialog, addDialog, callBombScreen, findPersonInfo, findCallBombList, findBaseBomScreenList } from '@/api/callcenterConfig/callout'
import { closeSelectedTag } from '@/utils/rooterJump'

export default {
  components: {
    Pagination
  },
  props: ['dialogTableVisible', 'tableRowValue', 'ajaxData'],
  data() {
    return {
      props: { multiple: true, checkStrictly: true },
      hasEdit: false,
      isEditForm: true, // 页面表单是否可编辑操作。查看时：false,编辑-新增时：true
      idEdit: true, // 区域级联下拉框是编辑时还是新增时。编辑时：false,新增时：true
      disabled: false, // 表单是否可编辑
      modelType: '', // 查看：look  编辑：edit  新增：add
      activeTabs: 'base',
      activeCollapse: ['baseItem_1', 'baseItem_3', 'baseItem_4'],
      adaptiveGrid: adaptiveGrid_max,
      adaptiveGrid_plus: adaptiveGrid_plus,
      editAuthority: false,
      sexOptions: [], // 性别
      total: 0,
      tableData_FWS: [], // 表格数据
      form_FWS: {
        total: 0,
        pageNum: 1,
        pageSize: 10
      },
      form: {
        id: '',
        fullName: '', // 姓名
        idCard: '', // 身份证
        sex: '', // 性别
        mobile: '', // 手机号码
        remark: '', // 备注
        pageSize: 10,
        pageNum: 1
        // personSubsidyInfoList: []
      }
    }
  },

  mounted() {
    // alert(this.$route.query.customerNumber);
    this.getPersonData(this.$route.query.customerNumber)

    this.hasEdit = this.$route.query.hasEdit
    this.modelType = this.$route.query.modelType
    const _userId_ = this.$route.params.id || ''
    if (this.modelType === 'look') {
      // 查看时，不要调用户信息接口，直接将表格行数据带来现实
      this.isEditForm = false
      // 请求当前用户信息
      getDisabled(_userId_).then(response => {
        this.formatData(response)
      }).catch(() => {
        this.$message.error('获取用户信息失败！')
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
    transformNumber2(value, obj, index) {
      this.dataList2 = this.DisabilityList
      this.dataList2[index][obj] = transformNumber(value)
      this.$set(this.DisabilityList, index, this.dataList2[index])
    },
    async getData(id) {
      // await this.getSelect()

      if (this.modelType === 'edit') {
        await this.editGetData(id)
      } else if (this.modelType === 'add') {
        this.idEdit = false
      }
    },
    // 根据监听弹屏 获取通话用户信息 dialog 展示
    getPersonData(customerNumber) {
      const that = this
      this.loadingSubmit = true
      // this.loadingSubmit = true;
      const parmas = {
        customerNumber: customerNumber
      }
      // alert('parmas：'+parmas.customerNumber)
      findPersonInfo(parmas).then(res => {
        if (res.code === 0) {
          // alert(res.data.mobile+","+res.data.fullName+","+res.data.sex+","+res.data.idCard);
          that.form = res.data
          that.getCallBombList(parmas) // test
        }
      }).catch(err => {
      })
    },
    // 根据监听弹屏 获取通话用户通话记录信息列表 dialog 展示
    getCallBombList(parmas) {
      // let paramsform = this.form;
      // this.form.pageNum = 1;
      this.loadingSubmit = true
      var parmas = {
        customerNumber: parmas.customerNumber,
        pageSize: this.form_FWS.pageSize,
        pageNum: this.form_FWS.pageNum
      }
      // paramsform.customerNumber=parmas.customerNumber;
      // alert('customerNumber：'+parmas.customerNumber)
      // paramsform.pageSize=this.form_FWS.pageSize;
      // paramsform.pageNum=this.form_FWS.pageNum;
      // alert("pageSize: "+paramsform.pageSize);
      findCallBombList(parmas).then(res => {
        if (res.code === 0) {
          // alert('查询成功');
          // this.total = res.data.total;
          // this.tableData=res.data.list;
          // console.log(res.data.list.customerNumber+","+res.data.list.cno)
          // alert('getCallBombList res');

          this.tableData_FWS = res.data.list
          this.total = res.data.total

          //this.form_FWS.total = res.data.total
          this.form_FWS.pageNum = res.data.pageNum
          this.form_FWS.pageSize = res.data.pageSize

          // alert("pageSize: "+res.data.pageSize);
          // that.tableRowValue = res.rows;
        }
      }).catch(err => {

      })
    },

    tabsStep(tabsName) {
      this.activeTabs = tabsName
    },
    // 编辑获取数据
    editGetData(id) {
      // return new Promise((resolve, reject) => {
      //   // 请求当前用户信息
      //   getDisabled(id).then(response => {
      //     this.formatData(response)
      //     this.idEdit = false
      //   }).catch(() => {
      //     this.$message.error('获取用户信息失败！')
      //   })
      // })
    },
    clicks(val) {
      this.deformityTypeOptions.forEach(item => {
        if (val && val.length) {
          val.forEach(items => {
            item.children.forEach(itemc => {
              // this.$set(itemc,'disabled',false)
              itemc.disabled = false
            })
          })
        }
      })
      this.deformityTypeOptions.forEach(item => {
        if (val && val.length) {
          val.forEach(items => {
            if (item.value == items[0]) {
              item.children.forEach(itemc => {
                if (items[1] !== itemc.value) {
                  // this.$set(itemc,'disabled',false)
                  itemc.disabled = true
                } else {
                  // this.$set(itemc,'disabled',true)
                  itemc.disabled = false
                }
              })
            }
          })
        } else {
          this.deformityTypeOptions.forEach(item => {
            item.children.forEach(itemc => {
              this.$set(itemc, 'disabled', false)
            })
          })
        }
      })
    },
    // 获取下拉字典
    // getSelect() {
    //   const dictKey = [
    //     'sys_sex', // 性别
    //   ].join(',')
    //   return new Promise((resolve, reject) => {
    //     allSelectdictionaryData(dictKey).then(response => {
    //       const dict = response.data
    //       for (const key in dict) {
    //         switch (key) {
    //           case 'sys_sex':
    //             this.sexOptions = dict[key]
    //             break
    //         }
    //       }
    //       const deformityTypeOptions = []
    //       const deformityLevelOptions = []
    //       this.deformityLevelOptions.forEach(item => {
    //         deformityLevelOptions.push({
    //           value: item.dictValue,
    //           label: item.dictLabel,
    //           disabled: false
    //         })
    //       })
    //       this.deformityTypeOptions.forEach(item => {
    //         const arrList = _.cloneDeep(deformityLevelOptions)
    //         deformityTypeOptions.push(
    //           {
    //             value: item.dictValue,
    //             label: item.dictLabel,
    //             disabled: true,
    //             children: arrList
    //           }
    //         )
    //       })
    //       this.deformityTypeOptions = deformityTypeOptions
    //       resolve()
    //     }).catch(() => {
    //       this.$message.error('获取数据字典失败！')
    //       reject()
    //     })
    //   })
    // },

    // 加载服务商名称的表格数据-分页加载
    paginationGetTableData() {
      this.tableData_FWS = []
      // 服务商名称--数据字典接口
      const params = {
        //customerNumber: this.customerNumber,
        customerNumber: this.$route.query.customerNumber,
        pageNum: this.form_FWS.pageNum,
        pageSize: this.form_FWS.pageSize,
      }
      this.asyncLoadTableData(params)
    },
    // 异步加载表格数据
    async asyncLoadTableData(params) {
      await findCallBombList(params).then(response => {
        // if (response.rows) {
        //   response.rows.forEach(item => {
        //     this.tableData_FWS.push(item)
        //   })
        // } else {
        //   this.tableData_FWS = []
        // }
        this.tableData_FWS =response.data.list;
        //this.form_FWS.total = response.total
        this.total = response.data.total;
        // this.form_FWS.pageNum = response.data.pageNum
        // this.form_FWS.pageSize = response.data.pageSize
      }).catch(() => {
        //this.$message.error('‘志愿者对象’数据加载失败！')
      })
    },

    // // 获取区域的值----户籍
    // getAreaCode_reg(val) {
    //   this.areaCode[0] = val
    // },
    // // 获取区域的值----居住
    // getAreaCode_live(val) {
    //   this.areaCode[1] = val
    // },
    // 家庭电话输入框失去焦点
    // handleHomePhoneBlur() {
    //   this.$refs['form_base'].validateField('homePhone', (message) => {
    //     const valid = message == ''
    //     if (!valid) {
    //       this.$message.warning(
    //         '家庭电话格式例如:123-12345678或1234-1234567或1234-12345678')
    //     }
    //   })
    // },
    // 确定按钮-提交form表单
    submitBtn() {
      const formRefs = ['form_base', 'form_address'].map(key => this.$refs[key])
      validateForms(formRefs).then(() => {
        const _form = this.form
        // 新增
        if (this.modelType === 'add' && !this.form.id) {
          addDisabled(_form).then(response => {
            if (response.code === 0) {
              this.$message({
                type: 'success',
                message: '新增残疾人信息保存成功!'
              })
              // 关闭页面，跳转到列表
              this.closeDetailsPage()
            } else {
              this.$message.error('新增残疾人信息操作失败，失败原因是：' + response.msg)
            }
          }).catch(() => {
            this.$message.error('新增残疾人信息操作失败!')
          })
        }
        // 编辑
        else if (this.modelType === 'edit' || (this.modelType === 'add' && this.form.id)) {
          editDisabled(_form).then(response => {
            if (response.code === 0) {
              this.$message({
                type: 'success',
                message: '编辑残疾人信息保存成功!'
              })
              // 关闭页面，跳转到列表
              this.closeDetailsPage()
            } else {
              this.$message.error('编辑残疾人信息操作失败，失败原因是：' + response.msg)
            }
          }).catch(() => {
            this.$message.error('编辑残疾人信息操作失败!')
          })
        }
      }).catch(objectList => {
        this.activeTabs = 'base'
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
      closeSelectedTag(this, this.$route)
      this.$router.push('/streetPlatform/userInfoConfig/disabledInfo')
    },
    // 查看详情页面，点击编辑按钮
    editContent() {
      this.$router.push({
        path: `/callinInfo/details/${this.$route.params.id}`,
        query: { 'modelType': 'edit', '_title': `编辑${customerNumber}`, 'customerNumber': customerNumber }
      })
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
      this.$refs.form_tag.resetFields()
      this.$refs.form_remark.resetFields()
    },
    checkIdCardUnique() {
      const	_params = {
        id: this.$route.params.id || '',
        idCard: this.form.idCard
      }
      uniqueID(_params).then(response => {
        if (response === 0 || response === '0') {
          const _birthday = getBirthdayFromIdCard(this.form.idCard)
          this.form.birthday = _birthday
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
      echoPerson(idCard, 'C').then(response => {
        if (response.id == '-1') {
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
            this.resetForm()
            this.formatData(response)
          }).catch(() => {
            this.form.idCard = ''
          })
        }
      }).catch(error => {
        this.$message.error('身份证载入数据接口请求失败！')
      })
    },
    //
    formatData(response) {
      for (const key in this.form) {
        if (!['address', 'contact'].includes(key)) {
          this.form[key] = response[key]
        }
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
