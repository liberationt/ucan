<template>
  <el-container style="height: 100%;position: relative">
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
										<i class="titleTip"></i>基本信息
									</span>
                </div>
              </template>
              <el-form ref="form_base" key="form_base" :model="form"
                       label-width="140px">
                <el-row :gutter="0">
                  <el-col :md="this.adaptiveGrid.md" :lg="this.adaptiveGrid.lg">
                    <el-form-item label="机构名称：" prop="orgName">
                      <span>{{form.orgName}}</span>
                    </el-form-item>
                  </el-col>
                  <!--组织机构代码 只有养老机构才显示-->
                  <el-col v-show="this.instituType === '1010'" :md="this.adaptiveGrid.md"
                          :lg="this.adaptiveGrid.lg">
                    <el-form-item label="组织机构代码：" prop="orgCode">
                      <span>{{form.orgCode}}</span>
                    </el-form-item>
                  </el-col>
                  <el-col :md="this.adaptiveGrid.md" :lg="this.adaptiveGrid.lg">
                    <el-form-item label="成立时间：" prop="establishTime">
                      <span>{{form.establishTime}}</span>
                    </el-form-item>
                  </el-col>
                  <el-col :md="this.adaptiveGrid.md" :lg="this.adaptiveGrid.lg">
                    <el-form-item label="咨询电话：" prop="phone">
                      <span>{{form.phone}}</span>
                    </el-form-item>
                  </el-col>
                  <el-col :md="this.adaptiveGrid.md" :lg="this.adaptiveGrid.lg">
                    <el-form-item label="房屋产权：" prop="houseProperty">
                      <span>{{form.houseProperty}}</span>
                    </el-form-item>
                  </el-col>
                  <el-col :md="this.adaptiveGrid.md" :lg="this.adaptiveGrid.lg">
                    <el-form-item label="设置形式：" prop="setType">
                      <span>{{form.setType}}</span>
                    </el-form-item>
                  </el-col>
                  <el-col :md="this.adaptiveGrid.md" :lg="this.adaptiveGrid.lg">
                    <el-form-item label="建筑面积(m²)：" prop="buildArea">
                      <span>{{form.buildArea}}</span>
                    </el-form-item>
                  </el-col>
                  <el-col :md="this.adaptiveGrid.md" :lg="this.adaptiveGrid.lg">
                    <el-form-item label="楼层信息(层)：" prop="buildFloor">
                      <span >{{form.buildFloor}}</span>
                    </el-form-item>
                  </el-col>
                  <el-col :md="this.adaptiveGrid.md" :lg="this.adaptiveGrid.lg">
                    <el-form-item label="是否有电梯：" prop="isLift">
                      <span>{{form.isLift}}</span>
                    </el-form-item>
                  </el-col>
                  <el-col :md="this.adaptiveGrid.md" :lg="this.adaptiveGrid.lg">
                    <el-form-item label="开放状态：" prop="openState">
                      <span>{{form.openState}}</span>
                    </el-form-item>
                  </el-col>
                  <el-col :md="this.adaptiveGrid.md" :lg="this.adaptiveGrid.lg">
                    <el-form-item label="所属居委：" prop="areaCode">
                      <span>{{form.areaCodeStr}}</span>
                    </el-form-item>
                  </el-col>
                  <el-col :md="this.adaptiveGrid.md" :lg="this.adaptiveGrid.lg">
                    <el-form-item label="详细地址：" prop="addr">
                      <span>{{form.addr}}</span>
                    </el-form-item>
                  </el-col>
                  <el-col :md="24" :lg="24" style="height: auto;">
                    <el-form-item label="机构图片：">
                      <el-row class="agencyImageRow">
                        <el-col class="agencyImageCol" v-for="(item,index) in this.imageInfoVosLookUrl">
                          <img :src="item" class="agencyImage"/>
                        </el-col>
                      </el-row>
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
										<i class="titleTip"></i>运营信息
									</span>
                </div>
              </template>
              <el-form ref="form_operate" key="form_operate" :model="form"
                       :rules="this.isEditForm?rulesForm:null" label-width="140px">
                <el-row :gutter="0">
                  <el-col :md="this.adaptiveGrid.md" :lg="this.adaptiveGrid.lg">
                    <el-form-item label="法人性质：" prop="legalType">
                      <span>{{form.legalType}}</span>
                    </el-form-item>
                  </el-col>
                  <el-col :md="this.adaptiveGrid.md" :lg="this.adaptiveGrid.lg">
                    <el-form-item label="运营模式：" prop="opMode">
                      <span>{{form.opMode}}</span>
                    </el-form-item>
                  </el-col>
                  <el-col :md="this.adaptiveGrid.md" :lg="this.adaptiveGrid.lg">
                    <el-form-item label="运营单位：" prop="opOrg">
                      <span>{{form.opOrg}}</span>
                    </el-form-item>
                  </el-col>
                  <el-col :md="this.adaptiveGrid.md" :lg="this.adaptiveGrid.lg">
                    <el-form-item label="运营方负责人：" prop="opLinkman">
                      <span>{{form.opLinkman}}</span>
                    </el-form-item>
                  </el-col>
                  <el-col :md="this.adaptiveGrid.md" :lg="this.adaptiveGrid.lg">
                    <el-form-item label="运营方联系方式：" prop="opPhone">
                      <span>{{form.opPhone}}</span>
                    </el-form-item>
                  </el-col>
                  <el-col :md="this.adaptiveGrid.md" :lg="this.adaptiveGrid.lg">
                    <el-form-item label="建设方负责人：" prop="buildLinkman">
                      <span>{{form.buildLinkman}}</span>
                    </el-form-item>
                  </el-col>
                  <el-col :md="this.adaptiveGrid.md" :lg="this.adaptiveGrid.lg">
                    <el-form-item label="建设方联系方式：" prop="buildPhone">
                      <span>{{form.buildPhone}}</span>
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
              <InstituField :currentItem="item" :index="index" :modelType="modelType"></InstituField>
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
										<i class="titleTip"></i>服务能力
									</span>
                </div>
              </template>
              <el-form ref="form_subsidy" key="form_subsidy" :model="form"
                      label-width="150px">
                <el-row :gutter="0">
                  <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                    <el-col :xs="2" :sm="2" :md="2" :lg="2" :xl="2">
                      <h3 class="servesItemTitle">床位</h3>
                    </el-col>
                    <el-col :xs="22" :sm="22" :md="22" :lg="22" :xl="22">
                      <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
                        <el-form-item label="床位总数量(张)："
                                      prop="bedTotal">
                          <span>{{form.bedTotal}}</span>
                        </el-form-item>
                      </el-col>
                      <el-col v-if="this.instituType === '1010'" :xs="24" :sm="12" :md="12"
                              :lg="8" :xl="8">
                        <el-form-item label="已用床位数量(张)："
                                      prop="bedUsed">
                          <span>{{form.bedUsed}}</span>
                        </el-form-item>
                      </el-col>
                      <el-col v-if="this.instituType === '1010'" :xs="24" :sm="12" :md="12"
                              :lg="8" :xl="8">
                        <el-form-item label="剩余床位数量(张)："
                                      prop="bedUnused">
                          <span>{{form.bedUnused}}</span>
                        </el-form-item>
                      </el-col>
                      <el-col v-if="this.instituType === '1011'" :xs="24" :sm="12" :md="12"
                              :lg="8" :xl="8">
                        <el-form-item label="登记服务总人数(人)："
                                      prop="serviceTotalnum">
                          <span>{{form.serviceTotalnum}}</span>
                        </el-form-item>
                      </el-col>
                      <el-col v-if="this.instituType === '1011'" :xs="24" :sm="12" :md="12"
                              :lg="8" :xl="8">
                        <el-form-item label="日服务量(人)："
                                      prop="dayServicenum">
                          <span>{{form.dayServicenum}}</span>
                        </el-form-item>
                      </el-col>
                    </el-col>
                  </el-col>

                  <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                    <el-col :xs="2" :sm="2" :md="2" :lg="2" :xl="2">
                      <h3 class="servesItemTitle">职工</h3>
                    </el-col>
                    <el-col :xs="22" :sm="22" :md="22" :lg="22" :xl="22">
                      <template >
                        <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8"
                                v-for="item in this.workforce_typeOptions">
                          <el-form-item :label="item.dictLabel+'：'" :prop="item.dictValue">
                            <span>{{form.providerPersionVos[item.dictValue]}}</span>
                          </el-form-item>
                        </el-col>
                      </template>
                    </el-col>
                  </el-col>

                  <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                    <el-col :xs="2" :sm="2" :md="2" :lg="2" :xl="2">
                      <h3 class="servesItemTitle">其它</h3>
                    </el-col>
                    <el-col :xs="22" :sm="22" :md="22" :lg="22" :xl="22">
                      <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
                        <el-form-item label="养护比(%)："
                                      prop="curingRatio">
                          <span>{{curingRatio}}</span>
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

    </el-main>
    <div style="position: absolute; top:40px; right: 40px">
        <span @click="closeDetail" style="cursor: pointer">
          <i class="el-icon-close" style="font-size: 26px"></i>
        </span>
    </div>
  </el-container>
