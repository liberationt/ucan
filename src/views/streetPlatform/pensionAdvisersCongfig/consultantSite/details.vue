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
									<el-form-item hidden prop="refId">
										<el-input v-model="form.refId" disabled
										          @keyup.enter.native="submitBtn"></el-input>
									</el-form-item>
									<el-col :md="adaptiveGrid.md" :lg="adaptiveGrid.lg">
										<el-form-item :label="isEditForm?'顾问点名称':'顾问点名称：'" prop="orgName">
											<el-autocomplete v-if="isEditForm" v-model="form.orgName"
											                 :fetch-suggestions="queryOrg"
											                 @select="handleSiteNameSelect"
											                 @blur="handleSiteNameBlur"
											                 placeholder="请输入顾问点名称" style="width:100%;"
											                 @keyup.enter.native="submitBtn">
											</el-autocomplete>
											<span v-else>{{form.orgName}}</span>
										</el-form-item>
									</el-col>
									<el-col :md="adaptiveGrid.md" :lg="adaptiveGrid.lg">
										<el-form-item :label="isEditForm?'顾问点类型':'顾问点类型：'" prop="type">
											<el-select v-if="isEditForm" v-model="form.type"
											           placeholder="请选择顾问点类型" clearable style="width:100%;"
											           @keyup.enter.native="submitBtn">
												<el-option v-for="item in typeOptions"
												           :key="item.dictValue" :label="item.dictLabel"
												           :value="item.dictValue"></el-option>
											</el-select>
											<span v-else>{{form.typeName}}</span>
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
										<el-form-item :label="isEditForm?'所属区域':'所属区域：'"
										              prop="areaCode">
											<Address v-if="isEditForm" :id-edit="idEdit" :area-code="areaCode[0]"
											         :form-code="form.areaCode"
											         @getAreaCode="getAreaCode" :width="'100%'"
											         @keyup.enter.native="submitBtn"></Address>
											<span v-else>{{form.areaCodeStr}}</span>
										</el-form-item>
									</el-col>
									<el-col :md="adaptiveGrid.md" :lg="adaptiveGrid.lg">
										<el-form-item :label="isEditForm?'详细地址':'详细地址：'" prop="addr">
											<el-input v-if="isEditForm" v-model.trim="form.addr"
											          clearable placeholder="请输入详细地址"
											          @keyup.enter.native="submitBtn"></el-input>
											<span v-else>{{form.addr}}</span>
										</el-form-item>
									</el-col>
									<el-col v-if="!isEditForm" :md="adaptiveGrid.md" :lg="adaptiveGrid.lg">
										<el-form-item label="养老顾问员：">
											<span>{{form.empCount}}</span>
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
		getConsultantSite,
		addConsultantSite,
		editConsultantSite,
		queryOrgByName,
		uniqueName
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
	import {verifyHomePhoneOrMobile} from '@/utils/validate';
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

				idEdit: true,
				areaCode: [],
				typeOptions: [],//顾问点类型
				queryOrgList: [],//保存自动补全的选项

				form: {
					refId: '', // 引用ID，可能为机构、 设施的id
					orgName: '', // 顾问点名称
					type: '', // 顾问点类型
					typeName: '',
					phone: '', // 联系电话
					areaCode: [], // 所属区域
					areaCodeStr: '',
					addr: '' // 详细地址
				},
				rulesForm: {
					orgName: [
						{required: true, trigger: 'MANUAL_TRIGGER', message: '顾问点名称不能为空，请输入'},
						{max: 100, trigger: 'MANUAL_TRIGGER', message: '长度不能超过100，请重新输入'},
						{
							trigger: 'MANUAL_TRIGGER', validator: (rule, value, callback) => {
								let params = {
									orgName: value,
									id: this.form.id || ''
								}
								uniqueName(params).then(response => {
									if (response.code === 0) {
										callback();
									} else {
										callback(response.msg);
									}
								}).catch(() => {
									callback('顾问点名称唯一性接口请求失败！')
								});
							}
						}
					],
					type: [
						{required: true, trigger: 'change', message: '请选择顾问点类型'}
					],
					phone: [
						{required: true, trigger: 'blur', message: '联系电话不能为空'},
						{required: true, trigger: 'change', validator: verifyHomePhoneOrMobile},
						{required: true, trigger: 'blur', validator: verifyHomePhoneOrMobile},
					],
					areaCode: [
						{required: true, trigger: 'change', message: '请选择所属区域'}
					],
					addr: [
						{max: 100, trigger: 'blur', message: '长度不能超过100，请重新输入'}
					]
				}
			}
		},

		mounted() {
			this.modelType = this.$route.query.modelType;
			let _siteId_ = this.$route.params.id || '';

			if (this.modelType === 'look') {
				//查看时，不要调用户信息接口，直接将表格行数据带来现实
				this.isEditForm = false;

				//请求当前用户信息
				getConsultantSite(_siteId_).then(response => {
					if (response.code === 0) {
						if (response.data) {
							this.form = response.data;
						}
					} else {
						this.$message.error(response.msg);
					}
				}).catch(() => {
					this.$message.error("获取顾问点失败！");
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
				this.getData(_siteId_)
			}
		},

		methods: {
			getAreaCode(val) {
				this.areaCode = val;
				this.form.areaCode = val;
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
					getConsultantSite(id).then(response => {
						if (response.code === 0) {
							if (response.data) {
								this.form = response.data;
								// areaCode 由逗号分隔的字符串转换成数组
								this.form.areaCode = this.form.areaCode.split(',');
								this.idEdit = false;
							}
						} else {
							this.$message.error(response.msg);
						}
					}).catch(() => {
						this.$message.error("获取顾问点失败！");
					});
				})
			},
			// 获取下拉字典
			getSelect() {
				let dictKey = [
					'biz_advisory_points_type',// 顾问点类型
				].join(',');
				return new Promise((resolve, reject) => {
					allSelectdictionaryData(dictKey).then(response => {
						let dict = response.data
						for (let key in dict) {
							switch (key) {
								case 'biz_advisory_points_type':
									this.typeOptions = dict[key];
									break;
							}
						}
						resolve()
					}).catch(() => {
						reject()
					});
				})
			},
			// 顾问点名称自动补全
			queryOrg(name, cb) {
				if (name === '') {
					this.queryOrgList = [];
					cb([]);
				} else {
					queryOrgByName({orgName: name}).then(response => {
						var list = response.data.map(item => {
							// orgType == 2017 - 社会养老组织，取办公区域、办公地址
							let addr;
							let _areaCode;
							if (item.orgType === '2017') {
								addr = item.officeAddr;
								_areaCode = item.areaCodeLevel.split(',');
							} else {
								addr = item.addr;
								_areaCode = item.codeLevel.split(',');
							}
							return {
								value: item.orgName,
								refId: item.orgId,
								areaCode: _areaCode, // areaCode和officeArea的完整code
								phone: item.phone,
								addr
							}
						});
						this.queryOrgList = list.slice();
						cb(list);
					});
				}
			},
			// 顾问点名称选中补全的选项
			handleSiteNameSelect(orgItem) {
				if (this.blurTimer != null) {
					clearTimeout(this.blurTimer);
					this.blurTimer = null;
				}
				this.completeData(orgItem);
				this.validateOrgName();
			},
			// 顾问点名称blur
			handleSiteNameBlur() {
				// 延迟 300ms 执行，如果后面有 select 事件，则取消 blur 事件处理
				this.blurTimer = setTimeout(() => {
					let orgItem = this.queryOrgList.find(item => item.value === this.form.orgName);
					if (orgItem) {
						this.completeData(orgItem);
					} else {
						if (this.form.refId) {
							this.clearComplete();
						}
					}
					this.validateOrgName();
					this.blurTimer = null;
				}, 300);
			},
			// 校验顾问点名称
			validateOrgName() {
				this.$refs['form_base'].validateField('orgName', (message) => {
					let valid = message == '';
					if (!valid) {
						if (this.form.refId) {
							this.clearComplete();
						}
					}
				});
			},
			// 补全数据
			completeData(orgItem) {
				this.form.refId = orgItem.refId;
				this.form.areaCode = orgItem.areaCode;
				this.form.phone = orgItem.phone;
				this.form.addr = orgItem.addr;
				this.idEdit = !this.idEdit; // 触发address组件更新
			},
			// 清除补全
			clearComplete() {
				this.form.refId = '';
				this.form.areaCode = [];
				this.form.phone = '';
				this.form.addr = '';
				this.idEdit = !this.idEdit; // 触发address组件更新
			},
			//确定按钮-提交form表单
			submitBtn() {
				let formRefs = ['form_base'].map(key => this.$refs[key]);
				validateForms(formRefs).then(() => {
					let _form = _.cloneDeep(this.form);
					//areaCode 赋值
					_form.areaCode = this.areaCode.length === 0 ? '' : this.areaCode[this.areaCode.length - 1] + '';
					//去除不需提交的字段
					delete _form.typeName;
					delete _form.areaCodeStr;
					//新增
					if (this.modelType === 'add' && !this.form.id) {
						addConsultantSite(_form).then(response => {
							if (response.code === 0) {
								this.$message({
									type: 'success',
									message: "新增顾问点保存成功!"
								});
								//关闭页面，跳转到列表
								this.closeDetailsPage();
							}
							else {
								this.$message.error("新增顾问点操作失败，失败原因是：" + response.msg);
							}
						}).catch(() => {
							this.$message.error("新增顾问点操作失败!");
						});
					}
					//编辑
					else if (this.modelType === 'edit' || (this.modelType === 'add' && this.form.id)) {
						editConsultantSite(_form).then(response => {
							if (response.code === 0) {
								this.$message({
									type: 'success',
									message: "编辑顾问点保存成功!"
								});
								//关闭页面，跳转到列表
								this.closeDetailsPage();
							}
							else {
								this.$message.error("编辑顾问点操作失败，失败原因是：" + response.msg);
							}
						}).catch(() => {
							this.$message.error("编辑顾问点操作失败!");
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
				this.$router.push('/streetPlatform/pensionAdvisersCongfig/consultantSite')
			},
			//查看详情页面，点击编辑按钮
			editContent() {
				this.$router.push({
					path: `/consultantSite/details/${this.$route.params.id}`,
					query: {'modelType': 'edit', '_title': `编辑${this.form.orgName}`}
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
