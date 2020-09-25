<!-- dialog.vue -->

<template>
	<el-dialog :title="title" :visible="dialogTableVisible" @close='closeDialog' @open="open" width="400px" :close-on-click-modal="false" v-dialogDrag>
		<el-form ref="form" :model="form" :rules="rulesForm" label-width="80px" label-position="right">
			<el-row :gutter="0">
				<el-col :md="this.adaptiveGrid_plus.md" :lg="this.adaptiveGrid_plus.lg">
					<el-form-item label="字典类型" prop="dictType">
						<el-input ref="dictType" v-model="form.dictType" disabled @keyup.enter.native="submitDialog"></el-input>
					</el-form-item>
				</el-col>
				<el-col :md="this.adaptiveGrid_plus.md" :lg="this.adaptiveGrid_plus.lg">
					<el-form-item label="字典标签" prop="dictLabel">
						<el-input ref="dictLabel" v-model="form.dictLabel" clearable placeholder="请输入字典标签" @keyup.enter.native="submitDialog"></el-input>
					</el-form-item>
				</el-col>
				<el-col :md="this.adaptiveGrid_plus.md" :lg="this.adaptiveGrid_plus.lg">
					<el-form-item label="字典键值" prop="dictValue">
						<el-input type="age" ref="dictValue" v-model.number="form.dictValue" clearable
						          placeholder="请输入字典键值(数字类型)" @keyup.enter.native="submitDialog"></el-input>
					</el-form-item>
				</el-col>
				<el-col :md="this.adaptiveGrid_plus.md" :lg="this.adaptiveGrid_plus.lg">
					<el-form-item label="字典排序" prop="dictSort">
						<el-input type="age" ref="dictSort" v-model.number="form.dictSort" clearable
						          placeholder="请输入阿拉伯数字，'1'默认在前面" @keyup.enter.native="submitDialog"></el-input>
					</el-form-item>
				</el-col>
				<el-col :md="this.adaptiveGrid_plus.md" :lg="this.adaptiveGrid_plus.lg">
					<el-form-item label="字典状态">
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
			<el-button type="primary" @click="submitDialog()" class="dailog-btn">确 定</el-button>
		</div>
	</el-dialog>
</template>

<script>
	import {checkDictionaryKey} from "@/api/systemConfig/dictionaryList";
	import {adaptiveGrid_plus} from "@/common/index";

	export default {
		name: "myDialog",
		props: ['dialogTableVisible', 'tableRowValue', 'modelType'],//接受父模板传递的自定义属性
		data() {

			//字典键值校验
			const validateDictValue = (rule, value, callback) => {
				let _value = parseInt(value);
				if(_value === 'NaN'){
					callback(new Error('字典键值必须为数字类型！'));
				}
				else {
					if(_value <= 0){
						callback(new Error('字典键值不能为负数和0，请重新填写！'));
					}
					else {
						let params = {};
						//编辑时
						if(this.modelType === 'edit'){
							params = {
								dictType:this.tableRowValue.dictType,//字典类型
								dictCode:this.tableRowValue.dictCode,//编辑或新增
								dictValue:_value,//字典键值
							};
						}
						//新增
						else {
							params = {
								dictType:this.tableRowValue.dictType,//
								dictCode:'',
								dictValue:_value
							};
						}

						checkDictionaryKey(params).then(response => {
							//成功=0，失败=1
							if(response === 0){
								callback();
							}
							else {
								callback(new Error('字典键值不能重复，请重新填写！'));
							}
						}).catch(error => {
							reject(error);
							this.$message.error('字典键值校验失败！');
						});
					}
				}
			};
			//字典排序校验
			let checkIsNumber = (rule, value, callback) => {
				let _value = parseInt(value);
				if(!Number.isInteger(_value)){
					callback(new Error('字典键值必须为数字类型！'));
				}
				else {
					if(_value <= 0){
						callback(new Error('字典排序不能为负数和0，请重新填写！'));
					}
					else {
						callback();
					}
				}
			};

			return {
				title: '',//弹框title
				form: {
					dictType: '',//字典类型
					dictLabel: '',//字典标签
					dictValue: '',//字典键值
					dictSort: '',//标签排序
					status: '',//字典状态
					remark: '',//备注
				},
				//表单校验
				rulesForm: {
					dictType: [
						{required: true, message: '字典类型不能为空，请重新输入！', trigger: 'blur'},
					],
					dictLabel: [
						{required: true, message: '字典标签不能为空，请重新输入！', trigger: 'blur'},
					],
					dictValue: [
						{required: true, trigger: 'blur', validator: validateDictValue},
					],
					dictSort: [
						{required: true, trigger: 'blur',validator: checkIsNumber},
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
				//自适应
				adaptiveGrid_plus:{
					md:adaptiveGrid_plus.md,
					lg:adaptiveGrid_plus.lg
				}
			};
		},
		methods: {
			//取消关闭弹框
			closeDialog() {
				this.form = {
					dictType: '',//字典类型
					dictLabel: '',//字典标签
					dictValue: '',//字典键值
					dictSort: '',//标签排序
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
								dictCode: this.tableRowValue.dictCode,//字典编码
								dictType: this.tableRowValue.dictType,//字典类型
								dictLabel: this.$refs.dictLabel.value,//字典标签
								dictValue: this.$refs.dictValue.value,//字典键值
								dictSort: this.$refs.dictSort.value,//标签排序
								status: this.$refs.status.value,
								remark: this.$refs.remark.value,
							};
							this.$emit('editTableRowSubmit', params);
						}
						//新增
						else {
							let params = {
								dictType: this.tableRowValue.dictType,//字典类型
								dictLabel: this.$refs.dictLabel.value,//字典标签
								dictValue: this.$refs.dictValue.value,//字典键值
								dictSort: this.$refs.dictSort.value,//标签排序
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
					this.title = '编辑标签';
				}
				else {
					this.title = '新增标签';
				}
				this.form = {
					dictType: this.tableRowValue.dictType,//字典类型
					dictLabel: this.tableRowValue.dictLabel || '',//字典标签
					dictValue: this.tableRowValue.dictValue || '',//字典键值
					dictSort: this.tableRowValue.dictSort || '',//标签排序
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
