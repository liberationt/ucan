<!--志愿者服务项目-->
<template>
	<el-container>
		<!--查询表单-->
		<el-header class="formDiv">
			<el-form :inline="true" :model="form" class="demo-form-inline">
				<el-form-item label="项目类型">
					<el-select v-model="form.serviceType" placeholder="请选择项目类型" @keyup.enter.native="onSubmit" clearable style="width: 200px">
						<el-option v-for="item in service_typeOptions" :key="item.dictValue" :label="item.dictLabel"
						           :value="item.dictValue"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="起止日期">
					<el-date-picker
							v-model="projectPeriod"
							type="daterange"
							range-separator="-"
							start-placeholder="开始日期"
							end-placeholder="结束日期"
							format="yyyy-MM-dd"
							value-format="yyyy-MM-dd"
							style="width: 300px"
					></el-date-picker>
				</el-form-item>
				<el-form-item label="关键词">
					<el-input v-model.trim="form.serviceName" clearable placeholder="请输入项目名称查询" style="width: 280px"
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
						<el-table-column label="项目名称" prop="serviceName" min-width="180" show-overflow-tooltip></el-table-column>
						<el-table-column label="项目类型" prop="serviceTypeName" min-width="120"></el-table-column>
						<el-table-column label="承接单位" prop="undertakeUnit" min-width="200"></el-table-column>
						<el-table-column label="项目周期" prop="serviceEventName" min-width="200">
							<template slot-scope="{row,$index}">
								<span>{{row.beginTime}}&nbsp;&nbsp;{{row.endTime}}</span>
							</template>
						</el-table-column>
						<el-table-column label="服务范围" show-overflow-tooltip prop="serviceAreaName" min-width="200"></el-table-column>
						<el-table-column label="服务对象人数" prop="servicePeopleNumber" min-width="120"></el-table-column>
						<el-table-column label="社会组织" prop="socialOrgNumber" min-width="100"></el-table-column>
						<el-table-column label="志愿者人数" prop="volunteerNumber" min-width="120"></el-table-column>
						<el-table-column fixed="right" label="操作" width="150" header-align="center">
							<template slot-scope="{row,$index}" v-if="row.dis !== '0'">
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
	import Pagination from '@/components/Pagination'
	//import {pageModel} from '@/common'
	import {
		institutionSearch,
		removeTableRowData
	} from '@/api/sidekickProjectConfig/volunteerServiceProject'
	import {getDate_YMD,parseTime,limitTextEllipsis} from '@/utils/index';
	import {allSelectdictionaryData} from '@/api/facilitiesConfig/communityFacilities';

	export default {
		components: {
			Pagination
		},
		data() {
			return {
				// 项目类型
				service_typeOptions: [],
				// 查询表单
				form: {
					serviceType:'',//项目类型
					beginTime: '',
					endTime: '',
					serviceName: '', // 关键字查询
					pageNum: 1, // 分页页数
					pageSize: 10, // 分页数量
				},
				// <-- table -->
				tableData: [], // table表格数据
				multipleSelection: [], //多选的行数据
				total: 0, // 总共多少数量
				projectPeriod: [] //服务到期日期
			}
		},
		mounted() {
			//数据字典接口
			let dicKey = 'service_type';
			allSelectdictionaryData(dicKey).then(response => {
				if (response.code === 0) {
					//项目类型
					this.service_typeOptions = response.data['service_type'];
				}
				else {
					this.$message.error('数据字典接口请求失败！')
				}
			}).catch(() => {
				this.$message.error('数据字典接口请求失败！')
			});

			this.getData(this.form)
		},
		methods: {
			// 老人标签选择事件
			handleChange(val) {
			},
			//表单查询按钮
			onSubmit() {
				if(this.projectPeriod === null){
					this.projectPeriod = [];
				}
				if (this.projectPeriod.length === 0) {
					this.form.beginTime = '';
					this.form.endTime = '';
				} else {
					this.form.beginTime = getDate_YMD(this.projectPeriod[0]) + '';
					this.form.endTime = getDate_YMD(this.projectPeriod[1]) + '';
				}
				this.form.pageNum= 1;// 分页页数
				this.form.pageSize= 10; // 分页数量

				this.getData(this.form);
			},
			// 获取表格数据
			getData(form) {
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
				this.projectPeriod = [];
				this.form = {
					serviceType:'',
					beginTime: '',
					endTime: '',
					serviceName: '', // 关键字查询
					pageNum: 1, // 分页页数
					pageSize: 10, // 分页数量
				};
				this.getData(this.form);
			},
			//添加行
			addTableRow() {
				this.$router.push({
					path: `/volunteerServiceProject/details/0`,
					query: {'modelType': 'add', '_title': `新增志愿者服务项目`} //modelType: 查看:look，编辑:edit，新增:add的类型
				})
			},
			// 双击行去详情页面
			toDetail(row) {
				let _title_ = limitTextEllipsis(row.serviceName,10);
				this.$router.push({
					path: `/volunteerServiceProject/details/${row.id}`,
					query: {
						'id': row.id,
            'dis': row.dis,
						'modelType': 'look',
						'_title': `查看${_title_}`,
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
				let _title_ = limitTextEllipsis(row.serviceName,10);
				this.$router.push({
					path: `/volunteerServiceProject/details/${row.id}`,
					query: {'id': row.id, 'modelType': 'edit', '_title': `编辑${_title_}`} //modelType: 查看:look，编辑:edit，新增:add的类型
				})
			},
			// 删除按钮
			handleRemove($index, row) {
				let _title_ = limitTextEllipsis(row.serviceName,10);
				this.$confirm('确定要删除【' + _title_ + '】志愿者项目吗？一旦被删除，将无法查看相关信息。', '删除志愿者服务项目', {
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


