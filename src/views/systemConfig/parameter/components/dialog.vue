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
				<el-col :md="this.adaptiveGrid_plus.md" :lg="this.adaptiveGrid_plus.lg">
					<el-form-item label="参数名称" prop="configName" >
						<el-input ref="configName" v-model="form.configName" :disabled="disabled" clearable placeholder="请输入参数名称" @keyup.enter.native="submitDialog"></el-input>
					</el-form-item>
				</el-col>
				<el-col :md="this.adaptiveGrid_plus.md" :lg="this.adaptiveGrid_plus.lg">
					<el-form-item label="参数键名" prop="configKey">
						<el-input ref="configKey" v-model="form.configKey" :disabled="disabled" clearable  placeholder="请输入参数键名" @keyup.enter.native="submitDialog"></el-input>
					</el-form-item>
				</el-col>
				<el-col :md="this.adaptiveGrid_plus.md" :lg="this.adaptiveGrid_plus.lg">
					<el-form-item label="参数键值" prop="configValue">
						<el-input ref="configValue" v-model="form.configValue" :disabled="disabled" clearable  placeholder="请输入参数键值" @keyup.enter.native="submitDialog"></el-input>
					</el-form-item>
				</el-col>
				<el-col :md="this.adaptiveGrid_plus.md" :lg="this.adaptiveGrid_plus.lg">
					<el-form-item label="系统内置">
						<el-radio-group v-model="form.configType" @keyup.enter.native="submitDialog">
							<el-radio
									v-for="item in configTypeData"
									:key="item.value"
									:label="item.dictValue"
									:value="item.dictValue"
							>{{item.dictLabel}}
							</el-radio>
						</el-radio-group>
					</el-form-item>
				</el-col>
				<el-col :md="this.adaptiveGrid_plus.md" :lg="this.adaptiveGrid_plus.lg">
					<el-form-item label="备注">
						<el-input type="textarea" v-model="form.remark" :disabled="disabled" clearable  placeholder="请输入内容" @keyup.enter.native="submitDialog"></el-input>
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
	import {getConfigType, addDialog, 	editDialog} from "@/api/systemConfig/param";
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
					configName: [
						{required: true, message: '参数名称不能为空，请填写！', trigger: 'blur'}
					],
					//参数键名
					configKey: [
						{required: true, message: '参数键名不能为空，请填写！', trigger: 'blur'}
					],
					//参数键值
					configValue: [
						{required: true, message: '参数键名不能为空，请填写！', trigger: 'blur'}
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
      //编辑-提交数据
      editTableRowSubmit(params) {
        if (this.tableRowValue !== params) {
          editDialog(params)
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
          this.$message.error("操作失败！");
        }
      },
      //添加行-提交数据
      addTableRowSubmit(params) {
        addDialog(params)
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
      },
			getData() {
				getConfigType()
				.then(response => {
					this.configTypeData = response.rows;
				})
				.catch(error => {
					reject(error);
				});
			},
			//取消关闭弹框
			closeDialog() {
				this.form = {
					configName: "",
					configKey: "",
					configValue: "",
					configType: "Y",
					remark: ""
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
							params.configId = this.tableRowValue.configId
							this.editTableRowSubmit(params)
						} else {
							this.addTableRowSubmit(params)
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
				this.getData();

				if (this.modelType === "edit") {
					this.title = "编辑参数";
					this.form = {
						configName: this.tableRowValue.configName,
						configKey: this.tableRowValue.configKey,
						configValue: this.tableRowValue.configValue,
						configType: this.tableRowValue.configType,
						remark: this.tableRowValue.remark
					};
					this.getData();
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
