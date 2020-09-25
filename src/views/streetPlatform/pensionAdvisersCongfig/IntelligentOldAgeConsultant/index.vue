<template>
  <el-container>
    <el-header class="cs-header" v-show="isSearch === 'home'">
      <div class="cs-main-title">
        <img src="@/assets/images/gw-logo.gif" alt="" style="border-radius: 2px">
        <el-input v-model="form.idCard" placeholder="请输入身份证号查询" size="large" class="cs-input"></el-input>
        <el-button type="primary" size="big" class="cs-btn base-btn "  icon="el-icon-search" @click="toList">查询</el-button>
      </div>
      <div class="cs-img">
        <img src="@/assets/images/bg.png" alt="">
      </div>
      <div class="cs-main-content" ref="cscontent">
        <div class="cs-main-list">
          <div class="list-item">
            <div class="list-title">
              <span class="iconfont list-icon">&#xe620</span>
              <span>政策资讯</span>
            </div>
            <p>市、区、街道发布的相关的政策资讯，包括头条新闻、养老政策、服务项目、养老补贴、申请方式等相关内容。</p>
          </div>
          <div class="list-item">
            <div class="list-title">
              <span class="iconfont list-icon">&#xe622</span>
              <span>服务项目</span>
            </div>
            <p>所在区域提供的各类养老服务项目，包括政府类服务项目和市场化服务项目。</p>
          </div>
          <div class="list-item">
            <div class="list-title">
              <span class="iconfont list-icon">&#xe61a</span>
              <span>养老机构</span>
            </div>
            <p>所在区域范围内的养老机机构信息，包括养老院、敬老院、长者照护之家等。</p>
          </div>
          <div class="list-item">
            <div class="list-title">
              <span class="iconfont list-icon">&#xe621</span>
              <span>社区设施</span>
            </div>
            <p>所在区域范围内的各类养老社区设施信息，包括老年活动室、综合为老服务中心、日间照护机构、助餐点、护理站、健康小屋等。</p>
          </div>
        </div>
      </div>
      <div class="cs-edit" @click="toAdd">
        <span class="iconfont" >&#xe626</span>
      </div>
    </el-header>
    <el-header class="formDiv" v-show="isSearch !== 'home'">
      <el-form :inline="true" :model="form" class="demo-form-inline">
        <el-form-item label="身份证">
          <el-input v-model.trim="form.idCard" @keyup.enter.native="onSubmit" clearable placeholder="请输入身份证号" style="width: 200px"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit" class="base-btn" v-has="{class: '查询'}">查询
          </el-button>
          <!--<el-button type="warning" @click="onReset" class="base-btn" v-has="{class: '查询'}">重置-->
          <!--</el-button>-->
        </el-form-item>
        <el-form-item style="float: right">
          <el-button type="primary" @click="onPrint" class="border-btn" >打印预览
          </el-button>
          <el-button type="primary" @click="keepIt" class="border-btn" >保存查询结果
          </el-button>
        </el-form-item>
      </el-form>
    </el-header>
    <el-main class="tableContainer" style="padding: 14px 0" v-show="isSearch !== 'home'">
      <el-container style="position: relative">
        <div class="search-btn" v-show="isShowAddress">
          <el-form :inline="true" :model="form" class="demo-form-inline">
            <el-form-item label="筛选区域" style="margin-right: 0">
              <Address :area-code="areaCode" :form-code="form.areaCode" @getAreaCode="getAreaCode"
                       :width="'200px'" @keyup.enter.native="onSubmit" :scope="'All'"></Address>
            </el-form-item>
          </el-form>
        </div>
        <el-tabs v-model="selectType" style="width: 100%" @tab-click="handleClick">
          <el-tab-pane :label="item.name" :name="item.type" v-for="(item, index) in tabs" :key="index">
            <div class="table-list">
              <div style="width:100%;margin-bottom:  20px">
                <span class="title-line"></span><span>{{'符合您的' + item.name + '(' + total + ')'}}</span>
                <span class="title-dashes"></span>
              </div>
              <div v-show="isShowAddress" style="width:100%;height:52px;"></div>
              <el-row style="font-size: 20px; text-align: center" v-if="total === 0 && showNoData === true">
                暂无数据
              </el-row>
              <el-row :gutter="20" v-if="form.selectType === '1' && list.policyInformation !== undefined">
                <el-col :span="12" v-for="(item, index) in list.policyInformation.list" :key="index" >
                  <div class="list-card" :class="[item.checked === true ? 'list-card-checked' : '']" @click="chooseIt(index, 'policyInformation')">
                    <div>
                      <span class="card-title" @click.stop="openDetail(item.id)">{{item.title}}</span>
                      <!--<span class="card-type">政策咨询</span>-->
                    </div>
                    <div>
                      <span class="card-mes">政策类型：{{item.classify1}}</span>
                      <span class="card-mes">发布时间：{{getDate(item.pubDate)}}</span>
                    </div>
                    <div class="card-checked" v-if="item.checked">
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
              <el-row :gutter="20" v-if="form.selectType === '2' && list.serviceItems !== undefined">
                <el-col :span="12" v-for="(item, index) in list.serviceItems.list" :key="index" >
                  <div class="list-card" :class="[item.checked === true ? 'list-card-checked' : '']" @click="chooseIt(index, 'serviceItems')">
                    <div>
                      <span class="card-title"  @click.stop="openProjectDetail(item.id)">{{item.serviceName}}</span>
                      <!--<span class="card-type">服务项目</span>-->
                    </div>
                    <div>
                      <span class="card-mes">服务范围：{{item.minAge}} - {{item.maxAge}}</span>
                      <span class="card-mes">申请方式：{{item.applyWay}}</span>
                    </div>
                    <div class="card-checked" v-if="item.checked">
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
              <el-row :gutter="20" v-if="form.selectType === '3' && list.pensionAgency !== undefined">
                <el-col :span="12" v-for="(item, index) in list.pensionAgency.list" :key="index" >
                  <div class="list-card" :class="[item.checked === true ? 'list-card-checked' : '']" @click="chooseIt(index, 'pensionAgency')">
                    <div>
                      <span class="card-title" @click.stop="openOrganDetail(item.orgId, item.orgType)">{{item.orgName}}</span>
                      <span class="card-type">{{item.orgType}}</span>
                    </div>
                    <div>
                      <span class="card-mes">联系电话：{{item.phone}}</span>
                    </div>
                    <div>
                      <span class="card-mes">地址：{{item.addr}}</span>
                    </div>
                    <div class="card-checked" v-if="item.checked">
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
              <el-row :gutter="20" v-if="form.selectType === '4' && list.communityFacility !== undefined">
                <el-col :span="12" v-for="(item, index) in list.communityFacility.list" :key="index" >
                  <div class="list-card" :class="[item.checked === true ? 'list-card-checked' : '']" @click="chooseIt(index, 'communityFacility')">
                    <div>
                      <span class="card-title" @click="openComunityDetail(item.orgId, item.orgType)">{{item.orgName}}</span>
                      <span class="card-type">{{item.orgType}}</span>
                    </div>
                    <div>
                      <span class="card-mes">联系电话：{{item.phone}}</span>
                    </div>
                    <div>
                      <span class="card-mes">地址：{{item.addr}}</span>
                    </div>
                    <div class="card-checked" v-if="item.checked">
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
    </el-main>
    <div class="print-page" v-show="printDailog" id="nnnn">
      <div class="page-body">
        <div class="print-btns">
          <div class="print-it">
            <el-button type="primary" @click="printIt" class="base-btn">打印
            </el-button>
          </div>
          <div>
            <el-button type="warning" @click="closePrint" class="base-btn">关闭
            </el-button>
          </div>
        </div>
        <h2>智能养老顾问</h2>
        <p class="time">时间：{{setDateTimes()}}</p>
        <div class="mes">
          <p>
            <span>姓名：{{list.name}}</span>
            <span>年龄：{{list.age}}岁</span>
          </p>
          <p>
            <span>身份证：{{idPass(list.idCard)}}</span>
            <span>户籍地址：{{list.address}}</span>
          </p>
        </div>
        <div class="list-table" v-if="isCheckeds.policyInformation.length > 0">
          <div class="list-title">
            <span style="font-weight: bold">可享受的养老补贴政策</span>
            <span class="first-line" ></span>
          </div>
          <div class="list-content">
            <table>
              <tr>
                <th>政策标题</th>
                <th>政策类型</th>
                <th>发布日期</th>
              </tr>
              <tr v-for="(item,index) in isCheckeds.policyInformation" :key="index">
                <td>{{item.title}}</td>
                <td>{{item.classify1}}</td>
                <td>{{getDate(item.pubDate)}}</td>
              </tr>
            </table>
          </div>
        </div>
        <div class="list-table" v-if="isCheckeds.serviceItems.length > 0">
          <div class="list-title">
            <span style="font-weight: bold">可享受的服务项目</span>
            <span class="second-line" ></span>
          </div>
          <div class="list-content">
            <table>
              <tr>
                <th>服务名称</th>
                <th>服务范围</th>
                <th>申请方式</th>
              </tr>
              <tr v-for="(item,index) in isCheckeds.serviceItems" :key="index">
                <td>{{item.serviceName}}</td>
                <td>{{item.minAge}} - {{item.maxAge}}</td>
                <td>{{item.applyWay}}</td>
              </tr>
            </table>
          </div>
        </div>
        <div class="list-table" v-if="isCheckeds.pensionAgency.length > 0">
          <div class="list-title">
            <span style="font-weight: bold">可服务的机构设施</span>
            <span class="second-line" ></span>
          </div>
          <div class="list-content"  v-for="(item,index) in isCheckeds.pensionAgency" :key="index">
            <div class="content-name">
              <span>{{item.orgName}}</span>
              <span>养老机构</span>
            </div>
            <div class="content-mes">
              <span>联系电话：{{item.phone}}</span>
              <span>地址：{{item.addr}}</span>
            </div>

          </div>
        </div>
        <div class="list-table" v-if="isCheckeds.communityFacility.length > 0">
          <div class="list-title">
            <span style="font-weight: bold">可服务的社区设施</span>
            <span class="second-line" ></span>
          </div>
          <div class="list-content" v-for="(item,index) in isCheckeds.communityFacility" :key="index">
            <div class="content-name">
              <span>{{item.orgName}}</span>
              <span>社区设施</span>
            </div>
            <div class="content-mes">
              <span>联系电话：{{item.phone}}</span>
              <span>地址：{{item.addr}}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="list-detail" v-if="detailShow">
      <div class="list-detail-body">
        <Datails :id="datailId" :close="closeDetail"></Datails>
      </div>
    </div>
    <div class="list-detail" v-if="projectDetailShow">
      <div class="list-detail-body">
        <ProjectDetails :id="datailId" :close="closeProjectDetail"></ProjectDetails>
      </div>
    </div>
    <div class="list-detail" v-if="organDetailShow">
      <div class="list-detail-body">
        <OrganDetails :id="datailId" :close="closeOrganDetail" :type="organType"></OrganDetails>
      </div>
    </div>
    <div class="list-detail" v-if="assDetailShow">
      <div class="list-detail-body">
        <AssDetails :id="datailId" :close="closeAssDetail" :type="comType"></AssDetails>
      </div>
    </div>
    <div class="list-detail" v-if="comminityDetailShow">
      <div class="list-detail-body">
        <ComminityDetails :id="datailId" :close="closeComminityDetail" :type="comType"></ComminityDetails>
      </div>
    </div>
    <div class="list-detail" v-if="compreDetailShow">
      <div class="list-detail-body">
        <CompreDetails :id="datailId" :close="closeCompreDetail" :type="comType"></CompreDetails>
      </div>
    </div>
    <div class="list-detail" v-if="dayDetailShow">
      <div class="list-detail-body">
        <DayDetails :id="datailId" :close="closeDayDetail" :type="comType"></DayDetails>
      </div>
    </div>
    <div class="list-detail" v-if="elderDetailShow">
      <div class="list-detail-body">
        <ElderDetails :id="datailId" :close="closeElderDetail" :type="comType"></ElderDetails>
      </div>
    </div>
    <div class="list-detail" v-if="healthDetailShow">
      <div class="list-detail-body">
        <HealthDetails :id="datailId" :close="closeHealthDetail" :type="comType"></HealthDetails>
      </div>
    </div>
    <div class="list-detail" v-if="helpDetailShow">
      <div class="list-detail-body">
        <HelpDetails :id="datailId" :close="closeHelpDetail" :type="comType"></HelpDetails>
      </div>
    </div>
    <div class="list-detail" v-if="nursingDetailShow">
      <div class="list-detail-body">
        <NursingDetails :id="datailId" :close="closeNursingDetail" :type="comType"></NursingDetails>
      </div>
    </div>
  </el-container>
