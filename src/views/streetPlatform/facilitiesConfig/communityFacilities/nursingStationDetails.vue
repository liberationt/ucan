<!--护理站-->
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
											<el-input v-if="this.isEditForm" ref="orgName" v-model="form.orgName"
											          @keyup.enter.native="editContent('form_base')"
											          :disabled="disabled" clearable placeholder="请输入机构名称"></el-input>
											<span v-else>{{form.orgName}}</span>
										</el-form-item>
									</el-col>
									<el-col :md="this.adaptiveGrid.md" :lg="this.adaptiveGrid.lg">
										<el-form-item :label="this.isEditForm?'机构类型':'机构类型：'" prop="orgTypeName">
											<!--<el-input v-if="this.isEditForm" ref="orgTypeName" v-model="orgTypeName" @keyup.enter.native="editContent('form_base')"-->
											<!--clearable placeholder=""></el-input>-->
											<el-select v-if="this.isEditForm" v-model="form.orgType"
											           placeholder="请选择机构类型"
											           @keyup.enter.native="editContent('form_base')"
											           clearable style="width:100%;">
												<el-option label="护理站" name="2016" value="2016"></el-option>
												<el-option label="护理院" name="2019" value="2019"></el-option>
											</el-select>
											<span v-else>{{orgTypeName}}</span>
										</el-form-item>
									</el-col>
									<el-col :md="this.adaptiveGrid.md" :lg="this.adaptiveGrid.lg">
										<el-form-item :label="this.isEditForm?'发证机关':'发证机关：'" prop="certOrg">
											<el-input v-if="this.isEditForm" ref="certOrg" v-model="form.certOrg"
											          @keyup.enter.native="editContent('form_base')"
											          clearable placeholder=""></el-input>
											<span v-else>{{form.certOrg}}</span>
										</el-form-item>
									</el-col>
									<el-col :md="this.adaptiveGrid.md" :lg="this.adaptiveGrid.lg">
										<el-form-item :label="this.isEditForm?'咨询电话':'咨询电话：'" prop="phone">
											<el-input v-if="this.isEditForm" ref="phone" v-model="form.phone"
											          @keyup.enter.native="editContent('form_base')"
											          :disabled="disabled" clearable placeholder="请输入咨询电话"></el-input>
											<span v-else>{{form.phone}}</span>
										</el-form-item>
									</el-col>
									<el-col :md="this.adaptiveGrid.md" :lg="this.adaptiveGrid.lg">
										<el-form-item :label="this.isEditForm?'经营性质':'经营性质：'" prop="opType">
											<el-select v-if="this.isEditForm" v-model="form.opType"
											           @keyup.enter.native="editContent('form_base')"
											           placeholder="请选择经营性质" clearable style="width:100%;">
												<el-option v-if="biz_op_typeOptions.length !== 0"
												           v-for="item in biz_op_typeOptions" :key="item.dictValue"
												           :label="item.dictLabel" :value="item.dictValue"></el-option>
											</el-select>
											<span v-else>{{form.opType}}</span>
										</el-form-item>
									</el-col>
									<el-col :md="this.adaptiveGrid.md" :lg="this.adaptiveGrid.lg">
										<el-form-item :label="this.isEditForm?'开放状态':'开放状态：'" prop="openState">
											<el-select v-if="this.isEditForm" v-model="form.openState"
											           @keyup.enter.native="editContent('form_base')"
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
											<Address v-if="this.isEditForm" :id-edit="idEdit" :area-code="areaCode"
											         @keyup.enter.native="editContent('form_base')"
											         :form-code="form.areaCode" @getAreaCode="getAreaCode_reg"
											         :width="'100%'"></Address>
											<span v-else>{{form.areaCodeStr}}</span>
										</el-form-item>
									</el-col>
									<el-col :md="this.adaptiveGrid.md" :lg="this.adaptiveGrid.lg">
										<el-form-item :label="this.isEditForm?'详细地址':'详细地址：'" prop="addr">
											<el-input v-if="this.isEditForm" ref="addr" v-model="form.addr"
											          @keyup.enter.native="editContent('form_base')"
											          :disabled="disabled" clearable placeholder="请输入详细地址"></el-input>
											<span v-else>{{form.addr}}</span>
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
												<el-col class="agencyImageCol"
												        v-for="(item,index) in this.imageInfoVosLookUrl">
													<img :src="item" class="agencyImage"/>
												</el-col>
											</el-row>
											<div v-else class="agencyImageWrap">
												<Uploadpics @pics="getPicList" :id-edit="idEdit"
												            :form-imgs="form.imageInfoVos"></Uploadpics>
											</div>
										</el-form-item>
									</el-col>
								</el-row>
							</el-form>
						</el-collapse-item>
						<!--基本信息item end-->
					</el-collapse>
				</el-tab-pane>
				<!--基本信息tabs end-->
			</el-tabs>

			<!--新增时,编辑时-->
			<el-footer v-if="this.modelType === 'add' || this.modelType === 'edit'">
				<div>
					<el-button type="warning" class="base-btn btnMarginLeft15" @click="editContent('form_base')">确定
					</el-button>
					<el-button class="cancel-btn btnMarginLeft15" @click="cancelDetailsPage">取消</el-button>
				</div>
			</el-footer>
			<!--查看时-->
			<el-footer v-if="this.modelType === 'look'">
				<div>
					<el-button v-if="editAuthority" type="warning" class="base-btn btnMarginLeft15" @click="toEditType">
						编辑
					</el-button>
					<el-button class="cancel-btn btnMarginLeft15" @click="closeDetailsPage">返回</el-button>
				</div>
			</el-footer>

		</el-main>
	</el-container>
