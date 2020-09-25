<!-- index.vue -->
<template>
  <el-container>
    <!--查询表单-->
    <el-header class="formDiv">
      <el-form :inline="true" :model="form" class="demo-form-inline">
        <el-form-item label="所属区域">
          <Address
            :area-code="areaCode"
            :form-code="form.areaCode"
            :id-edit="idEdit"
            :width="'200px'"
            @getAreaCode="getAreaCode"
            @keyup.enter.native="onSubmit"
          />
        </el-form-item>
        <el-form-item label="老人标签">
          <el-select v-model="form.labelList" multiple placeholder="请选择" @keyup.enter.native="onSubmit">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="服务方式">
          <el-select v-model="form.serviceMethodList" multiple placeholder="请选择" @keyup.enter.native="onSubmit">
            <el-option
              v-for="item in option"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="年龄范围">
          <el-date-picker
            v-model="form.dateRange"
            type="date"
            format="yyyy-MM-dd"
            value-format="yyyy-MM-dd"
            placeholder="选择日期"
          />
        </el-form-item>
        <el-form-item label="">
          <el-input
            v-model.trim="form.ageMin"
            clearable
            placeholder="最小年龄"
            style="width: 120px"
            @keyup.enter.native="onSubmit"
          />
        </el-form-item>
        <el-form-item label="">
          <el-input
            v-model.trim="form.ageMax"
            clearable
            placeholder="最大年龄"
            style="width: 120px"
            @keyup.enter.native="onSubmit"
          />
        </el-form-item>
        <el-form-item label="关键词">
          <el-input
            v-model.trim="form.fullName"
            clearable
            placeholder="请输入姓名或身份证号查询"
            style="width: 200px"
            @keyup.enter.native="onSubmit"
          />
        </el-form-item>
        <el-form-item>
          <el-button v-has="{class: '查询'}" type="primary" class="base-btn" @click="onSubmit">查询
          </el-button>
          <el-button v-has="{class: '查询'}" type="warning" class="base-btn" @click="onReset">重置
          </el-button>
        </el-form-item>
      </el-form>
    </el-header>
    <!--table板块-->
    <el-main class="tableContainer">
      <el-container>
        <el-header>
          <div class="total-nav">
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
            :row-class-name="tableRowClassName"
            @row-dblclick="toDetail"
            @sort-change="sortChange"
          >
            <el-table-column type="selection" width="50" fixed="left" />
            <el-table-column label="序号" width="80" fixed="left">
              <template slot-scope="{row,$index}">
                <span>{{ $index + 1 }}</span>
              </template>
            </el-table-column>
            <el-table-column label="姓名" prop="fullName" min-width="90">
              <template slot-scope="{row,$index}">
                <span style="color:#3367d6;cursor:pointer">{{ row.fullName }}</span>
              </template>
            </el-table-column>
            <el-table-column label="性别" prop="sex" min-width="60" />
            <el-table-column label="年龄" prop="age" min-width="60" />
            <el-table-column label="身份证" prop="idCard" min-width="150" />
            <el-table-column
              label="户籍地"
              prop="regCodeName"
              min-width="200"
              show-overflow-tooltip
            />
            <el-table-column label="服务方式" prop="serviceMethod" min-width="90" />
            <el-table-column
              label="标签"
              prop="label"
              min-width="90"
              show-overflow-tooltip
            />
            <el-table-column label="更新时间" prop="updateTime" sortable="custom" min-width="120" show-overflow-tooltip />
            <el-table-column label="评估等级" prop="evaluationLevel" min-width="90" show-overflow-tooltip />
            <el-table-column label="补贴金额（元/月）" prop="subsidyAmount" min-width="160" show-overflow-tooltip>
              <template slot-scope="{row}">
                <span v-if="row.subsidyAmount>0">{{ fomatFloat(row.subsidyAmount,2) }}</span>
                <span v-if="row.subsidyAmount===0">0.00</span>
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
import _ from 'lodash'
import Address from '@/components/Address'
import Pagination from '@/components/Pagination'
import { pageModel } from '@/common'
import {
  pensionInfoSearch
} from '@/api/userInfoConfig/pensionInfo'
export default {
  components: {
    Address,
    Pagination
  },
  data() {
    return {
      options: [
        {
          lable: '低收入',
          value: '低收入'
        },
        {
          lable: '80周岁以上',
          value: '80周岁以上'
        }
      ],
      option: [
        {
          lable: '居家养老',
          value: '居家养老'
        },
        {
          lable: '社区托养',
          value: '社区托养'
        },
        {
          lable: '机构住养',
          value: '机构住养'
        }
      ],
      // 查询表单
      form: {
        dateRange: '',
        ageMin: '',
        ageMax: '',
        serviceMethodList: [],
        sort: 'desc',
        labelList: [], // 标签
        fullName: '', // ID或者姓名
        regCode: [], // 区域表单ID
        pageNum: pageModel.pageNum, // 分页页数
        pageSize: pageModel.pageSize // 分页数量
      },
      // 区域全部ID
      areaCode: [],
      // <-- table -->
      tableData: [], // table表格数据
      total: 0, // 总共多少数量
      idEdit: true,
      exportData: '' // 查询成功后赋值
    }
  },
  mounted() {
    this.idEdit = false
    this.getData(this.form)
  },
  methods: {
    sortChange(data) {
      const { prop, order } = data
      if (order === 'descending') {
        this.form.sort = 'desc'
      } else {
        this.form.sort = 'asc'
      }
      this.getData(this.form)
    },
    // 获取区域的值
    getAreaCode(val) {
      this.areaCode = val
    },
    fomatFloat(num, n) {
      var f = parseFloat(num)
      if (isNaN(f)) {
        return 0
      }
      f = Math.round(num * Math.pow(10, n)) / Math.pow(10, n) // n 幂
      var s = f.toString()
      var rs = s.indexOf('.')
      // 判定如果是整数，增加小数点再补0
      if (rs < 0) {
        rs = s.length
        s += '.'
      }
      while (s.length <= rs + n) {
        s += '0'
      }
      return s
    },
    // 表单查询按钮
    onSubmit() {
      const arr = []
      if (this.areaCode && this.areaCode.length !== 0) {
        arr.push(this.areaCode[this.areaCode.length - 1])
      }
      this.form.regCode = arr // 所选区域赋值
      // 老人标签根据不同类型分成不同数组
      let searchArr
      const newArr = _.cloneDeep(this.form) // 深拷贝form
      searchArr = newArr
      searchArr.regCode = searchArr.regCode[0] // 提交表单是 区域是一个字符串 从数组中取出改变
      searchArr.pageNum = 1
      this.form.pageNum = 1
      this.getData(searchArr)
    },
    // 获取表格数据
    getData(form) {
      pensionInfoSearch(form).then(res => {
        if (res && res.data) {
          this.tableData = res.data.list
          this.total = res.data.total
          this.exportData = _.cloneDeep(form)
          if (this.exportData.areaCode === undefined) {
            this.exportData.areaCode = []
          }
          delete this.exportData.pageNum
          delete this.exportData.pageSize
        }
      }).catch(() => {
        this.$message.error('获取老人信息失败！')
      })
    },
    // 表单重置按钮
    onReset() {
      this.areaCode = []
      this.form = {
        dateRange: '',
        ageMin: '',
        ageMax: '',
        labelList: [],
        serviceMethodList: [],
        fullName: '', // ID或者姓名
        areaCode: [], // 区域表单ID
        pageNum: pageModel.pageNum, // 分页页数
        pageSize: pageModel.pageSize // 分页数量
      }
      this.idEdit = !this.idEdit
      this.getData(this.form)
    },
    // 双击行去详情页面
    toDetail(row) {
      this.$router.push({
        path: `/pensionInfo/details/${row.personCode}`,
        query: { 'modelType': 'look', '_title': `查看${row.fullName}`, 'menu': this.$route.meta.id, 'hasEdit': row.hasEdit }
      })
    },
    // 表格如果已去世，这一行标黄
    tableRowClassName({ row, rowIndex }) {
      if (row.status === '1') {
        return 'dead-row'
      }
      if (row.status === 'moved_out') {
        return 'moved_out'
      }
      return ''
    },
    // 关闭弹窗
    visible(value) {
      this.dialogVisible = value
    }
  }
}
</script>

<style scoped>
	@import "~@/styles/form.css";
</style>
|
