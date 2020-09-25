<template>
  <el-container>
    <!--查询表单-->
    <el-header class="formDiv">
      <el-form :inline="true" :model="form" class="demo-form-inline">
        <el-form-item label="导出模块">
          <el-select v-model="form.exportType" placeholder="请选择导出模块" clearable style="width: 200px" @keyup.enter.native="onSubmit">
            <el-option
              v-for="item in typeOptions"
              :key="item"
              :label="item"
              :value="item"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="导出日期">
          <el-date-picker
            v-model="form.exportStartTime"
            type="datetime"
            format="yyyy-MM-dd HH:mm:ss"
            value-format="yyyy-MM-dd HH:mm:ss"
            placeholder="开始时间"
          />
          <el-date-picker
            v-model="form.exportEndTime"
            type="datetime"
            format="yyyy-MM-dd HH:mm:ss"
            value-format="yyyy-MM-dd HH:mm:ss"
            placeholder="结束时间"
          />
        </el-form-item>
        <el-form-item label="导出账号">
          <el-input
            v-model.trim="form.createBy"
            clearable
            placeholder="请输入导出账号"
            style="width: 280px"
          />
        </el-form-item>
        <el-form-item label="处理状态">
          <el-select v-model="form.exportStatus" placeholder="请选择处理状态" clearable style="width: 200px" @keyup.enter.native="onSubmit">
            <el-option
              v-for="item in stateOptions"
              :key="item.dictValue"
              :label="item.dictLabel"
              :value="item.dictValue"
            />
          </el-select>
        </el-form-item>
        <el-form-item>
          <!-- <el-button type="primary" @click="onSubmit" class="base-btn" v-has="{class: '查询'}">查询
					</el-button>
					<el-button type="warning" @click="onReset" class="base-btn" v-has="{class: '查询'}">重置
					</el-button> -->
          <el-button type="primary" @click="onSubmit">查询</el-button>
          <el-button type="primary" @click="onReset">重置</el-button>
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
            <el-table-column label="序号" width="80" fixed="left">
              <template slot-scope="{row,$index}">
                <span>{{ $index + 1 }}</span>
              </template>
            </el-table-column>
            <el-table-column label="导出模板" prop="exportType" min-width="180" show-overflow-tooltip />
            <el-table-column label="导出数据" prop="exportNum" min-width="120" />
            <el-table-column label="导出时间" prop="createTime" min-width="200" />
            <el-table-column label="导出账号" prop="createBy" min-width="200" />
            <el-table-column label="处理状态" prop="exportStatus" min-width="120">
              <template slot-scope="{row}">
                <span>{{ handelData(row.exportStatus) }}</span>
              </template>
            </el-table-column>
            <el-table-column fixed="right" label="操作" width="150" align="center">
              <template slot-scope="{row}">
                <span v-if="row.exportStatus==3" class="table-btn" @click="downExcel(row.exportFileUrl,row.exportType)">下载文件</span>
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
import { getExportType, getExportList } from '@/api/dataManagement/exportManagement'
import { allSelectdictionaryData } from '@/api/common'
import Pagination from '@/components/Pagination'
import uploadExcelMix from '@/mixins/uploadExcelMixNew'
export default {
  components: { Pagination },
  mixins: [uploadExcelMix],
  data() {
    return {
      form: {
        exportType: '',
        exportStartTime: '',
        exportEndTime: '',
        exportStatus: '',
        createBy: '',
        pageNum: 1,
        pageSize: 10
      },
      total: 0,
      typeOptions: [],
      stateOptions: [],
      exportTime: [],
      tableData: []
    }
  },
  mounted() {
    this.getType()
    this.getSelect()
    this.getData(this.form)
  },
  methods: {
    handelData(num) {
      let type = ''
      this.stateOptions.forEach(item => {
        if (item.dictValue == num) {
          type = item.dictLabel
        }
      })
      return type
    },
    onSubmit() {
      this.form.pageNum = 1
      this.getData(this.form)
    },
    onReset() {
      this.form = {
        exportType: '',
        exportStartTime: '',
        exportEndTime: '',
        exportStatus: '',
        createBy: '',
        pageNum: 1,
        pageSize: 10
      }
      this.getData(this.form)
    },
    getType() {
      getExportType().then(res => {
        if (res.code === 0) {
          this.typeOptions = res.data
        }
      })
    },
    getData(form) {
      getExportList(form).then(res => {
        if (res.code === 0) {
          this.tableData = res.data.list
          this.total = res.data.total
        }
      })
    },
    // 获取下拉字典
    getSelect() {
      // 数据字典接口
      const dicKey = 'biz_export_handel_status'
      allSelectdictionaryData(dicKey).then(response => {
        if (response.code === 0) {
          for (const k in response.data) {
            switch (k) {
              case 'biz_export_handel_status':
                this.stateOptions = response.data[k]
                break
            }
          }
        }
      })
    }
  }

}
</script>
<style scoped>

</style>
