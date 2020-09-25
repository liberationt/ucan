<!--志愿者报表-->
<template>
	<el-container>
		<el-main class="tableContainer">
			<el-tabs v-model="activeTabs" @tab-click="handleTabsClick">
				<!--统计报表tabs start-->
				<el-tab-pane label="统计报表" name="statisticsPannel"></el-tab-pane>
				<!--统计报表tabs end-->
				<!--图形报表tabs start-->
				<el-tab-pane label="图形报表" name="figurePannel"></el-tab-pane>
				<!--图形报表tabs end-->
			</el-tabs>

			<!--查询条件start-->
			<el-form :inline="true" :model="form" class="demo-form-inline" style="margin-bottom: 20px;">
				<el-form-item label="所属区域">
					<Address :area-code="areaCode" :form-code="form.areaCode" @getAreaCode="getAreaCode"
					         :id-edit="idEdit"
					         :width="'200px'"
					         @keyup.enter.native="onSubmit"></Address>
				</el-form-item>
				<el-form-item label="服务日期">
					<el-date-picker
							v-model="projectPeriod"
							type="daterange"
							range-separator="-"
							start-placeholder="开始日期"
							end-placeholder="结束日期"
							format="yyyy-MM-dd"
							value-format="yyyy-MM-dd"
							style="width: 300px"
					></el-date-picker>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="onSubmit" class="base-btn" v-has="{class: '查询'}">查询
					</el-button>
					<el-button type="warning" @click="onReset" class="base-btn" v-has="{class: '查询'}">重置
					</el-button>
					<el-button v-if="activeTabs === 'statisticsPannel'" type="primary" @click="exportFun()" class="base-btn" v-has="{class: '导出'}">导出
					</el-button>
				</el-form-item>
			</el-form>
			<!--查询条件end-->

			<!--table 面板start-->
			<div style="width: 100%;" v-if="activeTabs === 'statisticsPannel'">
				<el-main>
					<el-table
							:data="tableData"
							tooltip-effect="dark"
							style="width: 100%;"
							header-align="left"
							border
							show-summary
							row-key="id"
							class="volunteerReportTable"
					>
						<el-table-column label="区/街道" prop="areaName" min-width="150" header-align="center" align="center" fixed="left"></el-table-column>
						<el-table-column label="社会组织" prop="orgCount" min-width="150" header-align="center" align="center"></el-table-column>
						<el-table-column label="志愿者" prop="volunteerCount" min-width="150" header-align="center" align="center"></el-table-column>
						<el-table-column label="服务对象" header-align="center">
							<el-table-column label="总数" prop="objCount" min-width="150" header-align="center" align="center"></el-table-column>
							<el-table-column label="独居" prop="liveAloneCount" min-width="150" header-align="center" align="center"></el-table-column>
							<el-table-column label="纯老" prop="pureOldCount" min-width="150" header-align="center" align="center"></el-table-column>
							<el-table-column label="孤老" prop="solitaryCount" min-width="150" header-align="center" align="center"></el-table-column>
							<el-table-column label="与子女住" prop="liveWithChildrenCount" min-width="150" header-align="center" align="center"></el-table-column>
							<el-table-column label="其他" prop="otherCount" min-width="150" header-align="center" align="center"></el-table-column>
						</el-table-column>
						<el-table-column label="累计服务记录" prop="recordCount" min-width="150" header-align="center" align="center"></el-table-column>
					</el-table>
				</el-main>
			</div>
			<!--table 面板end-->

			<!--统计图 面板start-->
			<div style="width: 100%;" v-else>
				<el-main style="margin: 0px;">
					<el-row :gutter="0" style="overflow: hidden;">
						<el-col class="chart-container" :md="12" :lg="12">
							<div class="chart-container-div">
								<h2 class="pannalTitle"><i></i>志愿者统计</h2>
								<div class="barChartBtn">
									<span :class="barChartPannal?'active':''" @click="barChartPannalFun(true)">男女比例</span>
									<span :class="barChartPannal?'':'active'" @click="barChartPannalFun(false)">其他统计</span>
								</div>
								<div v-if="showBarChart" style="width: 100%;height: 100%;">
									<bar-chart :chartData="volunteerChartData" :barChartPannal="barChartPannal" :isChange="isChange" height="100%" width="100%" />
								</div>
								<div v-if="!showBarChart" class="kongWrap"><img src="@/assets/images/kong.png"/></div>
							</div>
						</el-col>
						<el-col class="chart-container" :md="12" :lg="12">
							<div class="chart-container-div">
								<h2 class="pannalTitle"><i></i>服务对象统计</h2>
								<div v-if="this.serviceObjectChartData.total" style="width: 100%;height: 100%;">
									<pie-chart :chartData="serviceObjectChartData" :isChange="isChangeServiceObject" height="100%" width="100%" />
								</div>
								<div v-else class="kongWrap"><img src="@/assets/images/kong.png"/></div>
							</div>
						</el-col>
						<el-col class="chart-container" style="" :md="12" :lg="12">
							<div class="chart-container-div">
								<h2 class="pannalTitle"><i></i>社会组织统计</h2>
								<div v-if="this.socialOrgChartData.total" style="width: 100%;height: 100%;">
									<rose-pie-chart :chartData="socialOrgChartData" :isChange="isChangeSocialOrg" height="100%" width="100%" />
								</div>
								<div v-else class="kongWrap"><img src="@/assets/images/kong.png"/></div>
							</div>
						</el-col>
						<el-col class="chart-container" style="" :md="12" :lg="12">
							<div class="chart-container-div">
								<h2 class="pannalTitle"><i></i>服务记录统计</h2>
								<div v-if="this.serviceRecordChartData.total" style="width: 100%;height: 100%;">
									<line-chart :chartData="serviceRecordChartData" :isChange="isChangeServiceObject" height="100%" width="100%" />
								</div>
								<div v-else class="kongWrap"><img src="@/assets/images/kong.png"/></div>
							</div>
						</el-col>
					</el-row>
				</el-main>
			</div>
			<!--统计图 面板end-->

		</el-main>
	</el-container>
