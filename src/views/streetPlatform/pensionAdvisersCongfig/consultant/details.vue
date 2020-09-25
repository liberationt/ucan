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
							         :rules="isEditForm?rulesForm:null" label-width="120px">
								<el-row :gutter="0">
									<el-col :md="adaptiveGrid.md" :lg="adaptiveGrid.lg">
										<el-form-item :label="isEditForm?'姓名':'姓名：'" prop="fullName">
											<el-input v-if="isEditForm" v-model.trim="form.fullName"
											          placeholder="请输入姓名" clearable style="width:100%;"
											          @keyup.enter.native="submitBtn">
											</el-input>
											<span v-else>{{form.fullName}}</span>
										</el-form-item>
									</el-col>
									<el-col :md="adaptiveGrid.md" :lg="adaptiveGrid.lg">
										<el-form-item :label="isEditForm?'身份证号':'身份证号：'" prop="idCard">
											<el-input v-if="isEditForm" v-model.trim="form.idCard"
											          placeholder="请输入身份证号" clearable style="width:100%;"
											          @keyup.enter.native="submitBtn">
											</el-input>
											<span v-else>{{form.idCard}}</span>
										</el-form-item>
									</el-col>
									<el-col :md="adaptiveGrid.md" :lg="adaptiveGrid.lg">
										<el-form-item :label="isEditForm?'联系电话':'联系电话：'" prop="phone">
											<el-input v-if="isEditForm" v-model.trim="form.phone"
											          placeholder="请输入联系电话" clearable style="width:100%;"
											          @keyup.enter.native="submitBtn">
											</el-input>
											<span v-else>{{form.phone}}</span>
										</el-form-item>
									</el-col>
									<el-col :md="adaptiveGrid.md" :lg="adaptiveGrid.lg">
										<el-form-item :label="isEditForm?'职务':'职务：'" prop="duties">
											<el-input v-if="isEditForm" v-model.trim="form.duties"
											          placeholder="请输入职务" clearable style="width:100%;"
											          @keyup.enter.native="submitBtn">
											</el-input>
											<span v-else>{{form.duties}}</span>
										</el-form-item>
									</el-col>
									<el-col :md="adaptiveGrid.md" :lg="adaptiveGrid.lg">
										<el-form-item :label="isEditForm?'学历':'学历：'" prop="eduLevel">
											<el-select v-if="isEditForm" v-model="form.eduLevel"
											           placeholder="请选择学历" clearable style="width:100%;"
											           @keyup.enter.native="submitBtn">
												<el-option v-for="item in eduLevelOptions"
												           :key="item.dictValue" :label="item.dictLabel"
												           :value="item.dictValue"></el-option>
											</el-select>
											<span v-else>{{form.eduLevelName}}</span>
										</el-form-item>
									</el-col>
									<el-col :md="adaptiveGrid.md" :lg="adaptiveGrid.lg">
										<el-form-item prop="workStartdate">
											<span slot="label" style="display:inline-block;line-height:18px;">{{isEditForm?'从事社区工作开始时间':'从事社区工作开始时间：'}}</span>
											<el-date-picker v-if="isEditForm" v-model="form.workStartdate"
											                ref="workStartdate"
											                type="date" format="yyyy年MM月dd日" value-format="yyyy-MM-dd"
											                placeholder="请选择从事社区工作开始时间" clearable style="width:100%;"
											                @keyup.enter.native="submitBtn">
											</el-date-picker>
											<span v-else>{{form.workStartdate}}</span>
										</el-form-item>
									</el-col>
									<el-col :md="adaptiveGrid.md" :lg="adaptiveGrid.lg">
										<el-form-item :label="isEditForm?'所属顾问点':'所属顾问点：'" prop="advpointId">
											<el-select v-if="isEditForm" v-model="form.advpointId" filterable
											           @change="handleSiteChange"
											           placeholder="请选择所属顾问点" clearable style="width:100%;"
											           @keyup.enter.native="submitBtn">
												<el-option v-for="item in advpointOptions"
												           :key="item.dictValue" :label="item.dictLabel"
												           :value="item.dictValue"></el-option>
											</el-select>
											<span v-else>{{form.orgName}}</span>
										</el-form-item>
									</el-col>
									<el-form-item hidden prop="areaCode">
										<el-input v-model="form.areaCode" disabled></el-input>
									</el-form-item>
									<el-col :md="adaptiveGrid.md" :lg="adaptiveGrid.lg">
										<el-form-item :label="isEditForm?'劳动关系':'劳动关系：'" prop="workType">
											<el-select v-if="isEditForm" v-model="form.workType"
											           placeholder="请选择劳动关系" clearable style="width:100%;"
											           @keyup.enter.native="submitBtn">
												<el-option v-for="item in workTypeOptions"
												           :key="item.dictValue" :label="item.dictLabel"
												           :value="item.dictValue"></el-option>
											</el-select>
											<span v-else>{{form.workTypeName}}</span>
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
		getConsultant,
		addConsultant,
		editConsultant,
		uniqueID
	} from '@/api/pensionAdvisersCongfig/consultant';
	import {
		consultantSiteSearch
	} from '@/api/pensionAdvisersCongfig/consultantSite';
	import {
		allSelectdictionaryData
	} from '@/api/common';
	import {
		getEditAuthority
	} from '@/api/user';
	import {adaptiveGrid_max, adaptiveGrid_plus} from '@/common/index';
	import {closeSelectedTag} from "@/utils/rooterJump";
	import Address from '@/components/Address';
	import Pagination from "@/components/Pagination";
	import {pageModel} from "@/common";
	import {verifyIdCard, verifyHomePhoneOrMobile} from '@/utils/validate';
	import {validateForms, scrollToTop} from '@/utils/index';

	export default {
		components: {
			Address,
			Pagination
		},
		data() {
			return {
				isEditForm: true,//页面表单是否可编辑操作。查看时：false,编辑-新增时：true
				modelType: '',//查看：look  编辑：edit  新增：add
				activeTabs: 'base',
				activeCollapse: ['baseItem_1'],
				adaptiveGrid: adaptiveGrid_max,
				adaptiveGrid_plus: adaptiveGrid_plus,
				editAuthority: false,

				areaCode: [],
				eduLevelOptions: [],//学历
				advpointOptions: [{dictLabel: '李沙雕的社区养老组织', dictValue: 'd9c751e43e2c42a9b75e82c85403bf09'}], //所属顾问点
				// TODO 需要一个接口获取当前权限用户可以看见的顾问点列表
				workTypeOptions: [],//劳动关系

				form: {
					fullName: '', //姓名
					idCard: '', //身份证号
					phone: '', //联系电话
					duties: '', //职务
					eduLevel: '', //学历
					eduLevelName: '',
					workStartdate: '', //从事社区工作开始时间
					advpointId: '', //所属顾问点
					areaCode: '', // 所属区域，从顾问点数据中自动填充
					orgName: '',
					workType: '', //劳动关系
					workTypeName: ''
				},
				rulesForm: {
					fullName: [
						{required: true, trigger: 'blur', message: '姓名不能为空，请输入'},
						{max: 80, trigger: 'blur', message: '长度不能超过80，请重新输入'}
					],
					idCard: [
						{required: true, trigger: 'blur', message: '身份证号不能为空，请输入'},
						{trigger: 'blur', validator: verifyIdCard},
						{
							trigger: 'blur', validator: (rule, value, callback) => {
								let params = {
									idCard: value,
									id: this.form.id || ''
								}
								uniqueID(params).then(response => {
									if (response.code === 0) {
										callback();
									} else {
										callback(response.msg);
									}
								}).catch(() => {
									callback('身份证唯一性接口请求失败！');
								})
							}
						}
					],
					phone: [
						{required: true, trigger: 'blur', message: '联系电话不能为空'},
						{required: true, trigger: 'change', validator: verifyHomePhoneOrMobile},
						{required: true, trigger: 'blur', validator: verifyHomePhoneOrMobile},
					],
					duties: [
						{max: 20, trigger: 'blur', message: '长度不能超过20，请重新输入'}
					],
					advpointId: [
						{required: true, trigger: 'change', message: '请选择所属顾问点'}
					],
					areaCode: [
						{required: true, message: '所属区域不能为空'}
					],
					workType: [
						{required: true, trigger: 'change', message: '请选择劳动关系'}
					]
				}
			}
		},

		mounted() {
			this.modelType = this.$route.query.modelType;
			let _consultantId_ = this.$route.params.id || '';

			if (this.modelType === 'look') {
				//查看时，不要调用户信息接口，直接将表格行数据带来现实
				this.isEditForm = false;

				//请求当前用户信息
				getConsultant(_consultantId_).then(response => {
					if (response.code === 0) {
						if (response.data) {
							this.form = response.data;
						}
					} else {
						this.$message.error(response.msg);
					}
				}).catch(() => {
					this.$message.error("获取顾问员失败！");
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
				this.getData(_consultantId_)
			}
		},

		methods: {
			getAreaCode(val) {
				this.areaCode = val;
			},
			async getData(id) {
				await this.getSelect();
				if (this.modelType === 'edit') {
					await this.editGetData(id);
				} else if (this.modelType === 'add') {

				}
			},
			// 编辑获取数据
			editGetData(id) {
				return new Promise((resolve, reject) => {
					getConsultant(id).then(response => {
						if (response.code === 0) {
							if (response.data) {
								this.form = response.data;
							}
						} else {
							this.$message.error(response.msg);
						}
					}).catch(() => {
						this.$message.error("获取顾问员失败！");
					});
				})
			},
			// 获取下拉字典
			getSelect() {
				consultantSiteSearch().then(response => {
					this.advpointOptions = response.data.list.map(item => {
						return {
							dictLabel: item.orgName,
							dictValue: item.id,
							areaCode: item.areaCode
						}
					});
				}).catch(() => {
					this.$message.error('获取顾问点选项失败！');
				});

				let dictKey = [
					'edu_level',// 学历
					'work_type' // 劳动关系
				].join(',');
				return new Promise((resolve, reject) => {
					allSelectdictionaryData(dictKey).then(response => {
						let dict = response.data
						for (let key in dict) {
							switch (key) {
								case 'edu_level':
									this.eduLevelOptions = dict[key];
									break;
								case 'work_type':
									this.workTypeOptions = dict[key];
									break;
							}
						}
						resolve()
					}).catch(() => {
						reject()
					});
				})
			},
			// 顾问点变化时更新 areaCode
			handleSiteChange(value) {
				let site = this.advpointOptions.find(item => item.dictValue === value);
				if (site) {
					this.form.areaCode = site.areaCode
				} else {
					this.form.areaCode = '';
				}
			},
			//确定按钮-提交form表单
			submitBtn() {
				let formRefs = ['form_base'].map(key => this.$refs[key]);
				validateForms(formRefs).then(() => {
					let _form = _.cloneDeep(this.form);
					let codeArr = _form.areaCode.split(',');
					_form.areaCode = codeArr[codeArr.length - 1];
					//去除不需提交的字段
					delete _form.eduLevelName;
					delete _form.orgName;
					delete _form.workTypeName
					//新增
					if (this.modelType === 'add' && !this.form.id) {
						addConsultant(_form).then(response => {
							if (response.code === 0) {
								this.$message({
									type: 'success',
									message: "新增顾问员保存成功!"
								});
								//关闭页面，跳转到列表
								this.closeDetailsPage();
							}
							else {
								this.$message.error("新增顾问员操作失败，失败原因是：" + response.msg);
							}
						}).catch(() => {
							this.$message.error("新增顾问员操作失败!");
						});
					}
					//编辑
					else if (this.modelType === 'edit' || (this.modelType === 'add' && this.form.id)) {
						editConsultant(_form).then(response => {
							if (response.code === 0) {
								this.$message({
									type: 'success',
									message: "编辑顾问员保存成功!"
								});
								//关闭页面，跳转到列表
								this.closeDetailsPage();
							}
							else {
								this.$message.error("编辑顾问员操作失败，失败原因是：" + response.msg);
							}
						}).catch(() => {
							this.$message.error("编辑顾问员操作失败!");
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
				//关闭页面
				closeSelectedTag(this, this.$route);
				this.$router.push('/streetPlatform/pensionAdvisersCongfig/consultant')
			},
			//查看详情页面，点击编辑按钮
			editContent() {
				this.$router.push({
					path: `/consultant/details/${this.$route.params.id}`,
					query: {'modelType': 'edit', '_title': `编辑${this.form.fullName}`}
				});
			}
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
