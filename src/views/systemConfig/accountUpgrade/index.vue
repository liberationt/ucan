<template>
	<el-container>
		<el-header class="formDiv">
			<el-form :inline="true" :model="form" class="demo-form-inline">
				<!--<el-form-item  label="账号状态">
					<el-select v-model="form.status" style="width: 240px;" placeholder="请选择账号状态" clearable>
						<el-option v-for="item in sys_common_statusOptions" :key="item.dictValue" :label="item.dictLabel" :value="item.dictValue"></el-option>
					</el-select>
				</el-form-item>-->
				<el-form-item label="账号状态">
					<el-select v-model="form.status" clearable placeholder="请选择账号状态" @keyup.enter.native="onSubmit">
						<el-option label="启用" name="0" value="0"></el-option>
						<el-option label="禁用" name="1" value="1"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="账号查询">
					<el-input v-model.trim="form.phonenumber" style="width: 240px;" clearable placeholder="请输入登录名称或手机号查询" @keyup.enter.native="onSubmit"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="onSubmit" class="base-btn" v-has="{class: '查询'}">查询</el-button>
					<el-button type="warning" @click="onReset" class="base-btn" v-has="{class: '查询'}">重置</el-button>
				</el-form-item>
			</el-form>
		</el-header>
		<el-main class="tableContainer">
			<el-container>
				<el-header style="height: 60px !important;">
					<div v-if="this.total !== 0" class="totalWrap">已筛选到{{this.total}}条匹配信息</div>
					<div v-else class="totalWrap">无法找到匹配信息</div>
				</el-header>
				<el-main>
					<el-table
							:data="tableData"
							tooltip-effect="dark"
							style="width: 100%;"
							header-align="center"
							border
							row-key="id"
					>
						<el-table-column type="selection" width="50" fixed="left" header-align="center" align="center"></el-table-column>
						<el-table-column label="序号" prop="infoId" width="80" >
							<template slot-scope="{row,$index}">
								<span>{{$index + 1}}</span>
							</template>
						</el-table-column>
						<el-table-column label="登录账号" prop="loginName" width="200"></el-table-column>
						<el-table-column label="账号类型" prop="accountDataType" width="200"></el-table-column>
						<el-table-column label="账号属性" prop="accountType" width="200"></el-table-column>
						<el-table-column label="显示名称" prop="userName" width="200"></el-table-column>
						<el-table-column label="所属部门" prop="fullName" width="200"></el-table-column>
						<el-table-column label="手机号码" prop="phonenumber" width="200"></el-table-column>
						<el-table-column label="账号状态" prop="status" width="200">
							<template slot-scope="scope">
								{{scope.row.status === '0'?'启用':'禁用'}}
							</template>
						</el-table-column>
						<el-table-column fixed="right" label="操作" min-width="250" header-align="center" align="center">
							<template slot-scope="{row,$index}">
				                <span @click="handleAccountUpgrade($index, row)" class="table-btn">
				                    升级账号
				                </span>
							</template>
						</el-table-column>
					</el-table>

					<pagination
							v-show="total>0"
							:total="total"
							:page.sync="form.pageNum"
							:limit.sync="form.pageSize"
							@pagination="ajaxData"
					/>
				</el-main>
			</el-container>
		</el-main>
	</el-container>
</template>

<script>
	import Pagination from "@/components/Pagination";
	import {
		getTableData,
		accountUpgradeAPI
	} from "@/api/systemConfig/accountUpgrade";

	export default {
		components: {Pagination},
		data() {
			return {
				//表单值table显示
				form: {
					status:"",//账号状态
					phonenumber:"",//账号查询
					pageNum: 1, //当前页码
					pageSize: 10 //每页显示的数据数量
				},
				total:0,//数据总数
				tableData: [],
				tableRowValue: "", //表格当前行数据
				isShow: false, //弹框显示隐藏
				isShowPass: false, //弹框显示隐藏
				loading: false, //弹框提交按钮加载动画
				loadingSubmit: false,//查询按钮加载动画
				loadingReset: false,//重置按钮加载动画
			};
		},
		//在模板渲染成html后调用，通常是初始化页面完成后，再对html的dom节点进行一些需要的操作。
		mounted() {
			this.onReset();
		},
		methods: {
			ajaxData() {
				getTableData(this.form).then(response => {
					if (response.code === 0) {
						this.total = response.total;
            response.rows.map(items => {
              items.fullName = items.dept.deptName;
            });
            this.tableData = response.rows;
						this.loadingReset = false;
						this.loadingSubmit = false;
					}
				})
				.catch(error => {
					reject(error);
					this.loadingReset = false;
					this.loadingSubmit = false;
				});
			},
			//表单查询按钮
			onSubmit() {
				this.loadingSubmit = true;
				this.form.pageNum = 1;
				this.ajaxData();
			},
			//表单重置按钮
			onReset() {
				this.loadingReset = true;
				//表单值
				this.form = {
					status:"",//账号状态
					phonenumber:"",//账号查询
					pageNum: 1, //当前页码
					pageSize: 10 //每页显示的数据数量
				};
				this.ajaxData();
			},
			//账号升级
			handleAccountUpgrade($index, row) {
				this.$confirm('企业账号升级后无法退回，确定要升级【'+row.loginName+'】账号吗？账号升级需要1-2个工作日完成。','升级账号',{
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					let parmas = {'userId':row.userId};
					accountUpgradeAPI(parmas).then(response => {
						if(response.code === 0 || response.code === '0'){
							this.$message({
								type: 'success',
								message: response.msg
							});
							this.form.pageNum = 1;
							this.form.pageSize = 10;
							this.ajaxData();
						}
						else {
							this.$message.error(response.msg);
						}
					}).catch(() => {
						this.$message.error('操作失败！');
					});
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消删除！'
					});
				});
			},
		}
	};
</script>

<style scoped>
	@import "~@/styles/form.css";
</style>

