<!-- index.vue -->

<template>
	<el-container>
		<el-header class="formDiv">
			<el-form :inline="true" :model="roleForm" class="demo-form-inline">
				<el-form-item label="字典状态">
					<el-select v-model="roleForm.status" placeholder="请选择字典状态" clearable  @keyup.enter.native="onSubmit">
						<el-option label="启用" name="0" value="0"></el-option>
						<el-option label="禁用" name="1" value="1"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="标签查询">
					<el-input v-model.trim="roleForm.dictLabel" placeholder="输入字典标签查询" clearable  @keyup.enter.native="onSubmit"></el-input>
				</el-form-item>

				<el-form-item>
					<el-button type="primary" @click="onSubmit" class="base-btn">查询</el-button>
					<el-button type="warning" @click="onReset" class="base-btn">重置</el-button>
				</el-form-item>
			</el-form>
		</el-header>
		<el-main class="tableContainer">
			<el-container>
				<el-header>
					<el-button type="primary" size="small" @click="addTableRow()" class="base-btn">新增</el-button>
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

						<el-table-column label="字典编码" prop="dictCode" min-width="100"
						                 header-align="left" fixed="left"></el-table-column>

						<el-table-column label="字典标签" prop="dictLabel" min-width="150"
						                 header-align="left"></el-table-column>
						<el-table-column label="字典键值" prop="dictValue" min-width="150"
						                 header-align="left"></el-table-column>
						<el-table-column label="标签排序" prop="dictSort" min-width="150"
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
						                 header-align="left"></el-table-column>

						<el-table-column
								fixed="right"
								label="操作"
								min-width="280"
								header-align="center"
								align="center">
							<template slot-scope="{row,$index}">
                <span @click="handleEdit($index, row)" class="table-btn">
                  编辑
                </span>
								<span @click="handleRemove($index, row)" class="table-btn">
                  删除
                </span>
								<!--<el-button type="primary" size="mini" round plain @click="handleEdit($index, row)">编辑-->
								<!--</el-button>-->
								<!--<el-button type="danger" size="mini" round plain @click="handleRemove($index, row)">删除-->
								<!--</el-button>-->
							</template>
						</el-table-column>
					</el-table>

					<pagination v-show="count>0" :total="count" :page.sync="roleForm.pageNum"
					            :limit.sync="roleForm.pageSize" @pagination="ajaxData"/>

					<myDialog @dialogHide="dialogHanderHide" @addTableRowSubmit="addTableRowSubmit"
					          @editTableRowSubmit="editTableRowSubmit" :dialogTableVisible="isShow"
					          :tableRowValue="tableRowValue" :modelType="modelType"></myDialog>

				</el-main>
			</el-container>
		</el-main>
	</el-container>
</template>

<script>
	import Pagination from '@/components/Pagination'
	import myDialog from "./components/listDialog";
	import {
		getTableData,
		removeTableRowData,
		addTableRowData,
		editTableRowData
	} from "@/api/systemConfig/dictionaryList";

	export default {
		components: {myDialog, Pagination},
		data() {
			return {
				//表单值
				roleForm: {
					status: '',//字典状态
					dictLabel: '',//关键字查询-字典名称
					dictType: '',//字典类型
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
				this.tableRowValue = {
					dictType: this.roleForm.dictType,
					dictCode: '',
				};//行数据格式
				this.modelType = 'add';//将弹框设为新增状态
			},
			//添加行-提交数据
			addTableRowSubmit(params) {
				addTableRowData(params).then(response => {
					if (response.code === 0) {
						this.$message({
							type: 'success',
							message: response.msg
						});
						this.ajaxData();
					}
					else {
						this.$message.error(response.msg);
					}
				}).catch(() => {
					this.$message.error('操作失败！');
				})
			},
			//删除当前行
			handleRemove($index, row) {
				this.$confirm('确定要删除【' + row.dictLabel + '】标签吗？标签一旦被删除，相关功能将无法显示和操作！', '删除标签', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					removeTableRowData(row.dictCode).then(response => {
						if (response.code === 0) {
							this.$message({
								type: 'success',
								message: response.msg
							});
							this.roleForm.pageNum = 1;//当前页码
							this.roleForm.pageSize = 10;//每页显示的数据数量
							this.ajaxData();
						} else {
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
			editTableRowSubmit(params) {
				if (this.tableRowValue !== params) {
					editTableRowData(params).then(response => {
						if (response.code === 0) {
							this.$message({
								type: 'success',
								message: response.msg
							});
							this.ajaxData();
						}
						else {
							this.$message.error(response.msg);
						}
					}).catch(() => {
						this.$message.error('操作失败！');
					})
				}
				else {
					this.$message.error('操作失败！');
				}
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
				let params = this.roleForm;
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
			onReset() {
				this.loadingReset = true;
				this.roleForm = {
					status: '',//字典状态
					dictLabel: '',//关键字查询-字典名称
					dictType: this.$route.query.dictType,//字典类型
					pageNum: 1,//当前页码
					pageSize: 10,//每页显示的数据数量
				};
				this.ajaxData();
			},
			//switch 开关事件监听
			changeSwitch(e) {
				let _tit = '';
				let _tips = '';
				if (e.status === '0') {
					_tit = '禁用';
					_tips = '标签一旦被' + _tit + '，相关功能将无法显示和操作!';
				}
				else {
					_tit = '启用';
					_tips = '';
				}

				const STATUS = e.status;
				this.$confirm('确定要' + _tit + '【' + e.dictLabel + '】标签吗?' + _tips, _tit + '标签', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					let status = null;
					if (STATUS === '0') {
						status = 1;
					}
					else {
						status = 0;
					}
					let params = {
						dictCode: e.dictCode,
						status: status,
					};
					editTableRowData(params).then(response => {
						if (response.code === 0) {
							this.$message({
								type: 'success',
								message: '标签' + _tit + '成功'
							});
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
