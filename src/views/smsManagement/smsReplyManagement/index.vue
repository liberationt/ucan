<template>
  <el-container>
    <el-header class="formDiv">
      <el-form :inline="true" :model="form" class="demo-form-inline">
        <el-form-item label="时间范围">
          <el-date-picker
            v-model="form.startTime"
            type="datetime"
            format="yyyy-MM-dd HH:mm:ss"
            value-format="yyyy-MM-dd HH:mm:ss"
            placeholder="开始时间"
          />
        </el-form-item>
        <el-form-item label="">
          <el-date-picker
            v-model="form.endTime"
            type="datetime"
            format="yyyy-MM-dd HH:mm:ss"
            value-format="yyyy-MM-dd HH:mm:ss"
            placeholder="结束时间"
          />
        </el-form-item>
        <el-form-item label="手机号">
          <el-input
            v-model.trim="form.phoneNumber"
            clearable
            placeholder="请输入手机号查询"
            style="width: 200px"
            @keyup.enter.native="onSubmit"
          />
        </el-form-item>
        <el-form-item>
          <el-button v-has="{class: '查询'}" type="primary" class="base-btn" @click="onSubmit">查询</el-button>
          <el-button v-has="{class: '查询'}" type="warning" class="base-btn" @click="onReset">重置</el-button>
          <el-button v-has="{class: '导出'}" type="primary" class="base-btn" @click="exportFun()">导出</el-button>
        </el-form-item>
      </el-form>
    </el-header>
    <el-main class="tableContainer">
      <el-container>
        <el-header>
          <el-button v-has="{class: '新增'}" type="primary" class="base-btn" @click="addTableRow()">新增</el-button>
        </el-header>
        <el-main>
          <el-table
            :data="tableData"
            tooltip-effect="dark"
            style="width: 100%;"
            header-align="left"
            border
            @sort-change="sortChange"
          >
            <!-- <el-table-column type="selection" width="50" fixed="left"></el-table-column> -->
            <el-table-column label="序号" width="80" fixed="left">
              <template slot-scope="{row,$index}">
                <span>{{ $index + 1 }}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="手机号码"
              prop="phoneNumber"
              min-width="90"
              header-align="left"
            />
            <el-table-column
              label="回复时间"
              sortable="custom"
              prop="sendTime"
              min-width="90"
              header-align="left"
            />
            <el-table-column
              label="短信详情"
              prop="content"
              min-width="300"
              show-overflow-tooltip
              header-align="left"
            />
            <!--fixed="right"-->
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
import { getDateList, getDataDownload } from '@/api/smsManagement/smsReplyManagement'
import { downloadFromBlob } from '@/utils/index'
export default {
  components: { Pagination },
  data() {
    return {
      form: {
        startTime: '',
        endTime: '',
        phoneNumber: '',
        sortOrder: 'DESC',
        pageSize: 10,
        pageNum: 1
      },
      total: 0,
      tableData: []
    }
  },
  mounted() {
    this.getData(this.form)
  },
  methods: {
    onSubmit() {
      this.form.pageNum = 1
      this.getData(this.form)
    },
    onReset() {
      this.form = {
        startTime: '',
        endTime: '',
        phoneNumber: '',
        sortOrder: 'DESC',
        pageSize: 20,
        pageNum: 1
      }
      this.getData(this.form)
    },
    sortChange(data) {
      const { prop, order } = data
      this.form.sortFields = prop
      if (order === 'descending') {
        this.form.sortOrder = 'DESC'
      } else {
        this.form.sortOrder = 'ASC'
      }
      this.getData(this.form)
    },
    getData(form) {
      getDateList(form).then(res => {
        if (res.code == '0') {
          this.total = res.data.total
          this.tableData = res.data.list
        }
      })
    },
    exportFun() {
      let confirmTitle = ''
      if (this.form.startTime == '' && this.form.endTime == '' && this.form.phoneNumber == '') {
        confirmTitle = '确认导出全部短信回复信息吗？'
      } else {
        confirmTitle = '确认导出筛选的短信回复信息吗？'
      }
      this.$confirm(
        confirmTitle,
        '导出短信回复信息',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          closeOnClickModal: false
        }
      ).then(() => {
        delete this.form.pageNum
        delete this.form.pageSize
        const _form = _.cloneDeep(this.form)
        getDataDownload(_form).then(response => {
          if (response instanceof ArrayBuffer) {
            const datas = new Blob([response], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8;' })
            downloadFromBlob(datas, '短信回复列表.xlsx')
          } else {
            if (response.code != 0 || response.code != '0') {
              this.$message.error('导出短信回复信息操作失败，失败原因是：' + response.msg)
            }
          }
        }).catch(() => {
          if (error && error.message) {
            if (error.message.indexOf('timeout') > -1) {
              error.message = '网络连接超时'
            }
            this.$message.error('导出短信回复信息操作失败，失败原因是：' + error.message)
          } else {
            this.$message.error('导出短信回复信息操作失败！')
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消操作！'
        })
      })
    }
  }
}
</script>

<style scoped>
</style>
