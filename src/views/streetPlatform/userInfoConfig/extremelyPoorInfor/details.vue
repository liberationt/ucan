<template>
  <el-container>
    <el-main class="tableContainer">
      <el-tabs v-model="activeTabs">
        <!--服务信息tabs end-->
        <el-tab-pane label="基本信息" name="base">
          <el-collapse v-model="activeCollapse">
            <!--基本信息item start-->
            <el-collapse-item name="baseItem_1">
              <template slot="title">
                <div class="titleSlider">
                  <span>
                    <i class="titleTip" />成员信息
                  </span>
                </div>
              </template>
              <el-form
                ref="form_member"
                key="form_member"
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
                        @keyup.enter.native="editContent"
                      />
                      <span v-else>{{ form.birthday }}</span>
                    </el-form-item>
                  </el-col>
                  <el-col :md="adaptiveGrid.md" :lg="adaptiveGrid.lg">
                    <el-form-item :label="isEditForm?'家庭关系':'家庭关系'" prop="familyRelations">
                      <el-select
                        v-if="isEditForm"
                        v-model="form.familyRelations"
                        placeholder="请选择家庭关系"
                        filterable
                        clearable
                        style="width:100%;"
                        @change="changeForm"
                        @keyup.enter.native="editContent"
                      >
                        <el-option
                          v-for="item in familyOptions"
                          :key="item.dictValue"
                          :label="item.dictLabel"
                          :value="item.dictValue"
                        />
                      </el-select>
                      <span v-else>{{ form.familyRelationsName }}</span>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-form>
            </el-collapse-item>
            <el-collapse-item name="baseItem_2">
              <template slot="title">
                <div class="titleSlider">
                  <span>
                    <i class="titleTip" />其它信息
                  </span>
                </div>
              </template>
              <el-form
                ref="form_infor"
                key="form_infor"
                :model="form"
                :rules="isEditForm?rulesForm:null"
                label-width="120px"
              >
                <el-row :gutter="0">
                  <el-col :md="adaptiveGrid.md" :lg="adaptiveGrid.lg">
                    <el-form-item :label="isEditForm?'开户人':'开户人：'" prop="bankCardName">
                      <el-input
                        v-if="isEditForm"
                        ref="bankCardName"
                        v-model.trim="form.bankCardName"
                        clearable
                        placeholder="请输入开户人"
                        @keyup.enter.native="editContent"
                      />
                      <span v-else>{{ form.bankCardName }}</span>
                    </el-form-item>
                  </el-col>
                  <el-col :md="adaptiveGrid.md" :lg="adaptiveGrid.lg">
                    <el-form-item :label="isEditForm?'开户银行':'开户银行：'" prop="openBank">
                      <el-select
                        v-if="isEditForm"
                        v-model="form.openBank"
                        placeholder="请选择开户银行"
                        filterable
                        clearable
                        style="width:100%;"
                        @keyup.enter.native="editContent"
                      >
                        <el-option
                          v-for="item in bankOptions"
                          :key="item.dictValue"
                          :label="item.dictLabel"
                          :value="item.dictValue"
                        />
                      </el-select>
                      <span v-else>{{ form.openBankName }}</span>
                    </el-form-item>
                  </el-col>
                  <el-col :md="adaptiveGrid.md" :lg="adaptiveGrid.lg">
                    <el-form-item :label="isEditForm?'银行账号':'银行账号：'" prop="bankAccount">
                      <el-input
                        v-if="isEditForm"
                        ref="bankAccount"
                        v-model.trim="form.bankAccount"
                        clearable
                        placeholder="请输入银行卡号"
                        @keyup.enter.native="editContent"
                      />
                      <span v-else>{{ form.bankAccount }}</span>
                    </el-form-item>
                  </el-col>

                  <el-col :md="adaptiveGrid.md" :lg="adaptiveGrid.lg">
                    <el-form-item :label="isEditForm?'保障人口数':'保障人口数'" prop="guaranteedPopulation">
                      <el-input
                        v-if="isEditForm"
                        v-model.trim="form.guaranteedPopulation"
                        clearable
                        placeholder="请输入保障人口数"
                        oninput="value=value.replace(/[^\d]/g,'')"
                        type="phone"
                        @keyup.enter.native="editContent"
                      />
                      <span v-else>{{ form.guaranteedPopulation }}</span>
                    </el-form-item>
                  </el-col>
                  <el-col :md="adaptiveGrid.md" :lg="adaptiveGrid.lg">
                    <el-form-item :label="isEditForm?'保障金额':'保障人金额'" prop="guaranteedAmount">
                      <el-input
                        v-if="isEditForm"
                        v-model.trim="form.guaranteedAmount"
                        clearable
                        placeholder="请输入保障金额"
                        oninput="value=value.replace(/[^\d]/g,'')"
                        type="phone"
                        @keyup.enter.native="editContent"
                      />
                      <span v-else>{{ form.guaranteedAmount }}</span>
                    </el-form-item>
                  </el-col>
                  <el-col :md="adaptiveGrid.md" :lg="adaptiveGrid.lg">
                    <el-form-item :label="isEditForm?'申请类别':'申请类别：'" prop="applyType">
                      <el-select
                        v-if="isEditForm"
                        v-model="form.applyType"
                        placeholder="请选择申请类别"
                        filterable
                        clearable
                        style="width:100%;"
                        @keyup.enter.native="editContent"
                      >
                        <el-option
                          v-for="item in applyOptions"
                          :key="item.dictValue"
                          :label="item.dictLabel"
                          :value="item.dictValue"
                        />
                      </el-select>
                      <span v-else>{{ form.applyTypeName }}</span>
                    </el-form-item>
                  </el-col>
                  <el-col :md="adaptiveGrid.md" :lg="adaptiveGrid.lg">
                    <el-form-item :label="isEditForm?'家庭编号':'家庭编号'" prop="familyNo">
                      <el-input
                        v-if="isEditForm"
                        v-model.trim="form.familyNo"
                        clearable
                        placeholder="请输入家庭编号"
                        oninput="value=value.replace(/[^\d]/g,'')"
                        type="phone"
                        @keyup.enter.native="editContent"
                      />
                      <span v-else>{{ form.familyNo }}</span>
                    </el-form-item>
                  </el-col>
                  <el-col :md="adaptiveGrid.md" :lg="adaptiveGrid.lg">
                    <el-form-item :label="isEditForm?'分类施保':'分类施保'" prop="assortProtection">
                      <el-input
                        v-if="isEditForm"
                        v-model.trim="form.assortProtection"
                        clearable
                        placeholder="请输入分类施保"
                        type="phone"
                        @keyup.enter.native="editContent"
                      />
                      <span v-else>{{ form.assortProtection }}</span>
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
                    <el-form-item :label="isEditForm?'残疾类别':'残疾类别：'" prop="defoType">
                      <el-select
                        v-if="isEditForm"
                        v-model="form.defoType"
                        placeholder="请选择残疾类别"
                        filterable
                        clearable
                        style="width:100%;"
                        @keyup.enter.native="editContent"
                      >
                        <el-option
                          v-for="item in typeOptions"
                          :key="item.dictValue"
                          :label="item.dictLabel"
                          :value="item.dictValue"
                        />
                      </el-select>
                      <span v-else>{{ form.defoTypeName }}</span>
                    </el-form-item>
                  </el-col>
                  <el-col :md="adaptiveGrid.md" :lg="adaptiveGrid.lg">
                    <el-form-item :label="isEditForm?'残疾等级':'残疾等级：'" prop="defoLevel">
                      <el-select
                        v-if="isEditForm"
                        v-model="form.defoLevel"
                        placeholder="请选择残疾等级"
                        filterable
                        clearable
                        style="width:100%;"
                        @keyup.enter.native="editContent"
                      >
                        <el-option
                          v-for="item in levelOptions"
                          :key="item.dictValue"
                          :label="item.dictLabel"
                          :value="item.dictValue"
                        />
                      </el-select>
                      <span v-else>{{ form.defoLevelName }}</span>
                    </el-form-item>
                  </el-col>
                  <el-col :md="adaptiveGrid.md" :lg="adaptiveGrid.lg">
                    <el-form-item :label="isEditForm?'自理能力':'自理能力：'" prop="selfCareAbility">
                      <el-select
                        v-if="isEditForm"
                        v-model="form.selfCareAbility"
                        placeholder="请选择自理能力"
                        filterable
                        clearable
                        style="width:100%;"
                        @keyup.enter.native="editContent"
                      >
                        <el-option
                          v-for="item in abilityOptions"
                          :key="item.dictValue"
                          :label="item.dictLabel"
                          :value="item.dictValue"
                        />
                      </el-select>
                      <span v-else>{{ form.selfCareAbilityName }}</span>
                    </el-form-item>
                  </el-col>
                  <el-col :md="adaptiveGrid.md" :lg="adaptiveGrid.lg">
                    <el-form-item :label="isEditForm?'重病名称':'重病名称：'" prop="seriousIllnessName">
                      <el-select
                        v-if="isEditForm"
                        v-model="form.seriousIllnessName"
                        placeholder="请选择重病名称"
                        filterable
                        clearable
                        style="width:100%;"
                        @keyup.enter.native="editContent"
                      >
                        <el-option
                          v-for="item in seriousOptions"
                          :key="item.dictValue"
                          :label="item.dictLabel"
                          :value="item.dictValue"
                        />
                      </el-select>
                      <span v-else>{{ form.seriousIllnessNameName }}</span>
                    </el-form-item>
                  </el-col>
                  <el-col :md="adaptiveGrid.md" :lg="adaptiveGrid.lg">
                    <el-form-item :label="isEditForm?'参保类型':'参保类型：'" prop="insuranceType">
                      <el-select
                        v-if="isEditForm"
                        v-model="form.insuranceType"
                        placeholder="请选择参保类型"
                        filterable
                        clearable
                        style="width:100%;"
                        @keyup.enter.native="editContent"
                      >
                        <el-option
                          v-for="item in participaOptions"
                          :key="item.dictValue"
                          :label="item.dictLabel"
                          :value="item.dictValue"
                        />
                      </el-select>
                      <span v-else>{{ form.insuranceTypeName }}</span>
                    </el-form-item>
                  </el-col>
                  <el-col :md="adaptiveGrid.md" :lg="adaptiveGrid.lg">
                    <el-form-item :label="isEditForm?'智能物联':'智能物联：'" prop="isSmartNet">
                      <el-select
                        v-if="isEditForm"
                        v-model="form.isSmartNet"
                        placeholder="请选择智能物联"
                        filterable
                        clearable
                        style="width:100%;"
                        @keyup.enter.native="editContent"
                      >
                        <el-option
                          v-for="item in netOptions"
                          :key="item.dictValue"
                          :label="item.dictLabel"
                          :value="item.dictValue"
                        />
                      </el-select>
                      <span v-else>{{ form.isSmartNetName }}</span>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-form>
            </el-collapse-item>
            <el-collapse-item name="baseItem_3">
              <template slot="title">
                <div class="titleSlider">
                  <span>
                    <i class="titleTip" />户主信息
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
                    <el-form-item :label="isEditForm?'姓名':'姓名：'" prop="householder">
                      <el-input
                        v-if="isEditForm"
                        ref="householder"
                        v-model.trim="form.householder"
                        clearable
                        placeholder="请输入姓名"
                        @keyup.enter.native="editContent"
                      />
                      <span v-else>{{ form.householder }}</span>
                    </el-form-item>
                  </el-col>
                  <el-col :md="adaptiveGrid.md" :lg="adaptiveGrid.lg">
                    <el-form-item :label="isEditForm?'身份证':'身份证：'" prop="householdIdCard">
                      <el-input
                        v-if="isEditForm"
                        ref="householdIdCard"
                        v-model.trim="form.householdIdCard"
                        clearable
                        placeholder="请输入身份证"
                        @input="handleIdCardInputs"
                        @keyup.enter.native="editContent"
                      />
                      <span v-else>{{ form.householdIdCard }}</span>
                    </el-form-item>
                  </el-col>
                  <el-col :md="adaptiveGrid.md" :lg="adaptiveGrid.lg">
                    <el-form-item :label="isEditForm?'性别':'性别：'" prop="householdSex">
                      <el-select
                        v-if="isEditForm"
                        v-model="form.householdSex"
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
                      <span v-else>{{ form.householdSexName }}</span>
                    </el-form-item>
                  </el-col>
                  <el-col :md="adaptiveGrid.md" :lg="adaptiveGrid.lg">
                    <el-form-item :label="isEditForm?'联系电话':'联系电话'" prop="householdMobile">
                      <el-input
                        v-if="isEditForm"
                        v-model.trim="form.householdMobile"
                        clearable
                        placeholder="请输入联系电话"
                        type="phone"
                        @keyup.enter.native="editContent"
                      />
                      <span v-else>{{ form.householdMobile }}</span>
                    </el-form-item>
                  </el-col>
                  <el-col :md="adaptiveGrid.md" :lg="adaptiveGrid.lg">
                    <el-form-item :label="isEditForm?'出生日期':'出生日期：'" prop="householdBirthday">
                      <el-date-picker
                        v-if="isEditForm"
                        v-model="form.householdBirthday"
                        type="date"
                        placeholder="请选择出生日期"
                        style="width:100%;"
                        format="yyyy年MM月dd日"
                        value-format="yyyy-MM-dd"
                        @change="birthdayChanges"
                        @keyup.enter.native="editContent"
                      />
                      <span v-else>{{ form.householdBirthday }}</span>
                    </el-form-item>
                  </el-col>
                  <el-col :md="adaptiveGrid.md" :lg="adaptiveGrid.lg">
                    <el-form-item :label="isEditForm?'年龄':'年龄：'" prop="householdAge">
                      <el-input
                        v-if="isEditForm"
                        ref="householdAge"
                        v-model="form.householdAge"
                        disabled
                        clearable
                        placeholder="请输入年龄"
                        @keyup.enter.native="editContent"
                      />
                      <span v-else>{{ form.householdAge }}</span>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-form>
            </el-collapse-item>
            <!--基本信息item end-->
            <!--住址信息item start-->
            <el-collapse-item name="baseItem_4">
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
                    >
                      <el-input
                        v-if="isEditForm"
                        ref="censusAddr"
                        v-model.trim="form.censusAddr"
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
                    >
                      <el-input
                        v-if="isEditForm"
                        ref="liveAddr"
                        v-model.trim="form.liveAddr"
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
        <el-button v-if="modelType!='look'" type="warning" class="base-btn btnMarginLeft15" @click="editContent()">确定</el-button>
      </el-footer>
    </el-main>
  </el-container>
