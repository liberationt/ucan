<template>
  <el-container>
    <el-main class="tableContainer">
      <el-tabs v-model="activeTabs" @tab-click="handleClick">
        <el-tab-pane label="基本信息" name="base">
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
                    <el-form-item :label="isEditForm ? '姓名' : '姓名：'">
                      <el-input
                        v-if="isEditForm"
                        v-model="form.fullName"
                        disabled
                        clearable
                        placeholder="请输入姓名"
                        @keyup.enter.native="editContent('form_base')"
                      />
                      <span v-else>{{ form.fullName }}</span>
                    </el-form-item>
                  </el-col>
                  <el-col :md="adaptiveGrid.md" :lg="adaptiveGrid.lg">
                    <el-form-item :label="isEditForm ? '身份证号' : '身份证号'">
                      <el-input
                        v-if="this.isEditForm"
                        v-model="form.idCard"
                        disabled
                        clearable
                        placeholder="请输入身份证号"
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
                    <el-form-item :label="isEditForm ? '文化程度' : '文化程度：'" prop="eduLevel">
                      <el-select
                        v-if="isEditForm"
                        v-model="form.eduLevel"
                        clearable
                        placeholder="请选择文化程度"
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
                  <el-col :md="adaptiveGrid.md" :lg="adaptiveGrid.lg">
                    <el-form-item :label="isEditForm ? '户籍行政区划' : '户籍行政区划：'" prop="censusArea">
                      <Address
                        v-if="isEditForm"
                        :id-edit="idEdit"
                        :area-code="areaCode[0]"
                        :form-code="form.censusArea"
                        :width="'100%'"
                        @getAreaCode="getAreaCode_reg"
                        @keyup.enter.native="editContent"
                      />
                      <span v-else>{{ form.censusAreaCodeLevelName }}</span>
                    </el-form-item>
                  </el-col>
                  <el-col :md="adaptiveGrid.md" :lg="adaptiveGrid.lg">
                    <el-form-item
                      :label="isEditForm ? '户籍详细地址' : '户籍详细地址：'"
                      prop="censusAddr"
                    >
                      <el-input
                        v-if="isEditForm"
                        v-model="form.censusAddr"
                        :disabled="disabled"
                        clearable
                        placeholder="请输入户籍详细地址"
                        @keyup.enter.native="editContent"
                      />
                      <span v-else>{{ form.censusAddr }}</span>
                    </el-form-item>
                  </el-col>
                  <el-col :md="adaptiveGrid.md" :lg="adaptiveGrid.lg">
                    <el-form-item :label="isEditForm ? '居住行政区划' : '居住行政区划：'" prop="liveArea">
                      <Address
                        v-if="isEditForm"
                        :id-edit="idEdit"
                        :area-code="areaCode[1]"
                        :form-code="form.liveArea"
                        :width="'100%'"
                        @getAreaCode="getAreaCode_live"
                        @keyup.enter.native="editContent"
                      />
                      <span v-else>{{ form.liveAreaCodeLevelName }}</span>
                    </el-form-item>
                  </el-col>
                  <el-col :md="adaptiveGrid.md" :lg="adaptiveGrid.lg">
                    <el-form-item
                      :label="isEditForm ? '居住详细地址' : '居住详细地址：'"
                      prop="liveAddr"
                    >
                      <el-input
                        v-if="isEditForm"
                        v-model="form.liveAddr"
                        clearable
                        placeholder="请输入居住详细地址"
                        @keyup.enter.native="editContent"
                      />
                      <span v-else>{{ form.liveAddr }}</span>
                    </el-form-item>
                  </el-col>
                  <el-col :md="adaptiveGrid.md" :lg="adaptiveGrid.lg">
                    <el-form-item :label="isEditForm ? '住宅电话' : '住宅电话'" prop="homePhone">
                      <el-input
                        v-if="isEditForm"
                        ref="homePhone"
                        v-model.trim="form.homePhone"
                        :disabled="disabled"
                        clearable
                        placeholder="请输入住宅电话"
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
                  <el-col :md="adaptiveGrid.md" :lg="adaptiveGrid.lg">
                    <el-form-item :label="isEditForm?'有无代理人':'有无代理人：'" prop="isAgents">
                      <el-radio-group v-model="form.isAgents" :disabled="modelType=='look'">
                        <el-radio label="1">是</el-radio>
                        <el-radio label="0">否</el-radio>
                      </el-radio-group>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row :gutter="0">
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
                  <el-col v-if="form.isAgents == '1'" :md="adaptiveGrid.md" :lg="adaptiveGrid.lg">
                    <el-form-item :label="isEditForm ? '居住行政区划' : '居住行政区划：'" prop="agentsLiveArea">
                      <Address
                        v-if="isEditForm"
                        :id-edit="idEdit"
                        :area-code="agentsAreaCode"
                        :form-code="form.agentsLiveArea"
                        :width="'100%'"
                        @getAreaCode="getAreaCode_agentsLive"
                        @keyup.enter.native="editContent"
                      />
                      <span v-else>{{ form.agentsLiveAreaCodeLevelName }}</span>
                    </el-form-item>
                  </el-col>
                  <el-col v-if="form.isAgents === '1'" :md="adaptiveGrid.md" :lg="adaptiveGrid.lg">
                    <el-form-item
                      :label="isEditForm ? '居住详细地址' : '居住详细地址：'"
                      prop="agentsLiveAddr"
                    >
                      <el-input
                        v-if="isEditForm"
                        v-model="form.agentsLiveAddr"
                        clearable
                        placeholder="请输入居住详细地址"
                        @keyup.enter.native="editContent"
                      />
                      <span v-else>{{ form.agentsLiveAddr }}</span>
                    </el-form-item>
                  </el-col>
                  <el-col v-if="form.isAgents === '1'" :md="adaptiveGrid.md" :lg="adaptiveGrid.lg">
                    <el-form-item :label="isEditForm ? '住宅电话' : '住宅电话'" prop="agentsHomePhone">
                      <el-input
                        v-if="isEditForm"
                        ref="homePhone"
                        v-model.trim="form.agentsHomePhone"
                        :disabled="disabled"
                        clearable
                        placeholder="请输入住宅电话"
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
                    <el-form-item :label="isEditForm ? '评估类别' : '评估类别：'">
                      <el-input
                        v-if="isEditForm"
                        v-model="form.assessTypeName"
                        clearable
                        disabled
                        placeholder="请输入评估类别"
                        @keyup.enter.native="editContent"
                      />
                      <span v-else>{{ form.assessTypeName }}</span>
                    </el-form-item>
                  </el-col>
                  <el-col :md="adaptiveGrid.md" :lg="adaptiveGrid.lg">
                    <el-form-item :label="isEditForm ? '养老机构' : '养老机构：'">
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
                    <el-form-item :label="isEditForm ? '入住情况' : '入住情况：'">
                      <el-input
                        v-if="isEditForm"
                        v-model="form.occupancyCodeName"
                        disabled
                        clearable
                        placeholder="请输入入住情况"
                        @keyup.enter.native="editContent"
                      />
                      <span v-else>{{ form.occupancyCodeName }}</span>
                    </el-form-item>
                  </el-col>
                  <el-col :md="adaptiveGrid.md" :lg="adaptiveGrid.lg">
                    <el-form-item :label="isEditForm ? '评估费用承担' : '评估费用承担：'">
                      <el-input
                        v-if="isEditForm"
                        v-model="form.costBearingCodeName"
                        disabled
                        clearable
                        placeholder="请输入评估费用承担"
                        @keyup.enter.native="editContent"
                      />
                      <span v-else>{{ form.costBearingCodeName }}</span>
                    </el-form-item>
                  </el-col>
                  <el-col :md="adaptiveGrid.md" :lg="adaptiveGrid.lg">
                    <el-form-item :label="isEditForm ? '预约评估日期' : '预约评估日期：'">
                      <el-date-picker
                        v-if="isEditForm"
                        v-model="form.appointmentData"
                        type="date"
                        disabled
                        format="yyyy年MM月dd日"
                        value-format="yyyy-MM-dd"
                        placeholder="请选择预约评估日期"
                        style="width:100%;"
                        @keyup.enter.native="editContent"
                      />
                      <span v-else>{{ form.appointmentData }}</span>
                    </el-form-item>
                  </el-col>
                  <el-col :md="adaptiveGrid.md" :lg="adaptiveGrid.lg">
                    <el-form-item :label="isEditForm ? '评估地点' : '评估地点：'">
                      <el-select
                        v-if="isEditForm"
                        v-model="form.assessAddrCode"
                        placeholder="请选择评估地点"
                        filterable
                        clearable
                        disabled
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
                  <el-col :md="adaptiveGrid.md" :lg="adaptiveGrid.lg">
                    <el-form-item :label="isEditForm ? '所属区划' : '所属区划：'">
                      <Address
                        v-if="isEditForm"
                        :id-edit="idEdit"
                        :area-code="areaCodeBase"
                        :form-code="form.assessAreaCode"
                        :width="'100%'"
                        disabled
                        @getAreaCode="getAreaCodeBase_reg"
                        @keyup.enter.native="editContent"
                      />
                      <span v-else>{{ form.assessAreaCodeLevelName }}</span>
                    </el-form-item>
                  </el-col>
                  <el-col :md="adaptiveGrid.md" :lg="adaptiveGrid.lg">
                    <el-form-item :label="isEditForm ? '评估地址' : '评估地址：'">
                      <el-input
                        v-if="isEditForm"
                        ref="assessAddr"
                        v-model="form.assessAddr"
                        clearable
                        disabled
                        placeholder="请输入评估地址"
                        @keyup.enter.native="editContent"
                      />
                      <span v-else>{{ form.assessAddr }}</span>
                    </el-form-item>
                  </el-col>
                  <el-col :md="adaptiveGrid.md" :lg="adaptiveGrid.lg">
                    <el-form-item :label="isEditForm ? '评估联络人' : '评估联络人：'">
                      <el-input
                        v-if="isEditForm"
                        v-model="form.assessLinkman"
                        clearable
                        disabled
                        placeholder="请输入评估联络人"
                        @keyup.enter.native="editContent"
                      />
                      <span v-else>{{ form.assessLinkman }}</span>
                    </el-form-item>
                  </el-col>
                  <el-col :md="adaptiveGrid.md" :lg="adaptiveGrid.lg">
                    <el-form-item :label="isEditForm ? '联系电话' : '联系电话：'">
                      <el-input
                        v-if="isEditForm"
                        v-model="form.assessLinkmanPhone"
                        clearable
                        disabled
                        placeholder="请输入联系电话"
                        @keyup.enter.native="editContent"
                      />
                      <span v-else>{{ form.assessLinkmanPhone }}</span>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-collapse-item>
              <el-collapse-item name="baseItem_5">
                <template slot="title">
                  <div class="titleSlider">
                    <span>
                      <i class="titleTip" />目前生活状态
                    </span>
                  </div>
                </template>
                <el-row :gutter="0">
                  <el-col>
                    <el-form-item :label="isEditForm ? '经济状况' : '经济状况：'" prop="economicState">
                      <el-checkbox-group v-if="isEditForm" v-model="form.economicState">
                        <el-checkbox
                          v-for="(item,index) in economicsOptions"
                          :key="index"
                          :label="item.dictValue"
                        >{{ item.dictLabel }}</el-checkbox>
                      </el-checkbox-group>
                      <span v-else>{{ form.economicStateName }}</span>
                    </el-form-item>
                  </el-col>
                  <el-col :md="adaptiveGrid.md" :lg="adaptiveGrid.lg">
                    <el-form-item :label="isEditForm ? '居住情况' : '居住情况：'" prop="liveState">
                      <el-select
                        v-if="isEditForm"
                        v-model="form.liveState"
                        placeholder="请选择居住情况"
                        filterable
                        clearable
                        style="width:100%;"
                        @keyup.enter.native="editContent('form_base')"
                      >
                        <el-option
                          v-for="item in liveStateOptions"
                          :key="item.dictValue"
                          :label="item.dictLabel"
                          :value="item.dictValue"
                        />
                      </el-select>
                      <span v-else>{{ form.liveStateName }}</span>
                    </el-form-item>
                  </el-col>
                  <el-col :md="adaptiveGrid.md" :lg="adaptiveGrid.lg">
                    <el-form-item :label="isEditForm ? '长护险评估等级' : '长护险评估等级：'">
                      <el-select
                        v-if="isEditForm"
                        v-model="form.longTermLevel"
                        placeholder="请选择长护险评估等级"
                        filterable
                        clearable
                        style="width:100%;"
                        @keyup.enter.native="editContent('form_base')"
                      >
                        <el-option
                          v-for="item in longTermLevelOptions"
                          :key="item.dictValue"
                          :label="item.dictLabel"
                          :value="item.dictValue"
                        />
                      </el-select>
                      <span v-else>{{ form.longTermLevelName }}</span>
                    </el-form-item>
                  </el-col>
                  <el-col :md="adaptiveGrid.md" :lg="adaptiveGrid.lg">
                    <el-form-item :label="isEditForm ? '宗教信仰' : '宗教信仰：'">
                      <el-select
                        v-if="isEditForm"
                        v-model="form.faith"
                        placeholder="请选择宗教信仰"
                        filterable
                        clearable
                        style="width:100%;"
                        @keyup.enter.native="editContent('form_base')"
                      >
                        <el-option
                          v-for="item in faithOptions"
                          :key="item.dictValue"
                          :label="item.dictLabel"
                          :value="item.dictValue"
                        />
                      </el-select>
                      <span v-else>{{ form.faithName }}</span>
                    </el-form-item>
                  </el-col>
                  <el-col :md="adaptiveGrid.md" :lg="adaptiveGrid.lg">
                    <el-form-item :label="isEditForm ? '家庭支持' : '家庭支持：'">
                      <el-select
                        v-if="isEditForm"
                        v-model="form.homeSupport"
                        placeholder="请选择家庭支持"
                        filterable
                        clearable
                        style="width:100%;"
                        @keyup.enter.native="editContent('form_base')"
                      >
                        <el-option
                          v-for="item in familyOptions"
                          :key="item.dictValue"
                          :label="item.dictLabel"
                          :value="item.dictValue"
                        />
                      </el-select>
                      <span v-else>{{ form.homeSupportName }}</span>
                    </el-form-item>
                  </el-col>
                  <el-col :md="adaptiveGrid.md" :lg="adaptiveGrid.lg">
                    <el-form-item :label="isEditForm ? '社会参与' : '社会参与：'">
                      <el-select
                        v-if="isEditForm"
                        v-model="form.socialActivities"
                        placeholder="请选择社会参与"
                        filterable
                        clearable
                        style="width:100%;"
                        @keyup.enter.native="editContent('form_base')"
                      >
                        <el-option
                          v-for="item in socialActivitiesOptions"
                          :key="item.dictValue"
                          :label="item.dictLabel"
                          :value="item.dictValue"
                        />
                      </el-select>
                      <span v-else>{{ form.socialActivitiesName }}</span>
                    </el-form-item>
                  </el-col>
                  <el-col :md="adaptiveGrid.md" :lg="adaptiveGrid.lg">
                    <el-form-item :label="isEditForm ? '就医方式' : '就医方式：'">
                      <el-select
                        v-if="isEditForm"
                        v-model="form.medicalTreatment"
                        placeholder="请选择就医方式"
                        filterable
                        clearable
                        style="width:100%;"
                        @keyup.enter.native="editContent('form_base')"
                      >
                        <el-option
                          v-for="item in medicalOptions"
                          :key="item.dictValue"
                          :label="item.dictLabel"
                          :value="item.dictValue"
                        />
                      </el-select>
                      <span v-else>{{ form.medicalTreatmentName }}</span>
                    </el-form-item>
                  </el-col>
                  <el-col :md="adaptiveGrid.md" :lg="adaptiveGrid.lg">
                    <el-form-item :label="isEditForm ? '需要帮助时是否得到照料' : '需要帮助时是否得到照料：'">
                      <el-select
                        v-if="isEditForm"
                        v-model="form.needHelpIsCare"
                        placeholder="请选择需要帮助时是否得到照料"
                        filterable
                        clearable
                        style="width:100%;"
                        @keyup.enter.native="editContent('form_base')"
                      >
                        <el-option
                          v-for="item in needHelpIsCareOptions"
                          :key="item.dictValue"
                          :label="item.dictLabel"
                          :value="item.dictValue"
                        />
                      </el-select>
                      <span v-else>{{ form.needHelpIsCareName }}</span>
                    </el-form-item>
                  </el-col>
                  <el-col
                    v-if="form.needHelpIsCare=='yse'"
                    :md="adaptiveGrid.md"
                    :lg="adaptiveGrid.lg"
                  >
                    <el-form-item :label="isEditForm ? '谁帮助照料' : '谁帮助照料：'">
                      <el-select
                        v-if="isEditForm"
                        v-model="form.whoHelpsCare"
                        placeholder="请选择谁帮助照料"
                        filterable
                        clearable
                        style="width:100%;"
                        @keyup.enter.native="editContent('form_base')"
                      >
                        <el-option
                          v-for="item in whoCareOptions"
                          :key="item.dictValue"
                          :label="item.dictLabel"
                          :value="item.dictValue"
                        />
                      </el-select>
                      <span v-else>{{ form.whoHelpsCareName }}</span>
                    </el-form-item>
                  </el-col>
                  <el-col
                    v-if="form.whoHelpsCare=='other'"
                    :md="adaptiveGrid.md"
                    :lg="adaptiveGrid.lg"
                  >
                    <el-form-item :label="isEditForm ? '照料人' : '照料人：'">
                      <el-input
                        v-if="isEditForm"
                        v-model="form.whoHelpsCareOther"
                        clearable
                        placeholder="请输入照料人"
                      />
                      <span v-else>{{ form.whoHelpsCareOther }}</span>
                    </el-form-item>
                  </el-col>
                  <el-col>
                    <el-form-item :label="isEditForm ? '兴趣爱好' : '兴趣爱好：'">
                      <el-checkbox-group v-if="isEditForm" v-model="form.data['300']">
                        <el-checkbox
                          v-for="(item,index) in hobbyOptions"
                          :key="index"
                          :label="item.itemCode"
                        >{{ item.itemName }}
                          <span v-if="item.itemCode=='3014'&&showHobyInput(form.data['300'])">
                            <el-input
                              v-if="isEditForm"
                              v-model="form.remark"
                              clearable
                              placeholder="请输入兴趣爱好"
                            /></span>
                        </el-checkbox>
                      </el-checkbox-group>
                      <span v-else>
                        <span v-for="(item,key) in hobbyList" :key="key">
                          <span v-if="item.itemCode!='3014'">
                            {{ item.itemName }}、
                          </span>
                        </span>
                        <span>
                          {{ form.remark }}
                        </span>
                      </span>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-collapse-item>
              <el-collapse-item name="baseItem_6">
                <template slot="title">
                  <div class="titleSlider">
                    <span>
                      <i class="titleTip" />健康状况说明
                    </span>
                  </div>
                </template>
                <el-row :gutter="0">
                  <el-col>
                    <el-form-item :label="isEditForm ? '既往疾病说明' : '既往疾病说明：'">
                      <el-checkbox-group v-if="isEditForm" v-model="form.data['100']">
                        <el-checkbox
                          v-for="(item,index) in historyOptions"
                          :key="index"
                          :label="item.itemCode"
                        >{{ item.itemName }}
                          <span v-if="item.itemCode=='1047'&&showHisInput(form.data['100'])">
                            <el-input
                              v-model="item.remark"
                              clearable
                              placeholder="请输入既往疾病"
                            /></span>
                        </el-checkbox>
                      </el-checkbox-group>
                      <span v-else>
                        <span v-for="(item,i) in historyList" :key="i">
                          <span v-if="item.itemCode=='1047'">
                            <span v-if="i!=0 && item.remark!=null">、</span>{{ item.remark }}
                          </span>
                          <span v-else>
                            <span v-if="i!=0">、</span>{{ item.itemName }}
                          </span>
                        </span>
                      </span>
                    </el-form-item>
                  </el-col>
                  <el-col>
                    <el-form-item :label="isEditForm ? '现有疾病说明' : '现有疾病说明：'">
                      <el-checkbox-group v-if="isEditForm" v-model="form.data['200']">
                        <el-checkbox
                          v-for="(item,index) in nowOptions"
                          :key="index"
                          :label="item.itemCode"
                        >{{ item.itemName }}
                          <span v-if="item.itemCode=='2047'&&showNowInput(form.data['200'])">
                            <el-input
                              v-model="item.remark"
                              clearable
                              placeholder="请输入现有疾病"
                            /></span>
                        </el-checkbox>
                      </el-checkbox-group>
                      <span v-else>
                        <span v-for="(item,i) in newList" :key="i">
                          <span v-if="item.itemCode=='2047'">
                            <span v-if="i!=0 && item.remark!=null">、</span>{{ item.remark }}
                          </span>
                          <span v-else>
                            <span v-if="i!=0">、</span>{{ item.itemName }}
                          </span>
                        </span>
                      </span>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-collapse-item>
              <el-collapse-item name="baseItem_7">
                <template slot="title">
                  <div class="titleSlider">
                    <span>
                      <i class="titleTip" />现服药情况
                    </span>
                  </div>
                </template>
                <el-row :gutter="0">
                  <el-col>
                    <el-form-item>
                      <el-input
                        v-if="isEditForm"
                        v-model="form.currentTakeMedicine"
                        type="textarea"
                        clearable
                        :rows="5"
                        maxlength="200"
                        show-word-limit
                        placeholder="请输入现服药情况"
                      />
                      <span v-else>{{ form.currentTakeMedicine }}</span>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-collapse-item>
            </el-collapse>
          </el-form>
          <el-footer>
            <div class="footerBtn">
              <el-button
                type="primary"
                class="base-btn btnMarginLeft15"
                @click="saveBaseData"
              >确定</el-button>
              <el-button class="mr" @click="cancelDetailsPage">取消</el-button>
            </div>
          </el-footer>
        </el-tab-pane>
        <el-tab-pane label="评估问卷" name="assess">
          <el-form
            ref="formassess"
            label-position="top"
            :model="assessForm"
            :rules="isEditForm ? rulesForm : null "
            label-width="140px"
          >
            <div v-for="(first,key) in assessForm" :key="key" class="assessContent">
              <div class="assessItem">
                <h2>{{ key }}</h2>
              </div>
              <div v-for="(second,i) in first" :key="i">
                <h3>{{ i }}</h3>
                <el-collapse>
                  <el-collapse-item v-for="(third,k,f) in second" :key="k" :name="'baseItem' + f">
                    <template slot="title">
                      <div class="titleSlider">
                        <span>
                          <i class="titleTip" />
                          {{ k }}
                        </span>
                      </div>
                    </template>
                    <el-row v-if="key!='单列事项评估'" :gutter="0">
                      <el-col v-for="(fourth,z) in third" :key="z">
                        <el-form-item :label="`${z+1}、${fourth.subjectTitle}`">
                          <span>{{ fourth.subjectRemarks }}</span>
                          <el-radio-group :value="true">
                            <el-radio
                              v-for="(items,j) in fourth.options"
                              :key="j"
                              :disabled="!isEditForm"
                              :label="items.ifSelected"
                              @change="changeType(fourth,items)"
                            >
                              <div class="numberInfor">
                                <span>{{ items.optionDes }}</span>
                                <span>{{ items.optionValue }}分</span>
                              </div>
                            </el-radio>
                          </el-radio-group>
                        </el-form-item>
                      </el-col>
                    </el-row>
                    <el-row v-else :gutter="0">
                      <el-col v-for="(fourth,z) in third" :key="z">
                        <el-form-item>
                          <el-checkbox
                            v-for="(itemss,p) in fourth.options"
                            :key="p"
                            v-model="itemss.ifSelected"
                            :disabled="!isEditForm"
                            :label="itemss.ifSelected"
                            @change="changeType(fourth,itemss)"
                          >
                            <div class="numberInfors">
                              <span>{{ fourth.subjectTitle }}</span>
                              <span style="text-indent:30px;margin-top:10px">{{ fourth.subjectRemarks }}</span>
                            </div>
                          </el-checkbox>
                        </el-form-item>
                      </el-col>
                    </el-row>
                  </el-collapse-item>
                </el-collapse>
              </div>
            </div>
            <div v-if="isShow">
              <div class="assessItem"><h2>其他</h2></div>
              <el-collapse>
                <el-collapse-item>
                  <template slot="title">
                    <div class="titleSlider">
                      <span>
                        <i class="titleTip" />其他特殊情况说明
                      </span>
                    </div>
                  </template>
                  <el-row :gutter="0">
                    <el-col>
                      <el-form-item>
                        <el-input
                          v-if="isEditForm"
                          v-model="otherSpecialDesc"
                          type="textarea"
                          clearable
                          :rows="5"
                          maxlength="1000"
                          show-word-limit
                          placeholder
                        />
                        <span v-else>{{ otherSpecialDesc }}</span>
                      </el-form-item>
                    </el-col>
                  </el-row>
                </el-collapse-item>
              </el-collapse>
            </div>
            <el-footer>
              <div class="footerBtn">
                <el-button
                  v-if="modelType!='look'"
                  type="primary"
                  class="base-btn btnMarginLeft15"
                  @click="lookAssess('form_base')"
                >预览评估结果</el-button>
                <el-button
                  v-if="modelType!='look'"
                  type="primary"
                  class="base-btn btnMarginLeft15"
                  @click="saveAssess(1)"
                >保存</el-button>
                <el-button class="mr" @click="cancelDetailsPage">取消</el-button>
              </div>
            </el-footer>
          </el-form>
        </el-tab-pane>
      </el-tabs>
    </el-main>
  </el-container>
