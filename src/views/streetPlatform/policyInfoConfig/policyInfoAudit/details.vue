<!--政策资讯审核-->
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
										<el-form-item :label="this.isEditForm?'一级分类':'一级分类：'" prop="classify1">
											<el-select v-if="this.isEditForm" v-model="form.classify1"
											           placeholder="请选择一级分类" clearable style="width:100%;">
												<el-option v-if="classify1Options.length !== 0"
												           v-for="item in classify1Options" :key="item.dictValue"
												           :label="item.dictLabel" :value="item.dictValue"></el-option>
											</el-select>
											<span v-else>{{form.classify1Name}}</span>
										</el-form-item>
									</el-col>
									<el-col :md="this.adaptiveGrid.md" :lg="this.adaptiveGrid.lg">
										<el-form-item :label="this.isEditForm?'二级分类':'二级分类：'" prop="classify2">
											<el-select v-if="this.isEditForm" v-model="form.classify2"
											           placeholder="请选择二级分类" clearable style="width:100%;">
												<el-option v-if="classify2Options.length !== 0"
												           v-for="item in classify2Options" :key="item.dictValue"
												           :label="item.dictLabel" :value="item.dictValue"></el-option>
											</el-select>
											<span v-else>{{form.classify2Name}}</span>
										</el-form-item>
									</el-col>
									<el-col :md="this.adaptiveGrid.md" :lg="this.adaptiveGrid.lg">
										<el-form-item :label="this.isEditForm?'发布单位':'发布单位：'" prop="deptName">
											<el-input v-if="this.isEditForm" ref="deptName" v-model="form.deptName"
											          @keyup.enter.native="editContent('form_base')"
											          clearable placeholder="请输入发布单位"></el-input>
											<span v-else>{{form.deptName}}</span>
										</el-form-item>
									</el-col>
									<el-col :md="this.adaptiveGrid.md" :lg="this.adaptiveGrid.lg">
										<el-form-item :label="this.isEditForm?'发布日期':'发布日期：'" prop="pubDate">
											<el-date-picker v-if="this.isEditForm" v-model="form.pubDate"
											                @keyup.enter.native="editContent('form_base')"
											                type="date"
											                placeholder="请选择发布日期" style="width:100%;"
											                format="yyyy-MM-dd"
											                value-format="yyyy-MM-dd"></el-date-picker>
											<span v-else>{{form.pubDate}}</span>
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
									<el-col :span="24">
										<el-form-item :label="this.isEditForm?'资讯标题':'资讯标题：'" prop="title">
											<el-input v-if="this.isEditForm" ref="title" v-model="form.title"
											          @keyup.enter.native="editContent('form_base')"
											          clearable placeholder="请输入资讯标题"></el-input>
											<span v-else>{{form.title}}</span>
										</el-form-item>
									</el-col>
									<el-col :span="24" style="height:auto;">
										<el-form-item :label="this.isEditForm?'资讯内容':'资讯内容：'" prop="content" class="beforRequired">
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
									<el-col :md="this.adaptiveGrid.md" :lg="this.adaptiveGrid.lg">
										<el-form-item :label="this.isEditForm?'区域范围':'区域范围：'" prop="areaCode">
											<Address v-if="this.isEditForm" :id-edit="idEdit" :area-code="areaCode" @keyup.enter.native="editContent('form_base')"
											         :form-code="form.serviceArea" @getAreaCode="getAreaCode_reg"
											         :width="'100%'"></Address>
											<span v-else>{{form.serviceAreaName}}</span>
										</el-form-item>
									</el-col>
									<el-col :md="this.adaptiveGrid.md" :lg="this.adaptiveGrid.lg">
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
									<el-col :md="this.adaptiveGrid.md" :lg="this.adaptiveGrid.lg">
										<el-form-item :label="this.isEditForm?'年龄范围':'年龄范围：'" prop="ageRange">
											<div v-if="this.isEditForm">
												<el-row>
													<el-col :span="11">
														<el-input v-if="this.isEditForm" ref="minAge" @keyup.enter.native="editContent('form_base')"
														          v-model="form.minAge" clearable
														          placeholder="最小年龄"
														          @keyup.native="transformNumber(form.minAge,'minAge')"
														></el-input>
													</el-col>
													<el-col :span="2"><span
															style="display: block;text-align: center;">-</span></el-col>
													<el-col :span="11">
														<el-input v-if="this.isEditForm" ref="maxAge" @keyup.enter.native="editContent('form_base')"
														          v-model="form.maxAge" clearable
														          placeholder="最大年龄"
														          @keyup.native="transformNumber(form.maxAge,'maxAge')"
														></el-input>
													</el-col>
												</el-row>
											</div>
											<span v-else>{{form.serviceScope}}</span>
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
					<el-button v-if="editAuthority" type="warning" class="base-btn btnMarginLeft15" @click="toEditType">
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
	} from "@/api/policyInfoConfig/policyInformation";
	import {allSelectdictionaryData} from '@/api/facilitiesConfig/communityFacilities'
	import {adaptiveGrid_max, adaptiveGrid_plus} from "@/common/index";
	import Address from "@/components/Address";
	import {closeSelectedTag} from "@/utils/rooterJump";
	import {getEditAuthority} from "@/api/user";
	import {limitTextEllipsis,transformNumber,transformNumberLetter} from "@/utils/index";
	import QuillEditor from "@/components/QuillEditor";

	export default {
		components: {Address, QuillEditor},
		data() {
			//校验同步发布
			let verifySynRelease = (rule, value, callback) => {
				if (this.synRelease.length === 0) {
					callback(new Error('同步发布至少要选择一项！'));
				}
				else {
					callback();
				}
			};

			//资讯标题
			let verifyTitle = (rule, value, callback) => {
				if (value) {
					if(value.length > 100){
						callback(new Error('资讯标题长度不能超过200，请输入！'));
					}
					else {
						callback();
					}
				}
				else {
					callback(new Error('资讯标题不能为空，请输入！'));
				}
			};

			return {
				//下拉框字典数据
				service_targetOptions: [],//服务对象
				classify1Options: [],//一级分类下拉数据
				classify2Options: [],//二级分类下拉数据

				isEditForm: false,//页面表单是否可编辑操作。查看时：false,编辑-新增时：true
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
					classify1:'',//一级分类
					classify1Name:'',//一级分类
					classify2:'',//二级分类
					classify2Name:'',//二级分类
					pubDate: '',//活动日期
					deptName: '',//发布单位
					syncWeb: 'N',//同步发布到网站
					syncWeixin: 'N',//同步发布到微信
					onlyBack: 'Y',//仅发布到后台
					title:'',//资讯标题
					//富文本内容
					bizExtendContentVo: {
						parentId: '',//父id
						content: '',//内容
						id: '',//服务项目id
						infoType: '',//内容类型
					},
					serviceArea: [],//
					serviceTarget: '',//服务对象
					maxAge: '',//最大年龄
					minAge: '',//最小年龄
				},
				synRelease: ['仅发布到后台'],//同步发布

				loading: false,

				editorOption: {},

				//form 表单的验证规则
				rulesForm: {
					//一级分类
					classify1:[
						{required: true, trigger: 'change', message:'请选择一级分类'},
					],
					//二级分类
					classify2:[
						{required: true, trigger: 'change', message:'请选择二级分类'},
					],
					//同步发布
					synRelease:[
						{required: true, trigger: 'change', validator: verifySynRelease},
					],
					//资讯标题
					title:[
						{required: true, trigger: 'blur', validator: verifyTitle},
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
				areaCode: [],//所属居委全部ID
				quillEditorHtml:'',//富文本的内容
				imageInfoVos:[],//富文本图片的集合
			}
		},
		//在模板渲染成html后调用，通常是初始化页面完成后，再对html的dom节点进行一些需要的操作。
		mounted() {
			this.modelType = this.$route.query.modelType;
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

						this.form.minAge = this.form.minAge === null ? '' : this.form.minAge;
						this.form.maxAge = this.form.minAge === null ? '' : this.form.maxAge;

						//处理区域的code,用以渲染区域下拉组件
						if (st === 'edit') {
							//区域范围
							this.form.serviceArea = this.form.serviceAreaLevel?this.form.serviceAreaLevel.split(','):'';
						}

						this.idEdit = false;
					}).catch(() => {
						this.$message.error("获取服务项目信息失败！");
					});
				})
			},
			// 获取下拉字典
			getSelect() {
				return new Promise((resolve, reject) => {
					//数据字典接口
					let dicKey = 'classify1,classify2,service_target';
					allSelectdictionaryData(dicKey).then(response => {
						if (response.code === 0) {
							for (let k in response.data) {
								switch (k) {
									//一级分类
									case 'classify1':
										this.classify1Options = response.data[k];
										break;
									//二级分类
									case 'classify2':
										this.classify2Options = response.data[k];
										break;
									//服务对象
									case 'service_target':
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
				this.$router.push({path: '/streetPlatform/policyInfoConfig/policyInfoAudit'});
			},
			//下一步
			tabsStep(tabsName) {
				this.activeTabs = tabsName;
			},
			//确定按钮-提交表单
			editContent(formName) {
				if (this.form.deptName && this.form.deptName.length > 50) {
					return this.$message.error('发布单位长度超过50，请重新输入！');
				}
				if (!this.quillEditorHtml) {
					return this.$message.error('资讯内容不能为空，请输入！');
				}
				if (this.form.minAge > 150 || this.form.maxAge > 150) {
					return this.$message.error('年龄范围填写有误，请重新输入！');
				}
				if (this.form.minAge !== '' && this.form.minAge !== null && this.form.maxAge !== '' && this.form.maxAge !== null) {
					if (this.form.minAge >= this.form.maxAge) {
						return this.$message.error('年龄范围填写有误，请重新输入！');
					}
				}

				this.$refs[formName].validate((valid, object) => {
					if (valid) {
						let params = this.form;
						params.serviceArea = this.areaCode.length === 0 ? '' : this.areaCode[this.areaCode.length - 1] + '';

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

						//处理富文本
						params.bizExtendContentVo.content = this.quillEditorHtml;
						params.bizExtendContentVo.id = this.form.bizExtendContentVo.id;
						params.bizExtendContentVo.infoType = this.form.bizExtendContentVo.infoType;
						params.bizExtendContentVo.parentId = this.form.bizExtendContentVo.parentId;
						params.imageInfoVos = this.imageInfoVos;

						let _title_ = limitTextEllipsis(this.form.title,10);

						//新增
						if (this.modelType === 'add') {
							submitDataAdd(params).then(response => {
								if (response.code === 0) {
									this.$message({
										type: 'success',
										message: "新增‘" + _title_ + "’政策资讯审核成功!"
									});
									//关闭页面
									this.closeDetailsPage();
								}
								else {
									this.$message.error(response.msg);
								}
							}).catch(() => {
								this.$message.error("新增‘" + _title_ + "’政策资讯审核成功!");
							});
						}
						//编辑
						else if (this.modelType === 'edit') {
							submitDataEdit(params).then(response => {
								if (response.code === 0) {
									this.$message({
										type: 'success',
										message: "编辑‘" + _title_ + "’政策资讯审核成功!"
									});
									//关闭页面
									this.closeDetailsPage();
								}
								else {
									this.$message.error(response.msg);
								}
							}).catch(() => {
								this.$message.error("编辑‘" + _title_ + "’政策资讯审核失败!");
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
				let _title_ = limitTextEllipsis(this.form.title,10);
				this.$router.push({
					path: `/policyInfoAudit/details/${_id_}`,
					query: {'id': _id_, 'modelType': 'edit', '_title': `编辑${_title_}`} //modelType: 查看:look，编辑:edit，新增:add的类型
				});
			},
			// 获取图片数据
			getPicList(val) {
				this.imageInfoVos = val;
			},
			//获取富文本的内容
			getEditorHtml(html) {
				this.quillEditorHtml = html;
			},
			// 获取所属居委
			getAreaCode_reg(val) {
				this.areaCode = val;
			},
			//只能输入数字类型
			transformNumber(value,obj){
				this.form[obj] = transformNumber(value);
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
	.synReleaseTip > .el-form-item__content > .el-form-item__error {
		top: 70% !important;
	}
	.beforRequired label::before{
		content: '*';
		color: #ff4949;
		display: inline-block;
		margin-right: 0px;
	}
</style>