</template>

<script>
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
  verifyMobile
} from '@/utils/validate'
import { closeSelectedTag } from '@/utils/rooterJump'
import { transformNumber } from '@/utils/index'

import { getExtremelyData, addExtremelyPoor, editExtremelyPoor } from '@/api/userInfoConfig/poorInfor'
export default {
  components: { Address },
  data() {
    return {
      hasEdit: false,
      isEditForm: true, // 页面表单是否可编辑操作。查看时：false,编辑-新增时：true
      idEdit: true, // 区域级联下拉框是编辑时还是新增时。编辑时：false,新增时：true
      // 下拉框的数据
      sexOptions: [], // 性别
      nationOptions: [], // 民族
      bankOptions: [], // 银行
      familyOptions: [], // 家庭关系
      applyOptions: [], // 申请类别
      levelOptions: [], // 残疾等级
      typeOptions: [], // 残疾类别
      abilityOptions: [], // 自理能力
      seriousOptions: [], // 重病
      participaOptions: [], // 参保
      netOptions: [], // 智能物联
      // 表单
      form: {
        idCard: '', // 身份证
        fullName: '', // 姓名
        sex: '', // 性别
        sexName: '', // 性别（纯文本）
        mobile: '',
        birthday: '', // 出生日期（年龄不传，只传出生日期）
        familyRelations: '',
        familyRelationsName: '',
        openBank: '',
        openBankName: '',
        bankCardName: '',
        bankAccount: '',
        guaranteedAmount: '',
        guaranteedPopulation: '',
        applyType: '',
        applyTypeName: '',
        familyNo: '',
        assortProtection: '',
        defoType: '',
        defoTypeName: '',
        defoLevel: '',
        defoLevelName: '',
        nation: '',
        nationName: '',
        selfCareAbility: '',
        selfCareAbilityName: '',
        seriousIllnessName: '',
        seriousIllnessNameName: '',
        insuranceType: '',
        insuranceTypeName: '',
        isSmartNet: '',
        isSmartNetName: '',
        householder: '',
        householdIdCard: '',
        householdAge: '',
        householdMobile: '',
        householdSex: '',
        householdBirthday: '',
        liveAddr: '',
        liveArea: '',
        liveAreaName: '',
        liveAreaCodeLevel: '',
        censusAddr: '',
        censusArea: '',
        censusAreaName: '',
        censusAreaCodeLevel: '',
        householdSexName: '',
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
        householder: [
          { required: true, trigger: 'blur', message: '姓名不能为空，请输入！' },
          { trigger: 'blur', validator: verifyFullName }
        ],
        sex: [
          { required: true, trigger: 'change', message: '性别不能为空，请选择！' }
        ],
        householdSex: [
          { required: true, trigger: 'MANUAL_TRIGGER', message: '性别不能为空，请选择！' }
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
        householdIdCard: [
          { required: true, trigger: 'MANUAL_TRIGGER', message: '身份证不能为空，请输入！' },
          { trigger: 'MANUAL_TRIGGER', validator: verifyIdCard }
          // {
          //   trigger: 'MANUAL_TRIGGER', validator: (rule, value, callback) => {
          //     validateID(value).then(response => {
          //       if (response.code === 0) {
          //         callback()
          //       }
          //     }).catch(() => {
          //       callback(new Error('身份证检验接口调用失败！'))
          //     })
          //   }
          // }
        ],
        // 手机号码
        mobile: [
          { trigger: 'blur', validator: verifyMobile }
        ],
        address: [
          { trigger: 'blur', max: 50, message: '详细地址长度不得超过50个字符，请重新输入！' }
        ],
        bankAccount: [
          { trigger: 'blur', validator: (rule, value, callback) => {
            if (value) {
              if (/^([1-9]{1})(\d{11}|\d{15}|\d{16}|\d{17}|\d{18})$/.test(value)) {
                callback()
              } else {
                callback(new Error('请输入正确的银行卡号'))
              }
            } else {
              callback()
            }
          }
          }
        ]
      },
      disabled: false, // 表单是否可编辑
      activeTabs: 'base', // tab标签切换默认选中name参数
      activeCollapse: ['baseItem_1', 'baseItem_2', 'baseItem_3', 'baseItem_4'], // 折叠面板默认打开name参数
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
    'form.householdBirthday': function(val, oldVal) {
      if (val) {
        this.form.householdAge = computerAge(this.form.householdBirthday) > 0 ? computerAge(this.form.householdBirthday) + '岁' : 0
      } else {
        this.form.householdAge = ''
      }
    },
    'form.familyRelations': function(val, oldVal) {
      if (val === 'head_of_the_household') {
        this.disabled = true
      } else {
        this.disabled = false
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
      getExtremelyData(_userId_).then(response => {
        this.formatData(response.data, 'look')
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
        getExtremelyData(id).then(response => {
          this.formatData(response.data, 'edit')
          this.idEdit = false
        }).catch(() => {
          this.$message.error('获取用户信息失败！')
        })
      })
    },
    changeForm(val) {
      if (val === 'head_of_the_household') {
        this.disabled = true
        this.form.householder = this.form.fullName
        this.form.householdIdCard = this.form.idCard
        this.form.householdSex = this.form.sex
        this.form.householdMobile = this.form.mobile
        this.form.householdBirthday = this.form.birthday
      } else {
        this.form.householder = ''
        this.form.householdIdCard = ''
        this.form.householdSex = ''
        this.form.householdMobile = ''
        this.form.householdBirthday = ''
        this.disabled = false
      }
    },
    // 获取下拉字典
    getSelect() {
      const dictKey = [
        'sys_sex', // 性别
        'nation_type', // 民族
        'fp_bank_account', // 银行
        'family_relations', // 家庭关系
        'application_category', // 申请类别
        'defo_level', // 残疾等级
        'defo_type', // 残疾类别
        'self_care_ability', // 自理能力
        'serious_illness_name', // 重病
        'type_participation', // 参保
        'sys_Yes_No'// 智能物联
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
              case 'fp_bank_account':
                this.bankOptions = dict[key]
                break
              case 'family_relations':
                this.familyOptions = dict[key]
                break
              case 'application_category':
                this.applyOptions = dict[key]
                break
              case 'defo_level':
                this.levelOptions = dict[key]
                break
              case 'defo_type':
                this.typeOptions = dict[key]
                break
              case 'self_care_ability':
                this.abilityOptions = dict[key]
                break
              case 'serious_illness_name':
                this.seriousOptions = dict[key]
                break
              case 'type_participation':
                this.participaOptions = dict[key]
                break
              case 'sys_Yes_No':
                this.netOptions = dict[key]
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
      const formRefs = ['form_member', 'form_infor', 'form_base', 'form_address'].map(key => this.$refs[key])
      validateForms(formRefs).then(() => {
        const _form = this.form
        _form.censusArea = this.areaCode[0].length === 0 ? '' : this.areaCode[0][this.areaCode[0].length - 1]
        _form.liveArea = this.areaCode[1].length === 0 ? '' : this.areaCode[1][this.areaCode[1].length - 1]
        // 新增
        if (this.modelType === 'add' && !this.form.personId) {
          addExtremelyPoor(_form).then(response => {
            if (response.code === 0) {
              this.$message({
                type: 'success',
                message: '新增特困人员信息保存成功!'
              })
              // 关闭页面
              this.closeDetailsPage()
            } else {
              this.$message.error('新增特困人员信息操作失败，失败原因是：' + response.msg)
            }
          }).catch(() => {
            this.$message.error('新增特困人员信息操作失败!')
          })
        }
        // 编辑
        else if (this.modelType === 'edit' || (this.modelType === 'add' && this.form.personId)) {
          editExtremelyPoor(_form).then(response => {
            if (response.code === 0) {
              this.$message({
                type: 'success',
                message: '编辑特困人员信息保存成功!'
              })
              // 关闭页面
              this.closeDetailsPage()
            } else {
              this.$message.error('编辑特困人员信息操作失败，失败原因是：' + response.msg)
            }
          }).catch(() => {
            this.$message.error('编辑特困人员信息操作失败!')
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
      this.$router.push('/streetPlatform/userInfoConfig/extremelyPoorInfor')
    },
    // 选择日期
    birthdayChanges(val) {
      // 新增时，根据满足条件的身份证，自动补全出生日期
      if (this.form.householdIdCard !== '') {
        const _birthday = getBirthdayFromIdCard(this.form.householdIdCard)
        if (_birthday !== val) {
          this.$confirm('您选择的‘出生日期’与‘身份证的出生日期’不符合，是否修改？', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            if (val !== null) {
              this.form.householdBirthday = val
            } else {
              this.form.householdBirthday = ''
            }
          }).catch(() => {
            if (_birthday) {
              this.form.householdBirthday = _birthday
            } else {
              this.form.householdBirthday = ''
            }
            this.$message({
              type: 'info',
              message: '已取消操作！'
            })
          })
        }
      } else {
        if (val !== null) {
          this.form.householdBirthday = val
        } else {
          this.form.householdBirthday = ''
        }
      }
    },
    handleIdCardInput(value) {
      this.$refs['form_member'].validateField('idCard', (message) => {
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
    handleIdCardInputs(value) {
      this.$refs['form_base'].validateField('householdIdCard', (message) => {
        const valid = message == ''
        if (valid) {
          this.form.householdBirthday = getBirthdayFromIdCard(this.form.householdIdCard)
        } else {
          this.form.householdBirthday = ''
        }
      })
    },
    // 重置所有表单
    resetForm() {
      this.form.id = ''
      this.$refs.form_member.resetFields()
      this.$refs.form_infor.resetFields()
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
      if (!this.form.householdBirthday) {
        this.form.householdBirthday = getBirthdayFromIdCard(this.form.householdIdCard)
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
