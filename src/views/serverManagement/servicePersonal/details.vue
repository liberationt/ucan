<template>
  <el-container>
    <el-main class="tableContainer">
      <!-- <el-tabs v-model="activeTabs"> -->
      <!-- <el-tab-pane label="基本信息" name="base"> -->
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
                <el-form-item :label="isEditForm?'员工编号':'员工编号：'" prop="empNo">
                  <el-input
                    v-if="isEditForm"
                    ref="empNo"
                    v-model.trim="form.empNo"
                    disabled
                    clearable
                    placeholder="系统自动生成"
                    @keyup.enter.native="editContent"
                  />
                  <span v-else>{{ form.empNo }}</span>
                </el-form-item>
              </el-col>
              <el-col :md="adaptiveGrid.md" :lg="adaptiveGrid.lg">
                <el-form-item :label="isEditForm?'姓名':'姓名：'" prop="fullName">
                  <el-input
                    v-if="isEditForm"
                    ref="fullName"
                    v-model.trim="form.fullName"
                    :disabled="disabled"
                    clearable
                    placeholder="请输入服务人员姓名"
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
                    placeholder="输入身份证号，系统自动带出"
                    filterable
                    disabled
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
                <el-form-item :label="isEditForm?'年龄':'年龄：'" prop="age">
                  <el-input
                    v-if="isEditForm"
                    ref="age"
                    v-model="form.age"
                    disabled
                    clearable
                    placeholder="输入身份证号，系统自动带出"
                    @keyup.enter.native="editContent"
                  />
                  <span v-else>{{ form.age }}</span>
                </el-form-item>
              </el-col>
              <el-col :md="adaptiveGrid.md" :lg="adaptiveGrid.lg">
                <el-form-item :label="isEditForm?'出生日期':'出生日期：'" prop="birthday">
                  <el-date-picker
                    v-if="isEditForm"
                    v-model="form.birthday"
                    type="date"
                    disabled
                    placeholder="输入身份证号，系统自动带出"
                    style="width:100%;"
                    format="yyyy年MM月dd日"
                    value-format="yyyy-MM-dd"
                    @keyup.enter.native="editContent"
                  />
                  <span v-else>{{ form.birthday }}</span>
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
                    @keyup.enter.native="editContent"
                  />
                  <span v-else>{{ form.mobile }}</span>
                </el-form-item>
              </el-col>
              <el-col :md="24" :lg="24">
                <el-form-item :label="isEditForm?'擅长服务':'擅长服务：'" prop="goodAtService">
                  <el-input
                    v-if="isEditForm"
                    ref="goodAtService"
                    v-model.trim="form.goodAtService"
                    :disabled="disabled"
                    clearable
                    placeholder="请输入擅长服务"
                    max="40"
                    type="textarea"
                    rows="3"
                    maxlength="40"
                    show-word-limit
                    @keyup.enter.native="editContent"
                  />
                  <span v-else>{{ form.goodAtService }}</span>
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
                <i class="titleTip" />区域信息
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
                >
                  <Address
                    v-if="isEditForm"
                    :id-edit="idEdit"
                    :area-code="areaCode"
                    :form-code="form.censusArea"
                    :width="'100%'"
                    :scope="'All'"
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
                >
                  <Address
                    v-if="isEditForm"
                    :id-edit="idEdit"
                    :area-code="liveCode"
                    :form-code="form.liveArea"
                    :width="'100%'"
                    :scope="'All'"
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
                >
                  <el-input
                    v-if="isEditForm"
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
        <el-collapse-item name="baseItem_5">
          <template slot="title">
            <div class="titleSlider">
              <span>
                <i class="titleTip" />其它信息
              </span>
            </div>
          </template>
          <el-form
            ref="form_remark"
            key="form_remark"
            :model="form"
            :rules="isEditForm?rulesForm:null"
            label-width="100px"
          >
            <el-row :gutter="0">
              <el-col :md="adaptiveGrid.md" :lg="adaptiveGrid.lg">
                <el-form-item :label="isEditForm?'聘用方式':'聘用方式：'" prop="engageModeName">
                  <el-select
                    v-if="isEditForm"
                    v-model="form.engageMode"
                    placeholder="请选择聘用方式"
                    filterable
                    clearable
                    style="width:100%;"
                    @keyup.enter.native="editContent"
                  >
                    <el-option
                      v-for="item in engageModeNameOptions"
                      :key="item.dictValue"
                      :label="item.dictLabel"
                      :value="item.dictValue"
                    />
                  </el-select>
                  <span v-else>{{ form.engageModeName }}</span>
                </el-form-item>
              </el-col>
              <el-col :md="adaptiveGrid.md" :lg="adaptiveGrid.lg">
                <el-form-item :label="isEditForm?'人员岗位':'人员岗位：'" prop="empDuties">
                  <el-select
                    v-if="isEditForm"
                    v-model="form.empDuties"
                    placeholder="请选择人员岗位"
                    filterable
                    clearable
                    style="width:100%;"
                    @keyup.enter.native="editContent"
                  >
                    <el-option
                      v-for="item in empDutiesOptions"
                      :key="item.dictValue"
                      :label="item.dictLabel"
                      :value="item.dictValue"
                    />
                  </el-select>
                  <span v-else>{{ form.empDutiesName }}</span>
                </el-form-item>
              </el-col>
              <el-col :md="adaptiveGrid.md" :lg="adaptiveGrid.lg">
                <el-form-item :label="isEditForm?'月基本工资':'月基本工资：'" prop="monthBaseWage">
                  <el-input
                    v-if="isEditForm"
                    v-model.trim="form.monthBaseWage"
                    :disabled="disabled"
                    clearable
                    placeholder="请输入月基本工资"
                    type="phone"
                    @keyup.enter.native="editContent"
                  />
                  <span v-else>{{ form.monthBaseWage }}</span>
                </el-form-item>
              </el-col>
              <el-col :md="adaptiveGrid.md" :lg="adaptiveGrid.lg">
                <el-form-item :label="isEditForm?'月收入':'月收入：'" prop="monthIncome">
                  <el-input
                    v-if="isEditForm"
                    v-model.trim="form.monthIncome"
                    :disabled="disabled"
                    clearable
                    placeholder="请输入月收入"
                    type="phone"
                    @keyup.enter.native="editContent"
                  />
                  <span v-else>{{ form.monthIncome }}</span>
                </el-form-item>
              </el-col>
              <el-col :md="adaptiveGrid.md" :lg="adaptiveGrid.lg">
                <el-form-item :label="isEditForm?'缴金情况':'缴金情况：'" prop="taxesSituation">
                  <el-select
                    v-if="isEditForm"
                    v-model="form.taxesSituation"
                    placeholder="请选择缴金情况"
                    clearable
                    style="width:100%;"
                    @keyup.enter.native="editContent"
                  >
                    <el-option
                      v-for="item in taxesSituationOptions"
                      :key="item.dictValue"
                      :label="item.dictLabel"
                      :value="item.dictValue"
                    />
                  </el-select>
                  <span v-else>{{ form.taxesSituationName }}</span>
                </el-form-item>
              </el-col>
              <el-col :md="adaptiveGrid.md" :lg="adaptiveGrid.lg">
                <el-form-item :label="isEditForm?'入职年限':'入职年限：'" prop="workYears">
                  <el-select
                    v-if="isEditForm"
                    v-model="form.workYears"
                    placeholder="请选择入职年限"
                    clearable
                    style="width:100%;"
                    @keyup.enter.native="editContent"
                  >
                    <el-option
                      v-for="(item, index) in workYearsOptions"
                      :key="index"
                      :label="item.dictLabel"
                      :value="item.dictValue"
                    />
                  </el-select>
                  <span v-else>{{ form.workYearsName }}</span>
                </el-form-item>
              </el-col>
              <el-col :md="adaptiveGrid.md" :lg="adaptiveGrid.lg">
                <el-form-item :label="isEditForm?'开始时间':'开始时间：'" prop="workStartDate">
                  <el-date-picker
                    v-if="isEditForm"
                    v-model="form.workStartDate"
                    type="date"
                    placeholder="请选择开始时间"
                    style="width:100%;"
                    format="yyyy年MM月dd日"
                    value-format="yyyy-MM-dd"
                    @keyup.enter.native="editContent"
                  />
                  <span v-else>{{ form.workStartDate }}</span>
                </el-form-item>
              </el-col>
              <el-col :md="adaptiveGrid.md" :lg="adaptiveGrid.lg">
                <el-form-item :label="isEditForm?'结束时间':'结束时间：'" prop="workEndDate">
                  <el-date-picker
                    v-if="isEditForm"
                    v-model="form.workEndDate"
                    type="date"
                    placeholder="请选择结束时间"
                    style="width:100%;"
                    format="yyyy年MM月dd日"
                    value-format="yyyy-MM-dd"
                    @keyup.enter.native="editContent"
                  />
                  <span v-else>{{ form.workEndDate }}</span>
                </el-form-item>
              </el-col>
              <el-col :md="adaptiveGrid.md" :lg="adaptiveGrid.lg">
                <el-form-item :label="isEditForm?'学历':'学历：'" prop="status">
                  <el-select
                    v-if="isEditForm"
                    v-model="form.eduLevel"
                    placeholder="请选择学历"
                    clearable
                    style="width:100%;"
                    @keyup.enter.native="editContent"
                  >
                    <el-option
                      v-for="item in eduLevelOptions"
                      :key="item.dictValue"
                      :label="item.dictLabel"
                      :value="item.dictValue"
                    />
                  </el-select>
                  <span v-else>{{ form.eduLevelName }}</span>
                </el-form-item>
              </el-col>
              <el-col :md="24" :lg="24" style="height: auto;">
                <el-form-item :label="this.isEditForm?'学历证书':'学历证书：'">
                  <el-row v-if="!this.isEditForm" class="agencyImageRow">
                    <viewer :images="imageInfoVosLookUrl">
                      <el-col v-for="(item, index) in imageInfoVosLookUrl" :key="index" class="agencyImageCol" style="cursor: pointer">
                        <img :src="item" class="agencyImage">
                      </el-col>
                    </viewer>
                  </el-row>
                  <div v-else class="agencyImageWrap">
                    <Uploadpics :id-edit="idEdit" :form-imgs="form.bizImageInfoVoList" @pics="getPicList" />
                  </div>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </el-collapse-item>
        <!--联系人item start-->
        <el-collapse-item name="baseItem_4">
          <template slot="title">
            <div class="titleSlider">
              <span>
                <i class="titleTip" />工作履历
              </span>
            </div>
          </template>
          <el-form ref="form_contact" :model="form">
            <el-col :md="adaptiveGrid.md" :lg="adaptiveGrid.lg">
              <el-form-item
                :label="isEditForm?'从事养老护理开始时间':'从事养老护理开始时间：'"
              >
                <el-date-picker
                  v-if="isEditForm"
                  v-model="form.nurseWorkStartDate"
                  type="date"
                  placeholder="请选择开始时间"
                  format="yyyy年MM月dd日"
                  value-format="yyyy-MM-dd"
                  @keyup.enter.native="editContent"
                />
                <span v-else>{{ form.nurseWorkStartDate }}</span>
              </el-form-item>
            </el-col>
            <el-table :data="form.empJobList" style="width: 100%">
              <el-table-column
                type="index"
                label="序号"
                width="80"
                fixed="left"
                align="center"
              />
              <el-table-column prop="corpName" label="就职单位名称" min-width="150">
                <template slot-scope="scope">
                  <el-form-item
                    v-if="isEditForm"
                    :ref="'empJobList.' + scope.$index + '.corpName'"
                    :prop="'empJobList.' + scope.$index + '.corpName'"
                    :rules="rulesForm.corpName"
                  >
                    <el-input
                      v-model.trim="scope.row.corpName"
                      placeholder="请输入就职单位名称"
                      clearable
                      @keyup.enter.native="editContent"
                    />
                  </el-form-item>
                  <span v-else>{{ scope.row.corpName }}</span>
                </template>
              </el-table-column>
              <el-table-column prop="postName" label="岗位名称" min-width="150">
                <template slot-scope="scope">
                  <el-form-item
                    v-if="isEditForm"
                    :ref="'empJobList.' + scope.$index + '.postName'"
                    :prop="'empJobList.' + scope.$index + '.postName'"
                    :rules="rulesForm.postName"
                  >
                    <el-input
                      v-model.trim="scope.row.postName"
                      placeholder="请输入岗位名称"
                      clearable
                      @keyup.enter.native="editContent"
                    />
                  </el-form-item>
                  <span v-else>{{ scope.row.postName }}</span>
                </template>
              </el-table-column>
              <el-table-column prop="startDate" label="开始日期" min-width="150">
                <template slot-scope="scope">
                  <el-form-item
                    v-if="isEditForm"
                    :ref="'empJobList.' + scope.$index + '.startDate'"
                    :prop="'empJobList.' + scope.$index + '.startDate'"
                    :rules="rulesForm.startDate"
                  >
                    <el-date-picker
                      v-model="scope.row.startDate"
                      type="date"
                      placeholder="请选择开始日期"
                      style="width:100%;"
                      format="yyyy年MM月dd日"
                      value-format="yyyy-MM-dd"
                      @keyup.enter.native="editContent"
                    />
                  </el-form-item>
                  <span v-else>{{ scope.row.startDate }}</span>
                </template>
              </el-table-column>
              <el-table-column prop="endDate" label="结束日期" min-width="150">
                <template slot-scope="scope">
                  <el-form-item
                    v-if="isEditForm"
                    :ref="'empJobList.' + scope.$index + '.endDate'"
                    :prop="'empJobList.' + scope.$index + '.endDate'"
                    :rules="rulesForm.endDate"
                  >
                    <el-date-picker
                      v-model="scope.row.endDate"
                      type="date"
                      placeholder="请选择结束日期"
                      style="width:100%;"
                      format="yyyy年MM月dd日"
                      value-format="yyyy-MM-dd"
                      @keyup.enter.native="editContent"
                    />
                  </el-form-item>
                  <span v-else>{{ scope.row.endDate }}</span>
                </template>
              </el-table-column>
              <el-table-column
                v-if="isEditForm"
                label="操作"
                width="200"
                align="center"
                fixed="right"
              >
                <template slot-scope="scope">
                  <span
                    class="table-btn"
                    style="cursor: pointer;"
                    @click="tableOperation(scope.row,scope.$index)"
                  >删除</span>
                </template>
              </el-table-column>
            </el-table>
          </el-form>
          <div v-if="isEditForm" class="addBtnDiv">
            <span @click="addTableRow()">添加工作履历</span>
          </div>
        </el-collapse-item>
      </el-collapse>
      <!-- </el-tab-pane> -->
      <!-- </el-tabs> -->
      <el-footer>
        <div v-if="isEditForm" class="footerBtn">
          <div>
            <el-button class="cancel-btn" @click="cancelDetailsPage">取消</el-button>
            <el-button type="warning" class="base-btn btnMarginLeft15" @click="editContent('form_base')">确定</el-button>
          </div>
        </div>
        <div v-else>
          <el-button v-if="form.edit=='0'&&editAuthority&&data.accountType==='3'&& data.assistiveRentType!=null" type="warning" class="base-btn" @click="toEditType">编辑</el-button>
          <el-button class="cancel-btn" @click="closeDetailsPage">返回</el-button>
        </div>
      </el-footer>
      <div>
        <el-form
          ref="agree"
          key="agree"
          :model="ruleForm"
          :rules="isEditForm?rulesForm:null"
          label-width="0"
        >
          <el-form-item prop="agree">
            <el-checkbox-group v-model="ruleForm.agree">
              <el-checkbox label="1" name="type">本人承诺上述表单填写的养老护理员信息均完整、真实、有效、如有虚假本人承担一切责任。</el-checkbox>
            </el-checkbox-group>
          </el-form-item>
        </el-form>
      </div>
    </el-main>
  </el-container>
