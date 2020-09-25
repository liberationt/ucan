 <!-- index.vue -->

<template>
	<el-container>
		<el-header class="formDiv">
			<el-form :inline="true" :model="form" class="demo-form-inline">
				<el-form-item label="部门状态">
					<el-select v-model="form.status" placeholder="请选择部门状态" clearable  @keyup.enter.native="onSubmit">
						<el-option label="启用" name="0" value="0"></el-option>
						<el-option label="禁用" name="1" value="1"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="名称查询">
					<el-input v-model.trim="form.deptName" placeholder="输入部门名称查询" clearable  @keyup.enter.native="onSubmit"></el-input>
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
					<el-button type="primary" class="base-btn" @click="addTableRow()" v-has="{class: '新增'}">新增
					</el-button>
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
							fit
							row-key="deptId"
							:expand-row-keys="checkedKeys"
							@expand-change="getIds"
							:tree-props="{children: 'children', hasChildren: 'hasChildrens'}"
					>

						<el-table-column type="selection" width="50" fixed="left"></el-table-column>

						<el-table-column label="部门名称" prop="deptName" min-width="150"
						                 header-align="left"></el-table-column>

						<el-table-column label="部门排序" prop="orderNum" min-width="150"
						                 header-align="left"></el-table-column>

						<el-table-column label="部门状态" prop="status" min-width="150" header-align="left">
							<template slot-scope="scope">
								<el-switch
										v-if="scope.row.orderNum !== '0'"
										class="switchStyle"
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

						<el-table-column label="创建时间" prop="createTime" min-width="200"
						                 header-align="left"></el-table-column>

						<!--fixed="right"-->
						<el-table-column
								label="操作"
								fixed="right"
								min-width="280"
								header-align="center"
								align="center"
								class="firstBtnClass">
							<template slot-scope="{row,$index}">
								<button @click="handleAddDepartment($index, row)"
								        :disabled="row.status === '1'?true:false" v-if="row.isShow !== false"
								        v-has="{class: '新增'}" class="table-btn disableBtn">添加下级部门</button>
								<span @click="handleEdit($index, row)" v-has="{class: '编辑'}" class="table-btn">编辑</span>
								<span @click="handleRemove($index, row)" v-has="{class: '删除'}" class="table-btn">删除</span>
							</template>
						</el-table-column>
					</el-table>

					<myDialog @checkArr="checkArr" @dialogHide="dialogHanderHide" @addTableRowSubmit="addTableRowSubmit"
					          @editTableRowSubmit="editTableRowSubmit"
					          :templateParameter="templateParameter"></myDialog>

				</el-main>
			</el-container>
		</el-main>
	</el-container>
</template>

