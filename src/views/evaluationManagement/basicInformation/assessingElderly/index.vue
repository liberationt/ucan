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
        <el-form-item label="关键词">
          <el-input
            v-model.trim="form.keyword"
            clearable
            placeholder="请输入老人姓名、手机号或身份证号"
            style="width: 300px"
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
            <el-button v-has="{class: '新增'}" type="primary" class="base-btn" @click="addTableRow()">新增
            </el-button>
            <el-button v-has="{class: '导入'}" type="primary" class="base-btn" @click="importFun()">导入
            </el-button>
            <el-button v-has="{class: '导出'}" type="primary" class="base-btn" @click="exportFun()">导出
            </el-button>
            <div v-if="total !== 0" class="totalWrap">已筛选到{{ total }}条匹配信息</div>
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
            <el-table-column label="姓名" prop="fullName" min-width="90" />
            <el-table-column label="性别" prop="sexName" min-width="60" />
            <el-table-column label="身份证" prop="idCard" min-width="180" />
            <el-table-column label="手机号" prop="mobile" min-width="180" />
            <el-table-column label="户籍地" prop="censusAreaLevelName" min-width="180" />
            <el-table-column label="养老机构" prop="orgName" min-width="180" />
          </el-table>
          <pagination
            v-show="total>0"
            :total="total"
            :page.sync="form.pageNum"
            :limit.sync="form.pageSize"
            @pagination="getData"
          />
        </el-main>
      </el-container>
    </el-main>
    <!-- <ExcelUpload :dialog-table-visible="dialogVisible" :title="'导入老人信息'" :template-name="'老人信息导入模板'" :template-api="templateApi" :upload-url="uploadUrl" :type="'老人信息管理'" @visible="visible" /> -->
  </el-container>
</template>
<script>
import Address from '@/components/Address'
import Pagination from '@/components/Pagination'
// import { pageModel } from '@/common'
// import _ from 'lodash'
import { getAssessingElderly } from '@/api/evaluationManagement/basicInformation'

export default {
  components: { Address, Pagination },
  data() {
    return {
      tableData: [],
      total: 0,
      areaCode: [],
      idEdit: true,
      censusStatusOptions: [],
      form: {
        keyword: '',
        areaCode: [], // 区域表单ID
        pageNum: 1, // 分页页数
        pageSize: 10 // 分页数量
      }
    }
  },
  mounted() {
    this.idEdit = false
    this.getData()
  },
  methods: {
    handleSelectionChange(val) {

    },
    toDetail(row) {
      // this.$router.push(`/assessingElderly/details/${row.id}`)
      this.$router.push(
        {
          path: `/assessingElderly/details/${row.id}`,
          query: {
            modelType: 'look',
            _title: `查看${row.fullName}`
          }
        })
    },
    getAreaCode(val) {
      this.areaCode = val
    },
    onSubmit() {
      this.form.pageNum = 1
      this.getData()
    },
    onReset() {
      this.areaCode = []
      this.form = {
        keyword: '',
        areaCode: '', // 区域表单ID
        pageNum: 1, // 分页页数
        pageSize: 10 // 分页数量
      }
      this.idEdit = !this.idEdit
      this.getData()
    },
    getData() {
      if (this.areaCode && this.areaCode.length) {
        this.form.areaCode = this.areaCode[this.areaCode.length - 1]
      } else {
        this.form.areaCode = ''
      }
      getAssessingElderly(this.form).then(res => {
        if (res.code === 0) {
          this.tableData = res.data.list
          this.total = res.data.total
        }
      })
    }
  }
}
</script>
