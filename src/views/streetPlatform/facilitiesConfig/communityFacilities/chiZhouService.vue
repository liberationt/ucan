<!--池州设施
        村民互助点  -2021
        社区养老服务站  -2022
        养老服务指导中心 -2023 -->
<template>
  <el-container>
    <el-main class="tableContainer">
      <el-tabs v-model="activeTabs">
        <!--基本信息tabs start-->
        <el-tab-pane label="基本信息" name="base" :disabled="this.modelType === 'look'? disabled : ''">
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
                    <el-form-item :label="this.isEditForm?'设施名称':'设施名称：'" prop="orgName">
                      <el-input
                        v-if="this.isEditForm"
                        ref="orgName"
                        v-model="form.orgName"
                        :disabled="disabled"
                        clearable
                        placeholder="请输入设施名称"
                        @keyup.enter.native="editContent('form_base')"
                      />
                      <span v-else>{{ form.orgName }}</span>
                    </el-form-item>
                  </el-col>
                  <el-col
                    :md="this.adaptiveGrid.md"
                    :lg="this.adaptiveGrid.lg"
                  >
                    <el-form-item :label="this.isEditForm?'组织机构代码':'组织机构代码：'" prop="orgCode">
                      <el-input
                        v-if="this.isEditForm"
                        ref="orgCode"
                        v-model="form.orgCode"
                        :disabled="disabled"
                        clearable
                        placeholder="请输入组织机构代码"
                        @keyup.enter.native="editContent('form_base')"
                        @keyup.native="transformNumberLetter(form.orgCode,'orgCode')"
                      />
                      <span v-else>{{ form.orgCode }}</span>
                    </el-form-item>
                  </el-col>
                  <el-col :md="this.adaptiveGrid.md" :lg="this.adaptiveGrid.lg">
                    <el-form-item :label="this.isEditForm?'建筑面积(m²)':'建筑面积(m²)：'" prop="buildArea">
                      <el-input
                        v-if="this.isEditForm"
                        ref="buildArea"
                        v-model="form.buildArea"
                        type="text"
                        :disabled="disabled"
                        clearable
                        placeholder="请输入建筑面积"
                        @keyup.enter.native="editContent('form_base')"
                        @keyup.native="transformNumber(form.buildArea,'buildArea')"
                      />
                      <span v-else>{{ form.buildArea }}</span>
                    </el-form-item>
                  </el-col>
                  <el-col :md="this.adaptiveGrid.md" :lg="this.adaptiveGrid.lg">
                    <el-form-item :label="this.isEditForm?'所属居委':'所属居委：'" prop="areaCode">
                      <Address
                        v-if="this.isEditForm"
                        :id-edit="idEdit"
                        :area-code="areaCode"
                        :form-code="form.areaCode"
                        :width="'100%'"
                        @keyup.enter.native="editContent('form_base')"
                        @getAreaCode="getAreaCode_reg"
                        @getAreaLevel="getAreaLevel_reg"
                      />
                      <span v-else>{{ form.areaCodeStr }}</span>
                    </el-form-item>
                  </el-col>
                  <el-col :md="this.adaptiveGrid.md" :lg="this.adaptiveGrid.lg">
                    <el-form-item :label="this.isEditForm?'建设地址':'建设地址：'" prop="addr">
                      <el-input
                        v-if="this.isEditForm"
                        ref="addr"
                        v-model="form.addr"
                        type="text"
                        :disabled="disabled"
                        clearable
                        placeholder="请输入详细地址"
                        @keyup.enter.native="editContent('form_base')"
                      />
                      <span v-else>{{ form.addr }}</span>
                    </el-form-item>
                  </el-col>
                  <el-col :md="this.adaptiveGrid.md" :lg="this.adaptiveGrid.lg">
                    <el-form-item :label="this.isEditForm?'成立时间':'成立时间：'" prop="establishTime">
                      <el-date-picker
                        v-if="this.isEditForm"
                        v-model="form.establishTime"
                        type="date"
                        placeholder="请选择成立时间"
                        style="width:100%;"
                        format="yyyy年MM月dd日"
                        value-format="yyyy-MM-dd"
                        @keyup.enter.native="editContent('form_base')"
                      />
                      <span v-else>{{ form.establishTime }}</span>
                    </el-form-item>
                  </el-col>
                  <el-col :md="this.adaptiveGrid.md" :lg="this.adaptiveGrid.lg">
                    <el-form-item :label="this.isEditForm?'时间分类':'时间分类：'" prop="timeClassification">
                      <el-input
                        v-if="this.isEditForm"
                        ref="timeClassification"
                        v-model="form.timeClassification"
                        type="text"
                        :disabled="disabled"
                        clearable
                        placeholder="请输入时间分类"
                        @keyup.enter.native="editContent('form_base')"
                      />

                      <span v-else>{{ form.timeClassification }}</span>
                    </el-form-item>
                  </el-col>
                  <el-col :md="this.adaptiveGrid.md" :lg="this.adaptiveGrid.lg">
                    <el-form-item :label="this.isEditForm?'竣工时间':'竣工时间：'" prop="completionTime">
                      <el-date-picker
                        v-if="this.isEditForm"
                        v-model="form.completionTime"
                        type="date"
                        placeholder="请选择竣工时间"
                        style="width:100%;"
                        format="yyyy年MM月dd日"
                        value-format="yyyy-MM-dd"
                        @keyup.enter.native="editContent('form_base')"
                      />
                      <span v-else>{{ form.completionTime }}</span>
                    </el-form-item>
                  </el-col>
                  <el-col :md="this.adaptiveGrid.md" :lg="this.adaptiveGrid.lg">
                    <el-form-item :label="this.isEditForm?'建筑层数':'建筑层数：'" prop="buildingFloors">
                      <el-input
                        v-if="this.isEditForm"
                        ref="buildingFloors"
                        v-model="form.buildingFloors"
                        type="text"
                        :disabled="disabled"
                        clearable
                        placeholder="请输入建筑层数"
                        @keyup.enter.native="editContent('form_base')"
                        @keyup.native="transformNumber(form.buildingFloors,'buildingFloors')"
                      />
                      <span v-else>{{ form.buildingFloors }}</span>
                    </el-form-item>
                  </el-col>
                  <el-col :md="this.adaptiveGrid.md" :lg="this.adaptiveGrid.lg">
                    <el-form-item :label="this.isEditForm ? '级别':'级别：'" prop="level">
                      <el-select
                        v-if="this.isEditForm"
                        v-model="form.level"
                        placeholder="请选择级别"
                        clearablexing
                        style="width:100%;"
                        @keyup.enter.native="editContent('form_base')"
                      >
                        <el-option
                          v-for="item in levelOptions"
                          v-if="levelOptions.length !== 0"
                          :key="item.dictValue"
                          :label="item.dictLabel"
                          :value="item.dictValue"
                        />
                      </el-select>
                      <span v-else>{{ form.levelName }}</span>
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
                          v-if="open_stateOptions.length !== 0"
                          :key="item.dictValue"
                          :label="item.dictLabel"
                          :value="item.dictValue"
                        />
                      </el-select>
                      <span v-else>{{ form.openStateName }}</span>
                    </el-form-item>
                  </el-col>
                  <el-col :md="24" :lg="24" style="height: auto;">
                    <el-form-item :label="this.isEditForm?'设施图片':'设施图片：'">
                      <el-row v-if="!this.isEditForm" class="agencyImageRow">
                        <viewer :images="imageInfoVosLookUrl">
                          <el-col v-for="(item, index) in imageInfoVosLookUrl" :key="index" class="agencyImageCol" style="cursor: pointer">
                            <img :src="item" class="agencyImage">
                          </el-col>
                        </viewer>
                      </el-row>
                      <div v-else class="agencyImageWrap">
                        <Uploadpics :id-edit="idEdit" :form-imgs="form.imageInfoVos" @pics="getPicList" @keyup.enter.native="editContent('form_base')" />
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
                    <el-form-item :label="this.isEditForm?'运营单位性质':'运营单位性质：'" prop="natureOfOperatingUnit">
                      <el-select
                        v-if="this.isEditForm"
                        v-model="form.natureOfOperatingUnit"
                        placeholder="请选择运营单位性质"
                        clearable
                        style="width:100%;"
                        @keyup.enter.native="editContent('form_base')"
                      >
                        <el-option
                          v-for="item in natureOfOperatingUnitOptions"
                          v-if="natureOfOperatingUnitOptions.length !== 0"
                          :key="item.dictValue"
                          :label="item.dictLabel"
                          :value="item.dictValue"
                        />
                      </el-select>
                      <span v-else>{{ form.natureOfOperatingUnitName }}</span>
                    </el-form-item>
                  </el-col>
                  <el-col :md="this.adaptiveGrid.md" :lg="this.adaptiveGrid.lg">
                    <el-form-item :label="this.isEditForm?'运营单位名称':'运营单位名称：'" prop="operatingUnitName">
                      <el-input
                        v-if="this.isEditForm"
                        ref="operatingUnitName"
                        v-model="form.operatingUnitName"
                        :disabled="disabled"
                        clearable
                        placeholder="请输入运营单位名称"
                        @keyup.enter.native="editContent('form_base')"
                      />
                      <span v-else>{{ form.operatingUnitName }}</span>
                    </el-form-item>
                  </el-col>
                  <el-col :md="this.adaptiveGrid.md" :lg="this.adaptiveGrid.lg">
                    <el-form-item :label="this.isEditForm?'负责人姓名':'负责人姓名：'" prop="nameOfPersonInCharge">
                      <el-input
                        v-if="this.isEditForm"
                        ref="nameOfPersonInCharge"
                        v-model="form.nameOfPersonInCharge"
                        :disabled="disabled"
                        clearable
                        placeholder="请输入负责人姓名"
                        @keyup.enter.native="editContent('form_base')"
                      />
                      <span v-else>{{ form.nameOfPersonInCharge }}</span>
                    </el-form-item>
                  </el-col>
                  <el-col :md="this.adaptiveGrid.md" :lg="this.adaptiveGrid.lg">
                    <el-form-item :label="this.isEditForm?'联系方式':'联系方式：'" prop="phone">
                      <el-input
                        v-if="this.isEditForm"
                        ref="phone"
                        v-model="form.phone"
                        :disabled="disabled"
                        clearable
                        placeholder="请输入联系人方式"
                        @keyup.enter.native="editContent('form_base')"
                      />
                      <span v-else>{{ form.phone }}</span>
                    </el-form-item>
                  </el-col>
                  <el-col :md="this.adaptiveGrid.md" :lg="this.adaptiveGrid.lg">
                    <el-form-item :label="this.isEditForm?'政府运营':'政府运营：'" prop="governmentOperation">
                       <el-select
                        v-if="this.isEditForm"
                        v-model="form.governmentOperation"
                        placeholder="请输入政府运营"
                        clearable
                        style="width:100%;"
                        @keyup.enter.native="editContent('form_base')"
                      >
                        <el-option
                          v-for="item in xy_need_help_options"
                          v-if="xy_need_help_options.length !== 0"
                          :key="item.dictValue"
                          :label="item.dictLabel"
                          :value="item.dictValue"
                        />
                      </el-select>
                      <span v-else>{{ form.governmentOperationName }}</span>
                    </el-form-item>
                  </el-col>
                  <el-col :md="this.adaptiveGrid.md" :lg="this.adaptiveGrid.lg">
                    <el-form-item :label="this.isEditForm?'闲置待运营':'闲置待运营：'" prop="idleForOperation">
                      <el-select
                        v-if="this.isEditForm"
                        v-model="form.idleForOperation"
                        placeholder="请输入闲置待运营"
                        clearable
                        style="width:100%;"
                        @keyup.enter.native="editContent('form_base')"
                      >
                        <el-option
                          v-for="item in xy_need_help_options"
                          v-if="xy_need_help_options.length !== 0"
                          :key="item.dictValue"
                          :label="item.dictLabel"
                          :value="item.dictValue"
                        />
                        </el-select>
                      <span v-else>{{ form.idleForOperationName }}</span>
                    </el-form-item>
                  </el-col>
                  <el-col :md="this.adaptiveGrid.md" :lg="this.adaptiveGrid.lg">
                    <el-form-item :label="this.isEditForm?'社会化运营':'社会化运营：'" prop="socialOperation">
                      <el-select
                        v-if="this.isEditForm"
                        v-model="form.socialOperation"
                        placeholder="请输入社会化运营"
                        clearable
                        style="width:100%;"
                        @keyup.enter.native="editContent('form_base')"
                      >
                        <el-option
                          v-for="item in xy_need_help_options"
                          v-if="xy_need_help_options.length !== 0"
                          :key="item.dictValue"
                          :label="item.dictLabel"
                          :value="item.dictValue"
                        />
                        </el-select>
                      <span v-else>{{ form.socialOperationName }}</span>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-form>
            </el-collapse-item>
            <!--运营信息item end-->
          </el-collapse>
        </el-tab-pane>
        <!--基本信息tabs end-->

        <!--服务信息tabs start-->
        <el-tab-pane label="服务信息" name="service" :disabled="this.modelType === 'look'? disabled : ''">
          <el-collapse v-model="activeCollapse">
            <!--基本服务item start-->
            <template v-for="(item, index) in this.institutionField">
              <InstituField :current-item="item" :index="index" :model-type="modelType" />
            </template>
            <!--基本服务item end-->
          </el-collapse>
        </el-tab-pane>
        <!--服务信息tabs end-->

        <!--扩展信息tabs start-->
        <el-tab-pane label="扩展信息" name="extension" :disabled="this.modelType === 'look'? disabled : ''">
          <el-collapse v-model="activeCollapse">
            <!--服务类型及补贴信息item start-->
            <el-collapse-item name="baseItem_6">
              <template slot="title">
                <div class="titleSlider">
                  <span>
                    <i class="titleTip" />服务类型及补贴信息
                  </span>
                </div>
              </template>
              <el-form
                ref="form_subsidy"
                key="form_subsidy"
                :model="form"
                :rules="this.isEditForm?rulesForm:null"
                label-width="200px"
              >
                <el-row :gutter="0">
                  <el-col :md="this.adaptiveGrid.md" :lg="this.adaptiveGrid.lg">
                    <el-form-item :label="this.isEditForm?'辖区内老人数':'辖区内老人数：'" prop="numberOfElderlyInTheJurisdiction">
                      <el-input
                        v-if="this.isEditForm"
                        ref="numberOfElderlyInTheJurisdiction"
                        v-model="form.numberOfElderlyInTheJurisdiction"
                        :disabled="disabled"
                        clearable
                        placeholder="请输入辖区内老人数"
                        @keyup.enter.native="editContent('form_base')"
                        @keyup.native="transformNumber(form.numberOfElderlyInTheJurisdiction,'numberOfElderlyInTheJurisdiction')"
                      />
                      <span v-else>{{ form.numberOfElderlyInTheJurisdiction }}</span>
                    </el-form-item>
                  </el-col>
                  <el-col :md="this.adaptiveGrid.md" :lg="this.adaptiveGrid.lg">
                    <el-form-item :label="this.isEditForm?'日常运营补贴（万元/年）':'日常运营补贴（万元/年）：'" prop="dailyOperatingSubsidies">
                      <el-input
                        v-if="this.isEditForm"
                        ref="dailyOperatingSubsidies"
                        v-model="form.dailyOperatingSubsidies"
                        :disabled="disabled"
                        clearable
                        placeholder="请输入日常运营补贴金额"
                        @keyup.enter.native="editContent('form_base')"
                        @keyup.native="transformNumber(form.dailyOperatingSubsidies,'dailyOperatingSubsidies')"
                      />
                      <span v-else>{{ form.dailyOperatingSubsidies }}</span>
                    </el-form-item>
                  </el-col>
                  <el-col :md="this.adaptiveGrid.md" :lg="this.adaptiveGrid.lg">
                    <el-form-item :label="this.isEditForm?'购买服务居家服务补贴人数':'购买服务居家服务补贴人数：'" prop="homeServiceSubsidyNumberOfPeople">
                      <el-input
                        v-if="this.isEditForm"
                        ref="homeServiceSubsidyNumberOfPeople"
                        v-model="form.homeServiceSubsidyNumberOfPeople"
                        :disabled="disabled"
                        clearable
                        placeholder="请输入购买服务居家服务补贴人数"
                        @keyup.enter.native="editContent('form_base')"
                        @keyup.native="transformNumber(form.homeServiceSubsidyNumberOfPeople,'homeServiceSubsidyNumberOfPeople')"
                      />
                      <span v-else>{{ form.homeServiceSubsidyNumberOfPeople }}</span>
                    </el-form-item>
                  </el-col>
                  <el-col :md="this.adaptiveGrid.md" :lg="this.adaptiveGrid.lg">
                    <el-form-item :label="this.isEditForm?'其他':'其他：'" prop="other">
                      <el-input
                        v-if="this.isEditForm"
                        ref="other"
                        v-model="form.other"
                        :disabled="disabled"
                        clearable
                        placeholder="请输入其他信息"
                        @keyup.enter.native="editContent('form_base')"
                      />
                      <span v-else>{{ form.other }}</span>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-form>
            </el-collapse-item>
            <!--服务类型及补贴信息item end-->
          </el-collapse>
        </el-tab-pane>
        <!--扩展信息tabs end-->
      </el-tabs>

      <!--新增时,编辑时-->
      <el-footer v-if="this.modelType === 'add' || this.modelType === 'edit'">
        <div v-if="this.activeTabs === 'base'">
          <el-button type="warning" class="base-btn btnMarginLeft15" @click="tabsStep('service','form_base','form_operate')">下一步</el-button>
          <el-button class="cancel-btn btnMarginLeft15" @click="cancelDetailsPage">取消</el-button>
        </div>
        <div v-else-if="this.activeTabs === 'service'">
          <el-button type="warning" class="base-btn btnMarginLeft15" @click="tabsStep('extension')">下一步</el-button>
          <el-button type="warning" class="base-btn btnMarginLeft15" @click="tabsLastStep('base')">上一步</el-button>
        </div>
        <div v-else>
          <el-button type="warning" class="base-btn btnMarginLeft15" @click="editContent('form_subsidy')">确定</el-button>
          <el-button class="cancel-btn btnMarginLeft15" @click="cancelDetailsPage">取消</el-button>
          <el-button type="warning" class="base-btn btnMarginLeft15" @click="tabsLastStep('service')">上一步</el-button>
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
import _ from 'lodash'
import {
  institutionDetailsData,
  submitDataAdd,
  submitDataEdit
} from '@/api/facilitiesConfig/chiZhouServiceFacilities'
import { institutionFieldConfig, allSelectdictionaryData } from '@/api/facilitiesConfig/communityFacilities'
import { adaptiveGrid_max, adaptiveGrid_plus } from '@/common/index'
import InstituField from '@/components/InstituField'
import Uploadpics from '@/components/Uploadpics'
import Address from '@/components/Address'
import { facilityTypeFun, checkboxRecursive } from '@/common/facilityType'
import { closeSelectedTag } from '@/utils/rooterJump'
import { transformNumber, transformNumberLetter, validateForms } from '@/utils/index'
import { getEditAuthority } from '@/api/user'
import { verifyHomePhoneOrMobile } from '@/utils/validate'
import data2blob from '../../../../components/ImageCropper/utils/data2blob'
export default {
  components: { InstituField, Address, Uploadpics },
  data() {
    // 校验机构名称
    const verifyFullName = (rule, value, callback) => {
      if (value.length === 0) {
        callback(new Error('机构名称不能为空，请输入！'))
      } else {
        if (/\s/.test(value)) {
          callback(new Error('姓名不能包含空格，请重新输入！'))
        } else {
          if (value.length >= 100) {
            callback(new Error('机构名称长度不能超过100个汉字，请重新输入！'))
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

    //校验联系方式
    // const verifyHomePhoneOrMobile = (rule,value,callback) =>{
    //   if(value){
    //     if (/^\d{3,4}[-]\d{7,8}$/.test(value)) {
    //       callback()
    //     } else if (/^(0|86|17951)?(13[0-9]|15[012356789]|166|199|17[35678]|18[0-9]|14[57])[0-9]{8}$/.test(value)) {
    //       callback()
    //     } else {
    //       callback(new Error('电话或手机号码格式有误，请重新输入！'))
    //     }
    //   }else{
    //     callback()
    //   }
    // }

    return {
      // 下拉框字典数据
      open_stateOptions: [], // 开放状态
      levelOptions: [], //级别
      corp_attrOptions: [], // 法人性质
      natureOfOperatingUnitOptions:[], //运营单位性质
      xy_need_help_options:[],  //是否下拉

      extensionServes_items: false, // 提供拓展服务的子选项
      isEditForm: true, // 页面表单是否可编辑操作。查看时：false,编辑-新增时：true
      idEdit: true, // 区域级联下拉框是编辑时还是新增时。编辑时：false,新增时：true

      // 机构类型的字段配置
      institutionField: [
        { children: [] },
        { children: [] },
        { children: [] }
      ],
      // 表单
      form: {
        // -----基本信息-------
        orgName: '', // 设施名称
        orgCode: '', // 组织机构代码
        orgExtendId:'', //池州机构扩展表ID 编辑需要回传
        buildArea: '', // 建筑面积
        areaCode:[], //所属居委
        areaCodeStr:'', //所属居委 查看用
        addr:'',        //建设地址
        establishTime:'',      //成立时间
        timeClassification:'',             //时间分类
        completionTime:'',             //竣工时间
        buildingFloors:null,             //建筑层数
        level:'',             //级别
        levelName:'',         //级别查看用
        openState:'',         //开放状态
        openStateName:'',     //开放状态查看
        imageInfoVos:[],             //设施图片
        // -------运营信息--------
        natureOfOperatingUnit: '', // 运营单位性质
        natureOfOperatingUnitName:'',//运营单位性质查看
        operatingUnitName: '', // 运营单位名称
        nameOfPersonInCharge: '', // 负责人姓名
        phone:'',                  //联系方式
        governmentOperation:'',        //政府运营
        governmentOperationName:'',    //政府运营 查看用
        idleForOperation:'',             //闲置待运营
        idleForOperationName:'',       //闲置待运营 查看用
        socialOperation:'',                  //社会化运营
        socialOperationName:'',          //社会化运营 查看用
        // -----服务信息----
        providerItemVos: [],
        // -----扩展信息----
        // -----服务类型及补贴信息
        numberOfElderlyInTheJurisdiction:null,  //辖区内老人数
        dailyOperatingSubsidies:null,      //日常运营补贴（完元/年）
        homeServiceSubsidyNumberOfPeople:null,  //购买服务居家服务补贴人数
        other:''              //其他

      },
      orgTypeName: '', // 机构类型汉字注释
      // form 表单的验证规则
      rulesForm: {
        // 机构名称
        orgName: [
          { required: true, trigger: 'blur', validator: verifyFullName }
        ],
        // 联系方式
        phone: [
          { trigger: 'blur', validator: verifyHomePhoneOrMobile },
          { trigger: 'change', validator: verifyHomePhoneOrMobile }
        ],
        //机构地址
        addr:[
          { trigger: 'blur', max: 30, message: '机构地址长度不能超过30，请重新输入！' }
        ],
        operatingUnitName: [
          { trigger: 'blur', max: 20, message: '运营单位长度不能超过20，请重新输入！' }
        ],
        nameOfPersonInCharge: [
          { trigger: 'blur', max: 20, message: '运营方负责人长度不能超过20，请重新输入！' }
        ],
        // 所属居委
        areaCode: [
          { required: true, trigger: 'change', validator: verifyAreaCode }
        ],
      },
      disabled: false, // 表单是否可编辑
      activeTabs: 'base', // tab标签切换默认选中name参数
      activeCollapse: ['baseItem_1', 'baseItem_2', 'baseItem_3', 'baseItem_4', 'baseItem_5', 'baseItem_6', 'baseItem_7'], // 折叠面板默认打开name参数
      areaCodeOptions: [], // 行政区域树节点数据
      defaultProps: {
        children: 'children',
        label: 'areaName',
        value: 'areaCode'
      },
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
      modelType: '', // 查看：look  编辑：edit  新增：add
      areaCode: [], // 所属居委全部ID
      instituType: '', // 机构类型
      serviceMsgObj: [], // 服务信息表单单选框和复选框选中的值
      imageInfoVosLookUrl: [], // 查看时的图片路径
      editAuthority: false,// 编辑按钮的权限
      resultArr:[]  //同步校验结果组
    }
  },
  // 在模板渲染成html后调用，通常是初始化页面完成后，再对html的dom节点进行一些需要的操作。
  mounted() {
    this.instituType = this.$route.query.instituType
    this.modelType = this.$route.query.modelType
    // 当前机构id
    const _userId_ = this.$route.query.id || ''
    this.form.orgType = this.$route.query.instituType
    this.orgTypeName = facilityTypeFun(this.$route.query.instituType)
    this.getData(_userId_)

    if (this.modelType === 'look') {
      /* 编辑按钮的权限控制*/
      getEditAuthority(this.$route.query.editAuthority).then(response => {
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
      await this.getSelect()
      if (this.modelType === 'edit') {
        this.isEditForm = true
        await this.editGetData(id, 'edit')
      } else if (this.modelType === 'add') {
        // 获取机构类型的字段配置
        institutionFieldConfig(this.instituType).then(response => {
          this.institutionField = response.data['2']
        }).catch(() => {
          this.$message.error(this.orgTypeName + '机构获取服务信息失败！')
        })
        this.isEditForm = true
        this.idEdit = false
      } else if (this.modelType === 'look') {
        this.isEditForm = false
        await this.editGetData(id, '')
      }
    },
    // 编辑-查看 获取机构数据
    editGetData(id, st) {
      return new Promise((resolve, reject) => {
        // 请求当前机构信息
        institutionDetailsData(id, st).then(response => {
          // 页面form表单的值
          this.form = response.data
          // 页面服务信息的表单值
          this.institutionField = response.data.serviceProviderConfigVoList['2']
          // 处理区域的code,用以渲染区域下拉组件
          if (st === 'edit') {
            this.form.areaCode = this.form.areaCode.split(',')
          }
          this.form.imageInfoVos.forEach((item) => {
            this.imageInfoVosLookUrl.push(`${process.env.VUE_APP_API_IMGURL}${item.imgUrl}`)
          })
          this.areaLevel = this.form.areaCode.length
          this.idEdit = false
        }).catch(() => {
          this.$message.error('获取‘' + this.orgTypeName + '’机构信息失败！')
        })
      })
    },
    // 获取下拉字典
    getSelect() {
      return new Promise((resolve, reject) => {
        // 数据字典接口
        const dicKey = 'open_state,corp_attr_2,level_chizhou,nature_of_operating_unit_chizhou,xy_need_help'
        allSelectdictionaryData(dicKey).then(response => {
          if (response.code === 0) {
            for (const k in response.data) {
              switch (k) {
                // 开放状态
                case 'open_state':
                  this.open_stateOptions = response.data[k]
                  break
                  // 法人性质
                case 'corp_attr_2':
                  this.corp_attrOptions = response.data[k]
                  break
                  //级别
                case 'level_chizhou':
                  this.levelOptions = response.data[k]
                  //
                case 'nature_of_operating_unit_chizhou':
                  this.natureOfOperatingUnitOptions = response.data[k]
                case 'xy_need_help':
                  this.xy_need_help_options = response.data[k]
              }
            }
          } else {
            this.$message.error(this.orgTypeName + '机构数据字典接口请求失败！')
          }
          resolve()
        }).catch(() => {
          this.$message.error(this.orgTypeName + '机构数据字典接口请求失败！')
          reject()
        })
      })
    },
    // 获取服务信息表单的值
    getServiceCheckboxValue() {
      this.serviceMsgObj = []
      this.serviceMsgObj = checkboxRecursive(this.institutionField, this, this.serviceMsgObj)
      this.serviceMsgObj = [...new Set(this.serviceMsgObj)]
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
      }).catch(() => {
      })
    },
    // 取消，返回按钮，关闭详情页
    closeDetailsPage() {
      // 关闭页面
      closeSelectedTag(this, this.$route)
      this.$router.push({ path: '/streetPlatform/facilitiesConfig/communityFacilities' })
    },
    //下一步校验
    checkRules(formName){
      //校验
      this.resultArr = []
      let that = this
      function check(item) {
        let result = new Promise(function(resolve,reject){
            that.$refs[item].validate((valid) =>{
            if(valid){
              resolve()
              // console.log('成功',item)
            }else{
              reject()
              // console.log('失败',item)
            }
          })
        })
        that.resultArr.push(result)
      }
      formName.forEach(item => {
        check(item)
      })
    },
    //上一步
    tabsLastStep(tabsName){
      this.activeTabs = tabsName
    },
    // 下一步
    tabsStep(tabsName,...form) {
      // 居委
        if (this.areaLevel && this.areaLevel < 5) {
          this.activeTabs = 'base'
          window.scrollTo(0, 0)
          this.$message.error('所属居委选择错误，请至少选择到居委！')
          return false
        }
      // 联系方式
      if (this.form.phone && this.form.phone.length > 20) {
         this.$message.error('联系方式长度不能超过20，请重新输入！')
         return false
      }
      //校验
      this.checkRules(form)
      let that = this
      Promise.all(that.resultArr).then(function(){
        that.activeTabs = tabsName
      }).catch(function(){
        this.$message.error('校验error')
      })
    },
    // 确定按钮-提交表单
    editContent(...formName) {
      this.checkRules(formName)
      let that = this
      Promise.all(that.resultArr).then(function(){
        const params = that.form
        params.areaCode = that.areaCode.length === 0 ? '' : that.areaCode[that.areaCode.length - 1] + ''
        // 处理服务信息字段
        that.getServiceCheckboxValue()
        params.providerItemVos = that.serviceMsgObj
        // 服务信息字典结构，编辑提交的时候不传
        params.serviceProviderConfigVoList = null
        // 新增
        if (that.modelType === 'add') {
          submitDataAdd(params).then(response => {
            if (response.code === 0) {
              that.$message({
                type: 'success',
                message: '新增‘' + that.orgTypeName + '’机构信息成功!'
              })
              // 关闭页面
              that.closeDetailsPage()
            } else {
              that.$message.error(response.msg)
            }
          }).catch(() => {
            that.$message.error('新增‘' + that.orgTypeName + '’机构信息失败!')
          })
        }
        // 编辑
        else if (that.modelType === 'edit') {
          if (params.openState == '正常') {
              params.openState = 'open_state_normal'
            }
            if (params.openState == '筹备') {
              params.openState = 'open_state_prepare'
            }
            if (params.openState == '暂停') {
              params.openState = 'open_state_pause'
            }
            if (params.openState == '关闭') {
              params.openState = 'open_state_close'
            }
          submitDataEdit(params).then(response => {
            if (response.code === 0) {
              that.$message({
                type: 'success',
                message: '编辑‘' + that.orgTypeName + '’机构信息成功!'
              })
              // 关闭页面
              that.closeDetailsPage()
            } else {
              that.$message.error(response.msg)
            }
          }).catch(() => {
            that.$message.error('编辑‘' + that.orgTypeName + '’机构信息失败!')
          })
        }
        // 查看
        else if (that.modelType === 'look') {
          that.closeDetailsPage()
        }
      }).catch(err => {
        window.scrollTo(0, 0)
        return false
      })
    },
    // 获取所属居委
    getAreaCode_reg(val) {
      this.areaCode = val
    },
    // 获取所属居委level
    getAreaLevel_reg(val) {
      this.areaLevel = val
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
      const _orgType_ = this.$route.query.instituType
      const _id_ = this.$route.query.id
      this.$router.push({
        path: `/communityFacilities/chiZhouService/${_id_}`,
        query: { 'id': _id_, 'modelType': 'edit', 'instituType': _orgType_, '_title': `编辑${this.form.orgName}` }
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
<style>
.el-tabs__item.is-active{
    color: #1890ff !important
}
</style>
