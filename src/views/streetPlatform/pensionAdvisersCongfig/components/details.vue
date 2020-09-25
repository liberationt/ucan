<!--政策资讯信息-->
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
                    <el-form-item label="一级分类：" prop="classify1">
                      <span>{{form.classify1Name}}</span>
                    </el-form-item>
                  </el-col>
                  <el-col :md="this.adaptiveGrid.md" :lg="this.adaptiveGrid.lg">
                    <el-form-item label="二级分类：" prop="classify2">
                      <span>{{form.classify2Name}}</span>
                    </el-form-item>
                  </el-col>
                  <el-col :md="this.adaptiveGrid.md" :lg="this.adaptiveGrid.lg">
                    <el-form-item label="发布单位：" prop="deptName">
                      <span>{{form.deptName}}</span>
                    </el-form-item>
                  </el-col>
                  <el-col :md="this.adaptiveGrid.md" :lg="this.adaptiveGrid.lg">
                    <el-form-item label="发布日期：" prop="pubDate">
                      <span>{{form.pubDate}}</span>
                    </el-form-item>
                  </el-col>

                  <el-col :md="24" :lg="16">
                    <el-form-item label="同步发布：" prop="synRelease"
                                  class="synReleaseTip">
                      <span><span v-for="(item,index) in synRelease">{{item}}{{index === synRelease.length-1?'':'，'}}</span></span>
                    </el-form-item>
                  </el-col>
                  <el-col :span="24">
                    <el-form-item label="资讯标题：" prop="title">
                      <span>{{form.title}}</span>
                    </el-form-item>
                  </el-col>
                  <el-col :span="24" style="height:auto;">
                    <el-form-item :label="this.isEditForm?'资讯内容':'资讯内容：'" prop="content" class="beforRequired">
                      <div class="ql-container ql-snow">
                        <div v-html="form.bizExtendContentVo.content" class="ql-editor bizExtendContentVoDiv"></div>
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
                <!--              <el-form ref="form_base" key="form_base" :model="form"-->
                <!--                       :rules="this.isEditForm?rulesForm:null" label-width="140px">-->
                <el-row :gutter="0">
                  <el-col :md="this.adaptiveGrid.md" :lg="this.adaptiveGrid.lg">
                    <el-form-item prop="serviceArea" label="区域范围：">
                      <span>{{form.serviceAreaName}}</span>
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
                    <el-form-item prop="bizAssessType" label="评估类型：">
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
                  <el-col :md="this.adaptiveGrid.md" :lg="this.adaptiveGrid.lg" v-if="familyTypeShow">
                    <el-form-item prop="familyType" label="家庭类别：">
                      <div>
                            <span v-for="(item, index) in newForm.familyType" :key="index">
                              {{item}}
                              <i v-if="index < newForm.familyType.length - 1">,</i>
                            </span>
                      </div>
                    </el-form-item>
                  </el-col>
                  <el-col :md="this.adaptiveGrid.md" :lg="this.adaptiveGrid.lg" v-if="monthlyCapitaShow">
                    <el-form-item prop="monthlyCapita" label="家庭人均月收入：">
                      <div>
                            <span v-for="(item, index) in newForm.monthlyCapita" :key="index">
                              {{item}}
                              <i v-if="index < newForm.monthlyCapita.length - 1">,</i>
                            </span>
                      </div>
                    </el-form-item>
                  </el-col>
                  <el-col :md="this.adaptiveGrid.md" :lg="this.adaptiveGrid.lg" v-if="defoTypeShow">
                    <el-form-item prop="defoType" label="残疾类型：">
                      <div>
                            <span v-for="(item, index) in newForm.defoType" :key="index">
                              {{item}}
                              <i v-if="index < newForm.defoType.length - 1">,</i>
                            </span>
                      </div>
                    </el-form-item>
                  </el-col>
                  <el-col :md="this.adaptiveGrid.md" :lg="this.adaptiveGrid.lg" v-if="defoLevelShow">
                    <el-form-item prop="defoLevel" label="残疾等级：">
                      <div>
                            <span v-for="(item, index) in newForm.defoLevel" :key="index">
                              {{item}}
                              <i v-if="index < newForm.defoLevel.length - 1">,</i>
                            </span>
                      </div>
                    </el-form-item>
                  </el-col>
                  <el-col :md="this.adaptiveGrid.md" :lg="this.adaptiveGrid.lg" v-if="entitledGroupsShow">
                    <el-form-item prop="entitledGroups" label="优抚类别：">
                      <div>
                            <span v-for="(item, index) in newForm.entitledGroups" :key="index">
                              {{item}}
                              <i v-if="index < newForm.entitledGroups.length - 1">,</i>
                            </span>
                      </div>
                    </el-form-item>
                  </el-col>
                  <el-col :md="this.adaptiveGrid.md" :lg="this.adaptiveGrid.lg" v-if="birthControlFamilyShow">
                    <el-form-item prop="birthControlFamily" label="计生家庭：">
                      <div>
                            <span v-for="(item, index) in newForm.birthControlFamily" :key="index">
                              {{item}}
                              <i v-if="index < newForm.birthControlFamily.length - 1">,</i>
                            </span>
                      </div>
                    </el-form-item>
                  </el-col>
                  <el-col :md="this.adaptiveGrid.md" :lg="this.adaptiveGrid.lg" v-if="birthControlSubsidyShow">
                    <el-form-item prop="birthControlFamily" label="计生补助：">
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

            </el-collapse>
          </el-tab-pane>
          <!--基本信息tabs end-->
        </el-tabs>
      </el-form>

      <div style="position: absolute; top:40px; right: 40px">
        <span @click="closeDetail" style="cursor: pointer">
          <i class="el-icon-close" style="font-size: 26px"></i>
        </span>
      </div>
    </el-main>
  </el-container>
