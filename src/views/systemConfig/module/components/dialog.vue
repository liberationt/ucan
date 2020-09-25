<!-- dialog.vue -->

<template>
	<el-dialog :title="title" :visible="templateParameter.isShow" @close='closeDialog' @open="open"
	           :closeOnClickModal="closeOnClickModal" :closeOnPressEscape="closeOnPressEscape" width="400px" :close-on-click-modal="false" v-dialogDrag>

		<el-form ref="form" :model="form" :rules="rulesForm" label-width="80px">
			<el-row :gutter="0">
				<el-col :md="this.adaptiveGrid_plus.md" :lg="this.adaptiveGrid_plus.lg">
					<el-form-item label="上级模块">
						<el-cascader
								ref="parentId"
								change-on-select
								:show-all-levels="false"
								:options="departmentOptions"
								v-model="form.parentId"
								style="width: 100%;"
								:props="defaultProps"
								filterable
								placeholder="请选择上级模块（可点击搜索）"
								@change="handleChange"
								:disabled="depDisabled"
								clearable
                @keyup.enter.native="submitDialog"
						>
						</el-cascader>
					</el-form-item>
				</el-col>
				<el-col :md="this.adaptiveGrid_plus.md" :lg="this.adaptiveGrid_plus.lg">
					<el-form-item label="模块类型" prop="menuType">
						<el-select ref="menuType" v-model="form.menuType" placeholder="模块类型" clearable @keyup.enter.native="submitDialog">
							<el-option v-for="item in menuTypeOptions" :key="item.dictValue" :label="item.dictLabel"
							           :value="item.dictValue"></el-option>
						</el-select>
					</el-form-item>
				</el-col>
				<el-col :md="this.adaptiveGrid_plus.md" :lg="this.adaptiveGrid_plus.lg">
					<el-form-item label="模块名称" prop="menuName">
						<el-input ref="menuName" v-model="form.menuName" clearable placeholder="请输入模块名称" @keyup.enter.native="submitDialog"></el-input>
					</el-form-item>
				</el-col>
				<el-col :md="this.adaptiveGrid_plus.md" :lg="this.adaptiveGrid_plus.lg">
					<el-form-item label="模块标识" prop="perms">
						<el-input ref="perms" v-model="form.perms" clearable placeholder="请输入模块标识" @keyup.enter.native="submitDialog"></el-input>
					</el-form-item>
				</el-col>
				<el-col :md="this.adaptiveGrid_plus.md" :lg="this.adaptiveGrid_plus.lg">
					<el-form-item label="模块路径" prop="url">
						<el-input ref="url" v-model="form.url" clearable placeholder="请输入模块路径" @keyup.enter.native="submitDialog"></el-input>
					</el-form-item>
				</el-col>
				<!--onkeyup="value=value.replace(/[^\d+$]/g,'')"-->
				<el-col :md="this.adaptiveGrid_plus.md" :lg="this.adaptiveGrid_plus.lg">
					<el-form-item label="模块排序" prop="orderNum">
						<el-input type="age" ref="orderNum" v-model.number="form.orderNum" clearable
						          placeholder="请输入阿拉伯数字，'1'默认在前面" @keyup.enter.native="submitDialog"></el-input>
					</el-form-item>
				</el-col>
				<el-col :md="this.adaptiveGrid_plus.md" :lg="this.adaptiveGrid_plus.lg">
					<el-form-item label="模块状态">
						<el-switch class="switchStyle"
						           ref="visible"
						           v-model="form.visible"
						           active-text="启用"
						           inactive-text="禁用"
						           active-value="0"
						           inactive-value="1">
						</el-switch>
					</el-form-item>
        </el-col>
        <el-col :md="this.adaptiveGrid_plus.md" :lg="this.adaptiveGrid_plus.lg" class="icons-select" >
          <el-form-item label="模块图标" :lg="this.adaptiveGrid_plus.lg">
            <el-select v-model="form.icon" placeholder="请选择" style="color: #ffffff" clearable @keyup.enter.native="submitDialog">
              <el-option
                v-for="(item, index) in icons"
                :key="index"
                :label="item"
                :value="item" >
                <span class="iconfont" v-html="item"></span>
              </el-option>
            </el-select>
          </el-form-item>
          <div class="icon-selected">
            <span class="iconfont" v-html="form.icon"></span>
          </div>
				</el-col>
			</el-row>
		</el-form>

		<div slot="footer" class="dialog-footer">
			<el-button @click="closeDialog()">取 消</el-button>
			<el-button type="primary" @click="submitDialog()" class="dailog-btn" :disabled="submitDisabled">确
				定
			</el-button>
		</div>
	</el-dialog>
</template>

