<!--活动项目管理-->
<template>
  <el-container>
    <!--查询表单-->
    <el-header class="formDiv">
      <el-form :inline="true" :model="form" class="demo-form-inline">
        <el-form-item label="申请日期">
          <el-date-picker
            v-model="form.applyDateStart"
            type="date"
            placeholder="开始时间"
            format="yyyy 年 MM 月 dd 日"
            value-format="yyyy-MM-dd"
          />
          <el-date-picker
            v-model="form.applyDateEnd"
            type="date"
            placeholder="结束时间"
            format="yyyy 年 MM 月 dd 日"
            value-format="yyyy-MM-dd"
          />
        </el-form-item>
        <el-form-item label="所属区域">
          <Address
            :area-code="areaCode"
            :form-code="form.areaCode"
            :id-edit="idEdit"
            :scope="'no_committee'"
            :width="'200px'"
            @keyup.enter.native="onSubmit"
            @getAreaCode="getAreaCode"
          />
        </el-form-item>
        <el-form-item label="申请结果">
          <el-select v-model="form.applyResultType" placeholder="申请结果" clearable @keyup.enter.native="onSubmit">
            <el-option label="申请成功" name="" value="1" />
            <el-option label="申请失败" name="" value="2" />
          </el-select>
        </el-form-item>
        <el-form-item label="评估等级">
          <el-select v-model="form.assessLevelList" multiple placeholder="评估等级" clearable @keyup.enter.native="onSubmit">
            <el-option v-for="item in optionList" :key="item.value" :label="item.label" name="" :value="item.value" />
          </el-select>
        </el-form-item>
        <el-form-item label="护理机构名称">
          <el-input
            v-model.trim="form.nurseOrgName"
            clearable
            placeholder="输入机构名称"
            style="width: 220px"
            @keyup.enter.native="onSubmit"
          />
        </el-form-item>
        <el-form-item label="关键词">
          <el-input
            v-model.trim="form.keyword"
            clearable
            placeholder="输入姓名或身份证查询"
            style="width: 220px"
            @keyup.enter.native="onSubmit"
          />
        </el-form-item>
        <el-form-item>
          <el-button v-has="{class: '查询'}" type="primary" class="base-btn" @click="onSubmit">查询
          </el-button>
          <el-button v-has="{class: '查询'}" type="warning" class="base-btn" @click="onReset">重置
          </el-button>
          <el-button v-has="{class: '导出'}" type="warning" class="base-btn" @click="exportFun">导出
          </el-button>
        </el-form-item>
      </el-form>
    </el-header>
    <!--table板块-->
    <el-main class="tableContainer">
      <el-container>
        <el-header>
          <div class="total-nav">
            <!-- <el-button type="primary" @click="addTableRow()" class="base-btn" v-has="{class: '新增'}">新增
						</el-button> -->
            <div v-if="this.total !== 0" class="totalWrap">已筛选到{{ this.total }}条匹配信息</div>
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
            <el-table-column type="selection" width="50" fixed="left" />
            <el-table-column label="ID" width="80" fixed="left">
              <template slot-scope="{row,$index}">
                <span>{{ $index + 1 }}</span>
              </template>
            </el-table-column>
            <el-table-column label="申请号" prop="applyNum" min-width="200" />
            <el-table-column label="申请日期" prop="applyDate" min-width="140" />
            <el-table-column label="姓名" prop="name" min-width="80" />
            <el-table-column label="性别" prop="sex" min-width="80" />
            <el-table-column label="身份证号" prop="idCard" min-width="180" />
            <el-table-column label="社保卡号" prop="socialCard" min-width="160" />
            <el-table-column label="评估类型" prop="assessType" min-width="100" />
            <el-table-column label="评估等级" prop="assessLevel" min-width="100" />
            <el-table-column label="申请结果" prop="applyResult" min-width="100" />
            <el-table-column label="护理类型" prop="nurseType" min-width="100" />
            <el-table-column label="护理机构" prop="nurseOrgName" min-width="160" />
            <!-- <el-table-column fixed="right" label="操作" width="150" header-align="center">
							<template slot-scope="{row,$index}">
								<span @click="handleEdit(row)" class="table-btn" v-has="{class: '编辑'}">编辑</span>
								<span @click="handleRemove($index, row)" class="table-btn" v-has="{class: '删除'}">删除</span>
							</template>
						</el-table-column> -->
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
import _ from 'lodash'
import Address from '@/components/Address/adress'
import Pagination from '@/components/Pagination'
import { pageModel } from '@/common'
import { getToken } from '@/utils/auth'
import {
  getInsuranceData
  // removeTableRowData,
} from '@/api/serviceActivityConfig/insurance'
import { downloadFromBlob } from '@/utils/index'
import {
  getInsuranceExport
} from '@/api/importExportApi'
export default {
  components: {
    Pagination,
    Address
  },
  data() {
    return {
      // 查询表单
      form: {
        applyDateStart: '', // 申请开始日期
        applyDateEnd: '', // 申请开始日期
        areaCode: [], // 区域
        applyResultType: '', // 申请结果
        keyword: '', // 关键字查询
        nurseOrgName: '', // 机构名称
        assessLevel: '',
        assessLevelList: [],
        pageNum: pageModel.pageNum, // 分页页数
        pageSize: pageModel.pageSize // 分页数量
      },
      // 老人标签集合
      tags: [],
      areaCode: [],
      // <-- table -->
      tableData: [], // table表格数据
      multipleSelection: [], // 多选的行数据
      total: 0, // 总共多少数量
      idEdit: true,
      optionList: [
        { label: '0级', value: 0 },
        { label: '1级', value: 1 },
        { label: '2级', value: 2 },
        { label: '3级', value: 3 },
        { label: '4级', value: 4 },
        { label: '5级', value: 5 },
        { label: '6级', value: 6 },
        { label: '建议送医', value: 7 },
        { label: '评估终止', value: 9 }

      ]
    }
  },
  mounted() {
    this.idEdit = false
    this.getData(this.form)
  },
  methods: {
    exportFun() {
      let confirmTitle = ''
      if (this.form.areaCode.length === 0 && this.form.applyResultType === '' && this.form.keyword === '') {
        confirmTitle = '确认导出全部信息吗？'
      } else {
        confirmTitle = '确认导出筛选的信息吗？'
      }
      const arr = []
      if (this.areaCode.length !== 0) {
        arr.push(this.areaCode[this.areaCode.length - 1])
      }
      this.form.areaCode = arr.length ? arr[0] : '' // 所选区域赋值
      delete this.form.pageNum
      delete this.form.pageSize
      this.$confirm(
        confirmTitle,
        '导出长护险信息',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          closeOnClickModal: false
        }
      )
        .then(() => {
          getInsuranceExport(this.form).then(response => {
            if (response instanceof ArrayBuffer) {
              const datas = new Blob([response], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8;' })
              downloadFromBlob(datas, '长护险信息.xlsx')
            } else {
              if (response.code != 0 || response.code != '0') {
                this.$message.error('导出长护险信息操作失败，失败原因是：' + response.msg)
              }
            }
          }).catch(() => {
            if (error && error.message) {
              if (error.message.indexOf('timeout') > -1) {
                error.message = '网络连接超时'
              }
              this.$message.error('导出长护险信息操作失败，失败原因是：' + error.message)
            } else {
              this.$message.error('导出长护险信息操作失败！')
            }
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消操作！'
          })
        })
    },
    // 获取区域的值
    getAreaCode(val) {
      this.areaCode = val
    },
    // 老人标签选择事件
    handleChange(val) {
    },
    // 表单查询按钮
    onSubmit() {
      const params = _.cloneDeep(this.form)

      const levelArr = []
      // 修改等级数组中number转为string
      params.assessLevelList.forEach(item => {
        levelArr.push(item.toString())
      })
      params.assessLevelList = levelArr
      // console.log('assessLevelList', typeof (this.form.assessLevelList[0]))
      const arr = []
      if (this.areaCode.length !== 0) {
        arr.push(this.areaCode[this.areaCode.length - 1])
      }
      params.areaCode = arr // 所选区域赋值
      params.pageNum = 1
      this.getData(params)
    },
    // 获取表格数据
    getData(form) {
      getInsuranceData(form).then(res => {
        if (res.data) {
          this.tableData = res.data.list
          this.total = res.data.total
        }
      })
    },
    // 表单重置按钮
    onReset() {
      this.form = {
        applyDateStart: '', // 申请开始日期
        applyDateEnd: '', // 申请开始日期
        areaCode: [], // 区域
        application: '', // 申请结果
        keyword: '', // 关键字查询
        nurseOrgName: '',
        assessLevel: '',
        assessLevelList: [],
        pageNum: pageModel.pageNum, // 分页页数
        pageSize: pageModel.pageSize // 分页数量
      }
      this.idEdit = !this.idEdit
      this.getData(this.form)
    },
    // 添加行
    addTableRow() {
      // this.$router.push({
      // 	path: `/activityProject/details/0`,
      // 	query: {'modelType': 'add','_title': `新增活动项目`} //modelType: 查看:look，编辑:edit，新增:add的类型
      // });
    },
    // 双击行去详情页面
    toDetail(row) {
      // this.$router.push({
      // 	path: `/activityProject/details/${row.id}`,
      // 	query: {'id': row.id,'modelType': 'look','_title': `查看${row.keyword}`,'editAuthority':this.$route.meta.id} //modelType: 查看:look，编辑:edit，新增:add的类型
      // });
    },
    // 多选的行数据
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    // 编辑按钮
    handleEdit(row) {
      // this.$router.push({
      // 	path: `/activityProject/details/${row.id}`,
      // 	query: {'id': row.id,'modelType': 'edit','_title': `编辑${row.keyword}`} //modelType: 查看:look，编辑:edit，新增:add的类型
      // });
    },
    // 删除按钮
    handleRemove($index, row) {
      // this.$confirm('确定要删除【' + row.keyword + '】活动项目吗？一旦被删除，将无法查看相关信息。', '删除活动项目信息', {
      // 	confirmButtonText: '确定',
      // 	cancelButtonText: '取消',
      // 	type: 'warning',
      //   closeOnClickModal:false
      // }).then(() => {
      // 	removeTableRowData(row.id).then(response => {
      // 		if (response.code === 0 || response.code === '0') {
      // 			this.$message({
      // 				type: 'success',
      // 				message: response.msg
      // 			});
      // 			this.form.pageNum = 1;
      // 			this.getData(this.form);
      // 		}
      // 		else {
      // 			this.$message.error(response.msg);
      // 		}
      // 	}).catch(() => {
      // 		this.$message.error('操作失败！');
      // 	});
      // }).catch(() => {
      // 	this.$message({
      // 		type: 'info',
      // 		message: '已取消删除！'
      // 	});
      // });
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