</template>

<script>
  import {
    userDetailsData,
  } from "@/api/policyInfoConfig/policyInformation";
  import {allSelectdictionaryData} from '@/api/facilitiesConfig/communityFacilities'
  import {adaptiveGrid_max, adaptiveGrid_plus} from "@/common/index";
  import {getEditAuthority} from "@/api/user";

  export default {
    components: {},
    props: ['id', 'close'],
    data() {
      return {
        //下拉框字典数据
        service_targetOptions: [],//服务对象
        classify1Options: [],//一级分类下拉数据
        classify2Options: [],//二级分类下拉数据

        isEditForm: true,//页面表单是否可编辑操作。查看时：false,编辑-新增时：true
        idEdit: true,//区域级联下拉框是编辑时还是新增时。编辑时：false,新增时：true

        //机构类型的字段配置
        institutionField: [
          {children: []},
          {children: []},
          {children: []}
        ],
        defaultProps: {
          label: "dictLabel",
          value: "dictValue"
        },
        //表单
        form: {
          //-----基本信息-------
          classify1:'',//一级分类
          classify1Name:'',//一级分类
          classify2:'',//二级分类
          classify2Name:'',//二级分类
          pubDate: '',//活动日期
          deptName: '',//发布单位
          syncWeb: 'N',//同步发布到网站
          syncWeixin: 'N',//同步发布到微信
          onlyBack: 'Y',//仅发布到后台
          title:'',//资讯标题
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
          bizAssessType: [], // 评估类型
          bizAssessLevel: [], // 评估等级
          hCtegory: [], // 救助类比
          familyType: [], // 家庭类别
          monthlyCapita: [], // 家庭人均收入
          // category: [], // 残疾人类别
          defoType: [], // 残疾类型
          defoLevel: [], // 残疾等级
          entitledGroups: [], // 优抚类别
          birthControlFamily: [], // 计生家庭
          birthControlSubsidy: [], // 计生补助
          // bizAgeLevel: [], // 年龄类别
        },
        newForm: {
          peopleCategory: [], // 人口类别
          sex: [], // 性别
          bizLiveStatus: [], // 居中情况
          bizAssessType: [], // 评估类型
          bizAssessLevel: [], // 评估等级
          hCtegory: [], // 救助类比
          familyType: [], // 家庭类别
          monthlyCapita: [], // 家庭人均收入
          // category: [], // 残疾人类别
          defoType: [], // 残疾类型
          defoLevel: [], // 残疾等级
          // bizAgeLevel: [], // 年龄类别
          entitledGroups: [], // 优抚类别
          birthControlFamily: [], // 计生家庭
          birthControlSubsidy: [] // 计生补助
        },
        synRelease: ['仅发布到后台'],//同步发布

        loading: false,

        editorOption: {},


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

        modelType: '',//查看：look  编辑：edit  新增：add
        instituType: '',//机构类型
        editAuthority: false,//编辑按钮的权限
        areaCode: [],//所属居委全部ID
        // quillEditorHtml:'',//富文本的内容
        imageInfoVos:[],//富文本图片的集合

        // new
        peopleCategory: [], // 人口分类
        sex: [], // 性别
        bizLiveStatus: [], // 居住情况
        bizAssessLevel: [], // 评估等级
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
        //
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
      /*编辑按钮的权限控制*/
        getEditAuthority(this.$route.meta.id).then(response => {
          response.forEach((item) => {
            switch (item.perms){
              case 'policyInfoConfig:policyInformation:PopulationType':
                this.peopleCategoryShow = true;
                break;
              case 'policyInfoConfig:policyInformation:Gender':
                this.sexShow = true;
                break;
              case 'policyInfoConfig:policyInformation:LivingCondition':
                this.bizLiveStatusShow = true
                break;
              case 'policyInfoConfig:policyInformation:AssessmentType':
                this.bizAssessLevelShow = true;
                break;
              case 'policyInfoConfig:policyInformation:RescueCategory':
                this.hCtegoryShow = true;
                break;
              case 'policyInfoConfig:policyInformation:FamilyCategory':
                this.familyTypeShow = true;
                break;
              case 'policyInfoConfig:policyInformation:FamilyIncome':
                this.monthlyCapitaShow = true;
                break;
              // case 'policyInfoConfig:policyInformation:DisabilityCategories':
              //   this.categoryShow = true;
              //   break;
              case 'policyInfoConfig:policyInformation:DisabilityType':
                this.defoTypeShow = true;
                break;
              case 'policyInfoConfig:policyInformation:DisabilityLevel':
                this.defoLevelShow = true;
                break;
              case 'policyInfoConfig:policyInformation:PreferentialTreatmentCategory':
                this.entitledGroupsShow = true;
                break;
              case 'policyInfoConfig:policyInformation:birthControlFamily':
                this.birthControlFamilyShow = true;
                break;
              case 'policyInfoConfig:policyInformation:birthControlSubsidy':
                this.birthControlSubsidyShow = true;
                break;
              // case 'policyInfoConfig:policyInformation:AgeLevel':
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
      handleChange(value) {
      },
      // 异步事件同步化
      async getData(id) {
        await this.getSelect();
        await this.getSelectAll();
          await
            this.editGetData(id, '');
      },
      // 循环遍历数据获取多选的数据
      getArrData(arr, keyName, myName) {
        arr.forEach(item =>{
          if (item.keyName === keyName) {
            this.form[myName].push(item.valueName);
          }
        })
      },
      // 编辑-查看 获取数据
      editGetData(id, st) {
        return new Promise((resolve, reject) => {
          //请求当前服务项目信息
          userDetailsData(id, st).then(response => {
            if(!response.bizExtendContentVo){
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
            this.form.bizAssessType = arrJl
            if (st === 'edit') {
              this.form.bizAssessType[1] = this.form.bizAssessType[1] + this.form.bizAssessType[0]
            }
            if (st !== 'edit') {
              let type = ''
              this.form.bizServiceAreaVos.forEach(item =>{
                if (item.keyName === "biz_assess_type") {
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
              this.getLookData(this.bizAssessType,'bizAssessType');
              this.getLookData(this.bizAssessLevel,'bizAssessLevel');
              this.getLookData(this.hCtegory,'hCtegory');
              this.getLookData(this.familyType,'familyType');
              this.getLookData(this.monthlyCapita,'monthlyCapita');
              // this.getLookData(this.category,'category');
              this.getLookData(this.defoType,'defoType');
              this.getLookData(this.defoLevel,'defoLevel');
              this.getLookData(this.entitledGroups,'entitledGroups');
              this.getLookData(this.birthControlFamily,'birthControlFamily');
              this.getLookData(this.birthControlSubsidy,'birthControlSubsidy');
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

            this.form.minAge = this.form.minAge === null ? '' : this.form.minAge;
            this.form.maxAge = this.form.minAge === null ? '' : this.form.maxAge;

            //处理区域的code,用以渲染区域下拉组件
            if (st === 'edit') {
              //区域范围
              this.form.serviceArea = this.form.serviceAreaLevel?this.form.serviceAreaLevel.split(','):'';
            }

            this.idEdit = false;
          }).catch(() => {
            this.$message.error("获取服务项目信息失败！");
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
          let dicKey = 'classify1,classify2,service_target';
          allSelectdictionaryData(dicKey).then(response => {
            if (response.code === 0) {
              for (let k in response.data) {
                switch (k) {
                  //一级分类
                  case 'classify1':
                    this.classify1Options = response.data[k];
                    break;
                  //二级分类
                  case 'classify2':
                    this.classify2Options = response.data[k];
                    break;
                  //服务对象
                  case 'service_target':
                    this.service_targetOptions = response.data[k];
                    break;
                }
              }
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
      // 获取图片数据
      getPicList(val) {
        this.imageInfoVos = val;
      },
      //获取富文本的内容
      getEditorHtml(html) {
        //this.quillEditorHtml = html;
        this.form.bizExtendContentVo.content = html;
      },
      // 获取所属居委
      getAreaCode_reg(val) {
        this.areaCode = val;
        this.form.serviceArea = val;
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
                // 评估等级
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

<style scoped lang="scss">
  @import "~@/styles/form.css";

  .tableContainer {
    margin-top: 20px;
  }
  .detail-selects {
    width: 100%;
    padding: 0 20px;
    float: left;
    .detail-selects-list {
      width: 100%;
      margin-bottom: 15px;
      float: left;
      .detail-selects-item {
        width: 20%;
        float: left;
        .detail-selects-list-title {
          width: 100%;
          font-size: 14px;
          text-align: center;
          line-height: 40px;
          background: #f0f3f9;
          border: 1px solid #e1e1e1;
          border-right: 0;
        }
        .detail-selects-list-input {
          width: 100%;
          font-size: 14px;
          text-align: center;
          height: 37px;
          line-height: 37px;
          border: 1px solid #e1e1e1;
          border-top: 0;
          border-right: 0;
        }
      }
      .detail-selects-item:last-of-type {
        .detail-selects-list-title {
          border-right: 1px solid #e1e1e1 !important;
        }
        .detail-selects-list-input {
          border-right: 1px solid #e1e1e1 !important;
        }
      }
    }
  }
</style>
<style>
  .synReleaseTip > .el-form-item__content > .el-form-item__error {
    top: 70% !important;
  }
  .beforRequired label::before{
    content: '*';
    color: #ff4949;
    display: inline-block;
    margin-right: 0px;
  }
  .bizExtendContentVoDiv > p{
    margin: 0 !important;
  }
</style>
