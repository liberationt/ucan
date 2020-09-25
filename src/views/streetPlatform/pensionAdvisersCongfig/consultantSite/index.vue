<!-- index.vue -->
<template>
	<el-container>
		<!--查询表单-->
		<el-header class="formDiv">
			<el-form :inline="true" :model="form" class="demo-form-inline">
				<el-form-item label="所属区域">
					<Address :area-code="areaCode" :form-code="form.areaCode" @getAreaCode="getAreaCode" :id-edit="idEdit"
					         :width="'200px'" @keyup.enter.native="onSubmit"></Address>
				</el-form-item>
				<el-form-item label="关键词">
					<el-input
							v-model.trim="form.keyword"
							clearable
							placeholder="输入顾问点名称查询"
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
						<el-table-column label="名称" show-overflow-tooltip prop="orgName"></el-table-column>
						<el-table-column label="顾问点类型" prop="typeName"></el-table-column>
            <el-table-column label="所属区域" prop="areaCodeStr" show-overflow-tooltip></el-table-column>
            <el-table-column label="联系电话" prop="phone"></el-table-column>
            <el-table-column label="详细地址" show-overflow-tooltip prop="addr"></el-table-column>
            <el-table-column label="养老顾问员" prop="empCount"></el-table-column>
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
    consultantSiteSearch,
    removeConsultantSite
  } from "@/api/pensionAdvisersCongfig/consultantSite";
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
          areaCode: [], // 区域表单ID
          keyword: '', // 顾问点名称
					pageNum: pageModel.pageNum, // 分页页数
					pageSize: pageModel.pageSize // 分页数量
        },
        // 区域全部ID
        areaCode: [],
        idEdit: true,
				// <-- table -->
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
        this.form.areaCode = arr // 所选区域赋值
        this.form.pageNum = 1;
				this.getData(this.form);
			},
			// 获取表格数据
			getData(form) {
				consultantSiteSearch(form).then(res => {
					if (res.code == 0) {
            if (res.data) {
              this.tableData = res.data.list;
              this.total = res.data.total;
            }
					} else {
            this.$message.error(res.message);
          }
				}).catch(() => {
          this.$message.error('获取顾问点失败！')
        })
			},
			// 表单重置按钮
			onReset() {
        this.areaCode=[];
				this.form = {
          areaCode: [], // 区域表单ID
					keyword: '', // 顾问点名称
					pageNum: pageModel.pageNum, // 分页页数
					pageSize: pageModel.pageSize // 分页数量
        };
        this.idEdit=!this.idEdit;
				this.getData(this.form);
			},
			//添加行
			addTableRow() {
				this.$router.push({
					path: '/consultantSite/details',
					query: {'modelType': 'add', '_title': '新增顾问点'} //modelType: 查看:look，编辑:edit，新增:add的类型
				});
			},
			// 双击行去详情页面
			toDetail(row) {
				this.$router.push({
					path: `/consultantSite/details/${row.id}`,
					query: {'modelType': 'look', '_title': `查看${row.orgName}`, 'menuId': this.$route.meta.id}
				});
			},
			// 多选的行数据
			handleSelectionChange(val) {
				this.multipleSelection = val;
			},
			// 编辑按钮
			handleEdit(row) {
				this.$router.push({
					path: `/consultantSite/details/${row.id}`,
					query: {'modelType': 'edit', '_title': `编辑${row.orgName}`}
				});
			},
			// 删除按钮
			handleRemove($index, row) {
        let content = '<p>确定要删除【' + row.orgName + '】顾问点信息吗？</p><p>一旦被删除，将无法查看该信息。</p>';
				this.$confirm(content, '删除养老顾问点', {
          dangerouslyUseHTMLString: true,
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					removeConsultantSite(row.id).then(response => {
						if (response.code === 0 || response.code === '0') {
							this.$message({
								type: 'success',
								message: `删除顾问点成功！`
							});
							this.form.pageNum = 1;
							this.getData(this.form);
						}
						else {
							this.$message.error(`删除顾问点操作失败，失败原因是：${response.msg}`);
						}
					}).catch(() => {
						this.$message.error(`删除顾问点操作失败!`);
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
