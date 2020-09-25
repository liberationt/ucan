<!-- dialog.vue -->

<template>
	<el-dialog :title="title" :visible="dialogTableVisible" @close='closeDialog' @open="open"
	           :closeOnClickModal="closeOnClickModal" :closeOnPressEscape="closeOnPressEscape" width="400px" :close-on-click-modal="false" v-dialogDrag>
		<el-form ref="form" :model="form" :rules="rulesForm" label-width="80px" >
			<el-row >
				<el-col :md="this.adaptiveGrid_plus.md" :lg="this.adaptiveGrid_plus.lg">
					<el-form-item label="字典名称" prop="dictName">
						<el-input ref="dictName" v-model="form.dictName" clearable placeholder="请输入字典名称" @keyup.enter.native="submitDialog"></el-input>
					</el-form-item>
				</el-col>
				<el-col :md="this.adaptiveGrid_plus.md" :lg="this.adaptiveGrid_plus.lg">
					<el-form-item label="字典类型" prop="dictType">
						<el-input ref="dictType" v-model="form.dictType" clearable placeholder="请输入字典类型" @keyup.enter.native="submitDialog"></el-input>
					</el-form-item>
				</el-col>
				<el-col :md="this.adaptiveGrid_plus.md" :lg="this.adaptiveGrid_plus.lg">
					<el-form-item label="字典状态">
						<!--<el-input ref="status" v-model="form.status" clearable ></el-input>-->
						<el-switch class="switchStyle"
						           ref="status"
						           v-model="form.status"
						           active-text="启用"
						           inactive-text="禁用"
						           active-value="0"
						           inactive-value="1">
						</el-switch>
					</el-form-item>
				</el-col>
				<el-col :md="this.adaptiveGrid_plus.md" :lg="this.adaptiveGrid_plus.lg">
					<el-form-item label="备注">
						<el-input ref="remark" type="textarea" :rows="2" placeholder="请输入内容" v-model="form.remark"
						          clearable @keyup.enter.native="submitDialog"></el-input>
					</el-form-item>
				</el-col>
			</el-row>
		</el-form>

		<div slot="footer" class="dialog-footer">
			<el-button @click="closeDialog()">取 消</el-button>
			<el-button :loading="loading" type="primary" @click="submitDialog()" class="dailog-btn" >确 定</el-button>
		</div>
	</el-dialog>
</template>

<script>
	import {getTableData, checkDictionaryType,checkDictionaryName} from "@/api/systemConfig/dictionary";
	import {adaptiveGrid_plus} from "@/common/index";

	export default {
		name: "myDialog",
		props: ['dialogTableVisible', 'tableRowValue', 'modelType', 'loading'],//接受父模板传递的自定义属性
		data() {
			//字典类型校验
			const validateDictType = (rule, value, callback) => {
				if(value.trim() === ''){
					callback(new Error('字典类型不能为空，请重新输入！'));
				}
				else {
					let params = {};
					//编辑时
					if (this.modelType === 'edit') {
						params = {
							dictType: value,
							dictId: this.tableRowValue.dictId
						};
					}
					//新增
					else {
						params = {
							dictType: value,
							dictId: ''
						};
					}

					checkDictionaryType(params).then(response => {
						//成功=0，失败=1
						if (response === 0) {
							callback();
						}
						else {
							callback(new Error('字典类型不能重复，请重新输入!'));
						}
					}).catch(error => {
						reject(error);
						this.$message.error('字典类型校验失败！');
					});
				}
			};
			//字典名称校验
			const validateDictName = (rule, value, callback) => {
				if(value.trim() === ''){
					callback(new Error('字典名称不能为空，请重新输入！'));
				}
				else {
					let params = {};
					//编辑时
					if (this.modelType === 'edit') {
						params = {
							dictName: value,
							dictId: this.tableRowValue.dictId
						};
					}
					//新增
					else {
						params = {
							dictName: value,
							dictId: ''
						};
					}

					checkDictionaryName(params).then(response => {
						//成功=0，失败=1
						if (response === 0) {
							callback();
						}
						else {
							callback(new Error('字典名称不能重复，请重新输入!'));
						}
					}).catch(error => {
						reject(error);
						this.$message.error('字典名称校验失败！');
					});
				}
			};
			return {
				title: '',//弹框title
				form: {
					dictName: '',//字典名称
					dictType: '',//字典类型
					status: '',//字典状态
					remark: '',//备注
				},
				//表单校验
				rulesForm: {
					//字典名称
					dictName: [
						{required: true, trigger: 'blur', validator: validateDictName},
					],
					//字典类型
					dictType: [
						{required: true, trigger: 'blur', validator: validateDictType},
					],
				},
				//账号角色
				accountRoleOptions: [
					{value: '企业部门1'},
					{value: '企业部门2'},
				],
				//账号类型
				accountTypeOptions: [
					{value: '测试账号1'},
					{value: '生产账号2'},
				],
				closeOnClickModal: false,//是否可通过点击遮罩关闭
				closeOnPressEscape: false,//是否可通过按下 ESC 键关闭
				//自适应
				adaptiveGrid_plus:{
					md:adaptiveGrid_plus.md,
					lg:adaptiveGrid_plus.lg
				}
			};
		},
		mounted() {

		},
		methods: {
			//取消关闭弹框
			closeDialog() {
				this.form = {
					dictName: '',//字典名称
					dictType: '',//字典类型
					status: '',//字典状态
					remark: '',//备注
				};
				this.$nextTick(() => {
					this.$refs['form'].clearValidate();
				});
				this.$emit('dialogHide', 'false');
			},
			// 确认，提交表单
			submitDialog() {
				this.$refs["form"].validate((valid) => {
					if (valid) {
						//编辑
						if (this.modelType === 'edit') {
							let params = {
								dictId: this.form.dictId,
								dictName: this.$refs.dictName.value,
								dictType: this.$refs.dictType.value,
								status: this.$refs.status.value,
								remark: this.$refs.remark.value,
							};
							this.$emit('editTableRowSubmit', params);
						}
						//新增
						else {
							let params = {
								dictName: this.$refs.dictName.value,
								dictType: this.$refs.dictType.value,
								status: this.$refs.status.value,
								remark: this.$refs.remark.value,
							};
							this.$emit('addTableRowSubmit', params);
						}

						this.closeDialog();
					}
					else {
						return false;
					}
				});
			},
			//打开的回调
			open() {
				if (this.modelType === 'edit') {
					this.title = '编辑字典';
				}
				else {
					this.title = '新增字典';
				}
				this.form = {
					dictId: this.tableRowValue.dictId || '',
					dictName: this.tableRowValue.dictName || '',
					dictType: this.tableRowValue.dictType || '',
					status: this.tableRowValue.status || '0',
					remark: this.tableRowValue.remark || '',
				};
			}
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
</style>
