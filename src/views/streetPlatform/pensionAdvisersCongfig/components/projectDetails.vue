<!--服务项目管理-->
<template>
  <el-container style="height: 100%;position: relative">
    <el-main class="tableContainer">
      <el-form ref="form_base" key="form_base" :model="form"
               label-width="140px">
        <el-tabs v-model="activeTabs">
          <!--基本信息tabs start-->
          <el-tab-pane label="基本信息" name="base">
            <el-collapse v-model="activeCollapse">
              <!--基本信息item start-->
              <el-collapse-item name="baseItem_1">
                <template slot="title">
                  <div class="titleSlider">
									<span>
										<i class="titleTip"></i>基本信息
									</span>
                  </div>
                </template>

                <el-row :gutter="0">
                  <el-col :md="this.adaptiveGrid.md" :lg="this.adaptiveGrid.lg">
                    <el-form-item label="服务名称：" prop="serviceName">
                      <span>{{form.serviceName}}</span>
                    </el-form-item>
                  </el-col>
                  <el-col :md="this.adaptiveGrid.md" :lg="this.adaptiveGrid.lg">
                    <el-form-item label="服务日期：" prop="serviceDate">
                      <span>{{form.serviceDate}}</span>
                    </el-form-item>
                  </el-col>
                  <el-col :md="this.adaptiveGrid.md" :lg="this.adaptiveGrid.lg">
                    <el-form-item label="服务时间：" prop="serviceTimeRange">
                      <span>{{form.beginTime}} - {{form.endTime}}</span>
                    </el-form-item>
                  </el-col>
                  <el-col :md="this.adaptiveGrid.md" :lg="this.adaptiveGrid.lg">
                    <el-form-item label="服务地点：" prop="orgId">
                      <span>{{form.orgName}}</span>
                    </el-form-item>
                  </el-col>
                  <el-col :md="this.adaptiveGrid.md" :lg="this.adaptiveGrid.lg">
                    <el-form-item label="服务名额：" prop="serviceNum">
                      <span>{{form.serviceNum}}</span>
                    </el-form-item>
                  </el-col>
                  <el-col :md="this.adaptiveGrid.md" :lg="this.adaptiveGrid.lg">
                    <el-form-item label="服务价格：" prop="servicePrice">
                      <span>{{form.servicePrice}}{{form.servicePriceUnitName}}</span>
                    </el-form-item>
                  </el-col>
                  <el-col :md="this.adaptiveGrid.md" :lg="this.adaptiveGrid.lg">
                    <el-form-item label="发布单位：" prop="deptName">
                      <span>{{form.deptName}}</span>
                    </el-form-item>
                  </el-col>
                  <el-col :md="this.adaptiveGrid.md" :lg="this.adaptiveGrid.lg">
                    <el-form-item label="申请方式：" prop="applyWay">
                      <span>{{form.applyWay}}</span>
                    </el-form-item>
                  </el-col>
                  <el-col :md="24" :lg="16">
                    <el-form-item label="同步发布：" prop="synRelease"
                                  class="synReleaseTip">
                      <span><span v-for="(item,index) in synRelease">{{item}}{{index === synRelease.length-1?'':'，'}}</span></span>
                    </el-form-item>
                  </el-col>
                  <el-col :span="24" style="height:auto;">
                    <el-form-item label="服务内容：" prop="phone">
                      <div class="ql-container ql-snow">
                        <div v-html="form.bizExtendContentVo === null ? '' : form.bizExtendContentVo.content"
                             class="ql-editor"></div>
                      </div>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-collapse-item>
              <!--基本信息item end-->

              <!--服务范围item start-->
              <el-collapse-item name="baseItem_2">
                <template slot="title">
                  <div class="titleSlider">
									<span>
										<i class="titleTip"></i>服务范围
									</span>
                  </div>
                </template>
                <el-row :gutter="0">
                  <el-col :md="this.adaptiveGrid.md" :lg="this.adaptiveGrid.lg">
                    <el-form-item prop="serviceArea" label="区域范围：">
                      <span>{{form.serviceAreaNameLevel}}</span>
                    </el-form-item>
                  </el-col>
                  <el-col :md="this.adaptiveGrid.md" :lg="this.adaptiveGrid.lg">
                    <el-form-item prop="serviceTarget" label="服务对象：">
                      <span>{{form.serviceTargetName}}</span>
                    </el-form-item>
                  </el-col>
                  <el-col :md="this.adaptiveGrid.md" :lg="this.adaptiveGrid.lg">
                    <el-form-item prop="ageRange" label="年龄范围：">
                      <span>{{form.serviceScope}}</span>
                    </el-form-item>
                  </el-col>
                  <el-col :md="this.adaptiveGrid.md" :lg="this.adaptiveGrid.lg" v-if="peopleCategoryShow">
                    <el-form-item prop="peopleCategory" label="人口类别：">
                      <div>
                            <span v-for="(item, index) in newForm.peopleCategory" :key="index">
                              {{item}}
                               <i v-if="index < newForm.peopleCategory.length - 1">,</i>
                            </span>
                      </div>
                    </el-form-item>
                  </el-col>
                  <el-col :md="this.adaptiveGrid.md" :lg="this.adaptiveGrid.lg" v-if="sexShow">
                    <el-form-item prop="serviceTarget" label="性别：">
                      <div>
                            <span v-for="(item, index) in newForm.sex" :key="index">
                              {{item}}
                              <i v-if="index < newForm.sex.length - 1">,</i>
                            </span>
                      </div>
                    </el-form-item>
                  </el-col>
                  <el-col :md="this.adaptiveGrid.md" :lg="this.adaptiveGrid.lg" v-if="bizLiveStatusShow">
                    <el-form-item prop="bizLiveStatus" label="居住情况：">
                      <div>
                            <span v-for="(item, index) in newForm.bizLiveStatus" :key="index">
                              {{item}}
                              <i v-if="index < newForm.bizLiveStatus.length - 1">,</i>
                            </span>
                      </div>
                    </el-form-item>
                  </el-col>
                  <el-col :md="this.adaptiveGrid.md" :lg="this.adaptiveGrid.lg" v-if="bizAssessLevelShow">
                    <el-form-item prop="bizAssessLevel" label="评估类型：">
                      <div>
                        <span>
                          {{bizAssessTypeLookWord}}
                        </span>/
                        <span v-for="(item, index) in newForm.bizAssessLevel" :key="index">
                            {{item}}
                         </span>
                      </div>
                    </el-form-item>
                  </el-col>
                  <el-col :md="this.adaptiveGrid.md" :lg="this.adaptiveGrid.lg" v-if="hCtegoryShow">
                    <el-form-item prop="hCtegory" label="救助类别：">
                      <div>
                            <span v-for="(item, index) in newForm.hCtegory" :key="index">
                              {{item}}
                              <i v-if="index < newForm.hCtegory.length - 1">,</i>
                            </span>
                      </div>
                    </el-form-item>
                  </el-col>
                  <el-col :md="this.adaptiveGrid.md" v-if="familyTypeShow" :lg="this.adaptiveGrid.lg">
                    <el-form-item prop="familyType" label="家庭类别：">
                      <div>
                            <span v-for="(item, index) in newForm.familyType" :key="index">
                              {{item}}
                              <i v-if="index < newForm.familyType.length - 1">,</i>
                            </span>
                      </div>
                    </el-form-item>
                  </el-col>
                  <el-col :md="this.adaptiveGrid.md" v-if="monthlyCapitaShow" :lg="this.adaptiveGrid.lg">
                    <el-form-item prop="monthlyCapita" label="家庭人均月收入：">
                      <div>
                            <span v-for="(item, index) in newForm.monthlyCapita" :key="index">
                              {{item}}
                              <i v-if="index < newForm.monthlyCapita.length - 1">,</i>
                            </span>
                      </div>
                    </el-form-item>
                  </el-col>
                  <el-col :md="this.adaptiveGrid.md" v-if="defoTypeShow" :lg="this.adaptiveGrid.lg">
                    <el-form-item prop="defoType" label="残疾类型：">
                      <div>
                            <span v-for="(item, index) in newForm.defoType" :key="index">
                              {{item}}
                              <i v-if="index < newForm.defoType.length - 1">,</i>
                            </span>
                      </div>
                    </el-form-item>
                  </el-col>
                  <el-col :md="this.adaptiveGrid.md" v-if="defoLevelShow" :lg="this.adaptiveGrid.lg">
                    <el-form-item prop="defoLevel" label="残疾等级：">
                      <div>
                            <span v-for="(item, index) in newForm.defoLevel" :key="index">
                              {{item}}
                              <i v-if="index < newForm.defoLevel.length - 1">,</i>
                            </span>
                      </div>
                    </el-form-item>
                  </el-col>
                  <el-col :md="this.adaptiveGrid.md" v-if="entitledGroupsShow" :lg="this.adaptiveGrid.lg">
                    <el-form-item prop="entitledGroups" label="优抚类别：">
                      <div>
                            <span v-for="(item, index) in newForm.entitledGroups" :key="index">
                              {{item}}
                              <i v-if="index < newForm.entitledGroups.length - 1">,</i>
                            </span>
                      </div>
                    </el-form-item>
                  </el-col>
                  <el-col :md="this.adaptiveGrid.md" v-if="birthControlFamilyShow" :lg="this.adaptiveGrid.lg">
                    <el-form-item prop="birthControlFamily" label="计生家庭：">
                      <div>
                            <span v-for="(item, index) in newForm.birthControlFamily" :key="index">
                              {{item}}
                              <i v-if="index < newForm.birthControlFamily.length - 1">,</i>
                            </span>
                      </div>
                    </el-form-item>
                  </el-col>
                  <el-col :md="this.adaptiveGrid.md" v-if="birthControlSubsidyShow" :lg="this.adaptiveGrid.lg">
                    <el-form-item prop="birthControlSubsidy" label="计生补助：">
                      <div>
                            <span v-for="(item, index) in newForm.birthControlSubsidy" :key="index">
                              {{item}}
                              <i v-if="index < newForm.birthControlSubsidy.length - 1">,</i>
                            </span>
                      </div>
                    </el-form-item>
                  </el-col>
                </el-row>

              </el-collapse-item>
              <!--服务范围item end-->

              <!--服务商item start-->
              <el-collapse-item name="baseItem_2">
                <template slot="title">
                  <div class="titleSlider">
									<span>
										<i class="titleTip"></i>服务商
									</span>
                  </div>
                </template>
                <el-form ref="form_server" key="form_server" :model="form"
                         label-width="140px">
                  <el-row :gutter="0">
                    <el-col :span="24">
                      <el-form-item label="服务商：" prop="fuwushang">
                        <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12"
                                style="position: relative;">
                          <span>{{form.serviceOrgName.join(',')}}</span>
                        </el-col>
                      </el-form-item>
                    </el-col>
                  </el-row>
                </el-form>
              </el-collapse-item>
              <!--服务商item end-->

            </el-collapse>
          </el-tab-pane>
          <!--基本信息tabs end-->
        </el-tabs>
      </el-form>

    </el-main>

    <!--添加服务商 end-->
    <div style="position: absolute; top:40px; right: 40px">
        <span @click="closeDetail" style="cursor: pointer">
          <i class="el-icon-close" style="font-size: 26px"></i>
        </span>
    </div>
  </el-container>
