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
                      <span v-else>{{ form.sexName }}</span>
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
                        @change="birthdayChange"
                        @keyup.enter.native="submitBtn"
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
                        @keyup.enter.native="submitBtn"
                      />
                      <span v-else>{{ form.age }}</span>
                    </el-form-item>
                  </el-col>
                  <el-col :md="adaptiveGrid.md" :lg="adaptiveGrid.lg">
                    <el-form-item :label="isEditForm?'民族':'民族：'" prop="nation">
                      <el-select
                        v-if="isEditForm"
                        v-model="form.nation"
                        filterable
                        clearable
                        style="width:100%;"
                        @keyup.enter.native="submitBtn"
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
                    <el-form-item :label="isEditForm?'婚姻状况':'婚姻状况：'" prop="maritalStatus">
                      <el-select
                        v-if="isEditForm"
                        v-model="form.maritalStatus"
                        clearable
                        style="width:100%;"
                        @keyup.enter.native="submitBtn"
                      >
                        <el-option
                          v-for="item in maritalStatusOptions"
                          :key="item.dictValue"
                          :label="item.dictLabel"
                          :value="item.dictValue"
                        />
                      </el-select>
                      <span v-else>{{ form.maritalStatusName }}</span>
                    </el-form-item>
                  </el-col>
                  <el-col :md="adaptiveGrid.md" :lg="adaptiveGrid.lg">
                    <el-form-item :label="isEditForm?'政治面貌':'政治面貌：'" prop="politicType">
                      <el-select
                        v-if="isEditForm"
                        v-model="form.politicType"
                        clearable
                        style="width:100%;"
                        @keyup.enter.native="submitBtn"
                      >
                        <el-option
                          v-for="item in politicalOptions"
                          :key="item.dictValue"
                          :label="item.dictLabel"
                          :value="item.dictValue"
                        />
                      </el-select>
                      <span v-else>{{ form.politicTypeName }}</span>
                    </el-form-item>
                  </el-col>
                  <el-col :md="adaptiveGrid.md" :lg="adaptiveGrid.lg">
                    <el-form-item :label="isEditForm?'文化程度':'文化程度：'" prop="eduLevel">
                      <el-select
                        v-if="isEditForm"
                        v-model="form.eduLevel"
                        clearable
                        style="width:100%;"
                        @keyup.enter.native="submitBtn"
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
                    <el-form-item :label="isEditForm?'家庭电话':'家庭电话：'" prop="homePhone">
                      <el-input
                        v-if="isEditForm"
                        ref="homePhone"
                        v-model.trim="form.homePhone"
                        :disabled="disabled"
                        type="phone"
                        clearable
                        placeholder="请输入家庭电话"
                        @blur="handleHomePhoneBlur"
                        @keyup.enter.native="submitBtn"
                      />
                      <span v-else>{{ form.homePhone }}</span>
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
                  <el-col :md="adaptiveGrid.md" :lg="adaptiveGrid.lg">
                    <el-form-item :label="isEditForm?'户口性质':'户口性质：'" prop="residenceType">
                      <el-select
                        v-if="isEditForm"
                        v-model="form.residenceType"
                        clearable
                        placeholder="请选择户口性质"
                        style="width:100%;"
                        @keyup.enter.native="submitBtn"
                      >
                        <el-option
                          v-for="item in residenceTypeOptions"
                          :key="item.dictValue"
                          :label="item.dictLabel"
                          :value="item.dictValue"
                        />
                      </el-select>
                      <span v-else>{{ form.residenceTypeName }}</span>
                    </el-form-item>
                  </el-col>
                  <el-col :md="adaptiveGrid.md" :lg="adaptiveGrid.lg">
                    <el-form-item :label="isEditForm?'人口类别':'人口类别：'" prop="populationType">
                      <el-select
                        v-if="isEditForm"
                        v-model="form.populationType"
                        placeholder="请选择人口类别"
                        clearable
                        style="width:100%;"
                        @keyup.enter.native="editContent"
                      >
                        <el-option
                          v-for="item in populationTypeOptions"
                          :key="item.dictValue"
                          :label="item.dictLabel"
                          :value="item.dictValue"
                        />
                      </el-select>
                      <span v-else>{{ form.populationTypeName }}</span>
                    </el-form-item>
                  </el-col>
                  <el-col :md="adaptiveGrid.md" :lg="adaptiveGrid.lg">
                    <el-form-item :label="isEditForm?'户籍情况':'户籍情况：'" prop="populationType">
                      <el-select
                        v-if="isEditForm"
                        v-model="form.householdRegistration"
                        placeholder="请选择户籍情况"
                        clearable
                        style="width:100%;"
                        @keyup.enter.native="editContent"
                      >
                        <el-option
                          v-for="item in censusStatusOptions"
                          :key="item.dictValue"
                          :label="item.dictLabel"
                          :value="item.dictValue"
                        />
                      </el-select>
                      <span v-else>{{ form.householdRegistrationName }}</span>
                    </el-form-item>
                  </el-col>
                  <el-col :md="adaptiveGrid.md" :lg="adaptiveGrid.lg">
                    <el-form-item :label="isEditForm?'人员状态':'人员状态：'" prop="populationType">
                      <el-select
                        v-if="isEditForm"
                        v-model="form.status"
                        placeholder="请选择人员状态"
                        clearable
                        style="width:100%;"
                        @keyup.enter.native="editContent"
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
                  <el-col :md="adaptiveGrid.md" :lg="adaptiveGrid.lg">
                    <el-form-item :label="isEditForm?'就业情况':'就业情况：'" prop="populationType">
                      <el-select
                        v-if="isEditForm"
                        v-model="form.jobStatus"
                        placeholder="请选择就业情况"
                        clearable
                        style="width:100%;"
                        @keyup.enter.native="editContent"
                      >
                        <el-option
                          v-for="item in employmentOptions"
                          :key="item.dictValue"
                          :label="item.dictLabel"
                          :value="item.dictValue"
                        />
                      </el-select>
                      <span v-else>{{ form.jobStatusName }}</span>
                    </el-form-item>
                  </el-col>
                  <el-col :md="adaptiveGrid.md" :lg="adaptiveGrid.lg">
                    <el-form-item :label="isEditForm?'医疗保险':'医疗保险：'" prop="populationType">
                      <el-select
                        v-if="isEditForm"
                        v-model="form.medicalInsurance"
                        placeholder="请选择医疗保险"
                        clearable
                        style="width:100%;"
                        @keyup.enter.native="editContent"
                      >
                        <el-option
                          v-for="item in medicalOptions"
                          :key="item.dictValue"
                          :label="item.dictLabel"
                          :value="item.dictValue"
                        />
                      </el-select>
                      <span v-else>{{ form.medicalInsuranceName }}</span>
                    </el-form-item>
                  </el-col>
                  <el-col :md="adaptiveGrid.md" :lg="adaptiveGrid.lg">
                    <el-form-item :label="isEditForm?'养老保险':'养老保险：'" prop="populationType">
                      <el-select
                        v-if="isEditForm"
                        v-model="form.endowmentInsurance"
                        placeholder="请选择养老保险"
                        clearable
                        style="width:100%;"
                        @keyup.enter.native="editContent"
                      >
                        <el-option
                          v-for="item in pensionOptions"
                          :key="item.dictValue"
                          :label="item.dictLabel"
                          :value="item.dictValue"
                        />
                      </el-select>
                      <span v-else>{{ form.endowmentInsuranceName }}</span>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-form>
            </el-collapse-item>
            <el-collapse-item name="baseItem_2">
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
                      prop="address[0].areaCode"
                    >
                      <Address
                        v-if="isEditForm"
                        :id-edit="idEdit"
                        :area-code="areaCode[0]"
                        :form-code="form.address[0].areaCode"
                        :width="'100%'"
                        @getAreaCode="getAreaCode_reg"
                        @keyup.enter.native="submitBtn"
                      />
                      <span v-else>{{ form.address[0].areaCodeName }}</span>
                    </el-form-item>
                  </el-col>
                  <el-col :md="adaptiveGrid_plus.md" :lg="adaptiveGrid_plus.lg">
                    <el-form-item
                      :label="isEditForm?'户籍详细地址':'户籍详细地址：'"
                      prop="address[0].address"
                      :rules="rulesForm.address"
                    >
                      <el-input
                        v-if="isEditForm"
                        ref="address[0].address"
                        v-model.trim="form.address[0].address"
                        :disabled="disabled"
                        clearable
                        placeholder="请输入户籍详细地址"
                        @keyup.enter.native="submitBtn"
                      />
                      <span v-else>{{ form.address[0].address }}</span>
                    </el-form-item>
                  </el-col>
                  <el-col :md="adaptiveGrid_plus.md" :lg="adaptiveGrid_plus.lg">
                    <el-form-item
                      :label="isEditForm?'居住行政区划':'居住行政区划：'"
                      prop="address[1].areaCode"
                    >
                      <Address
                        v-if="isEditForm"
                        :id-edit="idEdit"
                        :area-code="areaCode[1]"
                        :form-code="form.address[1].areaCode"
                        :width="'100%'"
                        @getAreaCode="getAreaCode_live"
                        @keyup.enter.native="submitBtn"
                      />
                      <span v-else>{{ form.address[1].areaCodeName }}</span>
                    </el-form-item>
                  </el-col>
                  <el-col :md="adaptiveGrid_plus.md" :lg="adaptiveGrid_plus.lg">
                    <el-form-item
                      :label="isEditForm?'居住详细地址':'居住详细地址：'"
                      prop="address[1].address"
                      :rules="rulesForm.address"
                    >
                      <el-input
                        v-if="isEditForm"
                        ref="address[1].address"
                        v-model.trim="form.address[1].address"
                        :disabled="disabled"
                        clearable
                        placeholder="请输入居住详细地址"
                        @keyup.enter.native="submitBtn"
                      />
                      <span v-else>{{ form.address[1].address }}</span>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-form>
            </el-collapse-item>
            <el-collapse-item name="baseItem_3">
              <template slot="title">
                <div class="titleSlider">
                  <span>
                    <i class="titleTip" />计生标签
                  </span>
                </div>
              </template>
              <el-form
                ref="form_tag"
                key="form_tag"
                :model="form"
                :rules="isEditForm?rulesForm:null"
                label-width="120px"
              >
                <el-row :gutter="0">
                  <el-col :md="adaptiveGrid.md" :lg="adaptiveGrid.lg">
                    <el-form-item :label="isEditForm?'计生家庭':'计生家庭：'" prop="bizPlanBirthPropertityVo.pbFamilyType">
                      <el-select
                        v-if="isEditForm"
                        v-model="form.bizPlanBirthPropertityVo.pbFamilyType"
                        clearable
                        placeholder="请选择计生家庭"
                        style="width:100%;"
                        @keyup.enter.native="submitBtn"
                      >
                        <el-option
                          v-for="item in categoryOptions"
                          :key="item.dictValue"
                          :label="item.dictLabel"
                          :value="item.dictValue"
                        />
                      </el-select>
                      <span v-else>{{ form.bizPlanBirthPropertityVo.pbFamilyTypeName }}</span>
                    </el-form-item>
                  </el-col>
                  <el-col :md="adaptiveGrid.md" :lg="adaptiveGrid.lg">
                    <el-form-item :label="isEditForm?'计生补助':'计生补助：'" prop="bizPlanBirthPropertityVo.pbSubType">
                      <el-select
                        v-if="isEditForm"
                        v-model="form.bizPlanBirthPropertityVo.pbSubType"
                        clearable
                        placeholder="请选择计生补助"
                        style="width:100%;"
                        @keyup.enter.native="submitBtn"
                      >
                        <el-option
                          v-for="item in familyTypeOptions"
                          :key="item.dictValue"
                          :label="item.dictLabel"
                          :value="item.dictValue"
                        />
                      </el-select>
                      <span v-else>{{ form.bizPlanBirthPropertityVo.pbSubTypeName }}</span>
                    </el-form-item>
                  </el-col>
                  <el-col :md="adaptiveGrid.md" :lg="adaptiveGrid.lg">
                    <el-form-item :label="isEditForm?'家庭医生':'家庭医生：'" prop="bizPlanBirthPropertityVo.familyDoctor">
                      <el-input
                        v-if="isEditForm"
                        ref="bizPlanBirthPropertityVo.familyNum"
                        v-model.number="form.bizPlanBirthPropertityVo.familyDoctor"
                        clearable
                        placeholder="请输入家庭医生"
                        max-length="20"
                        @keyup.enter.native="submitBtn"
                      />
                      <span v-else>{{ form.bizPlanBirthPropertityVo.familyDoctor }}</span>
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
                :rules="isEditForm?rulesForm:null"
                label-width="80px"
              >
                <el-row :gutter="0">
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
                  <p v-else class="remarkSpan">{{ form.remark }}</p>
                </el-row>
              </el-form>
            </el-collapse-item>
          </el-collapse>
        </el-tab-pane>
        <el-tab-pane label="补贴信息" name="subsidy">
          <el-collapse v-model="activeCollapse">
            <el-collapse-item name="baseItem_3">
              <template slot="title">
                <div class="titleSlider">
                  <span>
                    <i class="titleTip" />计生补贴
                  </span>
                </div>
              </template>
              <el-form :model="form">
                <el-table :data="SalvageList" style="width: 100%">
                  <el-table-column label="补贴名称" prop="subsidyElementName" />
                  <el-table-column label="年龄段">
                    <template slot-scope="scope">
                      <el-form-item>
                        <el-select
                          v-if="scope.row.subsidyElementName=='助餐补贴'"
                          v-model="scope.row.ageRange"
                          placeholder="请选择"
                          clearable
                          :disabled="modelType === 'look'"
                          @change="getMoney(scope.row)"
                          @keyup.enter.native="editContent"
                        >
                          <el-option
                            v-for="item in generationSubsidyOptions"
                            :key="item.dictValue + Math.random()"
                            :label="item.dictLabel"
                            :value="item.dictValue"
                          />
                        </el-select>
                        <el-select
                          v-else-if="scope.row.subsidyElementName=='农村奖扶金'"
                          v-model="scope.row.ageRange"
                          :disabled="modelType === 'look'"
                          placeholder="请选择"
                          @keyup.enter.native="editContent"
                        >
                          <el-option
                            v-for="item in generationSubsidyOptions1"
                            :key="item.dictValue + Math.random()"
                            :label="item.dictLabel"
                            :value="item.dictValue"
                          />
                        </el-select>
                        <el-select
                          v-else
                          v-model="scope.row.ageRange"
                          :disabled="modelType === 'look'"
                          placeholder="请选择"
                          clearable
                          @change="getMoneys1(scope.row)"
                          @keyup.enter.native="editContent"
                        >
                          <el-option
                            v-for="item in generationSubsidyOption"
                            :key="item.dictValue + Math.random()"
                            :label="item.dictLabel"
                            :value="item.dictValue"
                          />
                        </el-select>
                      </el-form-item>

                    </template>
                  </el-table-column>
                  <el-table-column label="何时享受补贴">
                    <template slot-scope="scope">
                      <el-form-item v-if="isEditForm">
                        <el-date-picker
                          v-if="scope.row.subsidyElementName=='农村奖扶金'"
                          v-model="scope.row.subsidyDate"
                          type="date"
                          format="yyyy年MM月dd日"
                          value-format="yyyy-MM-dd"
                          placeholder="请选择享受补贴时间"
                          clearable
                          style="width:100%;"
                          @change="getMoneys(scope.row)"
                        />
                        <el-date-picker
                          v-else
                          v-model="scope.row.subsidyDate"
                          type="date"
                          format="yyyy年MM月dd日"
                          value-format="yyyy-MM-dd"
                          placeholder="请选择享受补贴时间"
                          clearable
                          style="width:100%;"
                        />
                      </el-form-item>
                      <span v-else>{{ scope.row.subsidyDate }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column label="补贴金额（元）">
                    <template slot-scope="scope">
                      <el-form-item v-if="isEditForm">
                        <div style="display:flex">
                          <el-input
                            v-model="scope.row.subsidyMoney"
                            placeholder="请输入补贴金额"
                            clearable
                            max-length="10"
                            oninput="if(isNaN(value)) { value = null } if(value.indexOf('.')>0){value=value.slice(0,value.indexOf('.')+3)}"
                            @keyup.enter.native="editContent"
                          />
                          <el-select
                            v-if="scope.row.subsidyElementName=='助餐补贴'"
                            v-model="scope.row.subsidyUnit"
                            placeholder="请选择"
                            clearable
                            @keyup.enter.native="editContent"
                          >
                            <el-option
                              v-for="item in SubsidyOption"
                              :key="item.dictValue + Math.random()"
                              :label="item.dictLabel"
                              :value="item.dictValue"
                            />
                          </el-select>
                          <el-select
                            v-else-if="scope.row.subsidyElementName=='农村奖扶金'"
                            v-model="scope.row.subsidyUnit"
                            placeholder="请选择"
                            clearable
                            @keyup.enter.native="editContent"
                          >
                            <el-option
                              v-for="item in SubsidyOption1"
                              :key="item.dictValue + Math.random()"
                              :label="item.dictLabel"
                              :value="item.dictValue"
                            />
                          </el-select>
                          <el-select
                            v-else
                            v-model="scope.row.subsidyUnit"
                            placeholder="请选择"
                            clearable
                            @keyup.enter.native="editContent"
                          >
                            <el-option
                              v-for="item in companyOptions"
                              :key="item.dictValue + Math.random()"
                              :label="item.dictLabel"
                              :value="item.dictValue"
                            />
                          </el-select>
                        </div>
                      </el-form-item>
                      <span v-else>
                        <span>{{ scope.row.subsidyMoney }}</span>
                        <span v-if="scope.row.subsidyUnit=='yuan_day'">元/天</span>
                        <span v-if="scope.row.subsidyUnit=='yuan/month'">元/月</span>
                        <span v-if="scope.row.subsidyUnit=='yuan/year'">元/年</span>
                        <span v-if="scope.row.subsidyUnit=='yuan/time'">元/次</span>
                        <span v-if="scope.row.subsidyUnit=='yuan/quarter'">元/季度</span>
                      </span>
                    </template>
                  </el-table-column>
                </el-table>
              </el-form>
              <el-form :model="form">
                <el-table :data="SalvageList1" style="width: 100%">
                  <el-table-column label="补贴名称" prop="subsidyElementName" />
                  <el-table-column label="年龄段">
                    <template slot-scope="scope">
                      <el-select
                        v-model="scope.row.ageRange"
                        :disabled="modelType === 'look'"
                        placeholder="请选择"
                        clearable
                        @change="getMoneyAge(scope.row)"
                        @keyup.enter.native="editContent"
                      >
                        <el-option
                          v-for="item in generationSubsidyOptions"
                          :key="item.dictValue + Math.random()"
                          :label="item.dictLabel"
                          :value="item.dictValue"
                        />
                      </el-select>
                    </template>
                  </el-table-column>
                  <el-table-column label="何时享受补贴">
                    <template slot-scope="scope">
                      <el-form-item v-if="isEditForm">
                        <el-date-picker
                          v-model="scope.row.subsidyDate"
                          type="date"
                          format="yyyy年MM月dd日"
                          value-format="yyyy-MM-dd"
                          placeholder="请选择享受补贴时间"
                          clearable
                          style="width:100%;"
                        />
                      </el-form-item>
                      <span v-else>{{ scope.row.subsidyDate }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column label="补贴次数（次）">
                    <template slot-scope="scope">
                      <el-form-item v-if="isEditForm">
                        <div style="display:flex">
                          <el-input
                            v-model="scope.row.subsidyMoney"
                            placeholder="请输入补贴金额"
                            clearable
                            max-length="10"
                            oninput="if(isNaN(value)) { value = null } if(value.indexOf('.')>0){value=value.slice(0,value.indexOf('.')+3)}"
                            @keyup.enter.native="editContent"
                          />
                          <el-select
                            v-model="scope.row.subsidyUnit"
                            placeholder="请选择"
                            clearable
                            @keyup.enter.native="editContent"
                          >
                            <el-option
                              v-for="item in companyOptions4"
                              :key="item.dictValue + Math.random()"
                              :label="item.dictLabel"
                              :value="item.dictValue"
                            />
                          </el-select>
                        </div>
                      </el-form-item>
                      <span v-else>
                        <span>{{ scope.row.subsidyMoney }}</span>
                        <span>次/年</span>
                      </span>
                    </template>
                  </el-table-column>
                </el-table>
              </el-form>
            </el-collapse-item>
          </el-collapse>
        </el-tab-pane>
      </el-tabs>

      <el-footer>
        <div v-if="isEditForm" class="footerBtn">
          <div v-if="this.activeTabs === 'base'">
            <el-button class="cancel-btn" @click="cancelDetailsPage">取消</el-button>
            <el-button type="warning" class="base-btn btnMarginLeft15" @click="tabsStep('subsidy')">下一步</el-button>
          </div>
          <div v-else>
            <el-button type="warning" class="base-btn btnMarginLeft15" @click="tabsStep('base')">上一步</el-button>
            <el-button class="cancel-btn btnMarginLeft15" @click="cancelDetailsPage">取消</el-button>
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
import {
  verifyFullName,
  verifyIdCard,
  verifyHomePhone,
  verifyMobile,
  isPositiveIntegerNotMust
} from '@/utils/validate'
import {
  computerAge,
  getBirthdayFromIdCard,
  validateForms,
  scrollToTop
} from '@/utils/index'
import { adaptiveGrid_max, adaptiveGrid_plus } from '@/common/index'
import Address from '@/components/Address'
import { closeSelectedTag } from '@/utils/rooterJump'
import { transformFloatNumber1 } from '@/utils/index'
import { addFamilyPlan, getFamilyPlan, editFamilyPlan } from '@/api/userInfoConfig/familyplanInfo'
export default {
  components: {
    Address
  },
  data() {
    return {
      hasEdit: false,
      dataList1: [
        {
          id: '',
          subsidyDate: '',
          subsidyElementName: '特别扶助金（伤残）',
          subsidyMoney: '',
          subsidyTitleName: '计生补贴',
          subsidyUnit: '',
          subsidyRemark: '',
          ageRange: ''
        },
        {
          id: '',
          subsidyDate: '',
          subsidyElementName: '特别扶助金（死亡）',
          subsidyMoney: '',
          subsidyTitleName: '计生补贴',
          subsidyUnit: '',
          subsidyRemark: '',
          ageRange: ''
        },
        {
          id: '',
          subsidyDate: '',
          subsidyElementName: '助餐补贴',
          subsidyMoney: '',
          subsidyTitleName: '计生补贴',
          subsidyUnit: '',
          subsidyRemark: '',
          ageRange: ''
        },
        {
          id: '',
          subsidyDate: '',
          subsidyElementName: '农村奖扶金',
          subsidyMoney: '',
          subsidyTitleName: '计生补贴',
          subsidyUnit: '',
          subsidyRemark: '',
          ageRange: 'all'
        }
      ],
      dataList2: [
        {
          id: '',
          subsidyDate: '',
          subsidyElementName: '体检补贴',
          subsidyMoney: '',
          subsidyTitleName: '计生补贴',
          subsidyUnit: '',
          subsidyRemark: '',
          ageRange: ''
        }
      ],
      companyOptions: [], // 单位
      companyOptions3: [],
      companyOptions4: [], // 体检补贴单位
      employmentOptions: [], // 就业情况
      medicalOptions: [], // 医疗
      pensionOptions: [], // 养老
      censusStatusOptions: [],
      isEditForm: true, // 页面表单是否可编辑操作。查看时：false,编辑-新增时：true
      idEdit: true, // 区域级联下拉框是编辑时还是新增时。编辑时：false,新增时：true
      disabled: false, // 表单是否可编辑
      modelType: '', // 查看：look  编辑：edit  新增：add
      activeTabs: 'base',
      activeCollapse: ['baseItem_1', 'baseItem_2', 'baseItem_3', 'baseItem_4'],
      adaptiveGrid: adaptiveGrid_max,
      adaptiveGrid_plus: adaptiveGrid_plus,
      areaCode: [[], []], // 区域行政的全部ID
      editAuthority: false,
      sexOptions: [], // 性别
      nationOptions: [], // 民族、
      maritalStatusOptions: [], // 婚姻状况
      politicalOptions: [], // 政治面貌
      educationOptions: [], // 文化程度
      residenceTypeOptions: [], // 户口性质
      populationTypeOptions: [], // 人口类别
      statusOptions: [], // 状态
      familyTypeOptions: [], // 家庭类型
      categoryOptions: [], // 救助类型
      isCoveredOptions: [], // 是否覆盖对象
      generationSubsidyOption: [],
      generationSubsidyOptions: [],
      generationSubsidyOptions1: [],
      SubsidyOption: [], // 助餐补贴单位
      SubsidyOption1: [], // 农村奖单位i
      form: {
        id: '',
        fullName: '', // 姓名
        idCard: '', // 身份证
        sex: '', // 性别
        sexName: '',
        birthday: '', // 出生日期（年龄不传，只传出生日期）
        age: '', // 年龄
        nation: '', // 民族
        nationName: '',
        maritalStatus: '', // 婚姻状况
        maritalStatusName: '',
        politicType: '', // 政治面貌
        politicTypeName: '',
        eduLevel: '', // 文化程度
        eduLevelName: '',
        homePhone: '', // 家庭电话
        mobile: '', // 手机号码
        residenceType: '', // 户口性质
        residenceTypeName: '',
        populationType: '', // 人口类别
        populationTypeName: '',
        status: '', // 老人状态
        statusName: '', // 老人状态（纯文本）
        jobStatus: '', // 就业情况
        jobStatusName: '',
        householdRegistration: '', // 户籍情况
        householdRegistrationName: '',
        endowmentInsurance: '', // 养老保险
        endowmentInsuranceName: '',
        medicalInsurance: '', // 医疗保险
        medicalInsuranceName: '',
        // 住址信息
        address: [
          {
            id: '',
            personId: '',
            addrType: '0', // 地址类型
            addrTypeName: '', // 地址类型（纯文本）
            areaCode: [], // 行政区划
            areaCodeName: '', // 行政区划(纯文本)
            address: '', // 详细地址
            codeLevel: []// 树节点
          },
          {
            id: '',
            personId: '',
            addrType: '1', // 地址类型
            addrTypeName: '', // 地址类型（纯文本）
            areaCode: [], // 行政区划
            areaCodeName: '', // 行政区划(纯文本)
            address: '', // 详细地址
            codeLevel: []// 树节点
          }
        ],
        bizPlanBirthPropertityVo: {
          id: '',
          personId: '',
          pbFamilyType: '', // 救助类型
          pbFamilyTypeName: '',
          pbSubType: '', // 家庭类型
          pbSubTypeName: '',
          familyDoctor: ''
        },
        remark: '', // 备注
        personSubsidyInfoList: []
      },
      SalvageList: [
        {
          id: '',
          subsidyDate: '',
          subsidyElementName: '特别扶助金（伤残）',
          subsidyMoney: '',
          subsidyTitleName: '计生补贴',
          subsidyUnit: '',
          subsidyRemark: '',
          ageRange: ''
        },
        {
          id: '',
          subsidyDate: '',
          subsidyElementName: '特别扶助金（死亡）',
          subsidyMoney: '',
          subsidyTitleName: '计生补贴',
          subsidyUnit: '',
          subsidyRemark: '',
          ageRange: ''
        },
        {
          id: '',
          subsidyDate: '',
          subsidyElementName: '助餐补贴',
          subsidyMoney: '',
          subsidyTitleName: '计生补贴',
          subsidyUnit: '',
          subsidyRemark: '',
          ageRange: ''
        },
        {
          id: '',
          subsidyDate: '',
          subsidyElementName: '农村奖扶金',
          subsidyMoney: '',
          subsidyTitleName: '计生补贴',
          subsidyUnit: '',
          subsidyRemark: '',
          ageRange: 'all'
        }
      ],
      SalvageList1: [
        {
          id: '',
          subsidyDate: '',
          subsidyElementName: '体检补贴',
          subsidyMoney: '',
          subsidyTitleName: '计生补贴',
          subsidyUnit: '',
          subsidyRemark: '',
          ageRange: ''
        }
      ],
      rulesForm: {
        fullName: [
          { required: true, trigger: 'blur', message: '姓名不能为空，请输入！' },
          { trigger: 'blur', validator: verifyFullName }
        ],
        idCard: [
          { required: true, trigger: 'MANUAL_TRIGGER', message: '身份证不能为空，请输入！' },
          { trigger: 'MANUAL_TRIGGER', validator: verifyIdCard },
          { trigger: 'MANUAL_TRIGGER', validator: (rule, value, callback) => {
            validateID(value).then(response => {
              if (response.code === 0) {
                callback()
              } else {
                if (response.msg == '该信息非当前企业拥有') {
                  callback('计生人员人员信息已存在，请重新输入。')
                } else {
                  callback(response.msg)
                }
              }
            }).catch(() => {
              callback(new Error('身份证检验接口调用失败！'))
            })
          } }
        ],
        homePhone: [
          { trigger: 'MANUAL_TRIGGER', validator: verifyHomePhone }
        ],
        mobile: [
          { trigger: 'blur', validator: verifyMobile }
        ],
        address: [
          { trigger: 'blur', max: 50, message: '详细地址长度不得超过50个字符，请重新输入！' }
        ],
        'bizPlanBirthPropertityVo.familyNum': [
          { trigger: 'blur', validator: isPositiveIntegerNotMust }
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
  async mounted() {
    await this.getSelect()
    this.hasEdit = this.$route.query.hasEdit
    this.modelType = this.$route.query.modelType
    const _userId_ = this.$route.params.id || ''
    if (this.modelType === 'look') {
      // 查看时，不要调用户信息接口，直接将表格行数据带来现实
      this.isEditForm = false
      // 请求当前用户信息
      getFamilyPlan(_userId_).then(response => {
        this.formatData(response.data)
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
    getMoney(row) {
      if (row.ageRange == '60_meal') {
        row.subsidyMoney = 9
        row.subsidyUnit = 'yuan_day'
      }
      // else{
      //   row.subsidyMoney=''
      //   row.subsidyUnit=''
      // }
    },
    getMoneyAge(row) {
      if (row.ageRange == '60_meal') {
        row.subsidyMoney = 1
        row.subsidyUnit = 'times/year'
      }
    },
    getMoneys(row) {
      row.subsidyMoney = 1600
      row.subsidyUnit = 'yuan/year'
    },
    getMoneys1(row) {
      if (row.subsidyElementName == '特别扶助金（伤残）') {
        if (row.ageRange == '45_59_subsidy') {
          row.subsidyMoney = 660
        } else if (row.ageRange == '60_69_subsidy') {
          row.subsidyMoney = 710
        } else {
          row.subsidyMoney = 760
        }
      } else if (row.subsidyElementName == '特别扶助金（死亡）') {
        if (row.ageRange == '45_59_subsidy') {
          row.subsidyMoney = 820
        } else if (row.ageRange == '60_69_subsidy') {
          row.subsidyMoney = 870
        } else {
          row.subsidyMoney = 920
        }
      }
    },
    transformNumber1(value, obj, index) {
      this.dataList1 = this.SalvageList
      this.dataList1[index][obj] = transformFloatNumber1(value)
      this.$set(this.SalvageList, index, this.dataList1[index])
    },
    transformNumber2(value, obj, index) {
      this.dataList2 = this.SalvageList1
      this.dataList2[index][obj] = transformFloatNumber1(value)
      this.$set(this.SalvageList1, index, this.dataList2[index])
    },
    async getData(id) {
      // await this.getSelect()
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
        getFamilyPlan(id).then(response => {
          this.formatData(response.data)
          this.idEdit = false
        }).catch(() => {
          this.$message.error('获取用户信息失败！')
        })
      })
    },
    tabsStep(tabsName) {
      this.activeTabs = tabsName
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
    // 获取下拉字典
    getSelect() {
      const dictKey = [
        'sys_sex', // 性别
        'nation_type', // 民族
        'biz_marital_status', // 婚姻状况
        'politics_status', // 政治面貌
        'edu_level', // 文化程度
        'biz_residence_type', // 户口性质
        'people_category', // 人口类别
        'birthControl_family', // 计生家庭
        'birthControl_subsidy', // 计生补助
        'sys_Yes_No', // 是否覆盖对象
        'biz_old_person_status', // 状态
        'biz_census_status', // 户籍情况
        'medical_insurance', // 医疗保险
        'job_status', // 就业
        'endowment_insurance', // 养老保险
        'home_unit',
        'help_unit',
        'generationSubsidy',
        'meal_allowance',
        'assistance_subsidy',
        'bonus_all',
        'rural_awards',
        'medical_subsidies'
      ].join(',')
      return new Promise((resolve, reject) => {
        allSelectdictionaryData(dictKey).then(response => {
          const dict = response.data
          for (const key in dict) {
            switch (key) {
              // 性别
              case 'sys_sex':
                this.sexOptions = dict[key]
                break
                // 民族
              case 'nation_type':
                this.nationOptions = dict[key]
                break
                // 婚姻状况
              case 'biz_marital_status':
                this.maritalStatusOptions = dict[key]
                break
                // 政治面貌
              case 'politics_status':
                this.politicalOptions = dict[key]
                break
                // 文化程度
              case 'edu_level':
                this.educationOptions = dict[key]
                break
                // 户口性质
              case 'biz_residence_type':
                this.residenceTypeOptions = dict[key]
                break
                // 人口类别
              case 'people_category':
                this.populationTypeOptions = dict[key]
                this.form.populationType = 'p_this city'
                break
                // 救助类别
              case 'birthControl_family':
                this.categoryOptions = dict[key]
                break
                // 家庭类型
              case 'birthControl_subsidy':
                this.familyTypeOptions = dict[key]
                break
                // 是否覆盖对象
              case 'sys_Yes_No':
                this.isCoveredOptions = dict[key]
                break
              case 'biz_old_person_status':
                this.statusOptions = dict[key]
                break
                // 户籍
              case 'biz_census_status':
                this.censusStatusOptions = dict[key]
                break
                // 就业
              case 'job_status':
                this.employmentOptions = dict[key]
                break
                // 医疗
              case 'medical_insurance':
                this.medicalOptions = dict[key]
                break
                // 养老
              case 'endowment_insurance':
                this.pensionOptions = dict[key]
                break
              case 'home_unit':
                this.companyOptions = dict[key]
                break
              case 'help_unit':
                this.companyOptions3 = dict[key]
                break
                // 年龄段
              case 'generationSubsidy':
                this.generationSubsidyOption = dict[key]
                break
                // 助餐补贴
              case 'meal_allowance':
                this.generationSubsidyOptions = dict[key]
                break
              case 'assistance_subsidy':
                this.SubsidyOption = dict[key]
                break
                // 农村奖扶金年龄段
              case 'bonus_all':
                this.generationSubsidyOptions1 = dict[key]
                break
              case 'rural_awards':
                this.SubsidyOption1 = dict[key]
                break
              case 'medical_subsidies':
                this.companyOptions4 = dict[key]
                break
            }
          }
          resolve()
        }).catch(() => {
          reject()
        })
      })
    },
    // ====== 事件处理器 =======
    birthdayChange(val) {
      // 新增时，根据满足条件的身份证，自动补全出生日期
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
    // 获取区域的值----户籍
    getAreaCode_reg(val) {
      this.areaCode[0] = val
    },
    // 获取区域的值----居住
    getAreaCode_live(val) {
      this.areaCode[1] = val
    },
    // 家庭电话输入框失去焦点
    handleHomePhoneBlur() {
      this.$refs['form_base'].validateField('homePhone', (message) => {
        const valid = message == ''
        if (!valid) {
          this.$message.warning(
            '家庭电话格式例如:123-12345678或1234-1234567或1234-12345678')
        }
      })
    },
    // 确定按钮-提交form表单
    submitBtn() {
      const formRefs = ['form_base', 'form_address'].map(key => this.$refs[key])
      validateForms(formRefs).then(() => {
        const _form = this.form
        for (const k in this.areaCode) {
          _form.address[k].areaCode = this.areaCode[k].length === 0 ? '' : this.areaCode[k][this.areaCode[k].length - 1] + ''
          _form.address[k].codeLevel = this.areaCode[k].join(',') || ''
        }
        if (_form.birthday === '') {
          _form.birthday = 'null'
        }
        // 去除不需提交的字段
        delete _form.maritalStatusName
        delete _form.politicTypeName
        delete _form.eduLevelName
        delete _form.residenceTypeName
        delete _form.populationTypeName
        delete _form.assistanceTypeName
        delete _form.familyTypeName
        delete _form.defoCodeName
        // 数据处理
        const arrList = []
        let neqArray = []
        neqArray = this.SalvageList.concat(this.SalvageList1)
        neqArray.forEach(item => {
          if (item.subsidyMoney != '' && item.subsidyMoney != null || item.subsidyDate != '' && item.subsidyDate != null) {
            arrList.push(item)
          }
        })
        this.form.personSubsidyInfoList = arrList
        if (this.modelType === 'add' && !this.form.id) {
          addFamilyPlan(_form).then(response => {
            if (response.code === 0) {
              this.$message({
                type: 'success',
                message: '新增计生人员信息保存成功!'
              })
              // 关闭页面
              this.closeDetailsPage()
            } else {
              this.$message.error('新增计生人员信息操作失败，失败原因是：' + response.msg)
            }
          }).catch(() => {
            this.$message.error('新增计生人员信息操作失败!')
          })
        }
        // 编辑
        else if (this.modelType === 'edit' || (this.modelType === 'add' && this.form.id)) {
          editFamilyPlan(_form).then(response => {
            if (response.code === 0) {
              this.$message({
                type: 'success',
                message: '编辑计生人员信息保存成功!'
              })
              // 关闭页面
              this.closeDetailsPage()
            } else {
              this.$message.error('编辑计生人员信息操作失败，失败原因是：' + response.msg)
            }
          }).catch(() => {
            this.$message.error('编辑计生人员信息操作失败!')
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
      // 关闭页面
      closeSelectedTag(this, this.$route)
      this.$router.push('/streetPlatform/userInfoConfig/familyplanInfo')
    },
    // 查看详情页面，点击编辑按钮
    editContent() {
      this.$router.push({
        path: `/familyplanInfo/details/${this.$route.params.id}`,
        query: { 'modelType': 'edit', '_title': `编辑${this.form.fullName}` }
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
              this.idEdit = false
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
      echoPerson(idCard, 'H').then(response => {
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
            this.idEdit = true
            this.resetForm()
            this.formatData(response)
          }).catch(() => {
            this.form.idCard = ''
          })
        }
      }).catch(err => {
        this.$message.error('身份证载入信息接口请求失败！')
      })
    },

    formatData(response) {
      for (const key in this.form) {
        if (!['address', 'contact'].includes(key)) {
          this.form[key] = response[key]
        }
      }
      if (response.bizPlanBirthPropertityVo != null) {
        this.form.bizPlanBirthPropertityVo = response.bizPlanBirthPropertityVo
      } else {
        this.form.bizPlanBirthPropertityVo = {
          id: '',
          personId: '',
          pbFamilyType: '', // 救助类型
          pbFamilyTypeName: '',
          pbSubType: '', // 家庭类型
          pbSubTypeName: '',
          familyDoctor: ''
        }
      }
      // if(response.censusArea!=""&&response.censusArea!=null){
      const obj1 = {
        addrType: '0', // 地址类型
        addrTypeName: '', // 地址类型（纯文本）
        areaCode: response.censusAreaCodeLevel != null && response.censusAreaCodeLevel != '' ? response.censusAreaCodeLevel.split(',') : [], // 行政区划
        areaCodeName: response.censusAreaCodeLevelName, // 行政区划(纯文本)
        address: response.censusAddr, // 详细地址
        codeLevel: response.censusAreaCodeLevel// 树节点
      }
      this.$set(this.form.address, 0, obj1)
      // }
      // if(response.liveArea!=""&&response.liveArea!=null){
      const obj2 = {
        addrType: '1', // 地址类型
        addrTypeName: '', // 地址类型（纯文本）
        areaCode: response.liveAreaCodeLevel != null && response.liveAreaCodeLevel != '' ? response.liveAreaCodeLevel.split(',') : [], // 行政区划
        areaCodeName: response.liveAreaCodeLevelName, // 行政区划(纯文本)
        address: response.liveAddr, // 详细地址
        codeLevel: response.liveAreaCodeLevel// 树节点
      }
      this.$set(this.form.address, 1, obj2)
      // }
      if (!this.form.birthday) {
        this.form.birthday = getBirthdayFromIdCard(this.form.idCard)
      }
      if (response.personSubsidyInfoList.length) {
        const SalvageList = []
        response.personSubsidyInfoList.forEach(item => {
          if (item.subsidyTitleName == '计生补贴') {
            SalvageList.push(item)
          }
        })
        this.SalvageList.forEach(item => {
          SalvageList.forEach(items => {
            if (item.subsidyElementName == items.subsidyElementName) {
              item.subsidyMoney = items.subsidyMoney
              item.subsidyUnit = items.subsidyUnit
              item.id = items.id
              item.subsidyDate = items.subsidyDate
              item.ageRange = items.ageRange
            }
          })
        })
        this.SalvageList1.forEach(item => {
          SalvageList.forEach(items => {
            if (item.subsidyElementName == items.subsidyElementName) {
              item.subsidyMoney = items.subsidyMoney
              item.subsidyUnit = items.subsidyUnit
              item.id = items.id
              item.subsidyDate = items.subsidyDate
              item.ageRange = items.ageRange
            }
          })
        })
        this.dataList1 = _.cloneDeep(this.SalvageList)
        this.dataList2 = _.cloneDeep(this.SalvageList1)
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
