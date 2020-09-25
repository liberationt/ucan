<template>
  <el-container>
    <el-header class="formDiv">
      <el-form :inline="true" :model="form" class="demo-form-inline">
        <el-form-item label="所属区域">
					<Address :form-code="form.areaCode" @getAreaCode="getAreaCode" :id-edit="idEdit"
					         :width="'200px'" @keyup.enter.native="onSubmit" :scope="'All'"></Address>
				</el-form-item>
        <el-form-item label="服务商类型">
          <el-select v-model="form.orgType" placeholder="请选择服务商类型"
            style="width:200px;" clearable>
            <el-option v-for="item in serviceProviderTypeOptions"
              :key="item.dictValue" :label="item.dictLabel" :value="item.dictValue"></el-option>
          </el-select>
        </el-form-item>
				<el-form-item label="关键词">
					<el-input
							v-model.trim="form.keyword"
							clearable
							placeholder="请输入服务商名称查询"
							style="width: 200px"
              @keyup.enter.native="onSubmit"
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
            <el-table-column label="服务商名称" show-overflow-tooltip prop="orgName" min-width="120"></el-table-column>
            <el-table-column label="服务商类型" prop="orgTypeLabel" min-width="120"></el-table-column>
            <el-table-column label="地址" prop="addr" min-width="160" show-overflow-tooltip></el-table-column>
            <el-table-column label="联系电话" prop="phone" min-width="120"></el-table-column>
            <el-table-column label="成立时间" prop="establishTime" min-width="120"></el-table-column>
            <el-table-column label="开放状态" prop="openState" min-width="80"></el-table-column>
            <el-table-column label="操作" fixed="right" width="150">
              <template slot-scope="{row}">
								<span @click="handleEdit(row)" class="table-btn" v-has="{class: '编辑'}">编辑</span>
								<span @click="handleRemove(row)" class="table-btn" v-has="{class: '删除'}">删除</span>
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
  import Address from '@/components/Address';
	import Pagination from "@/components/Pagination";
  import {pageModel} from "@/common";
  import {
    serviceProviderSearch,
    removeServiceProvider,
    getServiceProviderDict
  } from '@/api/serviceProviderConfig/serviceProvider';

  export default {
    components: {
      Address,
      Pagination
    },
    data() {
      return {
        form: {
          areaCode: [], // 所属区域
          orgType: '', // 服务商类型
          keyword: '', // 服务商名称
					pageNum: pageModel.pageNum, // 分页页数
					pageSize: pageModel.pageSize // 分页数量
        },
        idEdit: true,
        serviceProviderTypeOptions: [], // 服务商类型选项
        tableData: [],
        total: 0,
      }
    },
    mounted() {
      this.getData(this.form);
      this.getTags();
      this.idEdit = false;
    },
    methods: {
      getData(form) {
				serviceProviderSearch(form).then(res => {
					if (res) {
						this.tableData = res.data.list;
            this.total = res.data.total;
					}
				}).catch(() => {
          this.$message.error('获取服务商失败！')
        })
      },
      getAreaCode(val) {
				this.form.areaCode = val;
      },
      getTags() {
        getServiceProviderDict().then(response => {
          this.serviceProviderTypeOptions = response.data;
        }).catch(err => {
        });
      },
      onSubmit() {
        this.form.pageNum = 1;
        let _form = _.cloneDeep(this.form);
        _form.areaCode = _form.areaCode.length === 0 ? '' : _form.areaCode[_form.areaCode.length - 1];
				this.getData(_form);
      },
      onReset() {
				this.form = {
          areaCode: [],
          orgType: '',
					keyword: '',
					pageNum: pageModel.pageNum, // 分页页数
					pageSize: pageModel.pageSize // 分页数量
        };
        this.idEdit=!this.idEdit;
        this.getData(this.form)
      },
      handleEdit(row) {
        this.$router.push({
					path: `/serviceProvider/details/${row.orgId}`,
					query: {'modelType': 'edit', '_title': `编辑${row.orgName}`}
				});
      },
      handleRemove(row) {
        this.$confirm('确定要删除【' + row.orgName + '】吗？信息一旦被删除，将无法显示和操作。', '删除服务商', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					removeServiceProvider(row.orgId).then(response => {
						if (response.code === 0 || response.code === '0') {
							this.$message({
								type: 'success',
								message: `删除服务商成功！`
							});
							this.form.pageNum = 1;
							this.getData(this.form);
						}
						else {
							this.$message.error(`删除服务商操作失败，失败原因是：` + response.msg);
						}
					}).catch(() => {
						this.$message.error(`删除服务商操作失败！`);
					});
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消删除！'
					});
				});
      },
      addTableRow() {
				this.$router.push({
					path: '/serviceProvider/details',
					query: {'modelType': 'add', '_title': '新增服务商'} //modelType: 查看:look，编辑:edit，新增:add的类型
				});
      },
      // 双击行去详情页面
			toDetail(row) {
				this.$router.push({
					path: `/serviceProvider/details/${row.orgId}`,
					query: {'modelType': 'look', '_title': `查看${row.orgName}`, 'menuId': this.$route.meta.id}
				});
      },
      // 多选的行数据
			handleSelectionChange(val) {
				this.multipleSelection = val;
			}
    }
  }
</script>

<style scoped>
  @import "~@/styles/form.css";
</style>
