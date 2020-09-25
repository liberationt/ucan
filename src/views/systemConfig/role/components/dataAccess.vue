<template>
	<el-dialog :title="title" :visible="dataAccessShow" @close='closeDialog' @open="open"
	           :closeOnClickModal="closeOnClickModal" :closeOnPressEscape="closeOnPressEscape">
		<el-container>
			<el-header>
				<!--:rules="rules"-->
				<el-form ref="form" :model="form" label-width="110px" label-position="left">
					<el-row :gutter="50">
						<el-col :md="this.adaptiveGrid.md" :lg="this.adaptiveGrid.lg">
							<el-form-item label="角色名称" prop="roleName">
								<el-input ref="roleName" v-model="form.roleName" clearable disabled></el-input>
							</el-form-item>
						</el-col>
						<el-col :md="this.adaptiveGrid.md" :lg="this.adaptiveGrid.lg">
							<el-form-item label="数据范围" prop="dataScope">
								<el-select ref="dataScope" v-model="form.dataScope" placeholder="数据范围" clearable>
									<el-option v-for="item in roleTypeOptions" :key="item.dictValue"
									           :label="item.dictLabel" :value="item.dictValue"></el-option>
								</el-select>
							</el-form-item>
						</el-col>
					</el-row>
				</el-form>
			</el-header>
			<el-main>
				<p class="menuLabel">数据权限：</p>
				<el-tree
						:data="treeData"
						show-checkbox
						node-key="deptId"
						ref="tree"
						highlight-current
						check-on-click-node
						expand-on-click-node
						:default-expanded-keys="checkedKeys"
						:default-checked-keys="checkedKeys"
						label="remake"
						:props="defaultProps"
						v-loading="treeLoading"
				>
				</el-tree>
			</el-main>
		</el-container>

		<div slot="footer" class="dialog-footer">
			<el-button @click="closeDialog()">取 消</el-button>
			<el-button :loading="loading" type="primary" @click="submitDialog()" :disabled="submitDisabled">确 定</el-button>
		</div>

		<!--<el-button @click="qushujiedianzhi()">取树节点值</el-button>-->
	</el-dialog>
</template>

<script>
	import {
		getTableData,
		userPermissionsTree,
		getMenuCheckedId,
		queryRoleType,
		loadDepartmentTreeData,
		querySubtreeByKeyword,
		echoCheckedTreeNode
	} from "@/api/systemConfig/role";
	import {adaptiveGrid} from "@/common/index";

	export default {
		name: "myDialog",
		props: ['dataAccessShow', 'tableRowValue', 'loading'],//接受父模板传递的自定义属性
		data() {
			//角色类型校验
			/*const validateRoleType = (rule, value, callback) => {
				if(value.trim() !== ''){
					this.validateRoleType = false;
					callback();
				}
				else {
					this.validateRoleType = true;
					callback(new Error('角色类型不能为空，请输入'));
				}
				this.submitDisabledFun();
			};*/
			return {
				title: '数据权限',//弹框title
				submitDisabled: false,//未通过校验，则不能提交确认按钮
				validateRoleName: true,//角色名称校验
				validateRoleType: false,//角色类型校验
				form: {
					roleName: '',//角色名称
					dataScope: '',//数据范围
				},
				rules: {
					dataScope: [
						{required: true},
					],
				},
				roleTypeOptions: [],//数据范围
				closeOnClickModal: false,//是否可通过点击遮罩关闭
				closeOnPressEscape: false,//是否可通过按下 ESC 键关闭
				/*************************tree**************************/
				treeData: [],
				defaultProps: {
					children: 'children',
					label: 'deptName'
				},
				deptIdsArr: [],//树节点数组
				checkedKeys: null || [],//选中的菜单keys
				treeLoading: true,
				//自适应
				adaptiveGrid:{
					md:adaptiveGrid.md,
					lg:adaptiveGrid.lg
				}
			};
		},
		mounted() {

		},
		methods: {
			//提交按钮是否可点击
			submitDisabledFun() {
				/*if(this.validateRoleType === false && this.validateRoleName === false){
					this.submitDisabled = false;
				}
				else{
					this.submitDisabled = true;
				}*/
			},
			//取消关闭弹框
			closeDialog() {
				this.form = {
					roleName: '',//角色名称
					dataScope: '',//数据范围
				};
				this.treeData = [];
				this.checkedKeys = [];

				this.$nextTick(() => {
					this.$refs['form'].clearValidate();
				});

				this.$emit('dialogHide', 'false');
			},
			// 确认，提交表单
			submitDialog() {
				this.deptIdsArr = this.$refs.tree.getCheckedKeys(true).join(',');

				let params = {
					roleId: this.form.roleId,
					//roleName: this.$refs.roleName.value,
					dataScope: this.$refs.dataScope.value,
					//roleKey: this.form.roleKey || '',
					deptIds: this.deptIdsArr
				};
				this.$emit('addDataAccessSubmit', params);

				this.closeDialog();
			},
			//打开的回调
			open() {
				//查询数据范围
				let paramsRoleType = {dictType: 'data_scope'};
				queryRoleType(paramsRoleType).then(response => {
					this.roleTypeOptions = response.rows;
				}).catch(() => {
					this.$message.error('角色类型请求失败！');
				});

				this.treeLoading = true;

				this.form = {
					roleId: this.tableRowValue.roleId || '',
					roleName: this.tableRowValue.roleName || '',
					dataScope: this.tableRowValue.dataScope || '',
				};

				//请求树菜单
        let parmas = {status:0};
				loadDepartmentTreeData(parmas).then(response => {
					this.treeData = response || [];
					//请求树菜单成功后，再请求选中的菜单id集合
					//let _params = this.tableRowValue.roleId || '';
					echoCheckedTreeNode(this.tableRowValue.roleId).then(response => {
						this.checkedKeys = response || [];
						this.treeLoading = false;
					}).catch(() => {
						setTimeout(() => {
							this.treeLoading = false;
						}, 1000);
					});

					this.treeLoading = false;
				}).catch(() => {
					this.treeLoading = false;
				});
			},
			//
			/*qushujiedianzhi(){
				let PPP = this.$refs.tree.getHalfCheckedKeys();
				//let KKK = this.$refs.tree.getCheckedKeys().concat(PPP);
				let KKK = this.$refs.tree.getCheckedKeys(true);
			}*/
		}
	};
</script>

<style scoped>
	.el-dialog__wrapper {
		background-color: rgba(0, 0, 0, 0.3);
		z-index: 999;
	}

	.el-row {
		margin: 0 !important;
	}

	.el-select, .el-date-editor {
		width: 100% !important;
	}

	.el-header {
		padding-left: 0;
		padding-right: 0;
	}

	.el-main {
		border-top: 1px solid #DCDFE6;
	}

	.el-tree {
		max-height: 300px;
		overflow: auto;
		overflow-x: hidden;
		padding-left: 100px;
	}

	.menuLabel {
		font-size: 14px;
		color: #606266;
		font-weight: 700;
		padding-left: 5px;
	}
</style>
