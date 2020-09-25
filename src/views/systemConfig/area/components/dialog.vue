<!-- dialog.vue -->

<template>
	<el-dialog class="hupingClass" :title="title" :visible="templateParameter.isShow" @close='closeDialog' @open="open"
	           :closeOnClickModal="false" :closeOnPressEscape="false" width="400px" top="200px"
	           v-dialogDrag :close-on-click-modal="false" >

		<el-form ref="form" :model="form" :rules="rulesForm" label-width="80px" @keyup.enter.native="submitDialog">
			<el-row :gutter="0">
				<el-col :md="adaptiveGrid_plus.md" :lg="adaptiveGrid_plus.lg"
          v-show="templateParameter.modelType !== 'edit'">
					<el-form-item label="上级区域" prop="parentCode">
						<Address :form-code="form.parentCode" @getAreaCode="getAreaCode" :disabled="parentCodeDisabled"
						         :id-edit="idEdit" style="width:100%;"></Address>
					</el-form-item>
				</el-col>
				<el-col :md="adaptiveGrid_plus.md" :lg="adaptiveGrid_plus.lg">
					<el-form-item label="区域名称" prop="areaName">
						<el-input ref="areaName" v-model.trim="form.areaName" clearable
						          placeholder="请输入区域名称"></el-input>
					</el-form-item>
				</el-col>
				<el-col :md="adaptiveGrid_plus.md" :lg="adaptiveGrid_plus.lg"
          v-show="templateParameter.modelType === 'edit'">
					<el-form-item label="区域编码" prop="areaCode">
						<el-input type="age" ref="areaCode" v-model.trim="form.areaCode" clearable :disabled="areaCodeDisabled"
						          placeholder="请输入区域编码"></el-input>
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
		getAreaChildren
	} from "@/api/systemConfig/area";
	import {adaptiveGrid_plus} from "@/common/index";
	import _ from "lodash";

	export default {
		name: "myDialog",
		components: {
      Address
    },
		props: ['templateParameter'],//接受父模板传递的自定义属性
		data() {
			return {
        title: '',//弹框title
        // 倾向于 form 的字段是直接适配组件的。当提交时，将表单数据转换成接口数据的格式，
        // 当获取接口数据时，将接口数据转换成表单数据的格式。
				form: {
          areaCode: '',
          areaName: '',
          parentCode: []
				},
				//form 表单的验证规则
				rulesForm: {
          parentCode: [
            {type: 'array', min: 0, max: 5, message: '上级区域不能为小区'}
          ],
          areaName: [
            {required: true, message: '区域名称不能为空，请输入'}
          ]
				},
				//自适应
				adaptiveGrid_plus: {
					md: adaptiveGrid_plus.md,
					lg: adaptiveGrid_plus.lg
        },
        parentCodeDisabled: false,
        areaCodeDisabled: false,
        idEdit: false // 初始值设为false，保证第一次渲染出第一层区域
			}
    },
		methods: {
			//取消关闭弹框
			closeDialog() {
        this.parentCodeDisabled = false;
        this.areaCodeDisabled = false;
        this.$refs.form.resetFields();
        this.$emit('dialogHide', 'false');
			},
			// 确认，提交表单
			submitDialog() {
        this.$refs.form.validate(valid => {
          if (valid) {
            if (this.templateParameter.modelType === 'edit') {
              this.$emit('editTableRowSubmit', {...this.form});
            } else if (this.templateParameter.modelType === 'add') {
              this.$emit('addTableRowSubmit', {...this.form});
            } else if (this.templateParameter.modelType === 'addSub') {
              this.$emit('addTableRowSubmit', {...this.form});
            }
						this.closeDialog();
          }
        })
			},
			//打开的回调
			open() {
        this.$nextTick().then(() => {
          // HACK 保证Address组件先mounted，再给areaCode属性赋值。因为Address组件
          // 挂载时不会执行this.code = this.areaCode，当areaCode不为[]时，第一次
          // 渲染的结果不正确

          if (this.templateParameter.modelType === 'edit') {
            this.title = '编辑区域';
            let row = this.templateParameter.tableRowValue;
            this.form.areaCode = row.areaCode;
            this.form.areaName = row.areaName;
            this.form.parentCode = row.codeLevel.slice(0, -1);
            this.parentCodeDisabled = true; // 编辑区域时，禁用上级区域和区域编码
            this.areaCodeDisabled = true;
          } else if (this.templateParameter.modelType === 'add') {
            this.title = '新增区域';
          } else if (this.templateParameter.modelType === 'addSub') {
            this.title = '新增区域';
            let parentRow = this.templateParameter.tableRowValue;
            this.form.parentCode = parentRow.codeLevel;
            this.parentCodeDisabled = true; // 添加下级区域时，禁用上级区域
          }

          this.idEdit = !this.idEdit; // idEdit值变化，触发address组件更新
        });
			},
			// 获取区域的值
			getAreaCode(val) {
				this.form.parentCode = val;
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