</template>

<script>
  import _ from 'lodash';
  import {
    userDetailsData,
    allSelectdictionaryData,
  } from "@/api/serviceActivityConfig/serviceProject";
  import {adaptiveGrid_max, adaptiveGrid_plus} from "@/common/index";
  import {getEditAuthority} from "@/api/user";

  export default {
    components: {},
    props: ['id', 'close'],
    data() {

      return {
        //下拉框字典数据
        service_targetOptions: [],//服务对象
        fuwushangleixingOptions: [],//服务商类型
        service_price_unitOptions: [],//服务商价格单位

        isEditForm: true,//页面表单是否可编辑操作。查看时：false,编辑-新增时：true
        idEdit: true,//区域级联下拉框是编辑时还是新增时。编辑时：false,新增时：true

        //机构类型的字段配置
        institutionField: [
          {children: []},
          {children: []},
          {children: []}
        ],

        //表单
        form: {
          //-----基本信息-------
          serviceName: '',//服务名称
          serviceDate: '',//服务日期
          beginTime: '',//服务开始时间
          endTime: '',//服务结束时间
          orgId: '',//服务地点
          orgName: '',//服务地点（汉字）
          serviceNum: '',//服务名额
          servicePrice: '',//服务价格
          servicePriceUnit: 'y_bout',//服务单位
          servicePriceUnitName: "元/小时",//服务单位（文本）
          //服务商
          bizProviderOrgVoList: [],
          serviceOrgId: [],
          serviceOrgName: [],

          deptName: '',//发布单位
          applyWay: '',//申请方式

          syncWeb: 'N',//同步发布到网站
          syncWeixin: 'N',//同步发布到微信
          onlyBack: 'Y',//仅发布到后台
          //富文本内容
          bizExtendContentVo: {
            parentId: '',//父id
            content: '',//内容
            id: '',//服务项目id
            infoType: '',//内容类型
          },
          serviceArea: [],//
          serviceTarget: '',//服务对象
          maxAge: '',//最大年龄
          minAge: '',//最小年龄
          // newData
          peopleCategory: [], // 人口类别
          sex: [], // 性别
          bizLiveStatus: [], // 居中情况
          bizAssessLevel: [], // 评估类型
          bizAssessType: [], // 评估类型
          hCtegory: [], // 救助类比
          familyType: [], // 家庭类别
          monthlyCapita: [], // 家庭人均收入
          // category: [], // 残疾人类别
          defoType: [], // 残疾类型
          defoLevel: [], // 残疾等级
          // bizAgeLevel: [], // 年龄类别
          entitledGroups: [], // 优抚类别
          birthControlFamily: [], // 计生家庭
          birthControlSubsidy: [], // 计生补助
        },
        newForm: {
          peopleCategory: [], // 人口类别
          sex: [], // 性别
          bizLiveStatus: [], // 居中情况
          bizAssessLevel: [], // 评估类型
          bizAssessType: [], // 评估类型
          hCtegory: [], // 救助类比
          familyType: [], // 家庭类别
          monthlyCapita: [], // 家庭人均收入
          // category: [], // 残疾人类别
          defoType: [], // 残疾类型
          defoLevel: [], // 残疾等级
          // bizAgeLevel: [], // 年龄类别
          entitledGroups: [], // 优抚类别
          birthControlFamily: [], // 计生家庭
          birthControlSubsidy: [], // 计生补助
        },

        ageRange: '',//年龄范围

        synRelease: ['仅发布到后台'],//同步发布
        serviceTimeRange: ["", ""],//服务时间

        orgIdOptions: [],//服务地点

        loading: false,


        activeTabs: 'base',//tab标签切换默认选中name参数
        activeCollapse:
          ['baseItem_1', 'baseItem_2', 'baseItem_3', 'baseItem_4', 'baseItem_5', 'baseItem_6'],//折叠面板默认打开name参数

        //自适应
        adaptiveGrid: {
          md: adaptiveGrid_max.md,
          lg: adaptiveGrid_max.lg
        },
        //自适应
        adaptiveGrid_plus: {
          md: adaptiveGrid_plus.md,
          lg:
          adaptiveGrid_plus.lg
        },

        areaCode: [],//所属居委全部ID
        modelType: '',//查看：look  编辑：edit  新增：add
        instituType: '',//机构类型
        editAuthority: false,//编辑按钮的权限

        // quillEditorHtml: '',//富文本的内容
        imageInfoVos: [],//富文本图片的集合
        dialogVisible: false,//添加服务商弹框显示隐藏
        sufixClearBtnShow: false,//服务商清空按钮显示隐藏
        defaultProps: {
          label: "dictLabel",
          value: "dictValue"
        },
        // new
        peopleCategory: [], // 人口分类
        sex: [], // 性别
        bizLiveStatus: [], // 居住情况
        bizAssessLevel: [], // 评估类型
        bizAssessType: [], // 评估类型
        hCtegory: [], // 救助类别
        familyType: [], // 家庭类别
        monthlyCapita: [], // 家庭人均收入
        // category: [], // 残疾人类别
        defoType: [], // 残疾类型
        defoLevel: [], // 残疾等级
        entitledGroups: [], // 优抚类别
        birthControlFamily: [], // 计生家庭
        birthControlSubsidy: [], // 计生补助
        bizAssessTypeLook: [], // 评估类型
        // bizAgeLevel: [], // 年龄类别
        bizAssessTypeLookWord: '',
        // //
        peopleCategoryShow: false, // 人口分类
        sexShow: false, // 性别
        bizLiveStatusShow: false, // 居住情况
        bizAssessLevelShow: false, // 评估类型
        hCtegoryShow: false, // 救助类别
        familyTypeShow: false, // 家庭类别
        monthlyCapitaShow: false, // 家庭人均收入
        // categoryShow: false, // 残疾人类别
        defoTypeShow: false, // 残疾类型
        defoLevelShow: false, // 残疾等级
        entitledGroupsShow: false, // 优抚类别
        birthControlFamilyShow: false, // 计生家庭
        birthControlSubsidyShow: false, // 计生补助
        // bizAgeLevelShow: false // 年龄分类
      }
    },
    //在模板渲染成html后调用，通常是初始化页面完成后，再对html的dom节点进行一些需要的操作。
    mounted() {
      //当前机构id
      let _userId_ = this.id
      this.getData(_userId_);
        getEditAuthority(this.$route.meta.id).then(response => {
          response.forEach((item) => {
            if (item.menuName === '编辑') {
              this.editAuthority = item.visible === '0' ? true : false;
            }
            switch (item.perms){
              case 'serviceActivityConfig:serviceProject:PopulationType':
                this.peopleCategoryShow = true;
                break;
              case 'serviceActivityConfig:serviceProject:Gender':
                this.sexShow = true;
                break;
              case 'serviceActivityConfig:serviceProject:LivingCondition':
                this.bizLiveStatusShow = true
                break;
              case 'serviceActivityConfig:serviceProject:AssessmentType':
                this.bizAssessLevelShow = true;
                break;
              case 'serviceActivityConfig:serviceProject:RescueCategory':
                this.hCtegoryShow = true;
                break;
              case 'serviceActivityConfig:serviceProject:FamilyCategory':
                this.familyTypeShow = true;
                break;
              case 'serviceActivityConfig:serviceProject:FamilyIncome':
                this.monthlyCapitaShow = true;
                break;
              // case 'serviceActivityConfig:serviceProject:DisabilityCategories':
              //   this.categoryShow = true;
              //   break;
              case 'serviceActivityConfig:serviceProject:DisabilityType':
                this.defoTypeShow = true;
                break;
              case 'serviceActivityConfig:serviceProject:DisabilityLevel':
                this.defoLevelShow = true;
                break;
              case 'serviceActivityConfig:serviceProject:PreferentialTreatmentCategory':
                this.entitledGroupsShow = true;
                break;
              case 'serviceActivityConfig:serviceProject:birthControlFamily':
                this.birthControlFamilyShow = true;
                break;
              case 'serviceActivityConfig:serviceProject:birthControlSubsidy':
                this.birthControlSubsidyShow = true;
                break;
              // case 'serviceActivityConfig:serviceProject:AgeLevel':
              //   this.bizAgeLevelShow = true;
              //   break;
            }
          });
        }).catch(() => {
          this.$message.error('获取编辑按钮的权限控制失败！');
        });
      // new
      this.selectData()
    },
    methods: {
      closeDetail() {
        this.close()
      },
      // 异步事件同步化
      async getData(id) {
        await this.getSelect();
        await this.getSelectAll();
        await this.editGetData(id, '');
      },
      // 循环遍历数据获取多选的数据
      getArrData(arr, keyName, myName) {
        arr.forEach(item =>{
          if (item.keyName === keyName) {
            this.form[myName].push(item.valueName);
          }
        })
      },
      // 编辑-查看 获取服务项目的数据
      editGetData(id, st) {
        return new Promise((resolve, reject) => {
          //请求当前服务项目信息
          userDetailsData(id, st).then(response => {
            if (!response.bizExtendContentVo) {
              //富文本内容
              response.bizExtendContentVo = {
                parentId: '',//父id
                content: '',//内容
                id: '',//服务项目id
                infoType: '',//内容类型
              };
            }
            //页面form表单的值
            this.form = {...this.form, ...response};
            this.getArrData(this.form.bizServiceAreaVos, 'people_category', 'peopleCategory'); // 人口分类
            this.getArrData(this.form.bizServiceAreaVos, 'sex', 'sex'); // 性别
            this.getArrData(this.form.bizServiceAreaVos, 'biz_live_status', 'bizLiveStatus'); // 居中情况
            this.getArrData(this.form.bizServiceAreaVos, 'biz_assess_level', 'bizAssessLevel'); // 评估类型
            this.getArrData(this.form.bizServiceAreaVos, 'h_category', 'hCtegory'); // 救助类比
            this.getArrData(this.form.bizServiceAreaVos, 'family_type', 'familyType');// 家庭类别
            this.getArrData(this.form.bizServiceAreaVos, 'monthly_capita', 'monthlyCapita'); // 家庭人均收入
            // this.getArrData(this.form.bizServiceAreaVos, 'category', 'category'); // 残疾人类别
            this.getArrData(this.form.bizServiceAreaVos, 'defo_type', 'defoType'); // 残疾类型
            this.getArrData(this.form.bizServiceAreaVos, 'defo_level', 'defoLevel'); // 残疾等级
            this.getArrData(this.form.bizServiceAreaVos, 'entitled_groups', 'entitledGroups'); // 优抚类别
            this.getArrData(this.form.bizServiceAreaVos, 'birthControl_family', 'birthControlFamily'); // 计生家庭
            this.getArrData(this.form.bizServiceAreaVos, 'birthControl_subsidy', 'birthControlSubsidy'); // 计生补助
            // this.getArrData(this.form.bizServiceAreaVos, 'biz_age_level', 'bizAgeLevel'); // 年龄分类
            let arrJl = []
            this.form.bizServiceAreaVos.forEach((item, index) =>{
              if (item.keyName === 'biz_assess_type') {
                arrJl[0] = item.valueName
              }
            })
            this.form.bizServiceAreaVos.forEach((item, index) =>{
              if (item.keyName === 'biz_assess_level') {
                arrJl[1] = item.valueName
              }
            })
            this.form.bizAssessType = arrJl;
            if (st === 'edit') {
              this.form.bizAssessType[1] = this.form.bizAssessType[1] + this.form.bizAssessType[0]
            }
            if (st !== 'edit') {
              let type = ''
              this.form.bizServiceAreaVos.forEach(item =>{
                if (item.keyName === "biz-assess-type") {
                  type = item.valueName
                }
              });
              this.bizAssessTypeLook.forEach(item =>{
                if (this.form.bizServiceAreaVos.length !== 0 && item.dictValue === type) {
                  this.bizAssessTypeLookWord = item.dictLabel
                }
              });
              this.getLookData(this.peopleCategory,'peopleCategory');
              this.getLookData(this.sex,'sex');
              this.getLookData(this.bizLiveStatus,'bizLiveStatus');
              this.getLookData(this.bizAssessLevel,'bizAssessLevel');
              this.getLookData(this.bizAssessType,'bizAssessType');
              this.getLookData(this.hCtegory,'hCtegory');
              this.getLookData(this.familyType,'familyType');
              this.getLookData(this.monthlyCapita,'monthlyCapita');
              // this.getLookData(this.category,'category');
              this.getLookData(this.defoType,'defoType');
              this.getLookData(this.defoLevel,'defoLevel');
              this.getLookData(this.entitledGroups,'entitledGroups');
              this.getLookData(this.birthControlFamily,'birthControlFamily')
              this.getLookData(this.birthControlSubsidy,'birthControlSubsidy')
              // this.getLookData(this.bizAgeLevel,'bizAgeLevel');
            }
            //同步发布
            this.synRelease = [];
            if (this.form.syncWeb === "Y") {
              this.synRelease.push('同步发布到网站');
            }
            if (this.form.syncWeixin === "Y") {
              this.synRelease.push('同步发布到微信');
            }
            if (this.form.onlyBack === "Y") {
              this.synRelease.push('仅发布到后台');
            }
            if (this.form.syncWeb === 'N' && this.form.syncWeixin === "N" && this.form.onlyBack === "N") {
              this.form.onlyBack = "Y";
              this.synRelease.push('仅发布到后台');
            }
            //服务时间
            this.serviceTimeRange = [];
            this.serviceTimeRange.push(this.form.beginTime);
            this.serviceTimeRange.push(this.form.endTime);

            this.form.minAge = this.form.minAge === null ? '' : this.form.minAge;
            this.form.maxAge = this.form.minAge === null ? '' : this.form.maxAge;

            //处理区域的code,用以渲染区域下拉组件
            if (st === 'edit') {
              //区域范围
              this.form.serviceArea = this.form.serviceAreaCodeLevel ? this.form.serviceAreaCodeLevel.split(',') : '';
            }
            if (st === 'look') {
              //年龄范围
              if (this.form.minAge === '' && this.form.maxAge === '') {
                this.ageRange = '';
              }
              if (this.form.minAge !== '' && this.form.maxAge === '') {
                this.ageRange = '大于等于' + this.form.minAge + '岁';
              }
              if (this.form.minAge === '' && this.form.maxAge !== '') {
                this.ageRange = '小于等于' + this.form.maxAge + '岁';
              }
              if (this.form.minAge !== '' && this.form.maxAge !== '') {
                this.ageRange = this.form.minAge + '岁 -' + this.form.maxAge + '岁';
              }
            }
            this.idEdit = false;
          }).catch(() => {
            this.$message.error("获取服务项目信息失败1111！");
          });
        })
      },
      // 查看时把遍历字典取值
      getLookData(arr, data) {
        this.form[data].forEach(item =>{
          for (let i = 0; i < arr.length ; i++) {
            if (item === arr[i].dictValue) {
              this.newForm[data].push(arr[i].dictLabel)
            }
          }
        })
      },
      // 获取下拉字典
      getSelect() {
        return new Promise((resolve, reject) => {
          //数据字典接口
          let dicKey = 'service_target,service_price_unit';
          allSelectdictionaryData(dicKey).then(response => {
            if (response.code === 0) {
              for (let k in response.data) {
                switch (k) {
                  //服务对象
                  case 'service_target':
                    this.service_targetOptions = response.data[k];
                    break;
                  //服务价格单位
                  case 'service_price_unit':
                    this.service_price_unitOptions = response.data[k];
                    break;
                }
              }
            }
            else {
              this.$message.error('数据字典接口请求失败！');
            }
            resolve()
          }).catch(() => {
            this.$message.error('数据字典接口请求失败！');
            reject()
          });
        });
      },
      getSelectAll() {
        return new Promise((resolve, reject) => {
          //数据字典接口
          let dicKey = 'people_category,sys_sex,biz_live_status,biz_assess_level,h_category,family_type,monthly_capita,defo_type,defo_level,entitled_groups,biz_assess_type,birthControl_family,birthControl_subsidy';
          allSelectdictionaryData(dicKey).then(response =>{
            if (response.code === 0) {
              for (let k in response.data) {
                switch (k) {
                  //人口分类
                  case 'people_category':
                    this.peopleCategory = response.data[k];
                    break;
                  //性别
                  case 'sys_sex':
                    this.sex = response.data[k];
                    break;
                  //服务对象
                  case 'biz_live_status':
                    this.bizLiveStatus = response.data[k];
                    break;
                  // 评估类型
                  case 'biz_assess_level':
                    this.bizAssessLevel = response.data[k];
                    break;
                  // 救助类别
                  case 'h_category':
                    this.hCtegory = response.data[k];
                    break;
                  // 家庭类别
                  case 'family_type':
                    this.familyType = response.data[k];
                    break;
                  // 家庭人均收入
                  case 'monthly_capita':
                    this.monthlyCapita = response.data[k];
                    break;
                  // 残疾人类别
                  // case 'category':
                  //   this.category = response.data[k];
                  //   break;
                  // 家庭人均收入
                  case 'defo_type':
                    this.defoType = response.data[k];
                    break;
                  // 家庭人均收入
                  case 'defo_level':
                    this.defoLevel = response.data[k];
                    break;
                  // 优抚类别
                  case 'entitled_groups':
                    this.entitledGroups = response.data[k];
                    break;
                  // 计生家庭
                  case 'birthControl_family':
                    this.birthControlFamily = response.data[k];
                    break;
                  // 计生补助
                  case 'birthControl_subsidy':
                    this.birthControlSubsidy = response.data[k];
                    break;
                  // 年龄类别
                  // case 'biz_age_level':
                  //   this.bizAgeLevel   = response.data[k];
                  //   break;
                }

              }
              this.bizAssessType.forEach((item, index) =>{
                const data = JSON.parse(JSON.stringify(this.bizAssessLevel));
                data.forEach((list, i) =>{
                  data[i].dictValue = list.dictValue + index
                });
                item.children = data
              })
            }
            else {
              this.$message.error('数据字典接口请求失败！')
            }
            resolve()
          }).catch(() => {
            this.$message.error('数据字典接口请求失败！')
            reject()
          })
        })
      },
      // 循环遍历多选塞入数组中
      pushArr(arr, allArr, name) {
        arr.forEach(item =>{
          const data = {};
          data.keyName = name;
          data.valueName = item;
          allArr.push(data)
        })
      },
      //获取服务地点的id
      getServicePointId(value) {
        this.form.orgId = value;
      },
      // 获取所属居委
      getAreaCode_reg(val) {
        this.areaCode = val;
        this.form.serviceArea = val;
      },
      // 获取图片数据
      getPicList(val) {
        this.imageInfoVos = val;
      },
      //获取富文本的内容
      getEditorHtml(html) {
        // this.quillEditorHtml = html;
        this.form.bizExtendContentVo.content = html;
      },
      //添加服务商---打开服务商弹框选择面板
      showSelectFWSPannel() {
        this.dialogVisible = true;
      },
      //关闭服务商弹框
      dialogHanderHide() {
        this.dialogVisible = false;
      },
      //关闭弹框后，将选择的服务商带到input中
      getValueToInput(val){
        this.form.bizProviderOrgVoList = _.cloneDeep(val.bizProviderOrgVoList);
        this.form.serviceOrgId = _.cloneDeep(val.serviceOrgId);
        this.form.serviceOrgName = _.cloneDeep(val.serviceOrgName);
      },
      //服务商清空按钮鼠标移入显示
      sufixClearBtnMouseenter() {
        this.sufixClearBtnShow = true;
      },
      //服务商清空按钮鼠标移出隐藏
      sufixClearBtnMouseleave() {
        this.sufixClearBtnShow = false;
      },
      //点击服务商的清空按钮，清空选择的数据
      clearSelectFWS() {
        this.form.bizProviderOrgVoList = [];
        this.form.serviceOrgId = [];
        this.form.serviceOrgName = [];
      },
      // new
      // 数据字典
      selectData() {
        let dicKey = 'people_category,sys_sex,biz_live_status,biz_assess_level,h_category,family_type,monthly_capita,defo_type,defo_level,entitled_groups,biz_assess_type,birthControl_family,birthControl_subsidy';
        allSelectdictionaryData(dicKey).then(response =>{
          if (response.code === 0) {
            for (let k in response.data) {
              switch (k) {
                //人口分类
                case 'people_category':
                  this.peopleCategory = response.data[k];
                  break;
                //性别
                case 'sys_sex':
                  this.sex = response.data[k];
                  break;
                //服务对象
                case 'biz_live_status':
                  this.bizLiveStatus = response.data[k];
                  break;
                // 评估类型
                case 'biz_assess_level':
                  this.bizAssessLevel = response.data[k];
                  break;
                // 评估类型
                case 'biz_assess_type':
                  this.bizAssessType = response.data[k];
                  this.bizAssessTypeLook = JSON.parse(JSON.stringify(response.data[k]));
                  break;
                // 救助类别
                case 'h_category':
                  this.hCtegory = response.data[k];
                  break;
                // 家庭类别
                case 'family_type':
                  this.familyType = response.data[k];
                  break;
                // 家庭人均收入
                case 'monthly_capita':
                  this.monthlyCapita = response.data[k];
                  break;
                // 残疾人类别
                // case 'category':
                //   this.category = response.data[k];
                //   break;
                // 家庭人均收入
                case 'defo_type':
                  this.defoType = response.data[k];
                  break;
                // 家庭人均收入
                case 'defo_level':
                  this.defoLevel = response.data[k];
                  break;
                // 优抚类别
                case 'entitled_groups':
                  this.entitledGroups = response.data[k];
                  break;
                // 计生家庭
                case 'birthControl_family':
                  this.birthControlFamily = response.data[k];
                  break;
                // 计生补助
                case 'birthControl_subsidy':
                  this.birthControlSubsidy = response.data[k];
                  break;
                // 年龄类别
                // case 'biz_age_level':
                //   this.bizAgeLevel   = response.data[k];
                //   break;
              }

            }
            this.bizAssessType.forEach((item, index) =>{
              const data = JSON.parse(JSON.stringify(this.bizAssessLevel));
              data.forEach((list, i) =>{
                data[i].dictValue = list.dictValue + index
              });
              item.children = data
            })
          }
        })
      }
    }
  }
