<!--健康小屋-->
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
                    <el-form-item :label="this.isEditForm?'租赁点编号':'租赁点编号：'">
                      <el-input
                        v-if="this.isEditForm"
                        v-model="form.orgCode"
                        disabled
                        clearable
                        placeholder="系统自动生成"
                        @keyup.enter.native="editContent('form_base')"
                      />
                      <span v-else>{{ form.orgCode }}</span>
                    </el-form-item>
                  </el-col>
                  <el-col :md="this.adaptiveGrid.md" :lg="8">
                    <el-form-item ref="orgName" :label="this.isEditForm?'租赁点名称':'租赁点名称：'" prop="orgName">
                      <el-input
                        v-if="this.isEditForm"
                        v-model="form.orgName"
                        :disabled="disabled"
                        clearable
                        placeholder="xx区xx街道社区辅具租赁点"
                        @change="checkName"
                        @keyup.enter.native="editContent('form_base')"
                      />
                      <span v-else>{{ form.orgName }}</span>
                    </el-form-item>
                  </el-col>
                  <el-col :md="this.adaptiveGrid.md" :lg="this.adaptiveGrid.lg">
                    <el-form-item :label="this.isEditForm?'租赁点类型':'租赁点类型：'" prop="orgType">
                      <el-select
                        v-if="this.isEditForm"
                        v-model="form.orgType"
                        placeholder="请选择租赁点类型"
                        clearable
                        style="width:100%;"
                        @keyup.enter.native="editContent('form_base')"
                      >
                        <el-option
                          v-for="item in rentalListOptions"
                          :key="item.orgId"
                          :label="item.dictLabel"
                          :value="item.dictValue"
                        />
                      </el-select>
                      <span v-else>
                        <span>{{ form.orgTypeName }}</span>
                      </span>
                    </el-form-item>
                  </el-col>
                  <el-col :md="this.adaptiveGrid.md" :lg="this.adaptiveGrid.lg">
                    <el-form-item :label="this.isEditForm?'咨询电话':'咨询电话：'" prop="phone">
                      <el-input
                        v-if="this.isEditForm"
                        ref="phone"
                        v-model="form.phone"
                        :disabled="disabled"
                        clearable
                        placeholder="请输入咨询电话"
                        @keyup.enter.native="editContent('form_base')"
                      />
                      <span v-else>{{ form.phone }}</span>
                    </el-form-item>
                  </el-col>
                  <el-col :md="this.adaptiveGrid.md" :lg="this.adaptiveGrid.lg">
                    <el-form-item :label="this.isEditForm?'建筑面积(m²)':'建筑面积(m²)：'" prop="buildArea">
                      <el-input
                        v-if="this.isEditForm"
                        v-model="form.buildArea"
                        oninput="value=value.replace(/[^\d]/g,'')"
                        :disabled="disabled"
                        clearable
                        placeholder="请输入建筑面积"
                        @keyup.enter.native="editContent('form_base')"
                      />
                      <span v-else>{{ form.buildArea }}</span>
                    </el-form-item>
                  </el-col>
                  <el-col :md="this.adaptiveGrid.md" :lg="this.adaptiveGrid.lg">
                    <el-form-item :label="this.isEditForm?'开放时间':'开放时间：'">
                      <el-time-picker
                        v-if="this.isEditForm"
                        v-model="openTime"
                        style="width:100%"
                        :is-range="istrue"
                        arrow-control:true
                        range-separator="至"
                        format="HH:mm"
                        value-format="HH:mm"
                        start-placeholder="开始时间"
                        end-placeholder="结束时间"
                        placeholder="选择时间范围"
                      />
                      <span v-else>{{ form.openStartTime }}<span v-if="form.openStartTime!=null">-</span>{{ form.openEndTime }}</span>
                    </el-form-item>
                  </el-col>
                  <el-col :md="this.adaptiveGrid.md" :lg="this.adaptiveGrid.lg">
                    <el-form-item :label="this.isEditForm?'开放状态':'开放状态：'" prop="openState">
                      <el-select
                        v-if="this.isEditForm"
                        v-model="form.openState"
                        placeholder="请选择开放状态"
                        clearable
                        style="width:100%;"
                        @keyup.enter.native="editContent('form_base')"
                      >
                        <el-option
                          v-for="item in open_stateOptions"
                          :key="item.dictValue"
                          :label="item.dictLabel"
                          :value="item.dictValue"
                        />
                      </el-select>
                      <span v-else>
                        <span v-if="form.openState=='open_state_normal'">正常</span>
                        <span v-if="form.openState=='open_state_prepare'">筹备</span>
                        <span v-if="form.openState=='open_state_pause'">暂停</span>
                        <span v-if="form.openState=='open_state_close'">关闭</span>
                      </span>
                    </el-form-item>
                  </el-col>
                  <el-col :md="this.adaptiveGrid.md" :lg="this.adaptiveGrid.lg">
                    <el-form-item :label="this.isEditForm?'所属区域':'所属区域：'" prop="areaCode">
                      <Address
                        v-if="this.isEditForm"
                        :id-edit="idEdit"
                        :area-code="areaCode"
                        :form-code="form.areaCode"
                        :level="4"
                        :width="'100%'"
                        @keyup.enter.native="editContent('form_base')"
                        @getAreaCode="getAreaCode_reg"
                      />
                      <span v-else>{{ form.areaCodeLevel }}</span>
                    </el-form-item>
                  </el-col>
                  <el-col :md="this.adaptiveGrid.md" :lg="this.adaptiveGrid.lg">
                    <el-form-item :label="this.isEditForm?'详细地址':'详细地址：'" prop="addr">
                      <el-input
                        v-if="this.isEditForm"
                        ref="addr"
                        v-model="form.addr"
                        :disabled="disabled"
                        clearable
                        placeholder="请输入详细地址"
                        @keyup.enter.native="editContent('form_base')"
                      />
                      <span v-else>{{ form.addr }}</span>
                    </el-form-item>
                  </el-col>
                  <el-col :md="24" :lg="24" style="height: auto;">
                    <el-form-item :label="this.isEditForm?'机构图片':'机构图片：'">
                      <el-row v-if="!this.isEditForm" class="agencyImageRow">
                        <viewer :images="imageInfoVosLookUrl">
                          <el-col v-for="(item, index) in imageInfoVosLookUrl" :key="index" class="agencyImageCol" style="cursor: pointer">
                            <img :src="item" class="agencyImage">
                          </el-col>
                        </viewer>
                      </el-row>
                      <div v-else class="agencyImageWrap">
                        <Uploadpics :id-edit="idEdit" :form-imgs="form.imageInfoVos" @pics="getPicList" />
                      </div>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-form>
            </el-collapse-item>
            <!--基本信息item end-->
            <!--运营信息item start-->
            <el-collapse-item name="baseItem_2">
              <template slot="title">
                <div class="titleSlider">
                  <span>
                    <i class="titleTip" />运营信息
                  </span>
                </div>
              </template>
              <el-form
                ref="form_operate"
                key="form_operate"
                :model="form"
                :rules="this.isEditForm?rulesForm:null"
                label-width="140px"
              >
                <el-row :gutter="0">
                  <el-col :md="this.adaptiveGrid.md" :lg="this.adaptiveGrid.lg">
                    <el-form-item :label="this.isEditForm?'服务商名称':'服务商名称:'" prop="spId">
                      <el-select
                        v-if="this.isEditForm"
                        v-model="form.spId"
                        filterable
                        placeholder="请选择服务商名称"
                        clearable
                        style="width:100%;"
                        @keyup.enter.native="editContent('form_base')"
                      >
                        <el-option
                          v-for="item in serverListOptions"
                          :key="item.dictValue"
                          :label="item.spName"
                          :value="item.spId"
                        />
                      </el-select>
                      <span v-else>{{ form.spName }}</span>
                    </el-form-item>
                  </el-col>
                  <el-col :md="this.adaptiveGrid.md" :lg="this.adaptiveGrid.lg">
                    <el-form-item :label="this.isEditForm?'服务商联系人':'服务商联系人:'" prop="spLinkman">
                      <el-input
                        v-if="this.isEditForm"
                        v-model="form.spLinkman"
                        :disabled="disabled"
                        clearable
                        placeholder="请输入服务商联系人"
                        @keyup.enter.native="editContent('form_base')"
                      />
                      <span v-else>{{ form.spLinkman }}</span>
                    </el-form-item>
                  </el-col>
                  <el-col :md="this.adaptiveGrid.md" :lg="this.adaptiveGrid.lg">
                    <el-form-item :label="this.isEditForm?'服务商联系人电话':'服务商联系人电话:'" prop="spPhone">
                      <el-input
                        v-if="this.isEditForm"
                        v-model="form.spPhone"
                        :disabled="disabled"
                        clearable
                        placeholder="请输入服务商联系人电话"
                        @keyup.enter.native="editContent('form_base')"
                      />
                      <span v-else>{{ form.spPhone }}</span>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-form>
            </el-collapse-item>
            <!--运营信息item end-->
          </el-collapse>
        </el-tab-pane>
        <!--基本信息tabs end-->
      </el-tabs>
      <!--新增时,编辑时-->
      <el-footer v-if="this.modelType === 'add' || this.modelType === 'edit'">
        <div>
          <el-button type="warning" class="base-btn btnMarginLeft15" @click="editContent('form_base')">确定</el-button>
          <el-button class="cancel-btn btnMarginLeft15" @click="cancelDetailsPage">取消</el-button>
        </div>
      </el-footer>
      <!--查看时-->
      <el-footer v-if="this.modelType === 'look'">
        <div>
          <el-button v-if="editAuthority" type="warning" class="base-btn btnMarginLeft15" @click="toEditType">编辑</el-button>
          <el-button class="cancel-btn btnMarginLeft15" @click="closeDetailsPage">返回</el-button>
        </div>
      </el-footer>
    </el-main>
  </el-container>