</template>

<script>
import Uploadpics from '@/components/Uploadpics'
import {
  userDetailsData,
  submitDataAdd,
  submitDataEdit,
  relationData
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
import { getEditAuthority } from '@/api/user'
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
  verifyMobile
} from '@/utils/validate'
import { closeSelectedTag } from '@/utils/rooterJump'
import { saveOrderPerson, getOrderPerson, getOrderObj } from '@/api/serverManagement/projectManagement'
import { mapGetters } from 'vuex'

export default {
  components: { Address, Uploadpics },
  computed: {
    ...mapGetters([
      'data'
    ])
  },
  data() {
    return {
      hasEdit: false,
      // props: { multiple: true, checkStrictly: true },
      // 表单只能输入数字
      isEditForm: true, // 页面表单是否可编辑操作。查看时：false,编辑-新增时：true
      idEdit: true, // 区域级联下拉框是编辑时还是新增时。编辑时：false,新增时：true
      // 下拉框的数据
      sexOptions: [], // 性别
      engageModeNameOptions: [], // 聘用方式
      empDutiesOptions: [], // 人员工位
      taxesSituationOptions: [], // 缴金情况
      workYearsOptions: [], // 入职年限
      eduLevelOptions: [], // 学历
      imageInfoVosLookUrl: [],
      editAuthority: false,
      ruleForm: {
        agree: ['1']
      },
      // 表单
      form: {
        id: '', // 当前用户id
        empNo: '',
        idCard: '', // 身份证
        fullName: '', // 姓名
        sex: '', // 性别
        sexName: '', // 性别（纯文本）
        birthday: '', // 出生日期（年龄不传，只传出生日期）
        age: '', // 年龄
        mobile: '', // 手机号码
        goodAtService: '', // 擅长服务
        // 户籍
        censusArea: '',
        censusAreaCodeLevel: '',
        censusAreaName: '',
        censusAddr: '',
        liveArea: '',
        liveAreaCodeLevel: '',
        liveAreaName: '',
        liveAddr: '',
        // //其它
        engageMode: '',
        engageModeName: '',
        empDuties: '',
        empDutiesName: '',
        monthBaseWage: '', // 月基本工资
        monthIncome: '', // 月收入
        taxesSituation: '', // 缴金情况
        taxesSituationName: '',
        workYears: '', // 入职年限
        workYearsName: '',
        workStartDate: '', // 开始时间
        workEndDate: '', // 结束时间
        eduLevel: '', // 学历
        eduLevelName: '',
        bizImageInfoVoList: [],
        empJobList: [],
        nurseWorkStartDate: '',
        edit: ''
      },
      // form 表单的验证规则
      rulesForm: {
        // 姓名
        fullName: [
          { required: true, trigger: 'blur', message: '姓名不能为空，请输入！' },
          { trigger: 'blur', validator: verifyFullName }
        ],
        // 身份证
        idCard: [
          // trigger 设置为 MANUAL_TRIGGER 是不让组件自动在 blur 的时候校验。
          // 手动在 blur 事件处理函数中处理。将校验和校验后的动作解耦。
          { required: true, trigger: 'MANUAL_TRIGGER', message: '身份证不能为空，请输入！' },
          { trigger: 'MANUAL_TRIGGER', validator: verifyIdCard }
          // {
          //   trigger: 'MANUAL_TRIGGER', validator: (rule, value, callback) => {
          //     validateID(value).then(response => {
          //       if (response.code === 0) {
          //         callback()
          //       } else {
          //         if (response.msg === '该信息非当前企业拥有') {
          //           callback('老人信息已存在，请重新输入。')
          //         } else {
          //           callback(response.msg)
          //         }
          //       }
          //     }).catch(() => {
          //       callback(new Error('身份证检验接口调用失败！'))
          //     })
          //   }
          // }
        ],
        // 手机号码
        mobile: [
          { required: true, trigger: 'blur', message: '手机号不能为空，请输入！' },
          { trigger: 'blur', validator: verifyMobile }
        ],
        // 月收入
        monthBaseWage: [
          { pattern: /^(0|\+?[1-9][0-9]{0,10})$/, message: '请输入正确格式', trigger: 'change' }
        ],
        monthIncome: [
          { pattern: /^(0|\+?[1-9][0-9]{0,10})$/, message: '请输入正确格式', trigger: 'change' }
        ],
        liveAddr: [
          { max: 10, message: '居住详细地址最多50字！', trigger: 'blur' }
        ],
        censusAddr: [
          { max: 10, message: '户籍详细地址最多50字！', trigger: 'blur' }
        ],
        agree: [{ required: true, trigger: 'blur', message: '请同意本人承诺！' }],
        corpName: [
          { required: true, trigger: 'blur', message: '就职单位不能为空！' },
          { max: 50, message: '单位名称最多50字！', trigger: 'blur' }
        ],
        postName: [
          { required: true, trigger: 'blur', message: '岗位名称不能为空！' },
          { max: 50, message: '岗位名称最多50字！', trigger: 'blur' }
        ],
        startDate: [
          { required: true, trigger: 'change', message: '开始日期不能为空！' }
        ],
        endDate: [
          { required: true, trigger: 'change', message: '结束日期不能为空！' }
        ]
      },
      disabled: false, // 表单是否可编辑
      activeTabs: 'base', // tab标签切换默认选中name参数
      activeCollapse: ['baseItem_1', 'baseItem_2', 'baseItem_3', 'baseItem_4', 'baseItem_5', 'baseItem_7', 'baseItem_8', , 'baseItem_9'], // 折叠面板默认打开name参数
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
      areaCode: [], // 区域行政的全部ID
      liveCode: [],
      modelType: '' // 查看：look  编辑：edit  新增：add
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
    /**
       * 查看
       */
    await this.getSelect()
    if (this.modelType === 'look') {
      // 查看时，不要调用户信息接口，直接将表格行数据带来现实
      this.isEditForm = false
      getEditAuthority(this.$route.query.menu).then(res => {
        res.forEach(item => {
          if (item.menuName === '编辑') {
            this.editAuthority = item.visible === '0'
          }
        })
      })
      // 请求当前用户信息
      getOrderPerson(_userId_).then(response => {
        this.formatData(response.data)
      }).catch(() => {
        this.$message.error('获取用户信息失败！')
      })
    } else {
      this.isEditForm = true
      this.getData(_userId_)
    }
    // 关系
    relationData().then(response => {
      this.relationOptions = response.rows
    }).catch(() => {
      this.$message.error('获取关系接口失败！')
    })
  },
  methods: {
    getPicList(val) {
      this.form.bizImageInfoVoList = val
    },
    pickData(value) {
    },
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
        getOrderPerson(id).then(response => {
          this.idEdit = false
          this.formatData(response.data)
        }).catch(() => {
          this.$message.error('获取用户信息失败！')
        })
      })
    },
    // 获取下拉字典
    getSelect() {
      const dictKey = [
        'sys_sex', // 性别
        'edu_level', // 文化程度
        'employment_method', // 聘用方式
        'staff_position', // 人员岗位
        'payment_situation', // 缴金情况
        'entry_years'// 入职年限
      ].join(',')
      return new Promise((resolve, reject) => {
        allSelectdictionaryData(dictKey).then(response => {
          const dict = response.data
          for (const key in dict) {
            switch (key) {
              case 'sys_sex':
                this.sexOptions = dict[key]
                break
              case 'edu_level':
                this.eduLevelOptions = dict[key]
                break
              case 'employment_method':
                this.engageModeNameOptions = dict[key]
                break
              case 'staff_position':
                this.empDutiesOptions = dict[key]
                break
              case 'payment_situation':
                this.taxesSituationOptions = dict[key]
                break
              case 'entry_years':
                this.workYearsOptions = dict[key]
                break
            }
          }
          resolve()
        }).catch(() => {
          reject()
        })
      })
    },
    // ================添加表格行数据============
    addTableRow() {
      if (this.form.empJobList.length >= 3) {
        this.$message.warning('工作履历数量最多添加3条！')
        return false
      }
      this.flag = true// 添加时的取消按钮
      const rowData = {
        id: '',
        postName: '',
        serviceEmpId: '',
        startDate: '',
        corpName: '',
        endDate: '',
        rowIndex: Math.random() * 100000000000000000 + ''
      }
      this.form.empJobList.push(rowData)
    },
    // ===============操作（删除）=================
    tableOperation(row, index) {
      // 删除
      this.$confirm('是否确认删除该工作履历?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.form.empJobList.splice(index, 1)
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    // 获取区域的值----户籍
    getAreaCode_reg(val) {
      this.areaCode = val
    },
    // 获取区域的值----居住
    getAreaCode_live(val) {
      this.liveCode = val
    },
    // 确定按钮-提交form表单
    editContent() {
      const formRefs = ['form_base', 'agree', 'form_contact'].map(key => this.$refs[key])
      validateForms(formRefs).then(() => {
        const _form = this.form
        if (this.areaCode && this.areaCode.length) {
          _form.censusArea = this.areaCode[this.areaCode.length - 1] + ''
        } else {
          _form.censusArea = ''
        }
        if (this.liveCode && this.liveCode.length) {
          _form.liveArea = this.liveCode[this.liveCode.length - 1] + ''
        } else {
          _form.liveArea = ''
        }
        if (_form.birthday === '') {
          _form.birthday = 'null'
        }
        const workStartDate = new Date(_form.workStartDate).getTime()
        const workEndDate = new Date(_form.workEndDate).getTime()
        if (workStartDate > workEndDate) {
          return this.$message.error('开始时间不得大于结束时间')
        }
        let isShow = true
        if (this.form.empJobList && this.form.empJobList.length) {
          this.form.empJobList.forEach((item, i) => {
            const entryTime = new Date(item.startDate).getTime()
            const retireTime = new Date(item.endDate).getTime()
            if (entryTime > retireTime) {
              this.$message.error('开始日期不得大于结束日期')
              isShow = false
              return
            }
          })
        }
        if (isShow) {
          // 新增
          if (this.modelType === 'add' && !this.form.id) {
            saveOrderPerson(_form).then(response => {
              if (response.code === 0) {
                this.$message({
                  type: 'success',
                  message: '新增服务人员保存成功!'
                })
                // 关闭页面
                this.closeDetailsPage()
              } else {
                this.$message.error(response.msg)
              }
            }).catch(() => {
              this.$message.error('新增服务人员操作失败!')
            })
          }
          // 编辑
          else if (this.modelType === 'edit' || (this.modelType === 'add' && this.form.id)) {
            saveOrderPerson(_form).then(response => {
              if (response.code === 0) {
                this.$message({
                  type: 'success',
                  message: '编辑服务人员保存成功!'
                })
                // 关闭页面
                this.closeDetailsPage()
              } else {
                this.$message.error(response.msg)
              }
            }).catch(() => {
              this.$message.error('编辑服务人员操作失败!')
            })
          }
        }
      }).catch(objectList => {
        this.activeTabs = 'base'
        // scrollToTop()
        scrollToEl(this.$refs['agree'].$el)
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
      this.$router.push('/serverManagement/servicePersonal')
    },
    // 查看详情页面，点击编辑按钮
    toEditType() {
      this.$router.push({
        path: `/serverManagement/servicePersonal/details/${this.form.id}`,
        query: { 'modelType': 'edit', '_title': `编辑${this.form.fullName}`, 'menu': this.$route.meta.id }
      })
    },
    handleIdCardInput(value) {
      this.$refs['form_base'].validateField('idCard', (message) => {
        const valid = message == ''
        if (valid) {
          this.form.birthday = getBirthdayFromIdCard(this.form.idCard)
          parseInt(value.substr(16, 1)) % 2 == 1 ? this.form.sex = '0' : this.form.sex = '1'
        } else {
          this.form.birthday = ''
          this.form.sex = ''
        }
      })
    },
    // 处理接口数据供表单使用
    formatData(response) {
      for (const key in this.form) {
        this.form[key] = response[key]
        // if (!['contact'].includes(key)) {
        //   this.form[key] = response[key]
        // }
      }
      this.form.censusArea = response.censusAreaCodeLevel != null && response.censusAreaCodeLevel != '' ? response.censusAreaCodeLevel.split(',') : []
      this.form.liveArea = response.liveAreaCodeLevel != null && response.liveAreaCodeLevel != '' ? response.liveAreaCodeLevel.split(',') : []
      this.form.bizImageInfoVoList.forEach((item) => {
        this.imageInfoVosLookUrl.push(`${process.env.VUE_APP_API_IMGURL}${item.imgUrl}`)
      })
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

  .addBtnDiv {
    border: 1px dashed #E1E1E1;
    border-top: none;
    height: 40px;
    line-height: 40px;
    text-align: center;
  }

  .addBtnDiv > span {
    cursor: pointer;
    color: #0078D4;
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