</template>

<script>
	import _ from 'lodash';
	import qs from 'qs';
	import Address from "@/components/Address"
	import {
		institutionSearch,
		getVolunteerChartData,
		getServiceObjectRecordData,
		getSocialOrgData
	} from '@/api/sidekickProjectConfig/volunteerReport'
	import {getDate_YMD,parseTime} from '@/utils/index.js'
	import {getVolunteerReportExport} from "@/api/importExportApi"
	import {downloadFromBlob} from '@/utils/index';
	import uploadExcelMix from '@/mixins/uploadExcelMix';
	import ImportDialog from '@/components/importDialog/index';
	import {getToken} from '@/utils/auth';

	import BarChart from '@/components/Charts/barChart_report';
	import PieChart from '@/components/Charts/pieChart_report';
	import RosePieChart from '@/components/Charts/rosePieChart_report';
	import LineChart from '@/components/Charts/lineChart_report';
  import {exportTitleConstant, exportContentConstant, exportGoDownloadConstant, exportKnowConstant, canExport} from '@/common/constant';// 常量池

	export default {
		components: {
			ImportDialog,
			Address,
			BarChart,
			PieChart,
			RosePieChart,
			LineChart
		},
		mixins: [uploadExcelMix],
		data() {
			return {
				activeTabs: 'statisticsPannel',//tab标签切换默认选中name参数  figurePannel  statisticsPannel
				dialogVisible: false,
				dialogVisibleImport: false,
				// 查询表单
				form: {
					areaCode: ['310100000000'], // 区域表单ID
					startTime:'',//
					endTime:'',//
				},
				// 区域全部ID
				areaCode: [],
				// <-- table -->
				tableData: [], // table表格数据
				projectPeriod: [], //服务到期日期
				multipleSelection: [], //多选的行数据
				uploadUrl: process.env.VUE_APP_BASE_API + '/volunteer/service/provider/import',
				headers: {
					Authorization: 'Bearer ' + getToken()  // Authorization ，而不是token
				},
				idEdit: true,
				exportData: '', // 查询成功后赋值
				barChartPannal:true,//志愿者条形图切换
				barChartData: {},//志愿者条形统计图的数据
				isChange:true,//志愿者统计图切换后，加载数据  a:加载男女比例，b:加载其他统计 ，no:不加载
				isChangeServiceObject:true,
				isChangeSocialOrg:true,

				showBarChart:false,//是否显示志愿者统计图

				//志愿者统计图数据
				volunteerChartData:{
					areaDataArr:[],//区域
					manCountArr:[],//男
					womanCountArr:[],//女
					isDelCountArr:[],//删除
					count:0,//男女总数
					delCount:0,//删除总数
				},
				//服务对象统计图数据
				serviceObjectChartData:{
					typeDataArr:[],//分类
					typeCountArr:[],//数值
					total:0,
				},
				//服务记录统计图数据
				serviceRecordChartData:{
					typeDataArr:[],//分类
					typeCountArr:[],//数值
					total:0,
				},
				//社会组织统计图数据
				socialOrgChartData:{
					typeDataArr:[],//分类
					typeCountArr:[],//数值
					total:0,
				}
			}
		},
		mounted() {
			this.idEdit = false;
			this.getData(this.form);
		},
		methods: {
			// 获取区域的值
			getAreaCode(val) {
				this.areaCode = val;
			},
			// 老人标签选择事件
			handleChange(val) {
			},
			//表单查询按钮
			onSubmit() {
				const arr = [];
				if (this.areaCode.length !== 0) {
					arr.push(this.areaCode[this.areaCode.length - 1]);
				}
				this.form.areaCode = arr; // 所选区域赋值
				if(this.projectPeriod === null){
					this.projectPeriod = [];
				}
				if (this.projectPeriod.length === 0) {
					this.form.startTime = '';
					this.form.endTime = '';
				} else {
					this.form.startTime = getDate_YMD(this.projectPeriod[0]) + '';
					this.form.endTime = getDate_YMD(this.projectPeriod[1]) + '';
				}

				//查询-统计报表
				if(this.activeTabs === 'statisticsPannel'){
					this.getData(this.form);
				}
				//查询-图形报表
				else {
					this.getGraphicData(this.form);
				}
			},
			// 获取表格数据
			getData(form) {
				let parmas = _.cloneDeep(form);
				parmas.areaCode = typeof(parmas.areaCode) === 'object'?parmas.areaCode.join(''):parmas.areaCode;
				if(parmas.areaCode === ''){
					parmas.areaCode = '310100000000';
					this.idEdit = !this.idEdit;
				}
				institutionSearch(parmas).then(res => {
					if (res) {
						this.tableData = res;
						this.exportData = _.cloneDeep(parmas);
					}
					else {
						this.tableData = [];
					}
				})
			},
			// 获取图形报表数据
			getGraphicData(form) {
				let parmas = _.cloneDeep(form);
				parmas.areaCode = typeof(parmas.areaCode) === 'object'?parmas.areaCode.join(''):parmas.areaCode;
				if(parmas.areaCode === ''){
					parmas.areaCode = '310100000000';
					this.idEdit = !this.idEdit;
				}
				//重置‘志愿者统计’数据
				this.volunteerChartData={
					areaDataArr:[],//区域
					manCountArr:[],//男
					womanCountArr:[],//女
					isDelCountArr:[],//删除
					count:0,//男女总数
					delCount:0,//删除总数
				};

				//加载‘志愿者统计’数据
				getVolunteerChartData(parmas).then(response => {
					if(response.graphMan && response.graphMan.length !== 0){
						response.graphMan.forEach(item=>{
							this.volunteerChartData.areaDataArr.push(item.areaName);
							this.volunteerChartData.manCountArr.push(item.manCount);
							this.volunteerChartData.womanCountArr.push(item.womanCount);
							this.volunteerChartData.isDelCountArr.push(item.isDelCount);
						});
						this.volunteerChartData.count= response.count;//男女总数  response.count
						this.volunteerChartData.delCount= response.delCount;//删除总数 response.delCount
					}
					if(this.volunteerChartData.count !== 0){
						this.showBarChart = true;
					}
					else {
						this.showBarChart = false;
					}
					this.barChartPannal = true;
					this.isChange = !this.isChange;
				}).catch(() => {
					this.$message.error("获取‘志愿者统计’的数据失败！");
				});

				//重置'服务对象'统计图数据
				this.serviceObjectChartData = {
					typeDataArr:[],//分类
					typeCountArr:[],//数值
					total:0,//总数
				};
				//重置'服务记录'统计图数据
				this.serviceRecordChartData = {
					typeDataArr:[],//分类
					typeCountArr:[],//数值
					total:0,
				};

				//加载‘服务对象统计’和‘服务记录统计’数据
				getServiceObjectRecordData(parmas).then(response => {
					//分离‘服务对象统计’的数据格式
					response.statisticsObj.forEach(item=>{
						if (item.liveStatusCount !== 0){
							let obj = {
								value:item.liveStatusCount,
								name:item.liveStatusName,
							};
							this.serviceObjectChartData.typeDataArr.push(item.liveStatusName);
							this.serviceObjectChartData.typeCountArr.push(obj);
							this.serviceObjectChartData.total += item.liveStatusCount;
						}
					});
					//分离‘服务记录统计’的数据格式
					response.recordCountVoList.forEach(item=>{
						this.serviceRecordChartData.typeDataArr.push(item.recordTime);
						this.serviceRecordChartData.typeCountArr.push(item.recordTimeCount);
						this.serviceRecordChartData.total += item.recordTimeCount;
					});
					this.isChangeServiceObject = !this.isChangeServiceObject;
				}).catch(() => {
					this.$message.error("获取‘服务对象、服务记录’的数据失败！");
				});

				//重置'社会组织'统计图数据
				this.socialOrgChartData={
					typeDataArr:[],//分类
					typeCountArr:[],//数值
					total:0,
				};

				//加载‘社会组织’数据
				getSocialOrgData(parmas).then(response => {
					response.orgStatistics.forEach(item=>{
						if (item.orgCount !== 0){
							let obj = {
								value:item.orgCount,
								name:item.areaName,
							};
							this.socialOrgChartData.typeDataArr.push(item.areaName);
							this.socialOrgChartData.typeCountArr.push(obj);
							this.socialOrgChartData.total += item.orgCount;
						}
					});
					this.isChangeSocialOrg = !this.isChangeSocialOrg;
				}).catch(() => {
					this.$message.error("获取‘社会组织’的数据失败！");
				});

				this.exportData = _.cloneDeep(parmas);
			},
			// 表单重置按钮
			onReset() {
				this.projectPeriod = [];
				this.areaCode = [];
				this.form = {
					areaCode: ['310100000000'], // 区域表单ID
					startTime:'',//
					endTime:'',//
				};
				this.idEdit = !this.idEdit;

				//查询-统计报表
				if(this.activeTabs === 'statisticsPannel'){
					this.getData(this.form);
				}
				//查询-图形报表
				else {
					this.getGraphicData(this.form);
				}
			},
			// 导出功能
			exportFun() {
			  // 志愿者报表不限制 导出数量
				const confirmTitle = '相同筛选条件，10分钟内不可重复提交，确认导出吗？'
				this.$confirm(
						confirmTitle,
						'导出报表',
						{
							confirmButtonText: '确定',
							cancelButtonText: '取消',
							type: 'warning'
						}
				)
						.then(() => {
							getVolunteerReportExport(this.exportData).then(response => {
								if (response.code === 0) {
									this.$alert(exportContentConstant, exportTitleConstant, {
										confirmButtonText: exportGoDownloadConstant,
                    cancelButtonText: exportKnowConstant,
                    showCancelButton: true,
										callback: action => {
											if (action === 'cancel') return;
                      this.$router.push('/dataManagement/exportManagement')
										}
									})
								} else {
									this.$message.warning(response.msg)
								}
							}).catch((error) => {
								this.$message.warning(error.msg)
							})
						})
						.catch(() => {
							this.$message({
								type: 'info',
								message: '已取消操作！'
							})
						})
			},
			// 关闭弹窗
			visible(value) {
				this.dialogVisibleImport = value;
			},
			//tabs切换卡
			handleTabsClick(tab, event){
				//点击统计报表tab
				if (tab.name === 'statisticsPannel'){
					this.getData(this.form);
				}
				//点击图形报表tab
				else {
					this.getGraphicData(this.form);
				}
			},
			//志愿者条形图面板切换
			barChartPannalFun(val){
				this.barChartPannal = val;
				//点击男女比例
				if(val){
					if(this.volunteerChartData.count !== 0){
						this.showBarChart = true;
					}
					else {
						this.showBarChart = false;
					}
					this.isChange = !this.isChange;
				}
				//点击其他统计
				else {
					if(this.volunteerChartData.delCount !== 0){
						this.showBarChart = true;
					}
					else {
						this.showBarChart = false;
					}
					this.isChange = !this.isChange;
				}
			},
		}
	}
