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
							         :rules="isEditForm?rulesForm:null" label-width="140px">
								<el-row :gutter="0">
									<el-col :md="adaptiveGrid.md" :lg="adaptiveGrid.lg">
										<el-form-item :label="isEditForm?'供应商编号':'供应商编号：'" prop="spCode">
											<el-input v-if="isEditForm" v-model.trim="form.supplierCode"
											    disabled placeholder="系统自动生成"></el-input>
											<span v-else>{{form.supplierCode}}</span>
										</el-form-item>
									</el-col>
									<el-col :md="adaptiveGrid.md" :lg="adaptiveGrid.lg">
										<el-form-item :label="isEditForm?'供应商名称':'供应商名称：'" prop="supplierName">
											<el-input v-if="isEditForm" v-model.trim="form.supplierName"
											    clearable placeholder="请输入供应商名称"></el-input>
											<span v-else>{{form.supplierName}}</span>
										</el-form-item>
									</el-col>
									<el-col :md="adaptiveGrid.md" :lg="adaptiveGrid.lg">
										<el-form-item :label="isEditForm?'统一社会信用代码':'统一社会信用代码：'" prop="spOrgCode">
											<el-input v-if="isEditForm" v-model.trim="form.spOrgCode"
											    clearable placeholder="请输入统一社会信用代码"></el-input>
											<span v-else>{{form.spOrgCode}}</span>
										</el-form-item>
									</el-col>
									<el-col :md="adaptiveGrid.md" :lg="adaptiveGrid.lg">
										<el-form-item :label="isEditForm?'咨询电话':'咨询电话：'" prop="phone">
											<el-input v-if="isEditForm" v-model.trim="form.phone" 
											    clearable placeholder="请输入咨询电话"></el-input>
											<span v-else>{{form.phone}}</span>
										</el-form-item>
									</el-col>
									<el-col :md="adaptiveGrid.md" :lg="adaptiveGrid.lg">
										<el-form-item :label="isEditForm?'注册行政区划':'注册行政区划：'" prop="regArea">
											<Address v-if="isEditForm" :id-edit="idEdit"
											    :form-code="form.regArea" clearable
												:scope="'All'"
											    @getAreaCode="getAreaCode_reg" :width="'100%'"></Address>
											<span v-else>{{form.regAreaName}}</span>
										</el-form-item>
									</el-col>
									<el-col :md="adaptiveGrid.md" :lg="adaptiveGrid.lg">
										<el-form-item :label="isEditForm?'注册详细地址':'注册详细地址：'" prop="regAddr">
											<el-input v-if="isEditForm" v-model.trim="form.regAddr"
											    clearable placeholder="请输入注册详细地址"></el-input>
											<span v-else>{{form.regAddr}}</span>
										</el-form-item>
									</el-col>
									<el-col :md="adaptiveGrid.md" :lg="adaptiveGrid.lg">
										<el-form-item :label="isEditForm?'办公行政区划':'办公行政区划：'" prop="officeArea">
											<Address v-if="isEditForm" :id-edit="idEdit"
											    :form-code="form.officeArea" clearable
												:scope="'All'"
											    @getAreaCode="getAreaCode_office" :width="'100%'"></Address>
											<span v-else>{{form.officeAreaName}}</span>
										</el-form-item>
									</el-col>
									<el-col :md="adaptiveGrid.md" :lg="adaptiveGrid.lg">
										<el-form-item :label="isEditForm?'办公详细地址':'办公详细地址：'" prop="officeAddr">
											<el-input v-if="isEditForm" v-model.trim="form.officeAddr"
											    clearable placeholder="请输入办公详细地址"></el-input>
											<span v-else>{{form.officeAddr}}</span>
										</el-form-item>
									</el-col>
									<el-col :md="24" :lg="24" style="height: auto;">
										<el-form-item :label="isEditForm?'供应商图片':'供应商图片：'">
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
										<el-form-item :label="isEditForm?'负责人姓名':'负责人姓名：'" prop="legalName">
											<el-input v-if="isEditForm" v-model.trim="form.legalName"
											    clearable placeholder="请输入负责人姓名"></el-input>
											<span v-else>{{form.legalName}}</span>
										</el-form-item>
									</el-col>
									<el-col :md="adaptiveGrid.md" :lg="adaptiveGrid.lg">
										<el-form-item prop="legalPhone" :label="isEditForm?'负责人联系方式':'负责人联系方式：'">
											<el-input v-if="isEditForm" v-model.trim="form.legalPhone"
											    clearable placeholder="请输入负责人联系方式"></el-input>
											<span v-else>{{form.legalPhone}}</span>
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
	import {addSupplier,editSupplier,lookSupplier} from '@/api/assistiveDevices/assistSupplier'
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
				editAuthority: false,
				adaptiveGrid: adaptiveGrid_max,
				adaptiveGrid_plus: adaptiveGrid_plus,
				idEdit: true,
				form: {
					supplierId:'',
					supplierCode:'', //编号
					supplierName: '',//供应商名称
					spOrgCode:'', //统一信用代码
					phone:'', //电话
					regArea:"", //注册行政区
					regAddr:'',//注册地址
					regAreaLevel:"",
					regAreaName:'',
					officeArea:'', //办公
					officeAddr:'', //办公地址
					officeAreaLevel:"",
					officeAreaName:'',
					legalName:'',
					legalPhone:'',
					imageInfoVos:[] //图片
				},
				rulesForm: {
					supplierName: [
						{required: true, trigger: 'blur', message: '供应商名称不能为空，请输入'},
						{max: 100, trigger: 'blur', message: '长度不能超过100，请重新输入'},
					],
					spOrgCode: [
						{required: true, trigger: 'blur', message: '统一社会信用代码不能为空，请重新输入'},
						{max: 100, trigger: 'blur', message: '长度不能超过100，请重新输入'}
					],
					phone: [
						{trigger: 'change', validator: verifyHomePhoneOrMobile}
						// {required: true, trigger: 'blur', validator: verifyHomePhoneOrMobile},
					],
					regAddr: [
						{max: 100, trigger: 'blur', message: '长度不能超过100，请重新输入'}
					],
					officeAddr: [
						{max: 100, trigger: 'blur', message: '长度不能超过100，请重新输入'}
					],
					legalName: [
						{max: 50, trigger: 'blur', message: '长度不能超过50，请重新输入'}
					],
					legalPhone: [
						{trigger: 'blur', validator: verifyHomePhoneOrMobile},
					]
				},
				imageInfoVosLookUrl: [],//查看时的图片路径
			}
		},
		mounted() {
			this.modelType = this.$route.query.modelType;
			let supplierId = this.$route.params.id || '';
			if (this.modelType === 'look') {
				this.isEditForm = false;
				lookSupplier(supplierId).then(response => {
					let form = response.data;
					form.imageInfoVos.forEach((item) => {
						this.imageInfoVosLookUrl.push(`${process.env.VUE_APP_API_IMGURL}${item.imgUrl}`);
					});
					this.form = form;
				}).catch(() => {
					this.$message.error("获取供应商失败！");
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
				this.getData(supplierId)
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
				if (this.modelType === 'edit') {
					await this.editGetData(id);
				} else if (this.modelType === 'add') {
					this.idEdit = false;
				}
			},
			editGetData(id) {
				return new Promise((resolve, reject) => {
					//请求当前用户信息
					lookSupplier(id).then(response => {
						if(response.code==0){
							for (let key in this.form) {
							if (![ 'officeArea', 'regArea'].includes(key)) {
									this.form[key] = response.data[key];
								}
								this.idEdit = false;
							}
							this.form.officeArea = response.data.officeAreaLevel?response.data.officeAreaLevel.split(','):[]
							this.form.regArea = response.data.regAreaLevel?response.data.regAreaLevel.split(','):[]
						}
					}).catch(() => {
						this.$message.error("获取用户信息失败！");
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
					//新增
					if (this.modelType === 'add' && !this.form.supplierId) {
						addSupplier(_form).then(response => {
							if (response.code === 0) {
								this.$message({
									type: 'success',
									message: "新增供应商保存成功!"
								});
								//关闭页面，跳转到列表
								this.closeDetailsPage();
							}
							else {
								this.$message.error("新增供应商操作失败，失败原因是：" + response.msg);
							}
						}).catch(() => {
							this.$message.error("新增供应商操作失败!");
						});
					}
					//编辑
					else if (this.modelType === 'edit' || (this.modelType === 'add' && this.form.supplierId)) {
						editSupplier(_form).then(response => {
							if (response.code === 0) {
								this.$message({
									type: 'success',
									message: "编辑供应商保存成功!"
								});
								//关闭页面，跳转到列表
								this.closeDetailsPage();
							}
							else {
								this.$message.error("编辑供应商操作失败，失败原因是：" + response.msg);
							}
						}).catch(() => {
							this.$message.error("编辑供应商操作失败!");
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
				this.$router.push('/assistivePlatform/assistSupplierConfig/supplier')
			},
			//查看详情页面，点击编辑按钮
			editContent() {
				this.$router.push({
					path: `/supplier/details/${this.$route.params.id}`,
					query: {'modelType': 'edit', '_title': `编辑${this.form.supplierName}`}
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