</script>

<style scoped>
  @import "~@/styles/form.css";

  .tableContainer {
    margin-top: 20px;
  }
</style>
<style>
  .synReleaseTip > .el-form-item__content > .el-form-item__error {
    top: 70% !important;
  }

  .serviceOrgSufixBtnStyle {
    padding-right: 50px;
  }

  .serviceOrgSufixBtnStyle > .el-input-group__append {
    background: transparent;
    border: none;
    color: #1890ff;
    font-size: 26px;
    padding: 4px 25px 0;
  }

  .serviceOrgSufixBtnStyle > .el-input-group__append > .el-button {
    padding: 0;
  }

  .serviceOrgSufixBtnStyle > .el-input__inner {
    border-radius: 4px;
  }

  .showSelectFWSPannelBtn {
    position: absolute;
    right: 0;
    top: 0;
    width: 50px;
    height: 36px;
    color: #1890ff;
    font-size: 28px;
    text-align: center;
  }

  .showSelectFWSPannelBtn > i {
    cursor: pointer;
    margin-top: 4px;
  }

  .serviceOrgSufixPannel {
    position: relative;
  }

  .serviceOrgSufixClearBtn {
    position: absolute;
    top: 11px;
    right: 60px;
    color: #CED8E3;
    cursor: pointer;
  }
</style>
