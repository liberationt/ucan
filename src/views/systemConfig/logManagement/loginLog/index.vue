<template>
	<el-container>
		<el-header class="formDiv">
			<el-form :inline="true" :model="form" class="demo-form-inline">
				<el-form-item label="登录地点">
					<el-input v-model.trim="form.loginLocation" style="width: 240px;" clearable placeholder="请输入登录地点" @keyup.enter.native="onSubmit"></el-input>
				</el-form-item>
				<el-form-item label="登录名称">
					<el-input v-model.trim="form.loginName" style="width: 240px;" clearable placeholder="请输入登录名称" @keyup.enter.native="onSubmit"></el-input>
				</el-form-item>
				<el-form-item  label="登录状态">
					<el-select v-model="form.status" style="width: 240px;" placeholder="请选择登录状态" clearable @keyup.enter.native="onSubmit">
						<el-option v-for="item in sys_common_statusOptions" :key="item.dictValue" :label="item.dictLabel" :value="item.dictValue"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="操作时间">
					<el-date-picker
							v-model="operTime"
							type="daterange"
							range-separator="-"
							start-placeholder="开始日期"
							end-placeholder="结束日期"
							placeholder="请选择操作时间"
							style="width: 240px;"
							format="yyyy-MM-dd"
							value-format="yyyy-MM-dd"
              @keyup.enter.native="onSubmit"
					></el-date-picker>
				</el-form-item>

				<el-form-item>
					<el-button type="primary" @click="onSubmit" class="base-btn" v-has="{class: '查询'}">查询</el-button>
					<el-button type="warning" @click="onReset" class="base-btn" v-has="{class: '查询'}">重置</el-button>
				</el-form-item>
			</el-form>
		</el-header>
		<el-main class="tableContainer">
			<el-container>
				<el-header>
					<el-button type="primary" size="small" @click="removeTableRow()" class="base-btn" v-has="{class: '删除'}">删除</el-button>
					<el-button type="primary" size="small" @click="removeAllTableRow()" class="base-btn" v-has="{class: '删除'}">清空</el-button>
					<el-button type="primary" size="small" @click="exportFun()" class="base-btn" v-has="{class: '导出'}">导出</el-button>
					<div v-if="this.total !== 0" class="totalWrap">已筛选到{{this.total}}条匹配信息</div>
					<div v-else class="totalWrap">无法找到匹配信息</div>
				</el-header>
				<el-main>
					<el-table
							:data="tableData"
							tooltip-effect="dark"
							style="width: 100%;"
							header-align="left"
							border
							row-key="id"
							@selection-change="handleSelectionChange"
					>
						<el-table-column type="selection" width="50" fixed="left"></el-table-column>
						<el-table-column label="访问编号" prop="infoId" width="100" ></el-table-column>
						<el-table-column label="登录名称" prop="loginName" width="200"></el-table-column>
						<el-table-column label="登录地址" prop="ipaddr" width="200"></el-table-column>
						<el-table-column label="登录地点" prop="loginLocation" width="200"></el-table-column>
						<el-table-column label="浏览器" prop="browser" width="200"></el-table-column>
						<el-table-column label="操作系统" prop="os" width="200"></el-table-column>
						<el-table-column label="登录状态" prop="statusName" width="200"></el-table-column>
						<el-table-column label="操作信息" prop="msg" width="200"></el-table-column>
						<el-table-column label="登录时间" prop="loginTime" width="200"></el-table-column>
						<!--<el-table-column fixed="right" label="操作" min-width="250">
							<template slot-scope="{row,$index}">
				                <span @click="handleLook($index, row)" class="table-btn">
				                    查看详情
				                </span>
							</template>
						</el-table-column>-->
					</el-table>

					<pagination
							v-show="total>0"
							:total="total"
							:page.sync="form.pageNum"
							:limit.sync="form.pageSize"
							@pagination="ajaxData"
					/>

					<!--<myDialog
							@dialogHide="dialogHanderHide"
							@addTableRowSubmit="addTableRowSubmit"
							@editTableRowSubmit="editTableRowSubmit"
							:dialogTableVisible="isShow"
							:tableRowValue="tableRowValue"
							:modelType="modelType"
							:loading="loading"
					></myDialog>-->

				</el-main>
			</el-container>
		</el-main>
	</el-container>
</template>

