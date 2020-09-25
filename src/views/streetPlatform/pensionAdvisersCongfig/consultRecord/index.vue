<!--咨询记录管理-->
<template>
	<el-container>
		<!--查询表单-->
		<el-header class="formDiv">
			<el-form :inline="true" :model="form" class="demo-form-inline">
				<el-form-item label="所属区域">
					<Address :area-code="areaCode" :form-code="form.areaCode" @getAreaCode="getAreaCode"
					         :id-edit="idEdit"
					         :width="'200px'"></Address>
				</el-form-item>
				<el-form-item label="服务到期日">
					<el-date-picker
							v-model="servicePeriod"
							type="datetimerange"
							range-separator="-"
							start-placeholder="开始日期"
							end-placeholder="结束日期"
					></el-date-picker>
				</el-form-item>
				<el-form-item label="关键词">
					<el-input v-model.trim="form.visitorName" clearable placeholder="请输入来访人查询" style="width: 280px"
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
						<el-table-column label="来访时间" prop="visitorTime" min-width="180"></el-table-column>
						<el-table-column label="来访人" prop="visitorName" min-width="120"></el-table-column>
						<el-table-column label="来访人类型" prop="visitorTypeName" min-width="200"></el-table-column>
						<el-table-column label="服务事项" prop="serviceEventName" min-width="200"></el-table-column>
						<el-table-column label="服务结果" prop="serviceResultName" min-width="200"></el-table-column>
						<el-table-column label="养老顾问" prop="advempName" min-width="200"></el-table-column>
						<el-table-column label="所属顾问点" prop="orgName" min-width="200"></el-table-column>
						<el-table-column label="所属区域" show-overflow-tooltip prop="areaCodeName" min-width="300"></el-table-column>
						<el-table-column fixed="right" label="操作" width="150" header-align="center">
							<template slot-scope="{row,$index}">
								<span @click="handleEdit(row)" class="table-btn" v-has="{class: '编辑'}">编辑</span>
								<span @click="handleRemove($index, row)" class="table-btn"
								      v-has="{class: '删除'}">删除</span>
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
	import _ from 'lodash';
	import Address from '@/components/Address'
	import Pagination from '@/components/Pagination'
	//import {pageModel} from '@/common'
	import {getToken} from '@/utils/auth'
	import {
		institutionSearch,
		removeTableRowData
	} from '@/api/pensionAdvisersCongfig/consultRecord'
	import {getDate_YMD,parseTime} from '@/utils/index.js'

	export default {
		components: {
			Pagination,
			Address
		},
		data() {
			return {
				// 机构类型
				org_typeOptions: [],
				// 查询表单
				form: {
					areaCode: [], // 区域表单ID
					startVisitorTime: '',
					endVisitorTime: '',
					visitorName: '', // 关键字查询
					pageNum: 1, // 分页页数
					pageSize: 10 // 分页数量
				},
				// 区域全部ID
				areaCode: [],
				// 老人标签集合
				tags: [],
				// <-- table -->
				tableData: [], // table表格数据
				multipleSelection: [], //多选的行数据
				total: 0, // 总共多少数量
				idEdit: true,
				servicePeriod: [] //服务到期日期
			}
		},
		mounted() {
			this.idEdit = false
			this.getData(this.form)
		},
		methods: {
			// 获取区域的值
			getAreaCode(val) {
				this.areaCode = val
			},
			// 老人标签选择事件
			handleChange(val) {
			},
			//表单查询按钮
			onSubmit() {
				const arr = []
				if (this.areaCode.length !== 0) {
					arr.push(this.areaCode[this.areaCode.length - 1])
				}
				this.form.areaCode = arr; // 所选区域赋值
				if (this.servicePeriod.length === 0) {
					this.form.startVisitorTime = ''
					this.form.endVisitorTime = ''
				} else {
					this.form.startVisitorTime = parseTime(this.servicePeriod[0]) + ''
					this.form.endVisitorTime = parseTime(this.servicePeriod[1]) + ''
				}
				this.form.pageNum = 1;
				this.getData(this.form);
			},
			// 获取表格数据
			getData(form) {
				let parmas = _.cloneDeep(form);
				parmas.areaCode = typeof(parmas.areaCode) === 'object'?parmas.areaCode.join(''):parmas.areaCode;
				//form.areaCode = typeof(form.areaCode) === 'object' ? form.areaCode.join('') : form.areaCode;
				institutionSearch(form).then(res => {
					if (res.rows) {
						this.tableData = res.rows;
						this.total = res.total;
					}
					else {
						this.tableData = [];
						this.total = 0;
					}
				})
			},
			// 表单重置按钮
			onReset() {
				this.areaCode = [];
				this.servicePeriod = [];
				this.form = {
					areaCode: [], // 区域表单ID
					startVisitorTime: '',
					endVisitorTime: '',
					visitorName: '', // 关键字查询
					pageNum: 1, // 分页页数
					pageSize: 10 // 分页数量
				};
				this.idEdit = !this.idEdit;
				this.getData(this.form);
			},
			//添加行
			addTableRow() {
				this.$router.push({
					path: `/consultRecord/details/0`,
					query: {'modelType': 'add', '_title': `新增咨询记录`} //modelType: 查看:look，编辑:edit，新增:add的类型
				})
			},
			// 双击行去详情页面
			toDetail(row) {
				this.$router.push({
					path: `/consultRecord/details/${row.id}`,
					query: {
						'id': row.id,
						'modelType': 'look',
						'_title': `查看${row.visitorName}`,
						'editAuthority': this.$route.meta.id
					} //modelType: 查看:look，编辑:edit，新增:add的类型
				})
			},
			// 多选的行数据
			handleSelectionChange(val) {
				this.multipleSelection = val
			},
			// 编辑按钮
			handleEdit(row) {
				this.$router.push({
					path: `/consultRecord/details/${row.id}`,
					query: {'id': row.id, 'modelType': 'edit', '_title': `编辑${row.visitorName}`} //modelType: 查看:look，编辑:edit，新增:add的类型
				})
			},
			// 删除按钮
			handleRemove($index, row) {
				this.$confirm('确定要删除【' + row.visitorName + '】咨询记录吗？一旦被删除，将无法查看相关信息。', '删除咨询记录', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning',
					closeOnClickModal: false
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
					})
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消删除！'
					})
				})
			}
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


