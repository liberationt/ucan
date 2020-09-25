<!--活动项目管理-->
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
										<el-form-item :label="this.isEditForm?'活动名称':'活动名称：'" prop="serviceName">
											<el-input v-if="this.isEditForm" ref="serviceName" @keyup.enter.native="editContent('form_base')"
											          v-model="form.serviceName"
											          clearable placeholder="请输入活动名称"></el-input>
											<span v-else>{{form.serviceName}}</span>
										</el-form-item>
									</el-col>
									<el-col :md="this.adaptiveGrid.md" :lg="this.adaptiveGrid.lg">
										<el-form-item :label="this.isEditForm?'活动日期':'活动日期：'" prop="serviceDate">
											<el-date-picker v-if="this.isEditForm" v-model="form.serviceDate" @keyup.enter.native="editContent('form_base')"
											                type="date"
											                placeholder="请选择活动日期" style="width:100%;"
											                format="yyyy年MM月dd日"
											                value-format="yyyy-MM-dd"></el-date-picker>
											<span v-else>{{form.serviceDate}}</span>
										</el-form-item>
									</el-col>
									<el-col :md="this.adaptiveGrid.md" :lg="this.adaptiveGrid.lg">
										<el-form-item :label="this.isEditForm?'活动时间':'活动时间：'" prop="serviceTimeRange">
											<el-time-picker
													v-if="this.isEditForm" v-model="serviceTimeRange" @keyup.enter.native="editContent('form_base')"
													is-range
													range-separator="-"
													start-placeholder="开始时间"
													end-placeholder="结束时间"
													placeholder="选择时间范围"
													style="width:100%;"
													format="HH:mm"
													value-format="HH:mm"
													@change="getTimePicker">
											</el-time-picker>
											<span v-else>{{form.beginTime}} - {{form.endTime}}</span>
										</el-form-item>
									</el-col>
									<el-col :md="this.adaptiveGrid.md" :lg="this.adaptiveGrid.lg">
										<el-form-item :label="this.isEditForm?'活动地点':'活动地点：'" prop="orgId">
											<el-select
													v-if="this.isEditForm" @keyup.enter.native="editContent('form_base')"
													v-model="form.orgName"
													filterable
													remote
													reserve-keyword
													placeholder="请选择活动地点（可输入筛选）"
													:remote-method="remoteMethod"
													:loading="loading"
													style="width:100%;"
													@change="getServicePointId">
												<el-option v-if="orgIdOptions.length !== 0"
												           v-for="item in orgIdOptions"
												           :key="item.orgId"
												           :label="item.orgName"
												           :value="item.orgId">
												</el-option>
											</el-select>
											<span v-else>{{form.orgName}}</span>
										</el-form-item>
									</el-col>
									<el-col :md="this.adaptiveGrid.md" :lg="this.adaptiveGrid.lg">
										<el-form-item :label="this.isEditForm?'活动名额':'活动名额：'" prop="serviceNum">
											<el-input v-if="this.isEditForm" ref="serviceNum" v-model="form.serviceNum" @keyup.enter.native="editContent('form_base')"
											          clearable placeholder="请输入活动名额"
											          @keyup.native="transformNumber(form.serviceNum,'serviceNum')"></el-input>
											<span v-else>{{form.serviceNum}}</span>
										</el-form-item>
									</el-col>
									<el-col :md="this.adaptiveGrid.md" :lg="this.adaptiveGrid.lg">
										<el-form-item :label="this.isEditForm?'发布单位':'发布单位：'" prop="deptName">
											<el-input v-if="this.isEditForm" ref="deptName" v-model="form.deptName" @keyup.enter.native="editContent('form_base')"
											          disabled clearable placeholder="系统自动生成"></el-input>
											<span v-else>{{form.deptName}}</span>
										</el-form-item>
									</el-col>
									<el-col :md="24" :lg="16">
										<el-form-item :label="this.isEditForm?'同步发布':'同步发布：'" prop="synRelease"
										              class="synReleaseTip">
											<el-checkbox-group v-if="this.isEditForm" v-model="synRelease">
												<el-checkbox label="同步发布到网站"></el-checkbox>
												<el-checkbox label="同步发布到微信"></el-checkbox>
												<el-checkbox label="仅发布到后台"></el-checkbox>
											</el-checkbox-group>
											<span v-else><span v-for="(item,index) in synRelease">{{item}}{{index === synRelease.length-1?'':'，'}}</span></span>
										</el-form-item>
									</el-col>
									<el-col :span="24" style="height:auto;">
										<el-form-item :label="this.isEditForm?'活动内容':'活动内容：'" prop="phone">
											<div v-if="this.isEditForm">
												<QuillEditor ref="quillEditor" @pics="getPicList" @gethtml="getEditorHtml" :editor-content="form.bizExtendContentVo.content"></QuillEditor>
											</div>
											<div v-else class="ql-container ql-snow">
												<div v-html="form.bizExtendContentVo.content" class="ql-editor"></div>
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
		lazySearchOrgSite,
		submitDataAdd,
		submitDataEdit
	} from "@/api/serviceActivityConfig/activityProject";
	import {adaptiveGrid_max, adaptiveGrid_plus} from "@/common/index";
	import Address from "@/components/Address";
	import {closeSelectedTag} from "@/utils/rooterJump";
	import {transformNumber,transformNumberLetter} from "@/utils/index";
	import {getEditAuthority} from "@/api/user";

	import QuillEditor from "@/components/QuillEditor";

	export default {
		components: {Address, QuillEditor},
		data() {
			//校验机构名称
			let verifyFullName = (rule, value, callback) => {
				if (value.length === 0) {
					callback(new Error('活动名称不能为空，请输入！'));
				}
				else {
					if (/\s/.test(value)) {
						callback(new Error('活动名称不能包含空格，请重新输入！'));
					}
					else {
						if (value.length >= 100) {
							callback(new Error('活动名称长度不能超过100个汉字，请重新输入！'));
						}
						else {
							callback();
						}
					}
				}
			};

			//校验同步发布
			let verifySynRelease = (rule, value, callback) => {
				if (this.synRelease.length === 0) {
					callback(new Error('同步发布至少要选择一项！'));
				}
				else {
					callback();
				}
			};

			return {
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
					serviceName: '',//活动名称
					serviceDate: '',//活动日期
					beginTime: '',//活动开始时间
					endTime: '',//活动结束时间
					orgId: '',//活动地点
					orgName: '',//活动地点（汉字）
					serviceNum: '',//活动名额
					deptName: '',//发布单位

					syncWeb: 'N',//同步发布到网站
					syncWeixin: 'N',//同步发布到微信
					onlyBack: 'Y',//仅发布到后台
					//富文本内容
					bizExtendContentVo: {
						parentId: '',//父id
						content: '',//内容
						id: '',//活动项目id
						infoType: '',//内容类型
					},
				},
				synRelease: ['仅发布到后台'],//同步发布
				serviceTimeRange: ["", ""],//活动时间

				orgIdOptions: [],//活动地点

				loading: false,

				editorOption: {},
				//富文本配置
				// editorOption里是放图片上传配置参数用的，例如：
				// action:  '/api/product/richtext_img_upload.do',  // 必填参数 图片上传地址
				// methods: 'post',  // 必填参数 图片上传方式
				// token: '',  // 可选参数 如果需要token验证，假设你的token有存放在sessionStorage
				// name: 'upload_file',  // 必填参数 文件的参数名
				// size: 500,  // 可选参数   图片大小，单位为Kb, 1M = 1024Kb
				// accept: 'multipart/form-data, image/png, image/gif, image/jpeg, image/bmp, image/x-icon,image/jpg'  // 可选 可上传的图片格式

				//form 表单的验证规则
				rulesForm:{
					//活动名称
					serviceName: [
						{required: true, trigger: 'blur', validator: verifyFullName},
					],
					//同步发布
					synRelease:
						[
							{required: true, trigger: 'change', validator: verifySynRelease},
						]
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
			// 编辑-查看 获取活动项目的数据
			editGetData(id, st) {
				return new Promise((resolve, reject) => {
					//请求当前活动项目信息
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
						//同步发布
						this.synRelease = [];
						if (this.form.syncWeb === "Y") {
							this.synRelease.push('同步发布到网站');
						}
						if (this.form.syncWeixin === "Y") {
							this.synRelease.push('同步发布到微信');
						}
						if (this.form.onlyBack === "Y") {
							this.synRelease.push('仅发布到后台');
						}
						if (this.form.syncWeb === 'N' && this.form.syncWeixin === "N" && this.form.onlyBack === "N") {
							this.form.onlyBack = "Y";
							this.synRelease.push('仅发布到后台');
						}

						//活动时间
						this.serviceTimeRange = [];
						this.serviceTimeRange.push(this.form.beginTime);
						this.serviceTimeRange.push(this.form.endTime);

						this.idEdit = false;
					}).catch(() => {
						this.$message.error("获取活动项目信息失败！");
					});
				})
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
				this.$router.push({path: '/streetPlatform/serviceActivityConfig/activityProject'});
			},
			//下一步
			tabsStep(tabsName) {
				this.activeTabs = tabsName;
			},
			//只能输入数字类型
			transformNumber(value,obj){
				this.form[obj] = transformNumber(value);
			},
			//活动时间
			getTimePicker(value) {
			},
			//获取活动地点的id
			getServicePointId(value){
				this.form.orgId = value;
			},
			//活动地点搜索懒加载
			remoteMethod(value) {
				if (value) {
					let params = {
						orgName: value,
					};
					//请求当前活动项目信息
					lazySearchOrgSite(params).then(response => {
						this.orgIdOptions = response.data;
					}).catch(() => {
						this.$message.error("活动地点搜索失败！");
					});
				}
			},
			//确定按钮-提交表单
			editContent(formName) {
				this.$refs[formName].validate((valid, object) => {
					if (valid) {
						let params = this.form;

						params.syncWeb = params.syncWeixin = params.onlyBack = 'N';
						if (this.synRelease.length !== 0) {
							this.synRelease.forEach(function (item) {
								if (item === '同步发布到网站') {
									params.syncWeb = 'Y';
								}
								if (item === '同步发布到微信') {
									params.syncWeixin = 'Y';
								}
								if (item === '仅发布到后台') {
									params.onlyBack = 'Y';
								}
							});
						}
						else {
							params.onlyBack = 'Y';
						}

						//处理活动时间
						//活动时间
						this.form.beginTime = this.serviceTimeRange[0];
						this.form.endTime = this.serviceTimeRange[1];

						params.serviceNum = params.serviceNum === '' ? null : params.serviceNum;

						//处理富文本
						params.bizExtendContentVo.content = this.form.bizExtendContentVo.content;
						params.bizExtendContentVo.id = this.form.bizExtendContentVo.id;
						params.bizExtendContentVo.infoType = this.form.bizExtendContentVo.infoType;
						params.bizExtendContentVo.parentId = this.form.bizExtendContentVo.parentId;
						params.imageInfoVos = this.imageInfoVos;

						//新增
						if (this.modelType === 'add') {
							submitDataAdd(params).then(response => {
								if (response.code === 0) {
									this.$message({
										type: 'success',
										message: "新增‘" + this.form.serviceName + "’活动项目成功!"
									});
									//关闭页面
									this.closeDetailsPage();
								}
								else {
									this.$message.error(response.msg);
								}
							}).catch(() => {
								this.$message.error("新增‘" + this.form.serviceName + "’活动项目失败!");
							});
						}
						//编辑
						else if (this.modelType === 'edit') {
							submitDataEdit(params).then(response => {
								if (response.code === 0) {
									this.$message({
										type: 'success',
										message: "编辑‘" + this.form.serviceName + "’活动项目成功!"
									});
									//关闭页面
									this.closeDetailsPage();
								}
								else {
									this.$message.error(response.msg);
								}
							}).catch(() => {
								this.$message.error("编辑‘" + this.form.serviceName + "’活动项目失败!");
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
			}
			,
			//查看详情页面，点击编辑按钮
			toEditType() {
				let _id_ = this.$route.query.id;
				this.$router.push({
					path: `/activityProject/details/${_id_}`,
					query: {'id': _id_, 'modelType': 'edit', '_title': `编辑${this.form.serviceName}`} //modelType: 查看:look，编辑:edit，新增:add的类型
				});
			},
			// 获取图片数据
			getPicList(val) {
				this.imageInfoVos = val;
			},
			//获取富文本的内容
			getEditorHtml(html){
        // this.quillEditorHtml = html;
        this.form.bizExtendContentVo.content = html;
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
	.synReleaseTip > .el-form-item__content > .el-form-item__error {
		top: 70% !important;
	}
</style>
