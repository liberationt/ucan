<!--社会组织管理-->
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
							         :rules="this.isEditForm?rulesForm:null" label-width="160px">
								<el-row :gutter="0">
									<el-col :md="this.adaptiveGrid.md" :lg="this.adaptiveGrid.lg">
										<el-form-item :label="this.isEditForm?'组织名称':'组织名称：'" prop="orgName">
											<el-input v-if="this.isEditForm" ref="orgName" v-model="form.orgName"
											          @keyup.enter.native="editContent('form_base')"
											          clearable placeholder="请输入组织名称"></el-input>
											<span v-else>{{form.orgName}}</span>
										</el-form-item>
									</el-col>
									<el-col :md="this.adaptiveGrid.md" :lg="this.adaptiveGrid.lg">
										<el-form-item :label="this.isEditForm?'统一社会信用社代码':'统一社会信用社代码：'" prop="orgCode">
											<el-input v-if="this.isEditForm" ref="orgCode" v-model="form.orgCode"
											          @keyup.enter.native="editContent('form_base')"
											          @keyup.native="transformNumberLetter(form.orgCode,'orgCode')"
											          clearable placeholder="请输入统一社会信用社代码"></el-input>
											<span v-else>{{form.orgCode}}</span>
										</el-form-item>
									</el-col>
									<el-col :md="this.adaptiveGrid.md" :lg="this.adaptiveGrid.lg">
										<el-form-item :label="this.isEditForm?'组织类型':'组织类型：'" prop="orgType">
											<el-select v-if="this.isEditForm" v-model="form.orgType" ref="orgType"
											           placeholder="请选择组织类型" clearable style="width:100%;">
												<el-option v-if="orgTypeOptions.length !== 0"
												           v-for="item in orgTypeOptions" :key="item.dictValue"
												           :label="item.dictLabel" :value="item.dictValue"></el-option>
											</el-select>
											<span v-else>{{form.orgTypeName}}</span>
										</el-form-item>
									</el-col>
									<el-col :md="this.adaptiveGrid.md" :lg="this.adaptiveGrid.lg">
										<el-form-item :label="this.isEditForm?'咨询电话':'咨询电话：'" prop="phone">
											<el-input v-if="this.isEditForm" ref="phone" v-model="form.phone"
											          @keyup.enter.native="editContent('form_base')"
											          clearable placeholder="请输入咨询电话"></el-input>
											<span v-else>{{form.phone}}</span>
										</el-form-item>
									</el-col>
									<el-col :md="this.adaptiveGrid.md" :lg="this.adaptiveGrid.lg">
										<el-form-item :label="this.isEditForm?'成立日期':'成立日期：'" prop="establishTime">
											<el-date-picker v-if="this.isEditForm" v-model="form.establishTime"
											                @keyup.enter.native="editContent('form_base')"
											                type="date"
											                format="yyyy年MM月dd日"
											                value-format="yyyy-MM-dd"
											                placeholder="请选择成立日期" style="width:100%;"></el-date-picker>
											<span v-else>{{form.establishTime}}</span>
										</el-form-item>
									</el-col>
									<el-col :md="this.adaptiveGrid.md" :lg="this.adaptiveGrid.lg">
										<el-form-item :label="this.isEditForm?'有效日期':'有效日期：'" prop="validDate">
											<el-date-picker v-if="this.isEditForm" v-model="form.validDate"
											                @keyup.enter.native="editContent('form_base')"
											                type="date"
											                format="yyyy年MM月dd日"
											                value-format="yyyy-MM-dd"
											                placeholder="请选择有效日期" style="width:100%;"></el-date-picker>
											<span v-else>{{form.validDate}}</span>
										</el-form-item>
									</el-col>
									<el-col :md="this.adaptiveGrid.md" :lg="this.adaptiveGrid.lg">
										<el-form-item :label="this.isEditForm?'办公行政区划':'办公行政区划：'" prop="officeArea">
											<Address v-if="this.isEditForm" :id-edit="idEdit" :area-code="officeArea" @keyup.enter.native="editContent('form_base')"
											         :form-code="form.officeArea" @getAreaCode="getAreaCode_reg"
											         :width="'100%'"></Address>
											<span v-else>{{form.officeAreaName}}</span>
										</el-form-item>
									</el-col>
									<el-col :md="this.adaptiveGrid.md" :lg="this.adaptiveGrid.lg">
										<el-form-item :label="this.isEditForm?'办公详细地址':'办公详细地址：'" prop="officeAddr">
											<el-input v-if="this.isEditForm" ref="officeAddr" v-model="form.officeAddr"
											          @keyup.enter.native="editContent('form_base')"
											          clearable placeholder="请输入办公详细地址"></el-input>
											<span v-else>{{form.officeAddr}}</span>
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
							<el-form ref="form_yunying" key="form_yunying" :model="form"
							         :rules="this.isEditForm?rulesForm:null" label-width="140px">
								<el-row :gutter="0">
									<el-col :md="this.adaptiveGrid.md" :lg="this.adaptiveGrid.lg">
										<el-form-item :label="this.isEditForm?'法人姓名':'法人姓名：'" prop="legalName">
											<el-input v-if="this.isEditForm" ref="legalName" v-model="form.legalName"
											          @keyup.enter.native="editContent('form_base')"
											          clearable placeholder="请输入法人姓名"></el-input>
											<span v-else>{{form.legalName}}</span>
										</el-form-item>
									</el-col>
									<el-col :md="this.adaptiveGrid.md" :lg="this.adaptiveGrid.lg">
										<el-form-item :label="this.isEditForm?'法人身份证':'法人身份证：'" prop="legalIdCard">
											<el-input v-if="this.isEditForm" ref="legalIdCard" v-model="form.legalIdCard"
											          @keyup.enter.native="editContent('form_base')"
											          clearable placeholder="请输入法人身份证"></el-input>
											<span v-else>{{form.legalIdCard}}</span>
										</el-form-item>
									</el-col>
									<el-col :md="this.adaptiveGrid.md" :lg="this.adaptiveGrid.lg">
										<el-form-item :label="this.isEditForm?'法人联系方式':'法人联系方式：'" prop="legalPhone">
											<el-input v-if="this.isEditForm" ref="legalPhone" v-model="form.legalPhone"
											          @keyup.enter.native="editContent('form_base')"
											          clearable placeholder="请输入法人联系方式"></el-input>
											<span v-else>{{form.legalPhone}}</span>
										</el-form-item>
									</el-col>
									<el-col :md="this.adaptiveGrid.md" :lg="this.adaptiveGrid.lg">
										<el-form-item :label="this.isEditForm?'联系人姓名':'联系人姓名：'" prop="linkman">
											<el-input v-if="this.isEditForm" ref="linkman" v-model="form.linkman"
											          @keyup.enter.native="editContent('form_base')"
											          clearable placeholder="请输入联系人姓名"></el-input>
											<span v-else>{{form.linkman}}</span>
										</el-form-item>
									</el-col>
									<el-col :md="this.adaptiveGrid.md" :lg="this.adaptiveGrid.lg">
										<el-form-item :label="this.isEditForm?'联系人身份证':'联系人身份证：'" prop="lmIdCard">
											<el-input v-if="this.isEditForm" ref="lmIdCard" v-model="form.lmIdCard"
											          @keyup.enter.native="editContent('form_base')"
											          clearable placeholder="请输入联系人身份证"></el-input>
											<span v-else>{{form.lmIdCard}}</span>
										</el-form-item>
									</el-col>
									<el-col :md="this.adaptiveGrid.md" :lg="this.adaptiveGrid.lg">
										<el-form-item :label="this.isEditForm?'联系人联系方式':'联系人联系方式：'" prop="lmMobile">
											<el-input v-if="this.isEditForm" ref="lmMobile" v-model="form.lmMobile"
											          @keyup.enter.native="editContent('form_base')"
											          clearable placeholder="请输入联系人联系方式"></el-input>
											<span v-else>{{form.lmMobile}}</span>
										</el-form-item>
									</el-col>
								</el-row>
							</el-form>
						</el-collapse-item>
						<!--运营信息item end-->

						<!--相关信息item start-->
						<el-collapse-item name="baseItem_3">
							<template slot="title">
								<div class="titleSlider">
									<span>
										<i class="titleTip"></i>相关信息
									</span>
								</div>
							</template>
							<el-form ref="form_xiangguang" key="form_xiangguang" :model="form"
							         :rules="this.isEditForm?rulesForm:null" label-width="140px">
								<el-row :gutter="0">
									<el-col :md="this.adaptiveGrid.md" :lg="this.adaptiveGrid.lg">
										<el-form-item :label="this.isEditForm?'关联项目':'关联项目：'" prop="guanlianxiangmu">
											<el-select v-if="this.isEditForm" ref="guanlianxiangmu" v-model="guanlianxiangmuId" @keyup.enter.native="editContent('form_base')"
											           placeholder="请选择关联项目" clearable style="width:100%;" multiple @change="guanlianxiangmuChange">
												<el-option v-if="guanlianxiangmuOptions.length !== 0"
												           v-for="item in guanlianxiangmuOptions" :key="item.id"
												           :label="item.serviceName" :value="item.id"></el-option>
											</el-select>
											<span v-else>{{guanlianxiangmuName.join(',')}}</span>
										</el-form-item>
									</el-col>
								</el-row>
							</el-form>
						</el-collapse-item>
						<!--相关信息item end-->

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
					<el-button v-if="editAuthority && isEdit !== '0'" type="warning" class="base-btn btnMarginLeft15" @click="toEditType">
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
		userDetailsData,
		submitDataAdd,
		submitDataEdit,
		relatedProjectsSelectData
	} from "@/api/sidekickProjectConfig/socialOrgManagement";
	import {allSelectdictionaryData} from '@/api/facilitiesConfig/communityFacilities'
	import {adaptiveGrid_max, adaptiveGrid_plus} from "@/common/index";
	import Address from "@/components/Address";
	import {closeSelectedTag} from "@/utils/rooterJump";
	import {getEditAuthority} from "@/api/user";
	import QuillEditor from "@/components/QuillEditor";
	import {
		validateForms,
		scrollToTop,
		scrollToEl,
		transformNumber,
		transformNumberLetter,
		limitTextEllipsis
	} from "@/utils/index";
	import {verifyHomePhoneOrMobile} from '@/utils/validate';

	export default {
		components: {Address, QuillEditor},
		data() {
			//身份证校验
			let verifyLegalIdCard = (rule, value, callback) => {
				if (value !== '') {
					const reg = /(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}$)/;
					if (reg.test(value) && value !== '') {
						callback();
					}
					else {
						callback(new Error('请输入正确的身份证号码！'));
					}
				} else {
					callback(new Error('身份证号码不能为空，请输入！'));
				}
			};

			//关联项目
			let verifyGuanlianxiangmu = (rule, value, callback) => {
				if (this.guanlianxiangmuId.length !== 0) {
					callback();
				} else {
					callback(new Error('关联项目不能为空，请选择！'));
				}
			};

			return {
				orgTypeOptions: [],//组织类型
				//下拉框字典数据
				guanlianxiangmuOptions: [],//关联项目

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
					orgName:'',//组织名称
					orgTypeName:'',//组织类型
					orgType:'',//组织类型
					phone:'',//咨询电话
					establishTime:'',//成立日期
					validDate:'',//有效日期
					orgCode:'',//统一社会信用社代码
					officeArea: [],//办公行政区划
					officeAddr:'',//办公详细地址

					legalName:'',//法人姓名
					legalIdCard:'',//法人身份证
					legalPhone:'',//法人联系方式
					linkman:'',//联系人姓名
					lmIdCard:'',//联系人身份证
					lmMobile:'',//联系人联系方式

					//refProject: '',//关联项目
					//refProjectName:'',//关联项目
				},

				loading: false,

				guanlianxiangmuId: [],//关联项目回显值id
				guanlianxiangmuName:[],////关联项目回显值name

				editorOption: {},

				//form 表单的验证规则
				rulesForm: {
					//组织名称
					orgName:[
						{required: true, trigger: 'blur', message:'组织名称不能为空，请输入！'},
						{max: 100, message: '组织名称不能超过100个字符', trigger: 'blur'}
					],
					//统一社会信用代码
					orgCode:[
						{required: true, trigger: 'blur', message:'统一社会信用代码不能为空，请输入！'},
						{max: 100, message: '统一社会信用代码不能超过100个字符', trigger: 'blur'}
					],
					//咨询电话
					phone:[
						{required: true, trigger: 'blur', message: '咨询电话不能为空'},
						{required: true, trigger: 'change', validator: verifyHomePhoneOrMobile},
						{required: true, trigger: 'blur', validator: verifyHomePhoneOrMobile},
					],
					//法人姓名
					legalName:[
						{required: true, trigger: 'blur', message:'法人姓名不能为空，请输入！'},
						{max: 50, message: '法人姓名不能超过50个字符', trigger: 'blur'}
					],
					//法人身份证
					legalIdCard:[
						{required: true, trigger: 'blur', message:'法人身份证不能为空，请输入！'},
						{required: true, trigger: 'blur', validator: verifyLegalIdCard},
					],
					//法人联系电话
					legalPhone:[
						{required: true, trigger: 'blur', message: '法人联系方式不能为空'},
						{required: true, trigger: 'change', validator: verifyHomePhoneOrMobile},
						{required: true, trigger: 'blur', validator: verifyHomePhoneOrMobile},
					],
					//联系人姓名
					linkman:[
						{required: true, trigger: 'blur', message:'联系人姓名不能为空，请输入！'},
						{max: 50, message: '联系人姓名不能超过50个字符', trigger: 'blur'}
					],
					//联系人身份证
					lmIdCard:[
						{required: true, trigger: 'blur', message:'联系人身份证不能为空，请输入！'},
						{trigger: 'blur', validator: verifyLegalIdCard},
					],
					//联系人联系电话
					lmMobile:[
						{required: true, trigger: 'blur', message: '联系人联系方式不能为空'},
						{required: true, trigger: 'change', validator: verifyHomePhoneOrMobile},
						{required: true, trigger: 'blur', validator: verifyHomePhoneOrMobile},
					],
					//关联项目
					guanlianxiangmu:[
						{required: true, trigger: 'change', validator: verifyGuanlianxiangmu},
					],
				},

				activeTabs: 'base',//tab标签切换默认选中name参数
				activeCollapse:
					['baseItem_1', 'baseItem_2', 'baseItem_3', 'baseItem_4', 'baseItem_5', 'baseItem_6'],//折叠面板默认打开name参数

				//自适应
				adaptiveGrid: {
					md: adaptiveGrid_max.md,
					lg: adaptiveGrid_max.lg
				},
				//自适应
				adaptiveGrid_plus: {
					md: adaptiveGrid_plus.md,
					lg:
					adaptiveGrid_plus.lg
				},

				modelType: '',//查看：look  编辑：edit  新增：add
				instituType: '',//机构类型
				editAuthority: false,//编辑按钮的权限
				officeArea: [],//所属居委全部ID
				quillEditorHtml:'',//富文本的内容
				imageInfoVos:[],//富文本图片的集合
        isEdit: '1'
			}
		},
		//在模板渲染成html后调用，通常是初始化页面完成后，再对html的dom节点进行一些需要的操作。
		mounted() {
			this.modelType = this.$route.query.modelType;
      this.isEdit = this.$route.query.dis
			//当前机构id
			let _userId_ = this.$route.query.id || '';
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
			// 异步事件同步化
			async getData(id) {
				await this.getSelect();
				if (this.modelType === 'edit') {
					this.isEditForm = true;
					await
						this.editGetData(id, 'edit');
				}
				else if (this.modelType === 'add') {
					this.isEditForm = true;
					this.idEdit = false;
				}
				else if (this.modelType === 'look') {
					this.isEditForm = false;
					await
						this.editGetData(id, '');
				}
			},
			// 编辑-查看 获取数据
			editGetData(id, st) {
				return new Promise((resolve, reject) => {
					//请求当前服务项目信息
					userDetailsData(id, st).then(response => {
						//页面form表单的值
						this.form = response;
						if(this.form.volunteerProjectList){
							this.form.volunteerProjectList.forEach(item=>{
								this.guanlianxiangmuId.push(item.id);//关联项目回显值id
								this.guanlianxiangmuName.push(item.serviceName);////关联项目回显值name
							});
						}
						//处理区域的code,用以渲染区域下拉组件
						if (st === 'edit') {
							//区域范围
							this.form.officeArea = this.form.officeArea?this.form.officeArea.split(','):[];
						}
						this.idEdit = false;
					}).catch(() => {
						this.$message.error("获取社会组织管理信息失败！");
					});
				})
			},
			// 获取下拉字典
			getSelect() {
				return new Promise((resolve, reject) => {
					//数据字典接口
					let dicKey = 'org_type';
					allSelectdictionaryData(dicKey).then(response => {
						if (response.code === 0) {
							for (let k in response.data) {
								switch (k) {
									//组织类型
									case 'org_type':
										this.orgTypeOptions = response.data[k];
										break;
								}
							}
						}
						else {
							this.$message.error('数据字典接口请求失败！')
						}
						resolve()
					}).catch(() => {
						this.$message.error('数据字典接口请求失败！')
						reject()
					});

					//关联项目
					relatedProjectsSelectData().then(response => {
						this.guanlianxiangmuOptions = response;
						resolve()
					}).catch(() => {
						this.$message.error('关联项目接口请求失败！')
						reject()
					});
				})
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
				this.$router.push({path: '/sidekickProjectConfig/socialOrgManagement'});
			},
			//下一步
			tabsStep(tabsName) {
				this.activeTabs = tabsName;
			},
			//关联项目change事件
			guanlianxiangmuChange(val){
				this.form.volunteerProjectList = [];
				val.forEach(item=>{
					this.guanlianxiangmuOptions.forEach(item1=>{
						if (item === item1.id){
							let arr = {
								id:item1.id,
								serviceName:item1.serviceName
							};
							this.form.volunteerProjectList.push(arr);
						}
					});
				});
			},
			//确定按钮-提交表单
			editContent(formName) {
				let formRefs = ['form_base', 'form_yunying','form_xiangguang'].map(key => this.$refs[key]);
				validateForms(formRefs).then(() => {
					//办公详细地址
					if(this.form.officeAddr && this.form.officeAddr.length > 100){
						return this.$message.error("办公详细地址长度不能超过100，请重新输入！");
					}
					let params = this.form;
					params.officeArea = this.officeArea.length === 0 ? '' : this.officeArea[this.officeArea.length - 1] + '';
					let _title_ = limitTextEllipsis(this.form.orgName,10);
					//新增
					if (this.modelType === 'add') {
						submitDataAdd(params).then(response => {
							if (response.code === 0) {
								this.$message({
									type: 'success',
									message: "新增‘" + _title_ + "’社会组织成功!"
								});
								//关闭页面
								this.closeDetailsPage();
							}
							else {
								this.$message.error(response.msg);
							}
						}).catch(() => {
							this.$message.error("新增‘" + _title_ + "’社会组织失败!");
						});
					}
					//编辑
					else if (this.modelType === 'edit') {
						submitDataEdit(params).then(response => {
							if (response.code === 0) {
								this.$message({
									type: 'success',
									message: "编辑‘" + _title_ + "’社会组织成功!"
								});
								//关闭页面
								this.closeDetailsPage();
							}
							else {
								this.$message.error(response.msg);
							}
						}).catch(() => {
							this.$message.error("编辑‘" + _title_ + "’社会组织失败!");
						});
					}
					//查看
					else if (this.modelType === 'look') {
						//关闭页面
						this.closeDetailsPage();
					}

				}).catch(objectList => {
					scrollToTop();
				});
			},
			//只能输入数字类型和字母类型
			transformNumberLetter(value,obj){
				this.form[obj] = transformNumberLetter(value);
			},
			//查看详情页面，点击编辑按钮
			toEditType() {
				let _id_ = this.$route.query.id;
				let _title_ = limitTextEllipsis(this.form.orgName,10);
				this.$router.push({
					path: `/socialOrgManagement/details/${_id_}`,
					query: {'id': _id_, 'modelType': 'edit', '_title': `编辑${_title_}`} //modelType: 查看:look，编辑:edit，新增:add的类型
				});
			},
			// 获取所属居委
			getAreaCode_reg(val) {
				this.officeArea = val;
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
<style>
	.beforRequired label::before{
		content: '*';
		color: #ff4949;
		display: inline-block;
		margin-right: 0px;
	}
</style>
