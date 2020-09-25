<!--服务记录管理-->
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
										<i class="titleTip"></i>老人基本信息
									</span>
								</div>
							</template>
							<el-form ref="form_base" key="form_base" :model="form"
							         :rules="this.isEditForm?rulesForm:null" label-width="140px">
								<el-row :gutter="0">
									<el-col :md="this.adaptiveGrid.md" :lg="this.adaptiveGrid.lg">
										<el-form-item :label="this.isEditForm?'姓名':'姓名：'" prop="fullName">
											<el-input v-if="this.isEditForm" ref="fullName" @keyup.enter.native="editContent('form_base')"
											          v-model="form.fullName"
											          clearable placeholder="请输入姓名"></el-input>
											<span v-else>{{form.fullName}}</span>
										</el-form-item>
									</el-col>
									<el-col :md="this.adaptiveGrid.md" :lg="this.adaptiveGrid.lg">
										<el-form-item :label="this.isEditForm?'身份证号':'身份证号：'" prop="idCard">
											<el-input v-if="this.isEditForm" ref="idCard" @keyup.enter.native="editContent('form_base')"
											          @input="handleIdCardInput" v-model="form.idCard"
											          clearable placeholder="请输入身份证号"></el-input>
											<span v-else>{{form.idCard}}</span>
										</el-form-item>
									</el-col>

									<el-col :md="this.adaptiveGrid.md" :lg="this.adaptiveGrid.lg">
										<el-form-item :label="this.isEditForm?'性别':'性别：'" prop="sex">
											<el-select v-if="this.isEditForm" v-model="form.sex" placeholder="请选择性别" style="width:100%;" clearable  @keyup.enter.native="onSubmit">
												<el-option label="男" name="0" value="0"></el-option>
												<el-option label="女" name="1" value="1"></el-option>
											</el-select>
											<span v-else>{{form.sexName}}</span>
										</el-form-item>
									</el-col>

									<el-col :md="this.adaptiveGrid.md" :lg="this.adaptiveGrid.lg">
										<el-form-item :label="this.isEditForm?'出生日期':'出生日期：'" prop="birthday">
											<el-date-picker v-if="this.isEditForm" v-model="form.birthday" @keyup.enter.native="editContent('form_base')"
											                type="date"
											                @change="birthdayChange"
											                placeholder="请选择出生日期" style="width:100%;"
											                format="yyyy年MM月dd日"
											                value-format="yyyy-MM-dd"></el-date-picker>
											<span v-else>{{form.birthday}}</span>
										</el-form-item>
									</el-col>
									<el-col :md="this.adaptiveGrid.md" :lg="this.adaptiveGrid.lg">
										<el-form-item :label="isEditForm?'年龄':'年龄：'" prop="age">
											<el-input v-if="isEditForm" ref="age"
											          v-model="age?age+'岁':age"
											          disabled clearable placeholder="（由出生日期自动计算年龄）"
											          @keyup.enter.native="submitBtn"></el-input>
											<span v-else>{{age?age+'岁':age}}</span>
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
									<el-col :md="this.adaptiveGrid.md" :lg="this.adaptiveGrid.lg">
										<el-form-item :label="this.isEditForm?'服务商':'服务商：'" prop="orgId">
											<el-select v-if="this.isEditForm" v-model="hasOrgIdItem" @keyup.enter.native="editContent('form_base')"
											           placeholder="请选择服务商" clearable style="width:100%;" @change="changeOrgId">
												<el-option v-if="orgIdOptions.length !== 0"
												           v-for="item in orgIdOptions" :key="item.orgId"
												           :label="item.orgName" :value="item.orgId"></el-option>
											</el-select>
											<span v-else>{{form.orgName}}</span>
										</el-form-item>
									</el-col>
									<el-col :md="this.adaptiveGrid.md" :lg="this.adaptiveGrid.lg">
										<el-form-item :label="this.isEditForm?'服务项目':'服务项目：'" prop="serviceItem">
											<el-select v-if="this.isEditForm" v-model="hasServiceProjectItem" @keyup.enter.native="editContent('form_base')"
											           placeholder="请选择服务项目" clearable style="width:100%;">
												<el-option v-if="serviceNameOptions.length !== 0"
												           v-for="item in serviceNameOptions" :key="item.serviceProjectId"
												           :label="item.serviceProjectName" :value="item.serviceProjectId"></el-option>
											</el-select>
											<span v-else>{{form.serviceName}}</span>
										</el-form-item>
									</el-col>
									<el-col :md="this.adaptiveGrid.md" :lg="this.adaptiveGrid.lg">
										<el-form-item :label="this.isEditForm?'服务人员':'服务人员：'" prop="serviceMan">
											<el-select v-if="this.isEditForm" v-model="hasServiceManItem" @keyup.enter.native="editContent('form_base')"
											           placeholder="请选择服务人员" clearable style="width:100%;">
												<el-option v-if="serviceManOptions.length !== 0"
												           v-for="item in serviceManOptions" :key="item.servicePersonId"
												           :label="item.servicePersonName" :value="item.servicePersonId"></el-option>
											</el-select>
											<span v-else>{{form.serviceMan}}</span>
										</el-form-item>
									</el-col>
									<el-col :md="this.adaptiveGrid.md" :lg="this.adaptiveGrid.lg">
										<el-form-item :label="this.isEditForm?'服务日期':'服务日期：'" prop="serviceDate">
											<el-date-picker v-if="this.isEditForm" v-model="form.serviceDate" @keyup.enter.native="editContent('form_base')"
											                type="date"
											                placeholder="请选择服务日期" style="width:100%;"
											                format="yyyy年MM月dd日"
											                value-format="yyyy-MM-dd"></el-date-picker>
											<span v-else>{{form.serviceDate}}</span>
										</el-form-item>
									</el-col>
									<el-col :md="this.adaptiveGrid.md" :lg="this.adaptiveGrid.lg">
										<el-form-item :label="this.isEditForm?'服务时长(小时)':'服务时长(小时)：'" prop="serviceHours">
											<el-input v-if="this.isEditForm" ref="serviceHours" @keyup.enter.native="editContent('form_base')"
											          v-model="form.serviceHours"
											          @keyup.native="transformFloatNumber1(form.serviceHours,'serviceHours')"
											          clearable placeholder="请输入服务时长"></el-input>
											<span v-else>{{form.serviceHours}}</span>
										</el-form-item>
									</el-col>
									<el-col :md="this.adaptiveGrid.md" :lg="this.adaptiveGrid.lg">
										<el-form-item :label="this.isEditForm?'服务状态':'服务状态：'" prop="serviceStatus">
											<el-select v-if="this.isEditForm" v-model="form.serviceStatus" placeholder="请选择服务状态" style="width:100%;" clearable  @keyup.enter.native="onSubmit">
												<el-option label="计划" name="plan" value="plan"></el-option>
												<el-option label="完成" name="perfection" value="perfection"></el-option>
											</el-select>
											<span v-else>{{form.serviceStatusName}}</span>
										</el-form-item>
									</el-col>
								</el-row>
							</el-form>
						</el-collapse-item>
						<!--服务信息item end-->

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
					<el-button v-if="editAuthority" type="warning" class="base-btn btnMarginLeft15" @click="toEditType">编辑</el-button>
					<el-button class="cancel-btn btnMarginLeft15" @click="closeDetailsPage">返回</el-button>
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
		getServiceItemData,
		getServiceManData,
		validateID_serverRecord
	} from "@/api/serviceActivityConfig/serviceRecord";
	import {adaptiveGrid_max, adaptiveGrid_plus} from "@/common/index";
	import {closeSelectedTag} from "@/utils/rooterJump";
	import {transformNumber,transformNumberLetter,transformFloatNumber1,computerAge,getBirthdayFromIdCard} from "@/utils/index";
	import {getEditAuthority} from "@/api/user";
	import {
		verifyFullName,
		verifyIdCard,
		verifyHomePhone,
		verifyMobile,
	} from '@/utils/validate';

	export default {
		data() {
			//姓名
			let verifyLaorenxingming = (rule, value, callback) => {
				if (value !== '') {
					if (/\s/.test(value)) {
						callback(new Error('姓名不能包含空格，请重新输入！'));
					}
					else {
						if (/^[\u4e00-\u9fa5]+$/.test(value)) {
							if (value.length >= 80) {
								callback(new Error('姓名长度不能超过80个汉字，请重新输入！'));
							}
							else {
								callback();
							}
						}
						else {
							callback(new Error('请输入汉字类型的姓名！'));
						}
					}
				} else {
					callback(new Error('姓名不能为空，请输入！'));
				}
			};
			//身份证
			let verifyShenfenzhenghao = (rule, value, callback) => {
				if (value !== '') {
					const reg = /(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}$)/;
					if (reg.test(value) && value !== '') {
						validateID_serverRecord(value).then(response => {
							if (response.code === 0) {
								callback();
							} else {
								if (response.msg === '该信息非当前企业拥有') {
									callback('服务人员信息已存在，请重新输入。');
								} else {
									callback(response.msg);
								}
							}
						}).catch(() => {
							callback(new Error('身份证检验接口调用失败！'));
						});
					}
					else {
						callback(new Error('请输入正确的身份证号码！'));
					}
				} else {
					callback(new Error('身份证号码不能为空，请输入！'));
				}
			};

			return {
				//下拉框字典数据
				orgIdOptions: [],//服务商
				serviceNameOptions:[],//服务项目
				serviceManOptions:[],//服务人员

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
					fullName:'',//姓名
					idCard:'',//身份证号
					sex:'',//性别
					birthday:'',//出生日期
					orgId:'',//服务商
					orgName:'',//服务商（文字）
					serviceName:'',//服务项目
					serviceProjectId:'',//服务项目id
					serviceMan:'',//服务人员
					serviceManId:'',//服务人员id
					serviceDate:'',//服务日期
					serviceHours:'',//服务时长
					serviceStatus:'',//服务状态
					serviceStatusName:'',//服务状态
				},
				age:'',//年龄
				loading: false,
				//form 表单的验证规则
				rulesForm:{
					//姓名
					fullName: [
						{required: true, trigger: 'blur', validator: verifyLaorenxingming},
					],
					//身份证
					idCard: [
						// trigger 设置为 MANUAL_TRIGGER 是不让组件自动在 blur 的时候校验。
						// 手动在 blur 事件处理函数中处理。将校验和校验后的动作解耦。
						{required: true, trigger: 'MANUAL_TRIGGER', message: '身份证不能为空，请输入！'},
						{trigger: 'MANUAL_TRIGGER', validator: verifyIdCard},
					],
				},

				activeTabs: 'base',//tab标签切换默认选中name参数
				activeCollapse:
					['baseItem_1', 'baseItem_2', 'baseItem_3', 'baseItem_4', 'baseItem_5', 'baseItem_6'],//折叠面板默认打开name参数

				//自适应
				adaptiveGrid:{
					md: adaptiveGrid_max.md,
					lg: adaptiveGrid_max.lg
				},
				//自适应
				adaptiveGrid_plus: {
					md: adaptiveGrid_plus.md,
					lg:
					adaptiveGrid_plus.lg
				},

				modelType:'',//查看：look  编辑：edit  新增：add
				instituType:'',//机构类型
				editAuthority:false,//编辑按钮的权限

				hasOrgIdItem:'',//当前服务商是否存在在服务商下拉列表中,
				hasServiceProjectItem:'',//当前服务项目是否存在在服务项目下拉列表中,
				hasServiceManItem:'',//当前服务人员是否存在在服务人员下拉列表中,
			}
		},
		//在模板渲染成html后调用，通常是初始化页面完成后，再对html的dom节点进行一些需要的操作。
		mounted() {
			this.modelType = this.$route.query.modelType;
			//当前机构id
			let _userId_ = this.$route.query.id || '';
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
			// 编辑-查看 获取服务记录的数据
			editGetData(id, st) {
				return new Promise((resolve, reject) => {
					//请求当前服务项目信息
					userDetailsData(id, st).then(response => {
						if(!response.bizExtendContentVo){
							//富文本内容
							response.bizExtendContentVo = {
								parentId: '',//父id
								content: '',//内容
								id: '',//服务项目id
								infoType: '',//内容类型
							};
						}

						//页面form表单的值
						this.form = response;
						//计算年龄
						this.age = computerAge(this.form.birthday);
						//根据服务商的值，加载服务项目和服务人员
						if(this.form.orgId){
							this.getFacilitatorCascadeData(this.form.orgId);
						}

						//如果当前服务记录的服务商，已经不存在与服务商的下拉框中时，则显示该服务商的名称
						if(this.orgIdOptions && this.orgIdOptions.length !== 0){
							this.orgIdOptions.forEach(item=>{
								if (item.orgId === this.form.orgId) {
									this.hasOrgIdItem = this.form.orgId;
								}
								else {
									this.hasOrgIdItem = this.form.orgName;
								}
							});
						}
						else {
							this.hasOrgIdItem = this.form.orgName;
						}

						this.idEdit = false;
					}).catch(() => {
						this.$message.error("获取服务记录信息失败！");
					});
				})
			},
			// 获取下拉字典
			getSelect() {
				return new Promise((resolve, reject) => {
					/**
					 * 服务商--数据字典接口
					 */
					let dicKey = {'selectType':'30XX'};
					getInstitutionalTypeData(dicKey).then(response => {
						this.orgIdOptions = response.data.list;
						resolve()
					}).catch(() => {
						this.$message.error('‘服务商’数据字典接口请求失败！');
						reject()
					});
				});
			},
			// 根据选择的服务商，来动态加载服务项目和服务人员的级联下拉框数据值
			getFacilitatorCascadeData(id){
				return new Promise((resolve, reject) => {
					//服务项目---字典数据
					getServiceItemData(id).then(response => {
						this.serviceNameOptions = response;
						if(this.serviceNameOptions && this.serviceNameOptions.length !== 0){
							this.serviceNameOptions.forEach(item=>{
								if (item.serviceProjectId === this.form.serviceProjectId) {
									this.hasServiceProjectItem = this.form.serviceProjectId;
								}
								else {
									this.hasServiceProjectItem = this.form.serviceName;
								}
							});
						}
						else {
							this.hasServiceProjectItem = this.form.serviceName;
						}
						resolve()
					}).catch(() => {
						this.$message.error("服务项目搜索失败！");
						reject()
					});

					//服务人员---字典数据
					getServiceManData(id).then(response => {
						this.serviceManOptions = response;
						if(this.serviceManOptions && this.serviceManOptions.length !== 0){
							this.serviceManOptions.forEach(item=>{
								if (item.servicePersonId === this.form.serviceManId) {
									this.hasServiceManItem = this.form.serviceManId;
								}
								else {
									this.hasServiceManItem = this.form.serviceMan;
								}
							});
						}
						else {
							this.hasServiceManItem = this.form.serviceMan;
						}
						resolve()
					}).catch(() => {
						this.$message.error('‘服务人员’数据字典接口请求失败！');
						reject()
					});
				});
			},
			//选择日期，计算年龄
			birthdayChange(val){
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
				closeSelectedTag(this, this.$route);
				this.$router.push({path: '/streetPlatform/serviceActivityConfig/serviceRecord'});
			},
			//下一步
			tabsStep(tabsName) {
				this.activeTabs = tabsName;
			},
			//只能输入数字类型和一位小数
			transformFloatNumber1(value,obj){
				this.form[obj] = transformFloatNumber1(value);
			},
			//获取服务项目的id
			getServicePointId(value){
				this.form.serviceItem = value;
			},
			//确定按钮-提交表单
			editContent(formName) {
				if (this.form.serviceHours) {
					const reg = /^[0-9]+(.[0-9]{0,1})?$/;
					if(!reg.test(this.form.serviceHours)){
						return this.$message.error('服务时长为整数或小数类型，且允许输入一位小数！');
					}
				}
				this.$refs[formName].validate((valid, object) => {
					if (valid) {
						//服务商
						if(this.orgIdOptions && this.orgIdOptions.length !== 0){
							this.orgIdOptions.forEach(item=>{
								if (item.orgId === this.hasOrgIdItem) {
									this.form.orgId = this.hasOrgIdItem;
								}
							});
						}

						//服务项目
						if(this.serviceNameOptions && this.serviceNameOptions.length !== 0){
							this.serviceNameOptions.forEach(item=>{
								if (item.serviceProjectId === this.hasServiceProjectItem) {
									this.form.serviceProjectId = this.hasServiceProjectItem;
								}
							});
						}

						//服务人员
						if(this.serviceManOptions && this.serviceManOptions.length !== 0){
							this.serviceManOptions.forEach(item=>{
								if (item.servicePersonId === this.hasServiceManItem) {
									this.form.serviceManId = this.hasServiceManItem;
								}
							});
						}

						let params = this.form;

						//新增
						if (this.modelType === 'add') {
							submitDataAdd(params).then(response => {
								if (response.code === 0) {
									this.$message({
										type: 'success',
										message: "新增‘" + this.form.fullName + "’服务记录成功!"
									});
									//关闭页面
									this.closeDetailsPage();
								}
								else {
									this.$message.error(response.msg);
								}
							}).catch(() => {
								this.$message.error("新增‘" + this.form.fullName + "’服务记录失败!");
							});
						}
						//编辑
						else if (this.modelType === 'edit') {
							submitDataEdit(params).then(response => {
								if (response.code === 0) {
									this.$message({
										type: 'success',
										message: "编辑‘" + this.form.fullName + "’服务记录成功!"
									});
									//关闭页面
									this.closeDetailsPage();
								}
								else {
									this.$message.error(response.msg);
								}
							}).catch(() => {
								this.$message.error("编辑‘" + this.form.fullName + "’服务记录失败!");
							});
						}
						//查看
						else if (this.modelType === 'look') {
							//关闭页面
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
			//查看详情页面，点击编辑按钮
			toEditType() {
				let _id_ = this.$route.query.id;
				this.$router.push({
					path: `/serviceRecord/details/${_id_}`,
					query: {'id': _id_, 'modelType': 'edit', '_title': `编辑${this.form.fullName}`} //modelType: 查看:look，编辑:edit，新增:add的类型
				});
			},
			//输入身份证表单，进行校验
			handleIdCardInput(value) {
				this.$refs['form_base'].validateField('idCard', (message) => {
					let valid = message === '';
					if (valid) {
						validateID_serverRecord(this.form.idCard).then(response => {
							//身份证校验成功，后台没有该身份证的数据
							if (response.code === 0 || response.code === '0') {
								let _birthday = getBirthdayFromIdCard(this.form.idCard);
								this.form.birthday = _birthday;
								this.age = computerAge(_birthday);
							}
							//身份证校验成功，后台有该身份证的数据,且提示用户是否代入数据
							else if(response.code === 2 || response.code === '2'){
								let _birthday = getBirthdayFromIdCard(this.form.idCard);
								this.form.birthday = _birthday;
								this.age = computerAge(_birthday);

								this.$confirm('该身份证号已有对应人员信息，是否加载？', '提示', {
									confirmButtonText: '确定',
									cancelButtonText: '取消',
									type: 'warning'
								}).then(() => {
									this.modelType = 'edit';
									if(!response.date.bizExtendContentVo){
										//富文本内容
										response.date.bizExtendContentVo = {
											parentId: '',//父id
											content: '',//内容
											id: '',//服务项目id
											infoType: '',//内容类型
										};
									}
									//页面form表单的值
									this.form = response.date;
									//计算年龄
									if(this.form.birthday){
										this.birthdayChange(this.form.birthday);
									}
									//根据服务商的值，加载服务项目和服务人员
									if(this.form.orgId){
										this.getFacilitatorCascadeData(this.form.orgId);
									}
									this.idEdit = false;
								}).catch(() => {
									//this.$message.error("取消导入的数据！");
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
				this.$refs.form_address.resetFields();
				this.areaCode = [[], []];
				this.$refs.form_remark.resetFields();
			},
			//服务商---改变选择的值，动态加载对应的服务项目、服务人员
			changeOrgId(value){
				this.serviceNameOptions = [];
				this.serviceManOptions = [];
				this.form.serviceProjectId = '';
				this.form.serviceManId = '';

				if(value){
					this.getFacilitatorCascadeData(value);
				}
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