</template>

<script>
  import {searchList, addList} from '@/api/pensionAdvisersCongfig/oldAge'
  import {pageModel} from "@/common"
  import Address from "@/components/Address"
  import Pagination from "@/components/Pagination";
  import {mapGetters} from 'vuex'
  import {getDate_YMD, setDateTime} from "@/utils/index.js";
  import Datails from "../components/details"
  import ProjectDetails from "../components/projectDetails"
  import OrganDetails from "../components/organDetail"
  import AssDetails from "../components/assistantDeviceSiteDetails"
  import ComminityDetails from "../components/communityPensionOrganizationDetails"
  import CompreDetails from "../components/comprehensiveDetails"
  import DayDetails from "../components/dayCareFacilitiesDetails"
  import ElderDetails from "../components/elderlyActivityRoomDetails"
  import HealthDetails from "../components/healthHutDetails"
  import HelpDetails from "../components/helpMealsDetails"
  import NursingDetails from "../components/nursingStationDetails"
  export default {
    name: "IntelligentOldAgeConsultant",
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
      ]),
    },
    watch: {
      selectType() {
        switch (this.selectType) {
          case 'policyInformation':
            this.form.selectType = '1'
            break;
          case 'serviceItems':
            this.form.selectType = '2'
            break;
          case 'pensionAgency':
            this.form.selectType = '3'
            break;
          case 'communityFacility':
            this.form.selectType = '4'
            break;
        }
      }
    },
    mounted() {
      this.$refs.cscontent.style.height = document.body.clientHeight - 240 + 'px'
      this.form.accountDataType = this.data.accountDataType
      // window.print()
    },
    data() {
      return {
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
        detailShow: false,
        projectDetailShow: false,
        organDetailShow: false,
        idEdit: true,
        printDailog: false, // 打印弹窗
        isShowAddress: false, // 是否显示地址组件
        isSearch: 'home',
        selectType: 'policyInformation',
        form: {
          selectType: '1', // 类型
          idCard: '', // 身份证
          areaCode: [], // 地址
          pageNum: 1, // 页码
          pageSize: 10 // 数量
        },
        areaCode: [],
        tabs: [{
          name: '政策资讯',
          type: 'policyInformation'
        },{
          name: '服务项目',
          type: 'serviceItems'
        },{
          name: '养老机构',
          type: 'pensionAgency'
        },{
          name: '社区设施',
          type: 'communityFacility'
        },],
        list: [], // 列表数据
        total: 0,
        isCheckeds: {
          policyInformation: [],
          serviceItems: [],
          pensionAgency: [],
          communityFacility: []
        },
        pageType: {
          policyInformation: 1,
          serviceItems: 1,
          pensionAgency: 1,
          communityFacility: 1
        },
        showNoData: true,
        isOpen: false
      }
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
      openComunityDetail(id, type) {
        this.datailId = id;
        switch (type) {
          case '日间照护机构':
            this.comType= '2010'; //日间照护机构
            this.dayDetailShow = true
            break;
          case '综合为老服务中心':
            this.comType= '2011'; //综合为老服务中心,
            this.compreDetailShow = false
            break;
          case '邻里汇':
            this.comType= '2012'; //邻里汇
            this.compreDetailShow = false
            break;
          case '老年活动室':
            this.comType= '2013'; //老年活动室
            this.elderDetailShow = false
            break;
          case '助餐点':
            this.comType= '2014'; //助餐点,
            this.helpDetailShow = false
            break;
          case '社区长者食堂':
            this.comType= '2015'; //社区长者食堂
            this.helpDetailShow = false
            break;
          case '护理站':
            this.comType= '2016'; //护理站
            this.nursingDetailShow = false
            break;
          case '护理院':
            this.comType= '2019'; //护理院
            this.nursingDetailShow = false
            break;
          case '社区养老组织':
            this.comType= '2017'; //社区养老组织
            this.comminityDetailShow = false
            break;
          case '健康小屋':
            this.comType= '2018'; //健康小屋
            this.healthDetailShow = false
            break;
          case '养老辅具展示点':
            this.comType= '4001'; //养老辅具展示点
            this.assDetailShow = false
            break;
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
      //
      toAdd() {
        this.$router.push({
          path: `/consultRecord/details/0`,
          query: {'modelType': 'add', '_title': `新增咨询记录`}
        })
      },
      // 身份证加密
      idPass(id) {
        if (id) {
          const newId = id.split('')
          let data = ''
          newId.splice(5, 5, '*****')
          newId.forEach(item =>{
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
      Printpart(idstr){//idstr 要打印内容中的id
        let oppo = ".page-body{\n" +
          "  width: 650px;\n" +
          "  min-height: 878px;\n" +
          "  margin: 20px auto 80px auto;\n" +
          "  padding: 0px 0px 0px 15px!important ;\n" +
          "  background: #ffffff;\n" +
          "  position: relative;\n" +
          "}\n" +
          ".page-body  .print-btns {\n" +
          "  position: absolute;\n" +
          "  z-index: 9999;\n" +
          "  width: 80px;\n" +
          "  top: 0px;\n" +
          "  right: - 100px;\n" +
          "  display: none !important;\n" +
          "}\n" +
          ".page-body  .print-btns .print-it {\n" +
          "  margin-bottom: 15px;\n" +
          "}\n" +
          ".page-body  h2{\n" +
          "   text-align: center;\n" +
          "}\n" +
          ".page-body  .time{\n" +
          "   text-align: right;\n" +
          "   font-size: 14px;\n" +
          "   padding-bottom: 15px;\n" +
          "   border-bottom: 3px solid #000000;\n" +
          "}\n" +
          ".page-body  .mes{\n" +
          "   margin-bottom: 25px;\n" +
          "}\n" +
          ".page-body  .mes span{\n" +
          "   display: inline-block;\n" +
          "   font-size: 14px;\n" +
          "   vertical-align: top;\n" +
          "   width:220px !important;\n" +
          "   line-height: 20px;\n" +
          "}\n" +
          ".page-body  .mes span:nth-child(2n){\n" +
          "   width:410px !important;\n" +
          "}\n" +
          ".page-body  .list-table{\n" +
          "   width:100%;\n" +
          "   margin-bottom: 20px;\n" +
          "}\n" +
          ".page-body  .list-table .list-title{\n" +
          "   font-size: 16px;\n" +
          "}\n" +
          ".page-body  .list-table .list-title span {\n" +
          "   display: inline-block;\n" +
          "   vertical-align: middle;\n" +
          "}\n" +
          ".page-body  .list-table .list-title  .first-line {\n" +
          "   width:460px !important;\n" +
          "   border-top: 2px dashed #333333;\n" +
          "   margin-left: 10px;\n" +
          "}\n" +
          ".page-body  .list-table .list-title  .second-line {\n" +
          "   width:490px !important;\n" +
          "   border-top: 2px dashed #333333;\n" +
          "   margin-left: 10px;\n" +
          "}\n" +
          ".page-body  .list-table  .list-content {\n" +
          "   margin-top: 10px;\n" +
          "   width:100%;\n" +
          "}\n" +
          ".page-body  .list-table  .list-content  span {\n" +
          "   display: inline-block;\n" +
          "   vertical-align: top;\n" +
          "}\n" +
          ".page-body  .list-table  .list-content  table {\n" +
          "   border: 1px solid #000000;\n" +
          "   border-collapse:collapse;\n" +
          "   border-spacing:0;\n" +
          "   width:100%;\n" +
          "}\n" +
          ".page-body  .list-table  .list-content  table th {\n" +
          "   border: 1px solid #000000;\n" +
          "   font-weight: bold;\n" +
          "   text-align: left;\n" +
          "   padding: 5px 5px;\n" +
          "}\n" +
          ".page-body  .list-table  .list-content  table th:nth-child(1) {\n" +
          "   width: 240px;\n" +
          "}\n" +
          ".page-body  .list-table  .list-content  table td{\n" +
          "   border: 1px solid #000000;\n" +
          "   text-align: left;\n" +
          "   padding: 5px 5px;\n" +
          "}\n" +
          ".page-body  .list-table  .list-content  .content-name {\n" +
          "   margin-bottom: 12px;\n" +
          "   margin-top: 15px;\n" +
          "}\n" +
          ".page-body  .list-table  .list-content  .content-name span:nth-child(1) {\n" +
          "   font-weight: bold;\n" +
          "   width: 50%;\n" +
          "}\n" +
          ".page-body  .list-table  .list-content  .content-name span:nth-child(2) {\n" +
          "   text-align: right;\n" +
          "   width: 50%;\n" +
          "   margin-left: -5px !important;\n" +
          "}\n" +
          ".page-body  .list-table  .list-content  .content-mes {\n" +
          "   font-size: 14px;\n" +
          "   line-height: 20px;\n" +
          "}\n" +
          ".page-body  .list-table  .list-content  .content-mes span:nth-child(1) {\n" +
          "   width: 220px !important;\n" +
          "}\n" +
          ".page-body  .list-table  .list-content  .content-mes span:nth-child(2)  {\n" +
          "   width: 410px !important;\n" +
          "}"
        var el = document.getElementById(idstr);
        var iframe = document.createElement('IFRAME');
        var doc = null;
        iframe.setAttribute('style', 'position:absolute;width:0px;height:0px;left:-500px;top:-500px;');
        document.body.appendChild(iframe);
        doc = iframe.contentWindow.document;
        doc.write('<div>' + el.innerHTML + '</div>' + '<style>' + oppo +'</style>');
        doc.close();
        iframe.contentWindow.focus();
        iframe.contentWindow.print();
        if (navigator.userAgent.indexOf("MSIE") > 0){
          document.body.removeChild(iframe);
        }
      } ,
      // 确定打印
      printIt() {
        this.Printpart('nnnn')
        // window.print()
      },
      // 切换tab
      handleClick(tab) {
        if (this.form.idCard === '') {
          this.$message.error('身份证号不能为空, 请输入身份证号')
          return false
        }
        this.form.pageNum = this.pageType[tab.name]
        if (tab.name === 'pensionAgency' || tab.name === 'communityFacility') {
          this.isShowAddress = true
        } else {
          this.isShowAddress = false
        }
        this.getData()
      },
      // 选中列表
      chooseIt(index, type) {
        const arr = JSON.parse(JSON.stringify(this.list))
        arr[type].list[index].checked = !arr[type].list[index].checked
        if (arr[type].list[index].checked === true) {
          this.isCheckeds[type].push(arr[type].list[index])
        } else {
          this.isCheckeds[type].map((item, i) =>{
            if (type === 'pensionAgency' || type === 'communityFacility') {
              if (this.isCheckeds[type][i].orgId === arr[type].list[index].orgId ) {
                this.isCheckeds[type].splice(i, 1)
              }
            } else {
              if (this.isCheckeds[type][i].id === arr[type].list[index].id ) {
                this.isCheckeds[type].splice(i, 1)
              }
            }
          })
        }
        this.list = arr
      },
      // 格式化时间
      getDate(date) {
        if (date !== "" && date !== null) {
          return date.replace("00:00:00", "");
        } else {
          return date;
        }
      },
      // 获取区域的值
      getAreaCode(val) {
        if (val.length !== 0) {
          this.areaCode = val
          const arr = [];
          if (this.areaCode.length !== 0) {
            arr.push(this.areaCode[this.areaCode.length - 1])
          }
          this.form.areaCode = arr // 所选区域赋值
          this.getData()
        }
      },
      // 查询
      onSubmit() {
        if (this.form.idCard === '') {
          this.$message.error('身份证号不能为空, 请输入身份证号')
          return false
        }
        const arr = [];
        if (this.areaCode.length !== 0) {
          arr.push(this.areaCode[this.areaCode.length - 1])
        }
        this.form.areaCode = arr; // 所选区域赋值
        this.getData()
        this.isCheckeds = {
          policyInformation: [],
          serviceItems: [],
          pensionAgency: [],
          communityFacility: []
        }
      },
      addCkecked(arr) {
        arr.forEach((item, index) =>{
          arr[index].checked = false
        })
      },
      // 反选
      forChecked(arr) {
        arr.forEach((item, index) =>{
          for (let i = 0 ; i < this.isCheckeds[this.selectType].length; i++) {
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
      getData() {
        this.showNoData = true
        searchList(this.form).then(res =>{
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
      toList() {
        if (this.form.idCard === '') {
          this.$message.error('身份证号不能为空, 请输入身份证号')
          return false
        }
        this.isSearch = 'list'
        this.getData()
      },
      // 重置
      onReset() {
        this.form = {
          idCard: '', // ID或者姓名
          pageNum: pageModel.pageNum, // 分页页数
          pageSize: pageModel.pageSize // 分页数量
        };
        this.getData();
      },
      keepIt() {
        if (this.isCheckeds.policyInformation.length > 0 || this.isCheckeds.serviceItems.length > 0 || this.isCheckeds.pensionAgency.length > 0 || this.isCheckeds.communityFacility.length > 0 ) {
          this.$confirm('确定要保存所选结果吗？', '保存结果', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            const data = JSON.parse(JSON.stringify(this.isCheckeds))
            data.age = this.list.age
            data.name = this.list.name
            data.address = this.list.address
            let content = JSON.stringify(data)
            addList({
              content: content,
              idCard: this.form.idCard
            }).then(res =>{
              if (res.code === 0) {
                this.$message({
                  type: "success",
                  message: "保存成功"
                })
              }
            })
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除！'
            });
          });
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

<style lang="scss" >
  @import "~@/styles/form.css";

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
</style>