<script>
	import {
		getTableData,
		getMenuCheckedId,
		loadDepartmentTreeData,
		queryAncestralTreeNodes,
		queryModuleType,
    addTableRowData,
		uniqueMenu
	} from "@/api/systemConfig/module";
	import {adaptiveGrid_plus} from "@/common/index";
  import {icons} from "@/common";

	export default {
		name: "myDialog",
    watch: {
      isDisable() {
        this.submitDisabled = false
      },
      isClose() {
        this.closeDialog()
      }
    },
		props: ['templateParameter', 'ajaxData', 'isDisable', 'isClose'],//接受父模板传递的自定义属性
		data() {
			let checkIsNumber = (rule, value, callback) => {
				let _value = parseInt(value);
				if (!Number.isInteger(_value)) {
					callback(new Error('模块排序必须为数字类型！'));
				}
				else {
					if (_value <= 0) {
						callback(new Error('模块排序不能为负数和0，请重新填写！'));
					}
					else {
						callback();
					}
				}
			};
			//登录账号-校验
			let verifyMenuName = (rule, value, callback) => {
				let _value = value.trim();
				if (_value === '') {
					callback(new Error('模块名称不能为空！'));
				} else {
					let _parmas;
					if (this.templateParameter.modelType === "edit") {
						_parmas = {
							menuType: this.form.menuType,
							menuName: this.form.menuName,
							parentId: this.form.menuType !== 'F' ? '' : this.form.parentId.pop() || '0',
							menuId: this.form.menuId
						};
					} else if (this.templateParameter.modelType === "add") {
						let _parentId = this.getParentId.split(',');
						let _parentId_new = _parentId.pop();
						_parmas = {
							menuType: this.form.menuType,
							menuName: this.form.menuName,
							parentId: this.form.menuType !== 'F' ? '' : _parentId_new || '0',
						};
					} else if (this.templateParameter.modelType === "addSub") {
						_parmas = {
							menuType: this.form.menuType,
							menuName: this.form.menuName,
							parentId: this.form.menuType !== 'F' ? '' : this.templateParameter.tableRowValue.id || '0',
						};
					}

					uniqueMenu(_parmas).then(response => {
						if (response === 1) {
							callback(new Error('模块名称已存在！请重新输入！'));
						} else {
							callback();
						}
					})
					.catch(() => {
						callback(new Error('模块名称校验失败！'));
					});
				}
			};
			return {
				title: '',//弹框title
        submitDisabled: false,//未通过校验，则不能提交确认按钮
				form: {
					parentId: [0],//父级id
					menuId: '',//模块id
					menuName: '',//模块名称
					orderNum: '',//模块排序
					visible: '0',//模块状态
					menuType: '',//模块类型
					perms: '',//模块标识
					url: '',//模块路径
          icon: ''
				},
				depDisabled: '',//上级模块不可编辑
				getParentId: '',//获取级联的父级ID
				closeOnClickModal: false,//是否可通过点击遮罩关闭
				closeOnPressEscape: false,//是否可通过按下 ESC 键关闭
				departmentOptions: [],//级联树数据
				defaultProps: {
					children: 'children',
					label: 'label',
					value: 'id'
				},
				menuTypeOptions: [],//模块类型下拉框的值
				//form 表单的验证规则
				rulesForm: {
					//模块名称
					menuName: [
						{required: true, validator: verifyMenuName, trigger: 'blur'},
					],
					//模块类型
					menuType: [
						{required: true, message: '模块类型不能为空，请选择！', trigger: 'change'},
					],
					//模块标识
					perms: [
						{required: true, message: '模块标识不能为空，请填写！', trigger: 'blur'},
					],
					//模块路径
					url: [
						{required: true, message: '模块路径不能为空，请填写！', trigger: 'blur'},
					],
					//模块排序
					orderNum: [
						{required: true, trigger: 'blur', validator: checkIsNumber},
					],
				},
				//自适应
				adaptiveGrid_plus: {
					md: adaptiveGrid_plus.md,
					lg: adaptiveGrid_plus.lg
				},
        // 图标
        icons: icons
			}
		},
		mounted() {
		},
		methods: {
      //添加行-提交数据
      addTableRowSubmit(params) {
        addTableRowData(params).then(response => {
          this.submitDisabled = false
          if (response.code === 0) {
            this.$message({
              type: 'success',
              message: response.msg
            });
            this.ajaxData()
            this.closeDialog()
            return false
          }
          else {
            this.$message.error(response.msg);
            return false;
          }
        }).catch(error => {
          reject(error);
          this.$message.error('操作失败！');
          return false;
        })
      },
			//关闭弹框
			closeDialog() {
				this.form = {
					parentId: [],//父级id
					menuId: '',//模块id
					menuName: '',//模块名称
					orderNum: '',//模块排序
					visible: '0',//模块状态
					menuType: '',//模块类型
					perms: '',//模块标识
					url: '',//模块路径
				};

				this.$nextTick(() => {
					this.$refs['form'].clearValidate();
				});

				this.$emit('dialogHide', 'false');

			},
			// 确认，提交表单
			submitDialog() {
				const ids = JSON.parse(JSON.stringify(this.form.parentId))
				this.$refs["form"].validate((valid) => {
					if (valid) {
            this.submitDisabled = true
						//编辑
						if (this.templateParameter.modelType === 'edit') {
							let params = {
								parentId: ids[ids.length - 1] || '0',//父级id
								menuId: this.form.menuId,//模块id
								menuName: this.$refs.menuName.value,//模块名称
								orderNum: this.$refs.orderNum.value,//模块排序
								visible: this.$refs.visible.value,//模块状态
								menuType: this.$refs.menuType.value,//模块类型
								perms: this.$refs.perms.value,//模块标识
								url: this.$refs.url.value,//模块路径
                icon: this.form.icon
							};
							this.$emit('editTableRowSubmit', params);
						}
						//新增
						else if (this.templateParameter.modelType === 'add') {
							let _parentId = this.getParentId.split(',');
							let _parentId_new = _parentId.pop();
							let params = {
								parentId: _parentId_new || '0',//父级id
								menuId: '',//模块id
								menuName: this.$refs.menuName.value,//模块名称
								orderNum: this.$refs.orderNum.value,//模块排序
								visible: this.$refs.visible.value,//模块状态
								menuType: this.$refs.menuType.value,//模块类型
								perms: this.$refs.perms.value,//模块标识
								url: this.$refs.url.value,//模块路径
                icon: this.form.icon
							};
							this.addTableRowSubmit(params)
						}
						//添加下级模块
						else if (this.templateParameter.modelType === 'addSub') {
							let params = {
								parentId: this.templateParameter.tableRowValue.id || '0',//父级id
								menuId: '',//模块id
								menuName: this.$refs.menuName.value,//模块名称
								orderNum: this.$refs.orderNum.value,//模块排序
								visible: this.$refs.visible.value,//模块状态
								menuType: this.$refs.menuType.value,//模块类型
								perms: this.$refs.perms.value,//模块标识
								url: this.$refs.url.value,//模块路径
                icon: this.form.icon
							}
              this.addTableRowSubmit(params)
						}
					}
					else {
						return false;
					}
				});
			},
			//打开的回调
			open() {
				this.$nextTick(() => {
					this.$refs['form'].clearValidate();
				});

				//模块（菜单）类型接口
				let _parame = {dictType: 'menu_type'};
				queryModuleType(_parame).then(response => {
					this.menuTypeOptions = response.rows;
				}).catch(() => {

				});
				/*
				* parentId 上级模块id
				* parentName 上级模块名称
				* */
				//编辑
				if (this.templateParameter.modelType === 'edit') {
					this.title = '编辑菜单';

					//查找祖籍树节点
					let _id = this.templateParameter.tableRowValue.id;
					queryAncestralTreeNodes(_id).then(response => {
						let str = response + '';
						let _re_parentId = str.split(',').reverse();
						_re_parentId.pop();
						let re_parentId = _re_parentId.map(Number);
						//加载模块树
						let __par = {menuId: _id};
						loadDepartmentTreeData(__par).then(response => {
							this.departmentOptions = response;
							this.form.parentId = re_parentId || [0];
							this.depDisabled = false;
						}).catch(error => {
						});
					}).catch(error => {
						//reject(error);
					});

					this.form = {
						menuId: this.templateParameter.tableRowValue.id,//模块id
						menuName: this.templateParameter.tableRowValue.label,//模块名称
						orderNum: this.templateParameter.tableRowValue.orderNum,//模块排序
						visible: this.templateParameter.tableRowValue.visible,//模块状态
						menuType: this.templateParameter.tableRowValue.menuType,//模块类型
						perms: this.templateParameter.tableRowValue.perms,//模块标识
						url: this.templateParameter.tableRowValue.url,//模块路径
            icon: this.templateParameter.tableRowValue.icon
					};
				}
				//新增
				else if (this.templateParameter.modelType === 'add') {
					this.title = '新增菜单';
					this.depDisabled = false;

					//加载模块树
					loadDepartmentTreeData().then(response => {
						this.departmentOptions = response;
					}).catch(error => {
						reject(error);
					});
				}
				//添加下级模块
				else if (this.templateParameter.modelType === 'addSub') {
					this.title = '添加下级菜单';
					this.depDisabled = true;
					//查找祖籍树节点
					let _id = this.templateParameter.tableRowValue.id;
					queryAncestralTreeNodes(_id).then(response => {
						let re_parentId = response.toString().split(',').reverse().map(Number);
						//加载模块树
						let __par = {menuId: _id};
						loadDepartmentTreeData().then(response => {
							this.departmentOptions = response;
							this.form.parentId = re_parentId || [0];
						}).catch(error => {
						});
					}).catch(error => {
						//reject(error);
					});
				}
			},
			//监听级联下拉框
			handleChange(value) {
				if (value) {
					this.getParentId = value.join(',');
				}
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

  .icons-select{
    position: relative;
  }
  .icons-select .icon-selected {
    position: absolute;
    top:10px;
    left: 95px;
    cursor: pointer
  }
</style>
