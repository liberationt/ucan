<template>
  <el-container>
    <!--查询表单-->
    <el-header v-show="isSearch === 'home'" class="formDiv">
      <div class="ms-title">
        <img src="@/assets/images/ms_logo.png" alt="">
      </div>
      <div class="ms-content">
        <el-collapse v-model="activeCollapse">
          <el-collapse-item name="baseItem_1">
            <template slot="title">
              <div class="titleSlider">
                <span>
                  <i class="titleTip" />基本信息
                </span>
              </div>
            </template>
            <div class="zn-input-body">
              <el-form
                ref="form"
                key="form_base"
                :model="form"
                :rules="formRule"
                label-width="120px"
              >
                <el-col :md="24" :lg="24">
                  <el-form-item label="身份证" prop="fullName">
                    <el-input v-model.trim="form.idCard" class="cs-input" @blur="getLabels" />
                  </el-form-item>
                </el-col>
                <el-col :md="24" :lg="24">
                  <el-form-item label="年龄" prop="age">
                    <el-input v-model="form.age" class="cs-input" />
                  </el-form-item>
                </el-col>
                <el-col :md="24" :lg="24">
                  <el-form-item prop="sex" label="性别">
                    <el-select
                      v-model="form.sex"
                      multiple
                      clearable
                      style="width:100%;"
                    >
                      <el-option
                        v-for="(item, index) in sex"
                        v-if="sex.length !== 0"
                        :key="item.dictValue"
                        :label="item.dictLabel"
                        :value="item.dictValue"
                      />
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :md="12" :lg="8">
                  <el-form-item prop="isSh" label="是否上海户籍">
                    <el-radio-group v-model="form.isSh">
                      <el-radio label="yes">是</el-radio>
                      <el-radio label="no">否</el-radio>
                    </el-radio-group>
                  </el-form-item>
                </el-col>
                <el-col :md="12" :lg="16">
                  <el-form-item prop="censusRegisterAreaCode">
                    <Address
                      ref="address"
                      :id-edit="idEdit"
                      :area-code="areaCode"
                      :form-code="form.censusRegisterAreaCode"
                      :width="'100%'"
                      :disabled="form.isSh === 'no'"
                      @getAreaCode="getAreaCode_reg"
                    />
                  </el-form-item>
                </el-col>
                <el-col :md="24" :lg="24">
                  <el-form-item prop="monthlyCapita" label="家庭人均月收入">
                    <span v-for="(item, index) in monthlyCapita" :key="index" class="zn-mounth" :class="{'zn-mounth-choose': arr.includes(index)}" @click="chooseIts(index)">
                      {{ item.dictLabel }}
                    </span>
                  </el-form-item>
                </el-col>
              </el-form>
            </div>
          </el-collapse-item>
          <el-collapse-item name="baseItem_2">
            <template slot="title">
              <div class="titleSlider">
                <span>
                  <i class="titleTip" />标签信息
                </span>
              </div>
            </template>
            <div class="zn-input-body">
              <el-form
                ref="form"
                key="form_base"
                :model="form"
                :rules="formRule"
                label-width="120px"
              >
                <el-col :md="24" :lg="24">
                  <el-form-item prop="bizLiveStatus" :label="'居住情况'">
                    <el-select
                      v-model="form.bizLiveStatus"
                      multiple
                      clearable
                      style="width:100%;"
                      placeholder=""
                    >
                      <el-option
                        v-for="item in bizLiveStatus"
                        v-if="bizLiveStatus.length !== 0"
                        :key="item.dictValue"
                        :label="item.dictLabel"
                        :value="item.dictValue"
                      />
                    </el-select>
                  </el-form-item>
                </el-col>
                <!-- <el-col :md="24" :lg="24">
                  <el-form-item prop="bigAgeLevel" :label="'年龄类别'">
                    <el-select multiple v-model="form.bigAgeLevel"
                               clearable style="width:100%;" placeholder="">
                      <el-option v-if="bigAgeLevel.length !== 0"
                                 v-for="item in bigAgeLevel" :key="item.dictValue"
                                 :label="item.dictLabel" :value="item.dictValue"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col> -->
                <el-col :md="24" :lg="24">
                  <el-form-item prop="bizAssessLevel" :label="'长护险评估'">
                    <el-select
                      v-model="form.bizAssessLevel"
                      multiple
                      clearable
                      style="width:100%;"
                      placeholder=""
                    >
                      <el-option
                        v-for="item in bizAssessLevel"
                        :key="item.dictValue"
                        :label="item.dictLabel"
                        :value="item.dictValue"
                      />
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :md="24" :lg="24">
                  <el-form-item prop="bigEnjoyLevel" :label="'居家养老评估'">
                    <el-select
                      v-model="form.bigEnjoyLevel"
                      multiple
                      clearable
                      style="width:100%;"
                      placeholder=""
                    >
                      <el-option
                        v-for="item in bigEnjoyLevel"
                        :key="item.dictValue"
                        :label="item.dictLabel"
                        :value="item.dictValue"
                      />
                    </el-select>
                  </el-form-item>
                </el-col>
                <!-- <el-col :md="24" :lg="24">
                  <el-form-item prop="bizAssessType" :label="'评估类型'">
                    <el-cascader
                      v-model="form.bizAssessType"
                      :options="bizAssessType"
                      placeholder=""
                      :props="defaultProps"
                      clearable
                      style="width:100%;"
                    ></el-cascader>
                  </el-form-item>
                </el-col> -->
                <el-col :md="24" :lg="24">
                  <el-form-item prop="hCtegory" :label="'救助类别'">
                    <el-select
                      v-model="form.hCtegory"
                      placeholder=""
                      multiple
                      clearable
                      style="width:100%;"
                    >
                      <el-option
                        v-for="item in hCtegory"
                        v-if="hCtegory.length !== 0"
                        :key="item.dictValue"
                        :label="item.dictLabel"
                        :value="item.dictValue"
                      />
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :md="24" :lg="24">
                  <el-form-item prop="familyType" :label="'家庭类别'">
                    <el-select
                      v-model="form.familyType"
                      placeholder=""
                      multiple
                      clearable
                      style="width:100%;"
                    >
                      <el-option
                        v-for="item in familyType"
                        v-if="familyType.length !== 0"
                        :key="item.dictValue"
                        :label="item.dictLabel"
                        :value="item.dictValue"
                      />
                    </el-select>
                  </el-form-item>
                </el-col>
                <!--<el-col :md="24" :lg="24">
                  <el-form-item prop="defoType" :label="'残疾类型'">
                    <el-select
                      v-model="form.defoType"
                      placeholder=""
                      multiple
                      clearable
                      style="width:100%;"
                    >
                      <el-option
                        v-for="item in defoType"
                        v-if="defoType.length !== 0"
                        :key="item.dictValue"
                        :label="item.dictLabel"
                        :value="item.dictValue"
                      />
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :md="24" :lg="24">
                  <el-form-item prop="defoLevel" :label="'残疾等级'">
                    <el-select
                      v-model="form.defoLevel"
                      placeholder=""
                      multiple
                      clearable
                      style="width:100%;"
                    >
                      <el-option
                        v-for="item in defoLevel"
                        v-if="defoLevel.length !== 0"
                        :key="item.dictValue"
                        :label="item.dictLabel"
                        :value="item.dictValue"
                      />
                    </el-select>
                  </el-form-item>
                </el-col>-->
                <el-col :md="24" :lg="24">
                  <el-form-item
                    label="残疾类别"
                    prop="defoTypeLevels"
                  >
                    <el-cascader
                      v-model="defoTypeLevels"
                      style="width:100%"
                      :props="props"
                      :options="deformityTypeOptions"
                      placeholder=""
                      clearable
                      @change="changeDisable"
                    />
                  </el-form-item>
                </el-col>
                <el-col :md="24" :lg="24">
                  <el-form-item prop="entitledGroups" :label="'优抚类别'">
                    <el-select
                      v-model="form.entitledGroups"
                      placeholder=""
                      multiple
                      clearable
                      style="width:100%;"
                    >
                      <el-option
                        v-for="item in entitledGroups"
                        v-if="entitledGroups.length !== 0"
                        :key="item.dictValue"
                        :label="item.dictLabel"
                        :value="item.dictValue"
                      />
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :md="24" :lg="24">
                  <el-form-item prop="birthControlFamily" :label="'计生家庭'">
                    <el-select
                      v-model="form.birthControlFamily"
                      placeholder=""
                      multiple
                      clearable
                      style="width:100%;"
                    >
                      <el-option
                        v-for="item in birthControlFamily"
                        v-if="birthControlFamily.length !== 0"
                        :key="item.dictValue"
                        :label="item.dictLabel"
                        :value="item.dictValue"
                      />
                    </el-select>
                  </el-form-item>
                </el-col>
                <!--                <el-col :md="24" :lg="24">-->
                <!--                  <el-form-item prop="birthControlSubsidy" :label="'计生补助'">-->
                <!--                    <el-select-->
                <!--                      v-model="form.birthControlSubsidy"-->
                <!--                      placeholder=""-->
                <!--                      multiple-->
                <!--                      clearable-->
                <!--                      style="width:100%;"-->
                <!--                    >-->
                <!--                      <el-option-->
                <!--                        v-for="item in birthControlSubsidy"-->
                <!--                        v-if="birthControlSubsidy.length !== 0"-->
                <!--                        :key="item.dictValue"-->
                <!--                        :label="item.dictLabel"-->
                <!--                        :value="item.dictValue"-->
                <!--                      />-->
                <!--                    </el-select>-->
                <!--                  </el-form-item>-->
                <!--                </el-col>-->
                <el-col :md="24" :lg="24">
                  <div class="sub-btn">
                    <span @click="onSubmit('cx')">智能匹配</span>
                    <span @click="onReset">重置</span>
                  </div>
                </el-col>
              </el-form>
            </div>
          </el-collapse-item>
        </el-collapse>
      </div>
    </el-header>
    <el-header v-show="isSearch !== 'home'" class="formDiv">
      <div style="margin-bottom: 20px;width: 300px; float: left">
        <img src="@/assets/images/ms_logo.png" alt="">
      </div>
      <div class="tags-list">
        对象类别
        <span :class="[isAllTag ? 'choose-it' : '']" @click="allTags">全部</span>
        <span v-for="(item, index) in tags" :key="index" :class="{'choose-it': tagsArr.includes(index)}" @click="chooseItsTag(index)">
          {{ item.dictLabel }}
        </span>
      </div>
    </el-header>
    <el-main v-show="isSearch !== 'home'" class="tableContainer" style="padding: 14px 0">
      <el-container style="position: relative">
        <div v-show="isShowAddress" class="search-btn">
          <el-form :inline="true" :model="form" class="demo-form-inline">
            <el-form-item label="筛选区域" style="margin-right: 0">
              <Address
                :area-code="areaCode"
                :form-code="form.areaCode"
                :width="'200px'"
                :scope="'All'"
                @getAreaCode="getAreaCode"
                @keyup.enter.native="onSubmit"
              />
            </el-form-item>
          </el-form>
        </div>
        <el-tabs v-model="selectType" style="width: 100%" @tab-click="handleClick">
          <el-tab-pane v-for="(item, index) in tabs" :key="index" :label="item.name" :name="item.type">
            <div class="table-list">
              <div style="width:100%;margin-bottom:  20px">
                <span class="title-line" /><span>{{ '符合您的' + item.name + '(' + total + ')' }}</span>
                <span class="title-dashes" />
              </div>
              <div v-show="isShowAddress" style="width:100%;height:52px;" />
              <el-row v-if="total === 0 && showNoData === true" style="font-size: 20px; text-align: center">
                暂无数据
              </el-row>
              <el-row v-if="form.selectType === '1' && list.policyInformation !== undefined" :gutter="20">
                <el-col v-for="(item, index) in list.policyInformation.list" :key="item.id" :span="12">
                  <div class="list-card" :class="[item.checked === true ? 'list-card-checked' : '']" @click="chooseIt(index, 'policyInformation')">
                    <div>
                      <span class="card-title" @click.stop="openDetail(item.id)">{{ item.title }}</span>
                      <!--<span class="card-type">政策咨询</span>-->
                    </div>
                    <div>
                      <span class="card-mes">政策类型：{{ item.classify1 }}</span>
                      <span class="card-mes">发布时间：{{ getDateTime(item.pubDate) }}</span>
                    </div>
                    <div v-if="item.checked" class="card-checked">
                      <span class="iconfont">&#xe60f</span>
                    </div>
                  </div>
                </el-col>
                <el-col :span="24">
                  <pagination
                    v-show="total>0"
                    :total="total"
                    :page.sync="form.pageNum"
                    :limit.sync="form.pageSize"
                    @pagination="onSubmit"
                  />
                </el-col>
              </el-row>
              <el-row v-if="form.selectType === '2' && list.serviceItems !== undefined" :gutter="20">
                <el-col v-for="(item, index) in list.serviceItems.list" :key="index" :span="12">
                  <div class="list-card" :class="[item.checked === true ? 'list-card-checked' : '']" @click="chooseIt(index, 'serviceItems')">
                    <div>
                      <span class="card-title" @click.stop="openProjectDetail(item.id)">{{ item.serviceName }}</span>
                      <!--<span class="card-type">服务项目</span>-->
                    </div>
                    <div>
                      <span class="card-mes">服务范围：{{ item.minAge }} - {{ item.maxAge }}</span>
                      <span class="card-mes">申请方式：{{ item.applyWay }}</span>
                    </div>
                    <div v-if="item.checked" class="card-checked">
                      <span class="iconfont">&#xe60f</span>
                    </div>
                  </div>
                </el-col>
                <el-col :span="24">
                  <pagination
                    v-show="total>0"
                    :total="total"
                    :page.sync="form.pageNum"
                    :limit.sync="form.pageSize"
                    @pagination="getData(form)"
                  />
                </el-col>
              </el-row>
              <el-row v-if="form.selectType === '3' && list.pensionAgency !== undefined" :gutter="20">
                <el-col v-for="(item, index) in list.pensionAgency.list" :key="index" :span="12">
                  <div class="list-card" :class="[item.checked === true ? 'list-card-checked' : '']" @click="chooseIt(index, 'pensionAgency')">
                    <div>
                      <span class="card-title" @click.stop="openOrganDetail(item.orgId, item.orgType)">{{ item.orgName }}</span>
                      <span class="card-type">{{ item.orgType }}</span>
                    </div>
                    <div>
                      <span class="card-mes">联系电话：{{ item.phone }}</span>
                    </div>
                    <div>
                      <span class="card-mes">地址：{{ item.addr }}</span>
                    </div>
                    <div v-if="item.checked" class="card-checked">
                      <span class="iconfont">&#xe60f</span>
                    </div>
                  </div>
                </el-col>
                <el-col :span="24">
                  <pagination
                    v-show="total>0"
                    :total="total"
                    :page.sync="form.pageNum"
                    :limit.sync="form.pageSize"
                    @pagination="getData(form)"
                  />
                </el-col>
              </el-row>
              <el-row v-if="form.selectType === '4' && list.communityFacility !== undefined" :gutter="20">
                <el-col v-for="(item, index) in list.communityFacility.list" :key="index" :span="12">
                  <div class="list-card" :class="[item.checked === true ? 'list-card-checked' : '']" @click="chooseIt(index, 'communityFacility')">
                    <div>
                      <span class="card-title" @click="openComunityDetail(item.orgId, item.orgType)">{{ item.orgName }}</span>
                      <span class="card-type">{{ item.orgType }}</span>
                    </div>
                    <div>
                      <span class="card-mes">联系电话：{{ item.phone }}</span>
                    </div>
                    <div>
                      <span class="card-mes">地址：{{ item.addr }}</span>
                    </div>
                    <div v-if="item.checked" class="card-checked">
                      <span class="iconfont">&#xe60f</span>
                    </div>
                  </div>
                </el-col>
                <el-col :span="24">
                  <pagination
                    v-show="total>0"
                    :total="total"
                    :page.sync="form.pageNum"
                    :limit.sync="form.pageSize"
                    @pagination="getData(form)"
                  />
                </el-col>
              </el-row>
            </div>
          </el-tab-pane>
        </el-tabs>
      </el-container>
      <div style="width: 100%">
        <el-form :inline="true" :model="form" class="demo-form-inline">
          <el-form-item style="float: right">
            <el-button type="primary" class="border-btn" @click="back">返回检索
            </el-button>
            <el-button type="primary" class="border-btn" @click="onPrint">打印预览
            </el-button>
            <el-button type="primary" class="border-btn" @click="keepIt">保存查询结果
            </el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-main>
    <div v-show="printDailog" id="nnnn" class="print-page">
      <div class="page-body">
        <div class="print-btns">
          <div class="print-it">
            <el-button type="primary" class="base-btn" @click="printIt">打印
            </el-button>
          </div>
          <div>
            <el-button type="warning" class="base-btn" @click="closePrint">关闭
            </el-button>
          </div>
        </div>
        <h2>智能养老顾问</h2>
        <p class="time">时间：{{ setDateTimes() }}</p>
        <div class="mes">
          <p>
            <span>姓名：{{ list.name }}</span>
            <span>年龄：{{ list.age }}岁</span>
          </p>
          <p>
            <span>身份证：{{ idPass(list.idCard) }}</span>
            <span>户籍地址：{{ list.address }}</span>
          </p>
        </div>
        <div v-if="isCheckeds.policyInformation.length > 0" class="list-table">
          <div class="list-title">
            <span style="font-weight: bold">可享受的养老补贴政策</span>
            <span class="first-line" />
          </div>
          <div class="list-content">
            <table>
              <tr>
                <th>政策标题</th>
                <th>政策类型</th>
                <th>发布日期</th>
              </tr>
              <tr v-for="(item,index) in isCheckeds.policyInformation" :key="index">
                <td>{{ item.title }}</td>
                <td>{{ item.classify1 }}</td>
                <td>{{ getDateTime(item.pubDate) }}</td>
              </tr>
            </table>
          </div>
        </div>
        <div v-if="isCheckeds.serviceItems.length > 0" class="list-table">
          <div class="list-title">
            <span style="font-weight: bold">可享受的服务项目</span>
            <span class="second-line" />
          </div>
          <div class="list-content">
            <table>
              <tr>
                <th>服务名称</th>
                <th>服务范围</th>
                <th>申请方式</th>
              </tr>
              <tr v-for="(item,index) in isCheckeds.serviceItems" :key="index">
                <td>{{ item.serviceName }}</td>
                <td>{{ item.minAge }} - {{ item.maxAge }}</td>
                <td>{{ item.applyWay }}</td>
              </tr>
            </table>
          </div>
        </div>
        <div v-if="isCheckeds.pensionAgency.length > 0" class="list-table">
          <div class="list-title">
            <span style="font-weight: bold">可服务的机构设施</span>
            <span class="second-line" />
          </div>
          <div v-for="(item,index) in isCheckeds.pensionAgency" :key="index" class="list-content">
            <div class="content-name">
              <span>{{ item.orgName }}</span>
              <span>养老机构</span>
            </div>
            <div class="content-mes">
              <span>联系电话：{{ item.phone }}</span>
              <span>地址：{{ item.addr }}</span>
            </div>

          </div>
        </div>
        <div v-if="isCheckeds.communityFacility.length > 0" class="list-table">
          <div class="list-title">
            <span style="font-weight: bold">可服务的社区设施</span>
            <span class="second-line" />
          </div>
          <div v-for="(item,index) in isCheckeds.communityFacility" :key="index" class="list-content">
            <div class="content-name">
              <span>{{ item.orgName }}</span>
              <span>社区设施</span>
            </div>
            <div class="content-mes">
              <span>联系电话：{{ item.phone }}</span>
              <span>地址：{{ item.addr }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="detailShow" class="list-detail">
      <div class="list-detail-body">
        <Datails :id="datailId" :close="closeDetail" />
      </div>
    </div>
    <div v-if="projectDetailShow" class="list-detail">
      <div class="list-detail-body">
        <ProjectDetails :id="datailId" :close="closeProjectDetail" />
      </div>
    </div>
    <div v-if="organDetailShow" class="list-detail">
      <div class="list-detail-body">
        <OrganDetails :id="datailId" :close="closeOrganDetail" :type="organType" />
      </div>
    </div>
    <div v-if="assDetailShow" class="list-detail">
      <div class="list-detail-body">
        <AssDetails :id="datailId" :close="closeAssDetail" :type="comType" />
      </div>
    </div>
    <div v-if="comminityDetailShow" class="list-detail">
      <div class="list-detail-body">
        <ComminityDetails :id="datailId" :close="closeComminityDetail" :type="comType" />
      </div>
    </div>
    <div v-if="compreDetailShow" class="list-detail">
      <div class="list-detail-body">
        <CompreDetails :id="datailId" :close="closeCompreDetail" :type="comType" />
      </div>
    </div>
    <div v-if="dayDetailShow" class="list-detail">
      <div class="list-detail-body">
        <DayDetails :id="datailId" :close="closeDayDetail" :type="comType" />
      </div>
    </div>
    <div v-if="elderDetailShow" class="list-detail">
      <div class="list-detail-body">
        <ElderDetails :id="datailId" :close="closeElderDetail" :type="comType" />
      </div>
    </div>
    <div v-if="healthDetailShow" class="list-detail">
      <div class="list-detail-body">
        <HealthDetails :id="datailId" :close="closeHealthDetail" :type="comType" />
      </div>
    </div>
    <div v-if="helpDetailShow" class="list-detail">
      <div class="list-detail-body">
        <HelpDetails :id="datailId" :close="closeHelpDetail" :type="comType" />
      </div>
    </div>
    <div v-if="nursingDetailShow" class="list-detail">
      <div class="list-detail-body">
        <NursingDetails :id="datailId" :close="closeNursingDetail" :type="comType" />
      </div>
    </div>
  </el-container>
</template>

<script>
import { allSelectdictionaryData } from '@/api/facilitiesConfig/communityFacilities'
import { pageModel } from '@/common'
import Address from '@/components/Address'
import Pagination from '@/components/Pagination'
import { mapGetters } from 'vuex'
import { getDate_YMD, setDateTime } from '@/utils/index.js'
import { searchListMs, addList, getLabel } from '@/api/pensionAdvisersCongfig/oldAge'
import Datails from '../components/details'
import ProjectDetails from '../components/projectDetails'
import OrganDetails from '../components/organDetail'
import AssDetails from '../components/assistantDeviceSiteDetails'
import ComminityDetails from '../components/communityPensionOrganizationDetails'
import CompreDetails from '../components/comprehensiveDetails'
import DayDetails from '../components/dayCareFacilitiesDetails'
import ElderDetails from '../components/elderlyActivityRoomDetails'
import HealthDetails from '../components/healthHutDetails'
import HelpDetails from '../components/helpMealsDetails'
import NursingDetails from '../components/nursingStationDetails'
export default {
  name: 'Index',
  components: {
    Address,
    Pagination,
    Datails,
    ProjectDetails,
    OrganDetails,
    AssDetails,
    ComminityDetails,
    CompreDetails,
    DayDetails,
    ElderDetails,
    HealthDetails,
    HelpDetails,
    NursingDetails
  },
  computed: {
    ...mapGetters([
      'data'
    ])
  },
  watch: {
    tagsArr() {
      if (this.tagsArr.length === 0) {
        this.isAllTag = true
      } else {
        this.isAllTag = false
      }
    },
    'form.isSh': function(newVal, oldVal) {
      if (this.form.isSh === 'no') {
        this.form.censusRegisterAreaCode = []
        this.idEdit = !this.idEdit
      }
    },
    selectType() {
      switch (this.selectType) {
        case 'policyInformation':
          this.form.selectType = '1'
          break
        case 'serviceItems':
          this.form.selectType = '2'
          break
        case 'pensionAgency':
          this.form.selectType = '3'
          break
        case 'communityFacility':
          this.form.selectType = '4'
          break
      }
    }
  },
  data() {
    return {
      props: { multiple: true, checkStrictly: true },
      deformityTypeOptions: [], // 残疾options
      defoTypeLevels: [], // 残疾数据保存
      assDetailShow: false,
      comminityDetailShow: false,
      compreDetailShow: false,
      dayDetailShow: false,
      elderDetailShow: false,
      healthDetailShow: false,
      helpDetailShow: false,
      nursingDetailShow: false,
      comType: '',
      datailId: '',
      detailShow: false,
      projectDetailShow: false,
      organDetailShow: false,
      organType: '',
      idEdit: true,
      printDailog: false, // 打印弹窗
      isShowAddress: false, // 是否显示地址组件
      isSearch: 'home',
      selectType: 'policyInformation',
      activeCollapse: ['baseItem_1', 'baseItem_2', 'baseItem_3', 'baseItem_4', 'baseItem_5'], // 折叠面板默认打开name参数
      defaultProps: {
        label: 'dictLabel',
        value: 'dictValue'
      },
      form: {
        selectType: '1',
        idCard: '', // 身份证号
        areaCode: '', // 区化地址code
        isSh: 'yes', // 是否是上海户籍
        pageNum: 1,
        pageSize: 10,
        age: '', // 年龄
        censusRegisterAreaCode: '', // 是上海户籍的户籍地址
        dictTags: [], // 字典
        objectTypes: [], // 标签
        // newData
        sex: [], // 性别
        bizLiveStatus: [], // 居中情况
        bizAssessLevel: [], // 评估等级
        // bizAssessType: [], // 评估类型
        bigEnjoyLevel: [],
        hCtegory: [], // 救助类比
        familyType: [], // 家庭类别
        monthlyCapita: [], // 家庭人均收入
        category: [], // 残疾人类别
        defoType: [], // 残疾类型
        defoLevel: [], // 残疾等级
        entitledGroups: [], // 优抚类别
        bigAgeLevel: [], // 年龄类别
        birthControlFamily: [], // 计生家庭
        birthControlSubsidy: [] // 计生补助
      },
      formRule: {
        censusRegisterAreaCode: []//
      },
      arr: [], // 被选中的家庭人均收入
      tabs: [{
        name: '政策资讯',
        type: 'policyInformation'
      }, {
        name: '服务项目',
        type: 'serviceItems'
      }, {
        name: '养老机构',
        type: 'pensionAgency'
      }, {
        name: '社区设施',
        type: 'communityFacility'
      }],
      // new
      peopleCategory: [], // 人口分类
      sex: [], // 性别
      bizLiveStatus: [], // 居住情况
      bizAssessLevel: [], // 评估等级
      bizAssessType: [], // 评估类型
      hCtegory: [], // 救助类别
      familyType: [], // 家庭类别
      monthlyCapita: [], // 家庭人均收入
      category: [], // 残疾人类别
      defoType: [], // 残疾类型
      defoLevel: [], // 残疾等级
      entitledGroups: [], // 优抚类别
      birthControlFamily: [], // 计生家庭
      birthControlSubsidy: [], // 计生补助
      bigAgeLevel: [], // 年龄类别
      idEdit: true,
      areaCode: [], // 所属居委全部ID
      list: [], // 列表数据
      bigEnjoyLevel: [],
      total: 0,
      pageType: {
        policyInformation: 1,
        serviceItems: 1,
        pensionAgency: 1,
        communityFacility: 1
      },
      showNoData: true,
      isOpen: false,
      isCheckeds: {
        policyInformation: [],
        serviceItems: [],
        pensionAgency: [],
        communityFacility: []
      },
      tags: [
        {
          dictLabel: '老人',
          dictValue: '1'
        }, {
          dictLabel: '残疾人',
          dictValue: '2'
        }, {
          dictLabel: '优抚人员',
          dictValue: '3'
        }, {
          dictLabel: '社会救助人员',
          dictValue: '4'
        }, {
          dictLabel: '计生人员',
          dictValue: '5'
        }

      ],
      tagsArr: [],
      isAllTag: true
    }
  },
  mounted() {
    this.selectData()
    this.idEdit = false
  },
  methods: {
    closeAssDetail() {
      this.assDetailShow = false
    },
    closeComminityDetail() {
      this.comminityDetailShow = false
    },
    closeCompreDetail() {
      this.compreDetailShow = false
    },
    closeDayDetail() {
      this.dayDetailShow = false
    },
    closeElderDetail() {
      this.elderDetailShow = false
    },
    closeHealthDetail() {
      this.healthDetailShow = false
    },
    closeHelpDetail() {
      this.helpDetailShow = false
    },
    closeNursingDetail() {
      this.nursingDetailShow = false
    },
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
    openComunityDetail(id, type) {
      this.datailId = id
      switch (type) {
        case '日间照护机构':
          this.comType = '2010' // 日间照护机构
          this.dayDetailShow = true
          break
        case '综合为老服务中心':
          this.comType = '2011' // 综合为老服务中心,
          this.compreDetailShow = false
          break
        case '邻里汇':
          this.comType = '2012' // 邻里汇
          this.compreDetailShow = false
          break
        case '老年活动室':
          this.comType = '2013' // 老年活动室
          this.elderDetailShow = false
          break
        case '助餐点':
          this.comType = '2014' // 助餐点,
          this.helpDetailShow = false
          break
        case '社区长者食堂':
          this.comType = '2015' // 社区长者食堂
          this.helpDetailShow = false
          break
        case '护理站':
          this.comType = '2016' // 护理站
          this.nursingDetailShow = false
          break
        case '护理院':
          this.comType = '2019' // 护理院
          this.nursingDetailShow = false
          break
        case '社区养老组织':
          this.comType = '2017' // 社区养老组织
          this.comminityDetailShow = false
          break
        case '健康小屋':
          this.comType = '2018' // 健康小屋
          this.healthDetailShow = false
          break
        case '养老辅具展示点':
          this.comType = '4001' // 养老辅具展示点
          this.assDetailShow = false
          break
      }
    },
    //
    closeDetail() {
      this.detailShow = false
    },
    openDetail(id) {
      this.detailShow = true
      this.datailId = id
    },
    closeProjectDetail() {
      this.projectDetailShow = false
    },
    openProjectDetail(id) {
      this.projectDetailShow = true
      this.datailId = id
    },
    closeOrganDetail() {
      this.organDetailShow = false
    },
    openOrganDetail(id, type) {
      this.organDetailShow = true
      this.datailId = id
      if (type === '长者照护之家') {
        this.organType = '1011'
      } else {
        this.organType = '1010'
      }
    },
    openDetail(id) {
      this.detailShow = true
      this.datailId = id
    },
    getDateTime(date) {
      if (date !== '' && date !== null) {
        return date.replace('00:00:00', '')
      } else {
        return date
      }
    },
    // 字典匹配公共方法
    getLabelWay(name, data) {
      if (data) {
        const datas = []
        // 处理逗号隔开
        if (data.indexOf(',')) {
          this.form[name] = Array.from(new Set(data.split(',')))
          return
        } else {
          datas.push(data)
        }
        this.form[name] = datas
      }
    },
    // 身份证匹配字典
    getLabels() {
      if (this.form.idCard !== '') {
        getLabel({
          idCard: this.form.idCard
        }).then(res => {
          if (res.code === 0) {
            this.getLabelWay('bigAgeLevel', res.data.ageLevel)
            this.getLabelWay('bizLiveStatus', res.data.liveStatus)
            this.getLabelWay('assessLevel', res.data.bizAssessLevel)
            this.getLabelWay('hCtegory', res.data.succorCategory)
            this.getLabelWay('familyType', res.data.familyType)
            this.getLabelWay('defoType', res.data.defoType)
            this.getLabelWay('category', res.data.category)
            this.getLabelWay('defoLevel', res.data.defoLevel)
            this.getLabelWay('entitledGroups', res.data.preferType)
            this.getLabelWay('birthControlFamily', res.data.familyPlanning)
            this.getLabelWay('birthControlSubsidy', res.data.familyPlanningAllowance)
            this.getLabelWay('sex', res.data.sex)
            const myDatas = []
            myDatas.push(res.data.assessType)
            myDatas.push(res.data.assessLevel + res.data.assessType)
            this.form.bizAssessType = myDatas
            this.form.age = res.data.age
          } else {
            this.$message.error(res.msg)
          }
        })
      }
    },
    // 数据字典
    selectData() {
      const dicKey = 'people_category,sys_sex,biz_live_status,is_enjoy,biz_assess_level,h_category,family_type,monthly_capita,category,defo_type,defo_level,entitled_groups,biz_age_level,biz_assess_type,birthControl_family'
      allSelectdictionaryData(dicKey).then(response => {
        if (response.code === 0) {
          for (const k in response.data) {
            switch (k) {
              // 人口分类
              case 'people_category':
                this.peopleCategory = response.data[k]
                break
                // 性别
              case 'sys_sex':
                this.sex = response.data[k]
                break
                // 服务对象
              case 'biz_live_status':
                this.bizLiveStatus = response.data[k]
                break
                // 评估等级
              case 'biz_assess_level':
                this.bizAssessLevel = response.data[k]
                break
                // 评估类型
              case 'biz_assess_type':
                this.bizAssessType = response.data[k]
                break
                // 救助类别
              case 'h_category':
                this.hCtegory = response.data[k]
                break
                // 家庭类别
              case 'family_type':
                this.familyType = response.data[k]
                break
                // 家庭人均收入
              case 'monthly_capita':
                this.monthlyCapita = response.data[k]
                this.monthlyCapita.forEach((item, index) => {
                  item.color = false
                })
                break
                // 残疾人类别
              case 'category':
                this.category = response.data[k]
                break
                // 家庭人均收入
              case 'defo_type':
                this.defoType = response.data[k]
                break
                // 家庭人均收入
              case 'defo_level':
                this.defoLevel = response.data[k]
                break
                // 优抚类别
              case 'entitled_groups':
                this.entitledGroups = response.data[k]
                break
                // 计生家庭
              case 'birthControl_family':
                this.birthControlFamily = response.data[k]
                break
                // 计生补助
              // case 'birthControl_subsidy':
              //   this.birthControlSubsidy = response.data[k]
              //   break
                // 年龄类别
              case 'biz_age_level':
                this.bigAgeLevel = response.data[k]
                break
                // 受否享受
              case 'is_enjoy':
                this.bigEnjoyLevel = response.data[k]
                break
            }
            const defoTypeOptions = []
            const defoLevelOptions = []
            this.defoLevel.forEach(item => {
              defoLevelOptions.push({
                value: item.dictValue,
                label: item.dictLabel,
                disabled: false
              })
            })
            this.defoType.forEach(item => {
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
            // this.bizAssessType.forEach((item, index) =>{
            //   const data = JSON.parse(JSON.stringify(this.bizAssessLevel));
            //   data.forEach((list, i) =>{
            //     data[i].dictValue = list.dictValue + index
            //   });
            //   item.children = data
            // })
          }
        }
      })
    },
    // 获取所属居委
    getAreaCode_reg(val) {
      this.form.censusRegisterAreaCode = val
    },
    // 多选平均收入
    chooseIts(i) {
      if (this.arr.includes(i)) {
        this.arr = this.arr.filter(function(ele) { return ele != i })
      } else {
        this.arr.push(i)
      }
    },
    // 多选标签
    chooseItsTag(i) {
      if (this.tagsArr.includes(i)) {
        this.tagsArr = this.tagsArr.filter(function(ele) { return ele != i })
      } else {
        this.tagsArr.push(i)
      }
      this.form.objectTypes = []
      this.tags.forEach((item, index) => {
        for (let j = 0; j < this.tagsArr.length; j++) {
          if (this.tagsArr[j] === index) {
            this.form.objectTypes.push(item.dictValue)
          }
        }
      })
      this.onSubmit()
    },
    // 全部标签
    allTags() {
      this.form.objectTypes = []
      this.tagsArr = []
      this.onSubmit()
    },
    // 循环遍历多选塞入数组中
    pushArr(arr, allArr, name) {
      if (arr) {
        arr.forEach(item => {
          const data = {}
          data.dictType = name
          data.dictValue = item
          allArr.push(data)
        })
      }
    },
    addCkecked(arr) {
      arr.forEach((item, index) => {
        arr[index].checked = false
      })
    },
    // 反选
    forChecked(arr) {
      arr.forEach((item, index) => {
        for (let i = 0; i < this.isCheckeds[this.selectType].length; i++) {
          if (this.selectType === 'policyInformation' || this.selectType === 'serviceItems') {
            if (item.id === this.isCheckeds[this.selectType][i].id) {
              arr[index].checked = true
            }
          } else {
            if (item.orgId === this.isCheckeds[this.selectType][i].orgId) {
              arr[index].checked = true
            }
          }
        }
      })
    },
    getData(form) {
      if (this.form.censusRegisterAreaCode instanceof Array) {
        this.form.censusRegisterAreaCode = this.form.censusRegisterAreaCode[this.form.censusRegisterAreaCode.length - 1 ]
      }
      this.showNoData = true
      searchListMs(form).then(res => {
        if (res.code === 0) {
          this.showNoData = true
          this.list = res.data
          if (this.list[this.selectType].list === null) {
            this.list[this.selectType].list = []
          }
          this.total = this.list[this.selectType].total
          this.pageType[this.selectType] = this.form.pageNum
          this.addCkecked(this.list[this.selectType].list)
          this.forChecked(this.list[this.selectType].list)
          this.isOpen = true
        } else {
          this.isOpen = false
          this.list[this.selectType] = {}
          this.list[this.selectType].list = []
          this.total = 0
          this.$message.error(res.msg)
        }
      })
    },
    // 查询
    onSubmit(type) {
      this.isSearch = 'list'
      const params = JSON.parse(JSON.stringify(this.form))
      if (params.isSh === 'no') {
        const data = {}
        data.dictType = 'people_category'
        data.dictValue = 'p_population'
        params.dictTags.push(data)
      }
      if (this.arr) {
        this.arr.forEach((item, index) => {
          for (let i = 0; i < this.monthlyCapita.length; i++) {
            if (index === i) {
              const myData = {}
              myData.dictType = this.monthlyCapita[i].dictType
              myData.dictValue = this.monthlyCapita[i].dictValue
              params.dictTags.push(myData)
            }
          }
        })
      }
      this.pushArr(this.form.bizAssessLevel, params.dictTags, 'biz_assess_level')// 评估等级
      this.pushArr(this.form.bigEnjoyLevel, params.dictTags, 'is_enjoy')// 居家养老
      this.pushArr(this.form.bigAgeLevel, params.dictTags, 'biz_age_level')// 年龄分类
      this.pushArr(this.form.sex, params.dictTags, 'sex')// 性别
      this.pushArr(this.form.bizLiveStatus, params.dictTags, 'biz_live_status') // 居住情况
      this.pushArr(this.form.hCtegory, params.dictTags, 'h_category') // 救助类别
      this.pushArr(this.form.familyType, params.dictTags, 'family_type') // 家庭类别
      this.pushArr(this.form.monthlyCapita, params.dictTags, 'monthly_capita') // 家庭人均收入
      this.pushArr(this.form.category, params.dictTags, 'category') // 残疾人类别
      // this.pushArr(this.form.defoType, params.dictTags, 'defo_type') // 残疾类型
      // this.pushArr(this.form.defoLevel, params.dictTags, 'defo_level') // 残疾等级
      this.pushArr(this.form.entitledGroups, params.dictTags, 'entitled_groups') // 优抚类别
      this.pushArr(this.form.birthControlFamily, params.dictTags, 'birthControl_family') // 计生家庭
      // this.pushArr(this.form.birthControlSubsidy, params.dictTags, 'birthControl_subsidy') // 计生补助
      const arr = []
      if (this.areaCode.length !== 0) {
        arr.push(this.areaCode[this.areaCode.length - 1])
      }
      params.areaCode = arr[0] // 所选区域赋值
      params.censusRegisterAreaCode = ''
      if (this.form.censusRegisterAreaCode instanceof Array && this.form.censusRegisterAreaCode.length !== 0) {
        params.censusRegisterAreaCode = (this.form.censusRegisterAreaCode[this.form.censusRegisterAreaCode.length - 1])
      } else if (typeof (this.form.censusRegisterAreaCode) === 'string' && this.form.censusRegisterAreaCode) {
        params.censusRegisterAreaCode = this.form.censusRegisterAreaCode
      } else {
        params.censusRegisterAreaCode = ''
      }
      // 处理残疾类型数据
      if (this.defoTypeLevels && this.defoTypeLevels.length) {
        this.defoTypeLevels.forEach(item => {
          params.dictTags.push({
            'dictType': 'defo_type' + item[0],
            'dictValue': 'defo_level' + item[1]
          })
        })
      }
      // 残疾类别 特殊处理
      else {
        this.form.defoType = []
        this.form.defoLevel = []
      }
      this.getData(params)
      if (type === 'cx') {
        this.isCheckeds = {
          policyInformation: [],
          serviceItems: [],
          pensionAgency: [],
          communityFacility: []
        }
      }
    },
    toAdd() {
      this.$router.push({
        path: `/consultRecord/details/0`,
        query: { 'modelType': 'add', '_title': `新增咨询记录` }
      })
    },
    // 身份证加密
    idPass(id) {
      if (id) {
        const newId = id.split('')
        let data = ''
        newId.splice(5, 5, '*****')
        newId.forEach(item => {
          data = data + item
        })
        return data
      }
    },
    // 返回当前时间
    setDateTimes() {
      return setDateTime('')
    },
    // 打印
    Printpart(idstr) { // idstr 要打印内容中的id
      const oppo = '.page-body{\n' +
          '  width: 650px;\n' +
          '  min-height: 878px;\n' +
          '  margin: 20px auto 80px auto;\n' +
          '  padding: 0px 0px 0px 15px!important ;\n' +
          '  background: #ffffff;\n' +
          '  position: relative;\n' +
          '}\n' +
          '.page-body  .print-btns {\n' +
          '  position: absolute;\n' +
          '  z-index: 9999;\n' +
          '  width: 80px;\n' +
          '  top: 0px;\n' +
          '  right: - 100px;\n' +
          '  display: none !important;\n' +
          '}\n' +
          '.page-body  .print-btns .print-it {\n' +
          '  margin-bottom: 15px;\n' +
          '}\n' +
          '.page-body  h2{\n' +
          '   text-align: center;\n' +
          '}\n' +
          '.page-body  .time{\n' +
          '   text-align: right;\n' +
          '   font-size: 14px;\n' +
          '   padding-bottom: 15px;\n' +
          '   border-bottom: 3px solid #000000;\n' +
          '}\n' +
          '.page-body  .mes{\n' +
          '   margin-bottom: 25px;\n' +
          '}\n' +
          '.page-body  .mes span{\n' +
          '   display: inline-block;\n' +
          '   font-size: 14px;\n' +
          '   vertical-align: top;\n' +
          '   width:220px !important;\n' +
          '   line-height: 20px;\n' +
          '}\n' +
          '.page-body  .mes span:nth-child(2n){\n' +
          '   width:410px !important;\n' +
          '}\n' +
          '.page-body  .list-table{\n' +
          '   width:100%;\n' +
          '   margin-bottom: 20px;\n' +
          '}\n' +
          '.page-body  .list-table .list-title{\n' +
          '   font-size: 16px;\n' +
          '}\n' +
          '.page-body  .list-table .list-title span {\n' +
          '   display: inline-block;\n' +
          '   vertical-align: middle;\n' +
          '}\n' +
          '.page-body  .list-table .list-title  .first-line {\n' +
          '   width:460px !important;\n' +
          '   border-top: 2px dashed #333333;\n' +
          '   margin-left: 10px;\n' +
          '}\n' +
          '.page-body  .list-table .list-title  .second-line {\n' +
          '   width:490px !important;\n' +
          '   border-top: 2px dashed #333333;\n' +
          '   margin-left: 10px;\n' +
          '}\n' +
          '.page-body  .list-table  .list-content {\n' +
          '   margin-top: 10px;\n' +
          '   width:100%;\n' +
          '}\n' +
          '.page-body  .list-table  .list-content  span {\n' +
          '   display: inline-block;\n' +
          '   vertical-align: top;\n' +
          '}\n' +
          '.page-body  .list-table  .list-content  table {\n' +
          '   border: 1px solid #000000;\n' +
          '   border-collapse:collapse;\n' +
          '   border-spacing:0;\n' +
          '   width:100%;\n' +
          '}\n' +
          '.page-body  .list-table  .list-content  table th {\n' +
          '   border: 1px solid #000000;\n' +
          '   font-weight: bold;\n' +
          '   text-align: left;\n' +
          '   padding: 5px 5px;\n' +
          '}\n' +
          '.page-body  .list-table  .list-content  table th:nth-child(1) {\n' +
          '   width: 240px;\n' +
          '}\n' +
          '.page-body  .list-table  .list-content  table td{\n' +
          '   border: 1px solid #000000;\n' +
          '   text-align: left;\n' +
          '   padding: 5px 5px;\n' +
          '}\n' +
          '.page-body  .list-table  .list-content  .content-name {\n' +
          '   margin-bottom: 12px;\n' +
          '   margin-top: 15px;\n' +
          '}\n' +
          '.page-body  .list-table  .list-content  .content-name span:nth-child(1) {\n' +
          '   font-weight: bold;\n' +
          '   width: 50%;\n' +
          '}\n' +
          '.page-body  .list-table  .list-content  .content-name span:nth-child(2) {\n' +
          '   text-align: right;\n' +
          '   width: 50%;\n' +
          '   margin-left: -5px !important;\n' +
          '}\n' +
          '.page-body  .list-table  .list-content  .content-mes {\n' +
          '   font-size: 14px;\n' +
          '   line-height: 20px;\n' +
          '}\n' +
          '.page-body  .list-table  .list-content  .content-mes span:nth-child(1) {\n' +
          '   width: 220px !important;\n' +
          '}\n' +
          '.page-body  .list-table  .list-content  .content-mes span:nth-child(2)  {\n' +
          '   width: 410px !important;\n' +
          '}'
      var el = document.getElementById(idstr)
      var iframe = document.createElement('IFRAME')
      var doc = null
      iframe.setAttribute('style', 'position:absolute;width:0px;height:0px;left:-500px;top:-500px;')
      document.body.appendChild(iframe)
      doc = iframe.contentWindow.document
      doc.write('<div>' + el.innerHTML + '</div>' + '<style>' + oppo + '</style>')
      doc.close()
      iframe.contentWindow.focus()
      iframe.contentWindow.print()
      if (navigator.userAgent.indexOf('MSIE') > 0) {
        document.body.removeChild(iframe)
      }
    },
    // 确定打印
    printIt() {
      this.Printpart('nnnn')
      // window.print()
    },
    // 切换tab
    handleClick(tab) {
      this.form.pageNum = this.pageType[tab.name]
      if (tab.name === 'pensionAgency' || tab.name === 'communityFacility') {
        this.isShowAddress = true
      } else {
        this.isShowAddress = false
      }
      setTimeout(() => {
        this.onSubmit()
      }, 200)
    },
    // 选中列表
    chooseIt(index, type) {
      const arr = JSON.parse(JSON.stringify(this.list))
      arr[type].list[index].checked = !arr[type].list[index].checked
      if (arr[type].list[index].checked === true) {
        this.isCheckeds[type].push(arr[type].list[index])
      } else {
        this.isCheckeds[type].map((item, i) => {
          if (type === 'pensionAgency' || type === 'communityFacility') {
            if (this.isCheckeds[type][i].orgId === arr[type].list[index].orgId) {
              this.isCheckeds[type].splice(i, 1)
            }
          } else {
            if (this.isCheckeds[type][i].id === arr[type].list[index].id) {
              this.isCheckeds[type].splice(i, 1)
            }
          }
        })
      }
      this.list = arr
    },
    // 格式化时间
    getDate(date) {
      return getDate_YMD(date)
    },
    // 获取区域的值
    getAreaCode(val) {
      if (val.length !== 0) {
        this.areaCode = val
        const arr = []
        if (this.areaCode.length !== 0) {
          arr.push(this.areaCode[this.areaCode.length - 1])
        }
        this.form.areaCode = arr[0] // 所选区域赋值
        this.onSubmit()
      }
    },
    back() {
      this.isSearch = 'home'
      this.tagsArr = []
      this.form.objectTypes = []
    },
    toList() {
      if (this.form.idCard === '') {
        this.$message.error('身份证号不能为空, 请输入身份证号')
        return falsep
      }
      this.isSearch = 'list'
      this.getData()
    },
    // 重置
    onReset() {
      this.form = {
        selectType: '1',
        idCard: '', // 身份证号
        areaCode: '', // 区化地址code
        isSh: 'yes', // 是否是上海户籍
        pageNum: 1,
        pageSize: 10,
        age: '', // 年龄
        censusRegisterAreaCode: '', // 是上海户籍的户籍地址
        dictTags: [], // 字典
        objectTypes: [], // 标签
        // newData
        sex: [], // 性别
        bizLiveStatus: [], // 居中情况
        bizAssessLevel: [], // 评估等级
        bizAssessType: [], // 评估类型
        hCtegory: [], // 救助类比
        familyType: [], // 家庭类别
        monthlyCapita: [], // 家庭人均收入
        category: [], // 残疾人类别
        defoType: [], // 残疾类型
        defoLevel: [], // 残疾等级
        entitledGroups: [], // 优抚类别
        birthControlFamily: [], // 计生家庭
        birthControlSubsidy: [],
        bigAgeLevel: [] // 年龄类别
      }
      this.defoTypeLevels = [] // 残疾类别
      this.arr = []
      this.areaCode = []
      this.$refs.address.resetCode() // 调用子组件方法重置code
      // this.onSubmit();
    },
    keepIt() {
      if (this.isCheckeds.policyInformation.length > 0 || this.isCheckeds.serviceItems.length > 0 || this.isCheckeds.pensionAgency.length > 0 || this.isCheckeds.communityFacility.length > 0) {
        this.$confirm('确定要保存所选结果吗？', '保存结果', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          const data = JSON.parse(JSON.stringify(this.isCheckeds))
          data.age = this.list.age
          data.name = this.list.name
          data.address = this.list.address
          const content = JSON.stringify(data)
          addList({
            content: content,
            idCard: this.form.idCard
          }).then(res => {
            if (res.code === 0) {
              this.$message({
                type: 'success',
                message: '保存成功'
              })
            }
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消保存！'
          })
        })
      } else {
        this.$message.warning('请勾选匹配的政策资讯、服务项目和机构设施。')
      }
    },
    // 打印
    onPrint() {
      if (this.isOpen === false) {
        this.$message.error('请输入正确的身份证号查询')
        return false
      }
      this.printDailog = true
    },
    // 关闭打印
    closePrint() {
      this.printDailog = false
    }
  }
}
</script>

<style lang="scss">
@import "~@/styles/form.css";
.ms-title {
  width: 100%;
  padding-bottom: 15px;
}
.ms-content {
  width: 100%;
}
.zn-input-body {
  width: 70%;
  margin: 0 auto;
  .zn-mounth {
    width: 24.25%;
    margin-right: 1%;
    display: inline-block;
    text-align: center;
    height: 36px;
    line-height: 36px;
    border: 1px solid #d3dde8;
    cursor: pointer;
    border-radius: 4px;
  }
  .zn-mounth:last-of-type {
    margin-right: 0;
  }
  .zn-mounth-choose {
    color: #1890ff !important;
    border: 1px solid #1890ff!important;
  }
  .sub-btn {
    width: 100%;
    text-align: center;
    margin-top: 30px;
    margin-bottom: 40px;
    span {
      padding: 10px 20px;
      font-size: 16px;
      background: #0078D4;
      color: #ffffff;
      border: 1px solid #0078D4;
      border-radius: 4px;
      margin: 0 10px;
      cursor: pointer;
    }
    span:last-of-type {
      color: #0078D4;
      background: #ffffff;
    }
  }
}
.cs-header{
  height:80px;
  position: relative;
  margin-top: 22px !important;
  background: #ffffff;
  padding: 60px 0px 0px 0px !important;
  border: 1px solid #e1e1e1;
  .cs-main-title{
    position: absolute;
    width: 700px;
    top: 20px;
    left: 50%;
    margin-left: -350px;
    img{
      vertical-align: middle;
      margin-right: 15px;
    }
    .cs-input{
      width: 340px;
      vertical-align: middle
    }
    .cs-btn{
      margin-left: -4px;
    }
  }
  .cs-main-content{
    width:100%;
    border-top:1px solid #e1e1e1;
    margin: 20px 0;
    position: relative;
    min-height: 600px;
    .cs-main-list{
      width:700px;
      height:500px;
      position: absolute;
      top:50%;
      left: 50%;
      margin-top: -250px;
      margin-left: -350px;
      p{
        font-size: 14px;
      }
      .list-item{
        margin: 40px 0;
        .list-title{
          width:100%;
          span{
            display: inline-block;
            font-size: 22px;
            margin-right: 10px;
          }
          .list-icon{
            font-size: 22px;
            color: #ffffff;
            background: #3367d6;
            width:46px;
            height:46px;
            border-radius: 50%;
            text-align: center;
            line-height: 46px;
          }
        }
      }
    }
  }
  .cs-img{
    position: absolute;
    right: 30px;
    bottom: 30px;
  }
  .cs-edit{
    position: absolute;
    right: 30px;
    bottom: 30px;
    span{
      font-size: 36px;
      display: inline-block;
      color: #000000;
      width:50px;
      height: 50px;
      line-height: 50px;
      text-align: center;
      background: #ffffff;
      border:1px solid #d4d4d4;
      border-radius: 50%;
      cursor: pointer;
      box-shadow: 0 0 2px #d4d4d4
    }
  }
}
.el-tabs__nav{
  margin-left: 20px;
}
.search-btn{
  position: absolute;
  right: 20px;
  top: 110px;
  z-index: 99;
}
.table-list {
  width: 100%;
  padding: 20px 20px;

  .title-line {
    width: 3px;
    height: 18px;
    background-color: #0078D4;
    margin-right: 5px;
  }

  span {
    display: inline-block;
    font-size: 14px;
    vertical-align: middle;
  }
  .title-dashes {
    width: calc(100% - 180px);
  }
  .title-dashes:before {
    position: absolute;
    top: 32px;
    left: 165px;
    width: calc(100% - 190px);
    height: 1px;
    border-top: 1px dashed #E1E1E1;
    content: '';
  }
  .list-card{
    width:100%;
    margin-bottom: 15px;
    border:1px solid #fafafa;
    background: #fafafa;
    padding: 15px 15px;
    border-radius: 2px;
    cursor: pointer;
    position: relative;
    .card-checked{
      position: absolute;
      right: 10px;
      top:5px;
      span{
        color: #3d81ff;
        font-size: 18px;
      }
    }
    .card-title{
      font-size: 18px;
    }
    .card-type{
      color: #3367d6;
      border:1px solid #eeeeee;
      padding: 3px 7px;
      border-radius: 2px;
      margin-left: 12px;
    }
    .card-mes{
      color: #999999;
      margin-top: 20px;
    }
    .card-mes:nth-child(1){
      margin-right: 25px;
    }
  }
  .list-card-checked{
    border:1px solid #3d81ff;
  }
}
.print-page{
  width:100%;
  min-height:100%;
  position: fixed;
  background: rgba(0,0,0, .7);
  z-index: 9999;
  top:0;
  left: 0;
  bottom: -100px;
  overflow: scroll;
  padding: 20px 0;
  .page-body{
    width: 650px;
    min-height: 878px;
    margin: 20px auto 80px auto;
    padding: 50px 80px;
    background: #ffffff;
    position: relative;
    .print-btns {
      position: absolute;
      z-index: 9999;
      width: 80px;
      top: 0px;
      right: - 100px;
      .print-it {
        margin-bottom: 15px;
      }
    }
    h2{
      text-align: center;
    }
    .time{
      text-align: right;
      font-size: 14px;
      padding-bottom: 15px;
      border-bottom: 3px solid #000000;
    }
    .mes{
      margin-bottom: 25px;
      span{
        display: inline-block;
        font-size: 14px;
        vertical-align: top;
        width:190px;
        line-height: 20px;
      }
      span:nth-child(2n){
        width:295px;
      }
    }
    .list-table{
      width:100%;
      margin-bottom: 20px;
      .list-title{
        font-size: 16px;
        span {
          display: inline-block;
          vertical-align: middle;
        }
        .first-line {
          width:315px;
          border-top: 2px dashed #333333;
          margin-left: 10px;
        }
        .second-line {
          width:345px;
          border-top: 2px dashed #333333;
          margin-left: 10px;
        }
      }
      .list-content {
        margin-top: 10px;
        width:100%;
        span {
          display: inline-block;
          vertical-align: top;
        }
        table {
          border: 1px solid #000000;
          border-collapse:collapse;
          border-spacing:0;
          width:100%;
          th {
            border: 1px solid #000000;
            font-weight: bold;
            text-align: left;
            padding: 5px 5px;
          }
          th:nth-child(1) {
            width: 240px;
          }
          td{
            border: 1px solid #000000;
            text-align: left;
            padding: 5px 5px;
          }
        }
        .content-name {
          margin-bottom: 12px;
          margin-top: 15px;
          span:nth-child(1) {
            font-weight: bold;
            width: 50%;
          }
          span:nth-child(2){
            text-align: right;
            width: 50%;
            margin-left: -5px;
          }
        }
        .content-mes {
          font-size: 14px;
          line-height: 20px;
          span:nth-child(1) {
            width: 170px
          }
          span:nth-child(2) {
            width: 315px;
          }
        }
      }
    }
  }
}
@media print {
  .print-page{
    .page-body{
      padding: 0px 0px 0px 15px!important ;
    }
    .print-btns{
      display: none !important;
    }
    .mes{
      span{
        width:220px !important;
      }
      span:nth-child(2n){
        width:410px !important;
      }
    }
    .first-line {
      width:460px !important;
    }
    .second-line {
      width:490px !important;
    }
    .content-mes {
      span:nth-child(1) {
        width: 220px !important;
      }
      span:nth-child(2) {
        width: 410px !important;
      }
    }
    .content-name {
      span:nth-child(2){
        margin-left: -5px !important;
      }
    }
  }
}
.tags-list {
  float: right;
  line-height: 32px;
  span {
    color: #666;
    border: 1px solid #d3dde8;
    padding: 6px 10px;
    border-radius: 4px;
    margin: 0 5px;
    cursor: pointer;
  }
  .choose-it {
    color: #1890ff !important;
    border: 1px solid #1890ff !important;
  }
}
.list-detail {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  padding: 50px 200px 50px 200px;
  background: rgba(0,0,0,.3);
  z-index: 9999;
  .list-detail-body {
    width: 100%;
    height: 100%;
    background: #ffffff;
    border-radius: 5px;
  }
}
</style>
