<template>
	<el-container>
		<el-header class="formDiv">
			<el-form :inline="true" :model="form" class="demo-form-inline">
				<el-form-item label="参数名称">
					<el-input
							v-model.trim="form.configName"
							style="width: 240px;"
							clearable
							placeholder="请输入参数名称查询"
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
					<el-button type="primary" size="small" @click="addTableRow()" class="base-btn" v-has="{class: '新增'}">新增</el-button>
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

						<el-table-column label="参数名称" userId="userId" prop="configName" width="200"></el-table-column>

						<el-table-column label="参数键名" prop="configKey" min-width="200"></el-table-column>

						<el-table-column label="参数键值" prop="configValue" min-width="150"></el-table-column>

						<el-table-column label="系统内置" prop="dictConfigType" min-width="150"></el-table-column>

						<el-table-column label="备注" prop="remark" min-width="200"></el-table-column>
						<el-table-column label="创建时间" prop="createTime" min-width="200"></el-table-column>

						<el-table-column fixed="right" label="操作" min-width="200" header-align="center"
						                 align="center">
							<template slot-scope="{row,$index}">
                <span @click="handleEdit($index, row)" v-has="{class: '编辑'}" class="table-btn">
                  编辑
                </span>
                <span @click="handleRemove($index, row)" v-has="{class: '删除'}" class="table-btn">
                  删除
                </span>
								<!--<el-button-->
										<!--type="primary"-->
										<!--size="mini"-->
										<!--round-->
										<!--plain-->
										<!--@click="handleEdit($index, row)"-->
										<!--v-has="{class: '修改'}"-->
								<!--&gt;编辑-->
								<!--</el-button>-->
								<!--<el-button-->
										<!--type="primary"-->
										<!--size="mini"-->
										<!--round-->
										<!--plain-->
										<!--@click="handleRemove($index, row)"-->
										<!--v-has="{class: '删除'}"-->
								<!--&gt;删除-->
								<!--</el-button>-->
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
		getTableData,
		removeTableRowData
	} from "@/api/systemConfig/param";
	import {isNullOrUndefined} from "util";
	import {constants} from "crypto";

	export default {
		components: {Pagination, myDialog},
		data() {
			return {
				//表单值table显示
				form: {
					configName: "", //关键字
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
			};
		},
		//在模板渲染成html后调用，通常是初始化页面完成后，再对html的dom节点进行一些需要的操作。
		created() {
			//this.ajaxData();
			this.onReset();
		},

		methods: {
			ajaxData() {
				let params = this.form;
				getTableData(params)
				.then(response => {
					if (response.code === 0) {
						this.form.count = response.total;
						this.tableData = response.rows;
						this.loadingReset = false;
						this.loadingSubmit = false;
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
				this.form.pageNum = 1
				this.ajaxData();
			},

			//删除当前行
			handleRemove($index, row) {
				this.$confirm(
					"确定要删除" +
					row.configName +
					"参数吗? 参数一旦被删除，相关参数配置将无法生效！",
					"删除参数",
					{
						confirmButtonText: "确定",
						cancelButtonText: "取消",
						type: "warning"
					}
				)
				.then(() => {
					removeTableRowData(row.configId)
					.then(response => {
						if (response.code === 0) {
							this.$message({
								type: "success",
								message: response.msg
							});
							this.form.pageNum = 1;
							this.ajaxData();
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
			onReset(){
				this.loadingReset = true;
				//表单值
				this.form = {
					configName: "", //关键字
					count: 0, //数据总数
					pageNum: 1, //当前页码
					pageSize: 10 //每页显示的数据数量
				};
				this.ajaxData();
			},
			dialogHanderHide() {
				this.isShow = false;
			},
		}
	};
</script>

<style scoped>
	@import "~@/styles/form.css";

</style>
