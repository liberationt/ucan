<!-- index.vue -->

<template>
	<el-container>
		<el-header class="formDiv">
			<el-form :inline="true" :model="roleForm" class="demo-form-inline">

				<el-form-item label="字典状态">
					<el-select v-model="roleForm.status" placeholder="请输入字典状态" clearable  @keyup.enter.native="onSubmit">
						<el-option label="启用" name="0" value="0"></el-option>
						<el-option label="禁用" name="1" value="1"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="名称查询">
					<el-input v-model.trim="roleForm.dictName" placeholder="请输入字典名称查询" clearable  @keyup.enter.native="onSubmit"></el-input>
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
					<el-button type="primary" @click="addTableRow()" class="base-btn" v-has="{class: '新增'}">新增</el-button>
					<!--<el-button type="danger" size="small" :disabled="removeDisabled" @click="removeTableRow()" icon="el-icon-minus">删除</el-button>-->
				</el-header>
				<el-main>
					<el-table
							ref="multipleTable"
							:data="tableData"
							tooltip-effect="dark"
							style="width: 100%;"
							header-align="left"
							border
							row-key="id">

						<el-table-column type="selection" width="50" fixed="left"></el-table-column>

						<el-table-column label="字典主键" prop="dictId" min-width="100"
						                 header-align="left" fixed="left"></el-table-column>

						<el-table-column label="字典名称" prop="dictName" min-width="150"
						                 header-align="left"></el-table-column>
						<el-table-column label="字典类型" prop="dictType" min-width="150"
						                 header-align="left"></el-table-column>

						<el-table-column label="字典状态" prop="status" min-width="150" header-align="left">
							<template slot-scope="scope">
								<el-switch class="switchStyle"
								           v-model="scope.row.status"
								           active-text="启用"
								           inactive-text="禁用"
								           active-value="0"
								           inactive-value="1"
								           disabled
								           @click.native="changeSwitch(scope.row)">
								</el-switch>
							</template>
						</el-table-column>

						<el-table-column label="备注" prop="remark" min-width="200"
						                 header-align="left"></el-table-column>

						<el-table-column label="创建时间" prop="createTime" min-width="200"
						                 header-align="left" ></el-table-column>

						<el-table-column
								fixed="right"
								label="操作"
								min-width="280"
								header-align="center"
								align="center">
							<template slot-scope="{row,$index}">
                <span @click="handleLook($index, row)" class="table-btn">
                  字典标签
                </span>
                <span @click="handleEdit($index, row)" v-has="{class: '编辑'}" class="table-btn">
                  编辑
                </span>
                <span @click="handleRemove($index, row)" v-has="{class: '删除'}" class="table-btn">
                  删除
                </span>
								<!--<el-button type="primary" size="mini" round plain @click="handleLook($index, row)">字典标签-->
								<!--</el-button>-->
								<!--<el-button type="primary" size="mini" round plain @click="handleEdit($index, row)" v-has="{class: '修改'}">编辑-->
								<!--</el-button>-->
								<!--<el-button type="danger" size="mini" round plain @click="handleRemove($index, row)" v-has="{class: '删除'}">删除-->
								<!--</el-button>-->
							</template>
						</el-table-column>
					</el-table>

					<pagination v-show="count>0" :total="count" :page.sync="roleForm.pageNum" :limit.sync="roleForm.pageSize" @pagination="ajaxData" />

					<myDialog @dialogHide="dialogHanderHide" @addTableRowSubmit="addTableRowSubmit" @editTableRowSubmit="editTableRowSubmit" :dialogTableVisible="isShow"
					          :tableRowValue="tableRowValue" :modelType="modelType" :loading="loading"></myDialog>

				</el-main>
			</el-container>
		</el-main>
	</el-container>
</template>

