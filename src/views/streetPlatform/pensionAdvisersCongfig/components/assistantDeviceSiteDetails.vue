<!--养老辅具展示点-->
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
							         :rules="isEditForm?rulesForm:null" label-width="140px">
								<el-row :gutter="0">
									<el-col :md="adaptiveGrid.md" :lg="adaptiveGrid.lg">
										<el-form-item :label="isEditForm?'机构名称':'机构名称：'" prop="orgName">
											<el-input v-if="isEditForm" ref="orgName" v-model.trim="form.orgName"
											          @keyup.enter.native="editContent('form_base')"
											          clearable placeholder="请输入机构名称"></el-input>
											<span v-else>{{form.orgName}}</span>
										</el-form-item>
									</el-col>
									<el-col :md="adaptiveGrid.md" :lg="adaptiveGrid.lg">
										<el-form-item :label="isEditForm?'机构类型':'机构类型：'" prop="orgTypeName">
											<el-input v-if="isEditForm" ref="orgTypeName" v-model.trim="orgTypeName"
											          @keyup.enter.native="editContent('form_base')"
											          disabled clearable placeholder=""></el-input>
											<span v-else>{{orgTypeName}}</span>
										</el-form-item>
									</el-col>
									<el-col :md="adaptiveGrid.md" :lg="adaptiveGrid.lg">
										<el-form-item :label="isEditForm?'成立时间':'成立时间：'" prop="establishTime">
											<el-date-picker v-if="isEditForm" v-model="form.establishTime"
											                @keyup.enter.native="editContent('form_base')"
											                type="date"
											                placeholder="请选择成立时间" style="width:100%;"
											                format="yyyy年MM月dd日"
											                value-format="yyyy-MM-dd"></el-date-picker>
											<span v-else>{{form.establishTime}}</span>
										</el-form-item>
									</el-col>
									<el-col :md="adaptiveGrid.md" :lg="adaptiveGrid.lg">
										<el-form-item :label="isEditForm?'咨询电话':'咨询电话：'" prop="phone">
											<el-input v-if="isEditForm" ref="phone" v-model.trim="form.phone"
											          @keyup.enter.native="editContent('form_base')"
											          clearable placeholder="请输入咨询电话"></el-input>
											<span v-else>{{form.phone}}</span>
										</el-form-item>
									</el-col>
									<el-col :md="adaptiveGrid.md" :lg="adaptiveGrid.lg">
										<el-form-item :label="isEditForm?'建筑面积(㎡)':'建筑面积(㎡)：'" prop="buildArea">
											<el-input v-if="isEditForm" ref="buildArea" v-model.number="form.buildArea"
											          @keyup.enter.native="editContent('form_base')"
											          clearable placeholder="请输入建筑面积"></el-input>
											<span v-else>{{form.buildArea}}</span>
										</el-form-item>
									</el-col>
									<el-col :md="adaptiveGrid.md" :lg="adaptiveGrid.lg">
										<el-form-item :label="isEditForm?'所属居委':'所属居委：'" prop="areaCode">
											<Address v-if="isEditForm" :id-edit="idEdit"
											         @keyup.enter.native="editContent('form_base')"
											         :form-code="form.areaCode" @getAreaCode="getAreaCode_reg"
											         :width="'100%'"></Address>
											<span v-else>{{form.areaCodeStr}}</span>
										</el-form-item>
									</el-col>
									<el-col :md="adaptiveGrid.md" :lg="adaptiveGrid.lg">
										<el-form-item :label="isEditForm?'详细地址':'详细地址：'" prop="addr">
											<el-input v-if="isEditForm" ref="addr" v-model.trim="form.addr"
											          @keyup.enter.native="editContent('form_base')"
											          clearable placeholder="请输入详细地址"></el-input>
											<span v-else>{{form.addr}}</span>
										</el-form-item>
									</el-col>
									<el-col :md="adaptiveGrid.md" :lg="adaptiveGrid.lg">
										<el-form-item :label="isEditForm?'开放时间':'开放时间：'">
											<el-date-picker
													v-if="isEditForm"
													v-model="servicePeriod"
													value-format="yyyy-MM-dd"
													type="daterange"
													range-separator="-"
													start-placeholder="开始日期"
													end-placeholder="结束日期"
													:style="'width:100%'"
													@keyup.enter.native="editContent('form_base')"
											></el-date-picker>
											<span v-else>{{form.openStartTime}} 至 {{form.openEndTime}}</span>
										</el-form-item>
									</el-col>
									<el-col :md="adaptiveGrid.md" :lg="adaptiveGrid.lg">
										<el-form-item :label="isEditForm?'开放状态':'开放状态：'" prop="openState">
											<el-select v-if="isEditForm" v-model="form.openState"
											           @keyup.enter.native="editContent('form_base')"
											           placeholder="请选择开放状态" clearable style="width:100%;">
												<el-option v-for="item in open_stateOptions" :key="item.dictValue"
												           :label="item.dictLabel" :value="item.dictValue"></el-option>
											</el-select>
											<span v-else>{{form.openState}}</span>
										</el-form-item>
									</el-col>
									<el-col :md="24" :lg="24" style="height: auto;">
										<el-form-item :label="isEditForm?'机构图片':'机构图片：'">
											<el-row v-if="!isEditForm" class="agencyImageRow">
												<el-col class="agencyImageCol" v-for="item in imageInfoVosLookUrl"
												        :key="item">
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
							         :rules="isEditForm?rulesForm:null" label-width="140px">
								<el-row :gutter="0">
									<el-col :md="adaptiveGrid.md" :lg="adaptiveGrid.lg">
										<el-form-item :label="isEditForm?'主体性质':'主体性质：'" prop="legalType">
											<el-select v-if="isEditForm" v-model="form.legalType"
											           @keyup.enter.native="editContent('form_base')"
											           placeholder="请选择主体性质" clearable style="width:100%;">
												<el-option v-for="item in corp_attrOptions" :key="item.dictValue"
												           :label="item.dictLabel" :value="item.dictValue"></el-option>
											</el-select>
											<span v-else>{{form.legalType}}</span>
										</el-form-item>
									</el-col>
									<el-col :md="adaptiveGrid.md" :lg="adaptiveGrid.lg">
										<el-form-item :label="isEditForm?'投入主体':'投入主体：'" prop="investingMain">
											<el-select v-if="isEditForm" v-model="form.investingMain"
											           @keyup.enter.native="editContent('form_base')"
											           placeholder="请选择投入主体" clearable style="width:100%;">
												<el-option v-for="item in investing_mainOptions" :key="item.dictValue"
												           :label="item.dictLabel" :value="item.dictValue"></el-option>
											</el-select>
											<span v-else>{{form.investingMain}}</span>
										</el-form-item>
									</el-col>
									<el-col :md="adaptiveGrid.md" :lg="adaptiveGrid.lg">
										<el-form-item :label="isEditForm?'运营模式':'运营模式：'" prop="opMode">
											<el-select v-if="isEditForm" v-model="form.opMode"
											           @keyup.enter.native="editContent('form_base')"
											           placeholder="请选择运营模式" clearable style="width:100%;">
												<el-option v-for="item in operate_modeOptions" :key="item.dictValue"
												           :label="item.dictLabel" :value="item.dictValue"></el-option>
											</el-select>
											<span v-else>{{form.opMode2}}</span>
										</el-form-item>
									</el-col>
									<el-col :md="adaptiveGrid.md" :lg="adaptiveGrid.lg">
										<el-form-item :label="isEditForm?'运营方负责人':'运营方负责人：'" prop="opLinkman">
											<el-input v-if="isEditForm" ref="opLinkman" v-model="form.opLinkman"
											          @keyup.enter.native="editContent('form_base')"
											          clearable placeholder="请输入运营方负责人"></el-input>
											<span v-else>{{form.opLinkman}}</span>
										</el-form-item>
									</el-col>
									<el-col :md="adaptiveGrid.md" :lg="adaptiveGrid.lg">
										<el-form-item :label="isEditForm?'运营方联系方式':'运营方联系方式：'" prop="opPhone">
											<el-input v-if="isEditForm" ref="opPhone" v-model="form.opPhone"
											          @keyup.enter.native="editContent('form_base')"
											          clearable
											          placeholder="请输入运营方联系方式"></el-input>
											<span v-else>{{form.opPhone}}</span>
										</el-form-item>
									</el-col>
								</el-row>
							</el-form>
						</el-collapse-item>
						<!--运营信息item end-->
					</el-collapse>
				</el-tab-pane>
				<!--基本信息tabs end-->
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
	import _ from 'lodash';
	import {
		institutionDetailsData,
		submitDataAdd,
		submitDataEdit
	} from "@/api/facilitiesConfig/serviceFacilitiesPlayRoom";
	import {institutionFieldConfig, allSelectdictionaryData,} from "@/api/facilitiesConfig/communityFacilities";
	import {adaptiveGrid_max, adaptiveGrid_plus} from "@/common/index";
	import Uploadpics from "@/components/Uploadpics";
	import Address from "@/components/Address";
	import {facilityTypeFun} from "@/common/facilityType";
	import {closeSelectedTag} from "@/utils/rooterJump";
	import {transformNumber} from "@/utils/index";
	import {verifyHomePhoneOrMobile, isPositiveIntegerNotMust} from '@/utils/validate';
	import {getEditAuthority} from "@/api/user";

	export default {
		components: {
			Address,
			Uploadpics
		},
    props: ['id', 'close', 'type'],
		data() {
			return {
				//下拉框字典数据
				open_stateOptions: [],//开放状态
				corp_attrOptions: [],//法人性质
				operate_modeOptions: [],//运营模式
				investing_mainOptions: [],//投入主体

				isEditForm: true,//页面表单是否可编辑操作。查看时：false,编辑-新增时：true
				idEdit: true,//区域级联下拉框是编辑时还是新增时。编辑时：false,新增时：true
				orgTypeName: '',
				//表单
				form: {
					//-----基本信息-------
					orgName: '',//机构名称
					orgType: '',//机构类型
					establishTime: '',//成立时间
					phone: '',//咨询电话
					buildArea: '',//建筑面积
					areaCode: '',//所属居委
					addr: '',//详细地址
					openStartTime: '', //开发时间
					openEndTime: '',
					openState: '',//开放状态
					imageInfoVos: [],//机构图片
					//-------运营信息--------
					legalType: '',//法人性质
					investingMain: '',//投入主体
					opMode: '',//运营模式
					opLinkman: '',//运营方负责人
					opPhone: '',//运营方联系方式
				},
				//form 表单的验证规则
				rulesForm: {
					orgName: [
						{required: true, trigger: 'blur', message: '机构名称不能为空'},
						{max: 100, trigger: 'blur', message: '长度不能超过100，请重新输入'}
					],
					phone: [
						{required: true, trigger: 'blur', message: '咨询电话不能为空'},
						{required: true, trigger: 'change', validator: verifyHomePhoneOrMobile},
						{required: true, trigger: 'blur', validator: verifyHomePhoneOrMobile},
					],
					buildArea: [
						{trigger: 'blur', validator: isPositiveIntegerNotMust}
					],
					areaCode: [
						{required: true, trigger: 'change', message: '所属居委不能为空'}
					],
					addr: [
						{required: true, trigger: 'blur', message: '详细地址不能为空'},
						{max: 20, trigger: 'blur', message: '长度不能超过20，请重新输入'}
					],
					opLinkman: [
						{max: 50, trigger: 'blur', message: '长度不能超过50，请重新输入'}
					],
					opPhone: [
						{trigger: 'change', validator: verifyHomePhoneOrMobile},
					]
				},
				activeTabs: 'base',//tab标签切换默认选中name参数
				activeCollapse: ['baseItem_1', 'baseItem_2'],//折叠面板默认打开name参数
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
				modelType: '',//查看：look  编辑：edit  新增：add
				instituType: '',//机构类型
				servicePeriod: null,//开放时间
				imageInfoVosLookUrl: [],//查看时的图片路径
				editAuthority: false,//编辑按钮的权限
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

			if (this.modelType === 'look') {
				/*编辑按钮的权限控制*/
				getEditAuthority(this.$route.meta.id).then(response => {
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
							let {openStartTime, openEndTime} = response.data;
							if (openStartTime && openEndTime) {
								this.servicePeriod = [openStartTime, openEndTime];
							}
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
					let dicKey = 'open_state,corp_attr,operate_mode_3,investing_main';
					allSelectdictionaryData(dicKey).then(response => {
						if (response.code === 0) {
							for (let k in response.data) {
								switch (k) {
									//开放状态
									case 'open_state':
										this.open_stateOptions = response.data[k];
										break;
									//主体性质
									case 'corp_attr':
										this.corp_attrOptions = response.data[k];
										break;
									//运营模式
									case 'operate_mode_3':
										this.operate_modeOptions = response.data[k];
										break;
									//投入主体
									case 'investing_main':
										this.investing_mainOptions = response.data[k];
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
				this.$router.push({path: '/facilitiesConfig/communityFacilities'});
			},
			//确定按钮-提交表单
			editContent(formName) {
				this.$refs[formName].validate((valid, object) => {
					if (valid) {
						let params = _.cloneDeep(this.form);
						params.areaCode = params.areaCode.length === 0 ? '' : params.areaCode[params.areaCode.length - 1];
						//处理开放时间格式
						if (this.servicePeriod && this.servicePeriod.length > 0) {
							params.openStartTime = this.servicePeriod[0];
							params.openEndTime = this.servicePeriod[1];
						} else {
							params.openStartTime = "";
							params.openEndTime = "";
						}
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
						window.scrollTo(0, 0);
						return false;
					}
				});
			},

			getAreaCode_reg(val) {
				this.form.areaCode = val;
			},
			//只能输入数字类型
			transformNumber(value, obj) {
				this.form[obj] = transformNumber(value);
			},
			//查看详情页面，点击编辑按钮
			toEditType() {
				let _orgType_ = this.form.orgType;
				let _id_ = this.$route.query.id;
				this.$router.push({
					path: `/communityFacilities/assistantDeviceSiteDetails/${_id_}`,
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
