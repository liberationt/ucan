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
        <el-form-item label="状态">
          <el-select v-model="form.status" placeholder="请选择" @keyup.enter.native="onSubmit">
            <el-option
              v-for="item in option"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="关键词">
          <el-input
            v-model.trim="form.keyWord"
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
          >
            <el-table-column type="selection" width="50" fixed="left" />
            <el-table-column label="序号" width="60" fixed="left">
              <template slot-scope="{$index}">
                <span>{{ $index + 1 }}</span>
              </template>
            </el-table-column>
            <el-table-column label="姓名" prop="fullName" min-width="90" />
            <el-table-column label="性别" prop="sexName" min-width="60" />
            <el-table-column label="年龄" prop="age" min-width="60" />
            <el-table-column label="身份证号" prop="idCard" min-width="180" />
            <el-table-column label="迁出街道" prop="outStatus" min-width="90" />
            <el-table-column label="迁入街道" prop="inStatus" min-width="90" />
            <el-table-column label="状态" prop="status" min-width="90" />
            <el-table-column label="迁出户籍区划" prop="mvOutCensusAreaCodeLevelName" min-width="200" show-overflow-tooltip />
            <el-table-column label="迁出户籍地址" prop="mvOutCensusAddr" min-width="150" show-overflow-tooltip />
            <el-table-column label="迁入户籍区划" prop="mvInCensusAreaCodeLevelName" min-width="200" show-overflow-tooltip />
            <el-table-column label="迁入户籍地址" prop="mvInCensusAddr" min-width="150" show-overflow-tooltip />
            <el-table-column label="操作人" prop="operator" min-width="150" />
            <el-table-column label="操作账号" prop="createBy" min-width="120" />
            <el-table-column label="操作时间" prop="migrationTime" min-width="150" />
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
  getMovePersonList
} from '@/api/userInfoConfig/elderInfo'
export default {
  components: {
    Address,
    Pagination
  },
  data() {
    return {
      option: [{
        value: 'mvIn',
        label: '迁入'
      }, {
        value: 'mvOut',
        label: '迁出'
      }],
      // 查询表单
      form: {
        status: '',
        keyWord: '',
        regCode: [], // 区域表单ID
        pageNum: pageModel.pageNum, // 分页页数
        pageSize: pageModel.pageSize // 分页数量
      },
      // 区域全部ID
      areaCode: [],
      // <-- table -->
      tableData: [], // table表格数据
      total: 0, // 总共多少数量
      idEdit: true
    }
  },
  mounted() {
    this.idEdit = false
    this.getData()
  },
  methods: {
    // 获取区域的值
    getAreaCode(val) {
      this.areaCode = val
    },
    // 表单查询按钮
    onSubmit() {
      this.form.pageNum = 1
      this.getData()
    },
    // 获取表格数据
    getData() {
      const searchArr = _.cloneDeep(this.form)
      if (this.areaCode && this.areaCode.length !== 0) {
        searchArr.areaCode = this.areaCode[this.areaCode.length - 1]
      }
      getMovePersonList(searchArr).then(res => {
        if (res && res.data) {
          this.tableData = res.data.list
          // 渲染是id一样 报警告信息  去除
          this.tableData.forEach((item, i) => {
            item.id = i
          })
          this.total = res.data.total
        }
      }).catch(() => {
        this.$message.error('获取变迁历史信息失败！')
      })
    },
    // 表单重置按钮
    onReset() {
      this.areaCode = []
      this.form = {
        keyWord: '',
        state: '',
        areaCode: [], // 区域表单ID
        pageNum: pageModel.pageNum, // 分页页数
        pageSize: pageModel.pageSize // 分页数量
      }
      this.idEdit = !this.idEdit
      this.getData()
    }
  }
}
</script>

<style scoped>
	@import "~@/styles/form.css";
</style>
|
