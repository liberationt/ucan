<template>
	<el-container>
		<el-main class="tableContainer">
			<el-tabs v-model="activeTabs">
				<el-tab-pane label="基本信息" name="base">
					<el-collapse v-model="activeCollapse">
						<el-collapse-item name="baseItem_1">
							<template slot="title">
								<div class="titleSlider">
					                  <span>
					                    <i class="titleTip"></i>基本信息
					                  </span>
								</div>
							</template>
							<el-form ref="form_base" key="form_base" :model="form"
							         @keyup.enter.native="submitBtn"
							         :rules="isEditForm?rulesForm:null" label-width="120px">
								<el-row :gutter="0">
									<el-col :md="adaptiveGrid.md" :lg="adaptiveGrid.lg">
										<el-form-item :label="isEditForm?'服务商名称':'服务商名称：'" prop="orgName">
											<el-input v-if="isEditForm" v-model.trim="form.orgName"
											          clearable ref="orgName"
											          placeholder="服务商名称"></el-input>
											<span v-else>{{form.orgName}}</span>
										</el-form-item>
									</el-col>
									<el-col :md="adaptiveGrid.md" :lg="adaptiveGrid.lg">
										<el-form-item :label="isEditForm?'服务商类型':'服务商类型：'" prop="orgType">
											<el-select v-if="isEditForm" v-model="form.orgType"
											           placeholder="请选择服务商类型" clearable style="width:100%;">
												<el-option v-for="item in serviceProviderTypeOptions"
												           :key="item.dictValue" :label="item.dictLabel"
												           :value="item.dictValue"></el-option>
											</el-select>
											<span v-else>{{form.orgTypeName}}</span>
										</el-form-item>
									</el-col>
									<el-col :md="adaptiveGrid.md" :lg="adaptiveGrid.lg">
										<el-form-item :label="isEditForm?'成立时间':'成立时间：'" prop="establishTime">
											<el-date-picker v-if="isEditForm" v-model="form.establishTime" type="date"
											                placeholder="请选择成立时间"
											                style="width:100%;" format="yyyy年MM月dd日"
											                value-format="yyyy-MM-dd"></el-date-picker>
											<span v-else>{{form.establishTime}}</span>
										</el-form-item>
									</el-col>
									<el-col :md="adaptiveGrid.md" :lg="adaptiveGrid.lg">
										<el-form-item :label="isEditForm?'咨询电话':'咨询电话：'" prop="phone">
											<el-input v-if="isEditForm" v-model.trim="form.phone"
											          placeholder="请输入咨询电话"></el-input>
											<span v-else>{{form.phone}}</span>
										</el-form-item>
									</el-col>
									<el-col :md="adaptiveGrid.md" :lg="adaptiveGrid.lg">
										<el-form-item :label="isEditForm?'开放状态':'开放状态：'" prop="openState">
											<el-select v-if="isEditForm" v-model="form.openState"
											           placeholder="请选择开放状态" clearable style="width:100%;">
												<el-option v-for="item in openStateOptions"
												           :key="item.dictValue" :label="item.dictLabel"
												           :value="item.dictValue"></el-option>
											</el-select>
											<span v-else>{{form.openState}}</span>
										</el-form-item>
									</el-col>
									<el-col :md="adaptiveGrid.md" :lg="adaptiveGrid.lg">
										<el-form-item :label="isEditForm?'注册行政规划':'注册行政规划：'" prop="regArea">
											<Address v-if="isEditForm" :id-edit="idEdit"
											         :form-code="form.regArea" :scope="'All'"
											         @getAreaCode="getAreaCode_reg" :width="'100%'"></Address>
											<span v-else>{{form.regAreaStr}}</span>
										</el-form-item>
									</el-col>
									<el-col :md="adaptiveGrid.md" :lg="adaptiveGrid.lg">
										<el-form-item :label="isEditForm?'注册详细地址':'注册详细地址：'" prop="regAddr">
											<el-input v-if="isEditForm" v-model.trim="form.regAddr"
											          placeholder="请输入注册详细地址"></el-input>
											<span v-else>{{form.regAddr}}</span>
										</el-form-item>
									</el-col>
									<el-col :md="adaptiveGrid.md" :lg="adaptiveGrid.lg">
										<el-form-item :label="isEditForm?'办公行政规划':'办公行政规划：'" prop="officeArea">
											<Address v-if="isEditForm" :id-edit="idEdit"
											         :form-code="form.officeArea" :scope="'All'"
											         @getAreaCode="getAreaCode_office" :width="'100%'"></Address>
											<span v-else>{{form.officeAreaStr}}</span>
										</el-form-item>
									</el-col>
									<el-col :md="adaptiveGrid.md" :lg="adaptiveGrid.lg">
										<el-form-item :label="isEditForm?'办公详细地址':'办公详细地址：'" prop="officeAddr">
											<el-input v-if="isEditForm" v-model.trim="form.officeAddr"
											          placeholder="请输入办公详细地址"></el-input>
											<span v-else>{{form.officeAddr}}</span>
										</el-form-item>
									</el-col>
									<el-col :md="24" :lg="24" style="height: auto;">
										<el-form-item :label="isEditForm?'机构图片':'机构图片：'">
											<div v-if="isEditForm" class="agencyImageWrap">
												<Uploadpics @pics="getPicList" :id-edit="idEdit"
												            :form-imgs="form.imageInfoVos"></Uploadpics>
											</div>
											<el-row v-else class="agencyImageRow">
												<el-col class="agencyImageCol"
												        v-for="(item,index) in imageInfoVosLookUrl" :key="index">
													<img :src="item" class="agencyImage"/>
												</el-col>
											</el-row>
										</el-form-item>
									</el-col>
								</el-row>
							</el-form>
						</el-collapse-item>
						<el-collapse-item name="baseItem_2">
							<template slot="title">
								<div class="titleSlider">
                  <span>
                    <i class="titleTip"></i>运营信息
                  </span>
								</div>
							</template>
							<el-form ref="form_operate" key="form_operate" :model="form"
							         @keyup.enter.native="submitBtn"
							         :rules="isEditForm?rulesForm:null" label-width="140px">
								<el-row :gutter="0">
									<el-col :md="adaptiveGrid.md" :lg="adaptiveGrid.lg">
										<el-form-item :label="isEditForm?'运营方负责人':'运营方负责人：'" prop="opLinkman">
											<el-input v-if="isEditForm" v-model.trim="form.opLinkman"
											          clearable placeholder="请输入运营方负责人"></el-input>
											<span v-else>{{form.opLinkman}}</span>
										</el-form-item>
									</el-col>
									<el-col :md="adaptiveGrid.md" :lg="adaptiveGrid.lg">
										<el-form-item prop="opPhone" :label="isEditForm?'运营方联系方式':'运营方联系方式：'">
											<!--<span slot="label" style="display:inline-block;line-height:18px;width:80px;">{{isEditForm?'运营方联系方式':'运营方联系方式：'}}</span>-->
											<el-input v-if="isEditForm" v-model.trim="form.opPhone"
											          clearable placeholder="请输入运营方联系方式"></el-input>
											<span v-else>{{form.opPhone}}</span>
										</el-form-item>
									</el-col>
								</el-row>
							</el-form>
						</el-collapse-item>
					</el-collapse>
				</el-tab-pane>
			</el-tabs>

			<el-footer>
				<div v-if="isEditForm">
					<el-button type="warning" class="base-btn" @click="submitBtn">确定</el-button>
					<el-button class="cancel-btn" @click="cancelBtn">取消</el-button>
				</div>
				<div v-else>
					<el-button v-if="editAuthority" type="warning" class="base-btn" @click="editContent">编辑</el-button>
					<el-button class="cancel-btn" @click="closeDetailsPage">返回</el-button>
				</div>
			</el-footer>
		</el-main>
	</el-container>
