<template>
  <el-container>
    <el-main class="tableContainer">
      <el-tabs v-model="activeTabs">
        <!--基本信息tabs start-->
        <el-tab-pane label="基本信息" name="base" :disabled="this.modelType === 'look'? disabled : ''" >
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
                    <el-form-item :label="this.isEditForm?'机构名称':'机构名称：'" prop="orgName">
                      <el-input
                        v-if="this.isEditForm"
                        ref="orgName"
                        v-model="form.orgName"
                        :disabled="disabled"
                        clearable
                        placeholder="请输入机构名称"
                        @keyup.enter.native="editContent('form_base')"
                      />
                      <span v-else>{{ form.orgName }}</span>
                    </el-form-item>
                  </el-col>
                  <!--组织机构代码 只有养老机构才显示-->
                  <el-col
                    v-show="this.instituType === '1010' || this.instituType === '1010_chizhou' "
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
                    <el-form-item :label="this.isEditForm ? '星级':'星级：'" prop="starRating">
                      <el-select
                        v-if="this.isEditForm"
                        v-model="form.starRating"
                        placeholder="请选择星级"
                        clearablexing
                        style="width:100%;"
                        @keyup.enter.native="editContent('form_base')"
                      >
                        <el-option
                          v-for="item in starRatingOptions"
                          v-if="starRatingOptions.length !== 0"
                          :key="item.dictValue"
                          :label="item.dictLabel"
                          :value="item.dictValue"
                        />
                      </el-select>
                      <span v-else>{{ form.starRatingName }}</span>
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
                    <el-form-item :label="this.isEditForm?'机构地址':'机构地址：'" prop="addr">
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
                  <el-col :md="24" :lg="24" style="height: auto;">
                    <el-form-item :label="this.isEditForm?'机构图片':'机构图片：'">
                      <el-row v-if="!this.isEditForm" class="agencyImageRow">
                        <el-col v-for="(item,index) in this.imageInfoVosLookUrl" class="agencyImageCol">
                          <img :src="item" class="agencyImage">
                        </el-col>
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
                    <el-form-item :label="this.isEditForm?'院长姓名':'院长姓名：'" prop="deanFullName">
                      <el-input
                        v-if="this.isEditForm"
                        ref="deanFullName"
                        v-model="form.deanFullName"
                        :disabled="disabled"
                        clearable
                        placeholder="请输入院长姓名"
                        @keyup.enter.native="editContent('form_base')"
                      />
                      <span v-else>{{ form.deanFullName }}</span>
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
                        placeholder="请输入联系方式"
                        @keyup.enter.native="editContent('form_base')"
                      />
                      <span v-else>{{ form.phone }}</span>
                    </el-form-item>
                  </el-col>
                  <el-col :md="this.adaptiveGrid.md" :lg="this.adaptiveGrid.lg">
                    <el-form-item :label="this.isEditForm?'运营模式':'运营模式：'" prop="operationMode">
                      <el-select
                        v-if="this.isEditForm"
                        v-model="form.operationMode"
                        placeholder="请选择运营模式"
                        clearable
                        style="width:100%;"
                        @keyup.enter.native="editContent('form_base')"
                      >
                        <el-option
                          v-for="item in operate_modeOptions"
                          v-if="operate_modeOptions.length !== 0"
                          :key="item.dictValue"
                          :label="item.dictLabel"
                          :value="item.dictValue"
                        />
                      </el-select>
                      <span v-else>{{ form.operationModeName }}</span>
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
            <!--拓展服务item start -->
            <el-collapse-item name="baseItem_5">
              <template slot="title">
                <div class="titleSlider">
                  <span>
                    <i class="titleTip" />拓展服务
                  </span>
                </div>
              </template>
              <el-form
                ref="form_expandServe"
                key="form_expandServe"
                :model="form"
                :rules="this.isEditForm?rulesForm:null"
                label-width="180px"
              >
                <el-row :gutter="0">
                  <el-col :md="this.adaptiveGrid.md" :lg="this.adaptiveGrid.lg">
                    <el-form-item :label="this.isEditForm?'购买责任险人数':'购买责任险人数：'" prop="buyLiabilityNumber">
                      <el-input
                        v-if="this.isEditForm"
                        ref="buyLiabilityNumber"
                        v-model="form.buyLiabilityNumber"
                        :disabled="disabled"
                        clearable
                        placeholder="请输入购买责任险人数"
                        @keyup.enter.native="editContent('form_base')"
                        @keyup.native="transformNumber(form.buyLiabilityNumber,'buyLiabilityNumber')"
                      />
                      <span v-else>{{ form.buyLiabilityNumber }}</span>
                    </el-form-item>
                  </el-col>
                  <el-col :md="this.adaptiveGrid.md" :lg="this.adaptiveGrid.lg">
                    <el-form-item :label="this.isEditForm?'购买住院护理险人数':'购买住院护理险人数：'" prop="buyNursingNumber">
                      <el-input
                        v-if="this.isEditForm"
                        ref="buyNursingNumber"
                        v-model="form.buyNursingNumber"
                        :disabled="disabled"
                        clearable
                        placeholder="请输入购买住院护理险人数"
                        @keyup.enter.native="editContent('form_base')"
                        @keyup.native="transformNumber(form.buyNursingNumber,'buyNursingNumber')"
                      />
                      <span v-else>{{ form.buyNursingNumber }}</span>
                    </el-form-item>
                  </el-col>
                  <el-col :md="this.adaptiveGrid.md" :lg="this.adaptiveGrid.lg">
                    <el-form-item :label="this.isEditForm?'消防许可证或备案号':'消防许可证或备案号：'" prop="fireControlLicense">
                      <el-input
                        v-if="this.isEditForm"
                        ref="fireControlLicense"
                        v-model="form.fireControlLicense"
                        :disabled="disabled"
                        clearable
                        placeholder="消防许可证或备案号"
                        @keyup.enter.native="editContent('form_base')"
                      />
                      <span v-else>{{ form.fireControlLicense }}</span>
                    </el-form-item>
                  </el-col>
                  <el-col :md="this.adaptiveGrid.md" :lg="this.adaptiveGrid.lg">
                    <el-form-item :label="this.isEditForm?'食品许可证号':'食品许可证号：'" prop="videoLicense">
                      <el-input
                        v-if="this.isEditForm"
                        ref="videoLicense"
                        v-model="form.videoLicense"
                        :disabled="disabled"
                        clearable
                        placeholder="请输入食品许可证号"
                        @keyup.enter.native="editContent('form_base')"
                      />
                      <span v-else>{{ form.videoLicense }}</span>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-form>
            </el-collapse-item>
            <!--拓展服务item end -->
          </el-collapse>
        </el-tab-pane>
        <!--服务信息tabs end-->

        <!--扩展信息tabs start-->
        <el-tab-pane label="扩展信息" name="extension" :disabled="this.modelType === 'look'? disabled : ''">
          <el-collapse v-model="activeCollapse">
            <!--床位信息item start-->
            <el-collapse-item name="baseItem_6">
              <template slot="title">
                <div class="titleSlider">
                  <span>
                    <i class="titleTip" />床位信息
                  </span>
                </div>
              </template>
              <el-form
                ref="form_subsidy"
                key="form_subsidy"
                :model="form"
                :rules="this.isEditForm?rulesForm:null"
                label-width="180px"
              >
                <el-row :gutter="0">
                  <el-col :md="this.adaptiveGrid.md" :lg="this.adaptiveGrid.lg">
                    <el-form-item
                      :label="this.isEditForm?'总床位':'总床位：'"
                      prop="totalBed"
                    >
                      <el-input
                        v-if="this.isEditForm"
                        ref="totalBed"
                        v-model.number="form.totalBed"
                        :disabled="disabled"
                        clearable
                        placeholder="请输入床位总数量"
                        @keyup.enter.native="editContent('form_base')"
                        @keyup.native="transformNumber(form.totalBed,'totalBed')"
                      />
                      <span v-else>{{ form.totalBed }}</span>
                    </el-form-item>
                  </el-col>
                  <el-col :md="this.adaptiveGrid.md" :lg="this.adaptiveGrid.lg">
                    <el-form-item
                      :label="this.isEditForm?'空余床位':'空余床位：'"
                      prop="availableBed"
                    >
                      <el-input
                        v-if="this.isEditForm"
                        ref="availableBed"
                        v-model.number="form.availableBed"
                        :disabled="disabled"
                        clearable
                        placeholder="请输入空余床位数量"
                        @keyup.enter.native="editContent('form_base')"
                        @keyup.native="transformNumber(form.availableBed,'availableBed')"
                      />
                      <span v-else>{{ form.availableBed }}</span>
                    </el-form-item>
                  </el-col>
                  <el-col :md="this.adaptiveGrid.md" :lg="this.adaptiveGrid.lg">
                    <el-form-item
                      :label="this.isEditForm?'护理床位':'护理床位：'"
                      prop="nursingBed"
                    >
                      <el-input
                        v-if="this.isEditForm"
                        ref="nursingBed"
                        v-model.number="form.nursingBed"
                        :disabled="disabled"
                        clearable
                        placeholder="请输入护理床位"
                        @keyup.enter.native="editContent('form_base')"
                        @keyup.native="transformNumber(form.nursingBed,'nursingBed')"
                      />
                      <span v-else>{{ form.nursingBed }}</span>
                    </el-form-item>
                  </el-col>
                  <el-col :md="this.adaptiveGrid.md" :lg="this.adaptiveGrid.lg">
                    <el-form-item
                      :label="this.isEditForm?'普通床位':'普通床位：'"
                      prop="ordinaryBed"
                    >
                      <el-input
                        v-if="this.isEditForm"
                        ref="ordinaryBed"
                        v-model.number="form.ordinaryBed"
                        :disabled="disabled"
                        clearable
                        placeholder="请输入普通床位"
                        @keyup.enter.native="editContent('form_base')"
                        @keyup.native="transformNumber(form.ordinaryBed,'ordinaryBed')"
                      />
                      <span v-else>{{ form.ordinaryBed }}</span>
                    </el-form-item>
                  </el-col>
                </el-row>

              </el-form>
            </el-collapse-item>
            <!--床位信息item end-->
            <!--入住信息item start-->
            <el-collapse-item name="baseItem_7">
              <template slot="title">
                <div class="titleSlider">
                  <span>
                    <i class="titleTip" />入住信息
                  </span>
                </div>
              </template>
              <el-form
                ref="form_stayInfo"
                key="form_stayInfo"
                :model="form"
                :rules="this.isEditForm?rulesForm:null"
                label-width="180px"
              >
                <el-row :gutter="0">
                  <el-col :md="this.adaptiveGrid.md" :lg="this.adaptiveGrid.lg">
                    <el-form-item
                      :label="this.isEditForm?'总入住人数':'总入住人数：'"
                      prop="totalOccupancy"
                    >
                      <el-input
                        v-if="this.isEditForm"
                        ref="totalOccupancy"
                        v-model.number="form.totalOccupancy"
                        :disabled="disabled"
                        clearable
                        placeholder="请输入总入住人数"
                        @keyup.enter.native="editContent('form_base')"
                        @keyup.native="transformNumber(form.totalOccupancy,'totalOccupancy')"
                      />
                      <span v-else>{{ form.totalOccupancy }}</span>
                    </el-form-item>
                  </el-col>
                  <el-col :md="this.adaptiveGrid.md" :lg="this.adaptiveGrid.lg">
                    <el-form-item
                      :label="this.isEditForm?'特困人员':'特困人员：'"
                      prop="extremelyPoor"
                    >
                      <el-input
                        v-if="this.isEditForm"
                        ref="extremelyPoor"
                        v-model.number="form.extremelyPoor"
                        :disabled="disabled"
                        clearable
                        placeholder="请输入特困人员入住人数"
                        @keyup.enter.native="editContent('form_base')"
                        @keyup.native="transformNumber(form.extremelyPoor,'extremelyPoor')"
                      />
                      <span v-else>{{ form.extremelyPoor }}</span>
                    </el-form-item>
                  </el-col>
                  <el-col :md="this.adaptiveGrid.md" :lg="this.adaptiveGrid.lg">
                    <el-form-item
                      :label="this.isEditForm?'社会老人':'社会老人：'"
                      prop="socialElderly"
                    >
                      <el-input
                        v-if="this.isEditForm"
                        ref="socialElderly"
                        v-model.number="form.socialElderly"
                        :disabled="disabled"
                        clearable
                        placeholder="请输入社会老人入住人数"
                        @keyup.enter.native="editContent('form_base')"
                        @keyup.native="transformNumber(form.bedUnused,'socialElderly')"
                      />
                      <span v-else>{{ form.socialElderly }}</span>
                    </el-form-item>
                  </el-col>
                  <el-col :md="this.adaptiveGrid.md" :lg="this.adaptiveGrid.lg">
                    <el-form-item
                      :label="this.isEditForm?'其中能力完好':'其中能力完好：'"
                      prop="whichAbilityIsIntact"
                    >
                      <el-input
                        v-if="this.isEditForm"
                        ref="whichAbilityIsIntact"
                        v-model.number="form.whichAbilityIsIntact"
                        :disabled="disabled"
                        clearable
                        placeholder="请输入能力完好入住人数"
                        @keyup.enter.native="editContent('form_base')"
                        @keyup.native="transformNumber(form.whichAbilityIsIntact,'whichAbilityIsIntact')"
                      />
                      <span v-else>{{ form.whichAbilityIsIntact }}</span>
                    </el-form-item>
                  </el-col>
                  <el-col :md="this.adaptiveGrid.md" :lg="this.adaptiveGrid.lg">
                    <el-form-item
                      :label="this.isEditForm?'其中轻度失能失智':'其中轻度失能失智：'"
                      prop="ofWhichMildDisabilityAndDementia"
                    >
                      <el-input
                        v-if="this.isEditForm"
                        ref="ofWhichMildDisabilityAndDementia"
                        v-model.number="form.ofWhichMildDisabilityAndDementia"
                        :disabled="disabled"
                        clearable
                        placeholder="请输入轻度失能失智总入住人数"
                        @keyup.enter.native="editContent('form_base')"
                        @keyup.native="transformNumber(form.ofWhichMildDisabilityAndDementia,'ofWhichMildDisabilityAndDementia')"
                      />
                      <span v-else>{{ form.ofWhichMildDisabilityAndDementia }}</span>
                    </el-form-item>
                  </el-col>
                  <el-col :md="this.adaptiveGrid.md" :lg="this.adaptiveGrid.lg">
                    <el-form-item
                      :label="this.isEditForm?'其中中度失能失智':'其中中度失能失智：'"
                      prop="ofWhichModerateDisabilityAndDementia"
                    >
                      <el-input
                        v-if="this.isEditForm"
                        ref="ofWhichModerateDisabilityAndDementia"
                        v-model.number="form.ofWhichModerateDisabilityAndDementia"
                        :disabled="disabled"
                        clearable
                        placeholder="请输入中度失能失智总入住人数"
                        @keyup.enter.native="editContent('form_base')"
                        @keyup.native="transformNumber(form.ofWhichModerateDisabilityAndDementia,'ofWhichModerateDisabilityAndDementia')"
                      />
                      <span v-else>{{ form.ofWhichModerateDisabilityAndDementia }}</span>
                    </el-form-item>
                  </el-col>
                  <el-col :md="this.adaptiveGrid.md" :lg="this.adaptiveGrid.lg">
                    <el-form-item
                      :label="this.isEditForm?'其中重度失能失智':'其中重度失能失智：'"
                      prop="ofWhichSevereDisabilityAndDementia"
                    >
                      <el-input
                        v-if="this.isEditForm"
                        ref="ofWhichSevereDisabilityAndDementia"
                        v-model.number="form.ofWhichSevereDisabilityAndDementia"
                        :disabled="disabled"
                        clearable
                        placeholder="请输入重度失能失智总入住人数"
                        @keyup.enter.native="editContent('form_base')"
                        @keyup.native="transformNumber(form.ofWhichSevereDisabilityAndDementia,'ofWhichSevereDisabilityAndDementia')"
                      />
                      <span v-else>{{ form.ofWhichSevereDisabilityAndDementia }}</span>
                    </el-form-item>
                  </el-col>
                </el-row>

              </el-form>
            </el-collapse-item>
            <!--入住信息item end-->
            <!--员工信息item start-->
            <el-collapse-item name="baseItem_8">
              <template slot="title">
                <div class="titleSlider">
                  <span>
                    <i class="titleTip" />员工信息
                  </span>
                </div>
              </template>
              <el-form
                ref="form_staffInfo"
                key="form_staffInfo"
                :model="form"
                :rules="this.isEditForm?rulesForm:null"
                label-width="180px"
              >
                <el-row :gutter="0">
                  <el-col :md="this.adaptiveGrid.md" :lg="this.adaptiveGrid.lg">
                    <el-form-item
                      :label="this.isEditForm?'总人数':'总人数：'"
                      prop="totalPeople"
                    >
                      <el-input
                        v-if="this.isEditForm"
                        ref="totalPeople"
                        v-model.number="form.totalPeople"
                        :disabled="disabled"
                        clearable
                        placeholder="请输入员工总数量"
                        @keyup.enter.native="editContent('form_base')"
                        @keyup.native="transformNumber(form.totalPeople,'totalPeople')"
                      />
                      <span v-else>{{ form.totalPeople }}</span>
                    </el-form-item>
                  </el-col>
                  <el-col :md="this.adaptiveGrid.md" :lg="this.adaptiveGrid.lg">
                    <el-form-item
                      :label="this.isEditForm?'护理员':'护理员：'"
                      prop="careWorker"
                    >
                      <el-input
                        v-if="this.isEditForm"
                        ref="careWorker"
                        v-model.number="form.careWorker"
                        :disabled="disabled"
                        clearable
                        placeholder="请输入护理员人数"
                        @keyup.enter.native="editContent('form_base')"
                        @keyup.native="transformNumber(form.careWorker,'careWorker')"
                      />
                      <span v-else>{{ form.careWorker }}</span>
                    </el-form-item>
                  </el-col>
                  <el-col :md="this.adaptiveGrid.md" :lg="this.adaptiveGrid.lg">
                    <el-form-item
                      :label="this.isEditForm?'其他人员':'其他人员：'"
                      prop="otherPersonnel"
                    >
                      <el-input
                        v-if="this.isEditForm"
                        ref="otherPersonnel"
                        v-model.number="form.otherPersonnel"
                        :disabled="disabled"
                        clearable
                        placeholder="请输入其他人员人数"
                        @keyup.enter.native="editContent('form_base')"
                        @keyup.native="transformNumber(form.otherPersonnel,'otherPersonnel')"
                      />
                      <span v-else>{{ form.otherPersonnel }}</span>
                    </el-form-item>
                  </el-col>
                  <el-col :md="this.adaptiveGrid.md" :lg="this.adaptiveGrid.lg">
                    <el-form-item
                      :label="this.isEditForm?'平均年龄':'平均年龄：'"
                      prop="averageAge"
                    >
                      <el-input
                        v-if="this.isEditForm"
                        ref="averageAge"
                        v-model.number="form.averageAge"
                        :disabled="disabled"
                        clearable
                        placeholder="请输入员工平均年龄"
                        @keyup.enter.native="editContent('form_base')"
                        @keyup.native="transformNumber(form.averageAge,'averageAge')"
                      />
                      <span v-else>{{ form.averageAge }}</span>
                    </el-form-item>
                  </el-col>
                </el-row>

              </el-form>
            </el-collapse-item>
            <!--员工信息item end-->
          </el-collapse>
        </el-tab-pane>
        <!--扩展信息tabs end-->
      </el-tabs>

      <!--新增时,编辑时-->
      <el-footer v-if="this.modelType === 'add' || this.modelType === 'edit'">
        <div v-if="this.activeTabs === 'base'">
          <el-button type="warning" class="base-btn btnMarginLeft15" @click="tabsStep('service','form_base','form_operate')">下一步</el-button>
          <el-button class="cancel-btn" @click="cancelDetailsPage">取消</el-button>
        </div>
        <div v-else-if="this.activeTabs === 'service'">
          <el-button type="warning" class="base-btn btnMarginLeft15" @click="tabsStep('extension','form_expandServe')">下一步</el-button>
          <el-button type="warning" class="base-btn btnMarginLeft15" @click="tabsLastStep('base')">上一步</el-button>
        </div>
        <div v-else>
          <el-button type="warning" class="base-btn btnMarginLeft15" @click="editContent('form_subsidy','form_stayInfo','form_staffInfo')">确定</el-button>
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
import {
  institutionFieldConfig,
  allSelectdictionaryData,
  institutionDetailsData,
  submitDataAdd,
  submitDataEdit
} from '@/api/facilitiesConfig/chiZhouPensionAgency'
import { adaptiveGrid_max, adaptiveGrid_plus } from '@/common/index'
import InstituField from '@/components/InstituField'
import Uploadpics from '@/components/Uploadpics'
import Address from '@/components/Address'
import { checkboxRecursive } from '@/common/facilityType'
import { closeSelectedTag } from '@/utils/rooterJump'
import { transformNumber, transformNumberLetter } from '@/utils/index'
import { getEditAuthority } from '@/api/user'
// import { verifyHomePhoneOrMobile } from '@/utils/validate'
export default {
  components: { InstituField, Uploadpics,Address },
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
    //校验空余床位、普通床位、护理床位，不能大于总床位
    //普通床位与护理床位校验 护理 + 普通 = 总床位
    const verifyCheckBed = (rule, value, callback) => {
      if(value && parseInt(value) > parseInt(this.form.totalBed)) {
        callback(new Error('该床位不能大于总床位，请重新输入!'))
      }else{
        callback()
      }
    }

    //校验联系方式
    const verifyHomePhoneOrMobile = (rule,value,callback) =>{
      if(value){
        if (/^\d{3,4}[-]\d{7,8}$/.test(value)) {
          callback()
        } else if (/^(0|86|17951)?(13[0-9]|15[012356789]|166|199|17[35678]|18[0-9]|14[57])[0-9]{8}$/.test(value)) {
          callback()
        } else {
          callback(new Error('电话或手机号码格式有误，请重新输入！'))
        }
      }else{
        callback()
      }
    }

    return {
      // 下拉框字典数据
      operate_modeOptions: [], // 运营模式
      starRatingOptions: [], // 星级
      open_stateOptions: [], // 开放状态

      medical: ['临近二、三级医院', '与医疗机构签约'],
      extensionServes: ['提供延展服务'],
      extensionServes_a: ['收住认知症老人', '开展拓展服务', '提供居家上门服务', '提供辅具租赁', '其它'],
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
        orgName: '', // 机构名称
        orgCode: '', // 组织机构代码
        orgExtendId:'', //池州机构扩展表ID 编辑需要回传
        buildArea: '', // 建筑面积
        openState: '', // 开放状态
        openStateName:'', //开放状态查看用
        imageInfoVos: [], // 机构图片
        starRating: '', // 星级
        starRatingName: '', //星级 查看用
        addr: '', // 机构地址
        areaCode:[], //所属居委
        areaCodeStr:'', //所属居委 查看用
        // -------运营信息--------
        operationMode: '', // 运营模式
        operationModeName:'', //运营模式查看用
        phone: '', // 联系方式
        deanFullName: '', // 院长
        // ------拓展服务------
        buyLiabilityNumber: null, // 购买责任险人数
        buyNursingNumber: null, // 购买住院护理险人数
        fireControlLicense: null, // 消防许可证或备案号
        videoLicense: null, // 食品许可证号
        // -----床位信息------
        totalBed: null, // 总床位,
        availableBed: null,// 空余床位
        nursingBed: null,// 护理床位
        ordinaryBed: null,// 普通床位
        // -----入住信息------
        totalOccupancy: null,// 总入住人数
        extremelyPoor: null,// 特困人员
        socialElderly: null,// 社会老人
        whichAbilityIsIntact: null,// 其中能力完好
        ofWhichMildDisabilityAndDementia: null,// 其中轻度失能失智
        ofWhichModerateDisabilityAndDementia: null,// 其中中度失能失智
        ofWhichSevereDisabilityAndDementia: null,// 其中重度失能失智
        // -----员工信息------
        totalPeople:null,// 总人数
        careWorker: null,// 护理员
        otherPersonnel: null,// 其他人员
        averageAge: null,// 平均年龄
        // -----服务信息----
        providerItemVos: []
      },
      curingRatio: '', // 养护比（页面上计算的值）
      // form 表单的验证规则
      rulesForm: {
        // 机构名称
        orgName: [
          { required: true, trigger: 'blur', validator: verifyFullName }
        ],
        // 运营方联系方式
        phone: [
          { trigger: 'blur', validator: verifyHomePhoneOrMobile },
          { trigger: 'change', validator: verifyHomePhoneOrMobile }
        ],
        // 空床位
        availableBed: [
          { trigger: 'change', validator: verifyCheckBed }
        ],
        // 普通床位
        ordinaryBed: [
          { trigger: 'change', validator: verifyCheckBed },
        ],
        //护理床位
        nursingBed: [
          { trigger: 'change', validator: verifyCheckBed },
        ],
        // 所属居委
        areaCode: [
          { required: true, trigger: 'change', validator: verifyAreaCode }
        ],
      },
      disabled: false, // 表单是否可编辑
      activeTabs: 'base', // tab标签切换默认选中name参数
      activeCollapse: ['baseItem_1', 'baseItem_2', 'baseItem_3', 'baseItem_4', 'baseItem_5', 'baseItem_6', 'baseItem_7', 'baseItem_8'], // 折叠面板默认打开name参数
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
      areaCode: [], // 所属居委全部ID
      modelType: '', // 查看：look  编辑：edit  新增：add
      instituType: '', // 机构类型
      serviceMsgObj: [], // 服务信息表单单选框和复选框选中的值
      workMsgObj: [], // 职工人员信息
      imageInfoVosLookUrl: [], // 查看时的图片路径
      areaLevel: '',
      editAuthority: false,// 编辑按钮的权限
      resultArr:[] //同步校验结果组
    }
  },
  // 在模板渲染成html后调用，通常是初始化页面完成后，再对html的dom节点进行一些需要的操作。
  mounted() {
    // 1011:长者照顾,  1010:养老机构
    this.instituType = this.$route.query.instituType
    this.modelType = this.$route.query.modelType
    // 当前机构id
    const _userId_ = this.$route.query.id || ''
    this.form.orgType = this.$route.query.instituType
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
          this.$message.error('操作失败！')
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
          // 职工---赋值数量
          const providerPersionVosArr = {}

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
          this.$message.error('获取机构信息失败！')
        })
      })
    },
    // 获取下拉字典
    getSelect() {
      return new Promise((resolve, reject) => {
        // 数据字典接口
        // 1011:长者照顾,  1010:养老机构
        let dicKey = ''
        //池州养老机构 1010_chizhou
        dicKey = 'open_state,operate_mode,service_provider_star_rating'
        allSelectdictionaryData(dicKey).then(response => {
          if (response.code === 0) {
            for (const k in response.data) {
              switch (k) {
                // 开放状态
                case 'open_state':
                  this.open_stateOptions = response.data[k]
                  
                  break
                  // 运营模式
                case 'operate_mode':
                  this.operate_modeOptions = response.data[k]
                  break
                  // 星级
                case 'service_provider_star_rating':
                  this.starRatingOptions = response.data[k]
              }
            }
          } else {
            this.$message.error('数据字典接口请求失败！')
          }
          resolve()
        }).catch(() => {
          this.$message.error('操作失败！')
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
    // 返回按钮，关闭详情页
    closeDetailsPage() {
      // 关闭页面
      closeSelectedTag(this, this.$route)
      this.$router.push({ path: '/streetPlatform/facilitiesConfig/pensionAgency' })
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
              console.log('成功',item)
            }else{
              reject()
              console.log('失败',item)
            }
          })
        })
        that.resultArr.push(result)
      }
      formName.forEach(item => {
        check(item)
      });
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
      // 运营方联系方式
      if (this.form.phone && this.form.phone.length > 20) {
         this.$message.error('运营方联系方式长度不能超过20，请重新输入！')
         return false
      }
      //校验
      this.checkRules(form)
      let that = this
      Promise.all(that.resultArr).then(function(){
        console.log('通过了')
        that.activeTabs = tabsName
      }).catch(function(){
        this.$message.error('校验error')
      })
    },
    // 确定按钮-提交表单
    editContent(...formName) {
      //床位信息
      if(Number(this.form.ordinaryBed) + Number(this.form.nursingBed) !== Number(this.form.totalBed)){
        this.$message.error('总床位不等于护理与普通床位之和，请核验，并再次输入!')
         return false
      }
      //总入住人数
      if((Number(this.form.totalOccupancy) !== Number(this.form.extremelyPoor) + Number(this.form.socialElderly) + Number(this.form.whichAbilityIsIntact)
       + Number(this.form.ofWhichMildDisabilityAndDementia) + Number(this.form.ofWhichModerateDisabilityAndDementia) + Number(this.form.ofWhichSevereDisabilityAndDementia)
       )){
         this.$message.error('总入住人数不等于其他人数之和，请核验，重新输入!')
          return false
       }
       //员工信息 //总人数 = 护理员 + 其他人员
       if(Number(this.form.totalPeople) !== Number(this.form.careWorker) + Number(this.form.otherPersonnel)){
         this.$message.error('总人数不等于护理员和其他人员之和，请核验，并再次输入!')
          return false
      }
      const _orgType_ = '养老机构'
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
          // 处理职工字段
          const dealWorkField = params.providerPersionVos
          for (const k in dealWorkField) {
            that.workMsgObj.forEach((item_a) => {
              if (k === item_a.persionType) {
                item_a.num = dealWorkField[k]
              }
            })
          }
          params.providerPersionVos = {}
          params.providerPersionVos = that.workMsgObj
          // 新增
          if (that.modelType === 'add') {
            submitDataAdd(params).then(response => {
              if (response.code === 0) {
                that.$message({
                  type: 'success',
                  message: '新增机构信息成功!'
                })
                // 关闭页面
                that.closeDetailsPage()
              } else {
                that.$message.error(_orgType_ + response.msg)
              }
            }).catch(() => {
              that.$message.error('新增机构信息失败!')
            })
          } else if (that.modelType === 'edit') { // 编辑
            submitDataEdit(params).then(response => {
              if (response.code === 0) {
                that.$message({
                  type: 'success',
                  message: '编辑机构信息成功!'
                })
                // 关闭页面
                that.closeDetailsPage()
              } else {
                that.$message.error(_orgType_ + response.msg)
              }
            }).catch(() => {
              that.$message.error('编辑机构信息失败!')
            })
          } else if (that.modelType === 'look') { // 查看
            closeSelectedTag(that, that.$route)
          }
      }).catch(function(){
          console.log('未通过!')
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
      let _path_ = ''
      switch (_orgType_) {
        case '1010_chizhou':
          _path_ = `/pensionAgency/chiZhouDetails/${_id_}`
          break;
        default:
          _path_ = `/pensionAgency/details/${_id_}`
          break;
      }
      this.$router.push({
        path: _path_,
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