</template>

<script>
import {
  validateForms
} from '@/utils/index'
import {
  lookRentalPoint,
  addRentalPoint,
  checkSpOrgCode,
  getServerList,
  updateRentalPoint,
  checkOrgName
} from '@/api/assistiveDevices/rentalPoint'
import {
  institutionDetailsData,
  submitDataAdd,
  submitDataEdit
} from '@/api/facilitiesConfig/serviceFacilitiesHealthy'
import { institutionFieldConfig, allSelectdictionaryData } from '@/api/facilitiesConfig/communityFacilities'
import { adaptiveGrid_max, adaptiveGrid_plus } from '@/common/index'
import InstituField from '@/components/InstituField'
import Uploadpics from '@/components/Uploadpics'
import Address from '@/components/Address'
import { facilityTypeFun } from '@/common/facilityType'
import { closeSelectedTag } from '@/utils/rooterJump'
import { transformNumber, transformNumberLetter } from '@/utils/index'
import { getEditAuthority } from '@/api/user'
import { verifyHomePhoneOrMobile, isPositiveIntegerNotMust } from '@/utils/validate'

export default {
  components: { InstituField, Address, Uploadpics },
  data() {
    // 校验机构名称
    const verifyFullName = (rule, value, callback) => {
      if (value.length === 0) {
        callback(new Error('租赁点名称不能为空，请输入！'))
      } else {
        if (/\s/.test(value)) {
          callback(new Error('租赁点名称不能包含空格，请重新输入！'))
        } else {
          if (value.length >= 100) {
            callback(new Error('租赁点名称长度不能超过100个汉字，请重新输入！'))
          } else {
            callback()
          }
        }
      }
    }
    // 校验所属居委
    const verifyAreaCode = (rule, value, callback) => {
      if (this.areaCode.length === 0 || this.areaCode[0] === '') {
        callback(new Error('所属居委不能为空，请选择！'))
      } else {
        callback()
      }
    }
    // 校验详细地址
    const verifyAddr = (rule, value, callback) => {
      if (value.length === 0) {
        callback(new Error('详细地址不能为空，请选择！'))
      } else {
        if (value.length > 100) {
          callback(new Error('详细地址长度不能超过100，请重新输入！'))
        } else {
          callback()
        }
      }
    }
    return {
      // 下拉框字典数据
      open_stateOptions: [], // 开放状态
      istrue: true,
      isEditForm: true, // 页面表单是否可编辑操作。查看时：false,编辑-新增时：true
      idEdit: true, // 区域级联下拉框是编辑时还是新增时。编辑时：false,新增时：true
      serverListOptions: [],
      rentalListOptions: [],
      // 机构类型的字段配置
      institutionField: [
        { children: [] },
        { children: [] },
        { children: [] }
      ],
      openTime: ['', ''],
      // 表单
      form: {
        orgId: '',
        spName: '',
        orgCode: '', // 编号
        orgType: '', // 类型
        orgName: '', // 名称
        phone: '',
        buildArea: '', // 面积
        openStartTime: '', // 开放时间
        openEndTime: '', // 结束时间
        openState: '', // 开放状态
        areaCode: '',
        areaCodeLevel: '',
        addr: '',
        spLinkman: '',
        spPhone: '',
        spId: '',
        orgTypeName: '',
        imageInfoVos: []// 机构图片
      },
      // form 表单的验证规则
      rulesForm: {
        // 名称
        orgName: [
          { required: true, trigger: 'blur', validator: verifyFullName }
        ],
        // 咨询电话
        phone: [
          { required: true, trigger: 'blur', message: '咨询电话不能为空' },
          { required: true, trigger: 'change', validator: verifyHomePhoneOrMobile },
          { required: true, trigger: 'blur', validator: verifyHomePhoneOrMobile }
        ],
        // 所属居委
        areaCode: [
          { required: true, trigger: 'change', validator: verifyAreaCode }
        ],
        // 详细地址
        addr: [
          { required: true, trigger: 'blur', validator: verifyAddr }
        ],
        spLinkman: [
          { trigger: 'blur', max: 20, message: '请输入正确格式' }
        ],
        // 运营方联系方式
        spPhone: [
          { trigger: 'change', validator: verifyHomePhoneOrMobile }
        ],
        spId: [
          { required: true, trigger: 'change', message: '请选择服务商名称' }
        ]
      },
      disabled: false, // 表单是否可编辑
      activeTabs: 'base', // tab标签切换默认选中name参数
      activeCollapse: ['baseItem_1', 'baseItem_2'], // 折叠面板默认打开name参数
      areaCodeOptions: [], // 行政区域树节点数据
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
      lazy: true, // 懒加载
      flag: null, // 用来判断是表格添加时还是编辑时
      areaCode: [], // 所属居委全部ID
      modelType: '', // 查看：look  编辑：edit  新增：add
      instituType: '', // 机构类型
      imageInfoVosLookUrl: [], // 查看时的图片路径
      editAuthority: false// 编辑按钮的权限
    }
  },
  // 在模板渲染成html后调用，通常是初始化页面完成后，再对html的dom节点进行一些需要的操作。
  mounted() {
    this.modelType = this.$route.query.modelType
    const orgId = this.$route.params.id || ''
    this.getData(orgId)
    if (this.modelType === 'look') {
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
    }
  },
  methods: {
    // 获取图片数据
    getPicList(val) {
      this.form.imageInfoVos = val
    },
    // 异步事件同步化
    async getData(id) {
      await this.getServerList()
      await this.getSelect()
      if (this.modelType === 'edit') {
        this.isEditForm = true
        await this.editGetData(id, 'edit')
      } else if (this.modelType === 'add') {
        this.isEditForm = true
        this.idEdit = false
      } else if (this.modelType === 'look') {
        this.isEditForm = false
        await this.editGetData(id, '')
      }
    },
    // 编辑-查看 获取机构数据
    editGetData(id) {
      return new Promise((resolve, reject) => {
        // 请求当前机构信息
        lookRentalPoint({ orgId: id }).then(response => {
          // 页面form表单的值
          for (const key in this.form) {
            if (!['areaCode'].includes(key)) {
              this.form[key] = response.data[key]
            }
          }
          this.form.areaCode = response.data.areaCode ? response.data.areaCode.split(',') : []
          this.openTime = []
          this.openTime.push(response.data.openStartTime, response.data.openEndTime)
          this.idEdit = false
          this.form.imageInfoVos.forEach((item) => {
            this.imageInfoVosLookUrl.push(`${process.env.VUE_APP_API_IMGURL}${item.imgUrl}`)
          })
        }).catch(() => {
          // this.$message.error("获取‘"+this.orgTypeName+"’机构信息失败！");
        })
      })
    },
    // 获取下拉字典
    getSelect() {
      return new Promise((resolve, reject) => {
        // 数据字典接口
        const dictKey = [
          'open_state',
          'lease_point_type'
        			].join(',')
        allSelectdictionaryData(dictKey).then(response => {
          if (response.code === 0) {
            for (const k in response.data) {
              switch (k) {
                // 开放状态
                case 'open_state':
                  this.open_stateOptions = response.data[k]
                  break
                case 'lease_point_type':
                  this.rentalListOptions = response.data[k]
                  break
              }
            }
          } else {
            // this.$message.error(this.orgTypeName+'机构数据字典接口请求失败！');
          }
          resolve()
        }).catch(() => {
          // this.$message.error(this.orgTypeName+'机构数据字典接口请求失败！');
          reject()
        })
      })
    },
    // 服务商列表
    getServerList() {
      return new Promise((resolve, reject) => {
        getServerList().then(response => {
          if (response.code === 0) {
            this.serverListOptions = response.data
          } else {
            this.$message.error('获取服务商列表接口请求失败！')
          }
          resolve()
        }).catch(() => {
          this.$message.error('获取服务商列表接口请求失败！')
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
        this.$router.push({ path: '/assistivePlatform/assistiveDevices/rentalPoint' })
      }).catch(() => {
      })
    },
    // 取消，返回按钮，关闭详情页
    closeDetailsPage() {
      // 关闭页面
      closeSelectedTag(this, this.$route)
      this.$router.push({ path: '/assistivePlatform/assistiveDevices/rentalPoint' })
    },
    checkName() {
      const data = {
        orgName: this.form.orgName
      }
      if (this.modelType == 'edit') {
        data.orgId = this.form.orgId
      }
      checkOrgName(data).then(response => {
        if (response.code == '0') {
          if (response.data.isRepeat == '0') {

          } else {
            this.$message.error('该租赁点名称已存在,请重新输入!')
            this.$refs.form_base.resetFields()
          }
        } else {
          this.$message.error('操作失败')
        }
      }).catch(err => {
      })
    },
    // 确定按钮-提交表单
    editContent(formName) {
      const formRefs = ['form_base', 'form_operate'].map(key => this.$refs[key])
      validateForms(formRefs).then(() => {
        if (this.openTime !== null) {
          this.form.openStartTime = this.openTime[0]
          this.form.openEndTime = this.openTime[1]
        } else {
          this.form.openStartTime = ''
          this.form.openEndTime = ''
        }
        const params = this.form
        params.areaCode = this.areaCode.length === 0 ? '' : this.areaCode[this.areaCode.length - 1] + ''
        // 新增
        if (this.modelType === 'add') {
          addRentalPoint(params).then(response => {
            if (response.code === 0) {
              this.$message({
                type: 'success',
                message: '新增租赁点成功!'
              })
              // 关闭页面
              this.closeDetailsPage()
            } else {
              this.$message.error(response.msg)
            }
          }).catch(() => {
            this.$message.error('新增‘' + this.orgTypeName + '’机构信息失败!')
          })
        }
        // 编辑
        else if (this.modelType === 'edit') {
          updateRentalPoint(params).then(response => {
            if (response.code === 0) {
              this.$message({
                type: 'success',
                message: '编辑租赁点成功!'
              })
              // 关闭页面
              this.closeDetailsPage()
            } else {
              this.$message.error(response.msg)
            }
          }).catch(() => {
            this.$message.error('编辑租赁点成功!')
          })
        }
        // 查看
        else if (this.modelType === 'look') {
          this.closeDetailsPage()
        }
      }).catch(err => {
        this.activeTabs = 'base'
        window.scrollTo(0, 0)
        return false
      })
    },
    // 获取所属居委
    getAreaCode_reg(val) {
      this.areaCode = val
    },
    // 只能输入数字类型
    transformNumber(value, obj) {
      this.form[obj] = transformNumber(value)
    },
    // 只能输入数字类型和字母类型
    transformNumberLetter(value, obj) {
      this.form[obj] = transformNumberLetter(value)
    },
    // 查看详情页面，点击编辑按钮
    toEditType() {
      this.$router.push({
        path: `/rentalPoint/details/${this.$route.params.id}`,
        query: { 'modelType': 'edit', '_title': `编辑${this.form.orgName}` }
      })
    }
  }
}
</script>

<style scoped>
	@import "~@/styles/form.css";
	.tableContainer{
		margin-top: 20px;
	}
</style>
