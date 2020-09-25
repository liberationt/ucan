<template>
	<el-container>
		<el-header class="formDiv">
			<el-form :inline="true" :model="form" class="demo-form-inline">
				<el-form-item label="消息类型">
					<el-select v-model="form.msgType" style="width: 240px;" placeholder="请选择消息类型" clearable>
						<el-option v-for="item in msgTypeOptions" :key="item.dictValue" :label="item.dictLabel"
						           :value="item.dictValue"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="起始日期">
					<el-date-picker
							v-model="servicePeriod"
							type="daterange"
							range-separator="-"
							start-placeholder="开始日期"
							end-placeholder="结束日期"
							@keyup.enter.native="onSubmit"
					></el-date-picker>
				</el-form-item>
				<el-form-item label="关键字">
					<el-input
							v-model.trim="form.content"
							style="width: 240px;"
							clearable
							placeholder="请输入关键字查询"
							@keyup.enter.native="onSubmit"
					></el-input>
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
					<el-button type="primary" size="small" @click="addTableRow()" class="base-btn"
					           v-has="{class: '新增'}">新增
					</el-button>
				</el-header>
				<el-main>
					<el-table
							:data="tableData"
							tooltip-effect="dark"
							style="width: 100%;"
							header-align="left"
							border
							row-key="id"
					>
						<el-table-column type="selection" width="50"></el-table-column>

						<el-table-column label="序号" width="80" fixed="left">
							<template slot-scope="{row,$index}">
								<span>{{$index + 1}}</span>
							</template>
						</el-table-column>

						<el-table-column label="创建时间" userId="createTime" prop="createTime" width="200"></el-table-column>
						<el-table-column label="消息标题" prop="title" min-width="200">
							<template slot-scope="{row,$index}">
								<el-popover
										placement="top-start"
										width="300"
										trigger="hover"
										:content="row.title">
									<p slot="reference" class="contentPop">{{row.title}}</p>
								</el-popover>
							</template>
						</el-table-column>
						<el-table-column label="消息类型" prop="msgTypeName" min-width="200"></el-table-column>
						<el-table-column label="接受对象" prop="sendObjTypeName" min-width="150"></el-table-column>
						<el-table-column label="消息内容" prop="content" min-width="150">
							<template slot-scope="{row,$index}">
								<el-popover
										placement="top-start"
										width="300"
										trigger="hover"
										:content="row.content">
									<p slot="reference" class="contentPop">{{row.content}}</p>
								</el-popover>
							</template>
						</el-table-column>
						<el-table-column fixed="right" label="操作" min-width="200" header-align="center"
						                 align="center">
							<template slot-scope="{row,$index}">
				                <span @click="handleEdit($index, row)" v-has="{class: '编辑'}" class="table-btn">
				                  编辑
				                </span>
								<span @click="handleRemove($index, row)" v-has="{class: '删除'}" class="table-btn">
				                  删除
				                </span>
							</template>
						</el-table-column>
					</el-table>

					<pagination
							v-show="form.count>0"
							:total="form.count"
							:page.sync="form.pageNum"
							:limit.sync="form.pageSize"
							@pagination="ajaxData"
					/>

					<myDialog
							@dialogHide="dialogHanderHide"
							:ajaxData="ajaxData"
							:realTimeUpdateMessageData="realTimeUpdateMessageData"
							:dialogTableVisible="isShow"
							:tableRowValue="tableRowValue"
							:modelType="modelType"
					></myDialog>

				</el-main>
			</el-container>
		</el-main>
	</el-container>
</template>