</script>

<style scoped>
	@import "~@/styles/form.css";

	.instituWrap {
		padding: 20px 20px 40px 20px;
	}

	.instituDiv {
		float: left;
		width: 140px;
		height: 140px;
		text-align: center;
		cursor: pointer;
		background-color: #DAE9F5;
		transition: all 0.5s;
	}

	.instituDiv .iconfont {
		font-size: 100px;
		display: block;
		color: #147FD9;
	}

	.instituDiv .text {
		font-size: 16px;
		color: #147FD9;
	}

	.instituDiv:first-child {
		margin-right: 40px;
	}

	.instituDiv:hover {
		background-color: #bfdcf3;
	}
	.tableTitle{
		text-align: center;
		font-size: 20px;
		font-weight: bold;
		height: 30px;
		line-height: 30px;
		margin: 0;
	}
	.reportTabbar{
		width: 160px;
		margin: 0 auto;
		font-size: 16px;
		font-weight: bold;
		overflow: hidden;
	}
	.reportTabbar span{
		float: left;
		height: 26px;
		line-height: 26px;
		margin: 0;
		cursor: pointer;
	}
	.reportTabbar span:hover{
		color: #37b2ff;
	}
	.reportTabbar span.active{
		color: #1890ff;
	}
	.reportTabbar span:first-child{
		border-right: 2px solid #1743d6;
		padding-right: 12px;
		margin-right: 10px;
	}

	.chart-container{
		position: relative;
		height: 500px;
	}
	.chart-container-div{
		width: 100%;
		height: 100%;
		padding-top: 70px;
		padding-left: 20px;
		padding-right: 20px;
		background-color: #ffffff;
		border: 1px dashed #f1f1f1;
	}
	.barChartBtn{
		position: absolute;
		top: 20px;
		right: 30px;
		z-index: 99;
	}
	.barChartBtn span{
		float: left;
		padding: 5px;
		margin: 0;
		cursor: pointer;
		border: 2px solid #3367d6;
		color: #3367d6;
	}
	.barChartBtn span.active{
		color: #ffffff;
		background-color: #3367d6;
	}
	.pannalTitle{
		position: absolute;
		top: 20px;
		left: 20px;
		margin: 0;
		font-size: 18px;
		height: 26px;
		line-height: 26px;
		padding-left: 10px;
	}
	.pannalTitle > i{
		position: absolute;
		top: 2px;
		left: 0;
		display: inline-block;
		width: 4px;
		height: 20px;
		background-color: #1890ff;
	}
	.kongWrap{
		position: relative;
		width: 100%;
		height: 100%;
	}

	.kongWrap > img{
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		margin: auto;
	}
</style>

<style>
	.volunteerReportTable table > thead > tr:first-child > th > .cell{
		color:#32415a;
		font-size: 15px;
	}
	.volunteerReportTable table > thead > tr:last-child > th > .cell{
		font-weight: normal;
	}
	.volunteerReportTable.el-table th.is-leaf,.volunteerReportTable.el-table--border td{
		border-right: 1px solid #e1e1e1;
	}
</style>


