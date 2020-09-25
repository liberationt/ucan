<template>
	<el-container>
		<el-main class="tableContainer">
			<el-row :gutter="10">
					<el-form ref="form" :model="form" :rules="rulesForm" label-width="150px" class="formWrap">
						<el-form-item label="登录账号：" prop="loginName">
              <el-input v-model="form.loginName" disabled></el-input>
						</el-form-item>
						<el-form-item label="显示名称：" prop="userName">
							<el-input ref="userName" v-model="form.userName" clearable autocomplete="off" placeholder="请输入名称"></el-input>
						</el-form-item>
						<el-form-item label="手机号码：" prop="phonenumber">
							<el-input ref="phonenumber" v-model="form.phonenumber" clearable autocomplete="off" placeholder="请输入手机号码"></el-input>
						</el-form-item>
						<el-form-item label="所属部门：" prop="deptName">
							<el-input v-model="form.deptName" disabled></el-input>
						</el-form-item>
						<el-form-item v-if="!this.accountType" label="账号角色：" prop="accountTypeShow">
							<el-input v-model="form.accountTypeShow" disabled></el-input>
						</el-form-item>
					</el-form>
				</el-col>
			</el-row>
			<div class="btnWrap">
				<el-button type="primary" @click="submitForm('form')">保 存</el-button>
				<el-button @click="resetForm('form')">取 消</el-button>
			</div>
		</el-main>

	</el-container>
</template>

<script>
	import {updatePass} from "@/api/systemConfig/user";
	import {getName} from '@/utils/auth';
	import {isPassword} from '@/utils/validate';
  import {userInfoData,editUserInfoData} from "@/api/userManagement/userInfo";

	export default {
		data() {
			return {
				form: {
					loginName: "",
					userName: "",
					phonenumber: "",
					deptName: "",
					accountTypeShow:"",
				},
				accountTypeShowArr:[],
				accountType:false,//false个人，true企业
				rulesForm:{
					loginName: [{required: false, message: '', trigger: 'blur'}],
					userName: [{required: true, message: '显示名称不能为空，请填写！', trigger: 'blur'}],
					phonenumber: [{required: true, message: '手机号码不能为空，请填写！', trigger: 'blur'}],
					deptName: [{required: false, message: '', trigger: 'blur'}],
					accountTypeShow:[{required: false, message: '', trigger: 'blur'}],
				}
			}
		},
		//在模板渲染成html后调用，通常是初始化页面完成后，再对html的dom节点进行一些需要的操作。
		mounted() {
			userInfoData().then(response => {
				//个人
				if(response.accountType === '1'){
					this.accountType = false;
				}
				//企业
				else {
					this.accountType = true;
				}

				this.form.loginName = response.loginName;
				this.form.userName = response.userName;
				this.form.phonenumber = response.phonenumber;
				this.form.deptName = response.dept.deptName;
				response.roles.forEach(item=>{
					this.accountTypeShowArr.push(item.roleName);
				});
				this.form.accountTypeShow = this.accountTypeShowArr.join('，');
			})
			.catch(() => {

			});
		},

		methods: {
			submitForm(formName) {
				this.$refs[formName].validate(valid => {
					if (valid) {
						let params = {
              userName: this.form.userName,
              phonenumber: this.form.phonenumber
            }
						editUserInfoData(params).then(response => {
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
						.catch((err) => {
							this.$message.error("操作失败！");
						});
					} else {
						return false;
					}
				});
			},
			resetForm(formName) {
				this.$refs[formName].resetFields();
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
						this.$router.replace({path: '/redirect' + view.fullPath})
					} else {
						this.$router.push('/')
					}
				}
			},
			//关闭当前页面路由
			closeSelectedTag(view) {
				this.$store.dispatch('tagsView/delView', view).then(({visitedViews}) => {
					if (this.isActive(view)) {
						this.toLastView(visitedViews, view)
					}
				})
			},
		}
	};
</script>

<style scoped>
	@import "~@/styles/form.css";
	.app-main{
		height: 100% !important;
	}
	.tableContainer{
		position: relative;
		margin-top: 40px;
		padding-top: 120px;
		padding-bottom: 340px;
	}
	.updateImgWrap {
		text-align: center;
	}

	.userImg {
		width: 200px;
		height: 200px;
		display: block;
		margin: 50px auto;

	}

	.formWrap{
		width: 550px;
		margin-left: 10%;
	}

	.logoImg{
		width: 280px;
		height: 65px;
		vertical-align: top;
		margin-right: 10px;
	}
	.btnWrap{
		position: absolute;
		bottom: 0;
		left: 0;
		height: 80px;
		width: 100%;
		padding-right: 50px;
	}
	.btnWrap .el-button{
		float: right;
		margin-right: 20px;
	}
</style>
