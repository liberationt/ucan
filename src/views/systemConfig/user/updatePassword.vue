<template>
	<div class="chang-pass">
		<el-form :model="formPass" status-icon :rules="rules" ref="formPass" class="demo-ruleForm">
			<el-form-item label="登陆账号" :label-width="formLabelWidth">
				<el-input v-model="formPass.loginName" :disabled="true" size="medium"></el-input>
			</el-form-item>
			<el-form-item label="当前密码" :label-width="formLabelWidth" prop="password">
				<el-input type="password" placeholder="请输入当前密码" v-model="formPass.password" autocomplete="off" size="medium" @keyup.enter.native="submitForm('formPass')"></el-input>
			</el-form-item>
			<el-form-item label="新密码" :label-width="formLabelWidth" prop="newPassword">
				<el-input type="password" placeholder="请输入新密码" v-model="formPass.newPassword" autocomplete="off" size="medium" @keyup.enter.native="submitForm('formPass')"></el-input>
			</el-form-item>
			<el-form-item label="确认密码" :label-width="formLabelWidth" prop="confirmPass">
				<el-input type="password" placeholder="请再次输入新密码" v-model="formPass.confirmPass" autocomplete="off" size="medium" @keyup.enter.native="submitForm('formPass')"></el-input>
			</el-form-item>
		</el-form>
		<div slot="footer" class="dialog-footer">
			<el-button @click="resetForm('formPass')">取 消</el-button>
			<el-button type="primary" @click="submitForm('formPass')">确 定</el-button>
		</div>
	</div>
</template>

<script>
	import {updatePass} from "@/api/systemConfig/user";
	import {getName} from '@/utils/auth'
	import {isPassword} from '@/utils/validate'

	export default {
		//重置密码弹窗
		watch: {

		},
		data() {
			//是否包含一位数字
			let regNumber = /(?=.*[\d])/;
			//是否包含一位字母
			let regLetter = /(?=.*[a-zA-Z])/;
			//是否包含一位特殊字符
			let regCharacter = /(?=.*[`~!@#$%^&*()_\-+=<>?:"{}|,.\/;'\\[\]·~！@#￥%……&*（）——\-+={}|《》？：“”【】、；‘’，。、])/;
			//校验新密码
			let validatePass = (rule, value, callback) => {
				if (value === '') {
					callback(new Error('新密码不能为空！请重新输入'));
				} else {
					if(value.length > 16){
						callback(new Error('密码长度不超过16个字符。'));
					}
					else if(value.length < 8){
						callback(new Error('密码长度不低于8个字符。'));
					}
					else{
						if(!/^[a-zA-Z\d]{1}/.test(value)){
							callback(new Error('密码必须以英文字母或数字开头！'));
						}
						else{
							if (!regNumber.test(value)) {
								callback(new Error('密码必须由数字，英文字母和特殊字符组成!'));
							}
							else if (!regLetter.test(value)) {
								callback(new Error('密码必须由数字，英文字母和特殊字符组成!'));
							}
							else if (!regCharacter.test(value)) {
								callback(new Error('密码必须由数字，英文字母和特殊字符组成!'));
							}
							else {
								callback();
							}
						}
					}
				}
			};
			//校验第二次输入新密码
			let validatePass2 = (rule, value, callback) => {
				if (value === '') {
					callback(new Error('确认密码不能为空！请重新输入'));
				}
				else{
					if(value.length > 16){
						callback(new Error('密码长度不超过16个字符。'));
					}
					else if(value.length < 8){
						callback(new Error('密码长度不低于8个字符。'));
					}
					else{
						if(!/^[a-zA-Z\d]{1}/.test(value)){
							callback(new Error('密码必须以英文字母或数字开头！'));
						}
						else{
							if (!regNumber.test(value)) {
								callback(new Error('密码必须由数字，英文字母和特殊字符组成!'));
							}
							else if (!regLetter.test(value)) {
								callback(new Error('密码必须由数字，英文字母和特殊字符组成!'));
							}
							else if (!regCharacter.test(value)) {
								callback(new Error('密码必须由数字，英文字母和特殊字符组成!'));
							}
							else {
								if (value !== this.formPass.newPassword) {
									callback(new Error('两次输入密码不一致!请重新输入'));
								}
								else {
									callback();
								}
							}
						}
					}
				}
			};
			return {
				formPass: {
					loginName: "",
					password: "",
					newPassword: "",
					confirmPass: "",
				},
				formLabelWidth: "150px",
				rules: {
					password:[{required: true, message: '当前密码不能为空，请填写！', trigger: 'blur'},],
					newPassword: [{required: true,validator: validatePass, trigger: "blur"},
						{required: true,validator: validatePass, trigger: "change"}],
					confirmPass: [{required: true,validator: validatePass2, trigger: "blur"},
						{required: true,validator: validatePass2, trigger: "change"}]
				},
			}
		},
		//在模板渲染成html后调用，通常是初始化页面完成后，再对html的dom节点进行一些需要的操作。
		mounted() {
			// this.ajaxData();
			this.formPass.loginName = getName("userName");
		},

		methods: {
			submitForm(formName) {
				this.$refs[formName].validate(valid => {
					if (valid) {
						// var params={};
						// Object.assign(params,this.formPass);
						// delete params.confirmPass
						let params = this.formPass;
						updatePass(params).then(response => {
							if (response.code === 0) {
								this.$message({
									type: "success",
									message: response.msg
								});
								this.closeSelectedTag(this.$route);
							} else {
								this.$message.error(response.msg);
							}
						})
						.catch(error => {
							reject(error);
							this.$message.error("操作失败！");
						});
					} else {
						return false;
					}
				});
			},
			resetForm(formName) {
				this.$refs[formName].resetFields();
				//this.$router.go(-1)
				this.closeSelectedTag(this.$route);
			},
			//判断是否是当前页面路由
			isActive(route) {
				return route.path === this.$route.path
			},
			//路由跳转
			toLastView(visitedViews, view) {
				const latestView = visitedViews.slice(-1)[0];
				if (latestView) {
					this.$router.push(latestView);
				} else {
					// now the default is to redirect to the home page if there is no tags-view,
					// you can adjust it according to your needs.
					if (view.name === 'Dashboard') {
						// to reload home page
						this.$router.replace({ path: '/redirect' + view.fullPath })
					} else {
						this.$router.push('/')
					}
				}
			},
			//关闭当前页面路由
			closeSelectedTag(view) {
				this.$store.dispatch('tagsView/delView', view).then(({ visitedViews }) => {
					if (this.isActive(view)) {
						this.toLastView(visitedViews, view)
					}
				})
			},
		}
	};
</script>
<style>
	.chang-pass .el-form-item--mini.el-form-item {
		margin-bottom: 30px;
	}

	.chang-pass .el-input.is-disabled .el-input__inner {
		/*background-color: #fff;
		border-color: #fff;*/
		color: #666;
	}

	.chang-pass .el-form-item__label {
		padding-right: 30px;
	}
</style>
<style scoped>
	@import "~@/styles/form.css";

	.chang-pass {
		width: 40%;
		margin: 100px 20%;
	}

	.dialog-footer {
		float: right;
		margin-top: 30px;
	}
</style>
