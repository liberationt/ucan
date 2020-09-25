<template>
  <el-container>
    <el-header class="formDiv">
      <el-form :inline="true" :model="form" class="demo-form-inline">
        <el-form-item label="所属区域">
          <!--<el-cascader v-model="form.areaCode" :options="provenceArray" change-on-select-->
          <!--@change="handleItemChange" :props="props" >-->
          <!--</el-cascader>-->
          <Address
            :area-code="areaCode"
            :form-code="form.areaCode"
            :scope="'All'"
            :id-edit="idEdit"
            :width="'200px'"
            @getAreaCode="getAreaCode"
            @keyup.enter.native="onSubmit"
          />
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
            v-model.trim="form.keyword"
            clearable
            placeholder="请输入姓名或身份证号查询"
            style="width: 200px"
            @keyup.enter.native="onSubmit"
          />
        </el-form-item>
        <el-form-item label="服务机构">
          <el-select
            v-model="form.orgName"
            clearable
            placeholder="请选择服务机构"
            style="width: 200px"
            @keyup.enter.native="onSubmit"
          >
            <el-option
              v-for="item in optionsList"
              :key="item.orgId"
              :label="item.orgName"
              :value="item.orgName"
            />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button v-has="{class: '查询'}" type="primary" class="base-btn" @click="onSubmit">查询
          </el-button>
          <el-button v-has="{class: '查询'}" type="warning" class="base-btn" @click="onReset">重置
          </el-button>
        </el-form-item>
      </el-form>
    </el-header>
    <el-main class="tableContainer">
      <el-container>
        <el-header>
          <div class="total-nav">
            <el-button v-has="{class: '新增'}" type="primary" class="base-btn" @click="addTableRow()">新增</el-button>

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
            <el-table-column label="序号" width="80" fixed="left">
              <template slot-scope="{row,$index}">
                <span>{{ $index + 1 }}</span>
              </template>
            </el-table-column>
            <el-table-column label="姓名" prop="fullName" min-width="80" />
            <el-table-column label="性别" prop="sex" min-width="60" />
            <el-table-column label="身份证号" prop="idCard" min-width="200" />
            <el-table-column label="年龄" prop="age" min-width="60" />
            <el-table-column label="服务类型" prop="serviceType" min-width="100" />
            <el-table-column label="服务机构" prop="orgName" min-width="200" />
            <el-table-column label="户籍地" prop="areaCodeName" min-width="200" />
            <el-table-column label="入住时间" prop="inDate" min-width="100" />
            <el-table-column label="操作" fixed="right" width="150">
              <template slot-scope="{row}">
                <span v-has="{class: '编辑'}" class="table-btn" @click="handleEdit(row)">编辑</span>
                <span v-has="{class: '删除'}" class="table-btn" @click="handleRemove(row)">删除</span>
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
import Pagination from '@/components/Pagination'
import { pageModel } from '@/common'
import {
  checkInPeopleSearch,
  removeCheckInPeople,
  getOptionList
} from '@/api/facilitiesConfig/checkInPeople'
import Address from '@/components/Address'
export default {
  components: {
    Pagination,
    Address
  },
  data() {
    return {
      optionsList: [],
      form: {
        dateRange: '',
        orgName: '',
        ageMin: '',
        ageMax: '',
        keyword: '', // 姓名或身份证号
        areaCode: [], // 区域表单ID
        pageNum: pageModel.pageNum, // 分页页数
        pageSize: pageModel.pageSize // 分页数量
      },
      tableData: [],
      total: 0,
      // 区域全部ID
      areaCode: [],
      idEdit: true
    }
  },
  mounted() {
    this.idEdit = false
    this.getData(this.form)
    this.getOptionList()
  },
  methods: {
    // 获取区域的值
    getAreaCode(val) {
      this.areaCode = val
    },
    getOptionList() {
      getOptionList().then(res => {
        if (res) {
          this.optionsList = res.data
        }
      })
    },
    getData(form) {
      const arr = []
      if (this.areaCode.length !== 0) {
        arr.push(this.areaCode[this.areaCode.length - 1])
      }
      this.form.areaCode = arr // 所选区域赋值
      const searchArr = _.cloneDeep(this.form) // 深拷贝form
      searchArr.areaCode = searchArr.areaCode[0] // 提交表单是 区域是一个字符串 从数组中取出改变
      checkInPeopleSearch(searchArr).then(res => {
        if (res) {
          this.tableData = res.data.list
          this.total = res.data.total
        }
      }).catch(() => {
        this.$message.error('获取入住人员失败！')
      })
    },

    onSubmit() {
      this.form.pageNum = 1
      this.getData(this.form)
    },
    onReset() {
      this.areaCode = []
      this.form = {
        ageMin: '',
        ageMax: '',
        dateRange: '',
        orgName: '',
        keyword: '', // 姓名或身份证号
        areaCode: [], // 区域表单ID
        pageNum: pageModel.pageNum, // 分页页数
        pageSize: pageModel.pageSize // 分页数量
      }
      this.idEdit = !this.idEdit
      this.getData(this.form)
    },
    handleEdit(row) {
      this.$router.push({
        path: `/checkInPeople/details/${row.id}`,
        query: { 'modelType': 'edit', '_title': `编辑${row.fullName}` }
      })
    },
    handleRemove(row) {
      this.$confirm('确定要删除【' + row.fullName + '】吗？信息一旦被删除，将无法显示和操作。', '删除入住人员', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        removeCheckInPeople(row.id).then(response => {
          if (response.code === 0 || response.code === '0') {
            this.$message({
              type: 'success',
              message: `删除入住人员成功！`
            })
            this.form.pageNum = 1
            this.getData(this.form)
          } else {
            this.$message.error(`删除入住人员操作失败，失败原因是：` + response.msg)
          }
        }).catch(() => {
          this.$message.error(`删除入住人员操作失败！`)
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除！'
        })
      })
    },
    addTableRow() {
      this.$router.push({
        path: '/checkInPeople/details',
        query: { 'modelType': 'add', '_title': '新增入住人员' } // modelType: 查看:look，编辑:edit，新增:add的类型
      })
    },
    // 双击行去详情页面
    toDetail(row) {
      this.$router.push({
        path: `/checkInPeople/details/${row.id}`,
        query: { 'modelType': 'look', '_title': `查看${row.fullName}`, 'menuId': this.$route.meta.id }
      })
    },
    // 多选的行数据
    handleSelectionChange(val) {
      this.multipleSelection = val
    }
  }
}
</script>

<style scoped>
  @import "~@/styles/form.css";
</style>