</template>
<script>
import Address from '@/components/Address'
import _ from 'lodash'
import {
  verifyFullName,
  verifyIdCard,
  verifyHomePhone,
  verifyMobile
} from '@/utils/validate'
import { allSelectdictionaryData } from '@/api/facilitiesConfig/pensionAgency'
import { adaptiveGrid_max, adaptiveGrid_plus } from '@/common/index'
import { computerAge, getBirthdayFromIdCard, getDate_YMD } from '@/utils/index'
import { getAssessor } from '@/api/evaluationManagement/basicInformation'
import { addApply, getApplyDetail, editApply } from '@/api/esimate/esimate'
import {
  getEditAssess,
  getQuestionnaire,
  updateAssess,
  updateAssessQuestionnaire,
  getHobby
} from '@/api/evaluationManagement/assessmentForm'

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
      radio: 1,
      checkList: [],
      cityList: [],
      activeTabs: 'base',
      isEditForm: true,
      idEdit: true,
      activeCollapse: [
        'baseItem_1',
        'baseItem_2',
        'baseItem_4',
        'baseItem_5',
        'baseItem_6',
        'baseItem_7'
      ],
      activeCollapses: [
        'baseItem0',
        'baseItem1',
        'baseItem2',
        'baseItem3',
        'baseItem4',
        'baseItem5',
        'baseItem6',
        'baseItem7',
        'baseItem8',
        'baseItem9',
        'baseItem10'
      ],
      assessForm: {},
      form: {
        // 基本信息+联系信息+目前生活状态
        age: '',
        agentsHomePhone: '',
        agentsLiveAddr: '',
        agentsLiveArea: '',
        agentsLiveAreaCodeLevel: '',
        agentsLiveAreaCodeLevelName: '',
        agentsMobile: '',
        agentsName: '',
        agentsPlaceResidence: '',
        agentsRelation: '',
        birthday: '',
        censusAddr: '',
        censusArea: '',
        censusAreaCodeLevel: '',
        censusAreaCodeLevelName: '',
        currentTakeMedicine: '',
        economicState: [],
        economicStateName: '',
        eduLevel: '',
        eduLevelName: '',
        faith: '',
        faithName: '',
        fullName: '',
        homePhone: '',
        homeSupport: '',
        homeSupportName: '',
        hometown: '',
        id: '',
        idCard: '',
        isAgents: '',
        jobDes: '',
        liveAddr: '',
        liveArea: '',
        liveAreaCodeLevel: '',
        liveAreaCodeLevelName: '',
        liveState: '',
        liveStateName: '',
        longTermLevel: '',
        longTermLevelName: '',
        maritalStatus: '',
        maritalStatusName: '',
        medicalTreatment: '',
        medicalTreatmentName: '',
        mobile: '',
        nation: '',
        nationName: '',
        needHelpIsCare: '',
        needHelpIsCareName: '',
        placeResidence: '',
        remark: '',
        sex: '',
        sexName: '',
        socialActivities: '',
        socialActivitiesName: '',
        socialSecurityArd: '',
        status: '',
        statusName: '',
        whoHelpsCare: '',
        whoHelpsCareName: '',
        whoHelpsCareOther: '',
        // 兴趣爱好+健康状况说明
        // 本次评估结果
        assessType: '',
        assessTypeName: '',
        orgName: '',
        occupancyCode: '', // 入住情况
        occupancyCodeName: '',
        costBearingCode: '', // 评估费用承担
        costBearingCodeName: '',
        appointmentData: '', // 预约评估日期
        assessAddrCode: '', // 评估地点
        assessAddrCodeName: '',
        assessAreaCode: '', // 所属区划
        assessAreaCodeLevelName: '',
        assessAddr: '', // 评估地址
        assessLinkman: '', // 评估联络人
        assessLinkmanPhone: '', // 联系电话
        // 病及爱好
        data: {
          100: [],
          200: [],
          300: []
        }
      },
      otherSpecialDesc: '',
      rulesForm: {
        sex: [{ required: true, trigger: 'change', message: '请选择性别！' }],
        mobile: [
          { required: true, trigger: 'blur', message: '请输入手机号！' },
          { trigger: 'blur', validator: verifyMobile }
        ],
        // 去掉 民族、籍贯、婚姻状况 必须验证
        // nation: [{ required: true, trigger: 'change', message: '请选择民族！' }],
        // hometown: [
        //   { required: true, trigger: 'change', message: '请选择籍贯！' }
        // ],
        // maritalStatus: [{ required: true, trigger: 'change', message: '请选择婚姻状况！' }],
        liveState: [{ required: true, trigger: 'change', message: '请选择居住状况！' }],
        economicState: [{ required: true, trigger: 'change', message: '请选择经济状况！' }],
        agentsMobile: [
          { required: true, trigger: 'blur', message: '请输入手机号！' },
          { trigger: 'blur', validator: verifyMobile }
        ],
        isAgents: [{ required: true }],
        homePhone: [{ trigger: 'MANUAL_TRIGGER', validator: verifyHomePhone }],
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
          {
            required: true,
            trigger: 'change',
            validator: verifyAgentsAreaCode
          }
        ],
        agentsLiveAddr: [
          {
            required: true,
            trigger: 'blur',
            message: '请填写代理人居住详细地址！'
          }
        ],
        accountName: [
          { required: true, trigger: 'change', message: '请输入账户名！' }
        ],
        agentsName: [
          {
            required: true,
            trigger: 'blur',
            message: '代理人姓名不能为空，请输入！'
          }
        ],
        occupancyCode: [
          { required: true, trigger: 'change', message: '请选择入住情况！' }
        ],
        costBearingCode: [
          {
            required: true,
            trigger: 'change',
            message: '请选择评估费用承担！'
          }
        ],
        appointmentData: [
          {
            required: true,
            trigger: 'change',
            message: '请选择预约评估日期！'
          }
        ],
        assessAddrCode: [
          {
            required: true,
            trigger: 'change',
            message: '请选择预约评估地点！'
          }
        ],
        agentsRelation: [
          {
            required: true,
            trigger: 'blur',
            message: '与申请人关系不能为空，请输入！'
          }
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
          { required: true, trigger: 'blur', message: '请输入联系电话！' },
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
      assessId: '',
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

      liveStateOptions: [],
      longTermLevelOptions: [],
      faithOptions: [],
      socialActivitiesOptions: [],
      needHelpIsCareOptions: [],
      medicalOptions: [],
      homeSupportOptions: [],
      hobbyOptions: [],
      historyOptions: [],
      nowOptions: [],
      economicsOptions: [],
      familyOptions: [],
      whoCareOptions: [],
      assessPersonId: '',

      sceneOption: [], // 现场
      adapOption: [], // 适应性
      singleOption: [], // 单项

      // 兴趣
      hobbyList: [],
      historyList: [],
      newList: [],
      isShow: false,
      modelType: '',
      isClick: false
    }
  },
  mounted() {
    this.modelType = this.$route.query.modelType
    this.assessId = this.$route.params.id || ''
    if (this.modelType === 'look') {
      this.getQuestionnaire()
    } else {
      this.isEditForm = true
    }
    this.getData(this.assessId, this.modelType)
  },
  methods: {
    handleClick(val) {
      if (this.modelType === 'edit' && val.name === 'base') {
        this.saveAssess(2)
        this.getDataDetail(this.assessId)
      }
      if (this.modelType === 'edit' && val.name === 'assess') {
        this.editContent('form_base', val.name)
        this.getQuestionnaire()
      }
    },
    showHobyInput(val) {
      let isShow = false
      if (val && val.length) {
        val.forEach(item => {
          if (item == '3014') {
            return isShow = true
          }
        })
      }
      return isShow
    },
    showHisInput(val) {
      let isShow = false
      if (val && val.length) {
        val.forEach(item => {
          if (item == '1047') {
            return isShow = true
          }
        })
      }
      return isShow
    },
    showNowInput(val) {
      let isShow = false
      if (val && val.length) {
        val.forEach(item => {
          if (item == '2047') {
            return isShow = true
          }
        })
      }
      return isShow
    },
    changeType(item, val) {
      // 如果不是多选 就将其他选项置为未选中
      if (item.multipleChoice != '1') {
        item.options.forEach((items) => {
          items.ifSelected = false
        })
        val.ifSelected = true
      }
      // 多选就将选中状态取反 无需处理 v-model="itemss.ifSelected" 已绑定 无需特殊处理
    },
    async getData(id, type) {
      await this.getSelect()
      await this.getHobby()
      if (type === 'edit') {
        this.isEditForm = true
        await this.getDataDetail(id)
      } else if (type === 'look') {
        this.isEditForm = false
        await this.getDataDetail(id)
      }
    },
    saveBaseData() {
      this.editContent('form_base', 'assess')
      this.getQuestionnaire()
    },
    lookAssess(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.saveAssess(3)
        } else {
          this.$message.warning('请填写完整的基本信息')
        }
      })
    },
    saveAssess(type) {
      const params = _.cloneDeep(this.assessForm)
      const options = []
      const otherOption = []
      let dataList = []
      let number = 0
      for (const key in params) {
        if (key != '单列事项评估') {
          for (const obj in params[key]) {
            for (const item in params[key][obj]) {
              params[key][obj][item].forEach((items) => {
                number++
                items.options.forEach((itemList) => {
                  if (itemList.ifSelected === true) {
                    options.push({
                      questionnaireId: itemList.questionnaireId,
                      ifSelected: itemList.ifSelected,
                      optionId: itemList.optionId,
                      optionDes: itemList.optionDes,
                      optionValue: itemList.optionValue
                    })
                  }
                })
              })
            }
          }
        } else {
          for (const obj in params[key]) {
            for (const item in params[key][obj]) {
              params[key][obj][item].forEach((items) => {
                items.options.forEach((itemList) => {
                  if (itemList.ifSelected === true) {
                    otherOption.push({
                      questionnaireId: itemList.questionnaireId,
                      ifSelected: itemList.ifSelected,
                      optionId: itemList.optionId,
                      optionDes: itemList.optionDes,
                      optionValue: itemList.optionValue
                    })
                  }
                })
              })
            }
          }
        }
      }
      dataList = options.concat(otherOption)
      const updatePension = {
        assessId: this.assessId,
        options: dataList,
        otherSpecialDesc: this.otherSpecialDesc
      }
      if (type == 3) {
        if (options.length < number) {
          this.$message.warning('信息未填写完整，请补充完整后预览结果')
        } else {
          this.updataAssessQuestion(updatePension, type)
        }
      } else {
        this.updataAssessQuestion(updatePension, type)
      }
    },
    updataAssessQuestion(updatePension, type) {
      updateAssessQuestionnaire(updatePension).then((res) => {
        if (res.code == 0) {
          this.$message.success('评估问卷保存成功')
          if (type == 1) {
            this.closeDetailsPage()
          }
          if (type == 3) {
            this.$router.push(`/assessmentForm/assessReport/${this.assessId}`)
          }
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    // 获取基本信息
    getDataDetail(assessId) {
      getEditAssess({ assessId: assessId }).then((res) => {
        if (res.code == 0) {
          this.clearDetailData(res.data)
        }
      })
    },
    // 获取评估信息
    getQuestionnaire() {
      getQuestionnaire({ assessId: this.assessId }).then((res) => {
        if (res.code == 0) {
          this.assessForm = res.data.data
          this.isShow = true
          this.otherSpecialDesc = res.data.otherSpecialDesc
        }
      })
    },
    getHobby() {
      getHobby().then((res) => {
        if (res.code == 0) {
          if (res.data && res.data.length) {
            res.data.forEach((item) => {
              if (item.propType == 300) {
                this.hobbyOptions.push({
                  itemName: item.itemName,
                  itemCode: item.itemCode,
                  propType: item.propType,
                  remark: item.remark
                })
              }
              if (item.propType == 100) {
                this.historyOptions.push({
                  itemName: item.itemName,
                  itemCode: item.itemCode,
                  propType: item.propType,
                  remark: item.remark
                })
              }
              if (item.propType == 200) {
                this.nowOptions.push({
                  itemName: item.itemName,
                  itemCode: item.itemCode,
                  propType: item.propType,
                  remark: item.remark
                })
              }
            })
          }
        }
      })
    },
    editContent(formName, name) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.activeTabs = name
          const params = _.cloneDeep(this.clearData(this.form))
          params.bizAssessPerson.censusArea =
            this.areaCode[0].length === 0
              ? ''
              : this.areaCode[0][this.areaCode[0].length - 1] + ''
          params.bizAssessPerson.censusAreaCodeLevel = this.areaCode[0].join(
            ','
          )
          params.bizAssessPerson.liveArea =
            this.areaCode[1].length === 0
              ? ''
              : this.areaCode[1][this.areaCode[1].length - 1] + ''
          params.bizAssessPerson.liveAreaCodeLevel = this.areaCode[1].join(',')
          params.bizAssessPerson.agentsLiveArea =
            this.agentsAreaCode.length === 0
              ? ''
              : this.agentsAreaCode[this.agentsAreaCode.length - 1] + ''
          params.bizAssessPerson.agentsLiveAreaCodeLevel = this.agentsAreaCode.join(
            ','
          )
          params.bizAssessInfo.assessAreaCode =
            this.areaCodeBase.length === 0
              ? ''
              : this.areaCodeBase[this.areaCodeBase.length - 1] + ''
          params.bizAssessInfo.assessAreaCodeLevel = this.areaCodeBase.join(
            ','
          )
          if (this.modelType === 'edit') {
            updateAssess(params.bizAssessPerson).then((res) => {
              if (res.code === 0) {
                this.$message({
                  type: 'success',
                  message: '基本信息保存成功!'
                })

                // 关闭页面，跳转到列表
                // this.closeDetailsPage()
              } else {
                this.$message.error(res.msg)
              }
            })
          }
        }
      })
    },
    closeDetailsPage() {
      this.$router.push('/evaluationManagement/esimateManage/assessmentForm')
    },
    cancelDetailsPage() {
      this.$router.push('/evaluationManagement/esimateManage/assessmentForm')
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
        'sys_sex', // 性别
        'ry_living_situation',
        'long_term_care_insurance',
        'religious_belief',
        'social_participation',
        'xy_need_help',
        'medical_treatment',
        'economic_status',
        'family_support',
        'who_helps_care'
      ].join(',')
      return new Promise((resolve, reject) => {
        allSelectdictionaryData(dictKey)
          .then((response) => {
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
                // 居住情况
                case 'ry_living_situation':
                  this.liveStateOptions = dict[key]
                  break
                // 长互险
                case 'long_term_care_insurance':
                  this.longTermLevelOptions = dict[key]
                  break
                // 宗教
                case 'religious_belief':
                  this.faithOptions = dict[key]
                  break
                // 家庭支持
                // case "religious_belief":
                //   this.socialActivitiesOptions = dict[key];
                //   break;
                // 就医方式
                case 'medical_treatment':
                  this.medicalOptions = dict[key]
                  break
                // 社会参与
                case 'social_participation':
                  this.socialActivitiesOptions = dict[key]
                  break
                // 需要
                case 'xy_need_help':
                  this.needHelpIsCareOptions = dict[key]
                  break
                case 'economic_status':
                  this.economicsOptions = dict[key]
                  break
                case 'family_support':
                  this.familyOptions = dict[key]
                  break
                case 'who_helps_care':
                  this.whoCareOptions = dict[key]
                  break
              }
            }
            resolve()
          })
          .catch(() => {
            reject()
          })
      })
    },
    async allData(id, type) {
      await this.getSelect()
      if (type === 'edit') {
        this.isEditForm = true
        await this.getApplyDetail(id)
      } else if (type === 'look') {
        this.isEditForm = false
        await this.getApplyDetail(id)
      }
    },
    // 获取详细
    getApplyDetail(id) {
      return new Promise((resolve, reject) => {
        getApplyDetail(id)
          .then((res) => {
            if (res.code === 0) {
              this.clearDetailData(res.data)
            }
            resolve()
          })
          .catch(() => {
            reject()
          })
      })
    },
    // 家庭电话输入框失去焦点
    handleHomePhoneBlur(data) {
      this.$refs['form_base'].validateField(data, (message) => {
        const valid = message === ''
        if (!valid) {
          this.$message.warning(
            '家庭电话格式例如:123-12345678或1234-1234567或1234-12345678'
          )
        }
      })
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
    // 提交表单前整理数据
    clearData(data) {
      const newData = {
        bizAssessInfo: {},
        bizAssessPerson: {}
      }
      const bizAssessInfo = {}
      const bizAssessPerson = {}
      const dataInfor = []
      if (data.data['300'] && data.data['300'].length) {
        this.hobbyOptions.forEach((item) => {
          data.data['300'].forEach((items) => {
            if (item.itemCode === items) {
              dataInfor.push(item)
            }
          })
        })
        // dataInfor = dataInfor.concat(data.data['1'])
      }
      if (data.data['100'] && data.data['100'].length) {
        // dataInfor= dataInfor.concat(data.data['2'])
        this.historyOptions.forEach((item) => {
          data.data['100'].forEach((items) => {
            if (item.itemCode === items) {
              dataInfor.push(item)
            }
          })
        })
      }
      if (data.data['200'] && data.data['200'].length) {
        // dataInfor= dataInfor.concat(data.data['3'])
        this.nowOptions.forEach((item) => {
          data.data['200'].forEach((items) => {
            if (item.itemCode === items) {
              dataInfor.push(item)
            }
          })
        })
      }
      dataInfor.forEach((item) => {
        item.assessPersonId = this.assessPersonId
      })
      bizAssessPerson.age = data.age,
      bizAssessPerson.agentsHomePhone = data.agentsHomePhone,
      bizAssessPerson.agentsLiveAddr = data.agentsLiveAddr,
      // agentsLiveArea= data.bizAssessPerson.agentsLiveArea?data.bizAssessPerson.agentsLiveAreaCodeLevel.split(',')=[],
      bizAssessPerson.agentsLiveAreaCodeLevel = data.agentsLiveAreaCodeLevel,
      bizAssessPerson.agentsLiveAreaCodeLevelName = data.agentsLiveAreaCodeLevelName,
      bizAssessPerson.agentsMobile = data.agentsMobile,
      bizAssessPerson.agentsName = data.agentsName,
      bizAssessPerson.agentsPlaceResidence = data.agentsPlaceResidence,
      bizAssessPerson.agentsRelation = data.agentsRelation,
      bizAssessPerson.birthday = data.birthday,
      bizAssessPerson.censusAddr = data.censusAddr,
      // censusArea= data.bizAssessPerson.censusArea?data.bizAssessPerson.censusAreaCodeLevel.split(',')=[],
      bizAssessPerson.censusAreaCodeLevel = data.censusAreaCodeLevel,
      bizAssessPerson.censusAreaCodeLevelName =
          data.censusAreaCodeLevelName,
      bizAssessPerson.currentTakeMedicine = data.currentTakeMedicine,
      bizAssessPerson.economicState = data.economicState.join(','),
      bizAssessPerson.economicStateName = data.economicStateName,
      bizAssessPerson.eduLevel = data.eduLevel,
      bizAssessPerson.eduLevelName = data.eduLevelName,
      bizAssessPerson.faith = data.faith,
      bizAssessPerson.faithName = data.faithName,
      bizAssessPerson.fullName = data.fullName,
      bizAssessPerson.homePhone = data.homePhone,
      bizAssessPerson.homeSupport = data.homeSupport,
      bizAssessPerson.homeSupportName = data.homeSupportName,
      bizAssessPerson.hometown = data.hometown,
      bizAssessPerson.id = data.id,
      bizAssessPerson.idCard = data.idCard,
      bizAssessPerson.isAgents = data.isAgents,
      bizAssessPerson.jobDes = data.jobDes,
      bizAssessPerson.liveAddr = data.liveAddr,
      bizAssessPerson.liveAreaCodeLevelName = data.liveAreaCodeLevelName,
      // liveArea= data.bizAssessPerson.liveArea?data.bizAssessPerson.liveAreaCodeLevel.split(",")=[],
      bizAssessPerson.liveAreaCodeLevel = data.liveAreaCodeLevel,
      bizAssessPerson.liveState = data.liveState,
      bizAssessPerson.liveStateName = data.liveStateName,
      bizAssessPerson.longTermLevel = data.longTermLevel
      bizAssessPerson.longTermLevelName = data.longTermLevelName,
      bizAssessPerson.maritalStatus = data.maritalStatus,
      bizAssessPerson.maritalStatusName = data.maritalStatusName,
      bizAssessPerson.medicalTreatment = data.medicalTreatment,
      bizAssessPerson.medicalTreatmentName = data.medicalTreatmentName,
      bizAssessPerson.mobile = data.mobile,
      bizAssessPerson.nation = data.nation,
      bizAssessPerson.nationName = data.nationName,
      bizAssessPerson.needHelpIsCare = data.needHelpIsCare,
      bizAssessPerson.needHelpIsCareName = data.needHelpIsCareName,
      bizAssessPerson.placeResidence = data.placeResidence,
      bizAssessPerson.remark = data.remark,
      bizAssessPerson.sex = data.sex,
      bizAssessPerson.sexName = data.sexName,
      bizAssessPerson.socialActivities = data.socialActivities,
      bizAssessPerson.socialActivitiesName = data.socialActivitiesName,
      bizAssessPerson.socialSecurityArd = data.socialSecurityArd,
      bizAssessPerson.status = data.status,
      bizAssessPerson.statusName = data.statusName,
      bizAssessPerson.whoHelpsCare = data.whoHelpsCare,
      bizAssessPerson.whoHelpsCareName = data.whoHelpsCareName,
      bizAssessPerson.whoHelpsCareOther = data.whoHelpsCareOther,
      bizAssessPerson.data = dataInfor
      // 本次评估
      bizAssessInfo.assessType = data.assessType,
      bizAssessInfo.assessTypeName = data.assessTypeName,
      bizAssessInfo.orgName = data.orgName,
      bizAssessInfo.occupancyCode = data.occupancyCode, // 入住情况
      bizAssessInfo.occupancyCodeName = data.occupancyCodeName,
      bizAssessInfo.costBearingCode = data.costBearingCode, // 评估费用承担
      bizAssessInfo.costBearingCodeName = data.costBearingCodeName,
      bizAssessInfo.appointmentData = data.appointmentData, // 预约评估日期
      bizAssessInfo.assessAddrCode = data.assessAddrCode, // 评估地点
      bizAssessInfo.assessAddrCodeName = data.assessAddrCodeName, // 评估地点
      bizAssessInfo.assessAreaCodeLevelName = data.assessAreaCodeLevelName, //
      // assessAreaCode= data.bizAssessInfo.assessAreaCodeLevel.split(","), // 所属区划
      bizAssessInfo.assessAddr = data.assessAddr, // 评估地址
      bizAssessInfo.assessLinkman = data.assessLinkman, // 评估联络人
      bizAssessInfo.assessLinkmanPhone = data.assessLinkmanPhone, // 联系电话
      newData.bizAssessInfo = bizAssessInfo
      newData.bizAssessPerson = bizAssessPerson
      return newData
    },
    // 编辑查看详情整理数据
    clearDetailData(data) {
      const dataList1 = []
      const dataList2 = []
      const dataList3 = []
      if (
        data.bizHealthStatus.data['100'] &&
        data.bizHealthStatus.data['100'].length
      ) {
        data.bizHealthStatus.data['100'].forEach((item) => {
          dataList1.push(item.itemCode)
          this.historyOptions.forEach(items => {
            if (items.itemCode == '1047' && item.itemCode == '1047') {
              return items.remark = item.remark
            }
          })
        })
      }
      if (
        data.bizHealthStatus.data['200'] &&
        data.bizHealthStatus.data['200'].length
      ) {
        data.bizHealthStatus.data['200'].forEach((item) => {
          this.nowOptions.forEach(items => {
            if (items.itemCode == '2047' && item.itemCode == '2047') {
              return items.remark = item.remark
            }
          })
          dataList2.push(item.itemCode)
        })
      }
      if (
        data.bizHealthStatus.data['300'] &&
        data.bizHealthStatus.data['300'].length
      ) {
        data.bizHealthStatus.data['300'].forEach((item) => {
          dataList3.push(item.itemCode)
        })
      }
      this.form = {
        // 基本信息
        age: data.bizAssessPerson.age,
        agentsHomePhone: data.bizAssessPerson.agentsHomePhone,
        agentsLiveAddr: data.bizAssessPerson.agentsLiveAddr,
        // agentsLiveArea: data.bizAssessPerson.agentsLiveArea?data.bizAssessPerson.agentsLiveAreaCodeLevel.split(','):[],
        agentsLiveAreaCodeLevel: data.bizAssessPerson.agentsLiveAreaCodeLevel,
        agentsLiveAreaCodeLevelName:
          data.bizAssessPerson.agentsLiveAreaCodeLevelName,
        agentsMobile: data.bizAssessPerson.agentsMobile,
        agentsName: data.bizAssessPerson.agentsName,
        agentsPlaceResidence: data.bizAssessPerson.agentsPlaceResidence,
        agentsRelation: data.bizAssessPerson.agentsRelation,
        birthday: data.bizAssessPerson.birthday,
        censusAddr: data.bizAssessPerson.censusAddr,
        // censusArea: data.bizAssessPerson.censusArea?data.bizAssessPerson.censusAreaCodeLevel.split(','):[],
        censusAreaCodeLevel: data.bizAssessPerson.censusAreaCodeLevel,
        censusAreaCodeLevelName: data.bizAssessPerson.censusAreaCodeLevelName,
        currentTakeMedicine: data.bizAssessPerson.currentTakeMedicine,
        economicState: data.bizAssessPerson.economicState
          ? data.bizAssessPerson.economicState.split(',')
          : [],
        economicStateName: data.bizAssessPerson.economicStateName,
        eduLevel: data.bizAssessPerson.eduLevel,
        eduLevelName: data.bizAssessPerson.eduLevelName,
        faith: data.bizAssessPerson.faith,
        faithName: data.bizAssessPerson.faithName,
        fullName: data.bizAssessPerson.fullName,
        homePhone: data.bizAssessPerson.homePhone,
        homeSupport: data.bizAssessPerson.homeSupport,
        homeSupportName: data.bizAssessPerson.homeSupportName,
        hometown: data.bizAssessPerson.hometown,
        id: data.bizAssessPerson.id,
        idCard: data.bizAssessPerson.idCard,
        isAgents: data.bizAssessPerson.isAgents,
        jobDes: data.bizAssessPerson.jobDes,
        liveAddr: data.bizAssessPerson.liveAddr,
        liveAreaCodeLevelName: data.bizAssessPerson.liveAreaCodeLevelName,
        // liveArea: data.bizAssessPerson.liveArea?data.bizAssessPerson.liveAreaCodeLevel.split(","):[],
        liveAreaCodeLevel: data.bizAssessPerson.liveAreaCodeLevel,
        liveStateName: data.bizAssessPerson.liveStateName,
        longTermLevel: data.bizAssessPerson.longTermLevel,
        liveState: data.bizAssessPerson.liveState,
        longTermLevelName: data.bizAssessPerson.longTermLevelName,
        maritalStatus: data.bizAssessPerson.maritalStatus,
        maritalStatusName: data.bizAssessPerson.maritalStatusName,
        medicalTreatment: data.bizAssessPerson.medicalTreatment,
        medicalTreatmentName: data.bizAssessPerson.medicalTreatmentName,
        mobile: data.bizAssessPerson.mobile,
        nation: data.bizAssessPerson.nation,
        nationName: data.bizAssessPerson.nationName,
        needHelpIsCare: data.bizAssessPerson.needHelpIsCare,
        needHelpIsCareName: data.bizAssessPerson.needHelpIsCareName,
        placeResidence: data.bizAssessPerson.placeResidence,
        remark: data.bizAssessPerson.remark,
        sex: data.bizAssessPerson.sex,
        sexName: data.bizAssessPerson.sexName,
        socialActivities: data.bizAssessPerson.socialActivities,
        socialActivitiesName: data.bizAssessPerson.socialActivitiesName,
        socialSecurityArd: data.bizAssessPerson.socialSecurityArd,
        status: data.bizAssessPerson.status,
        statusName: data.bizAssessPerson.statusName,
        whoHelpsCare: data.bizAssessPerson.whoHelpsCare,
        whoHelpsCareName: data.bizAssessPerson.whoHelpsCareName,
        whoHelpsCareOther: data.bizAssessPerson.whoHelpsCareOther,
        // 本次评估
        assessType: data.bizAssessInfo.assessType,
        assessTypeName: data.bizAssessInfo.assessTypeName,
        orgName: data.bizAssessInfo.orgName,
        occupancyCode: data.bizAssessInfo.occupancyCode, // 入住情况
        occupancyCodeName: data.bizAssessInfo.occupancyCodeName,
        costBearingCode: data.bizAssessInfo.costBearingCode, // 评估费用承担
        costBearingCodeName: data.bizAssessInfo.costBearingCodeName,
        appointmentData: data.bizAssessInfo.appointmentData, // 预约评估日期
        assessAddrCode: data.bizAssessInfo.assessAddrCode, // 评估地点
        assessAddrCodeName: data.bizAssessInfo.assessAddrCodeName, // 评估地点
        assessAreaCodeLevelName: data.bizAssessInfo.assessAreaCodeLevelName, // 评估地点
        // assessAreaCode: data.bizAssessInfo.assessAreaCodeLevel.split(","), // 所属区划
        assessAddr: data.bizAssessInfo.assessAddr, // 评估地址
        assessLinkman: data.bizAssessInfo.assessLinkman, // 评估联络人
        assessLinkmanPhone: data.bizAssessInfo.assessLinkmanPhone, // 联系电话

        liveArea: data.bizAssessPerson.liveAreaCodeLevel
          ? data.bizAssessPerson.liveAreaCodeLevel.split(',')
          : [],
        agentsLiveArea: data.bizAssessPerson.agentsLiveAreaCodeLevel
          ? data.bizAssessPerson.agentsLiveAreaCodeLevel.split(',')
          : [],
        censusArea: data.bizAssessPerson.censusAreaCodeLevel
          ? data.bizAssessPerson.censusAreaCodeLevel.split(',')
          : [],
        assessAreaCode: data.bizAssessInfo.assessAreaCodeLevel
          ? data.bizAssessInfo.assessAreaCodeLevel.split(',')
          : [], // 所属区划
        data: {
          100: dataList1,
          200: dataList2,
          300: dataList3
        }
      }
      this.assessPersonId = data.bizAssessPerson.id
      this.agentsAreaCode = data.bizAssessPerson.agentsLiveAreaCodeLevel
        ? data.bizAssessPerson.agentsLiveAreaCodeLevel.split(',')
        : []
      this.areaCode[0] = data.bizAssessPerson.censusAreaCodeLevel
        ? data.bizAssessPerson.censusAreaCodeLevel.split(',')
        : []
      this.areaCode[1] = data.bizAssessPerson.liveAreaCodeLevel
        ? data.bizAssessPerson.liveAreaCodeLevel.split(',')
        : []
      this.areaCodeBase = data.bizAssessInfo.assessAreaCodeLevel
        ? data.bizAssessInfo.assessAreaCodeLevel.split(',')
        : []
      this.hobbyList = data.bizHealthStatus.data['300']
      this.historyList = data.bizHealthStatus.data['100']
      this.newList = data.bizHealthStatus.data['200']
      setTimeout(() => {
        this.$refs['form_base'].clearValidate()
        this.idEdit = false
      }, 100)
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/styles/form.css";
.tableContainer {
  margin-top: 20px;
}
.assessItem {
  text-align: center;
}
</style>