</template>

<script>
	import _ from 'lodash';
	import {
		getServiceProvider,
		addServiceProvider,
		editServiceProvider,
		getServiceProviderDict
	} from '@/api/serviceProviderConfig/serviceProvider';
	import {
		allSelectdictionaryData
	} from '@/api/facilitiesConfig/pensionAgency';
	import {getEditAuthority} from "@/api/user";
	import {adaptiveGrid_max, adaptiveGrid_plus} from '@/common/index';
	import {closeSelectedTag} from "@/utils/rooterJump";
	import Address from '@/components/Address';
	import Uploadpics from '@/components/Uploadpics';
	import {verifyHomePhoneOrMobile} from '@/utils/validate';
	import {validateForms, scrollToTop} from '@/utils/index';

	export default {
		components: {
			Address,
			Uploadpics
		},
		data() {
			return {
				isEditForm: true,//页面表单是否可编辑操作。查看时：false,编辑-新增时：true
				modelType: '',//查看：look  编辑：edit  新增：add
				activeTabs: 'base',
				activeCollapse: ['baseItem_1', 'baseItem_2'],
				adaptiveGrid: adaptiveGrid_max,
				adaptiveGrid_plus: adaptiveGrid_plus,
				editAuthority: false,

				idEdit: true,
				serviceProviderTypeOptions: [],//服务类型
				openStateOptions: [],//服务机构

				form: {
					orgName: '',//服务商名称
					orgType: '',//服务商类型
					orgTypeName: '',
					establishTime: '',//成立时间
					phone: '',//咨询电话
					openState: '',//开放状态
					regArea: [],//注册行政区域
					regAddr: '',//注册详细地址
					officeArea: [],//办公行政区域
					officeAddr: '',//办公详细地址
					imageInfoVos: [],//服务商图片
					opLinkman: '',//运营方负责人
					opPhone: '',//运营方联系方式
				},
				rulesForm: {
					orgName: [
						{required: true, trigger: 'blur', message: '服务商名称不能为空，请输入'},
						{max: 100, trigger: 'blur', message: '长度不能超过100，请重新输入'}
					],
					orgType: [
						{required: true, trigger: 'change', message: '服务商类型不能为空，请选择'}
					],
					phone: [
						{required: true, trigger: 'blur', message: '咨询电话不能为空'},
						{required: true, trigger: 'change', validator: verifyHomePhoneOrMobile},
						{required: true, trigger: 'blur', validator: verifyHomePhoneOrMobile},
					],
					regArea: [
						{required: true, trigger: 'change', message: '注册行政区域不能为空，请选择'}
					],
					regAddr: [
						{required: true, trigger: 'blur', message: '注册详细地址不能为空，请输入'},
						{max: 100, trigger: 'blur', message: '长度不能超过100，请重新输入'}
					],
					officeArea: [
						{required: true, trigger: 'change', message: '办公行政区域不能为空，请选择'}
					],
					officeAddr: [
						{required: true, trigger: 'blur', message: '办公详细地址不能为空，请输入'},
						{max: 100, trigger: 'blur', message: '长度不能超过100，请重新输入'}
					],
					opLinkman: [
						{max: 50, trigger: 'blur', message: '长度不能超过50，请重新输入'}
					],
					opPhone: [
						{trigger: 'change', validator: verifyHomePhoneOrMobile},
					],
				},
				imageInfoVosLookUrl: [],//查看时的图片路径
			}
		},

		mounted() {
			this.modelType = this.$route.query.modelType;
			let _providerId_ = this.$route.params.id || '';

			if (this.modelType === 'look') {
				this.isEditForm = false;

				getServiceProvider(_providerId_, '').then(response => {
					let form = response.data;
					form.imageInfoVos.forEach((item) => {
						this.imageInfoVosLookUrl.push(`${process.env.VUE_APP_API_IMGURL}${item.imgUrl}`);
					});
					form.orgTypeName = '';
					this.form = form;

					getServiceProviderDict().then(response => {
						let orgItem = response.data.find(item => {
							return item.dictValue === this.form.orgType;
						});
						if (orgItem) {
							this.form.orgTypeName = orgItem.dictLabel;
						}
					}).catch(err => {
					});
				}).catch(() => {
					this.$message.error("获取服务商失败！");
				});

				/*编辑按钮的权限控制*/
				getEditAuthority(this.$route.query.menuId).then(response => {
					response.forEach((item) => {
						if (item.menuName === '编辑') {
							this.editAuthority = item.visible === '0' ? true : false;
						}
					});
				}).catch(() => {
					this.$message.error('获取编辑按钮的权限控制失败！');
				});
			}
			else {
				this.isEditForm = true;
				this.getData(_providerId_)
			}
		},

		methods: {
			// 获取图片数据
			getPicList(val) {
				this.form.imageInfoVos = val
			},
			getAreaCode_reg(val) {
				this.form.regArea = val;
			},
			getAreaCode_office(val) {
				this.form.officeArea = val;
			},
			async getData(id) {
				await this.getSelect();
				if (this.modelType === 'edit') {
					await this.editGetData(id);
				} else if (this.modelType === 'add') {
					this.idEdit = false;
				}
			},
			// 编辑获取数据
			editGetData(id) {
				return new Promise((resolve, reject) => {
					getServiceProvider(id, 'edit').then(response => {
						this.form = response.data;
						this.form.regArea = this.form.regArea.split(',');
						this.form.officeArea = this.form.officeArea.split(',');
						this.idEdit = false;
					}).catch(() => {
						this.$message.error("获取服务商失败！");
					});
				})
			},
			// 获取下拉字典
			getSelect() {
				//服务商类型
				getServiceProviderDict().then(response => {
					this.serviceProviderTypeOptions = response.data;
				}).catch(err => {
				});
				let dictKey = [
					'open_state',//开发状态
				].join(',');
				return new Promise((resolve, reject) => {
					allSelectdictionaryData(dictKey).then(response => {
						let dict = response.data
						for (let key in dict) {
							switch (key) {
								case 'open_state':
									this.openStateOptions = dict[key];
									break;
							}
						}
						resolve()
					}).catch(() => {
						reject()
					});
				})
			},
			//确定按钮-提交form表单
			submitBtn() {
				let formRefs = ['form_base', 'form_operate'].map(key => this.$refs[key]);
				validateForms(formRefs).then(() => {
					let _form = _.cloneDeep(this.form);
					_form.regArea = _form.regArea.length === 0 ? '' : _form.regArea[_form.regArea.length - 1];
					_form.officeArea = _form.officeArea.length === 0 ? '' : _form.officeArea[_form.officeArea.length - 1];
					delete _form.orgTypeName;
					//新增
					if (this.modelType === 'add' && !this.form.id) {
						addServiceProvider(_form).then(response => {
							if (response.code === 0) {
								this.$message({
									type: 'success',
									message: "新增服务商保存成功!"
								});
								//关闭页面，跳转到列表
								this.closeDetailsPage();
							}
							else {
								this.$message.error("新增服务商操作失败，失败原因是：" + response.msg);
							}
						}).catch(() => {
							this.$message.error("新增服务商操作失败!");
						});
					}
					//编辑
					else if (this.modelType === 'edit' || (this.modelType === 'add' && this.form.id)) {
						editServiceProvider(_form).then(response => {
							if (response.code === 0) {
								this.$message({
									type: 'success',
									message: "编辑服务商保存成功!"
								});
								//关闭页面，跳转到列表
								this.closeDetailsPage();
							}
							else {
								this.$message.error("编辑服务商操作失败，失败原因是：" + response.msg);
							}
						}).catch(() => {
							this.$message.error("编辑服务商操作失败!");
						});
					}
				}).catch(objectList => {
					scrollToTop();
				});
			},
			//取消按钮
			cancelBtn() {
				this.$confirm(
					'该页面的信息尚未保存，确定要关闭页面吗',
					'提示',
					{
						confirmButtonText: '确定',
						cancelButtonText: '取消',
						type: 'warning'
					}
				).then(() => {
					this.closeDetailsPage();
				}).catch(() => {
				});
			},
			//返回按钮，关闭详情页
			closeDetailsPage() {
				closeSelectedTag(this, this.$route);
				this.$router.push('/streetPlatform/serviceProviderConfig/serviceProvider')
			},
			//查看详情页面，点击编辑按钮
			editContent() {
				this.$router.push({
					path: `/serviceProvider/details/${this.$route.params.id}`,
					query: {'modelType': 'edit', '_title': `编辑${this.form.orgName}`}
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

	.el-footer {
		padding-top: 24px;
		padding-right: 0;
	}

	.el-footer > div {
		overflow: hidden;
	}

	.el-footer > div > button {
		float: right;
	}

	.base-btn {
		margin-left: 15px;
	}
</style>
