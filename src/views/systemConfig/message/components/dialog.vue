<!-- 信息列表 -->
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
		<el-form ref="form" :model="form" :rules="rulesForm" label-width="80px">
			<el-row :gutter="0">
				<el-col :md="this.adaptiveGrid_plus.md" :lg="this.adaptiveGrid_plus.lg">
					<el-form-item label="消息标题" prop="title" >
						<el-input ref="title" v-model="form.title" :disabled="disabled" clearable placeholder="请输入消息标题" @keyup.enter.native="submitDialog"></el-input>
					</el-form-item>
				</el-col>
				<el-col :md="this.adaptiveGrid_plus.md" :lg="this.adaptiveGrid_plus.lg">
					<el-form-item label="消息类型" prop="msgType">
						<el-select v-model="form.msgType" style="width: 240px;" placeholder="请选择消息类型" clearable>
							<el-option v-for="item in msgTypeOptions" :key="item.dictValue"
							           :label="item.dictLabel"
							           :value="item.dictValue"></el-option>
						</el-select>
					</el-form-item>
				</el-col>
				<el-col :md="this.adaptiveGrid_plus.md" :lg="this.adaptiveGrid_plus.lg">
					<el-form-item label="发布对象" prop="sendObjType">
						<el-select v-model="form.sendObjType" style="width: 240px;" placeholder="请选择发布对象" clearable>
							<el-option v-for="item in send_obj_typeOptions" :key="item.dictValue"
							           :label="item.dictLabel"
							           :value="item.dictValue"></el-option>
						</el-select>
					</el-form-item>
				</el-col>
				<el-col :span="24">
					<el-form-item label="消息内容" prop="content">
						<el-input type="textarea" v-model="form.content" :disabled="disabled" clearable
						          placeholder="请输入内容" maxlength="300" class="msgTextarea"
						          show-word-limit resize="none" :autosize="autosize" @keyup.enter.native="submitDialog"></el-input>
					</el-form-item>
				</el-col>
			</el-row>

		</el-form>
		<div slot="footer" class="dialog-footer">
			<el-button @click="closeDialog()">取 消</el-button>
			<el-button
					type="primary"
					@click="submitDialog()"
					class="dailog-btn"
			>确 定
			</el-button>
		</div>
	</el-dialog>
</template>

<script>
	import { addDialog, editDialog} from "@/api/systemConfig/message";
	import {adaptiveGrid_plus} from "@/common/index";
	import {
		allSelectdictionaryData
	} from "@/api/serviceActivityConfig/serviceProject";

	export default {
		name: "myDialog",
		props: ["dialogTableVisible", "tableRowValue", "modelType", "ajaxData","realTimeUpdateMessageData"], //接受父模板传递的自定义属性
		data() {
			return {
				msgTypeOptions: [],//消息类型下拉框数据
				send_obj_typeOptions:[],//发布对象下拉框数据

				title: "", //弹框title
				//submitDisabled: false, //未通过校验，则不能提交确认按钮
				disabled: "", //表单是否可编辑
				form: {
					title:'',//消息标题
					msgType:'',//消息类型
					sendObjType:'',//消息对象
					content: "",
					id:""
				},
				autosize:{
					minRows: 4,
				},
				configTypeData: [],
				//form 表单的验证规则
				rulesForm: {
					//消息标题
					title:[
						{required: true, message: '消息标题不能为空，请输入！', trigger: 'blur'},
						{trigger: 'blur', max: 100, message: '消息标题长度不得超过100个字符，请重新输入！'}
					],
					//消息类型
					msgType:[
						{required: true, message: '消息类型不能为空，请选择！', trigger: 'change'}
					],
					//发布对象
					sendObjType:[
						{required: true, message: '发布对象不能为空，请选择！', trigger: 'change'}
					],
					//消息内容
					content:[
						{required: true, message: '消息内容不能为空，请输入！', trigger: 'blur'}
					]
				},
				//自适应
				adaptiveGrid_plus: {
					md: adaptiveGrid_plus.md,
					lg: adaptiveGrid_plus.lg
				}
			};
		},
		mounted() {

		},
		methods: {
			//编辑-提交数据
			editTableRowSubmit(params) {
				if (this.tableRowValue !== params) {
					editDialog(params).then(response => {
						//this.submitDisabled = false
						if (response.code === 0) {
							this.$message({
								type: "success",
								message: response.msg
							})
							this.closeDialog()
							this.ajaxData()
							this.realTimeUpdateMessageData()
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
					//this.submitDisabled = false
					if (response.code === 0) {
						this.$message({
							type: "success",
							message: response.msg
						});
						this.ajaxData()
						this.closeDialog()
						this.realTimeUpdateMessageData()
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
				//数据字典接口
				let dicKey = 'msg_type,send_obj_type';
				allSelectdictionaryData(dicKey).then(response => {
					if (response.code === 0) {
						for (let k in response.data) {
							switch (k) {
								//消息类型
								case 'msg_type':
									this.msgTypeOptions = response.data[k];
									break;
								//发布对象
								case 'send_obj_type':
									this.send_obj_typeOptions = response.data[k];
									break;
							}
						}
					}
					else {
						this.$message.error('数据字典接口请求失败！');
					}
				}).catch(() => {
					this.$message.error('数据字典接口请求失败！');
				});

				/*getConfigType().then(response => {
					this.configTypeData = response.rows;
				})
				.catch(error => {
					reject(error);
				});*/
			},
			//取消关闭弹框
			closeDialog() {
				this.form = {
					title:'',
					msgType:'',//消息类型
					sendObjType:'',//消息对象
					content: "",
					id:""
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
						//this.submitDisabled = true
						if (this.modelType === "edit") {
							//params.configId = this.tableRowValue.configId
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
					this.title = "编辑消息";
					this.form = {
						title:this.tableRowValue.title,
						msgType:this.tableRowValue.msgType,//消息类型
						sendObjType:this.tableRowValue.sendObjType,//消息对象
						content: this.tableRowValue.content,
						id:this.tableRowValue.id
					};
					//this.getData();
					this.disabled = false;
				} else {
					this.title = "新增消息";
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

<style>
	.msgTextarea > .el-input__count{
		bottom: 1px !important;
		height: 20px;
		line-height: 20px;
	}
</style>