<script>
	import {getOperateLogDownload} from "@/api/importExportApi"
	import Pagination from "@/components/Pagination";
	import {
		getTableData,
		removeTableRowData,
		emptyTableRowData,
		editDialog,
		addDialog,
		allSelectdictionaryData
	} from "@/api/systemConfig/logManagement/loginLog";
	import {getDate_YMD} from "@/utils/index.js";

	export default {
		components: {Pagination},
		data() {
			return {
				sys_common_statusOptions:[],//登录状态下拉框数据

				//表单值table显示
				form: {
					loginLocation: "", //登录地址
					loginName:"",//登录名称
					businessType:"",//操作类型
					status:"",//登录状态
					beginTime: "",
					endTime: "",
					pageNum: 1, //当前页码
					pageSize: 10 //每页显示的数据数量
				},
				removeRowSelectedId:[],//要删除当前选中的行id
				operTime:[],//操作时间
				total:0,//数据总数
				tableData: [],
				tableRowValue: "", //表格当前行数据
				isShow: false, //弹框显示隐藏
				isShowPass: false, //弹框显示隐藏
				removeDisabled: true, //批量删除按钮的disabled
				modelType: "", //弹框的类型，可编辑或可新增
				loading: false, //弹框提交按钮加载动画
				loadingSubmit: false,//查询按钮加载动画
				loadingReset: false,//重置按钮加载动画
				exportData:"",//导出的数据
			};
		},
		//在模板渲染成html后调用，通常是初始化页面完成后，再对html的dom节点进行一些需要的操作。
		mounted() {
			/**
			 * 数据字典接口
			 */
			let dicKey = 'sys_common_status';
			allSelectdictionaryData(dicKey).then(response => {
				this.sys_common_statusOptions = response.data['sys_common_status'];
			}).catch(() => {
				this.$message.error('操作失败！');
			});
			this.onReset();
		},
		methods: {
			ajaxData() {
				let params = this.form;
				if ( this.operTime.length === 0 ) {
					params.beginTime = "";
					params.endTime = "";
				} else {
					params.beginTime = getDate_YMD(this.operTime[0]) + "";
					params.endTime = getDate_YMD(this.operTime[1]) + "";
				}
				getTableData(params).then(response => {
					if (response.code === 0) {
						this.total = response.total;
						this.tableData = response.rows;
						this.loadingReset = false;
						this.loadingSubmit = false;
						this.exportData = JSON.parse(JSON.stringify(response.rows));
					}
				})
				.catch(error => {
					reject(error);
					this.loadingReset = false;
					this.loadingSubmit = false;
				});
			},
			//表单查询按钮
			onSubmit() {
				this.loadingSubmit = true;
				this.form.pageNum = 1;
				this.ajaxData();
			},
			//表单重置按钮
			onReset() {
				this.loadingReset = true;
				//表单值
				this.form ={
					loginLocation: "", //登录地址
					loginName:"",//登录名称
					businessType:"",//操作类型
					status:"",//登录状态
					beginTime: "",
					endTime: "",
					pageNum: 1, //当前页码
					pageSize: 10 //每页显示的数据数量
				};
				this.operTime = [];
				this.ajaxData();
			},
			//选中的行数据
			handleSelectionChange(val) {
				this.removeRowSelectedId=[];
				val.forEach((item)=>{
					this.removeRowSelectedId.push(item.infoId);
				});
			},
			//删除行数据
			removeTableRow(){
				if(this.removeRowSelectedId.length === 0){
					this.$message.error("请至少勾选一行数据！");
				}
				else {
					let params = this.removeRowSelectedId.join(',');
					removeTableRowData(params).then(response => {
						if (response.code === 0) {
							this.$message({
								type: "success",
								message: response.msg
							});
							this.ajaxData();
							this.loading = false;
						} else {
							this.$message.error(response.msg);
							this.loading = false;
						}
					})
					.catch(error => {
						reject(error);
						this.$message.error("操作失败！");
						this.loading = false;
					});
				}
			},
			//清空全部表格数据
			removeAllTableRow(){
				emptyTableRowData().then(response => {
					if (response.code === 0) {
						this.$message({
							type: "success",
							message: response.msg
						});
						this.ajaxData();
						this.loading = false;
					} else {
						this.$message.error(response.msg);
						this.loading = false;
					}
				})
				.catch(error => {
					reject(error);
					this.$message.error("操作失败！");
					this.loading = false;
				});
			},
			//导出功能
			exportFun() {
				this.$confirm(
					"是否需要导出",
					"导出",
					{
						confirmButtonText: "确定",
						cancelButtonText: "取消",
						type: "warning"
					}
				)
				.then(() => {
					const data = qs.stringify(this.exportData);
					getOperateLogDownload(data).then(response => {
						const datas = new Blob([response], {type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8;'});
						const downloadElement = document.createElement('a');
						const href = window.URL.createObjectURL(datas);
						downloadElement.href = href;
						downloadElement.download = '养老机构列表.xlsx';
						document.body.appendChild(downloadElement);
						downloadElement.click();
						document.body.removeChild(downloadElement); // 下载完成移除元素
						window.URL.revokeObjectURL(href); // 释放掉blob对象
					}).catch(() => {
						this.$message.error("操作失败！");
					})
				})
				.catch(() => {
					this.$message({
						type: "info",
						message: "已取消操作！"
					});
				});
			},
		}
	};
</script>

<style scoped>
	@import "~@/styles/form.css";
</style>
