<!--综合为老服务中心-->
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
							         :rules="this.isEditForm?rulesForm:null" label-width="140px">
								<el-row :gutter="0">
									<el-col :md="this.adaptiveGrid.md" :lg="this.adaptiveGrid.lg">
										<el-form-item :label="this.isEditForm?'机构名称':'机构名称：'" prop="orgName">
											<el-input v-if="this.isEditForm" ref="orgName" v-model="form.orgName" @keyup.enter.native="editContent('form_base')"
											          :disabled="disabled" clearable placeholder="请输入机构名称"></el-input>
											<span v-else>{{form.orgName}}</span>
										</el-form-item>
									</el-col>
									<el-col :md="this.adaptiveGrid.md" :lg="this.adaptiveGrid.lg">
										<el-form-item :label="this.isEditForm?'机构类型':'机构类型：'" prop="orgTypeName">
											<el-select v-if="this.isEditForm" v-model="form.orgType" placeholder="请选择机构类型" @keyup.enter.native="editContent('form_base')"
											           clearable style="width:100%;" @change="changeOrgTypeName">
												<el-option label="综合为老服务中心" name="2011" value="2011"></el-option>
												<el-option label="邻里汇" name="2012" value="2012"></el-option>
											</el-select>
											<span v-else>{{orgTypeName}}</span>
										</el-form-item>
									</el-col>
									<el-col :md="this.adaptiveGrid.md" :lg="this.adaptiveGrid.lg">
										<el-form-item :label="this.isEditForm?'成立时间':'成立时间：'" prop="establishTime">
											<el-date-picker v-if="this.isEditForm" v-model="form.establishTime" @keyup.enter.native="editContent('form_base')"
											                type="date"
											                placeholder="请选择成立时间" style="width:100%;"
											                format="yyyy年MM月dd日"
											                value-format="yyyy-MM-dd"></el-date-picker>
											<span v-else>{{form.establishTime}}</span>
										</el-form-item>
									</el-col>
									<el-col :md="this.adaptiveGrid.md" :lg="this.adaptiveGrid.lg">
										<el-form-item :label="this.isEditForm?'咨询电话':'咨询电话：'" prop="phone">
											<el-input v-if="this.isEditForm" ref="phone" v-model="form.phone" @keyup.enter.native="editContent('form_base')"
											          :disabled="disabled" clearable placeholder="请输入咨询电话"></el-input>
											<span v-else>{{form.phone}}</span>
										</el-form-item>
									</el-col>
									<el-col :md="this.adaptiveGrid.md" :lg="this.adaptiveGrid.lg">
										<el-form-item :label="this.isEditForm?'房屋产权':'房屋产权：'" prop="houseProperty">
											<el-select v-if="this.isEditForm" v-model="form.houseProperty" @keyup.enter.native="editContent('form_base')"
											           placeholder="请选择房屋产权" clearable style="width:100%;">
												<el-option v-if="house_typeOptions.length !== 0"
												           v-for="item in house_typeOptions" :key="item.dictValue"
												           :label="item.dictLabel" :value="item.dictValue"></el-option>
											</el-select>
											<span v-else>{{form.houseProperty}}</span>
										</el-form-item>
									</el-col>
									<el-col :md="this.adaptiveGrid.md" :lg="this.adaptiveGrid.lg">
										<el-form-item :label="this.isEditForm?'设置形式':'设置形式：'" prop="setType">
											<el-select v-if="this.isEditForm" v-model="form.setType" @keyup.enter.native="editContent('form_base')"
											           placeholder="请选择设置形式" clearable style="width:100%;">
												<el-option v-if="set_mode_typeOptions.length !== 0"
												           v-for="item in set_mode_typeOptions" :key="item.dictValue"
												           :label="item.dictLabel" :value="item.dictValue"></el-option>
											</el-select>
											<span v-else>{{form.setType}}</span>
										</el-form-item>
									</el-col>
									<el-col :md="this.adaptiveGrid.md" :lg="this.adaptiveGrid.lg">
										<el-form-item :label="this.isEditForm?'建筑面积(m²)':'建筑面积(m²)：'" prop="buildArea">
											<el-input type="text" v-if="this.isEditForm" ref="buildArea" v-model="form.buildArea" @keyup.enter.native="editContent('form_base')" @keyup.native="transformNumber(form.buildArea,'buildArea')"
											          :disabled="disabled" clearable placeholder="请输入建筑面积"></el-input>
											<span v-else>{{form.buildArea}}</span>
										</el-form-item>
									</el-col>
									<el-col :md="this.adaptiveGrid.md" :lg="this.adaptiveGrid.lg">
										<el-form-item :label="this.isEditForm?'楼层信息(层)':'楼层信息(层)：'" prop="buildFloor">
											<el-input v-if="this.isEditForm" ref="buildFloor" v-model="form.buildFloor" @keyup.enter.native="editContent('form_base')" @keyup.native="transformNumber(form.buildFloor,'buildFloor')"
											          :disabled="disabled" clearable placeholder="请输入楼层信息"></el-input>
											<span v-else>{{form.buildFloor}}</span>
										</el-form-item>
									</el-col>
									<el-col :md="this.adaptiveGrid.md" :lg="this.adaptiveGrid.lg">
										<el-form-item :label="this.isEditForm?'是否有电梯':'是否有电梯：'" prop="isLift">
											<el-select v-if="this.isEditForm" v-model="form.isLift" @keyup.enter.native="editContent('form_base')"
											           placeholder="请选择是否有电梯" clearable style="width:100%;">
												<el-option v-if="sys_config_typeOptions.length !== 0"
												           v-for="item in sys_config_typeOptions" :key="item.dictValue"
												           :label="item.dictLabel" :value="item.dictValue"></el-option>
											</el-select>
											<span v-else>{{form.isLift}}</span>
										</el-form-item>
									</el-col>
									<el-col :md="this.adaptiveGrid.md" :lg="this.adaptiveGrid.lg">
										<el-form-item :label="this.isEditForm?'开放状态':'开放状态：'" prop="openState">
											<el-select v-if="this.isEditForm" v-model="form.openState" @keyup.enter.native="editContent('form_base')"
											           placeholder="请选择开放状态" clearable style="width:100%;">
												<el-option v-if="open_stateOptions.length !== 0"
												           v-for="item in open_stateOptions" :key="item.dictValue"
												           :label="item.dictLabel" :value="item.dictValue"></el-option>
											</el-select>
											<span v-else>{{form.openState}}</span>
										</el-form-item>
									</el-col>
									<el-col :md="this.adaptiveGrid.md" :lg="this.adaptiveGrid.lg">
										<el-form-item :label="this.isEditForm?'所属居委':'所属居委：'" prop="areaCode">
											<Address v-if="this.isEditForm" :id-edit="idEdit" :area-code="areaCode" @keyup.enter.native="editContent('form_base')"
											         :form-code="form.areaCode" @getAreaCode="getAreaCode_reg"
											         :width="'100%'"></Address>
											<span v-else>{{form.areaCodeStr}}</span>
										</el-form-item>
									</el-col>
									<el-col :md="this.adaptiveGrid.md" :lg="this.adaptiveGrid.lg">
										<el-form-item :label="this.isEditForm?'详细地址':'详细地址：'" prop="addr">
											<el-input v-if="this.isEditForm" ref="addr" v-model="form.addr" @keyup.enter.native="editContent('form_base')"
											          :disabled="disabled" clearable placeholder="请输入详细地址"></el-input>
											<span v-else>{{form.addr}}</span>
										</el-form-item>
									</el-col>
									<el-col :md="24" :lg="24" style="height: auto;">
										<el-form-item :label="this.isEditForm?'机构图片':'机构图片：'">
											<el-row v-if="!this.isEditForm" class="agencyImageRow">
												<el-col class="agencyImageCol" v-for="(item,index) in this.imageInfoVosLookUrl">
													<img :src="item" class="agencyImage"/>
												</el-col>
											</el-row>
											<div v-else class="agencyImageWrap">
												<Uploadpics @pics="getPicList" :id-edit="idEdit" :form-imgs="form.imageInfoVos"></Uploadpics>
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
										<i class="titleTip"></i>运营信息
									</span>
								</div>
							</template>
							<el-form ref="form_operate" key="form_operate" :model="form"
							         :rules="this.isEditForm?rulesForm:null" label-width="140px">
								<el-row :gutter="0">
									<el-col :md="this.adaptiveGrid.md" :lg="this.adaptiveGrid.lg">
										<el-form-item :label="this.isEditForm?'法人性质':'法人性质：'" prop="legalType">
											<el-select v-if="this.isEditForm" v-model="form.legalType" @keyup.enter.native="editContent('form_base')"
											           placeholder="请选择法人性质" clearable style="width:100%;">
												<el-option v-if="corp_attrOptions.length !== 0"
												           v-for="item in corp_attrOptions" :key="item.dictValue"
												           :label="item.dictLabel" :value="item.dictValue"></el-option>
											</el-select>
											<span v-else>{{form.legalType}}</span>
										</el-form-item>
									</el-col>
									<el-col :md="this.adaptiveGrid.md" :lg="this.adaptiveGrid.lg">
										<el-form-item :label="this.isEditForm?'运营模式':'运营模式：'" prop="opMode">
											<el-select v-if="this.isEditForm" v-model="form.opMode" @keyup.enter.native="editContent('form_base')"
											           placeholder="请选择运营模式" clearable style="width:100%;">
												<el-option v-if="operate_modeOptions.length !== 0"
												           v-for="item in operate_modeOptions" :key="item.dictValue"
												           :label="item.dictLabel" :value="item.dictValue"></el-option>
											</el-select>
											<span v-else>{{form.opMode}}</span>
										</el-form-item>
									</el-col>
									<el-col :md="this.adaptiveGrid.md" :lg="this.adaptiveGrid.lg">
										<el-form-item :label="this.isEditForm?'运营单位':'运营单位：'" prop="opOrg">
											<el-input v-if="this.isEditForm" ref="opOrg" v-model="form.opOrg" @keyup.enter.native="editContent('form_base')"
											          :disabled="disabled" clearable placeholder="请输入运营单位"></el-input>
											<span v-else>{{form.opOrg}}</span>
										</el-form-item>
									</el-col>
									<el-col :md="this.adaptiveGrid.md" :lg="this.adaptiveGrid.lg">
										<el-form-item :label="this.isEditForm?'运营方负责人':'运营方负责人：'" prop="opLinkman">
											<el-input v-if="this.isEditForm" ref="opLinkman" v-model="form.opLinkman" @keyup.enter.native="editContent('form_base')"
											          :disabled="disabled" clearable placeholder="请输入运营方负责人"></el-input>
											<span v-else>{{form.opLinkman}}</span>
										</el-form-item>
									</el-col>
									<el-col :md="this.adaptiveGrid.md" :lg="this.adaptiveGrid.lg">
										<el-form-item :label="this.isEditForm?'运营方联系方式':'运营方联系方式：'" prop="opPhone">
											<el-input v-if="this.isEditForm" ref="opPhone" v-model="form.opPhone" @keyup.enter.native="editContent('form_base')"
											          :disabled="disabled" clearable
											          placeholder="请输入运营方联系方式"></el-input>
											<span v-else>{{form.opPhone}}</span>
										</el-form-item>
									</el-col>
									<el-col :md="this.adaptiveGrid.md" :lg="this.adaptiveGrid.lg">
										<el-form-item :label="this.isEditForm?'建设方负责人':'建设方负责人：'" prop="buildLinkman">
											<el-input v-if="this.isEditForm" ref="buildLinkman" @keyup.enter.native="editContent('form_base')"
											          v-model="form.buildLinkman" :disabled="disabled" clearable
											          placeholder="请输入建设方负责人"></el-input>
											<span v-else>{{form.buildLinkman}}</span>
										</el-form-item>
									</el-col>
									<el-col :md="this.adaptiveGrid.md" :lg="this.adaptiveGrid.lg">
										<el-form-item :label="this.isEditForm?'建设方联系方式':'建设方联系方式：'" prop="buildPhone">
											<el-input v-if="this.isEditForm" ref="buildPhone" v-model="form.buildPhone" @keyup.enter.native="editContent('form_base')" @keyup.native="transformNumber(form.buildPhone,'buildPhone')"
											          :disabled="disabled" clearable
											          placeholder="请输入建设方联系方式"></el-input>
											<span v-else>{{form.buildPhone}}</span>
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

						<!--享受政策 start-->
						<template v-for="(item, index) in this.privilegeField">
							<InstituField :currentItem="item" :index="index+2" :modelType="modelType"></InstituField>
						</template>
						<!--享受政策 end-->

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
		institutionDetailsData,
		submitDataAdd,
		submitDataEdit
	} from "@/api/facilitiesConfig/serviceFacilities";
	import {institutionFieldConfig,allSelectdictionaryData,} from "@/api/facilitiesConfig/communityFacilities";
	import {adaptiveGrid_max, adaptiveGrid_plus} from "@/common/index";
	import InstituField from "@/components/InstituField";
	import Uploadpics from "@/components/Uploadpics";
	import Address from "@/components/Address";
	import {facilityTypeFun,checkboxRecursive} from "@/common/facilityType";
	import {closeSelectedTag} from "@/utils/rooterJump";
	import {transformNumber,transformNumberLetter} from "@/utils/index";
	import {getEditAuthority} from "@/api/user";
	import {verifyHomePhoneOrMobile, isPositiveIntegerNotMust} from '@/utils/validate';

	export default {
		components: {InstituField, Address, Uploadpics},
    props: ['id', 'close', 'type'],
		data() {
			//校验机构名称
			let verifyFullName = (rule, value, callback) => {
				if (value.length === 0) {
					callback(new Error('机构名称不能为空，请输入！'));
				}
				else {
					if (/\s/.test(value)) {
						callback(new Error('姓名不能包含空格，请重新输入！'));
					}
					else {
						if (value.length >= 100) {
							callback(new Error('机构名称长度不能超过100个汉字，请重新输入！'));
						}
						else {
							callback();
						}
					}
				}
			};

			//校验所属居委
			let verifyAreaCode = (rule, value, callback) => {
				if (this.areaCode.length === 0 || this.areaCode[0] === '') {
					callback(new Error('所属居委不能为空，请选择！'));
				}
				else {
					callback();
				}
			};
			//校验详细地址
			let verifyAddr = (rule, value, callback) => {
				if (value.length === 0) {
					callback(new Error('详细地址不能为空，请选择！'));
				}
				else {
					if (value.length > 100) {
						callback(new Error('详细地址长度不能超过100，请重新输入！'));
					}
					else {
						callback();
					}
				}
			};

			return {
				//下拉框字典数据
				house_typeOptions: [],//房屋产权
				set_mode_typeOptions: [],//设置形式
				sys_config_typeOptions: [],//是否有电梯
				open_stateOptions: [],//开放状态
				corp_attrOptions: [],//法人性质
				operate_modeOptions: [],//运营模式

				isEditForm: true,//页面表单是否可编辑操作。查看时：false,编辑-新增时：true
				idEdit: true,//区域级联下拉框是编辑时还是新增时。编辑时：false,新增时：true

				//机构类型的字段配置
				institutionField: [
					{children: []},
					{children: []},
					{children: []}
				],

				//享受政策的字段配置
				privilegeField: [
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
				},

				orgTypeName:'',//机构类型汉字注释
				curingRatio: '',//养护比（页面上计算的值）

				//form 表单的验证规则
				rulesForm: {
					//机构名称
					orgName: [
						{required: true, trigger: 'blur', validator: verifyFullName},
					],
					//咨询电话
					phone: [
						{required: true, trigger: 'blur', message: '咨询电话不能为空'},
						{required: true, trigger: 'change', validator: verifyHomePhoneOrMobile},
						{required: true, trigger: 'blur', validator: verifyHomePhoneOrMobile},
					],
					//所属居委
					areaCode: [
						{required: true, trigger: 'change', validator: verifyAreaCode},
					],
					//详细地址
					addr: [
						{required: true, trigger: 'blur', validator: verifyAddr},
					],
					//运营方联系方式
					opPhone:[
						{trigger: 'change', validator: verifyHomePhoneOrMobile}
					],
					//建设方联系方式
					buildPhone:[
						{trigger: 'change', validator: verifyHomePhoneOrMobile},
					]
				},
				disabled: false, //表单是否可编辑
				activeTabs: 'base',//tab标签切换默认选中name参数
				activeCollapse: ['baseItem_1', 'baseItem_2', 'baseItem_3', 'baseItem_4', 'baseItem_5',],//折叠面板默认打开name参数
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
      this.instituType = this.type;
      this.modelType = 'look'
      //当前机构id
      let _userId_ = this.id;
      this.form.orgType = this.type;
      this.orgTypeName = facilityTypeFun(this.form.orgType);
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
						this.privilegeField = response.data['3'];
					}).catch(() => {
						this.$message.error(this.orgTypeName+'机构获取服务信息失败！');
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
						//享受政策的表单值
						this.privilegeField = response.data.serviceProviderConfigVoList['3'];
						//处理区域的code,用以渲染区域下拉组件
						if (st === 'edit') {
							this.form.areaCode = this.form.areaCode.split(',');
						}
						this.form.imageInfoVos.forEach((item)=>{
							this.imageInfoVosLookUrl.push(`${process.env.VUE_APP_API_IMGURL}${item.imgUrl}`);
						});
						this.idEdit = false;
					}).catch(() => {
						this.$message.error("获取‘"+this.orgTypeName+"’机构信息失败！");
					});
				})
			},
			// 获取下拉字典
			getSelect() {
				return new Promise((resolve, reject) => {
					//数据字典接口
					let dicKey = 'house_type,set_mode_type,sys_Yes_No,open_state,corp_attr_2,operate_mode';
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
									//法人性质
									case 'corp_attr_2':
										this.corp_attrOptions = response.data[k];
										break;
									//运营模式
									case 'operate_mode':
										this.operate_modeOptions = response.data[k];
										break;
								}
							}
						}
						else {
							this.$message.error(this.orgTypeName+'机构数据字典接口请求失败！');
						}
						resolve()
					}).catch(() => {
						this.$message.error(this.orgTypeName+'机构数据字典接口请求失败！');
						reject()
					});
				});
			},
			//获取服务信息表单的值
			getServiceCheckboxValue() {
				this.serviceMsgObj = [];
				this.serviceMsgObj = checkboxRecursive(this.institutionField,this,this.serviceMsgObj);
				this.serviceMsgObj = checkboxRecursive(this.privilegeField,this,this.serviceMsgObj);
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
			//取消，返回按钮，关闭详情页
			closeDetailsPage() {
				//关闭页面
				closeSelectedTag(this,this.$route);
				this.$router.push({path: '/facilitiesConfig/communityFacilities'});
			},
			//下一步
			tabsStep(tabsName) {
				this.activeTabs = tabsName;
			},
			//确定按钮-提交表单
			editContent(formName) {
				//运营单位
				if(this.form.opOrg && this.form.opOrg.length > 50){
					return this.$message.error("运营单位长度不能超过50，请重新输入！");
				}
				//运营方负责人
				if(this.form.opLinkman && this.form.opLinkman.length > 50){
					return this.$message.error("运营方负责人长度不能超过50，请重新输入！");
				}
				//运营方联系方式
				if(this.form.opPhone && this.form.opPhone.length > 20){
					return this.$message.error("运营方联系方式长度不能超过20，请重新输入！");
				}
				//建设方负责人
				if(this.form.buildLinkman && this.form.buildLinkman.length > 50){
					return this.$message.error("建设方负责人长度不能超过50，请重新输入！");
				}
				//建设方联系方式
				if(this.form.buildPhone && this.form.buildPhone.length > 50){
					return this.$message.error("建设方联系方式长度不能超过50，请重新输入！");
				}
				this.$refs[formName].validate((valid, object) => {
					if (valid) {
						let params = this.form;
						//params.areaCode = this.areaCode.pop() || '';
						params.areaCode = this.areaCode.length === 0 ? '':this.areaCode[this.areaCode.length - 1]+'';
						//处理服务信息字段
						this.getServiceCheckboxValue();
						params.providerItemVos = this.serviceMsgObj;
						//服务信息字典结构，编辑提交的时候不传
						params.serviceProviderConfigVoList = null;
						//新增
						if (this.modelType === 'add') {
							submitDataAdd(params).then(response => {
								if (response.code === 0) {
									this.$message({
										type: 'success',
										message: "新增‘"+this.orgTypeName+"’机构信息成功!"
									});
									//关闭页面
									this.closeDetailsPage();
								}
								else {
									this.$message.error(response.msg);
								}
							}).catch(() => {
								this.$message.error("新增‘"+this.orgTypeName+"’机构信息失败!");
							});
						}
						//编辑
						else if (this.modelType === 'edit') {
							submitDataEdit(params).then(response => {
								if (response.code === 0) {
									this.$message({
										type: 'success',
										message: "编辑机构信息成功!"
									});
									//关闭页面
									this.closeDetailsPage();
								}
								else {
									this.$message.error(response.msg);
								}
							}).catch(() => {
								this.$message.error("编辑‘"+this.orgTypeName+"’机构信息失败!");
							});
						}
						//查看
						else if (this.modelType === 'look') {
							this.closeDetailsPage();
						}

					}
					else {
						this.activeTabs = 'base';
						window.scrollTo(0, 0);
						return false;
					}
				});
			},
			// 获取所属居委
			getAreaCode_reg(val) {
				this.areaCode = val;
			},
			//只能输入数字类型
			transformNumber(value,obj){
				this.form[obj] = transformNumber(value);
			},
			//只能输入数字类型和字母类型
			transformNumberLetter(value,obj){
				this.form[obj] = transformNumberLetter(value);
			},
			//选择机构类型
			changeOrgTypeName(v){
			},
			//查看详情页面，点击编辑按钮
			toEditType() {
				let _orgType_ = this.instituType;
				let _id_ = this.$route.query.id;
				this.$router.push({
					path: `/communityFacilities/comprehensiveDetails/${_id_}`,
					query: {'id': _id_, 'modelType': 'edit', 'instituType': _orgType_,'_title': `编辑${this.form.orgName}`}
				});
			},
		}
	}
</script>

<style scoped>
	@import "~@/styles/form.css";
	.tableContainer{
		margin-top: 20px;
	}
</style>
