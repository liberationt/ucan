<!-- index.vue -->
<template>
	<el-container>
		<!--查询表单-->
		<el-header class="formDiv">
			<el-form :inline="true" :model="form" class="demo-form-inline">
				<el-form-item label="所属区域">
							<Address :area-code="areaCode" :form-code="form.liveCode" @getAreaCode="getAreaCode"
					         :width="'200px'" :id-edit="idEdit" @keyup.enter.native="onSubmit"></Address>
				</el-form-item>
				<el-form-item label="关键词">
					<el-input
							v-model.trim="form.fullName"
							clearable
							placeholder="输入姓名或身份证号"
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
						<el-table-column label="姓名" show-overflow-tooltip prop="fullName"></el-table-column>
						<el-table-column label="身份证号" prop="idCard" min-width="200"></el-table-column>
                        <el-table-column label="联系方式" prop="mobile"></el-table-column>
                        <el-table-column label="详细地址" show-overflow-tooltip prop="liveAddr"></el-table-column>
                        <el-table-column label="租赁次数" prop="numberOfLeases"></el-table-column>
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
  import Address from "@/components/Address"
  import {getLesseeInformation,deleteLesseeInformation} from "@/api/assistiveDevices/lesseeInformation"
  import Pagination from "@/components/Pagination";
	import {pageModel} from "@/common";

	export default {
		components: {
			Pagination,
			Address
		},
		data() {
			return {
                // 查询表单
				form: {
					liveCode:[],
					fullName: '', // 租赁点名称
                    pageNum: pageModel.pageNum, // 分页页数
                    pageSize: pageModel.pageSize // 分页数量
				},
                tableData: [], // table表格数据
                multipleSelection: [], //多选的行数据
				total: 0, // 总共多少数量
				areaCode:[],
				idEdit:true
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
				this.getData(this.form);
			},
			// 获取表格数据
			getData(form) {
				if(this.areaCode.length){
					this.form.liveCode=this.areaCode[this.areaCode.length-1]
				}
				getLesseeInformation(form).then(res => {
					if (res.code == 0) {
                        if (res.data) {
                            this.tableData = res.data.list;
                            this.total = res.data.total;
                        }
					} else {
                        this.$message.error(res.message);
					}
				}).catch(() => {
                 this.$message.error('获取承租人失败！')
                })
			},
			// 表单重置按钮
			onReset() {
				this.areaCode=[]
				this.form = {
					liveCode:'',
                    fullName: '', // 租赁点名称
					pageNum: pageModel.pageNum, // 分页页数
					pageSize: pageModel.pageSize // 分页数量
				};
				this.idEdit=!this.idEdit;
				this.getData(this.form);
			},
			//添加行
			addTableRow() {
				this.$router.push({
					path: '/lesseeInformation/details',
					query: {'modelType': 'add', '_title': '新增承租人'} //modelType: 查看:look，编辑:edit，新增:add的类型
				});
			},
			// 双击行去详情页面
			toDetail(row) {
				this.$router.push({
					path: `/lesseeInformation/details/${row.id}`,
					query: {'modelType': 'look', '_title': `查看${row.fullName}`,'editAuthority':this.$route.meta.id}
				});
			},
			// 多选的行数据
			handleSelectionChange(val) {
				this.multipleSelection = val;
			},
			// 编辑按钮
			handleEdit(row) {
				this.$router.push({
					path: `/lesseeInformation/details/${row.id}`,
					query: {'modelType': 'edit', '_title': `编辑${row.fullName}`,id:row.id}
				});
			},
			// 删除按钮
			handleRemove($index, row) {
                let content = '<p>确定要删除【' + row.fullName + '】承租人信息吗？</p><p>一旦被删除，将无法查看该信息。</p>';
				this.$confirm(content, '删除承租人', {
                    dangerouslyUseHTMLString: true,
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					deleteLesseeInformation(row.id).then(response => {
						if (response.code === 0 || response.code === '0') {
							this.$message({
								type: 'success',
								message: `删除承租人成功！`
							});
							this.form.pageNum = 1;
							this.getData(this.form);
						}
						else {
							this.$message.error(`删除承租人操作失败，失败原因是：${response.msg}`);
						}
					}).catch(() => {
						this.$message.error(`删除承租人操作失败!`);
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
