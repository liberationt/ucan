<!-- 服务人员管理 -->
<template>
	<el-container>
		<el-main class="tableContainer">
			<el-tabs v-model="activeTabs" @tab-click="handleClick">
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
							         :rules="isEditForm?rulesForm:null"
							         label-width="120px">
								<el-row :gutter="0">
									<el-col :md="adaptiveGrid.md" :lg="adaptiveGrid.lg">
										<el-form-item :label="isEditForm?'姓名':'姓名：'" prop="fullName">
											<el-input v-if="isEditForm" ref="fullName" v-model.trim="form.fullName"
											          :disabled="disabled" clearable placeholder="请输入姓名"
											          @keyup.enter.native="submitBtn"></el-input>
											<span v-else>{{form.fullName}}</span>
										</el-form-item>
									</el-col>
									<el-col :md="adaptiveGrid.md" :lg="adaptiveGrid.lg">
										<el-form-item :label="isEditForm?'身份证':'身份证：'" prop="idCard">
											<el-input v-if="isEditForm" ref="idCard" v-model="form.idCard"
											          :disabled="disabled" clearable placeholder="请输入身份证"
											          @input="handleIdCardInput"
											          @keyup.enter.native="submitBtn"></el-input>
											<span v-else>{{form.idCard}}</span>
										</el-form-item>
									</el-col>
									<el-col :md="adaptiveGrid.md" :lg="adaptiveGrid.lg">
										<el-form-item :label="isEditForm?'性别':'性别：'" prop="sex">
											<el-select v-if="isEditForm" v-model="form.sex"
											           filterable clearable style="width:100%;"
											           @keyup.enter.native="submitBtn">
												<el-option v-for="item in sexOptions" :key="item.dictValue"
												           :label="item.dictLabel" :value="item.dictValue"></el-option>
											</el-select>
											<span v-else>{{form.sexName}}</span>
										</el-form-item>
									</el-col>
									<el-col :md="adaptiveGrid.md" :lg="adaptiveGrid.lg">
										<el-form-item :label="isEditForm?'出生日期':'出生日期：'" prop="birthday">
											<el-date-picker v-if="isEditForm" v-model="form.birthday" type="date"
											                @change="birthdayChange"
											                placeholder="请选择出生日期" style="width:100%;"
											                format="yyyy-MM-dd"
											                value-format="yyyy-MM-dd"
											                @keyup.enter.native="submitBtn"></el-date-picker>
											<span v-else>{{form.birthday}}</span>
										</el-form-item>
									</el-col>
									<el-col :md="adaptiveGrid.md" :lg="adaptiveGrid.lg">
										<el-form-item :label="isEditForm?'年龄':'年龄：'" prop="age">
											<el-input v-if="isEditForm" ref="age"
											          v-model="age?age+'岁':age"
											          disabled clearable placeholder="请输入年龄"
											          @keyup.enter.native="submitBtn"></el-input>
											<span v-else>{{age?age+'岁':age}}</span>
										</el-form-item>
									</el-col>
									<el-col :md="adaptiveGrid.md" :lg="adaptiveGrid.lg">
										<el-form-item :label="isEditForm?'民族':'民族：'" prop="nation">
											<el-select v-if="isEditForm" v-model="form.nation"
											           filterable clearable style="width:100%;"
											           @keyup.enter.native="submitBtn">
												<el-option v-for="item in nationOptions" :key="item.dictValue"
												           :label="item.dictLabel" :value="item.dictValue"></el-option>
											</el-select>
											<span v-else>{{form.nationName}}</span>
										</el-form-item>
									</el-col>
									<el-col :md="adaptiveGrid.md" :lg="adaptiveGrid.lg">
										<el-form-item :label="isEditForm?'婚姻状况':'婚姻状况：'" prop="maritalStatus">
											<el-select v-if="isEditForm" v-model="form.maritalStatus"
											           placeholder="请选择婚姻状况" clearable style="width:100%;"
											           @keyup.enter.native="submitBtn">
												<el-option v-for="(item, index) in maritalStatusOptions" :key="index"
												           :label="item.dictLabel"
												           :value="item.dictValue ? item.dictValue : index"></el-option>
											</el-select>
											<span v-else>{{form.maritalStatusName}}</span>
										</el-form-item>
									</el-col>
									<el-col :md="adaptiveGrid.md" :lg="adaptiveGrid.lg">
										<el-form-item :label="isEditForm?'政治面貌':'政治面貌：'" prop="politicType">
											<el-select v-if="isEditForm" v-model="form.politicType"
											           clearable style="width:100%;" @keyup.enter.native="submitBtn">
												<el-option v-for="item in politicalOptions" :key="item.dictValue"
												           :label="item.dictLabel" :value="item.dictValue"></el-option>
											</el-select>
											<span v-else>{{form.politicTypeName}}</span>
										</el-form-item>
									</el-col>
									<el-col :md="adaptiveGrid.md" :lg="adaptiveGrid.lg">
										<el-form-item :label="isEditForm?'文化程度':'文化程度：'" prop="eduLevel">
											<el-select v-if="isEditForm" v-model="form.eduLevel"
											           clearable style="width:100%;" @keyup.enter.native="submitBtn">
												<el-option v-for="item in educationOptions" :key="item.dictValue"
												           :label="item.dictLabel" :value="item.dictValue"></el-option>
											</el-select>
											<span v-else>{{form.eduLevelName}}</span>
										</el-form-item>
									</el-col>
									<el-col :md="adaptiveGrid.md" :lg="adaptiveGrid.lg">
										<el-form-item :label="isEditForm?'家庭电话':'家庭电话：'" prop="homePhone">
											<el-input v-if="isEditForm" ref="homePhone"
											          v-model.trim="form.homePhone"
											          @blur="handleHomePhoneBlur"
											          :disabled="disabled" clearable placeholder="请输入家庭电话"
											          type="phone" @keyup.enter.native="submitBtn"></el-input>
											<span v-else>{{form.homePhone}}</span>
										</el-form-item>
									</el-col>
									<el-col :md="adaptiveGrid.md" :lg="adaptiveGrid.lg">
										<el-form-item :label="isEditForm?'手机号码':'手机号码：'" prop="mobile">
											<el-input v-if="isEditForm" ref="mobile" v-model.trim="form.mobile"
											          :disabled="disabled" clearable placeholder="请输入手机号码"
											          @keyup.enter.native="submitBtn"></el-input>
											<span v-else>{{form.mobile}}</span>
										</el-form-item>
									</el-col>
								</el-row>
							</el-form>
						</el-collapse-item>
						<!--基本信息item end-->

						<!--服务信息item start-->
						<el-collapse-item name="baseItem_2">
							<template slot="title">
								<div class="titleSlider">
									<span>
										<i class="titleTip"></i>服务信息
									</span>
								</div>
							</template>
							<el-form ref="form_server" key="form_server" :model="form"
							         :rules="this.isEditForm?rulesForm:null" label-width="140px">
								<el-row :gutter="0">
									<el-col :span="24">
										<el-form-item :label="this.isEditForm?'服务商':'服务商：'" prop="orgIdList">
											<el-select v-if="this.isEditForm" v-model="form.orgIdList" multiple
											           @keyup.enter.native="editContent('form_base')"
											           placeholder="请选择服务商" clearable style="width:100%;"
											           @change="changefuwushang">
												<el-option v-if="orgIdOptions.length !== 0"
												           v-for="item in orgIdOptions" :key="item.orgId"
												           :label="item.orgName" :value="item.orgId"></el-option>
											</el-select>
											<span v-else>{{form.orgNameList.join(',')}}</span>
										</el-form-item>
									</el-col>
								</el-row>
							</el-form>
						</el-collapse-item>
						<!--服务信息item end-->

						<!--住址信息item start-->
						<el-collapse-item name="baseItem_2">
							<template slot="title">
								<div class="titleSlider">
									<span>
										<i class="titleTip"></i>住址信息
									</span>
								</div>
							</template>
							<el-form ref="form_address" key="form_address" :model="form"
							         :rules="isEditForm?rulesForm:null"
							         label-width="160px">
								<el-row :gutter="0">
									<el-col :md="adaptiveGrid_plus.md" :lg="adaptiveGrid_plus.lg">
										<el-form-item :label="isEditForm?'户籍行政区划':'户籍行政区划：'"
										              prop="censusArea">
											<Address v-if="isEditForm" :id-edit="idEdit" :area-code="areaCode[0]"
											         :form-code="form.censusArea"
											         @getAreaCode="getAreaCode_reg" :width="'100%'"
											         @keyup.enter.native="submitBtn"></Address>
											<span v-else>{{form.censusAreaCodeName}}</span>
										</el-form-item>
									</el-col>
									<el-col :md="adaptiveGrid_plus.md" :lg="adaptiveGrid_plus.lg">
										<el-form-item :label="isEditForm?'户籍详细地址':'户籍详细地址：'"
										              prop="censusAddr" :rules="rulesForm.censusAddr">
											<el-input v-if="isEditForm" ref="censusAddr"
											          v-model="form.censusAddr" :disabled="disabled" clearable
											          placeholder="请输入户籍详细地址"
											          @keyup.enter.native="submitBtn"></el-input>
											<span v-else>{{form.censusAddr}}</span>
										</el-form-item>
									</el-col>
									<el-col :md="adaptiveGrid_plus.md" :lg="adaptiveGrid_plus.lg">
										<el-form-item :label="isEditForm?'居住行政区划':'居住行政区划：'"
										              prop="liveArea">
											<Address v-if="isEditForm" :id-edit="idEdit" :area-code="areaCode[1]"
											         :form-code="form.liveArea"
											         @getAreaCode="getAreaCode_live" :width="'100%'"
											         @keyup.enter.native="submitBtn"></Address>
											<span v-else>{{form.liveAreaCodeName}}</span>
										</el-form-item>
									</el-col>
									<el-col :md="adaptiveGrid_plus.md" :lg="adaptiveGrid_plus.lg">
										<el-form-item :label="isEditForm?'居住详细地址':'居住详细地址：'"
										              prop="liveAddr" :rules="rulesForm.liveAddr">
											<el-input v-if="isEditForm" ref="liveAddr"
											          v-model="form.liveAddr" :disabled="disabled" clearable
											          placeholder="请输入居住详细地址"
											          @keyup.enter.native="submitBtn"></el-input>
											<span v-else>{{form.liveAddr}}</span>
										</el-form-item>
									</el-col>
								</el-row>
							</el-form>
						</el-collapse-item>

						<!--备注item start-->
						<el-collapse-item name="baseItem_5">
							<template slot="title">
								<div class="titleSlider">
									<span>
										<i class="titleTip"></i>备注
									</span>
								</div>
							</template>
							<el-form ref="form_remark" key="form_remark" :model="form"
							         :rules="isEditForm?rulesForm:null"
							         label-width="80px">
								<el-row :gutter="0">
									<el-form-item v-if="isEditForm" prop="remark">
										<el-input v-if="isEditForm" ref="remark" type="textarea" :rows="5"
										          :disabled="disabled" v-model="form.remark" placeholder="请输入备注"
										          maxlength="200" show-word-limit
										          @keyup.enter.native="submitBtn"></el-input>
									</el-form-item>
									<p v-else class="remarkSpan">{{form.remark}}</p>
								</el-row>
							</el-form>
						</el-collapse-item>
						<!--备注item end-->
					</el-collapse>
				</el-tab-pane>
				<!--基本信息tabs end-->
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
	import {
		userDetailsData,
		submitDataAdd,
		submitDataEdit,
		getInstitutionalTypeData,
		validateID_serverPersonal
	} from "@/api/serviceProviderConfig/servicePersonal";
	import {
		allSelectdictionaryData
	} from '@/api/facilitiesConfig/pensionAgency';
	import {getEditAuthority} from "@/api/user";
	import {adaptiveGrid_max, adaptiveGrid_plus} from "@/common/index";
	import Address from "@/components/Address";
	import {
		computerAge,
		getBirthdayFromIdCard,
		validateForms,
		scrollToTop
	} from "@/utils/index";
	import {
		verifyFullName,
		verifyIdCard,
		verifyHomePhone,
		verifyMobile,
	} from '@/utils/validate';
	import {closeSelectedTag} from "@/utils/rooterJump";

	export default {
		components: {Address},
		data() {
			return {
				//下拉框字典数据
				orgIdOptions: [],//服务商

				isEditForm: true,//页面表单是否可编辑操作。查看时：false,编辑-新增时：true
				idEdit: true,//区域级联下拉框是编辑时还是新增时。编辑时：false,新增时：true
				//下拉框的数据
				sexOptions: [],//性别
				nationOptions: [],//民族
				maritalStatusOptions: [],//婚姻状况
				politicalOptions: [],//政治面貌
				educationOptions: [],//文化程度
				//表单
				form: {
					id: "",//当前用户id
					idCard: "",//身份证
					fullName: "",//姓名
					sex: "",//性别
					sexName: "",//性别（纯文本）
					birthday: "",//出生日期（年龄不传，只传出生日期）
					nation: '',//民族
					nationName: '',
					maritalStatus: '',//婚姻状况
					maritalStatusName: '',
					politicType: '',//政治面貌
					politicTypeName: '',
					eduLevel: '',//文化程度
					eduLevelName: '',
					homePhone: "",//家庭电话
					mobile: "",//手机号码

					//服务商
					bizProviderOrgVoList: [],
					orgIdList: [],
					orgNameList: [],

					censusAddr: '',//户籍详细地址
					censusArea: '',//户籍行政区划
					censusAreaCodeName: '',//户籍行政区划地址名称

					liveAddr: '',//居住详细地址
					liveArea: '',//居住行政区划
					liveAreaCodeName: '',//居住行政区划地址名称

					remark: ""//备注
				},
				age: "",//年龄
				//表格当前操作行的数据
				activeRowData: null,
				//form 表单的验证规则
				rulesForm: {
					//姓名
					fullName: [
						{required: true, trigger: 'blur', message: '姓名不能为空，请输入！'},
						{trigger: 'blur', validator: verifyFullName},
					],
					//身份证
					idCard: [
						// trigger 设置为 MANUAL_TRIGGER 是不让组件自动在 blur 的时候校验。
						// 手动在 blur 事件处理函数中处理。将校验和校验后的动作解耦。
						{required: true, trigger: 'MANUAL_TRIGGER', message: '身份证不能为空，请输入！'},
						{trigger: 'MANUAL_TRIGGER', validator: verifyIdCard},
					],
					//家庭电话
					homePhone: [
						{trigger: 'change', validator: verifyHomePhone},
					],
					//手机号码
					mobile: [
						{trigger: 'change', validator: verifyMobile},
					],
					address: [
						{trigger: 'blur', max: 50, message: '详细地址长度不得超过50个字符，请重新输入！'}
					],
				},
				disabled: false, //表单是否可编辑
				activeTabs: 'base',//tab标签切换默认选中name参数
				activeCollapse: ['baseItem_1', 'baseItem_2', 'baseItem_3', 'baseItem_4', 'baseItem_5'],//折叠面板默认打开name参数
				areaCodeOptions: [],//行政区域树节点数据
				defaultProps: {
					children: 'children',
					label: 'areaName',
					value: 'areaCode',
				},
				lazy: true,//懒加载
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
				flag: null,//用来判断是表格添加时还是编辑时
				areaCode: [[], []],//区域行政的全部ID
				modelType: '',//查看：look  编辑：edit  新增：add
				editAuthority: false,
			}
		},
		//在模板渲染成html后调用，通常是初始化页面完成后，再对html的dom节点进行一些需要的操作。
		mounted() {
			this.modelType = this.$route.query.modelType;
			//当前用户id
			let _userId_ = this.$route.params.id || '';
			/**
			 * 查看
			 */
			if (this.modelType === 'look') {
				//查看时，不要调用户信息接口，直接将表格行数据带来现实
				this.isEditForm = false;

				//请求当前用户信息
				userDetailsData(_userId_).then(response => {
					//处理值为null的数据
					this.handleResponseAddress(response);
					this.form = response;
					this.age = computerAge(this.form.birthday);
				}).catch(() => {
					this.$message.error("获取用户信息失败！");
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
				this.getData(_userId_)
			}
		},
		methods: {
			// 异步事件同步化
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
					//请求当前用户信息
					userDetailsData(id).then(response => {
						//处理值为null的数据
						this.handleResponseAddress(response);
						this.form = response;
						//计算年龄
						if (!this.form.birthday) {
							let _birthday = getBirthdayFromIdCard(idCard);
							this.form.birthday = _birthday;
							this.age = computerAge(_birthday);
						} else {
							this.age = computerAge(this.form.birthday);
						}
						this.idEdit = false;
					}).catch(() => {
						this.$message.error("获取用户信息失败！");
					});
				})
			},
			handleResponseAddress(response) {
				if (response.censusArea) {
					response.censusArea = response.censusArea.split(',') || [];
				}
				else {
					response.censusArea = [];
				}
				if (response.liveArea) {
					response.liveArea = response.liveArea.split(',') || [];
				}
				else {
					response.liveArea = [];
				}
			},
			// 获取下拉字典
			getSelect() {
				let dictKey = [
					'sys_sex',//性别
					'nation_type',//民族
					'biz_marital_status',//婚姻状况
					'politics_status',//政治面貌
					'edu_level',//文化程度
				].join(',');
				return new Promise((resolve, reject) => {
					allSelectdictionaryData(dictKey).then(response => {
						let dict = response.data;
						for (let key in dict) {
							switch (key) {
								//性别
								case 'sys_sex':
									this.sexOptions = dict[key];
									break;
								//民族
								case 'nation_type':
									this.nationOptions = dict[key];
									break;
								//婚姻状况
								case 'biz_marital_status':
									this.maritalStatusOptions = dict[key];
									break;
								//政治面貌
								case 'politics_status':
									this.politicalOptions = dict[key];
									break;
								//文化程度
								case 'edu_level':
									this.educationOptions = dict[key];
									break;
							}
						}
						resolve()
					}).catch(() => {
						reject()
					});

					/**
					 * 服务商--数据字典接口
					 */
					let dicKey = {'selectType': '30XX'};
					getInstitutionalTypeData(dicKey).then(response => {
						this.orgIdOptions = response.data.list;
						resolve()
					}).catch(() => {
						this.$message.error('‘服务商’数据字典接口请求失败！');
						reject()
					});
				})
			},
			//tabs 标签页
			handleClick(tab, event) {
			},
			// 获取区域的值----户籍
			getAreaCode_reg(val) {
				this.areaCode[0] = val;
			},
			// 获取区域的值----居住
			getAreaCode_live(val) {
				this.areaCode[1] = val;
			},
			// 家庭电话输入框失去焦点
			handleHomePhoneBlur() {
				this.$refs['form_base'].validateField('homePhone', (message) => {
					let valid = message === '';
					if (!valid) {
						this.$message.error(
							'家庭电话格式例如:123-12345678或1234-1234567或1234-12345678');
					}
				});
			},
			//选择服务商
			changefuwushang(val) {
				this.form.bizProviderOrgVoList = [];
				val.forEach(itemA => {
					this.orgIdOptions.forEach(itemB => {
						if (itemB.orgId === itemA) {
							let itemArr = {
								orgId: itemA,
								orgName: itemB.orgName
							};
							this.form.bizProviderOrgVoList.push(itemArr);
						}
					});
				});
			},
			//确定按钮-提交form表单
			submitBtn() {
				//如果有homePhone的消息，关闭它
				if (this.homePhoneWarning) {
					this.homePhoneWarning.close();
					this.homePhoneWarning = null;
				}
				let formRefs = ['form_base', 'form_address'].map(key => this.$refs[key]);
				validateForms(formRefs).then(() => {
					let _form = this.form;

					_form.censusArea = this.areaCode[0].length === 0 ? '' : this.areaCode[0][this.areaCode[0].length - 1] + '';
					_form.liveArea = this.areaCode[1].length === 0 ? '' : this.areaCode[1][this.areaCode[1].length - 1] + '';

					if (_form.birthday === '') {
						_form.birthday = null;
					}
					//新增
					if (this.modelType === 'add' && !this.form.id) {
						submitDataAdd(_form).then(response => {
							if (response.code === 0) {
								this.$message({
									type: 'success',
									message: "新增服务人员信息保存成功!"
								});
								//关闭页面
								this.closeDetailsPage();
							}
							else {
								this.$message.error("新增服务人员信息操作失败，失败原因是：" + response.msg);
							}
						}).catch(() => {
							this.$message.error("新增服务人员信息操作失败!");
						});
					}
					//编辑
					else if (this.modelType === 'edit' || (this.modelType === 'add' && this.form.id)) {
						submitDataEdit(_form).then(response => {
							if (response.code === 0) {
								this.$message({
									type: 'success',
									message: "编辑服务人员信息保存成功!"
								});
								//关闭页面
								this.closeDetailsPage();
							}
							else {
								this.$message.error("编辑服务人员信息操作失败，失败原因是：" + response.msg);
							}
						}).catch(() => {
							this.$message.error("编辑服务人员信息操作失败!");
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
				this.$router.push('/streetPlatform/serviceProviderConfig/servicePersonal')
			},
			//查看详情页面，点击编辑按钮
			editContent() {
				this.$router.push({
					path: `/servicePersonal/details/${this.$route.params.id}`,
					query: {'modelType': 'edit', '_title': `编辑${this.form.fullName}`}
				});
			},
			//选择日期
			birthdayChange(val) {
				//新增时，根据满足条件的身份证，自动补全出生日期
				if (this.form.idCard !== '') {
					let _birthday = getBirthdayFromIdCard(this.form.idCard);
					if (_birthday !== val) {
						this.$confirm('您选择的‘出生日期’与‘身份证的出生日期’不符合，是否修改？', '提示', {
							confirmButtonText: '确定',
							cancelButtonText: '取消',
							type: 'warning'
						}).then(() => {
							if (val !== null) {
								this.age = computerAge(val);
								this.form.birthday = val;
							}
							else {
								this.age = '';
								this.form.birthday = '';
							}
						}).catch(() => {
							if (_birthday) {
								this.age = computerAge(_birthday);
								this.form.birthday = _birthday;
							}
							else {
								this.age = '';
								this.form.birthday = '';
							}
							this.$message({
								type: 'info',
								message: '已取消操作！'
							});
						});
					}
				}
				else {
					if (val !== null) {
						this.age = computerAge(val);
						this.form.birthday = val;
					}
					else {
						this.age = '';
						this.form.birthday = '';
					}
				}
			},
			//输入身份证表单，进行校验
			handleIdCardInput(value) {
				this.$refs['form_base'].validateField('idCard', (message) => {
					let valid = message === '';
					if (valid) {
						validateID_serverPersonal(this.form.idCard).then(response => {
							//身份证校验成功，后台没有该身份证的数据
							if (response.code === 0 || response.code === '0') {
								let _birthday = getBirthdayFromIdCard(this.form.idCard);
								this.form.birthday = _birthday;
								this.age = computerAge(_birthday);
							}
							//身份证校验成功，后台有该身份证的数据,且提示用户是否代入数据
							else if (response.code === 2 || response.code === '2') {
								let _birthday = getBirthdayFromIdCard(this.form.idCard);
								this.form.birthday = _birthday;
								this.age = computerAge(_birthday);

								this.$confirm('该身份证号已有对应人员信息，是否加载？', '提示', {
									confirmButtonText: '确定',
									cancelButtonText: '取消',
									type: 'warning'
								}).then(() => {
									if (response.date.censusArea) {
										response.date.censusArea = response.date.censusArea.split(',') || [];
									}
									else {
										response.date.censusArea = [];
									}
									if (response.date.liveArea) {
										response.date.liveArea = response.date.liveArea.split(',') || [];
									}
									else {
										response.date.liveArea = [];
									}

									this.form = response.date;
									if (!this.form.birthday) {
										let _birthday = getBirthdayFromIdCard(idCard);
										this.form.birthday = _birthday;
										this.age = computerAge(_birthday);
									} else {
										this.age = computerAge(this.form.birthday);
									}

									this.idEdit = !this.idEdit; // 触发address组件更新

								}).catch(() => {
								});
							}
							//身份证校验失败
							else {
								this.form.idCard = '';
								this.form.birthday = '';
								this.age = '';
								this.$message.error(response.msg);
							}
						}).catch(() => {
							this.form.birthday = '';
							this.age = '';
							this.$message.error("身份证唯一性校验接口请求失败！");
						});
					}
					else {
						if (this.modelType === 'edit') {
							this.form.birthday = '';
							this.age = '';
						} else if (this.modelType === 'add') {
							if (this.form.id) {
								this.resetForm();
							}
						}
					}
				});
			},
			// 重置所有表单
			resetForm() {
				this.form.id = '';
				this.$refs.form_base.resetFields();
				this.$refs.form_server.resetFields();
				this.$refs.form_address.resetFields();
				this.areaCode = [[], []];
				this.$refs.form_remark.resetFields();
				this.idEdit = !this.idEdit; // 触发address组件更新
			},
		}
	}
</script>

<style scoped>
	@import "~@/styles/form.css";

	.tableContainer {
		margin-top: 20px;
	}

	.titleSlider {
		width: 100%;
		height: 100%;
		position: relative;
	}

	.titleSlider > span {
		position: absolute;
		top: 0;
		left: 0;
		z-index: 1;
		background-color: #fff;
		padding: 0 10px 0 20px;
		height: 47px;
		font-size:16px;
   		font-weight: 600;
	}

	.titleSlider > span .titleTip {
		position: absolute;
		top: 50%;
		left: 10px;
		margin-top: -9px;
		width: 3px;
		height: 18px;
		background-color: #0078D4;
		display: inline-block;
	}

	.titleSlider::before {
		position: absolute;
		top: 50%;
		left: 0;
		width: 100%;
		height: 1px;
		border-top: 1px dashed #E1E1E1;
		content: '';
	}

	table tr:nth-child(even) {
		background-color: transparent;
	}

	.el-collapse-item__arrow {
		margin-right: 30px !important;
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

	.cancel-btn {
		border: 1px solid #2b579a;
		color: #2b579a;
	}

	.remarkSpan {
		padding: 10px 20px;
		margin: 0;
	}
</style>
