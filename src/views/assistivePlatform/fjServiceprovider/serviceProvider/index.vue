<!-- index.vue -->
<template>
	<el-container>
		<!--查询表单-->
		<el-header class="formDiv">
			<el-form :inline="true" :model="form" class="demo-form-inline">
				<el-form-item label="办公区域">
					<Address :area-code="areaCode" :form-code="form.officeArea" @getAreaCode="getAreaCode" :id-edit="idEdit"
					         :width="'200px'" @keyup.enter.native="onSubmit"></Address>
				</el-form-item>
				<el-form-item label="关键词">
					<el-input
							v-model.trim="form.spName"
							clearable
							placeholder="输入服务商名称查询"
							style="width: 200px"  @keyup.enter.native="onSubmit"
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
            <el-button type="primary" @click="addTableRow()" class="base-btn" v-has="{class: '新增'}">新增</el-button>
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
						<el-table-column label="服务商名称" show-overflow-tooltip prop="spName"></el-table-column>
                        <el-table-column label="咨询电话" prop="phone"></el-table-column>
                        <el-table-column label="办公区域" show-overflow-tooltip prop="officeAreaLevel"></el-table-column>
                        <el-table-column label="办公详细地址" show-overflow-tooltip prop="officeAddr"></el-table-column>
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
  import _ from 'lodash';
  import qs from 'qs';
  import {
	getServiceProviderList,
	deleteServiceProvider
  } from "@/api/assistiveDevices/fjserviceProvider";
  import Address from "@/components/Address"
  import Pagination from "@/components/Pagination";
	import {pageModel} from "@/common";

	export default {
		components: {
            Address,
			Pagination
		},
		data() {
			return {
                // 查询表单
				form: {
                    officeArea: "", // 区域表单ID
                    spName: '', // 服务商名称
                    pageNum: 1, // 分页页数
                    pageSize: 20 // 分页数量
                },
                // 区域全部ID
                areaCode: [],
                idEdit: true,
                tableData: [], // table表格数据
                multipleSelection: [], //多选的行数据
                total: 0, // 总共多少数量
			}
		},
		mounted() {
            this.idEdit = false;
			this.getData(this.form);
		},
		methods: {
      // 获取区域的值
			getAreaCode(val) {
				this.areaCode = val
            },
			//表单查询按钮
			onSubmit() {
                const arr = [];
                if (this.areaCode.length !== 0) {
                    arr.push(this.areaCode[this.areaCode.length - 1])
				}
                this.form.officeArea = arr // 所选区域赋值
                this.form.pageNum = 1;
				this.getData(this.form);
			},
			// 获取表格数据
			getData(form) {
				getServiceProviderList(form).then(res => {
					if (res.code == 0) {
                        if (res.data) {
                            this.tableData = res.data.list;
                            this.total = res.data.total;
                        }
					} else {
                        this.$message.error(res.message);
                    }
				}).catch(() => {
                 this.$message.error('获取服务商失败！')
                })
			},
			// 表单重置按钮
			onReset() {
                // this.areaCode=[];
				this.form = {
                    officeArea:"", // 区域表单ID
					spName: '', // 服务商名称
					pageNum: 1, // 分页页数
					pageSize: 20 // 分页数量
                };
                this.idEdit=!this.idEdit;
				this.getData(this.form);
			},
			//添加行
			addTableRow() {
				this.$router.push({
					path: '/fjserviceProvider/details',
					query: {'modelType': 'add', '_title': '新增服务商'} //modelType: 查看:look，编辑:edit，新增:add的类型
				});
			},
			// 双击行去详情页面
			toDetail(row) {
				this.$router.push({
					path: `/fjserviceProvider/details/${row.spId}`,
					query: {'modelType': 'look', '_title': `查看${row.spName}`,'menuId': this.$route.meta.id}
				});
			},
			// 多选的行数据
			handleSelectionChange(val) {
				this.multipleSelection = val;
			},
			// 编辑按钮
			handleEdit(row) {
				this.$router.push({
					path: `/fjserviceProvider/details/${row.spId}`,
					query: {'modelType': 'edit', '_title': `编辑${row.spName}`}
				});
			},
			// 删除按钮
			handleRemove($index, row) {
                let content = '<p>确定要删除【' + row.spName + '】服务商信息吗？</p><p>一旦被删除，将无法查看该信息。</p>';
				this.$confirm(content, '删除服务商', {
                    dangerouslyUseHTMLString: true,
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					deleteServiceProvider(row.spId).then(response => {
						if (response.code == 0) {
							this.$message({
								type: 'success',
								message: `删除服务商成功！`
							});
							this.form.pageNum = 1;
							this.getData(this.form);
						}
						else {
							this.$message.error(`删除服务商操作失败，失败原因是：${response.msg}`);
						}
					}).catch(() => {
						this.$message.error(`删除服务商操作失败!`);
					});
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消删除！'
					});
				});
			}
		}
	}
</script>

<style scoped>
	@import "~@/styles/form.css";
</style>
|
