<!--社区养老组织-->
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
											<el-input v-if="this.isEditForm" ref="orgTypeName" v-model="orgTypeName" @keyup.enter.native="editContent('form_base')"
											          disabled clearable placeholder=""></el-input>
											<span v-else>{{orgTypeName}}</span>
										</el-form-item>
									</el-col>
									<el-col :md="this.adaptiveGrid.md" :lg="this.adaptiveGrid.lg">
										<el-form-item :label="this.isEditForm?'机构编码':'机构编码：'" prop="orgCode">
											<el-input v-if="this.isEditForm" ref="orgCode" v-model="form.orgCode" @keyup.enter.native="editContent('form_base')" @keyup.native="transformNumberLetter(form.orgCode,'orgCode')"
											          :disabled="disabled" clearable placeholder="请输入机构编码"></el-input>
											<span v-else>{{form.orgCode}}</span>
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
										<el-form-item :label="this.isEditForm?'注册行政区划':'注册行政区划：'" prop="regArea">
											<Address v-if="this.isEditForm" :id-edit="idEdit" :area-code="regArea" @keyup.enter.native="editContent('form_base')"
											         :form-code="form.regArea" @getAreaCode="getAreaCode_reg_zhuce"
											         :width="'100%'" :scope="'All'"></Address>
											<span v-else>{{form.regAreaStr}}</span>
										</el-form-item>
									</el-col>
									<el-col :md="this.adaptiveGrid.md" :lg="this.adaptiveGrid.lg">
										<el-form-item :label="this.isEditForm?'注册详细地址':'注册详细地址：'" prop="regAddr">
											<el-input v-if="this.isEditForm" ref="regAddr" v-model="form.regAddr" @keyup.enter.native="editContent('form_base')"
											          :disabled="disabled" clearable placeholder="请输入详细地址"></el-input>
											<span v-else>{{form.regAddr}}</span>
										</el-form-item>
									</el-col>
									<el-col :md="this.adaptiveGrid.md" :lg="this.adaptiveGrid.lg">
										<el-form-item :label="this.isEditForm?'办公行政区划':'办公行政区划：'" prop="officeArea">
											<Address v-if="this.isEditForm" :id-edit="idEdit" :area-code="officeArea" @keyup.enter.native="editContent('form_base')"
											         :form-code="form.officeArea" @getAreaCode="getAreaCode_reg_bangong"
											         :width="'100%'"></Address>
											<span v-else>{{form.officeAreaStr}}</span>
										</el-form-item>
									</el-col>
									<el-col :md="this.adaptiveGrid.md" :lg="this.adaptiveGrid.lg">
										<el-form-item :label="this.isEditForm?'办公详细地址':'办公详细地址：'" prop="officeAddr">
											<el-input v-if="this.isEditForm" ref="officeAddr" v-model="form.officeAddr" @keyup.enter.native="editContent('form_base')"
											          :disabled="disabled" clearable placeholder="请输入详细地址"></el-input>
											<span v-else>{{form.officeAddr}}</span>
										</el-form-item>
									</el-col>
                  <el-col :md="this.adaptiveGrid.md" :lg="this.adaptiveGrid.lg">
                    <el-form-item :label="this.isEditForm?'':'经度：'" prop="openState">
                      <span v-if="!this.isEditForm">{{form.longitude}}</span>
                    </el-form-item>
                  </el-col>
                  <el-col :md="this.adaptiveGrid.md" :lg="this.adaptiveGrid.lg">
                    <el-form-item :label="this.isEditForm?'':'纬度：'" prop="openState">
                      <span v-if="!this.isEditForm">{{form.latitude}}</span>
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
											<el-input v-if="this.isEditForm" ref="opPhone" v-model="form.opPhone" @keyup.enter.native="editContent('form_base')" @keyup.native="transformNumber(form.opPhone,'opPhone')"
											          :disabled="disabled" clearable
											          placeholder="请输入运营方联系方式"></el-input>
											<span v-else>{{form.opPhone}}</span>
										</el-form-item>
									</el-col>
									<el-col :md="this.adaptiveGrid.md" :lg="this.adaptiveGrid.lg">
										<el-form-item :label="this.isEditForm?'机构负责人':'机构负责人：'" prop="orgHead">
											<el-input v-if="this.isEditForm" ref="orgHead" v-model="form.orgHead" @keyup.enter.native="editContent('form_base')"
											          :disabled="disabled" clearable
											          placeholder="请输入机构负责人"></el-input>
											<span v-else>{{form.orgHead}}</span>
										</el-form-item>
									</el-col>
									<el-col :md="this.adaptiveGrid.md" :lg="this.adaptiveGrid.lg">
										<el-form-item :label="this.isEditForm?'机构负责人联系方式':'机构负责人联系方式：'" prop="orgHeadLinkman">
											<el-input v-if="this.isEditForm" ref="orgHeadLinkman" v-model="form.orgHeadLinkman" @keyup.enter.native="editContent('form_base')"
											          :disabled="disabled" clearable
											          placeholder="请输入机构负责人联系方式"></el-input>
											<span v-else>{{form.orgHeadLinkman}}</span>
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
						<el-collapse-item name="baseItem_6">
							<template slot="title">
								<div class="titleSlider">
									<span>
										<i class="titleTip"></i>服务能力
									</span>
								</div>
							</template>
							<el-form ref="form_subsidy" key="form_subsidy" :model="form"
							         :rules="this.isEditForm?rulesForm:null" label-width="200px">
								<el-row :gutter="0">

									<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
										<el-col :xs="2" :sm="2" :md="2" :lg="2" :xl="2">
											<h3 class="servesItemTitle">服务人数</h3>
										</el-col>
										<el-col :xs="22" :sm="22" :md="22" :lg="22" :xl="22">
											<template v-if="this.isEditForm">
												<el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8" v-for="item in this.service_numOptions">
													<el-form-item :label="item.dictLabel" :prop="item.dictValue">
														<el-input
																v-if="item.dictValue === 'service_sum'"
																@change="curingRatioCalculate"
																:ref="item.dictValue"
																v-model.number="form.providerPersionVos[item.dictValue]"
																:disabled="disabled"
																clearable
																:placeholder="'请输入'+item.dictLabel"
																@keyup.enter.native="editContent('form_base')"
														></el-input>
														<el-input
																v-else
																:ref="item.dictValue"
																v-model.number="form.providerPersionVos[item.dictValue]"
																:disabled="disabled"
																clearable
																:placeholder="'请输入'+item.dictLabel"
																@keyup.enter.native="editContent('form_base')"
														></el-input>
													</el-form-item>
												</el-col>
											</template>
											<template v-else>
												<el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8" v-for="item in this.service_numOptions">
													<el-form-item :label="item.dictLabel+'：'" :prop="item.dictValue">
														<span>{{form.providerPersionVos[item.dictValue]}}</span>
													</el-form-item>
												</el-col>
											</template>
										</el-col>
									</el-col>

									<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
										<el-col :xs="2" :sm="2" :md="2" :lg="2" :xl="2">
											<h3 class="servesItemTitle">职工</h3>
										</el-col>
										<el-col :xs="22" :sm="22" :md="22" :lg="22" :xl="22">
											<template v-if="this.isEditForm">
												<el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8" v-for="item in this.workforce_typeOptions">
													<el-form-item :label="item.dictLabel" :prop="item.dictValue">
														<el-input
																v-if="item.dictValue === 'nurse'"
																@change="curingRatioCalculate"
																:ref="item.dictValue"
															  	oninput="value=value.replace(/[^\d]/g,'')"
																v-model.number="form.providerPersionVos[item.dictValue]"
																:disabled="disabled"
																clearable
																:placeholder="'请输入'+item.dictLabel"
																@keyup.enter.native="editContent('form_base')"
														></el-input>
														<el-input
																v-else
																:ref="item.dictValue"
																v-model.number="form.providerPersionVos[item.dictValue]"
																:disabled="disabled"
																clearable
															  	oninput="value=value.replace(/[^\d]/g,'')"
																:placeholder="'请输入'+item.dictLabel"
																@keyup.enter.native="editContent('form_base')"
														></el-input>
													</el-form-item>
												</el-col>
											</template>
											<template v-else>
												<el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8" v-for="item in this.workforce_typeOptions">
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
												<el-form-item :label="this.isEditForm?'养护比(%)':'养护比(%)：'"
												              prop="curingRatio">
													<el-input v-if="this.isEditForm" ref="curingRatio"
													          v-model="curingRatio" disabled clearable
													          placeholder=""></el-input>
													<span v-else>{{curingRatio}}</span>
												</el-form-item>
											</el-col>
										</el-col>
									</el-col>
								</el-row>
							</el-form>
						</el-collapse-item>
						<!--服务能力item end-->

						<!--享受政策 start-->
						<template v-for="(item, index) in this.privilegeField">
							<InstituField :currentItem="item" :index="index+4" :modelType="modelType"></InstituField>
						</template>
						<!--享受政策 end-->

					</el-collapse>
				</el-tab-pane>
				<!--扩展信息tabs end-->
			</el-tabs>

			<!--新增时,编辑时-->
			<el-footer v-if="this.modelType === 'add' || this.modelType === 'edit'">
				<div v-if="this.activeTabs === 'base'">
					<el-button type="warning" class="base-btn btnMarginLeft15" @click="tabsStep('service')">下一步</el-button>
					<el-button class="cancel-btn btnMarginLeft15" @click="cancelDetailsPage">取消</el-button>
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
	import _ from 'lodash';
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
	import {transformNumber,transformNumberLetter,validateForms} from "@/utils/index";
	import {getEditAuthority} from "@/api/user";
	import {verifyHomePhoneOrMobile,validatePhoneThere, isPositiveIntegerNotMust} from '@/utils/validate';
	export default {
		components: {InstituField, Address, Uploadpics},
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
			//校验--注册行政区划
			let verifyAreaCode_zhuce = (rule, value, callback) => {
				if (this.regArea.length === 0) {
					callback(new Error('注册行政区划不能为空，请选择！'));
				}
				else {
					callback();
				}
			};
			//校验--办公行政区划
			let verifyAreaCode_bangong = (rule, value, callback) => {
				if (this.officeArea.length === 0) {
					callback(new Error('办公行政区划不能为空，请选择！'));
				}
				else {
					callback();
				}
			};
			//校验详细地址
			let verifyAddr_zhuce = (rule, value, callback) => {
				if (value.length === 0) {
					callback(new Error('注册详细地址不能为空，请选择！'));
				}
				else {
					if (value.length > 100) {
						callback(new Error('注册详细地址长度不能超过100，请重新输入！'));
					}
					else {
						callback();
					}
				}
			};
			//校验详细地址
			let verifyAddr_bangong = (rule, value, callback) => {
				if (value.length === 0) {
					callback(new Error('办公详细地址不能为空，请选择！'));
				}
				else {
					if (value.length > 100) {
						callback(new Error('办公详细地址长度不能超过100，请重新输入！'));
					}
					else {
						callback();
					}
				}
			};

			return {
				//下拉框字典数据
				open_stateOptions: [],//开放状态
				corp_attrOptions: [],//法人性质
				workforce_typeOptions: [],//职工
				service_numOptions: [],//服务人数
				biz_build_mainOptions:[],//建设主体

				extensionServes_items: false,//提供拓展服务的子选项
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
					orgCode:'',//机构编码
					establishTime: '',//成立时间
					phone: '',//咨询电话
					openState: '',//开放状态
					regArea: [],//注册行政区划
					regAddr: '',//注册详细地址
					officeArea: [],//办公行政区划
					officeAddr: '',//办公详细地址
					imageInfoVos: [],//机构图片
					//-------运营信息--------
					legalType: '',//法人性质
					//opMode: '',//运营模式
					opOrg: '',//运营单位
					opLinkman: '',//运营方负责人
					opPhone: '',//运营方联系方式
					orgHead:'',
					orgHeadLinkman:'',
					//-----服务能力------
					providerPersionVos: {},//职工的数据+++++=
					//-----服务信息----
					providerItemVos: []
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
					//注册-行政区划
					regArea: [
						{required: true, trigger: 'change', validator: verifyAreaCode_zhuce},
					],
					//注册-详细地址
					regAddr: [
						{required: true, trigger: 'blur', validator: verifyAddr_zhuce},
					],
					//办公-行政区划
					officeArea: [
						{required: true, trigger: 'change', validator: verifyAreaCode_bangong},
					],
					//办公-详细地址
					officeAddr: [
						{required: true, trigger: 'blur', validator: verifyAddr_bangong},
					],
					opPhone:[
						{trigger: 'blur', max: 20, message:'运营方联系方式长度不能超过20，请重新输入！'},
					],
					opOrg:[
						{trigger: 'blur', max: 20, message:'运营单位长度不能超过20，请重新输入！'},
					],
					opLinkman:[
						{trigger: 'blur', max: 20, message:'运营方负责人长度不能超过20，请重新输入！'},
					],
					orgHead:[
						{trigger: 'blur', max: 20, message:'机构负责人长度不能超过20，请重新输入！'},
					],
					orgHeadLinkman:[
						{trigger: 'blur', max: 20, message:'机构负责人联系方式长度不能超过20，请重新输入！'},
						{ trigger: 'blur', validator: validatePhoneThere},
					]
					//运营单位

				// //运营方联系方式
				// if(this.form.opPhone && this.form.opPhone.length > 20){
				// 	return this.$message.error("运营方联系方式长度不能超过20，请重新输入！");
				// }
				},
				disabled: false, //表单是否可编辑
				activeTabs: 'base',//tab标签切换默认选中name参数
				activeCollapse: ['baseItem_1', 'baseItem_2', 'baseItem_3', 'baseItem_4', 'baseItem_5', 'baseItem_6','baseItem_7'],//折叠面板默认打开name参数
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
				regArea: [],//所属居委全部ID---注册的行政区划
				officeArea: [],//所属居委全部ID---办公的行政区划
				modelType: '',//查看：look  编辑：edit  新增：add
				instituType: '',//机构类型
				serviceMsgObj: [],//服务信息表单单选框和复选框选中的值
				workMsgObj: [],//职工人员信息
				service_numObj: [],//服务人数信息
				imageInfoVosLookUrl:[],//查看时的图片路径
				editAuthority:false,//编辑按钮的权限
			}
		},
		//在模板渲染成html后调用，通常是初始化页面完成后，再对html的dom节点进行一些需要的操作。
		mounted() {
			this.instituType = this.$route.query.instituType;
			this.modelType = this.$route.query.modelType;
			//当前机构id
			let _userId_ = this.$route.query.id || '';
			this.form.orgType = this.$route.query.instituType;
			this.orgTypeName = facilityTypeFun(this.$route.query.instituType);
			this.getData(_userId_);

			if(this.modelType === 'look'){
				/*编辑按钮的权限控制*/
				getEditAuthority(this.$route.query.editAuthority).then(response => {
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
						//服务人数---赋值id
						response.data.providerPersionVos.forEach((item) => {
							this.service_numObj.forEach((item_a) => {
								if (item.persionType === item_a.persionType) {
									item_a.id = item.id;
								}
							});
						});
						this.form.providerPersionVos = {};
						this.form.providerPersionVos = providerPersionVosArr;
						//处理区域的code,用以渲染区域下拉组件
						if (st === 'edit') {
							// if(this.form.regArea!=''&&this.form.regArea!=null){
							// 	this.form.regArea = this.form.regArea.split(',');
							// }
							// if(this.form.officeArea!=''&&this.form.regArea!=null){
							// 	this.form.officeArea = this.form.officeArea.split(',');
							// }
							this.form.regArea =this.form.regArea?this.form.regArea.split(','):this.form.regArea;
							this.form.officeArea =this.form.officeArea?this.form.officeArea.split(','):this.form.officeArea;
						}
						this.form.imageInfoVos.forEach((item)=>{
							this.imageInfoVosLookUrl.push(`${process.env.VUE_APP_API_IMGURL}${item.imgUrl}`);
						});
						this.idEdit = false;
						//计算养护比
						this.curingRatioCalculate();
					}).catch(() => {
						this.$message.error("获取‘"+this.orgTypeName+"’机构信息失败！");
					});
				})
			},
			// 获取下拉字典
			getSelect() {
				return new Promise((resolve, reject) => {
					//数据字典接口
					let dicKey = 'open_state,corp_attr_2,workforce_type,biz_build_main,service_num';
					allSelectdictionaryData(dicKey).then(response => {
						if (response.code === 0) {
							for (let k in response.data) {
								switch (k) {
									//开放状态
									case 'open_state':
										this.open_stateOptions = response.data[k];
										break;
									//法人性质
									case 'corp_attr_2':
										this.corp_attrOptions = response.data[k];
										break;
									//职工信息
									case 'workforce_type':
										this.workforce_typeOptions = response.data[k];
										this.workforce_typeOptions.forEach((item) => {
											let obj = {
												orgType: this.$route.query.instituType,//机构类型
												persionType: item.dictValue,//职工类型
												num: '',//职工数量
												orgId: this.$route.query.id || '',//机构id
												id: '',//职工id
											};
											this.workMsgObj.push(obj);
										});
										break;
									//服务人数
									case 'service_num':
										this.service_numOptions = response.data[k];
										this.service_numOptions.forEach((item) => {
											let obj = {
												orgType: this.$route.query.instituType,//机构类型
												persionType: item.dictValue,
												num: '',
												orgId: this.$route.query.id || '',
												id: '',
											};
											this.service_numObj.push(obj);
										});
										break;
									//建设主体
									case 'biz_build_main':
										this.biz_build_mainOptions = response.data[k];
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
				this.$router.push({path: '/streetPlatform/facilitiesConfig/communityFacilities'});
			},
			//下一步
			tabsStep(tabsName) {
				this.activeTabs = tabsName;
			},
			//确定按钮-提交表单
			editContent(formName) {
				let formRefs = ['form_base', 'form_operate'].map(key => this.$refs[key]);
				validateForms(formRefs).then(() => {
				// this.$refs[formName].validate((valid, object) => {
					// if (valid) {
						//let params = _.cloneDeep(this.form);
						let params = this.form;
						params.regArea = this.regArea.length === 0 ? '':this.regArea[this.regArea.length - 1]+'';
						params.officeArea = this.officeArea.length === 0 ? '':this.officeArea[this.officeArea.length - 1]+'';
						//处理服务信息字段
						this.getServiceCheckboxValue();
						params.providerItemVos = this.serviceMsgObj;
						//服务信息字典结构，编辑提交的时候不传
						params.serviceProviderConfigVoList = null;
						//处理职工-服务人数字段
						let dealWorkField = params.providerPersionVos;
						for (let k in dealWorkField) {
							//职工
							this.workMsgObj.forEach((item_a) => {
								if (k === item_a.persionType) {
									item_a.num = dealWorkField[k];
								}
							});
							//服务人数
							this.service_numObj.forEach((item_a) => {
								if (k === item_a.persionType) {
									item_a.num = dealWorkField[k];
								}
							});
						}
						params.providerPersionVos = {};
						params.providerPersionVos = [...this.workMsgObj,...this.service_numObj];
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
										message: "编辑‘"+this.orgTypeName+"’机构信息成功!"
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
					// }
					// else {
					// 	this.activeTabs = 'base';
					// 	window.scrollTo(0, 0);
					// 	return false;
					// }
				}).catch(err=>{
					this.activeTabs = 'base';
						window.scrollTo(0, 0);
						return false;
				});
			},
			// 获取----注册行政区划的值
			getAreaCode_reg_zhuce(val) {
				this.regArea = val;
			},
			// 获取----注册行政区划的值
			getAreaCode_reg_bangong(val) {
				this.officeArea = val;
			},
			//计算养护比的值
			curingRatioCalculate() {
				if (parseInt(this.form.providerPersionVos.service_sum) > 0 && parseInt(this.form.providerPersionVos.nurse) >= 0) {
					this.curingRatio = parseFloat(parseInt(this.form.providerPersionVos.nurse) / parseInt(this.form.providerPersionVos.service_sum) * 100).toFixed(2);
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
			},
			//查看详情页面，点击编辑按钮
			toEditType() {
				let _orgType_ = this.$route.query.instituType;
				let _id_ = this.$route.query.id;
				this.$router.push({
					path: `/communityFacilities/communityPensionOrganizationDetails/${_id_}`,
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
