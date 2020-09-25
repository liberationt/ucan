<!-- dialog.vue -->

<template>
	<el-dialog class="hupingClass" :title="title" :visible="templateParameter.isShow" @close='closeDialog' @open="open"
	           :closeOnClickModal="closeOnClickModal" :closeOnPressEscape="closeOnPressEscape" width="400px" top="200px"
	           v-dialogDrag :close-on-click-modal="false" >

		<el-form ref="form" :model="form" :rules="rulesForm" label-width="80px">
			<el-row :gutter="0">
				<el-col :md="this.adaptiveGrid_plus.md" :lg="this.adaptiveGrid_plus.lg">
					<el-form-item label="上级部门" prop="parentId" v-if="templateParameter.modelType === 'add'">
						<el-cascader
								ref="parentId"
								:show-all-levels="false"
								:options="departmentOptions"
								v-model="form.parentId"
								style="width: 100%;"
								:props="defaultProps"
								filterable
								:placeholder="parentIdPlaceholder"
								@change="handleChange"
								:disabled="depDisabled"
								clearable
                @keyup.enter.native="submitDialog"
						>
						</el-cascader>
					</el-form-item>
          <el-form-item label="上级部门" prop="parentId" v-if="templateParameter.modelType !== 'add'">
            <el-input v-model.trim="templateParameter.tableRowValue.deptName" :disabled="depDisabled"
            ></el-input>
          </el-form-item>
				</el-col>
				<el-col :md="this.adaptiveGrid_plus.md" :lg="this.adaptiveGrid_plus.lg">
					<el-form-item label="部门名称" prop="deptName">
						<el-input ref="deptName" v-model.trim="form.deptName" clearable
						          placeholder="请输入部门名称" @keyup.enter.native="submitDialog"></el-input>
					</el-form-item>
				</el-col>
				<el-col :md="this.adaptiveGrid_plus.md" :lg="this.adaptiveGrid_plus.lg">
					<el-form-item label="部门排序" prop="orderNum">
						<el-input type="age" ref="orderNum" v-model.number="form.orderNum" clearable
						          placeholder="请输入阿拉伯数字，'1'默认在前面" @keyup.enter.native="submitDialog"></el-input>
					</el-form-item>
				</el-col>
				<el-col :md="this.adaptiveGrid_plus.md" :lg="this.adaptiveGrid_plus.lg">
					<el-form-item label="部门状态">
						<el-switch class="switchStyle"
						           ref="status"
						           v-model="form.status"
						           active-text="启用"
						           inactive-text="禁用"
						           active-value="0"
						           inactive-value="1"
						>
						</el-switch>
					</el-form-item>
				</el-col>
				<el-col :md="this.adaptiveGrid_plus.md" :lg="this.adaptiveGrid_plus.lg">
					<el-form-item label="所属区域" prop="areaCode">
						<Address :area-code="areaCode" :form-code="form.areaCode" @getAreaCode="getAreaCode"
						         :id-edit="idEdit" style="width:100%;" @keyup.enter.native="submitDialog"></Address>
					</el-form-item>
				</el-col>
			</el-row>
		</el-form>

		<div slot="footer" class="dialog-footer">
			<el-button @click="closeDialog()">取 消</el-button>
			<el-button :loading="templateParameter.loading" type="primary" @click="submitDialog()">确 定
			</el-button>
		</div>
	</el-dialog>
</template>