<script>
	import Pagination from "@/components/Pagination";
	import myDialog from "./components/dialog";
	import {
		allSelectdictionaryData
	} from "@/api/serviceActivityConfig/serviceProject";
	import {
		getTableData,
		removeTableRowData
	} from "@/api/systemConfig/message";
	import {isNullOrUndefined} from "util";
	import {getDate_YMD} from "@/utils/index.js";
	import {constants} from "crypto";
	import {getMessageData} from "@/api/systemConfig/user";
	import {mapGetters} from 'vuex'

	export default {
		components: {Pagination,myDialog},
		computed: {
			...mapGetters([
				'message'
			]),
		},
		data() {
			return {
				msgTypeOptions: [],//消息类型下拉框数据

				//表单值table显示
				form: {
					msgType: "", //消息类型
					beginTime: "",
					endTime: "",
					content: "",//关键字
					count: 0, //数据总数
					pageNum: 1, //当前页码
					pageSize: 10 //每页显示的数据数量
				},
				tableData: [],
				tableRowValue: "", //表格当前行数据
				isShow: false, //弹框显示隐藏
				isShowPass: false, //弹框显示隐藏
				removeDisabled: true, //批量删除按钮的disabled
				modelType: "", //弹框的类型，可编辑或可新增
				loading: false, //弹框提交按钮加载动画
				loadingSubmit: false,//查询按钮加载动画
				loadingReset: false,//重置按钮加载动画
				servicePeriod: [], //起始日期
			};
		},
		//在模板渲染成html后调用，通常是初始化页面完成后，再对html的dom节点进行一些需要的操作。
		mounted() {
			//this.ajaxData();
			this.onReset();
		},

		methods: {
			ajaxData() {
				let params = this.form;
				if (this.servicePeriod.length === 0) {
					params.beginTime = "";
					params.endTime = "";
				} else {
					params.beginTime = getDate_YMD(this.servicePeriod[0]) + "";
					params.endTime = getDate_YMD(this.servicePeriod[1]) + "";
				}
				getTableData(params).then(response => {
					if (response.code === 0 && response.rows && response.rows !== 0) {
						this.form.count = response.total;
						this.tableData = response.rows;
						this.loadingReset = false;
						this.loadingSubmit = false;
					}
				})
				.catch(error => {
					this.loadingReset = false;
					this.loadingSubmit = false;
				});
			},
			//表单查询按钮
			onSubmit() {
				this.loadingSubmit = true;
				this.form.pageNum = 1
				this.ajaxData();
			},

			//删除当前行
			handleRemove($index, row) {
				this.$confirm(
					"确定要删除选中的消息吗? 一旦被删除，将无法查看相关信息！",
					"删除消息",
					{
						confirmButtonText: "确定",
						cancelButtonText: "取消",
						type: "warning"
					}
				)
				.then(() => {
					removeTableRowData(row.id).then(response => {
						if (response.code === 0) {
							this.$message({
								type: "success",
								message: response.msg
							});
							this.form.pageNum = 1;
							this.ajaxData();
							this.realTimeUpdateMessageData();
						} else {
							this.$message.error(response.msg);
						}
					})
					.catch(error => {
						reject(error);
						this.$message.error("操作失败！");
					});
				})
				.catch(() => {
					this.$message({
						type: "info",
						message: "已取消操作！"
					});
				});
			},
			//编辑
			handleEdit($index, row) {
				this.isShow = true; //打开弹框
				this.tableRowValue = row; //将选中的行数据传到弹框
				this.modelType = "edit"; //将弹框设为编辑状态
			},
			//添加行
			addTableRow($index, row) {
				this.isShow = true; //打开弹框
				this.tableRowValue = row; //行数据格式
				this.modelType = "add"; //将弹框设为新增状态
			},
			//表单重置按钮
			onReset() {
				//数据字典接口
				let dicKey = 'msg_type';
				allSelectdictionaryData(dicKey).then(response => {
					if (response.code === 0) {
						for (let k in response.data) {
							switch (k) {
								//消息类型
								case 'msg_type':
									this.msgTypeOptions = response.data[k];
									break;
							}
						}
					}
					else {
						this.$message.error('数据字典接口请求失败！');
					}
				}).catch(() => {
					this.$message.error('数据字典接口请求失败！');
				});

				this.loadingReset = true;
				//表单值
				this.form = {
					msgType: "", //消息类型
					beginTime: "",
					endTime: "",
					content: "",//关键字
					count: 0, //数据总数
					pageNum: 1, //当前页码
					pageSize: 10 //每页显示的数据数量
				};
				this.servicePeriod = [];//服务到期日期
				this.ajaxData();
			},
			dialogHanderHide() {
				this.isShow = false;
			},
			//实时更新消息面板的数据
			realTimeUpdateMessageData(){
				getMessageData().then(response => {
					if (response) {
						this.$store.commit("message/ADD_MESSAGE_LIST",response);
					}
					else {
						this.$message.error('消息接口请求失败！');
					}
				}).catch(() => {
					this.$message.error('消息同步接口请求失败！');
				});
			},

		}
	};
</script>

<style scoped>
	@import "~@/styles/form.css";
	.contentPop{
		overflow: hidden;
		text-overflow:ellipsis;
		white-space: nowrap;
		cursor: pointer;
		margin: 0;
	}
</style>
