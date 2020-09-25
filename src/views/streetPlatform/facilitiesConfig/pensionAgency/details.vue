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
                    v-show="this.instituType === '1010'"
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
                    <el-form-item :label="this.isEditForm?'房屋产权':'房屋产权：'" prop="houseProperty">
                      <el-select
                        v-if="this.isEditForm"
                        v-model="form.houseProperty"
                        placeholder="请选择房屋产权"
                        clearable
                        style="width:100%;"
                        @keyup.enter.native="editContent('form_base')"
                      >
                        <el-option
                          v-for="item in house_typeOptions"
                          v-if="house_typeOptions.length !== 0"
                          :key="item.dictValue"
                          :label="item.dictLabel"
                          :value="item.dictValue"
                        />
                      </el-select>
                      <span v-else>{{ form.houseProperty }}</span>
                    </el-form-item>
                  </el-col>
                  <el-col :md="this.adaptiveGrid.md" :lg="this.adaptiveGrid.lg">
                    <el-form-item :label="this.isEditForm?'设置形式':'设置形式：'" prop="setType">
                      <el-select
                        v-if="this.isEditForm"
                        v-model="form.setType"
                        placeholder="请选择设置形式"
                        clearable
                        style="width:100%;"
                        @keyup.enter.native="editContent('form_base')"
                      >
                        <el-option
                          v-for="item in set_mode_typeOptions"
                          v-if="set_mode_typeOptions.length !== 0"
                          :key="item.dictValue"
                          :label="item.dictLabel"
                          :value="item.dictValue"
                        />
                      </el-select>
                      <span v-else>{{ form.setType }}</span>
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
                    <el-form-item :label="this.isEditForm?'楼层信息(层)':'楼层信息(层)：'" prop="buildFloor">
                      <el-input
                        v-if="this.isEditForm"
                        ref="buildFloor"
                        v-model="form.buildFloor"
                        :disabled="disabled"
                        clearable
                        placeholder="请输入楼层信息"
                        @keyup.enter.native="editContent('form_base')"
                        @keyup.native="transformNumber(form.buildFloor,'buildFloor')"
                      />
                      <span v-else>{{ form.buildFloor }}</span>
                    </el-form-item>
                  </el-col>
                  <el-col :md="this.adaptiveGrid.md" :lg="this.adaptiveGrid.lg">
                    <el-form-item :label="this.isEditForm?'是否有电梯':'是否有电梯：'" prop="isLift">
                      <el-select
                        v-if="this.isEditForm"
                        v-model="form.isLift"
                        placeholder="请选择是否有电梯"
                        clearable
                        style="width:100%;"
                        @keyup.enter.native="editContent('form_base')"
                      >
                        <el-option
                          v-for="item in sys_config_typeOptions"
                          v-if="sys_config_typeOptions.length !== 0"
                          :key="item.dictValue"
                          :label="item.dictLabel"
                          :value="item.dictValue"
                        />
                      </el-select>
                      <span v-else>{{ form.isLift }}</span>
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
                      <span v-else>{{ form.openState }}</span>
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
                  <el-col v-if="this.instituType === '1010'" :md="this.adaptiveGrid.md" :lg="this.adaptiveGrid.lg">
                    <el-form-item :label="this.isEditForm?'评定等级':'评定等级：'" prop="ratingLevel">
                      <el-select
                        v-if="this.isEditForm"
                        v-model="form.ratingLevel"
                        placeholder="请选择评定等级"
                        disabled
                        clearable
                        style="width:100%;"
                        @keyup.enter.native="editContent('form_base')"
                      >
                        <el-option
                          v-for="item in ratingOptions"
                          v-if="ratingOptions.length !== 0"
                          :key="item.dictValue"
                          :label="item.dictLabel"
                          :value="item.dictValue"
                        />
                      </el-select>
                      <span v-else>{{ form.ratingLevel }}</span>
                    </el-form-item>
                  </el-col>
                  <el-col v-if="this.instituType === '1010'" :md="this.adaptiveGrid.md" :lg="this.adaptiveGrid.lg">
                    <el-form-item :label="this.isEditForm?'日常监测':'日常监测：'" prop="openState">
                      <el-select
                        v-if="this.isEditForm"
                        v-model="form.dailyInspection"
                        placeholder="请选择日常监测"
                        clearable
                        disabled
                        style="width:100%;"
                        @keyup.enter.native="editContent('form_base')"
                      >
                        <el-option
                          v-for="item in daily_inspectionOptions"
                          v-if="daily_inspectionOptions.length !== 0"
                          :key="item.dictValue"
                          :label="item.dictLabel"
                          :value="item.dictValue"
                        />
                      </el-select>
                      <span v-else>{{ form.dailyInspection }}</span>
                    </el-form-item>
                  </el-col>
                  <el-col :md="this.adaptiveGrid.md" :lg="this.adaptiveGrid.lg">
                    <el-form-item :label="this.isEditForm?'':'经度：'" prop="openState">
                      <span v-if="!this.isEditForm">{{ form.longitude }}</span>
                    </el-form-item>
                  </el-col>
                  <el-col :md="this.adaptiveGrid.md" :lg="this.adaptiveGrid.lg">
                    <el-form-item :label="this.isEditForm?'':'纬度：'" prop="openState">
                      <span v-if="!this.isEditForm">{{ form.latitude }}</span>
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
                    <el-form-item :label="this.isEditForm?'法人性质':'法人性质：'" prop="legalType">
                      <el-select
                        v-if="this.isEditForm"
                        v-model="form.legalType"
                        placeholder="请选择法人性质"
                        clearable
                        style="width:100%;"
                        @keyup.enter.native="editContent('form_base')"
                      >
                        <el-option
                          v-for="item in corp_attrOptions"
                          v-if="corp_attrOptions.length !== 0"
                          :key="item.dictValue"
                          :label="item.dictLabel"
                          :value="item.dictValue"
                        />
                      </el-select>
                      <span v-else>{{ form.legalType }}</span>
                    </el-form-item>
                  </el-col>
                  <el-col :md="this.adaptiveGrid.md" :lg="this.adaptiveGrid.lg">
                    <el-form-item :label="this.isEditForm?'运营模式':'运营模式：'" prop="opMode">
                      <el-select
                        v-if="this.isEditForm"
                        v-model="form.opMode"
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
                      <span v-else>{{ form.opMode }}</span>
                    </el-form-item>
                  </el-col>
                  <el-col :md="this.adaptiveGrid.md" :lg="this.adaptiveGrid.lg">
                    <el-form-item :label="this.isEditForm?'运营单位':'运营单位：'" prop="opOrg">
                      <el-input
                        v-if="this.isEditForm"
                        ref="opOrg"
                        v-model="form.opOrg"
                        :disabled="disabled"
                        clearable
                        placeholder="请输入运营单位"
                        @keyup.enter.native="editContent('form_base')"
                      />
                      <span v-else>{{ form.opOrg }}</span>
                    </el-form-item>
                  </el-col>
                  <el-col :md="this.adaptiveGrid.md" :lg="this.adaptiveGrid.lg">
                    <el-form-item :label="this.isEditForm?'运营方负责人':'运营方负责人：'" prop="opLinkman">
                      <el-input
                        v-if="this.isEditForm"
                        ref="opLinkman"
                        v-model="form.opLinkman"
                        :disabled="disabled"
                        clearable
                        placeholder="请输入运营方负责人"
                        @keyup.enter.native="editContent('form_base')"
                      />
                      <span v-else>{{ form.opLinkman }}</span>
                    </el-form-item>
                  </el-col>
                  <el-col :md="this.adaptiveGrid.md" :lg="this.adaptiveGrid.lg">
                    <el-form-item :label="this.isEditForm?'运营方联系方式':'运营方联系方式：'" prop="opPhone">
                      <el-input
                        v-if="this.isEditForm"
                        ref="opPhone"
                        v-model="form.opPhone"
                        :disabled="disabled"
                        clearable
                        placeholder="请输入运营方联系方式"
                        @keyup.enter.native="editContent('form_base')"
                      />
                      <span v-else>{{ form.opPhone }}</span>
                    </el-form-item>
                  </el-col>
                  <el-col :md="this.adaptiveGrid.md" :lg="this.adaptiveGrid.lg">
                    <el-form-item :label="this.isEditForm?'建设方负责人':'建设方负责人：'" prop="buildLinkman">
                      <el-input
                        v-if="this.isEditForm"
                        ref="buildLinkman"
                        v-model="form.buildLinkman"
                        :disabled="disabled"
                        clearable
                        placeholder="请输入建设方负责人"
                        @keyup.enter.native="editContent('form_base')"
                      />
                      <span v-else>{{ form.buildLinkman }}</span>
                    </el-form-item>
                  </el-col>
                  <el-col :md="this.adaptiveGrid.md" :lg="this.adaptiveGrid.lg">
                    <el-form-item :label="this.isEditForm?'建设方联系方式':'建设方联系方式：'" prop="buildPhone">
                      <el-input
                        v-if="this.isEditForm"
                        ref="buildPhone"
                        v-model="form.buildPhone"
                        :disabled="disabled"
                        clearable
                        placeholder="请输入建设方联系方式"
                        @keyup.enter.native="editContent('form_base')"
                      />
                      <span v-else>{{ form.buildPhone }}</span>
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
        <el-tab-pane label="服务信息" name="service">
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
        <el-tab-pane label="扩展信息" name="extension">
          <el-collapse v-model="activeCollapse">
            <!--服务能力item start-->
            <el-collapse-item name="baseItem_5">
              <template slot="title">
                <div class="titleSlider">
                  <span>
                    <i class="titleTip" />服务能力
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
                  <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                    <el-col :xs="2" :sm="2" :md="2" :lg="2" :xl="2">
                      <h3 class="servesItemTitle">床位</h3>
                    </el-col>
                    <el-col :xs="22" :sm="22" :md="22" :lg="22" :xl="22">
                      <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
                        <el-form-item
                          :label="this.isEditForm?'床位总数量(张)':'床位总数量(张)：'"
                          prop="bedTotal"
                        >
                          <el-input
                            v-if="this.isEditForm"
                            ref="bedTotal"
                            v-model.number="form.bedTotal"
                            :disabled="disabled"
                            clearable
                            placeholder="请输入床位总数量"
                            @keyup.enter.native="editContent('form_base')"
                            @keyup.native="transformNumber(form.bedTotal,'bedTotal')"
                          />
                          <span v-else>{{ form.bedTotal }}</span>
                        </el-form-item>
                      </el-col>
                      <el-col
                        v-if="this.instituType === '1010'"
                        :xs="24"
                        :sm="12"
                        :md="12"
                        :lg="8"
                        :xl="8"
                      >
                        <el-form-item
                          :label="this.isEditForm?'已用床位数量(张)':'已用床位数量(张)：'"
                          prop="bedUsed"
                        >
                          <el-input
                            v-if="this.isEditForm"
                            ref="bedUsed"
                            v-model.number="form.bedUsed"
                            :disabled="disabled"
                            clearable
                            placeholder="请输入已用床位数量"
                            @change="curingRatioCalculate"
                            @keyup.enter.native="editContent('form_base')"
                            @keyup.native="transformNumber(form.bedUsed,'bedUsed')"
                          />
                          <span v-else>{{ form.bedUsed }}</span>
                        </el-form-item>
                      </el-col>
                      <el-col
                        v-if="this.instituType === '1010'"
                        :xs="24"
                        :sm="12"
                        :md="12"
                        :lg="8"
                        :xl="8"
                      >
                        <el-form-item
                          :label="this.isEditForm?'剩余床位数量(张)':'剩余床位数量(张)：'"
                          prop="bedUnused"
                        >
                          <el-input
                            v-if="this.isEditForm"
                            ref="bedUnused"
                            v-model.number="form.bedUnused"
                            :disabled="disabled"
                            clearable
                            placeholder="请输入剩余床位数量"
                            @keyup.enter.native="editContent('form_base')"
                            @keyup.native="transformNumber(form.bedUnused,'bedUnused')"
                          />
                          <span v-else>{{ form.bedUnused }}</span>
                        </el-form-item>
                      </el-col>
                      <el-col
                        v-if="this.instituType === '1011'"
                        :xs="24"
                        :sm="12"
                        :md="12"
                        :lg="8"
                        :xl="8"
                      >
                        <el-form-item
                          :label="this.isEditForm?'登记服务总人数(人)':'登记服务总人数(人)：'"
                          prop="serviceTotalnum"
                        >
                          <el-input
                            v-if="this.isEditForm"
                            ref="serviceTotalnum"
                            v-model.number="form.serviceTotalnum"
                            :disabled="disabled"
                            clearable
                            placeholder="请输入登记服务总人数"
                            @keyup.enter.native="editContent('form_base')"
                            @keyup.native="transformNumber(form.serviceTotalnum,'serviceTotalnum')"
                          />
                          <span v-else>{{ form.serviceTotalnum }}</span>
                        </el-form-item>
                      </el-col>
                      <el-col
                        v-if="this.instituType === '1011'"
                        :xs="24"
                        :sm="12"
                        :md="12"
                        :lg="8"
                        :xl="8"
                      >
                        <el-form-item
                          :label="this.isEditForm?'日服务量(人)':'日服务量(人)：'"
                          prop="dayServicenum"
                        >
                          <el-input
                            v-if="this.isEditForm"
                            ref="dayServicenum"
                            v-model.number="form.dayServicenum"
                            :disabled="disabled"
                            clearable
                            placeholder="请输入日服务量"
                            @change="curingRatioCalculate"
                            @keyup.enter.native="editContent('form_base')"
                            @keyup.native="transformNumber(form.dayServicenum,'dayServicenum')"
                          />
                          <span v-else>{{ form.dayServicenum }}</span>
                        </el-form-item>
                      </el-col>
                    </el-col>
                  </el-col>

                  <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                    <el-col :xs="2" :sm="2" :md="2" :lg="2" :xl="2">
                      <h3 class="servesItemTitle">职工</h3>
                    </el-col>
                    <el-col :xs="22" :sm="22" :md="22" :lg="22" :xl="22">
                      <template v-if="this.isEditForm">
                        <el-col
                          v-for="item in this.workforce_typeOptions"
                          :xs="24"
                          :sm="12"
                          :md="12"
                          :lg="8"
                          :xl="8"
                        >
                          <el-form-item :label="item.dictLabel" :prop="item.dictValue">
                            <el-input
                              v-if="item.dictValue === 'nurse'"
                              :ref="item.dictValue"
                              v-model.number="form.providerPersionVos[item.dictValue]"
                              oninput="value=value.replace(/[^\d]/g,'')"
                              :disabled="disabled"
                              clearable
                              :placeholder="'请输入'+item.dictLabel"
                              @change="curingRatioCalculate"
                              @keyup.enter.native="editContent('form_base')"
                            />
                            <el-input
                              v-else
                              :ref="item.dictValue"
                              v-model.number="form.providerPersionVos[item.dictValue]"
                              oninput="value=value.replace(/[^\d]/g,'')"
                              :disabled="disabled"
                              clearable
                              :placeholder="'请输入'+item.dictLabel"
                              @keyup.enter.native="editContent('form_base')"
                            />
                          </el-form-item>
                        </el-col>
                      </template>
                      <template v-else>
                        <el-col
                          v-for="item in this.workforce_typeOptions"
                          :xs="24"
                          :sm="12"
                          :md="12"
                          :lg="8"
                          :xl="8"
                        >
                          <el-form-item :label="item.dictLabel+'：'" :prop="item.dictValue">
                            <span>{{ form.providerPersionVos[item.dictValue] }}</span>
                          </el-form-item>
                        </el-col>
                      </template>
                    </el-col>
                  </el-col>
                  <el-col v-if="this.instituType === '1010'" :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                    <el-col :xs="2" :sm="2" :md="2" :lg="2" :xl="2">
                      <h3 class="servesItemTitle">床位费</h3>
                    </el-col>
                    <el-col :xs="22" :sm="22" :md="22" :lg="22" :xl="22">
                      <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
                        <el-form-item
                          :label="this.isEditForm?'单人间(元/月)':'单人间(元/月)：'"
                          prop="oneRoomFee"
                        >
                          <el-input
                            v-if="this.isEditForm"
                            ref="oneRoomFee"
                            v-model="form.oneRoomFee"
                            oninput="if(isNaN(value)) { value = null } if(value.indexOf('.')>0){value=value.slice(0,value.indexOf('.')+3)}"
                            clearable
                            placeholder=""
                          />
                          <span v-else>{{ form.oneRoomFee }}</span>
                        </el-form-item>
                      </el-col>
                      <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
                        <el-form-item
                          :label="this.isEditForm?'双人间(元/月)':'双人间(元/月)：'"
                          prop="twoRoomFee"
                        >
                          <el-input
                            v-if="this.isEditForm"
                            ref="twoRoomFee"
                            v-model="form.twoRoomFee"
                            oninput="if(isNaN(value)) { value = null } if(value.indexOf('.')>0){value=value.slice(0,value.indexOf('.')+3)}"
                            clearable
                            placeholder=""
                          />
                          <span v-else>{{ form.twoRoomFee }}</span>
                        </el-form-item>
                      </el-col>
                      <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
                        <el-form-item
                          :label="this.isEditForm?'三人间(元/月)':'三人间(元/月)：'"
                          prop="threeRoomFee"
                        >
                          <el-input
                            v-if="this.isEditForm"
                            ref="threeRoomFee"
                            v-model="form.threeRoomFee"
                            oninput="if(isNaN(value)) { value = null } if(value.indexOf('.')>0){value=value.slice(0,value.indexOf('.')+3)}"
                            clearable
                            placeholder=""
                          />
                          <span v-else>{{ form.threeRoomFee }}</span>
                        </el-form-item>
                      </el-col>
                      <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
                        <el-form-item
                          :label="this.isEditForm?'四人间(元/月)':'四人间(元/月)：'"
                          prop="fourRoomFee"
                        >
                          <el-input
                            v-if="this.isEditForm"
                            ref="fourRoomFee"
                            v-model="form.fourRoomFee"
                            oninput="if(isNaN(value)) { value = null } if(value.indexOf('.')>0){value=value.slice(0,value.indexOf('.')+3)}"
                            clearable
                            placeholder=""
                          />
                          <span v-else>{{ form.fourRoomFee }}</span>
                        </el-form-item>
                      </el-col>
                      <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
                        <el-form-item
                          :label="this.isEditForm?'五人间(元/月)':'五人间(元/月)：'"
                          prop="fiveRoomFee"
                        >
                          <el-input
                            v-if="this.isEditForm"
                            ref="fiveRoomFee"
                            v-model="form.fiveRoomFee"
                            oninput="if(isNaN(value)) { value = null } if(value.indexOf('.')>0){value=value.slice(0,value.indexOf('.')+3)}"
                            clearable
                            placeholder=""
                          />
                          <span v-else>{{ form.fiveRoomFee }}</span>
                        </el-form-item>
                      </el-col>
                      <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
                        <el-form-item
                          :label="this.isEditForm?'六人间及以上(元/月)':'六人间及以上(元/月)：'"
                          prop="sixMoreRoomFee"
                        >
                          <el-input
                            v-if="this.isEditForm"
                            ref="sixMoreRoomFee"
                            v-model="form.sixMoreRoomFee"
                            oninput="if(isNaN(value)) { value = null } if(value.indexOf('.')>0){value=value.slice(0,value.indexOf('.')+3)}"
                            clearable
                            placeholder=""
                          />
                          <span v-else>{{ form.sixMoreRoomFee }}</span>
                        </el-form-item>
                      </el-col>
                      <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
                        <el-form-item
                          :label="this.isEditForm?'认知症照护单人间(元/月)':'认知症照护单人间(元/月)：'"
                          prop="cognitiveDisorderOneRoomFee"
                        >
                          <el-input
                            v-if="this.isEditForm"
                            ref="cognitiveDisorderOneRoomFee"
                            v-model="form.cognitiveDisorderOneRoomFee"
                            oninput="if(isNaN(value)) { value = null } if(value.indexOf('.')>0){value=value.slice(0,value.indexOf('.')+3)}"
                            clearable
                            placeholder=""
                          />
                          <span v-else>{{ form.cognitiveDisorderOneRoomFee }}</span>
                        </el-form-item>
                      </el-col>
                      <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
                        <el-form-item
                          :label="this.isEditForm?'认知症照护多人间':'认知症照护多人间：'"
                          prop="curingRatio"
                        >
                          <span v-if="this.isEditForm">
                            <el-input
                              v-model="form.cognitiveDisorderMoreRoom1Num1"
                              clearable
                              oninput="value=value.replace(/[^\d]/g,'')"
                              placeholder=""
                              style="width:80px;"
                            />人/间
                            <el-input
                              v-model="form.cognitiveDisorderMoreRoom1Fee"
                              clearable
                              oninput="if(isNaN(value)) { value = null } if(value.indexOf('.')>0){value=value.slice(0,value.indexOf('.')+3)}"
                              placeholder=""
                              style="width:100px;"
                            /> 元/月
                          </span>
                          <span v-else>{{ form.cognitiveDisorderMoreRoom1Num1 }}人/间&nbsp;&nbsp;&nbsp;{{ form.cognitiveDisorderMoreRoom1Fee }}元/月</span>
                        </el-form-item>
                      </el-col>
                      <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
                        <el-form-item
                          :label="this.isEditForm?'认知症照护多人间':'认知症照护多人间：'"
                          prop="curingRatio"
                        >
                          <span v-if="this.isEditForm">
                            <el-input
                              v-model="form.cognitiveDisorderMoreRoom2Num1"
                              clearable
                              oninput="value=value.replace(/[^\d]/g,'')"
                              placeholder=""
                              style="width:80px;"
                            />人/间
                            <el-input
                              v-model="form.cognitiveDisorderMoreRoom2Fee"
                              clearable
                              oninput="if(isNaN(value)) { value = null } if(value.indexOf('.')>0){value=value.slice(0,value.indexOf('.')+3)}"
                              placeholder=""
                              style="width:100px;"
                            /> 元/月
                          </span>
                          <span v-else>{{ form.cognitiveDisorderMoreRoom2Num1 }}人/间&nbsp;&nbsp;&nbsp;{{ form.cognitiveDisorderMoreRoom2Fee }}元/月</span>
                        </el-form-item>
                      </el-col>
                    </el-col>
                  </el-col>
                  <el-col v-if="this.instituType === '1010'" :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                    <el-col :xs="2" :sm="2" :md="2" :lg="2" :xl="2">
                      <h3 class="servesItemTitle">护理费</h3>
                    </el-col>
                    <el-col :xs="22" :sm="22" :md="22" :lg="22" :xl="22">
                      <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
                        <el-form-item
                          :label="this.isEditForm?'一级(元/月)':'一级(元/月)：'"
                          prop="nursingFeeLevel1"
                        >
                          <el-input
                            v-if="this.isEditForm"
                            ref="nursingFeeLevel1"
                            v-model="form.nursingFeeLevel1"
                            clearable
                            oninput="if(isNaN(value)) { value = null } if(value.indexOf('.')>0){value=value.slice(0,value.indexOf('.')+3)}"
                            placeholder=""
                          />
                          <span v-else>{{ form.nursingFeeLevel1 }}</span>
                        </el-form-item>
                      </el-col>
                      <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
                        <el-form-item
                          :label="this.isEditForm?'二级(元/月)':'二级(元/月)：'"
                          prop="nursingFeeLevel2"
                        >
                          <el-input
                            v-if="this.isEditForm"
                            ref="nursingFeeLevel2"
                            v-model="form.nursingFeeLevel2"
                            oninput="if(isNaN(value)) { value = null } if(value.indexOf('.')>0){value=value.slice(0,value.indexOf('.')+3)}"
                            clearable
                            placeholder=""
                          />
                          <span v-else>{{ form.nursingFeeLevel2 }}</span>
                        </el-form-item>
                      </el-col>
                      <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
                        <el-form-item
                          :label="this.isEditForm?'三级(元/月)':'三级(元/月)：'"
                          prop="nursingFeeLevel3"
                        >
                          <el-input
                            v-if="this.isEditForm"
                            ref="nursingFeeLevel3"
                            v-model="form.nursingFeeLevel3"
                            oninput="if(isNaN(value)) { value = null } if(value.indexOf('.')>0){value=value.slice(0,value.indexOf('.')+3)}"
                            clearable
                            placeholder=""
                          />
                          <span v-else>{{ form.nursingFeeLevel3 }}</span>
                        </el-form-item>
                      </el-col>
                      <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
                        <el-form-item
                          :label="this.isEditForm?'四级(元/月)':'四级(元/月)：'"
                          prop="nursingFeeLevel4"
                        >
                          <el-input
                            v-if="this.isEditForm"
                            ref="nursingFeeLevel4"
                            v-model="form.nursingFeeLevel4"
                            oninput="if(isNaN(value)) { value = null } if(value.indexOf('.')>0){value=value.slice(0,value.indexOf('.')+3)}"
                            clearable
                            placeholder=""
                          />
                          <span v-else>{{ form.nursingFeeLevel4 }}</span>
                        </el-form-item>
                      </el-col>
                      <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
                        <el-form-item
                          :label="this.isEditForm?'五级(元/月)':'五级(元/月)：'"
                          prop="nursingFeeLevel5"
                        >
                          <el-input
                            v-if="this.isEditForm"
                            ref="nursingFeeLevel5"
                            v-model="form.nursingFeeLevel5"
                            oninput="if(isNaN(value)) { value = null } if(value.indexOf('.')>0){value=value.slice(0,value.indexOf('.')+3)}"
                            clearable
                            placeholder=""
                          />
                          <span v-else>{{ form.nursingFeeLevel5 }}</span>
                        </el-form-item>
                      </el-col>
                      <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
                        <el-form-item
                          :label="this.isEditForm?'六级(元/月)':'六级(元/月)：'"
                          prop="nursingFeeLevel6"
                        >
                          <el-input
                            v-if="this.isEditForm"
                            ref="nursingFeeLevel6"
                            v-model="form.nursingFeeLevel6"
                            oninput="if(isNaN(value)) { value = null } if(value.indexOf('.')>0){value=value.slice(0,value.indexOf('.')+3)}"
                            clearable
                            placeholder=""
                          />
                          <span v-else>{{ form.nursingFeeLevel6 }}</span>
                        </el-form-item>
                      </el-col>
                      <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
                        <el-form-item
                          :label="this.isEditForm?'认知症(元/月)':'认知症(元/月)：'"
                          prop="cognitiveDisorderFee"
                        >
                          <el-input
                            v-if="this.isEditForm"
                            ref="cognitiveDisorderFee"
                            v-model="form.cognitiveDisorderFee"
                            oninput="if(isNaN(value)) { value = null } if(value.indexOf('.')>0){value=value.slice(0,value.indexOf('.')+3)}"
                            clearable
                            placeholder=""
                          />
                          <span v-else>{{ form.cognitiveDisorderFee }}</span>
                        </el-form-item>
                      </el-col>
                    </el-col>
                  </el-col>
                  <el-col v-if="this.instituType === '1010'" :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                    <el-col :xs="2" :sm="2" :md="2" :lg="2" :xl="2">
                      <h3 class="servesItemTitle">膳食费</h3>
                    </el-col>
                    <el-col :xs="22" :sm="22" :md="22" :lg="22" :xl="22">
                      <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
                        <el-form-item
                          :label="this.isEditForm?'膳食费(元/月)':'膳食费(元/月)：'"
                          prop="mealsCostFee"
                        >
                          <el-input
                            v-if="this.isEditForm"
                            ref="mealsCostFee"
                            v-model="form.mealsCostFee"
                            oninput="if(isNaN(value)) { value = null } if(value.indexOf('.')>0){value=value.slice(0,value.indexOf('.')+3)}"
                            clearable
                            placeholder=""
                          />
                          <span v-else>{{ form.mealsCostFee }}</span>
                        </el-form-item>
                      </el-col>
                    </el-col>
                  </el-col>
                  <!-- 长者照护之家 -->
                  <el-col v-if="this.instituType === '1011'" :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                    <el-col :xs="2" :sm="2" :md="2" :lg="2" :xl="2">
                      <h3 class="servesItemTitle">房型</h3>
                    </el-col>
                    <el-col :xs="22" :sm="22" :md="22" :lg="22" :xl="22">
                      <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
                        <el-form-item
                          :label="this.isEditForm?'单人房(间)':'单人房(间)：'"
                          prop="oneRoomNum"
                        >
                          <el-input
                            v-if="this.isEditForm"
                            ref="oneRoomNum"
                            v-model="form.oneRoomNum"
                            oninput="value=value.replace(/[^\d]/g,'')"
                            clearable
                            placeholder=""
                          />
                          <span v-else>{{ form.oneRoomNum }}</span>
                        </el-form-item>
                      </el-col>
                      <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
                        <el-form-item
                          :label="this.isEditForm?'双人房(间)':'双人房(间)：'"
                          prop="twoRoomNum"
                        >
                          <el-input
                            v-if="this.isEditForm"
                            ref="twoRoomNum"
                            v-model="form.twoRoomNum"
                            oninput="value=value.replace(/[^\d]/g,'')"
                            clearable
                            placeholder=""
                          />
                          <span v-else>{{ form.twoRoomNum }}</span>
                        </el-form-item>
                      </el-col>
                      <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
                        <el-form-item
                          :label="this.isEditForm?'三人房(间)':'三人房(间)：'"
                          prop="threeRoomNum"
                        >
                          <el-input
                            v-if="this.isEditForm"
                            ref="threeRoomNum"
                            v-model="form.threeRoomNum"
                            oninput="value=value.replace(/[^\d]/g,'')"
                            clearable
                            placeholder=""
                          />
                          <span v-else>{{ form.threeRoomNum }}</span>
                        </el-form-item>
                      </el-col>
                      <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
                        <el-form-item
                          :label="this.isEditForm?'四人房(间)':'四人房(间)：'"
                          prop="fourRoomNum"
                        >
                          <el-input
                            v-if="this.isEditForm"
                            ref="fourRoomNum"
                            v-model="form.fourRoomNum"
                            oninput="value=value.replace(/[^\d]/g,'')"
                            clearable
                            placeholder=""
                          />
                          <span v-else>{{ form.fourRoomNum }}</span>
                        </el-form-item>
                      </el-col>
                      <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
                        <el-form-item
                          :label="this.isEditForm?'五人房(间)':'五人间房(间)：'"
                          prop="fiveRoomNum"
                        >
                          <el-input
                            v-if="this.isEditForm"
                            ref="fiveRoomNum"
                            v-model="form.fiveRoomNum"
                            oninput="value=value.replace(/[^\d]/g,'')"
                            clearable
                            placeholder=""
                          />
                          <span v-else>{{ form.fiveRoomNum }}</span>
                        </el-form-item>
                      </el-col>
                      <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
                        <el-form-item
                          :label="this.isEditForm?'六人房及以上(间)':'六人房及以上(间)：'"
                          prop="sixMoreRoomNum"
                        >
                          <el-input
                            v-if="this.isEditForm"
                            ref="sixMoreRoomNum"
                            v-model="form.sixMoreRoomNum"
                            oninput="value=value.replace(/[^\d]/g,'')"
                            clearable
                            placeholder=""
                          />
                          <span v-else>{{ form.sixMoreRoomNum }}</span>
                        </el-form-item>
                      </el-col>
                      <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
                        <el-form-item
                          :label="this.isEditForm?'认知症照护单人间(间)':'认知症照护单人间(间)：'"
                          prop="cognitiveDisorderOneRoomNum"
                        >
                          <el-input
                            v-if="this.isEditForm"
                            ref="cognitiveDisorderOneRoomNum"
                            v-model="form.cognitiveDisorderOneRoomNum"
                            oninput="value=value.replace(/[^\d]/g,'')"
                            clearable
                            placeholder=""
                          />
                          <span v-else>{{ form.cognitiveDisorderOneRoomNum }}</span>
                        </el-form-item>
                      </el-col>
                      <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
                        <el-form-item
                          :label="this.isEditForm?'认知症照护多人间':'认知症照护多人间：'"
                          prop="curingRatio"
                        >
                          <span v-if="this.isEditForm">
                            <el-input
                              v-model="form.cognitiveDisorderMoreRoom1Num1"
                              clearable
                              oninput="value=value.replace(/[^\d]/g,'')"
                              placeholder=""
                              style="width:80px;"
                            />人/间
                            <el-input
                              v-model="form.cognitiveDisorderMoreRoom1Num2"
                              clearable
                              oninput="if(isNaN(value)) { value = null } if(value.indexOf('.')>0){value=value.slice(0,value.indexOf('.')+3)}"
                              placeholder=""
                              style="width:100px;"
                            /> 间
                          </span>
                          <span v-else>{{ form.cognitiveDisorderMoreRoom1Num1 }}人/间&nbsp;&nbsp;&nbsp;{{ form.cognitiveDisorderMoreRoom1Num2 }}间</span>
                        </el-form-item>
                      </el-col>
                      <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
                        <el-form-item
                          :label="this.isEditForm?'认知症照护多人间':'认知症照护多人间：'"
                          prop="curingRatio"
                        >
                          <span v-if="this.isEditForm">
                            <el-input
                              v-model="form.cognitiveDisorderMoreRoom2Num1"
                              clearable
                              oninput="value=value.replace(/[^\d]/g,'')"
                              placeholder=""
                              style="width:80px;"
                            />人/间
                            <el-input
                              v-model="form.cognitiveDisorderMoreRoom2Num2"
                              clearable
                              oninput="if(isNaN(value)) { value = null } if(value.indexOf('.')>0){value=value.slice(0,value.indexOf('.')+3)}"
                              placeholder=""
                              style="width:100px;"
                            /> 间
                          </span>
                          <span v-else>{{ form.cognitiveDisorderMoreRoom2Num1 }}人/间&nbsp;&nbsp;&nbsp;{{ form.cognitiveDisorderMoreRoom2Num2 }}间</span>
                        </el-form-item>
                      </el-col>
                    </el-col>
                  </el-col>
                  <el-col v-if="this.instituType === '1011'" :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                    <el-col :xs="2" :sm="2" :md="2" :lg="2" :xl="2">
                      <h3 class="servesItemTitle">服务价格</h3>
                    </el-col>
                    <el-col :xs="22" :sm="22" :md="22" :lg="22" :xl="22">
                      <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
                        <el-form-item
                          :label="this.isEditForm?'一般护理费(元/月)':'一般护理费(元/月)：'"
                          prop="commonlyPrice"
                        >
                          <el-input
                            v-if="this.isEditForm"
                            ref="commonlyPrice"
                            v-model="form.commonlyPrice"
                            oninput="if(isNaN(value)) { value = null } if(value.indexOf('.')>0){value=value.slice(0,value.indexOf('.')+3)}"
                            clearable
                            placeholder=""
                          />
                          <span v-else>{{ form.commonlyPrice }}</span>
                        </el-form-item>
                      </el-col>
                      <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
                        <el-form-item
                          :label="this.isEditForm?'认知症护理费(元/月)':'认知症护理费(元/月)：'"
                          prop="cognitiveDisorderNursingPrice"
                        >
                          <el-input
                            v-if="this.isEditForm"
                            ref="cognitiveDisorderNursingPrice"
                            v-model="form.cognitiveDisorderNursingPrice"
                            oninput="if(isNaN(value)) { value = null } if(value.indexOf('.')>0){value=value.slice(0,value.indexOf('.')+3)}"
                            clearable
                            placeholder=""
                          />
                          <span v-else>{{ form.cognitiveDisorderNursingPrice }}</span>
                        </el-form-item>
                      </el-col>
                      <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
                        <el-form-item
                          :label="this.isEditForm?'床位费(元/月)':'床位费(元/月)：'"
                          prop="bedPrice"
                        >
                          <el-input
                            v-if="this.isEditForm"
                            ref="bedPrice"
                            v-model="form.bedPrice"
                            oninput="if(isNaN(value)) { value = null } if(value.indexOf('.')>0){value=value.slice(0,value.indexOf('.')+3)}"
                            clearable
                            placeholder=""
                          />
                          <span v-else>{{ form.bedPrice }}</span>
                        </el-form-item>
                      </el-col>
                      <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
                        <el-form-item
                          :label="this.isEditForm?'餐费(元/月)':'餐费(元/月)：'"
                          prop="mealsPrice"
                        >
                          <el-input
                            v-if="this.isEditForm"
                            ref="mealsPrice"
                            v-model="form.mealsPrice"
                            oninput="if(isNaN(value)) { value = null } if(value.indexOf('.')>0){value=value.slice(0,value.indexOf('.')+3)}"
                            clearable
                            placeholder=""
                          />
                          <span v-else>{{ form.mealsPrice }}</span>
                        </el-form-item>
                      </el-col>
                      <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
                        <el-form-item
                          :label="this.isEditForm?'其它增值服务费(元/月)':'其它增值服务费(元/月)：'"
                          prop="otherIncrementPrice"
                        >
                          <el-input
                            v-if="this.isEditForm"
                            ref="otherIncrementPrice"
                            v-model="form.otherIncrementPrice"
                            oninput="if(isNaN(value)) { value = null } if(value.indexOf('.')>0){value=value.slice(0,value.indexOf('.')+3)}"
                            clearable
                            placeholder=""
                          />
                          <span v-else>{{ form.otherIncrementPrice }}</span>
                        </el-form-item>
                      </el-col>
                      <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
                        <el-form-item
                          :label="this.isEditForm?'长照餐费(元/天)':'长照餐费(元/天)：'"
                          prop="elderlyCareMealsPrice"
                        >
                          <el-input
                            v-if="this.isEditForm"
                            ref="elderlyCareMealsPrice"
                            v-model="form.elderlyCareMealsPrice"
                            oninput="if(isNaN(value)) { value = null } if(value.indexOf('.')>0){value=value.slice(0,value.indexOf('.')+3)}"
                            clearable
                            placeholder=""
                          />
                          <span v-else>{{ form.elderlyCareMealsPrice }}</span>
                        </el-form-item>
                      </el-col>
                    </el-col>
                  </el-col>
                  <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                    <el-col :xs="2" :sm="2" :md="2" :lg="2" :xl="2">
                      <h3 class="servesItemTitle">其它</h3>
                    </el-col>
                    <el-col :xs="22" :sm="22" :md="22" :lg="22" :xl="22">
                      <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
                        <el-form-item
                          :label="this.isEditForm?'养护比(%)':'养护比(%)：'"
                          prop="curingRatio"
                        >
                          <el-input
                            v-if="this.isEditForm"
                            ref="curingRatio"
                            v-model="curingRatio"
                            disabled
                            clearable
                            placeholder=""
                          />
                          <span v-else>{{ curingRatio }}</span>
                        </el-form-item>
                      </el-col>
                    </el-col>
                  </el-col>
                </el-row>
              </el-form>
            </el-collapse-item>
            <!--服务能力item end-->
          </el-collapse>
        </el-tab-pane>
        <!--扩展信息tabs end-->
      </el-tabs>

      <!--新增时,编辑时-->
      <el-footer v-if="this.modelType === 'add' || this.modelType === 'edit'">
        <div v-if="this.activeTabs === 'base'">
          <el-button type="warning" class="base-btn btnMarginLeft15" @click="tabsStep('service')">下一步</el-button>
          <el-button class="cancel-btn" @click="cancelDetailsPage">取消</el-button>
        </div>
        <div v-else-if="this.activeTabs === 'service'">
          <el-button type="warning" class="base-btn btnMarginLeft15" @click="tabsStep('extension')">下一步</el-button>
          <el-button type="warning" class="base-btn btnMarginLeft15" @click="tabsStep('base')">上一步</el-button>
        </div>
        <div v-else>
          <el-button type="warning" class="base-btn btnMarginLeft15" @click="editContent('form_base')">确定</el-button>
          <el-button class="cancel-btn btnMarginLeft15" @click="cancelDetailsPage">取消</el-button>
          <el-button type="warning" class="base-btn btnMarginLeft15" @click="tabsStep('service')">上一步</el-button>
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
} from '@/api/facilitiesConfig/pensionAgency'
import { adaptiveGrid_max, adaptiveGrid_plus } from '@/common/index'
import InstituField from '@/components/InstituField'
import Uploadpics from '@/components/Uploadpics'
import Address from '@/components/Address'
import { facilityTypeFun, toEditFacilityFun, checkboxRecursive } from '@/common/facilityType'
import { closeSelectedTag } from '@/utils/rooterJump'
import { transformNumber, transformNumberLetter } from '@/utils/index'
import { getEditAuthority } from '@/api/user'
import { verifyHomePhoneOrMobile, isPositiveIntegerNotMust } from '@/utils/validate'
const Base64 = require('js-base64').Base64
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
      house_typeOptions: [], // 房屋产权
      set_mode_typeOptions: [], // 设置形式
      sys_config_typeOptions: [], // 是否有电梯
      open_stateOptions: [], // 开放状态
      corp_attrOptions: [], // 法人性质
      operate_modeOptions: [], // 运营模式
      workforce_typeOptions: [], // 职工
      ratingOptions: [], // 等级
      daily_inspectionOptions: [], // 检测
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
        orgType: '', // 机构类型
        orgCode: '', // 组织机构代码
        establishTime: '', // 成立时间
        phone: '', // 咨询电话
        houseProperty: '', // 房屋产权
        setType: '', // 设置形式
        buildArea: '', // 建筑面积
        buildFloor: '', // 楼层信息
        isLift: '', // 是否有电梯
        ratingLevel: '', // 等级
        dailyInspection: '', // 检测
        openState: '', // 开放状态
        areaCode: [], // 所属居委
        addr: '', // 详细地址
        imageInfoVos: [], // 机构图片
        // -------运营信息--------
        legalType: '', // 法人性质
        opMode: '', // 运营模式
        opOrg: '', // 运营单位
        opLinkman: '', // 运营方负责人
        opPhone: '', // 运营方联系方式
        buildLinkman: '', // 建设方负责人
        buildPhone: '', // 建设方联系方式
        // -----服务能力------
        bedTotal: null, // 床位总数量,
        bedUsed: null, // 已用床位数量,
        bedUnused: null, // 剩余床位数量,
        serviceTotalnum: null, // 登记服务总人数,
        dayServicenum: null, // 日服务量,
        providerPersionVos: {}, // 职工的数据+++++=
        // -----服务信息----
        providerItemVos: [],
        // 新增的扩展信息 数据格式就是平级
        // ----扩展信息--------
        oneRoomFee: null,
        twoRoomFee: null,
        threeRoomFee: null,
        fourRoomFee: null,
        fiveRoomFee: null,
        sixMoreRoomFee: null,
        cognitiveDisorderOneRoomFee: null,
        cognitiveDisorderMoreRoom1Num1: null,
        cognitiveDisorderMoreRoom1Fee: null,
        cognitiveDisorderMoreRoom2Num: null,
        cognitiveDisorderMoreRoom2Fee: null,
        nursingFeeLevel1: null,
        nursingFeeLevel2: null,
        nursingFeeLevel3: null,
        nursingFeeLevel4: null,
        nursingFeeLevel5: null,
        nursingFeeLevel6: null,
        cognitiveDisorderFee: null,
        mealsCostFee: null,
        // 长者照护之家
        commonlyPrice: null,
        cognitiveDisorderNursingPrice: null,
        bedPrice: null,
        mealsPrice: null,
        otherIncrementPrice: null,
        elderlyCareMealsPrice: null,
        oneRoomNum: null,
        twoRoomNum: null,
        threeRoomNum: null,
        fourRoomNum: null,
        fiveRoomNum: null,
        sixMoreRoomNum: null,
        cognitiveDisorderOneRoomNum: null,
        cognitiveDisorderMoreRoom1Num1: null,
        cognitiveDisorderMoreRoom1Num2: null,
        cognitiveDisorderMoreRoom2Num1: null,
        cognitiveDisorderMoreRoom2Num2: null
      },
      curingRatio: '', // 养护比（页面上计算的值）
      // form 表单的验证规则
      rulesForm: {
        // 机构名称
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
        // 运营方联系方式
        opPhone: [
          { trigger: 'change', validator: verifyHomePhoneOrMobile }
        ],
        // 建设方联系方式
        buildPhone: [
          { trigger: 'change', validator: verifyHomePhoneOrMobile }
        ]
      },
      disabled: false, // 表单是否可编辑
      activeTabs: 'base', // tab标签切换默认选中name参数
      activeCollapse: ['baseItem_1', 'baseItem_2', 'baseItem_3', 'baseItem_4', 'baseItem_5', 'baseItem_6'], // 折叠面板默认打开name参数
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
      areaCode: [], // 所属居委全部ID
      areaCodeBackup: [], // 所属居委全部ID--备份
      modelType: '', // 查看：look  编辑：edit  新增：add
      instituType: '', // 机构类型
      serviceMsgObj: [], // 服务信息表单单选框和复选框选中的值
      workMsgObj: [], // 职工人员信息
      imageInfoVosLookUrl: [], // 查看时的图片路径
      areaLevel: '',
      editAuthority: false// 编辑按钮的权限
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
          response.data.providerPersionVos.forEach((item) => {
            providerPersionVosArr[item.persionType] = item.num
          })
          // 职工---赋值id
          response.data.providerPersionVos.forEach((item) => {
            this.workMsgObj.forEach((item_a) => {
              if (item.persionType === item_a.persionType) {
                item_a.id = item.id
              }
            })
          })
          this.form.providerPersionVos = {}
          this.form.providerPersionVos = providerPersionVosArr

          // 处理区域的code,用以渲染区域下拉组件
          if (st === 'edit') {
            this.form.areaCode = this.form.areaCode.split(',')
          }

          this.form.imageInfoVos.forEach((item) => {
            this.imageInfoVosLookUrl.push(`${process.env.VUE_APP_API_IMGURL}${item.imgUrl}`)
          })
          this.areaLevel = this.form.areaCode.length
          this.idEdit = false
          // 计算养护比
          this.curingRatioCalculate()
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
        if (this.instituType === '1011') {
          dicKey = 'house_type,set_mode_type,sys_Yes_No,open_state,corp_attr_2,operate_mode,workforce_type'
        } else {
          dicKey = 'house_type,set_mode_type,sys_Yes_No,open_state,corp_attr,operate_mode,workforce_type,rating,daily_testing'
        }
        allSelectdictionaryData(dicKey).then(response => {
          if (response.code === 0) {
            for (const k in response.data) {
              switch (k) {
                // 房屋产权
                case 'house_type':
                  this.house_typeOptions = response.data[k]
                  break
                  // 设置形式
                case 'set_mode_type':
                  this.set_mode_typeOptions = response.data[k]
                  break
                  // 是否有电梯
                case 'sys_Yes_No':
                  this.sys_config_typeOptions = response.data[k]
                  break
                  // 开放状态
                case 'open_state':
                  this.open_stateOptions = response.data[k]
                  break
                  // 评定等级
                case 'rating':
                  this.ratingOptions = response.data[k]
                  break
                case 'daily_testing':
                  this.daily_inspectionOptions = response.data[k]
                  break
                  // 法人性质(养老机构)
                case 'corp_attr':
                  // 法人性质(长者照顾之家)
                case 'corp_attr_2':
                  this.corp_attrOptions = response.data[k]
                  break
                  // 运营模式
                case 'operate_mode':
                  this.operate_modeOptions = response.data[k]
                  break
                  // 职工信息
                case 'workforce_type':
                  this.workforce_typeOptions = response.data[k]
                  this.workforce_typeOptions.forEach((item) => {
                    const obj = {
                      orgType: this.$route.query.instituType, // 机构类型
                      persionType: item.dictValue, // 职工类型
                      num: '', // 职工数量
                      orgId: this.$route.query.id || '', // 机构id
                      id: ''// 职工id
                    }
                    this.workMsgObj.push(obj)
                  })
                  break
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
    // 下一步
    tabsStep(tabsName) {
      this.activeTabs = tabsName
    },
    // 确定按钮-提交表单
    editContent(formName) {
      let _orgType_ = ''
      if (this.$route.query.instituType === '1011') {
        _orgType_ = '长者照护之家'
      } else if (this.$route.query.instituType === '1010') {
        _orgType_ = '养老机构'
      }
      // 居委
      if (this.areaLevel < 5) {
        this.activeTabs = 'base'
        window.scrollTo(0, 0)
        this.$message.error('所属居委选择错误，请至少选择到居委！')
        return false
      }
      // 运营单位
      if (this.form.opOrg && this.form.opOrg.length > 50) {
        return this.$message.error('运营单位长度不能超过50，请重新输入！')
      }
      // 运营方负责人
      if (this.form.opLinkman && this.form.opLinkman.length > 50) {
        return this.$message.error('运营方负责人长度不能超过50，请重新输入！')
      }
      // 运营方联系方式
      if (this.form.opPhone && this.form.opPhone.length > 20) {
        return this.$message.error('运营方联系方式长度不能超过20，请重新输入！')
      }
      // 建设方负责人
      if (this.form.buildLinkman && this.form.buildLinkman.length > 50) {
        return this.$message.error('建设方负责人长度不能超过50，请重新输入！')
      }
      // 建设方联系方式
      if (this.form.buildPhone && this.form.buildPhone.length > 20) {
        return this.$message.error('建设方联系方式长度不能超过20，请重新输入！')
      }

      this.$refs[formName].validate((valid, object) => {
        if (valid) {
          const params = this.form
          params.areaCode = this.areaCode.length === 0 ? '' : this.areaCode[this.areaCode.length - 1] + ''
          // 处理服务信息字段
          this.getServiceCheckboxValue()
          params.providerItemVos = this.serviceMsgObj
          // 服务信息字典结构，编辑提交的时候不传
          params.serviceProviderConfigVoList = null
          // 处理职工字段
          const dealWorkField = params.providerPersionVos
          for (const k in dealWorkField) {
            this.workMsgObj.forEach((item_a) => {
              if (k === item_a.persionType) {
                item_a.num = dealWorkField[k]
              }
            })
          }
          params.providerPersionVos = {}
          params.providerPersionVos = this.workMsgObj
          // 新增
          if (this.modelType === 'add') {
            submitDataAdd(params).then(response => {
              if (response.code === 0) {
                this.$message({
                  type: 'success',
                  message: '新增机构信息成功!'
                })
                // 关闭页面
                this.closeDetailsPage()
              } else {
                this.$message.error(_orgType_ + response.msg)
              }
            }).catch(() => {
              this.$message.error('新增机构信息失败!')
            })
          }
          // 编辑
          else if (this.modelType === 'edit') {
            submitDataEdit(params).then(response => {
              if (response.code === 0) {
                this.$message({
                  type: 'success',
                  message: '编辑机构信息成功!'
                })
                // 关闭页面
                this.closeDetailsPage()
              } else {
                this.$message.error(_orgType_ + response.msg)
              }
            }).catch(() => {
              this.$message.error('编辑机构信息失败!')
            })
          }
          // 查看
          else if (this.modelType === 'look') {
            closeSelectedTag(this, this.$route)
          }
        } else {
          this.activeTabs = 'base'
          window.scrollTo(0, 0)
          return false
        }
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
    // 计算养护比的值
    curingRatioCalculate() {
      if (parseInt(this.form.providerPersionVos.nurse) > 0 && parseInt(this.form.bedTotal) >= 0) {
        this.curingRatio = parseFloat(parseInt(this.form.providerPersionVos.nurse) / parseInt(this.form.bedTotal) * 100).toFixed(2)
      } else {
        this.curingRatio = '0'
      }
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
        path: `/pensionAgency/details/${_id_}`,
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
