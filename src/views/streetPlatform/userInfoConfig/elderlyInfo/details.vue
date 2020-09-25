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
                        disabled
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
                        :disabled="disabled"
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
                        :disabled="disabled"
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
                      prop="address[0].areaCode"
                    >
                      <Address
                        v-if="isEditForm"
                        :id-edit="idEdit"
                        :area-code="areaCode[0]"
                        :form-code="form.address[0].areaCode"
                        :width="'100%'"
                        @getAreaCode="getAreaCode_reg"
                        @keyup.enter.native="editContent"
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
                        @keyup.enter.native="editContent"
                      />
                      <span v-else>{{ form.address[0].address?form.address[0].address : '' }}</span>
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
                        @keyup.enter.native="editContent"
                      />
                      <span v-else>{{ form.address[1] ? form.address[1].areaCodeName : '' }}</span>
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
                        @keyup.enter.native="editContent"
                      />
                      <span v-else>{{ form.address[1] ? form.address[1].address : '' }}</span>
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
                    v-if="isEditForm"
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

              <div v-if="isEditForm" class="addBtnDiv">
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
        <!--标签信息tabs start-->
        <el-tab-pane label="标签信息" name="label">
          <el-collapse v-model="activeCollapse">
            <!--老人标签item start-->
            <el-collapse-item name="baseItem_1">
              <template slot="title">
                <div class="titleSlider">
                  <span>
                    <i class="titleTip" />老人标签
                  </span>
                </div>
              </template>
              <el-form
                ref="form_tag1"
                :model="form"
                :rules="isEditForm?rulesForm:null"
                label-width="120px"
              >
                <el-row :gutter="0">
                  <el-col :md="adaptiveGrid.md" :lg="adaptiveGrid.lg">
                    <el-form-item
                      :label="isEditForm?'年龄分类':'年龄分类：'"
                      prop="personProperty.ageLevel"
                    >
                      <el-select
                        v-if="isEditForm"
                        v-model="form.personProperty.ageLevel"
                        placeholder="请选择年龄类别"
                        clearable
                        style="width:100%;"
                        @keyup.enter.native="editContent"
                      >
                        <el-option
                          v-for="(item, index) in ageLevelOptions"
                          :key="index"
                          :label="item.dictLabel"
                          :value="item.dictValue"
                        />
                      </el-select>
                      <span v-else>{{ form.personProperty.ageLevelName }}</span>
                    </el-form-item>
                  </el-col>
                  <el-col :md="adaptiveGrid.md" :lg="adaptiveGrid.lg">
                    <el-form-item
                      :label="isEditForm?'居住情况':'居住情况：'"
                      prop="personProperty.liveStatus"
                    >
                      <el-select
                        v-if="isEditForm"
                        v-model="form.personProperty.liveStatus"
                        placeholder="请选择居住情况"
                        clearable
                        style="width:100%;"
                        @keyup.enter.native="editContent"
                      >
                        <el-option
                          v-for="item in liveStatusOptions"
                          :key="item.dictValue"
                          :label="item.dictLabel"
                          :value="item.dictValue"
                        />
                      </el-select>
                      <span v-else>{{ form.personProperty.liveStatusName }}</span>
                    </el-form-item>
                  </el-col>
                  <el-col :md="adaptiveGrid.md" :lg="adaptiveGrid.lg">
                    <el-form-item :label="isEditForm?'养老方式':'养老方式：'" prop="personProperty.pensionMode">
                      <el-select
                        v-if="isEditForm"
                        v-model="form.personProperty.pensionMode"
                        placeholder="请选择养老方式"
                        clearable
                        style="width:100%;"
                        @keyup.enter.native="editContent"
                      >
                        <el-option
                          v-for="item in pensionModeOptions"
                          :key="item.dictValue"
                          :label="item.dictLabel"
                          :value="item.dictValue"
                        />
                      </el-select>
                      <span v-else>{{ form.personProperty.pensionModeName }}</span>
                    </el-form-item>
                  </el-col>
                  <!-- <el-col :md="adaptiveGrid.md" :lg="adaptiveGrid.lg">
                    <el-form-item
                      :label="isEditForm?'评估类型':'评估类型：'"
                      prop="personProperty.assessType"
                    >
                      <el-cascader v-if="isEditForm" v-model="form.personProperty.assessType" style="width:100%" :options="assessTypeOptions" clearable />
                      <span v-else>{{ form.personProperty.assessTypeName }}  {{ form.personProperty.assessLevelName }}</span>
                    </el-form-item>
                  </el-col> -->
                  <el-col :md="adaptiveGrid.md" :lg="adaptiveGrid.lg">
                    <el-form-item :label="isEditForm?'长护险评估':'长护险评估：'" prop="personProperty.assessLevel">
                      <el-select
                        v-if="isEditForm"
                        v-model="form.personProperty.assessLevel"
                        placeholder="请选择长护险评估"
                        clearable
                        style="width:100%;"
                        @keyup.enter.native="editContent"
                      >
                        <el-option
                          v-for="item in gradeOptions"
                          :key="item.dictValue"
                          :label="item.dictLabel"
                          :value="item.dictValue"
                        />
                      </el-select>
                      <span v-else>{{ form.personProperty.assessLevelName }}</span>
                    </el-form-item>
                  </el-col>
                  <el-col :md="adaptiveGrid.md" :lg="adaptiveGrid.lg">
                    <el-form-item :label="isEditForm?'居家养老评估':'居家养老评估：'" prop="isHomeCare">
                      <el-select
                        v-if="isEditForm"
                        v-model="form.isHomeCare"
                        placeholder="请选择居家养老评估"
                        clearable
                        style="width:100%;"
                        @keyup.enter.native="editContent"
                      >
                        <el-option
                          v-for="item in homeCarOptions"
                          :key="item.dictValue"
                          :label="item.dictLabel"
                          :value="item.dictValue"
                        />
                      </el-select>
                      <span v-else>{{ form.isHomeCareName }}</span>
                    </el-form-item>
                  </el-col>
                  <el-col :md="adaptiveGrid.md" :lg="adaptiveGrid.lg">
                    <el-form-item :label="isEditForm?'养老辅助':'养老辅助：'" prop="personProperty.pensionAssist">
                      <el-select
                        v-if="isEditForm"
                        v-model="form.personProperty.pensionAssist"
                        placeholder="请选择养老辅助"
                        clearable
                        style="width:100%;"
                        @keyup.enter.native="editContent"
                      >
                        <el-option
                          v-for="item in pensionAssistOptions"
                          :key="item.dictValue"
                          :label="item.dictLabel"
                          :value="item.dictValue"
                        />
                      </el-select>
                      <span v-else>{{ form.personProperty.pensionAssistName }}</span>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-form>
            </el-collapse-item>
            <el-collapse-item v-if="isShow2" name="baseItem_2">
              <template slot="title">
                <div class="titleSlider">
                  <span>
                    <i class="titleTip" />残疾标签
                  </span>
                </div>
              </template>
              <el-form
                ref="form_tag2"
                :model="form"
                :rules="isEditForm?rulesForm:null"
                label-width="120px"
              >
                <el-row :gutter="0">
                  <el-col :md="adaptiveGrid.md" :lg="adaptiveGrid.lg">
                    <el-form-item :label="isEditForm?'二代残疾证号':'二代残疾证号：'" prop="bizDeformityPropertyVo.defoCode">
                      <el-input
                        v-if="isEditForm"
                        v-model="form.bizDeformityPropertyVo.defoCode"
                        clearable
                        placeholder="请输入残疾证号"
                        @keyup.enter.native="editContent"
                      />
                      <span v-else>{{ form.bizDeformityPropertyVo.defoCode }}</span>
                    </el-form-item>
                  </el-col>
                  <el-col :md="adaptiveGrid.md" :lg="adaptiveGrid.lg">
                    <el-form-item
                      :label="isEditForm?'残疾类别':'残疾类别：'"
                      prop="bizDeformityPropertyVo.defoType"
                    >
                      <el-cascader v-if="isEditForm" v-model="form.bizDeformityPropertyVo.defoType" style="width:100%" :props="props" :options="deformityTypeOptions" clearable @change="changeDisable" />
                      <!-- <span v-else>{{ form.bizDeformityPropertyVo.assessTypeName }}  {{ form.bizDeformityPropertyVo.assessLevelName }}</span> -->
                      <span v-else>{{ form.bizDeformityPropertyVo.defoTypeName }}</span>
                    </el-form-item>
                  </el-col>
                  <el-col :md="adaptiveGrid.md" :lg="adaptiveGrid.lg">
                    <el-form-item
                      :label="isEditForm?'残疾人员类别':'残疾人员类别：'"
                      prop="bizDeformityPropertyVo.category"
                    >
                      <el-select
                        v-if="isEditForm"
                        v-model="form.bizDeformityPropertyVo.category"
                        placeholder="请选择残疾人员类别"
                        clearable
                        style="width:100%;"
                        @keyup.enter.native="editContent"
                      >
                        <el-option
                          v-for="(item, index) in categoryOptions"
                          :key="index"
                          :label="item.dictLabel"
                          :value="item.dictValue"
                        />
                      </el-select>
                      <span v-else>{{ form.bizDeformityPropertyVo.categoryName }}</span>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-form>
            </el-collapse-item>
            <el-collapse-item v-if="isShow3" name="baseItem_3">
              <template slot="title">
                <div class="titleSlider">
                  <span>
                    <i class="titleTip" />救助标签
                  </span>
                </div>
              </template>
              <el-form
                ref="form_tag3"
                :model="form"
                :rules="isEditForm?rulesForm:null"
                label-width="130px"
              >
                <el-row :gutter="0">
                  <el-col :md="adaptiveGrid.md" :lg="adaptiveGrid.lg">
                    <el-form-item :label="isEditForm?'救助类别':'救助类别：'" prop="bizHelpPropertityVo.category">
                      <el-select
                        v-if="isEditForm"
                        v-model="form.bizHelpPropertityVo.category"
                        multiple
                        placeholder="请选择救助类别"
                        clearable
                        style="width:100%;"
                        @keyup.enter.native="editContent"
                      >
                        <el-option
                          v-for="item in categoryOptions1"
                          :key="item.dictValue"
                          :label="item.dictLabel"
                          :value="item.dictValue"
                        />
                      </el-select>
                      <span v-else>{{ form.bizHelpPropertityVo.categoryName }}</span>
                    </el-form-item>
                  </el-col>

                  <el-col :md="adaptiveGrid.md" :lg="adaptiveGrid.lg">
                    <el-form-item
                      :label="isEditForm?'家庭类别':'家庭类别：'"
                      prop="bizHelpPropertityVo.familyType"
                    >
                      <el-select
                        v-if="isEditForm"
                        v-model="form.bizHelpPropertityVo.familyType"
                        placeholder="请选择家庭类别"
                        clearable
                        style="width:100%;"
                        @keyup.enter.native="editContent"
                      >
                        <el-option
                          v-for="(item, index) in familyTypeOptions"
                          :key="index"
                          :label="item.dictLabel"
                          :value="item.dictValue"
                        />
                      </el-select>
                      <span v-else>{{ form.bizHelpPropertityVo.familyTypeName }}</span>
                    </el-form-item>
                  </el-col>
                  <el-col :md="adaptiveGrid.md" :lg="adaptiveGrid.lg">
                    <el-form-item :label="isEditForm?'家庭人数':'家庭人数：'" prop="bizHelpPropertityVo.familyNum">
                      <el-input
                        v-if="isEditForm"
                        v-model="form.bizHelpPropertityVo.familyNum"
                        clearable
                        placeholder="请输入家庭人数"
                        @keyup.enter.native="editContent"
                      />
                      <span v-else>{{ form.bizHelpPropertityVo.familyNum }}</span>
                    </el-form-item>
                  </el-col>
                  <el-col :md="adaptiveGrid.md" :lg="adaptiveGrid.lg">
                    <el-form-item
                      :label="isEditForm?'是否覆盖对象':'是否覆盖对象：'"
                      prop="bizHelpPropertityVo.defoCode"
                    >
                      <el-select
                        v-if="isEditForm"
                        v-model="form.bizHelpPropertityVo.defoCode"
                        placeholder="请选择是否覆盖对象"
                        clearable
                        style="width:100%;"
                        @keyup.enter.native="editContent"
                      >
                        <el-option
                          v-for="(item, index) in defoCodeOptions"
                          :key="index"
                          :label="item.dictLabel"
                          :value="item.dictValue"
                        />
                      </el-select>
                      <span v-else>{{ form.bizHelpPropertityVo.defoCodeName }}</span>
                    </el-form-item>
                  </el-col>
                  <el-col :md="adaptiveGrid.md" :lg="adaptiveGrid.lg">
                    <el-form-item
                      :label="isEditForm?'家庭人均月收入':'家庭人均月收入：'"
                      prop="bizHelpPropertityVo.defoCode"
                    >
                      <el-select
                        v-if="isEditForm"
                        v-model="form.bizHelpPropertityVo.monthlyCapita"
                        placeholder="请选择家庭人均月收入"
                        clearable
                        style="width:100%;"
                        @keyup.enter.native="editContent"
                      >
                        <el-option
                          v-for="(item, index) in familyOptions"
                          :key="index"
                          :label="item.dictLabel"
                          :value="item.dictValue"
                        />
                      </el-select>
                      <span v-else>{{ form.bizHelpPropertityVo.monthlyCapitaName }}</span>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-form>
            </el-collapse-item>
            <el-collapse-item v-if="isShow4" name="baseItem_4">
              <template slot="title">
                <div class="titleSlider">
                  <span>
                    <i class="titleTip" />优抚标签
                  </span>
                </div>
              </template>
              <el-form
                ref="form_tag4"
                :model="form"
                :rules="isEditForm?rulesForm:null"
                label-width="120px"
              >
                <el-row :gutter="0">
                  <el-col :md="adaptiveGrid.md" :lg="adaptiveGrid.lg">
                    <el-form-item :label="isEditForm?'退役证号':'退役证号：'" prop="bizPreferentialPropertityVo.retireCode">
                      <el-input
                        v-if="isEditForm"
                        v-model="form.bizPreferentialPropertityVo.retireCode"
                        clearable
                        placeholder="请输入残疾证号"
                        @keyup.enter.native="editContent"
                      />
                      <span v-else>{{ form.bizPreferentialPropertityVo.retireCode }}</span>
                    </el-form-item>
                  </el-col>
                  <el-col :md="adaptiveGrid.md" :lg="adaptiveGrid.lg">
                    <el-form-item :label="isEditForm?'入伍时间':'入伍时间:'" prop="bizPreferentialPropertityVo.entryTime">
                      <el-date-picker
                        v-if="isEditForm"
                        v-model="form.bizPreferentialPropertityVo.entryTime"
                        type="date"
                        format="yyyy年MM月dd日"
                        value-format="yyyy-MM-dd"
                        placeholder="请选择入伍时间"
                        clearable
                        style="width:100%;"
                      />
                      <span v-else>{{ form.bizPreferentialPropertityVo.entryTime }}</span>
                    </el-form-item>
                  </el-col>
                  <el-col :md="adaptiveGrid.md" :lg="adaptiveGrid.lg">
                    <el-form-item :label="isEditForm?'退伍时间':'退伍时间:'" prop="bizPreferentialPropertityVo.retireTime">
                      <el-date-picker
                        v-if="isEditForm"
                        v-model="form.bizPreferentialPropertityVo.retireTime"
                        type="date"
                        format="yyyy年MM月dd日"
                        value-format="yyyy-MM-dd"
                        placeholder="请选择退伍时间"
                        clearable
                        style="width:100%;"
                      />
                      <span v-else>{{ form.bizPreferentialPropertityVo.retireTime }}</span>
                    </el-form-item>
                  </el-col>
                  <el-col :md="adaptiveGrid.md" :lg="adaptiveGrid.lg">
                    <el-form-item
                      :label="isEditForm?'优抚类别':'优抚类别：'"
                      prop="bizPreferentialPropertityVo.preferType"
                    >
                      <el-select
                        v-if="isEditForm"
                        v-model="form.bizPreferentialPropertityVo.preferType"
                        multiple
                        placeholder="请选择优抚类别"
                        clearable
                        style="width:100%;"
                        @keyup.enter.native="editContent"
                      >
                        <el-option
                          v-for="(item, index) in preferOptions"
                          :key="index"
                          :label="item.dictLabel"
                          :value="item.dictValue"
                        />
                      </el-select>
                      <span v-else>{{ form.bizPreferentialPropertityVo.preferTypeName }}</span>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-form>
            </el-collapse-item>
            <el-collapse-item v-if="isShow10" name="baseItem_5">
              <template slot="title">
                <div class="titleSlider">
                  <span>
                    <i class="titleTip" />计生标签
                  </span>
                </div>
              </template>
              <el-form
                ref="form_tag4"
                :model="form"
                :rules="isEditForm?rulesForm:null"
                label-width="130px"
              >
                <el-row :gutter="0">
                  <el-col :md="adaptiveGrid.md" :lg="adaptiveGrid.lg">
                    <el-form-item :label="isEditForm?'计生家庭':'计生家庭：'" prop="bizPlanBirthPropertityVo.pbFamilyType">
                      <el-select
                        v-if="isEditForm"
                        v-model="form.bizPlanBirthPropertityVo.pbFamilyType"
                        placeholder="请选择计生家庭"
                        clearable
                        style="width:100%;"
                        @keyup.enter.native="editContent"
                      >
                        <el-option
                          v-for="item in birthControlFamily"
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
                        placeholder="请选择计生补助"
                        clearable
                        style="width:100%;"
                        @keyup.enter.native="editContent"
                      >
                        <el-option
                          v-for="item in birthControlSubsidy"
                          :key="item.dictValue"
                          :label="item.dictLabel"
                          :value="item.dictValue"
                        />
                      </el-select>
                      <span v-else>{{ form.bizPlanBirthPropertityVo.pbSubTypeName }}</span>
                    </el-form-item>
                  </el-col>
                  <el-col :md="adaptiveGrid.md" :lg="adaptiveGrid.lg">
                    <el-form-item :label="isEditForm?'家庭医生':'家庭医生：'" prop="bizHelpPropertityVo.familyDoctor">
                      <el-input
                        v-if="isEditForm"
                        v-model="form.bizPlanBirthPropertityVo.familyDoctor"
                        clearable
                        placeholder="请输入家庭医生"
                        @keyup.enter.native="editContent"
                      />
                      <span v-else>{{ form.bizPlanBirthPropertityVo.familyDoctor }}</span>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-form>
            </el-collapse-item>
            <!--老人标签item end-->
          </el-collapse>
        </el-tab-pane>
        <el-tab-pane label="补贴信息" name="subsidy">
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
                            max-length="10"
                            @keyup.enter.native="editContent"
                            @keyup.native="transformNumber(scope.row.subsidyMoney,'subsidyMoney',scope.$index)"
                          />
                          <el-select
                            v-if="scope.row.subsidyElementName!='长护险补贴'"
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
                          <el-select
                            v-else
                            v-model="scope.row.subsidyUnit"
                            placeholder="请选择"
                            clearable
                            @keyup.enter.native="editContent"
                          >
                            <el-option
                              v-for="item in companyOptions2"
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
                      </span>
                    </template>
                  </el-table-column>
                </el-table>
              </el-form>
            </el-collapse-item>
            <el-collapse-item v-if="isShow6" name="baseItem_2">
              <template slot="title">
                <div class="titleSlider">
                  <span>
                    <i class="titleTip" />救助补贴
                  </span>
                </div>
              </template>
              <el-form :model="form">
                <el-table :data="SalvageList" style="width: 100%">
                  <el-table-column label="补贴名称" prop="subsidyElementName" />
                  <el-table-column label="何时享受补贴">
                    <template slot-scope="scope">
                      <el-form-item v-if="isEditForm">
                        <el-date-picker
                          v-if="isEditForm"
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
                            @keyup.enter.native="editContent"
                            @keyup.native="transformNumber1(scope.row.subsidyMoney,'subsidyMoney',scope.$index)"
                          />
                          <el-select
                            v-if="scope.row.subsidyElementName!='支内回沪补贴'"
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
                          <el-select
                            v-else
                            v-model="scope.row.subsidyUnit"
                            placeholder="请选择"
                            clearable
                            @keyup.enter.native="editContent"
                          >
                            <el-option
                              v-for="item in companyOptions3"
                              :key="item.dictValue + Math.random()"
                              :label="item.dictLabel"
                              :value="item.dictValue"
                            />
                          </el-select>
                        </div>
                      </el-form-item>
                      <span v-else>
                        <span>{{ scope.row.subsidyMoney }}</span>
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
            <el-collapse-item v-if="isShow7" name="baseItem_3">
              <template slot="title">
                <div class="titleSlider">
                  <span>
                    <i class="titleTip" />残疾补贴
                  </span>
                </div>
              </template>
              <el-form :model="form">
                <el-table :data="DisabilityList" style="width: 100%">
                  <el-table-column label="补贴名称" prop="subsidyElementName" />
                  <el-table-column label="何时享受补贴">
                    <template slot-scope="scope">
                      <el-form-item v-if="isEditForm">
                        <el-date-picker
                          v-if="isEditForm"
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
                            @keyup.enter.native="editContent"
                            @keyup.native="transformNumber2(scope.row.subsidyMoney,'subsidyMoney',scope.$index)"
                          />
                          <el-select
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
            <el-collapse-item v-if="isShow8" name="baseItem_4">
              <template slot="title">
                <div class="titleSlider">
                  <span>
                    <i class="titleTip" />优抚补贴
                  </span>
                </div>
              </template>
              <el-form :model="form">
                <el-table :data="PreferentialList" style="width: 100%">
                  <el-table-column label="补贴名称" prop="subsidyElementName" />
                  <el-table-column label="何时享受补贴">
                    <template slot-scope="scope">
                      <el-form-item v-if="isEditForm">
                        <el-date-picker
                          v-if="isEditForm"
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
                            @keyup.enter.native="editContent"
                            @keyup.native="transformNumber3(scope.row.subsidyMoney,'subsidyMoney',scope.$index)"
                          />
                          <el-select
                            v-model="scope.row.subsidyUnit"
                            placeholder="请选择"
                            clearable
                            @keyup.enter.native="editContent"
                          >
                            <el-option
                              v-for="item in companyOptions"
                              :key="item.dictLabel"
                              :label="item.dictLabel"
                              :value="item.dictValue"
                            />
                          </el-select>
                        </div>
                      </el-form-item>
                      <span v-else>
                        <span>{{ scope.row.subsidyMoney }}</span>
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
            <el-collapse-item v-if="isShow11" name="baseItem_5">
              <template slot="title">
                <div class="titleSlider">
                  <span>
                    <i class="titleTip" />计生补贴
                  </span>
                </div>
              </template>
              <el-form :model="form">
                <el-table :data="familyList" style="width: 100%">
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
                <el-table :data="familyList1" style="width: 100%">
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
            <el-collapse-item v-if="isShow12" name="baseItem_7">
              <template slot="title">
                <div class="titleSlider">
                  <span>
                    <i class="titleTip" />失独补贴
                  </span>
                </div>
              </template>
              <el-form :model="form">
                <el-table :data="ShiDuList" style="width: 100%">
                  <el-table-column label="补贴名称" prop="subsidyElementName" />
                  <el-table-column label="何时享受补贴">
                    <template slot-scope="scope">
                      <el-form-item v-if="isEditForm">
                        <el-date-picker
                          v-if="isEditForm"
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
                            @keyup.enter.native="editContent"
                            @keyup.native="transformNumber7(scope.row.subsidyMoney,'subsidyMoney',scope.$index)"
                          />
                          <el-select
                            v-model="scope.row.subsidyUnit"
                            placeholder="请选择"
                            clearable
                            @keyup.enter.native="editContent"
                          >
                            <el-option
                              v-for="item in gitSubsidy"
                              :key="item.dictLabel"
                              :label="item.dictLabel"
                              :value="item.dictValue"
                            />
                          </el-select>
                        </div>
                      </el-form-item>
                      <span v-else>
                        <span>{{ scope.row.subsidyMoney }}</span>
                        <span v-if="scope.row.subsidyUnit=='time_month'">次/月</span>
                        <span v-if="scope.row.subsidyUnit=='time_quarter'">次/季度</span>
                        <span v-if="scope.row.subsidyUnit=='time_year'">次/年</span>
                      </span>
                    </template>
                  </el-table-column>
                </el-table>
              </el-form>
            </el-collapse-item>
            <el-collapse-item v-if="isShow13" name="baseItem_8">
              <template slot="title">
                <div class="titleSlider">
                  <span>
                    <i class="titleTip" />失地补贴
                  </span>
                </div>
              </template>
              <el-form :model="form">
                <el-table :data="ShiDiList" style="width: 100%">
                  <el-table-column label="补贴名称" prop="subsidyElementName" />
                  <el-table-column label="何时享受补贴">
                    <template slot-scope="scope">
                      <el-form-item v-if="isEditForm">
                        <el-date-picker
                          v-if="isEditForm"
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
                            @keyup.enter.native="editContent"
                            @keyup.native="transformNumber8(scope.row.subsidyMoney,'subsidyMoney',scope.$index)"
                          />
                          <el-select
                            v-model="scope.row.subsidyUnit"
                            placeholder="请选择"
                            clearable
                            @keyup.enter.native="editContent"
                          >
                            <el-option
                              v-for="item in gitSubsidy"
                              :key="item.dictLabel"
                              :label="item.dictLabel"
                              :value="item.dictValue"
                            />
                          </el-select>
                        </div>
                      </el-form-item>
                      <span v-else>
                        <span>{{ scope.row.subsidyMoney }}</span>
                        <span v-if="scope.row.subsidyUnit=='time_month'">次/月</span>
                        <span v-if="scope.row.subsidyUnit=='time_quarter'">次/季度</span>
                        <span v-if="scope.row.subsidyUnit=='time_year'">次/年</span>
                      </span>
                    </template>
                  </el-table-column>
                </el-table>
              </el-form>
            </el-collapse-item>
            <el-collapse-item v-if="isShow14" name="baseItem_9">
              <template slot="title">
                <div class="titleSlider">
                  <span>
                    <i class="titleTip" />礼品补贴
                  </span>
                </div>
              </template>
              <el-form :model="form">
                <el-table :data="LiPingList" style="width: 100%">
                  <el-table-column label="补贴名称" prop="subsidyElementName" />
                  <el-table-column label="何时享受补贴">
                    <template slot-scope="scope">
                      <el-form-item v-if="isEditForm">
                        <el-date-picker
                          v-if="isEditForm"
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
                            @keyup.enter.native="editContent"
                            @keyup.native="transformNumber9(scope.row.subsidyMoney,'subsidyMoney',scope.$index)"
                          />
                          <el-select
                            v-model="scope.row.subsidyUnit"
                            placeholder="请选择"
                            clearable
                            @keyup.enter.native="editContent"
                          >
                            <el-option
                              v-for="item in gitSubsidy"
                              :key="item.dictLabel"
                              :label="item.dictLabel"
                              :value="item.dictValue"
                            />
                          </el-select>
                        </div>
                      </el-form-item>
                      <span v-else>
                        <span>{{ scope.row.subsidyMoney }}</span>
                        <span v-if="scope.row.subsidyUnit=='time_month'">次/月</span>
                        <span v-if="scope.row.subsidyUnit=='time_quarter'">次/季度</span>
                        <span v-if="scope.row.subsidyUnit=='time_year'">次/年</span>
                      </span>
                    </template>
                  </el-table-column>
                </el-table>
              </el-form>
            </el-collapse-item>
            <el-collapse-item name="baseItem_5">
              <template slot="title">
                <div class="titleSlider">
                  <span>
                    <i class="titleTip" />一次性补贴
                  </span>
                </div>
              </template>
              <el-form :model="form" :rules="isEditForm?rulesForm:null">
                <el-table :data="DisposableList" style="width: 100%">
                  <el-table-column label="补贴名称">
                    <template slot-scope="scope">
                      <el-form-item v-if="isEditForm">
                        <el-input
                          v-model.trim="scope.row.subsidyElementName"
                          placeholder="请输入补贴名称"
                          clearable
                          @keyup.enter.native="editContent"
                        />
                      </el-form-item>
                      <span v-else>{{ scope.row.subsidyElementName }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column prop="contactsName" label="何时享受补贴">
                    <template slot-scope="scope">
                      <el-form-item v-if="isEditForm" prop="subsidyRemark">
                        <el-input
                          v-model="scope.row.subsidyRemark"
                          placeholder="请输入享受补贴时间"
                          clearable
                          @keyup.enter.native="editContent"
                        />
                      </el-form-item>
                      <span v-else>{{ scope.row.subsidyRemark }}</span>
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
                            @keyup.enter.native="editContent"
                            @keyup.native="transformNumber4(scope.row.subsidyMoney,'subsidyMoney',scope.$index)"
                          />
                        </div>
                      </el-form-item>
                      <span v-else>{{ scope.row.subsidyMoney }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column
                    v-if="isEditForm"
                    label="操作"
                    min-width="60"
                    align="center"
                    fixed="right"
                  >
                    <template slot-scope="scope">
                      <span
                        class="table-btn"
                        style="cursor: pointer;"
                        @click="tableOperations(scope.row,scope.$index)"
                      >删除</span>
                    </template>
                  </el-table-column>
                </el-table>
              </el-form>
              <div v-if="isEditForm" class="addBtnDiv">
                <span @click="addTableRows()">添加补贴</span>
              </div>
            </el-collapse-item>
          </el-collapse>
        </el-tab-pane>
        <el-tab-pane v-if="isShow15" label="服务信息" name="serve">
          <el-collapse v-model="activeCollapse">
            <el-collapse-item name="baseItem_1">
              <template slot="title">
                <div class="titleSlider">
                  <span>
                    <i class="titleTip" />老人服务
                  </span>
                </div>
              </template>
              <el-form
                ref="form_tag2"
                :model="form"
                :rules="isEditForm?rulesForm:null"
                label-width="120px"
              >
                <el-row :gutter="0">
                  <el-col :md="adaptiveGrid.md" :lg="adaptiveGrid.lg">
                    <el-form-item :label="isEditForm?'送餐服务':'送餐服务：'">
                      <el-select
                        v-if="isEditForm"
                        v-model="form.deliveryService"
                        placeholder="请选择居家养老评估"
                        clearable
                        style="width:100%;"
                        @keyup.enter.native="editContent"
                      >
                        <el-option
                          v-for="item in homeCarOptions"
                          :key="item.dictValue"
                          :label="item.dictLabel"
                          :value="item.dictValue"
                        />
                      </el-select>
                      <span v-else>{{ form.deliveryServiceName }}</span>
                    </el-form-item>
                  </el-col>

                </el-row>
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
            <el-button type="warning" class="base-btn btnMarginLeft15" @click="tabsStep('subsidy')">下一步</el-button>
          </div>
          <div v-else-if="this.activeTabs === 'subsidy'">
            <el-button type="warning" class="base-btn btnMarginLeft15" @click="tabsStep('label')">上一步</el-button>
            <el-button type="warning" class="base-btn btnMarginLeft15" @click="tabsStep('serve')" v-if="isShow15">下一步</el-button>
            <el-button class="cancel-btn btnMarginLeft15" @click="cancelDetailsPage" v-if="!isShow15">取消</el-button>
            <el-button type="warning" class="base-btn btnMarginLeft15" @click="editContent('form_base')" v-if="!isShow15">确定</el-button>
          </div>
          <div v-else>
            <el-button type="warning" class="base-btn btnMarginLeft15" @click="tabsStep('subsidy')">上一步</el-button>
            <el-button class="cancel-btn btnMarginLeft15" @click="cancelDetailsPage">取消</el-button>
            <el-button type="warning" class="base-btn btnMarginLeft15" @click="editContent('form_base')">确定</el-button>
          </div>
        </div>
        <div v-else>
          <el-button v-if="editAuthority==true&&hasEdit==true" type="warning" class="base-btn" @click="toEditType">编辑</el-button>
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

const Base64 = require('js-base64').Base64

export default {
  components: { Address },
  data() {
    return {
      hasEdit: false,
      isShow1: false,
      isShow2: false,
      isShow3: false,
      isShow4: false,
      isShow5: false,
      isShow6: false,
      isShow7: false,
      isShow8: false,
      isShow9: false,
      isShow10: false,
      isShow11: false,
      isShow12: false,
      isShow13: false,
      isShow14: false,
      isShow15: false,
      props: { multiple: true, checkStrictly: true },
      // 表单只能输入数字
      dataList: [
        {
          id: '',
          subsidyDate: '',
          subsidyElementName: '敬老卡津贴',
          subsidyMoney: '',
          subsidyTitleName: '养老补贴',
          subsidyUnit: '',
          subsidyRemark: ''
        },
        {
          id: '',
          subsidyDate: '',
          subsidyElementName: '居家养老补贴',
          subsidyMoney: '',
          subsidyTitleName: '养老补贴',
          subsidyUnit: '',
          subsidyRemark: ''
        },
        {
          id: '',
          subsidyDate: '',
          subsidyElementName: '长护险补贴',
          subsidyMoney: '',
          subsidyTitleName: '养老补贴',
          subsidyUnit: '',
          subsidyRemark: ''
        },
        {
          id: '',
          subsidyDate: '',
          subsidyElementName: '助餐补贴',
          subsidyMoney: '',
          subsidyTitleName: '养老补贴',
          subsidyUnit: '',
          subsidyRemark: ''
        }
      ],
      dataList1: [
        {
          id: '',
          subsidyDate: '',
          subsidyElementName: '低保补贴',
          subsidyMoney: '',
          subsidyTitleName: '救助补贴',
          subsidyUnit: '',
          subsidyRemark: ''
        },
        {
          id: '',
          subsidyDate: '',
          subsidyElementName: '支内回沪补贴',
          subsidyMoney: '',
          subsidyTitleName: '救助补贴',
          subsidyUnit: '',
          subsidyRemark: ''
        }
      ],
      dataList2: [
        {
          id: '',
          subsidyDate: '',
          subsidyElementName: '重残无业市补贴',
          subsidyMoney: '',
          subsidyTitleName: '残疾补贴',
          subsidyUnit: '',
          subsidyRemark: ''
        },
        {
          id: '',
          subsidyDate: '',
          subsidyElementName: '重残无业区补贴',
          subsidyMoney: '',
          subsidyTitleName: '残疾补贴',
          subsidyUnit: '',
          subsidyRemark: ''
        },
        {
          id: '',
          subsidyDate: '',
          subsidyElementName: '残疾人交通补贴',
          subsidyMoney: '',
          subsidyTitleName: '残疾补贴',
          subsidyUnit: '',
          subsidyRemark: ''
        },
        {
          id: '',
          subsidyDate: '',
          subsidyElementName: '残疾人护理补贴',
          subsidyMoney: '',
          subsidyTitleName: '残疾补贴',
          subsidyUnit: '',
          subsidyRemark: ''
        },
        {
          id: '',
          subsidyDate: '',
          subsidyElementName: '残疾人居家养护补贴',
          subsidyMoney: '',
          subsidyTitleName: '残疾补贴',
          subsidyUnit: '',
          subsidyRemark: ''
        },
        {
          id: '',
          subsidyDate: '',
          subsidyElementName: '残疾人生活补贴',
          subsidyMoney: '',
          subsidyTitleName: '残疾补贴',
          subsidyUnit: '',
          subsidyRemark: ''
        }
      ],
      dataList3: [
        {
          id: '',
          subsidyDate: '',
          subsidyElementName: '优抚补贴',
          subsidyMoney: '',
          subsidyTitleName: '优抚补贴',
          subsidyUnit: '',
          subsidyRemark: ''
        }
      ],
      dataList4: [
        {
          id: '',
          subsidyDate: '',
          subsidyElementName: '',
          subsidyMoney: '',
          subsidyTitleName: '一次性补贴',
          subsidyUnit: '',
          subsidyRemark: ''
        }
      ],
      dataList7: [
        {
          id: '',
          subsidyDate: '',
          subsidyElementName: '失独补贴',
          subsidyMoney: '',
          subsidyTitleName: '失独补贴',
          subsidyUnit: '',
          subsidyRemark: ''
        }
      ],
      dataList8: [
        {
          id: '',
          subsidyDate: '',
          subsidyElementName: '失地补贴',
          subsidyMoney: '',
          subsidyTitleName: '失地补贴',
          subsidyUnit: '',
          subsidyRemark: ''
        }
      ],
      dataList9: [
        {
          id: '',
          subsidyDate: '',
          subsidyElementName: '礼品补贴',
          subsidyMoney: '',
          subsidyTitleName: '礼品补贴',
          subsidyUnit: '',
          subsidyRemark: ''
        }
      ],
      generationSubsidyOption: [],
      generationSubsidyOptions: [],
      generationSubsidyOptions1: [],
      companyOptions4: [],
      SubsidyOption: [], // 助餐补贴单位
      SubsidyOption1: [], // 农村奖单位i
      familyDataList: [
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
      familyDataList1: [
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
      // 单位
      companyOptions: [],
      companyOptions2: [],
      companyOptions3: [],
      gradeOptions: [],
      homeCarOptions: [],
      // 残疾
      categoryOptions: [],
      defoLevelOptions: [],
      defoTypeOptions: [],
      // 救助
      categoryOptions1: [],
      familyTypeOptions: [],
      defoCodeOptions: [],
      familyOptions: [],
      // 计生
      birthControlFamily: [], // 计生家庭
      birthControlSubsidy: [], // 计生补助
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
      // assessTypeOptions: [], // 评估类型
      defoLevelInfoOptions: [], // 残疾等级
      assessLevelOptions: [], // 评估等级
      assessLevelOptionsAll: [], // 评估等级-长护险和居家养老评估
      relationOptions: [], // 关系
      categoryTypeOptions: [], // 救助类别
      pensionModeOptions: [], // 养老方式
      pensionAssistOptions: [], // 养老辅助
      defoRelatedAttrOptions: [], // 残疾相关属性
      deformityTypeOptions: [],
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
        isHomeCare: '', // 新增的
        isHomeCareName: '',
        deliveryService: '',
        deliveryServiceName: '',
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
        // 老人标签
        personProperty: {
          id: '',
          personId: '',
          ageLevel: '', // 年龄类别
          ageLevelName: '', // 年龄类别(纯文本)
          liveStatus: '', // 居住情况
          liveStatusName: '', // 居住情况(纯文本)
          censusStatus: '', // 户籍情况
          censusStatusName: '', // 户籍情况(纯文本)
          assessType: '0', // 评估类型
          assessTypeName: '', // 评估类型(纯文本)
          assessLevel: '', // 评估等级
          assessLevelName: '', // 评估等级(纯文本)
          categoryId: '', // 救助id
          categoryType: '', // 救助类别
          categoryTypeName: '', // 救助类别
          pensionMode: '', // 养老方式
          pensionModeName: '', // 养老方式
          pensionAssist: '', // 养老辅助
          pensionAssistName: '', // 养老辅助
          defoRelatedAttr: '', // 残疾相关属性
          defoRelatedAttrName: ''// 残疾相关属性
        },
        // 残疾标签
        bizDeformityPropertyVo: {
          id: '',
          personId: '',
          defoCode: '',
          category: '',
          categoryName: '',
          defoLevel: '',
          defoLevelName: '',
          defoType: '',
          defoTypeName: ''
        },
        // 救助标签
        bizHelpPropertityVo: {
          id: '',
          personId: '',
          category: '',
          categoryName: '',
          familyType: '',
          familyTypeName: '',
          familyNum: '',
          defoCode: '',
          defoCodeName: ''
        },
        // 优抚标签
        bizPreferentialPropertityVo: {
          id: '',
          personId: '',
          retireCode: '',
          entryTime: '',
          retireTime: '',
          preferType: '',
          preferTypeName: ''
        },
        // 计生标签
        bizPlanBirthPropertityVo: {
          familyDoctor: '',
          id: '',
          pbFamilyType: '',
          pbFamilyTypeName: '',
          pbSubType: '',
          pbSubTypeName: '',
          personId: ''
        },
        contact: [], // 联系人
        remark: '', // 备注
        personSubsidyInfoList: []
      },
      // 养老补贴
      PensionList: [
        {
          id: '',
          subsidyDate: '',
          subsidyElementName: '敬老卡津贴',
          subsidyMoney: '',
          subsidyTitleName: '养老补贴',
          subsidyUnit: '',
          subsidyRemark: ''
        },
        {
          id: '',
          subsidyDate: '',
          subsidyElementName: '居家养老补贴',
          subsidyMoney: '',
          subsidyTitleName: '养老补贴',
          subsidyUnit: '',
          subsidyRemark: ''
        },
        {
          id: '',
          subsidyDate: '',
          subsidyElementName: '长护险补贴',
          subsidyMoney: '',
          subsidyTitleName: '养老补贴',
          subsidyUnit: '',
          subsidyRemark: ''
        },
        {
          id: '',
          subsidyDate: '',
          subsidyElementName: '助餐补贴',
          subsidyMoney: '',
          subsidyTitleName: '养老补贴',
          subsidyUnit: '',
          subsidyRemark: ''
        }
      ],
      // 补贴
      SalvageList: [
        {
          id: '',
          subsidyDate: '',
          subsidyElementName: '低保补贴',
          subsidyMoney: '',
          subsidyTitleName: '救助补贴',
          subsidyUnit: '',
          subsidyRemark: ''
        },
        {
          id: '',
          subsidyDate: '',
          subsidyElementName: '支内回沪补贴',
          subsidyMoney: '',
          subsidyTitleName: '救助补贴',
          subsidyUnit: '',
          subsidyRemark: ''
        }
      ],
      // 残疾
      DisabilityList: [
        {
          id: '',
          subsidyDate: '',
          subsidyElementName: '重残无业市补贴',
          subsidyMoney: '',
          subsidyTitleName: '残疾补贴',
          subsidyUnit: '',
          subsidyRemark: ''
        },
        {
          id: '',
          subsidyDate: '',
          subsidyElementName: '重残无业区补贴',
          subsidyMoney: '',
          subsidyTitleName: '残疾补贴',
          subsidyUnit: '',
          subsidyRemark: ''
        },
        {
          id: '',
          subsidyDate: '',
          subsidyElementName: '残疾人交通补贴',
          subsidyMoney: '',
          subsidyTitleName: '残疾补贴',
          subsidyUnit: '',
          subsidyRemark: ''
        },
        {
          id: '',
          subsidyDate: '',
          subsidyElementName: '残疾人护理补贴',
          subsidyMoney: '',
          subsidyTitleName: '残疾补贴',
          subsidyUnit: '',
          subsidyRemark: ''
        },
        {
          id: '',
          subsidyDate: '',
          subsidyElementName: '残疾人居家养护补贴',
          subsidyMoney: '',
          subsidyTitleName: '残疾补贴',
          subsidyUnit: '',
          subsidyRemark: ''
        },
        {
          id: '',
          subsidyDate: '',
          subsidyElementName: '残疾人生活补贴',
          subsidyMoney: '',
          subsidyTitleName: '残疾补贴',
          subsidyUnit: '',
          subsidyRemark: ''
        }
      ],
      // 优抚
      PreferentialList: [
        {
          id: '',
          subsidyDate: '',
          subsidyElementName: '优抚补贴',
          subsidyMoney: '',
          subsidyTitleName: '优抚补贴',
          subsidyUnit: '',
          subsidyRemark: ''
        }
      ],
      familyList: [
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
      ], // 计生
      familyList1: [
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
      // 失独补贴
      ShiDuList: [
        {
          id: '',
          subsidyDate: '',
          subsidyElementName: '失独补贴',
          subsidyMoney: '',
          subsidyTitleName: '失独补贴',
          subsidyUnit: '',
          subsidyRemark: ''
        }
      ],
      // 失地补贴
      ShiDiList: [
        {
          id: '',
          subsidyDate: '',
          subsidyElementName: '失地补贴',
          subsidyMoney: '',
          subsidyTitleName: '失地补贴',
          subsidyUnit: '',
          subsidyRemark: ''
        }
      ],
      // 礼品补贴
      LiPingList: [
        {
          id: '',
          subsidyDate: '',
          subsidyElementName: '礼品补贴',
          subsidyMoney: '',
          subsidyTitleName: '礼品补贴',
          subsidyUnit: '',
          subsidyRemark: ''
        }
      ],
      // 一次性
      DisposableList: [
        {
          id: '',
          subsidyDate: '',
          subsidyElementName: '',
          subsidyMoney: '',
          subsidyTitleName: '一次性补贴',
          subsidyUnit: '',
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
      areaCode: [[], []], // 区域行政的全部ID
      modelType: '', // 查看：look  编辑：edit  新增：add
      editAuthority: false,
      gitSubsidy: []
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
      // 请求当前用户信息
      userDetailsData(_userId_).then(response => {
        this.formatData(response)
      }).catch(() => {
        this.$message.error('获取用户信息失败！')
      })
      /* 编辑按钮的权限控制*/
      getEditAuthority(this.$route.query.menu).then(response => {
        response.forEach((item) => {
          if (item.menuName === '编辑') {
            this.editAuthority = item.visible === '0'
          }
          switch (item.perms) {
            case 'userInfo:elderlyInfo:oldPersonTag':
              this.isShow1 = true
              break
            case 'userInfo:elderlyInfo:deformityTag':
              this.isShow2 = true
              break
            case 'userInfo:elderlyInfo:helpTag':
              this.isShow3 = true
              break
            case 'userInfo:elderlyInfo:preferentialTag':
              this.isShow4 = true
              break
            case 'userInfo:elderlyInfo:oldPersonSubsidy':
              this.isShow5 = true
              break
            case 'userInfo:elderlyInfo:helpSubsidy':
              this.isShow6 = true
              break
            case 'userInfo:elderlyInfo:deformitySubsidy':
              this.isShow7 = true
              break
            case 'userInfo:elderlyInfo:preferentialSubsidy':
              this.isShow8 = true
              break
            case 'userInfo:elderlyInfo:oneTimeSubsidy':
              this.isShow9 = true
              break
            case 'userInfo:elderlyInfo:plan':
              this.isShow10 = true
              break
            case 'userInfo:elderlyInfo:family':
              this.isShow11 = true
              break
            case 'userInfo:elderlyInfo:loseOneselfSubsidy':
              this.isShow12 = true
              break
            case 'userInfo:elderlyInfo:lostGroundSubsidy':
              this.isShow13 = true
              break
            case 'userInfo:elderlyInfo:giftSubsidy':
              this.isShow14 = true
              break
            case 'userInfo:elderlyInfo:service':
              this.isShow15 = true
              break
          }
        })
      }).catch(() => {
        this.$message.error('获取编辑按钮的权限控制失败！')
      })
    } else {
      this.isEditForm = true
      this.getData(_userId_)
      /* 编辑按钮的权限控制*/
      getEditAuthority(this.$route.query.menu).then(response => {
        response.forEach((item) => {
          switch (item.perms) {
            case 'userInfo:elderlyInfo:oldPersonTag':
              this.isShow1 = true
              break
            case 'userInfo:elderlyInfo:deformityTag':
              this.isShow2 = true
              break
            case 'userInfo:elderlyInfo:helpTag':
              this.isShow3 = true
              break
            case 'userInfo:elderlyInfo:preferentialTag':
              this.isShow4 = true
              break
            case 'userInfo:elderlyInfo:oldPersonSubsidy':
              this.isShow5 = true
              break
            case 'userInfo:elderlyInfo:helpSubsidy':
              this.isShow6 = true
              break
            case 'userInfo:elderlyInfo:deformitySubsidy':
              this.isShow7 = true
              break
            case 'userInfo:elderlyInfo:preferentialSubsidy':
              this.isShow8 = true
              break
            case 'userInfo:elderlyInfo:oneTimeSubsidy':
              this.isShow9 = true
              break
            case 'userInfo:elderlyInfo:plan':
              this.isShow10 = true
              break
            case 'userInfo:elderlyInfo:family':
              this.isShow11 = true
              break
            case 'userInfo:elderlyInfo:loseOneselfSubsidy':
              this.isShow12 = true
              break
            case 'userInfo:elderlyInfo:lostGroundSubsidy':
              this.isShow13 = true
              break
            case 'userInfo:elderlyInfo:giftSubsidy':
              this.isShow14 = true
              break
            case 'userInfo:elderlyInfo:service':
              this.isShow15 = true
              break
          }
        })
      })
    }
    // 关系
    relationData().then(response => {
      this.relationOptions = response.rows
    }).catch(() => {
      this.$message.error('获取关系接口失败！')
    })
  },
  methods: {
    changeDisable(val) {
      this.deformityTypeOptions.forEach(item => {
        if (val && val.length) {
          val.forEach(items => {
            item.children.forEach(itemc => {
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
                  itemc.disabled = true
                } else {
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
    pickData(value) {
    },
    transformNumber(value, obj, index) {
      this.dataList = this.PensionList
      this.dataList[index][obj] = transformNumber(value)
      this.$set(this.PensionList, index, this.dataList[index])
    },
    transformNumber1(value, obj, index) {
      this.dataList1 = this.SalvageList
      this.dataList1[index][obj] = transformNumber(value)
      this.$set(this.SalvageList, index, this.dataList1[index])
      this.familyDateList1 = this.familyList1
      this.familyDateList1[index][obj] = transformNumber(value)
      this.$set(this.familyList1, index, this.familyDateList1[index])
    },
    transformNumber2(value, obj, index) {
      this.dataList2 = this.DisabilityList
      this.dataList2[index][obj] = transformNumber(value)
      this.$set(this.DisabilityList, index, this.dataList2[index])
    },
    transformNumber3(value, obj, index) {
      this.dataList3 = this.PreferentialList
      this.dataList3[index][obj] = transformNumber(value)
      this.$set(this.PreferentialList, index, this.dataList3[index])
    },
    transformNumber4(value, obj, index) {
      this.dataList4 = this.DisposableList
      this.dataList4[index][obj] = transformNumber(value)
      this.$set(this.DisposableList, index, this.dataList4[index])
    },
    transformNumber7(value, obj, index) {
      this.dataList7 = this.ShiDuList
      this.dataList7[index][obj] = transformNumber(value)
      this.$set(this.ShiDuList, index, this.dataList7[index])
    },
    transformNumber8(value, obj, index) {
      this.dataList8 = this.ShiDiList
      this.dataList8[index][obj] = transformNumber(value)
      this.$set(this.ShiDiList, index, this.dataList8[index])
    },
    transformNumber9(value, obj, index) {
      this.dataList9 = this.LiPingList
      this.dataList9[index][obj] = transformNumber(value)
      this.$set(this.LiPingList, index, this.dataList9[index])
    },
    transformNumber6() {
      this.familyDataList = this.familyList
      this.familyDataList[index][obj] = transformFloatNumber1(value)
      this.$set(this.familyList, index, this.familyDataList[index])
    },
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
      if (row.subsidyElementName === '特别扶助金（伤残）') {
        if (row.ageRange === '45_59_subsidy') {
          row.subsidyMoney = 660
        } else if (row.ageRange === '60_69_subsidy') {
          row.subsidyMoney = 710
        } else if (row.ageRange !== '') {
          row.subsidyMoney = 760
        }
      } else if (row.subsidyElementName === '特别扶助金（死亡）') {
        if (row.ageRange === '45_59_subsidy') {
          row.subsidyMoney = 820
        } else if (row.ageRange === '60_69_subsidy') {
          row.subsidyMoney = 870
        } else if (row.ageRange !== '') {
          row.subsidyMoney = 920
        }
      }
    },
    // 异步事件同步化
    async getData(id) {
      // await this.getSelect()
      // const assessTypeOptions = []
      // const gradeOptions = []
      // this.assessTypeOptions.forEach(item => {
      //   assessTypeOptions.push({
      //     value: item.dictValue,
      //     label: item.dictLabel
      //   })
      // })
      // this.gradeOptions.forEach(item => {
      //   gradeOptions.push({
      //     value: item.dictValue,
      //     label: item.dictLabel
      //   })
      // })
      // this.assessTypeOptions = assessTypeOptions
      // this.gradeOptions = gradeOptions
      // this.assessTypeOptions.forEach((items, index) => {
      //   const data = JSON.parse(JSON.stringify(this.gradeOptions))
      //   data.forEach((list, i) => {
      //     data[i].value = list.value + index
      //   })
      //   items.children = data
      // })
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
        userDetailsData(id).then(response => {
          this.formatData(response)
          this.idEdit = false
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
        'biz_assess_type', // 评估类型
        'biz_assess_level', // 评估等级
        'biz_old_person_status', // 老人状态
        'pension_mode', // 养老方式
        'pension_assist', // 养老辅助
        'defo_related_attr', // 残疾相关属性
        'biz_census_status', // 户籍情况
        'medical_insurance', // 医疗保险
        'job_status', // 就业
        'endowment_insurance', // 养老保险
        // 残疾标签
        'defo_level', // 残疾等级
        'category', // 残疾人员类别
        'defo_type', // 残疾类型
        // 救助标签
        'h_category', // 救助类别
        'family_type', // 家庭
        'sys_Yes_No', // 覆盖
        'monthly_capita', // 月收入
        // 优抚
        'entitled_groups', // 优抚类别
        // 单位
        'home_unit',
        'ch_unit',
        'help_unit',
        'birthControl_family',
        'birthControl_subsidy',
        'generationSubsidy',
        'meal_allowance',
        'assistance_subsidy',
        'bonus_all',
        'rural_awards',
        'medical_subsidies',
        'git_subsidy',
        'is_enjoy'
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
              case 'biz_assess_level':
                this.gradeOptions = dict[key]
                break
              case 'is_enjoy':
                this.homeCarOptions = dict[key]
                break
              case 'biz_assess_type':
                this.assessTypeOptions = dict[key]
                break
              case 'biz_assess_level':
                this.assessLevelOptionsAll = dict[key]
                break
              case 'biz_old_person_status':
                this.statusOptions = dict[key]
                break

              case 'pension_mode':
                this.pensionModeOptions = dict[key]
                break
                // 养老辅助
              case 'pension_assist':
                this.pensionAssistOptions = dict[key]
                break
                // 残疾相关属性
              case 'defo_related_attr':
                this.defoRelatedAttrOptions = dict[key]
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
                // 残疾等级
              case 'defo_level':
                this.defoLevelOptions = dict[key]
                break
                // 残疾人员类别
              case 'category':
                this.categoryOptions = dict[key]
                break
                // 残疾类型
              case 'defo_type':
                this.defoTypeOptions = dict[key]
                break
                // 救助类型
              case 'h_category':
                this.categoryOptions1 = dict[key]
                break
              case 'family_type':
                this.familyTypeOptions = dict[key]
                break
              case 'sys_Yes_No':
                this.defoCodeOptions = dict[key]
                break
              case 'monthly_capita':
                this.familyOptions = dict[key]
                break
                // 优抚
              case 'entitled_groups':
                this.preferOptions = dict[key]
                break
              case 'home_unit':
                this.companyOptions = dict[key]
                break
              case 'ch_unit':
                this.companyOptions2 = dict[key]
                break
              case 'help_unit':
                this.companyOptions3 = dict[key]
                break
              case 'birthControl_family':
                this.birthControlFamily = dict[key]
                break
                // 计生补助
              case 'birthControl_subsidy':
                this.birthControlSubsidy = dict[key]
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
              case 'git_subsidy':
                this.gitSubsidy = dict[key]
                break
            }
          }
          const defoTypeOptions = []
          const defoLevelOptions = []
          this.defoLevelOptions.forEach(item => {
            defoLevelOptions.push({
              value: item.dictValue,
              label: item.dictLabel,
              disabled: false
            })
          })
          this.defoTypeOptions.forEach(item => {
            const arrList = _.cloneDeep(defoLevelOptions)
            defoTypeOptions.push(
              {
                value: item.dictValue,
                label: item.dictLabel,
                disabled: true,
                children: arrList
              }
            )
          })
          this.deformityTypeOptions = defoTypeOptions
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
    addTableRows() {
      this.DisposableList.push({
        id: '',
        subsidyDate: '',
        subsidyElementName: '',
        subsidyMoney: '',
        subsidyTitleName: '一次性补贴',
        subsidyUnit: '',
        subsidyRemark: ''
      })
    },
    // ===============操作（删除）=================
    tableOperation(row, index) {
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
    tableOperations(row, index) {
      // 删除
      this.$confirm('是否确认删除该一次性补贴?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.DisposableList.splice(index, 1)
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
        // let assessType = ''
        // let assessLevel = ''
        // if (this.form.personProperty.assessType.length) {
        //   assessType = this.form.personProperty.assessType[0]
        //   assessLevel = this.form.personProperty.assessType[1]
        // }
        // this.form.personProperty.assessType = assessType
        // if (assessLevel != '' && assessLevel == '000' || assessLevel == '001') {
        //   this.form.personProperty.assessLevel = assessLevel.slice(0, 2)
        // } else {
        //   this.form.personProperty.assessLevel = assessLevel ? assessLevel.slice(0, 1) : ''
        // }
        if (this.form.personProperty.assessLevel) {
          this.form.personProperty.assessType = '0'
        }
        const noPhoneContacts = this.form.contact.filter(i => i.homePhone == '' && i.mobile == '')
        if (noPhoneContacts.length > 0) {
          scrollToEl(this.$refs['contact.0.homePhone'].$el)
          return this.$message.error('联系人的家庭电话或者手机号码必须至少填写一项！')
        }
        const defaultContacts = this.form.contact.filter(i => i.isDefault === 'Y')
        if (this.form.contact.length > 0 && defaultContacts.length !== 1) {
          scrollToEl(this.$refs['form_contact'].$el)
          return this.$message.error('请设置一位默认联系人！')
        }
        const entryTime = new Date(this.form.bizPreferentialPropertityVo.entryTime).getTime()
        const retireTime = new Date(this.form.bizPreferentialPropertityVo.retireTime).getTime()
        this.form.bizPreferentialPropertityVo.preferType = this.form.bizPreferentialPropertityVo.preferType.toString()
        this.form.bizHelpPropertityVo.category = this.form.bizHelpPropertityVo.category.toString()
        if (entryTime > retireTime) {
          return this.$message.error('入伍时间不得大于退伍时间！')
        }
        // 处理级联数据

        if (this.form.bizDeformityPropertyVo.defoType && this.form.bizDeformityPropertyVo.defoType.length) {
          const defoType = []
          const defoLevel = []
          this.form.bizDeformityPropertyVo.defoType.forEach(item => {
            defoType.push(item[0])
            defoLevel.push(item[1])
          })
          this.form.bizDeformityPropertyVo.defoType = defoType.toString()
          this.form.bizDeformityPropertyVo.defoLevel = defoLevel.toString()
        }
        // 残疾类别 特殊处理
        else {
          this.form.bizDeformityPropertyVo.defoType = ''
          this.form.bizDeformityPropertyVo.defoLevel = ''
        }
        const _form = this.form
        for (const k in this.areaCode) {
          _form.address[k].areaCode = this.areaCode[k].length === 0 ? '' : this.areaCode[k][this.areaCode[k].length - 1] + ''
          _form.address[k].codeLevel = this.areaCode[k].join(',') || ''
        }
        if (_form.birthday === '') {
          _form.birthday = 'null'
        }
        // 数据处理
        const regs = /^[0-9]*$/
        let arrList = []
        this.PensionList.forEach(item => {
          if (item.subsidyMoney != '' && item.subsidyMoney != null || item.subsidyDate != '' && item.subsidyDate != null) {
            arrList.push(item)
          }
        })
        this.SalvageList.forEach(item => {
          if (item.subsidyMoney != '' && item.subsidyMoney != null || item.subsidyDate != '' && item.subsidyDate != null) {
            arrList.push(item)
          }
        })
        this.DisabilityList.forEach(item => {
          if (item.subsidyMoney != '' && item.subsidyMoney != null || item.subsidyDate != '' && item.subsidyDate != null) {
            arrList.push(item)
          }
        })
        this.PreferentialList.forEach(item => {
          if (item.subsidyMoney != '' && item.subsidyMoney != null || item.subsidyDate != '' && item.subsidyDate != null) {
            arrList.push(item)
          }
        })
        this.ShiDuList.forEach(item => {
          if (item.subsidyMoney != '' && item.subsidyMoney != null || item.subsidyDate != '' && item.subsidyDate != null) {
            arrList.push(item)
          }
        })
        this.ShiDiList.forEach(item => {
          if (item.subsidyMoney != '' && item.subsidyMoney != null || item.subsidyDate != '' && item.subsidyDate != null) {
            arrList.push(item)
          }
        })
        this.LiPingList.forEach(item => {
          if (item.subsidyMoney != '' && item.subsidyMoney != null || item.subsidyDate != '' && item.subsidyDate != null) {
            arrList.push(item)
          }
        })

        this.DisposableList.forEach(item => {
          if (item.subsidyMoney != '' && item.subsidyMoney != null || item.subsidyRemark != '' && item.subsidyRemark != null) {
            arrList.push(item)
          }
        })
        this.familyList.forEach(item => {
          if (item.subsidyMoney != '' && item.subsidyMoney != null || item.subsidyRemark != '' && item.subsidyRemark != null) {
            arrList.push(item)
          }
        })
        this.familyList1.forEach(item => {
          if (item.subsidyMoney != '' && item.subsidyMoney != null || item.subsidyRemark != '' && item.subsidyRemark != null) {
            arrList.push(item)
          }
        })
        _form.personSubsidyInfoList = arrList
        // 新增
        if (this.modelType === 'add' && !this.form.id) {
          submitDataAdd(_form).then(response => {
            if (response.code === 0) {
              this.$message({
                type: 'success',
                message: '新增老人信息保存成功!'
              })
              // 关闭页面
              this.closeDetailsPage()
            } else {
              this.$message.error('新增老人信息操作失败，失败原因是：' + response.msg)
            }
          }).catch(() => {
            this.$message.error('新增老人信息操作失败!')
          })
        }
        // 编辑
        else if (this.modelType === 'edit' || (this.modelType === 'add' && this.form.id)) {
          submitDataEdit(_form).then(response => {
            arrList = []
            if (response.code === 0) {
              this.$message({
                type: 'success',
                message: '编辑老人信息保存成功!'
              })
              // 关闭页面
              this.closeDetailsPage()
            } else {
              this.$message.error('编辑老人信息操作失败，失败原因是：' + response.msg)
            }
          }).catch(() => {
            arrList = []
            this.$message.error('编辑老人信息操作失败!')
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
      this.$router.push('/streetPlatform/userInfoConfig/elderlyInfo')
    },
    // 查看详情页面，点击编辑按钮

    toEditType() {
      this.$router.push({
        path: `/elderlyInfo/details/${this.$route.params.id}`,
        query: { 'modelType': 'edit', '_title': `编辑${this.form.fullName}`, 'menu': this.$route.query.menu }
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
      this.form.contact = []
      this.$refs.form_tag1.resetFields()
      this.$refs.form_tag2.resetFields()
      this.$refs.form_tag3.resetFields()
      this.$refs.form_tag4.resetFields()
      this.$refs.form_remark.resetFields()
      this.assessLevelOptions = []
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
            this.idEdit = true // 触发Address组件更新
            // this.resetForm();
            this.formatData(response)
          }).catch(err => {
            this.form.idCard = ''
          })
        }
      }).catch(error => {
        this.$message.error('身份证载入数据接口请求失败！')
      })
    },
    // 处理接口数据供表单使用
    formatData(response) {
      for (const key in this.form) {
        if (!['address', 'contact'].includes(key)) {
          this.form[key] = response[key]
        }
      }
      if (response.personProperty) {
        this.form.personProperty = response.personProperty
        // if (this.form.personProperty.assessType == '1') {
        //   this.form.personProperty.assessLevel = this.form.personProperty.assessLevel + '1'
        // }
        // if (this.form.personProperty.assessType == '0') {
        //   this.form.personProperty.assessLevel = this.form.personProperty.assessLevel + '0'
        // }
        // if (this.form.personProperty.assessType != null) {
        //   this.form.personProperty.assessType = [this.form.personProperty.assessType, this.form.personProperty.assessLevel]
        // } else {
        //   this.form.personProperty.assessType = []
        // }
      } else {
        this.form.personProperty = {
          id: '',
          personId: '',
          ageLevel: '', // 年龄类别
          ageLevelName: '', // 年龄类别(纯文本)
          liveStatus: '', // 居住情况
          liveStatusName: '', // 居住情况(纯文本)
          censusStatus: '', // 户籍情况
          censusStatusName: '', // 户籍情况(纯文本)
          assessType: '0', // 评估类型
          assessTypeName: '', // 评估类型(纯文本)
          assessLevel: '', // 评估等级
          assessLevelName: '', // 评估等级(纯文本)
          categoryId: '', // 救助id
          categoryType: '', // 救助类别
          categoryTypeName: '', // 救助类别
          pensionMode: '', // 养老方式
          pensionModeName: '', // 养老方式
          pensionAssist: '', // 养老辅助
          pensionAssistName: '', // 养老辅助
          defoRelatedAttr: '', // 残疾相关属性
          defoRelatedAttrName: ''// 残疾相关属性
        }
      }
      if (response.bizDeformityPropertyVo == null) {
        this.form.bizDeformityPropertyVo = {
          id: '',
          personId: '',
          defoCode: '',
          category: '',
          categoryName: '',
          defoLevel: '',
          defoLevelName: '',
          defoType: '',
          defoTypeName: ''
        }
      } else {
        this.form.bizDeformityPropertyVo = response.bizDeformityPropertyVo
        if (response.bizDeformityPropertyVo.defoType) {
          const defoType = response.bizDeformityPropertyVo.defoType.split(',')
          const defoLevel = response.bizDeformityPropertyVo.defoLevel.split(',')
          const arrList = []
          // 处理等级
          defoType.forEach(item => {
            arrList.push([item])
          })
          for (var i = 0; i < defoLevel.length; i++) {
            arrList[i][1] = defoLevel[i]
          }
          this.form.bizDeformityPropertyVo.defoType = arrList

          // 处理等级名字
          const defoTypeName = response.bizDeformityPropertyVo.defoTypeName.split(',')
          const defoLevelName = response.bizDeformityPropertyVo.defoLevelName.split(',')
          const arrListName = []
          defoTypeName.forEach((item, i) => {
            arrListName.push(item + '/' + defoLevelName[i])
          })
          this.form.bizDeformityPropertyVo.defoTypeName = arrListName.join('   ,   ')
        }
      }
      if (response.bizHelpPropertityVo == null) {
        this.form.bizHelpPropertityVo = {
          id: '',
          personId: '',
          category: '',
          categoryName: '',
          familyType: '',
          familyTypeName: '',
          familyNum: '',
          defoCode: '',
          defoCodeName: ''
        }
      }
      if (response.bizPreferentialPropertityVo == null) {
        this.form.bizPreferentialPropertityVo = {
          id: '',
          personId: '',
          retireCode: '',
          entryTime: '',
          retireTime: '',
          preferType: '',
          preferTypeName: ''
        }
      }
      if (response.bizPlanBirthPropertityVo == null) {
        this.form.bizPlanBirthPropertityVo = {
          familyDoctor: '',
          id: '',
          pbFamilyType: '',
          pbFamilyTypeName: '',
          pbSubType: '',
          pbSubTypeName: '',
          personId: ''
        }
      }
      const obj1 = {
        addrType: '0', // 地址类型
        addrTypeName: '', // 地址类型（纯文本）
        areaCode: response.censusAreaCodeLevel != null && response.censusAreaCodeLevel != '' ? response.censusAreaCodeLevel.split(',') : [], // 行政区划
        areaCodeName: response.censusAreaCodeLevelName, // 行政区划(纯文本)
        address: response.censusAddr, // 详细地址
        codeLevel: response.censusAreaCodeLevel// 树节点
      }
      this.$set(this.form.address, 0, obj1)
      this.form.bizPreferentialPropertityVo.preferType = this.form.bizPreferentialPropertityVo.preferType ? this.form.bizPreferentialPropertityVo.preferType.split(',') : []
      this.form.bizHelpPropertityVo.category = this.form.bizHelpPropertityVo.category ? this.form.bizHelpPropertityVo.category.split(',') : []
      const obj2 = {
        addrType: '1', // 地址类型
        addrTypeName: '', // 地址类型（纯文本）
        areaCode: response.liveAreaCodeLevel != null && response.liveAreaCodeLevel != '' ? response.liveAreaCodeLevel.split(',') : [], // 行政区划
        areaCodeName: response.liveAreaCodeLevelName, // 行政区划(纯文本)
        address: response.liveAddr, // 详细地址
        codeLevel: response.liveAreaCodeLevel// 树节点
      }
      this.$set(this.form.address, 1, obj2)
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
        const SalvageList = []
        const DisabilityList = []
        const PreferentialList = []
        const ShiDuList = []
        const ShiDiList = []
        const LiPingList = []
        const DisposableList = []
        const familyList = []
        response.personSubsidyInfoList.forEach(item => {
          if (item.subsidyTitleName == '养老补贴') {
            PensionList.push(item)
          }
          if (item.subsidyTitleName == '救助补贴') {
            SalvageList.push(item)
          }
          if (item.subsidyTitleName == '残疾补贴') {
            DisabilityList.push(item)
          }
          if (item.subsidyTitleName == '优抚补贴') {
            PreferentialList.push(item)
          }
          if (item.subsidyTitleName == '失独补贴') {
            ShiDuList.push(item)
          }
          if (item.subsidyTitleName == '失地补贴') {
            ShiDiList.push(item)
          }
          if (item.subsidyTitleName == '礼品补贴') {
            LiPingList.push(item)
          }
          if (item.subsidyTitleName == '一次性补贴') {
            DisposableList.push(item)
          }
          if (item.subsidyTitleName == '计生补贴') {
            familyList.push(item)
          }
        })
        this.PensionList.forEach(item => {
          PensionList.forEach(items => {
            if (item.subsidyElementName == items.subsidyElementName) {
              item.subsidyMoney = items.subsidyMoney
              item.subsidyUnit = items.subsidyUnit
              item.id = items.id
              item.subsidyDate = items.subsidyDate
            }
          })
        })
        this.dataList = _.cloneDeep(this.PensionList)
        this.familyList.forEach(item => {
          familyList.forEach(items => {
            if (item.subsidyElementName == items.subsidyElementName) {
              item.subsidyMoney = items.subsidyMoney
              item.subsidyUnit = items.subsidyUnit
              item.id = items.id
              item.subsidyDate = items.subsidyDate
              item.ageRange = items.ageRange
            }
          })
        })
        this.familyList1.forEach(item => {
          familyList.forEach(items => {
            if (item.subsidyElementName == items.subsidyElementName) {
              item.subsidyMoney = items.subsidyMoney
              item.subsidyUnit = items.subsidyUnit
              item.id = items.id
              item.subsidyDate = items.subsidyDate
              item.ageRange = items.ageRange
            }
          })
        })
        this.familyDataList = _.cloneDeep(this.familyList)
        this.familyDataList1 = _.cloneDeep(this.familyList1)
        this.SalvageList.forEach(item => {
          SalvageList.forEach(items => {
            if (item.subsidyElementName == items.subsidyElementName) {
              item.subsidyMoney = items.subsidyMoney
              item.subsidyUnit = items.subsidyUnit
              item.id = items.id
              item.subsidyDate = items.subsidyDate
            }
          })
        })
        this.dataList1 = _.cloneDeep(this.SalvageList)
        this.DisabilityList.forEach(item => {
          DisabilityList.forEach(items => {
            if (item.subsidyElementName == items.subsidyElementName) {
              item.subsidyMoney = items.subsidyMoney
              item.subsidyUnit = items.subsidyUnit
              item.id = items.id
              item.subsidyDate = items.subsidyDate
            }
          })
        })
        this.dataList2 = _.cloneDeep(this.DisabilityList)
        this.PreferentialList.forEach(item => {
          PreferentialList.forEach(items => {
            if (item.subsidyElementName == items.subsidyElementName) {
              item.subsidyMoney = items.subsidyMoney
              item.subsidyUnit = items.subsidyUnit
              item.id = items.id
              item.subsidyDate = items.subsidyDate
            }
          })
        })
        this.dataList3 = _.cloneDeep(this.PreferentialList)
        this.ShiDuList.forEach(item => {
          ShiDuList.forEach(items => {
            if (item.subsidyElementName == items.subsidyElementName) {
              item.subsidyMoney = items.subsidyMoney
              item.subsidyUnit = items.subsidyUnit
              item.id = items.id
              item.subsidyDate = items.subsidyDate
            }
          })
        })
        this.dataList7 = _.cloneDeep(this.ShiDuList)
        this.ShiDiList.forEach(item => {
          ShiDiList.forEach(items => {
            if (item.subsidyElementName == items.subsidyElementName) {
              item.subsidyMoney = items.subsidyMoney
              item.subsidyUnit = items.subsidyUnit
              item.id = items.id
              item.subsidyDate = items.subsidyDate
            }
          })
        })
        this.dataList8 = _.cloneDeep(this.ShiDiList)
        this.LiPingList.forEach(item => {
          LiPingList.forEach(items => {
            if (item.subsidyElementName == items.subsidyElementName) {
              item.subsidyMoney = items.subsidyMoney
              item.subsidyUnit = items.subsidyUnit
              item.id = items.id
              item.subsidyDate = items.subsidyDate
            }
          })
        })
        this.dataList9 = _.cloneDeep(this.LiPingList)
        const disposableTab = []
        DisposableList.forEach(item => {
          disposableTab.push(
            {
              subsidyMoney: item.subsidyMoney,
              subsidyUnit: item.subsidyUnit,
              id: item.id,
              subsidyDate: item.subsidyDate,
              subsidyRemark: item.subsidyRemark,
              subsidyElementName: item.subsidyElementName,
              subsidyTitleName: item.subsidyTitleName
            }
          )
        })
        this.DisposableList = disposableTab
        this.dataList4 = this.DisposableList
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