</template>

<script>
	import {
		institutionDetailsData,
		submitDataAdd,
		submitDataEdit
	} from "@/api/facilitiesConfig/serviceFacilitiesHealthy";
	import {institutionFieldConfig, allSelectdictionaryData,} from "@/api/facilitiesConfig/communityFacilities";
	import {adaptiveGrid_max, adaptiveGrid_plus} from "@/common/index";
	import InstituField from "@/components/InstituField";
	import Uploadpics from "@/components/Uploadpics";
	import Address from "@/components/Address";
	import {facilityTypeFun} from "@/common/facilityType";
	import {closeSelectedTag} from "@/utils/rooterJump";
	import {transformNumber, transformNumberLetter} from "@/utils/index";
	import {getEditAuthority} from "@/api/user";
	import {verifyHomePhoneOrMobile, isPositiveIntegerNotMust} from '@/utils/validate';

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
				open_stateOptions: [],//开放状态
				biz_op_typeOptions: [],//经营性质

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
					establishTime: '',//成立时间
					phone: '',//咨询电话
					buildArea: '',//建筑面积
					openState: '',//开放状态
					areaCode: [],//所属居委
					addr: '',//详细地址
					openTime: '',//开放时间
					imageInfoVos: [],//机构图片
					opType: '',//经营性质
					certOrg: '',//发证机关
					//-------运营信息--------
					legalType: '',//法人性质
					opMode: '',//运营模式
					opOrg: '',//运营单位
					opLinkman: '',//运营方负责人
					opPhone: '',//运营方联系方式
				},

				orgTypeName: '',//机构类型汉字注释

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
					]
				},
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
				modelType: '',//查看：look  编辑：edit  新增：add
				instituType: '',//机构类型
				serviceMsgObj: [],//服务信息表单单选框和复选框选中的值
				workMsgObj: [],//职工人员信息
				imageInfoVosLookUrl: [],//查看时的图片路径
				editAuthority: false,//编辑按钮的权限
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

			if (this.modelType === 'look') {
				/*编辑按钮的权限控制*/
				getEditAuthority(this.$route.query.editAuthority).then(response => {
					response.forEach((item) => {
						if (item.menuName === '编辑') {
							this.editAuthority = item.visible === '0' ? true : false;
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
					}).catch(() => {
						this.$message.error(this.orgTypeName + '机构获取服务信息失败！');
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
						//处理区域的code,用以渲染区域下拉组件
						if (st === 'edit') {
							this.form.areaCode = this.form.areaCode.split(',');
						}
						this.form.imageInfoVos.forEach((item) => {
							this.imageInfoVosLookUrl.push(`${process.env.VUE_APP_API_IMGURL}${item.imgUrl}`);
						});
						this.idEdit = false;
					}).catch(() => {
						this.$message.error("获取‘" + this.orgTypeName + "’机构信息失败！");
					});
				})
			},
			// 获取下拉字典
			getSelect() {
				return new Promise((resolve, reject) => {
					//数据字典接口
					let dicKey = 'open_state,biz_op_type';
					allSelectdictionaryData(dicKey).then(response => {
						if (response.code === 0) {
							for (let k in response.data) {
								switch (k) {
									//开放状态
									case 'open_state':
										this.open_stateOptions = response.data[k];
										break;
									//经营性质
									case 'biz_op_type':
										this.biz_op_typeOptions = response.data[k];
										break;
								}
							}
						}
						else {
							this.$message.error(this.orgTypeName + '机构数据字典接口请求失败！');
						}
						resolve()
					}).catch(() => {
						this.$message.error(this.orgTypeName + '机构数据字典接口请求失败！');
						reject()
					});
				});
			},
			//取消按钮
			cancelDetailsPage() {
				this.$confirm("该页面的信息尚未保存，确定要关闭页面吗", "提示", {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning',
					closeOnClickModal: false
				}).then(() => {
					this.closeDetailsPage();
				}).catch(() => {
				});
			},
			//取消，返回按钮，关闭详情页
			closeDetailsPage() {
				//关闭页面
				closeSelectedTag(this, this.$route);
				this.$router.push({path: '/streetPlatform/facilitiesConfig/communityFacilities'});
			},
			//下一步
			tabsStep(tabsName) {
				this.activeTabs = tabsName;
			},
			//确定按钮-提交表单
			editContent(formName) {
				this.$refs[formName].validate((valid, object) => {
					if (valid) {
						let params = this.form;
						//params.areaCode = this.areaCode.pop() || '';
						params.areaCode = this.areaCode.length === 0 ? '' : this.areaCode[this.areaCode.length - 1] + '';
						//新增
						if (this.modelType === 'add') {
							submitDataAdd(params).then(response => {
								if (response.code === 0) {
									this.$message({
										type: 'success',
										message: "新增‘" + this.orgTypeName + "’机构信息成功!"
									});
									//关闭页面
									this.closeDetailsPage();
								}
								else {
									this.$message.error(response.msg);
								}
							}).catch(() => {
								this.$message.error("新增‘" + this.orgTypeName + "’机构信息失败!");
							});
						}
						//编辑
						else if (this.modelType === 'edit') {
							submitDataEdit(params).then(response => {
								if (response.code === 0) {
									this.$message({
										type: 'success',
										message: "编辑‘" + this.orgTypeName + "’机构信息成功!"
									});
									//关闭页面
									this.closeDetailsPage();
								}
								else {
									this.$message.error(response.msg);
								}
							}).catch(() => {
								this.$message.error("编辑‘" + this.orgTypeName + "’机构信息失败!");
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
			//查看详情页面，点击编辑按钮
			toEditType() {
				let _orgType_ = this.$route.query.instituType;
				let _id_ = this.$route.query.id;
				this.$router.push({
					path: `/communityFacilities/nursingStationDetails/${_id_}`,
					query: {
						'id': _id_,
						'modelType': 'edit',
						'instituType': _orgType_,
						'_title': `编辑${this.form.orgName}`
					}
				});
			},
		}
	}
</script>

<style scoped>
	@import "~@/styles/form.css";

	.tableContainer {
		margin-top: 20px;
	}
</style>