<script>
	import Address from "@/components/Address";
	import {
		getMenuCheckedId,
		loadDepartmentTreeData
	} from "@/api/systemConfig/department";
	import {adaptiveGrid_plus} from "@/common/index";
	import _ from "lodash";
	import {mapGetters} from 'vuex'

	export default {
		name: "myDialog",
		components: {Address},
		computed: {
			...mapGetters([
				'data',
			])
		},
		//props: ['dialogTableVisible', 'tableRowValue', 'modelType', 'loading'],//接受父模板传递的自定义属性
		props: ['templateParameter'],//接受父模板传递的自定义属性
		data() {
			//部门排序
			let checkIsNumber = (rule, value, callback) => {
				let _v = parseInt(value);
				if (!value) {
					return callback(new Error('部门排序不能为空，请输入！'));
				}
				else {
					if (!Number.isInteger(_v)) {
						callback(new Error('部门排序必须为数字类型！'));
					} else {
						callback();
					}
				}
			};
			//上级部门
			let validParentId = (rule, value, callback) => {
				if (this.validParentIdBole) {
					if (this.form.parentId.length === 0 && this.templateParameter.tableRowValue.deptId !== 1) {
						return callback(new Error('上级部门不能为空，请选择！'));
					}
					else {
						callback();
					}
				}
			};
			//区域
			let validAreaCode = (rule, value, callback) => {
				if (this.validParentIdBole) {
					if (this.form.areaCode.length === 0 && this.areaCode.length === 0) {
						return callback(new Error('所属区域不能为空，请选择！'));
					}
					else {
						callback();
					}
				}
			};
			return {
				title: '',//弹框title
				form: {
					parentId: [],//父级id
					parentName: '',//上级部门名称
					deptId: '',//部门id
					deptName: '',//部门名称
					orderNum: '',//标签排序
					status: '',//部门状态
					fullName: '',//祖籍部门全称
					areaCode: [],
				},
				depDisabled: '',//上级部门不可编辑
				getParentId: '',//获取级联的父级ID
				getFullName: '',//获取祖籍部门全称
				closeOnClickModal: false,//是否可通过点击遮罩关闭
				closeOnPressEscape: false,//是否可通过按下 ESC 键关闭
				departmentOptions: [],//级联树数据
				defaultProps: {
					children: 'children',
					label: 'deptName',
					value: 'deptId',
					checkStrictly: true
					//fullName: 'fullName'
				},
				validParentIdBole: false,
				parentIdPlaceholder: '请选择上级部门（可点击搜索）',
				upDtps: [], // 选中部门的上级各级部门
				//form 表单的验证规则
				rulesForm: {
					//上级部门
					parentId: [
						//{required: true, message: '上级部门不能为空，请选择！', trigger: 'change'},
						{required: true, trigger: 'change', validator: validParentId},
					],
					//部门名称
					deptName: [
						{required: true, message: '部门名称不能为空，请填写！', trigger: 'blur'},
					],
					//部门排序
					orderNum: [
						{required: true, trigger: 'blur', validator: checkIsNumber},
					],
					//区域
					areaCode:[
						{required: true, trigger: 'change', validator: validAreaCode},
					]
				},
				//自适应
				adaptiveGrid_plus: {
					md: adaptiveGrid_plus.md,
					lg: adaptiveGrid_plus.lg
				},
				// 区域全部ID
				areaCode: [],
				idEdit: true,
			}
		},
		methods: {
			//取消关闭弹框
			closeDialog() {
				this.areaCode = [];
				this.idEdit = true;

				this.form = {
					parentId: [],//父级id
					parentName: '',//上级部门名称
					deptId: '',//部门id
					deptName: '',//部门名称
					orderNum: '',//标签排序
					status: '',//部门状态
					fullName: '',//祖籍部门全称
					areaCode: [],
				};
				this.$nextTick(() => {
					this.$refs['form'].clearValidate();
				});

				this.$emit('dialogHide', 'false');

			},
			// 确认，提交表单
			submitDialog() {

				this.validParentIdBole = true;
				const checkArr = this.getParentId.split(',');

				this.$refs["form"].validate((valid) => {
					if (valid) {
						//编辑
						if (this.templateParameter.modelType === 'edit') {

							let _fullName;
							if (this.getFullName.length === 0) {
								_fullName = this.templateParameter.tableRowValue.fullName;
							}
							else {
								_fullName = this.getFullName.join('-');
							}

							let _parentId;
							if (this.getParentId === '') {
								_parentId = this.templateParameter.tableRowValue.parentId;
							}
							else {
								let a = this.getParentId.split(',');
								_parentId = a.pop();
							}

							let params = {
								deptId: this.templateParameter.tableRowValue.deptId,
								ancestors: this.templateParameter.tableRowValue.ancestors,
								parentId: _parentId,
								deptName: this.$refs.deptName.value,
								status: this.$refs.status.value,
								orderNum: this.$refs.orderNum.value,
								fullName: _fullName,
								areaCode: this.areaCode[this.areaCode.length - 1],
							};
							this.$emit('editTableRowSubmit', params);
						}
						//新增
						else if (this.templateParameter.modelType === 'add') {
							let _ancestors = '0,' + this.getParentId;
							let _parentId = this.getParentId.split(',');
							let _parentId_new = _parentId.pop();
							let _fullName = this.getFullName.join('-');
							let params = {
								deptId: '',
								ancestors: _ancestors,
								parentId: _parentId_new,
								deptName: this.$refs.deptName.value,
								status: this.$refs.status.value,
								orderNum: this.$refs.orderNum.value,
								fullName: _fullName + '-' + this.$refs.deptName.value,
								areaCode: this.areaCode[this.areaCode.length - 1],
							};
							this.$emit('addTableRowSubmit', params);
						}
						//添加下级部门
						else if (this.templateParameter.modelType === 'addSub') {
							let params = {
								deptId: '',
								ancestors: this.templateParameter.tableRowValue.ancestors + ',' + this.templateParameter.tableRowValue.deptId || '',
								parentId: this.templateParameter.tableRowValue.deptId,
								deptName: this.$refs.deptName.value,
								status: this.$refs.status.value,
								orderNum: this.$refs.orderNum.value,
								fullName: this.templateParameter.tableRowValue.fullName + '-' + this.$refs.deptName.value,
								areaCode: this.areaCode[this.areaCode.length - 1],
							};
							this.$emit('addTableRowSubmit', params);
						}
						this.$emit('checkArr', checkArr);
						this.closeDialog();

						this.areaCode = [];
						this.idEdit = true;
					}
				});
			},
			// 判断是否是运营管理员
			isOperateor() {

			},
			//打开的回调
			open() {
        this.$nextTick(() => {
					this.$refs['form'].clearValidate();
				});
				/*
				* parentId 上级部门id
				* parentName 上级部门名称
				* */
				//编辑
				if (this.templateParameter.modelType === 'edit') {
					this.form.deptId = this.templateParameter.tableRowValue.deptId;
					this.title = '编辑部门';
					this.depDisabled = false;
					this.validParentIdBole = false;

					//加载部门树
					loadDepartmentTreeData().then(response => {
						this.departmentOptions = response;
						//在部门树中渲染当前部门的上级部门
						let _parentId = this.templateParameter.tableRowValue.ancestors.split(',');
						_parentId.shift();
						let _parentId_new = _parentId.map(Number);
						if (_parentId.length === 0) {
							this.depDisabled = true;
						}
            if (this.data.sysRoles) {
							for (let i = 0; i < this.data.sysRoles.length; i++) {
								if (this.data.sysRoles[i].roleKey === 'operate_manage') {
									this.depDisabled = true;
									break
								}
							}
						}
						this.form.parentId = _parentId_new;

					}).catch(error => {
						reject(error);
					});

					if (this.templateParameter.tableRowValue.bolDirectory === true) {
						this.depDisabled = true;
						this.parentIdPlaceholder = this.templateParameter.tableRowValue.parentName;
					}
					else {
						this.depDisabled = true;
						this.parentIdPlaceholder = '请选择上级部门（可点击搜索）'
					}

					/*
					* 设置默认的 区域值
					* */
					let defaultAreaCode = this.templateParameter.tableRowValue.areaCode!=null?this.templateParameter.tableRowValue.areaCode.split(','):'';
					this.form = {
						parentName: this.templateParameter.tableRowValue.parentName || '',
						deptName: this.templateParameter.tableRowValue.deptName || '',
						status: this.templateParameter.tableRowValue.status || '0',
						orderNum: this.templateParameter.tableRowValue.orderNum,
						areaCode:defaultAreaCode,
					};
					this.$nextTick(() => {
						this.$refs['form'].clearValidate();
						this.idEdit = false;
					});
				}
				//新增
				else if (this.templateParameter.modelType === 'add') {
					this.title = '新增部门';
					this.depDisabled = false;
					this.form.status = "0";
					//加载部门树
					loadDepartmentTreeData().then(response => {
						this.departmentOptions = response;
						if (this.data.sysRoles) {
							for (let i = 0; i < this.data.sysRoles.length; i++) {
								if (this.data.sysRoles[i].roleKey === 'operate_manage') {
									this.form.parentId[0] = response[0].deptId;
									this.getParentId = this.form.parentId.join(',');
									this.getFullName = [];
									this.depDisabled = true;
									break
								}
							}
            }
					}).catch(error => {
						reject(error);
					});
					this.idEdit = false;
				}
				//添加下级部门
				else if (this.templateParameter.modelType === 'addSub') {
					this.title = '添加下级部门';
					this.depDisabled = true;
					this.form.status = "0";
					//加载部门树
					loadDepartmentTreeData().then(response => {
						this.departmentOptions = response;

						//在部门树中渲染当前部门的上级部门
						let _parentId = this.templateParameter.tableRowValue.ancestors.split(',');
            _parentId.shift();
            console.log(_parentId, 9999);
            let _seflId = this.templateParameter.tableRowValue.deptId;
						_parentId.push(_seflId);
            console.log(_parentId, 8888);
						let _parentId_new = _parentId.map(Number);
            console.log(_parentId_new, 777);
						if (_parentId.length === 0) {
							this.depDisabled = true;
						}
						this.form.parentId = _parentId_new;
            console.log(this.form.parentId);
          }).catch(error => {
					});
					this.idEdit = false;
				}

				this.$nextTick(() => {
					this.$refs['form'].clearValidate();
				});
			},
			// 把id变成name
			changeId(arrOne, arrTwo, newArr) {
				for (let i = 0; i < arrOne.length; i++) {
					for (let j = 0; j < arrTwo.length; j++) {
						if (!arrTwo[j]) {
							break
						} else {
							if (arrOne[i].deptId === arrTwo[j]) {
								newArr.push(arrOne[i].deptName)
								arrTwo.shift(arrTwo[j])
								if (arrOne[i].hasChildren) {
									this.changeId(arrOne[i].children, arrTwo, newArr)
								}
							}
						}
					}
				}
			},
			//监听级联下拉框
			handleChange(value) {
				this.upDtps = value;
				if (value) {
					this.getParentId = value.join(',');
				}
				const newArr = [];
				const ids = _.cloneDeep(this.$refs['parentId'].checkedValue);
				// this.changeId(this.departmentOptions, ids, newArr)
				this.getFullName = newArr;
			},
			// 获取区域的值
			getAreaCode(val) {
				this.areaCode = val;
			},
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
	}
</style>
<style lang="scss">
  .el-dialog__footer {
    position: absolute;
    width: 100%;
    background: #ffffff;
    bottom: 0;
    z-index: 99;
  }
</style>
