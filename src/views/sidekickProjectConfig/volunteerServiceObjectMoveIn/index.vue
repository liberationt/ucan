<!--志愿者服务对象-->
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
            v-model.trim="form.keyWord"
            clearable
            placeholder="请输入姓名或身份证查询"
            style="width: 300px"
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
            <!-- Form -->
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
            <el-table-column label="序号" width="80" fixed="left">
              <template slot-scope="{row,$index}">
                <span>{{ $index + 1 }}</span>
              </template>
            </el-table-column>
            <el-table-column label="姓名" prop="fullName" min-width="150" />
            <el-table-column label="性别" prop="sexName" min-width="120" />
            <el-table-column label="年龄" prop="age" min-width="150" />
            <el-table-column label="身份证号" prop="idCard" min-width="200" />
            <el-table-column label="迁出区域" prop="mvOutAreaName" min-width="200" />
            <el-table-column label="迁出地址" prop="mvOutAddr" min-width="200" />
            <el-table-column label="迁入区域" prop="mvInAreaName" min-width="200" />
            <el-table-column label="迁入地址" prop="mvInAddr" min-width="200" />
            <el-table-column label="操作人" prop="operator" min-width="150" />
            <el-table-column label="操作账号" prop="createBy" min-width="200" />
            <el-table-column label="迁移时间" prop="migrationTime" min-width="200" />
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
import qs from 'qs'
import Address from '@/components/Address'
import Pagination from '@/components/Pagination'
// import {pageModel} from '@/common'
import {
  institutionSearch

} from '@/api/sidekickProjectConfig/volunteerServiceObjectMoveIn'
import { getDate_YMD, parseTime } from '@/utils/index.js'
import { downloadFromBlob, limitTextEllipsis } from '@/utils/index'
import uploadExcelMix from '@/mixins/uploadExcelMix'
import ImportDialog from '@/components/importDialog/index'
import { getToken } from '@/utils/auth'
import ExcelUpload from '@/components/newExcelUpload/index'
export default {
  components: {
    Address,
    Pagination
  },
  mixins: [uploadExcelMix],
  data() {
    return {
      dialogFormVisible: false,
      dialogAddr: false,
      dialogVisible: false,
      isShow: false,
      dialogVisibleImport: false,
      projectPeriod: [],
      // 查询表单
      form: {
        areaCode: [], // 区域表单ID
        keyWord: '', // 关键字查询
        pageNum: 1, // 分页页数
        pageSize: 10 // 分页数量
      },

      // 区域全部ID
      areaCode: [],
      // <-- table -->
      tableData: [], // table表格数据
      multipleSelection: [], // 多选的行数据
      total: 0, // 总共多少数量
      headers: {
        Authorization: 'Bearer ' + getToken() // Authorization ，而不是token
      },
      idEdit: true,
      exportData: ''// 查询成功后赋值
    }
  },
  mounted() {
    this.idEdit = false
    this.getData(this.form)
  },
  methods: {
    // 获取区域的值
    getAreaCode(val) {
      this.areaCode = val
    },
    // 老人标签选择事件
    handleChange(val) {
    },
    // 表单查询按钮
    onSubmit() {
      const arr = []
      if (this.areaCode.length !== 0) {
        arr.push(this.areaCode[this.areaCode.length - 1])
      }
      this.form.areaCode = arr // 所选区域赋值
      this.form.pageNum = 1// 分页页数
      this.form.pageSize = 10 // 分页数量
      this.getData(this.form)
    },
    // 获取表格数据
    getData(form) {
      const parmas = _.cloneDeep(form)
      parmas.areaCode = typeof (parmas.areaCode) === 'object' ? parmas.areaCode.join('') : parmas.areaCode
      institutionSearch(form).then(res => {
        if (res.code === 0) {
          this.tableData = res.data.list
          this.total = res.data.total
        } else {
          this.tableData = []
          this.total = 0
        }
      })
    },
    // 表单重置按钮
    onReset() {
      this.areaCode = []
      this.form = {
        // changeTime:'',
        areaCode: [], // 区域表单ID
        fullName: '', // 关键字查询
        pageNum: 1, // 分页页数
        pageSize: 10 // 分页数量
      }
      this.getData(this.form)
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

