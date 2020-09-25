<!--咨询记录管理-->
<template>
	<el-container>
		<el-main class="tableContainer">
			<el-tabs v-model="activeTabs">
				<!--基本信息tabs start-->
				<el-tab-pane label="基本信息" name="base">
					<el-collapse v-model="activeCollapse">
						<!--来访者基本信息item start-->
						<el-collapse-item name="baseItem_1">
							<template slot="title">
								<div class="titleSlider">
									<span>
										<i class="titleTip"></i>来访者基本信息
									</span>
								</div>
							</template>
							<el-form ref="form_base" key="form_base" :model="form"
							         :rules="this.isEditForm?rulesForm:null" label-width="140px">
								<el-row :gutter="0">
									<el-col :md="this.adaptiveGrid.md" :lg="this.adaptiveGrid.lg">
										<el-form-item :label="this.isEditForm?'来访者类型':'来访者类型：'" prop="visitorType">
											<el-select v-if="this.isEditForm" v-model="form.visitorType"
											           ref="visitorType"
											           placeholder="请选择来访者类型" clearable style="width:100%;">
												<el-option v-if="visitorTypeNameOptions.length !== 0"
												           v-for="item in visitorTypeNameOptions" :key="item.dictValue"
												           :label="item.dictLabel" :value="item.dictValue"></el-option>
											</el-select>
											<span v-else>{{form.visitorTypeName}}</span>
										</el-form-item>
									</el-col>
									<el-col :md="this.adaptiveGrid.md" :lg="this.adaptiveGrid.lg">
										<el-form-item :label="this.isEditForm?'来访者人数(人)':'来访者人数(人)：'" prop="visitorNum">
											<el-input v-if="this.isEditForm" ref="visitorNum"
											          v-model.number="form.visitorNum"
											          placeholder="请输入来访者人数" clearable></el-input>
											<span v-else>{{form.visitorNum}}</span>
										</el-form-item>
									</el-col>
									<el-col :md="this.adaptiveGrid.md" :lg="this.adaptiveGrid.lg">
										<el-form-item :label="this.isEditForm?'来访家属数(人)':'来访家属数(人)：'"
										              prop="visitorEscortNum">
											<el-input v-if="this.isEditForm" ref="visitorEscortNum"
											          placeholder="请输入来访家属数" v-model.number="form.visitorEscortNum"
											          clearable></el-input>
											<span v-else>{{form.visitorEscortNum}}</span>
										</el-form-item>
									</el-col>
									<el-col :md="this.adaptiveGrid.md" :lg="this.adaptiveGrid.lg">
										<el-form-item :label="this.isEditForm?'来访时间':'来访时间：'" prop="visitorTime">
											<el-date-picker v-if="this.isEditForm" v-model="form.visitorTime"
											                type="datetime"
											                placeholder="请选择来访时间" style="width:100%;"
											                format="yyyy-MM-dd HH:mm:ss"
											                value-format="yyyy-MM-dd HH:mm:ss"></el-date-picker>
											<span v-else>{{form.visitorTime}}</span>
										</el-form-item>
									</el-col>
									<el-col :md="this.adaptiveGrid.md" :lg="this.adaptiveGrid.lg">
										<el-form-item :label="this.isEditForm?'来访者姓名':'来访者姓名：'" prop="visitorName">
											<el-input v-if="this.isEditForm" ref="visitorName"
											          v-model="form.visitorName"
											          :disabled="disabled" clearable placeholder="请输入来访者姓名"></el-input>
											<span v-else>{{form.visitorName}}</span>
										</el-form-item>
									</el-col>
									<el-col :md="this.adaptiveGrid.md" :lg="this.adaptiveGrid.lg">
										<el-form-item :label="this.isEditForm?'年龄':'年龄：'" prop="age">
											<el-input v-if="this.isEditForm" ref="age" v-model.number="form.age"
											          @keyup.native="transformNumber(form.age,'age')"
											          :disabled="disabled" clearable placeholder="请输入年龄"></el-input>
											<span v-else>{{form.age}}</span>
										</el-form-item>
									</el-col>
									<el-col :md="this.adaptiveGrid.md" :lg="this.adaptiveGrid.lg">
										<el-form-item :label="this.isEditForm?'联系电话':'联系电话：'" prop="phone">
											<el-input v-if="this.isEditForm" ref="phone" v-model="form.phone"
											          :disabled="disabled" clearable placeholder="请输入联系电话"></el-input>
											<span v-else>{{form.phone}}</span>
										</el-form-item>
									</el-col>
									<el-col :md="this.adaptiveGrid.md" :lg="this.adaptiveGrid.lg">
										<el-form-item :label="this.isEditForm?'所属居委':'所属居委：'" prop="areaCode">
											<Address v-if="this.isEditForm" :id-edit="idEdit" :area-code="areaCode"
											         :form-code="form.areaCode" @getAreaCode="getAreaCode_reg"
											         :width="'100%'"></Address>
											<span v-else>{{form.areaNameLevel}}</span>
										</el-form-item>
									</el-col>
									<el-col :md="this.adaptiveGrid.md" :lg="this.adaptiveGrid.lg">
										<el-form-item :label="this.isEditForm?'详细地址':'详细地址：'" prop="addr">
											<el-input v-if="this.isEditForm" ref="addr" v-model="form.addr"
											          :disabled="disabled" clearable placeholder="请输入详细地址"></el-input>
											<span v-else>{{form.addr}}</span>
										</el-form-item>
									</el-col>
								</el-row>
							</el-form>
						</el-collapse-item>
						<!--来访者基本信息item end-->

						<!--咨询记录信息item start-->
						<el-collapse-item name="baseItem_2">
							<template slot="title">
								<div class="titleSlider">
									<span>
										<i class="titleTip"></i>咨询记录信息
									</span>
								</div>
							</template>
							<el-form ref="form_operate" key="form_operate" :model="form"
							         :rules="this.isEditForm?rulesForm:null" label-width="140px">
								<el-row :gutter="0">
									<el-col :md="this.adaptiveGrid.md" :lg="this.adaptiveGrid.lg">
										<el-form-item :label="this.isEditForm?'服务事项':'服务事项：'" prop="serviceEvent">
											<el-select v-if="this.isEditForm" v-model="form.serviceEvent"
											           ref="serviceEvent"
											           placeholder="请选择服务事项" clearable style="width:100%;">
												<el-option v-if="serviceEventOptions.length !== 0"
												           v-for="item in serviceEventOptions" :key="item.dictValue"
												           :label="item.dictLabel" :value="item.dictValue"></el-option>
											</el-select>
											<span v-else>{{form.serviceEventName}}</span>
										</el-form-item>
									</el-col>
									<el-col :md="this.adaptiveGrid.md" :lg="this.adaptiveGrid.lg">
										<el-form-item :label="this.isEditForm?'服务结果':'服务结果：'" prop="serviceResult">
											<el-select v-if="this.isEditForm" v-model="form.serviceResult"
											           ref="serviceResult"
											           placeholder="请选择服务结果" clearable style="width:100%;">
												<el-option v-if="serviceResultOptions.length !== 0"
												           v-for="item in serviceResultOptions" :key="item.dictValue"
												           :label="item.dictLabel" :value="item.dictValue"></el-option>
											</el-select>
											<span v-else>{{form.serviceResultName}}</span>
										</el-form-item>
									</el-col>
									<el-col :md="this.adaptiveGrid.md" :lg="this.adaptiveGrid.lg">
										<el-form-item :label="this.isEditForm?'事后跟踪情况':'事后跟踪情况：'" prop="afterEvent">
											<el-input v-if="this.isEditForm" ref="afterEvent" v-model="form.afterEvent"
											          :disabled="disabled" clearable placeholder="请输入事后跟踪情况"></el-input>
											<span v-else>{{form.afterEvent}}</span>
										</el-form-item>
									</el-col>
									<el-col :span="24">
										<el-form-item :label="this.isEditForm?'来访事由':'来访事由：'" prop="visitingReason">
											<el-input v-if="this.isEditForm" ref="visitingReason"
											          v-model="form.visitingReason"
											          :disabled="disabled" clearable placeholder="请输入来访事由"></el-input>
											<span v-else>{{form.visitingReason}}</span>
										</el-form-item>
									</el-col>

									<el-col :span="24">
										<el-form-item :label="this.isEditForm?'顾问建议':'顾问建议：'" prop="remark">
											<el-input v-if="this.isEditForm" ref="remark" type="textarea" :rows="5"
											          :disabled="disabled" v-model="form.bizExtendContentVo.content"
											          placeholder="请输入顾问建议"
											          maxlength="500" show-word-limit></el-input>
											<span v-else class="remarkSpan">{{form.bizExtendContentVo.content}}</span>
										</el-form-item>
									</el-col>
								</el-row>
							</el-form>
						</el-collapse-item>
						<!--咨询记录信息item end-->

						<!--养老顾问信息item start-->
						<el-collapse-item name="baseItem_2">
							<template slot="title">
								<div class="titleSlider">
									<span>
										<i class="titleTip"></i>养老顾问信息
									</span>
								</div>
							</template>
							<el-form ref="form_yanglao" key="form_yanglao" :model="form"
							         :rules="this.isEditForm?rulesForm:null" label-width="140px">
								<el-row :gutter="0">
									<el-col :md="this.adaptiveGrid.md" :lg="this.adaptiveGrid.lg">
										<el-form-item :label="this.isEditForm?'养老顾问点':'养老顾问点：'" prop="orgId">
											<el-select v-if="this.isEditForm" v-model="hasAdvempPointItem" :disabled="editNot"
											           @change="advempPointChange"
											           placeholder="请选择养老顾问点" clearable style="width:100%;">
												<el-option v-if="advempPointOptions.length !== 0"
												           v-for="item in advempPointOptions" :key="item.id"
												           :label="item.orgName" :value="item.id"></el-option>
											</el-select>
											<span v-else>{{form.orgName}}</span>
										</el-form-item>
									</el-col>
									<el-col :md="this.adaptiveGrid.md" :lg="this.adaptiveGrid.lg">
										<el-form-item :label="this.isEditForm?'养老顾问员':'养老顾问员：'" prop="advempId">
											<el-select v-if="this.isEditForm" v-model="hasAdvempIdItem" :disabled="editNot"
											           @change="advempIdChange"
											           placeholder="请选择养老顾问员" clearable style="width:100%;">
												<el-option v-if="advempIdOptions.length !== 0"
												           v-for="item in advempIdOptions" :key="item.id"
												           :label="item.fullName" :value="item.id"></el-option>
											</el-select>
											<span v-else>{{form.advempName}}</span>
										</el-form-item>
									</el-col>
								</el-row>
							</el-form>
						</el-collapse-item>
						<!--养老顾问信息item end-->

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
		institutionDetailsData,
		submitDataAdd,
		submitDataEdit,
		advempPointData,
		advempIdData
	} from '@/api/pensionAdvisersCongfig/consultRecord'
	import {allSelectdictionaryData} from '@/api/facilitiesConfig/communityFacilities'
	import {adaptiveGrid_max, adaptiveGrid_plus} from '@/common/index'
	import Address from '@/components/Address'
	import {closeSelectedTag} from '@/utils/rooterJump';
	import {transformNumber, transformNumberLetter, validateForms, scrollToTop} from "@/utils/index";
  import {getEditAuthority} from '@/api/user'
	import {verifyHomePhoneOrMobile} from '@/utils/validate';

	export default {
		components: {Address},
		data() {
			// 来访者类型
			let verifyVisitorType = (rule, value, callback) => {
				if (!value) {
					callback(new Error('来访者类型不能为空，请选择！'))
				}
				else {
					callback()
				}
			};
			//来访者人数
			let verifyVisitorNum = (rule, value, callback) => {
				if (value === '') {
					callback(new Error('来访者人数不能为空，请重新输入！'))
				}
				else {
					if (typeof(value) !== 'number') {
						callback(new Error('请输入数字类型！'))
					}
					else {
						if (value > 9999999) {
							callback(new Error('请输入合理的数字范围！'))
						}
						else {
							callback()
						}
					}
				}
			};
			//来访家属数
			let verifyVisitorEscortNum = (rule, value, callback) => {
				if (value === '') {
					callback(new Error('来访家属数不能为空，请重新输入！'))
				}
				else {
					if (typeof(value) !== 'number') {
						callback(new Error('请输入数字类型！'))
					}
					else {
						if (value > 9999999) {
							callback(new Error('请输入合理的数字范围！'))
						}
						else {
							callback()
						}
					}
				}
			};
			//来访时间
			let verifyVisitorTime = (rule, value, callback) => {
				if (value === '') {
					callback(new Error('来访时间不能为空，请选择！'))
				}
				else {
					callback()
				}
			};
			//来访者姓名
			let verifyVisitorName = (rule, value, callback) => {
				if (value === '') {
					callback(new Error('来访者姓名不能为空，请重新输入！'))
				}
				else {
					if (value.length > 20) {
						callback(new Error('来访者姓名长度不能超过20，请重新输入！'))
					}
					else {
						callback()
					}
				}
			};
			//服务事项
			let verifyVerviceEvent = (rule, value, callback) => {
				if (!value) {
					callback(new Error('服务事项不能为空，请选择！'))
				}
				else {
					callback()
				}
			};
			//服务结果
			let verifyServiceResult = (rule, value, callback) => {
				if (!value) {
					callback(new Error('服务结果不能为空，请选择！'))
				}
				else {
					callback()
				}
			};
			//养老顾问点
			let verifyOrgId = (rule, value, callback) => {
				if (!this.hasAdvempPointItem) {
					callback(new Error('养老顾问点不能为空，请选择！'))
				}
				else {
					callback()
				}
			};
			//养老顾问员
			let verifyAdvempId = (rule, value, callback) => {
				if (!this.hasAdvempIdItem) {
					callback(new Error('养老顾问点不能为空，请选择！'))
				}
				else {
					callback()
				}
			};


			return {
				//下拉框字典数据
				visitorTypeNameOptions: [],//来访者类型
				serviceEventOptions: [],//服务事项
				serviceResultOptions: [],//服务结果
				advempPointOptions: [],//养老顾问点
				advempIdOptions: [],//养老顾问员

				isEditForm: true,//页面表单是否可编辑操作。查看时：false,编辑-新增时：true
				idEdit: true,//区域级联下拉框是编辑时还是新增时。编辑时：false,新增时：true

				//表单
				form: {
					//-----来访者基本信息-------
					visitorType: '',//来访者类型
					visitorTypeName: '',//来访者类型(文本)
					visitorNum: '',//来访者人数
					visitorEscortNum: '',//来访家属数
					visitorTime: '',//来访时间
					visitorName: '',//来访者姓名
					age: '',//来访者年龄
					phone: '',//联系电话
					areaCode: [],//所属居委
					areaNameLevel: '',//所属居委(文本)
					addr: '',//详细地址
					//-------咨询记录信息--------
					serviceEvent: '',//服务事项
					serviceResult: '',//服务结果
					afterEvent: '',//事后跟踪情况
					visitingReason: '',//来访事由
					//富文本内容
					bizExtendContentVo: {
						parentId: '',//父id
						content: '',//内容
						id: '',//服务项目id
						infoType: '',//内容类型
					},
					//-----养老顾问信息----
					orgId: '',//养老顾问点
					orgName: '',
					advempId: '',//养老顾问员
					advempName: '',//
				},

				visitorName: '',//咨询类型汉字注释

				hasAdvempPointItem:'',//当前养老顾问点是否存在在养老顾问点下拉列表中,
				hasAdvempIdItem:'',//当前养老顾问员是否存在在养老顾问员下拉列表中,

				editNot:false,

				//form 表单的验证规则
				rulesForm: {
					//来访者类型
					visitorType: [
						{required: true, trigger: 'change', validator: verifyVisitorType}
					],
					//来访者人数
					visitorNum: [
						{required: true, trigger: 'blur', validator: verifyVisitorNum},
					],
					//来访家属数
					visitorEscortNum: [
						{required: true, trigger: 'blur', validator: verifyVisitorEscortNum},
					],
					//来访时间养老顾问信息
					visitorTime: [
						{required: true, trigger: 'change', validator: verifyVisitorTime},
					],
					//来访者姓名
					visitorName: [
						{required: true, trigger: 'blur', validator: verifyVisitorName},
					],
					//服务事项
					serviceEvent: [
						{required: true, trigger: 'change', validator: verifyVerviceEvent},
					],
					//服务结果
					serviceResult: [
						{required: true, trigger: 'change', validator: verifyServiceResult},
					],
					//养老顾问点
					orgId: [
						{required: true, trigger: 'change', validator: verifyOrgId},
					],
					//养老顾问员
					advempId: [
						{required: true, trigger: 'change', validator: verifyAdvempId},
					],
					//联系电话
					phone:[
						{trigger: 'change', validator: verifyHomePhoneOrMobile},
					]
				},
				disabled: false, //表单是否可编辑
				activeTabs: 'base',//tab标签切换默认选中name参数
				activeCollapse: ['baseItem_1', 'baseItem_2', 'baseItem_3', 'baseItem_4', 'baseItem_5', 'baseItem_6'],//折叠面板默认打开name参数
				areaCodeOptions: [],//行政区域树节点数据
				defaultProps: {
					children: 'children',
					label: 'areaName',
					value: 'areaCode'
				},
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
				lazy: true,//懒加载
				flag: null,//用来判断是表格添加时还是编辑时
				areaCode: [],//所属居委全部ID
				modelType: '',//查看：look  编辑：edit  新增：add
				instituType: '',//机构类型
				editAuthority: false//编辑按钮的权限
			}
		},
		//在模板渲染成html后调用，通常是初始化页面完成后，再对html的dom节点进行一些需要的操作。
		mounted() {
			this.instituType = this.$route.query.instituType;
			this.modelType = this.$route.query.modelType;
			//当前机构id
			let _userId_ = this.$route.query.id || '';
			this.form.orgType = this.$route.query.instituType;
			this.getData(_userId_);

			if (this.modelType === 'look') {
				/*编辑按钮的权限控制*/
				getEditAuthority(this.$route.query.editAuthority).then(response => {
					response.forEach((item) => {
						if (item.menuName === '编辑') {
							this.editAuthority = item.visible === '0' ? true : false;
						}
					})
				}).catch(() => {
					this.$message.error('获取编辑按钮的权限控制失败！')
				})
			}
		},
		methods: {
			// 异步事件同步化
			async getData(id) {
				await this.getSelect();
				if (this.modelType === 'edit') {
					this.isEditForm = true;
					this.editNot = true;
					await this.editGetData(id, 'edit');
				}
				else if (this.modelType === 'add') {
					this.isEditForm = true;
					this.editNot = false;
					this.idEdit = false;
				}
				else if (this.modelType === 'look') {
					this.isEditForm = false;
					await this.editGetData(id, '');
				}
			},
			// 编辑-查看 获取机构数据
			editGetData(id, st) {
				return new Promise((resolve, reject) => {
					//请求当前机构信息
					institutionDetailsData(id, st).then(response => {
						if (st === 'edit') {
							if (response.areaCodeLevel) {
								response.areaCode = response.areaCodeLevel.split(',');
							} else {
								response.areaCode = [];
							}
							//养老顾问员
							if (response.orgId) {
								this.getAdvempIdData(response.orgId, response.advempId);
								resolve();
							}
						}
						//页面form表单的值
						this.form = response;
						if(!this.form.bizExtendContentVo){
							this.form.bizExtendContentVo = {
								parentId: '',
								content: '',
								id: '',
								infoType: ''
							}
						}
						//如果当前养老顾问点，已经不存在与养老顾问点的下拉框中时，则显示该养老顾问点的名称
						if(this.advempPointOptions && this.advempPointOptions.length !== 0){
							this.advempPointOptions.forEach(item=>{
								if (item.id === this.form.orgId) {
									this.hasAdvempPointItem = this.form.orgId;
								}
								else {
									this.hasAdvempPointItem = this.form.orgName;
								}
							});
						}
						else {
							this.hasAdvempPointItem = this.form.orgName;
						}

						this.idEdit = false;
					}).catch(() => {
						this.$message.error('获取‘' + this.form.visitorName + '’机构信息失败！');
						reject();
					})
				})
			},
			// 获取下拉字典
			getSelect() {
				return new Promise((resolve, reject) => {
					//请求养老顾问点数据接口
					advempPointData().then(response => {
						if (response.code === 0) {
							this.advempPointOptions = response.data.list;
						}
						else {
							this.$message.error('养老顾问点数据字典接口请求失败！');
						}
						resolve()
					}).catch(() => {
						this.$message.error('养老顾问点数据字典接口请求失败！');
						reject()
					});

					//数据字典接口
					let dicKey = 'visitor_type,service_item,service_results';
					allSelectdictionaryData(dicKey).then(response => {
						if (response.code === 0) {
							for (let k in response.data) {
								switch (k) {
									//来访者类型
									case 'visitor_type':
										this.visitorTypeNameOptions = response.data[k]
										break
									//服务事项
									case 'service_item':
										this.serviceEventOptions = response.data[k]
										break
									//服务结果
									case 'service_results':
										this.serviceResultOptions = response.data[k]
										break
								}
							}
						}
						else {
							this.$message.error('‘' + this.form.visitorName + '’咨询记录字典接口请求失败！')
						}
						resolve()
					}).catch(() => {
						this.$message.error('‘' + this.form.visitorName + '’咨询记录字典接口请求失败！')
						reject()
					});
				})
			},
			//取消按钮
			cancelDetailsPage() {
				this.$confirm('该页面的信息尚未保存，确定要关闭页面吗', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning',
					closeOnClickModal: false
				}).then(() => {
					this.closeDetailsPage()
				}).catch(() => {
				})
			},
			//取消，返回按钮，关闭详情页
			closeDetailsPage() {
				//关闭页面
				closeSelectedTag(this, this.$route);
				this.$router.push({path: '/streetPlatform/pensionAdvisersCongfig/consultRecord'});
			},
			//下一步
			tabsStep(tabsName) {
				this.activeTabs = tabsName
			},
			//确定按钮-提交表单
			editContent() {
				//年龄
				if (this.form.age && this.form.age > 200) {
					return this.$message.error("年龄范围不符合实际，请重新输入！");
				}
				//联系电话
				if (this.form.phone && this.form.phone.length > 20) {
					return this.$message.error("联系电话长度不能超过20，请重新输入！");
				}
				//详细地址
				if (this.form.addr && this.form.addr.length > 50) {
					return this.$message.error("详细地址长度不能超过50，请重新输入！");
				}
				//事后跟踪情况
				if (this.form.afterEvent && this.form.afterEvent.length > 100) {
					return this.$message.error("事后跟踪情况长度不能超过100，请重新输入！");
				}
				//来访事由
				if (this.form.visitingReason && this.form.visitingReason.length > 200) {
					return this.$message.error("来访事由长度不能超过200，请重新输入！");
				}
				//顾问建议
				if (this.form.bizExtendContentVo.content && this.form.bizExtendContentVo.content.length > 500) {
					return this.$message.error("顾问建议长度不能超过500，请重新输入！");
				}

        let formRefs = ['form_base', 'form_operate','form_yanglao'].map(key => this.$refs[key]);
				validateForms(formRefs).then(() => {
					//养老顾问点
					if(this.advempPointOptions && this.advempPointOptions.length !== 0){
						this.advempPointOptions.forEach(item=>{
							if (item.id === this.hasAdvempPointItem) {
								this.form.orgId = this.hasAdvempPointItem;
							}
						});
					}

					let params = this.form;
					params.areaCode = this.areaCode.length === 0 ? '' : this.areaCode[this.areaCode.length - 1] + ''

					//处理富文本
					params.bizExtendContentVo.id = this.form.bizExtendContentVo.id;
					params.bizExtendContentVo.infoType = this.form.bizExtendContentVo.infoType;
					params.bizExtendContentVo.parentId = this.form.bizExtendContentVo.parentId;

					//新增
					if (this.modelType === 'add') {
						submitDataAdd(params).then(response => {
							if (response.code === 0) {
								this.$message({
									type: 'success',
									message: '新增‘' + this.form.visitorName + '’咨询记录成功!'
								})
								//关闭页面，跳转到列表
								this.closeDetailsPage();
							}
							else {
								this.$message.error(response.msg)
							}
						}).catch(() => {
							this.$message.error('新增‘' + this.form.visitorName + '’咨询记录失败!')
						})
					}
					//编辑
					else if (this.modelType === 'edit') {
						submitDataEdit(params).then(response => {
							if (response.code === 0) {
								this.$message({
									type: 'success',
									message: '编辑‘' + this.form.visitorName + '’咨询记录成功!'
								})
								//关闭页面，跳转到列表
								this.closeDetailsPage();
							}
							else {
								this.$message.error(response.msg)
							}
						}).catch(() => {
							this.$message.error('编辑‘' + this.form.visitorName + '’咨询记录失败!')
						})
					}
					//查看
					/*else if (this.modelType === 'look') {
						closeSelectedTag(this, this.$route)
					}*/
				}).catch(objectList => {
					this.activeTabs = 'base';
					scrollToTop();
					return false;
				});
			},
			// 获取所属居委
			getAreaCode_reg(val) {
				this.areaCode = val;
			},
			//查看详情页面，点击编辑按钮
			toEditType() {
				let _orgType_ = this.$route.query.instituType
				let _id_ = this.$route.query.id
				this.$router.push({
					path: `/consultRecord/details/${_id_}`,
					query: {
						'id': _id_,
						'modelType': 'edit',
						'instituType': _orgType_,
						'_title': `编辑${this.form.visitorName}`
					}
				})
			},
			// 选择’养老顾问点‘，加载不同的’养老顾问员‘数据
			advempPointChange(e) {
				//请求养老顾问点数据接口
				if (e) {
					this.getAdvempIdData(e, '');
				}
				else {
					this.advempIdOptions = [];
					this.form.advempId = '';//养老顾问员
				}
			},
			//请求养老顾问员
			getAdvempIdData(id, advempId) {
				return new Promise((resolve, reject) => {
					advempIdData(id).then(response => {
						if (response.code === 0) {
							this.advempIdOptions = response.data;
							this.form.advempId = advempId;

							if(this.advempIdOptions && this.advempIdOptions.length !== 0){
								this.advempIdOptions.forEach(item=>{
									if (item.id === this.form.advempId) {
										this.hasAdvempIdItem = this.form.advempId;
									}
									else {
										this.hasAdvempIdItem = this.form.advempName;
									}
								});
							}
							else {
								this.hasAdvempIdItem = this.form.advempName;
							}

						}
						else {
							this.$message.error('养老顾问员数据字典接口请求失败！');
						}
						resolve()
					}).catch(() => {
						this.$message.error('养老顾问员数据字典接口请求失败！');
						reject()
					});
				});
			},
			//养老顾问员
			advempIdChange(e) {
				this.form.advempId = e;
			},
			//只能输入数字类型
			transformNumber(value, obj) {
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

	.remarkSpan {
		padding: 10px 0px;
		margin: 0;
	}
</style>
