<template>
  <el-container>
    <el-main class="tableContainer">
      <el-form
        ref="form_base"
        key="form_base"
        :model="form"
        :rules="isEditForm ? rulesForm : null "
        label-width="140px"
      >
        <el-collapse v-model="activeCollapse">
          <el-collapse-item name="baseItem_1">
            <template slot="title">
              <div class="titleSlider">
                <span>
                  <i class="titleTip" />基本信息
                </span>
              </div>
            </template>
            <el-row :gutter="0">
              <el-col :md="adaptiveGrid.md" :lg="adaptiveGrid.lg">
                <el-form-item :label="isEditForm ? '姓名' : '姓名：'" prop="fullName">
                  <el-input
                    v-if="isEditForm"
                    v-model="form.fullName"
                    :disabled="disabledAgain"
                    clearable
                    placeholder="请输入姓名"
                    @keyup.enter.native="editContent('form_base')"
                  />
                  <span v-else>{{ form.fullName }}</span>
                </el-form-item>
              </el-col>
              <el-col :md="adaptiveGrid.md" :lg="adaptiveGrid.lg">
                <el-form-item :label="isEditForm ? '身份证号' : '身份证号'" prop="idCard">
                  <el-input
                    v-if="this.isEditForm"
                    v-model="form.idCard"
                    :disabled="disabledAgain"
                    clearable
                    placeholder="请输入身份证号"
                    @input="handleIdCardInput"
                    @keyup.enter.native="editContent('form_base')"
                  />
                  <span v-else>{{ form.idCard }}</span>
                </el-form-item>
              </el-col>
              <el-col :md="adaptiveGrid.md" :lg="adaptiveGrid.lg">
                <el-form-item :label="isEditForm ? '性别' : '性别：'" prop="sex">
                  <el-select
                    v-if="isEditForm"
                    v-model="form.sex"
                    placeholder="请选择性别"
                    filterable
                    clearable
                    style="width:100%;"
                    @keyup.enter.native="editContent('form_base')"
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
                <el-form-item :label="isEditForm ? '出生日期' : '出生日期：'" prop="birthday">
                  <el-date-picker
                    v-if="isEditForm"
                    v-model="form.birthday"
                    disabled
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
                <el-form-item :label="isEditForm ? '年龄': '年龄：'" prop="age">
                  <el-input
                    v-if="isEditForm"
                    v-model="form.age"
                    disabled
                    clearable
                    placeholder="请输入年龄"
                    @keyup.enter.native="editContent"
                  />
                  <span v-else>{{ form.age }}</span>
                </el-form-item>
              </el-col>
              <el-col :md="adaptiveGrid.md" :lg="adaptiveGrid.lg">
                <el-form-item :label="isEditForm? '社保卡号': '社保卡号：'" prop="socialSecurityArd">
                  <el-input
                    v-if="isEditForm"
                    v-model="form.socialSecurityArd"
                    clearable
                    placeholder="请输入社保卡号"
                    @keyup.enter.native="editContent"
                  />
                  <span v-else>{{ form.socialSecurityArd }}</span>
                </el-form-item>
              </el-col>
              <el-col :md="adaptiveGrid.md" :lg="adaptiveGrid.lg">
                <el-form-item :label="isEditForm ? '民族' : '民族：'" prop="nation">
                  <el-select
                    v-if="isEditForm"
                    v-model="form.nation"
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
                <el-form-item :label="isEditForm ? '文化程度' : '文化程度：'" prop="eduLevel">
                  <el-select
                    v-if="isEditForm"
                    v-model="form.eduLevel"
                    clearable
                    style="width:100%;"
                    @keyup.enter.native="editContent"
                  >
                    <el-option
                      v-for="item in educationOptions"
                      :key="item.dictValue"
                      :label="item.dictLabel"
                      :value="item.dictValue"
                    />
                  </el-select>
                  <span v-else>{{ form.eduLevelName }}</span>
                </el-form-item>
              </el-col>
              <el-col :md="adaptiveGrid.md" :lg="adaptiveGrid.lg">
                <el-form-item :label="isEditForm? '曾从事职业': '曾从事职业：'" prop="age">
                  <el-input
                    v-if="isEditForm"
                    v-model="form.jobDes"
                    clearable
                    placeholder="请输入曾从事职业"
                    @keyup.enter.native="editContent"
                  />
                  <span v-else>{{ form.jobDes }}</span>
                </el-form-item>
              </el-col>
              <el-col :md="adaptiveGrid.md" :lg="adaptiveGrid.lg">
                <el-form-item :label="isEditForm? '籍贯': '籍贯：'" prop="hometown">
                  <el-input
                    v-if="isEditForm"
                    v-model="form.hometown"
                    clearable
                    placeholder="请输入籍贯"
                    @keyup.enter.native="editContent"
                  />
                  <span v-else>{{ form.hometown }}</span>
                </el-form-item>
              </el-col>
              <el-col :md="adaptiveGrid.md" :lg="adaptiveGrid.lg">
                <el-form-item :label="isEditForm ? '婚姻状况' : '婚姻状况：'" prop="maritalStatus">
                  <el-select
                    v-if="isEditForm"
                    v-model="form.maritalStatus"
                    placeholder="请选择婚姻状况"
                    clearable
                    style="width:100%;"
                    @keyup.enter.native="submitBtn"
                  >
                    <el-option
                      v-for="(item, index) in maritalStatusOptions"
                      :key="index"
                      :label="item.dictLabel"
                      :value="item.dictValue ? item.dictValue : index"
                    />
                  </el-select>
                  <span v-else>{{ form.maritalStatusName }}</span>
                </el-form-item>
              </el-col>
            </el-row>
          </el-collapse-item>
          <el-collapse-item name="baseItem_2">
            <template slot="title">
              <div class="titleSlider">
                <span>
                  <i class="titleTip" />联系信息
                </span>
              </div>
            </template>
            <el-row :gutter="0">
              <el-col :md="adaptiveGrid_plus.md" :lg="adaptiveGrid_plus.lg">
                <el-form-item
                  :label="isEditForm ? '户籍行政区划' : '户籍行政区划：'"
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
                  <span v-else>{{ form.censusAreaLevelName }}</span>
                </el-form-item>
              </el-col>
              <el-col :md="adaptiveGrid_plus.md" :lg="adaptiveGrid_plus.lg">
                <el-form-item
                  :label="isEditForm ? '户籍详细地址' : '户籍详细地址：'"
                  prop="censusAddr"
                >
                  <el-input
                    v-if="isEditForm"
                    ref="censusAddr"
                    v-model="form.censusAddr"
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
                  :label="isEditForm ? '居住行政区划' : '居住行政区划：'"
                  prop="liveArea"
                >
                  <Address
                    v-if="isEditForm"
                    :id-edit="idEdit"
                    :area-code="areaCode[1]"
                    :form-code="form.liveArea"
                    :width="'100%'"
                    :other="relevance"
                    @getAreaCode="getAreaCode_live"
                    @keyup.enter.native="editContent"
                  />
                  <span v-else>{{ form.liveAreaLevelName }}</span>
                </el-form-item>
              </el-col>
              <el-col :md="adaptiveGrid_plus.md" :lg="adaptiveGrid_plus.lg">
                <el-form-item
                  :label="isEditForm ? '居住详细地址' : '居住详细地址：'"
                  prop="liveAddr"
                >
                  <el-input
                    v-if="isEditForm"
                    ref="liveAddr"
                    v-model="form.liveAddr"
                    :disabled="disabled"
                    clearable
                    placeholder="请输入居住详细地址"
                    @change="changeIt"
                    @keyup.enter.native="editContent"
                  />
                  <span v-else>{{ form.liveAddr }}</span>
                </el-form-item>
              </el-col>
              <el-col :md="adaptiveGrid.md" :lg="adaptiveGrid.lg">
                <el-form-item :label="isEditForm ? '家庭电话' : '家庭电话：'" prop="homePhone">
                  <el-input
                    v-if="isEditForm"
                    ref="homePhone"
                    v-model.trim="form.homePhone"
                    :disabled="disabled"
                    clearable
                    placeholder="请输入家庭电话"
                    type="phone"
                    @blur="handleHomePhoneBlur('homePhone')"
                    @keyup.enter.native="editContent"
                  />
                  <span v-else>{{ form.homePhone }}</span>
                </el-form-item>
              </el-col>
              <el-col :md="adaptiveGrid.md" :lg="adaptiveGrid.lg">
                <el-form-item :label="isEditForm ? '手机号码' : '手机号码：'" prop="mobile">
                  <el-input
                    v-if="isEditForm"
                    v-model="form.mobile"
                    clearable
                    placeholder="请输入手机号"
                    @keyup.enter.native="editContent"
                  />
                  <span v-else>{{ form.mobile }}</span>
                </el-form-item>
              </el-col>
              <el-col :md="adaptiveGrid.md" :lg="adaptiveGrid.lg">
                <el-form-item :label="isEditForm ? '邮编' : '邮编：'" prop="placeResidence">
                  <el-input
                    v-if="isEditForm"
                    v-model="form.placeResidence"
                    clearable
                    placeholder="请输入邮编"
                    @keyup.enter.native="editContent"
                  />
                  <span v-else>{{ form.placeResidence }}</span>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="0">
              <el-col :md="adaptiveGrid_plus.md" :lg="adaptiveGrid_plus.lg">
                <el-form-item :label="isEditForm?'有无代理人':'有无代理人：'" prop="isAgents">
                  <el-radio-group v-model="form.isAgents" :disabled="modelType=='look'">
                    <el-radio label="1">是</el-radio>
                    <el-radio label="0">否</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="0">
              <el-col v-if="form.isAgents === '1'" :md="adaptiveGrid_plus.md" :lg="adaptiveGrid_plus.lg">
                <el-form-item
                  :label="isEditForm ? '居住行政区划' : '居住行政区划：'"
                  prop="agentsLiveArea"
                >
                  <Address
                    v-if="isEditForm"
                    :id-edit="idEdits"
                    :area-code="agentsAreaCode"
                    :form-code="form.agentsLiveArea"
                    :width="'100%'"
                    @getAreaCode="getAreaCode_agentsLive"
                    @keyup.enter.native="editContent"
                  />
                  <span v-else>{{ form.agentsLiveAreaCodeLevelName }}</span>
                </el-form-item>
              </el-col>
              <el-col v-if="form.isAgents === '1'" :md="adaptiveGrid_plus.md" :lg="adaptiveGrid_plus.lg">
                <el-form-item
                  :label="isEditForm ? '居住详细地址' : '居住详细地址：'"
                  prop="agentsLiveAddr"
                >
                  <el-input
                    v-if="isEditForm"
                    v-model="form.agentsLiveAddr"
                    :disabled="disabled"
                    clearable
                    placeholder="请输入居住详细地址"
                    @keyup.enter.native="editContent"
                  />
                  <span v-else>{{ form.agentsLiveAddr }}</span>
                </el-form-item>
              </el-col>
              <el-col v-if="form.isAgents === '1'" :md="adaptiveGrid.md" :lg="adaptiveGrid.lg">
                <el-form-item :label="isEditForm ? '代理人姓名' : '代理人姓名：'" prop="agentsName">
                  <el-input
                    v-if="isEditForm"
                    v-model="form.agentsName"
                    placeholder="请输入代理人姓名"
                    clearable
                    style="width:100%;"
                  />
                  <span v-else>{{ form.agentsName }}</span>
                </el-form-item>
              </el-col>
              <el-col v-if="form.isAgents === '1'" :md="adaptiveGrid.md" :lg="adaptiveGrid.lg">
                <el-form-item :label="isEditForm ? '与申请人关系' : '与申请人关系：'" prop="agentsRelation">
                  <el-input
                    v-if="isEditForm"
                    v-model="form.agentsRelation"
                    placeholder="请输入与申请人关系"
                    clearable
                    style="width:100%;"
                  />
                  <span v-else>{{ form.agentsRelation }}</span>
                </el-form-item>
              </el-col>
              <el-col v-if="form.isAgents === '1'" :md="adaptiveGrid.md" :lg="adaptiveGrid.lg">
                <el-form-item :label="isEditForm ? '家庭电话' : '家庭电话：'" prop="agentsHomePhone">
                  <el-input
                    v-if="isEditForm"
                    ref="homePhone"
                    v-model.trim="form.agentsHomePhone"
                    :disabled="disabled"
                    clearable
                    placeholder="请输入家庭电话"
                    type="phone"
                    @blur="handleHomePhoneBlur('agentsHomePhone')"
                    @keyup.enter.native="editContent"
                  />
                  <span v-else>{{ form.agentsHomePhone }}</span>
                </el-form-item>
              </el-col>
              <el-col v-if="form.isAgents === '1'" :md="adaptiveGrid.md" :lg="adaptiveGrid.lg">
                <el-form-item :label="isEditForm ? '手机号码' : '手机号码：'" prop="agentsMobile">
                  <el-input
                    v-if="isEditForm"
                    v-model="form.agentsMobile"
                    clearable
                    placeholder="请输入手机号"
                    @keyup.enter.native="editContent"
                  />
                  <span v-else>{{ form.agentsMobile }}</span>
                </el-form-item>
              </el-col>
              <el-col v-if="form.isAgents === '1'" :md="adaptiveGrid.md" :lg="adaptiveGrid.lg">
                <el-form-item :label="isEditForm ? '邮编' : '邮编：'" prop="agentsPlaceResidence">
                  <el-input
                    v-if="isEditForm"
                    v-model="form.agentsPlaceResidence"
                    clearable
                    placeholder="请输入邮编"
                    @keyup.enter.native="editContent"
                  />
                  <span v-else>{{ form.agentsPlaceResidence }}</span>
                </el-form-item>
              </el-col>
            </el-row>
          </el-collapse-item>
          <el-collapse-item v-if="lastMan !== null && lastMan !== ''" name="baseItem_3">
            <template slot="title">
              <div class="titleSlider">
                <span>
                  <i class="titleTip" />上次评估信息
                </span>
              </div>
            </template>
            <el-row :gutter="0">
              <el-col :md="adaptiveGrid.md" :lg="adaptiveGrid.lg">
                <el-form-item :label="isEditForm ? '上次评估日期' : '上次评估日期：'">
                  <el-input
                    v-if="isEditForm"
                    v-model="lastDetail.assessCompleteDate"
                    disabled
                    clearable
                    placeholder="请输入上次评估日期"
                  />
                  <span v-else>{{ lastDetail.assessCompleteDate }}</span>
                </el-form-item>
              </el-col>
              <el-col :md="adaptiveGrid.md" :lg="adaptiveGrid.lg">
                <el-form-item :label="isEditForm ? '评估类别' : '评估类别：'">
                  <el-input
                    v-if="isEditForm"
                    v-model="lastDetail.assessTypeName"
                    disabled
                    clearable
                    placeholder="请输入评估类别"
                  />
                  <span v-else>{{ lastDetail.assessTypeName }}</span>
                </el-form-item>
              </el-col>
              <el-col :md="adaptiveGrid.md" :lg="adaptiveGrid.lg">
                <el-form-item :label="isEditForm ? '养老机构' : '养老机构：'">
                  <el-input
                    v-if="isEditForm"
                    v-model="lastDetail.orgName"
                    disabled
                    clearable
                    placeholder="请输入养老机构"
                  />
                  <span v-else>{{ lastDetail.orgName }}</span>
                </el-form-item>
              </el-col>
              <el-col :md="adaptiveGrid.md" :lg="adaptiveGrid.lg">
                <el-form-item :label="isEditForm ? '评估师1' : '评估师1：'">
                  <el-input
                    v-if="isEditForm"
                    v-model="lastDetail.orderTakingAssessName1"
                    disabled
                    clearable
                    placeholder="请输入评估师1"
                    @keyup.enter.native="editContent('form_base')"
                  />
                  <span v-else>{{ lastDetail.orderTakingAssessName1 }}</span>
                </el-form-item>
              </el-col>
              <el-col :md="adaptiveGrid.md" :lg="adaptiveGrid.lg">
                <el-form-item :label="isEditForm ? '评估师2' : '评估师2：'">
                  <el-input
                    v-if="isEditForm"
                    v-model="lastDetail.orderTakingAssessName2"
                    disabled
                    clearable
                    placeholder="请输入评估师2"
                  />
                  <span v-else>{{ lastDetail.orderTakingAssessName2 }}</span>
                </el-form-item>
              </el-col>
            </el-row>
          </el-collapse-item>
          <el-collapse-item name="baseItem_4">
            <template slot="title">
              <div class="titleSlider">
                <span>
                  <i class="titleTip" />本次评估信息
                </span>
              </div>
            </template>
            <el-row :gutter="0">
              <el-col :md="adaptiveGrid.md" :lg="adaptiveGrid.lg">
                <el-form-item :label="isEditForm ? '评估类别' : '评估类别：'" prop="assessType">
                  <el-select
                    v-if="isEditForm"
                    v-model="form.assessType"
                    placeholder="请选择评估类别"
                    disabled
                    filterable
                    clearable
                    style="width:100%;"
                    @keyup.enter.native="editContent('form_base')"
                  >
                    <el-option
                      v-for="item in evaluationCategory"
                      :key="item.dictValue"
                      :label="item.dictLabel"
                      :value="item.dictValue"
                    />
                  </el-select>
                  <span v-else>{{ form.assessTypeName }}</span>
                </el-form-item>
              </el-col>
              <el-col :md="adaptiveGrid.md" :lg="adaptiveGrid.lg">
                <el-form-item :label="isEditForm ? '养老机构' : '养老机构：'" prop="orgName">
                  <el-input
                    v-if="isEditForm"
                    v-model="form.orgName"
                    disabled
                    clearable
                    placeholder="请输入养老机构"
                    @keyup.enter.native="editContent"
                  />
                  <span v-else>{{ form.orgName }}</span>
                </el-form-item>
              </el-col>
              <el-col :md="adaptiveGrid.md" :lg="adaptiveGrid.lg">
                <el-form-item :label="isEditForm ? '入住情况' : '入住情况：'" prop="occupancyCode">
                  <el-select
                    v-if="isEditForm"
                    v-model="form.occupancyCode"
                    placeholder="请选择入住情况"
                    :disabled="disabledAgain"
                    filterable
                    clearable
                    style="width:100%;"
                    @keyup.enter.native="editContent('form_base')"
                  >
                    <el-option
                      v-for="item in checkIn"
                      :key="item.dictValue"
                      :label="item.dictLabel"
                      :value="item.dictValue"
                    />
                  </el-select>
                  <span v-else>{{ form.occupancyCodeName }}</span>
                </el-form-item>
              </el-col>
              <el-col :md="adaptiveGrid.md" :lg="adaptiveGrid.lg">
                <el-form-item :label="isEditForm ? '评估费用承担' : '评估费用承担：'" prop="costBearingCode">
                  <el-select
                    v-if="isEditForm"
                    v-model="form.costBearingCode"
                    placeholder="请选择评估费用承担"
                    filterable
                    clearable
                    style="width:100%;"
                    @keyup.enter.native="editContent('form_base')"
                  >
                    <el-option
                      v-for="item in evaluationCostCommitment"
                      :key="item.dictValue"
                      :label="item.dictLabel"
                      :value="item.dictValue"
                    />
                  </el-select>
                  <span v-else>{{ form.costBearingCodeName }}</span>
                </el-form-item>
              </el-col>
              <el-col :md="adaptiveGrid.md" :lg="adaptiveGrid.lg">
                <el-form-item :label="isEditForm ? '预约评估日期' : '预约评估日期：'" prop="appointmentData">
                  <el-date-picker
                    v-if="isEditForm"
                    v-model="form.appointmentData"
                    type="date"
                    format="yyyy年MM月dd日"
                    value-format="yyyy-MM-dd"
                    placeholder="请选择预约评估日期"
                    :picker-options="pickerOptions"
                    style="width:100%;"
                    @keyup.enter.native="editContent"
                  />
                  <span v-else>{{ form.appointmentData }}</span>
                </el-form-item>
              </el-col>
              <el-col :md="adaptiveGrid.md" :lg="adaptiveGrid.lg">
                <el-form-item :label="isEditForm ? '评估地点' : '评估地点：'" prop="assessAddrCode">
                  <el-select
                    v-if="isEditForm"
                    v-model="form.assessAddrCode"
                    placeholder="请选择评估地点"
                    filterable
                    clearable
                    style="width:100%;"
                    @keyup.enter.native="editContent('form_base')"
                  >
                    <el-option
                      v-for="item in evaluationLocation"
                      :key="item.dictValue"
                      :label="item.dictLabel"
                      :value="item.dictValue"
                    />
                  </el-select>
                  <span v-else>{{ form.assessAddrCodeName }}</span>
                </el-form-item>
              </el-col>
              <el-col :md="adaptiveGrid_plus.md" :lg="adaptiveGrid_plus.lg">
                <el-form-item
                  :label="isEditForm ? '所属区划' : '所属区划：'"
                  prop="assessAreaCode"
                >
                  <Address
                    v-if="isEditForm"
                    :id-edit="idSbEdit"
                    :area-code="areaCodeBase"
                    :form-code="form.assessAreaCode"
                    :width="'100%'"
                    :disabled="disabledAdd"
                    @getAreaCode="getAreaCodeBase_reg"
                    @keyup.enter.native="editContent"
                  />
                  <span v-else>{{ form.assessAreaCodeLevelName }}</span>
                </el-form-item>
              </el-col>
              <el-col :md="adaptiveGrid_plus.md" :lg="adaptiveGrid_plus.lg">
                <el-form-item
                  :label="isEditForm ? '评估地址' : '评估地址：'"
                  prop="assessAddr"
                >
                  <el-input
                    v-if="isEditForm"
                    v-model="form.assessAddr"
                    clearable
                    placeholder="请输入评估地址"
                    :disabled="disabledAdd"
                    @keyup.enter.native="editContent"
                  />
                  <span v-else>{{ form.assessAddr }}</span>
                </el-form-item>
              </el-col>
              <el-col :md="adaptiveGrid.md" :lg="adaptiveGrid.lg">
                <el-form-item :label="isEditForm ? '评估联络人' : '评估联络人：'" prop="assessLinkman">
                  <el-input
                    v-if="isEditForm"
                    v-model="form.assessLinkman"
                    clearable
                    placeholder="请输入评估联络人"
                    @keyup.enter.native="editContent"
                  />
                  <span v-else>{{ form.assessLinkman }}</span>
                </el-form-item>
              </el-col>
              <el-col :md="adaptiveGrid.md" :lg="adaptiveGrid.lg">
                <el-form-item :label="isEditForm ? '联系电话' : '联系电话：'" prop="assessLinkmanPhone">
                  <el-input
                    v-if="isEditForm"
                    v-model="form.assessLinkmanPhone"
                    clearable
                    placeholder="请输入联系电话"
                    @keyup.enter.native="editContent"
                  />
                  <span v-else>{{ form.assessLinkmanPhone }}</span>
                </el-form-item>
              </el-col>
              <el-col :md="adaptiveGrid.md" :lg="adaptiveGrid.lg">
                <el-form-item :label="isEditForm ? '本院评估师' : '评估师1：'" prop="ourAssessEmpId">
                  <el-select
                    v-if="isEditForm"
                    v-model="form.ourAssessEmpId"
                    placeholder="请选择本院评估师"
                    filterable
                    clearable
                    style="width:100%;"
                    @keyup.enter.native="editContent('form_base')"
                  >
                    <el-option
                      v-for="item in ourAssessEmpList"
                      :key="item.id"
                      :label="item.fullName"
                      :value="item.id"
                    />
                  </el-select>
                  <span v-else>{{ form.ourAssessEmpName }}</span>
                </el-form-item>
              </el-col>
              <el-col :md="adaptiveGrid.md" :lg="adaptiveGrid.lg" v-if="!isEditForm && (assessStatusName === '已取消' || assessStatusName === '已完成' || assessStatusName === '已开始' || assessStatusName === '未开始' || assessStatusName === '待复审')">
                <el-form-item label="评估师2：">
                  <span>{{ orderTakingAssessName2 }}</span>
                </el-form-item>
              </el-col>
              <el-col :md="adaptiveGrid.md" :lg="adaptiveGrid.lg" v-if="!isEditForm && (assessStatusName === '待支付' || assessStatusName === '待接单' || assessStatusName === '已取消' || assessStatusName === '已完成' || assessStatusName === '已开始' || assessStatusName === '未开始' || assessStatusName === '待复审')">
                <el-form-item label="申请状态：">
                  <span>{{ assessStatusName }}</span>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :md="adaptiveGrid.md" :lg="adaptiveGrid.lg" v-if="!isEditForm && (assessStatusName === '待支付' || assessStatusName === '待接单' || assessStatusName === '已取消'|| assessStatusName === '已完成' || assessStatusName === '已开始' || assessStatusName === '未开始' || assessStatusName === '待复审')">
                <el-form-item label="申请创建时间：">
                  <span>{{ createTime }}</span>
                </el-form-item>
              </el-col>
              <el-col :md="adaptiveGrid.md" :lg="adaptiveGrid.lg" v-if="!isEditForm && (assessStatusName === '待接单' || assessStatusName === '已取消' || assessStatusName === '已完成' || assessStatusName === '已开始' || assessStatusName === '未开始' || assessStatusName === '待复审')">
                <el-form-item label="支付时间：">
                  <span>{{ paymentTime }}</span>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :md="adaptiveGrid.md" :lg="adaptiveGrid.lg" v-if="!isEditForm && assessStatusName === '已取消'">
                <el-form-item label="取消账号：">
                  <span>{{ updateBy }}</span>
                </el-form-item>
              </el-col>
              <el-col :md="adaptiveGrid.md" :lg="adaptiveGrid.lg" v-if="!isEditForm && assessStatusName === '已取消'">
                <el-form-item label="取消时间：">
                  <span>{{ updateTime }}</span>
                </el-form-item>
              </el-col>
              <el-col :md="adaptiveGrid.md" :lg="adaptiveGrid.lg" v-if="!isEditForm && assessStatusName === '已取消'">
                <el-form-item label="取消原因：">
                  <span>{{ remark }}</span>
                </el-form-item>
              </el-col>
            </el-row>
          </el-collapse-item>
        </el-collapse>
      </el-form>
      <el-footer>
        <div v-if="isEditForm" class="footerBtn">
          <el-button type="primary" class="base-btn btnMarginLeft15" @click="editContent('form_base')">确定</el-button>
          <el-button class="mr" @click="cancelDetailsPage">取消</el-button>
        </div>
      </el-footer>
    </el-main>
  </el-container>
