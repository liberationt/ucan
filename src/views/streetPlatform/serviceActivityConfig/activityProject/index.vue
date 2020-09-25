<!--活动项目管理-->
<template>
	<el-container>
		<!--查询表单-->
		<el-header class="formDiv">
			<el-form :inline="true" :model="form" class="demo-form-inline">
				<el-form-item label="活动日期">
					<el-date-picker v-model="form.serviceDate" @keyup.enter.native="onSubmit"
					                type="date"
					                placeholder="请选择活动日期" style="width:100%;"
					                format="yyyy年MM月dd日"
					                value-format="yyyy-MM-dd"></el-date-picker>
				</el-form-item>
				<el-form-item label="关键词">
					<el-input v-model.trim="form.serviceName" @keyup.enter.native="onSubmit" clearable placeholder="请输入活动名称/地点查询" style="width: 220px"
					></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="onSubmit" class="base-btn" v-has="{class: '查询'}">查询
					</el-button>
					<el-button type="warning" @click="onReset" class="base-btn" v-has="{class: '查询'}">重置
					</el-button>
				</el-form-item>
			</el-form>
		</el-header>
		<!--table板块-->
		<el-main class="tableContainer">
			<el-container>
				<el-header>
					<div class="total-nav">
						<el-button type="primary" @click="addTableRow()" class="base-btn" v-has="{class: '新增'}">新增
						</el-button>
						<div v-if="this.total !== 0" class="totalWrap">已筛选到{{this.total}}条匹配信息</div>
						<div v-else class="totalWrap">无法找到匹配信息</div>
					</div>
				</el-header>
				<el-main>
					<el-table
							:data="tableData"
							tooltip-effect="dark"
							style="width: 100%;"
							header-align="left"
							border
							row-key="id"
							@selection-change="handleSelectionChange"
							@row-dblclick="toDetail"
					>
						<el-table-column type="selection" width="50" fixed="left"></el-table-column>
						<el-table-column label="序号" width="80" fixed="left">
							<template slot-scope="{row,$index}">
								<span>{{$index + 1}}</span>
							</template>
						</el-table-column>
						<el-table-column label="活动名称" prop="serviceName" min-width="180"></el-table-column>
						<el-table-column label="活动日期" prop="serviceDate" min-width="120"></el-table-column>
						<el-table-column label="活动时间" prop="beginTimeAndEndTime" min-width="180"></el-table-column>
						<el-table-column label="活动地点" prop="orgName" min-width="100"></el-table-column>
						<el-table-column label="活动名额" prop="serviceNum" min-width="200"></el-table-column>
						<el-table-column fixed="right" label="操作" width="150" header-align="center">
							<template slot-scope="{row,$index}">
								<span @click="handleEdit(row)" class="table-btn" v-has="{class: '编辑'}">编辑</span>
								<span @click="handleRemove($index, row)" class="table-btn" v-has="{class: '删除'}">删除</span>
							</template>
						</el-table-column>
					</el-table>
					<pagination
							v-show="total>0"
							:total="total"
							:page.sync="form.pageNum"
							:limit.sync="form.pageSize"
							@pagination="getData(form)"
					/>
				</el-main>

			</el-container>
		</el-main>
	</el-container>
</template>

<script>
	import Pagination from "@/components/Pagination";
	import {pageModel} from "@/common";
	import {getToken} from '@/utils/auth';
	import {
		getServiceData,
		removeTableRowData,
	} from "@/api/serviceActivityConfig/activityProject";

	export default {
		components: {
			Pagination
		},
		data() {
			return {
				// 机构类型
				org_typeOptions: [],
				// 查询表单
				form: {
					serviceDate:'',//活动日期
					serviceName: '', // 关键字查询
					pageNum: pageModel.pageNum, // 分页页数
					pageSize: pageModel.pageSize // 分页数量
				},
				// 老人标签集合
				tags: [],
				// <-- table -->
				tableData: [], // table表格数据
				multipleSelection: [], //多选的行数据
				total: 0, // 总共多少数量
				idEdit: true,
			}
		},
		mounted() {
			this.idEdit = false;
			this.getData(this.form);
		},
		methods: {
			// 老人标签选择事件
			handleChange(val) {
			},
			//表单查询按钮
			onSubmit() {
				this.getData(this.form);
			},
			// 获取表格数据
			getData(form) {
				getServiceData(form).then(res => {
					if (res) {
						this.tableData = res.rows;
						this.total = res.total;
					}
				})
			},
			// 表单重置按钮
			onReset() {
				this.form = {
					serviceDate:'',//活动日期
					serviceName: '', // 关键字查询
					pageNum: pageModel.pageNum, // 分页页数
					pageSize: pageModel.pageSize // 分页数量
				};
				this.idEdit = !this.idEdit;
				this.getData(this.form);
			},
			//添加行
			addTableRow() {
				this.$router.push({
					path: `/activityProject/details/0`,
					query: {'modelType': 'add','_title': `新增活动项目`} //modelType: 查看:look，编辑:edit，新增:add的类型
				});
			},
			// 双击行去详情页面
			toDetail(row) {
				this.$router.push({
					path: `/activityProject/details/${row.id}`,
					query: {'id': row.id,'modelType': 'look','_title': `查看${row.serviceName}`,'editAuthority':this.$route.meta.id} //modelType: 查看:look，编辑:edit，新增:add的类型
				});
			},
			// 多选的行数据
			handleSelectionChange(val) {
				this.multipleSelection = val;
			},
			// 编辑按钮
			handleEdit(row) {
				this.$router.push({
					path: `/activityProject/details/${row.id}`,
					query: {'id': row.id,'modelType': 'edit','_title': `编辑${row.serviceName}`} //modelType: 查看:look，编辑:edit，新增:add的类型
				});
			},
			// 删除按钮
			handleRemove($index, row) {
				this.$confirm('确定要删除【' + row.serviceName + '】活动项目吗？一旦被删除，将无法查看相关信息。', '删除活动项目信息', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning',
				  closeOnClickModal:false
				}).then(() => {
					removeTableRowData(row.id).then(response => {
						if (response.code === 0 || response.code === '0') {
							this.$message({
								type: 'success',
								message: response.msg
							});
							this.form.pageNum = 1;
							this.getData(this.form);
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
	}
</script>

<style scoped>
	@import "~@/styles/form.css";
	.instituWrap {
		padding: 20px 20px 40px 20px;
	}

	.instituDiv {
		float: left;
		width: 140px;
		height: 140px;
		text-align: center;
		cursor: pointer;
		background-color: #DAE9F5;
		transition: all 0.5s;
	}

	.instituDiv .iconfont {
		font-size: 100px;
		display: block;
		color: #147FD9;
	}

	.instituDiv .text {
		font-size: 16px;
		color: #147FD9;
	}

	.instituDiv:first-child {
		margin-right: 40px;
	}

	.instituDiv:hover {
		background-color: #bfdcf3;
	}
</style>