</template>

<script>
  import {
    institutionFieldConfig,
    allSelectdictionaryData,
    institutionDetailsData,
    submitDataAdd,
    submitDataEdit
  } from "@/api/facilitiesConfig/pensionAgency";
  import {adaptiveGrid_max, adaptiveGrid_plus} from "@/common/index";
  import InstituField from "@/components/InstituField";
  import Uploadpics from "@/components/Uploadpics";
  import Address from "@/components/Address";
  import {facilityTypeFun,toEditFacilityFun,checkboxRecursive} from "@/common/facilityType";
  import {closeSelectedTag} from "@/utils/rooterJump";
  import {transformNumber,transformNumberLetter} from "@/utils/index";
  import {getEditAuthority} from "@/api/user";
  import {verifyHomePhoneOrMobile, isPositiveIntegerNotMust} from '@/utils/validate';

  let Base64 = require('js-base64').Base64;

  export default {
    components: {InstituField, Address, Uploadpics},
    props: ['id', 'close', 'type'],
    data() {

      return {
        //下拉框字典数据
        house_typeOptions: [],//房屋产权
        set_mode_typeOptions: [],//设置形式
        sys_config_typeOptions: [],//是否有电梯
        open_stateOptions: [],//开放状态
        corp_attrOptions: [],//法人性质
        operate_modeOptions: [],//运营模式
        workforce_typeOptions: [],//职工

        medical: ['临近二、三级医院', '与医疗机构签约'],
        extensionServes: ['提供延展服务'],
        extensionServes_a: ['收住认知症老人', '开展拓展服务', '提供居家上门服务', '提供辅具租赁', '其它'],
        extensionServes_items: false,//提供拓展服务的子选项
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
          orgName: '',//机构名称
          orgType: '',//机构类型
          orgCode: '',//组织机构代码
          establishTime: '',//成立时间
          phone: '',//咨询电话
          houseProperty: '',//房屋产权
          setType: '',//设置形式
          buildArea: '',//建筑面积
          buildFloor: '',//楼层信息
          isLift: '',//是否有电梯
          openState: '',//开放状态
          areaCode: [],//所属居委
          addr: '',//详细地址
          imageInfoVos: [],//机构图片
          //-------运营信息--------
          legalType: '',//法人性质
          opMode: '',//运营模式
          opOrg: '',//运营单位
          opLinkman: '',//运营方负责人
          opPhone: '',//运营方联系方式
          buildLinkman: '',//建设方负责人
          buildPhone: '',//建设方联系方式
          //-----服务能力------
          bedTotal: null,//床位总数量,
          bedUsed: null,//已用床位数量,
          bedUnused: null,//剩余床位数量,
          serviceTotalnum: null,//登记服务总人数,
          dayServicenum: null,//日服务量,
          providerPersionVos: {},//职工的数据+++++=
          //-----服务信息----
          providerItemVos: []
        },

        curingRatio: '',//养护比（页面上计算的值）

        //form 表单的验证规则
        disabled: false, //表单是否可编辑
        activeTabs: 'base',//tab标签切换默认选中name参数
        activeCollapse: ['baseItem_1', 'baseItem_2', 'baseItem_3', 'baseItem_4', 'baseItem_5', 'baseItem_6'],//折叠面板默认打开name参数
        areaCodeOptions: [],//行政区域树节点数据
        defaultProps: {
          children: 'children',
          label: 'areaName',
          value: 'areaCode',
        },
        //自适应
        adaptiveGrid: {
          md: adaptiveGrid_max.md,
          lg: adaptiveGrid_max.lg
        },
        //自适应
        adaptiveGrid_plus: {
          md: adaptiveGrid_plus.md,
          lg: adaptiveGrid_plus.lg
        },
        lazy: true,//懒加载
        flag: null,//用来判断是表格添加时还是编辑时
        areaCode: [],//所属居委全部ID
        areaCodeBackup: [],//所属居委全部ID--备份
        modelType: '',//查看：look  编辑：edit  新增：add
        instituType: '',//机构类型
        serviceMsgObj: [],//服务信息表单单选框和复选框选中的值
        workMsgObj: [],//职工人员信息
        imageInfoVosLookUrl:[],//查看时的图片路径
        editAuthority:false,//编辑按钮的权限
      }
    },
    //在模板渲染成html后调用，通常是初始化页面完成后，再对html的dom节点进行一些需要的操作。
    mounted() {
      // 1011:长者照顾,  1010:养老机构
      this.instituType = this.type;
      this.modelType = 'look'
      //当前机构id
      let _userId_ = this.id;
      // this.form.orgType = this.$route.query.instituType;
      this.getData(_userId_);

      if(this.modelType === 'look'){
        /*编辑按钮的权限控制*/
        getEditAuthority(this.$route.meta.id).then(response => {
          response.forEach((item)=>{
            if(item.menuName === '编辑'){
              this.editAuthority = item.visible === '0'?true:false;
            }
          });
        }).catch(() => {
          this.$message.error('获取编辑按钮的权限控制失败！');
        });
      }
    },
    methods: {
      closeDetail() {
        this.close()
      },
      // 获取图片数据
      getPicList(val) {
        this.form.imageInfoVos = val
      },
      // 异步事件同步化
      async getData(id) {
        await this.getSelect();
        if (this.modelType === 'edit') {
          this.isEditForm = true;
          await this.editGetData(id, 'edit');
        }
        else if (this.modelType === 'add') {
          //获取机构类型的字段配置
          institutionFieldConfig(this.instituType).then(response => {
            this.institutionField = response.data['2'];
          }).catch(() => {
            this.$message.error('操作失败！');
          });
          this.isEditForm = true;
          this.idEdit = false;
        }
        else if (this.modelType === 'look') {
          this.isEditForm = false;
          await this.editGetData(id, '');
        }
      },
      // 编辑-查看 获取机构数据
      editGetData(id, st) {
        return new Promise((resolve, reject) => {
          //请求当前机构信息
          institutionDetailsData(id, st).then(response => {
            //页面form表单的值
            this.form = response.data;
            //页面服务信息的表单值
            this.institutionField = response.data.serviceProviderConfigVoList['2'];
            //职工---赋值数量
            let providerPersionVosArr = {};
            response.data.providerPersionVos.forEach((item) => {
              providerPersionVosArr[item.persionType] = item.num;
            });
            //职工---赋值id
            response.data.providerPersionVos.forEach((item) => {
              this.workMsgObj.forEach((item_a) => {
                if (item.persionType === item_a.persionType) {
                  item_a.id = item.id;
                }
              });
            });
            this.form.providerPersionVos = {};
            this.form.providerPersionVos = providerPersionVosArr;

            //处理区域的code,用以渲染区域下拉组件
            if (st === 'edit') {
              this.form.areaCode = this.form.areaCode.split(',');
            }

            this.form.imageInfoVos.forEach((item)=>{
              this.imageInfoVosLookUrl.push(`${process.env.VUE_APP_API_IMGURL}${item.imgUrl}`);
            });

            this.idEdit = false;
            //计算养护比
            this.curingRatioCalculate();
          }).catch(() => {
            this.$message.error("获取机构信息失败！");
          });
        })
      },
      // 获取下拉字典
      getSelect() {
        return new Promise((resolve, reject) => {
          //数据字典接口
          // 1011:长者照顾,  1010:养老机构
          let dicKey = '';
          if(this.instituType === '1011'){
            dicKey = 'house_type,set_mode_type,sys_Yes_No,open_state,corp_attr_2,operate_mode,workforce_type';
          }
          else {
            dicKey = 'house_type,set_mode_type,sys_Yes_No,open_state,corp_attr,operate_mode,workforce_type';
          }

          allSelectdictionaryData(dicKey).then(response => {
            if (response.code === 0) {
              for (let k in response.data) {
                switch (k) {
                  //房屋产权
                  case 'house_type':
                    this.house_typeOptions = response.data[k];
                    break;
                  //设置形式
                  case 'set_mode_type':
                    this.set_mode_typeOptions = response.data[k];
                    break;
                  //是否有电梯
                  case 'sys_Yes_No':
                    this.sys_config_typeOptions = response.data[k];
                    break;
                  //开放状态
                  case 'open_state':
                    this.open_stateOptions = response.data[k];
                    break;
                  //法人性质(养老机构)
                  case 'corp_attr':
                  //法人性质(长者照顾之家)
                  case 'corp_attr_2':
                    this.corp_attrOptions = response.data[k];
                    break;
                  //运营模式
                  case 'operate_mode':
                    this.operate_modeOptions = response.data[k];
                    break;
                  //职工信息
                  case 'workforce_type':
                    this.workforce_typeOptions = response.data[k];
                    this.workforce_typeOptions.forEach((item) => {
                      let obj = {
                        orgType: this.instituType,//机构类型
                        persionType: item.dictValue,//职工类型
                        num: '',//职工数量
                        orgId: this.$route.query.id || '',//机构id
                        id: '',//职工id
                      };
                      this.workMsgObj.push(obj);
                    });
                    break;
                }
              }
            }
            else {
              this.$message.error('数据字典接口请求失败！');
            }
            resolve()
          }).catch(() => {
            this.$message.error('操作失败！');
            reject()
          });
        });
      },
      //获取服务信息表单的值
      getServiceCheckboxValue() {
        this.serviceMsgObj = [];
        this.serviceMsgObj = checkboxRecursive(this.institutionField,this,this.serviceMsgObj);
        this.serviceMsgObj = [...new Set(this.serviceMsgObj)];
      },
      //取消按钮
      cancelDetailsPage(){
        this.$confirm("该页面的信息尚未保存，确定要关闭页面吗","提示",{
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          closeOnClickModal:false
        }).then(() => {
          this.closeDetailsPage();
        }).catch(() => {
        });
      },
      //返回按钮，关闭详情页
      closeDetailsPage() {
        //关闭页面
        closeSelectedTag(this,this.$route);
        this.$router.push({path: '/facilitiesConfig/pensionAgency'});
      },
      //下一步
      tabsStep(tabsName) {
        this.activeTabs = tabsName;
      },
      // 获取所属居委
      getAreaCode_reg(val) {
        this.areaCode = val;
      },
      //计算养护比的值
      curingRatioCalculate() {
        if (parseInt(this.form.providerPersionVos.nurse) > 0 && parseInt(this.form.bedTotal) >= 0) {
          this.curingRatio = parseFloat(parseInt(this.form.providerPersionVos.nurse) / parseInt(this.form.bedTotal) * 100).toFixed(2);
        }
        else {
          this.curingRatio = '0';
        }
      },
      //只能输入数字类型
      transformNumber(value,obj){
        this.form[obj] = transformNumber(value);
      },
      //只能输入数字类型和字母类型
      transformNumberLetter(value,obj){
        this.form[obj] = transformNumberLetter(value);
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