</template>

<script>
import Address from '@/components/Address'
import _ from 'lodash'
import { verifyFullName, verifyIdCard, verifyHomePhone, verifyMobile, validatePhoneThere } from '@/utils/validate'
import { allSelectdictionaryData } from '@/api/facilitiesConfig/pensionAgency'
import { adaptiveGrid_max, adaptiveGrid_plus } from '@/common/index'
import { computerAge, getBirthdayFromIdCard, getDate_YMD } from '@/utils/index'
import { getAssessor } from '@/api/evaluationManagement/basicInformation'
import { getOurHospList, addApply, getApplyDetail, editApply } from '@/api/esimate/esimate'
import { closeSelectedTag } from '@/utils/rooterJump'
export default {
  name: 'EsimateApplyDetails',
  components: { Address },
  data() {
    // 校验所属居委
    const verifyAreaCode = (rule, value, callback) => {
      if (this.areaCode[1].length === 0) {
        callback(new Error('居住行政区划不能为空，请选择！'))
      } else {
        callback()
      }
    }
    const verifyAreaHomeCode = (rule, value, callback) => {
      if (this.areaCode[0].length === 0) {
        callback(new Error('户籍行政区划不能为空，请选择！'))
      } else {
        callback()
      }
    }
    const verifyAgentsAreaCode = (rule, value, callback) => {
      if (this.agentsAreaCode.length === 0 || this.agentsAreaCode[0] === '') {
        callback(new Error('代理人居住行政区划不能为空，请选择！'))
      } else {
        callback()
      }
    }
    const verifyAreaCodeBase = (rule, value, callback) => {
      if (this.areaCodeBase.length === 0 || this.areaCodeBase[0] === '') {
        callback(new Error('所属区划不能为空，请选择！'))
      } else {
        callback()
      }
    }
    return {
      pickerOptions: {
        disabledDate(time) {
          const date = time.getTime() + 3600 * 1000 * 24
          return date < Date.now()
        }
      },
      activeTabs: 'base',
      isEditForm: true,
      idEdit: true,
      idEdits: true,
      idSbEdit: true,
      localDiaabled: false,
      disabledAdd: false,
      disabledAgain: false,
      activeCollapse: ['baseItem_1', 'baseItem_2', 'baseItem_3', 'baseItem_4'],
      form: {
        fullName: '',
        idCard: '',
        sex: '',
        birthday: '',
        age: '',
        socialSecurityArd: '', // 社保卡号
        nation: '', // 民族
        nationName: '',
        eduLevel: '', // 文化程度
        eduLevelName: '',
        hometown: '', // 籍贯
        jobDes: '', // 蹭从事职业
        maritalStatus: '', // 婚姻状况
        maritalStatusName: '',
        censusAddr: '', // 户籍详细地址
        censusArea: '', // 户籍行政区划
        censusAreaCodeName: '', // 户籍行政区划地址名称
        liveAddr: '', // 居住详细地址
        liveArea: '', // 居住行政区划
        liveAreaCodeName: '', // 居住行政区划地址名称
        homePhone: '', // 家庭电话
        mobile: '',
        placeResidence: '', // 邮编
        isAgents: '0', // 有無代理人
        agentsName: '',
        agentsRelation: '',
        agentsLiveArea: '',
        agentsLiveAreaCodeName: '',
        agentsLiveAddr: '',
        agentsHomePhone: '',
        agentsMobile: '',
        agentsPlaceResidence: '',
        assessType: 'first_evaluation',
        orgId: '',
        orgName: '',
        occupancyCode: '', // 入住情况
        costBearingCode: '', // 评估费用承担
        appointmentData: '', // 预约评估日期
        assessAddrCode: '', // 评估地点
        assessAreaCode: '', // 所属区划
        assessAddr: '', // 评估地址
        assessLinkman: '', // 评估联络人
        assessLinkmanPhone: '', // 联系电话
        ourAssessEmpId: '' // 本院评估师ID
      },
      rulesForm: {
        fullName: [
          { required: true, trigger: 'blur', message: '请填写姓名！' },
          { trigger: 'blur', validator: verifyFullName }
        ],
        sex: [
          { required: true, trigger: 'change', message: '请选择性别！' }
        ],
        idCard: [
          { required: true, trigger: 'MANUAL_TRIGGER', message: '请填写身份证！' },
          { trigger: 'MANUAL_TRIGGER', validator: verifyIdCard }
        ],
        mobile: [
          { required: true, trigger: 'blur', message: '请填写手机号！' },
          { trigger: 'blur', validator: verifyMobile }
        ],
        isAgents: [
          { required: true }
        ],
        homePhone: [
          { trigger: 'MANUAL_TRIGGER', validator: verifyHomePhone }
        ],
        assessLevel: [
          { required: true, trigger: 'change', message: '请选择评估师等级！' }
        ],
        orgId: [
          { required: true, trigger: 'change', message: '请选择养老机构！' }
        ],
        censusArea: [
          { required: true, trigger: 'change', validator: verifyAreaHomeCode }
        ],
        censusAddr: [
          { required: true, trigger: 'blur', message: '请填写户籍详细地址！' }
        ],
        liveArea: [
          { required: true, trigger: 'change', validator: verifyAreaCode }
        ],
        liveAddr: [
          { required: true, trigger: 'blur', message: '请填写居住详细地址！' }
        ],
        agentsLiveArea: [
          { required: true, trigger: 'change', validator: verifyAgentsAreaCode }
        ],
        agentsLiveAddr: [
          { required: true, trigger: 'blur', message: '请填写代理人居住详细地址！' }
        ],
        accountName: [
          { required: true, trigger: 'change', message: '请输入账户名！' }
        ],
        agentsName: [
          { required: true, trigger: 'blur', message: '请填写代理人姓名！' }
        ],
        occupancyCode: [
          { required: true, trigger: 'change', message: '请选择入住情况！' }
        ],
        costBearingCode: [
          { required: true, trigger: 'change', message: '请选择评估费用承担！' }
        ],
        appointmentData: [
          { required: true, trigger: 'change', message: '请选择预约评估日期！' }
        ],
        assessAddrCode: [
          { required: true, trigger: 'change', message: '请选择预约评估地点！' }
        ],
        agentsRelation: [
          { required: true, trigger: 'blur', message: '请填写与申请人关系' }
        ],
        assessAreaCode: [
          { required: true, trigger: 'change', validator: verifyAreaCodeBase }
        ],
        assessAddr: [
          { required: true, trigger: 'blur', message: '请填写评估地址！' }
        ],
        assessLinkman: [
          { required: true, trigger: 'blur', message: '请填写评估联络人！' }
        ],
        assessLinkmanPhone: [
          { required: true, trigger: 'blur', message: '请填写联系电话！' },
          { trigger: 'blur', validator: validatePhoneThere }
        ],
        ourAssessEmpId: [
          { required: true, trigger: 'change', message: '请选择本院评估师！' }
        ],
        agentsMobile: [
          { required: true, trigger: 'blur', message: '请填写代理人手机号码！' },
          { trigger: 'blur', validator: verifyMobile }
        ]
      },
      adaptiveGrid: {
        md: adaptiveGrid_max.md,
        lg: adaptiveGrid_max.lg
      },
      adaptiveGrid_plus: {
        md: adaptiveGrid_plus.md,
        lg: adaptiveGrid_plus.lg
      },
      disabled: false,
      educationOptions: [], // 文化程度
      nationOptions: [], // 民族
      maritalStatusOptions: [], // 婚姻状况
      sexOptions: [], // 性别
      evaluationCategory: [], // 评估类别
      checkIn: [], // 入住情况
      evaluationCostCommitment: [], // 评估费用承担
      evaluationLocation: [], // 评估地点
      areaCode: [[], []], // 区域行政的全部ID
      agentsAreaCode: [], // 代理人居住区划
      areaCodeBase: [], // 所属区划
      ourAssessEmpList: [], // 本院评估师列表
      lastMan: '',
      modelType: null,
      jgAreaCode: '',
      jgAddress: '',
      applyId: '',
      lastDetail: {},
      agentsLiveAreaInfor: [],
      agentsAreaCodeInfor: [],
      assessStatusName: '',
      orderTakingAssessName2: '',
      createTime: '',
      paymentTime: '',
      remark: '',
      updateTime: '',
      updateBy: '',
      isFirst: true
    }
  },
  watch: {
    'form.isAgents': {
      handler(newName, oldName) {
        this.idEdits = true
        if (newName == 1) {
          setTimeout(() => {
            this.form.agentsLiveArea = JSON.parse(JSON.stringify(this.agentsLiveAreaInfor))
            this.agentsAreaCode = JSON.parse(JSON.stringify(this.agentsAreaCodeInfor))
            this.idEdits = false
          })
        }
      }
    },
    'form.birthday': function(val, oldVal) {
      if (val) {
        this.form.age = computerAge(this.form.birthday) + '岁'
      } else {
        this.form.age = ''
      }
    },
    'form.assessAddrCode': function(val, oldVal) {
      if (val === 'other') {
        if (this.isFirst === true) {
          this.isFirst = false
          return false
        }
        this.disabledAdd = false
        this.form.assessAddr = ''
        this.form.assessAreaCode = []
        this.areaCodeBase = []
        setTimeout(() => {
          this.idSbEdit = !this.idSbEdit
        })
      } else {
        this.disabledAdd = true
        // this.form.assessAddr = ''
        // this.areaCodeBase = []
        if (val === 'old_man_s_home') {
          this.form.assessAddr = this.form.liveAddr
          this.form.assessAreaCode = JSON.parse(JSON.stringify(this.areaCode[1]))
          this.areaCodeBase = JSON.parse(JSON.stringify(this.areaCode[1]))
          setTimeout(() => {
            this.idSbEdit = !this.idSbEdit
          })
        } else {
          this.form.assessAddr = JSON.parse(JSON.stringify(this.jgAddress))
          this.form.assessAreaCode = JSON.parse(JSON.stringify(this.jgAreaCode.split(',')))
          this.areaCodeBase = JSON.parse(JSON.stringify(this.jgAreaCode.split(',')))
          setTimeout(() => {
            this.idSbEdit = !this.idSbEdit
          })
        }
      }
    }
  },
  mounted() {
    this.modelType = this.$route.query.modelType
    this.applyId = this.$route.query.applyId ? this.$route.query.applyId : null
    this.disabledAgain = !!this.$route.query.applyId
    const _userId_ = this.$route.params.id || ''
    this.getSelect()
    if (this.modelType === 'look') {

    } else {
      this.isEditForm = true
    }
    this.allData(_userId_, this.modelType)
  },
  methods: {
    editContent(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const params = _.cloneDeep(this.clearData(this.form))
          params.objVo.censusArea = this.areaCode[0].length === 0 ? '' : this.areaCode[0][this.areaCode[0].length - 1] + ''
          params.objVo.censusAreaCodeLevel = this.areaCode[0].join(',')
          params.objVo.liveArea = this.areaCode[1].length === 0 ? '' : this.areaCode[1][this.areaCode[1].length - 1] + ''
          params.objVo.liveAreaCodeLevel = this.areaCode[1].join(',')
          params.objVo.agentsLiveArea = this.agentsAreaCode.length === 0 ? '' : this.agentsAreaCode[this.agentsAreaCode.length - 1] + ''
          params.objVo.agentsLiveAreaCodeLevel = this.agentsAreaCode.join(',')
          params.applyVo.assessAreaCode = this.areaCodeBase.length === 0 ? '' : this.areaCodeBase[this.areaCodeBase.length - 1] + ''
          params.applyVo.assessAreaCodeLevel = this.areaCodeBase.join(',')
          if (params.applyVo.ourAssessEmpId !== 0) {
            this.ourAssessEmpList.forEach(item => {
              if (item.id === params.applyVo.ourAssessEmpId) {
                params.applyVo.ourAssessEmpName = item.fullName
              }
            })
          } else {
            params.applyVo.ourAssessEmpId = ''
          }
          if (this.modelType === 'add') {
            addApply(params).then(res => {
              if (res.code === 0) {
                this.$message({
                  type: 'success',
                  message: '新增评估申请保存成功!'
                })
                this.afterAdd()
                // 关闭页面，跳转到列表
                this.closeDetailsPage()
              } else if (res.code === 1) {
                this.$message.warning(res.msg)
              } else {
                this.$message.error(res.msg)
              }
            })
          } else if (this.modelType === 'edit') {
            if (this.$route.query.applyId) {
              params.applyVo.bizAssessInfoId = this.$route.query.applyId
            } else {
              params.applyVo.id = this.form.applyId
            }
            params.objVo.id = this.form.objId
            params.applyVo.applyPersonId = this.form.applyPersonId
            editApply(params).then(res => {
              if (res.code === 0) {
                this.$message({
                  type: 'success',
                  message: '编辑评估申请保存成功!'
                })
                // 关闭页面，跳转到列表
                this.closeDetailsPage()
              } else if (res.code === 1) {
                this.$message.warning(res.msg)
              } else {
                this.$message.error(res.msg)
              }
            })
          }
        }
      })
    },
    closeDetailsPage() {
      closeSelectedTag(this, this.$route)
      if (this.$route.query.applyId) {
        this.$router.push('/evaluationManagement/esimateManage/esimateReport')
      } else {
        this.$router.push('/evaluationManagement/esimateManage/esimateApply')
      }
    },
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
    getSelect() {
      const dictKey = [
        'nation_type', // 民族
        'biz_marital_status', // 婚姻状况
        'edu_level', // 文化程度
        'evaluation_category', // 评估类别
        'check_in', // 入住情况
        'evaluation_cost_commitment', // 费用承担
        'evaluation_location', // 评估地点
        'sys_sex' // 性别
      ].join(',')
      return new Promise((resolve, reject) => {
        allSelectdictionaryData(dictKey).then(response => {
          const dict = response.data
          for (const key in dict) {
            switch (key) {
              case 'sys_sex':
                this.sexOptions = dict[key]
                break
              // 民族
              case 'nation_type':
                this.nationOptions = dict[key]
                break
              // 文化程度
              case 'edu_level':
                this.educationOptions = dict[key]
                break
              // 婚姻状况
              case 'biz_marital_status':
                this.maritalStatusOptions = dict[key]
                break
              // 评估类别
              case 'evaluation_category':
                this.evaluationCategory = dict[key]
                break
              // 入住情况
              case 'check_in':
                this.checkIn = dict[key]
                break
              // 费用承担
              case 'evaluation_cost_commitment':
                this.evaluationCostCommitment = dict[key]
                break
              // 评估地点
              case 'evaluation_location':
                this.evaluationLocation = dict[key]
                break
            }
          }
          resolve()
        }).catch(() => {
          reject()
        })
      })
    },
    async allData(id, type) {
      await this.getSelect()
      await this.getOrg()
      await this.getOurHospList()
      if (type === 'add') {
        this.idEdit = false
        this.idEdits = !this.idEdits
        this.idSbEdit = !this.idSbEdit
        this.isEditForm = true
      } else if (type === 'edit') {
        this.isEditForm = true
        await this.getApplyDetail(id, this.applyId)
      } else if (type === 'look') {
        this.isEditForm = false
        await this.getApplyDetail(id, this.applyId)
      }
    },
    // 获取详细
    getApplyDetail(id, applyId) {
      return new Promise((resolve, reject) => {
        getApplyDetail({
          id: id,
          bizAssessInfoId: applyId
        }).then(res => {
          if (res.code === 0) {
            this.clearDetailData(res.data)
            this.lastMan = res.data.lastApplyInfo
          }
          resolve()
        }).catch(() => {
          reject()
        })
      })
    },
    // 获取养老机构
    getOrg() {
      return new Promise((resolve, reject) => {
        getAssessor().then(res => {
          if (res.code === 0) {
            if (res.data) {
              this.form.orgId = res.data.org_id
              this.form.orgName = res.data.org_name
              this.jgAreaCode = res.data.area_code_level
              this.jgAddress = res.data.addr
            }
          }
          resolve()
        }).catch(() => {
          reject()
        })
      })
    },
    // 获取本院评估师
    getOurHospList() {
      return new Promise((resolve, reject) => {
        if (this.$route.query.typeApply === 'review_assessment') {
          getOurHospList({
            orgId: this.form.orgId,
            bizAssessInfoId: this.$route.query.applyId
          }).then(res => {
            if (res.code === 0) {
              if (res.data.list.length === 0 || res.data.list === null) {
                const data = {}
                data.id = 0
                data.fullName = '无'
                this.ourAssessEmpList.push(data)
              } else {
                this.ourAssessEmpList = res.data.list
              }
            }
            resolve()
          }).catch(() => {
            reject()
          })
        } else {
          getOurHospList({
            orgId: this.form.orgId
          }).then(res => {
            if (res.code === 0) {
              if (res.data.list.length === 0 || res.data.list === null) {
                const data = {}
                data.id = 0
                data.fullName = '无'
                this.ourAssessEmpList.push(data)
              } else {
                this.ourAssessEmpList = res.data.list
              }
            }
            resolve()
          }).catch(() => {
            reject()
          })
        }
      })
    },
    // 家庭电话输入框失去焦点
    handleHomePhoneBlur(data) {
      this.$refs['form_base'].validateField(data, (message) => {
        const valid = message === ''
        if (!valid) {
        }
      })
    },
    handleResponseAddress(response) {
      if (response.censusArea) {
        response.censusArea = response.censusArea.split(',') || []
      } else {
        response.censusArea = []
      }
      if (response.liveArea) {
        response.liveArea = response.liveArea.split(',') || []
      } else {
        response.liveArea = []
      }
    },
    // 获取区域的值----户籍
    getAreaCode_reg(val) {
      this.areaCode[0] = val
    },
    // 获取区域的值----居住
    getAreaCode_live(val) {
      this.areaCode[1] = val
    },
    // 获取区域的值----代理人居住
    getAreaCode_agentsLive(val) {
      this.agentsAreaCode = val
    },
    getAreaCodeBase_reg(val) {
      this.areaCodeBase = val
    },
    handleIdCardInput() {
      this.$refs['form_base'].validateField('idCard', (message) => {
        const valid = message === ''
        if (valid) {
          const idCard = this.form.idCard
          this.form.birthday = getBirthdayFromIdCard(idCard)
        } else {
          this.form.birthday = ''
        }
      })
    },
    relevance() {
      if (this.form.assessAddrCode === 'old_man_s_home') {
        this.form.assessAreaCode = JSON.parse(JSON.stringify(this.areaCode[1]))
        this.areaCodeBase = JSON.parse(JSON.stringify(this.areaCode[1]))
        setTimeout(() => {
          this.idSbEdit = !this.idSbEdit
        })
      }
    },
    // 提交表单前整理数据
    clearData(data) {
      const newData = {
        applyVo: {},
        objVo: {}
      }
      const applyVo = {}
      const objVo = {}
      //     applyVo
      objVo.fullName = data.fullName
      objVo.idCard = data.idCard
      objVo.sex = data.sex
      objVo.birthday = data.birthday
      objVo.age = data.age
      objVo.socialSecurityArd = data.socialSecurityArd
      objVo.nation = data.nation
      objVo.nationName = data.nationName
      objVo.eduLevel = data.eduLevel
      objVo.eduLevelName = data.eduLevelName
      objVo.hometown = data.hometown
      objVo.jobDes = data.jobDes
      objVo.maritalStatus = data.maritalStatus
      objVo.maritalStatusName = data.maritalStatusName
      objVo.censusAddr = data.censusAddr
      objVo.censusArea = data.censusArea
      objVo.censusAreaCodeName = data.censusAreaCodeName
      objVo.liveAddr = data.liveAddr
      objVo.liveArea = data.liveArea
      objVo.liveAreaCodeName = data.liveAreaCodeName
      objVo.homePhone = data.homePhone
      objVo.mobile = data.mobile
      objVo.placeResidence = data.placeResidence
      objVo.isAgents = data.isAgents
      objVo.agentsName = data.agentsName
      objVo.agentsRelation = data.agentsRelation
      objVo.agentsLiveArea = data.agentsLiveArea
      objVo.agentsLiveAreaCodeName = data.agentsLiveAreaCodeName
      objVo.agentsLiveAddr = data.agentsLiveAddr
      objVo.agentsHomePhone = data.agentsHomePhone
      objVo.agentsMobile = data.agentsMobile
      objVo.agentsPlaceResidence = data.agentsPlaceResidence
      //    objVo
      applyVo.assessType = data.assessType
      applyVo.orgId = data.orgId
      applyVo.orgName = data.orgName
      applyVo.occupancyCode = data.occupancyCode
      applyVo.costBearingCode = data.costBearingCode
      applyVo.appointmentData = data.appointmentData
      applyVo.assessAddrCode = data.assessAddrCode
      applyVo.assessAreaCode = data.assessAreaCode
      applyVo.assessAddr = data.assessAddr
      applyVo.assessLinkman = data.assessLinkman
      applyVo.assessLinkmanPhone = data.assessLinkmanPhone
      applyVo.ourAssessEmpId = data.ourAssessEmpId
      newData.applyVo = applyVo
      newData.objVo = objVo

      return newData
    },
    // 编辑查看详情整理数据
    clearDetailData(data) {
      if (data.lastApplyInfo !== null && data.lastApplyInfo !== '') {
        this.lastDetail = data.lastApplyInfo
        this.lastDetail.assessCompleteDate = getDate_YMD(this.lastDetail.assessCompleteDate)
      }
      this.assessStatusName = data.applyVo.assessStatusName
      this.orderTakingAssessName2 = data.applyVo.orderTakingAssessName2
      this.remark = data.applyVo.remark
      this.updateTime = data.applyVo.updateTime
      this.createTime = data.applyVo.createTime
      this.paymentTime = data.applyVo.paymentTime
      this.updateBy = data.applyVo.updateBy
      this.form = {
        objId: data.objVo.id,
        fullName: data.objVo.fullName,
        idCard: data.objVo.idCard,
        sex: data.objVo.sex,
        birthday: getDate_YMD(data.objVo.birthday),
        age: data.objVo.age,
        socialSecurityArd: data.objVo.socialSecurityArd,
        nation: data.objVo.nation,
        nationName: data.objVo.nationName,
        eduLevel: data.objVo.eduLevel,
        eduLevelName: data.objVo.eduLevelName,
        hometown: data.objVo.hometown,
        jobDes: data.objVo.jobDes,
        maritalStatus: data.objVo.maritalStatus,
        maritalStatusName: data.objVo.maritalStatusName,
        censusAddr: data.objVo.censusAddr,
        // censusArea: data.objVo.censusArea,
        censusAreaLevelName: data.objVo.censusAreaLevelName,
        liveAddr: data.objVo.liveAddr,
        // liveArea: data.objVo.liveArea,
        liveAreaLevelName: data.objVo.liveAreaLevelName,
        homePhone: data.objVo.homePhone,
        mobile: data.objVo.mobile,
        placeResidence: data.objVo.placeResidence,
        isAgents: data.objVo.isAgents,
        agentsName: data.objVo.agentsName,
        agentsRelation: data.objVo.agentsRelation,
        // agentsLiveArea: data.objVo.agentsLiveArea,
        agentsLiveAreaCodeLevelName: data.objVo.agentsLiveAreaCodeLevelName,
        agentsLiveAddr: data.objVo.agentsLiveAddr,
        agentsHomePhone: data.objVo.agentsHomePhone,
        agentsMobile: data.objVo.agentsMobile,
        agentsPlaceResidence: data.objVo.agentsPlaceResidence,
        assessType: data.applyVo.assessType,
        assessTypeName: data.applyVo.assessTypeName,
        orgId: data.applyVo.orgId,
        orgName: data.applyVo.orgName,
        occupancyCode: data.applyVo.occupancyCode, // 入住情况
        occupancyCodeName: data.applyVo.occupancyCodeName, // 入住情况
        costBearingCode: data.applyVo.costBearingCode, // 评估费用承担
        costBearingCodeName: data.applyVo.costBearingCodeName, // 评估费用承担
        appointmentData: getDate_YMD(data.applyVo.appointmentData), // 预约评估日期
        assessAddrCode: data.applyVo.assessAddrCode, // 评估地点
        assessAddrCodeName: data.applyVo.assessAddrCodeName, // 评估地点
        // assessAreaCode: data.applyVo.assessAreaCode, // 所属区划
        assessAreaCodeLevelName: data.applyVo.assessAreaCodeLevelName,
        applyId: data.applyVo.id,
        applyPersonId: data.applyVo.applyPersonId,
        assessAddr: data.applyVo.assessAddr, // 评估地址
        assessLinkman: data.applyVo.assessLinkman, // 评估联络人
        assessLinkmanPhone: data.applyVo.assessLinkmanPhone, // 联系电话
        ourAssessEmpName: data.applyVo.ourAssessEmpName, // 本院评估师ID
        censusArea: data.objVo.censusAreaCodeLevel.split(','),
        liveArea: data.objVo.liveAreaCodeLevel.split(','),
        agentsLiveArea: data.objVo.agentsLiveAreaCodeLevel.split(','),
        assessAreaCode: data.applyVo.assessAreaCodeLevel.split(',')
      }
      if (this.$route.query.typeApply === 'review_assessment') {
        this.form.ourAssessEmpId = ''
      } else {
        this.form.ourAssessEmpId = data.applyVo.ourAssessEmpId === '' ? 0 : data.applyVo.ourAssessEmpId // 本院评估师ID
      }
      this.areaCode[0] = data.objVo.censusAreaCodeLevel.split(',')
      this.areaCode[1] = data.objVo.liveAreaCodeLevel.split(',')
      this.agentsAreaCode = data.objVo.agentsLiveAreaCodeLevel.split(',')
      this.areaCodeBase = data.applyVo.assessAreaCodeLevel.split(',')
      if (this.$route.query.applyId) {
        this.form.occupancyCode = 'checked_in'
      }
      this.agentsLiveAreaInfor = data.objVo.agentsLiveAreaCodeLevel.split(',')
      this.agentsAreaCodeInfor = data.objVo.agentsLiveAreaCodeLevel.split(',')
      setTimeout(() => {
        this.idEdit = false
        this.idEdits = !this.idEdits
        this.idSbEdit = !this.idSbEdit
      })
      if (this.$route.query.typeApply) {
        this.form.assessType = this.$route.query.typeApply
      }
    },
    // 新增成功后删除数据
    afterAdd() {
      this.form = {
        fullName: '',
        idCard: '',
        sex: '',
        birthday: '',
        age: '',
        socialSecurityArd: '', // 社保卡号
        nation: '', // 民族
        nationName: '',
        eduLevel: '', // 文化程度
        eduLevelName: '',
        hometown: '', // 籍贯
        jobDes: '', // 蹭从事职业
        maritalStatus: '', // 婚姻状况
        maritalStatusName: '',
        censusAddr: '', // 户籍详细地址
        censusArea: '', // 户籍行政区划
        censusAreaCodeName: '', // 户籍行政区划地址名称
        liveAddr: '', // 居住详细地址
        liveArea: '', // 居住行政区划
        liveAreaCodeName: '', // 居住行政区划地址名称
        homePhone: '', // 家庭电话
        mobile: '',
        placeResidence: '', // 邮编
        isAgents: '0', // 有無代理人
        agentsName: '',
        agentsRelation: '',
        agentsLiveArea: '',
        agentsLiveAreaCodeName: '',
        agentsLiveAddr: '',
        agentsHomePhone: '',
        agentsMobile: '',
        agentsPlaceResidence: '',
        assessType: 'first_evaluation',
        orgId: '',
        orgName: '',
        occupancyCode: '', // 入住情况
        costBearingCode: '', // 评估费用承担
        appointmentData: '', // 预约评估日期
        assessAddrCode: '', // 评估地点
        assessAreaCode: '', // 所属区划
        assessAddr: '', // 评估地址
        assessLinkman: '', // 评估联络人
        assessLinkmanPhone: '', // 联系电话
        ourAssessEmpId: '' // 本院评估师ID
      }
      this.areaCode = [[], []] // 区域行政的全部ID
      this.agentsAreaCode = [] // 代理人居住区划
      this.areaCodeBase = [] // 所属区划
      setTimeout(() => {
        this.idEdit = !this.idEdit
        this.idEdits = !this.idEdits
        this.idSbEdit = !this.idSbEdit
      })
    },
    changeIt(val) {
      if (this.form.assessAddrCode === 'old_man_s_home') {
        this.form.assessAddr = val
      }
    }
  }
}
</script>

<style lang="scss">
@import "~@/styles/form.css";
.tableContainer {
  margin-top: 20px;
}
</style>
