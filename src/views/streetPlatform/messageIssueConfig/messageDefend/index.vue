<template>
  <el-container class="es-table">
    <el-header class="formDiv">
      <el-form :inline="true" :model="form" class="demo-form-inline">
        <el-form-item label="发布时间">
          <el-date-picker
            v-model="servicePeriod"
            type="datetimerange"
            range-separator="-"
            start-placeholder="开始时间"
            end-placeholder="结束时间"
            :default-time="['12:00:00']"
            @keyup.enter.native="onSubmit"
          />
        </el-form-item>
        <el-form-item label="标题">
          <el-input
            v-model.trim="form.title"
            style="width: 200px"
            clearable
            placeholder="请输入关键词"
            @keyup.enter.native="onSubmit"
          />
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="form.status" placeholder="请选择状态" clearable style="width: 200px" @keyup.enter.native="onSubmit">
            <el-option
              v-for="item in cmsStatus"
              :key="item.dictValue"
              :label="item.dictLabel"
              :value="item.dictValue"
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
          <el-button v-has="{class: '新增'}" type="primary" class="base-btn" @click="addTableRow()">新增
          </el-button>
        </el-header>
        <el-main>
          <el-table
            :data="tableData"
            tooltip-effect="dark"
            style="width: 100%;"
            header-align="left"
            border
            row-key="id"
            @row-dblclick="toDetail"
          >
            <el-table-column type="selection" width="50" />
            <el-table-column label="序号" width="80" fixed="left">
              <template slot-scope="{row,$index}">
                <span>{{ $index + 1 }}</span>
              </template>
            </el-table-column>
            <el-table-column label="发布时间" prop="createTime" min-width="150"/>
            <el-table-column label="标题" prop="title" />
            <el-table-column label="类型" prop="contentType" />
            <el-table-column label="状态" prop="status" />
            <el-table-column label="发布账号" prop="createBy" />
            <el-table-column label="操作" align="center" width="200">
              <template slot-scope="{row}">
                <span class="table-btn" @click="handleEdit(row)" v-if="row.status !== '生效'">
                  编辑
                </span>
                <span class="table-btn" @click="changeMesType(row.id, '1')" v-if="row.status !== '生效'">
                  发布
                </span>
                <span class="table-btn" @click="changeMesType(row.id, '2')" v-if="row.status === '生效'">
                  停止
                </span>
              </template>
            </el-table-column>
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
  </el-container>
</template>

<script>
import Pagination from '@/components/Pagination'
import { pageModel } from '@/common'
import { getMes, changeMesType } from '@/api/esimate/esimate'
import { allSelectdictionaryData } from '@/api/facilitiesConfig/pensionAgency'
export default {
  name: 'MessageDefend',
  components: {
    Pagination
  },
  data() {
    return {
      servicePeriod: '',
      form: {
        beginTime: '',
        endTime: '',
        status: '',
        title: '',
        pageNum: pageModel.pageNum,
        pageSize: pageModel.pageSize
      },
      cmsStatus: [],
      tableData: [],
      total: 0
    }
  },
  mounted() {
    this.getSelect()
    this.getMes(this.form)
  },
  methods: {
    handleEdit(row) {
      this.$router.push({
        path: `/messageIssue/details/${row.id}`,
        query: { 'modelType': 'edit', '_title': `编辑${row.title}`, 'menu': this.$route.meta.id }
      })
    },
    toDetail(row) {
      this.$router.push({
        path: `/messageIssue/details/${row.id}`,
        query: { 'modelType': 'look', '_title': `查看${row.title}`, 'menu': this.$route.meta.id }
      })
    },
    changeMesType(id, type) {
      let title = ''
      let content = ''
      if (type === '2') {
        title = '停止信息'
        content = '确定要停止信息？'
      } else {
        title = '发布信息'
        content = '确定要发布信息？'
      }
      this.$confirm(
        content,
        title,
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }
      ).then(res => {
        changeMesType({
          id: id,
          status: type
        }).then(res => {
          if (res.code === 0) {
            if (type === '2') {
              this.$message.success('停止信息成功！')
            } else {
              this.$message.success('发布信息成功！')
            }
            this.form.pageNum = 1
            this.onSubmit()
          }
        })
      })
    },
    getSelect() {
      const dictKey = [
        'cms_status' // 评估类别
      ].join(',')
      return new Promise((resolve, reject) => {
        allSelectdictionaryData(dictKey).then(response => {
          const dict = response.data
          for (const key in dict) {
            switch (key) {
              // 评估类别
              case 'cms_status':
                this.cmsStatus = dict[key]
                break
            }
          }
          resolve()
        }).catch(() => {
          reject()
        })
      })
    },
    onSubmit() {
      this.form.pageNum = 1
      this.getData()
    },
    getData() {
      const params = _.cloneDeep(this.form)
      if (this.servicePeriod !== null && this.servicePeriod !== '') {
        params.beginTime = this.dateFtt('yyyy-MM-dd hh:mm:ss', this.servicePeriod[0])
        params.endTime = this.dateFtt('yyyy-MM-dd hh:mm:ss', this.servicePeriod[1])
      }
      this.getMes(params)
    },
    onReset() {
      this.form = {
        beginTime: '',
        endTime: '',
        status: '',
        title: '',
        pageNum: pageModel.pageNum,
        pageSize: pageModel.pageSize
      }
      this.servicePeriod = ''
      this.getMes()
    },
    addTableRow() {
      this.$router.push({
        path: '/messageIssue/details/0',
        query: { 'modelType': 'add', '_title': `新增信息维护` }
      })
    },
    dateFtt(fmt, date) {
      var o = {
        'M+': date.getMonth() + 1, // 月份
        'd+': date.getDate(), // 日
        'h+': date.getHours(), // 小时
        'm+': date.getMinutes(), // 分
        's+': date.getSeconds(), // 秒
        'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
        'S': date.getMilliseconds() // 毫秒
      }
      if (/(y+)/.test(fmt)) { fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length)) }
      for (var k in o) {
        if (new RegExp('(' + k + ')').test(fmt)) { fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length))) }
      }
      return fmt
    },
    getMes(params) {
      getMes(params).then(res => {
        if (res.code === 0) {
          this.tableData = res.data.list
          this.total = res.data.total
          this.tableData.forEach((item, index) => {
            var myDate = new Date(item.createTime)
            this.tableData[index].createTime = this.dateFtt('yyyy-MM-dd hh:mm:ss', myDate)
          })
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
