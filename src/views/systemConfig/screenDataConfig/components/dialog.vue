<!-- dialog.vue -->

<template>
	<el-dialog
			:title="title"
			:visible="dialogTableVisible"
			@close="closeDialog"
			@opened="opened"
			@open="open"
      width="400px"
      :close-on-click-modal="false" v-dialogDrag
	>
		<el-form ref="form" :model="form" :rules="rulesForm" label-width="80px" >
			<el-row :gutter="0">
				<el-col :md="this.adaptiveGrid_plus.md" :lg="this.adaptiveGrid_plus.md">
					<el-form-item label="位置信息" prop="position" >
						<el-input ref="position" v-model="form.position" :disabled="disabled" clearable placeholder="请输入位置信息" @keyup.enter.native="submitDialog"></el-input>
					</el-form-item>
				</el-col>
				<el-col :md="this.adaptiveGrid_plus.md" :lg="this.adaptiveGrid_plus.md">
					<el-form-item label="接口信息" prop="key" >
						<el-input ref="key" v-model="form.key" :disabled="disabled" clearable placeholder="请输入接口信息" @keyup.enter.native="submitDialog"></el-input>
					</el-form-item>
				</el-col>
				<el-col :md="this.adaptiveGrid_plus.md" :lg="this.adaptiveGrid_plus.md">
          <el-form-item label="数据信息" prop="value">
            <el-input height="200px" :rows="8" type="textarea" v-model="form.value" :disabled="disabled" clearable  placeholder="请输入内容" @keyup.enter.native="submitDialog"></el-input>
          </el-form-item>
				</el-col>
			</el-row>

		</el-form>
		<div slot="footer" class="dialog-footer">
			<el-button @click="closeDialog()">取 消</el-button>
			<el-button
					type="primary"
					@click="submitDialog()"
					:disabled="submitDisabled"
          class="dailog-btn"
			>确 定
			</el-button>
		</div>
	</el-dialog>
</template>

<script>
  import {
    updateTableRowData,
    addTableRowData
  } from "@/api/systemConfig/screenDataConfig";
	import {adaptiveGrid_plus} from "@/common/index";

	export default {
		name: "myDialog",
		props: ["dialogTableVisible", "tableRowValue", "modelType", "ajaxData"], //接受父模板传递的自定义属性
		data() {
			return {
				title: "", //弹框title
				submitDisabled: false, //未通过校验，则不能提交确认按钮
				disabled: "", //表单是否可编辑
				form: {
					configName: "",
					configKey: "",
					configValue: "",
					configType: "Y",
					remark: ""
				},
				configTypeData: [],
				//form 表单的验证规则
				rulesForm: {
					//参数名称
					position: [
						{required: true, message: '位置信息不能为空，请填写！', trigger: 'blur'}
					],
					//参数键名
					key: [
						{required: true, message: '接口信息不能为空，请填写！', trigger: 'blur'}
					],
					//参数键值
					value: [
						{required: true, message: '数据信息不能为空，请填写！', trigger: 'blur'}
					],
				},
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
          id: null,
          isDel: "",
          isValid: "",
          key: "",
          position: "",
          value: ""
				};
				this.$nextTick(() => {
					this.$refs["form"].clearValidate();
				});
				this.$emit("dialogHide", "false");
			},
			// 确认，提交表单
			submitDialog() {
				this.$refs["form"].validate((valid) => {
					if (valid) {
						let params = {}
						Object.assign(params, this.form)
            this.submitDisabled = true
						if (this.modelType === "edit") {
              updateTableRowData(params)
                .then(response => {
                  this.submitDisabled = false
                  if (response.code === 0) {
                    this.$message({
                      type: "success",
                      message: response.msg
                    })
                    this.closeDialog()
                    this.ajaxData()
                  } else {
                    this.$message.error(response.msg);
                  }
                })
                .catch(error => {
                  reject(error);
                  this.$message.error("操作失败！");
                });
						} else {
              addTableRowData(params)
                .then(response => {
                  this.submitDisabled = false
                  if (response.code === 0) {
                    this.$message({
                      type: "success",
                      message: response.msg
                    });
                    this.ajaxData()
                    this.closeDialog()
                    return false
                  } else {
                    this.$message.error(response.msg);
                    return false
                  }
                })
                .catch(error => {
                  reject(error);
                  this.$message.error("操作失败！");
                  return false;
                });
						}
					}
					else {
						return false;
					}
				});
			},
			opened() {
			},
			//打开的回调
			open() {
				if (this.modelType === "edit") {
					this.title = "编辑参数";
					this.form = {
            id: this.tableRowValue.id,
            isDel: this.tableRowValue.isDel,
            isValid: this.tableRowValue.isValid,
            key: this.tableRowValue.key,
            position: this.tableRowValue.position,
            value: this.tableRowValue.value
					};
					this.disabled = false;
				} else {
					this.title = "新增参数";
					/*this.form = {
						configName: "",
						configKey: "",
						configValue: "",
						configType: "Y",
						remark: ""
					};*/
					this.disabled = false;
				}
			}
		}
	};
</script>

<style scoped>

	.el-dialog__wrapper {
		background-color: rgba(0, 0, 0, 0.3);
		z-index: 999;
	}

	.el-cascader {
		display: block;
	}

	.el-row {
		margin: 0 !important;
	}

	.el-select,
	.el-date-editor {
		width: 100% !important;
	}

	.info {
		color: #1890ff;
		border-bottom: 1px solid #aaa;
		padding: 20px;
		margin-bottom: 20px;
		box-sizing: border-box;
		font-size: 18px;
	}
</style>