<script>
	import Pagination from '@/components/Pagination';
	import myDialog from "./components/dialog";
	import {
		removeTableRowData,
		editTableRowData,
		getSubsetTableData,
		addTableRowData,
		querySubtreeByKeyword,
		loadDepartmentTreeData,
		changeDeptStatus,
		deptMember
	} from "@/api/systemConfig/department";
	import {mapGetters} from 'vuex'

	export default {
		components: {myDialog, Pagination},
		computed: {
			...mapGetters([
				'data',
			])
		},
		data() {
			return {
				//表单值
				form: {
					status: '',//部门状态
					deptName: '',//关键字查询-部门名称
					pageNum: 1,//当前页码
					pageSize: 10,//每页显示的数据数量
				},
				tableData: [],
				multipleSelection: [],//多选的行数据
				removeDisabled: true,//批量删除按钮的disabled
				loadingSubmit: false,//查询按钮加载动画
				loadingReset: false,//重置按钮加载动画
				//模板传参
				templateParameter: {
					isShow: false,//弹框显示隐藏
					tableRowValue: '',//表格当前行数据
					modelType: '',//弹框的类型，可编辑或可新增
					loading: false,//弹框提交按钮加载动画
					childRow: false,//是否是‘添加子行’打开弹框
				},
				checkedKeys: [],
				isOperate: true, // 是否禁用添加子菜单按钮
			}
		},
		//在模板渲染成html后调用，通常是初始化页面完成后，再对html的dom节点进行一些需要的操作。
		mounted() {
			if (this.data.sysRoles) {
				for (let i = 0; i < this.data.sysRoles.length; i++) {
					if (this.data.sysRoles[i].roleKey === 'operate_manage') {
						this.isOperate = false;
						break
					}
				}
			}
			this.onReset();
		},
		methods: {
			// 新增时未展开树， 记录节点并展开
			checkArr(val) {
				this.checkedKeys = this.checkedKeys.concat(val)
				this.checkedKeys = Array.from(new Set(this.checkedKeys))
			},
			// 树型表格展开关闭时获取ids
			getIds(row, expanded) {
				if (expanded === true) {
					this.checkedKeys.push(row.id)
				} else {
					for (let i = 0; i < this.checkedKeys.length; i++) {
						if (this.checkedKeys[i] === row.id) {
							this.checkedKeys.splice(i, 1)
							break
						}
					}
				}
			},
			//添加行-打开弹框
			addTableRow() {
				this.templateParameter.isShow = true;//打开弹框
				this.templateParameter.tableRowValue = {};//行数据格式
				this.templateParameter.modelType = 'add';//将弹框设为新增状态
				this.templateParameter.childRow = false;//是否是‘添加子行’打开弹框
			},
			//添加行-提交数据
			addTableRowSubmit(params) {
				this.templateParameter.loading = true;
				addTableRowData(params).then(response => {
					if (response.code === 0) {
						this.$message({
							type: 'success',
							message: response.msg
						});
						this.ajaxData();
						this.templateParameter.loading = false;
						return false;
					}
					else {
						this.$message.error(response.msg);
						this.templateParameter.loading = false;
						return false;
					}
				}).catch(error => {
					reject(error);
					this.$message.error('操作失败！');
					this.templateParameter.loading = false;
					return false;
				})
			},
			//删除当前行
			handleRemove($index, row) {
				let word;
				deptMember(row.deptId).then(res => {
					if (res) {
						if (res.length > 0){
							let roleNameArr = [];
							res.forEach((item, index) => {
								roleNameArr.push(item.roleName+'角色');
							});
							word = `您确认要删除【${row.deptName}】部门吗？删除后，配置以下角色的账号将无法访问该部门的业务数据：${roleNameArr.join(',')}`;
						}
						else {
							word = `你确定要删除【${row.deptName}】部门吗？删除后该部门的业务数据将无法访问。`;
						}
						this.$confirm(word, '删除部门', {
							confirmButtonText: '确定',
							cancelButtonText: '取消',
							type: 'warning'
						}).then(() => {
							removeTableRowData(row.deptId).then(response => {
								if (response.code === 0) {
									this.$message({
										type: 'success',
										message: response.msg
									});
									this.form.pageNum = 1;
									this.ajaxData();
								}
								else {
									this.$message.error(response.msg);
								}
							}).catch(error => {
								reject(error);
								this.$message.error('操作失败！');
							});
						}).catch(() => {
							this.$message({
								type: 'info',
								message: '已取消操作！'
							});
						});
					}
				})
			},
			//编辑-打开弹框
			handleEdit($index, row) {
				this.templateParameter.isShow = true;//打开弹框
				this.templateParameter.tableRowValue = row;//将选中的行数据传到弹框
				this.templateParameter.modelType = 'edit';//将弹框设为编辑状态
				this.templateParameter.childRow = false;//是否是‘添加子行’打开弹框
			},
			//编辑-提交数据
			editTableRowSubmit(params) {
				this.templateParameter.loading = true;
				if (this.templateParameter.tableRowValue !== params) {
					editTableRowData(params).then(response => {
						if (response.code === 0) {
							this.$message({
								type: 'success',
								message: response.msg
							});
							this.ajaxData();
							this.templateParameter.loading = false;
						}
						else {
							this.$message.error(response.msg);
							this.templateParameter.loading = false;
						}
					}).catch(error => {
						reject(error);
						this.$message.error('操作失败！');
						this.templateParameter.loading = false;
					})
				}
				else {
					this.$message.error('操作失败！');
					this.templateParameter.loading = false;
				}
			},
			dialogHanderHide() {
				this.templateParameter.isShow = false
			},
			//请求后台数据---axios--查全部数据
			ajaxData(data) {
				loadDepartmentTreeData(data).then(response => {
					this.tableData = response;
					if (this.isOperate === false) {
						if (this.tableData[0].hasChildren) {
							this.tableData[0].children.forEach((item, i) => {
								this.tableData[0].children[i].isShow = false
							})
						}
					}
					this.loadingReset = false;
					this.loadingSubmit = false;
				}).catch(() => {
					this.$message.error('请求失败！');
					setTimeout(() => {
						this.loadingReset = false;
						this.loadingSubmit = false;
					}, 1000);
				});
			},
			//查询筛选数据
			filterAjaxData(data) {
				loadDepartmentTreeData(data).then(response => {
					this.tableData = response;
					this.loadingReset = false;
					this.loadingSubmit = false;
				}).catch(() => {
					this.$message.error('请求失败！');
					setTimeout(() => {
						this.loadingReset = false;
						this.loadingSubmit = false;
					}, 1000);
				});
			},
			//表单查询按钮
			onSubmit() {
				this.loadingSubmit = true;
				let parmas = {
					status: this.form.status,
					deptName: this.form.deptName.trim(),
				};
				if (parmas.visible === '' && parmas.deptName === '') {
					this.ajaxData();
				}
				else {
					this.ajaxData(parmas);
				}
			},
			//表单重置按钮
			onReset() {
				this.loadingReset = true;
				//表单值
				this.form = {
					status: '',//部门状态
					deptName: '',//关键字查询-部门名称
					pageNum: 1,//当前页码
					pageSize: 10,//每页显示的数据数量
				};
				this.ajaxData();
			},
			//添加下级部门
			handleAddDepartment($index, row) {
        console.log(row);
        this.templateParameter.isShow = true;//打开弹框
				//this.templateParameter.tableRowValue = {deptId:row.deptId,deptName:row.deptName};//行数据格式
				this.templateParameter.tableRowValue = row;//行数据格式
				this.templateParameter.modelType = 'addSub';//将弹框设为新增状态
				this.templateParameter.childRow = true;//是否是‘添加子行’打开弹框
			},
			//switch 开关事件监听
			changeSwitch(e) {
				let _tit = '';
				if (e.status === '0') {
					_tit = '禁用';
				}
				else {
					_tit = '启用';
				}

				const STATUS = e.status;
				this.$confirm('确定要' + _tit + '【' + e.deptName + '】部门吗?', _tit + '部门', {
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
						deptId: e.deptId,
						status: status,
					};

					changeDeptStatus(params).then(response => {
						if (response.code === 0) {
							this.$message({type: 'success', message: '部门' + _tit + '成功'});
							this.ajaxData();
							this.templateParameter.loading = false;
						}
						else {
							this.$message.error(response.msg);
							this.templateParameter.loading = false;
						}
					}).catch(error => {
						reject(error);
						this.$message.error('操作失败！');
						this.templateParameter.loading = false;
					})
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消操作！'
					});
					this.form.status = STATUS;
				});
			},
		}
	}
</script>

<style scoped>
	@import "~@/styles/form.css";

	.disableBtn {
		border: none;
		background-color: transparent;
	}

	.disableBtn[disabled] {
		cursor: no-drop;
	}
</style>
