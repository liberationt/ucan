<!--志愿者服务项目-->
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
									<el-col :md="this.adaptiveGrid.md" :lg="12">
										<el-form-item :label="this.isEditForm?'项目名称':'项目名称：'" prop="serviceName">
											<el-input v-if="this.isEditForm" ref="serviceName" v-model="form.serviceName"
											          @keyup.enter.native="editContent('form_base')"
											          clearable placeholder="请输入项目名称"></el-input>
											<span v-else>{{form.serviceName}}</span>
										</el-form-item>
									</el-col>
									<el-col :md="this.adaptiveGrid.md" :lg="12">
										<el-form-item :label="this.isEditForm?'项目类型':'项目类型：'" prop="serviceType">
											<el-select v-if="this.isEditForm" v-model="form.serviceType" ref="serviceType"
											           placeholder="请选择项目类型" clearable style="width:100%;">
												<el-option v-if="serviceTypeOptions.length !== 0"
												           v-for="item in serviceTypeOptions" :key="item.dictValue"
												           :label="item.dictLabel" :value="item.dictValue"></el-option>
											</el-select>
											<span v-else>{{form.serviceTypeName}}</span>
										</el-form-item>
									</el-col>
									<el-col :md="this.adaptiveGrid.md" :lg="12">
										<el-form-item :label="this.isEditForm?'承接单位':'承接单位：'" prop="undertakeUnit">
											<el-input v-if="this.isEditForm" ref="undertakeUnit" v-model="form.undertakeUnit"
											          @keyup.enter.native="editContent('form_base')"
											          clearable placeholder="请输入承接单位"></el-input>
											<span v-else>{{form.undertakeUnit}}</span>
										</el-form-item>
									</el-col>
									<el-col :md="this.adaptiveGrid.md" :lg="12">
										<el-form-item :label="this.isEditForm?'项目周期':'项目周期：'"  prop="projectDaterange">
											<el-date-picker v-if="this.isEditForm" v-model="projectDaterange"
											                @keyup.enter.native="editContent('form_base')"
											                type="daterange"
											                placeholder="请选择发布日期" style="width:100%;"
											                range-separator="-"
											                start-placeholder="开始日期"
											                end-placeholder="结束日期"
											                format="yyyy-MM-dd"
											                value-format="yyyy-MM-dd"
															@change="projectDaterangeChange"
											></el-date-picker>
											<span v-else>{{projectDaterange.join('至')}}</span>
										</el-form-item>
									</el-col>
									<el-col :md="this.adaptiveGrid.md" :lg="12">
										<el-form-item :label="this.isEditForm?'项目负责人':'项目负责人：'" prop="linkman">
											<el-input v-if="this.isEditForm" ref="linkman" v-model="form.linkman"
											          @keyup.enter.native="editContent('form_base')"
											          clearable placeholder="请输入项目负责人"></el-input>
											<span v-else>{{form.linkman}}</span>
										</el-form-item>
									</el-col>
									<el-col :md="this.adaptiveGrid.md" :lg="12">
										<el-form-item :label="this.isEditForm?'负责人联系方式':'负责人联系方式：'" prop="phone">
											<el-input v-if="this.isEditForm" ref="phone" v-model="form.phone"
											          @keyup.enter.native="editContent('form_base')"
											          clearable placeholder="请输入负责人联系方式"></el-input>
											<span v-else>{{form.phone}}</span>
										</el-form-item>
									</el-col>
									<el-col :span="24" style="height:auto;">
										<el-form-item :label="this.isEditForm?'项目内容':'项目内容：'" prop="content">
											<div v-if="this.isEditForm">
												<QuillEditor ref="quillEditor" @pics="getPicList" @gethtml="getEditorHtml" :editor-content="form.bizExtendContentVo.content"></QuillEditor>
												<el-input ref="content" v-model="form.bizExtendContentVo.content" style="display: none;"></el-input>
											</div>
											<div v-else class="ql-container ql-snow">
												<div v-html="form.bizExtendContentVo.content" class="ql-editor bizExtendContentVoDiv"></div>
											</div>
										</el-form-item>
									</el-col>

								</el-row>
							</el-form>
						</el-collapse-item>
						<!--基本信息item end-->

						<!--服务范围item start-->
						<el-collapse-item name="baseItem_2">
							<template slot="title">
								<div class="titleSlider">
									<span>
										<i class="titleTip"></i>服务范围
									</span>
								</div>
							</template>
							<el-form ref="form_server" key="form_server" :model="form"
							         :rules="this.isEditForm?rulesForm:null" label-width="140px">
								<el-row :gutter="0">
									<el-col :md="this.adaptiveGrid.md" :lg="12">
										<el-form-item :label="this.isEditForm?'区域范围':'区域范围：'" prop="serviceArea">
											<Address v-if="this.isEditForm" :id-edit="idEdit" :area-code="serviceArea" @keyup.enter.native="editContent('form_base')"
											         :form-code="form.serviceArea" @getAreaCode="getAreaCode_reg"
											         :width="'100%'"></Address>
											<span v-else>{{form.serviceAreaName}}</span>
										</el-form-item>
									</el-col>
									<el-col :md="this.adaptiveGrid.md" :lg="12">
										<el-form-item :label="this.isEditForm?'服务对象':'服务对象：'" prop="serviceTarget">
											<el-select v-if="this.isEditForm" v-model="form.serviceTarget" @keyup.enter.native="editContent('form_base')"
											           placeholder="请选择服务对象" clearable style="width:100%;">
												<el-option v-if="service_targetOptions.length !== 0"
												           v-for="item in service_targetOptions" :key="item.dictValue"
												           :label="item.dictLabel" :value="item.dictValue"></el-option>
											</el-select>
											<span v-else>{{form.serviceTargetName}}</span>
										</el-form-item>
									</el-col>
								</el-row>
							</el-form>
						</el-collapse-item>
						<!--服务范围item end-->

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
					<el-button v-if="editAuthority && this.isEdit !== '0'" type="warning" class="base-btn btnMarginLeft15" @click="toEditType" >
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
		submitDataEdit
	} from "@/api/sidekickProjectConfig/volunteerServiceProject";
	import {allSelectdictionaryData} from '@/api/facilitiesConfig/communityFacilities'
	import {adaptiveGrid_max, adaptiveGrid_plus} from "@/common/index";
	import Address from "@/components/Address";
	import {closeSelectedTag} from "@/utils/rooterJump";
	import {getEditAuthority} from "@/api/user";
	import QuillEditor from "@/components/QuillEditor";
	import {getDate_YMD,
		limitTextEllipsis,
		transformNumber,
		validateForms,
		scrollToTop,
		scrollToEl,} from "@/utils/index";
	import {verifyHomePhoneOrMobile} from '@/utils/validate';

	export default {
		components: {Address, QuillEditor},
		data() {
			//校验区域范围
			let verifyAreaCode = (rule, value, callback) => {
				if (this.serviceArea.length === 0 || this.serviceArea[0] === '') {
					callback(new Error('区域范围不能为空，请选择！'));
				}
				else {
					callback();
				}
			};

			return {
				serviceTypeOptions: [],//项目类型
				//下拉框字典数据
				service_targetOptions: [],//服务对象

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
					serviceName:'',//项目名称
					serviceTypeName:'',//项目类型
					serviceType:'',//项目类型
					undertakeUnit:'',//承接单位
					beginTime:'',//项目开始时间
					endTime:'',//项目结束时间
					linkman:'',//项目负责人
					phone:'',//负责人联系方式

					//-----基本信息-------
					//富文本内容
					bizExtendContentVo: {
						parentId: '',//父id
						content: '',//内容
						id: '',//服务项目id
						infoType: '',//内容类型
					},
					serviceArea: [],//
					serviceTarget: '',//服务对象
				},

				projectDaterange:[],//项目周期

				loading: false,

				editorOption: {},

				//form 表单的验证规则
				rulesForm: {
					//项目名称
					serviceName:[
						{required: true, trigger: 'blur', message:'项目名称不能为空，请输入！'},
						{max: 20, message: '项目名称不能超过20个字符', trigger: 'blur'}
					],
					//项目类型
					serviceType:[
						{required: true, trigger: 'change', message:'请选择项目类型!'},
					],
					//负责人联系方式
					phone:[
						{trigger: 'change', validator: verifyHomePhoneOrMobile},
					],
					//所属居委
					serviceArea: [
						{required: true, trigger: 'change', validator: verifyAreaCode},
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
				serviceArea: [],//所属居委全部ID
				// quillEditorHtml:'',//富文本的内容
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
						if(!response.bizExtendContentVo){
							//富文本内容
							response.bizExtendContentVo = {
								parentId: '',//父id
								content: '',//内容
								id: '',//服务项目id
								infoType: '',//内容类型
							};
						}
						if(response.beginTime !== '' && response.beginTime !== null && response.endTime !== '' && response.endTime !== null){
							this.projectDaterange.push(response.beginTime);
							this.projectDaterange.push(response.endTime);
						}
						//页面form表单的值
						this.form = response;

						//处理区域的code,用以渲染区域下拉组件
						if (st === 'edit') {
							//区域范围
							this.form.serviceArea = this.form.serviceArea?this.form.serviceArea.split(','):[];
						}
						this.idEdit = false;
					}).catch(() => {
						this.$message.error("获取志愿者服务项目信息失败！");
					});
				})
			},
			// 获取下拉字典
			getSelect() {
				return new Promise((resolve, reject) => {
					//数据字典接口
					let dicKey = 'service_type,v_service_target';
					allSelectdictionaryData(dicKey).then(response => {
						if (response.code === 0) {
							for (let k in response.data) {
								switch (k) {
									//项目类型
									case 'service_type':
										this.serviceTypeOptions = response.data[k];
										break;
									//服务对象
									case 'v_service_target':
										this.service_targetOptions = response.data[k];
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
					})
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
				this.$router.push({path: '/sidekickProjectConfig/volunteerServiceProject'});
			},
			//下一步
			tabsStep(tabsName) {
				this.activeTabs = tabsName;
			},
			//确定按钮-提交表单
			editContent(formName) {
				let formRefs = ['form_base', 'form_server'].map(key => this.$refs[key]);
				validateForms(formRefs).then(() => {
					//承接单位
					if(this.form.undertakeUnit && this.form.undertakeUnit.length > 50){
						return this.$message.error("承接单位长度不能超过50，请重新输入！");
					}
					//项目负责人
					if(this.form.linkman && this.form.linkman.length > 20){
						return this.$message.error("项目负责人长度不能超过20，请重新输入！");
					}
					//负责人联系方式
					if(this.form.phone && this.form.phone.length > 20){
						return this.$message.error("负责人联系方式长度不能超过20，请重新输入！");
					}

					let params = this.form;
					params.serviceArea = this.serviceArea.length === 0 ? '' : this.serviceArea[this.serviceArea.length - 1] + '';

					if (this.projectDaterange.length === 0) {
						params.beginTime = "";
						params.endTime = "";
					} else {
						params.beginTime = getDate_YMD(this.projectDaterange[0]) + "";
						params.endTime = getDate_YMD(this.projectDaterange[1]) + "";
					}

					//处理富文本
					params.bizExtendContentVo.content = this.form.bizExtendContentVo.content;
					params.bizExtendContentVo.id = this.form.bizExtendContentVo.id;
					params.bizExtendContentVo.infoType = this.form.bizExtendContentVo.infoType;
					params.bizExtendContentVo.parentId = this.form.bizExtendContentVo.parentId;
					params.imageInfoVos = this.imageInfoVos;

					let _title_ = limitTextEllipsis(this.form.serviceName,10);
					//新增
					if (this.modelType === 'add') {
						submitDataAdd(params).then(response => {
							if (response.code === 0) {
								this.$message({
									type: 'success',
									message: "新增‘" + _title_ + "’志愿者服务项目成功!"
								});
								//关闭页面
								this.closeDetailsPage();
							}
							else {
								this.$message.error(response.msg);
							}
						}).catch(() => {
							this.$message.error("新增‘" + _title_ + "’志愿者服务项目失败!");
						});
					}
					//编辑
					else if (this.modelType === 'edit') {
						submitDataEdit(params).then(response => {
							if (response.code === 0) {
								this.$message({
									type: 'success',
									message: "编辑‘" + _title_ + "’志愿者服务项目成功!"
								});
								//关闭页面
								this.closeDetailsPage();
							}
							else {
								this.$message.error(response.msg);
							}
						}).catch(() => {
							this.$message.error("编辑‘" + _title_ + "’志愿者服务项目失败!");
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
			//查看详情页面，点击编辑按钮
			toEditType() {
				let _title_ = limitTextEllipsis(this.form.serviceName,10);
				let _id_ = this.$route.query.id;
				this.$router.push({
					path: `/volunteerServiceProject/details/${_id_}`,
					query: {'id': _id_, 'modelType': 'edit', '_title': `编辑${_title_}`} //modelType: 查看:look，编辑:edit，新增:add的类型
				});
			},
			// 获取图片数据
			getPicList(val) {
				this.imageInfoVos = val;
			},
			//获取富文本的内容
			getEditorHtml(html) {
				// this.quillEditorHtml = html;
				this.form.bizExtendContentVo.content = html;
			},
			// 获取所属居委
			getAreaCode_reg(val) {
				this.serviceArea = val;
			},
			//只能输入数字类型和字母类型
			transformNumber(value,obj){
				this.form[obj] = transformNumber(value);
			},
			//项目周期change事件
			projectDaterangeChange(val){
				if(val === null){
					this.projectDaterange = [];
				}
			}
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
	.bizExtendContentVoDiv > p{
		margin: 0 !important;
	}
</style>
