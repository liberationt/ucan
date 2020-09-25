<!-- index.vue -->
<template>
	<el-container>
		<!--查询表单-->
		<el-header class="formDiv">
			<el-form :inline="true" :model="form" class="demo-form-inline">
				<el-form-item label="生产厂家">
					<el-select v-model="form.madeFactory" placeholder="请选择生产厂家" clearable style="width: 200px" @keyup.enter.native="onSubmit">
            <el-option
                v-for="item in madeFactoryOptions"
                :key="item.dictValue"
                :label="item.dictLabel"
                :value="item.dictValue">
            </el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="关键词">
					<el-input
							v-model.trim="form.keyword"
							clearable
							placeholder="输入终端编号或所属机构"
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
            <el-button type="primary" @click="importFun()" class="base-btn" v-has="{class: '导入'}">导入</el-button>
            <el-button type="primary" @click="exportFun()" class="base-btn" v-has="{class: '导出'}">导出</el-button>

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
						<el-table-column label="终端编号" prop="eqCode"></el-table-column>
						<el-table-column label="生产厂家" prop="madeFactoryName"></el-table-column>
            <el-table-column label="SIM卡编号" prop="simCode"></el-table-column>
            <el-table-column label="所属机构" prop="orgName"></el-table-column>
            <el-table-column label="详细地址" prop="orgAddr"></el-table-column>
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

    <el-dialog title="导入POS机" :visible.sync="dialogVisible" class="importStyleDialog" >
      <import-dialog :upload-url="uploadUrl" :template-api="templateApi" template-name="POS机导入模板" @visible="visible"  :dialog-visible="dialogVisible"></import-dialog>
    </el-dialog>

	</el-container>
</template>

<script>
  import _ from 'lodash';
  import qs from 'qs';
  import {allSelectdictionaryData} from '@/api/common';
  import {
    posSearch,
    removePOS
  } from "@/api/inteligentDeviceConfig/pos";
  import {getPOSImportTemplate, getPOSExport} from "@/api/importExportApi"
  import ImportDialog from '@/components/importDialog/index';
	import Pagination from "@/components/Pagination";
	import {pageModel} from "@/common";
  import {downloadFromBlob} from '@/utils/index';

  import uploadExcelMix from '@/mixins/uploadExcelMix';

	export default {
		components: {
      ImportDialog,
			Pagination
		},
    mixins: [uploadExcelMix],
		data() {
			return {
        // 查询表单
				form: {
          madeFactory: '', // 生产厂家
          keyword: '', // 终端编号或所属机构
					pageNum: pageModel.pageNum, // 分页页数
					pageSize: pageModel.pageSize // 分页数量
				},
				madeFactoryOptions: [], // 卡状态选项
				// <-- table -->
				tableData: [], // table表格数据
				multipleSelection: [], //多选的行数据
				total: 0, // 总共多少数量
				exportData: '', // 查询成功后赋值
				dialogVisible: false,
        uploadUrl: process.env.VUE_APP_BASE_API + '/admin/service/pos/import',
        templateApi: getPOSImportTemplate,
			}
		},
		mounted() {
			this.getDict();
			this.getData(this.form);
		},
		methods: {
			getDict() {
        let dictKeys = ['biz_made_factory'];
				allSelectdictionaryData(dictKeys).then(res => {
          let dict = res.data
          if (dict['biz_made_factory']) {
            this.madeFactoryOptions = dict['biz_made_factory'];
          }
				}).catch(() => {
        });
			},
			//表单查询按钮
			onSubmit() {
        this.form.pageNum = 1;
				this.getData(this.form);
			},
			// 获取表格数据
			getData(form) {
				posSearch(form).then(res => {
					if (res.code == 0) {
            if (res.data) {
              this.tableData = res.data.list;
              this.total = res.data.total;
              this.exportData = _.cloneDeep(form);
              delete this.exportData.pageNum;
              delete this.exportData.pageSize;
            }
					} else {
            this.$message.error(res.message);
          }
				}).catch(() => {
          this.$message.error('获取POS机失败！')
        })
			},
			// 表单重置按钮
			onReset() {
				this.form = {
          madeFactory: '', // 生产厂家
					keyword: '', // 终端编号或所属机构
					pageNum: pageModel.pageNum, // 分页页数
					pageSize: pageModel.pageSize // 分页数量
        };
				this.getData(this.form);
			},
			//添加行
			addTableRow() {
				this.$router.push({
					path: '/pos/details',
					query: {'modelType': 'add', '_title': '新增POS机'} //modelType: 查看:look，编辑:edit，新增:add的类型
				});
			},
			// 双击行去详情页面
			toDetail(row) {
				this.$router.push({
					path: `/pos/details/${row.id}`,
					query: {'modelType': 'look', '_title': `查看${row.eqCode}`, 'menuId': this.$route.meta.id}
				});
			},
			// 多选的行数据
			handleSelectionChange(val) {
				this.multipleSelection = val;
			},
			// 编辑按钮
			handleEdit(row) {
				this.$router.push({
					path: `/pos/details/${row.id}`,
					query: {'modelType': 'edit', '_title': `编辑${row.eqCode}`}
				});
			},
			// 删除按钮
			handleRemove($index, row) {
        let content = '<p>确定要删除【' + row.eqCode + '】POS机信息吗？</p><p>一旦被删除，将无法查看该信息。</p>';
				this.$confirm(content, '删除信息', {
          dangerouslyUseHTMLString: true,
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					removePOS(row.id).then(response => {
						if (response.code === 0 || response.code === '0') {
							this.$message({
								type: 'success',
								message: `删除POS机成功！`
							});
							this.form.pageNum = 1;
							this.getData(this.form);
						}
						else {
							this.$message.error(`删除POS机操作失败，失败原因是：${response.msg}`);
						}
					}).catch(() => {
						this.$message.error(`删除POS机操作失败!`);
					});
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消删除！'
					});
				});
			},
			//导入功能
			importFun() {
				this.dialogVisible = true;
			},
			//导出功能
			exportFun() {
				let confirmTitle = '';
				if(this.form.status == '' && this.form.keyword == '') {
					confirmTitle = '确定要导出全部的POS机信息吗？';
				}
				else {
					confirmTitle = '确定要导出所筛选的POS机信息吗？';
				}
				this.$confirm(
					confirmTitle,
					"导出POS机",
					{
						confirmButtonText: "确定",
						cancelButtonText: "取消",
						type: "warning"
					}
				)
				.then(() => {
          let data = qs.stringify(this.exportData);
					getPOSExport(data).then(response => {
            if (response instanceof ArrayBuffer) {
              const data = new Blob([response], {type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8;'});
              downloadFromBlob(data, 'POS机列表.xlsx');
              this.$message.success('导出POS机信息成功！');
            } else {
              if (response.code != 0 || response.code!= '0') {
                this.$message.error(response.msg);
              }
            }
					}).catch((error) => {
            if (error && error.message) {
              if (error.message.indexOf('timeout') > -1) {
                error.message = '网络超时';
              }
              this.$message.error("导出POS机信息操作失败，失败原因是：" + error.message);
            } else {
              this.$message.error("导出POS机信息操作失败！");
            }
					})
				})
				.catch(() => {
					this.$message({
						type: "info",
						message: "已取消操作！"
					});
				});
			},
      // 关闭弹窗
      visible(value) {
        this.dialogVisible = value;
      }
		}
	}
</script>

<style scoped>
	@import "~@/styles/form.css";
</style>
|
