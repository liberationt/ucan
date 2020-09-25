<!-- index.vue -->
<template>
	<el-container>
		<!--查询表单-->
		<el-header class="formDiv">
			<el-form :inline="true" :model="form" class="demo-form-inline">
				<el-form-item label="刷卡日期">
          <el-date-picker
            v-model="buidTime"
            type="daterange"
            range-separator="-"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            format="yyyy年MM月dd日" value-format="yyyy-MM-dd"
            style="width:350px"
            @keyup.enter.native="onSubmit"
          ></el-date-picker>
				</el-form-item>
				<el-form-item label="关键词">
					<el-input
							v-model.trim="form.idCardOrEcCode"
							clearable
							placeholder="请输入敬老卡编号或身份证号查询"
							style="width: 260px" @keyup.enter.native="onSubmit"
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
						<el-table-column label="时间" prop="buidTime"></el-table-column>
						<el-table-column label="姓名" prop="fullName"></el-table-column>
            <el-table-column label="身份证" prop="idCard" min-width="200"></el-table-column>
            <el-table-column label="敬老卡编号" prop="ecCode"></el-table-column>
            <el-table-column label="地点" prop="orgAddr"></el-table-column>
            <el-table-column label="终端编号" prop="eqCode"></el-table-column>
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
  import {recordSearch} from '@/api/inteligentDeviceConfig/record';
	import Pagination from "@/components/Pagination";
	import {pageModel} from "@/common";

	export default {
    components: {
      Pagination
    },
		data() {
			return {
        buidTime: [], // 刷卡日期
        // 查询表单
				form: {
          buidTimeStart: null, // 刷卡日期 开始
          buidTimeEnd: null, // 刷卡日期 结束
          idCardOrEcCode: '', // 身份证号或敬老卡编号
					pageNum: pageModel.pageNum, // 分页页数
					pageSize: pageModel.pageSize // 分页数量
				},
				// <-- table -->
				tableData: [], // table表格数据
				multipleSelection: [], //多选的行数据
				total: 0, // 总共多少数量
			}
		},
		mounted() {
			this.getData(this.form);
		},
		methods: {
			//表单查询按钮
			onSubmit() {
        this.form.pageNum = 1;
				this.getData(this.form);
			},
			// 获取表格数据
			getData(form) {
        form.buidTimeStart = this.buidTime[0];
        form.buidTimeEnd = this.buidTime[1];
        recordSearch(form).then(res => {
					if (res.code == 0) {
            if (res.data) {
              this.tableData = res.data.list;
              this.total = res.data.total;
            }
					} else {
            this.$message.error(res.message);
          }
				}).catch(() => {
          this.$message.error('获取刷卡记录失败！')
        })
			},
			// 表单重置按钮
			onReset() {
        this.buidTime = [];
				this.form = {
          buidTimeStart: null, // 刷卡日期 开始
          buidTimeEnd: null, // 刷卡日期 结束
					idCardOrEcCode: '',
					pageNum: pageModel.pageNum,
					pageSize: pageModel.pageSize
        };
				this.getData(this.form);
			},
			// 双击行去详情页面
			toDetail(row) {
				// TODO
			},
			// 多选的行数据
			handleSelectionChange(val) {
				this.multipleSelection = val;
			},
		}
	}
</script>

<style scoped>
	@import "~@/styles/form.css";
</style>
|
