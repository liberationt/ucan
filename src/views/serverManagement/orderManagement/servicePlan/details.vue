<template>
  <el-container>
    <el-main class="tableContainer">
      <el-tabs v-model="activeTabs">
        <!--基本信息tabs start-->
        <!--服务信息tabs end-->
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
                        :disabled="disabled&&modelType==='edit'"
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
                        :disabled="disabled"
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
                    <el-form-item :label="isEditForm?'出生日期':'出生日期：'" prop="birthday">
                      <el-date-picker
                        v-if="isEditForm"
                        v-model="form.birthday"
                        type="date"
                        :disabled="disabled"
                        placeholder="请选择出生日期"
                        style="width:100%;"
                        format="yyyy年MM月dd日"
                        value-format="yyyy-MM-dd"
                        @change="birthdayChange"
                        @keyup.enter.native="editContent"
                      />
                      <span v-else>{{ form.birthday }}</span>
                    </el-form-item>
                  </el-col>
                  <el-col :md="adaptiveGrid.md" :lg="adaptiveGrid.lg">
                    <el-form-item :label="isEditForm?'年龄':'年龄：'" prop="age">
                      <el-input
                        v-if="isEditForm"
                        ref="age"
                        v-model="form.age"
                        :disabled="disabled"
                        clearable
                        placeholder="请输入年龄"
                        @keyup.enter.native="editContent"
                      />
                      <span v-else>{{ form.age }}</span>
                    </el-form-item>
                  </el-col>
                  <el-col :md="adaptiveGrid.md" :lg="adaptiveGrid.lg">
                    <el-form-item :label="isEditForm?'民族':'民族：'" prop="nation">
                      <el-select
                        v-if="isEditForm"
                        v-model="form.nation"
                        placeholder="请选择民族"
                        filterable
                        :disabled="disabled"
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
                    <el-form-item :label="isEditForm?'婚姻状况':'婚姻状况：'" prop="maritalStatus">
                      <el-select
                        v-if="isEditForm"
                        v-model="form.maritalStatus"
                        placeholder="请选择婚姻状况"
                        clearable
                        :disabled="disabled"
                        style="width:100%;"
                        @keyup.enter.native="editContent"
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
                  <el-col :md="adaptiveGrid.md" :lg="adaptiveGrid.lg">
                    <el-form-item :label="isEditForm?'政治面貌':'政治面貌：'" prop="politicType">
                      <el-select
                        v-if="isEditForm"
                        v-model="form.politicType"
                        :disabled="disabled"
                        placeholder="请选择政治面貌"
                        clearable
                        style="width:100%;"
                        @keyup.enter.native="editContent"
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
                        :disabled="disabled"
                        placeholder="请选择文化程度"
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
                    <el-form-item :label="isEditForm?'家庭电话':'家庭电话：'" prop="homePhone">
                      <el-input
                        v-if="isEditForm"
                        ref="homePhone"
                        v-model.trim="form.homePhone"
                        clearable
                        placeholder="请输入家庭电话"
                        type="phone"
                        @blur="handleHomePhoneBlur"
                        @keyup.enter.native="editContent"
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
                        clearable
                        placeholder="请输入手机号码"
                        @keyup.enter.native="editContent"
                      />
                      <span v-else>{{ form.mobile }}</span>
                    </el-form-item>
                  </el-col>
                  <el-col :md="adaptiveGrid.md" :lg="adaptiveGrid.lg">
                    <el-form-item :label="isEditForm?'户口性质':'户口性质：'" prop="residenceType">
                      <el-select
                        v-if="isEditForm"
                        v-model="form.residenceType"
                        placeholder="请选择户口性质"
                        clearable
                        :disabled="disabled"
                        style="width:100%;"
                        @keyup.enter.native="editContent"
                      >
                        <el-option
                          v-for="(item, index) in residenceTypeOptions"
                          :key="index"
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
                        :disabled="disabled"
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
                    <el-form-item :label="isEditForm?'户籍情况':'户籍情况：'" prop="householdRegistration">
                      <el-select
                        v-if="isEditForm"
                        v-model="form.householdRegistration"
                        placeholder="请选择户籍情况"
                        clearable
                        :disabled="disabled"
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
                    <el-form-item :label="isEditForm?'人员状态':'人员状态：'" prop="status">
                      <el-select
                        v-if="isEditForm"
                        v-model="form.status"
                        placeholder="请选择人员状态"
                        clearable
                        :disabled="disabled"
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
                    <el-form-item :label="isEditForm?'就业情况':'就业情况：'" prop="jobStatus">
                      <el-select
                        v-if="isEditForm"
                        v-model="form.jobStatus"
                        placeholder="请选择就业情况"
                        clearable
                        :disabled="disabled"
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
                    <el-form-item :label="isEditForm?'医疗保险':'医疗保险：'" prop="medicalInsurance">
                      <el-select
                        v-if="isEditForm"
                        v-model="form.medicalInsurance"
                        placeholder="请选择医疗保险"
                        clearable
                        :disabled="disabled"
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
                    <el-form-item :label="isEditForm?'养老保险':'养老保险：'" prop="endowmentInsurance">
                      <el-select
                        v-if="isEditForm"
                        v-model="form.endowmentInsurance"
                        placeholder="请选择养老保险"
                        clearable
                        :disabled="disabled"
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
            <!--基本信息item end-->
            <!--住址信息item start-->
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
                    >
                      <Address
                        v-if="isEditForm"
                        :id-edit="idEdit"
                        :area-code="areaCode"
                        :disabled="disabled"
                        :form-code="form.censusArea"
                        :width="'100%'"
                        @getAreaCode="getAreaCode_reg"
                        @keyup.enter.native="editContent"
                      />
                      <span v-else>{{ form.censusAreaCodeLevelName }}</span>
                    </el-form-item>
                  </el-col>
                  <el-col :md="adaptiveGrid_plus.md" :lg="adaptiveGrid_plus.lg">
                    <el-form-item
                      :label="isEditForm?'户籍详细地址':'户籍详细地址：'"
                      prop="censusAddr"
                    >
                      <el-input
                        v-if="isEditForm"
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
                        :disabled="disabled"
                        @getAreaCode="getAreaCode_live"
                        @keyup.enter.native="editContent"
                      />
                      <span v-else>{{ form.liveAreaCodeLevelName }}</span>
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
                  <el-col :md="adaptiveGrid_plus.md" :lg="adaptiveGrid_plus.lg">
                    <el-form-item
                      :label="isEditForm?'服务行政区划':'服务行政区划：'"
                      prop="serviceArea"
                    >
                      <Address
                        v-if="isEditForm"
                        :id-edit="idEdit"
                        :area-code="liveCode2"
                        :form-code="form.serviceArea"
                        :width="'100%'"
                        @getAreaCode="getAreaCode_live2"
                        @keyup.enter.native="editContent"
                      />
                      <span v-else>{{ form.serviceAreaCodeLevelName }}</span>
                    </el-form-item>
                  </el-col>
                  <el-col :md="adaptiveGrid_plus.md" :lg="adaptiveGrid_plus.lg">
                    <el-form-item
                      :label="isEditForm?'服务详细地址':'服务详细地址：'"
                      prop="serviceAddr"
                    >
                      <el-input
                        v-if="isEditForm"
                        v-model.trim="form.serviceAddr"
                        clearable
                        placeholder="请输入服务详细地址"
                        @keyup.enter.native="editContent"
                      />
                      <span v-else>{{ form.serviceAddr }}</span>
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
                    <i class="titleTip" />联系人
                  </span>
                </div>
              </template>
              <el-form ref="form_contact" :model="form">
                <el-table :data="form.contact" style="width: 100%">
                  <el-table-column
                    type="index"
                    label="序号"
                    width="80"
                    fixed="left"
                    align="center"
                  />
                  <el-table-column prop="contactsName" label="姓名" min-width="150">
                    <template slot-scope="scope">
                      <el-form-item
                        v-if="isEditForm"
                        :ref="'contact.' + scope.$index + '.contactsName'"
                        :prop="'contact.' + scope.$index + '.contactsName'"
                        :rules="rulesForm.contactName"
                      >
                        <el-input
                          v-model.trim="scope.row.contactsName"
                          placeholder="请输入姓名"
                          clearable
                          :disabled="disabled"
                          @keyup.enter.native="editContent"
                        />
                      </el-form-item>
                      <span v-else>{{ scope.row.contactsName }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column prop="sex" label="性别" min-width="150">
                    <template slot-scope="scope">
                      <el-form-item v-if="isEditForm" :prop="'contact.' + scope.$index + '.sex'">
                        <el-select
                          v-model="scope.row.sex"
                          :disabled="disabled"
                          placeholder="请选择性别"
                          style="width:100%;"
                          clearable
                          @keyup.enter.native="editContent"
                        >
                          <el-option label="男" name="0" value="0" />
                          <el-option label="女" name="1" value="1" />
                        </el-select>
                      </el-form-item>
                      <span v-else>{{ scope.row.sexName }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column prop="relation" label="关系" min-width="150">
                    <template slot-scope="scope">
                      <el-form-item
                        v-if="isEditForm"
                        :prop="'contact.' + scope.$index + '.relation'"
                      >
                        <el-select
                          ref="relation"
                          v-model="scope.row.relation"
                          :disabled="disabled"
                          placeholder="请选择关系"
                          clearable
                          style="width:100%;"
                          @keyup.enter.native="editContent"
                        >
                          <el-option
                            v-for="item in relationOptions"
                            :key="item.dictValue + Math.random()"
                            :label="item.dictLabel"
                            :value="item.dictValue"
                          />
                        </el-select>
                      </el-form-item>
                      <span v-else>{{ scope.row.relationName }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column prop="homePhone" label="家庭电话" min-width="180">
                    <template slot-scope="scope">
                      <el-form-item
                        v-if="isEditForm"
                        :ref="'contact.' + scope.$index + '.homePhone'"
                        :prop="'contact.' + scope.$index + '.homePhone'"
                        :rules="rulesForm.contactHomePhone"
                      >
                        <el-input
                          v-model.trim="scope.row.homePhone"
                          :disabled="disabled"
                          placeholder="请输入家庭电话"
                          clearable
                          @blur="handleContactHomePhoneBlur(scope.$index)"
                          @keyup.enter.native="editContent"
                        />
                      </el-form-item>
                      <span v-else>{{ scope.row.homePhone }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column prop="mobile" label="手机号码" min-width="180">
                    <template slot-scope="scope">
                      <el-form-item
                        v-if="isEditForm"
                        :ref="'contact.' + scope.$index + '.mobile'"
                        :prop="'contact.' + scope.$index + '.mobile'"
                        :rules="rulesForm.contactMobile"
                      >
                        <el-input
                          v-model.trim="scope.row.mobile"
                          :disabled="disabled"
                          placeholder="请输入手机号码"
                          clearable
                          @keyup.enter.native="editContent"
                        />
                      </el-form-item>
                      <span v-else>{{ scope.row.mobile }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column prop="address" label="住址" min-width="300">
                    <template slot-scope="scope">
                      <el-form-item
                        v-if="isEditForm"
                        :ref="'contact.' + scope.$index + '.address'"
                        :prop="'contact.' + scope.$index + '.address'"
                        :rules="rulesForm.contactAddress"
                      >
                        <el-input
                          v-model.trim="scope.row.address"
                          :disabled="disabled"
                          placeholder="请输入住址"
                          clearable
                          @keyup.enter.native="editContent"
                        />
                      </el-form-item>
                      <span v-else>{{ scope.row.address }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column prop="isDefault" label="默认联系人" min-width="100">
                    <template slot-scope="scope">
                      <el-form-item
                        v-if="isEditForm"
                        :prop="'contact.' + scope.$index + '.isDefault'"
                      >
                        <el-switch
                          v-model="scope.row.isDefault"
                          :disabled="disabled"
                          class="switchStyle"
                          active-text="是"
                          inactive-text="否"
                          active-value="Y"
                          inactive-value="N"
                          @change="changeSwitch(scope.row.rowIndex,scope.row)"
                        />
                      </el-form-item>
                      <span v-else>{{ scope.row.isDefaultName }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column
                    v-if="isEditForm&&!disabled"
                    label="操作"
                    min-width="200"
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

              <div v-if="isEditForm&&!disabled" class="addBtnDiv">
                <span @click="addTableRow()">添加联系人</span>
              </div>

            </el-collapse-item>
            <!--联系人item end-->
            <!--备注item start-->
            <el-collapse-item name="baseItem_5">
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
                      v-if="isEditForm"
                      ref="remark"
                      v-model.trim="form.remark"
                      type="textarea"
                      :rows="5"
                      :disabled="disabled"
                      placeholder="请输入备注"
                      maxlength="200"
                      show-word-limit
                      @keyup.enter.native="editContent"
                    />
                  </el-form-item>
                  <p v-else class="remarkSpan">{{ form.remark }}</p>
                </el-row>
              </el-form>
            </el-collapse-item>
            <!--备注item end-->
          </el-collapse>
        </el-tab-pane>
        <!--基本信息tabs end-->
        <el-tab-pane label="补贴信息" name="label">
          <el-collapse v-model="activeCollapse">
            <el-collapse-item name="baseItem_1">
              <template slot="title">
                <div class="titleSlider">
                  <span>
                    <i class="titleTip" />养老补贴
                  </span>
                </div>
              </template>
              <el-form :model="form">
                <el-table :data="PensionList" style="width: 100%">
                  <el-table-column label="补贴名称" prop="subsidyElementName" />
                  <el-table-column label="何时享受补贴">
                    <template slot-scope="scope">
                      <el-form-item v-if="isEditForm">
                        <el-date-picker
                          v-if="isEditForm"
                          v-model="scope.row.subsidyDate"
                          :disabled="disabled"
                          type="date"
                          format="yyyy年MM月dd日"
                          value-format="yyyy-MM-dd"
                          placeholder="请选择享受补贴时间"
                          clearable
                          style="width:100%;"
                          @change="pickData"
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
                            :disabled="disabled"
                            max-length="10"
                            @keyup.enter.native="editContent"
                            @keyup.native="transformNumber(scope.row.subsidyMoney,'subsidyMoney',scope.$index)"
                          />
                          <el-select
                            v-model="scope.row.subsidyUnit"
                            placeholder="请选择"
                            clearable
                            :disabled="disabled"
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
                        <span />
                        <span v-if="scope.row.subsidyUnit=='hour/month'">时/月</span>
                        <span v-if="scope.row.subsidyUnit=='yuan/month'">元/月</span>
                        <span v-if="scope.row.subsidyUnit=='yuan/year'">元/年</span>
                        <span v-if="scope.row.subsidyUnit=='yuan/time'">元/次</span>
                        <span v-if="scope.row.subsidyUnit=='yuan/quarter'">元/季度</span>
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
            <el-button type="warning" class="base-btn btnMarginLeft15" @click="tabsStep('label')">下一步</el-button>
          </div>
          <div v-else-if="this.activeTabs === 'label'">
            <el-button type="warning" class="base-btn btnMarginLeft15" @click="tabsStep('base')">上一步</el-button>
            <el-button class="cancel-btn btnMarginLeft15" @click="cancelDetailsPage">取消</el-button>
            <el-button type="warning" class="base-btn btnMarginLeft15" @click="editContent('form_base')">确定</el-button>
          </div>
        </div>
        <div v-else>
          <!-- <el-button v-if="editAuthority==true&&hasEdit==true" type="warning" class="base-btn" @click="toEditType">编辑</el-button> -->
          <el-button v-if="editAuthority&&data.accountType==='3'&& data.assistiveRentType!=null" type="warning" class="base-btn" @click="toEditType">编辑</el-button>
          <el-button class="cancel-btn" @click="closeDetailsPage">返回</el-button>
        </div>
      </el-footer>
    </el-main>
  </el-container>
</template>

<script>
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
import { transformNumber } from '@/utils/index'
import { saveOrderObj, getOrderObj } from '@/api/serverManagement/projectManagement'
import { mapGetters } from 'vuex'

export default {
  components: { Address },
  data() {
    const verifycensusAreaCode = (rule, value, callback) => {
      if (this.liveCode2.length === 0 || this.liveCode2 === '') {
        callback(new Error('服务行政区划不能为空！'))
      } else {
        callback()
      }
    }
    return {
      hasEdit: false,
      props: { multiple: true, checkStrictly: true },
      // 表单只能输入数字
      dataList: [
        {
          id: '',
          subsidyDate: '',
          subsidyElementName: '居家养老补贴',
          subsidyMoney: '',
          subsidyTitleName: '养老补贴',
          subsidyUnit: '',
          subsidyRemark: ''
        }
      ],
      disabled: false,
      SubsidyOption: [], // 助餐补贴单位
      SubsidyOption1: [], // 农村奖单位i
      // 单位
      companyOptions: [],
      gradeOptions: [],
      homeCarOptions: [],
      // 优抚
      preferOptions: [],
      employmentOptions: [], // 就业情况
      medicalOptions: [], // 医疗
      pensionOptions: [], // 养老
      // tableRowIndex: '',//当前编辑的表格行号
      isEditForm: true, // 页面表单是否可编辑操作。查看时：false,编辑-新增时：true
      idEdit: true, // 区域级联下拉框是编辑时还是新增时。编辑时：false,新增时：true
      // 下拉框的数据
      sexOptions: [], // 性别
      nationOptions: [], // 民族
      maritalStatusOptions: [], // 婚姻状况
      politicalOptions: [], // 政治面貌
      educationOptions: [], // 文化程度
      residenceTypeOptions: [], // 户口性质
      populationTypeOptions: [], // 人口类别
      statusOptions: [], // 老人状态
      ageLevelOptions: [], // 年龄分类
      liveStatusOptions: [], // 居住情况
      censusStatusOptions: [], // 户籍情况
      relationOptions: [],
      // 表单
      form: {
        id: '', // 当前用户id
        idCard: '', // 身份证
        fullName: '', // 姓名
        sex: '', // 性别
        sexName: '', // 性别（纯文本）
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
        residenceTypeName: '', // 户口性质（纯文本）
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
        censusAddr: '',
        censusArea: '',
        censusAreaCodeLevel: '',
        censusAreaCodeLevelName: '',
        liveAddr: '',
        serviceAddr: '',
        liveArea: '',
        serviceArea: '',
        liveAreaCodeLevel: '',
        serviceAreaCodeLevel: '',
        serviceAreaCodeLevelName: '',
        liveAreaCodeLevelName: '',
        contact: [], // 联系人
        remark: '', // 备注
        personSubsidyInfoList: []
      },
      // 养老补贴
      PensionList: [
        {
          id: '',
          subsidyDate: '',
          subsidyElementName: '居家养老补贴',
          subsidyMoney: '',
          subsidyTitleName: '养老补贴',
          subsidyUnit: 'yuan/month',
          subsidyRemark: ''
        }
      ],
      // 表格当前操作行的数据
      activeRowData: null,
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
        serviceArea: [{ required: true, trigger: 'change', validator: verifycensusAreaCode }],
        serviceAddr: [
          { required: true, message: '请输入服务详细地址', trigger: 'blur' },
          { max: 50, trigger: 'blur', message: '详细地址长度不能超过50字，请重新输入' }
        ],
        censusAddr: [
          { max: 50, trigger: 'blur', message: '详细地址长度不能超过50字，请重新输入' }
        ],
        liveAddr: [
          { max: 50, trigger: 'blur', message: '详细地址长度不能超过50字，请重新输入' }
        ],
        // 家庭电话
        homePhone: [
          { trigger: 'MANUAL_TRIGGER', validator: verifyHomePhone }
        ],
        // 手机号码
        mobile: [
          { trigger: 'blur', validator: verifyMobile }
        ],
        address: [
          { trigger: 'blur', max: 50, message: '详细地址长度不得超过50个字符，请重新输入！' }
        ],
        // 联系人--姓名
        contactName: [
          { required: true, trigger: 'blur', message: '姓名不能为空！' },
          { trigger: 'blur', validator: verifyFullName }
        ],
        // 联系人--家庭电话
        contactHomePhone: [
          { trigger: 'MANUAL_TRIGGER', validator: verifyHomePhone }
        ],
        // 联系人--手机号码
        contactMobile: [
          { trigger: 'blur', validator: verifyMobile }
        ],
        // 联系人--地址
        contactAddress: [
          {
            trigger: 'blur', min: 0, max: 50,
            message: '长度不得超过50个字符！'
          }
        ],
        subsidyMoney: [
          {
            trigger: 'blur', pattern: /^(\d{1,9}(\.\d{1,2})?1000000000)$/, message: '请输入正确格式！'
          }
        ]
      },
      disabled: false, // 表单是否可编辑
      activeTabs: 'base', // tab标签切换默认选中name参数
      activeCollapse: ['baseItem_1', 'baseItem_2', 'baseItem_3', 'baseItem_4', 'baseItem_5', 'baseItem_7', 'baseItem_8', , 'baseItem_9'], // 折叠面板默认打开name参数
      areaCodeOptions: [], // 行政区域树节点数据
      defaultProps: {
        children: 'children',
        label: 'areaName',
        value: 'areaCode'
      },
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
      liveCode2: [],
      liveCode: [],
      modelType: '', // 查看：look  编辑：edit  新增：add
      editAuthority: false,
      gitSubsidy: []
    }
  },
  computed: {
    ...mapGetters([
      'data'
    ])
  },
  watch: {
    'form.birthday': function(val, oldVal) {
      if (val) {
        this.form.age = computerAge(this.form.birthday) + '岁'
        if (parseInt(this.form.age) >= 80 && parseInt(this.form.age) <= 99) {
          this.form.personProperty.ageLevel = '300'
        } else if (parseInt(this.form.age) >= 100) {
          this.form.personProperty.ageLevel = '100'
        }
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
      getOrderObj(_userId_).then(response => {
        this.formatData(response.data, 2)
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
    pickData(value) {
    },
    transformNumber(value, obj, index) {
      this.dataList = this.PensionList
      this.dataList[index][obj] = transformNumber(value)
      this.$set(this.PensionList, index, this.dataList[index])
    },
    // 异步事件同步化
    async getData(id) {
      if (this.modelType === 'edit') {
        this.disabled = true
        await this.editGetData(id)
      } else if (this.modelType === 'add') {
        this.idEdit = false
      }
    },
    // 编辑获取数据
    editGetData(id) {
      return new Promise((resolve, reject) => {
        // 请求当前用户信息
        getOrderObj(id).then(response => {
          this.idEdit = false
          this.formatData(response.data, 2)
        }).catch(() => {
          this.$message.error('获取用户信息失败！')
        })
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
        'biz_age_level', // 年龄类别
        'biz_live_status', // 居住情况
        'biz_old_person_status', // 老人状态
        'biz_census_status', // 户籍情况
        'medical_insurance', // 医疗保险
        'job_status', // 就业
        'home_unit',
        'endowment_insurance' // 养老保险
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
              case 'biz_marital_status':
                this.maritalStatusOptions = dict[key]
                break
              case 'politics_status':
                this.politicalOptions = dict[key]
                break
              case 'edu_level':
                this.educationOptions = dict[key]
                break
              case 'biz_residence_type':
                this.residenceTypeOptions = dict[key]
                break
              case 'people_category':
                this.populationTypeOptions = dict[key]
                this.form.populationType = 'p_this city'
                break
              case 'biz_age_level':
                this.ageLevelOptions = dict[key]
                break
              case 'biz_live_status':
                this.liveStatusOptions = dict[key]
                break
              case 'biz_census_status':
                this.censusStatusOptions = dict[key]
                break
              case 'biz_old_person_status':
                this.statusOptions = dict[key]
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
    // ================添加表格行数据============
    addTableRow() {
      if (this.form.contact.length >= 3) {
        this.$message.warning('联系人数量最多添加3条！')
        return false
      }
      // if (this.disabled) {
      //   return false
      // }
      this.flag = true// 添加时的取消按钮
      const rowData = {
        address: '',
        contactsName: '',
        edit: true,
        homePhone: '',
        id: '',
        isDefault: 'N',
        isDefaultName: '否',
        mobile: '',
        personId: '',
        relation: '',
        relationName: '',
        sex: '',
        sexName: '',
        rowIndex: Math.random() * 100000000000000000 + ''
      }
      this.form.contact.push(rowData)
    },
    // ===============操作（删除）=================
    tableOperation(row, index) {
      // if (this.disabled) {
      //   return false
      // }
      // 删除
      this.$confirm('是否确认删除该联系人?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.form.contact.splice(index, 1)
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
    getAreaCode_live2(val) {
      this.liveCode2 = val
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
    // 联系人-家庭电话输入框失去焦点
    handleContactHomePhoneBlur(index) {
      const field = 'contact.' + index + '.homePhone'
      this.$refs['form_contact'].validateField(field, (message) => {
        const valid = message == ''
        if (!valid) {
          this.$message.warning(
            '家庭电话格式例如:123-12345678或1234-1234567或1234-12345678')
        }
      })
    },
    // 确定按钮-提交form表单
    editContent() {
      const formRefs = ['form_base', 'form_address', 'form_contact'].map(key => this.$refs[key])
      validateForms(formRefs).then(() => {
        const noPhoneContacts = this.form.contact.filter(i => i.homePhone == '' && i.mobile == '')
        if (noPhoneContacts.length > 0) {
          scrollToEl(this.$refs['contact.0.homePhone'].$el)
          this.activeTabs = 'base'
          return this.$message.error('联系人的家庭电话或者手机号码必须至少填写一项！')
        }
        const defaultContacts = this.form.contact.filter(i => i.isDefault === 'Y')
        if (this.form.contact.length > 0 && defaultContacts.length !== 1) {
          scrollToEl(this.$refs['form_contact'].$el)
          this.activeTabs = 'base'
          return this.$message.error('请设置一位默认联系人！')
        }
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
        if (this.liveCode2 && this.liveCode2.length) {
          _form.serviceArea = this.liveCode2[this.liveCode2.length - 1] + ''
        } else {
          _form.serviceArea = ''
        }
        if (_form.birthday === '') {
          _form.birthday = 'null'
        }
        // 数据处理
        const regs = /^[0-9]*$/
        let arrList = []
        this.PensionList.forEach(item => {
          if (item.subsidyMoney != '' && item.subsidyMoney != null || item.subsidyDate != '' && item.subsidyDate != null || item.id != null && item.id != '') {
            arrList.push(item)
          }
        })
        _form.personSubsidyInfoList = arrList
        // 新增
        // if (this.modelType === 'add' && !this.form.id) {
        if (this.modelType === 'add') {
          _form.id = ''
          saveOrderObj(_form).then(response => {
            if (response.code === 0) {
              this.$message({
                type: 'success',
                message: '新增服务对象保存成功!'
              })
              // 关闭页面
              this.closeDetailsPage()
            } else {
              this.$message.error('新增服务对象操作失败，失败原因是：' + response.msg)
              this.activeTabs = 'base'
              this.disabled = false
            }
          }).catch(() => {
            this.$message.error('新增服务对象操作失败!')
            this.disabled = false
          })
        }
        // 编辑
        // else if (this.modelType === 'edit' || (this.modelType === 'add' && this.form.id)) {
        // if (this.modelType === 'add' && this.form.id) {
        //   _form.id = ''
        // }
        else if (this.modelType === 'edit') {
          saveOrderObj(_form).then(response => {
            arrList = []
            if (response.code === 0) {
              this.$message({
                type: 'success',
                message: '编辑服务计划保存成功!'
              })
              // 关闭页面
              this.closeDetailsPage()
            } else {
              this.$message.error('编辑服务计划操作失败，失败原因是：' + response.msg)
            }
          }).catch(() => {
            arrList = []
            this.$message.error('编辑服务计划操作失败!')
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
      this.$router.push('/serverManagement/orderManagement/servicePlan')
    },
    // 查看详情页面，点击编辑按钮

    toEditType() {
      this.$router.push({
        path: `/orderManagement/servicePlan/details/${this.form.id}`,
        query: { 'modelType': 'edit', '_title': `编辑${this.form.fullName}`, 'menu': this.$route.meta.id }
      })
    },
    // 选择日期
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
    // 默认联系人
    changeSwitch(rowIndex, e) {
      this.form.contact.forEach(item => {
        if (item.rowIndex === rowIndex) {
          item.isDefault = e.isDefault === 'N' ? 'N' : 'Y'
          item.isDefaultName = e.isDefault === 'N' ? '否' : '是'
        } else {
          item.isDefault = 'N'
          item.isDefaultName = '否'
        }
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
            // if (this.form.id) {
            //   this.idEdit = false // 触发Address组件更新
            //   this.resetForm()
            // } else {
            //   this.form.birthday = ''
            // }
            // this.idEdit = false // 触发Address组件更新
            // this.resetForm()
          }
        }
      })
    },
    // 重置所有表单
    resetForm() {
      // this.form.id = ''
      this.areaCode = []
      this.liveCode2 = []
      this.form.contact = []
      this.$refs.form_base.resetFields()
      this.$refs.form_remark.resetFields()
      this.$refs.form_address.resetFields()
      this.PensionList = [
        {
          id: '',
          subsidyDate: '',
          subsidyElementName: '居家养老补贴',
          subsidyMoney: '',
          subsidyTitleName: '养老补贴',
          subsidyUnit: '',
          subsidyRemark: ''
        }
      ],
      this.idEdit = false
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
            this.resetForm()
            this.idEdit = true // 触发Address组件更新
            this.disabled = true
            this.formatData(response, 1)
          }).catch(err => {
            this.form.idCard = ''
          })
        }
      }).catch(error => {
        this.$message.error('身份证载入数据接口请求失败！')
      })
    },
    // 处理接口数据供表单使用
    formatData(response, num) {
      for (const key in this.form) {
        if (!['contact'].includes(key)) {
          this.form[key] = response[key]
        }
      }
      this.form.censusArea = response.censusAreaCodeLevel != null && response.censusAreaCodeLevel != '' ? response.censusAreaCodeLevel.split(',') : []
      this.form.liveArea = response.liveAreaCodeLevel != null && response.liveAreaCodeLevel != '' ? response.liveAreaCodeLevel.split(',') : []
      this.form.serviceArea = response.serviceAreaCodeLevel != null && response.serviceAreaCodeLevel != '' ? response.serviceAreaCodeLevel.split(',') : []
      if (response.contact && Array.isArray(response.contact)) {
        // 添加rowIndex
        response.contact.forEach(item => {
          item.rowIndex = Math.random() * 100000000000000000 + ''
        })
        // 默认联系人排在最前面
        response.contact.sort((itemA, itemB) => {
          if (itemA.isDefault > itemB.isDefault) { // 字符串 'Y' 与 'N' 的比较
            return -1
          } else if (itemA.isDefault < itemB.isDefault) {
            return 1
          } else {
            return 0
          }
        })
        this.form.contact = response.contact
      }
      if (!this.form.birthday) {
        this.form.birthday = getBirthdayFromIdCard(this.form.idCard)
      }
      if (response.personSubsidyInfoList.length) {
        const PensionList = []
        response.personSubsidyInfoList.forEach(item => {
          if (item.subsidyTitleName == '养老补贴') {
            PensionList.push(item)
          }
        })
        this.PensionList.forEach(item => {
          PensionList.forEach(items => {
            if (item.subsidyElementName == items.subsidyElementName) {
              item.subsidyMoney = items.subsidyMoney
              item.subsidyUnit = items.subsidyUnit
              item.id = num == '1' ? '' : items.id
              item.subsidyDate = items.subsidyDate
            }
          })
        })
        this.dataList = _.cloneDeep(this.PensionList)
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