<script>
	import Pagination from '@/components/Pagination'
	import myDialog from "./components/dialog";
	import {getTableData, removeTableRowData, addTableRowData, editTableRowData} from "@/api/systemConfig/dictionary";

	export default {
		components: {myDialog,Pagination},
		data() {
			return {
				//表单值
				roleForm: {
					status: '',//字典状态
					dictName: '',//关键字查询-字典名称
					pageNum: 1,//当前页码
					pageSize: 10,//每页显示的数据数量
				},
				tableData: [],
				tableRowValue: '',//表格当前行数据
				isShow: false,//弹框显示隐藏
				multipleSelection: [],//多选的行数据
				count: 0,//数据总数
				removeDisabled: true,//批量删除按钮的disabled
				modelType: '',//弹框的类型，可编辑或可新增
				loading: false,//弹框提交按钮加载动画
				loadingSubmit: false,//查询按钮加载动画
				loadingReset: false,//重置按钮加载动画
			}
		},
		//在模板渲染成html后调用，通常是初始化页面完成后，再对html的dom节点进行一些需要的操作。
		mounted() {
			this.onReset();
		},
		methods: {
			//添加行-打开弹框
			addTableRow() {
				this.isShow = true;//打开弹框
				this.tableRowValue = {};//行数据格式
				this.modelType = 'add';//将弹框设为新增状态
			},
			//添加行-提交数据
			addTableRowSubmit(params){
				this.loading = true;
				addTableRowData(params).then(response => {
					if(response.code === 0){
						this.$message({
							type: 'success',
							message: response.msg
						});
						this.ajaxData();
						this.loading = false;
						return false;
					}
					else {
						this.$message.error(response.msg);
						this.loading = false;
						return false;
					}
				}).catch(error => {
					reject(error);
					this.$message.error('操作失败！');
					this.loading = false;
					return false;
				})
			},
			//删除当前行
			handleRemove($index, row) {
				this.$confirm('确定要删除【'+row.dictName+'】字典吗？字典一旦被删除，【'+row.dictName+'】将无法显示和操作。','删除字典',{
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					removeTableRowData(row.dictId).then(response => {
						if(response.code === 0 || response.code === '0'){
							this.$message({
								type: 'success',
								message: response.msg
							});
							this.roleForm.pageNum = 1;
							this.roleForm.pageSize = 10;
							this.ajaxData();
						}
						else {
							this.$message.error(response.msg);
						}
					}).catch(() => {
						this.$message.error('操作失败！');
					});
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消删除！'
					});
				});
			},
			//编辑-打开弹框
			handleEdit($index, row) {
				this.isShow = true;//打开弹框
				this.tableRowValue = row;//将选中的行数据传到弹框
				this.modelType = 'edit';//将弹框设为编辑状态
			},
			//编辑-提交数据
			editTableRowSubmit(params){
				this.loading = true;
				if(this.tableRowValue !== params){
					editTableRowData(params).then(response => {
						if(response.code === 0){
							this.$message({
								type: 'success',
								message: response.msg
							});
							this.ajaxData();
							this.loading = false;
						}
						else {
							this.$message.error(response.msg);
							this.loading = false;
						}
					}).catch(error => {
						reject(error);
						this.$message.error('操作失败！');
						this.loading = false;
					})
				}
				else {
					this.$message.error('操作失败！');
					this.loading = false;
				}
			},
			//查看子表格列表
			handleLook($index, row) {
				let dictType = row.dictType;
				this.$router.push({
					path: '/dictionary/list',
					query: {'dictType': dictType}
				});
			},
			dialogHanderHide() {
				this.isShow = false
			},
			//请求后台数据---axios
			ajaxData() {
				let params = this.roleForm;
				getTableData(params).then(response => {
					this.tableData = response.rows;
					this.count = response.total;
					this.loadingReset = false;
				}).catch(() => {
					setTimeout(() => {
						this.loadingReset = false;
					}, 1000);
				})
			},
			//表单查询按钮
			onSubmit() {
				this.loadingSubmit = true;
				this.roleForm.pageNum = 1;//当前页码
				this.roleForm.pageSize = 10;//每页显示的数据数量
				let params = this.roleForm;
				this.roleForm.dictLabel = this.roleForm.dictName
				getTableData(params).then(response => {
					this.tableData = response.rows;
					this.count = response.total;
					this.loadingSubmit = false;
				}).catch(() => {
					setTimeout(() => {
						this.loadingSubmit = false;
					}, 1000);
				})
			},
			//表单重置按钮
			onReset(){
				this.loadingReset = true;
				this.roleForm = {
					status: '',//字典状态
					dictName: '',//关键字查询-字典名称
					pageNum: 1,//当前页码
					pageSize: 10,//每页显示的数据数量
				};
				this.ajaxData();
			},
			//switch 开关事件监听
			changeSwitch(e){
				let _tit = '';
				let _tips = '';
				if (e.status === '0') {
					_tit = '禁用';
					_tips = '字典一旦被'+_tit+'，【'+e.dictName+'】将无法显示和操作!';
				}
				else {
					_tit = '启用';
					_tips = '';
				}

				const STATUS = e.status;
				this.$confirm('确定要'+_tit+'【'+e.dictName+'】字典吗?'+_tips,_tit+'字典',{
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					let status = null;
					if(STATUS === '0'){
						status = 1;
					}
					else {
						status = 0;
					}
					let params = {
						dictId: e.dictId,
						dictType: e.dictType,
						status: status,
					};
					editTableRowData(params).then(response => {
						if(response.code === 0){
							this.$message({type: 'success',message: '字典标签'+_tit+'成功'});
							this.ajaxData();
						}
						else {
							this.$message.error(response.msg);
							//this.roleForm.status = STATUS;
						}
					}).catch(error => {
						reject(error);
						this.$message.error('操作失败！');
						//this.roleForm.status = STATUS;
					})
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消操作！'
					});
					//this.roleForm.status = STATUS;
				});
			}
		}
	}
</script>

<style scoped>
	@import "~@/styles/form.css";
</style>
